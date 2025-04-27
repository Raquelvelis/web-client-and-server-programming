# Vue 3 + Vite

For this lab, and every lab, add comments to your code to explain the new concepts, complex code, and anything that's not obvious from just reading the code.

Part 1: Would You Rather, 4 points

Follow the slides/videos to build the Would You Rather? app, which uses components. As always, add your own notes and comments on the app as you build it.

Part 2: Body Mass Index Calculator, 16 points

Create a new app using Vite.

Replace HelloWorld.vue with a new component called BodyMassIndexForm.vue.

BodyMassIndexForm.vue should

Show inputs for the user to enter their height in meters, and weight in kilograms.  Create two reactive data and use v-model to connect with the input elements.
Show a button with the text 'Calculate'
When the user clicks the 'Calculate' button, BodyMassIndexForm should emit an event called stats-entered to App.vue with the user's height and the user's weight - this is the data the user entered in the inputs.
BodyMassIndexForm.vue will not receive any props from App.vue (but see extra credit question for an extra question about props)
App.vue should

Display the app's name, 'Body Mass Index Calculator'
Receive the stats-entered event from BodyMassIndexForm, and use the data sent to calculate the user's body mass index
To calculate the body mass index, assuming variables called height and weight,  const bmi = weight / ( height * height )
Display the calculated body mass index, formatted to 2 decimal places.
App.vue will not pass any props to BodyMassIndexForm (but see next credit question for an extra question about props) 

For this lab, and every lab, add comments to your code to explain the new concepts, complex code, and anything that's not obvious from just reading the code.

Part 1: Would You Rather, 4 points

Follow the slides/videos to build the Would You Rather? app, which uses components. As always, add your own notes and comments on the app as you build it.

Part 2: Body Mass Index Calculator, 16 points

Create a new app using Vite.

Replace HelloWorld.vue with a new component called BodyMassIndexForm.vue.

BodyMassIndexForm.vue should

Show inputs for the user to enter their height in meters, and weight in kilograms.  Create two reactive data and use v-model to connect with the input elements.
Show a button with the text 'Calculate'
When the user clicks the 'Calculate' button, BodyMassIndexForm should emit an event called stats-entered to App.vue with the user's height and the user's weight - this is the data the user entered in the inputs.
BodyMassIndexForm.vue will not receive any props from App.vue (but see extra credit question for an extra question about props)
App.vue should

Display the app's name, 'Body Mass Index Calculator'
Receive the stats-entered event from BodyMassIndexForm, and use the data sent to calculate the user's body mass index
To calculate the body mass index, assuming variables called height and weight,  const bmi = weight / ( height * height )
Display the calculated body mass index, formatted to 2 decimal places.
App.vue will not pass any props to BodyMassIndexForm (but see next credit question for an extra question about props) 

Note: What is body mass index, BMI? It was invented to indicate if person is a healthy weight, but BMI values by themselves provide very limited information about a person's health. There are many other, more important, indicators of health. Please see your health provider for the best advice. More information on BMI from Wikipedia, particularly the sections on how BMI is calculated and the limitations of BMI as a health tool,  https://en.wikipedia.org/wiki/Body_mass_index

To Submit

Add each project to a GitHub repository.
Use one GitHub repository for each project.
COMMENT YOUR CODE.
Submit the links to your GitHub repositories

