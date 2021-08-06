class Human
{
   constructor (x, y, xspeed, yspeed, h)
   {
     this.x=x;
     this.y=y;
     this.xspeed = xspeed;
     this.yspeed = yspeed;
     this.age = random(1,100);
     this.Healthy = h;
     this.recovered = false;
     this.dead = false;

     this.Contagiousness = 0.01; 
   
     this.framesElapsed = 0;
     this.recoveryTime = 500;

     /*
     Following values taken from https://www.worldometers.info/coronavirus/coronavirus-age-sex-demographics/
     */
     if(this.age<10) this.deathProbability = 0;
     else if(this.age<40) this.deathProbability = 0.2;
     else if(this.age<50) this.deathProbability = 0.4;
     else if(this.age < 60) this.deathProbability = 1.3;
     else if(this.age < 70) this.deathProbability = 3.6;
     else if(this.age < 80) this.deathProbability = 8;
     else if(this.age >= 80) this.deathProbability = 14.8;
   }

    hug(h)
    {
        if (this.Healthy == h.Healthy || this.recovered || this.dead || h.recovered || h.dead) return;
        var outcome = random(0,1);
        if(outcome > this.Contagiousness) return; 
        this.Healthy = false;
        h.Healthy = false;
    }

    getDrawn()
    {
        if(this.dead) fill(0);
        else if(this.recovered) fill(212,175,55);
        else if(this.Healthy) fill(0,255,0);
        else fill(255,0,0);
        ellipse(this.x,this.y,35,35);
    }

    move()
    {
        if(this.x+this.xspeed >= width || this.x+this.xspeed < 0) this.xspeed *= -1;
        if(this.y+this.yspeed >= height || this.y+this.yspeed < 0) this.yspeed *= -1;
        
        this.x+=this.xspeed;
        this.y+=this.yspeed;
    }

    countFrames()
    {
        if(!this.Healthy && !this.recovered && !this.dead)
        {
            this.framesElapsed++;
        }
    }

    recover()
    {
        if(this.framesElapsed >= this.recoveryTime && !this.recovered && !this.dead)
        {
            var outcome = random(0,100);
            if(outcome <= this.deathProbability)
            {
                this.recovered= false;
                this.dead = true;
                console.log("Died person at the age of: " + this.age);
            }
            else 
            {
                this.recovered = true;
                this.dead = false;
            }
        }
    }
}





////////////Other File//////////////

var humans = [];
var totalHumans = 100

function setup()
{
  
   createCanvas(1600,900);
   humans = [];
   for(let i = 0;i<totalHumans;i++) 
   {
     humans.push(new Human(random(0,width),random(0,height),random(-1,2),random(-1,2),true));
   }
   humans[3].Healthy = false;
}

function draw()
{
  background(255);
  for(let i = 0;i<humans.length;i++)
  {
     humans[i].move();
     for(let j = 0 ; j<humans.length;j++)
     {
         if (i==j) continue;
         
         var distance = sqrt (abs(humans[j].y - humans[i].y) + abs(humans[j].x - humans[i].x));
         if(distance < 7) humans[i].hug(humans[j]);
     }
     humans[i].getDrawn();
     humans[i].countFrames();
     humans[i].recover();
  }
  
}

function closerHuman(h, m)
{
   var closer = h[0];
   var minDistance  = sqrt (abs(h[0].y - m.y) + abs(h[0].x - m.x));
   for(let i = 1 ; i< h.length;i++)
   {
     var distance =  sqrt (abs(h[i].y - m.y) + abs(h[i].x - m.x));
     if (distance < minDistance) closer = h[i];
   }
   return closer;
}