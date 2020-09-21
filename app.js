// DEFINE UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
	e.preventDefault();
	if (taskInput.value === '') {
		return alert('Please Fill Task input');
	}
	console.log('Everything is right');

	let tasks = getTasks();
	createLi(taskInput.value);

	tasks.push(taskInput.value);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	taskInput.value = '';
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			const li = e.target.parentElement.parentElement;
			li.remove();
			console.log(li.textContent);
			// Remove task from LS
			removeTaskFromLocalStorage(li);
		}
	}
}

function clearTasks(e) {
	if (confirm('Are You Sure?')) {
		while (taskList.firstChild) {
			taskList.firstChild.remove();
			localStorage.removeItem('tasks');
		}
	}
}

function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

function getTasksFromLocalStorage(e) {
	// const tasks = localStorage.getItem('tasks');
	let tasks = getTasks();
	console.log(tasks);
	if (tasks.length > 0) {
		tasks.forEach(function (task) {
			createLi(task);
		});
	}
	console.log(taskList.childNodes.length);
	taskList;
}

function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	return tasks;
}

function createLi(text) {
	const li = document.createElement('li');
	li.className = 'collection-item';

	li.appendChild(document.createTextNode(text));

	const link = document.createElement('a');

	link.className = 'delete-item secondary-content';

	link.innerHTML = '<i class="far fa-trash-alt"></i>';
	li.appendChild(link);
	li.addEventListener('click', decorateTask);
	taskList.appendChild(li);
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function decorateTask(e) {
	console.log(e);
	const decoration = e.target.style.textDecoration;

	e.target.style.textDecoration = decoration ? '' : 'line-through';
}
