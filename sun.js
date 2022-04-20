class Sun {
    constructor(){
        this.m = 1000000;
        this.rad = Math.pow((3* this.m) / (4 * 3.14159),1/4) ;
        this.pos = createVector(width/2,height/2)
        this.R = random(255), this.G = random(255), this.B= random(255);
        this.gravity = 0.1;
        this.decay = 5;
    }

    show(t){
        // glowing ring that grows and shrinks
        let dia = 20*Math.sin(t) + 400
        noStroke();
        fill('rgba(255,255,120, 0.25)');
        circle(this.pos.x,this.pos.y,dia)
        // Actual outer circle sun
        strokeWeight(4)
        stroke(190,140,30);
        fill(220,170,30);
        circle(this.pos.x,this.pos.y,this.rad*2)
        // inner bright core;
        noStroke();
        fill(255,255,120);
        circle(this.pos.x,this.pos.y,this.rad)
    }
}