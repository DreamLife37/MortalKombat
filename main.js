import {
    player1,
    player2,
    changeHP,
    elHP,
    renderHP,
    attack
} from "./player.js";
//import getRandom from "./utils.js";
import {
    createElement,
    $arenas,
    $formFight,
    createReloadButton
} from "./utils.js";
import {
    generateLogs,
    getRandom,
    $chat
} from "./generateLogs.js";


//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer
//const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
//const $formFight = document.querySelector('.control');
//const $chat = document.querySelector('.chat')

const HIT = {
    head: 30, //30
    body: 25, //25
    foot: 20, //20
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.'
};




/* function attack() {
    console.log(this.name + ' ' + 'Fight ...');
} */



//Для того чтобы убрать повторные действия по созданию элемента и добавление класса необходимо эти действия упаковать в функцию
/* function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) { //прописываем условие чтобы функция создавала класс, только в том случае если мы его передали
        $tag.classList.add(className);
    }
    return $tag;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap'); //создание элемента и добавление ему класса
    const $reloadBbutton = createElement('button', 'button');

    $reloadBbutton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadBbutton);
    $arenas.appendChild($reloadWrap);
    $reloadBbutton.addEventListener('click', function () {
        window.location.reload();
    });
} */

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');



    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressBar);

    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
    return $player;

}


function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) { //если имя пришло выводи победителя
        $winTitle.innerText = name + ' win';
    } else { //иначе ничья
        $winTitle.innerText = ' DRAW';
        generateLogs('draw', player2, player1);
    }
    return $winTitle;
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1]; //тк массив начинается с 0, то вычитаем 1
    const defence = ATTACK[getRandom(3) - 1];
    console.log('####: hit', hit);
    console.log('####: defence', defence);
    return { //возвращаем enemyAttack() объект, в котором мы будем знать насколько ударил соперник
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

const playerAttack = () => {

    const attack = {};

    for (let item of $formFight) {
        //console.dir(item);
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false; //сброс radio button
    }
    console.log('## a:', attack);

    return attack
}


function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        createReloadButton();
    }
    console.log(player1.hp);
    console.log(player2.hp);
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
    }
}

/* const date = new Date();
const time = date.getHours() + ' ч.  ' + date.getMinutes() + ' мин.  '; */

console.log(player1.hp);

generateLogs('start', player2, player1);


$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(player1.hp);
    //console.dir($formFight);
    const enemy = enemyAttack();
    const attack = playerAttack();
    console.log('## e:', enemy);
    console.log(attack.value);

    //По умолчанию мы играем за первого игрока, второй игрок - противник
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1); //вторым аргументом передаем игрока который бъет, третьим который защищается 
    } else {
        generateLogs('defence', player1, player2);
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
    } else {
        generateLogs('defence', player2, player1);
    }
/* 

    function getHp() {
        console.log(health)
        health = enemy.hit;
        return health

    } */

    showResult();
let change = enemy.hit
return change;

});