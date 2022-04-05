export default function handleCrops(ctx, crop) {
  let data = new Crop(crop.x);
  data.draw(ctx);
}

class Crop {
  constructor(x) {
    this.x = x;
    this.y = 32;
  }
  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
