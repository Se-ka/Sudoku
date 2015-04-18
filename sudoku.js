/**
 * Created by sergiy on 17.04.15.
 */


readyFunction = function () {

    sudoku.render();

};
$(readyFunction);

sudoku = {

    "numbers" : [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ],

    "render": function () {

        var i, k, n;
        for (i = 1; i <= 9; i++) {
            for (k = 1; k <= 9; k++) {

                n = this.numbers[i-1][k-1];

                if (n !== 0) {
                    $("#" + i + k + " input").val(n);
                }
            }
        }


    }



};


































