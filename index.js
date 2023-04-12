import * as levels from "./levels.js";
import * as knight from "./knight.js";
import * as index from "./index.js";
import * as drawlevel from "./drawlevel.js";
import * as helper from "./helper.js";

export const canvas = document.querySelector("#game");
export const ctx = canvas.getContext("2d");
const startGameButton = document.querySelector(".start-game-button");

export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
  AltLeft: false,
};

export const global = {
  inPlay: false,
  resetGame: false,
  level: 1,
  cellSize: 32,
  ROWS: 15,
  COLS: 15,
  walls: [],
  floors: [],
  doors: [],
  consumables: [],
  enemies: [],
  traps: [],
  environment: [],
  theme: new Audio("./audio/theme.wav"),
  gameoverTheme: new Audio("./audio/gameover-theme.mp3"),
  gameoverThemeReady: true,
};

startGameButton.addEventListener("click", handleStartGameButtonClick);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("visibilitychange", handleVisibilityChange);

function handleVisibilityChange() {
  setKeysToFalse();
}

export function gameOver() {
  createModal("You Died.");
  playGameoverMusic();
}

function playGameoverMusic() {
  global.theme.pause();
  global.theme.currentTime = 0;
  const audio = global.gameoverTheme;

  if (global.gameoverThemeReady) {
    global.gameoverThemeReady = false;
    audio.play();
    audio.volume = 0.01;
  }
}

export function createModal(str) {
  const exists = document.querySelector(".modal-container");
  if (!exists && !index.global.resetGame && !index.global.inPlay) {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    const wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(modalContainer);
    const modalText = document.createElement("span");
    modalText.classList.add("modal-text");
    modalText.innerText = str;
    wrapper.appendChild(modalText);
    const replayButton = document.createElement("button");
    replayButton.classList.add("replay-button");
    replayButton.innerText = "Replay";
    wrapper.appendChild(replayButton);
    replayButton.addEventListener("click", handleReplayButtonClick);
  }
}

function removeModal() {
  const replayButton = document.querySelector(".replay-button");
  const modalContainer = document.querySelector(".modal-container");
  const modalText = document.querySelector(".modal-text");
  modalText.remove();
  modalContainer.remove();
  replayButton.removeEventListener("click", handleReplayButtonClick);
  replayButton.remove();
}

function handleReplayButtonClick() {
  index.global.resetGame = true;
  global.theme.play();
  global.gameoverTheme.pause();
  global.gameoverTheme.currentTime = 0;
  removeModal();
  resetGame();
}

function resetGame() {
  resetGlobalDefaults();
  resetPlayerDefaults();
  resetConsoleDefaults();
}

function resetConsoleDefaults() {
  const keys = document.querySelectorAll(".console-key");
  keys.forEach((key) => (key.style.opacity = 0.4));
  const blood = document.querySelector(".health-blood");
  blood.style.height = "100%";
  const knightPortrait = document.querySelector(".knight-portrait");
  knightPortrait.src = "./images/knight-portrait.png";
}

function resetGlobalDefaults() {
  global.resetGame = false;
  global.inPlay = true;
  global.resetGame = false;
  global.level = 1;
  global.walls = [];
  global.floors = [];
  global.doors = [];
  global.consumables = [];
  global.enemies = [];
  global.traps = [];
  global.environment = [];
  global.gameoverThemeReady = true;
  drawlevel.drawLevel(levels.level1);
}

function resetPlayerDefaults() {
  player.x = 32;
  player.y = 0;
  player.sx = 0;
  player.sy = 0;
  player.count = 0;
  player.dead = false;
  player.health = 120;
  player.startDeathAnimation = false;
  player.direction = "right";
  player.keys = 0;
}

function detectAltTab() {
  if (keys.AltLeft) setKeysToFalse();
}

export function setKeysToFalse() {
  for (let key in keys) {
    keys[key] = false;
  }
}

function handleKeyDown(e) {
  if (index.global.inPlay) {
    let key = e.code;
    keys[key] = true;
  }
}

function handleKeyUp(e) {
  let key = e.code;
  keys[key] = false;
}

function handleStartGameButtonClick() {
  global.inPlay = true;
  global.theme.play();
  global.theme.volume = 0.1;
  global.theme.loop = true;
  const splashContainer = document.querySelector(".splash-container");
  splashContainer.remove();
}

export const player = new knight.Knight(32, 0);

drawlevel.drawLevel(levels.level1);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  global.floors.forEach((floor) => floor.update());
  global.walls.forEach((wall) => wall.update());
  global.doors.forEach((door) => door.update());
  global.consumables.forEach((consumable) => consumable.update());
  global.environment.forEach((item) => item.update());
  global.enemies.forEach((enemy) => enemy.update());
  player.update();
  global.traps.forEach((trap) => trap.update());
  helper.detectMovement();
  detectAltTab();
}

animate();
