let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-game")

let turnO = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
            box.classList.remove("turnX")
        }else {
            box.innerText = "X";
            box.classList.add("turnX");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count > 9 && isWinner == false) {
            drawGame();
        }
        console.log(count);
        console.log(isWinner);
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulation, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledButton();
}

const checkWinner = () => {
    for (const pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
}

const disabledButton = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}
const enableButton = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableButton();
    msgContainer.classList.add("hide");
    count = 0;
}

const drawGame = () => {
    msgContainer.classList.remove("hide");
    msg.innerText = "Game was draw";
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
