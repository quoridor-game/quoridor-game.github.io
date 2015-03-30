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

QUnit.test("click test", function (assert) {


    var start = firstPlayer.position;
    
    firstPlayer.position.top.getNeighbor(firstPlayer.position).domElement.trigger("click");

    assert.ok(start !== firstPlayer.position, "Passed!");
    assert.ok(!start.domElement.hasClass("-first-player") , "Passed!");

    assert.ok(start.top.getNeighbor(start) === firstPlayer.position, "Passed!");
    assert.ok(start.top.getNeighbor(start).domElement.hasClass("-first-player"), "Passed!");

});

QUnit.test("isPathExist test", function (assert) {
    firstPlayer.position.left.domElement.find("div:first-child").trigger("click");
    firstPlayer.position.right.domElement.find("div:first-child").trigger("click");
    var a = firstPlayer.position.top.getNeighbor(firstPlayer.position);
    a.left.secondCrossover.domElement.trigger("click");

    assert.ok(!firstPlayer.position.top.domElement.hasClass("wall-fill"), "Passed!");

});