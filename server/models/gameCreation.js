const mongoose = require('mongoose');

const createdGamesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  host: {
    type: Object,
    required: true
  },
  players: {
    type: Array,
    required: true
  },
  positions: {
    type: Object
  },
  theme: {
    type: Array,
    default: [{
      "id": 1,
      "Color": "blue",
      "Name": "Start",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "",
      "flag": "",
      "house": {}
    },
    {
      "id": 2,
      "Color": "red",
      "Name": "England",
      "price": 2500,
      "rent": 400,
      "matching": "red",
      "landMark": "England.jpg",
      "flag": "England.jpg",
      "house": { "1House": 1200, "2House": 2500, "3House": 4000, "Hotel": 5500 }
    },
    {
      "id": 3,
      "Color": "green",
      "Name": "Iraq",
      "price": 5000,
      "rent": 500,
      "matching": "green",
      "landMark": "Iraq.jpg",
      "flag": "Iraq.png",
      "house": { "1House": 1000, "2House": 2200, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 4,
      "Color": "gray",
      "Name": "Waterways",
      "price": 9500,
      "rent": 500,
      "matching": "roadways",
      "landMark": "Waterways.jpg",
      "flag": "Waterways.png",
      "house": {}
    },
    {
      "id": 5,
      "Color": "blue",
      "Name": "UNO",
      "price": 0,
      "rent": 500,
      "matching": "",
      "landMark": "UNO.jpg",
      "flag": "UNO.jpg",
      "house": {}
    },
    {
      "id": 6,
      "Color": "red",
      "Name": "France",
      "price": 2500,
      "rent": 350,
      "matching": "red",
      "landMark": "France.jpg",
      "flag": "France.jpg",
      "house": { "1House": 800, "2House": 2200, "3House": 3900, "Hotel": 5000 }
    },
    {
      "id": 7,
      "Color": "green",
      "Name": "Iran",
      "price": 2500,
      "rent": 200,
      "matching": "",
      "landMark": "Iran.jpg",
      "flag": "Iran.jpg",
      "house": { "1House": 800, "2House": 1800, "3House": 3000, "Hotel": 4200 }
    },
    {
      "id": 8,
      "Color": "gray",
      "Name": "Satellite",
      "price": 2500,
      "rent": 200,
      "matching": "Petroleum",
      "landMark": "Satellite.jpg",
      "flag": "Satellite.jpg",
      "house": {}
    },
    {
      "id": 9,
      "Color": "green",
      "Name": "Egypt",
      "price": 3200,
      "rent": 400,
      "matching": "",
      "landMark": "Egypt.jpg",
      "flag": "Egypt.jpg",
      "house": { "1House": 1000, "2House": 2200, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 10,
      "Color": "green",
      "Name": "Resort",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "",
      "flag": "",
      "house": {}
    },
    {
      "id": 11,
      "Color": "yellow",
      "Name": "Canada",
      "price": 4000,
      "rent": 300,
      "matching": "",
      "landMark": "Canada.jpg",
      "flag": "Canada.jpg",
      "house": { "1House": 1000, "2House": 2400, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 12,
      "Color": "red",
      "Name": "Germany",
      "price": 3500,
      "rent": 300,
      "matching": "",
      "landMark": "Germany.jpg",
      "flag": "Germany.png",
      "house": { "1House": 1200, "2House": 2400, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 13,
      "Color": "gray",
      "Name": "Airways",
      "price": 10500,
      "rent": 1050,
      "matching": "Railways",
      "landMark": "Airways.jpg",
      "flag": "Airways.png",
      "house": {}
    },
    {
      "id": 14,
      "Color": "gray",
      "Name": "Coustom",
      "price": 0,
      "rent": 200,
      "matching": "",
      "landMark": "customDuty.jpg",
      "flag": "customDuty.jpg",
      "house": {}
    },
    {
      "id": 15,
      "Color": "red",
      "Name": "Switzerland",
      "price": 3500,
      "rent": 400,
      "matching": "",
      "landMark": "Switzerland.jpg",
      "flag": "Switzerland.jpg",
      "house": { "1House": 1200, "2House": 2400, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 16,
      "Color": "yellow",
      "Name": "Brazil",
      "price": 2500,
      "rent": 300,
      "matching": "",
      "landMark": "Brazil.jpg",
      "flag": "Brazil.png",
      "house": { "1House": 1000, "2House": 2400, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 17,
      "Color": "yellow",
      "Name": "Chance",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "Chance.jpg",
      "flag": "Chance.jpg",
      "house": {}
    },
    {
      "id": 18,
      "Color": "red",
      "Name": "Italy",
      "price": 3500,
      "rent": 300,
      "matching": "",
      "landMark": "Italy.jpg",
      "flag": "Italy.png",
      "house": { "1House": 800, "2House": 2000, "3House": 3500, "Hotel": 4500 }
    },
    {
      "id": 19,
      "Color": "",
      "Name": "Party House",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "Italy.jpg",
      "flag": "Italy.png",
      "house": {}
    },
    {
      "id": 20,
      "Color": "blue",
      "Name": "Japan",
      "price": 2500,
      "rent": 400,
      "matching": "",
      "landMark": "Japan.jpeg",
      "flag": "Japan.png",
      "house": { "1House": 1200, "2House": 2400, "3House": 3800, "Hotel": 5500 }
    },
    {
      "id": 21,
      "Color": "yellow",
      "Name": "USA",
      "price": 8500,
      "rent": 900,
      "matching": "",
      "landMark": "USA.jpg",
      "flag": "USA.png",
      "house": { "1House": 2000, "2House": 3800, "3House": 5900, "Hotel": 10000 }
    },
    {
      "id": 22,
      "Color": "gray",
      "Name": "Duty",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "TransportDuty.jpg",
      "flag": "TransportDuty.jpg",
      "house": {}
    },
    {
      "id": 23,
      "Color": "gray",
      "Name": "Roadways",
      "price": 3500,
      "rent": 500,
      "matching": "Waterways",
      "landMark": "Roadways.jpg",
      "flag": "Roadways.jpg",
      "house": {}
    },
    {
      "id": 24,
      "Color": "yellow",
      "Name": "Mexico",
      "price": 4000,
      "rent": 400,
      "matching": "",
      "landMark": "Mexico.jpg",
      "flag": "Mexico.png",
      "house": { "1House": 1200, "2House": 2400, "3House": 3800, "Hotel": 4900 }
    },
    {
      "id": 25,
      "Color": "blue",
      "Name": "Hongkong",
      "price": 2000,
      "rent": 200,
      "matching": "",
      "landMark": "Hongkong.jpg",
      "flag": "Hongkong.png",
      "house": { "1House": 1100, "2House": 2200, "3House": 3300, "Hotel": 4400 }
    },
    {
      "id": 26,
      "Color": "blue",
      "Name": "UNO",
      "price": 0,
      "rent": 500,
      "matching": "",
      "landMark": "UNO.jpg",
      "flag": "UNO.jpg",
      "house": {}
    },
    {
      "id": 27,
      "Color": "yellow",
      "Name": "Australia",
      "price": 3300,
      "rent": 400,
      "matching": "",
      "landMark": "AustraliaLand.jpg",
      "flag": "Australia.png",
      "house": { "1House": 1200, "2House": 2400, "3House": 3600, "Hotel": 4400 }
    },
    {
      "id": 28,
      "Color": "",
      "Name": "Jail",
      "price": 0,
      "rent": 500,
      "matching": "",
      "landMark": "",
      "flag": "",
      "house": {}
    },
    {
      "id": 29,
      "Color": "blue",
      "Name": "India",
      "price": 4500,
      "rent": 400,
      "matching": "",
      "landMark": "India.jpg",
      "flag": "India.jpg",
      "house": { "1House": 1500, "2House": 2900, "3House": 4200, "Hotel": 5500 }
    },
    {
      "id": 30,
      "Color": "yellow",
      "Name": "Chance",
      "price": 0,
      "rent": 0,
      "matching": "",
      "landMark": "Chance.jpg",
      "flag": "Chance.jpg",
      "house": {}
    },
    {
      "id": 31,
      "Color": "green",
      "Name": "Saudiarabia",
      "price": 5500,
      "rent": 500,
      "matching": "",
      "landMark": "Saudiarabia.jpg",
      "flag": "Saudiarabia.jpg",
      "house": { "1House": 1500, "2House": 2500, "3House": 4500, "Hotel": 5500 }
    },
    {
      "id": 32,
      "Color": "gray",
      "Name": "Petroleum",
      "price": 5500,
      "rent": 500,
      "matching": "Satellite",
      "landMark": "Petroleum.jpg",
      "flag": "Petroleum.jpg",
      "house": {}
    },
    {
      "id": 33,
      "Color": "blue",
      "Name": "China",
      "price": 4500,
      "rent": 500,
      "matching": "",
      "landMark": "China.jpg",
      "flag": "China.jpg",
      "house": { "1House": 1200, "2House": 2300, "3House": 4500, "Hotel": 5500 }
    },
    {
      "id": 34,
      "Color": "gray",
      "Name": "Railways",
      "price": 9500,
      "rent": 1000,
      "matching": "Airways",
      "landMark": "Railways.jpg",
      "flag": "Railways.jpg",
      "house": {}
    },
    {
      "id": 35,
      "Color": "green",
      "Name": "Malaysia",
      "price": 1500,
      "rent": 200,
      "matching": "",
      "landMark": "Malaysia.jpg",
      "flag": "Malaysia.jpg",
      "house": { "1House": 800, "2House": 1800, "3House": 3200, "Hotel": 4500 }
    },
    {
      "id": 36,
      "Color": "blue",
      "Name": "Singapore",
      "price": 3000,
      "rent": 300,
      "matching": "",
      "landMark": "Singapore.jpg",
      "flag": "Singapore.png",
      "house": { "1House": 1000, "2House": 2200, "3House": 3500, "Hotel": 5000 }
    }
    ]
  },

});

module.exports = mongoose.model("createdGames", createdGamesSchema)