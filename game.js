import {
    HIT,
    LOGS,
    ATTACK,
    $arenas,
    $formFight,
    $chat,
} from './constants/index.js';

import {
    getRandom,
    createElement,
    getTime,
    createReloadButton,
} from "./utils/index.js";

import Player from "./player/index.js";

class Game {

    constructor() {
        this.player1 = new Player({
            player: 1,
            name: 'SCORPION',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            rootSelectror: 'arenas',
        });

        this.player2 = new Player({
            player: 2,
            name: 'SUB-ZERO',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
            rootSelectror: 'arenas',
        });
    }

    start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();
        this.generateLogs('start', this.player1, this.player2);
        $formFight.addEventListener("submit", (e) => {
            e.preventDefault();
            // console.log(player1.hp);
            //console.dir($formFight);
            const enemy = this.enemyAttack();
            const player = this.playerAttack();
            //// console.log('## e:', enemy);
            // console.log(attack.value);

            this.fight(enemy, player);
            this.showResult();


        });
    }

    playerAttack = () => {
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



    enemyAttack = () => {
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


    fight = (enemy, player) => {
        const {
            value: valueEnemy,
            hit: hitEnemy,
            defence: defenceEnemy
        } = enemy;
        const {
            value,
            hit,
            defence
        } = player;

        if (hitEnemy !== defence) {
            this.player2.changeHP(valueEnemy);
            this.player2.renderHP();
            this.generateLogs('hit', this.player1, this.player2, valueEnemy);
        } else {
            this.generateLogs('defence', this.player1, this.player2);
        }

        if (hit !== defenceEnemy) {
            this.player1.changeHP(value);
            this.player1.renderHP();
            this.generateLogs('hit', this.player2, this.player1, value);
        } else {
            this.generateLogs('defence', this.player2, this.player1);
        }
    }


    generateLogs = (type, player1 = {}, player2 = {}, valueAttack) => { //вторым аргументом передаем игрока который бъет 
        console.log(type);
        let text = this.getTextLog(type, player1.name, player2.name);
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

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            $formFight.disabled = true;
            this.createReloadButton();
        }
        //console.log(player1.hp);
        //console.log(player2.hp);
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            $arenas.appendChild(this.playerWin(this.player2.name));
            this.generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            $arenas.appendChild(this.playerWin(this.player1.name));
            this.generateLogs('end', this.player1, this.player2);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            $arenas.appendChild(this.playerWin());
            this.generateLogs('draw', this.player1, this.player2);
        }
    }

    getTextLog = (type, playerName1, playerName2) => {
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

    playerWin = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        if (name) { //если имя пришло выводи победителя
            $winTitle.innerText = name + ' win';
        } else { //иначе ничья
            $winTitle.innerText = ' DRAW';
            // generateLogs('draw', player2, player1);
        }
        return $winTitle;
    }

    playerWins = (player) => {
        const $winTitle = createElement("div", "winTitle")

        $winTitle.innerText = "Draw"

        if (player) {
            $winTitle.innerText = player.name + " wins"
        }

        this.root.appendChild($winTitle)
    }

    createReloadButton = () => {
        const $reloadWrap = createElement("div", "reloadWrap")
        const $reloadButton = createElement("button", "button")

        $reloadButton.innerText = "Restart"

        $reloadWrap.appendChild($reloadButton)
        $arenas.appendChild($reloadWrap);

        $reloadButton.addEventListener("click", function () {
            window.location.reload()
        });
    }

}

export default Game