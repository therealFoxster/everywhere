$.getJSON("data.json", function (json) {
  const data = json.data;
  const openIcon = "bi-arrow-up-right-square";
  const prefersDarkAppearance = window.matchMedia("(prefers-color-scheme: dark)");

  if (data != null && data != undefined)
    $("#error").remove();
  else return;

  data.forEach(item => {
    let html = `
      <div class="section">
        <p class="cell-header">${item.name}</p>
        <div class="${prefersDarkAppearance.matches ? "dark " : ""}cell-group">`;

    if (item.accounts != null && item.accounts != undefined) {
      item.accounts.forEach((account, i) => {
        html += clickableCell(i == 0, item.bootstrapIcon, item.icon, account.url, account.name, account.description, openIcon);
      });
    } else if (item.platforms != null && item.platforms != undefined) {
      item.platforms.forEach((platform, i) => {
        platform.accounts.forEach((account, j) => {
          let isFirst = i == 0 && j == 0; // First account of first platform
          html += clickableCell(isFirst, platform.bootstrapIcon, platform.icon, account.url, account.name, account.description, openIcon);
        });
      });
    }

    html += `
        </div>
      </div>`;

    $("#dark").last().before(html);
    });
})

function clickableCell(isFirst = false, bootstrapIcon, icon, url, title, subtitle, actionIcon) {
  return `
  <a class="clickable ${isFirst ? "first " : ""}cell" href=${url} target="_blank">
    <div class="cell-icon">
      ${icon != null && icon != undefined
        ? `<img src="${icon}" alt="${bootstrapIcon}" class="icon">`
        : `<i class="bi bi-${bootstrapIcon}"></i>`
      }
    </div>
    <div class="cell-content">
      <div class="cell-text">
        <p class="cell-title">${title}</p>
        <p class="cell-subtitle">${subtitle ?? ""}</p>
      </div>
      <i class="bi ${actionIcon} action-icon"></i>
    </div>
  </a>`;
}
