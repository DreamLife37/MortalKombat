
export const $arenas = document.querySelector('.arenas');
export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) { //прописываем условие чтобы функция создавала класс, только в том случае если мы его передали
        $tag.classList.add(className);
    }
    return $tag;
}

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap'); //создание элемента и добавление ему класса
    const $reloadBbutton = createElement('button', 'button');

    $reloadBbutton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadBbutton);
    $arenas.appendChild($reloadWrap);
    $reloadBbutton.addEventListener('click', function () {
        window.location.reload();
    });
}
