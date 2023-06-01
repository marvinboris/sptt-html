window.addEventListener("load", () => {
  const data = {
    titles: {
      1: "Create new course",
      2: "Add course files",
      3: "Review course",
    },
    subtitles: {
      1: "Add course info",
      2: "Please upload your videos & documents",
      3: "Check your course details.",
    },
    steps: { 1: "Course details", 2: "Upload files", 3: "Review details" },
  };

  let page = 1;
  const continueButton = document.querySelector("form > .mt-12 > button");
  const backButton = document.querySelector("#form > div > button");

  const title = document.querySelector("#form > div > div > .font-display");
  const subtitle = document.querySelector("#form > div > div > .mt-px");

  const pageBlocks = document.querySelectorAll("form > .relative > div");
  const steps = document.querySelectorAll("form > .mt-12 > .flex > .relative");

  const rightSection = document.querySelector("section.col-span-2");
  const rightSectionPages = document.querySelectorAll(
    "section.col-span-2 > div"
  );

  continueButton.addEventListener("click", () => {
    if (page === 3) return;

    page++;
    handlePageChanged();
  });

  backButton.addEventListener("click", () => {
    if (page === 1) return;

    page--;
    handlePageChanged();
  });

  const handlePageChanged = () => {
    if (page === 1) {
      backButton.classList.add("hidden");
      backButton.classList.remove("flex");
    } else {
      backButton.classList.remove("hidden");
      backButton.classList.add("flex");
    }

    title.innerHTML = data.titles[page];
    subtitle.innerHTML = data.subtitles[page];

    pageBlocks.forEach((pageBlock, i) => {
      const rightSectionPage = rightSectionPages[i];

      const pageBlockVisibleClassList = "z-0 opacity-100".split(" ");
      const pageBlockInvisibleClassList = "-z-10 opacity-0".split(" ");

      if (page - 1 === i) {
        pageBlock.classList.add(...pageBlockVisibleClassList);
        pageBlock.classList.remove(...pageBlockInvisibleClassList);

        if (rightSectionPage) {
          rightSectionPage.classList.add(...pageBlockVisibleClassList);
          rightSectionPage.classList.remove(...pageBlockInvisibleClassList);
        }
      } else {
        pageBlock.classList.remove(...pageBlockVisibleClassList);
        pageBlock.classList.add(...pageBlockInvisibleClassList);

        if (rightSectionPage) {
          rightSectionPage.classList.remove(...pageBlockVisibleClassList);
          rightSectionPage.classList.add(...pageBlockInvisibleClassList);
        }
      }
    });

    steps.forEach((step, i) => {
      const stepText = step.querySelector("span");
      const stepLoading = step.querySelector("svg:nth-child(1)");
      const stepCheck = step.querySelector("svg:nth-child(2)");

      if (page - 1 === i) stepText.classList.remove("hidden");
      else stepText.classList.add("hidden");

      if (page - 1 > i) {
        step.classList.add("bg-green");
        step.classList.remove("bg-lightblue/10");

        stepLoading.classList.add("hidden");
        stepCheck.classList.remove("hidden");
      } else {
        step.classList.remove("bg-green");
        step.classList.add("bg-lightblue/10");

        stepLoading.classList.remove("hidden");
        stepCheck.classList.add("hidden");
      }
    });

    if (page < 3) {
      rightSection.classList.add("opacity-100");
      rightSection.classList.remove("opacity-0");
    } else {
      rightSection.classList.add("opacity-0");
      rightSection.classList.remove("opacity-100");
    }
  };
});
