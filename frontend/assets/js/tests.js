QUnit.test("test wall.getNeighbor()", function (assert) {

    var wall = new Wall();
    var firstCell = new Cell();
    var secondCell = new Cell();

    wall.firstCell = firstCell;
    wall.secondCell = secondCell;

    assert.equal(wall.getNeighbor(firstCell), secondCell, "Passed!");

    assert.equal(wall.getNeighbor(secondCell), firstCell, "Passed!");

    assert.notEqual(wall.getNeighbor(firstCell), firstCell, "Passed!");

});

QUnit.test("test global changePlayer", function (assert) {


    assert.equal(currentPlayer, firstPlayer, "Passed!");

    changePlayer();

    assert.equal(currentPlayer, secondPlayer, "Passed!");

    changePlayer();

    assert.equal(currentPlayer, firstPlayer, "Passed!");

});

QUnit.test("test simple Cell.click", function (assert) {


    var testField = $('#test-field');

    window.cell = new Cell();

    currentPlayer.position = cell;
    currentPlayer.name = "Moond";
    currentPlayer.class = "-first-player";

    cell.domElement = $('<div class="-first-player cell"></div>');

    testField.append(cell.domElement);

    ['top', 'right', 'bottom', 'left'].forEach(function (element) {

        cell[element] = new Wall();

        cell[element].domElement = $("<div></div>");

        testField.append(cell[element].domElement);

        cell[element].firstCell = cell;

        var newCell = new Cell();

        newCell.domElement = $("<div class='cell'></div>");

        testField.append(newCell.domElement);

        cell[element].secondCell = newCell;

    });

    cell.top.getNeighbor(cell).click();

    assert.ok(!cell.domElement.hasClass("-first-player"), "Passed!");
    assert.ok(cell.top.getNeighbor(cell).domElement.hasClass("-first-player"), "Passed!");

});