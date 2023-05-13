
// Array of jokes
var jokes = [
  "Why did the bicycle fall over? Because it was two tired!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What did the grape say when it got stepped on? Nothing, it just let out a little wine.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "What do you call an alligator in a vest? An investi-gator.",
  "Why did the chicken cross the playground? To get to the other slide.",
  "Why do seagulls fly over the sea? Because if they flew over the bay, they would be bagels.",
  "Why did the cookie go to the doctor? Because it was feeling crummy.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "What do you get when you cross a snowman and a shark? Frostbite.",
  "What do you call a fake noodle? An impasta."
];

// Randomly select a joke from the array
var jokeIndex = Math.floor(Math.random() * jokes.length);
var joke = jokes[jokeIndex];

// Display the joke on the page
var jokeElement = document.getElementById("joke");
jokeElement.textContent = joke;
