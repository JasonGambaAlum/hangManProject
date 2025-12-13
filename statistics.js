
window.addEventListener("message", (event) => {
    console.log(event.data.data);
    console.log("Received data in statistics.js");

    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = '';

    const data = event.data.data;
    const parsedDAta = JSON.parse(data);
    parsedDAta.forEach(element => {
        const row = document.createElement("tr");
        const { dateGame, wordToGuess, gameDuration, wonGames, losses } = element;
        row.innerHTML = `
            <td>${dateGame}</td>
            <td>${wordToGuess}</td>
            <td>${gameDuration}</td>
            <td>${wonGames}</td>
            <td>${losses}</td>
        `;
        tbody.appendChild(row);
    });

});

