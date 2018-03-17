/**
 * Created by z on 2018/3/17.
 */
requirejs.config
require(["dialog"],function (dialog) {
var oBtn = document.getElementById("btn");
    oBtn.onclick=function () {
    dialog.open();
}
});