"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

/**create a board that is a given height and width */
function makeBoard(height = HEIGHT, width = WIDTH) {


  board.length = height;
  for (let i = 0; i < board.length; i++) {
    let row = [];
    row.length = width;
    for (let j = 0; j < row.length; j++) {
      row[j] = null;
    }
    board[i] = row;
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  let htmlBoard = document.querySelector('#board');
  //htmlBoard will select the DOM element with id = board;

  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // loop will create a data cell
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      // add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);
      // append the table cell to the table row
      row.append(cell);
    }
    // append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  for(let i = board.length -1; i >=0; i--) {
    if(board[i][x] === null) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("piece", `p${currPlayer}`);

  let cell = document.getElementById(`${y}-${x}`);  // why did it not work with querySelector(`#${i}-${j}`)
  cell.append(newDiv);
}
// TODO: make a div and insert into correct table cell

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
    // if(board.every(!null)) {
    //   endGame("TIE GAME");
    // } returned an error
    if(board[0].every(x => x)){
      endGame("TIE GAME");
    }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // currPlayer === 1 ? currPlayer = 2 : currPlayer =1;
  currPlayer = (currPlayer === 1 ? 2 : 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
  /*  for(let cell of cells) {
      if(board[cell[0]][cell[1]] === null || board[cell[0]][cell[1]] === undefined) {
        return false;
      }
      if(currPlayer !== board[cell[0]][cell[1]]) {
          return false;
        }
    }
    return true;
    */
// It's not working because when board[y] is undefined, it can't search for a board[x]!!

    for(let cell of cells) {

      if(!board[cell[0]]) return false;
      if(!board[cell[0]][cell[1]]) return false;
      if(board[cell[0]][cell[1]] !== currPlayer) return false;

  }
  return true;
}

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y,x], [y+1, x], [y+2, x], [y+3, x]];
      let diagDL = [[y,x], [y+1, x-1], [y+2, x-2], [y+3, x-3]];
      let diagDR = [[y,x], [y+1, x+1], [y+2, x+2], [y+3, x+3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
