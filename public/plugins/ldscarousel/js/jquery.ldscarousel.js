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
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $($element).parent().find('.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
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
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
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
    
    e.preventDefault();
    
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
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/4) ) + ')',
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
    
    e.preventDefault();
    
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
            'transform'         :   'scale(' + (1 - ((i+1)/6) ) + ')',
            '-webkit-filter'    :   'blur(' + (i+1)*0.5 + 'px) grayscale(' + (25 * i) + '%)',
            'opacity'           :   1 - ((i+1)/10)
        });
    });
    
    $( $active ).find('ul li.focus').prevAll().each(function(i){
        $(this).find('img').css({
            'transform'         :   'scale(' + (1 - ((i+1)/6) ) + ')',
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
    padding         :   10,
    openEffect      :   'elastic',
    openMethod      :   'zoomIn',
    closeEffect     :   'elastic',
    closeMethod     :   'zoomOut',
    loop            :   false,
    autoResize      :   true,
    mouseWheel      :   true,
    helpers:  {
        title : {
            type : 'inside'
        },
        buttons : {
            position : 'bottom'
        },
        thumbs : {
            width: 50,
            height: 50
        }
    },
    // @TODO Fancybox integration beforeShow
    beforeShow      :   function(e){
        this.disablescroll = new Object({
            scrollposition  :   [ self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop ],
            html            :   jQuery('html'),
            header_wrapper  :   jQuery('#header_wrapper')
        });
        this.disablescroll.html.data('scroll-position',this.disablescroll.scrollposition);
        this.disablescroll.html.data('previous-overflow-y',this.disablescroll.html.css('overflow-y'));
        this.disablescroll.html.data('previous-overflow-x',this.disablescroll.html.css('overflow-x'));
        this.disablescroll.html.css('overflow', 'hidden');
        this.disablescroll.html.css('top', '0');
        this.disablescroll.html.css('left', '0');
        this.disablescroll.header_wrapper.addClass('notransition').css({
            'left'  :   function(){
                            console.log( ( ( $(document).width() - 18 ) * 0.35).toFixed(0) + 'px' );
                            return ( ( $(document).width() - 18 ) * 0.35).toFixed(0) + 'px';
                        },
            'width' :   function(){
                            console.log( ( ( $(document).width() - 18 ) * 0.5).toFixed(0) + 'px' );
                            return ( ( $(document).width() - 18 ) * 0.5).toFixed(0) + 'px';
            }
        });
        window.scrollTo(this.disablescroll.scrollposition[0], this.disablescroll.scrollposition[1]);
    },
    // @TODO Fancybox integration afterClose
    afterClose      :   function(e){
        var html = jQuery('html');
        var scrollPosition = this.disablescroll.html.data('scroll-position');
        this.disablescroll.html.css('overflow-y', this.disablescroll.html.data('previous-overflow-y'));
        this.disablescroll.html.css('overflow-x', this.disablescroll.html.data('previous-overflow-x'));
        this.disablescroll.html.css('top', '');
        this.disablescroll.html.css('left', '');
        this.disablescroll.header_wrapper.css({left:'',width:''}).removeClass('notransition');
        window.scrollTo(this.disablescroll.scrollposition[0], this.disablescroll.scrollposition[1]);
    }

});