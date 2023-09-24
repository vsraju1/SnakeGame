// Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSOund = new Audio("./music/music.mp3");
let speed = 4;
let lastPaintTime = 0;
let score = 0;
let scoreDisplay = document.querySelector(".score");
// let hiscorebox = document.querySelector("#hiscorebox");
let snakeArre = [{ x: 9, y: 9 }];
let food = { x: 13, y: 15 };

// Game functions
const main = (ctime) => {
  window.requestAnimationFrame(main);
  if (score >= 3 && score < 6) {
    speed = 6;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  } else if (score >= 6 && score < 9) {
    speed = 8;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  } else if (score >= 9 && score < 12) {
    speed = 10;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  } else if (score >= 12 && score < 15) {
    speed = 12;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  } else if (score >= 15 && score < 18) {
    speed = 14;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  }else if (score >= 18) {
    speed = 16;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  }
  else {
    speed =4;
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
  }
  lastPaintTime = ctime;
  gameEngine();
};

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArre.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Part 1: Updating the Snake array and food
  // i. If snake got collided with walls or by itself
  if (isCollide(snakeArre)) {
    gameOverSound.play();
    // musicSOund.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!!");
    snakeArre = [{ x: 9, y: 9 }];
    // musicSOund.play();
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
  }

  // ii. If snake has eaten the food, then score should increase and regenerate the food
  if (snakeArre[0].y === food.y && snakeArre[0].x === food.x) {
    foodSound.play();
    score += 1;
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;

    }
    scoreDisplay.innerHTML = "Score: " + score;
    snakeArre.unshift({
      x: snakeArre[0].x + inputDir.x,
      y: snakeArre[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArre.length - 2; i >= 0; i--) {
    snakeArre[i + 1] = { ...snakeArre[i] };
  }
  snakeArre[0].x += inputDir.x;
  snakeArre[0].y += inputDir.y;

  // Part 2: Display the snake and food
  // i. Display the snake
  board.innerHTML = "";
  snakeArre.forEach((element, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // ii. Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "Hiscore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  // musicSOund.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp button clicked");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      // console.log("ArrowDown key pressed");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      // console.log("ArrowRight button clicked");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
