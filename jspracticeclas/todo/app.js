// Get references to the elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Function to add a task
function addTask() {
    const task = taskInput.value;

    // Check if the input is not empty
    if (task.trim() !== '') {
        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = task;

        // Create a delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');

        // Append the delete button to the list item
        li.appendChild(deleteBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Add an event listener to the delete button
        deleteBtn.addEventListener('click', function() {
            li.remove(); // Remove the task
        });
    } else {
        alert('Please enter a task.');
    }
}

// Event listener for the Add button
addBtn.addEventListener('click', addTask);

// Optionally, allow pressing Enter to add a task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
