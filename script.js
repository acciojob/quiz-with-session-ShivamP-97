const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      if (userAnswers[i] === choice) {
		  input.checked = true;
		  input.setAttribute("checked", "true"); 
	  }

      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

renderQuestions();

submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
