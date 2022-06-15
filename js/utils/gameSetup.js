let timer;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 100);
    timer--;
    document.querySelector('#timer').innerHTML = Math.floor(timer / 10);
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

function selectBackground(backgroundId) {
  if (backgroundId === 'forest') {
    const healthBar = document.getElementsByClassName('healthBar');
    healthBar[0].style.backgroundColor = '#389178';
    healthBar[1].style.backgroundColor = '#389178';
    return forest;
  } else if (backgroundId === 'oakWoods') {
    const healthBar = document.getElementsByClassName('healthBar');
    healthBar[0].style.backgroundColor = '#818cf8';
    healthBar[1].style.backgroundColor = '#818cf8';
    return oakWoods;
  } else if (backgroundId === 'graveyard') {
    const healthBar = document.getElementsByClassName('healthBar');
    healthBar[0].style.backgroundColor = '#2b76a9';
    healthBar[1].style.backgroundColor = '#2b76a9';
    return graveyard;
  }
}

function switchBackground(backgroundId) {
  background = new Sprite(selectBackground(backgroundId));

  backgroundDecoration = new Sprite(
    selectBackground(backgroundId).backgroundDecoration
  );

  if (document.querySelector('.select-background')) {
    document
      .querySelector('.select-background')
      .classList.remove('select-background');
  }

  document.querySelector(`#${backgroundId}`).classList.add('select-background');
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
