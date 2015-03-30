/***
 *
 * @constructor Player
 *
 */

function Player() {
    this.name = "";
    this.class = "";
    this.position = null;
    this.wall_count = 10;
    this.wall_array = null;

    this.wall_decrement = function () {
        this.wall_count--;
        this.wall_array.eq(this.wall_count).removeClass("wall-simul_fill");
    }
}


var firstPlayer = new Player();
var secondPlayer = new Player();
var currentPlayer = firstPlayer;
var objectsCells = [];

function changePlayer() {
    if (currentPlayer == firstPlayer) {
        currentPlayer = secondPlayer;
    } else {
        currentPlayer = firstPlayer;
    }
}

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

function isPathExist() {

    var bothPath = [firstPlayer, secondPlayer].every(function(player, plIndex){

        var stack = [];
        var notCarrentPlayer;
        var arrayForPlayer;
        var direction;

        // $(".cell").css("background-color","#333232");

        pathExist = false;

        objectsCells.forEach(function (el, index) {
            el.passed = false;
            // console.log("bla")
        });

        if (player == firstPlayer) {
            notCarrentPlayer = secondPlayer;
            direction = 3;
        } else {
            notCarrentPlayer = firstPlayer;
            direction = 0;
        }

        var notCarrentCell = notCarrentPlayer.position;

        stack.push(notCarrentCell);
        notCarrentCell.passed = true;

        while (stack.length) {
            // notCarrentCell.domElement.css("background-color","red");
            var localPath = [
                {wall: notCarrentCell.top},
                {wall: notCarrentCell.right},
                {wall: notCarrentCell.left},
                {wall: notCarrentCell.bottom}
            ].some(function (el, index) {

                var element = el.wall;

                if (index == direction && element == undefined) {
                    pathExist = true;
                    return true;
                }

                if (element !== null && element !== undefined && !element.domElement.hasClass("wall-fill")) {

                    var neighborCell = element.getNeighbor(notCarrentCell);
                    if (!neighborCell.passed) {
                        // notCarrentCell.domElement.css("background-color","#fff");
                        notCarrentCell = neighborCell;

                        stack.push(notCarrentCell);
                        notCarrentCell.passed = true;
                        // alert("qwe")

                        return true;
                    }
                }
            });
            if (!localPath) {
                // notCarrentCell.domElement.css("background-color","#333232")

                notCarrentCell = stack.pop();
                if (stack.length != 0) {
                    notCarrentCell = stack.pop();
                    stack.push(notCarrentCell);
                }

            }
            if (pathExist) {
                // alert("wef");
                return true;
            }
        }

    });
    return bothPath;

}

function changePlayer() {
    if (currentPlayer == firstPlayer && currentPlayer.position.top == undefined) {
        alert("First Player Win!!!")
    }
    if (currentPlayer == secondPlayer && currentPlayer.position.bottom == undefined) {
        alert("Second Player Win!!!")
    }
    if (currentPlayer == firstPlayer) {
        currentPlayer = secondPlayer;
    } else {
        currentPlayer = firstPlayer;
    }

}

Cell.prototype.click = function () {

    var moved = false;

    var self = this;
    if (self.domElement.is(".-first-player, .-second-player")) {
        return;
    }

    [
        {cell: currentPlayer.position.top, direction: "top"},
        {cell: currentPlayer.position.right, direction: "right"},
        {cell: currentPlayer.position.bottom, direction: "bottom"},
        {cell: currentPlayer.position.left, direction: "left"}
    ].forEach(function (el, index) {

            var element = el.cell;
            if (element !== null && element !== undefined && !element.domElement.hasClass("wall-fill")) {


                var neighborCell = element.getNeighbor(currentPlayer.position);

                if (neighborCell == self) {
                    $(".cell").removeClass(currentPlayer.class);
                    $(".cell").removeClass("-current-player");
                    currentPlayer.position = self;
                    currentPlayer.position.domElement.addClass(currentPlayer.class);
                    changePlayer();
                    currentPlayer.position.domElement.addClass("-current-player");
                    moved = true;
                }
            }
        });

    if (!moved) {
        [
            {cell: currentPlayer.position.top, direction: "top"},
            {cell: currentPlayer.position.right, direction: "right"},
            {cell: currentPlayer.position.bottom, direction: "bottom"},
            {cell: currentPlayer.position.left, direction: "left"}
        ].forEach(function (el, index) {
                var element = el.cell;
                if (element !== null && element !== undefined && !element.domElement.hasClass("wall-fill")) {
                    var neighborCell = element.getNeighbor(currentPlayer.position);

                    if (neighborCell.domElement.is(".-first-player, .-second-player")) {
                        var nextNeighborWall = neighborCell[el.direction];
                        if (nextNeighborWall !== null && nextNeighborWall !== undefined && !nextNeighborWall.domElement.hasClass("wall-fill")) {
                            var nextNeigborCell = nextNeighborWall.getNeighbor(neighborCell);

                            if (nextNeigborCell == self) {
                                $(".cell").removeClass(currentPlayer.class);
                                currentPlayer.position = self;
                                currentPlayer.position.domElement.addClass(currentPlayer.class);
                                changePlayer();
                            }
                        } else {
                            currentPlayer.position = neighborCell;
                            self.domElement.trigger("click");
                        }
                    }
                }
            });
    }
};

/***
 *
 * @constructor Wall
 *
 */
function Wall() {
    this.domElement = null;

    this.firstCell = null;
    this.secondCell = null;

    this.firstCrossover = null;
    this.secondCrossover = null;

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

Wall.prototype.hoverIn = function (where) {
    window.orientation = ! this.domElement.hasClass("horisont-wall");
    if (where == 'first' && this.firstCrossover) {
        this.firstCrossover.domElement.trigger('mouseenter');
    } else {
        if (this.secondCrossover) {
            this.secondCrossover.domElement.trigger('mouseenter');
        } else {
            this.firstCrossover.domElement.trigger('mouseenter');
        }
    }

};
Wall.prototype.hoverOut = function (where) {
    window.orientation = ! this.domElement.hasClass("horisont-wall");
    if (where == 'first' && this.firstCrossover) {
        this.firstCrossover.domElement.trigger('mouseleave');
    } else {
        if (this.secondCrossover) {
            this.secondCrossover.domElement.trigger('mouseleave');
        } else {
            this.firstCrossover.domElement.trigger('mouseleave');
        }
    }
};

Wall.prototype.firstClick = function () {
    window.orientation = ! this.domElement.hasClass("horisont-wall");
    this.firstCrossover.domElement.trigger("click");
};

Wall.prototype.secondClick = function () {
    window.orientation = ! this.domElement.hasClass("horisont-wall");
    this.secondCrossover.domElement.trigger("click");
};

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

Crossover.prototype.hoverIn = function () {

    if (this.domElement.hasClass("wall-fill")) {
        return;
    }

    this.domElement.addClass("wall-hover");

    if (window.orientation) {
        this.top.domElement.addClass("wall-hover");
        this.bottom.domElement.addClass("wall-hover");
    }
    else {
        this.left.domElement.addClass("wall-hover");
        this.right.domElement.addClass("wall-hover");
    }
}

Crossover.prototype.hoverOut = function () {
    this.domElement.removeClass("wall-hover");

    this.top.domElement.removeClass("wall-hover");
    this.bottom.domElement.removeClass("wall-hover");
    this.left.domElement.removeClass("wall-hover");
    this.right.domElement.removeClass("wall-hover");
}

Crossover.prototype.hover = function () {

};

Crossover.prototype.click = function () {

    if (currentPlayer.wall_count == 0) {
        alert("No more walls")
        return;
    }
    if (this.domElement.hasClass("wall-fill")) {
        return;
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

    if (!isPathExist()) {
        alert("Wrong move!");

        this.domElement.toggleClass("wall-fill");

        if (window.orientation) {
            this.top.domElement.toggleClass("wall-fill");
            this.bottom.domElement.toggleClass("wall-fill");
        } else {
            this.left.domElement.toggleClass("wall-fill");
            this.right.domElement.toggleClass("wall-fill");
        }
        return;
    }

    currentPlayer.wall_decrement();
    changePlayer();


};

function changeOrientation() {
    window.orientation = !window.orientation;
}

Crossover.prototype.oncontextmenu = function () {
    this.hoverOut();
    this.hoverIn();
};

function createObjects(elements, array, ourClasses) {

    $.each(elements, function (index, element) {
        var object = new ourClasses();
        object.domElement = $(element);


        if (Wall == ourClasses) {
            object.domElement.find("div:first-child").click(function () {
                object.firstClick.call(object);
            });

            object.domElement.find("div:first-child").hover(function () {
                object.hoverIn.call(object, 'first');
            }, function () {
                object.hoverOut.call(object, 'first');
            });

            object.domElement.find("div:last-child").click(function () {
                object.secondClick.call(object);
            });

            object.domElement.find("div:last-child").hover(function () {
                object.hoverIn.call(object, 'last');
            }, function () {
                object.hoverOut.call(object, 'last');
            });


        }
        else {

            object.domElement.click(function () {
                object.click.call(object);
            });
        }

        object.domElement.mousedown(function (event) {
            if (event.button == 2) {
                changeOrientation();
                object.oncontextmenu.call(object);
            }
        });

        if (Crossover == ourClasses) {

            object.domElement.hover(function () {
                object.hoverIn.call(object);
            }, function () {
                object.hoverOut.call(object);
            });

        }

        array.push(object);

    });
}

function initApplication() {

    window.blabla = true;

    var cells = $(".cell");
    var crossovers = $(".crossover");
    var allWalls = $(".wall");


    var objectsCrossovers = [];

    window.objectsCrossovers = objectsCrossovers;

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


    objectsCrossovers.forEach(function (element, index) {

        [element.top, element.right, element.bottom, element.left].forEach(function (wall, index) {
            if (wall) {

                if (index == 0 || index == 3) {
                    wall.secondCrossover = element;
                }

                if (index == 1 || index == 2) {
                    wall.firstCrossover = element;

                }

            }
        });
    });

    objectsCells.forEach(function (element, index) {

        if (element.domElement.hasClass("-first-player")) {
            firstPlayer.name = "Moond";
            firstPlayer.class = "-first-player";
            firstPlayer.position = element;
            firstPlayer.wall_array = $(".wall-storage__bottom .wall-simul");
        }

        if (element.domElement.hasClass("-second-player")) {
            secondPlayer.name = "Naggi";
            secondPlayer.class = "-second-player";
            secondPlayer.position = element;
            secondPlayer.wall_array = $(".wall-storage__top .wall-simul");
        }

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

    $(".wall-simul").addClass("wall-simul_fill");
}
