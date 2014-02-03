/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var productActions = new Object({
    tabClick:       function(event,e){
        // event.preventDefault();
        var event = event;
        if( event === 'scroll' ) {
            var e = $('a[href=' + e + ']');
        } else {
            var e = e;
        }
        
        $(e).closest('li').addClass('active').siblings('li').removeClass('active');
        
        var $content_data_wrapper = $(e).closest('.content').find('.content_information');
        var $active_content = $(e).closest('.content').find('.content_data');
        var $active_product_tab = $(e).attr('href');

        if( $($active_content).filter('.active').attr('id') !== $(e).attr('href').replace('#','')  ) {

            if( $($active_content).filter('.active').length >= 1 ){
                var $current_height = $($active_content).filter('.active').show().height();
            } else {
                var $current_height = 0;
            }

            if( $($active_content).filter( $(e).attr('href') ).length >= 1 ){
                var $new_height = $($active_content).filter( $(e).attr('href') ).show().height();
                $($active_content).filter( $(e).attr('href') ).hide();
            } else {
                var $new_height = 0;
            }

            $($content_data_wrapper).css({
                height      :       $current_height
            });

            // @TODO Fix the resizing on .on commands for dynamically generated content.

            $($active_content).transition({
                'opacity': '0.0'
            }, 300 , function(){
                $($active_content).hide().removeClass('active');
                $($content_data_wrapper).transition({
                    height      :       $new_height
                }, 300, function(){
                    $($active_content).filter($active_product_tab).addClass('active').show().transition({
                        'opacity': '1.0'
                    }, 300, function(){
                        $(this).addClass('active');
                        duration = 0;
                        if( event !== 'scroll' ){
                            $('html, body').animate({scrollTop:$( this ).offset().top - 70}, 300);
                        } else {
                            $('html, body').animate({scrollTop:$( this ).offset().top - 70}, 1000);
                        }
                    });
                });
            });
        }
    }
});
    
$("#body .container .buy input, #body .container .buy select, #body .container .buy textarea").bind('focus', function(e){
    $(this).addClass('active').siblings('label').addClass('active');
}).bind('blur', function(e){
    $(this).removeClass('active').siblings('label').removeClass('active');
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
    console.log( 'select variant : ' + $(this).closest('form').find('select.buy_variant').valid() );
    console.log( 'input.antal    : ' + $(this).closest('form').find('input.antal').valid() );

    $button_reset = setTimeout(function(){
        $($this).removeClass('processing');
    },1000);
});

$("#body .container form.buy").validate({
    // make sure error message isn't displayed
    errorPlacement  : function(error, element) {
        return true;
    },
    // set the errorClass as a random string to prevent label disappearing when valid
    errorClass : "baconaise",
    // validation class for validated fields
    validClass : "valid",
    // use highlight and unhighlight
    highlight: function (element, errorClass, validClass) {
        $(element.form).find("label[for=" + element.id + "]").addClass("error_label");
        $(element).addClass("error");
        
        $(element.form).find("label[for=" + element.id + "]").removeClass("valid");
        $(element).removeClass("valid");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element.form).find("label[for=" + element.id + "]").removeClass("error_label");
        $(element).removeClass("error");
        
        $(element.form).find("label[for=" + element.id + "]").addClass("valid");
        $(element).addClass("valid");
    },
    onsubmit        : false,
    submitHandler   : function(){
        console.log('submit succesful');
        return false;
    }
});

$("#body").on("click",".content_tabs a", function(e){
    productActions.tabClick( e, $(this) );
});

$(document).ready(function() {
    if(window.location.hash) {
        if( $( window.location.hash ).length > 0 ){
            productActions.tabClick( 'scroll', window.location.hash );
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top - 70
            }, 1000);
        }
    }
});

$(window).on('resize',function(){
    $('.content .content_information').height(function(){
        return $(this).find('.content_data.active').height;
    });
});