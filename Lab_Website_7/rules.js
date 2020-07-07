/*
[IMPORTANT] You are free to create any number of helper function.
We know the problem could be seached online, and we are aware of those solutions.
So please cite sources if you took help from any online resource.
*/

// ----------------------- Important global variables (nothing to do here) ---------------------------- //

// Ids for all of the table elements. You can grab any cell element by using document.getElementById("A1");
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]


/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board. E.g., if player 1 (who is X) clicks on cell 'A1', the board_state[0] will be set to 1.
If player 2 (who is O) clicks on cell 'A3', the board_state[2] will be set to 0; Any move made by player 1 is stored as a '1' and any move made by player 2 is stored as a '0'.
So, after the above two moves, board_state will look as follows [1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// A boolean to keep track of the status of the game; false means the game has not started. The default value is set to false.
var started = false

/*
A variable to keep track of each players' turn. Since the game always starts with player 1, the default value is set to '1'.
1 means player_1
0 means player_0
*/
var turn = 1

/*
Variable to track player fields
*/
var p1 = document.getElementById('player1_id')
var p2 = document.getElementById('player2_id')

/*
Variable to track move field
*/
var move = document.getElementById('move_text_id')

/*
A variable to keep track of the buttons present in the screen
*/
var button = document.querySelectorAll('button')

// ---------------------- Helper Functions (TODO: Implement each helper function as specified) --------------------- //

/*
 @Return boolean
 @Param _str - A string variable
 This method returns true if the '_str' is null or it has a length of 0, otherwise, it returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int
@Param - No param
This method returns the 'turn' variable:
turn = 1 is for player_1 and
turn = 0 is for player_2
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param  - No param
This methods toggles the 'turn' variable:
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param - No param
This method returns the value of the 'started' boolean variable:
true means the game has started
false means the game has not started
*/
function game_started(){
	return this.started
}

function GameStatus(){
	for (i = 0; i < 9; i++){
 		let a = board_state[winningConditions[i][0]]
    let b = board_state[winningConditions[i][1]]
    let c = board_state[winningConditions[i][2]]

    if (a != -1 && b != -1 && c != -1){
    	if (a == b && b == c){
        if(whose_move == 1){
        	alert("Player "+p1.value+" Wins! GG")
        }
        else{
        	alert("Player "+p2.value+" Wins! GG")
        }
    	}
  	}
    if(board_state.includes(-1) == false){
        alert("Tied Game! GG")
        reset_board()
    }
  }
}


// ---------------------- Game Rules (TODO: Implement each game function as specified) --------------------- //


/*
Rule 1
This method is called when the 'Begin Play' button is clicked.
The method should do the following:
1. Verify if the player names are empty or not. Raise an alert if they are empty. If the fields are empty do not start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
2. If all verification is successful, disable the name fields and update the player moves. Set the 'started' flag to true.
3. If the game has started, disable the 'Begin Play' button and enable the 'Play' button. Hint: document.getElementById("id").disabled = true;
*/
function begin_play(){
	if(isEmpty(document.getElementById('player1_id').value)||isEmpty(document.getElementById('player2_id').value)){
		alert("Please insert the names of both players to begin");
		return
	}
	else{
		p1.disabled = true
		p2.disabled = true
		this.started = true
	}

	if(game_started()){
    button[0].disabled = true
    button[2].disabled = false
    document.getElementById("turn_info").innerHTML = "Game on!"
	}
}

/*
Rule 2
This method is called when the 'Reset Play' button is clicked.
The method should do the following:
1. The 'Reset Play' button should reset the whole game. Clear the three text boxes, set the 'turn' variable to the default message, and set the 'started' flag to false.
2. Enable the name fields and the 'Begin Play' button.
3. Set the Tic Tac Toe grid to its default entries and disable the 'Play' button.
4. Clicking 'Reset Play' again and again has the same effect (or no effect when clicked multiple times).
*/
function reset_play(){
	this.started = false
  turn = 1
  document.getElementById("turn_info").innerHTML = "Game has not begun."
  p1.value = ''
  p1.disabled = false
  p2.value = ''
  p2.disabled = false
  move.value = ''

  button[0].disabled = false
  button[2].disabled = true

  board_state = [-1,-1,-1,-1,-1,-1]
  for( i = 0; i < 9; i++){
  	document.getElementById(table_ids[i]).innerHTML = table_ids[i]
  }

}

/*
Rule 3
This method is called every time a player makes a move (i.e., the 'Play' button is clicked).
The method should do the following:
1. The moves should be validated. There can only be ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]. If there is any other entry, raise an alert.
2. If the move is a valid move, the grid should be updated with the correct move. Player 1 is always 'X', and Player 2 is always 'O' (i.e., the capital letter 'O'). Update the 'turn' variable. Hint: use toggle_move()
3. If the move is on a cell that is already filled, raise an alert.
5. After any move, the state of the grid is validated. If there is a winner raise an alert (e.g., "Player 1 wins!!" or "X wins!")
6. When a player wins the game, the game is reset automatically.
7. If there are no more possible moves (and there is no winner), do nothing. The user must click the 'Reset Play' button.
*/
function play() {
	if(!table_ids.includes(move.value)){
  	alert("Move should be a letter {A, B, C} followed by a number {1, 2, 3} (e.g. A1)")
  }

  else{
    if(board_state[table_ids.indexOf(move.value)] != -1){alert("Select an unused field")}
    else{
    	if(whose_move()){
      board_state[table_ids.indexOf(move.value)] = 1
      document.getElementById(move.value).innerHTML = "X"
			move.value = ''
      }
      else{
      board_state[table_ids.indexOf(move.value)] = 0
      document.getElementById(move.value).innerHTML = "O"
			move.value = ''
      }

    	GameStatus()

    	toggle_move()
    }
  }
}

// ---------------------------------------------------------------------------------------------------------- //

/*
DO NOT MODIFY THIS METHOD
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}
}
