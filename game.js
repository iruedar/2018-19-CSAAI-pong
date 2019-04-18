function main()
{
    console.log("Pong: Main: Start!")

    var canvas = document.getElementById('display')
    canvas.width = 600;
    canvas.height = 400;

    var ctx = canvas.getContext("2d");
    var x1 = 50;
    var y1 = 200;
    var x2 = 500;
    var y2 = 200;

    function background(Width, Height) {
        this.width = Width
        this.height = Height
        this.ctx = null

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
    function raqueta (x, y, h){
        this.x_ini = x
        this.y_ini = y
        this.width = 10
        this.height = 40
        this.ctx = null
        this.vy = 0
        this.altura = h

        this.init = function(ctx){
            this.ctx = ctx
            this.reset()
        }
        this.draw = function(){
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.update = function(){
            this.y += this.vy
            if(this.y < 0){
                this.y = 0
            }else if(this.y > this.altura - this.height){
                this.y = this.altura - this.height
            }
        }
        this.reset = function() {
          this.x = this.x_ini;
          this.y = this.y_ini;
        }
    }

    //Objeto bola
    function pelota(h) {
        //-- Posición inicial de la pelota
        this.x_ini = 50
        this.y_ini = 200
        //-- Dimensiones de la Bola
        this.width = 5
        this.height = 5
        //-- Coornenadas
        this.x = 0
        this.y = 0
        //-- Velocidad
        this.vx = 4
        this.vy = 1
        //-- Contexto
        this.ctx = null
        //-- Altura canvas
        this.altura = h
        //-- Inicializar la bola
        this.init = function(ctx) {
            this.ctx = ctx;
            this.reset();
        }
        //-- Dibujar
        this.draw = function () {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        //-- Update
        this.update = function () {
            this.x += this.vx;
            this.y += this.vy;
        }
        //-- Reset: Set the ball to the initial state
        this.reset = function() {
            this.x = this.x_ini;
            this.y = this.y_ini;
        }
    }

    //-- Inicializar y pintar
    var bola = new pelota(canvas.height)
    var jugador1 = new raqueta(x1, y1, canvas.height);
    var jugador2 = new raqueta(x2, y2, canvas.height);
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
                        jugador1.vy = -2
                    }else if (e.key == "ArrowDown") {
                        jugador1.vy = 2
                    }else if(e.key == "w"){
                        jugador2.vy = -2
                    }else if (e.key == "s") {
                        jugador2.vy = 2
                    }
                }

                window.onkeyup = (e) => {
                    jugador1.vy = 0
                    jugador2.vy = 0
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
