img  = "";
objects = [];
status = "";
song = "";

function preload()
{
    //song = loadSound("thank_god.mp3");
}
    function setup()
    {
       canvas = createCanvas(380,380);
       canvas.center();
       video = createCapture(VIDEO);
       video.size(380,380)
       video.hide();
       objectDetector = ml5.objectDetector("cocossd",modelloaded);
        document.getElementById("status").innerHTML = "Status - object detecting";
    }

    

    function modelloaded()
    {
        console.log("model loaded");
        status = true;
    }

    function gotResult(error,results)
    {
        if (error)
        {
            console.log(error);
        }

        else
        {
            console.log(results);
            objects  = results;
        }

    }

    function draw()
    {
        
        image(video,0,0,380,380);
        if (status != "")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video,gotResult);
            for(i=0;i<objects.length;i++)
            {
            document.getElementById("status").innerHTML = "Status : Object-Detected";
            noFill();
            stroke(r,g,b);
            
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent+"%",objects[i].x,objects[i].y);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (objects[i].label == "person")
            {
                document.getElementById("objects").innerHTML = "baby found";
                //song.stop();
            }
            else 
            {
                document.getElementById("objects").innerHTML = "baby not found";
                //song.play();
            }
            }
        }
        
        
    }