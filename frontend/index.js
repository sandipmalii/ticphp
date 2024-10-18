// Sample data for demonstration
const worldData = [
    { rank: 1, player: "Ram", wins: 30, points: 1000 },
    { rank: 2, player: "Hari", wins: 25, points: 900 },
    { rank: 3, player: "Sita", wins: 20, points: 880 },
    { rank: 4, player: "Ravan", wins: 20, points: 800 },
    { rank: 5, player: "Bharat", wins: 20, points: 810 },
    { rank: 6, player: "King", wins: 28, points: 600 },
    { rank: 7, player: "Queen", wins: 26, points: 589 },
    { rank: 8, player: "Koon", wins: 22, points: 100},
    // Add more data as needed
];

const leaderboardTable = document.getElementById("leaderboardTable");

// Function to render leaderboard with global winners
function renderGlobalWinners() {
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

    // Render table rows for world data
    const tableBody = document.createElement("tbody");
    worldData.forEach((entry) => {
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
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

// Initial render - Display global winners
renderGlobalWinners();