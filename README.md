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

## Current Limitations and Call for Contributions

While the RunCoachGPT Workout Generator is functional and can generate running workouts, the current output may not always meet the expectations of users in terms of variety and complexity. The workouts generated are often simple, consisting of 5-10 1km intervals, and may lack additional information that could enhance the workout experience.

This is largely due to the inherent challenge of generating complex, varied workouts using AI, and the limitations of the current implementation. The script relies on the GPT-3 model from OpenAI, which, while powerful, may not always generate the most diverse or creative workouts.

We believe that with the help of the community, we can improve the quality and variety of the workouts generated by this script. If you have experience with JavaScript, OpenAI's GPT-3, or workout generation, we would greatly appreciate your contributions. Whether it's improving the code, refining the GPT-3 prompts, or suggesting new features, any help is welcome.

To contribute, please feel free to fork the repository, make your changes, and submit a pull request. If you have any questions or suggestions, don't hesitate to open an issue.

Thank you for your interest in the RunCoachGPT Workout Generator, and we look forward to building a better workout generator together!
