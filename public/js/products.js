/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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
        
        var $this = this;
        
        $(this).addClass('processing');
        
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
    
    $("#body .container form.buy select").rules('add', {
        valueNotEquals  :   'default',
    });
    
    $(".content_tabs a").click(function(e){
        // e.preventDefault();
        
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
                        $(this).addClass('active');
                    });
                });
            });
        }
    });

});