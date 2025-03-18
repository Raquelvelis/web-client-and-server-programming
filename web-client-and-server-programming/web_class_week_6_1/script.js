// Bridge data
const bridgesData = [
    {
        "name": "Akashi Kaikyō Bridge",
        "span": 1991,
        "span_text": "1,991m",
        "city": "Kobe",
        "location": [34.617028, 135.021917]
    },
    {
        "name": "Yangsigang Yangtze River Bridge",
        "span": 1700,
        "span_text": "1,700m",
        "city": "Wuhan",
        "location": [30.50667, 114.25667]
    },
    {
        "name": "Nansha Bridge(East span)",
        "span": 1688,
        "span_text": "1,688m",
        "city": "Dongguan",
        "location": [22.88475, 113.565667]
    },
    {
        "name": "Xihoumen Bridge",
        "span": 1650,
        "span_text": "1,650m",
        "city": "Zhoushan",
        "location": [30.061778, 121.916]
    },
    {
        "name": "Great Belt Bridge",
        "span": 1624,
        "span_text": "1,624m",
        "city": "Korsør",
        "location": [55.34194, 11.035917]
    },
    {
        "name": "Osman Gazi Bridge",
        "span": 1550,
        "span_text": "1,550m",
        "city": "Dilovası",
        "location": [40.75417, 29.51528]
    },
    {
        "name": "Yi Sun-sin Bridge",
        "span": 1545,
        "span_text": "1,545m",
        "city": "Gwangyang",
        "location": [34.905944, 127.705028]
    },
    {
        "name": "Runyang Bridge",
        "span": 1490,
        "span_text": "1,490m",
        "city": "Yangzhou",
        "location": [32.206833, 119.363861]
    },
    {
        "name": "Second Dongtinghu Bridge",
        "span": 1480,
        "span_text": "1,480m",
        "city": "Yueyang",
        "location": [29.42472, 113.12222]
    },
    {
        "name": "Nanjing Fourth Yangtze Bridge",
        "span": 1418,
        "span_text": "1,418m",
        "city": "Nanjing",
        "location": [32.17775, 118.940139]
    },
    {
        "name": "Humber Bridge",
        "span": 1410,
        "span_text": "1,410m",
        "city": "Hessle",
        "location": [53.707972, -0.450083]
    },
    {
        "name": "Yavuz Sultan Selim Bridge",
        "span": 1408,
        "span_text": "1,408m",
        "city": "İstanbul",
        "location": [41.20861, 29.11806]
    },
    {
        "name": "Jiangyin Bridge",
        "span": 1385,
        "span_text": "1,385m",
        "city": "Jiangyin",
        "location": [31.945306, 120.26944]
    },
    {
        "name": "Tsing Ma Bridge",
        "span": 1377,
        "span_text": "1,377m",
        "city": "Tsing Yi",
        "location": [22.351333, 114.073778]
    },
    {
        "name": "Hardanger Bridge",
        "span": 1310,
        "span_text": "1,310m",
        "city": "Ulvik",
        "location": [60.478583, 6.829778]
    },
    {
        "name": "Verrazzano-Narrows Bridge",
        "span": 1298,
        "span_text": "1,298m",
        "city": "New York City",
        "location": [40.60639, -74.045333]
    },
    {
        "name": "Golden Gate Bridge",
        "span": 1280,
        "span_text": "1,280m",
        "city": "San Francisco",
        "location": [37.819306, -122.478861]
    },
    {
        "name": "Yangluo Bridge",
        "span": 1280,
        "span_text": "1,280m",
        "city": "Wuhan",
        "location": [30.636917, 114.554944]
    },
    {
        "name": "Höga Kusten Bridge",
        "span": 1210,
        "span_text": "1,210m",
        "city": "Utansjö",
        "location": [62.79806, 17.9375]
    },
    {
        "name": "Nansha Bridge(West span)",
        "span": 1200,
        "span_text": "1,200m",
        "city": "Dongguan",
        "location": [22.883278, 113.518889]
    }
];

// Initialize map and chart when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMap(bridgesData);
    initializeChart(bridgesData);
});

/**
 * Initializes the Leaflet map and adds bridge markers
 * @param {Array} bridgeData - Array of bridge objects
 */
function initializeMap(bridgeData) {
    // Create map instance
    const map = L.map('map-container').setView([30, 0], 2);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Define custom icons
    const normalBridgeIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const longestBridgeIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Find the longest bridge
    const longestSpan = Math.max(...bridgeData.map(b => b.span));

    bridgeData.forEach(bridge => {
        // Determine if this is the longest bridge
        const isLongest = bridge.span === longestSpan;

        // Configure icon based on bridge size
        const bridgeIcon = L.icon({
            iconUrl: isLongest ? 'bridge_big.png' : 'bridge.png',
            iconSize: [38, 38],        // Slightly larger size for better visibility
            iconAnchor: [19, 38],      // Center bottom of icon
            popupAnchor: [0, -38],     // Center top of icon
            className: isLongest ? 'longest-bridge-icon' : 'bridge-icon' // Add classes for potential CSS animations
        });

        // Create marker with custom icon
        L.marker(bridge.location, {
            icon: bridgeIcon,
            title: bridge.name // Shows tooltip on hover
        })
            .bindPopup(createPopupContent(bridge, isLongest))
            .addTo(map);
    });

    // Fit map bounds to show all markers
    const points = bridgeData.map(bridge => bridge.location);
    map.fitBounds(points, {
        padding: [50, 50],
        maxZoom: 12
    });
}

/**
 * Creates HTML content for bridge popups
 * @param {Object} bridge - Bridge data object
 * @param {boolean} isLongest - Whether this is the longest bridge
 * @returns {string} HTML content for popup
 */
function createPopupContent(bridge, isLongest) {
    return `
        <div class="bridge-popup ${isLongest ? 'longest-bridge' : ''}">
            <h3>${bridge.name}</h3>
            <p><strong>Location:</strong> ${bridge.city}</p>
            <p><strong>Span:</strong> ${bridge.span_text}</p>
            ${isLongest ? '<p class="longest-badge">Longest Span</p>' : ''}
        </div>
    `;
}

/**
 * Initializes the Chart.js bar chart
 * @param {Array} bridgeData - Array of bridge objects
 */
function initializeChart(bridgeData) {
    // Sort bridges by span length (descending)
    const sortedBridges = [...bridgeData].sort((a, b) => b.span - a.span);

    // Take top 20 bridges for better visualization
    const top20Bridges = sortedBridges.slice(0, 20);

    const ctx = document.getElementById('chart-container').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top20Bridges.map(bridge => bridge.name),
            datasets: [{
                label: 'Bridge Span (meters)',
                data: top20Bridges.map(bridge => bridge.span),
                backgroundColor: top20Bridges.map(bridge =>
                    bridge.span === Math.max(...sortedBridges.map(b => b.span))
                        ? 'rgba(255, 99, 132, 0.8)'  // Red for longest bridge
                        : 'rgba(54, 162, 235, 0.8)'  // Blue for others
                ),
                borderColor: top20Bridges.map(bridge =>
                    bridge.span === Math.max(...sortedBridges.map(b => b.span))
                        ? 'rgba(255, 99, 132, 1)'
                        : 'rgba(54, 162, 235, 1)'
                ),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 20 Longest Bridge Spans',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Span Length (meters)'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}