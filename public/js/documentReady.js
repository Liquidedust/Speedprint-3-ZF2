/**********************************/
/****    Body Containers on    ****/
/****     Document.Ready       ****/
/**********************************/

$(document).ready(function(){
    $(".carousel").css({opacity: 0.0});
    
    $("body").removeClass("preload",function(){
        $('#body .container').each(function(i) {
            $(this).delay(250*i).queue(function(next){
                $(this).addClass('fade-in').removeClass('no-opacity').find(".carousel").each(function(i){
                    $(this).delay(750 + 250*i).queue(function(next){
    
                        $(".carousel_wrapper ul").css({
                            'left'      :       function(){
                                var $x1 = $(this).closest('.carousel_wrapper').width() / 2;
                                var $x = $x1 - 90;
                                return $x + 'px';
                            }
                        }).find('li').eq(0).addClass('focus').nextAll().each(function(i){
                            $(this).find('img').css({
                                'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
                                '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
                                'opacity'           :   1 - ((i+1)/10)
                            });
                        }).closest('.carousel_wrapper')
                        .find('.navigation a').eq(0).addClass('focus').nextAll('a').removeClass('focus')
                        .closest('.carousel_wrapper').find('.prev').addClass('inactive');
                        
                        $(this).addClass('fade-in');
                    
                    });
                });
            });
        });
    });
});