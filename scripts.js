const toDoFactory = (title, description, priority, project, dueDate, isComplete) => {
    const code = Math.floor(Math.random() * 10000);
    let isExpanded = false;
    return { title, description, priority, project, dueDate, isComplete, code, isExpanded };
};


const str = localStorage.getItem("todos");
const parsedLocalStorageToDos = JSON.parse(str);
console.log(parsedLocalStorageToDos);
const allToDos = parsedLocalStorageToDos;

const mainPageDisplay = document.getElementById('main-page');

function createToDoCard(toDoObject) {
    const toDoCard = document.createElement('div');
    toDoCard.classList.add('to-do-card');

    const toDoMainDisplay = document.createElement('div');
    toDoMainDisplay.classList.add('to-do-main-display')
    toDoCard.appendChild(toDoMainDisplay);

    const mainDisplayLeft = document.createElement('div');
    mainDisplayLeft.classList.add('main-display-left');
    toDoMainDisplay.appendChild(mainDisplayLeft);

    const checkBox = document.createElement('img');
    if (toDoObject.isComplete === true) {
        checkBox.setAttribute('src', './images/checkbox-filled.svg')
    }
    else {
        checkBox.setAttribute('src', './images/checkbox-unfilled.svg')
    }
    mainDisplayLeft.appendChild(checkBox);

    const toDoTitle = document.createElement('div');
    toDoTitle.classList.add('to-do-title');
    toDoTitle.innerHTML = toDoObject.title;
    mainDisplayLeft.appendChild(toDoTitle);

    const mainDisplayRight = document.createElement('div');
    mainDisplayRight.classList.add('main-display-right');
    const expandButton = document.createElement('img');
    expandButton.setAttribute('src', './images/expand.svg')
    const editButton = document.createElement('img');
    editButton.setAttribute('src', './images/edit.svg')
    const deleteButton = document.createElement('img');
    deleteButton.setAttribute('src', './images/delete.svg')
    mainDisplayRight.appendChild(expandButton)
    mainDisplayRight.appendChild(editButton)
    mainDisplayRight.appendChild(deleteButton)

    toDoMainDisplay.appendChild(mainDisplayRight);

    const detailsExpanded = document.createElement('div');
    detailsExpanded.classList.add('to-do-expanded-details');
    toDoCard.appendChild(detailsExpanded);

    const description = document.createElement('div');
    description.classList.add('to-do-description')
    description.innerHTML = toDoObject.description;
    detailsExpanded.appendChild(description)

    const dueDate = document.createElement('div');
    dueDate.classList.add('to-do-due-date');
    dueDate.innerHTML = "Due Date: " + toDoObject.dueDate;
    detailsExpanded.appendChild(dueDate)

    const project = document.createElement('div');
    project.classList.add('to-do-parent-project');
    project.innerHTML = "Project: " + toDoObject.project;
    detailsExpanded.appendChild(project);

    // Set priority
    if (toDoObject.priority === 'high') toDoCard.classList.add('high-urgency')
    else if (toDoObject.priority === 'medium') toDoCard.classList.add('medium-urgency')
    
    // Check if complete 
    if (toDoObject.isComplete === true) toDoCard.classList.add('completed')
   
    mainPageDisplay.appendChild(toDoCard);

    // Make check button
    checkBox.addEventListener('click', () => {
        if (toDoObject.isComplete === true) {
            checkBox.setAttribute('src', './images/checkbox-unfilled.svg')
            toDoObject.isComplete = false;
            toDoCard.classList.remove('completed')
        }
        else {
            checkBox.setAttribute('src', './images/checkbox-filled.svg')
            toDoObject.isComplete = true;
            toDoCard.classList.add('completed')
        }
    })

    // Make expand button
    expandButton.addEventListener('click', () => {
        if (toDoObject.isExpanded === false) {
            toDoObject.isExpanded = true;
            detailsExpanded.classList.add('expanded');
            expandButton.setAttribute('src', './images/expand-less.svg')
        }
        else {
            toDoObject.isExpanded = false;
            detailsExpanded.classList.remove('expanded');
            expandButton.setAttribute('src', './images/expand.svg')
        }
    });

    // EDIT BUTTON


    // Delete Button
    deleteButton.addEventListener('click', () => {
        const toDoToRemove = allToDos.map(e => e.code).indexOf(toDoObject.code);
        allToDos.splice(toDoToRemove, 1);
        const jsonArr = JSON.stringify(allToDos);
        localStorage.setItem("todos", jsonArr);
        populateToDos();
    })

}

function populateToDos () {
    mainPageDisplay.innerHTML = '';
    allToDos.forEach(toDo => {
        if (toDo.priority === 'high') createToDoCard(toDo);
    });
    allToDos.forEach(toDo => {
        if (toDo.priority === 'medium') createToDoCard(toDo);
    });
    allToDos.forEach(toDo => {
        if (toDo.priority === 'low') createToDoCard(toDo);
    });
}

populateToDos();



// Form show up

const newTask = document.getElementById('add-new-task');
newTask.addEventListener('click', () => {
    document.getElementById("to-do-form").style.display = "block";
});


const newToDoForm = document.getElementById("to-do-form");

newToDoForm.onsubmit = function(event) {
    event.preventDefault();
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const priority = document.getElementById('priority');
    const project = document.getElementById('project');
    const dueDate = document.getElementById('due-date');

    const newToDo = toDoFactory(title.value, description.value, priority.value, project.value, dueDate.value);
    allToDos.push(newToDo);

    // PUSH TO LOCAL STORAGE EVERY TIME
    const jsonArr = JSON.stringify(allToDos);
    localStorage.setItem("todos", jsonArr);

    // RESET THE FORM
    title.value = ''
    description.value = ''
    priority.value = 'high'
    project.value = 'unassigned'
    dueDate.value = ''

    // Remove form from view
    document.getElementById("to-do-form").style.display = "none";

    // Populate page
    populateToDos();


}

