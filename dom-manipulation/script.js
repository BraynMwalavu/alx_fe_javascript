// ===== 1. Quotes Array =====
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" }
];

// ===== 2. DOM References =====
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteTextInput = document.getElementById("quoteText");
const quoteCategoryInput = document.getElementById("quoteCategory");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// ===== 3. Display a Random Quote =====
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Add one below!</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><em>"${randomQuote.text}"</em></p>
    <p><strong>– ${randomQuote.category}</strong></p>
  `;
}

// ===== 4. Add New Quote to Array & DOM =====
function addQuote() {
  const newText = quoteTextInput.value.trim();
  const newCategory = quoteCategoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = {
    text: newText,
    category: newCategory
  };

  quotes.push(newQuote);

  // Optionally display the new quote
  quoteDisplay.innerHTML = `
    <p><em>"${newQuote.text}"</em></p>
    <p><strong>– ${newQuote.category}</strong></p>
  `;

  quoteTextInput.value = "";
  quoteCategoryInput.value = "";
}

// ===== 5. Event Listeners =====
newQuoteBtn.addEventListener("click", displayRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// ===== 6. Optional: Display One Quote on Load =====
displayRandomQuote();
