import {
    createElement
} from '../utils/index.js';


//import Player from "./player/index.js";

const attack = () => {
    console.log(this.name + ' ' + 'Fight ...');
}

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelectror = props.rootSelectror;

    }
    changeHP = (valueFight) => {
        //valueFight
        this.hp -= valueFight;
        console.log(valueFight);
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }


    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressBar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');

        $life.style.width = this.hp + '%';
        $name.innerText = this.name;
        $img.src = this.img;

        $player.appendChild($progressBar);

        $player.appendChild($character);
        $progressBar.appendChild($life);
        $progressBar.appendChild($name);
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelectror}`);
        $root.appendChild($player);
        return $player;

    };

}

export default Player;