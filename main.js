import {
    HIT,
    LOGS,
    ATTACK
} from './constants/index.js';

import Player from './Player/index.js';

/* import {
    getRandom,
    createElement,
    getTime,
    createReloadButton,
    $arenas
} from "./utils/index.js"; */

import {
    generateLogs,
    $chat,
    enemyAttack,
    playerAttack,
    $formFight,
    showResult,
    playerWin,
} from "./generateLogs.js";

export const player1 = new Player({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    rootSelectror: 'arenas',
});

export const player2 = new Player({
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelectror: 'arenas',
});

//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer


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
    player1.createPlayer();
    player2.createPlayer();
    generateLogs('start', player1, player2);

};
init();