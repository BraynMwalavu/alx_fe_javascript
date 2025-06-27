// === Default Quotes ===
let quotes = [
  {
    text: "Self-development isn’t a sprint toward perfection. It’s a slow layering of self-awareness, courage, forgiveness, and discipline.",
    author: "Brian Mwalavu",
    categories: ["Self-Awareness", "Discipline", "Emotional Growth"]
  },
  {
    text: "Discipline equals freedom.",
    author: "Jocko Willink",
    categories: ["Discipline", "Leadership"]
  },
  {
    text: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    categories: ["Courage", "Fear", "Growth"]
  }
];

// === DOM Elements ===
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const authorFilter = document.getElementById("authorFilter");
const newQuoteBtn = document.getElementById("newQuote");
const syncNowBtn = document.getElementById("syncNowBtn");
const quoteTextInput = document.getElementById("quoteText");
const quoteAuthorInput = document.getElementById("quoteAuthor");
const quoteCategoryInput = document.getElementById("quoteCategory");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const syncStatus = document.getElementById("syncStatus");

// === Populate Filters ===
function populateFilters() {
  // Clear existing
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  authorFilter.innerHTML = `<option value="all">All Authors</option>`;

  const authors = new Set();
  const categories = new Set();

  quotes.forEach(q => {
    authors.add(q.author);
    q.categories.forEach(c => categories.add(c));
  });

  // Add authors
  [...authors].sort().forEach(author => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    authorFilter.appendChild(option);
  });

  // Add categories
  [...categories].sort().forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// === Display a Quote ===
function displayQuote(quote) {
  quoteDisplay.innerHTML = `
    <p class="quote-text">“${quote.text}”</p>
    <p class="quote-author">— ${quote.author}</p>
    <p class="quote-tags">
      ${quote.categories.map(cat => `<span class="tag">${cat}</span>`).join(" ")}
    </p>
  `;
}

// === Get Filtered Quotes ===
function getFilteredQuotes() {
  const selectedAuthor = authorFilter.value;
  const selectedCategory = categoryFilter.value;

  return quotes.filter(q => {
    const matchAuthor = selectedAuthor === "all" || q.author === selectedAuthor;
    const matchCategory = selectedCategory === "all" || q.categories.includes(selectedCategory);
    return matchAuthor && matchCategory;
  });
}

// === Show New Random Quote ===
function showNewQuote() {
  const filtered = getFilteredQuotes();
  if (filtered.length === 0) {
    quoteDisplay.innerHTML = `<p>No quotes found for selected filters.</p>`;
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  displayQuote(random);
}

// === Add New Quote ===
function addNewQuote() {
  const text = quoteTextInput.value.trim();
  const author = quoteAuthorInput.value.trim() || "Unknown";
  const rawCategories = quoteCategoryInput.value.trim();

  if (!text || !rawCategories) {
    alert("Please enter both quote text and at least one category.");
    return;
  }

  const categories = rawCategories.split(",").map(c => c.trim()).filter(c => c);

  quotes.push({ text, author, categories });

  quoteTextInput.value = "";
  quoteAuthorInput.value = "";
  quoteCategoryInput.value = "";

  populateFilters();
  showNewQuote();
}

// === Sync Status Display ===
function showStatus(message, success = true) {
  syncStatus.style.display = "block";
  syncStatus.style.color = success ? "green" : "red";
  syncStatus.textContent = message;
  setTimeout(() => syncStatus.style.display = "none", 3000);
}

// === Export Quotes ===
function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
  showStatus("Quotes exported.");
}

// === Import Quotes ===
importFile.addEventListener("change", function () {
  const file = importFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes = imported;
        populateFilters();
        showNewQuote();
        showStatus("Quotes imported successfully.");
      } else {
        throw new Error("Invalid file format");
      }
    } catch (err) {
      showStatus("Import failed. Invalid JSON.", false);
    }
  };

  reader.readAsText(file);
});

// === Event Listeners ===
newQuoteBtn.addEventListener("click", showNewQuote);
addQuoteBtn.addEventListener("click", addNewQuote);
exportBtn.addEventListener("click", exportQuotes);
categoryFilter.addEventListener("change", showNewQuote);
authorFilter.addEventListener("change", showNewQuote);
syncNowBtn.addEventListener("click", () => {
  populateFilters();
  showNewQuote();
  showStatus("Quote list refreshed.");
});

// === Init ===
populateFilters();
showNewQuote();
