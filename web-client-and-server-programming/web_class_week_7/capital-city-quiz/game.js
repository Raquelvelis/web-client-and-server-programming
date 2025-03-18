// Find all the HTML elements we need
let randomCountryElement = document.querySelector('#random-country-display')
let userAnswerElement = document.querySelector('#user-answer-entry')
let submitButton = document.querySelector('#submit-user-answer')
let resultTextElement = document.querySelector('#game-result')
let scoreDisplayElement = document.querySelector('#score-display')

// Variables to keep track of the game
let currentCountry;
let userScore = 0;

// Our own implementation of Levenshtein distance calculator
// This calculates how different two strings are
function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) === a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i-1][j-1] + 1, // substitution
                    matrix[i][j-1] + 1,   // insertion
                    matrix[i-1][j] + 1    // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// This function starts a new round of the game
function startGame() {
    // Clear the previous answer and result
    userAnswerElement.value = '';
    resultTextElement.textContent = '';

    // Pick a random country
    const randomIndex = Math.floor(Math.random() * countriesAndCodes.length);
    currentCountry = countriesAndCodes[randomIndex];

    // Show the country name
    randomCountryElement.textContent = currentCountry.name;
}

// This function adds points to the score
function updateScore(points) {
    userScore = userScore + points;
    scoreDisplayElement.textContent = 'Score: ' + userScore;
}

// This function checks if the user's answer is correct
function checkAnswer() {
    // Get what the user typed
    const userAnswer = userAnswerElement.value.trim();

    // Make sure they typed something
    if (!userAnswer) {
        resultTextElement.textContent = 'Please enter an answer.';
        return;
    }

    // Create the URL to get the country data
    const countryCode = currentCountry.twoLetterCode.toLowerCase();
    const url = 'https://api.worldbank.org/v2/country/' + countryCode + '?format=json';

    // Get the data from the World Bank API
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Could not connect to World Bank API');
            }
            return response.json();
        })
        .then(function(data) {
            // Get the capital city from the data
            if (data && data[1] && data[1][0] && data[1][0].capitalCity) {
                const capitalCity = data[1][0].capitalCity;

                // Check for exact match (ignoring uppercase/lowercase)
                if (userAnswer.toLowerCase() === capitalCity.toLowerCase()) {
                    resultTextElement.textContent = 'Correct! The capital of ' + currentCountry.name + ' is ' + capitalCity + '.';
                    resultTextElement.style.color = 'green';
                    updateScore(5);
                    return;
                }

                // Check for match if we remove punctuation and spaces
                // Convert both to lowercase and remove anything that's not a letter or number
                const cleanUserAnswer = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanCapital = capitalCity.toLowerCase().replace(/[^a-z0-9]/g, '');

                if (cleanUserAnswer === cleanCapital) {
                    resultTextElement.textContent = 'Almost perfect! The capital of ' + currentCountry.name + ' is "' + capitalCity + '" (you wrote "' + userAnswer + '").';
                    resultTextElement.style.color = 'green';
                    updateScore(4);
                    return;
                }

                // Check if the answer is close using our Levenshtein function
                const distance = getLevenshteinDistance(userAnswer.toLowerCase(), capitalCity.toLowerCase());
                const maxAllowedDistance = 3; // Allow up to 3 letter differences

                if (distance <= maxAllowedDistance) {
                    resultTextElement.textContent = 'Close! The capital of ' + currentCountry.name + ' is "' + capitalCity + '" (you wrote "' + userAnswer + '").';
                    resultTextElement.style.color = 'orange';
                    updateScore(3);
                    return;
                }

                // If we got here, the answer is wrong
                resultTextElement.textContent = 'Wrong - the capital of ' + currentCountry.name + ' is not "' + userAnswer + '", it is "' + capitalCity + '".';
                resultTextElement.style.color = 'red';

            } else {
                resultTextElement.textContent = 'Sorry, couldn\'t find the capital city for this country.';
                resultTextElement.style.color = 'orange';
            }
        })
        .catch(function(error) {
            alert('There was a problem getting the data: ' + error.message);
            resultTextElement.textContent = 'Error fetching data. Please try again.';
            resultTextElement.style.color = 'red';
        });
}

// When the Check Answer button is clicked, check the answer
submitButton.addEventListener('click', checkAnswer);

// Also check the answer when the Enter key is pressed
userAnswerElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Create a Play Again button
const playAgainButton = document.createElement('button');
playAgainButton.textContent = 'Play Again';
playAgainButton.className = 'btn btn-primary mt-3';
playAgainButton.id = 'play-again-button';

// Add the button to the page
document.querySelector('.content').appendChild(playAgainButton);

// When the Play Again button is clicked, start a new game
playAgainButton.addEventListener('click', startGame);

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);