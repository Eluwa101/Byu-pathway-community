console.log("Welcome to the BYU-Pathway community site!");

// This function is called when the user clicks the "Get Location" button
// It uses the Geolocation API to get the user's current location
export function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const locationField = document.getElementById('location');
        if (locationField) {
          locationField.value = `${position.coords.latitude}, ${position.coords.longitude}`;
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
