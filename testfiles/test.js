$(function() {

    $('#changeButton').click(function() {
        $('#style').attr('href', '../testfiles/testTwo.less');
        console.log($('#style').attr('href'));
        $('style[id^="less:"]').remove();
        less.refresh();
    })

})

//'../testfiles/test.less' : '../testfiles/testTwo.less'