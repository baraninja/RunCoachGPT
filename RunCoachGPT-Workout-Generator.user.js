// ==UserScript==
// @name         RunCoachGPT Workout Generator
// @namespace    http://www.barane.se
// @version      0.1
// @description  Create custom running workouts using RunCoachGPT!
// @author       Anders Barane <anders.barane@gmail.com>
// @match        https://connect.garmin.com/modern/workout/create/running
// @icon         https://www.google.com/s2/favicons?sz=64&domain=garmin.com
// @grant        none
// @run-at document-idle
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js
// ==/UserScript==

/*
Inspired by the rowing workout script by Amadeusz Juskowiak <juskowiak@amadeusz.me>
*/

/* global $ */

(function() {
    'use strict';

    var openai_api_key = localStorage.getItem("OPENAI_KEY");

    let context_prompt =
`You are an expert running coach with experience in various types of running including long distance, trail, short track, and indoor running.
You need to prepare workout plans in following JSON format:
This is the main body of JSON:
{
  "workout_name": "<insert name, string>",
  "estimated_distance_m": <insert distance, in meters, float>,
  "estimated_time_s": <insert time, in seconds, float>,
  "segments": [
    {
      "segment_name": "<insert name, string>",
      "duration_s": <insert duration, in seocnds, float>,
      "intensity": <insert intensity, one of the values: free, low, medium, high, max>,
      "distance_m": <insert distance, in meters, float>,
      "motivational_quote": "<insert quote, string>"
    },
    ...
   {
      "segment_name": "<insert name, string>",
      "duration_s": <insert duration, in seocnds, float>,
      "intensity": <insert intensity, one of the values: free, low, medium, high, max>,
      "distance_m": <insert distance, in meters, float>,
      "motivational_quote": "<insert quote, string>"
    }
  ]
}
Note there can be multiple segments (in case of intervals). Use good motivational quotes as a coach would use. Quotes cannot repeat between segments.
Intensity cannot be arrays.
Also give me a funny joke at the end.`;

    var validate_openai_api_key = function() {
        if (!openai_api_key) {
            var k = prompt("Please enter your OpenAI personal key, it will be stored in a local storage");
            if (k) {
                openai_api_key = k;
                localStorage.setItem("OPENAI_KEY", k);
            } else {
                validate_openai_api_key();
            }
        }
    };

    var get_prompt = function() {
        var k = prompt("Please provide what you need from your virtual coach:", "Hi, I need a long distance running workout for 2 hours");
        return k;
    };

    var remove_workout_steps = function() {
        $('a[aria-label="Delete Step"]').each(function() { this.click(); });
    };

    var pad = function(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }
    var add_step = function(name, quote, distance, duration, intensity) {
        let h = Math.floor(duration / 3600);
        let m = Math.floor(duration / 60 - h * 60);
        let s = Math.floor(duration - h * 3600 - m * 60);

        $('#new-step').click();
        $('.editable-step-edit-button').click();

        $($('.primary-target-main-select').last().find('option')[4]).attr("selected", "true");

        var t = 1;
        if (name == 'Warm-up')
            t = 0;
        else if (name == "Cool-down")
            t = 4;
        $($('.select-step-type').last().find('option')[t]).attr("selected", "true");

        $('.duration-time-input').val(pad(h, 2 )+ ":" + pad(m, 2) + ":" + pad(s, 2));
        $('.workout-step-done-editing').last().click();

        $('.editable-step-edit-button').click();

        let intensity2hr = {
            'free': 0,
            'low': 1,
            'medium': 2,
            'high': 3,
            'max': 4
        }
        $($('.select-hearth-rate-type').last().find('option')[intensity2hr[intensity]]).attr("selected", "true");

        $('.edit-workout-step-note').last().trigger('focus');
        let note = name + "\n\n" + quote + "\n\nDistance: " + distance + "m";
        $('.edit-workout-step-note').last().val(note);
        $('.edit-workout-step-note').last().trigger('change');

        $('.workout-step-done-editing').last().click();
    };

    var ask_chatgpt = function(p) {
        var r;
        $.ajax({
            url: "https://api.openai.com/v1/chat/completions",
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + openai_api_key,
            },
            type: 'POST',
            async: false,
            processData: false,
            data: JSON.stringify({
                'model': 'gpt-3.5-turbo',
                'temperature': 0.8,
                'messages': [
                    {'role': 'system', 'content': context_prompt},
                    {'role': 'user', 'content': p}
                 ]
            })
        }).done(function (data, textStatus, jqXHR) {
            console.log(data);
            r = data.choices[0].message.content;
        });
        return r;
    };

var add_button = function() {
    var save_workout = $('#save-workout');
    var generate_workout = save_workout.before('<a href="#" id="generate-workout" class="btn btn-medium save-edit-workout" aria-disabled="false">Generate Running Workout</a>&nbsp;');

    $('#generate-workout').click(function() {
        var p = get_prompt();
        remove_workout_steps();
        var answer = ask_chatgpt(p);
        var chatgpt_answer = JSON.parse(answer.substr(answer.indexOf('{'), answer.lastIndexOf('}') - answer.indexOf('{')+1));

        for (var i in chatgpt_answer.segments)
        {
            var segment = chatgpt_answer.segments[i];
            add_step(segment.segment_name, segment.motivational_quote, segment.distance_m, segment.duration_s, segment.intensity);
        }

        $('button.inline-edit-trigger').last().click();
        let title = "[Run][AI][" + (new Date().toJSON().split("T")[0]) + "] " + chatgpt_answer.workout_name;
        $('.inline-edit-editable-text').last().text(title);
        $('button.inline-edit-save').last().click();

        $('.workout-overview-note-button').last().click();
        // set notes here
    });
};

validate_openai_api_key();
setTimeout(add_button, 4000);
})();
