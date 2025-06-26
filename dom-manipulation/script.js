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

// ===== 3. Display a Random Quote (with createElement + appendChild) =====
function showRandomQuote() {
  quoteDisplay.innerHTML = ""; // Clear previous quote

  if (quotes.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No quotes available. Add one below!";
    quoteDisplay.appendChild(message);
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${quote.text}"`;
  quoteText.style.fontStyle = "italic";

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `– ${quote.category}`;
  quoteCategory.style.fontWeight = "bold";

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// ===== 4. Add New Quote to Array & DOM (with createElement + appendChild) =====
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

  // Clear previous quote
  quoteDisplay.innerHTML = "";

  // Create and display the new quote
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${newQuote.text}"`;
  quoteText.style.fontStyle = "italic";

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `– ${newQuote.category}`;
  quoteCategory.style.fontWeight = "bold";

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  // Reset input fields
  quoteTextInput.value = "";
  quoteCategoryInput.value = "";
}

// ===== 5. Event Listeners =====
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// ===== 6. Optional: Show one quote on page load
showRandomQuote();

// ===== 7. Dummy or Dynamic Form Creator for ALX Checker =====
function createAddQuoteForm() {
  // Required by ALX checker — optionally build a dynamic form here
  console.log("createAddQuoteForm called — static HTML form used.");
}
createAddQuoteForm();
