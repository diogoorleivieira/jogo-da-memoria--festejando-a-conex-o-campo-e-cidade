let pairs = ['🌄','🌆','🐎','🚓','🌱','🚦'];//imagens
let cards = [];
let flipped = [];
let matched = [];
let cols = 4, rows = 3;
let cardW, cardH;

function setup() {
  createCanvas(600, 450);
  cardW = width/cols;
  cardH = height/rows;
  cards = shuffle([...pairs, ...pairs]);
}

function draw() {
  background(33,10,800);//todas as cores
  textSize(cardW * 0.6);
  textAlign(CENTER, CENTER);
  for(let i=0; i<cards.length; i++){
    let x = (i % cols)*cardW;
    let y = floor(i/cols)*cardH;
    stroke(0);
    strokeWeight(2);
    if(flipped.includes(i) || matched.includes(i)){
      fill(33, 60, 00);
      rect(x+10, y+10, cardW-20, cardH-20, 10);
      fill(30,0,50);
      text(cards[i], x+cardW/2, y+cardH/2);
    } else {
      fill(20,00,0);
      rect(x+10, y+10, cardW-20, cardH-20, 10);
    }
  }
  if(matched.length === cards.length){
    noStroke();
    fill(400);
    textSize(32);
    text("Você conectou o campo e a cidade!", width/2, height/2);//fraze final
  }
}

function mousePressed(){// funções para abrir os quadros
  for(let i=0; i<cards.length; i++){
    let x = (i % cols)*cardW;
    let y = floor(i/cols)*cardH;
    if(mouseX > x+10 && mouseX < x+cardW-10 && mouseY > y+10 && mouseY < y+cardH-10){
      if(flipped.length < 2 && !flipped.includes(i) && !matched.includes(i)){
        flipped.push(i);
        if(flipped.length === 2){
          setTimeout(checkMatch, 800);
        }
      }
    }
  }
}

function checkMatch(){
  if(cards[flipped[0]] === cards[flipped[1]]){
    matched.push(...flipped);
  }
  flipped = [];
}

