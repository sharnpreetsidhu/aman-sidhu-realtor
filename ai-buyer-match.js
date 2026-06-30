const REALTOR_NAME = "Aman Sidhu";
const REALTOR_EMAIL = "sidhu.aman@century21.ca";
const REALTOR_PHONE = "778-869-6900";

let currentStep = 0;

const answers = {
  name: "",
  contact: "",
  budget: "",
  downPayment: "",
  monthlyPayment: "",
  bedrooms: "",
  area: "",
  mustHaves: "",
};

const questions = [
  {
    key: "name",
    title: "What’s your name?",
    subtitle: "This helps personalize your property match.",
    type: "input",
    placeholder: "Your name",
  },
  {
    key: "contact",
    title: "Where should Aman send your match?",
    subtitle: "Enter your phone number or email.",
    type: "input",
    placeholder: "Phone or email",
  },
  {
    key: "budget",
    title: "What is your approximate purchase budget?",
    subtitle: "Pick the closest range.",
    type: "options",
    options: [
      "Under $500K",
      "$500K - $700K",
      "$700K - $900K",
      "$900K - $1.1M",
      "$1.1M - $1.4M",
      "$1.4M+",
      "Not sure yet",
    ],
  },
  {
    key: "downPayment",
    title: "How much do you have for a down payment?",
    subtitle: "A rough estimate is fine.",
    type: "options",
    options: [
      "Under $50K",
      "$50K - $100K",
      "$100K - $150K",
      "$150K - $250K",
      "$250K+",
      "Not sure yet",
    ],
  },
  {
    key: "monthlyPayment",
    title: "What monthly payment feels comfortable?",
    subtitle: "This is not mortgage advice, just a planning estimate.",
    type: "options",
    options: [
      "Under $2,500",
      "$2,500 - $3,500",
      "$3,500 - $4,500",
      "$4,500 - $5,500",
      "$5,500+",
      "Not sure yet",
    ],
  },
  {
    key: "bedrooms",
    title: "How many bedrooms do you need?",
    subtitle: "Choose your minimum preference.",
    type: "options",
    options: ["1", "2", "3", "4+", "Flexible"],
  },
  {
    key: "area",
    title: "Where do you want to buy?",
    subtitle: "Pick the closest option.",
    type: "options",
    options: [
      "Surrey",
      "Langley",
      "Delta",
      "White Rock",
      "Burnaby",
      "New Westminster",
      "Coquitlam",
      "Richmond",
      "Vancouver",
      "Abbotsford",
      "Open to suggestions",
    ],
  },
  {
    key: "mustHaves",
    title: "Any must-haves?",
    subtitle:
      "Example: yard, parking, basement suite, newer build, schools, transit, rental potential.",
    type: "textarea",
    placeholder: "Write anything important here...",
  },
];

const questionBox = document.getElementById("questionBox");
const progressBar = document.getElementById("progressBar");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");

function renderQuestion() {
  const q = questions[currentStep];

  progressBar.style.width = `${((currentStep + 1) / questions.length) * 100}%`;

  backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.textContent =
    currentStep === questions.length - 1 ? "Generate Match" : "Next";

  let inputHTML = "";

  if (q.type === "options") {
    inputHTML = `
      <div class="option-grid">
        ${q.options
          .map(
            (option) => `
              <button type="button" class="option ${
                answers[q.key] === option ? "selected" : ""
              }" data-value="${option}">
                ${option}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (q.type === "input") {
    inputHTML = `
      <input
        id="answerInput"
        value="${answers[q.key]}"
        placeholder="${q.placeholder}"
      />
    `;
  }

  if (q.type === "textarea") {
    inputHTML = `
      <textarea
        id="answerInput"
        placeholder="${q.placeholder}"
      >${answers[q.key]}</textarea>
    `;
  }

  questionBox.innerHTML = `
    <div class="question-step">
      <h2>${q.title}</h2>
      <p>${q.subtitle}</p>
      ${inputHTML}
    </div>
  `;

  document.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => {
      answers[q.key] = btn.dataset.value;
      renderQuestion();
    });
  });
}

function saveCurrentAnswer() {
  const q = questions[currentStep];
  const input = document.getElementById("answerInput");

  if (input) {
    answers[q.key] = input.value.trim();
  }
}

function getMatches() {
  const matches = [];

  if (answers.budget === "Under $500K") {
    matches.push("Condo in Surrey, Langley, New Westminster, or Abbotsford");
    matches.push("Starter condo in select parts of the Lower Mainland");
    matches.push(
      "Consider increasing budget or widening your area if you need more bedrooms"
    );
  } else if (answers.budget === "$500K - $700K") {
    matches.push("Condo in Burnaby, Richmond, Surrey, Langley, or New Westminster");
    matches.push("Larger condo or older townhouse in Surrey, Langley, or Abbotsford");
    matches.push("Townhouse options may be limited depending on bedrooms and strata fees");
  } else if (answers.budget === "$700K - $900K") {
    matches.push("Townhouse in Surrey, Langley, Delta, or Abbotsford");
    matches.push("Larger condo in Burnaby, Richmond, or Coquitlam");
    matches.push("Older detached home may be possible farther east depending on condition");
  } else if (answers.budget === "$900K - $1.1M") {
    matches.push("Townhouse in Surrey, Langley, Delta, or Coquitlam");
    matches.push("Entry-level detached home in Abbotsford or some parts of Surrey");
    matches.push("Family-sized townhouse if you need 3+ bedrooms");
  } else if (answers.budget === "$1.1M - $1.4M") {
    matches.push("Detached home in Surrey, Langley, Delta, or Abbotsford");
    matches.push("Higher-end townhouse in Burnaby, Richmond, or Coquitlam");
    matches.push("Family home options depending on lot size, age, and location");
  } else if (answers.budget === "$1.4M+") {
    matches.push("Detached home in many Lower Mainland communities");
    matches.push("Larger family home in Surrey, Langley, Delta, or Coquitlam");
    matches.push("More premium location options depending on your must-haves");
  } else {
    matches.push("Start with a mortgage pre-approval to confirm your real buying range");
    matches.push("Compare condos, townhomes, and detached homes across multiple areas");
    matches.push("Aman can help narrow your options once your budget is clearer");
  }

  return matches;
}

function getAreaAdvice() {
  if (answers.area === "Abbotsford") {
    return "Abbotsford can be a strong option if you want more space for the money and are open to being farther east.";
  }

  if (answers.area === "Surrey") {
    return "Surrey usually gives buyers a wide mix of condos, townhomes, and detached homes across different price points.";
  }

  if (answers.area === "Langley") {
    return "Langley can be a good fit for newer communities, townhomes, and buyers wanting a suburban feel.";
  }

  if (["Burnaby", "Richmond", "Vancouver"].includes(answers.area)) {
    return "This area can be more competitive, so condos or townhomes may be more realistic depending on your budget.";
  }

  if (answers.area === "Open to suggestions") {
    return "Since you are open to suggestions, the best move is to compare areas by budget, commute, bedrooms, and property type.";
  }

  return `${answers.area} may be a good fit depending on your budget, property type, commute, and current inventory.`;
}

function getBudgetNote() {
  if (
    answers.monthlyPayment === "Under $2,500" ||
    answers.downPayment === "Under $50K"
  ) {
    return "Your monthly payment or down payment range may limit options, so condos or lower-priced areas may be more realistic to start.";
  }

  if (
    answers.monthlyPayment === "$5,500+" ||
    answers.downPayment === "$250K+"
  ) {
    return "Your payment comfort or down payment may give you more flexibility, but you should still confirm numbers with a mortgage professional.";
  }

  return "Your budget should be reviewed with a mortgage professional so you know what price range is realistic before viewing homes.";
}

function generateResult() {
  const matches = getMatches();

  const leadSummary = `
Smart Property Match Lead:
Name: ${answers.name}
Contact: ${answers.contact}
Budget: ${answers.budget}
Down Payment: ${answers.downPayment}
Monthly Payment Comfort: ${answers.monthlyPayment}
Bedrooms: ${answers.bedrooms}
Preferred Area: ${answers.area}
Must-Haves: ${answers.mustHaves}

Suggested Matches:
${matches.map((match, index) => `${index + 1}. ${match}`).join("\n")}
`;

  document.querySelector(".ai-card").classList.add("hidden");
  resultBox.classList.remove("hidden");

  resultBox.innerHTML = `
    <div class="result-top">
      <div>
        <p class="eyebrow">Your Smart Property Match</p>
        <h2>Your best starting options</h2>
        <p>
          Based on your budget, down payment, monthly comfort range, bedroom needs,
          and preferred area, these are the property types and locations worth exploring first.
        </p>
      </div>
    </div>

    <h3>Top matches</h3>
    <ul>
      ${matches.map((match) => `<li>${match}</li>`).join("")}
    </ul>

    <h3>Area insight</h3>
    <p>${getAreaAdvice()}</p>

    <h3>Budget note</h3>
    <p>${getBudgetNote()}</p>

    <h3>Next step</h3>
    <p>
      This is only a planning tool, not financial, mortgage, or appraisal advice.
      Aman can help compare real listings and connect you with the right next steps.
    </p>

    <div class="cta-result">
      <h3>Send this match to ${REALTOR_NAME}</h3>
      <p>
        Aman can review your match and help you understand what is actually available in the current market.
      </p>
      <a href="mailto:${REALTOR_EMAIL}?subject=Smart Property Match Lead&body=${encodeURIComponent(
    leadSummary
  )}">
        Email My Property Match
      </a>
    </div>
  `;
}

nextBtn.addEventListener("click", () => {
  saveCurrentAnswer();

  if (currentStep < questions.length - 1) {
    currentStep++;
    renderQuestion();
  } else {
    generateResult();
  }
});

backBtn.addEventListener("click", () => {
  saveCurrentAnswer();

  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
});

renderQuestion();