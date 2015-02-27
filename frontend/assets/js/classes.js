/***
 *
 * @constructor Cell
 *
 * top, ..., left - ссылки на соседние стены.
 */
function Cell() {

    this.contain = "";
    this.domElement = null;

    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;

}

/***
 *
 * @constructor Wall
 *
 */
function Wall() {
    this.domElement = null;
    this.empty = true;

    this.firstCell = null;
    this.secondCell = null;

    this.getNeighbor = function (me) {

        if (this.firstCell == me) {
            return this.secondCell;
        }

        if (this.secondCell == me) {
            return this.firstCell;
        }

        return null;
    }
}

/***
 *
 * @constructor Crossover
 *
 * top, ..., left - ссылки на соседние стены/клетки
 */
function Crossover() {

    this.domElement = null;
    this.empty = true;

    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;

}

function createObjects(elements, array, ourClasses) {

    elements.forEach(function (element, index) {
        var object = new ourClasses();
        object.domElement = element;
        array.append(object);
    });

}

function initApplication() {

    var cells = $(".cell");
    var crossovers = $(".crossover");
    var allWalls = $(".wall");

    var objectsCells = [];
    var objectsCrossovers = [];
    var objectsWalls = [];

    createObjects(cells, objectsCells, Cell);
    createObjects(crossovers, objectsCrossovers, Crossover);
    createObjects(allWalls, objectsWalls, Wall);


    objectsCrossovers.forEach(function (element, index) {
        element.top = objectsWalls[index];
        element.left = objectsWalls[index + 8];
        element.right = objectsWalls[index + 9];
        element.bottom = objectsWalls[index + 17];
    })


}