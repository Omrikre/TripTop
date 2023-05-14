const tripData = {
"NumberOfAttractionsPerDay": 3,
"amountOfDays": 2,
"days": [
    {
    "attractions": [
        {
        "name": "Sensoji Temple",
        "description": "One of Tokyo's most famous and colorful temples located in the historic Asakusa district.",
        "startTime": "09:00",
        "endTime": "11:00",
        "orderInDay": 0
        },
        {
        "name": "Tsukiji Fish Market",
        "description": "One of the world's largest fish markets with a lively atmosphere and fresh seafood.",
        "startTime": "12:00",
        "endTime": "14:00",
        "orderInDay": 1
        },
        {
        "name": "Tokyo Skytree",
        "description": "The tallest tower in the world offering panoramic views of Tokyo from its observation decks.",
        "startTime": "16:00",
        "endTime": "18:00",
        "orderInDay": 2
        }
    ],
    "orderInTrip": 0
    },
    {
    "attractions": [
        {
        "name": "Meiji Shrine",
        "description": "A serene Shinto shrine located in a forested park in the heart of Tokyo.",
        "startTime": "09:00",
        "endTime": "11:00",
        "orderInDay": 0
        },
        {
        "name": "Shibuya Crossing",
        "description": "One of the busiest and most iconic intersections in the world, located in the trendy Shibuya neighborhood.",
        "startTime": "12:00",
        "endTime": "14:00",
        "orderInDay": 1
        },
        {
        "name": "Harajuku",
        "description": "A colorful and fashionable neighborhood known for its street style and cute cafes.",
        "startTime": "16:00",
        "endTime": "18:00",
        "orderInDay": 2
        }
    ],
    "orderInTrip": 1
    }
],
"destination": "Tokyo",
"excludeCategories": [],
"includeCategories": ["temples", "markets", "observation-decks", "parks", "neighborhoods"],
"startDate": "2023-06-01",
"endDate": "2023-06-02"
};
tripData.isConstTrip = true;

