const question = document.getElementById("question");
const choices = document.getElementById("choices");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");
const tableSelect = document.getElementById("table");

const toggleWrongBtn = document.getElementById("toggleWrong");
const wrongListEl = document.getElementById("wrongList");

let score = 0;
let locked = false;
let currentCorrect = 0;
let currentQuestionText = "";
let wrongQuestions = [];

nextQuestion();

tableSelect.onchange = nextQuestion;

toggleWrongBtn.onclick = () => {
  wrongListEl.style.display =
    wrongListEl.style.display === "none" ? "block" : "none";
  renderWrongList();
};

function nextQuestion() {
  locked = false;
  message.innerText = "";

  const table = Number(tableSelect.value);
  const b = Math.floor(Math.random() * 9) + 1;
  currentCorrect = table * b;
  currentQuestionText = `${table} × ${b}`;

  question.innerText = `${currentQuestionText} = ?`;

  let answers = new Set([currentCorrect]);
  while (answers.size < 4) {
    let wrong = currentCorrect + Math.floor(Math.random() * 7) - 3;
    if (wrong > 0) answers.add(wrong);
  }

  choices.innerHTML = "";
  [...answers]
    .sort(() => Math.random() - 0.5)
    .forEach(val => {
      const btn = document.createElement("button");
      btn.innerText = val;
      btn.onclick = () => checkAnswer(val, btn);
      choices.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
  if (locked) return;

  if (selected === currentCorrect) {
    btn.style.background = "#4caf50";
    message.innerText = "🎉 Giỏi quá!";
    score++;
    scoreEl.innerText = `⭐ Điểm: ${score}`;

    locked = true;
    setTimeout(nextQuestion, 800);
  } else {
    btn.style.background = "#f44336";
    message.innerText = "😢 Chưa đúng, thử lại nhé!";

    // 👉 Ghi nhận câu sai (chỉ ghi 1 lần mỗi câu)
    const exists = wrongQuestions.find(
      q => q.question === currentQuestionText
    );
    if (!exists) {
      wrongQuestions.push({
        question: currentQuestionText,
        correct: currentCorrect
      });
    }
  }
}

function renderWrongList() {
  wrongListEl.innerHTML = "";

  if (wrongQuestions.length === 0) {
    wrongListEl.innerHTML = "<li>🎉 Bé chưa làm sai câu nào</li>";
    return;
  }

  wrongQuestions.forEach(q => {
    const li = document.createElement("li");
    li.innerText = `${q.question} = ${q.correct}`;
    wrongListEl.appendChild(li);
  });
}