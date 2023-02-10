//declarations
const square = document.createElement("div"),
    grid = document.querySelector("#grid");
let gridSize = 16;

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
}

//open default 16x16 grid on page load
window.onload = gridSetup();

//adding color to squares
let squareClick = document.querySelectorAll(".square");

for (i = 0; i < squareClick.length; i++) {
    let sqr = squareClick[i];
    sqr.addEventListener("mouseover", function color() {
        sqr.setAttribute("style", "background: black");
    });
}

//buttons
//  "size" button; resizes the grid according to user prompt
/*document.querySelector(".size").addEventListener("click", function size() {
    gridSize = prompt("Grid size:");
    if (gridSize > 64) {
        gridSize = 64;
    }
    grid.innerHTML = "";
    gridSetup();
});*/

//  "clear" button; clears the grid
document.querySelector(".clear").addEventListener("click",function clear(){
    for (i = 0; i < (gridSize * gridSize); i++) {
        let sqr = squareClick[i];
        sqr.removeAttribute("style");
    }
});