const playingArea = document.querySelector('.playing-area');
const KEY_X = 'keyX';
const KEY_O = 'keyO';
const CURRENT_PLAYER = "player";
let player = localStorage.getItem(CURRENT_PLAYER) || 'X';
let playerX = [];
let playerO = [];
const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
];

playingArea.insertAdjacentHTML('beforeend', makeBoxMarkup());
playingArea.addEventListener('click', onBoxClick);

function makeBoxMarkup() {
    const markup = [];
    for (let i = 1; i <= 9; i+=1) { 
        markup.push(`<div class="target-box" id="${i}"></div>`);
    };
    return markup.join('');
};

function onBoxClick(e) {
    if (!e.target.textContent) {
        const id = Number(e.target.id);
        if (player === 'X') {
            playerX.push(id);
            localStorage.setItem(KEY_X, JSON.stringify(playerX))
            e.target.textContent = player;

            const isWinner = checkWinner(playerX);
            if (isWinner) {
                console.log(`${player} is winner!`); 
                setTimeout(() => {
                    reset();
                }, 500)
                return;
            }
        } else {
            playerO.push(id);
            localStorage.setItem(KEY_O, JSON.stringify(playerO))
            e.target.textContent = player;

            const isWinner = checkWinner(playerO);
            if (isWinner) {
                console.log(`${player} is winner!`); 
                setTimeout(() => {
                    reset();
                },500)
                return;
            }
        }
    };
    player = playerX.includes(Number(e.target.id)) ? 'O' : 'X';
    localStorage.setItem(CURRENT_PLAYER, player);
};

function checkWinner(arr) {
    return win.some(values => values.every(value => arr.includes(value)))
};

function reset() {
    playingArea.innerHTML = makeBoxMarkup();
    localStorage.clear();
    player = "X";
    playerX = [];
    playerO = [];
};

(function () {
    try {
        [...playingArea.children].forEach(item => {
            const id = Number(item.dataset.id)
            if (playerX.includes(id)) {
                item.textContent = "X"
            } else if (playerO.includes(id)) {
                item.textContent = "O"
            }
        })

    } catch (e) {
        console.log('localStorage empty');
    }

})();