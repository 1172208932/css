/**
 * Created by z on 2018/3/17.
 */
define(function () {
    var dialog={
        open:function () {
            var dialogHtml =
            '<div class="dialog-box">'+
               '<div class="dialog-mask"></div>'+
                '<div class="dialog-container">'+
                '<div class="header">'+
                '<div class="dialog-title">注册</div>'+
                '<div class="dialog-btn" id="close">[x]</div>'+
                '</div>'+
                '<div class="dialog-content"></div>'+
                '</div>'+
                '</div>'
            document.body.innerHTML+=dialogHtml;
            var oClose = document.getElementById("close");
            oClose.onclick=function () {
                document.getElementsByClassName("dialog-box")[0].remove();
            }
        }
    }
    return dialog;
});