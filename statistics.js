
window.addEventListener("message", (event) => {

    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = '';

    const data = event.data.data;
    const parsedDAta = JSON.parse(data);

    let lGames = 0; let wGames = 0; let totalGames = 0;

    let rowfinal = document.createElement("tr");
    parsedDAta.forEach(element => {
        const row = document.createElement("tr");
        const { dateGame, wordToGuess, gameDuration, wonGames, losses } = element;
        totalGames++;
        if (wonGames == 1) { wGames++; }
        else if (losses == 1) { lGames++; }

        row.innerHTML = `
            <td>${dateGame}</td>
            <td>${wordToGuess}</td>
            <td>${gameDuration}</td>
            <td>${wonGames}</td>
            <td>${losses}</td>
        `;

        tbody.appendChild(row);
    });

    rowfinal.innerHTML = `
        <td style="background: #e7e7e7;"><strong>Totals</strong></td>
        <td><strong>${totalGames}</strong></td>
        <td><strong>-</strong></td>
        <td><strong>${wGames}</strong></td>
        <td><strong>${lGames}</strong></td>
    `;
    tbody.appendChild(rowfinal);

});
