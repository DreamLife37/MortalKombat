//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    attack: function (name) {
        console.log(name + ' ' + 'Fight ...')
    },

}

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'knife'],
    attack: function (name) {
        console.log(name + ' ' + 'Fight ...')
    },

}


//Для того чтобы убрать повторные действия по созданию элемента и добавление класса необходимо эти действия упаковать в функцию
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) { //прописываем условие чтобы функция создавала класс, только в том случае если мы его передали
        $tag.classList.add(className);
    }
    return $tag;
}


/* function createPlayer(player, name, life) {
const $player =  document.createElement('div');
const $progressBar =  document.createElement('div');
const $character =  document.createElement('div');
const $life =  document.createElement('div');
const $name =  document.createElement('div');
const $img = document.createElement('img');

$player.classList.add(player);
$progressBar.classList.add('progressbar');
$character.classList.add('character');
$life.classList.add('life');
$life.style.width = life;
$name.classList.add('name');
$name.innerText = name; */


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

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');



    if (player.hp > 0) {
        player.hp -= getRandomInRange(1, 20);
        $playerLife.style.width = player.hp + '%';
        if (player.hp < 0) {
            player.hp = 0;
        }
    }
    $playerLife.style.width = player.hp + '%';
    console.log(player.hp);
    if (player.hp <= 0) {
        if (player1.hp > player2.hp) {
            $arenas.appendChild(playerWin(player1.name));
        } else {
            $arenas.appendChild(playerWin(player2.name));
        }
    }


}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
    return $loseTitle;
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' win';
    $randomButton.disabled = true
    return $winTitle;
}

$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));