var popped = ('state' in window.history), initialURL = location.href;

$.extend({
    speedPrint: new Object({
        ajaxHandler: new Object({

            // statics
            bodyFadeIn:         "<div id='fadeIn' class='fade-in'></div>",

            bodyFadeOut:        "<div id='fadeOut' class='fade-out'></div>",
            
            scriptElem:   "<script type='text/javascript' src='$script'></script>",
            
            linkElem:   "<link href='$css' media='screen' rel='stylesheet' type='text/css'>",
            
            duration:       500,
            
            timeOut:        null,
            
            initialPage:    null,
            
            // functions
            
            // get the duration for page switching
            getDuration:    function(){
                return this.duration;
            },
            
            // domLoad, load content to manipulate
            domLoad:        function(get,target,replace){
                var $this = this;
                var duration = this.getDuration();
                var replace = replace;
                
                $.ajax({
                    type: 'GET',
                    url: get
                }).done(function( data ){
                    setTimeout(function(){
                        if( replace === true ) {
                            history.replaceState(new Object({'url':get,'target':target,'myTag':true}),data.title,get.replace('/ajax',''));
                        } else {
                            history.pushState(new Object({'url':get,'target':target,'myTag':true}),data.title,get.replace('/ajax',''));
                        }
                        $this.domInsert(data,target);
                    },duration);
                }).fail(function( data ){
                    setTimeout(function(){
                    },duration);
                });
            },
            
            // domInsert, insert content into document
            // togather with css and scripts
            domInsert:      function(data,target,callback){
                var $this = this;
                var $data = data;
                var duration = this.getDuration();
                if( target === '#body' ){
                    // fadeout current body, then insert new content with a fadein
                    this.domRemove(target,function(){
                            
                            var $fadeIn = $($this.bodyFadeIn);
                            $body = $($data.html);
                            $body.appendTo( $fadeIn );
                            $($fadeIn).find('.carousel_wrapper ul').addClass('notransition');
                            $fadeIn.appendTo(target);
                            
                            // load css dependencies
                            headLink = $data.options.headLink;
                            $.each( headLink, function(i,css){
                                if( $("head link[href=\'" + css  + "\']").length === 0 ){
                                    setTimeout(function(){
                                        $( $this.linkElem.replace("$css",css) ).insertAfter('head link:last-of-type');
                                        
                                        // if inserted element has a carousel wrapper
                                        // make sure the carousel is reset to default position
                                        if( $($fadeIn).find('.carousel_wrapper ul').length > 0 ){
                                            $($fadeIn).find(".carousel_wrapper ul")
                                            .css({
                                                'left'      :       function(){
                                                    var $x1 = $(this).closest('.carousel_wrapper').width() / 2;
                                                    var $x = $x1 - 90;
                                                    return $x + 'px';
                                                }
                                            }).closest('.carousel_wrapper')
                                            .find('.navigation a').eq(0).addClass('focus').nextAll('a').removeClass('focus')
                                            .closest('.carousel_wrapper').find('.prev').addClass('inactive');
                                            setTimeout(function(){
                                                $("#body").find('.carousel_wrapper ul').removeClass('notransition');
                                            },50);
                                        }
                                    },i);
                                }
                            });

                            setTimeout(function(){
                                $switch = $( $("#fadeIn").html() );
                                $switch.appendTo(target);
                                $("#fadeIn").remove();
                                
                                setTimeout(function(){
                                    inlineScript = $data.options.inlineScript;
                                    headScript = $data.options.headScript.reverse();

                                    $.each( headScript, function(i,script){
                                        if( $("head script[src=\'" + script  + "\']").length === 0 ){
                                            setTimeout(function(){
                                                $( $this.scriptElem.replace("$script",script) ).insertAfter('head script:last-of-type');
                                                clearTimeout( $this.timeOut );
                                                $this.timeOut = setTimeout(function(){
                                                    $.each( inlineScript, function(i,script){
                                                        if( $("body script[src=\'" + script  + "\']").length === 0 ){
                                                            setTimeout(function(){
                                                                $( $this.scriptElem.replace("$script",script) ).insertAfter('body script:last-of-type');
                                                            },50*i);
                                                        }
                                                    });
                                                },250);
                                            },50*i);
                                        }
                                    });
                                },duration + 50);
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
                    
            domRemove:      function(target,callback){
                var $this = this;
                var duration = this.getDuration();
                var $fadeOut = $( this.bodyFadeOut );
                $current = $( $( target ).html() );
                $current.prependTo( $fadeOut );

                $( target ).html('');
                $($fadeOut).find('.fade-in').removeClass('fade-in');
                $($fadeOut).prependTo( target );
                
                setTimeout(function(){
                    $($fadeOut).remove();
                    if(typeof callback === 'function'){
                        callback.call();
                    }
                },duration + 50);
            },
            
            domReplace:     function(target,callback){
                var $this = this;
                var duration = this.getDuration();
                
                if(typeof callback === 'function'){
                    callback.call();
                }
            },
                    
            domPopState:    function(e){
                state = e.state;
                
                if( document.location === this.initialPage && this.initialPage !== null ) {
                    console.log( document.location );
                } else {
                    console.log( 'e.state.url       : ' + e.state.url );
                    this.domLoad( e.state.url, e.state.target, true );
                }
            }
        })
    })
});

$(window).bind('popstate', function(e){
    if(e.state.myTag !== undefined){
        if(!e.state.myTag){ return; };
        $.speedPrint.ajaxHandler.domPopState(e);
    };
});

window.onload = function(e) {
    history.replaceState({url:document.URL+'ajax',target:'#body',myTag: true},null,document.URL);
    $.speedPrint.ajaxHandler.initialPage = document.URL;
};