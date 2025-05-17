// Service for interacting with the Would You Rather API
export default {
    // Fetch a random WYR question from the server
    getRandomWYR() {
        // Make a GET request to the /wyr endpoint
        return fetch('/wyr').then(response => {
            // Parse the JSON response
            return response.json()
        }) 
    }
}
