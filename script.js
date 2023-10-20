// function to fetch and display the date and day
// this is my API CALL
function fetchDateAndDay() {
	// this line defines the function for recieving time
	$.ajax({
		// this line uses AJAX from jQuery.
		url: "http://worldtimeapi.org/api/ip/", // specifies the URL that the AJAX request will be sent
		method: "GET", // tells the AJAX what kind of request to recieve back
		dataType: "json", // we need the format for the request to be in JSON format
		success: function (data) {
			const currentDateTime = new Date(data.utc_datetime);
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			const formattedDate = currentDateTime.toLocaleDateString(
				undefined,
				options
			);
			document.getElementById("date-and-day").textContent = formattedDate;
		},
		error: function (err) {
			console.error("Error Fetching data: " + err);
		},
	});
}
fetchDateAndDay();

// The following are variables I need to declare to get my Timer working

// These two lines get references to the HTML elements with specific IDs.
const oneHourTimerElement = document.getElementById("1hourTimer");
const twoHourTimerElement = document.getElementById("2hourTimer");

// This variable helps keep track of whether the timer is running or not.
let timerIsRunning = false;

// This variable will be used to store the interval of our timer.
let timerInterval;

// This part adds click event listeners to the buttons for 1-hour and 2-hour timers.
oneHourTimerElement.addEventListener("click", function () {
	// When the 1-hour timer button is clicked, this function is called.
	timerStart(1); // It starts a timer for 1 hour.
});

twoHourTimerElement.addEventListener("click", function () {
	// When the 2-hour timer button is clicked, this function is called.
	timerStart(2); // It starts a timer for 2 hours.
});

// This is the main function that starts the timer.
function timerStart(duration) {
	// If the timer is already running, ask the user if they want to reset it.
	if (timerIsRunning) {
		const confirmReset = confirm("Are you sure you want to reset the timer?");
		if (confirmReset) {
			// If they confirm, we clear the current timer and reset everything.
			clearInterval(timerInterval);
			timerIsRunning = false;
			const timerDisplay = document.getElementById("timeRemaining");
			timerDisplay.textContent = "Timer Reset";
		} else {
			// If they don't confirm, we do nothing and return.
			return;
		}
	}

	// Now, we set the timer as running and get the display element.
	timerIsRunning = true;
	const timerDisplay = document.getElementById("timeRemaining");

	let timer = duration * 3600; // We calculate the total time in seconds.

	updateDisplay(); // We call this function to show the initial time.

	// We use setInterval to update the timer every second.
	timerInterval = setInterval(function () {
		if (timer <= 0) {
			// If the timer reaches 0, we clear it and show "Timer Complete."
			clearInterval(timerInterval);
			timerDisplay.textContent = "Timer Complete";
			timerIsRunning = false;
		} else {
			updateDisplay(); // We call this to update the time on the display.
			timer--;
		}

		if (timer === 0) {
			// When the timer reaches 0, we show an alert message.
			alert("Get up and stretch amigo");
		}
	}, 1000);

	// This function updates the time displayed.
	function updateDisplay() {
		const hours = Math.floor(timer / 3600); // Calculate hours.
		const minutes = Math.floor((timer % 3600) / 60); // Calculate minutes.
		const seconds = timer % 60; // Calculate seconds.

		// Update the display with the time remaining.
		timerDisplay.textContent = `Time Remaining: ${hours}h ${minutes}m ${seconds}s`;
	}
}

function updateDisplay() {
	// Calculate the hours left. Since there are 3600 seconds in an hour, we divide by 3600.
	const hours = Math.floor(timer / 3600);

	// To Calculate the remaining minutes We use the modulo operator (%) to find the remaining seconds
	// after we have calculated hours. Then we divide by 60 to convert those remaining seconds into minutes.
	const minutes = Math.floor((timer % 3600) / 60);

	// To Calculate the remaining seconds  We use the modulo operator (%) again to find the remaining seconds
	// after we have calculated hours and minutes.
	const seconds = timer % 60;

	// Update the display with the time remaining. We use template literals to create a formatted string
	// that shows the hours, minutes, and seconds.
	timerDisplay.textContent = `Time Remaining: ${hours}h ${minutes}m ${seconds}s`;
}

// Get a reference to the "Reset" button by its ID.
const resetButton = document.getElementById("timeReset");

// Add a click event listener to the "Reset" button.
resetButton.addEventListener("click", function () {
	// Ask the user for confirmation using the `confirm` function.
	const userConfirmed = confirm("Are you sure you want to reset the timer?");

	// Check if the user confirmed.
	if (userConfirmed) {
		// Call the resetTimer function to reset the timer.
		resetTimer();
	}
});

// Function to reset the timer (similar to the previous code).
function resetTimer() {
	clearInterval(timerInterval);
	timerIsRunning = false;
	const timerDisplay = document.getElementById("timeRemaining");
	timerDisplay.textContent = "Timer Reset";
}

// the following are variables and functions that focus on my To Do List:

// Initialize the task count to 4.
let taskCount = 4;

// Get the HTML element that displays the task count.
let taskCountElement = document.getElementById("totalTaskCountNumerical");

// This function updates the task count displayed in the HTML.
function updateTaskCount() {
	// Get the input element where new tasks are added.
	let taskElement = document.querySelector(".newTask");

	// Check if the task count is non-negative (0 or greater).
	if (taskCount >= 0) {
		// Update the task count element in the HTML to show the current task count.
		taskCountElement.textContent = taskCount;
	}

	// Check if the task count is less than 5 (meaning it's not maxed out).
	if (taskCount < 5) {
		// Update the input element's placeholder text to encourage adding new tasks.
		taskElement.placeholder = "New Task";
	}
}

// This function increases the task count by 1.
function taskCountIncrease() {
	// Increment the task count.
	taskCount++;

	// Update the displayed task count.
	updateTaskCount();
}

// This function decreases the task count by 1.
function taskCountDecrease() {
	// Decrement the task count.
	taskCount--;

	// Update the displayed task count.
	updateTaskCount();
}

// This function resets the task count to 0.
function taskCountReset() {
	// Set the task count to 0.
	taskCount = 0;

	// Update the displayed task count.
	updateTaskCount();
}

// the following variables help me define elements in my HTML so that I can create a task , delete a task and remove all of them
// Selects the container for the task list and other necessary elements.
const taskList = document.getElementsByClassName("tasks")[0];
const createBtnElement = document.getElementsByClassName("createBtn")[0];
const newTaskElement = document.getElementsByClassName("newTask")[0];
let newTaskName = newTaskElement.value; // Store the task name input value (currently empty).
let taskCounter = 0; // Initialize a counter for the number of tasks.
newTaskElement.value = ""; // Clear the task name input field.

// this adds click event listener to the create button.
createBtnElement.addEventListener("click", function () {
	// this gets the new task name from the input field.
	const newTaskName = newTaskElement.value;
	createTask(newTaskName); // Call the createTask function with the new task name.
	console.log(newTaskName); // Log the new task name to the console.
});

// Function to create a new task.
// Function to create a new task.
function createTask(newTaskName) {
	// Get the current task count from a global variable (taskCount).
	let count = taskCount;

	// Check if the input field is empty. If so, show a placeholder message.
	if (newTaskElement.value === "") {
		newTaskElement.placeholder = "Please Enter Valid Task";
	} else {
		// If the input field is not empty, reset the placeholder message.
		newTaskElement.placeholder = "New Task Name";

		// Check if the task count is less than 5 (limit). You can create a maximum of 5 tasks.
		if (count < 5) {
			// Create a new HTML structure for a task.

			// Create a <div> element to hold the task.
			const taskDiv = document.createElement("div");
			taskDiv.className = "task"; // Set its class attribute for styling.

			// Create an <input> element for a checkbox.
			const checkboxInput = document.createElement("input");
			checkboxInput.type = "checkbox"; // Set the input type to checkbox.
			checkboxInput.id = "task" + (taskCounter + 1); // Assign a unique ID to the checkbox.

			// Create a <label> element for the checkbox.
			const label = document.createElement("label");
			label.htmlFor = "task" + (taskCounter + 1); // Connect the label to the checkbox.

			// Create a <span> element for custom styling (e.g., checkbox appearance).
			const customCheckboxSpan = document.createElement("span");
			customCheckboxSpan.className = "custom-checkbox"; // Set a class for styling.

			// Create a <p> element to display the task name.
			const paragraph = document.createElement("p");
			paragraph.textContent = newTaskName; // Set the task name as its content.

			// Assemble the HTML structure for the task by appending child elements to each other.
			taskDiv.appendChild(checkboxInput); // Attach the checkbox input to the task <div>.
			label.appendChild(customCheckboxSpan); // Attach the custom styling to the label.
			label.appendChild(paragraph); // Attach the task name to the label.
			taskDiv.appendChild(label); // Attach the label (with its children) to the task <div>.

			// Add the newly created task (taskDiv) to the task list container.
			taskList.append(taskDiv); // Use the append method to add the taskDiv to the taskList.

			// Clear the input field (newTaskElement) for the next task entry.
			newTaskElement.value = "";

			// Increment the task counter to keep track of the number of tasks.
			taskCounter++;

			// Call a function to update the displayed task count in the HTML.
			taskCountIncrease();
		} else {
			// If the task limit (5) is reached, show a message in the input field placeholder.
			newTaskElement.placeholder = "*Task Limit Reached*";
		}
	}
}

// Identify the Remove Task Button element by its ID.
let taskDeleteBtnElement = document.getElementById("removeTaskBtn");

// Add a click event listener to the Remove Task Button.
taskDeleteBtnElement.addEventListener("click", function () {
	// Call the deleteTask function when the button is clicked.
	deleteTask();
});

// Function to delete selected tasks.
function deleteTask() {
	// Select all task elements (to-do items) on the page.
	let taskDiv = document.querySelectorAll(".task");
	// Get the input element for creating new tasks.
	let taskElement = document.getElementsByClassName("newTask");

	// Loop through each task element on the page.
	for (let task = 0; task < taskDiv.length; task++) {
		// Find the checkbox input element within the current task.
		const checkbox = taskDiv[task].querySelector('input[type="checkbox"]');

		// Check if the checkbox is checked (task is selected for deletion).
		if (checkbox.checked) {
			// If the checkbox is checked, remove the entire task element from the page.
			taskDiv[task].remove();
			// Decrease the task count to keep track of the remaining tasks.
			taskCountDecrease();
		}
	}
}

// Identify the "Clear All Tasks" Button element by its ID.
let alltaskDeleteBtnElement = document.getElementById("clearAllTasks");

// Add a click event listener to the "Clear All Tasks" Button.
alltaskDeleteBtnElement.addEventListener("click", function () {
	// Call the deleteAllTasks function when the button is clicked.
	deleteAllTasks();
});

// Function to delete all tasks.
function deleteAllTasks() {
	// Identify the "tasks" container element that holds all the tasks.
	let taskList = document.getElementsByClassName("tasks")[0];
	// Select all task elements (to-do items) within the "tasks" container.
	let taskDivs = taskList.querySelectorAll(".task");

	// Loop through each task element within the "tasks" container.
	taskDivs.forEach(function (taskDiv) {
		// Remove the current task element from the page.
		taskDiv.remove();
	});

	// Reset the task count to zero.
	taskCountReset();
}

// The next line gets an element from the HTML document with the ID "randomQuote."
quoteElement = document.getElementById("randomQuote");

// We are now saving the text inside the 'quoteElement' into a variable called 'quoteText.'
let quoteText = quoteElement.innerText;

// Here starts the definition of a function named 'quoteRandomizer.'
function quoteRandomizer() {
	// Here, we declare a variable 'randomnumber' to store a random number.
	let randomnumber;

	// We generate a random number using the Math.random() function and make it a whole number (integer) with Math.floor.
	randomnumber = Math.floor(Math.random() * 40);

	// Now, we're trying to get a random quote from an array called 'movieQuotes' using the 'randomnumber' as an index.
	letRandomQuote = movieQuotes[randomnumber];

	// We set the text of the 'quoteElement' to be the random quote we just selected.
	quoteElement.innerText = letRandomQuote;
}

quoteRandomizer();

//these are the sources for each embedded youtube video

let youtubeList = [
	"https://www.youtube.com/embed/DAMnBZUyNbs?si=DQOoeeYfFAZelZwq",
	"https://www.youtube.com/embed/sghXbM0933A?si=o6pUhKN9GFpv-IEC",
	"https://www.youtube.com/embed/bHUvykXL8Og?si=ohV_PDDllUbnX63R",
	"https://www.youtube.com/embed/J8IEzB-Xyzg?si=dGyzbG5g0rn4zNoP",
	"https://www.youtube.com/embed/PP8DyP9fxOM?si=x6zFfDunQ0Ifa6dH",
	"https://www.youtube.com/embed/MKHmwmEGFqI?si=BKbd1tFO92UhRd9X",
];

function videoChange(element) {
	let currentMediaElement = document.querySelector(".playlist");
	currentMediaElement.src = youtubeList[element.value];
}
