var auto1, auto1img;
var auto2, auto2img;
var auto3, auto3img;
var carretera;
var canvas;
var pantallaDeInicio;
var pantallaFinal;
var database;
var cars = [];
var playerCount;
var playersCount;
var allPlayers;
var gameState;
var player;
var form,game;
var blastImage;
var track;

function preload(){
    pantallaDeInicio = loadImage('./assets/background.png');
    carretera = loadImage('./assets/track.jpg');
    auto1img = loadImage('./assets/car1.png');
    auto2img = loadImage('./assets/car2.png');
    auto3img = loadImage('./assets/car3.png');
    blastImage = loadImage("./assets/blast.png");
    track = loadImage("./assets/track.jpg");
    console.log('preload si jala');
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    //form = new Form();
    //form.display();
    console.log("funciona la fincion setup")
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(pantallaDeInicio);
    //Evalua el total de jugadores
    if(playerCount === 3){
        game.update(1);
    }
    if(gameState === 1){
        game.play();
    }
    if(gameState === 2){
        game.end();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}