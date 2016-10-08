var bird;
var pipe = [];
function setup(){
  createCanvas(800, 900);
	bird = new Bird();
  pipe.push(new Pipe())
  bird.x = 50;
	bird.y = 100;
}

function draw(){
  background(0,75,70);
	bird.show();
  for(var i =0; i < pipe.length; i++){
    pipe[i].show();
    pipe[i].update();

    if(bird.y < pipe[i].top || bird.y >  height - pipe[i].bot ){
      if(bird.x > pipe[i].x && bird.x < pipe[i].x + pipe[i].w){
        console.log("HIT PIPE!!");
        noLoop();             
      }
    }
  }
  bird.update();

  if(frameCount % 100 == 0){
    pipe.push(new Pipe());
  }


}

function keyPressed(){
  if(key == " "){
    bird.flap();
  }	
}

function Bird(){
	this.x;
	this.y;
  this.gravity = 0.7;	
  this.velocity = 0.9;
  this.velocity_cap = 10; 
  this.show = function(){
		fill(255,255,0);
		ellipse(this.x,this.y,50,50)
		
	}

  this.update = function(){
    this.velocity += this.gravity;
    if(this.y > height){
      this.velocity = 0;
      this.y = height;
      //game is over
    }
    if(this.y < 0){
      this.velocity = 0;
      this.y = 0;

    }

    if(this.velocity > this.velocity_cap){ 
      this.velocity = this.velocity_cap;
    }
    
    if(this.velocity < -1 *this.velocity_cap){ 
      this.velocity = -1* this.velocity_cap;
    }

    this.y += this.velocity;
  }

  this.flap = function(){
    this.velocity -= 15; 
  }
}

function Pipe(){
  this.x = width;
  this.velocity = 5.5;
  this.w = 50;
  this.top = random(height/2);
  this.bot = random(height/2);
  this.show = function(){
    fill(0,0,255);
    rect(this.x,0,this.w ,this.top);
    rect(this.x,height-this.bot,this.w,this.bot);
  }

  this.update = function(){
    this.x -= this.velocity
  }

}
