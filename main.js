
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
             //se realiza una copia del arreglo bars
            let elements = this.bars.map(function(bar){ return bar;});
            elements.push(this.ball)
            return elements
        }
    }

})();


//se asignan propiedades al circulo(bola)
(function(){
    self.Ball = function (x, y, radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;
        board.ball = this;
        this.kind = "circle";
    }

    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        },
        get width(){
            return this.radius * 2;
        },
        get height(){
            return this.radius * 2;
        },
        collision : function(bar){
            // Se realiza colisión con una barra
            let relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;
            let normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if(this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;
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
    //accedemos al board y al bars le enviamos este objeto(es decir la barra)
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
    
    clean: function(){
        this.context.clearRect(0, 0, this.board.width, this.board.height);
    },
    draw: function(){
        //dibujamos el elemento que se recorre
        for(let i = this.board.elements.length - 1; i >= 0; i--){
            let element = this.board.elements[i];
            draw(this.context, element);
        }
    }, 
    check_collisions: function(){
        for(let i = this.board.bars.length - 1; i >= 0; i--){
            let bar = this.board.bars[i];
            if (hit(bar, this.board.ball)) {
                this.board.ball.collision(bar);
            }
        };
    },   
    play: function(){
        if(this.board.playing){
            this.clean();
            this.draw();
            this.check_collisions();
            this.board.ball.move();
        }
    }
    
};

//encuentros

function hit(element_a, element_b){
    let hit = false;

    // Colisiones horizontales
    if(element_b.x + element_b.width >= element_a.x && element_b.x < element_a.x + element_a.width){
    // Colisiones verticales
        if(element_b.y + element_b.height >= element_a.y && element_b.y < element_a.y + element_a.height){
            hit = true;
        }
    }

    // Colisión punto a y b
    if(element_b.x <= element_a.x && element_b.x + element_b.width >= element_a.x + element_a.width){
        if(element_b.y <= element_a.y && element_b.y + element_b.height >= element_a.y + element_a.height){
            hit = true;
        }
    }

    // Colisión punto b con a
    if(element_a.x <= element_b.x && element_a.x + element_a.width >= element_b.x + element_b.width){
        if(element_a.y <= element_b.y && element_a.y + element_a.height >= element_b.y + element_b.height){
            hit = true;
        }
    }

    return hit;
}
    //para el dibujo de los elementos
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


//declaramos y asignamos
let board = new Board(800,400);
let canvas = document.getElementById("canvas");
let bar = new Bar(20,100,40,100,board);
let bar2 = new Bar(735,100,40,100,board);
let boardView = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board);


//aqui escuchamos el teclado para que se realice movimiento en pantalla
document.addEventListener("keydown", function(e) {
    
    if (e.keyCode == 38) {
        e.preventDefault();
        bar.up();
    }else if (e.keyCode == 40) {
        e.preventDefault();
        bar.down();
    }else if (e.keyCode == 87) {
        e.preventDefault();
        bar2.up();
    }else if (e.keyCode == 83) {
        e.preventDefault();
        bar2.down();
    }else if(e.keyCode === 32){ 
        e.preventDefault();
        board.playing = !board.playing;
    }    
});

boardView.draw();
window.requestAnimationFrame(controller);

//controlador
function controller() {  
    boardView.play();   
    window.requestAnimationFrame(controller);
}