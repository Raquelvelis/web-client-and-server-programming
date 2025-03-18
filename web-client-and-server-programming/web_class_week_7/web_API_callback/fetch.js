/**
 * ISS Tracker
 *
 * This script tracks the International Space Station's current location
 * using the "Where The ISS At?" API and displays it on an interactive map.
 * It periodically updates the position and provides real-time coordinates.
 */

// API endpoint URL for the ISS location data
let url = 'https://api.wheretheiss.at/v1/satellites/25544'  // 25544 is the NORAD ID for the ISS

// DOM elements for displaying the ISS coordinates
let issLat = document.querySelector('#iss-lat')      // Element to display the latitude
let issLong = document.querySelector('#iss-long')    // Element to display the longitude

// Initialize Leaflet map centered at [0,0] (equator/prime meridian) with zoom level 1 (world view)
let map = L.map('iss-map').setView([0,0], 1)

// Update frequency in milliseconds (10 seconds)
let update = 10000

// Variable to hold the ISS marker once it's created
let issMarker

// DOM element to display the time when the ISS location was last fetched
let timeIssLocationFetched = document.querySelector('#time')

// Custom ISS icon configuration for the map marker
let icon = L.icon({
    iconUrl: 'iss-icon.png',        // Path to the ISS icon image
    iconSize: [50,50],              // Size of the icon in pixels [width, height]
    iconAnchor: [25,25]             // Point of the icon that corresponds to the marker's location
})

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

// Call the iss function immediately to display initial position
iss()

// Set up periodic updates every 10 seconds (value from 'update' variable)
setInterval(iss, update)

/**
 * Main function to fetch and display the ISS location
 *
 * This function:
 * 1. Fetches current ISS position data from the API
 * 2. Updates the latitude and longitude display
 * 3. Creates or updates the map marker
 * 4. Updates the timestamp of when data was fetched
 */
function iss() {
    // Fetch data from the ISS API
    fetch(url)
        .then(res => res.json())                 // Parse JSON response
        .then((issData) => {
            console.log(issData)                 // Log data to console for debugging

            // Extract latitude and longitude from the response
            let lat = issData.latitude
            let long = issData.longitude

            // Update the HTML elements with the coordinates
            issLat.innerHTML = lat
            issLong.innerHTML = long

            // Handle the map marker
            if (!issMarker) {
                // If marker doesn't exist yet, create it
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
            } else {
                // If marker already exists, update its position
                issMarker.setLatLng([lat, long])
            }

            // Update the timestamp with the current time
            let now = new Date()
            timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`
        })
        .catch((err) => {
            // Error handling if the fetch request fails
            console.log('ERROR!', err)
        })
}