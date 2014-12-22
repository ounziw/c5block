/*
 *
 * Copyright 2014 Fumito MIZUNO
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
$(window).on('load',function(){
    $('#xml').keyup(function(){
        var data = $.parseXML($('#xml').val());
        if ($.isXMLDoc(data)) {
            var controllerhtml = $('#controllerxsl').xslt(data);
            $('#controllerhtml').html(controllerhtml);
            var viewhtml = $('#viewxsl').xslt(data);
            $('#viewhtml').html(viewhtml);
            var edithtml = $('#editxsl').xslt(data);
            $('#edithtml').html(edithtml);
        }
    });
});