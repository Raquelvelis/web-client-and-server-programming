/**
 * Array of "Would You Rather" questions with two possible answers each.
 * Each question object contains the question text and two answer options.
 */
const questions = [
    {
        'question': 'Live in a house shaped like a triangle or a house shaped like a circle?',
        'answer1': 'Triangle house',
        'answer2': 'Circle house'
    },
    {
        'question': 'Have a cat-sized elephant or an elephant-sized cat?',
        'answer1': 'Cat-sized elephant',
        'answer2': 'Elephant-sized cat'
    },
    {
        'question': 'Be able to fly or be able to breathe underwater?',
        'answer1': 'Fly',
        'answer2': 'Breath underwater'
    },
    {
        'question': 'Play any musical instrument or speak any language?',
        'answer1': 'Play any musical instrument',
        'answer2': 'Speak any language'
    },
    {
        'question': 'Be a famous movie star or a famous scientist?',
        'answer1': 'Famous movie star',
        'answer2': 'Famous scientist'
    },
]

/**
 * Selects and returns a random question from the questions array.
*/
function randomWyrQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length)
    const randomQuestion = questions[randomIndex]
    return randomQuestion
}

// Export the randomWyrQuestion function to be used in other modules
module.exports = randomWyrQuestion
