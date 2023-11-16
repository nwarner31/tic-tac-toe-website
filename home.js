const form = document.getElementById("name-form");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
function submitNames(event) {
    event.preventDefault();
    const p1name = player1.value;
    const p2name = player2.value;

    if(p1name.trim() !== "" || p2name.trim() !== "") {
        localStorage.setItem("player1", p1name);
        localStorage.setItem("player2", p2name);

    } else {
        localStorage.setItem("player1", "Player 1");
        localStorage.setItem("player2", "Player 2");
    }
    window.location.href = "game.html";
}

form.addEventListener("submit", submitNames);