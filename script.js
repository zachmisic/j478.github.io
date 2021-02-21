main_row = document.getElementById("main-row");
/**
 * initialize game object
 */
window.onload = function() {
	display.init();
	// TODO: initialize game object.
};

/**
 * display the play grids of the game
 */
let display = {
	playGame: "",
	red_big_grid: document.getElementById("redBigGrid"),
	red_small_grid: document.getElementById("redSmallGrid"),
	blue_big_grid: document.getElementById("blueBigGrid"),
	blue_small_grid: document.getElementById("blueSmallGrid"),
	start_menu: document.getElementById("start-menu"),
	reset_btn: document.getElementById("reset"),
	start_btn: document.getElementById("start"),
	flip_ship_btn: document.getElementById("orientation"),
	ship_selectors: document.getElementsByClassName("ship-sel"),

	gameStart: true, // determines if the game has started or not
	mainMenu: "", // varaible that represents the canvas for the menu background

	/**
	* initalize grid
	*/
	init: function() {
		this.reset();
		this.setEventListeners();
		this.initGrid(this.blue_big_grid);
		this.initGrid(this.blue_small_grid);
		this.initGrid(this.red_big_grid);
		this.initGrid(this.red_small_grid);
	},

	/**
	*Sets event listeners for the elements existing when the page is loaded, e.i. not the grids.
	 */
	setEventListeners: function() {
		this.start_btn.addEventListener("click", () => {
			for(let i=0; i < this.ship_selectors.length; i++)
			{
				if(this.ship_selectors[i].classList.contains("selected"))
				{
					this.playGame.shipNum = i+1;
					this.playGame.init(i+1);
					// initalize player ship count here;
				}
			}
			if(this.playGame.shipNum != 0)
			{
				this.hideStartBtn();
				this.showResetBtn();
				this.hideStartMenu();
				this.showBlueBigGrid();
				this.showBlueSmallGrid();
				this.showFlipBtn();
			}
			else
			{
				console.log("please select a ship"); //display this in a text box in display
			}


		});

		this.reset_btn.addEventListener("click", () => {
			this.reset();
		});

		// Mouseover, mouseout, and selection for ship selection buttons.
		for(let i=0; i < this.ship_selectors.length; i++) {
			this.ship_selectors[i].addEventListener("mouseover", () => {
				this.ship_selectors[i].classList.add("hover")
			});
			this.ship_selectors[i].addEventListener("mouseout", () => {
				this.ship_selectors[i].classList.remove("hover")
			});
			this.ship_selectors[i].addEventListener("click", () => {
				// First deselect if any other box was selected.
				for(let j=0; j < this.ship_selectors.length; j++) {
					if(j !== i) {
						this.ship_selectors[j].classList.remove("selected");
					}
				}

				// Now select or deselect depending on state.
				if(this.ship_selectors[i].classList.contains("selected")) {
					this.ship_selectors[i].classList.remove("selected");
				} else {
					this.ship_selectors[i].classList.add("selected");
				}
			});
		}

		this.flip_ship_btn.addEventListener("click", () => { // allows the user to orient their ships on the board
			if(this.flip_ship_btn.innerText == "Turn Ship Horizontal")
			{
				this.playGame.shipOrient = 'H';
				this.flip_ship_btn.innerText = "Turn Ship Verticle";
			}
			else
			{
				this.playGame.shipOrient = 'V';
				this.flip_ship_btn.innerText = "Turn Ship Horizontal";
			}
		});
	},

	/**
	*Sets event listeners on a given box.
	*@param {type} grid_box_ref
	*/
	setBoxEventListeners: function(grid_box_ref) {
		grid_box_ref.addEventListener("mouseover", () => {
			grid_box_ref.classList.add("hover");
		});

		grid_box_ref.addEventListener("mouseout", () => {
			grid_box_ref.classList.remove("hover");
		});

		grid_box_ref.addEventListener("click", () => {
			if(this.playGame.shipsPlaced) // checks if all the ships are placed
			{
				this.hideFlipBtn();
				this.drawBoard(this.blue_small_grid,this.playGame.p1.ship);
				this.drawBoard(this.red_small_grid,this.playGame.p2.ship);
				this.playGame.midgame(this.parseID(grid_box_ref.id));
			}
			else
			{
				if(this.playGame.placeShip(this.parseID(grid_box_ref.id))) // calls the placeShip function with the clicked cell's id
					grid_box_ref.classList.add("has-ship"); // if it has a ship it is assigned the has-ship class
				else
					console.log("cannot place here");
			}
		});

		return grid_box_ref;
	},

	/**
	 * hide flip button
	 */
	hideFlipBtn: function() {
		this.flip_ship_btn.style.display = "none";
	},

	/**
	 * show flip botton
	 */
	showFlipBtn: function() {
		this.flip_ship_btn.style.display = "block";
	},

	/**
	 * hide rest button
	 */
	hideResetBtn: function() {
		this.reset_btn.style.display = "none";
	},

	/**
	 * show rest button
	 */
	showResetBtn: function() {
		this.reset_btn.style.display = "block";
	},

	/**
	 * hide start button
	 */
	hideStartBtn: function() {
		this.start_btn.style.display = "none";
	},

	/**
	 * show start button
	 */
	showStartBtn: function() {
		this.start_btn.style.display = "block";
	},

	/**
	 * hide start menu
	 */
	hideStartMenu: function() {
		this.start_menu.style.display = "none";
	},

	/**
	 * show start menu
	 */
	showStartMenu: function() {
		this.start_menu.style.display = "block";
	},

		/**
		 * hide red big grid
		 */
	hideRedBigGrid: function() {
		this.red_big_grid.style.display = "none";
	},

	/**
	 * show red big grid
	 */
	showRedBigGrid: function() {
		this.red_big_grid.style.display = "table";
	},

	/**
	 * show red small grid
	 */
	showRedSmallGrid: function() {
		this.red_small_grid.style.display = "table";
	},

	/**
	 * show red small grid
	 */
	hideRedSmallGrid: function () {
		this.red_small_grid.style.display = "none";
	},

	/**
	 * hide blue big grid
	 */
	hideBlueBigGrid: function() {
		this.blue_big_grid.style.display = "none";
	},

	/**
	 * show blue big grid
	 */
	showBlueBigGrid: function() {
		this.blue_big_grid.style.display = "table";
	},

	/**
	 * hide blue small grid
	 */
	hideBlueSmallGrid: function() {
		this.blue_small_grid.style.display = "none";
	},

	/**
	 * show blue small grid
	 */
	showBlueSmallGrid: function() {
		this.blue_small_grid.style.display = "table";
	},

	/**
	 * hide all
	 */
	hideAll: function() {
		this.hideStartMenu();
		this.hideBlueBigGrid();
		this.hideRedBigGrid();
		this.hideBlueSmallGrid();
		this.hideRedSmallGrid();
		this.hideStartBtn();
		this.hideResetBtn();
		this.hideFlipBtn();
	},

	/**
	 * reset
	 */
	reset: function() {
		this.hideAll();
		this.showStartMenu();
		this.showStartBtn();
	},

	/**
	 * Initializes a grid given a node of a table element. Only called once per table, unless you want to reset it.
	 * @param {type} table_ref
	 */
	initGrid: function(table_ref) {
		let headrow = document.createElement('tr');
		let box = document.createElement("th"); // adds an extra th element to offset the column labels
		box.classList.add("grid-box");
		box.classList.add("head");
		headrow.appendChild(box);
		for(let i=0; i < 10; i++) {
			box = document.createElement("th");
			box.classList.add("grid-box");
			box.classList.add("head");
			box.innerText = String.fromCharCode(65+i); // labels the columns
			headrow.appendChild(box);
		}
		table_ref.appendChild(headrow);

		for(let i=0; i < 10; i++) {
			let row = document.createElement('tr');
			row.classList.add("grid-row");
			let tempBox = document.createElement('td'); // creates an extra td element on the front of each row to hold the row label
			tempBox.classList.add("grid-box");
			tempBox.classList.add("head");
			tempBox.style.borderStyle = "none";
			tempBox.innerText = (i+1) + "";
			row.appendChild(tempBox);
			for(let j=0; j < 10; j++) {
				let box = document.createElement('td');
				box.classList.add("grid-box");
				box.id = "e" + "" + i + "" + j; // added an e to the begginning of the id because css doesnt allow ids beginning w/ numbers. ParseID will ignore
				box = this.setBoxEventListeners(box);

				row.appendChild(box);
			}
			table_ref.appendChild(row);
		}
	},

	 	/**
	 	 * parseID
		 * @param {number} num
	 	 * @return {number} num1+num2
		 */
	parseID: function(num) {
		console.log(num[1] + " " + num[2]);
		return [parseInt(num[1]),parseInt(num[2])];
	},

	/**
	 * function takes in the number of the largest ship in the fleet, and creates a block representation of it. This is purely visual and provides no functionality.
	 * @param {number} n - number of the largest ship
	 */
	drawShip: function(n) {
		let head = "";
		for(let i=0;i<n;i++)
		{
			head = document.createElement('div');
			head.style = "position: absolute; left: 100px; top: " + (100+(20*i)) + "px; width: 20px; height: 20px; border-style: solid;";
			document.querySelector('body').appendChild(head);
		}
	},

	/**
	 * draw board
	 * @param {display} table_ref
	 * @param {type} board
	 */
	drawBoard: function(table_ref,board)
	{ //expand on this
		for(let i=0;i<10;i++)
		{
			for(let j=0;j<10;j++)
			{
				if(board[i][j] == 'S')
					table_ref.querySelector("#e" + i + "" + j).classList.add("has-ship");
				if(board[i][j] == 'X')
					table_ref.querySelector("#e" + i + "" + j).classList.add("hit-ship");
				if(board[i][j] == 'o')
					table_ref.querySelector("#e" + i + "" + j).classList.add("miss");
			}
		}
	},
	
	clearBoard: function(table_ref,board)
	{
		for(let i=0;i<10;i++)
		{
			for(let j=0;j<10;j++)
			{
				if(board[i][j] == 'S')
					table_ref.querySelector("#e" + i + "" + j).classList.remove("has-ship");
				if(board[i][j] == 'X')
					table_ref.querySelector("#e" + i + "" + j).classList.remove("hit-ship");
				if(board[i][j] == 'o')
					table_ref.querySelector("#e" + i + "" + j).classList.remove("miss");
			}
		}
	}
};

// display.drawGrid();
// display.drawMainMenu();
// display.drawMiniMap();

/**
 * establish player class
 */
let player = function () {
	this.hm = [];
	this.ship = [];
	this.shipcount = 0;
	this.hitstowin = 0;
	this.hits = 0;

	/**
	 * take user input and react
	 * @param {number} col - columns
	 * @param {number} row - rows
	 * @param {boolen} - return if hit, false if not
	 */
	this.incoming = function (col, row)
	{	
		console.log(row);
		if (this.ship[row][col] == 'S') {
				this.ship[row][col] = 'X';
				return (true);
		}
		else {
			this.ship[row][col] = 'o';
			return (false);
		}
	};

	/**
	 * gameover
	 */
	this.gameover= function(){
		return (this.hits == this.hitstowin);
	};

	/**
	 * setup game grid and ship counts
	 */
	this.setup = function() {
		for (let i = 0; i < 10; i++) {
			this.hm[i] = [];
			this.ship[i] = [];
        }

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.ship[i][j] = '-';
				this.hm[i][j] = '-';
			}
		}

		for (let i = 1; i <= this.shipcount; i++) {
			this.hitstowin += i;
		}
	};

	/**
	 * fire
	 * @param {type} other
	 * @param {number} row -rows
	 * @param {number} col - columns
	 * @return {boolean} hit
	 */
	this.fire=function(other, row, col){
		let hit = false;

		if(other.incoming(col, row)) {

			this.hm[row][col] = 'X';
			hit = true;
			this.hits += 1;
		}
		else {
			console.log("here");
			this.hm[row][col] = 'o';
			hit = false;
		}

		return (hit);
	};

	/**
	 * setdown
	 * @param {number} length
	 * @param {number} col
	 * @param {number} row
	 * @param {type} vert
	 * @return {boolean} check if empty
	 */
	this.setdown=function(length, col, row, vert){
		let checkifempty = 0;
		if (length == 1) {

			if (this.ship[row][col] == '-') {
				this.ship[row][col] = 'S';
			}
			else
			{
				checkifempty = 1;
			}


		}
		else {

			if (vert == 'V') {
				for(let i = 0; i < length; i++) {
					if(typeof this.ship[row + i] !== 'undefined')
					{
						if(this.ship[row + i][col] != '-') {
							checkifempty = 1;

						}
					}
					else
					{
						console.log("ship out of bounds");
						checkifempty = 1;
					}

				}
				if(checkifempty == 0) {
					for(let i = 0; i < length; i++) {
						this.ship[row + i][col] = 'S';
					}
				}

			}
			else {
				for (let i = 0; i < length; i++) {
					if(typeof this.ship[row][col + i] !== 'undefined')
					{
						if (this.ship[row][col + i] != '-') {
							checkifempty += 1;

						}
					}
					else
					{
						console.log("ship out of bounds");
						checkifempty = 1;
					}
				}
				if(checkifempty == 0) {
					for (let i = 0; i < length; i++) {
						{
							this.ship[row][col + i] = 'S';
						}
					}
				}
			}
		}
		return checkifempty;
	};
}

/**
 * play class that drives the game
 * @param {player} plr1 -player 1 object
 * @param {player} plr2 - player 2 object
 * @param {display} disp -display class
 */
let play = function(plr1,plr2,disp) {
	this.p1 = plr1;
	this.p2 = plr2;
	this.init = (n) => { this.p1.shipcount = n; this.p1.setup(); this.p2.shipcount = n; this.p2.setup(); };
	this.display = disp;
	this.shipsPlaced = false;
	this.playerTurn = true;
	this.shipNum = 0;
	this.shipOrient = 'V';

	/**
	 * place ship is called when a grid-box is clicked and shipsPlaced is equal to false
	 * @param {number} id
	 * @return {boolean} if placed return true, else turn false
		*/
	this.placeShip = function(id) {
		let placed = false;
		let row = id[0];
		let col = id[1];
		if(this.p1.shipcount != 0 || this.p2.shipcount != 0)
		{
			if(this.p1.shipcount != 0)
			{
				console.log(row + " " + col);
				if(this.p1.setdown(this.p1.shipcount,col,row,this.shipOrient) == 0)
				{
					console.log("ship placed p1");
					placed = true;
					this.p1.shipcount--;
				}
				if(this.p1.shipcount == 0)// catches the last ship placement and switches boards
				{
					this.display.hideBlueBigGrid();
					this.display.showRedBigGrid();
				}
			}
			else
			{
				if(this.p2.setdown(this.p2.shipcount,col,row,this.shipOrient) == 0)
				{
					console.log("ship placed p2");
					placed = true;
					this.p2.shipcount--;
				}
			}
		}
		else
		{
			this.shipsPlaced = true;
			this.p1.shipcount = this.shipNum;
			this.p2.shipcount = this.shipNum;
			this.display.hideFlipBtn();
			this.display.hideRedBigGrid();
			this.display.showBlueBigGrid();
			this.display.drawBoard(this.display.blue_small_grid,this.p1.ship);
			this.display.clearBoard(this.display.blue_big_grid,this.p1.ship);
			this.display.drawBoard(this.display.red_small_grid,this.p2.ship);
			this.display.clearBoard(this.display.red_big_grid,this.p2.ship);
		}
		return placed;
	}

	/**
	 * start of game
	 */
	this.gamestart=function(){
		player ();
		alert("Let the battle commence"); // show on some display element
		this.midgame();
	};

	/**
   * middle of the game
   */
	this.midgame=function(id){
		let row = id[0];
		let col = id[1];
		if(!(this.p1.gameover()) && !(this.p2.gameover()))
		{
			if(this.p1.fire(this.p2, row, col))
			{
				this.display.blue_big_grid.querySelector("#e" + row + "" + col).classList.add("hit-ship");
			}
			else
			{
				this.display.blue_big_grid.querySelector("#e" + row + "" + col).classList.add("miss");
			}
			if(this.p1.gameover() == false){
				if(this.p2.fire(this.p1, row, col))
				{
					display.red_big_grid.querySelector("#e" + row + "" + col).classList.add("hit-ship");
				}
				else
				{
					this.display.red_big_grid.querySelector("#e" + row + "" + col).classList.add("miss");
				}
			}
			if (this.p2.gameover() == true)
			{
					return p2.gameover()==true;
			}
		}
		else
			this.endgame();
	};

	/**
	 * end of game
	 */
	this.endgame=function(){
		alert("GAME OVER");
		if (this.p1.gameover() == true){
			alert("Player 1 WINS!!!!!!!!");
		}else{
			alert("Player 2 WINS!!!!!!!!");
		}
	}
}

let player1 = new player;
let player2 = new player;
display.playGame = new play(player1,player2,display);

// in the grid cell's onClick eventListeners
/* if(!play.gameStart) {
	if(play.turn)
	{
		displa
		play.placeShip

*/
