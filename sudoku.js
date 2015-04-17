/**
 * Created by sergiy on 17.04.15.
 */

readyfunction = function () {


};
$(readyFunction);

var i, k;
for (i = 1; i <= 9; i++) {
    for (k = 1; k <= 9; k++) {
        $("#" + i + k).css("background-color", "yellow")
    }
}