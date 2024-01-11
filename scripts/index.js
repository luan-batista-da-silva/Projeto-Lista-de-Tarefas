let lista_objt = [];

let todo_list = JSON.parse(localStorage.getItem('todo_list')) || {
    lista_objt: []
};

let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

updateList();

function updateList() {
    let tarefas = document.querySelector('section#tarefas');
    let semana = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];

    if (localStorage.todo_list) {
        lista_objt = JSON.parse(localStorage.getItem('todo_list'));
    }

    lista_objt.sort(compare);
    tarefas.innerHTML = '';

    for (let i = 0; i < lista_objt.length; i++) {
        let dateAux = new Date(lista_objt[i].data);
        let weekDay = new Date(dateAux.getFullYear(), dateAux.getMonth(), dateAux.getDate() + 1, dateAux.getDay() + 1);

        let dia = weekDay.getDate();
        dia = dia < 10 ? "0" + dia : dia;
        let mes = weekDay.getMonth() + 1;
        mes = mes < 10 ? "0" + mes : mes;

        weekDay.toLocaleDateString("pt-br", options);

        let newWork = document.createElement("div");
        let newDate = document.createElement("p");
        let newName = document.createElement("p");
        let newButton = document.createElement("p");

        newWork.className = "divWork";
        newDate.className = "pDate";
        newName.className = "pName";
        newName.id = `checkName_${i}`;
        newButton.className = "pButton";

        newName.textContent = lista_objt[i].nome;
        newDate.textContent = `${dia}/${mes}/${weekDay.getFullYear()} - ${semana[weekDay.getDay()]}`;
        newButton.innerHTML += `
        <button class="checkButton" onclick="checkElementList(${i})"><span class="material-symbols-outlined" id="checkButton_${i}">
        check_box_outline_blank
        </span></button> 
        <button class="delButton" onclick="todoListDel(${i}, todoListReset)"><span class="material-symbols-outlined">delete</span></button>`

        newWork.appendChild(newDate);
        newWork.appendChild(newName);
        newWork.appendChild(newButton);

        tarefas.appendChild(newWork);
    }

}

function todoListAdd() {
    let nome = document.querySelector('input#name').value;
    let data = document.querySelector('input#date').value;

    let dateObjt = new Date(data);

    let objt = {
        data: new Date(),
        nome: ''
    };

    if (localStorage.todo_list) {
        lista_objt = JSON.parse(localStorage.getItem('todo_list'));
    }

    objt.data = data;
    objt.nome = nome;

    lista_objt.push(objt);



    console.log(lista_objt);
    
    lista_objt.sort(compare);
    
    console.log(lista_objt);

    localStorage.todo_list = JSON.stringify(lista_objt);

    updateList();

    document.querySelector('input#name').value = '';
    document.querySelector('input#date').value = '';
    document.querySelector('input#name').focus();
}

function todoListReset() {
    localStorage.removeItem('todo_list');
    lista_objt = [];

    localStorage.todo_list = JSON.stringify(lista_objt);
    updateList(); // Atualiza a lista após limpar os dados
}


function todoListDel(pos, cb) {
    console.log(lista_objt);
    lista_objt.splice(pos, 1);

    if (lista_objt.length === 0) {
        cb();
    }
    else {
        localStorage.todo_list = JSON.stringify(lista_objt);
    }

    console.log(lista_objt);
    updateList();
}

function checkElementList(pos) {
    let element = document.querySelector(`#checkButton_${pos}`)
    let nameElement = document.querySelector(`#checkName_${pos}`);

    element.innerHTML = "check_box";
    nameElement.style.textDecoration = "line-through";
    
}

function compare(a, b) {
    return new Date(a.data) - new Date(b.data);
}
