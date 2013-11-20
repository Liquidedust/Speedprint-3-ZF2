/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    
    $(".content_tabs a").click(function(e){
        // e.preventDefault();
        
        var $content_data_wrapper = $(this).closest('.content').find('.content_information');
        
        var $active_content = $(this).closest('.content').find('.content_data');
        var $active_product_tab = $(this).attr('href');
        
        if( $($active_content).filter('.active').attr('id') !== $(this).attr('href').replace('#','')  ) {
        
            var $current_height = $($active_content).filter('.active').show().height();
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