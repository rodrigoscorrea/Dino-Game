
function game() {

let FPS = 300;
const HEIGHT = 300;
const WIDTH = 1024;
const PROB_NUVEM = 1;
const PROB_OBJ = 1;

let fatorTroca = 0;
let troca;

let gameLoop;
let deserto;
let dino;

//Nuvens
let nuvens = [];

//Objetos
let objs = [];
let novoObj;
let ultDist = WIDTH; 
let frame = 0;

//Pontuação
let contScore = 0;
let score = 0;

//Velocidade dos objetos
let velocidadeObjetos = 2;
let intervaloVelocidade = 60 * 1000; 
let aumentoVelocidadeInterval;

//Funcionalidades
let podeColidir = 1;

//Variáveis auxiliares diversas
let dinoPulou;
let acertou = 0;

function aumentarVelocidade() {
  velocidadeObjetos += 1; 
}

function init() {
  acertou = 0;
  gameLoop = setInterval(run, 1000 / FPS)
  troca = setInterval(trocaTurno, 1000*60);
  deserto = new Deserto();
  dino = new Dino();  

  let containerScore = document.createElement("div");
  containerScore.className = "score";
  containerScore.id = "scre";
  containerScore.innerHTML = `Score: ${score}`
  deserto.element.appendChild(containerScore)
  dinoPulou = false;
}

// Listeners
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault()
    if (dino.status === 3) {
      dino.status = 0;
      dinoPulou = true;
      aumentoVelocidadeInterval = setInterval(aumentarVelocidade, intervaloVelocidade);
    }
    if (dino.status === 0) dino.status = 1;
  }
})

window.addEventListener("keydown", (e)=>{
  if(e.code === "KeyP"){
    if(dino.status === 0) dino.status = 3;
    else if(dino.status === 3) dino.status = 0;
    clearInterval(troca);
    clearInterval(aumentoVelocidadeInterval);
  }
})

window.addEventListener("keydown", (e)=>{
  if(e.code === "ArrowDown"){
    e.preventDefault()
    if(dino.agachado === 0) {
      dino.agachado = 1;
    } else if (dino.agachado === 1){
      dino.agachado = 0;
    }
  }
})

window.addEventListener("keydown", (e)=>{
  if(e.code === "KeyD"){
    if(podeColidir === 1) {
      podeColidir = 0;
    } else if(podeColidir === 0) {
      podeColidir = 1
    };
  }
})

class Deserto {
  constructor() {
    this.element = document.createElement("div")
    this.element.className = "deserto";
    this.element.id = "des";

    this.element.style.width = `${WIDTH}px`;
    this.element.style.height = `${HEIGHT}px`;
    document.getElementById("game").appendChild(this.element)
    
    this.chao = document.createElement("div")
    this.chao.className = "chao"
    this.chao.style.backgroundPositionX = 0;
    this.element.appendChild(this.chao)
  }
  mover() {
    this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - (velocidadeObjetos-1)}px`
  }
}

class Dino {
  #status
  constructor() {
    
    this.backgroundPositionsX = {
      correndo1: "-1391px",
      correndo2: "-1457px",
      pulando: "-1259px",
      parado: "-58px",
      agachado1:"-1654px",
      agachado2:"-1745px",
      morto: "-1526px"
    }
    this.agachado = 0;
    this.#status = 3; // 0-correndo, 1-subindo, 2-descendo, 3-parado, 4 - morto
    this.altumaMinima = 5;
    this.altumaMaxima = 125;
    this.element = document.createElement("div");
    this.element.id = "dinossauro"
    this.element.className = "dino";
    this.element.style.width = "63px";
    this.element.style.height = "67px";
    this.element.style.backgroundPositionX = this.backgroundPositionsX.parado;
    this.element.style.backgroundPositionY = "-2px";
    this.element.style.bottom = `${this.altumaMinima}px`;
    deserto.element.appendChild(this.element);
  }
  set status(value) {
    if (value >= 0 && value <= 4) this.#status = value;
  }

  set height(value) {
    this.element.style.height = `${value}px`;
  }

  set width(value) {
    this.element.style.width = `${value}px`;
  }

  get status() {
    return this.#status;
  }

  get width(){
    return parseInt(this.element.style.width);
  }

  get height(){
    return parseInt(this.element.style.height);
  }

  get y(){
    return parseInt(this.element.style.bottom) * -1;
  }

  mudaForma(width, height){
      if (this.agachado === 0){
        this.element.style.width = "63px";
        this.element.style.height = "67px";
        this.element.style.backgroundPositionY = "-2px";
      } else if (this.agachado === 1){
        this.element.style.width = `${width}px`
        this.element.style.height = `${height}px`
        this.element.style.backgroundPositionY = "-32px";
      }
  }

  correr() {
    if (this.#status === 0 && frame % 20 === 0 && this.agachado === 0) {
      this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
      this.element.style.backgroundPositionY = "-4px";
      this.element.style.bottom = `${this.altumaMinima+2}px`;
      
      this.mudaForma(66,70)
    } else if (this.#status === 0 && frame % 20 === 0 && this.agachado === 1){
      this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.agachado1 ? this.backgroundPositionsX.agachado2 : this.backgroundPositionsX.agachado1;
      
      this.mudaForma(84,40)
      
    }
    else if (this.#status === 1) { // se estiver subindo - pulando
      this.agachado = 0;
      this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
      this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
      this.element.style.backgroundPositionY = "-4px";
      if (parseInt(this.element.style.bottom) >= this.altumaMaxima) this.status = 2;
      
      this.mudaForma(66,70)
    }
    else if (this.#status === 2) { // se estiver descendo - pulando
      this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
      if (parseInt(this.element.style.bottom) <= this.altumaMinima) this.status = 0;
    }
  }
  morrer(){
    this.element.style.backgroundPositionX = this.backgroundPositionsX.morto;
    this.element.style.width = "60px";
    this.element.style.height = "66px";
  }
}

class Cactus {
  constructor() {
    this.tiposCactus = {
      cactus1:"-336px",
      cactus2:"-361px", 
      cactus3:"-411px",
      cactusG1:"-491px",
      cactusG2:"-491px",
      cactusG4:"-605px"
    }
    
    this.element = document.createElement("div");
    this.element.id = "cactu"
    this.element.className = "cactus";

    this.element.style.backgroundPositionY = "-2px";
    this.element.style.bottom = "10px";
    this.element.style.right = 0;
    deserto.element.appendChild(this.element);

  }

  mudaForma(largura, altura){
    this.element.style.width = `${largura}px`;
    this.element.style.height = `${altura}px`;
  }

  implementa(){
    let randCactus = 0;
    if(velocidadeObjetos >= 4) {
      randCactus = parseInt(Math.random() * 6) + 1;
    } else if(velocidadeObjetos === 3) {
      randCactus = parseInt(Math.random() * 3) + 1;
    } else {
      randCactus = parseInt(Math.random() * 2) + 1;
    }

    switch (randCactus){
      case 1:
        this.element.style.backgroundPositionX = this.tiposCactus.cactus1;
        this.mudaForma(23,48)
      break;
      case 2:
        this.element.style.backgroundPositionX = this.tiposCactus.cactus2;
        this.mudaForma(49,48)
      break;
      case 3:
        this.element.style.backgroundPositionX = this.tiposCactus.cactus3;
        this.mudaForma(72,48)
      break;
      case 4:
        this.element.style.backgroundPositionX = this.tiposCactus.cactusG1;
        this.mudaForma(36,68)
      break; 
      case 5:
        this.element.style.backgroundPositionX = this.tiposCactus.cactusG2;
        this.mudaForma(70,68)
      break; 
      case 6:
        this.element.style.backgroundPositionX = this.tiposCactus.cactusG4;
        this.mudaForma(100,68)
      break;     
    }
  }
  mover(){
    this.element.style.right = `${parseInt(this.element.style.right) + velocidadeObjetos}px`;
  }
  get width(){
    return parseInt(this.element.style.width);
  }
  get height(){
    return parseInt(this.element.style.height);
  }
  get x(){
    return parseInt(this.element.style.right)*-1
  }
  get y(){
    return parseInt(this.element.style.bottom)
  }
}

class Bird {
  constructor () {
    this.bird = {
      asa1:"-196px", 
      asa2:"-263px"
    }
    
    this.element = document.createElement("div");
    this.element.id = "passaro"
    this.element.className = "bird";
    deserto.element.appendChild(this.element)

    this.element.style.right = 0;
    this.element.style.width = "60px";
    this.element.style.height = "45px";
    this.element.style.backgroundPositionY = "-2px";
  }
  implementa(){
    let alt = parseInt(Math.random() * 3) + 1;
    switch(alt){
      case 1:
        this.element.style.bottom = "20px";
      break;
      case 2:
        this.element.style.bottom = "55px";
      break;
      case 3:
        this.element.style.bottom = "100px";
      break;
    }
  }
  mover(){
    if (frame % 20 === 0) {
      this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.bird.asa1 ? this.bird.asa2 : this.bird.asa1;
    }
    this.element.style.right = `${parseInt(this.element.style.right) + (velocidadeObjetos + 1)}px`;
  }  
  
  get width(){
    return parseInt(this.element.style.width);
  }

  get height(){
    return parseInt(this.element.style.height);
  }
  get x(){
    return parseInt(this.element.style.right)*-1
  }

  get y(){
    return parseInt(this.element.style.bottom)
  }
}
class Nuvem {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "nuvem";
    this.element.style.right = 0;
    this.element.style.top = `${parseInt(Math.random() * 200)}px`
    deserto.element.appendChild(this.element);
  }
  mover() {
    this.element.style.right = `${parseInt(this.element.style.right) + (velocidadeObjetos/2)}px`;
  }

  get x(){
    return parseInt(this.element.style.right)*-1
  }
}

function run() {
  if(dino.status != 3 && dino.status != 4){
    frame = frame + 1;
    contScore = contScore + 1;

    if(contScore === 30){
      score = score + 1;
      let scre = document.getElementById("scre");
      scre.innerHTML = `Score: ${score}`;
      contScore = 0;
    }
    
    if (frame === FPS) frame = 0;
    deserto.mover()
    dino.correr()
    
    if(Math.random() * 200 <= PROB_NUVEM){
      nuvens.push(new Nuvem());
    }
    if(Math.random() <= PROB_OBJ && objs.length < 3){
      const distMin = 170; 
      
      if(score < 300) {
        novoObj = new Cactus()
        novoObj.implementa()
        objs.push(novoObj);
        ultDist = WIDTH - novoObj.width;

      } else if(score >= 300){
        let randObj;
        if((WIDTH - ultDist) > distMin || objs.length === 0){
          randObj = parseInt((Math.random() * 2)) + 1
          switch(randObj) {
            case 1:
              novoObj = new Cactus();
              novoObj.implementa();
              objs.push(novoObj);
              ultDist = WIDTH;
              
            break;
            case 2:
              novoObj = new Bird();
              novoObj.implementa();
              objs.push(novoObj);
              ultDist = WIDTH;
            break;
          }
        }
        
      }

    }

    if (frame % 2 === 0){

      nuvens.forEach(nuvem => {
        nuvem.mover()
        if(detectaSaida(nuvem) === 1){
          nuvem.element.remove()
          nuvens.shift()
        }
      });

      objs.forEach((obj) => {
        if(obj instanceof Cactus){
          obj.mover()
        } else if(obj instanceof Bird){
          obj.mover()
        }

        if(detectaSaida(obj) === 1){
          if(obj instanceof Cactus){
            obj.element.remove()
          }
          if(obj instanceof Bird){
            obj.element.remove()
          }
          objs.shift()
        }
      });
    }

    detectaColisao(dino, objs)
  }
}

function trocaTurno() { 
  const deserto = document.getElementById("des");
  const elementos = document.querySelectorAll("*");

  if(fatorTroca === 0){
    deserto.style.backgroundColor = "#000"
    elementos.forEach((elemento) => {
      elemento.style.filter = "invert(100%)"; 
    });

    fatorTroca = 1;
  } else if(fatorTroca === 1){
    deserto.style.backgroundColor = "#fff";
    elementos.forEach((elemento) => {
      elemento.style.filter = "invert(0%)"; 
    });
    fatorTroca = 0;
  }
}

function clickOver(){
  const elementos = document.querySelectorAll("*");
    elementos.forEach((elemento) => {
      elemento.style.filter = "invert(0%)"; 

    });

  const des = document.getElementById("des")
  des.remove(); 
  objs = [];
  frame = 0;
  score = 0;
  init();
}

function gameover(){
  
  dino.status = 4; 
  velocidadeObjetos = 2;

  let restart = document.createElement("div");
  restart.className = "btnRestart"
  restart.id = "btnRes"
  restart.backgroundPositionX = "-4px";
  restart.style.width = "55px";
  restart.style.height = "46px";
  restart.style.backgroundPositionY = "-2px"
  deserto.element.appendChild(restart)

  let over = document.createElement("div");
  over.className = "gameOver";
  over.style.backgroundPositionX = "-969px";
  over.style.backgroundPositionY = "-20px";
  over.style.width = "293px";
  over.style.height = "20px";
  over.style.marginBottom = "140px";
  deserto.element.appendChild(over);

  dino.morrer();

  clearInterval(gameLoop);
  clearInterval(troca);
  clearInterval(aumentoVelocidadeInterval);

  let botao = document.getElementById("btnRes");
  botao.addEventListener("click", clickOver)
}

function detectaSaida(obj){
  if((obj.x * -1) > WIDTH){
    return 1;
  } 
  return 0;
}
/* function apresentacao(){
  const corpo = document.getElementsByTagName("BODY")[0]
  const cont = document.createElement("div")
  cont.className = "containerApresentacao"
  cont.id = "contApre"
  corpo.appendChild(cont)

  const contApre = document.getElementById("contApre");
  const info = document.createElement("p")
  info.className = "apresentacao"
  info.innerHTML = "Aluno: Rodrigo Santos Correa || Matrícula: 22251139. "
  contApre.appendChild(info) 

} */
function detectaColisao(dino, objs) {
  if(podeColidir === 1){
    let dinoLeft = WIDTH-20;
    let dinoBottom = dino.y * -1;
    let dinoTop = dino.height + dinoBottom;
    let dinoRight = dinoLeft - dino.width;
    
    let objLeft 
    let objTop
    let objRight
    let objBottom

    objs.forEach(obj => {

      objRight = obj.x;
      objBottom = obj.y;
      objLeft = objRight - obj.width;
      objTop = objBottom + obj.height;
      
      if (
        dinoRight < (objLeft * -1) &&
        dinoLeft > (objRight * -1) &&
        dinoBottom < objTop &&
        dinoTop > objBottom &&
        acertou === 0
      ) {
        gameover()
        acertou = 1;
      }
    });
  }
}

init();

}

if(window.location.href.includes("game")){
  game()
} 
