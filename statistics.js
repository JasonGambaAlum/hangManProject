window.addEventListener("message", (event) => {
    const { dateGame, wordToGuess, gameDuration, wonGames, losses } = event.data;
    
    const tbody = document.querySelector("table tbody");
    
    tbody.innerHTML = '';
    
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${dateGame}</td>
        <td>${wordToGuess}</td>
        <td>${gameDuration}</td>
        <td>${wonGames}</td>
        <td>${losses}</td>
    `;
    
    tbody.appendChild(row);
});