/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var productActions = new Object({
    tabClick: function(element){
        // e.preventDefault();
        
        var $this = element;
        
        var $content_data_wrapper = $($this).closest('.content').find('.content_information');
        var $active_content = $($this).closest('.content').find('.content_data');
        var $active_product_tab = $($this).attr('href');
        
        if( $($active_content).filter('.active').attr('id') !== $($this).attr('href').replace('#','')  ) {
            if( $($active_content).filter('.active').length >= 1 ){
                var $current_height = $($active_content).filter('.active').show().height();
            } else {
                var $current_height = 0;
            }
            if( $($active_content).filter( $($this).attr('href') ).length >= 1 ){
                var $new_height = $($active_content).filter( $(this).attr('href') ).show().height();
                $($active_content).filter( $($this).attr('href') ).hide();
            } else {
                var $new_height = 0;
            }
            $($content_data_wrapper).css({
                height      :       $current_height
            });
            $($active_content).not($active_product_tab).transition({
                'opacity': '0.0'
            }, 400 , function(){
                $($active_content).not($active_product_tab).hide().removeClass('active');
                $($content_data_wrapper).transition({
                    height      :       $new_height
                }, 400, function(){
                    $($content_data_wrapper).attr('style','');
                    $($active_content).filter($active_product_tab).addClass('active').show().transition({
                        'opacity': '1.0'
                    }, 400, function(){
                        $($this).addClass('active');
                    });
                });
            });
        }
    }
});

$(document).ready(function(){
    
    $("#body .container .buy input, #body .container .buy select, #body .container .buy textarea").bind('focus', function(e){
        $(this).addClass('active').siblings('label').addClass('active');
    }).bind('blur', function(e){
        $(this).removeClass('active').siblings('label').removeClass('active');
    });
        
    $("input.antal").bind('change paste keyup keydown',function(e){
        console.log( 'amount : ' + $(this).val() );
        console.log( 'selected : ' + $(this).siblings('select option:selected').attr('data-unselected') );
        if( parseInt( $(this).val() ) >= 1 && !isNaN(parseFloat($(this).val())) && isFinite($(this).val()) ){
            $(this).closest('.buy').find('button').addClass('active');
        } else {
            $(this).closest('.buy').find('button').removeClass('active');
        }
    });
    
    $("input.antal").autoGrowInput({
        maxWidth    :   60,
        minWidth    :   26,
        comfortZone :    8
    });
    
    $('button').click(function(e){
        
        e.preventDefault();
        
        var $this = this;
        
        $(this).addClass('processing');
        console.log( $(this).closest('form').valid() );
        console.log( 'select variant : ' + $(this).closest('form').find('select').valid() );
        console.log( 'input.antal    : ' + $(this).closest('form').find('input.antal').valid() );
        
        $button_reset = setTimeout(function(){
            $($this).removeClass('processing');
        },1000);
        
        /* @TODO remember to remove this */
        $.getJSON( "/produkter/roll_up_classic/ajax", function( data ){
            if( data.success === true ){
                
                $fadeOut = $("<div id='fadeOut' class='fade-out'></div>");
                $( "#body" ).find(".container").removeClass("fade-in");
                $current = $( $("#body").html() );
                $current.prependTo( $fadeOut );
                
                $("#body").html('');
                $($fadeOut).prependTo("#body");
                
                setTimeout(function(){
                    $($fadeOut).remove();
                    $body = $(data.html);
                    $body.appendTo('#body');
                    $("#body").find('.container').addClass('fade-in')
                    $("#body").find('.content_tabs a').click(function(e){
                        productActions.tabClick( $(this) );
                    });
                    
                    $("#body .container .carousel").each(function(i){
                        $(this).delay(0).queue(function(next){
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

                            $(this).addClass('fade-in').delay(550).removeClass('fade-in');
                            $(".carousel").css('opacity','');
                        });
                    });
                    
                },650);
            }
        });
        
    });
    
    $("#body .container form.buy").validate({
        // make sure error message isn't displayed
        errorPlacement  : function(error, element) {
            return true;
        },
        // set the errorClass as a random string to prevent label disappearing when valid
        errorClass : "baconaise",
        // use highlight and unhighlight
        highlight: function (element, errorClass, validClass) {
            $(element.form).find("label[for=" + element.id + "]").addClass("error_label");
            $(element).addClass("error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element.form).find("label[for=" + element.id + "]").removeClass("error_label");
            $(element).removeClass("error");
        },
        onsubmit        : true,
        submitHandler   : function(){
        }
    });
    
    $("#body .container form.buy input.antal").rules('add', {
        digits          :   true,
    });
    
    $("#body").on("click",".content_tabs a", function(e){
        e.preventDefault();
        var $content_data_wrapper = $(this).closest('.content').find('.content_information');
        var $active_content = $(this).closest('.content').find('.content_data');
        var $active_product_tab = $(this).attr('href');
        
        if( $($active_content).filter('.active').attr('id') !== $(this).attr('href').replace('#','')  ) {
            
            if( $($active_content).filter('.active').length >= 1 ){
                var $current_height = $($active_content).filter('.active').show().height();
            } else {
                var $current_height = 0;
            }
            
            if( $($active_content).filter( $(this).attr('href') ).length >= 1 ){
                var $new_height = $($active_content).filter( $(this).attr('href') ).show().height();
                $($active_content).filter( $(this).attr('href') ).hide();
            } else {
                var $new_height = 0;
            }
            
            console.log( '=' + ($new_height - $current_height) + 'px' );
            
            $($content_data_wrapper).css({
                height      :       $current_height
            });
            
            // @TODO Fix the resizing on .on commands for dynamically generated content.
            
            $($active_content).not($active_product_tab).transition({
                'opacity': '0.0'
            }, 400 , function(){
                $($active_content).not($active_product_tab).hide().removeClass('active');
                $($content_data_wrapper).transition({
                    height      :       $new_height
                }, 400, function(){
                    $($content_data_wrapper).attr('style','');
                    $($active_content).filter($active_product_tab).addClass('active').show().transition({
                        'opacity': '1.0'
                    }, 400, function(){
                        $(this).addClass('active');
                    });
                });
            });
        }
       // productActions.tabClick( $(this) );
    });

});