let score = 0;
let missed = 0;
let gameRunning = false;
let spawnInterval;

const scoreText = document.getElementById("score");
const missedText = document.getElementById("missed");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const gameMessage = document.getElementById("gameMessage");

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  missed = 0;
  gameRunning = true;

  scoreText.textContent = score;
  missedText.textContent = missed;

  gameMessage.style.display = "none";
  startBtn.textContent = "Restart Game";

  const oldBones = document.querySelectorAll(".bone");
  oldBones.forEach(bone => bone.remove());

  clearInterval(spawnInterval);
  spawnInterval = setInterval(createBone, 850);
}

function createBone() {
  if (!gameRunning) return;

  const bone = document.createElement("div");
  bone.classList.add("bone");

  const gameWidth = gameArea.clientWidth;
  const randomX = Math.random() * (gameWidth - 70) + 20;

  bone.style.left = randomX + "px";
  bone.style.top = "40px";
  bone.style.transform = `rotate(${Math.random() * 80 - 40}deg)`;

  gameArea.appendChild(bone);

  let yPosition = 40;
  let fallSpeed = Math.random() * 2 + 2;

  const fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      return;
    }

    yPosition += fallSpeed;
    bone.style.top = yPosition + "px";

    if (yPosition > gameArea.clientHeight - 90) {
      bone.remove();
      clearInterval(fall);
      missed++;
      missedText.textContent = missed;

      if (missed >= 5) {
        endGame();
      }
    }
  }, 20);

  bone.addEventListener("click", () => {
    if (!gameRunning) return;

    score++;
    scoreText.textContent = score;

    bone.remove();
    clearInterval(fall);
  });
}

function endGame() {
  gameRunning = false;
  clearInterval(spawnInterval);

  const bones = document.querySelectorAll(".bone");
  bones.forEach(bone => bone.remove());

  gameMessage.innerHTML = `Game Over<br>Final Score: ${score}`;
  gameMessage.style.display = "flex";
}
