var todoApp = (function () {
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
	<input type="checkbox" id = "${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <div>
    <img src="edit.svg" class="edit" data-id="${task.id}" />
    <img src="trash.svg" class="delete" data-id="${task.id}" />
    </div>
	`;
        tasksList.append(li);
    }

    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.filter(function (task) {
            return task.id === taskId;
        });
        if (task.length > 0) {
            const currentTask = task[0];
            currentTask.done = !currentTask.done;
            renderList();
            showNotification('Task Toggled sucessfully');
            return;
        }
    }

    /*function editTask(taskId) {
        const edit = tasks.filter(function(task){
            return task.id !== taskId;
        });
        console.log(edit);
        tasks = edit;
        if(edit.length > 0){
            const recentTask = edit[0];
            console.log(recentTask.text);
            renderList();
            return;
        }
    }*/

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id !== taskId;
        });
        tasks = newTasks;
        renderList();
        showNotification('task deleted sucessfully');
    }

    function addTask(task) {
        if (task) {
            tasks.push(task);
            renderList();
            showNotification('task added sucessfully');
            return;
        }
        showNotification('task can not be added');
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            const text = e.target.value;
            console.log('text', text);
            if (!text) {
                showNotification("test task can not be empty");
                return;
            }
            const task = {
                text,
                id: Date.now().toString(),
                done: false,
            }
            e.target.value = '';
            addTask(task);
        }
    }
    function handleClickListener(e) {
        const target = e.target;
        console.log(target);

        if (target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        } else if (target.className === 'edit') {
            const taskId = target.dataset.id;
            editTask(taskId);
        }
    }

    function initializeApp() {
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);
    }
    // initializeApp();
    return {
		initialize: initializeApp,
	}
})();
todoApp.initialize();