const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

let background;
let backgroundDecoration;
switchBackground('forest'); //default background

let player = new Fighter(samuraiMack); //default starter fighter
let enemy = new Fighter(kenji); //default starter fighter

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function animate() {
  if (gameAlive) {
    window.requestAnimationFrame(animate);
  }
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  backgroundDecoration.update();
  context.fillStyle = 'rgba(255, 255, 255, 0.15)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  faceDirection({ player, enemy });
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (
    keys.d.pressed &&
    player.lastDirectionKey === 'd' &&
    player.position.x <= canvas.width - player.width * player.scale
  ) {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else if (
    keys.a.pressed &&
    player.lastDirectionKey === 'a' &&
    player.position.x >= 0
  ) {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // enemy movement
  if (
    keys.ArrowRight.pressed &&
    enemy.lastDirectionKey === 'ArrowRight' &&
    enemy.position.x <= canvas.width - enemy.width * enemy.scale
  ) {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else if (
    keys.ArrowLeft.pressed &&
    enemy.lastDirectionKey === 'ArrowLeft' &&
    enemy.position.x >= 0
  ) {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  }

  // detect for collision via attackBox
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === player.sprites.attack.collide &&
    document.querySelector('#endOfGame').style.display === 'none'
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    gsap.to('#enemyHealth', {
      width: enemy.health + '%',
    });
  }

  // if player misses attack
  if (
    player.isAttacking &&
    player.framesCurrent === player.sprites.attack.collide
  ) {
    player.isAttacking = false;
  }

  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === enemy.sprites.attack.collide &&
    document.querySelector('#endOfGame').style.display === 'none'
  ) {
    player.takeHit();
    enemy.isAttacking = false;
    gsap.to('#playerHealth', {
      width: player.health + '%',
    });
  }

  // if enemy misses attack
  if (
    enemy.isAttacking &&
    enemy.framesCurrent === enemy.sprites.attack.collide
  ) {
    enemy.isAttacking = false;
  }

  // end game if either player's health is 0
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }

  // end game if timer is 0
  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

window.addEventListener('keydown', (event) => {
  if (!player.dead && gameAlive) {
    switch (event.key) {
      // Player
      case 'd':
        keys.d.pressed = true;
        player.lastDirectionKey = 'd';
        break;
      case 'a':
        keys.a.pressed = true;
        player.lastDirectionKey = 'a';
        break;
      case 'w':
        if (player.jump < 2) {
          player.jump++;
          player.velocity.y = -15;
          break;
        } else {
          break; //do nothing
        }
      case ' ':
        //fighter can only attack once every 500 ms
        if (player.attackKeyRelease && player.lastAttack - timer >= 5) {
          player.attack();
          player.lastAttack = timer;
          player.attackKeyRelease = false;
        }
        break;
    }
  }
  if (!enemy.dead && gameAlive) {
    switch (event.key) {
      // Enemy
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastDirectionKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastDirectionKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        if (enemy.jump < 2) {
          enemy.jump++;
          enemy.velocity.y = -15;
          break;
        } else {
          break; //do nothing
        }
      case 'Enter':
        //fighter can only attack once every 500 ms
        if (enemy.attackKeyRelease && enemy.lastAttack - timer >= 5) {
          enemy.attack();
          enemy.lastAttack = timer;
          enemy.attackKeyRelease = false;
        }
        break;
    }
  }

  switch (event.key) {
    case 'Escape':
      if (
        document.querySelector('#endOfGame').style.display === 'none' &&
        document.querySelector('#pauseGame').style.display === 'none'
      ) {
        pauseGame();
        break;
      } else if (
        document.querySelector('#pauseGame').style.display !== 'none'
      ) {
        resumeGame();
        break;
      }
  }
});

window.addEventListener('keyup', (event) => {
  if (document.querySelector('#startScreen').style.display !== 'none') {
    switch (event.key) {
      case ' ':
        startGame();
        break;
      case 'Enter':
        startGame();
        break;
    }
  }

  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case ' ':
      player.attackKeyRelease = true;
      break;
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'Enter':
      enemy.attackKeyRelease = true;
      break;
  }
});
