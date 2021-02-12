let grid = document.querySelector("body").appendChild(document.createElement("table"));
let row = "";
let elem = "";
let start = true; // determines if the game has started or not
let mainMenu = "";
let head = "";

/*
	Takes: n => number of the largest ship
	Returns: NONE
	
	function takes in the number of the largest ship in the fleet, and creates a block representation of it. This is purely visual and provides no functionality.
*/
function buildShip(n) {
	for(let i=0;i<n;i++)
	{
    head = document.createElement('div');
    head.style = "position: absolute; left: 500px; top: " + (100+(20*i)) + "px; width: 20px; height: 20px; border-style: solid;";
    document.querySelector('body').appendChild(head);
	}
}

/*
	Takes: id(string) from selected unit
	Returns: the row and column of the id
	
 	function uses the string from the units id to parse the row # and column #
*/
function parseID(num) {
	return [num[0],num[1]];
}

/*	
	Function: init
	Takes: NONE
	Returns: a 10x10 table HTML element
	
	function uses the .appendChild method to add 10 rows and 10 units per row to the table.
	as the column elements are created, they are assigned a unique ID number "##" where the
	first # is the row number and the secnd # is the column number. an eventListener is also
	added to each column elements, that will detect 
*/
function init() {
	for(let i=0;i<10;i++)
	{
		row = grid.appendChild(document.createElement("tr"));
		for(let j=0;j<10;j++)
		{
			elem = document.createElement("td");
			elem.className = "grid-element";
			elem.id = "" + i + j;
			elem.addEventListener("click", (() => {	
			if(start) {
				document.getElementById("check").innerText = i + " " + j;
				document.getElementById(i + "" + j).style = "background-color: red;"; /*hitCheck*/
				console.log(i + "" + j);
				} 
				else { 
				/* place player current ship */
				}
			}));
			row.appendChild(elem);
		}
	}
}

/*
	Function: reset event listener
	Takes: NONE
	Returns: NONE
	
	the EventListener on the button id="reset" waits for a click on the button, and then runs a handler
	function that resets the inner contents of the <table></table> to and empty string(""). It then calls
	the init() function to repopulate the grid
*/
document.querySelector("#reset").addEventListener("click", () => {
	grid.innerHTML = "";
	init();
	initMenu();
});

/*
	Takes: None
	Returns: None

	function initializes the menu screen. It creates a new menu elements and appends them onto the body/background.
	It also assignes them specific IDs so they will get styled by the css in index.html. After creation,
	the elements are formatted in case of a griz size change.
	
	Creates Elements: "main-menu", "title", "start-button"
*/
function initMenu() {
	let title = "";
	let startBtn = "";
	// main menu
	mainMenu = document.querySelector('body').appendChild(document.createElement('div'));
	mainMenu.id = "main-menu";
		// mainMenu formatting
	mainMenu.style.width = (grid.offsetWidth-2) + "";
	mainMenu.style.height = (grid.offsetHeight-2) + "";
	mainMenu.style.top = grid.offsetTop + "";
	mainMenu.style.left = grid.offsetLeft + "";
	// title text
	title = document.querySelector('#main-menu').appendChild(document.createElement('div'));
	title.id = "title";
	title.innerText = "BATTLESHIP";
		// title formatting
	title.style.top = ((mainMenu.offsetHeight / 2) - (title.offsetHeight)) + "";
	title.style.left = ((mainMenu.offsetWidth / 2) - (title.offsetWidth / 2)) + "";
	// start button
	startBtn = document.querySelector('#main-menu').appendChild(document.createElement('button'));
	startBtn.id = "start-button";
	startBtn.innerText = "Start!";
		//start button formatting
	startBtn.style.top = (title.offsetTop + 40) + "";
	startBtn.style.left = (title.offsetLeft + (title.offsetLeft/2)/2) + "";
	startBtn.addEventListener("click", () => { mainMenu.innerHTML = ""; selMenu();});
	
}

function selMenu() {
	let title = document.querySelector('#main-menu').appendChild(document.createElement('div'));
	let startBtn = "";
	title.id = "title";
	title.innerText = "Choose Number of Ships";
		// title formatting
	title.style.top = ((mainMenu.offsetHeight / 3) - (title.offsetHeight)) + "";
	title.style.left = ((mainMenu.offsetWidth / 2) - (title.offsetWidth / 2)) + "";
	// button formatting
	/* 
		you have to save the number i for each button so the event handler can select the specific id with the querySelector. 
		if you don't assign a unique id, the eventListner only works for the last element created.
	*/
	for(let i=0;i<6;i++)
	{
		startBtn = document.querySelector('#main-menu').appendChild(document.createElement('div'));
		startBtn.id = "btn" + i;
		startBtn.style = "position: absolute; left: " + ((i*(grid.offsetWidth/6)+9)) + "px; top: " + (grid.offsetHeight/2) + "px; z-index: 1; width: 50px; height: 50px; border-style: solid; font-size: 50; text-align: center;";
		startBtn.innerText = "" + (i+1);
		startBtn.addEventListener("mouseover", () => { document.querySelector(("#btn" + i)).style.backgroundColor = "red"; }); 
		startBtn.addEventListener("mouseout", () => { document.querySelector(("#btn" + i)).style.backgroundColor = ""; });
		startBtn.addEventListener("click", () => { document.querySelector(("#btn" + i)).style.backgroundColor = "green"; /* setNumShips(i); */ mainMenu.innerHTML = ""; mainMenu.remove() });
		mainMenu.appendChild(startBtn);
	}
}

init();
initMenu();