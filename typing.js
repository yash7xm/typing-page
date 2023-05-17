// caret
const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const borderLinks = document.querySelectorAll('.border-link');
const li = document.querySelectorAll('.timer-options>li');
const resDiv = document.querySelectorAll('.result-content>div>p');
const liveTime = document.querySelector('.live-time>div>p');
const typingArea = document.querySelector('.typing-area');

window.addEventListener('mousemove', (e) => {
    mouseCaret.style.top = e.pageY + 'px';
    mouseCaret.style.left = e.pageX + 'px';
})

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
        link.classList.add('hovered-link');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
        link.classList.remove('hovered-link');
    })
})

borderLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.add('mouseCaret');
    })
})

li.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
        link.classList.add('hovered-link');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
        link.classList.remove('hovered-link');
    })
})

resDiv.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
        link.classList.add('hovered-link');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
        link.classList.remove('hovered-link');
    })
})

liveTime.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
    link.classList.add('hovered-link');
})
liveTime.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
    link.classList.remove('hovered-link');
})

typingArea.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
typingArea.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

//main script

const str = document.querySelector(".given-text");
const input = document.querySelector("#myInput");
const caret = document.querySelector(".caret");
const timerSet = document.querySelectorAll(".timer-options>li");
const time = document.querySelector(".fa-clock");

const originalString = str.textContent.replace(/\s+/g, " ").trim();

let clock = 0;
let clockActive = false;
let liActiveValue = 0;
let inputStarted = false;
let clockHover = false;

let intervalId = null;

const stopWatch = document.querySelector('.live-time>div>p');
const score = document.querySelector('.score>p>span');
const accuracy = document.querySelector('.accuracy>p>span');
const timeSpent = document.querySelector('.time-spent>p>span');
const afterText = document.querySelector('#after-text');

let typedWords = 0;
let correctWords = 0;
let timerForScore = true;
let cnt = 0;
let currentWordTyping = 0;
let TotalWords = 1;
totalWordsInText(originalString);
let ended = false;

let backspaced = false;
let line = 0;
let scrollDistance = 0;
let flag = false;
let totalLines = 0;

str.addEventListener('click', () => {
    input.focus();
})

// typingArea.addEventListener("click", () => {
//     input.focus();
// });

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        input.focus();
    }
});

input.style.height = '0';
input.style.width = '0';
input.style.border = '0';
input.style.padding = '0';

makeHtml(originalString);
function makeHtml(originalString) {
    str.innerHTML = "";
    for (let i = 0; i < originalString.length; i++) {
        const span = document.createElement("span");
        span.textContent = originalString[i];
        span.classList.add(`span${i}`);
        str.insertAdjacentElement("beforeend", span);
    }
    for (let i = 0; i < originalString.length - 2; i++) {
        let index = document.querySelector(`p.given-text span.span${i}`);
        let afterIndex = document.querySelector(`p.given-text span.span${i + 1}`);
        if (index.getBoundingClientRect().top != afterIndex.getBoundingClientRect().top) {
            totalLines++;
        }
    }
}

let firstWordLeft = document.querySelector(`.span0`).getBoundingClientRect().left;
let firstWordTop = document.querySelector(".span0").getBoundingClientRect().top;

// doing backspacing
input.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Backspace") {
        e.preventDefault(); // Prevent the default behavior of the key combination
        return;
    }
    let ptr = input.value;
    if (ptr.length < 1) {
        return;
    } //if no character is left

    if (e.key === "Backspace") {
        let once = true;
        let top = false;
        let index = document.querySelector(
            `p.given-text span.span${ptr.length - 1}`
        );
        // remove notTyped class from all chars till the place where space was entered
        while (index.classList.contains("notTyped")) {
            if (once) {
                let afterIndex = document.querySelector(
                    `p.given-text span.span${ptr.length}`
                );
                let beforeIndex = document.querySelector(
                    `p.given-text span.span${ptr.length - 2}`
                );
                let beforeIndexTop = beforeIndex.getBoundingClientRect().top;
                let afterIndexTop = afterIndex.getBoundingClientRect().top;
                if (index.getBoundingClientRect().top != afterIndexTop) {
                    top = true;
                    moveCaretBack(index);
                } else if (index.getBoundingClientRect().top != beforeIndexTop) {
                    top = true;
                    moveCaretBack(beforeIndex);
                    input.value = input.value.slice(0, -1);
                }
                once = false;
            }
            index.classList.remove("notTyped");
            index.innerText = originalString[ptr.length - 1];
            ptr = ptr.slice(0, -1);
            index = document.querySelector(
                `p.given-text span.span${ptr.length - 1}`
            );
            flag = true;
        }
        if (flag) {
            // only if above loop ran
            input.value = ptr;
            input.value += originalString[ptr.length - 1];
            let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 35 + index.getBoundingClientRect().width;
            caret.style.left = `${caretLeft}px`;
            if (!top) {
                let caretTop = index.getBoundingClientRect().top - firstWordTop + 35;
                caret.style.top = `${caretTop}px`;
            }
            flag = false;
            return;
        } else {
            index.classList.remove("right");
            index.classList.remove("wrong");
            let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 35;
            caret.style.left = `${caretLeft}px`;
            let caretTop = index.getBoundingClientRect().top - firstWordTop + 35;
            caret.style.top = `${caretTop}px`;
        }
        if (ptr.length == 1) {
            caret.style.left = "35px";
            return;
        }

        let afterIndex = document.querySelector(
            `p.given-text span.span${ptr.length}`
        );
        let beforeIndex = document.querySelector(
            `p.given-text span.span${ptr.length - 2}`
        );
        let beforeIndexTop = beforeIndex.getBoundingClientRect().top;
        let afterIndexTop = afterIndex.getBoundingClientRect().top;
        if (index.getBoundingClientRect().top != afterIndexTop) {
            moveCaretBack(index);
        } else if (index.getBoundingClientRect().top != beforeIndexTop) {
            moveCaretBack(beforeIndex);
            input.value = input.value.slice(0, -1);
        }
        backspaced = true;
    }
});

// handling the input
input.addEventListener("input", (e) => {
    let p = input.value;

    if (p.length < 1) {
        return;
    }

    if (input.value.length > 0 && clockActive == true && clock != 0) {
        inputStarted = true;
        clockActive = false;
        startTimerForClock();
    }

    if (input.value.length > 0 && timerForScore === true) {
        timerForScore = false;
        timer();
    }

    let index = document.querySelector(`p.given-text span.span${p.length - 1}`);
    if (backspaced) {
        backspaced = false;
        return;
    }
    if (p[0] == " ") {
        // to prevent typing space in start
        p = "";
        input.value = "";
        return;
    }
    if (p.length > 1 && p[p.length - 1] == " " && p[p.length - 2] == " ") {
        // to prevent typing consecutive spaces
        input.value = input.value.slice(0, -1);
        return;
    }
    // if correct word is typed
    if (originalString[p.length - 1] === p[p.length - 1]) {
        index.classList.add("right");
        if (p[p.length - 1] === ' ')
            currentWordTyping++;
    }
    else {
        // space is typed in b/w words
        if (p[p.length - 1] == " ") {
            currentWordTyping++;
            input.value = input.value.slice(0, -1);
            for (let i = p.length - 1; i < originalString.length; i++) {
                if (originalString[p.length - 1] == " ") break;
                index.classList.add("notTyped");
                if (p.length < originalString.length)
                    p += originalString[i];
                if (input.value.length < originalString.length)
                    input.value += originalString[i];
                index = document.querySelector(
                    `p.given-text span.span${p.length - 1}`
                );
            }
            if (input.value.length < originalString.length)
                input.value += " ";
            if (index)
                index.classList.add("notTyped");
            // let afterIndex = document.querySelector(
            //     `p.given-text span.span${p.length}`
            // );
            // let afterIndexTop = afterIndex.getBoundingClientRect().top;
            // if (index.getBoundingClientRect().top != afterIndexTop) {
            //     moveCaretDown(afterIndex, index);
            // } else {
            //     moveCaret(index);
            // }
            if (currentWordTyping >= TotalWords) {
                clearInterval(intervalId);
                input.disabled = true;
                Words();
                score.textContent = `${(correctWords / (cnt / 60)).toFixed(2)} wpm`;
                accuracy.textContent = `${(((correctWords / (cnt / 60)) * 100) / (typedWords / (cnt / 60))).toFixed(2)} %`;
                timeSpent.textContent = `${(cnt / 60).toFixed(2)} min`;
                typingArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                str.style.opacity = '0.3';
                caret.style.opacity = '0.3';
                afterText.classList.remove('hidden');

                ended = true;
                return;
            }
            return;
        }
        if (originalString[p.length - 1] == " " && p[p.length - 1] != " ") {
            input.value = input.value.slice(0, -1);
            return;
        }
        index.classList.add("wrong");
    }
    let afterIndex = document.querySelector(
        `p.given-text span.span${p.length}`
    );
    // let afterIndexTop = afterIndex.getBoundingClientRect().top;
    // if (index.getBoundingClientRect().top != afterIndexTop) {
    //     moveCaretDown(afterIndex, index);
    // } else {
    //     moveCaret(index);
    // }
    // caret.style.animationName = "none";

    if (input.value.length >= originalString.length) {
        console.log(cnt)
        clearInterval(intervalId);
        input.disabled = true;
        Words();
        score.textContent = `${(correctWords / (cnt / 60)).toFixed(2)} wpm`;
        accuracy.textContent = `${(((correctWords / (cnt / 60)) * 100) / (typedWords / (cnt / 60))).toFixed(2)} %`;
        timeSpent.textContent = `${(cnt / 60).toFixed(2)} min`;
        typingArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        str.style.opacity = '0.3';
        caret.style.opacity = '0.3';
        afterText.classList.remove('hidden');

        ended = true;
        return;
    }
});


time.addEventListener('click', () => {
    if (inputStarted === false) {
        if (clockActive === false) {
            time.style.color = "#ffd700";
            clockActive = true;
            clockHover = false;
            // clockFlag = true;
        }
        else {
            time.style.color = 'rgb(116, 112, 131)';
            clockActive = false;
            // clockFlag = false;
            clock = 0;
            clockHover = true;
            timerSet.forEach((item) => {
                item.style.color = 'rgb(116, 112, 131)';
            })
        }
    }
});

// to fix hover effect
time.addEventListener('mouseover', () => {
    if (clockHover === true)
        time.style.color = 'white';
});
time.addEventListener('mouseout', () => {
    if (clockHover === true)
        time.style.color = 'rgb(116, 112, 131)';
})

timerSet.forEach((item) => {
    item.addEventListener("click", () => {
        if (inputStarted === false) {
            if (clockActive && clock === 0) {
                item.style.color = "#ffd700";
                clock = item.getAttribute("value");
                liActiveValue = item.getAttribute("value");
            }
            else if (clockActive && liActiveValue === item.getAttribute("value")) {
                item.style.color = 'rgb(116, 112, 131)';
                clock = 0;
            }
        }
    });
});

function startTimerForClock() {
    setTimeout(() => {
        if(ended === true){
            return;
        }
        clock--;
        stopWatch.innerText = clock;
        if (clock != 0) startTimerForClock();
        else {
            if (ended === false) {
                console.log(cnt);
                clearInterval(intervalId);
                input.disabled = true;
                Words();
                score.textContent = `${(correctWords / (cnt / 60)).toFixed(2)} wpm`;
                accuracy.textContent = `${(((correctWords / (cnt / 60)) * 100) / (typedWords / (cnt / 60))).toFixed(2)} %`;
                timeSpent.textContent = `${(cnt / 60).toFixed(2)} min`;
                typingArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                str.style.opacity = '0.3';
                caret.style.opacity = '0.3';
                afterText.classList.remove('hidden');
                // console.log(correctWords)
                // console.log(typedWords)
            }
        }
    }, 1000);
}

function totalWordsInText(originalString) {
    for (let i = 0; i < originalString.length; i++) {
        if (originalString[i] === ' ')
            TotalWords++;
    }
}

function Words() {
    input.value = input.value.replace(/\s+/g, " ").trim();
    let toCheckFirstWord = true;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === ' ') {
            typedWords++;
            toCheckFirstWord = false;
        }
    }
    if (toCheckFirstWord === true)
        typedWords++;
    if (input.value.length >= originalString.length)
        typedWords++;

    let flag = true;
    for (let i = 0; i < input.value.length; i++) {
        let index = document.querySelector(`p.given-text span.span${i}`)
        if ((input.value[i] !== originalString[i] && input.value[i] !== ' ') || index.classList.contains('notTyped')) {
            flag = false;
        }
        if (flag === true && input.value[i] === ' ' && input.value[i] === originalString[i]) {
            correctWords++;
        }
        if (flag === false && input.value[i] === ' ') {
            flag = true;
        }
        if (flag === true && i + 1 === input.value.length)
            correctWords++;
    }
}

function timer() {
    intervalId = setInterval(() => {
        cnt++;
    }, 1000);
}






function moveCaret(index) {
    let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 35 + index.getBoundingClientRect().width;
    caret.style.left = `${caretLeft}px`;
    let caretTop = index.getBoundingClientRect().top - firstWordTop + 35;
    caret.style.top = `${caretTop}px`;
}

function moveCaretDown(afterIndex, index) {
    line++;
    let caretLeft = 35;
    caret.style.left = `${caretLeft}px`;
    let caretTop = afterIndex.getBoundingClientRect().top - firstWordTop + 35;
    caret.style.top = `${caretTop}px`;
    if (line > 2) {
        if (line == 3) scrollDistance = 55;
        else scrollDistance += 36;
        if (totalLines - line <= 7) {
        } else {
            caret.style.top = "78px";
            container.scrollTop = scrollDistance;
        }
    }
}

function moveCaretBack(index) {
    if (line != 0) line--;
    let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 35;
    caret.style.left = `${caretLeft}px`;
    let caretTop = index.getBoundingClientRect().top - firstWordTop + 35;
    caret.style.top = `${caretTop}px`;
    if (line >= 2) {
        if (line == 2) scrollDistance = 18;
        else scrollDistance -= 36;
        if (totalLines - line <= 7) {
        } else {
            caret.style.top = "78px";
            container.scrollTop = scrollDistance;
        }
    }
}
