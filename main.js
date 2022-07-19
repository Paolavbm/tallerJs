
// creamos funcion anonima para no contaminar el scope general del proyecto
(function () {
    // le pasamos los parametros del pizarron alto y ancho
    let self, Board = function (width, height) {
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
    self.Boar.prototype = {
        //get para obtener elemntos(barras)
        get elements() {
            let elements = this.bars;
            elements.push(ball)
            return elements
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
})();


window.addEventListener("load", main)
// Instanciar objetos, colocarle ancho y alto, y un nuevo objeto Board 
function main() {
    let board = new Board(800, 400);
    let canvas = document.getElementById("canvas")
    let board_view = new BoardView(canvas, board);
}