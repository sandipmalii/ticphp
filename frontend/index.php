<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-signin-client_id" content="500494797499-am8lvn18li7e8c9age6a188b09h8ophr.apps.googleusercontent.com">
  <title>Tic Tac Toe</title>
  <link rel="stylesheet" href="styles.css">
  <!-- <link rel="HTMLS" href="./Components/HTMLS/about.html"> -->
  <link rel="stylesheet" href="./Components/CSS/footer.css">
  <?php
  echo '<link rel="stylesheet" href="./responsive-navbar-tictactoe/assets/css/styles.css">';
  ?>
  <?php
  if (isset($_GET['page'])) {
    if ($_GET['page'] == 'about') {
      echo '<link rel="stylesheet" href="./Components/CSS/about.css">';
    }
    if ($_GET['page'] == 'developer') {
      echo '<link rel="stylesheet" href="./Components/CSS/developer.css">';
    }
  }
  ?>

</head>


<body>

  <!-- <a href="./responsive-navbar-tictactoe/index.html"> Navbar</a> -->
  <?php
  include "./responsive-navbar-tictactoe/index.html";
  echo '<script src="./responsive-navbar-tictactoe/assets/js/main.js"></script>';
  ?>

  <div class="entry-section">
      <div class="left">
        <img class="entry-banner" src="./Components/images/ticc.svg" alt="main img">
      </div>
      <div class="right">
        <h1 class="entry-heading"> 
        Play TicTacToe <br>#Online</br>
        <h1>
        <div class="buttons">
          <a href="Link here" class="entry-button" target="_blank" rel="">
             <img class="icon"
              src="./Components/images/world.svg" width='40'>  <p> Play Online</p></a>

          <a href="./Components/HTMLS/mainboard.html" class="entry-button"  rel=""> 
            <img class="icon"
              src="./Components/images/cp.svg" width='40'> <p> Vs Computer</p></a>

          <a href="link" class="entry-button" target="_blank" rel=""> 
    <img class="icon" src="./Components/images/friend.svg" width='40'> 
    <div> Vs Friends</div>
</a>

      </div>

      </div>
  </div>


    <?php
    if (isset($_GET['page'])) {
      if ($_GET['page'] == 'about') {
        include "./Components/HTMLS/about.html";
      }
      if ($_GET['page'] == 'developer') {
        include "./Components/HTMLS/developer.html";
      }
    } else {
      echo " ";
    }
    ?>

    <!--==================== RANKING ====================-->

    <div class="grid md:grid-cols-2 items-start gap-4">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div class="flex flex-col space-y-1.5 p-4">
          <h3>Leaderboard </h3><br></br>
          <h4>World Ranking</h4><br>
        </div>
        <div class="p-0 ranking-board">
          <div class="overflow-auto">
            <div class="relative w-full overflow-auto">
              <table id="leaderboardTable" class="w-full caption-bottom text-sm">

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>

    <!--=============== FOOTER ===============-->
    <!-- <footer id="footer">
    <div class="footercontainer">
     
      <navdowm>
        <a href="./Components/HTMLS/privacy.html">Privacy Policy</a> |
        <a href="#">Terms of Service</a> |
        <a href="#">Contact Us</a> |
        <a href="./Components/HTMLS/about.html">About</a> |
        <a href="./Components/HTMLS/developer.html">Developers</a> |
        <a href="./Components/HTMLS/feedback.html">Feedback</a>
      </navdowm> 
       <p>© TicTacToe. All rights reserved.</p>
    </div>
  </footer> -->


    <footer>
      <?php include "./Components/HTMLS/footer.html"; ?>
    </footer>



    <script src="./index.js"></script>

    <script src="https://apis.google.com/js/platform.js" ></script>
       

</body>

</html>