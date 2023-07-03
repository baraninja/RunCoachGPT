# RunCoachGPT Workout Generator

## Description

This is a userscript that generates custom running workouts using OpenAI's GPT-3 model. It's designed to be used on Garmin Connect's workout creation page.

## Installation

1. Install a userscript manager for your browser (such as Tampermonkey or Greasemonkey).
2. Click on the raw link of the `RunCoachGPT-Workout-Generator.user.js` file in this repository to install the script.
3. The userscript manager should recognize the script and offer to install it.

## Usage

1. Navigate to the Garmin Connect workout creation page.
2. Click on the "Generate Running Workout" button added by the script.
3. Enter your OpenAI API key when prompted. This will be stored in your local storage for future use.
4. Enter your workout request when prompted (e.g., "Hi, I need a long distance running workout for 2 hours").
5. The script will generate a workout based on your request and add it to the page.

## Notes

- The script uses jQuery, which is loaded from Google's CDN.
- The script communicates with OpenAI's API to generate workouts. You will need an OpenAI API key to use it.
- The script stores your OpenAI API key in your browser's local storage. If you clear your local storage, you will need to enter it again.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
