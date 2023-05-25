const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const borderLinks = document.querySelectorAll('.border-link');
const li = document.querySelectorAll('.timer-options>li');
const resDiv = document.querySelectorAll('.result-content>div>p');
const liveTime = document.querySelector('.live-time>div>p');
const typingArea = document.querySelector('.typing-area');
const nav = document.querySelector('nav');

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

let typedWords = 0;
let correctWords = 0;
let TotalWords = 1;
let currentWordTyping = 0;
let timerForScore = true;
let cnt = 0;
let ended = false;
let normalTimer = true;
let S = 0;
let A = 0;

let backspaced = false;
let line = 0;
let scrollDistance = 0;
let flag = false;
let totalLines = 0;

const stopWatch = document.querySelector('.live-time>div>p');
const score = document.querySelector('.score>p>span');
const accuracy = document.querySelector('.accuracy>p>span');
const timeSpent = document.querySelector('.time-spent>p>span');
const afterText = document.querySelector('#after-text');

const capsLockIndicator = document.querySelector('.caps-lock');
const capsMsg = document.querySelector('.caps-lock>p>span')

document.addEventListener('DOMContentLoaded', function () {
    var defaultTheme = 'theme1';
    document.documentElement.classList.add(defaultTheme);
});

input.style.height = '0';
input.style.width = '0';
input.style.border = '0';
input.style.padding = '0';

input.addEventListener("keyup", function (event) {
    if (event.getModifierState("CapsLock")) {
        capsLockIndicator.style.visibility = 'visible';
        capsMsg.innerText = 'ON';
    } else {
        capsLockIndicator.style.visibility = 'hidden';
        capsMsg.innerText = 'OFF';
    }
});

str.addEventListener('click', () => {
    input.focus();
})

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        input.focus();
    }
});

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'li' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'input' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        !clickedElement.classList.contains('typing-area')) {

        if (!mouseCaret.classList.contains('clicked'))
            applyNextColorTheme();
    }

    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'li' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'input' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        !clickedElement.classList.contains('typing-area')) {

        mouseCaret.classList.add('clicked');
        setTimeout(function () {
            mouseCaret.classList.remove('clicked');
        }, 800);
    }
});

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
    liveTime.classList.add('hovered-link');
})
liveTime.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
    liveTime.classList.remove('hovered-link');
})

typingArea.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
typingArea.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

function handleNavToggle() {
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}

function applyNextColorTheme() {
    var themes = ['theme1', 'theme2', 'theme3', 'theme4'];
    var currentTheme = getAppliedTheme();
    document.documentElement.classList.remove(currentTheme);
    var currentIndex = themes.indexOf(currentTheme);
    var nextIndex = (currentIndex + 1) % themes.length;
    var nextTheme = themes[nextIndex];
    document.documentElement.classList.add(nextTheme);
}

function getAppliedTheme() {
    var themes = ['theme1', 'theme2', 'theme3', 'theme4'];
    var appliedTheme = themes.find(theme => document.documentElement.classList.contains(theme));
    return appliedTheme;
}

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

input.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Backspace") {
        e.preventDefault();
        return;
    }
    let ptr = input.value;
    if (ptr.length < 1) {
        return;
    }

    if (e.key === "Backspace") {
        let once = true;
        let top = false;
        let index = document.querySelector(
            `p.given-text span.span${ptr.length - 1}`
        );
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
                if (index.getBoundingClientRect().top !== afterIndexTop) {
                    top = true;
                    moveCaretBack(index);
                } else if (index.getBoundingClientRect().top !== beforeIndexTop) {
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
            input.value = ptr;
            input.value += originalString[ptr.length - 1];
            let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 20 + index.getBoundingClientRect().width;
            caret.style.left = `${caretLeft}px`;
            if (!top) {
                let caretTop = index.getBoundingClientRect().top - firstWordTop + 20;
                caret.style.top = `${caretTop}px`;
            }
            flag = false;
            return;
        } else {
            index.classList.remove("right");
            index.classList.remove("wrong");
            let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 20;
            caret.style.left = `${caretLeft}px`;
            let caretTop = index.getBoundingClientRect().top - firstWordTop + 20;
            caret.style.top = `${caretTop}px`;
        }
        if (ptr.length == 1) {
            caret.style.left = "20px";
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
        if (index.getBoundingClientRect().top !== afterIndexTop) {
            moveCaretBack(index);
        } else if (index.getBoundingClientRect().top != beforeIndexTop) {
            moveCaretBack(beforeIndex);
            input.value = input.value.slice(0, -1);
        }
        backspaced = true;
    }
});

input.addEventListener("input", (e) => {
    if (clockActive && clock === 0) {
        input.value = input.value.slice(0, -1);
        return;
    }

    inputStarted = true;
    let p = input.value;

    if (p.length < 1) {
        return;
    }

    if (input.value.length > 0 && clockActive == true && clock != 0) {
        clockActive = false;
        normalTimer = false;
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
        p = "";
        input.value = "";
        return;
    }
    if (p.length > 1 && p[p.length - 1] == " " && p[p.length - 2] == " ") {
        input.value = input.value.slice(0, -1);
        return;
    }
    if (originalString[p.length - 1] === p[p.length - 1]) {
        index.classList.add("right");
        if (p[p.length - 1] === ' ')
            currentWordTyping++;
    }
    else {
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
            let afterIndex = document.querySelector(
                `p.given-text span.span${p.length}`
            );
            if (afterIndex) {
                let afterIndexTop = afterIndex.getBoundingClientRect().top;
                if (index.getBoundingClientRect().top !== afterIndexTop) {
                    moveCaretDown(afterIndex, index);
                } else {
                    moveCaret(index);
                }
            }
            if (currentWordTyping >= TotalWords) {
                final();
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
    if (afterIndex) {
        let afterIndexTop = afterIndex.getBoundingClientRect().top;
        if (index.getBoundingClientRect().top !== afterIndexTop) {
            moveCaretDown(afterIndex, index);
        } else {
            moveCaret(index);
        }
    }
    caret.style.animationName = "none";

    if (input.value.length >= originalString.length) {
        final();
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
        }
        else {
            time.style.color = 'var(--main-text-color)';
            clockActive = false;
            clock = 0;
            stopWatch.innerText = clock;
            clockHover = true;
            timerSet.forEach((item) => {
                item.style.color = 'var(--main-text-color)';
            })
        }
    }
});

time.addEventListener('mouseover', () => {
    if (clockHover === true)
        time.style.color = 'var(--hover-color)';
});
time.addEventListener('mouseout', () => {
    if (clockHover === true)
        time.style.color = 'var(--main-text-color)';
})

timerSet.forEach((item) => {
    item.addEventListener("click", () => {
        if (inputStarted === false) {
            if (clockActive && clock === 0) {
                item.style.color = "#ffd700";
                clock = item.getAttribute("value");
                liActiveValue = item.getAttribute("value");
                stopWatch.innerText = clock;
            }
            else if (clockActive && liActiveValue === item.getAttribute("value")) {
                item.style.color = 'var(--main-text-color)';
                clock = 0;
                stopWatch.innerText = clock;
            }
            else if (clockActive && clock !== 0 && liActiveValue !== item.getAttribute("value")) {
                clock = item.getAttribute("value");
                liActiveValue = item.getAttribute("value");
                stopWatch.innerText = clock;
                timerSet.forEach((items) => {
                    items.style.color = 'var(--main-text-color)';
                })
                item.style.color = "#ffd700";
            }
        }
    });
});

function startTimerForClock() {
    setTimeout(() => {
        if (ended === true) {
            return;
        }
        clock--;
        stopWatch.innerText = clock;
        stopWatch.classList.remove('liveTimeEffects')
        if (clock === 3 || clock === 2 || clock === 1) {
            stopWatch.classList.add('liveTimeEffects')
        }
        if (clock != 0) startTimerForClock();
        else {
            if (ended === false) {
                final();
            }
        }
    }, 1000);
}

totalWordsInText(originalString);
function totalWordsInText(originalString) {
    for (let i = 0; i < originalString.length; i++) {
        if (originalString[i] === ' ')
            TotalWords++;
    }
}

function Words() {
    input.value = input.value.replace(/\s+/g, " ").trim();
    let toCheckFirstWord = true;
    let toCheckOtherWords = false;
    for (let i = 0; i < input.value.length; i++) {
        if (toCheckOtherWords === true)
            toCheckFirstWord = true;
        if (input.value[i] === ' ') {
            typedWords++;
            toCheckFirstWord = false;
            toCheckOtherWords = true;
        }
    }
    if (toCheckFirstWord === true && input.value.length < originalString.length)
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
        if (flag === true && i + 1 === input.value.length && originalString[i + 1] === ' ')
            correctWords++;
        if (flag === true && i + 1 === originalString.length)
            correctWords++;
    }
}

function timer() {
    intervalId = setInterval(() => {
        cnt++;
        if (normalTimer)
            stopWatch.innerText = cnt;
    }, 1000);
}

function info() {
    if (S >= 60) {
        if (A === 100)
            afterText.textContent = 'Perfect Score!';
        else if (A >= 90)
            afterText.textContent = 'Great Work!';
        else if (A >= 50 && A < 90)
            afterText.textContent = 'Good Effort!';
        else
            afterText.textContent = 'Keep Practicing!'
    }
    else if (S >= 40 && S < 60) {
        if (A === 100)
            afterText.textContent = 'Great Work!';
        else if (A >= 90)
            afterText.textContent = 'Well Done!';
        else if (A >= 50 && A < 90)
            afterText.textContent = 'Good Effort!';
        else
            afterText.textContent = 'Keep Practicing!'
    }
    else {
        if (A === 100)
            afterText.textContent = 'Well Done!';
        else if (A >= 90)
            afterText.textContent = 'Good Effort!';
        else if (A >= 50 && A < 90)
            afterText.textContent = 'Keep Practicing!';
        else
            afterText.textContent = 'You Can Do Better!'
    }
}

function final() {
    clearInterval(intervalId);
    input.disabled = true;
    Words();
    S = (correctWords / (cnt / 60)).toFixed(2);
    A = (((correctWords / (cnt / 60)) * 100) / (typedWords / (cnt / 60))).toFixed(2);
    score.textContent = `${S} wpm`;
    accuracy.textContent = `${A} %`;
    timeSpent.textContent = `${(cnt / 60).toFixed(2)} min`;
    typingArea.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    str.style.opacity = '0.3';
    caret.style.display = 'none';
    info();
    afterText.classList.remove('hidden');
}

function moveCaret(index) {
    let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 20 + index.getBoundingClientRect().width;
    caret.style.left = `${caretLeft}px`;
    let caretTop = index.getBoundingClientRect().top - firstWordTop + 20;
    caret.style.top = `${caretTop + typingArea.scrollTop}px`;
}

function moveCaretDown(afterIndex, index) {
    line++;
    let caretLeft = 20;
    caret.style.left = `${caretLeft}px`;
    let caretTop = afterIndex.getBoundingClientRect().top - firstWordTop + 20;
    if (line > 2 && typingArea.scrollHeight - typingArea.scrollTop > typingArea.clientHeight) {
        scrollDistance += 36;
        typingArea.scrollTop = scrollDistance;
    }
    caret.style.top = `${caretTop + typingArea.scrollTop}px`;
}

function moveCaretBack(index) {
    if (line != 0) line--;
    let caretLeft = index.getBoundingClientRect().left - firstWordLeft + 20;
    caret.style.left = `${caretLeft}px`;
    let caretTop = index.getBoundingClientRect().top - firstWordTop + 20;
    if (line >= 2) {
        scrollDistance -= 36;
        typingArea.scrollTop = scrollDistance;
    }
    caret.style.top = `${caretTop - typingArea.scrollTop}px`;
}
