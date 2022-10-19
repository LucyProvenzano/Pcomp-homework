let angle = 0.0003;
let port;
let connectBtn;
let oldVal = 0.00003;

function setup() {
  createCanvas(720, 500, WEBGL);
  port = createSerial();
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick); 
}

function draw() {
  background(0);
  //debugger;
  let serialVal = parseFloat(port.readUntil('\n'));
  
  if(isNaN(serialVal)){
    serialVal = oldVal;
  }
  if(serialVal > 0.005){
    serialVal = oldVal;
  }
  oldVal = serialVal;

  console.log("Old val: ", oldVal, "new val: ", serialVal);

  for(let a =-20;a<TWO_PI;a+=5){
    normalMaterial();
    translate(a+50,0)
    rotateZ(sin(angle));
    rotateZ(cos(angle));
    cone(20,40,12,10);
    angle += parseFloat(serialVal);// 0.005;
  }


  for(let a =-20;a<TWO_PI;a+=5){
    normalMaterial();
    translate(a+80,0)
    rotateZ(sin(angle));
    rotateZ(cos(angle));
    cone(20,40,12,10);
    //angle+= 0.00003
  }

  for(let a =-20;a<TWO_PI;a+=2){
    normalMaterial();
    translate(a+110,0)
    rotateZ(sin(angle));
    rotateZ(cos(angle));
    cone(20,40,12,10);
    //angle+= 0.00003
  }

  for(let a =-20;a<TWO_PI;a+=2){
    normalMaterial();
    translate(a+140,0)
    rotateZ(sin(angle));
    rotateZ(cos(angle));
    cone(20,40,12,10);
    //angle+= 0.00003
  }

  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
  
  port.clear();
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}
