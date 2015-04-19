/**
 * Created by sergiy on 17.04.15.
 */


readyFunction = function () {
    v = 0;
    c = 0;
    sudoku.render();
    sudoku.stepByStepRendering();

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

    "solved" : [
        [1,2,3,4,5,6,7,8,9],
        [3,0,0,0,0,0,0,0,0],
        [0,0,0,3,0,0,0,0,0],
        [0,0,0,0,0,4,0,0,0],
        [0,0,0,0,0,0,4,0,0],
        [0,7,0,0,0,0,0,0,0],
        [0,0,8,0,0,0,0,0,0],
        [0,5,0,9,0,0,6,0,0],
        [0,0,0,0,4,0,5,0,0]
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


    },

    "stepByStepRendering": function () {

                n = this.numbers[c-1][v-1];
                p = this.solved[c-1][v-1];

                if (n < p) {
                    $("#" + c + v + " input").val(p);
                }

        console.log(c,v);

        if (v == 8 && c == 8) {
            return
        }
        if (v <= 7) {
            v++;
        } else {
            if (c <= 7) {
                v = 0;
                c++;
            }
        }
        setTimeout(this.stepByStepRendering.bind(this), 1);
    }
};
