(main = () => {
  const prefersDarkAppearance = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkAppearance.matches) {
    $("#dark-appearance-switch").prop('checked', true);
    darkAppearance();
  } else lightAppearance();

  // System appearance change listener
  prefersDarkAppearance.addEventListener("change", (e) => {
    if (e.matches) {
      $("#dark-appearance-switch").prop('checked', true);
      darkAppearance();
    } else {
      $("#dark-appearance-switch").prop('checked', false);
      lightAppearance();
    }
  });
})()

$("#dark-appearance-switch").on("change", function () {
  this.checked ? darkAppearance() : lightAppearance();
})

function darkAppearance() {
  $("body, .cell, .cell-group, .action-icon").addClass("dark");
}

function lightAppearance() {
  $("body, .cell, .cell-group, .action-icon").removeClass("dark");
}
