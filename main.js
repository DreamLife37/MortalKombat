/* const player1 = {
    name: 'SCORPION',
    hp: 100,
    img:'',
    weapon: ['gun', 'knife'],
    attack: function() {
        console.log(player1.name + ' ' + 'Fight ...')
    }

}

player1.attack(); */


function createPlayer(player, name, life) {
const $player =  document.createElement('div');
$player.classList.add(player);
//const $root = document.querySelector('.root');
const $arenas = document.querySelector('.arenas');
const $progressBar =  document.createElement('div');
$progressBar.classList.add('progressBar');
const $character =  document.createElement('div');
$character.classList.add('character');

const $life =  document.createElement('div');
$life.classList.add('life');
$life.style.width = '100%';
$life.innerText = life;
const $name =  document.createElement('div');
$name.classList.add('name');
$name.innerText = name;
const $img = document.createElement('img');
$img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'

//$root.appendChild($player);
$arenas.appendChild($player);

$player.appendChild($progressBar);
$player.appendChild($character);
$progressBar.appendChild($life);
$progressBar.appendChild($name);
$character.appendChild($img);


}

createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);



