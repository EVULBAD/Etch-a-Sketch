//declarations
const square = document.createElement("square")
    grid = document.querySelector("#grid");

//adding classes and style
square.classList.add("square");
grid.setAttribute("style", "display: grid; grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr);")

//appending the divs
for (i = 0; i < (16 * 16); i++) {
    grid.appendChild(square.cloneNode(true));
}
for (i = 0; i < 16; i++) {
    grid.children[i].classList.add("first-row");
}
for (i = 0; i < (16 * 16); i += 16) {
    grid.children[i].classList.add("first-col");
}