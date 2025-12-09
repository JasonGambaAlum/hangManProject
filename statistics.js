window.addEventListener("message", (event) => {
    const { name, games, wins, losses } = event.data;
    
    const tbody = document.querySelector("table tbody");
    
    tbody.innerHTML = '';
    
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${games}</td>
        <td>${wins}</td>
        <td>${losses}</td>
    `;
    
    tbody.appendChild(row);
});