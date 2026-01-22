let a = 2;
let b = 1;
let score = 0;

function next() {
  const table = Number(document.getElementById("table").value);
  b = Math.floor(Math.random() * 10) + 1;
  a = table;

  document.getElementById("question").innerText =
    `${a} × ${b} = ?`;

  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
}

function check() {
  const ans = Number(document.getElementById("answer").value);
  if (ans === a * b) {
    document.getElementById("result").innerText = "🎉 Giỏi quá!";
    score++;
  } else {
    document.getElementById("result").innerText =
      `😢 Sai rồi! Đáp án đúng là ${a * b}`;
  }
  document.getElementById("score").innerText = `Điểm: ${score}`;
}
