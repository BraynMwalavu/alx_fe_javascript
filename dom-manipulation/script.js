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
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");

// ===== 3. Local Storage =====
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  if (saved) {
    quotes.length = 0;
    quotes.push(...JSON.parse(saved));
  }
}

// ===== 4. Display a Random Quote =====
function showRandomQuote() {
  quoteDisplay.innerHTML = "";

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

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ===== 5. Add a New Quote =====
function addQuote() {
  const newText = quoteTextInput.value.trim();
  const newCategory = quoteCategoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  saveQuotes();

  quoteDisplay.innerHTML = "";
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${newQuote.text}"`;
  quoteText.style.fontStyle = "italic";

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `– ${newQuote.category}`;
  quoteCategory.style.fontWeight = "bold";

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  populateCategories();
  filterQuotes();
}

// ===== 6. Export to JSON =====
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ===== 7. Import from JSON =====
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Error parsing file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ===== 8. Filter by Category =====
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
    filterQuotes();
  }
}

function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);

  quoteDisplay.innerHTML = "";

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No quotes in this category.";
    quoteDisplay.appendChild(msg);
    return;
  }

  filtered.forEach(quote => {
    const text = document.createElement("p");
    text.textContent = `"${quote.text}"`;
    text.style.fontStyle = "italic";

    const category = document.createElement("p");
    category.textContent = `– ${quote.category}`;
    category.style.fontWeight = "bold";

    quoteDisplay.appendChild(text);
    quoteDisplay.appendChild(category);
  });
}

// ===== 9. Sync with Simulated Server =====
async function syncWithServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Simulate server quote structure using only first 5 items
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Conflict resolution: overwrite local with server data
    quotes.length = 0;
    quotes.push(...serverQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();

    alert("Synced with server. Server quotes have replaced local data.");
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

// Periodically sync every 2 minutes
setInterval(syncWithServer, 2 * 60 * 1000);

// ===== 10. Added Quote form =====
function createAddQuoteForm() {
  console.log("createAddQuoteForm called — static form used.");
}
createAddQuoteForm();

// ===== 11. Event Listeners =====
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
exportBtn.addEventListener("click", exportToJson);
importFile.addEventListener("change", importFromJsonFile);
categoryFilter.addEventListener("change", filterQuotes);

// ===== 12. Initial Load =====
loadQuotes();
populateCategories();
showRandomQuote();
