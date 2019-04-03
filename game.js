function main()
{
    console.log("Pong: Main: Start!")

    var canvas = document.getElementById('display')
    canvas.width = 600;
    canvas.height = 400;

    var ctx = canvas.getContext("2d");
    var x1 = 50;
    var y1 = 100;
    var x2 = 500;
    var y2 = 100;

    function background(Width, Height) {
      this.width = Width,
      this.height = Height,
      this.ctx = null,

      this.init = function (ctx){
          this.ctx = ctx
      }
      this.draw = function () {
          // Red
          ctx.beginPath();
          ctx.setLineDash([5,10]);
          ctx.lineWidth = "5";
          ctx.strokeStyle = "white";
          ctx.moveTo(this.width/2, 0);
          ctx.lineTo(this.width/2, 400);
          ctx.stroke();

          //Puntuación
          ctx.font = "60px Arial";
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          ctx.fillText("0", this.width/2-30, 50);
          ctx.fillText("0", this.width/2+30, 50);
      }
    }

    //Objeto Raquetas
    function raqueta (x, y){
        this.x_ini = x
        this.y_ini = y
        this.width = 10
        this.height = 40
        this.ctx = null
        this.vy = 4
        this.direction = null

        this.init = function(ctx){
            this.ctx = ctx
            this.reset()
        }
        this.draw = function(){
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.update = function(){
            if(this.direction == "up"){
                this.y = this.y - this.vy
            }else if (this.direction == "down") {
                this.y = this.y + this.vy
            }
        }
        this.reset = function() {
          this.x = this.x_ini;
          this.y = this.y_ini;
        }
    }

    //Objeto bola
    var bola = {
        //-- Posición inicial de la pelota
        x_ini: 50,
        y_ini: 50,
        //-- Dimensiones de la Bola
        width: 5,
        height: 5,
        //-- Coornenadas
        x : 0,
        y : 0,
        //-- Velocidad
        vx : 4,
        vy : 1,
        //-- Contexto
        ctx: null,
        //-- Inicializar la bola
        init: function(ctx) {
            this.ctx = ctx;
            this.reset();
        },
        //-- Dibujar
        draw: function () {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        },
        //-- Update
        update: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        //-- Reset: Set the ball to the initial state
        reset: function() {
            this.x = this.x_ini;
            this.y = this.y_ini;
        }
    }

    //-- Inicializar y pintar
    var jugador1 = new raqueta(x1, y1);
    var jugador2 = new raqueta(x2, y2);
    var tablero = new background(canvas.width, canvas.height)

    tablero.init(ctx)
    bola.init(ctx)
    jugador1.init(ctx)
    jugador2.init(ctx)
    bola.draw()
    jugador1.draw()
    jugador2.draw()
    tablero.draw()

    //-- Crear timer para la animación
    //-- Inicialmente a null
    var timer = null;
    //-- Boton de salcar
    var sacar = document.getElementById('sacar')
    //-- Función de retrollamda del botón de sacar.
    //-- ¡Que comience la animación!
    sacar.onclick = () => {
        //-- Si la bola ya se está animando,
        //-- no hacer nada
        if (!timer) {
            //-- Lanzar el timer. Su funcion de retrollamada la definimos
            //-- en su primer parámetro
            timer = setInterval(()=>{
                //-- Esto se ejecuta cada 20ms
                //-- Actualizar la bola
                bola.update();
                jugador1.update()
                jugador2.update()
                //-- Borrar el canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //-- Dibuar la bola
                tablero.draw()
                bola.draw()
                jugador1.draw()
                jugador2.draw()

                //Movimiento palas
                window.onkeydown = (e) => {
                    e.preventDefault()
                    if(e.key == "ArrowUp"){
                        jugador1.direction = "up";
                    }else if (e.key == "ArrowDown") {
                        jugador1.direction = "down"
                    }else if(e.key == "w"){
                        jugador2.direction = "up";
                    }else if (e.key == "s") {
                        jugador2.direction = "down"
                    }
                }

                window.onkeyup = (e) => {

                }
                //-- Si la bola llega a la parte derecha del canvas:
                //-- Terminar
                if (bola.x > canvas.width) {
                    //-- Eliminar el timer
                    clearInterval(timer)
                    timer = null;
                    //-- Bola a su posicion inicial
                    bola.reset();
                    //-- Dibujar la bola en pos. inicial
                    bola.draw();
                }
            },20); //-- timer
        }
    } //-- Fin onclick
}
