let lista_objt = [];

let todo_list = JSON.parse(localStorage.getItem('todo_list')) || {
    lista_objt: []
};

// let options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric"
// };

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

        // weekDay.toLocaleDateString("pt-br", options);

        let newWork = document.createElement("div");
            let newDate = document.createElement("div");
        let newActivity = document.createElement("div");    
            let newName = document.createElement("p");
            let newCheck = document.createElement("div");
            let newTrash = document.createElement("div");

        newWork.className = "divWork";
            newDate.className = "divDate";
        newActivity.className = "divAct"
            newName.className = "divName";
            newName.id = `checkName_${i}`;
            newCheck.className = "divButton";
            newTrash.className = "divButton";

        newCheck.innerHTML += ` <button class="checkButton" onclick="checkElementList(${i})"><span class="material-symbols-outlined" id="checkButton_${i}">check_box_outline_blank</span></button>`
        newName.innerHTML += `${lista_objt[i].tarefas.nome}`;
        newDate.textContent = `${dia}/${mes}/${weekDay.getFullYear()} - ${semana[weekDay.getDay()]}`;
        newTrash.innerHTML += `
        <button class="editButton" onclick="editActvity(${i})"><span class="material-symbols-outlined" id="editButton_${i}">edit</span></button>
        <button class="delButton" onclick="todoListDel(${i}, todoListReset)"><span class="material-symbols-outlined">delete</span></button>`

        newWork.appendChild(newDate);
        newActivity.appendChild(newCheck);
        newActivity.appendChild(newName);
        newActivity.appendChild(newTrash);

        tarefas.appendChild(newWork);
        tarefas.appendChild(newActivity);
    }

}

function todoListAdd() {
    let nome = document.querySelector('input#name').value;
    let data = document.querySelector('input#date').value;

    let dateObjt = new Date(data);

    let tarefaObjt = {
        nome: nome,
        descricao: '',
        decoration: 'none'
    }

    if (localStorage.todo_list) {
        lista_objt = JSON.parse(localStorage.getItem('todo_list'));
    }

    // Verifica se a data já existe no array sem considerar o horário
    let existingDateIndex = lista_objt.findIndex(item => item.data.setHours(0, 0, 0, 0) === dateObjt.setHours(0, 0, 0, 0));

    if (existingDateIndex !== -1) {
        // A data já existe, adiciona a nova tarefa para essa data
        lista_objt[existingDateIndex].tarefas.push(tarefaObjt);
    } else {
        // A data não existe, cria um novo objeto com a data e a tarefa
        let objt = {
            data: dateObjt,
            tarefas: [tarefaObjt] // Corrija o nome da propriedade para tarefas
        }
        lista_objt.push(objt);
    }

    console.log(lista_objt);
    
    lista_objt.sort(compare);
    
    console.log(lista_objt);

    localStorage.setItem('todo_list', JSON.stringify(lista_objt));

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
