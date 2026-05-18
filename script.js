// ---------- GAME STATE ----------
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let winMessage = '';

    // Score tracking
    let scoreX = 0;
    let scoreO = 0;
    let scoreDraw = 0;

    // DOM Elements
    const boardContainer = document.getElementById('board');
    const turnTextSpan = document.getElementById('turnText');
    const statusTextSpan = document.getElementById('statusText');
    const scoreXSpan = document.getElementById('scoreX');
    const scoreOSpan = document.getElementById('scoreO');
    const scoreDrawSpan = document.getElementById('scoreDraw');
    const turnIconLeft = document.getElementById('turnIconLeft');
    const turnIconRight = document.getElementById('turnIconRight');

    // Win patterns
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    // ---------- UI Update Helpers ----------
    function updateScoreUI() {
        scoreXSpan.innerText = scoreX;
        scoreOSpan.innerText = scoreO;
        scoreDrawSpan.innerText = scoreDraw;
    }

    function updateTurnDisplay() {
        if (gameActive) {
            if (currentPlayer === 'X') {
                turnTextSpan.innerHTML = "🌸ninte turn";
                // optional: dynamically change turn icons alt text (images remain same placeholders)
                if (turnIconLeft) turnIconLeft.alt = "X turn decoration";
                if (turnIconRight) turnIconRight.alt = "X turn sparkle";
            } else {
                turnTextSpan.innerHTML = "🌼eni njaan🌼";
                if (turnIconLeft) turnIconLeft.alt = "O turn decoration";
                if (turnIconRight) turnIconRight.alt = "O turn sparkle";
            }
        } else {
            if (winMessage.includes('X wins')) turnTextSpan.innerHTML = "belle resonillaattaa";
            else if (winMessage.includes('O wins')) turnTextSpan.innerHTML = "🏆 O jeyichh! 🏆";
            else if (winMessage.includes('draw')) turnTextSpan.innerHTML = "🍬 randaalu jeyichitilla 🍬";
        }
    }

    // ---------- Game Logic ----------
    function checkGameStatus() {
        let winner = null;
        for (let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a];
                break;
            }
        }

        if (winner) {
            gameActive = false;
            if (winner === 'X') {
                winMessage = '🌸 nee belle show akandaa 🌸';
                scoreX++;
                updateScoreUI();
                statusTextSpan.innerText = winMessage;
                turnTextSpan.innerText = "✨ X jeyich! ✨";
            } else {
                winMessage = '🌼 heheheee 🌼';
                scoreO++;
                updateScoreUI();
                statusTextSpan.innerText = winMessage;
                turnTextSpan.innerText = "🍊 hehehe njaan jeyich! 🍊";
            }
            updateTurnDisplay();
            return true;
        }
        else if (!board.includes('')) {
            gameActive = false;
            winMessage = ' draw aahn show aakanda! 🌈 onnode kalikaan indaa?';
            scoreDraw++;
            updateScoreUI();
            statusTextSpan.innerText = winMessage;
            turnTextSpan.innerText = "🤝 tie aan! 🤝";
            updateTurnDisplay();
            return true;
        }
        return false;
    }

    function handleCellClick(index) {
        if (!gameActive) {
            statusTextSpan.innerText = "onnode kalikanenki new game touch cheyy";
            return;
        }
        if (board[index] !== '') {
            statusTextSpan.innerText = "vere ethenkilu edk";
            setTimeout(() => {
                if(gameActive) statusTextSpan.innerText = `Current turn: ${currentPlayer === 'X' ? '🌸 X' : '🌼 O'}`;
                else statusTextSpan.innerText = winMessage;
            }, 900);
            return;
        }

        board[index] = currentPlayer;
        renderBoard();

        const gameEnded = checkGameStatus();
        if (!gameEnded) {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            updateTurnDisplay();
            statusTextSpan.innerText = `✨ ${currentPlayer === 'X' ? '🌸 X' : '🌼 O'} nte chance! ✨`;
        } else {
            updateTurnDisplay();
            renderBoard();
        }
    }

    // ---------- Board Rendering ----------
    function renderBoard() {
        boardContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i] === 'X') {
                cell.classList.add('X');
                cell.innerText = 'X';
            } else if (board[i] === 'O') {
                cell.classList.add('O');
                cell.innerText = 'O';
            } else {
                cell.innerText = '';
            }
            cell.addEventListener('click', (function(idx) {
                return function() { handleCellClick(idx); };
            })(i));
            boardContainer.appendChild(cell);
        }
    }

    // ---------- Game Controls ----------
    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        winMessage = '';
        renderBoard();
        updateTurnDisplay();
        statusTextSpan.innerText = "✨ aadyam muthale thodangeetta ✨";
    }

    function fullReset() {
        scoreX = 0;
        scoreO = 0;
        scoreDraw = 0;
        updateScoreUI();
        resetGame();
        statusTextSpan.innerText = "🌸 athyam muthale started, ok? 🌸";
    }

    // ---------- Initialization ----------
    function init() {
        renderBoard();
        updateTurnDisplay();
        updateScoreUI();
        statusTextSpan.innerText = "ethenkilm onn touch cheyy poothe 🌸";
        document.getElementById('resetBtn').addEventListener('click', resetGame);
        document.getElementById('fullResetBtn').addEventListener('click', fullReset);
    }

    // Start the game when page loads
    init();