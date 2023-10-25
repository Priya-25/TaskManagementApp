let tasks = [];

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskTitle.trim() !== '') {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            dueDate: dueDate,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();
        clearInputFields();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    taskList.innerHTML = '';

    tasks.forEach(task => {
        if ((categoryFilter === 'All' || task.category === categoryFilter) &&
            (statusFilter === 'All' || (statusFilter === 'Completed' && task.completed) || (statusFilter === 'Uncompleted' && !task.completed))) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <span>Category: ${task.category}</span>
                    <span>Due Date: ${task.dueDate}</span>
                </div>
                <div>
                    <button onclick="deleteTask('${task.title}')">Delete</button>
                    <button onclick="completeTask('${task.title}')">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        }
    });
}

function deleteTask(title) {
    tasks = tasks.filter(task => task.title !== title);
    renderTasks();
}

function completeTask(title) {
    const task = tasks.find(task => task.title === title);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function filterTasks() {
    renderTasks();
}

function clearInputFields() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('dueDate').value = '';
}
