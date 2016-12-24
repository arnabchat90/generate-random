var $ = require('jQuery');
require('jquery-validation');
(function () {
    "use strict";
    $(document).ready(function () {
        //Hookup the Submit button click event
        $("#btnSubmit").click(function() {
            $("#resultPane").hide();
            // $("#mainForm").validate({
            //     submitHandler : function(form) {
            //         return false;
            //     }
            // });
            $("#loader").show();
            var txtTotalNumbersRequired = $("#txtNumberRequested").val();
           // alert(txtTotalNumbersRequired);
            var txtMax = $("#txtMax").val();
            var txtMin = $("#txtMin").val();
            var finalUrl = "https://www.random.org/integers/?num="+ txtTotalNumbersRequired +"&min="+txtMin+"&max="+txtMax+"&col=1&base=10&format=plain&rnd=new";
            $.ajax({
                url : finalUrl,
                accept : "application/json",
                success : function (data) {
                    $("#loader").hide();
                     $("#resultPane").show();
                    $("#post").html(data);
                    $("#btnDownloadAsText").show();
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    $("#resultPane").show();
                    $('#post').html(msg);
                }
            });
            return false;
        });
        
         function downloadInnerHtml(filename, elId, mimeType) {
            var elHtml = document.getElementById(elId).innerHTML;
            var link = document.createElement('a');
            mimeType = mimeType || 'text/plain';

            link.setAttribute('download', filename);
            link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
            link.click(); 
        }
        var fileName =  'random_numbers.txt'; // You can use the .txt extension if you want
        $('#btnDownloadAsText').click(function(){
            downloadInnerHtml(fileName, 'post','text/plain');
        });
    });
   
})();