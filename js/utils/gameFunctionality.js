function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width * rectangle2.scale &&
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.y <=
      rectangle2.position.y + rectangle2.height &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  if (player.health === enemy.health) {
    document.querySelector('#results').style.color = 'var(--color-brown)';
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

  document.querySelector('#pauseInstruction').style.display = 'none';
  toggleGameModal('#endOfGame', 'flex');
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
