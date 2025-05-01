// This is calling the getLocation function from main.js when the DOM is fully loaded
import { getLocation } from './main.js';

window.addEventListener('DOMContentLoaded', () => {
  getLocation();
});


