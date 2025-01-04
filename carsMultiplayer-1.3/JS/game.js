class Game{
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
        this.Puntuacion = createElement("h2");
        this.playerMoving = false;
        this.blast = false;
    }

    //elements oculta elementos
    handleElements() {
        form.hide();
        form.titleImg.position(70,60);
        form.titleImg.class("gameTitleAfterEffect")
        this.resetTitle.html("Reiniciar el Juego");
        this.resetTitle.class("resetText");
       // this.resetTitle.position(width,height /2);
       this.resetTitle.position(width / 2 + 200, 40);
        this.resetButton.class("resetButtom");
       // this.resetButton.position(width,height /2+50);
        this.resetButton.position(width / 2 + 230, 100);

        this.Puntuacion.html("Puntuacion");
        this.Puntuacion.class("resetText");
       // this.Puntuacion.position(width,height /3);
       this.Puntuacion.position(width / 3 - 60, 40);
    }

    addSprites(spriteGroup, numbreOfSprites, spritesImages, spritesScale, position=[]){
        //mandar a dibujar los objetos
        for(var i = 0; i < numbreOfSprites;++i){
            var x,y;

            if(position.length > 0){
                x = position[i].x;
                y = position[i].y;
                spritesImages = position[i].image;
            
        } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
          }
            var sprite = createSprite(x,y);
            sprite.addImage("sprite", spritesImages);
            sprite.scale = spritesScale;
            spriteGroup.add(sprite);
        }
    }

    play(){
        //anexo de formulario player y los elementos a interactuar
        this.handleElements();
        Player.getPlayersInfo();
        player.getCarsAtEnd()
        //agreagar if para evaluar jugadores indefinidos
        //declarar un form para el index de todos los jugadores 
        //anexo de barras de vida, monedas, tanques de gas, movimiento del carro, obstaculos
        if (allPlayers !== undefined) {
            image(track, 0, -height * 5, width, height * 6);
      
          /*  this.showFuelBar();
            this.showLife();
            this.showLeaderboard();*/
      
            //índice de la matriz
            var index = 0;
        for(var plr in allPlayers){
            index = index + 1;
            //usar la bd para mostrar los autos en direccion X y Y
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            //agragar tirmpo de vida
            var curentLife = allPlayers[plr].life;

            if(curentLife <= 0){
                cars[index - 1].changeImage("blast");
                cars[index - 1].scale = 0.3;
            }
            cars[index - 1].position.x = x;
            cars[index - 1].position.y = y;

            if(index === player.index){
                stroke(10);
                fill("red");
                ellipse(x, y, 60, 60);
      
               /*this.handleFuel(index);
                this.handlePowerCoins(index);
                this.handleCarACollisionWithCarB(index);
                this.handleObstacleCollision(index);*/
      

                if(player.life <= 0){
                    //activar imagen de explocion
                    this.blast = true;
                    this.playerMoving = false;
                }
                //cambiar la posiscion de camara en posiscion Y
                camera.position.y = cars[index - 1].position.y ;
            }
        }// if inicial
            if(this.playerMoving){
                player.positionY += 4;
                player.update();
            }
            //manejo de eventos del teclado
            // manejando eventos teclado
            this.handlePlayerControls();

            // Línea de meta
            const finshLine = height * 6 - 100;
            if(player.positionY > finshLine){
                gameState = 2;
                player.rank += 1;
                Player.updateCarsAtEnd(player.rank);
                player.update();
                this.showRank();
            }
            drawSprites();
        }//if
        
        //anexo a la base de datos y el movimiento del auto

        //mandar a llamar metodo para reinicio hundleResetButton
    }

    start(){
        //referencia con formulario player y anexo de imagenes para cada participante
        player = new Player();
        playerCount = player.getCount();
        form = new Form();
        form.display();

        auto1 = createSprite(width / 2 - 50, height - 100);
        //auto1 = createSprite(width/2-150,height/3);
        auto1.addImage("P1",auto1img);
        auto1.scale = 0.07;
        //auto2 = createSprite(width/2,height/3);
        auto2 = createSprite(width / 2 + 100, height - 100);
        auto2.addImage("P2", auto2img);
        auto2.scale = 0.07;
        auto3 = createSprite(width/2 +150, height-100);
        auto3.addImage("P3", auto3img);
        auto3.scale = 0.07;
        cars = [auto1, auto2, auto3];
        //anexo de objetos extras
        //this.addSprites()
        /*
    fuels = new Group();
    powerCoins = new Group();

    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    // Agregando sprite de combustible al juego
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Agregando sprite de moneda al juego
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
 */

    //Agregando sprite de obstáculos al juego
   /* this.addSprites(
        obstacles,
        obstaclesPositions.length,
        obstacle1Image,
        0.04,
        obstaclesPositions
      );*/
    }

    getState(){
        //hacer referencia al la base de datos y se optiene el "State"
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",function(data)
        {gameState = data.val()});
    }

    update(state){
        //dar de alta el estado del juego "state"
        database.ref("/").update({gameState:state});
    }

    handlePlayerControls(){
        //agregar condicionales para control de jugador
    }

    gameOverLoser(){
        swal({
            title:"Fin del juego tremendo manco",
            text:"Suerte para la proxima, manco",
            imageUrl:"https://i.postimg.cc/zB5cFhNr/Manos-para-quitar-lo-manco.jpg", imageSize:"100 x 100",
            confirmButtonText:"Asta luago manco"
        });
    }

    gameOverWiner(){
        swal({
            title:"Que pro",
            text:"Eres el mejor",
            imageUrl:"https://i.postimg.cc/qBWZ1W4w/que-pro.jpg", imageSize:"100 x 100",
            confirmButtonText:"Sigue asi papu"
        });
    }

    end(){
        console.log("fin del juego")
    }

    /*showLeatherBoard(){
    se anexa el nombre, rango y cosas de los jugadores 
    }*/
}