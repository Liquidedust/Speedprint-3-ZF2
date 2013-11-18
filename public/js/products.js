/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    
    var $contents_data_obj = new Object();
    
    $(".content .content_data ").each(function(i){
        $contents_data_obj[ $(this).attr('id') ] = new Object( { height : $(this).height()} );
    });
    
    $(window).resize(function(e){
        $(".content .content_data ").each(function(i){
            $(this).offsetHeight;
            $contents_data_obj[ $(this).attr('id') ] = new Object( { height : $(this).height()} );
        });
        
        $('#body .content .content_information').css({
            'height'    :   $contents_data_obj[ $(".content .content_data .content_data.active").attr('id') ].height
        });
    });
    
    $(".content_tabs a").click(function(e){
        e.preventDefault();
        
        var $active_content = $(this).closest('.content').find('.content_data');
        var $active_product_tab = $(this).attr('href');
        var $current_product_height;
        var $active_product_height;
        var $height_diff;
        
        if( $contents_data_obj[ $($active_content).filter('.active').attr('id') ] === undefined ) {
            $current_product_height =  0;
        } else {
            $current_product_height = $contents_data_obj[ $($active_content).filter('.active').attr('id') ].height;
        }
        
        if( $contents_data_obj[ $($active_content).filter($active_product_tab).attr('id') ] === undefined ) {
            $active_product_height =  0;
        } else {
            $active_product_height =  $contents_data_obj[ $($active_content).filter($active_product_tab).attr('id') ].height;
        }

        console.log( $current_product_height );
        console.log( $active_product_height );
        console.log( $($active_content).filter($active_product_tab).height() );

        $($active_content).not($active_product_tab).transition({
            'opacity': '0.0'
        }, 400 , function(){
            $(this).closest('.content').find('.content_information').height( $current_product_height );
            $($active_content).not($active_product_tab).removeClass('active').hide();
            $(this).closest('.content').find('.content_information').transition({
                'height'    :   $active_product_height
            },400,function(){
                $($active_content).filter($active_product_tab).addClass('active').show().transition({
                    'opacity': '1.0'
                }, 400,function(){
                    $(this).closest('.content').find('.content_information').attr('style','');
                });
            });

        });
    });

});