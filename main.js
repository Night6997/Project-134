img="";
stat="";
alarm=";"
objects=[];

function preload(){

    alarm=loadSound("ringing_old_phone.mp3");
    img=loadImage("baby.jpg");
}

function setup(){

    canvas=createCanvas(500,350);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Object(s) are being detected";

}

function modelLoaded(){

    console.log("Model loaded");
    objectDetector.detect(img, gotResults);
    stat=true;

}

function gotResults(error,results){

    if(error){

        console.log(error);

    }
    else{

        console.log(results);
        objects=results;

    }

}

function draw(){

    image(img,0,0,500,350);
    setInterval(ChangeImage(), 10000);
    if(objects[0].label="person"){

        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){

            document.getElementById("status").innerHTML="Baby detected";
            fill("#20b2aa");
            stroke("#20b2aa");
            percent=Math.floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent.toFixed(0)+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            alarm.stop();
            ChangeImage();

        }

    }
    else{

        document.getElementById("status").innerHTML="Baby is not detected";
        alarm.play();  

    }

}

function ChangeImage(){

    img="babynotdetected.png";
    image(img,0,0,500,350);

}