let data;
window.addEventListener("message", (event) => {
    const { dateGame, wordToGuess, gameDuration, wonGames, losses } = event.data;

    consolelog(event.data);
    consolelog(event);
    consolelog("Received data in statistics.js");

    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = '';

    // const row = document.createElement("tr");
    // row.innerHTML = `
    //     <td>${dateGame}</td>
    //     <td>${wordToGuess}</td>
    //     <td>${gameDuration}</td>
    //     <td>${wonGames}</td>
    //     <td>${losses}</td>
    // `;
    data = event;
    event.data.forEach(element => {
        const row = document.createElement("tr");
        const statistic = JSON.parse(element);
        row.innerHTML = `
            <td>${statistic?.dateGame}</td>
            <td>${statistic?.wordToGuess}</td>
            <td>${statistic?.gameDuration}</td>
            <td>${statistic?.wonGames}</td>
            <td>${statistic?.losses}</td>
        `;
        tbody.appendChild(row);
    });

});


onload = () => {
    console.log("Statistics page loaded");
    console.log(data);
}