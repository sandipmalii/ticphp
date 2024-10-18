
// Sample data for demonstration
const worldData = [
    { rank: 1, player: "Ram", wins: 30, points: 100 },
    { rank: 2, player: "Hari", wins: 25, points: 90 },
    { rank: 3, player: "Sita", wins: 20, points: 80 },
     { rank: 3, player: "Ravan", wins: 20, points: 80 },
     { rank: 3, player: "Bharat", wins: 20, points: 80 },
     { rank: 1, player: "King", wins: 28, points: 95 },
     { rank: 2, player: "Queen", wins: 26, points: 85 },
     { rank: 3, player: "Koon", wins: 22, points: 75 },
    // Add more data as needed
  ];
  
  const botData = [
  
    { rank: 3, player: "Ravan", wins: 20, points: 80 },
     { rank: 3, player: "Bharat", wins: 20, points: 80 },
    // Add more data as needed
  ];
  
  const categorySelector = document.getElementById("categorySelector");
  const leaderboardTable = document.getElementById("leaderboardTable");
  
  // Function to render leaderboard based on selected category
  function renderLeaderboard(category) {
    const data = category === "world" ? worldData : botData;
  
    // Clear previous table content
    leaderboardTable.innerHTML = "";
  
    // Render table header
    const tableHeader = `
      <thead class="[&amp;_tr]:border-b">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-1/12">Rank</th>
          <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Player</th>
          <th class="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-center">Wins</th>
          <th class="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-center">Points</th>
        </tr>
      </thead>
    `;
    leaderboardTable.insertAdjacentHTML("beforeend", tableHeader);
  
    // Render table rows
    const tableBody = document.createElement("tbody");
    data.forEach((entry) => {
      const row = `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-bold">${entry.rank}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${entry.player}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">${entry.wins}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">${entry.points}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
    leaderboardTable.appendChild(tableBody);
  }
  
  // Initial render
  renderLeaderboard(categorySelector.value);
  
  // Event listener for category selection
  categorySelector.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    renderLeaderboard(selectedCategory);
  });
  