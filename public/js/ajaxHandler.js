var popped = ('state' in window.history), initialURL = location.href;

$.extend({
    speedPrint: new Object({
        
        ajaxHandler:        new Object({

            // statics and variables
            bodyFadeIn:             "<div id='fadeIn' style='opacity:0;'></div>",

            bodyFadeOut:            "<div id='fadeOut' style='opacity:1;'></div>",
            
            scriptElem:             "<script type='text/javascript' src='$script'></script>",
            
            linkElem:               "<link href='$css' media='screen' rel='stylesheet' type='text/css'>",
            
            duration:               500,
            
            timeOut:                null,
            
            initialPage:            null,
            
            currentlocation:        null,
            
            // functions
            
            getLocation:            function() {
                return location.pathname + location.search;
            },
            
            // get the duration for page switching
            getDuration:            function(){
                return this.duration;
            },
            
            // domLoad, load content to manipulate
            domLoad:                function(get,target,newlocation,replace,popstate){
                var $this = this;
                var duration = this.getDuration();
                var replace = replace;
                var newLocation = newLocation;
                
                if( !popstate ) {
                    if( $("#page_loading").length === 0 ) {
                        $("body").append( $("<div id='page_loading'></div>") );
                        $("#page_loading").spin('speedprint');
                    }
                    $("#page_loading").show().transition({
                        opacity: 1.0
                    });
                }
                
                $.ajax({
                    type: 'GET',
                    url: get,
                    cache: false
                }).done(function( data ){
                    setTimeout(function(){
                        pattern = ( get === '/ajax' ) ? '/' : '';
                        if( replace === true ) {
                            history.replaceState(new Object({'url':get,'target':target,'myTag':true}),data.title,get.replace('/ajax',pattern));
                        } else {
                            history.pushState(new Object({'url':get,'target':target,'myTag':true}),data.title,get.replace('/ajax',pattern));
                        }
                        if( data.title !== '' ) {
                            document.title = data.title + ' :: SpeedPrint 3.0';
                        } else {
                            document.title = 'SpeedPrint 3.0';
                        }
                        $("#page_loading").transition({
                            opacity: 0.0
                        }).delay(300).hide();
                        
                        // Set the location for popstates identification
                        $this.currentLocation = newLocation;
                        
                        // Insert node from get
                        $this.domInsert(data,target);
                    },duration);
                }).fail(function( data ){
                    console.log('failure');
                    setTimeout(function(){
                        $("#page_loading").transition({
                            opacity: 0.0
                        }).delay(300).hide();
                    },duration);
                });
            },
            
            // domInsert, insert content into document
            // togather with css and scripts
            domInsert:              function(data,target,callback){
                var $this = this;
                var $data = data;
                var duration = this.getDuration();
                if( target === '#body' ){
                    // fadeout current body, then insert new content with a fadein
                            
                    // load css dependencies
                    headLink = $data.options.headLink;
                    $.each( headLink, function(i,css){
                        if( $("head link[href=\'" + css  + "\']").length === 0 ){
                            setTimeout(function(){
                                $( $this.linkElem.replace("$css",css) ).insertAfter('head link:last-of-type');
                            },i);
                        }
                    });
                            
                    this.domRemove(target,function(){
                            
                            var $fadeIn = $($this.bodyFadeIn);
                            $body = $($data.html);
                            $body.appendTo( $fadeIn );
                
                            $($fadeIn).find('.carousel_wrapper ul').addClass('notransition');
                            $fadeIn.appendTo(target);
                            
                            // fadein the new body
                            $fadeIn.transition({
                                opacity: 1.0
                            });
                            
                            $this.changeListFormat();
                                        
                            // if inserted element has a carousel wrapper
                            // make sure the carousel is reset to default position
                            // and bind swipe events
                            if( $($fadeIn).find('.carousel_wrapper ul').length > 0 ){
                                $.speedPrint.carouselHandler.initialState( $($fadeIn).find('.carousel_wrapper ul') );
                                $.speedPrint.carouselHandler.bindEvents( $($fadeIn).find('.carousel_wrapper') );
                            }

                            setTimeout(function(){
                                $switch = $( $("#fadeIn").html() );
                                $switch.appendTo(target);
                                $("#fadeIn").remove();
                
                                $this.changeListFormat();
                                
                                // image carousel code
                                // hide carousel controls if there is only one item in carousel
                                if( $('.carousel').size() <= 1 ) {
                                    $('.carousel').each(function(i){
                                        if( $(this).find('ul li').size() <= 1 ){
                                            $(this).find('.lds_carousel_ui').hide();
                                        }
                                
                                        // Add youtube watermarks to youtube images
                                        // @TODO youtube watersmarks on remote video linking
                                        if( $(this).find('img.youtube').size() >= 1 ){
                                            
                                        }
                                    });
                                }
                                
                                console.log( 'BACON!' + Math.random() );
                                
                                inlineScript = $data.options.inlineScript;
                                headScript = $data.options.headScript.reverse(); // so they are applied in correct order, this since ZF2 outputs them in reverse.
                                
                                // @TODO still a darn mess, but getting there eventually just have to get the queue working for me, instead of against me!
                                $('body').queue(function(next){ // headScripts before we do inlineScripts
                                    headScriptLength = headScript.length - 1;
                                    console.log( 'headscript length : ' + headScriptLength );
                                    
                                    $.each( headScript, function(i,script){
                                        setTimeout(function(){
                                            if( i === headScriptLength ){
                                                $.speedPrint.ajaxHandler.domHeadScript(script,next());
                                            } else {
                                                $.speedPrint.ajaxHandler.domHeadScript(script);
                                            }
                                        },i*25);
                                    });
                                }).queue(function(next){ // after headScripts we do inlineScripts
                                    inlineScriptLength = inlineScript.length - 1;
                                    console.log( 'inlinescript length : ' + headScriptLength );
                                    
                                    $.each( inlineScript, function(i,script){
                                        setTimeout(function(){
                                            if( i === inlineScriptLength ){
                                                $.speedPrint.ajaxHandler.domInlineScript(script,next());
                                            } else {
                                                $.speedPrint.ajaxHandler.domInlineScript(script);
                                            }
                                        },i*25);
                                    });
                                }).queue(function(next){ // finally bind all actions to elements
                                    // If there is one or more buy forms on the page
                                    // Initialize form validation and action binding code
                                    // @TODO needs to be fixed properly, right now its not certain that the required scripts are included prior to functions are called
                                    
                                    console.log('form.buy.size() : ' + $('form.buy').size());
                                    
                                    if( $('form.buy').size() >= 1 ){
                                        formLength = $('form.buy').size() - 1;
                                        $('form.buy').each(function(i){
                                            if( i === formLength ){
                                                $.speedPrint.buyFormHandler.processForm( $(this), next() );
                                            } else {
                                                $.speedPrint.buyFormHandler.processForm( $(this) );
                                            }
                                        });
                                    }
                                }).queue(function(next){
                                    if( $('section.product_box').size() >= 1 ){
                                        $('section.product_box').each(function(i){
                                            $.speedPrint.productActions.bindActions(this);
                                        });
                                    }
                                });
                                
                            },duration + 50);
                        
                        if(typeof callback === 'function'){
                            callback.call();
                        }
                    });
                } else {
                    if(typeof callback === 'function'){
                        callback.call();
                    }
                }
            },
                    
            domRemove:              function(target,callback){
                var $this = this;
                var duration = this.getDuration();
                var $fadeOut = $( this.bodyFadeOut );
                $current = $( $( target ).html() );
                $current.prependTo( $fadeOut );

                $( target ).html('');
                $($fadeOut).find('.fade-in').removeClass('fade-in');
                $($fadeOut).prependTo( target );
                
                // fadeout the previous body
                $fadeOut.transition({
                    opacity: 0.0
                });
                
                this.changeListFormat();
                
                setTimeout(function(){
                    $($fadeOut).remove();
                    if(typeof callback === 'function'){
                        callback.call();
                    }
                },duration + 50);
            },
            
            domReplace:             function(target,callback){
                var $this = this;
                var duration = this.getDuration();
                
                if(typeof callback === 'function'){
                    callback.call();
                }
            },
                    
            domPopState:            function(e,newLocation){
                state = e.state;
                console.log( 'document.location.href : ' + document.location.href );
                if( document.location === this.initialPage && this.initialPage !== null ) {
                    console.log( document.location );
                } else {
                    console.log( 'e.state.url       : ' + e.state.url );
                    this.domLoad( e.state.url, e.state.target,newLocation,true,true);
                }
            },
            
            changeListFormat:       function() {
                if( $("input[name=listformat]").length >= 1 ) {
                    if( cookie.read("list-format") ) {
                        $("input[name=listformat][data-format=" + cookie.read("list-format") + "]").prop('checked', true);
                    } else {
                        $("input[name=listformat][data-format=expanded]").prop('checked', true);
                    }
                }
            },
            
            domHeadLink:            function(link,callback){
                if(typeof callback === 'function'){
                    callback.call();
                }
            },
            
            domHeadScript:          function(script,callback){
                if( $("head script[src=\'" + script  + "\']").length === 0 ){
                    $( this.scriptElem.replace("$script",script) ).insertAfter('head script:last-of-type');
                }
                if(typeof callback === 'function'){
                    callback.call();
                }
            },
            
            domInlineScript:        function(script,callback){
                if( $("body script[src=\'" + script  + "\']").length === 0 ){
                    $( this.scriptElem.replace("$script",script) ).insertAfter('body script:last-of-type');
                }
                if(typeof callback === 'function'){
                    callback.call();
                }
            }
        }),
        
        carouselHandler:    new Object({
            // reset carousel to initial state
            initialState:   function(e){
                $(e)
                .css({
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
                setTimeout(function(){
                    $("#body").find('.carousel_wrapper ul').removeClass('notransition');
                },50);
            },
            
            bindEvents:     function(element){
                
                var element = element;
                
                $(element)
                .bind('swipeleft', function(e){
                    var $active = $(this);
                    console.log( 'swipe : left' );
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
                })
                .bind('swiperight', function(e){
                    var $active = $(this);
                    console.log( 'swipe : right' );
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
                });
                /*
                setTimeout(function(){
                    $.each($._data(element, "events"), function(i, e) {
                        console.log(i, e);
                    });
                },1000);
                */
            }
        }),
        
        buyFormHandler:     new Object({
            
            processForm:    function(forms,callback){
                forms.each(function(index){
                    $.speedPrint.buyFormHandler.bindActions( $(this) );
                });
                if(typeof callback === 'function'){
                    callback.call();
                }
            },
                    
            bindActions:   function(form,callback) {
                $( form ).find("input,select,textarea").on('focus', function(e){
                    $(this).addClass('active').siblings('label').addClass('active');
                }).on('blur', function(e){
                    $(this).removeClass('active').siblings('label').removeClass('active');
                    $(this).valid();
                });
                console.log('focus');

                $( form ).find("select").on('change', function(){
                    var product;
                    if( $(this).closest('form').find('select.buy_variant').val() === null ) {
                        product = 'null';
                    } else {
                        product = $(this).closest('form').find('select.buy_variant').val();
                    }
                    var amount = $(this).closest('form').find('input.antal').val();
                    $.speedPrint.productActions.getPrice( $(this).closest('.container').find('div.price'), product, amount );
                });
                console.log('select');

                $( form ).find("input,textarea").on('keyup', function(){
                    var product;
                    if( $(this).closest('form').find('select.buy_variant').val() === null ) {
                        product = 'null';
                    } else {
                        product = $(this).closest('form').find('select.buy_variant').val();
                    }
                    var amount = $(this).closest('form').find('input.antal').val();
                    $.speedPrint.productActions.getPrice( $(this).closest('.container').find('div.price'), product, amount );
                });
                console.log('keyup');
                
                $( form ).find("input.antal").autoGrowInput({
                    maxWidth    :   60,
                    minWidth    :   26,
                    comfortZone :    8
                });
                console.log('autogrowinput');

                $( form ).find('button').click(function(e){
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
                console.log('submit click');
            }
            
        }),
        
        productActions: new Object({
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
            },
            bindActions:    function(e,callback) {
                $this = e;
                console.log('binding product actions!');
            }
        })
    })
});

$.speedPrint.ajaxHandler.currentLocation = $.speedPrint.ajaxHandler.getLocation();

window.onpopstate = function(e){
    var newLocation = $.speedPrint.ajaxHandler.getLocation();
    if(newLocation !== $.speedPrint.ajaxHandler.currentLocation) {
        console.log( e );
        if(e.state.myTag !== undefined){
            if(!e.state.myTag){ return; };
            $.speedPrint.ajaxHandler.domPopState(e, newLocation);
        };
    }
};

window.onload = function(e) {
    history.replaceState({url:document.URL+'ajax',target:'#body',myTag: true},null,document.URL);
    $.speedPrint.ajaxHandler.initialPage = document.URL;
};

$(document).on('click','a.ajax',function(e){
    e.preventDefault();
    href = $(this).attr('href') === '/' ? '/ajax' : $(this).attr('href') + "\/ajax";
    var newLocation = $(this).attr('href');
    if(newLocation !== $.speedPrint.ajaxHandler.currentLocation) {
        $.speedPrint.ajaxHandler.domLoad( href , '#body', newLocation );
    }
});