// Sample data for breweries and beers (Replace this with your actual data)
const breweries = [
  {
    id: 2,
    name: 'BayBerry Beer Hall',
    location: 'Rhode Island',
    taps: [
      { beerId: 4, duration: 240 }, // Beer 3 will be available for 4 hours (240 minutes)
      { beerId: 5, duration: 60 }, // Beer 4 will be available for 5 hours (300 minutes)
      { beerId: 6, duration: 100 }, // Beer 4 will be available for 5 hours (300 minutes)
      { beerId: 7, duration: 100 }, // Beer 4 will be available for 5 hours (300 minutes)
    ],
  },
  {
    id: 1,
    name: 'StrangeBird',
    location: 'New York',
    taps: [
      { beerId: 1, duration: 180 }, // Beer 1 will be available for 3 hours (180 minutes)
      { beerId: 2, duration: 120 }, // Beer 2 will be available for 2 hours (120 minutes)
      { beerId: 3, duration: 300 }, // Beer 2 will be available for 2 hours (120 minutes)
    ],
  }
];

const beers = [
  { id: 1, name: 'Bird Light Yuzu', style: 'Lager' },
  { id: 2, name: 'Four Pedals', style: 'Italian Pilsner' },
  { id: 3, name: 'Heliophile', style: 'Keller Kolsch' },
  { id: 4, name: 'Buttonwoods Lager', style: 'Lager' },
  { id: 6, name: 'Snappy Limelight', style: 'Lager' },
  { id: 5, name: 'Pozar', style: 'Grodziskie' },
  { id: 7, name: 'Blueberry Drip', style: 'Stout - Imperial' },
];

// Function to update the remaining time for taps
function updateTapRemainingTime(tapItem, remainingTimeInSeconds) {
  const minutes = Math.floor(remainingTimeInSeconds / 60);
  const seconds = remainingTimeInSeconds % 60;
  tapItem.innerHTML = `🍺 <span class="td-beer-name">${tapItem.dataset.beerName}</span> <em>${tapItem.dataset.beerStyle}</em> </br> Keg kicks in ${minutes} min ${seconds} sec <hr>`;
}

// Function to update the tap durations every second
function updateTapDurations() {
  breweries.forEach(brewery => {
    brewery.taps.forEach(tap => {
      const tapItem = document.querySelector(`[data-tap-id="${tap.beerId}"]`);
      if (tapItem) {
        tap.duration--; // Decrease the remaining duration by 1 second
        if (tap.duration >= 0) {
          updateTapRemainingTime(tapItem, tap.duration);
        } else {
          // Simulate tap replacement when the duration reaches 0
          tap.beerId = Math.floor(Math.random() * beers.length) + 1;
          tap.duration = Math.floor(Math.random() * 121) + 60;
          updateTapRemainingTime(tapItem, tap.duration);
        }
      }
    });
  });
}

// Function to render breweries and their taps
function renderBreweries() {
  const appElement = document.getElementById('app');

  // Clear existing content
  appElement.innerHTML = '';

  // Loop through breweries and create HTML elements
  breweries.forEach(brewery => {
    const breweryElement = document.createElement('div');
    breweryElement.classList.add('brewery');

    const breweryName = document.createElement('h2');
    breweryName.textContent = brewery.name;

    const breweryLocation = document.createElement('p');
    breweryLocation.textContent = `${brewery.location}`;

    const tapsList = document.createElement('div');
    brewery.taps.forEach(tap => {
      const beer = beers.find(beer => beer.id === tap.beerId);
      if (beer) {
        const tapItem = document.createElement('div');
        tapItem.dataset.beerName = beer.name;
        tapItem.dataset.beerStyle = beer.style;
        tapItem.dataset.tapId = tap.beerId;
        updateTapRemainingTime(tapItem, tap.duration);
        tapsList.appendChild(tapItem);
      }
    });

    breweryElement.appendChild(breweryName);
    breweryElement.appendChild(breweryLocation);
    breweryElement.appendChild(tapsList);
    appElement.appendChild(breweryElement);
  });
}

// Initial rendering of breweries
renderBreweries();

// Start updating tap durations every second
setInterval(updateTapDurations, 1000); // 1000 milliseconds = 1 second
