/**
 * uitable.js
 * css3-uitable (github.com/foxster-mp4/css3-uitable)
 * 
 * Copyright (c) 2022 Foxster (foxster-mp4 on GitHub)
 * MIT License
 */

// Call these functions to trigger appearance change 
// Must remove @media (prefers-color-scheme: dark) first
function uiTableDark() {
  document.querySelectorAll("#uitable, #uitable .icon, #uitable .cell, #uitable .cell-accessory-icon").forEach(e => e.classList.add("dark"));
}
function uiTableLight() {
  document.querySelectorAll("#uitable, #uitable .icon, #uitable .cell, #uitable .cell-accessory-icon").forEach(e => e.classList.remove("dark"));
}