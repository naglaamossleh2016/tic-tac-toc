/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

function getNumberInput() {
  // Loop to keep prompting until valid input is received
  while (true) {
    const userInput = prompt('Please enter a number of grid in the board should be greater than 1:', '');

    // Check if input is empty or not a number
    if (userInput === null || isNaN(userInput) || userInput <= 1) {
      alert('Please enter a valid number that is greater than 1.');
    } else {
      return userInput;
    }
  }
}
let currentPlayer = 'x';
// eslint-disable-next-line radix
const NUMBER_OF_ROWS = parseInt(getNumberInput());
const tries = NUMBER_OF_ROWS ** 2;
let tryCounter = 0;

// let boardArray = [
//   ['_', '_', '_'],
//   ['_', '_', '_'],
//   ['_', '_', '_'],
// ];

const createBoardArray = () => {
  const board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => '_'));
  }

  return board;
};
let boardArray = createBoardArray();

const container = document.querySelector('.container');
const resetButton = document.querySelector('#reset');

const cellPlacement = (index, numOfRow) => {
  const row = Math.floor(index / numOfRow);
  const col = index % numOfRow;
  return [row, col];
};
const resetBoard = () => {
  document.querySelector('.board').remove();
  createBoard();
  boardArray = createBoardArray();
  currentPlayer = 'x';
  tryCounter = 0;
};

const checkRows = (player) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (boardArray[row][column] !== player) {
        column = 0;
        break;
      }
      column++;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const checkColumns = () => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (boardArray[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const checkDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (boardArray[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (boardArray[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};
const checkWin = (player) => {
  if (checkRows(player)) return true;

  if (checkColumns(player)) return true;

  if (checkDiagonals(player)) return true;

  if (checkReverseDiagonals(player)) return true;
};
const runWinFun = (player) => {
  setTimeout(() => {
    alert(`Player ${player} won!`);
    resetBoard();
  }, 100);
};
const runDrawFunc = () => {
  setTimeout(() => {
    alert('It is atie');
    resetBoard();
  }, 100);
};
const drawMarkInCell = (cell, player) => {
  cell.querySelector('.value').textContent = player;
  cell.classList.add(`cell--${player}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = cellPlacement(index, NUMBER_OF_ROWS);
  if (boardArray[row][col] === '_') {
    tryCounter++;
    boardArray[row][col] = currentPlayer;
    drawMarkInCell(cell, currentPlayer);
    if (checkWin(currentPlayer)) { runWinFun(currentPlayer); } else if (tryCounter === tries) {
      runDrawFunc();
    }
    currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
  }
};

const createBoard = () => {
  const board = document.createElement('div');
  board.classList.add('board');
  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class='cell' role='button' tabindex=${i + 1}><span class='value'></span></div>`;
    const cellElement = document.createRange().createContextualFragment(cellElementString);
    cellElement.querySelector('.cell').onclick = (event) => cellClickHandler(event, i);
    cellElement.querySelector('.cell').onkeydown = (event) => ((event.key === 'Enter') ? cellClickHandler(event, i) : true);
    board.appendChild(cellElement);
    document.documentElement.style.setProperty('--grid-rows', NUMBER_OF_ROWS);
  }
  container.insertAdjacentElement('afterbegin', board);
};
createBoard();
resetButton.addEventListener('click', resetBoard);
