console.log('For this lab, please write the code requested at the //TODO markers.');

let iss_location = {
    "timestamp": 1515784140,
    "iss_position": {
        "latitude": "49.2167",
        "longitude": "100.5363"
    },
    "message": "success"
};

// TODO Extract the latitude value, and log it to the console.
console.log("Latitude:", iss_location.iss_position.latitude);

// TODO Extract the longitude value, and log it to the console.
console.log("Longitude:", iss_location.iss_position.longitude);

let rates = {
    "AUD": 1.5417,
    "BGN": 1.9558,
    "BRL": 3.8959,
    "CAD": 1.5194
};

// TODO write code to add a new property for Swiss Francs. Symbol is CHF, value is 1.1787.
rates.CHF = 1.1787;

// TODO if you had 100 Euros, write code to get the exchange rate from the object, then calculate
//      the equivalent value in Australian Dollars (AUD)
let euros = 100;
let audValue = euros * rates.AUD;
console.log("100 Euros in AUD:", audValue);

let cats_and_owners = [
    { name: "Bill Clinton", cat: "Socks" },
    { name: "Gary Oldman", cat: "Soymilk" },
    { name: "Katy Perry", cat: "Kitty Purry" },
    { name: "Snoop Dogg", cat: "Miles Davis" }
];

// TODO Taylor Swift's cat is called 'Meredith'. Write code to add this data to the array.
cats_and_owners.push({ name: "Taylor Swift", cat: "Meredith" });

// TODO write a loop to print each cat owner, and their cat's name, one per line.
cats_and_owners.forEach(owner => {
    console.log(`${owner.name}'s cat is called ${owner.cat}`);
});

// TODO print Gary Oldman's cat's name by reading the data in the appropriate array index.
console.log("Gary Oldman's cat:", cats_and_owners[1].cat);

// TODO print Gary Oldman's cat's name by looping over the array until you find the object with name = "Gary Oldman"
cats_and_owners.forEach(owner => {
    if (owner.name === "Gary Oldman") {
        console.log("Gary Oldman's cat:", owner.cat);
    }
});

let nobel_prize_winners_2017 = {
    "prizes": [
        {
            "year": "2017",
            "category": "physics",
            "laureates": [
                { "id": "941", "firstname": "Rainer", "surname": "Weiss" },
                { "id": "942", "firstname": "Barry C.", "surname": "Barish" },
                { "id": "943", "firstname": "Kip S.", "surname": "Thorne" }
            ]
        },
        {
            "year": "2017",
            "category": "chemistry",
            "laureates": [
                { "id": "944", "firstname": "Jacques", "surname": "Dubochet" },
                { "id": "945", "firstname": "Joachim", "surname": "Frank" },
                { "id": "946", "firstname": "Richard", "surname": "Henderson" }
            ]
        },
        {
            "year": "2017",
            "category": "medicine",
            "laureates": [
                { "id": "938", "firstname": "Jeffrey C.", "surname": "Hall" },
                { "id": "939", "firstname": "Michael", "surname": "Rosbash" },
                { "id": "940", "firstname": "Michael W.", "surname": "Young" }
            ]
        },
        {
            "year": "2017",
            "category": "literature",
            "laureates": [
                { "id": "947", "firstname": "Kazuo", "surname": "Ishiguro" }
            ]
        },
        {
            "year": "2017",
            "category": "peace",
            "laureates": [
                { "id": "948", "firstname": "International Campaign to Abolish Nuclear Weapons (ICAN)", "surname": "" }
            ]
        },
        {
            "year": "2017",
            "category": "economics",
            "laureates": [
                { "id": "949", "firstname": "Richard H.", "surname": "Thaler" }
            ]
        }
    ]
};

// TODO print the full name of the Literature Nobel laureate.
let literatureWinner = nobel_prize_winners_2017.prizes.find(prize => prize.category === "literature").laureates[0];
console.log("Literature Nobel Laureate:", literatureWinner.firstname, literatureWinner.surname);

// TODO print the ids of each of the Physics Nobel laureates.
nobel_prize_winners_2017.prizes.find(prize => prize.category === "physics").laureates.forEach(laureate => {
    console.log("Physics Nobel Laureate ID:", laureate.id);
});

// TODO write code to print the names of all of the prize categories.
nobel_prize_winners_2017.prizes.forEach(prize => {
    console.log("Prize category:", prize.category);
});

// TODO write code to print the total number of prize categories.
console.log("Total number of prize categories:", nobel_prize_winners_2017.prizes.length);

// TODO write code to count the total number of laureates from 2017.
let totalLaureates = nobel_prize_winners_2017.prizes.reduce((count, prize) => count + prize.laureates.length, 0);
console.log("Total number of laureates in 2017:", totalLaureates);
