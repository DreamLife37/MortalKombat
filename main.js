import {
    player1,
    player2,
    changeHP,
    elHP,
    renderHP,
    attack
} from "./player.js";

import {
    createElement,
    $arenas,
    createReloadButton,
} from "./utils.js";
import {
    logs,
    getTime,
    generateLogs,
    getRandom,
    $chat,
    enemyAttack,
    playerAttack,
    $formFight,
} from "./generateLogs.js";

//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer

const createPlayer = (playerObj) => {
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


const playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) { //если имя пришло выводи победителя
        $winTitle.innerText = name + ' win';
    } else { //иначе ничья
        $winTitle.innerText = ' DRAW';
       // generateLogs('draw', player2, player1);
    }
    return $winTitle;
}


const showResult = () => {
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
        generateLogs('draw', player1, player2);
    }
}

$formFight.addEventListener('submit', (e) => {
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
        generateLogs('hit', player2, player1, enemy.value); //вторым аргументом передаем игрока который бъет, третьим который защищается 
    } else {
        generateLogs('defence', player2, player1);
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, attack.value);
    } else {
        generateLogs('defence', player1, player2);
    }
    showResult();

});

 const init = () => {
    generateLogs('start', player1, player2);
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
};
init();