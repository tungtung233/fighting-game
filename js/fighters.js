const samuraiMack = {
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './assets/samuraiMack/idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: './assets/samuraiMack/idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './assets/samuraiMack/run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/samuraiMack/jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './assets/samuraiMack/fall.png',
      framesMax: 2,
    },
    attack: {
      imageSrc: './assets/samuraiMack/attack.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: './assets/samuraiMack/take-hit-white-silhouette.png',
      framesMax: 4,
    },
    death: {
      imageSrc: './assets/samuraiMack/death.png',
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 60,
      y: 50,
    },
    width: 200,
    height: 50,
  },
};

const kenji = {
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './assets/kenji/idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 169,
  },
  sprites: {
    idle: {
      imageSrc: './assets/kenji/idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: './assets/kenji/run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/kenji/jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './assets/kenji/fall.png',
      framesMax: 2,
    },
    attack: {
      imageSrc: './assets/kenji/attack.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: './assets/kenji/take-hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: './assets/kenji/death.png',
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: 60,
      y: 50,
    },
    width: 185,
    height: 50,
  },
};

const wizard = {
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './assets/wizard/idle.png',
  framesMax: 6,
  scale: 1.6,
  offset: {
    x: 125,
    y: 75,
  },
  sprites: {
    idle: {
      imageSrc: './assets/wizard/idle.png',
      framesMax: 6,
    },
    run: {
      imageSrc: './assets/wizard/run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/wizard/jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './assets/wizard/fall.png',
      framesMax: 2,
    },
    attack: {
      imageSrc: './assets/wizard/attack.png',
      framesMax: 8,
    },
    takeHit: {
      imageSrc: './assets/wizard/take-hit.png',
      framesMax: 4,
    },
    death: {
      imageSrc: './assets/wizard/death.png',
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: 120,
      y: 50,
    },
    width: 150,
    height: 50,
  },
};
