function toggleGameModal(element, displayMode) {
  document.querySelector(element).style.display = displayMode;
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? 'flex' : 'none';
  element.style.display = display;
}

// when gameAlive is true, players can move
let gameAlive = false;

function startGame() {
  gameAlive = true;
  toggleScreen('startScreen', false);
  toggleScreen('gameScreen', true);
  timer = 610; // 610 / 10 === 61 seconds (game duration is 60 seconds + 1 second for loading)
  decreaseTimer();

  player.image = player.sprites.idle.image;
  enemy.image = enemy.sprites.idle.image;

  player.position.x = 100;
  player.position.y = player.offset.y;
  player.velocity.y = 0;
  player.health = 100;
  player.lastAttack = timer;

  enemy.position.x = 800;
  enemy.position.y = enemy.offset.y;
  enemy.health = 100;
  enemy.velocity.y = 0;
  enemy.lastAttack = timer;

  document.querySelector('#playerHealth').style.width = '100%';
  document.querySelector('#enemyHealth').style.width = '100%';

  toggleGameModal('#pauseGame', 'none');
  toggleGameModal('#endOfGame', 'none');

  document.querySelector('#pauseInstruction').style.display = 'inline';

  player.dead = false;
  enemy.dead = false;

  animate();
}

function restartGame() {
  toggleScreen('gameScreen', false);
  toggleScreen('startScreen', true);
  gameAlive = false;
}

function pauseGame() {
  toggleGameModal('#pauseGame', 'flex');
  gameAlive = false;

  document.querySelector('#pauseInstruction').style.display = 'none';

  clearTimeout(timerId);
}

function resumeGame() {
  toggleGameModal('#pauseGame', 'none');
  gameAlive = true;

  document.querySelector('#pauseInstruction').style.display = 'inline';

  decreaseTimer();
  animate();
}
