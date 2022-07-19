
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
            elements.push(this.ball)
            return elements
        }
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

    
}

//declaramos funciones para moverlo
 self.Bar.prototype = {
 down: function(){

 },
 up : function(){

 }
}
})();


//función para la vista del board
(function () {
    self.BoardView = function (canvas, board) {
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
        }
    }
    //para el dibujo
    function draw(ctx, element){
        
        if(element != null && element.hasOwnProperty('kind'))
   switch(element.kind){
  case "rectangle":
    console.log(element)
    ctx.fillRect(element.x, element.y,  element.height, element.width,)
    break;
}
    }

})();


self.addEventListener("load", main)
// Controlador para instanciar los objetos y pasarle modelo a la vista
function main() {
    let board = new Board(1600, 400);
    let bar = new Bar(20, 100, 40,  100, board)
    let canvas = document.getElementById("canvas")
    let board_view = new BoardView(canvas, board);


    board_view.draw()
}