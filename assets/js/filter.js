document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".filter-bar .filter-btn");
  var cards = document.querySelectorAll(".project-grid .project-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      buttons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      cards.forEach(function (card) {
        var stacks = (card.getAttribute("data-stack") || "").split(",");
        var show = filter === "all" || stacks.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
});
