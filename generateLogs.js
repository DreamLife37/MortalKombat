import {
    LOGS,
    ATTACK,
    HIT
} from '../constants/index.js';
import {
    getTime,
    getRandom,
    createReloadButton,
    $arenas,
    createElement
} from '../utils/index.js';
import {
    player1,
    player2
} from '../main.js';

export const $chat = document.querySelector('.chat')


//let random;

export const $formFight = document.querySelector('.control');


export const enemyAttack = () => {
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

export const playerAttack = () => {
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

const getTextLog = (type, playerName1, playerName2) => {
    switch (type) {
        case 'start':
            return LOGS[type] //возвращаем строку
                .replace('[player1]', playerName1)
                .replace('[player2]', playerName2)
                .replace('[time]', getTime());
            break;
        case 'hit':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2)
            break;
        case 'defence':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2)
            break;
        case 'end':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                .replace('[playerWins]', playerName1)
                .replace('[playerLose]', playerName2)
            break;
        case 'draw':
            return LOGS[type];
            break;
        default:
            alert('Что то пошло не так');
    }
}

export const generateLogs = (type, player1 = {}, player2 = {}, valueAttack) => { //вторым аргументом передаем игрока который бъет 
    console.log(type);
    let text = getTextLog(type, player1.name, player2.name);
    switch (type) {
        case 'hit':
            text = `${getTime()} ${text} -${valueAttack} [${player2.hp}/100]`;
            break;
        case 'defence':
        case 'end':
        case 'draw':
            text = `${getTime()} ${text}`;
            break;
            /*  default: //с таким дефольным кейсом выходит какжды раз при обновлении страницы Алерт
                 alert('Что то пошло не так'); 
                  */
    }
    console.log(text)
    let el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export const playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) { //если имя пришло выводи победителя
        $winTitle.innerText = name + ' win';
    } else { //иначе ничья
        $winTitle.innerText = ' DRAW';
        // generateLogs('draw', player2, player1);
    }
    return $winTitle;
}


export const showResult = () => {
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