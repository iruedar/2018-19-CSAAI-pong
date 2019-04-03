function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,100, 10, 40)
  ctx.fillStyle = 'white';
  ctx.fillRect(500,300, 10, 40)

  // Red
  ctx.beginPath();
  ctx.setLineDash([5,10]);
  ctx.lineWidth = "5";
  ctx.strokeStyle = "white";
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, 400)
  ctx.stroke();
}
