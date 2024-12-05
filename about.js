

// Generic function to show a screen
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll(".palette-screen").forEach((screen) => {
      screen.classList.add("d-none");
    });
  
    // Show the specific screen
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.remove("d-none");
    }
  }
  
  // Generic function to close a screen
  function closeScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add("d-none");
    }
  }
  
  // Add event listeners for "About Me"
  document.getElementById("aboutme").addEventListener("click", () => {
    showScreen("aboutMeScreen");
     // phoneImage.style.zIndex = '1'; 
    appGrid.classList.add('d-none');
    phoneImage.style.background = 'none';
    phoneImage.style.backgroundColor = '#FEFEFD';
   // Hide the footer
    const footer = document.getElementById("footer");
    footer.classList.add("d-none");

  });
  
  document.getElementById("closeAboutMeScreen").addEventListener("click", () => {
    closeScreen("aboutMeScreen");
    appGrid.classList.remove('d-none'); // Show app grid
    phoneImage.style.background = 'linear-gradient(#4C7878, #304E4E, black)';
    paletteScreen.classList.add('d-none'); // Hide palette screen
    footer.classList.remove("d-none");
  });
  



  