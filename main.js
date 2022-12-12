var pug="";
var Mel="";
var mano_I_X=0;
var mano_I_Y=0;
var mano_D_X=0;
var mano_D_Y=0;
var volumen=0;
var D_score=0;
var I_score=0;
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
    numeros1=Number(mano_I_Y);
    numeros2=floor(numeros1);
    volumen=numeros2/500;
    document.getElementById("volumen").innerHTML=volumen;
    pug.setVolume(volumen);
    Mel.setVolume(volumen);
    fill("#FF0000");
    stroke("#00F0FF");
    if (mano_D_Y>0 && mano_D_Y<100){
        document.getElementById("velocidad").innerHTML=0.5;
        pug.rate(0.5);
        Mel.rate(0.5);
    } else if(mano_D_Y>=100 && mano_D_Y<200){
        document.getElementById("velocidad").innerHTML=1;
        pug.rate(1);
        Mel.rate(1);
    } else if(mano_D_Y>=200 && mano_D_Y<300){
        document.getElementById("velocidad").innerHTML=1.5;
        pug.rate(1.5);
        Mel.rate(1.5);
    } else if(mano_D_Y>=300 && mano_D_Y<400){
        document.getElementById("velocidad").innerHTML=2;
        pug.rate(2);
        Mel.rate(2);
    } else if(mano_D_Y>=400 && mano_D_Y<500){
        document.getElementById("velocidad").innerHTML=2.5;
        pug.rate(2.5);
        Mel.rate(2.5);
    } 
}
function preload(){
    pug=loadSound("plushie-dj.mp3");
    Mel=loadSound("rave-dj.mp3");
}
function reproducir(){
    pug.play();
    Mel.pause();
    pug.setVolume(0.1);
    pug.rate(1);

}
function reproducir2(){
    Mel.play();
    pug.pause();
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
        D_score=results[0].pose.keypoints[10].score;
        I_score=results[0].pose.keypoints[9].score;
    }
}