

    let url = 'https://api.wheretheiss.at/v1/satellites/25544'

    let issLat = document.querySelector('#iss-lat')
    let issLong = document.querySelector('#iss-long')

    let map = L.map( 'iss-map').setView([0,0], 1)
    let update = 10000
    let issMarker
    let timeIssLocationFetched = document.querySelector('#time')
    let icon = L.icon ( {
        iconUrl: 'iss-icon.png',
        iconSize: [50,50],
        iconAnchor: [25,25]
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
    }).addTo(map)

    iss() // call function one time to start
    setInterval(iss, update) // 10 seconds

    function iss() {
    fetch(url).then(res => res.json())
    .then((issData) => {
        console.log(issData) // TODO - display data on web page
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        // create marker if it does not exist
        // move marker if it does exist
        if (!issMarker){
            // create marker
            issMarker = L.marker([lat, long], {icon:icon}).addTo(map)
        }else{
            issMarker.setLatLng( [lat, long] )
        }
        let now = new Date()
        timeIssLocationFetched.innerHTML = `This date was fetched at ${now}`
    }).catch((err) => {
    console.log('ERROR!', err)
    })
    }

