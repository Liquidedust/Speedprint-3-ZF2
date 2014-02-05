/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

console.log( 'productActions: ' + ( $.speedPrint.productActions === undefined ) );

if( $.speedPrint.productActions === undefined ){
    $.extend(
        true,
        $.speedPrint,
        {productActions: new Object({
            typing:         null,
            fran_price:     new Object({
                changed :   false,
                default :   null
            }),
            tabClick:       function(event,e) {
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
            },
            getPrice:       function(e,product,amount) {
                var $e = new Object({'element':e,'product':product,'amount':amount});
                if( $e.product !== undefined && $e.amount !== undefined ) {
                    clearTimeout(this.typing);
                    this.typing = setTimeout(function(){
                        if( $e.product === 'null' || $e.amount.length < 1 || !( parseInt( $e.amount ) >= 1 ) || ( isNaN(parseFloat($e.amount)) && !isFinite($e.amount) ) ) {
                            console.log('invalid');
                            if( $.speedPrint.productActions.fran_price.changed ) {
                                $($e.element).find('p.fran').html("från");
                                $($e.element).find('p.amount').html( $.speedPrint.productActions.fran_price.default + ':-' );
                            }
                        } else {
                            console.log('valid');
                            $e.product = $e.product.split('-');
                            $.getJSON( "/produkter/pris/" + $e.product[0] + "/" + $e.product[1] + "/" + $e.amount , function( data ) {
                                if( !$.speedPrint.productActions.fran_price.changed ) {
                                    $.speedPrint.productActions.fran_price.changed = true;
                                    $.speedPrint.productActions.fran_price.default = parseInt( $($e.element).find('p.amount').html().replace(':-','') );
                                    console.log( 'default: ' + $.speedPrint.productActions.fran_price.default );
                                }

                                if( data.price !== $($e.element).find('p.amount').html().replace(':-','') ) {
                                    $($e.element).transition({
                                        'filter'            :     'blur(5px)',
                                        '-webkit-filter'    :     'blur(5px)'
                                    },100,function(){
                                        $($e.element).find('p.fran').html("styckpris");
                                        $($e.element).find('p.amount').html( data.price + ':-' );
                                            $($e.element).transition({
                                                'filter'            :     'blur(0px)',
                                                '-webkit-filter'    :     'blur(0px)'
                                            },100);
                                    });
                                }
                            });
                        }
                    },1000);
                } else {
                    if( $.speedPrint.productActions.fran_price.changed ) {
                        $($e.element).find('p.fran').html("från");
                        $($e.element).find('p.amount').html( $.speedPrint.productActions.fran_price.default + ':-' );
                    }
                }
            }
        })}
    );
}

console.log( 'productActions: ' + ( $.speedPrint.productActions === undefined ) );

/*
var productActions = new Object({
    typing:         null,
    fran_price:     new Object({
        changed :   false,
        default :   null
    }),
    tabClick:       function(event,e) {
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
    },
    getPrice:       function(e,product,amount) {
        var $e = new Object({'element':e,'product':product,'amount':amount});
        if( $e.product !== undefined && $e.amount !== undefined ) {
            clearTimeout(this.typing);
            this.typing = setTimeout(function(){
                if( $e.product === 'null' || $e.amount.length < 1 || !( parseInt( $e.amount ) >= 1 ) || ( isNaN(parseFloat($e.amount)) && !isFinite($e.amount) ) ) {
                    console.log('invalid');
                    if( productActions.fran_price.changed ) {
                        $($e.element).find('p.fran').html("från");
                        $($e.element).find('p.amount').html( productActions.fran_price.default + ':-' );
                    }
                } else {
                    console.log('valid');
                    $e.product = $e.product.split('-');
                    $.getJSON( "/produkter/pris/" + $e.product[0] + "/" + $e.product[1] + "/" + $e.amount , function( data ) {
                        if( !productActions.fran_price.changed ) {
                            productActions.fran_price.changed = true;
                            productActions.fran_price.default = parseInt( $($e.element).find('p.amount').html().replace(':-','') );
                            console.log( 'default: ' + productActions.fran_price.default );
                        }
                        
                        if( data.price !== $($e.element).find('p.amount').html().replace(':-','') ) {
                            $($e.element).transition({
                                'filter'            :     'blur(5px)',
                                '-webkit-filter'    :     'blur(5px)'
                            },100,function(){
                                $($e.element).find('p.fran').html("styckpris");
                                $($e.element).find('p.amount').html( data.price + ':-' );
                                    $($e.element).transition({
                                        'filter'            :     'blur(0px)',
                                        '-webkit-filter'    :     'blur(0px)'
                                    },100);
                            });
                        }
                    });
                }
            },1000);
        } else {
            if( productActions.fran_price.changed ) {
                $($e.element).find('p.fran').html("från");
                $($e.element).find('p.amount').html( productActions.fran_price.default + ':-' );
            }
        }
    }
});
*/
    
$("#body .container .buy input, #body .container .buy select, #body .container .buy textarea").on('focus', function(e){
    $(this).addClass('active').siblings('label').addClass('active');
}).on('blur', function(e){
    $(this).removeClass('active').siblings('label').removeClass('active');
    $(this).valid();
});

$("#body .container .buy select").on('change', function(){
    var product;
    if( $(this).closest('form').find('select.buy_variant').val() === null ) {
        product = 'null';
    } else {
        product = $(this).closest('form').find('select.buy_variant').val();
    }
    var amount = $(this).closest('form').find('input.antal').val();
    $.speedPrint.productActions.getPrice( $(this).closest('.container').find('div.price'), product, amount );
});

$("#body .container .buy input, #body .container .buy textarea").on('keyup', function(){
    var product;
    if( $(this).closest('form').find('select.buy_variant').val() === null ) {
        product = 'null';
    } else {
        product = $(this).closest('form').find('select.buy_variant').val();
    }
    var amount = $(this).closest('form').find('input.antal').val();
    $.speedPrint.productActions.getPrice( $(this).closest('.container').find('div.price'), product, amount );
});

$("#body .container form.buy input.antal").autoGrowInput({
    maxWidth    :   60,
    minWidth    :   26,
    comfortZone :    8
});

$("#body .container form.buy").find('button').click(function(e){
    e.preventDefault();
    var $this = this;
    
    if( $(this).closest('form').valid() ) {
        $(this).addClass('processing');
        console.log( $(this).closest('form').valid() );
        if( $(this).closest('form').find('select.buy_variant').length >= 1 ){
            console.log( 'select variant : ' + $(this).closest('form').find('select.buy_variant').valid() );
        }
        console.log( 'input.antal    : ' + $(this).closest('form').find('input.antal').valid() );

        $(this).parents('form').submit();
    }
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
    onsubmit        : true,
    submitHandler   : function(form){
        var $this = $(form).find('button.submit');
        
        var data = $(form).find('select').find(':selected',this);
        var amount = parseInt( $(form).find('input.antal').val() );
        
        // console.log( $(form).find('select') );
        console.log( 'id           : ' + data.attr('data-id') );
        console.log( 'name         : ' + data.attr('data-name') );
        console.log( 'icon         : ' + data.attr('data-icon') );
        console.log( 'manufacturer : ' + data.attr('data-manufacturer') );
        console.log( 'price        : ' + data.attr('data-price') );
        console.log( 'amount       : ' + amount );
        console.log( 'vat          : ' );
        
        $button_reset = setTimeout(function(){
            if( data.attr('data-id') in cart.contents ) {
                cart.add({'id':data.attr('data-id'),'amount':amount});
            } else {
                cart.add({
                    id:             data.attr('data-id'),
                    name:           data.attr('data-name'),
                    icon:           data.attr('data-icon'),
                    manufacturer:   data.attr('data-manufacturer'),
                    price:          data.attr('data-price'),
                    'amount':       amount,
                    vat:            25
                });
            }
            $($this).removeClass('processing');
        },1000);
        
        console.log('submit succesful');
        return false;
    },
    rules           : {
        variant     : {
            required    : true
        },
        antal     : {
            required    : true,
            digits      : true
        }
    }
});

$("#body").on("click",".content_tabs a", function(e){
    $.speedPrint.productActions.tabClick( e, $(this) );
});

$(document).ready(function() {
    if(window.location.hash) {
        if( $( window.location.hash ).length > 0 ){
            $.speedPrint.productActions.tabClick( 'scroll', window.location.hash );
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