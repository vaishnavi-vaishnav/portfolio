// Update Clock
// function updateClock() {
//   const clock = document.getElementById('countdown-clock');
//   const now = new Date();
//   clock.textContent = now.toLocaleTimeString();
// }

// setInterval(updateClock, 1000);

// Fetch Quote on Click
document.getElementById('quoteBox').addEventListener('click', () => {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      document.getElementById('quoteBox').textContent = data.content;
    })
    .catch(err => console.error("Error fetching quote:", err));
});

// Toggle Dark Mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});



// Function to update styles dynamically
function updateStyles(elements, styles) {
  elements.forEach(element => {
    Object.keys(styles).forEach(style => {
      element.style[style] = styles[style];
    });
  });
}

// Function to apply a gradient to body and phone
function applyGradient(gradient) {
  const body = document.body;
  const phone = document.querySelector('.iphone');
  updateStyles([body, phone], { backgroundImage: gradient, background: gradient });
}

// Function to extract the base color from a gradient string
function extractBaseColor(gradient) {
  const match = gradient.match(/#([0-9a-fA-F]{6})/);
  return match ? match[0] : "#ffffff"; // Default to white
}

// Function to darken a color
function darkenColor(color, percent) {
  const [r, g, b] = [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)].map(hex => parseInt(hex, 16));

  const darken = (channel) => Math.max(0, Math.round(channel * (1 - percent)));

  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
}

// Function to update card styles with darkened color
function updateCardStyles(color) {
  const cards = document.querySelectorAll('.iphone-cards .card, .hiremebtn');
  if (!cards.length) {
    console.warn("No cards or 'hiremebtn' elements found.");
    return;
  }

  const darkenedColor = darkenColor(color, 0.25); // Darken by 20%
  updateStyles(cards, { backgroundColor: darkenedColor });
}

// Attach event listeners to theme buttons
document.querySelectorAll('.theme').forEach(button => {
  button.addEventListener('click', () => {
    const gradient = button.dataset.color;

    // Apply gradient to body and phone
    applyGradient(gradient);

    // Extract base color and update card styles
    const baseColor = extractBaseColor(gradient);
    updateCardStyles(baseColor); // Update both cards and hire me button
  });
});




// document.querySelectorAll('.theme').forEach(button => {
//   button.addEventListener('click', () => {
//     const color = button.dataset.color;
//     document.body.style.backgroundColor = color;
//     document.querySelector('.iphone').style.background = `linear-gradient(to bottom, ${color}, black)`;
//   });
// });

// ---------------- DEVICE SWITCHING ---------------- //
// Change Device Model on Button Click
function updateAppSpacing(device) {
  const appGrid = document.querySelector('.app-grid');
  appGrid.classList.remove('iphone', 'android', 'tablet');
  appGrid.classList.add(device);
}

document.getElementById('iphone').addEventListener('click', () => {
  document.getElementById('phone-image').src = './assets/iphone.png';
  updateAppSpacing('iphone');
});

document.getElementById('android').addEventListener('click', () => {
  document.getElementById('phone-image').src = './assets/android.png';
  updateAppSpacing('android');
});

document.getElementById('tablet').addEventListener('click', () => {
  document.getElementById('phone-image').src = './assets/tablet.png';
  updateAppSpacing('tablet');
});

// Update App Grid Layout Based on Device
function updateAppSpacing(device) {
  const appGrid = document.querySelector('.app-grid');

  // Remove existing layout classes
  appGrid.classList.remove('iphone', 'android', 'tablet');

  // Add the appropriate class
  appGrid.classList.add(device);
}




// ---------------- COLOR PALETTE GENERATOR ---------------- //
const palettesContainer = document.getElementById('palettesContainer');
const refreshPalette = document.getElementById('refreshPalette');
const colorGeneratorApp = document.getElementById('colorGeneratorApp');
const paletteScreen = document.getElementById('paletteScreen');
const appGrid = document.querySelector('.app-grid');
const closePaletteScreen = document.getElementById('closePaletteScreen');
const phoneImage = document.getElementById('phone-image');

// Generate a Random Color Palette
function generatePalette() {
  palettesContainer.innerHTML = ""; // Clear existing colors
  for (let i = 0; i < 6; i++) {
    let randomColor = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase();
    randomColor = `#${randomColor.padStart(6, "0")}`;

    const rgbColor = hexToRgb(randomColor);

    // Create the palette div
    const paletteDiv = document.createElement('div');
    paletteDiv.classList.add('palette');
    paletteDiv.style.backgroundColor = randomColor;

    // Create the left text container
    const textContainer = document.createElement('div');
    textContainer.classList.add('palette-text');

    const hexCode = document.createElement('p');
    hexCode.textContent = randomColor;
    hexCode.classList.add('hex-code');

    const rgbCode = document.createElement('p');
    rgbCode.textContent = `(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
    rgbCode.classList.add('rgb-code');

    textContainer.appendChild(hexCode);
    textContainer.appendChild(rgbCode);

    // Create the right copy container
    const copyContainer = document.createElement('div');
    copyContainer.classList.add('palette-copy');

    const copyIcon = document.createElement('i');
    copyIcon.classList.add('fa', 'fa-copy');

    // Copy color on click
    copyIcon.addEventListener('click', () => copyColor(randomColor));
    copyContainer.appendChild(copyIcon);

    // Append containers to palette
    paletteDiv.appendChild(textContainer);
    paletteDiv.appendChild(copyContainer);

    palettesContainer.appendChild(paletteDiv);



    // Create the palette div
    // const paletteDiv = document.createElement('div');
    // paletteDiv.classList.add('palette');
    // paletteDiv.style.backgroundColor = randomColor;
    // paletteDiv.textContent = randomColor;

    // Copy color on click
    // paletteDiv.addEventListener('click', () => copyColor(randomColor));
    // palettesContainer.appendChild(paletteDiv);
  }
}

// Convert HEX to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Copy a Color to Clipboard
function copyColor(colorVal) {
  navigator.clipboard.writeText(colorVal).then(() => {
    alert(`Color ${colorVal} copied to clipboard!`);
  });
}

// Show Palette Screen
colorGeneratorApp.addEventListener('click', () => {
  console.log('Color Generator Button Clicked');
  
  // phoneImage.style.zIndex = '1'; 
  phoneImage.style.background = 'none';
  phoneImage.style.backgroundColor = '#FEFEFD';


  // Set the background color of the palette screen to white
  // const paletteScreen = document.getElementById('paletteScreen');
  // paletteScreen.style.backgroundColor = '#fff';  
  // paletteScreen.style.borderRadius = '50px'; 
 


  appGrid.classList.add('d-none'); // Hide app grid
  paletteScreen.classList.remove('d-none'); // Show palette screen
  generatePalette(); // Generate initial palette
});

// Refresh Palette
refreshPalette.addEventListener('click', generatePalette);

// Close Palette Screen
closePaletteScreen.addEventListener('click', () => {
  appGrid.classList.remove('d-none'); // Show app grid
  phoneImage.style.background = 'linear-gradient(#4C7878, #304E4E, black)';
  paletteScreen.classList.add('d-none'); // Hide palette screen
   
  
  
});

function copyColor(colorVal) {
  navigator.clipboard.writeText(colorVal).then(() => {
      const toastText = document.getElementById('toastText');
      toastText.textContent = `Color ${colorVal} copied to clipboard!`;

      const toastElement = document.getElementById('copyToast');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
  }).catch(() => {
      alert('Failed to copy color. Please try again.');
  });
}
