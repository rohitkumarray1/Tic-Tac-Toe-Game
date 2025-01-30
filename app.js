const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const newBtn = document.querySelector("#new-game");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const oPlayer = document.querySelector("#o-score");
const xPlayer = document.querySelector("#x-score");

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let turnO = true;
let count = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      turnO = false;
      box.innerText = "O";
      box.classList.remove("turnX");
    } else {
      turnO = true;
      box.innerText = "X";
      box.classList.add("turnX");
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if(count >= 9) {
      if(!isWinner) {
         drawGame();
      }
    }
  });
});

function showWinner(winner) {
  msgContainer.classList.remove("hide");
  msg.innerText = `Congratulation, The winner is ${winner}`;
}

function drawGame() {
  msgContainer.classList.remove("hide");
  msg.innerText = `Game was draw`;
  disableButton();
}

function disableButton() {
  for (const box of boxes) {
    box.disabled = true;
  }
}

function enableButton() {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function checkWinner() {
  for (const pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos1Val == pos3Val) {
        showWinner(pos1Val);
        disableButton();
      }
    }
  }
}

function newGame() {
  turnO = true;
  enableButton();
  msgContainer.classList.add("hide");
  count = 0;
}

function resetGame() {
  turnO = true;
  enableButton();
  msgContainer.classList.add("hide");
  count = 0;
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", newGame);
