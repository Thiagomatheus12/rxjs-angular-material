function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Teste';

    return element;
}

document.body.appendChild(component());