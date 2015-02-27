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

    $.each(elements, function (index, element) {
        var object = new ourClasses();
        object.domElement = element;
        array.push(object);
    });
    console.log(array);

}

function initApplication() {

    var cells = $(".cell");
    var crossovers = $(".crossover");
    var allWalls = $(".wall");

    var objectsCells = [];
    var objectsCrossovers = [];

    var objectsVerticalWalls = [];
    var objectsHorizontalWalls = [];

    createObjects(cells, objectsCells, Cell);
    createObjects(crossovers, objectsCrossovers, Crossover);

    createObjects(allWalls.filter(":not(.horisont-wall)"), objectsVerticalWalls, Wall);
    createObjects(allWalls.filter(".horisont-wall"), objectsHorizontalWalls, Wall);


    objectsCrossovers.forEach(function (element, index) {
        var delta = parseInt((index - 1) / 7);
        element.top = objectsVerticalWalls[index];
        element.bottom = objectsVerticalWalls[index + 8];

        element.left = objectsHorizontalWalls[index + delta];
        element.right = objectsHorizontalWalls[index + 1 + delta];
    })


}