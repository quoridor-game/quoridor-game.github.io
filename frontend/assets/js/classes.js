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
 * top, ..., left - ссылки на соседние стены/клетки
 */
function Wall() {

    this.domElement = null;

    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;

    this.isChoosen = false;
    this.isFill = false;

    this.isVertical = function () {
        return this.left === null && this.right === null;
    };

    this.isHorizontal = function () {
        return !this.isVertical();
    };

    this.choose = function () {

        if (this.isFill) {
            return;
        }

        if (this.isChoosen) {
            this.isChoosen = false;
            return;
        }

        [this.top, this.right, this.bottom, this.left].forEach(function (element) {
            if (this.checkNeighbor(element)) {
                this.isChoosen = element.isChoosen = false;
                this.isFill = element.isFill = true;
            }
            return;
        });
    };

    this.checkNeighbor = function (neighbor) {
        if (neighbor instanceof Wall && neighbor.isChoosen) {
            return true;
        }
        return false;
    }

}

function initApplication() {

}