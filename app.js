let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#new-game");
let declare = document.querySelector("#msg");
let messagecontainer = document.querySelector("#message-container");
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [2,5,8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const showWinner = (winner) => {
  declare.innerText = `Congratulation winner is ${winner}`;
  messagecontainer.classList.remove("hide");
  disabledButton(); // Disable all boxes after a win
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    let posVal = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let postVal3 = boxes[pattern[2]].innerText;

    if (posVal !== "" && posVal2 !== "" && postVal3 !== "") {
      if (posVal === posVal2 && posVal2 === postVal3) {
        showWinner(posVal);
        return; // Exit once a winner is found
      }
    }
  }

  // Check for draw
  const allFilled = Array.from(boxes).every(box => box.innerText !== "");
  if (allFilled) {
    declare.innerText = "It's a draw!";
    messagecontainer.classList.remove("hide");
    disabledButton();
  }
};

const resetGame = () => {
  turnO = true;
  enableButton();
  messagecontainer.classList.add("hide");
};

const disabledButton = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableButton = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // Reset each box's text
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
