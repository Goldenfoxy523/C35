var ball;

var database;

var position;


function setup(){
    createCanvas(500,500);
    // create an instance of the database;
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    // Read the values from the database
    // We need to know from where we have to read in the database. 
    // In our case, we have to read the x and y values which is in
    // Ball/Position
    var ballPosition = database.ref("Ball/Position"); // Refering to Ball/Position
    // Read the values x and y fromballPosition
    // on() - add a listener to the Ball/Position location in database
    ballPosition.on("value", readPosition); 
}
function readPosition(data){

    position = data.val();

    ball.x = position.x;

    ball.y = position.y;


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("Ball/Position").set({
        x: position.x + x,
        y: position.y + y
    })
    console.log("right position");
    
}
