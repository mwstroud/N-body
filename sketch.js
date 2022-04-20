
let moons = [];
let sun;

let distance;
let deleteList = [];
let dragging = false;
let createMoon;
let createPosX, createPosY;
let dirX, dirY;
let size=1;
let max;
let a=0,b=0,c=0;
let asig=1,bsig=1,csig=1;
let rave = 20;
let t = 0;
let issun = true;

function preload(){ 
	glasses = loadImage("sunglasses.png");
}

function setup() {
    var cnv=createCanvas(windowWidth-100, windowHeight-100);
    cnv.position(50, 50);

    //moons = new Array(rave);
    //for(let i=0;i<moons.length;i++){
        //moons[i] = new Moon();
    //}
    sun = new Sun();
}


function draw() {
    {
        rave = moons.length;
        colorShift=Math.floor(random(3)+1)
        if (colorShift===1){
            a=a+rave*asig
            if (a>255){
                asig=-1
            }
            if (a<0){
                asig=1
            }

        }
        if (colorShift===2){
            b=b+rave*bsig
            if (b>255){
                bsig=-1
            }
            if (b<0){
                bsig=1
            }
        }
        if (colorShift===3){
            c=c+rave*csig
            if (c>255){
                csig=-1
            }
            if (c<0){
                csig=1
            }
        }
    }

    background(20,20,20);
    
    assignColor(a,b,c);
    calculateForces();
    filterNull();
    handleCollisions();
    filterNull();
    if(issun){
        t=t+0.01;
        sun.show(t);
        addSunForce();
        filterNull();
        handleSunHit()
    }
    filterNull();
    handleFizzle()
    filterNull();
    maxMoon();
    for(let i=0;i<moons.length;i++){
        moons[i].edgeBounce();
        moons[i].update();
        moons[i].show();
        if (i === max){
            image(glasses, moons[i].pos.x-(moons[i].rad), moons[i].pos.y-(moons[i].rad+2), moons[i].rad+10, moons[i].rad+10);
        }
    }

    // Create a new moon
    if(dragging){
        size=size+0.3;
        dirX = createPosX-(mouseX - createPosX)
        dirY = createPosY-(mouseY - createPosY)
        stroke(220,170,20);
        strokeWeight(4);
        line(createPosX,createPosY,dirX,dirY);
        circle(createPosX,createPosY,size);
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth-100, windowHeight-100);
    sun.pos.x = width/2;
    sun.pos.y = height/2;
}

function mousePressed() {
    if(!dragging && mouseX>0 && mouseX <width && mouseY>0 && mouseY<height){
        dragging = true;
        createPosX = mouseX;
        createPosY = mouseY;
    }
}

function mouseReleased(){
    if (dragging && mouseX>0 && mouseX <width && mouseY>0 && mouseY<height){
        dragging=false;
        createMoon = new Moon();
        createMoon.m = (4/3)*3.14159* Math.pow(size,3);
        createMoon.rad = size;
        createMoon.pos.x = createPosX;
        createMoon.pos.y = createPosY;
        createMoon.vel.x = (dirX - createPosX)/80;
        createMoon.vel.y = (dirY - createPosY)/80;
        moons.push(createMoon)
        size = 1;
    }
}

function calculateForces(){
    for(let i=0;i<moons.length;i++){
        for(let j=0;j<moons.length;j++){
            if (i!== j){
                moons[i].addForce(moons[j].m,moons[j].pos)
            }
        }  
    }
}

function addSunForce(){
    for(let i=0;i<moons.length;i++){
        moons[i].addForce(sun.m,sun.pos)
    }
}

function handleCollisions(){
    for(let i=0;i<moons.length;i++){
        if(moons[i]===null){
            continue;
        }
        for(let j=0;j<moons.length;j++){
            if(moons[j]===null){
                continue;
            }
            if (i!== j){
                distance = Math.sqrt(Math.pow(moons[i].pos.x - moons[j].pos.x,2) + Math.pow(moons[i].pos.y - moons[j].pos.y,2));
                if(distance <= (moons[i].rad +moons[j].rad)){
                    if(moons[i].m >= moons[j].m){
                        moons[i].collision(moons[j].m,moons[j].vel);
                        moons[j] = null;
                    }
                }
            }
        }  
    }
    
}

function handleFizzle(){
    for(let i=0;i<moons.length;i++){
        if(moons[i].m<=0){
            moons[i] = null
        }
    }
}

function filterNull(){
    moons = moons.filter(element => {
        return element !== null;
    });
}

function maxMoon(){
    let radList = []
    for(let i=0;i<moons.length;i++){
        radList.push(moons[i].rad)
    }
    let maxRad = Math.max(...radList);
    max = radList.indexOf(Math.max(...radList));
}

function assignColor(r,g,b){
    for(let i=0;i<moons.length;i++){
        moons[i].R = r;
        moons[i].G = g;
        moons[i].B = b;
    }
}

function handleSunHit(){
    for(let i=0;i<moons.length;i++){
        distance = Math.sqrt(Math.pow(moons[i].pos.x - sun.pos.x,2) + Math.pow(moons[i].pos.y - sun.pos.y,2));
        if(distance <= (moons[i].rad +sun.rad)){
            moons[i] = null;
        }
    }
}

function suntoggle(){
    if(issun){
        issun=false;
    } else{
        issun = true;
    }
}