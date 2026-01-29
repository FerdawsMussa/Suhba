document.querySelectorAll(".sidebar li").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".sidebar .active")?.classList.remove("active");
    item.classList.add("active");
  });
});
