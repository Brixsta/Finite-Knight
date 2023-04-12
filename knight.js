import * as index from "./index.js";
import * as helper from "./helper.js";


export class Knight {
  constructor(x, y) {
    this.width = index.global.cellSize;
    this.height = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/knight.png";
    this.image.src = this.src;
    this.moving = false;
    this.attacking = false;
    this.attackSound = new Audio("");
    this.sx = 0;
    this.sy = 0;
    this.moveSpeed = 2;
    this.interval = 10;
    this.count = 0;
    this.direction = "right";
    this.damage = 10;
    this.health = 120;
    this.keys = 0;
    this.takingDamage = false;
    this.dead = false;
    this.startDeathAnimation = false;
  }

  draw() {
    index.ctx.save();
    this.count++;

    // start cycling through sprite sheet if player dies
    if (this.dead && this.sx === 160) {
      this.count = 0;
    }

    if (this.count >= this.interval) {
      this.count = 0;
      this.sx += index.global.cellSize;
    }

    // knight isn't moving
    if (!this.moving && !this.attacking && !index.keys.Space) {
      this.sy = 0;
    }

    // knight is moving
    if (this.moving && !this.attacking && !index.keys.Space) {
      this.sy = 32;
    }

    // knight died
    if (this.dead) {
      this.sy = 64;
    }

    // knight is attacking
    if (this.attacking) {
      this.sy = 96;
    }

    // reset sprite sheet once horizontal end is reached
    if (this.sx >= 192) this.sx = 0;

    // horizontally flip sprite to give the illusion of left facing character
    if (this.direction === "left") {
      index.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      index.ctx.scale(-1, 1);
      index.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    }

    index.ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      index.global.cellSize,
      index.global.cellSize,
      this.x,
      this.y,
      this.width,
      this.height
    );
    index.ctx.restore();
  }

  move() {
    if (index.keys.ArrowUp && this.y > 0) {
      const hitWall = helper.detectCollision(0, -this.moveSpeed);
      if (!hitWall) this.y -= this.moveSpeed;
    }
    if (index.keys.ArrowDown && this.y < index.canvas.height - this.height) {
      const hitWall = helper.detectCollision(0, this.moveSpeed);
      if (!hitWall) this.y += this.moveSpeed;
    }
    if (index.keys.ArrowRight && this.x < index.canvas.width - this.width) {
      const hitWall = helper.detectCollision(this.moveSpeed, 0);
      if (!hitWall) this.x += this.moveSpeed;
    }
    if (index.keys.ArrowLeft && this.x > 0) {
      const hitWall = helper.detectCollision(-this.moveSpeed, 0);
      if (!hitWall) this.x -= this.moveSpeed;
    }
  }

  changeDirection() {
    if (index.keys.ArrowRight && this.direction === "left") {
      this.direction = "right";
    }
    if (index.keys.ArrowLeft && this.direction === "right") {
      this.direction = "left";
    }
  }

  playAttackSound() {
    // play sound during each attack animation
    if (
      (this.sx >= 128 && this.attacking) ||
      (this.sx >= 128 && index.keys.Space)
    ) {
      if (this.attackSound.paused) {
        const audio = this.attackSound;
        const sounds = [
          "./audio/sword-1.wav",
          "./audio/sword-2.wav",
          "./audio/sword-3.wav",
        ];
        const randomNum = Math.floor(Math.random() * sounds.length);
        audio.src = sounds[randomNum];
        audio.volume = 0.2;
        audio.play();
      }
    }
  }

  endAttackAnimation() {
    // stop attack animation when sprite sheet reaches end
    if ((this.sx >= 160 && this.attacking) || (this.sx >= 160 && this.moving)) {
      this.attacking = false;
      this.attackSound.pause;
    }
  }

  takeDamage() {
    if (this.takingDamage) {
      this.takingDamage = false;
      this.flickerSpriteRed();
      this.flickerPortraitRed();
      this.takeDamageSound();
      this.updateBlood();
    }
  }

  updateBlood() {
    const startingHealth = 120;
    const currentHealth = this.health;
    const percentage = Math.floor((currentHealth / startingHealth) * 100);
    const blood = document.querySelector(".health-blood");

    if (this.health <= 0) {
      blood.style.height = "0%";
    } else {
      blood.style.height = percentage + "%";
    }
  }

  takeDamageSound() {
    const audio = new Audio();
    const random = Math.floor(Math.random() * 3) + 1;
    audio.src = `./audio/knight-damage-${random}.wav`;
    audio.play();
    audio.volume = 0.025;
  }

  flickerSpriteRed() {
    if (!this.dead) {
      this.image.src = "./images/knight-damage.png";

      setTimeout(() => {
        this.image.src = "./images/knight.png";
      }, 50);
      setTimeout(() => {
        this.image.src = "./images/knight-damage.png";
      }, 100);
      setTimeout(() => {
        this.image.src = "./images/knight.png";
        this.takingDamage = false;
      }, 150);
    }
  }

  flickerPortraitRed() {
    const portraitBox = document.querySelector('.portrait-box');
    const redBox = document.createElement('div');
    redBox.classList.add('red-box');
    portraitBox.appendChild(redBox);

    setTimeout(() => {
      redBox.remove();
    }, 50);
    setTimeout(() => {
      portraitBox.appendChild(redBox);
    }, 100);
    setTimeout(() => {
      redBox.remove();
    }, 150);

  }

  deathAnimation() {
    if (this.dead && !this.startDeathAnimation) {
      this.startDeathAnimation = true;
      this.playDeathSound();
      index.setKeysToFalse();
    }
  }

  playDeathSound() {
    const audio = new Audio("./audio/player-dies.mp3");
    audio.volume = 0.05;
    audio.play();
  }

  detectDeath() {
    if (this.health <= 0) {
      this.attacking = false;
      this.moving = false;
      this.dead = true;
      index.global.inPlay = false;
      index.gameOver();
      this.changePortrait();
    }
  }

  changePortrait() {
    const knightPortrait = document.querySelector('.knight-portrait');
    knightPortrait.src = "./images/skull.png"
  }

  attack() {
    this.playAttackSound();
    this.endAttackAnimation();
  }

  update() {
    this.draw();
    this.move();
    this.changeDirection();
    this.attack();
    this.takeDamage();
    this.detectDeath();
    this.deathAnimation();
  }
}
