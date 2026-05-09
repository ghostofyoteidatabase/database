console.log("Ghost of Yōtei Database Loaded");

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  const buttons = document.querySelectorAll('.tab-button');

  pages.forEach(page => {
    page.classList.remove('active-page');
  });

  buttons.forEach(button => {
    button.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active-page');

  event.target.classList.add('active');
}
