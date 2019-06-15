var difficulty = 6;
var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var msg = document.querySelector("#message");
var h1 = document.querySelector("h1");
var colorBtn = document.querySelector("#colorBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    reset();
    colorBtn.addEventListener("click", function() {
        reset();
    });
    //set up mode listener
    setupModeButtons();
    //set up squares
    setupSquares();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? difficulty = 3 : (this.textContent === "Normal" ? difficulty = 6 : difficulty = 9);
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor
                // compare color to pickedColor
            if (clickedColor === pickedColor) {
                msg.textContent = "Correct!";
                colorBtn.textContent = "Play Again";
                changeColor(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                // fade wrong color out
                this.style.backgroundColor = "#232323";
                msg.textContent = "Wrong!";
            }
        });
    }
}

function changeColor(color) {
    //loop through all squares change each color to match given color
    for (var i = 0; i < squares.length; i++) {
        //change each cother to match given color
        squares[i].style.backgroundColor = color;
    }
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    // add num random colors to array
    for (var i = 0; i < num; i++) {
        arr[i] = randomColor();
    }
    return arr;
    // return the array
}

function randomColor() {
    //pick three num from 0 to 255;
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

function pickColor() {
    var ran = Math.floor(Math.random() * colors.length);
    console.log("ran: " + ran);
    return colors[ran];
}

function reset() {
    //figure out how many squares to show
    //pick new colors
    //pick a new picked colors
    //update page to new colors
    colors = generateRandomColors(difficulty);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor.toUpperCase();
    colorBtn.textContent = "New COLORS";
    msg.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}