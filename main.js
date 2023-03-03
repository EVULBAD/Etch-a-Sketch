//declarations
const square = document.createElement("div"),
    grid = document.querySelector("#grid");
let gridSize = 16,
    rainbow = false,
    bordersOn = true,
    opacityLow = false;

//function that generates random RGBcode.
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

//function that colors squares.
function colorSquares() {
    let squareClick = document.querySelectorAll(".square");

    for (i = 0; i < squareClick.length; i++) {
        let sqr = squareClick[i],
            black = "background-color: rgba(1, 1, 1, 1)",
            currentRGB,
            higherAlpha;
        sqr.addEventListener("mouseover", function color() {
            currentRGB = sqr.getAttribute("style");
            if (rainbow == false) {
                if (opacityLow == false) {
                    sqr.setAttribute("style", black);
                } else if (opacityLow == true && currentRGB == null) {
                    sqr.setAttribute("style", "background-color: rgba(0, 0, 0, 0.1)");
                } else if (opacityLow == true && currentRGB != null) {
                    currentRGB = currentRGB.replace("background-color: rgba(","").replace(")","").replace(/ /g,"").split(",");
                    higherAlpha = parseFloat(currentRGB[3]) + 0.1;
                    currentRGB.pop();
                    currentRGB.push(higherAlpha);
                    currentRGB = "background-color: rgba(" + currentRGB.join(", ") + ")";
                    sqr.setAttribute("style", currentRGB);
                }
            } else if (rainbow == true && opacityLow == false) {
                let randomColor = "background-color: rgba(" + randomRGB() + ", 1)";
                sqr.setAttribute("style", randomColor);
            } else {

            }
        });
    }
}

//function that creates borders for grid.
function borders(){
    grid.children[0].classList.add("no-left-border");
    for (i = 0; i < (gridSize * gridSize); i++) {
        if (i < gridSize) {
            grid.children[i].classList.add("no-top-border");
        } else if (i == gridSize || i % gridSize == 0) {
            grid.children[i].classList.add("no-left-border");
        }
    }
    document.querySelector(".borders").innerHTML ="borders on";
} 

//function that removes borders for grid.
function removeBorders() {
    for (i = 0; i < (gridSize * gridSize); i++) {
        grid.children[i].classList.add("no-top-border");
        grid.children[i].classList.add("no-left-border");
    }
    document.querySelector(".borders").innerHTML ="borders off";
}

//function that creates grid.
function gridSetup() {
    //adjusting grid size.
    square.classList.add("square");
    grid.setAttribute("style", "display: grid; grid-template-columns: repeat(" + gridSize + ", 1fr); grid-template-rows: repeat(" + gridSize + ", 1fr);")

    //appending the divs containing each square.
    for (i = 0; i < (gridSize * gridSize); i++) {
        grid.appendChild(square.cloneNode(true));
    }

    //adding borders to grid according to if bordersOn is true or false.
    if (bordersOn == true) {
        borders();
    } else {
        removeBorders();
    }

    //adding color to squares.
    colorSquares();

}

//open default 16x16 grid on page load w/ borders on.
window.onload = gridSetup();

//buttons
//  "size" button; resizes the grid according to user prompt.
document.querySelector(".size").addEventListener("click", function size() {
    gridSize = prompt("grid size:");
    if (gridSize > 64) {
        gridSize = 64;
    } else if (gridSize == 0 || gridSize == null) {
        gridSize = 16;
    }
    grid.innerHTML = "";
    gridSetup();
});

//  "borders on/off" button; turns borders in grid off.
document.querySelector(".borders").addEventListener("click",function clear(){
    if (bordersOn == false) {
        for (i = 0; i < (gridSize * gridSize); i++) {
            grid.children[i].classList.remove("no-top-border");
            grid.children[i].classList.remove("no-left-border");
        }
        borders();
        bordersOn = true;
    } else {
        removeBorders();
        bordersOn = false;
    }
});

//  "opacity high/low" button; makes squares fill in with 10% opacity
document.querySelector(".opacity").addEventListener("click", function opacity(){
    if (opacityLow == false) {
        document.querySelector(".opacity").innerHTML ="opacity low";
        opacityLow = true;
    } else {
        document.querySelector(".opacity").innerHTML ="opacity high";
        opacityLow = false;
    }
});

//  "rainbow on/off" button; makes squares get colored with random color instead of black
document.querySelector(".rainbow").addEventListener("click",function clear(){
    if (rainbow == false) {
        document.querySelector(".rainbow").innerHTML ="<span>r</span><span>a</span><span>i</span><span>n</span><span>b</span><span>o</span><span>w</span> on";
        rainbow = true;
    } else {
        document.querySelector(".rainbow").innerHTML ="<span>r</span><span>a</span><span>i</span><span>n</span><span>b</span><span>o</span><span>w</span> off";
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