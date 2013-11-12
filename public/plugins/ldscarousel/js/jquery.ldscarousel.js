/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(".carousel_wrapper .carousel ul li a").bind('click', function(event){
    
    event.preventDefault();
    
    var $active = $(this).closest(".carousel_wrapper");
    var $this = $( $active ).find(".carousel li").index( $(this).closest('li') );
    var $count = Math.floor( $( $active ).find(".carousel li").length - 1 );
    var $index = $( $active ).find(".carousel li").index( $(this).closest(".carousel_wrapper").find('li.focus') );
    
    var $element = $(this).closest('li');
    
    var $i_diff = Math.abs( $this - $index );
    
    $( $active ).find('ul').css({
        'transition'    :   ( $i_diff * 300 ) + 'ms all ease-in-out'
    });
    
    $( $active ).find('.navigation a').removeClass('focus').eq($this).addClass('focus');
    
    $( $active ).find('ul li').removeClass('focus').eq($this).addClass('focus').find('img').attr('style','');
    
    $($element).parent().find('.focus').nextAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $($element).parent().find('.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $($element).closest('ul').css({
        'left'      :       function(){
            $x1 = $(this).closest('.image').width() / 2;
            $x2 = $this*180;
            $x = $x1 - $x2 - 90;
            return $x + 'px';
        }
    });
    
    if( $this === 0  ) {
        $( $active ).find(".prev").addClass('inactive');
        $( $active ).find(".next").removeClass('inactive');
    } else if( $this === $count  ) {
        $( $active ).find(".prev").removeClass('inactive');
        $( $active ).find(".next").addClass('inactive');
    } else {
        $( $active ).find(".prev,.next").removeClass('inactive');
    }
    
});

$(".carousel_wrapper .navigation a").bind('click', function(e){
    
    e.preventDefault();
    
    var $active = $(this).closest(".carousel_wrapper");
    var $this = $( $active ).find(".navigation a").index( this );
    var $count = Math.floor( $( $active ).find(".navigation a").length - 1 );
    var $index = $( $active ).find(".carousel li").index( $(this).closest(".carousel_wrapper").find('li.focus') );
    
    var $i_diff = Math.abs( $this - $index );
    
    $( $active ).find('ul').css({
        'transition'    :   ( $i_diff * 300 ) + 'ms all ease-in-out'
    });
    
    $(this).addClass('focus').siblings('a').removeClass('focus');
    
    $( $active ).find('ul li').removeClass('focus').eq($this).addClass('focus').find('img').attr('style', '');
    
    $( $active ).find('ul li.focus').nextAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul').css({
        'left'      :       function(){
            var $x1 = $(this).closest('.image').width() / 2;
            var $x2 = $this*180;
            var $x = $x1 - $x2 - 90;
            return $x + 'px';
        }
    });
    
    if( $this === 0  ) {
        $( $active ).find(".prev").addClass('inactive');
        $( $active ).find(".next").removeClass('inactive');
    } else if( $this === $count  ) {
        $( $active ).find(".prev").removeClass('inactive');
        $( $active ).find(".next").addClass('inactive');
    } else {
        $( $active ).find(".prev,.next").removeClass('inactive');
    }
    
});

$(".carousel_wrapper .next a").click(function(e){
    var $active = $(this).closest(".carousel_wrapper");
    var $this = $( $active ).find(".carousel li").index( $( $active ).find(".carousel li.focus") );
    var $count = Math.floor( $( $active ).find(".navigation a").length - 1 );
    var $index = $( $active ).find(".carousel li").index( $( $active ).find('li.focus') );
    
    if( $this === ( $( $active ).find(".carousel li").length -1) ){
        $this = $this;
    } else {
        $this = $this+1;
    }
    
    var $i_diff = Math.abs( $this - $index );
    
    $( $active ).find('ul').css({
        'transition'    :   '300ms all ease-in-out'
    });
    
    $( $active ).find('.navigation a').eq( $this ).addClass('focus').siblings('a').removeClass('focus');
    
    $( $active ).find('ul li').removeClass('focus').eq( $this ).addClass('focus').find('img').attr('style', '');
    
    $( $active ).find('ul li.focus').nextAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul').css({
        'left'      :       function(){
            var $x1 = $(this).closest('.image').width() / 2;
            var $x2 = $this*180;
            var $x = $x1 - $x2 - 90;
            return $x + 'px';
        }
    });
    
    if( $this === 0  ) {
        $( $active ).find(".prev").addClass('inactive');
        $( $active ).find(".next").removeClass('inactive').blur();
    } else if( $this === $count  ) {
        $( $active ).find(".prev").removeClass('inactive').blur();
        $( $active ).find(".next").addClass('inactive');
    } else {
        $( $active ).find(".prev,.next").removeClass('inactive').blur();
    }
    console.log( $this );
});

$(".carousel_wrapper .prev a").click(function(e){
    var $active = $(this).closest(".carousel_wrapper");
    var $this = $( $active ).find(".carousel li").index( $( $active ).find(".carousel li.focus") );
    var $count = Math.floor( $( $active ).find(".navigation a").length - 1 );
    var $index = $( $active ).find(".carousel li").index( $( $active ).find('li.focus') );
    
    if( $this === 0 ){
        $this = $this;
    } else {
        $this = $this-1;
    }
    
    var $i_diff = Math.abs( $this - $index );
    
    $( $active ).find('ul').css({
        'transition'    :   '300ms all ease-in-out'
    });
    
    $( $active ).find('.navigation a').eq( $this ).addClass('focus').siblings('a').removeClass('focus');
    
    $( $active ).find('ul li').removeClass('focus').eq( $this ).addClass('focus').find('img').attr('style', '');
    
    $( $active ).find('ul li.focus').nextAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/8) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul').css({
        'left'      :       function(){
            var $x1 = $(this).closest('.image').width() / 2;
            var $x2 = $this*180;
            var $x = $x1 - $x2 - 90;
            return $x + 'px';
        }
    });
    
    if( $this === 0  ) {
        $( $active ).find(".prev").addClass('inactive');
        $( $active ).find(".next").removeClass('inactive').blur();
    } else if( $this === $count  ) {
        $( $active ).find(".prev").removeClass('inactive').blur();
        $( $active ).find(".next").addClass('inactive');
    } else {
        $( $active ).find(".prev,.next").removeClass('inactive').blur();
    }
    console.log( $this );
});

$(window).resize(function(){
    $(".carousel ul").css({
        'left'      :       function(){
            var $set = $(this).children('li');
            var $active = $(this).children('li.focus');
            var $this = $( $set ).index( $active );
            
            var $x1 = $(this).closest('.image').width() / 2;
            var $x = $x1 - ($this*180) - 90;
            return $x + 'px';
        }
    });
});
    
$('.fancybox').fancybox({
    padding : 10,
    openEffect  :   'elastic',
    closeEffect  :  'elastic',
    loop : false,
    autoResize : true,
    helpers:  {
        title : {
            type : 'inside'
        },
        buttons : {
            position : 'bottom'
        }
    }

});