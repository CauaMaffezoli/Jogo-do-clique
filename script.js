let score = 0; 
let clickValue = 5; 
let upgrades = 0; 
let gameStarted = false; 
let gameInterval; 

const scoreDisplay = document.getElementById('score');
const clickValueDisplay = document.getElementById('click-value');
const upgradesDisplay = document.getElementById('upgrades');
const clickButton = document.getElementById('click-btn');
const upgradeButtons = [
    document.getElementById('upgrade-1'),
    document.getElementById('upgrade-2'),
    document.getElementById('upgrade-3')
];
const gameEndMessage = document.getElementById('game-end');
const fallingFruits = document.getElementById('falling-fruits');

function updateScore() {
    scoreDisplay.textContent = score;
    clickValueDisplay.textContent = clickValue;
    upgradesDisplay.textContent = upgrades;
}

function checkGameOver() {
    if (score >= 500) {
        gameEndMessage.style.display = 'block'; 
        clickButton.disabled = true; 
        upgradeButtons.forEach(button => button.disabled = true); 
        clearInterval(gameInterval); 
    }
}

clickButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startMinigame(); 
    } else {
        score += clickValue; 
        updateScore();
        checkGameOver(); 
    }
});

function buyUpgrade(cost, increase, button, upgradeNumber) {
    if (score >= cost) {
        score -= cost; 
        clickValue += increase; 
        upgrades++; 
        updateScore();

        if (upgradeNumber !== 3) {
            button.disabled = true; 
            button.textContent = `Upgrade ${upgradeNumber} (Já comprado)`; 
        }
    }
}

// Ações quando o jogador compra upgrades
upgradeButtons[0].addEventListener('click', () => buyUpgrade(10, 5, upgradeButtons[0], 1)); 
upgradeButtons[1].addEventListener('click', () => buyUpgrade(50, 10, upgradeButtons[1], 2)); 
upgradeButtons[2].addEventListener('click', () => buyUpgrade(100, 20, upgradeButtons[2], 3)); 

function generateFruit() {
    const fruitTypes = ['red', 'yellow', 'green', 'purple']; // Tipos de frutas
    const fruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];

    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    fruit.style.backgroundColor = fruitType;

    const startX = Math.random() * (fallingFruits.clientWidth - 50); 
    fruit.style.left = `${startX}px`;

    fruit.style.top = '0px'; 

    fruit.addEventListener('click', () => {
        score += clickValue; 
        updateScore();
        fruit.remove(); 
        checkGameOver();
    });

    fallingFruits.appendChild(fruit);
    
    let top = 0;
    const fall = () => {
        top += 2;
        if (top < 350) {
            fruit.style.top = `${top}px`;
            requestAnimationFrame(fall); 
        } else {
            fruit.remove(); 
        }
    };

    requestAnimationFrame(fall);
}

function startMinigame() {
    gameInterval = setInterval(generateFruit, 1000);
}

window.onload = () => {
    updateScore(); 
};
