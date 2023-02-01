const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('section span');
const players = document.querySelector('.players');
const resultBox = document.querySelector('.result-box');
const wonText = resultBox.querySelector('.won-text');
const replayBtn = document.querySelector('.button-replay');

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute('onclick', 'clickedBox(this)');
  }

  selectXBtn.addEventListener('click', () => {
    selectBox.classList.add('select-box_hide');
    playBoard.classList.add('play-board_show');
  })
  selectOBtn.addEventListener('click', () => {
    selectBox.classList.add('select-box_hide');
    playBoard.classList.add('play-board_show');
    players.classList.add('players_active');
    players.classList.add('player');
  })
}

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let playerSign = 'X';
let runBot = true;

function clickedBox(element) {
  if (players.classList.contains('player')) {
    element.innerHTML = `<i class='${playerOIcon}'></i>`;
    players.classList.add('players_active');
    playerSign = 'O';
    element.setAttribute('id', playerSign);
  } else {
    element.innerHTML = `<i class='${playerXIcon}'></i>`;
    players.classList.add('players_active');
    element.setAttribute('id', playerSign);
  }
  selectWinner();
  playBoard.style.pointerEvents = 'none';
  element.style.pointerEvents = 'none';
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}

function bot(runBot) {
  if (runBot) {
    playerSign = 'O';
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if(allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains('player')) {
        allBox[randomBox].innerHTML = `<i class='${playerXIcon}'></i>`;
        players.classList.remove('players_active');
        playerSign = 'X';
        allBox[randomBox].setAttribute('id', playerSign);
      } else {
        allBox[randomBox].innerHTML = `<i class='${playerOIcon}'></i>`;
        players.classList.remove('players_active');
        allBox[randomBox].setAttribute('id', playerSign);
      } 
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = 'none';
    playBoard.style.pointerEvents = 'auto';
    playerSign = 'X';
  }
}

function getClass(idName) {
  return document.querySelector('.box' + idName).id;
}

function checkClasses(val1, val2, val3, sign) {
  if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
    return true;
  }
}

function selectWinner() {
  if (checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6, playerSign) || checkClasses(7, 8, 9, playerSign) || checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) || checkClasses(1, 5, 9, playerSign) || checkClasses(3, 5, 7, playerSign)) {
    console.log(playerSign);
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      playBoard.classList.remove('play-board_show');
      resultBox.classList.add('result-box_show');
    }, 700);

    wonText.innerHTML = `Player <p class="p">${playerSign}</p> won the game!`;
  } else {
    if (getClass(1) != '' && getClass(2) != '' && getClass(3) != '' && getClass(4) != '' && getClass(5) != '' && getClass(6) != '' && getClass(7) != '' && getClass(8) != '' && getClass(9) != '') {
      console.log(getClass(1));
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        playBoard.classList.remove('play-board_show');
        resultBox.classList.add('result-box_show');
      }, 700);

      wonText.textContent = `Match has been drawn!`;
    }
  }
}

replayBtn.addEventListener('click', () => {
  window.location.reload();
})