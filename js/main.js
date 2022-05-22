const typingSpeed = 50;

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
    }, typingSpeed * 2);
  });
}

const animateName = ele => {
  return new Promise((resolve, reject) => {
    const nameTextS1 = 'leaf am';
    const nameTextS2 = 'pratyay amrit';

    animateTyping(nameTextS1, ele).then(() => {
      animateBackspace(ele, 7).then(() => {
        animateTyping(nameTextS2, ele).then(() => {
          resolve();
        });
      })
    });
  });
}

const completeLoadAnimation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.querySelector('.sidebar').classList.add('clickable');
      document.querySelector('.clickable').addEventListener('click', () => {
        let sidebar = document.querySelector('.sidebar');
        sidebar.style.opacity = 0;
        setTimeout(() => {
          document.querySelector('.main-container-before').setAttribute('class', 'main-container-after');
          document.documentElement.style.setProperty('--avatar-size', '200px');
          document.querySelector('.soc-media').classList.remove('hidden');
          setTimeout(() => {
            sidebar.style.borderRadius = '20px';
            sidebar.style.opacity = 0.9;
            document.querySelector('.namediv').classList.remove('hidden');
            resolve();
          }, 350);
        }, 350);
      });
    }, 2400);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  completeLoadAnimation().then(() => {
    animateName(document.getElementById('nameheader')).then(() => {
      document.querySelector('.details').classList.remove('hidden');
      setTimeout(() => {
        document.querySelector('.details>p').style.opacity = 1;
      }, 100);
    });
  });
});
