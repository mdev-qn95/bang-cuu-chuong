const question = document.getElementById("question");
const choices = document.getElementById("choices");
const message = document.getElementById("message");
const scoreEl = document.getElementById("score");
const tableSelect = document.getElementById("table");

let score = 0;

function nextQuestion() {
  message.innerText = "";

  const table = Number(tableSelect.value);
  const b = Math.floor(Math.random() * 9) + 1;
  const correct = table * b;

  question.innerText = `${table} × ${b} = ?`;

  let answers = new Set();
  answers.add(correct);

  while (answers.size < 3) {
    let wrong = correct + Math.floor(Math.random() * 5) - 2;
    if (wrong > 0) answers.add(wrong);
  }

  const shuffled = [...answers].sort(() => Math.random() - 0.5);

  choices.innerHTML = "";
  shuffled.forEach(val => {
    const btn = document.createElement("button");
    btn.innerText = val;
    btn.onclick = () => checkAnswer(val, correct);
    choices.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    message.innerText = "🎉 Giỏi quá!";
    score++;
  } else {
    message.innerText = `😢 Sai rồi! Đáp án là ${correct}`;
  }
  scoreEl.innerText = `⭐ Điểm: ${score}`;
}

nextQuestion();