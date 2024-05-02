#!/usr/bin/env node
import inquirer from 'inquirer';

interface Todo {
    task: string;
    completed: boolean;
}

let todos: Todo[] = [
    
];

function addTodo() {
    inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter a new task:'
    }).then((answers) => {
        const newTodo: Todo = {
            task: answers.task,
            completed: false
        };
        todos.push(newTodo);
        console.log('Task added successfully.');
        showMenu();
    });
}

function showTodos() {
    console.log('--- TODO List ---');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. [${todo.completed ? 'x' : ' '}] ${todo.task}`);
    });
    showMenu();
}

function markComplete() {
    inquirer.prompt({
        type: 'input',
        name: 'index',
        message: 'Enter the index of the task you want to mark as completed:'
    }).then((answers) => {
        const index = parseInt(answers.index) - 1;
        if (index >= 0 && index < todos.length) {
            todos[index].completed = true;
            console.log('Task marked as completed.');
        } else {
            console.log('Invalid index.');
        }
        showMenu();
    });
}

function showMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: ['Add Task', 'Show Tasks', 'Mark Task as Completed', 'Exit']
    }).then((answers) => {
        switch (answers.option) {
            case 'Add Task':
                addTodo();
                break;
            case 'Show Tasks':
                showTodos();
                break;
            case 'Mark Task as Completed':
                markComplete();
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
}

console.log('Welcome to the Todo List App');
showMenu();