const typingSpeed = 50;
const cssTransitionTime = 350;
const cssUnhideDelay = 100;
const cssLoadAnimationDuration = 2400;
const defaultHeaderLength = 15;

const animateTyping = (inputText, ele) => {
  return new Promise((resolve, reject) => {
    const inputTextLen = inputText.length;
    let stepCounter = 0;
    let stepTimer = setInterval(() => {
      ele.innerHTML += inputText[stepCounter++];
      if (stepCounter >= inputTextLen) {
        clearInterval(stepTimer);
        resolve();
      }
    }, typingSpeed);
  });
};

const animateBackspace = (backSpaceCount, ele) => {
  return new Promise((resolve, reject) => {
    let stepTimer = setInterval(() => {
      ele.innerHTML = ele.innerHTML.slice(0, -1);
      backSpaceCount--;
      if (backSpaceCount <= 0) {
        clearInterval(stepTimer);
        resolve();
      }
    }, typingSpeed * 2);
  });
};

const animateName = (ele) => {
  return new Promise((resolve, reject) => {
    const nameTextS1 = "leaf am";
    const nameTextS1Length = nameTextS1.length;
    const nameTextS2 = "pratyay amrit";

    animateTyping(nameTextS1, ele).then(() => {
      animateBackspace(nameTextS1Length, ele).then(() => {
        animateTyping(nameTextS2, ele).then(() => {
          resolve();
        });
      });
    });
  });
};

const completeLoadAnimation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.add("clickable");
      document.querySelector(".click-block-wrapper").classList.add("hidden");
      sidebar.addEventListener(
        "click",
        () => {
          sidebar.style.opacity = 0;
          setTimeout(() => {
            document
              .querySelector(".main-container-before")
              .setAttribute("class", "main-container-after");
            document.documentElement.style.setProperty(
              "--avatar-size",
              "200px"
            );

            // reveal social media icons in sidebar
            document.querySelector(".soc-media").classList.remove("hidden");

            // reveal "header" block
            setTimeout(() => {
              sidebar.style.borderRadius = "20px";
              sidebar.style.opacity = 0.9;
              sidebar.style.height = "calc(200px + 7.6em)";
              sidebar.classList.remove("clickable");
              document.querySelector(".namediv").classList.remove("hidden");
              resolve();
            }, cssTransitionTime);
          }, cssTransitionTime);
        },
        { once: true }
      );
    }, cssLoadAnimationDuration);
  });
};

const animateHeader = (headerText, ele) => {
  return new Promise((resolve, reject) => {
    let inputText = " ~ " + headerText;
    let backSpaceCount = ele.innerHTML.length - defaultHeaderLength;
    animateBackspace(backSpaceCount, ele).then(() => {
      animateTyping(inputText, ele).then(() => {
        resolve();
      });
    });
  });
};

const hideAllContentSectionsExceptClicked = (contentSectionId) => {
  document.querySelectorAll(".content-div>div").forEach((contentDiv) => {
    if (!contentDiv.classList.contains("hidden")) {
      contentDiv.style.opacity = 0;
      setTimeout(() => {
        contentDiv.classList.add("hidden");
      }, cssTransitionTime);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  completeLoadAnimation().then(() => {
    animateName(document.getElementById("nameheader")).then(() => {
      document.querySelector(".sidebar").style.height = "calc(200px + 19.1em)";
      setTimeout(() => {
        document.querySelector(".content-div").classList.remove("hidden");
        document.querySelector(".hr-spacer").classList.remove("hidden");
        document.querySelector(".nav-buttons").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".content-div>div").style.opacity = 1;
          document.querySelector(".hr-spacer").style.opacity = 1;
          document.querySelector(".nav-buttons").style.opacity = 1;

          // add event listeners for navigation
          document
            .querySelectorAll(".nav-button-list>li>a")
            .forEach((navLink) => {
              navLink.addEventListener("click", () => {
                let contentSectionId = "section-" + navLink.id.split("-")[1];
                hideAllContentSectionsExceptClicked(contentSectionId);
                animateHeader(
                  navLink.innerText,
                  document.getElementById("nameheader")
                ).then(() => {
                  document.getElementById(contentSectionId).classList.remove("hidden");
                  setTimeout(() => {
                    document.getElementById(contentSectionId).style.opacity = 1;
                  }, cssUnhideDelay);
                });
              });
            });
        }, cssUnhideDelay);
      }, cssTransitionTime);
    });
  });
});
