// Declares an array named 'animals' containing three string elements
let animals = ['Giraffe', 'Elephant', 'Yak'];

// Example 1: forEach with traditional anonymous function syntax
// The forEach method iterates through each element in the array
// It executes the callback function for each element, passing both the element and its index
animals.forEach(function (animal, index) {
    console.log(animal, index); // Logs each animal name and its index to the console
});

// Example 2: forEach with arrow function syntax
// This achieves the same result as Example 1 but uses ES6 arrow function syntax
// Arrow functions were introduced in ES6 and provide a more concise way to write functions
animals.forEach((animal, index) => {
    console.log(animal, index); // Logs each animal name and its index to the console
});

// Example 3: forEach with traditional function syntax, only using the element parameter
// This example ignores the index parameter since it's not needed
animals.forEach(function (animal) {
    console.log(animal); // Logs only the animal name to the console
});

// Example 4: forEach with arrow function syntax, only using the element parameter
// This is the arrow function equivalent of Example 3
animals.forEach((animal) => {
    console.log(animal); // Logs only the animal name to the console
});

// Example 5: forEach with arrow function and implicit return
// When an arrow function has a single statement, curly braces can be omitted
// The result of the statement is implicitly returned
animals.forEach((animal) => console.log(animal));

// Example 6: forEach with arrow function, simplified syntax for single parameter
// When an arrow function has only one parameter, the parentheses can be omitted
// This is the most concise syntax for this particular use case
animals.forEach(animal => console.log(animal));