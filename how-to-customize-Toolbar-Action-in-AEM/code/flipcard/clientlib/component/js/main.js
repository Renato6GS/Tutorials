(function () {
  document.addEventListener("DOMContentLoaded", function () {
    [...document.querySelectorAll(".acc--container:not(.acc--container-initialized)")].forEach((element) => {
      const front = element.querySelector(".acc--front");
      const back = element.querySelector(".acc--back");
      element.addEventListener("click", function () {
        front.classList.toggle("acc--hide");
        back.classList.toggle("acc--hide");
      });

      element.classList.add("acc--container-initialized");
    });
  });
})();
