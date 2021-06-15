export const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    //changeHP: changeHP, //в ES6 упростили, если переменная или функция внешняя имеет такое же имя как в объекте, то можно написать просто имя
    changeHP,
    renderHP,
    elHP,
    attack, 
}

export const player2 = {
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

export function changeHP(valueFight) {

    this.hp -= valueFight;

    console.log(valueFight);

    if (this.hp <= 0) {
        this.hp = 0;
    }
}


export function elHP() {
    return document.querySelector(`.player${this.player} .life`);
    //return document.querySelector('.player' + this.player + ' .life');
}


export function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

export function attack() {
    console.log(this.name + ' ' + 'Fight ...');
}
