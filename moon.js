
class Moon {
    constructor(){
        this.m = random(20,700);
        this.rad = Math.pow((3* this.m) / (4 * 3.14159),1/3)/2 ;
        this.pos = createVector(random(width),random(height))
        this.vel = createVector(random(1)-0.5,random(1)-0.5)
        this.acc = createVector(0,0)
        this.R = random(255), this.G = random(255), this.B= random(255);
        this.trail = [];
        this.maxTrail = 25;
        this.maxspeed=100000;
        this.skip = 0;
        this.maxforce = 4;
        this.gravity = 0.02;
        this.decay = 0;
    }

    addForce(otherMass, otherPos){
        let distance = Math.sqrt(Math.pow(otherPos.x-this.pos.x,2) + Math.pow(otherPos.y-this.pos.y,2))
        let acc = createVector(otherPos.x-this.pos.x,otherPos.y-this.pos.y)
        acc.normalize()
        acc.mult((this.gravity * (otherMass)/ (distance*distance)))
        this.acc.add(acc)
    }

    update(){
        this.skip++;
        if (this.skip===10){
            if(this.trail.length >= this.maxTrail){
                this.trail.pop();
            }
            if(this.trail.length<this.maxTrail){
                this.trail.unshift(this.pos.copy());
            }
            this.skip = 0;
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.m = this.m-this.decay;
        this.rad = Math.pow((3* this.m) / (4 * 3.14159),1/3)/2 ;
    }

    collision(otherMass,otherVel){
        let newx = this.vel.x * this.m + otherVel.x * otherMass;
        let newy = this.vel.y * this.m + otherVel.y * otherMass;
        let newvel = createVector(newx,newy)
        newvel.div((this.m+otherMass))
        this.vel = newvel;
        this.m = this.m +otherMass;
        this.rad = Math.pow((3* this.m) / (4 * 3.14159),1/3)/2 ;
    }


    edgeLoop(){
        if(this.pos.x > width){
            this.pos.x = 0;
        } else if(this.pos.x < 0){
            this.pos.x = width
        }else if(this.pos.y > height){
            this.pos.y = 0
        }else if(this.pos.y < 0){
            this.pos.y = height
        }
    }

    edgeBounce(){
        if(this.pos.x+this.rad >= width){
            if(this.vel.x > 0){
                this.vel.x = - this.vel.x ; 
            }
        }else if(this.pos.x-this.rad <= 0){
            if(this.vel.x < 0){
                this.vel.x = - this.vel.x ;
            }
        }else if(this.pos.y+this.rad >= height){
            if(this.vel.y > 0){
                this.vel.y = - this.vel.y ;
            }
        }else if(this.pos.y-this.rad <= 0){
            if(this.vel.y < 0){
                this.vel.y = - this.vel.y;
            }
        }
    }

    show(){
        noStroke();
        // Moon
        fill(this.R,this.G,this.B);
        circle(this.pos.x,this.pos.y,this.rad*2)
        for(let i=0;i<this.trail.length;i++){   // Moon Trail
            fill(this.R,this.G,this.B,255-((i*255)/this.maxTrail));
            circle(this.trail[i].x,this.trail[i].y,5)
        }
    }
}