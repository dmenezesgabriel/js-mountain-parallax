const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "parallax-mountain-bg.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "parallax-mountain-montain-far.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "parallax-mountain-mountains.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "parallax-mountain-trees.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "parallax-mountain-foreground-trees.png";

window.addEventListener("load", () => {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;

  slider.addEventListener("change", (event) => {
    gameSpeed = event.target.value;
    showGameSpeed.innerHTML = event.target.value;
  });
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 1200; // image size in pixels
      this.height = 700; // image size in pixels
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * speedModifier;
    }

    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = this.x - this.speed;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
