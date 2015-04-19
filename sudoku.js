/**
 * Created by sergiy on 17.04.15.
 */


// this.matrix.row === this.numbers

readyFunction = function () {
    v = 0;
    c = 0;

    sudoku.render();
    sudoku.solve();
    sudoku.stepByStepRendering();

};
$(readyFunction);

sudoku = {

    $cellMatrix: {},

    numbers: [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,3,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ],

    render: function () {
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

    stepByStepRendering: function () {

        var n = this.numbers[c][v];
        var p = this.solved[c][v];

        if (n < p) {
            $("#" + (c + 1) + (v + 1) + " input").val(p);
        }

        if (v == 8 && c == 8) {
            return;
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
    },

    solve: function() {

        var starttime = Date.now();

        this.solved = [];
        for (var i = 0; i < 9; i++) {
            this.solved[i] = [];
            for (var k = 0; k < 9; k++) {
                this.solved[i][k] = this.numbers[i][k];
            }
        }

        this.solveGame(0, 0);

        var endtime = Date.now();

        var elapsed = endtime - starttime;
        console.log( 'Solver elapsed time: ' + elapsed + 'ms' );
    },

    solveGame: function( row, col ) {

        var cval, sqRow, sqCol, legalValues, closest;

        closest = this.findClosestEmptySquare( row, col );

        if ( !closest ) {
            // End of board
            return true;
        }

        sqRow = closest.row;
        sqCol = closest.col;

        legalValues = this.findLegalValuesForSquare(sqRow, sqCol);

        // Try out legal values for this cell
        for ( var i = 0; i < legalValues.length; i++ ) {
            cval = legalValues[i];

            // Update in matrices
            this.solved[sqRow][sqCol] = cval;

            // Recursively keep trying
            if ( this.solveGame( sqRow, sqCol ) ) {
                return true;
            }

            // Remove value from matrices
            this.solved[sqRow][sqCol] = 0;
        }

        // If there was no success with any of the legal
        // numbers, call backtrack recursively backwards
        return false;
    },

    findClosestEmptySquare: function( row, col ) {
        var walkingRow, walkingCol;

        for ( var i = ( col + 9*row ); i < 81; i++ ) {
            walkingRow = Math.floor( i / 9 );
            walkingCol = i % 9;

            if ( this.solved[walkingRow][walkingCol] === 0 ) {
                return {
                    row: walkingRow,
                    col: walkingCol
                }
            }
        }
    },

    findLegalValuesForSquare: function( row, col ) {

        var legalNums, val, i, k, sectRow, sectCol;

        legalNums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

        // Check existing numbers in col
        for ( i = 0; i < 9; i++ ) {
            val = this.solved[i][col];
            if ( val > 0 ) {
                // Remove from array
                if ( legalNums.indexOf( val ) > -1 ) {
                    legalNums.splice( legalNums.indexOf( val ), 1 );
                }
            }
        }

        // Check existing numbers in row
        for ( i = 0; i < 9; i++ ) {
            val = this.solved[row][i];
            if ( val > 0 ) {
                // Remove from array
                if ( legalNums.indexOf( val ) > -1 ) {
                    legalNums.splice( legalNums.indexOf( val ), 1 );
                }
            }
        }

        // Check existing numbers in section
        sectRow = Math.floor(row / 3) * 3;
        sectCol = Math.floor(col / 3) * 3;

        for ( i = 0; i < 3; i++ ) {
            for ( k = 0; k < 3; k++ ) {
                val = this.solved[sectRow + i][sectCol + k];
                if (val > 0) {
                    // Remove from array
                    if (legalNums.indexOf(val) > -1) {
                        legalNums.splice(legalNums.indexOf(val), 1);
                    }
                }
            }
        }

        return legalNums;
    }

};