const player1_nameplate = document.getElementById("player1");
const player2_nameplate = document.getElementById("player2");
const ties_nameplate = document.getElementById("ties");


const player1_name = localStorage.getItem("player1");
const player2_name = localStorage.getItem("player2");

const player1 = {name: player1_name, mark: "x", wins: 0, nameplate: player1_nameplate};
const player2 = {name: player2_name, mark: "o", wins: 0, nameplate: player2_nameplate};
const ties = {name: "Ties", ties: 0, nameplate: ties_nameplate};

if (player1_name === null || player2_name === null) {
    window.location.href = "home.html";
}

function generateNameplate(player_tag, wins) {
    return `<h3>${player_tag}: ${wins}</h3>`;
}

function generateHeader(text) {
    const header = document.getElementById("header");
    header.innerHTML = text;
}

let currentPlayer = player1;

player1_nameplate.insertAdjacentHTML("afterbegin",generateNameplate(`${player1.name} wins`, player1.wins));
player2_nameplate.insertAdjacentHTML("afterbegin", generateNameplate(`${player2.name} wins`, player2.wins));
generateHeader(`${currentPlayer.name}'s turn`);

ties_nameplate.innerHTML = generateNameplate(ties.name, ties.ties);

const gameboard = document.getElementById("gameboard");

let movesMade = 0;
function gameClick(event) {
    //console.log(event.target.getAttribute("xPos"));
    //console.log(event.target.getAttribute("yPos"));
    const target = event.target;
    console.log(target.tagName);
    if (!target.getAttribute("mark") && target.tagName === "DIV") {
        target.innerHTML = `<img class="gameboard-image" src="${currentPlayer.mark}.png" />`
        target.setAttribute("mark", currentPlayer.mark);

        const isWinner = checkWinner(target.getAttribute("xPos"), target.getAttribute("yPos"), currentPlayer.mark);
        if(isWinner) {
            gameboard.removeEventListener("click", gameClick);
            currentPlayer.wins++;
            currentPlayer.nameplate.innerHTML = generateNameplate(`${currentPlayer.name} wins`, currentPlayer.wins);
            setTimeout(() => {
                //alert(`${currentPlayer.name} is the winner!`);
                generateHeader(`${currentPlayer.name} is the winner!`);
                endGame();
            }, 100);

        } else {
            if (movesMade === 8) {
                ties.ties++;
                ties.nameplate.innerHTML = generateNameplate(ties.name, ties.ties)
                setTimeout(() => {
                    //alert("It's a draw.");
                    generateHeader("It's a draw.");
                    endGame();
                }, 100);
                gameboard.removeEventListener("click", gameClick);
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                generateHeader(`${currentPlayer.name}'s turn`);
            }

        }
    }
    movesMade++;
}

gameboard.addEventListener("click", gameClick);

function checkWinner(x, y, player) {
    let isWinner = false;
    const xColumn =  document.querySelectorAll(`[xPos='${x}']`);
    isWinner = checkNodes(xColumn, player);
    if (!isWinner) {
        const yRow =  document.querySelectorAll(`[yPos='${y}']`);
        isWinner = checkNodes(yRow, player);
    }
    if (x === y && !isWinner) {
        const diagonal = [];
        for(let i = 1; i < 4; i++) {
            diagonal.push(document.querySelector(`[xPos='${i}'][yPos='${i}']`));
        }
        isWinner = checkNodes(diagonal, player);
    }
    if (Number(x) + Number(y) === 4 && !isWinner) {
        const diagonal = [];
        for(let i = 1; i < 4; i++) {
            diagonal.push(document.querySelector(`[xPos='${i}'][yPos='${4-i}']`));
        }
        isWinner = checkNodes(diagonal, player);
    }
    return isWinner;
}

function checkNodes (nodes, mark) {
    let isWinner = true;

    nodes.forEach(function(node) {
        if (node.getAttribute("mark") !== mark) {
            isWinner = false;
        }
    });
    return isWinner;
}

function quit() {
    localStorage.clear();
    window.location.href = "home.html";
}
const game_over_buttons = document.getElementById("game-over-buttons");
function playAgain() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    for (const gamespace of gameboard.querySelectorAll(".game-space")) {
        gamespace.removeAttribute("mark");
        gamespace.innerHTML = "";
    }
    gameboard.addEventListener("click", gameClick);
    generateHeader(`${currentPlayer.name}'s turn`);
    movesMade = 0;
    game_over_buttons.innerHTML = "";
}
function endGame() {



    game_over_buttons.innerHTML = "<button onclick='quit()'>Quit</button><button onclick='playAgain()'>Play Again</button>"
}

function resetGame() {

}
