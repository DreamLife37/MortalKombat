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
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
   
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
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
    
};


function elHP() {
 
       return document.querySelector(`.player${this.player} .life`);
     //return document.querySelector('.player' + this.player + ' .life');
     }

 

//Для того чтобы убрать повторные действия по созданию элемента и добавление класса необходимо эти действия упаковать в функцию
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) { //прописываем условие чтобы функция создавала класс, только в том случае если мы его передали
        $tag.classList.add(className);
    }
    return $tag;
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

 
  function renderHP() {
this.elHP().style.width = this.hp + '%';
}
 
function getRandom(num) {
    return random = Math.ceil(Math.random() * num);
}


function changeHP() {
  
    this.hp -= getRandom(20);
    console.log(getRandom(20));
   
        if (this.hp <= 0) {
            this.hp = 0;
        }
        this.renderHP();
      
}


function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    if (name) { //если имя пришло выводи победителя
        $winTitle.innerText = name + ' win';
    } else { //иначе ничья
        $winTitle.innerText = ' DRAW';
    }
     return $winTitle;
}

$randomButton.addEventListener('click', function () {
       
    player1.changeHP();
    player2.changeHP();



if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true
}

if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
} else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
} else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
}

})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
