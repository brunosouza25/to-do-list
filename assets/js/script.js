let listOfTasks = localStorage.getItem('listOfTasks')
    ? JSON.parse(localStorage.getItem('listOfTasks'))
    : [];

let list = document.getElementById('list');
const addButtom = document.getElementById('add');
const inputTask = document.getElementById('task');
updateListView();

addButtom.addEventListener('click', function () {
    addTask(inputTask.value);
});

inputTask.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' || this.val === '') {
        return;
    }

    addTask(this.value);
});

function addTask(task) {
    if (task === '') {
        return;
    }

    listOfTasks.push(task);
    const listOfTasksJson = JSON.stringify(listOfTasks);
    localStorage.setItem('listOfTasks', listOfTasksJson);
    updateListView();
    clearInput();
}

function updateListView() {
    list.innerHTML = '';
    for (let [key, value] of listOfTasks.entries()) {
        const li = document.createElement('li');
        li.innerText = value;
        li.classList.add('element');
        li.appendChild(createDeleteButtom(key));
        list.appendChild(li);
    }
}

function deleteTask(idTask) {
    listOfTasks.splice(idTask, 1);
    const listOfTasksJson = JSON.stringify(listOfTasks);
    localStorage.setItem('listOfTasks', listOfTasksJson);
    updateListView();
}

function createDeleteButtom(key) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('onClick', `deleteTask(${key})`);
    deleteButton.classList.add('deleteButton');
    deleteButton.innerText = 'Apagar';
    return deleteButton;
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}
