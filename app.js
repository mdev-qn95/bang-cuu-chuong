const question = document.getElementById("question");
const choices = document.getElementById("choices");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");
const tableSelect = document.getElementById("table");

let score = 0;
let locked = false;

nextQuestion();

tableSelect.onchange = nextQuestion;

function nextQuestion() {
  locked = false;
  message.innerText = "";

  const table = Number(tableSelect.value);
  const b = Math.floor(Math.random() * 9) + 1;
  const correct = table * b;

  question.innerText = `${table} × ${b} = ?`;

  let answers = new Set([correct]);

  while (answers.size < 4) {
    let wrong = correct + Math.floor(Math.random() * 7) - 3;
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
  } else {
    btn.style.background = "#f44336";
    message.innerText = `😢 Sai rồi! ${correct}`;
  }

  scoreEl.innerText = `⭐ Điểm: ${score}`;
  setTimeout(nextQuestion, 1000);
}