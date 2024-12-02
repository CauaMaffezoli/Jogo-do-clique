let score = 0; // Pontuação atual do jogador
let clickValue = 5; // Valor inicial por clique
let upgrades = 0; // Número de upgrades comprados
let gameStarted = false; // Verificar se o jogo foi iniciado
let gameInterval; // Intervalo para a geração de frutas

// Elementos da interface
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

// Função para atualizar a pontuação na interface
function updateScore() {
    scoreDisplay.textContent = score;
    clickValueDisplay.textContent = clickValue;
    upgradesDisplay.textContent = upgrades;
}

// Função para verificar se o jogo terminou
function checkGameOver() {
    if (score >= 500) {
        gameEndMessage.style.display = 'block'; // Exibe a mensagem de fim de jogo
        clickButton.disabled = true; // Desabilita o botão de clique
        upgradeButtons.forEach(button => button.disabled = true); // Desabilita os botões de upgrade
        clearInterval(gameInterval); // Interrompe a geração de frutas
    }
}

// Ação quando o jogador clica no botão "Clique Aqui!"
clickButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startMinigame(); // Inicia o minigame após o primeiro clique
    } else {
        score += clickValue; // Adiciona os pontos com o valor do clique
        updateScore(); // Atualiza a pontuação após o clique
        checkGameOver(); // Verifica se o jogo acabou
    }
});

// Função para comprar upgrades
function buyUpgrade(cost, increase, button, upgradeNumber) {
    if (score >= cost) {
        score -= cost; // Deduz os pontos do custo do upgrade
        clickValue += increase; // Aumenta o valor do clique
        upgrades++; // Incrementa o número de upgrades
        updateScore(); // Atualiza as informações após a compra
        // Não vamos desabilitar o botão nem mudar o texto se for o Upgrade 3
        if (upgradeNumber !== 3) {
            button.disabled = true; // Desabilita o botão de upgrade após a compra (Exceto no Upgrade 3)
            button.textContent = `Upgrade ${upgradeNumber} (Já comprado)`; // Atualiza o texto do botão
        }
    }
}

// Ações quando o jogador compra upgrades
upgradeButtons[0].addEventListener('click', () => buyUpgrade(10, 5, upgradeButtons[0], 1)); // Upgrade 1 aumenta em 5 pontos
upgradeButtons[1].addEventListener('click', () => buyUpgrade(50, 10, upgradeButtons[1], 2)); // Upgrade 2 aumenta em 10 pontos
upgradeButtons[2].addEventListener('click', () => buyUpgrade(100, 20, upgradeButtons[2], 3)); // Upgrade 3 aumenta em 20 pontos, sem mudar o botão ou layout

// Função para gerar as frutas no minigame
function generateFruit() {
    const fruitTypes = ['red', 'yellow', 'green', 'purple']; // Tipos de frutas
    const fruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];

    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    fruit.style.backgroundColor = fruitType;

    // Posição inicial aleatória dentro da largura do minigame
    const startX = Math.random() * (fallingFruits.clientWidth - 50); // 50 é o tamanho da fruta
    fruit.style.left = `${startX}px`;

    fruit.style.top = '0px'; // Começa a fruta do topo

    fruit.addEventListener('click', () => {
        score += clickValue; // A cada fruta clicada, a pontuação aumenta pelo valor do clique
        updateScore(); // Atualiza a pontuação
        fruit.remove(); // Remove a fruta após o clique
        checkGameOver(); // Verifica se o jogo terminou
    });

    fallingFruits.appendChild(fruit);
    
    // Animação para a fruta cair
    let top = 0;
    const fall = () => {
        top += 2;
        if (top < 350) { // Mantém o limite de queda
            fruit.style.top = `${top}px`;
            requestAnimationFrame(fall); // Usando requestAnimationFrame para uma animação suave
        } else {
            fruit.remove(); // Remove a fruta quando atingir o fundo
        }
    };

    requestAnimationFrame(fall);
}

// Função para iniciar o minigame
function startMinigame() {
    gameInterval = setInterval(generateFruit, 1000); // Gera uma nova fruta a cada segundo
}

// Função para iniciar o jogo e configurar elementos
window.onload = () => {
    updateScore(); // Inicializa a pontuação ao carregar a página
};
