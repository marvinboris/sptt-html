window.addEventListener("load", () => {
  const dropdowns = document.querySelectorAll(".scrollbar-none.mt-9 > div");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const buttonCaret = button.querySelector(".ml-auto svg");
    const dropdownMenu = dropdown.querySelector(
      "div relative mx-2 overflow-hidden rounded-b-xl text-sm transition-all duration-200"
        .split(" ")
        .join(".")
    );

    button.addEventListener("click", () => {
      const caretClassList =
        "relative z-0 rotate-180 after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-secondary-100/20".split(
          " "
        );
      const dropdownMenuClassList = "max-h-96 pb-[18px] pt-3".split(" ");

      if (!buttonCaret.classList.contains("relative")) {
        buttonCaret.classList.add(...caretClassList);

        dropdownMenu.classList.add(...dropdownMenuClassList);
        dropdownMenu.classList.remove("max-h-0");
      } else {
        buttonCaret.classList.remove(...caretClassList);

        dropdownMenu.classList.remove(...dropdownMenuClassList);
        dropdownMenu.classList.add("max-h-0");
      }
    });
  });
});
