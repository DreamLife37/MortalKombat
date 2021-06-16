export const logs = {

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

export const $chat = document.querySelector('.chat')

const HIT = {
    head: 30, //30
    body: 25, //25
    foot: 20, //20
}

const ATTACK = ['head', 'body', 'foot'];

let random;

export const $formFight = document.querySelector('.control');

export let getRandom = (num) => random = Math.ceil(Math.random() * num);

export const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`
}

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
            return logs[type] //возвращаем строку
                .replace('[player1]', playerName1)
                .replace('[player2]', playerName2)
                .replace('[time]', getTime());
            break;
        case 'hit':
            return logs[type][getRandom(logs[type].length - 1) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2)
            break;
        case 'defence':
            return logs[type][getRandom(logs[type].length - 1) - 1]
                .replace('[playerKick]', playerName1)
                .replace('[playerDefence]', playerName2)
            break;
        case 'end':
            return logs[type][getRandom(logs[type].length - 1) - 1]
                .replace('[playerWins]', playerName1)
                .replace('[playerLose]', playerName2)
            break;
        case 'draw':
            return logs[type];
            break;
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

    }
    if (type === 'hit') {

    }
    console.log(text)
    let el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);

}

