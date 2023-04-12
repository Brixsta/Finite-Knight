import * as index from "./index.js"

export class Key {
    constructor(x, y) {
      this.height = index.global.cellSize;
      this.width = index.global.cellSize;
      this.x = x;
      this.y = y;
      this.image = new Image();
      this.src = "./images/key.png";
      this.visible = true;
      this.keySound = new Audio('./audio/key.wav');
      this.keySoundReady = true;
    }
  
    draw() {
      if(this.visible === true) {
        this.image.src = this.src;
      } else {
        this.image.src = "./images/floor-1.png"
      }
  
      index.ctx.drawImage(this.image, this.x, this.y);
    }
  
    detectPlayerCollision () {
      if(index.player.x + 10 >= this.x && index.player.x <= this.x + this.width - 20 && index.player.y + 20 >= this.y && index.player.y + 10 <= this.y + this.height) {
        this.visible = false;
        if(this.keySoundReady) {
          this.keySound.volume = .045;
          this.keySoundReady = false;
          this.keySound.play();
          this.addKeyToInventory();
        }
      }
    }
  
    addKeyToInventory () {
      index.player.keys++;
      const keys = document.querySelectorAll('.console-key');
      if(index.player.keys === 1) {
        keys[0].style.opacity = 1;
      }
      if(index.player.keys === 2) {
        keys[0].style.opacity = 1;
        keys[1].style.opacity = 1;
      }
      if(index.player.keys === 3) {
        keys[0].style.opacity = 1;
        keys[1].style.opacity = 1;
        keys[2].style.opacity = 1;
      }
    }
  
    update() {
      this.draw();
      this.detectPlayerCollision(); 
    }
  }

  export class HealthPotion {
    constructor(x, y) {
      this.height = index.global.cellSize;
      this.width = index.global.cellSize;
      this.x = x;
      this.y = y;
      this.image = new Image();
      this.src = "./images/health-potion.png";
      this.image.src = this.src;
      this.visible = true;
    }
  
    draw() {
      if(this.visible === true) {
        index.ctx.drawImage(this.image, this.x, this.y);
      }
    }
  
    detectPlayerCollision () {
      if(index.player.x + 10 >= this.x && index.player.x <= this.x + this.width - 20 && index.player.y + 20 >= this.y && index.player.y + 10 <= this.y + this.height && this.visible) {
        this.visible = false;
        this.playHealthPotionSound();
        this.increasePlayerHealth();
      }
    }

    playHealthPotionSound () {
      const audio = new Audio('./audio/health-potion.mp3');
      audio.volume = .05;
      audio.play();
    }

    increasePlayerHealth () {
    index.player.health += 20;
    if(index.player.health > 120) index.player.health = 120;

    const startingHealth = 120;
    const currentHealth = index.player.health;
    const percentage = Math.floor((currentHealth / startingHealth) * 100);
    const blood = document.querySelector(".health-blood");

      if (index.player.health <= 0) {
        blood.style.height = "0%";
      } else {
        blood.style.height = percentage + "%";
      }
    }
  

    update() {
      this.draw();
      this.detectPlayerCollision();
    }
  }