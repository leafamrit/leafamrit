const typingSpeed = 100;

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
}

const animateBackspace = (ele, backSpaceCount) => {
  return new Promise((resolve, reject) => {
    let stepTimer = setInterval(() => {
      ele.innerHTML = ele.innerHTML.slice(0, -1);
      backSpaceCount--;
      if (backSpaceCount <= 0) {
        clearInterval(stepTimer);
        resolve();
      }
    }, typingSpeed + 100);
  });
}

const animateName = (ele) => {
  const nameTextS1 = 'leaf';
  const nameTextS2 = 'pratyay amrit';

  animateTyping(nameTextS1, ele).then(() => {
    animateBackspace(ele, 4).then(() => {
      animateTyping(nameTextS2, ele);
    })
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateName(document.getElementById('nameheader'));

  // document.documentElement.style.setProperty('--avatar-size', '300px')
});
