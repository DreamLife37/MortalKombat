//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];


const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    //changeHP: changeHP, //в ES6 упростили, если переменная или фкнкция внешняя имеет такое же имя как в объекте, то можно написать просто имя
    changeHP,
    renderHP,
    elHP,
    attack,

}

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'knife'],
    changeHP,
    renderHP,
    elHP,
    attack,
};

function attack() {
    console.log(this.name + ' ' + 'Fight ...');
}



//Для того чтобы убрать повторные действия по созданию элемента и добавление класса необходимо эти действия упаковать в функцию
function createElement(tag, className) {
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
}

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

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
    //return document.querySelector('.player' + this.player + ' .life');
}


function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function getRandom(num) {
    return random = Math.ceil(Math.random() * num);
}


function changeHP(valueFight) {

    this.hp -= valueFight;
    console.log(valueFight);

    if (this.hp <= 0) {
        this.hp = 0;
    }

}


function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) { //если имя пришло выводи победителя
        $winTitle.innerText = name + ' win';
    } else { //иначе ничья
        $winTitle.innerText = ' DRAW';
    }
    return $winTitle;
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1]; //тк массив начинается с 0, то вычитаем 1
    const defence = ATTACK[getRandom(3) - 1];
    //console.log('####: hit', hit);
    //console.log('####: defence', defence);
    return { //возвращаем enemyAttack() объект, в котором мы будем знать насколько ударил соперник
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}


$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    //console.dir($formFight);
    const enemy = enemyAttack();
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
    console.log('## e:', enemy);
    console.log(attack.value);
    console.log(enemy.value);



    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }


    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }


    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
    }


})