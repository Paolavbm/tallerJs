
// creamos funcion anonima para no contaminar el scope general del proyecto
(function () {
    // le pasamos los parametros del pizarron alto y ancho
    self.Board = function (width, height) {
        //se igualan la propiedades del objeto a lo que pasó como parametro la persona
        this.width = this.width;
        this.height = this.height;
        // variable por si el juego se está jugand
        this.playing = false;
        //variable por si el jugador perdió
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }


    //Nos permite declarar funciones o metódos para el prototipo

    //retorna las barras y las pelotas de dentro del trablero
    self.Board.prototype = {
        //get para obtener elemntos(barras)
        get elements() {
            let elements = this.bars;
//            elements.push(this.ball)
            return elements
        }
    }

})();

(function(){
    self.Ball = function (x, y, radius, board){
this.x = x;
this.y = y;
this.radius = radius
this.speed_y =0;
this.speed_x = 3;
this.board = board;
board.ball = this;
this.kind = "circle"
    }
})();
//Especie de constructor para la barra
(function(){
self.Bar = function(x, y, width, height, board){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board
    //accedemos al board y al barsy le enviamos este objeto(es decir la barra)
    this.board.bars.push(this)

 //definimos la forma
    this.kind = "rectangle"
    this.speed  = 10
}

//declaramos funciones para moverlo
 self.Bar.prototype = {
 down: function(){ 
    this.y += this.speed
 },
 up : function(){
this.y -= this.speed;
 },
 toString:  function(){
    return "x: " + this.x + "y: " + this.y;
 }
}
})();


//función para la vista del board
(function () {
    self.BoardView = function(canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        //agregamos contexto, en canva es con getContext
        this.ctx = canvas.getContext("2d")
       
    }

//dibujo con elemento a dibujar
    self.BoardView.prototype = {

       
        draw: function(){
            for (var i = this.board.elements.length - 1; i>=0; i--){
              let el =  this.board.elements[i];

              draw(this.ctx, el)
            }
        },
        play: function(){
            this.clean();
            this.draw()
        }
    
    }
    //para el dibujo
    function draw(ctx, element){
        
        if(element != null && element.hasOwnProperty('kind'))
   switch(element.kind){
  case "rectangle":
    console.log(element)
    ctx.fillRect(element.x, element.y,  element.height, element.width)
   case  "circle":
    ctx.beginPath();
    ctx.arc(element.x, element.y, element.radius, 0,7)
    ctx.fill();
    ctx.closePath()
    break;
}
    }

})();

let board = new Board(800, 400);
let bar = new Bar(20, 100, 40,  100, board)
let bar_2 = new Bar(735, 100, 40,  100, board)
let canvas = document.getElementById("canvas")
let board_view = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board)
window.requestAnimationFrame(main);
function controller(){
    board_view.play();
    board_view.draw();
    window.requestAnimationFrame(controller);
}

document.addEventListener("keydown", function(ev){
    ev.preventDefault();
console.log(ev.keyCode);

if(keyCode == 38){
    bar.up();
}else if (ev.keyCode == 40){
    bar.down()
}else if(ev.keyCode == 87){
  bar_2.up();
}else if(ev.keyCode == 83){
    bar_2.down()
}
console.log(" "  +bar)
})
self.addEventListener("load", main)
// Controlador para instanciar los objetos y pasarle modelo a la vista
function main() {
    board_view.draw()

}