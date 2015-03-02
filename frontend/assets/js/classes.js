/***
 *
 * @constructor Cell
 *
 * top, ..., left - ссылки на соседние стены.
 */
function Cell() {

    this.contain = "";

    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;


}

//Cell.prototype.click = function () {
//
//    if (this.top) {
//        this.top.domElement.css("background-color", "red");
//    }
//    if (this.right) {
//        this.right.domElement.css("background-color", "red");
//    }
//    if (this.bottom) {
//        this.bottom.domElement.css("background-color", "red");
//    }
//    if (this.left) {
//        this.left.domElement.css("background-color", "red");
//    }
//};

/***
 *
 * @constructor Wall
 *
 */
function Wall() {
    this.domElement = null;

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

//Wall.prototype.click = function () {
//
//    if (this.firstCell) {
//        this.firstCell.domElement.css("background-color", "green");
//    }
//    if (this.secondCell) {
//        this.secondCell.domElement.css("background-color", "green");
//    }
//};

/***
 *
 * @constructor Crossover
 *
 * top, ..., left - ссылки на соседние стены/клетки
 */
function Crossover() {

    this.domElement = null;

    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;


}

Crossover.prototype.click = function () {


    if (this.domElement.hasClass("wall-fill")) {
        return
    }

    if (window.orientation) {
        if (this.top.domElement.hasClass("wall-fill") || this.bottom.domElement.hasClass("wall-fill")) {
            return;
        }
    } else {
        if (this.left.domElement.hasClass("wall-fill") || this.right.domElement.hasClass("wall-fill")) {
            return;
        }
    }

    this.domElement.toggleClass("wall-fill");

    if (window.orientation) {
        this.top.domElement.toggleClass("wall-fill");
        this.bottom.domElement.toggleClass("wall-fill");
    } else {
        this.left.domElement.toggleClass("wall-fill");
        this.right.domElement.toggleClass("wall-fill");
    }


};

function createObjects(elements, array, ourClasses) {

    $.each(elements, function (index, element) {
        var object = new ourClasses();
        object.domElement = $(element);
        object.domElement.click(function () {
            object.click.call(object);
        });
        array.push(object);

        console.log(array);

    });
}

function initApplication() {

    window.blabla = true;

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

        var delta = parseInt(index / 8);
        element.top = objectsVerticalWalls[index];
        element.bottom = objectsVerticalWalls[index + 8];

        element.left = objectsHorizontalWalls[index + delta];
        element.right = objectsHorizontalWalls[index + 1 + delta];

    });

    objectsCells.forEach(function (element, index) {

        var delta = parseInt(index / 9);

        try {
            element.top = objectsHorizontalWalls[index - 9]
        } finally {
        }

        if ((index + 1) % 9) {
            element.right = objectsVerticalWalls[index - delta];
        }

        try {
            element.bottom = objectsHorizontalWalls[index];
        } finally {
        }

        if (index % 9) {
            element.left = objectsVerticalWalls[index - 1 - delta];
        }

    });

    objectsVerticalWalls.forEach(function (element, index) {

        var delta = parseInt(index / 8);
        element.firstCell = objectsCells[index + delta];
        element.secondCell = objectsCells[index + 1 + delta];


    });

    objectsHorizontalWalls.forEach(function (element, index) {
        element.firstCell = objectsCells[index];
        element.secondCell = objectsCells[index + 9]

    });


}