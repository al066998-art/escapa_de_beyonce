


const player = document.getElementById('player')
const beyonce = document.getElementById('beyonce')
const gamearea = document.getElementById('game-area')  
const slider = document.getElementById('velocidad')
const valor = document.getElementById('valorVelocidad')
const audio = document.getElementById("musica");
const volumenSlider = document.getElementById("volumen");
const sliderjugador = document.getElementById('velocidadjugador')
const valorjugador = document.getElementById('valorVelocidadjugador')


let playerPosition = {x: 100, y: 100};
let beyoncePosition = {x: 700, y: 700};


let gameStarted = false;


audio.volume = volumenSlider.value;

volumenSlider.addEventListener("input", () => {
  audio.volume = volumenSlider.value;
});

window.addEventListener('keydown', (event) => {
     if (!gameStarted) {
        gameStarted = true;
        gameloop();
    }
    switch (event.key) {
        case 'ArrowUp' :
            if(playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown' : 
            if(playerPosition.y < gamearea.clientHeight - 60) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if(playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight' : 
            if(playerPosition.x < gamearea.clientWidth - 60) playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();
})

let beyonceSpeed = parseFloat(slider.value);
let playerSpeed = parseFloat(sliderjugador.value);

slider.addEventListener('input', () => {
    beyonceSpeed = parseFloat(slider.value);
    valor.textContent = beyonceSpeed;
});
sliderjugador.addEventListener('input', () => {
    playerSpeed = parseFloat(sliderjugador.value);
    valorjugador.textContent = playerSpeed;
});

function movebeyonce() {
    if(beyoncePosition.x < playerPosition.x){
        beyoncePosition.x += beyonceSpeed;
    } else if(beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }
    if(beyoncePosition.y < playerPosition.y){
        beyoncePosition.y += beyonceSpeed;
    } else if(beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }
    updatePositions();
    chekCollisions();
}

function updatePositions(){
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function chekCollisions() {
    if(Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
    Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        alert('Beyonce te atrapo');

        playerPosition = {x: 100, y: 100};
        beyoncePosition = {x: 700, y: 700};
        updatePositions();
        gameStarted = false; 
    }
}

function gameloop() {
    if (!gameStarted) return;
    movebeyonce();
    requestAnimationFrame(gameloop);
}
updatePositions();
