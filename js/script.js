const genericAppIcon = "icons/generic_app.jpeg";
const accessoryIcon = "bi-arrow-up-right-square";

setupAppearance();

$.getJSON("data.json", function (json) {
  const data = json.data;

  if (data != null && data != undefined) {
    $("#loading").remove();
    $("#dark .cell").removeClass("disabled");
  }
  else return;

  data.forEach(section => {
    let sectionHTML = `
    <div class="section-container">
      <div class="rounded section">
        <p class="section-header">${section.section}</p>`

    section.accounts.forEach((account, i) => {
      const bootstrapIcon = account.bootstrapIcon ?? section.bootstrapIcon;
      const icon = account.icon ?? section.icon;
      sectionHTML += `
        <a class="clickable cell" href="${account.url}" target="_blank">
          <div class="cell-icon">
            ${icon
              ? `<img src="${icon}" alt="${bootstrapIcon}" class="icon">`
              : bootstrapIcon
                ? `<i class="bi bi-${bootstrapIcon}"></i>`
                : `<img src="${genericAppIcon}" alt="generic_app_icon" class="icon">`
            }
          </div>
          <div class="cell-inner">
            <div class="cell-labels">
              <p class="cell-text">${account.name}</p>
              <p class="cell-detail-text">${account.description ?? ""}</p>
            </div>
            <div class="cell-accessory-icon">
              <i class="bi ${accessoryIcon}"></i>
            </div>
          </div>
        </a>`;
    });

    sectionHTML += `
      </div>
    </div>`;

    $("#dark").before(sectionHTML);
  });

  setupAppearance();
});

function setupAppearance() {
  const prefersDarkAppearance = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkAppearance.matches) {
    uiTableViewDark();
    $("#dark-appearance-switch").prop('checked', true);
  } else {
    uiTableViewLight();
  }

  // Toggle dark appearance by listenning to system appearance changes
  prefersDarkAppearance.addEventListener("change", (e) => {
    if (e.matches) {
      uiTableViewDark();
      $("#dark-appearance-switch").prop('checked', true);
    } else {
      uiTableViewLight();
      $("#dark-appearance-switch").prop('checked', false);
    }
  });

  $("#dark-appearance-switch").on("change", function () {
    this.checked ? uiTableViewDark() : uiTableViewLight();
  });
}