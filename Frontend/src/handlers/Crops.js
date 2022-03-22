let image = new Image();
image.src = "../images/sprout.png";

let crops = [];

export default (id, x, ctx) => {
  // for (let i = 0; i < crops.length; i++) {
  ctx.drawImage(image, x, 32, 32, 32);
  // }
};
