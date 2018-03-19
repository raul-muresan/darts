'use strict';

var aim = document.getElementById('circle-aim');
var ammo = document.getElementById('ammo');
var arrow = document.getElementById('arrow');
var stupidFace = document.getElementById('circle-b');
var message = document.getElementById('message');
var openMouth = false;
var interval;
var intervalTime = 1000;

var messageTextStart = 'Apasa "Start" pentru a incepe.';
var messageTextToDO = 'Trage-i la Dragnea sub mustata!';
var messageTextSuccess = 'Bravo! I-ai tras-o la Dragnea sub mustata.';
var messageTextFail = 'Mai incearca pana-i tragi sub mustata.';
//
var score = 0;
var level = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function getTransformXY(el) {
    var transformMatrix = window.getComputedStyle(aim).getPropertyValue('transform');
    var arr = transformMatrix.slice(0, transformMatrix.length -1).split(',');
    var y = Number(arr.pop());
    var x = Number(arr.pop());
    return {
        nowX: x,
        nowY: y
    };
}

function overlapAB(a, b) {
    var rectA = a.getBoundingClientRect();
    var rectB = b.getBoundingClientRect();

    return !(rectA.right < rectB.left ||
                rectA.left > rectB.right ||
                rectA.bottom < rectB.top ||
                rectA.top > rectB.bottom);
}

function getMargin(el) {
    var elLeft = window.getComputedStyle(el).getPropertyValue('margin-left');
    var elRight = window.getComputedStyle(el).getPropertyValue('margin-right');
    var elTop = window.getComputedStyle(el).getPropertyValue('margin-top');
    var elBottom = window.getComputedStyle(el).getPropertyValue('margin-bottom');

    return {
        left: Number(elLeft.substr(0, elLeft.length -2)),
        right: Number(elRight.substr(0, elRight.length -2)),
        top: Number(elTop.substr(0, elTop.length -2)),
        bottom: Number(elBottom.substr(0, elBottom.length -2))
    };
}

function moveRandomAim() {
    var x = getRandomInt(501);
    var y = getRandomInt(501);

    aim.style.marginLeft = `${x}px`;
    aim.style.marginTop = `${y}px`;

    message.innerHTML = messageTextToDO;

    switch (level) {
        case 2:
            aim.style.transition = 'all 0.8s linear';
            intervalTime = 800;
            break;
        case 3:
            aim.style.transition = 'all 0.6s linear';
            intervalTime = 600;
            break;
        case 4:
            aim.style.transition = 'all 0.4s linear';
            intervalTime = 400;
            break;
        case 5:
            aim.style.transition = 'all 0.2s linear';
            intervalTime = 200;
            break;
        default:
            aim.style.transition = 'all 1s linear';
            intervalTime = 1000;
            break;
    }
};

function startMovingAim() {
    aim.style.display = 'block';
    arrow.style.display = 'none';
    openMouth = false;
    stupidFace.style.backgroundImage = "url('dragneaA.png')";
    interval = setInterval(moveRandomAim, intervalTime);
    ammoIn();
};

function stopMovingAim() {
    aim.style.display = 'none';
    clearInterval(interval);
    ammoIn();
    message.innerHTML = messageTextStart;
};

function updateScore() {
    var scoreSpan = document.getElementById('score');
    scoreSpan.innerHTML = score;
}

function updateLevel() {
    var levelSpan = document.getElementById('level');
    levelSpan.innerHTML = level;
}

function ammoOut() {
    ammo.style.marginLeft = '30%';
    ammo.style.marginTop = '-44%';
    ammo.style.transform = 'scale(0.4) rotate(-40deg)';
    arrow.style.display = 'none';
}

function ammoIn() {
    ammo.style.marginLeft = '-15%';
    ammo.style.marginTop = '3%';
    ammo.style.transform = 'scale(1) rotate(-40deg)';
}

function shoot() {
    arrow.style.display = 'block';
    arrow.style.marginLeft = `${getMargin(aim).left}px`;
    arrow.style.marginTop = `${getMargin(aim).top}px`;

    var arrowLeft = getMargin(arrow).left;
    var arrowTop = getMargin(arrow).top;

    stopMovingAim();

    openMouth = (arrowLeft >= 200 && arrowLeft <= 300) &&
                    (arrowTop >= 250 && arrowTop <= 300);

    if (openMouth) {
        stupidFace.style.backgroundImage = "url('dragneaB.png')";
        ammoOut();
        message.innerHTML = messageTextSuccess;
        score += 5;
    } else {
        ammoIn();
        stupidFace.style.backgroundImage = "url('dragneaA.png')";
        message.innerHTML = messageTextFail;
    };

    if (score < 5) {
        level = 1;
    } else if (score >= 5 && score < 10) {
        level = 2;
    } else if (score >= 10 && score < 15) {
        level = 3;
    } else if (score >= 15 && score < 20) {
        level = 4;
    } else if (score >= 20 && score < 25) {
        level = 5;
    };

    updateScore();
    updateLevel();
};


