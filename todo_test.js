const fs = require('fs');
const readline = require("readline"); 

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
}); //this will allow us to get input from the user

let todoList = []; //empty array for tasks


// ask for user input
const ask = function(input = '') {
	rl.question(`${input}${mainMenu()}`, command => {
		const markCompleted = /^c(\d+)$/g.exec(command);  // executes a search for a match in user's input that fits a pattern of c and a number, / looks for a literal match
		const deleteTask = /^d(\d+)$/g.exec(command); // executes a search for a match in user's input that fits a pattern of d and a number, , / looks for a literal match 
		
		if (markCompleted) {
			const taskNumber = parseInt(markCompleted[1]-1); //getting the number of the task to be marked completedd
			
			if (todoList[taskNumber]) {
				todoList[taskNumber].completed = true; // Mark a task item completedd
				console.log(`\n${todoList[taskNumber].title} is completed`);
			}
			ask();
		} 
		else if (deleteTask) {
			const taskNumber = parseInt(deleteTask[1])-1; // extacting the todo list item taskNumber
			if (todoList[taskNumber]) {
				const deletedItems = todoList.splice(taskNumber, 1); // Delete a todo item
				console.log(`\n${deletedItems[0].title} has been deleted\n`);
			}
			ask();
		} 
		else if (command.toLowerCase()==='q'){
			rl.close();
		



		} 
		else if (command.toLowerCase()==='v'){
			if (todoList.length===0) {console.log(
				`To-do list is empty
>`
			)
		ask()}
			else
			ask(todoList.map((task, taskNumber) => `${taskNumber+1} [${task.completed ? '\u2713' : ' '}] ${task.title}`).join('\n') + '\n');

		} 
		else {
		if(command.toLowerCase()==='n'){
			rl.question(`Please enter a new task
>`, taskName => {
	todoList.push({
					completed: false,
					title: taskName
					});
			ask();
		});
		}
		else {ask()};
		}
	});
};
// Main menu
const mainMenu = function() {
	return `(v) View • ( n ) New • (cX) completed • (dX) Delete • (q) Quit
	
>`;
};

const startup = function() {
	console.log( `
Welcome to Todo CLI!
--------------------
`);
	ask();
};
var path = process.argv.slice(2); //we are checking if a filename has been passed as an argument, so that we can populate our to-do list with tasks from the file using JSON.parse() 
if (path[0]===undefined){
startup()} 
else {
	fs.readFile(path[0], 'utf8', (err,data)=>{
		if (err) {
		console.log('err', err)
		return
	} else{
		todoList=JSON.parse(data); //data from the .json file is being assigned as contents of our todoList array
	startup()}
	})}

//the following code is experimental
// below is the working code
// rl.on('close', function() {
// 	if (path[0]===undefined){
// 		fs.writeFile('./my_todo_list.json', JSON.stringify(todoList), err=>{
// 		if (err){
// 			console.log('error writing file', err)}
// 		}
// 		)
// 		console.log("\nCiao-Ciao 😀")
// 		process.exit(0)	
// 	} else { 
// 	fs.writeFile(path[0], JSON.stringify(todoList), err=>{
// 	if (err) {
// 	console.log('Error writing file', err)}
// 	else {console.log("\nCiao-Ciao 😀")
// 	process.exit(0)};
// 	}
// 	)}
// 	}
// 	) 



rl.on('close', function() {
	
	fs.writeFile(path[0], JSON.stringify(todoList), err=>{
	if (err) {
	console.log('Error writing file', err)}
	else {console.log("\nCiao-Ciao 😀")
	process.exit(0)};
	})}) 

