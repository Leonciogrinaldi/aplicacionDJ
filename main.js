var pug="";
var Mel="";
var mano_I_X=0
var mano_I_Y=0
var mano_D_X=0
var mano_D_Y=0
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    canvas.position(350,200);
    video=createCapture(VIDEO);
    video.hide();
    red_neuronal=ml5.poseNet(video,listo);
    red_neuronal.on("pose",conocer_posiciones);
}
function draw(){
    image(video,0,0,500,500);
}
function preload(){
    pug=loadSound("plushie-dj.mp3");
    Mel=loadSound("rave-dj.mp3");
}
function reproducir(){
    pug.play();
}
function reproducir2(){
    Mel.play();
}
function listo(){
    console.log("cargado");
}
function conocer_posiciones(results){
    if(results.length>0){
        mano_D_X=results[0].pose.rightWrist.x;
        mano_D_Y=results[0].pose.rightWrist.y;
        mano_I_X=results[0].pose.leftWrist.x;
        mano_I_Y=results[0].pose.leftWrist.y;
        console.log("la posición de mano en x derecha es: "+mano_D_X+" la posición de mano en y derecha es: "+mano_D_Y);
        console.log("la posición de mano izquierda en x es: "+mano_I_X+" la posición de la mano en y izquierda es: "+mano_I_Y);
    }
}