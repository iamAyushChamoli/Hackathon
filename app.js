var hitVal = 0;
var timer = 60;
var score = 0;
var fruitData = [
  { name: 'Apple', image: 'res/static/fruits/apple.jpg' },
  { name: 'Banana', image: 'res/static/fruits/banana.png' },
  { name: 'Orange', image: 'res/static/fruits/orange.jpg' },
  { name: 'Berry', image: 'res/static/fruits/berry.jpg' },
  { name: 'Star fruit', image: 'res/static/fruits/star-fruit.jpg' },
  { name: 'Pineapple', image: 'res/static/fruits/pineapple.jpg' },
  { name: 'Pomegranate', image: 'res/static/fruits/pomegranate.jpg' }
];
function findClosestBubble(element) {
  while (element) {
    if (element.classList.contains('bubble')) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

function makeBubble() {
     var clutter = "";

  for (var i = 1; i <= 24; i++) {
    var rn = Math.floor(Math.random() * fruitData.length);
    var fruit = fruitData[rn];
    clutter += `<div class="bubble" data-fruit-index="${rn}">
                  <img src="${fruit.image}" alt="${fruit.name}">
                </div>`;
  }

  document.querySelector("#pbtm").innerHTML = clutter;
}

function getNewHit() {
    hitVal = Math.floor(Math.random() * fruitData.length);
     document.querySelector("#hitval").textContent = fruitData[hitVal].name;
}

function runTimer() {
    var timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            var gameOverSound = document.querySelector("#gameOverSound");
            if (gameOverSound) {
                gameOverSound.volume = 0.5;
                gameOverSound.play();
            }

            var gameOverContainer = document.createElement("div");
            gameOverContainer.id = "game-over-container";
            gameOverContainer.innerHTML = `
                <h1>Game Over</h1>
                <button id="playagain">Play Again</button>
            `;

            document.querySelector("#pbtm").innerHTML = ''; // Clear existing content
            document.querySelector("#pbtm").appendChild(gameOverContainer);
            document.querySelector("#playagain").addEventListener("click", function () {
                timer = 60;
                score = 0;
                makeBubble();
                runTimer();
                getNewHit();
            })
        }
    }, 1000)
}

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#pbtm").addEventListener("click", function (event) {
  var bubble = findClosestBubble(event.target);
  if (bubble) {
    var clickedFruitIndex = Number(bubble.dataset.fruitIndex);
    if (clickedFruitIndex === hitVal) {
      increaseScore();
      makeBubble();
      getNewHit();
    }
  }
});




makeBubble();
runTimer();
getNewHit();

