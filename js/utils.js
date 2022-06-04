function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector('#endOfGame').style.display = 'flex';
  if (player.health === enemy.health) {
        document.querySelector('#results').style.color =
          'var(--color-brown)';
    document.querySelector('#results').innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
    document.querySelector('#results').style.color =
    'var(--color--player-dark-blue)';
    document.querySelector('#results').innerHTML = 'Player 1 Wins!';
  } else if (enemy.health > player.health) {
    document.querySelector('#results').style.color =
    'var(--color--enemy-dark-purple)';
    document.querySelector('#results').innerHTML = 'Player 2 Wins!';
  }
  gameAlive = false;
}

let timer;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector('#timer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

// detect which direction to face
function faceDirection({ player, enemy }) {
  if (player.position.x >= enemy.position.x) {
    player.flipHorizontal = true;
    enemy.flipHorizontal = false;
  } else {
    player.flipHorizontal = false;
    enemy.flipHorizontal = true;
  }
}

function selectFighter(fighter) {
  switch (fighter) {
    case 'samuraiMack':
      return JSON.parse(JSON.stringify(samuraiMack)); //creating a deep copy
    case 'kenji':
      return JSON.parse(JSON.stringify(kenji));
    case 'wizard':
      return JSON.parse(JSON.stringify(wizard));
    case 'huntress':
      return JSON.parse(JSON.stringify(huntress));
  }
}

function switchFighter(id) {
  const fighter = id.split('-')[0];
  const playerOrEnemy = id.split('-')[1];

  if (playerOrEnemy === 'player') {
    player = new Fighter(selectFighter(fighter));

    if (document.querySelector('.select-player')) {
      document
        .querySelector('.select-player')
        .classList.remove('select-player');
    }

    document.querySelector(`#${id}`).classList.add('select-player');
  } else {
    enemy = new Fighter(selectFighter(fighter));

    if (document.querySelector('.select-enemy')) {
      document.querySelector('.select-enemy').classList.remove('select-enemy');
    }

    document.querySelector(`#${id}`).classList.add('select-enemy');
  }
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? 'flex' : 'none';
  element.style.display = display;
}

// when gameAlive is true, players can move
let gameAlive = false;

function startGame() {
  toggleScreen('startScreen', false);
  toggleScreen('gameScreen', true);
  timer = 5;
  decreaseTimer();
  gameAlive = true;
  player.position.x = 100;
  enemy.position.x = 800;

  player.health = 100;
  enemy.health = 100;

  document.querySelector('#playerHealth').style.width = '100%';
  document.querySelector('#enemyHealth').style.width = '100%';

  document.querySelector('#pauseGame').style.display = 'none';
  document.querySelector('#endOfGame').style.display = 'none';
}

function restartGame() {
  toggleScreen('gameScreen', false);
  toggleScreen('startScreen', true);
  gameAlive = false;
}

function pauseGame() {
  document.querySelector('#pauseGame').style.display = 'flex';

  clearTimeout(timerId);
}
