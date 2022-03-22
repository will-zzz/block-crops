let image = new Image();
image.src = "../images/sprout.png";

let crops = [];

export default function Crop(id, x, ctx) => {
  for (let i = 0; i < crops.length; i++) {
    ctx.drawImage(image, x, 32, 32, 32);
  }
};

class Crop {
  constructor(x, id) {
    this.x = x;
    this.id = id;
  }
  draw(ctx) {

  }
}
