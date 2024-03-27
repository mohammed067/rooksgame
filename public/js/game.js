var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var tileSize = 80; 
var chessboard;
var rook;
var currentPlayer = 1;

function preload() {
  this.load.image("chessboard", "assets/chessboard.png");
  this.load.image("rook", "assets/rook.png");
}

function create() {
  chessboard = this.add.image(400, 300, "chessboard");
  chessboard.setScale(1.25);
  rook = this.add.sprite(560, 160, "rook").setInteractive(); 

 
  rook.setScale(0.2); 

  this.input.setDraggable(rook);

  chessboard.setInteractive(); 

  chessboard.on("pointerdown", function (pointer) {
    var snapX = Math.round(pointer.x / tileSize) * tileSize;
    var snapY = Math.round(pointer.y / tileSize) * tileSize;

    if ((snapX !== rook.x && snapY !== rook.y)) {
        console.log(snapX, snapY, rook.x, rook.y); 
        return  
    }
    
    if (currentPlayer === 1) {
   
      snapX = Phaser.Math.Clamp(snapX, tileSize / 2, rook.x);
      snapY = Phaser.Math.Clamp(snapY, rook.y, 600 - tileSize / 2);
    }
    else {
     
      if (snapX >= rook.x) {
        snapX = rook.x;
      } else {
        snapX = Phaser.Math.Clamp(snapX, rook.x, 800 - tileSize / 2);
      }
      snapY = Phaser.Math.Clamp(snapY, rook.y, 600 - tileSize / 2);
    }

    rook.x = snapX;
    rook.y = snapY;
    console.log("checkingX", rook.x);
    console.log("checkingY", rook.y);

    
    checkWinCondition();

    currentPlayer = currentPlayer === 1 ? 2 : 1;
  });
}



function checkWinCondition() {
  if (rook.x === tileSize / 2 && rook.y === 600 - tileSize / 2) {
   
  }
}
