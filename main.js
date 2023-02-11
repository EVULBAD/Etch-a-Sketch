//declarations
const square = document.createElement("div"),
    grid = document.querySelector("#grid");
let gridSize = 16,
    rainbow = false;

//function the generates random RGBcode.
function randomRGB() {
    let newRGB = "";
    for (i = 1; i < 4; i++) {
        let rgbGen = Math.floor(Math.random() * 255);
        if (i < 2) {
            newRGB += rgbGen;
        } else if (i == 2) {
            newRGB += ", " + rgbGen;
        } else {
            newRGB += ", " + rgbGen;
        }
    }
    return newRGB;
}

console.log(randomRGB());

//function that creates grid.
function gridSetup() {
    //adjusting grid size
    square.classList.add("square");
    grid.setAttribute("style", "display: grid; grid-template-columns: repeat(" + gridSize + ", 1fr); grid-template-rows: repeat(" + gridSize + ", 1fr);")

    //appending the divs containing each square
    for (i = 0; i < (gridSize * gridSize); i++) {
        grid.appendChild(square.cloneNode(true));
    }

    //adjusting borders
    grid.children[0].classList.add("no-left-border");
    for (i = 0; i < (gridSize * gridSize); i++) {
        if (i < gridSize) {
            grid.children[i].classList.add("no-top-border");
        } else if (i == gridSize || i % gridSize == 0) {
            grid.children[i].classList.add("no-left-border");
        }
    }

    //adding color to squares
    let squareClick = document.querySelectorAll(".square");

    for (i = 0; i < squareClick.length; i++) {
        let sqr = squareClick[i];
        sqr.addEventListener("mouseover", function color() {
            if (rainbow == false) {
                sqr.setAttribute("style", "background: black");
            } else {
                let randomColor = "background: rgb(" + randomRGB() + ")";
                sqr.setAttribute("style", randomColor);
            }  
        });
    }
}

//open default 16x16 grid on page load
window.onload = gridSetup();

//buttons
//  "size" button; resizes the grid according to user prompt
document.querySelector(".size").addEventListener("click", function size() {
    gridSize = prompt("Grid size:");
    if (gridSize > 64) {
        gridSize = 64;
    } else if (gridSize == 0 || gridSize == null) {
        gridSize = 16;
    }
    grid.innerHTML = "";
    gridSetup();
});

//  "rainbow" button; makes squares get colored with random color instead of black
document.querySelector(".rainbow").addEventListener("click",function clear(){
    if (rainbow == false) {
        rainbow = true;
    } else if (rainbow == true) {
        rainbow = false;
    }
});

//  "clear" button; clears the grid
document.querySelector(".clear").addEventListener("click",function clear(){
    let squareClick = document.querySelectorAll(".square");
    for (i = 0; i < (gridSize * gridSize); i++) {
        let sqr = squareClick[i];
        sqr.removeAttribute("style");
    }
});