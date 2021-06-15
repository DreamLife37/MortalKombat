//чтобы все обращения к DOM свести к минимуму вынесли $arenas из функции createPlayer
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat')



const HIT = {
    head: 30, //30
    body: 25, //25
    foot: 20, //20
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};


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
        generateLogs('draw', player2, player1);
    }
    return $winTitle;
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
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

function playerAttack() {

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



const date = new Date();
const time = date.getHours() + ' ч.  ' + date.getMinutes() + ' мин.  ';



function generateLogs(type, player1, player2) { //вторым аргументом передаем игрока который бъет 
    console.log(type);
    let text = '';
    let el = '';

    switch (type) {
        case 'start':
            text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);;
            console.log(text);
            el = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;

        case 'hit':
            text = logs[type][getRandom(18) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            console.log(text);
            el = `<p> ${time}  ${text}  -${100-player2.hp || 100-player1.hp} ${player2.hp || player1.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            console.log(enemyAttack);
            break;

        case 'defence':
            text = logs[type][getRandom(8) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
            console.log(text);
            el = `<p> ${time}  ${text} </p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;

        case 'end':
            text = logs[type][getRandom(3) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            console.log(text);
            el = `<p> ${time}  ${text} </p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            break;

        case 'draw':
            text = logs[type];
            console.log(text);
            el = `<p> ${time}  ${text} </p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
    }



    /*  if (type == 'start') {
        const text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);;
        console.log(text);
        const el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    } else if (type == 'hit') {
        const text = logs[type][getRandom(18) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
        console.log(text);
        //const el = '<p>'+text+'</p>'; //устарелый сбособ
        const el = `<p> ${time}  ${text} ${player1.hp || player2.hp}/100</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    } else if (type == 'defence') {
        const text = logs[type][getRandom(8) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
        console.log(text);
        const el = `<p> ${time}  ${text} </p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    } else if (type == 'end') {
        const text = logs[type][getRandom(3) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
        console.log(text);
        const el = `<p> ${time}  ${text} </p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    } else if (type == 'draw') {
        const text = logs[type][0];
        console.log(text);
        const el = `<p> ${time}  ${text} </p>`;
        $chat.insertAdjacentHTML('afterbegin', el);


        console.log(player2.hp);
    }


*/
}

console.log(player1.hp);

/* function generateLogs(type, player1, player2) {
switch (type)
} */

function getHp() {

}



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
        generateLogs('defence', player1, player2);
    }

    showResult();


});