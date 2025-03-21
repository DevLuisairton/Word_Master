// Banco de palavras por categoria para o modo desafio
const categoryWords = {
  "animais": ["abelha", "aranha", "baleia", "borboleta", "cachorro", "camelo", "cavalo", "cobra", "crocodilo", 
              "elefante", "formiga", "gato", "girafa", "hiena", "javali", "lagarto", "leão", "macaco", "ovelha", 
              "panda", "papagaio", "peixe", "raposa", "rato", "sapo", "tartaruga", "tigre", "urso", "vaca", "zebra"],
  "frutas": ["abacate", "abacaxi", "acerola", "ameixa", "amora", "banana", "caju", "carambola", "cereja", "coco", 
            "figo", "goiaba", "jabuticaba", "jaca", "kiwi", "laranja", "limão", "maçã", "mamão", "manga", 
            "maracujá", "melancia", "melão", "morango", "pera", "pêssego", "pitanga", "tangerina", "uva"],
  "profissões": ["advogado", "arquiteto", "artista", "bombeiro", "cabeleireiro", "contador", "dentista", 
                "enfermeiro", "engenheiro", "escritor", "garçom", "jornalista", "juiz", "marceneiro", "médico", 
                "motorista", "padeiro", "pedreiro", "piloto", "pintor", "policial", "professor", "programador", 
                "secretário", "vendedor"],
  "países": ["alemanha", "argentina", "brasil", "canadá", "china", "espanha", "estados unidos", "frança", 
            "índia", "itália", "japão", "méxico", "portugal", "rússia", "suíça"],
  "objetos": ["cadeira", "computador", "garrafa", "janela", "livro", "mesa", "microfone", "oculos", "panela", 
             "relógio", "telefone", "ventilador"]
};

// Unificar todas as palavras em um único dicionário
const allWords = [
  "abacate", "abacaxi", "abelha", "abrigo", "abril", "abrir", "aceitar", "acertar", "achar",
  "banana", "banco", "banda", "banho", "barato", "barco", "barra", "base", "batata",
  "cabelo", "cabo", "cacto", "café", "caixa", "calma", "calor", "cama", "caminho",
  "dado", "dama", "dança", "data", "debate", "dedo", "defeito", "deixar", "desafio",
  "escola", "escova", "escrita", "espaço", "esporte", "esquina", "estado", "estilo", "estrada",
  "fabula", "face", "fácil", "fada", "falar", "família", "famoso", "fantasia", "fazer",
  "gaivota", "galinha", "galo", "ganhar", "garfo", "garrafa", "gato", "gelo", "gema",
  "hábil", "hábito", "harmonia", "haver", "herói", "história", "hoje", "homem", "honra",
  "idade", "ideia", "idioma", "igual", "ilha", "imagem", "imenso", "imitar", "império",
  "jabuticaba", "jabuti", "jaca", "janta", "jantar", "janela", "jardim", "jarro", "jeito",
  "kiwi", "koala",
  "lábio", "lago", "lagosta", "lanche", "largo", "laranja", "laser", "lateral", "legal",
  "maçã", "macaco", "machado", "madeira", "madrugada", "mágica", "maio", "maior", "mais",
  "nadar", "nariz", "nascer", "natal", "natureza", "nave", "neblina", "necessário", "negar",
  "obra", "observar", "oceano", "óculos", "oeste", "oficial", "olhar", "olho", "ombro",
  "pacote", "padaria", "pai", "paixão", "palavra", "palhaço", "palmeira", "pálpebra", "panda",
  "quadrado", "quadro", "qualidade", "quando", "quantidade", "quanto", "quarto", "quase", "quebrar",
  "raiz", "ramo", "rápido", "raposa", "raro", "rasgar", "rastro", "rato", "razão",
  "sábado", "saber", "sabor", "safira", "saia", "sala", "saldo", "saltar", "salvar",
  "tabela", "tábua", "tambor", "tampa", "tarde", "tarefa", "táxi", "teatro", "teclado",
  "uivar", "último", "ultrapassar", "umbigo", "umidade", "único", "unir", "universo", "urso",
  "vacina", "vaga", "vagalume", "vale", "valente", "valor", "vantagem", "varanda", "vassoura",
  "xadrez", "xarope", "xerife", "xícara",
  "zebra", "zelo", "zinco", "zona", "zoológico", "zoom"
];

// Adicionar palavras das categorias ao dicionário principal
Object.values(categoryWords).forEach(category => {
  category.forEach(word => {
    if (!allWords.includes(word)) allWords.push(word);
  });
});

const portugueseDictionary = [...new Set(allWords)].sort();

// Configuração de valores das letras (como Scrabble)
const letterValues = {
  'a': 1, 'b': 3, 'c': 2, 'd': 2, 'e': 1, 'f': 4, 'g': 4, 'h': 4, 'i': 1, 'j': 5,
  'k': 5, 'l': 2, 'm': 3, 'n': 1, 'o': 1, 'p': 2, 'q': 6, 'r': 1, 's': 1, 't': 1,
  'u': 1, 'v': 4, 'w': 5, 'x': 8, 'y': 5, 'z': 8
};

// Novos efeitos sonoros
const soundEffects = {
  success: new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'),
  error: new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_fail.ogg'),
  powerup: new Audio('https://actions.google.com/sounds/v1/cartoon/clang.ogg')
};

// Estado do jogo ampliado
let gameState = {
  score: 0,
  timeLeft: 60,
  currentMode: 'classic',
  currentCategory: '',
  difficulty: 'medium',
  activeLetters: [],
  formedWords: [],
  timerInterval: null,
  powerUps: {
    shuffle: 2,
    addTime: 1,
    hint: 1
  },
  highScores: JSON.parse(localStorage.getItem('highScores')) || {},
  soundEnabled: true
};

// Elementos do DOM
const elements = {
  scoreDisplay: document.getElementById('score'),
  timerDisplay: document.getElementById('timer'),
  modeDisplay: document.getElementById('current-mode'),
  wordCountDisplay: document.getElementById('word-count'),
  letterTiles: document.getElementById('letter-tiles'),
  wordInput: document.getElementById('word-input'),
  submitButton: document.getElementById('submit-word'),
  clearButton: document.getElementById('clear-word'),
  wordList: document.getElementById('word-list'),
  changeModeButton: document.getElementById('change-mode-btn'),
  settingsButton: document.getElementById('settings-btn'),
  gameModesModal: document.getElementById('game-modes'),
  settingsModal: document.getElementById('settings'),
  modeOptions: document.querySelectorAll('.mode-option'),
  startGameButton: document.getElementById('start-game'),
  saveSettingsButton: document.getElementById('save-settings'),
  themeToggle: document.getElementById('theme-toggle'),
  soundToggle: document.getElementById('sound-toggle'),
  difficultySelect: document.getElementById('difficulty'),
  languageSelect: document.getElementById('language'),
  gameOver: document.getElementById('game-over'),
  finalScore: document.getElementById('final-score'),
  playAgainButton: document.getElementById('play-again'),
  wordDisplay: document.getElementById('word-display'),
  shuffleLettersButton: document.getElementById('shuffle-letters'),
  addTimeButton: document.getElementById('add-time'),
  revealWordButton: document.getElementById('reveal-word'),
  gameResultMessage: document.getElementById('game-result-message')
};

// Funções novas e melhoradas
function canFormWord(word) {
  const availableLetters = [...gameState.activeLetters];
  
  for (const char of word) {
    const index = availableLetters.indexOf(char);
    if (index === -1) return false;
    availableLetters.splice(index, 1);
  }
  return true;
}

function updateHighScores() {
  const key = `${gameState.currentMode}-${gameState.difficulty}`;
  if (!gameState.highScores[key] || gameState.score > gameState.highScores[key]) {
    gameState.highScores[key] = gameState.score;
    localStorage.setItem('highScores', JSON.stringify(gameState.highScores));
  }
}

function playSound(effect) {
  if (gameState.soundEnabled && soundEffects[effect]) {
    soundEffects[effect].cloneNode(true).play();
  }
}

// Inicialização
function init() {
  setupEventListeners();
  elements.gameModesModal.classList.remove('hidden');
}

// Configuração de event listeners
function setupEventListeners() {
  elements.submitButton.addEventListener('click', handleWordSubmission);
  elements.clearButton.addEventListener('click', clearWordInput);
  elements.changeModeButton.addEventListener('click', () => elements.gameModesModal.classList.remove('hidden'));
  elements.settingsButton.addEventListener('click', () => elements.settingsModal.classList.remove('hidden'));
  elements.startGameButton.addEventListener('click', startGame);
  elements.saveSettingsButton.addEventListener('click', saveSettings);
  elements.playAgainButton.addEventListener('click', restartGame);
  
  elements.modeOptions.forEach(option => {
    option.addEventListener('click', () => {
      elements.modeOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      gameState.currentMode = option.dataset.mode;
    });
  });
  
  elements.wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleWordSubmission();
    }
  });
  
  elements.shuffleLettersButton.addEventListener('click', usePowerUpShuffle);
  elements.addTimeButton.addEventListener('click', usePowerUpAddTime);
  elements.revealWordButton.addEventListener('click', usePowerUpHint);
  
  elements.themeToggle.addEventListener('change', toggleTheme);
}

// Iniciar jogo
function startGame() {
  elements.gameModesModal.classList.add('hidden');
  resetGameState();
  updateModeDisplay();
  generateLetters();
  startTimer();
}

// Reiniciar jogo
function restartGame() {
  elements.gameOver.classList.add('hidden');
  startGame();
}

// Resetar estado do jogo
function resetGameState() {
  gameState.score = 0;
  gameState.formedWords = [];
  
  switch(gameState.currentMode) {
    case 'classic':
      gameState.timeLeft = 60;
      break;
    case 'survival':
      gameState.timeLeft = 30;
      break;
    case 'challenge':
      gameState.timeLeft = 90;
      const categories = Object.keys(categoryWords);
      gameState.currentCategory = categories[Math.floor(Math.random() * categories.length)];
      break;
    case 'multiplayer':
      gameState.timeLeft = 120;
      break;
  }
  
  gameState.powerUps = {
    shuffle: 2,
    addTime: 1,
    hint: 1
  };
  
  updateScoreDisplay();
  updateTimerDisplay();
  updateWordCountDisplay();
  clearWordList();
  elements.wordInput.value = '';
}

// Atualizar exibição do modo atual
function updateModeDisplay() {
  let modeText = '';
  switch(gameState.currentMode) {
    case 'classic':
      modeText = 'Clássico';
      break;
    case 'survival':
      modeText = 'Sobrevivência';
      break;
    case 'challenge':
      modeText = `Desafio: ${gameState.currentCategory}`;
      break;
    case 'multiplayer':
      modeText = 'Multiplayer';
      break;
  }
  elements.modeDisplay.textContent = modeText;
}

// Gerar letras para o jogo
function generateLetters() {
  const vowelSet = ['a', 'e', 'i', 'o', 'u'];
  const config = {
    easy: { vowels: 5, commons: 5, rares: 0 },
    medium: { vowels: 4, commons: 5, rares: 1 },
    hard: { vowels: 3, commons: 4, rares: 3 }
  }[gameState.difficulty];

  let letters = [
    ...Array.from({length: config.vowels}, () => vowelSet[Math.floor(Math.random() * vowelSet.length)]),
    ...Array.from({length: config.commons}, () => getRandomConsonant('common')),
    ...Array.from({length: config.rares}, () => getRandomConsonant('rare'))
  ];

  gameState.activeLetters = shuffleArray(letters);
  renderLetterTiles();
}

function getRandomConsonant(type) {
  const consonants = {
    common: ['r', 's', 't', 'l', 'n', 'd', 'c', 'm', 'p', 'b'],
    rare: ['f', 'g', 'h', 'j', 'q', 'v', 'x', 'z', 'k', 'w', 'y']
  };
  return consonants[type][Math.floor(Math.random() * consonants[type].length)];
}

// Embaralhar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}

// Renderizar os tiles de letras no tabuleiro
function renderLetterTiles() {
  elements.letterTiles.innerHTML = '';
  
  gameState.activeLetters.forEach(letter => {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.textContent = letter.toUpperCase();
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'letter-value';
    valueSpan.textContent = letterValues[letter] || 1;
    tile.appendChild(valueSpan);
    
    tile.addEventListener('click', () => {
      elements.wordInput.value += letter;
      tile.classList.add('pulse');
      setTimeout(() => {
        tile.classList.remove('pulse');
      }, 500);
    });
    
    elements.letterTiles.appendChild(tile);
  });
}

// Iniciar o timer do jogo
function startTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }
  
  updateTimerDisplay();
  
  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft -= 1;
    updateTimerDisplay();
    
    if (gameState.timeLeft <= 0) {
      endGame(false);
    }
    
    checkForWin();
  }, 1000);
}

// Atualizar o display do timer
function updateTimerDisplay() {
  elements.timerDisplay.textContent = gameState.timeLeft;
  
  if (gameState.timeLeft <= 10) {
    elements.timerDisplay.style.color = 'var(--danger-color)';
    elements.timerDisplay.classList.add('pulse');
  } else {
    elements.timerDisplay.style.color = '';
    elements.timerDisplay.classList.remove('pulse');
  }
}

// Atualizar display de pontuação
function updateScoreDisplay() {
  elements.scoreDisplay.textContent = gameState.score;
}

// Atualizar contador de palavras
function updateWordCountDisplay() {
  elements.wordCountDisplay.textContent = gameState.formedWords.length;
}

// Limpar lista de palavras
function clearWordList() {
  elements.wordList.innerHTML = '';
}

// Adicionar palavra à lista
function addWordToList(word, score) {
  const wordItem = document.createElement('div');
  wordItem.className = 'word-item fade-in';
  
  const wordText = document.createElement('span');
  wordText.textContent = word;
  
  const wordScore = document.createElement('span');
  wordScore.className = 'word-score';
  wordScore.textContent = score;
  
  wordItem.appendChild(wordText);
  wordItem.appendChild(wordScore);
  elements.wordList.appendChild(wordItem);
}

// Calcular pontuação de uma palavra
function calculateWordScore(word) {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += letterValues[word[i]] || 1;
  }
  
  if (word.length >= 5) {
    score += Math.floor(word.length / 2);
  }
  
  return score;
}

// Verificar se a palavra é válida
function isValidWord(word) {
  if (word.length < 3) {
    showMessage("Mínimo 3 letras!", 'error');
    return false;
  }
  
  if (gameState.formedWords.includes(word)) {
    showMessage("Palavra repetida!", 'warning');
    return false;
  }

  if (!canFormWord(word)) {
    showMessage("Letras insuficientes!", 'error');
    return false;
  }

  if (gameState.currentMode === 'challenge' && 
     !categoryWords[gameState.currentCategory].includes(word)) {
    showMessage(`Categoria: ${gameState.currentCategory}`, 'warning');
    return false;
  }

  if (!portugueseDictionary.includes(word)) {
    showMessage("Palavra inválida!", 'error');
    return false;
  }

  return true;
}

// Mostrar mensagem temporária
function showMessage(message, type = 'info') {
  let messageElement = document.getElementById('message-display');
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'message-display';
    messageElement.style.backgroundColor = `var(--${type}-color)`;
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = 'var(--border-radius)';
    messageElement.style.marginBottom = '10px';
    messageElement.style.textAlign = 'center';
    elements.wordInput.parentNode.insertBefore(messageElement, elements.wordInput);
  }
  
  messageElement.textContent = message;
  messageElement.classList.add('fade-in');
  
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

// Processar envio de palavra
function handleWordSubmission() {
  const word = elements.wordInput.value.trim().toLowerCase();
  
  if (!word) return;
  
  if (isValidWord(word)) {
    const wordScore = calculateWordScore(word);
    gameState.score += wordScore;
    gameState.formedWords.push(word);
    
    if (gameState.currentMode === 'survival') {
      gameState.timeLeft += Math.min(word.length * 2, 15);
    }
    
    updateScoreDisplay();
    updateTimerDisplay();
    addWordToList(word, wordScore);
    clearWordInput();
    playSound('success');
    
    if (gameState.currentMode === 'dynamic') {
      generateLetters();
    }
    
    checkForWin();
  } else {
    playSound('error');
  }
}

// Limpar campo de entrada
function clearWordInput() {
  elements.wordInput.value = '';
}

// Power-up: Embaralhar letras
function usePowerUpShuffle() {
  if (gameState.powerUps.shuffle > 0) {
    gameState.activeLetters = shuffleArray(gameState.activeLetters);
    renderLetterTiles();
    gameState.powerUps.shuffle--;
    updatePowerUpDisplay();
  } else {
    showMessage("Você não tem mais usos deste power-up!", 'warning');
  }
}

// Power-up: Adicionar tempo
function usePowerUpAddTime() {
  if (gameState.powerUps.addTime > 0) {
    gameState.timeLeft += 10;
    updateTimerDisplay();
    gameState.powerUps.addTime--;
    updatePowerUpDisplay();
  } else {
    showMessage("Você não tem mais usos deste power-up!", 'warning');
  }
}

// Power-up: Dica de palavra
function usePowerUpHint() {
  if (gameState.powerUps.hint > 0) {
    const possibleWords = findPossibleWords();
    
    if (possibleWords.length > 0) {
      const randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
      const hint = randomWord.substring(0, 3) + "...";
      
      elements.wordDisplay.textContent = hint;
      elements.wordDisplay.style.color = 'var(--primary-color)';
      
      setTimeout(() => {
        elements.wordDisplay.textContent = '';
        elements.wordDisplay.style.color = '';
      }, 3000);
      
      gameState.powerUps.hint--;
      updatePowerUpDisplay();
    } else {
      showMessage("Não foi possível encontrar uma dica!", 'warning');
    }
  } else {
    showMessage("Você não tem mais usos deste power-up!", 'warning');
  }
}

// Encontrar palavras possíveis com as letras disponíveis
function findPossibleWords() {
  const letterCount = {};
  gameState.activeLetters.forEach(letter => {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  });
  
  const possibleWords = [];
  let wordsToCheck = portugueseDictionary;
  
  if (gameState.currentMode === 'challenge') {
    wordsToCheck = categoryWords[gameState.currentCategory];
  }
  
  wordsToCheck.forEach(word => {
    if (word.length >= 3 && !gameState.formedWords.includes(word)) {
      const wordLetterCount = {};
      let isPossible = true;
      
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
      }
      
      for (const letter in wordLetterCount) {
        if (!letterCount[letter] || wordLetterCount[letter] > letterCount[letter]) {
          isPossible = false;
          break;
        }
      }
      
      if (isPossible) {
        possibleWords.push(word);
      }
    }
  });
  
  return possibleWords;
}

// Atualizar displays dos power-ups
function updatePowerUpDisplay() {
  elements.shuffleLettersButton.textContent = `Embaralhar (${gameState.powerUps.shuffle})`;
  elements.addTimeButton.textContent = `+10 Seg (${gameState.powerUps.addTime})`;
  elements.revealWordButton.textContent = `Dica (${gameState.powerUps.hint})`;
}

// Finalizar o jogo
function endGame(isWin = false) {
  clearInterval(gameState.timerInterval);
  elements.gameOver.classList.remove('hidden');
  
  if (isWin) {
    elements.gameResultMessage.textContent = "Parabéns, você venceu!";
    elements.gameOver.style.backgroundColor = '#4CAF50';
  } else {
    elements.gameResultMessage.textContent = "Tempo esgotado! Tente novamente.";
    elements.gameOver.style.backgroundColor = '#';
  }
  
  elements.finalScore.textContent = gameState.score;
  updateHighScores();
}

// Verificar vitória
function checkForWin() {
  if (gameState.formedWords.length >= 10 || gameState.score >= 100) {
    endGame(true);
    return true;
  }
  return false;
}

// Salvar configurações
function saveSettings() {
  gameState.difficulty = elements.difficultySelect.value;
  
  if (elements.themeToggle.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  
  elements.settingsModal.classList.add('hidden');
}

// Alternar tema
function toggleTheme() {
  if (elements.themeToggle.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', init);