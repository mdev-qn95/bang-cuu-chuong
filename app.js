const question = document.getElementById("question");
const choices = document.getElementById("choices");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");
const starsEl = document.getElementById("stars");
const tableSelect = document.getElementById("table");
const resetBtn = document.getElementById("resetBtn");

let score = Number(localStorage.getItem("score")) || 0;
let stars = Number(localStorage.getItem("stars")) || 0;
let locked = false;

updateUI();
nextQuestion();

tableSelect.onchange = nextQuestion;

resetBtn.onclick = () => {
  score = 0;
  stars = 0;
  save();
  updateUI();
  nextQuestion();
};

function nextQuestion() {
  locked = false;
  message.innerText = "";

  const table = Number(tableSelect.value);
  const b = Math.floor(Math.random() * 9) + 1;
  const correct = table * b;

  question.innerText = `${table} × ${b} = ?`;

  let answers = new Set([correct]);
  while (answers.size < 3) {
    let wrong = correct + Math.floor(Math.random() * 5) - 2;
    if (wrong > 0) answers.add(wrong);
  }

  choices.innerHTML = "";
  [...answers]
    .sort(() => Math.random() - 0.5)
    .forEach(val => {
      const btn = document.createElement("button");
      btn.innerText = val;
      btn.onclick = () => checkAnswer(val, correct, btn);
      choices.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
  if (locked) return;
  locked = true;

  if (selected === correct) {
    btn.style.background = "#4caf50";
    message.innerText = "🎉 Giỏi quá!";
    score++;

    if (score % 5 === 0) {
      stars++;
      message.innerText = "🌟 Bé nhận thêm 1 sao!";
    }
  } else {
    btn.style.background = "#f44336";
    message.innerText = `😢 Sai rồi! ${correct}`;
  }

  save();
  updateUI();

  setTimeout(nextQuestion, 1000);
}

function updateUI() {
  scoreEl.innerText = `⭐ Điểm: ${score}`;
  starsEl.innerText = `🌟 Sao thưởng: ${stars}`;
}

function save() {
  localStorage.setItem("score", score);
  localStorage.setItem("stars", stars);
}