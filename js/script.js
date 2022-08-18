const genericAppIcon = "icons/generic_app.jpeg";
const accessoryIcon = "bi-arrow-up-right-square";

setupAppearance();
(() => {
  const darkSwitch = `
  <div class="section-container" id="dark">
    <div class="rounded section">
      <div class="disabled cell">
        <div class="cell-inner">
          <p class="cell-text">Dark Appearance</p>
          <input type="checkbox" class="uiswitch" id="dark-appearance-switch">
        </div>
      </div>
      <p class="section-footer">This option will automatically adjust based on your system appearance. Disable this option to get blinded at night.</p>
    </div>
  </div>`; 
  $("#title").after(darkSwitch);
})()

$.getJSON("data.json", function (json) {
  const profile = json.profile;
  if (profile) {
    const profileHTML = `
    <div class="section-container" id="profile">
      <div class="rounded section">
        <a class="clickable cell" onclick="performVeryImportantTask();">
          <img src = "${profile.pfp}" alt ="pfp" class="icon">
          <div class="cell-inner">
            <div class="cell-labels">
              <p class="cell-text">${profile.name ?? "Joe"}</p>
              <p class="cell-detail-text">${profile.description ?? "Mama"}</p>
            </div>
            <div class="grey cell-accessory-icon">
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>
        </a >
      </div >
    </div >`;

    $("#title").after(profileHTML);
  }
  
  const data = json.data;
  if (data) {
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

function performVeryImportantTask() {
  // confirm(`Don't click ${Math.random() < 0.5 ? 'Cancel' : 'OK'}.`);
  if (confirm(`Don't click "OK".`))
    window.open('https://youtu.be/dQw4w9WgXcQ', '_blank');
}