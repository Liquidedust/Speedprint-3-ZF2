/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

if (!$.support.transition) {
    $.fn.transition = $.fn.animate;
}

$.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.transition({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
$.fn.hasParent = function(objs) {
	// ensure that objs is a jQuery array
	objs = $(objs); var found = false;
	$(this[0]).parents().andSelf().each(function() {
		if ($.inArray(this, objs) !== -1) {
			found = true;
			return false; // stops the each...
		}
	});
	return found;
};

/*
 * A small jQuery extension that disables the propagation of scroll events from the first element in the set of matched elements.
 * Original function by Troy Alford of Stack Overflow.
 * $("#object").scrollLock() enables the lock, and .scrollRelease() disables it.
 */

$.fn.scrollLock=function(){
    return $(this).on("DOMMouseScroll mousewheel",function(h){
        var g=$(this),
            f=this.scrollTop,
            d=this.scrollHeight,
            b=g.height(),
            i=h.originalEvent.wheelDelta,
            a=i>0,
            c=function(){
                h.stopPropagation();
                h.preventDefault();
                h.returnValue=false;
                return false;
            };
        if(!a&&-i>d-b-f){
            g.scrollTop(d);
            return c();
        } else {
            if(a&&i>f){
                g.scrollTop(0);
                return c();
            }
        }
    }
);};
$.fn.scrollRelease=function(){
    return $(this).off("DOMMouseScroll mousewheel");
};

$(document).on({
    mouseenter: function(){
        $(this).scrollLock();
    },
    mouseleave: function(){
        $(this).scrollRelease();
    }
},'#sidebar');

var cart_count = 0;
var search_timer_obj;
var resizeTimer;
var flag_dragging = false;//counter Chrome dragging/text selection issue
var templates = new Object;
var api = new Object({
    jScrollPane: new Object
});

var notransition_timeout;

var functions = new Object({
    isNumber: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    supportsTouch: function() {
        return !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
    }
});

var cookie = new Object({
    create: function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    },
    read: function(name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    erase: function(namename, value, days) {
        cookie.create(name, "", -1);
    }
});

var sidebar = new Object({
    products : new Object({
        tree : new Object({})
    }),
    productTree:    new Object({
        highestZIndex: 0,
        addNode: function(key) {
        },
        deleteNode: function(key) {
        },
        closeChild: function(parent,e){
            
            if(parent === 'all') {
                
            } else if( e.target ) {
                var index_parent = parseInt($(parent).css("zIndex"), 10);
                $("#products .submenu.show").each(function(){
                    var this_index = parseInt($(this).css("zIndex"), 10);
                    if (this_index > index_parent && $(this).hasClass("show") ) {
                        $(this).removeClass("show");
                    }
                });
            }
        },
        findKey: function(key){
            return null;
        },
        findZIndex: function(){
            sidebar.products.productTree.highestZIndex = 0;
            $("#products .submenu").each(function(){
                var index_current = parseInt($(this).css("zIndex"), 10);
                if (index_current > sidebar.products.productTree.highestZIndex) {
                    sidebar.products.productTree.highestZIndex = index_current;
                }
            });
            
            return sidebar.products.productTree.highestZIndex;
        }
    })
});

var cart = new Object({
    elements: new Object(),
    contents: new Object(),
    animations: new Object({
        bounceUp: function(){
            $("#sidebar .toggle .item_count").addClass("bounceUp");
            item_count_bounceUp = setTimeout(function(){
                $("#sidebar .toggle .item_count").removeClass("bounceUp");
            }, 300);
        },
        bounceDown: function(){
            $("#sidebar .toggle .item_count").addClass("bounceDown");
            item_count_bounceDown = setTimeout(function(){
                $("#sidebar .toggle .item_count").removeClass("bounceDown");
            }, 300);
        },
        addItem: function(id){
            
            $("#cart-product-" + id).addClass("addItem");
            item_count_addItem = setTimeout(function(i){
                $("#cart-product-" + id).removeClass("addItem");
            }, 350);
        },
        removeItem: function(id){
            
            $("#cart-product-" + id).addClass("removeItem");
            item_count_addItem = setTimeout(function(i){
                $("#cart-product-" + id).removeClass("removeItem");
            }, 350);
        }
    }),
    increase: function(i,n){
        n = (typeof n === "undefined") ? 1 : n;
        i = i.closest("tr").attr('data-id');
        cart.add({id:i,amount:n});
    },
    decrease: function(i,n){
        n = (typeof n === "undefined") ? 1 : n;
        i = i.closest("tr").attr('data-id');
        cart.remove({id:i,amount:n});
    },
    // i is the amount <span> in the cart that belongs to this specific cart item
    input_amount: function(i) {
        var parent = i.parent();
        var product = new Object({id:i.closest("tr").attr("data-id")});
        var old_amount = cart.contents[ product.id ].amount;
        var new_amount;
        
        i.replaceWith( "<input type='text' value='" + i.html() + "'>");
        parent.children('input').focus();
        parent.children('input').bind('blur keypress', function(e){
            if( e.type === 'blur' || ( e.type === 'keypress' && e.which === 13 ) ) {
                
                if( functions.isNumber( parent.children('input').val() ) ){
                    if( parent.children('input').val() <= 0 ){
                        new_amount = 0;
                    } else {
                        new_amount = parent.children('input').val();
                    }
                } else {
                    new_amount = old_amount;
                }
                
                $(this).replaceWith("<span>" + new_amount + "</span>");
                cart.contents[ product.id ].amount = parseInt( new_amount );
                
                $("#cart-product-" + product.id + " > td.sum span span").html(
                    parseInt( cart.contents[product.id].amount * cart.contents[product.id].price )
                );
                    
                if( new_amount > old_amount ){
                    cart.animations.addItem(product.id);
                    cart.animations.bounceUp();
                } else if( old_amount > new_amount ) {
                    cart.animations.removeItem(product.id);
                    cart.animations.bounceDown();
                }
            
                if( parseInt( cart.contents[product.id].amount ) <= 0 ){
                    cart.flush(product);
                }

                cart.count();
                cart.value();
                cart.to_cookie();
            
                parent.children('span').click( function(){
                    $this = $(this);
                    cart.input_amount( $this );
                });
            }
        });
    },
    amount: function(i,n) {
        
    },
    add: function(product,animate) {
        
        if( product.id in cart.contents ) {
            cart.contents[product.id].amount = parseInt( cart.contents[product.id].amount + product.amount );

            $("#cart-product-" + product.id + " > td.amount > span").html(
                cart.contents[product.id].amount
            );
                
            $("#cart-product-" + product.id + " > td.amount > input").val(
                cart.contents[product.id].amount
            );
                
            $("#cart-product-" + product.id + " > td.sum span span").html(
                parseInt( cart.contents[product.id].amount * cart.contents[product.id].price )
            );
            
            cart.animations.addItem(product.id);
            cart.count();
            cart.value();
        } else {
            cart.contents[product.id] = new Object({
                id:             product.id,
                name:           product.name,
                icon:           product.icon,
                manufacturer:   product.manufacturer,
                price:          product.price,
                amount:         product.amount,
                vat:            product.vat
            });
            
            var insert_item;
            
            if( 'cart_item' in templates ){
                var template = templates['cart_item'];
                
                template = template.replace(":product_id", product.id);
                template = template.replace(":product_id", product.id);
                template = template.replace(":sum", product.amount * product.price);
                for(var item in cart.contents[product.id]){
                    template = template.replace(new RegExp(":" + item, 'g'), cart.contents[product.id][item]);
                }
        
                cart.insert( template, product.id, animate );
                
                cart.animations.addItem(product.id);
                cart.count();
                cart.value();
            } else {
                $.get("/templates/cart_item.php", function(data){
                    templates['cart_item'] = data;
                    var template = templates['cart_item'];
                
                    template = template.replace(":product_id", product.id);
                    template = template.replace(":product_id", product.id);
                    template = template.replace(":sum", product.amount * product.price);
                    for(var item in cart.contents[product.id]){
                        template = template.replace(':' + item, cart.contents[product.id][item]);
                    }
                    
                    cart.insert( template, product.id, animate );

                    cart.count();
                    cart.value();
                });
            }
        }
        
        cart.animations.bounceUp();
        cart.to_cookie();
    },
    remove: function(product){

        if( product.id in cart.contents ) {
            
            if(product.amount === 'all') {
                product.amount = cart.contents[product.id].amount;
            }
            
            cart.contents[product.id].amount = parseInt( cart.contents[product.id].amount - product.amount );

            $("#cart-product-" + product.id + " > td.amount > span").html(
                cart.contents[product.id].amount
            );
            $("#cart-product-" + product.id + " > td.amount > input").val(
                cart.contents[product.id].amount
            );

            $("#cart-product-" + product.id + " > td.sum span span").html(
                parseInt( cart.contents[product.id].amount * cart.contents[product.id].price )
            );
            
            if( parseInt( cart.contents[product.id].amount ) <= 0 ){
                cart.flush(product);
            }
        
            cart.animations.bounceDown();
            cart.animations.removeItem(product.id);
            
        } else {
        }

        cart.count();
        cart.value();
        cart.to_cookie();
    },
    flush: function(product){
        delete cart.contents[product.id];
        $("#cart-product-" + product.id).css({"height": "45px"}).find('td').fadeOut(function(){
            $("#cart-product-" + product.id).transition({
                'height': '0px'
            }, function(){
                $(this).remove();
            });
        });
    },
    value: function() {
        var subtotal = 0;
        var vat = 0;
        var rounding = 0;
        var total = 0;

        $.each( cart.contents, function(index,value){
            subtotal = subtotal + (value.price * value.amount);
            vat = vat + ( value.price * value.amount * ( value.vat/100 ) );
        });
        
        if( subtotal + vat - Math.floor(subtotal + vat) > 0 ){
            rounding = Math.abs( ( subtotal + vat - Math.floor(subtotal + vat) ) - 1 );
        } else {
            rounding = 0;
        }

        total = Math.ceil( subtotal + vat );

        $("#sidebar-subtotal > span").html( subtotal );
        $("#sidebar-vat > span").html( vat );
        $("#sidebar-rounding > span").html( rounding );
        $("#sidebar-total > span").html( total );
    },
    count: function(){
        cart_count = 0;
        $.each( cart.contents, function(index,value){
            cart_count = cart_count + value.amount;
        });
        
        $cart_count = $("#sidebar-cart > p > span");
        $item_count = $("#sidebar .toggle .item_count");
        
        if( cart_count >= 1 ){
            $cart_count.html( cart_count );
            
            $item_count.removeClass('twenty fifty hundred');
            
            if( cart_count > 99 ){
                cart_count = "99+";
                $item_count.addClass('hundred');
            } else if( cart_count >= 50 ) {
                $item_count.addClass('fifty');
            } else if( cart_count >= 20 ) {
                $item_count.addClass('twenty');
            }
            $item_count.html( cart_count ).addClass('items');
        } else {
            $cart_count.html( "Inga" );
            $item_count.html( 0 ).removeClass('items');
        }
    },
    insert: function(template,id,animate){
        
        $("#sidebar-cart table tbody").append( $.parseHTML( template ) );
        
        if(animate!==false) {
            $("#sidebar-cart table tbody tr[data-processed=false] ").transition({
                'height': '45px'
            },function(){
                $(this).removeAttr("style");
                $(this).find('td').css({'display':'table-cell'}).transition({
                    'opacity':  '1.0'
                }, function(){
                    $(this).removeAttr("style");
                });
            });
        } else {
            $("#sidebar-cart table tbody tr[data-processed=false] ")
                    .css({'height': '45px'})
                    .removeAttr("style")
                    .find('td')
                    .css({'display':'table-cell','opacity':  '1.0' })
                    .removeAttr("style");
        }
        
        cart.elements[id] = $("#sidebar-cart table tbody tr[data-processed=false]");
        cart.elements[id].removeAttr("data-processed");
        
        cart.elements[id].find(".increase_amount").click( function(){
            $this = $(this);
            $this.addClass('active');
            cart.increase( $this, 1 );
        });
        cart.elements[id].find(".increase_amount").mousedown(function(){
            $this = $(this);
            cart_interact_timeout = setTimeout(function(){
                cart_interact_interval = setInterval(function(){
                    cart.increase( $this,1 );
                }, 100);
            }, 250);
            return false;
        });
        
        cart.elements[id].find(".decrease_amount").click( function(){
            $this = $(this);
            cart.decrease( $this,1 );
        });
        cart.elements[id].find(".decrease_amount").mousedown(function(){
            $this = $(this);
            $this.addClass('active');
            cart_interact_timeout = setTimeout(function(){
                cart_interact_interval = setInterval(function(){
                    cart.decrease( $this,1 );
                }, 100);
            }, 250);
            return false;
        });
        
        cart.elements[id].find("div.delete").click( function(){
            $this = $(this);
            cart.decrease( $this, 'all' );
        });
        
        cart.elements[id].find("td.amount span").click( function(){
            $this = $(this);
            cart.input_amount( $this );
        });

        $(document).mouseup(function(){
            if(typeof cart_interact_timeout !== "undefined"){
                clearTimeout(cart_interact_timeout);
              }
              if(typeof cart_interact_interval !== "undefined"){
                clearInterval(cart_interact_interval);
              }
            return false;
        });
    },
    to_cookie: function(){
        cookie.create('cart', JSON.stringify( cart.contents ) );
    },
    from_cookie: function(){
        for( var key in cart_cookie = JSON.parse( cookie.read('cart') ) ) {
            cart.add({
                id:             cart_cookie[key]['id'],
                name:           cart_cookie[key]['name'],
                icon:           cart_cookie[key]['icon'],
                manufacturer:   cart_cookie[key]['manufacturer'],
                price:          cart_cookie[key]['price'],
                amount:         cart_cookie[key]['amount'],
                vat:            cart_cookie[key]['vat']
            },false);
        }
    }
});

var lds_carousel = new Object({
    elements: new Object({}),
    contents: new Object({})
});

function resizeDone() {
    $('#sidebar').removeClass('notransition');
    $("#body .container:not(.product) .content").dotdotdot();
    $("#sidebar-cart .name").dotdotdot();
};

function toggleSideBar(){
    if( $('#sidebar').hasClass('maximized') ) {
        $('#sidebar').removeClass('maximized');
        cookie.create('sidebar','closed');
    } else {
        $('#sidebar').addClass('maximized');
        cookie.create('sidebar','open');
    }
}

function closeSideBar(){
    if( $('#sidebar').hasClass('maximized') ){
        $('#sidebar').removeClass('maximized');
        cookie.create('sidebar','closed');
    }
}

if( cookie.read("sidebar") === 'open' ){
    $('#sidebar').addClass('notransition');
    $('#sidebar').addClass('maximized');
    $('#sidebar').height();
    $('#sidebar').removeClass('notransition');
}

if( cookie.read("active_tab") ){
    $("#sidebar .toggle").removeClass('active');
    $("#sidebar .toggle[data-for=" + cookie.read("active_tab") + "]").addClass('active');
    active_tab = "#sidebar .content[data-tab="+cookie.read("active_tab")+"]";

    $("#sidebar .content").not(active_tab).transition({
        'opacity': '0.0'
    }, 0 , function(){
        $("#sidebar .content").not(active_tab).hide();

        $(active_tab).show().transition({
            'opacity': '1.0'
        }, 0);
    });
}

// $("input[name=listformat]").removeProp('checked');
if( cookie.read("list-format") ) {
    $("input[name=listformat][data-format=" + cookie.read("list-format") + "]").prop('checked', true);
} else {
    $("input[name=listformat][data-format=expanded]").prop('checked', true);
}
/*
if( $(document).width() >= 1100 ){
    $("#sidebar").addClass("maximized");
}
*/
if( $(document).width() <= 1099 && cookie.read("sidebar") !== 'open' ){
    $("#sidebar").removeClass("maximized");
}

$(window).resize(function() {
    $('#sidebar').addClass('notransition');
    $("#sidebar-cart .name").dotdotdot();
    $('#sidebar').height();
    
    $.each(api.jScrollPane, function(index, value) {
        value.reinitialise();
    });
    
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeDone, 250);
});

$(window).scroll(function(){ 
    var offset = $("#header_wrapper").height() - $("#menu_wrapper").height();
    var sticky = false;
    var top = $(window).scrollTop();
    
    $("#header_wrapper").addClass("notransition");
    $("#menu_wrapper").addClass("notransition");
    
    clearTimeout( notransition_timeout );
    notransition_timeout = setTimeout(function(){
        $("#header_wrapper").removeClass("notransition");
        $("#menu_wrapper").removeClass("notransition");
    },500);
    
    if ($("#header_wrapper").offset().top <= top - offset) {
        $("#menu_wrapper").removeClass("sticky_return").addClass("sticky");
        sticky = true;
        
    } else { 
        if( $("#menu_wrapper").hasClass('sticky') ) {
            $("#menu_wrapper").removeClass("sticky").find('#menu').addClass('sticky_return');
        }
    }
});

// Reset Cart on Page Load
cart.count();
cart.from_cookie();

// Hide Page Body
// $("#body .container").addClass('no-opacity');

$("#sidebar .toggle > a, a[data-sidebar=open]").click(function(event){
    if( !$('#sidebar').hasClass('maximized') || $(this).closest(".toggle").hasClass('active') ) {
        toggleSideBar();
    }

    $("#sidebar .toggle").removeClass('active');

    active = this;

    if( $(this).attr('data-sidebar') ) {
        console.log( "debug >>> " + 'yes' );

        active = $("#sidebar .toggle[data-for=" + $(this).attr('data-for') + "] > a");
    }

    $(active).closest('.toggle').addClass('active');

    active_tab = $(active).closest('.toggle').attr('data-for');
    cookie.create('active_tab',active_tab);
    active_tab = "#sidebar .content[data-tab="+active_tab+"]";

    $("#sidebar .content").not(active_tab).transition({
        'opacity': '0.0'
    }, 400 , function(){
        
        $(this).hide();
        
        $("#sidebar .content").not(active_tab).hide();

        $(active_tab).show().transition({
            'opacity': '1.0'
        }, 400);

    });

});

$("#sidebar > .close > a").click(function(){
    closeSideBar();
});

$("*[data-sidebar=open],*[data-sidebar-interact=true]").hover(function(){
    $("#sidebar .toggle[data-for=" + $(this).attr('data-for') + "]").addClass("hovering");
}, function(){
        $("#sidebar .toggle[data-for=" + $(this).attr('data-for') + "]").removeClass("hovering");
});

$("input[data-sidebar=open]").on('focus', function(){
    $("#sidebar .toggle[data-for=" + $(this).attr('data-for') + "]").addClass("hovering");
});

$("input[data-sidebar=open]").on('blur', function(){
    $("#sidebar .toggle[data-for=" + $(this).attr('data-for') + "]").removeClass("hovering");
});


$("#body .container:not(.product) .content").dotdotdot();
$("#sidebar-cart .name").dotdotdot();

$(document).on('click',"input[name=listformat]",function(){
    cookie.create('list-format',$(this).attr('data-format'));
});

$(document).on('change',"input[name=listformat]",function(){
    $("#body .container .content").dotdotdot();
});

$(document).on('click',".list-type",function(){
    $("#body #do_compare").removeAttr('style');
});

$('.search').siblings(".empty").bind('click',function(){
    $(".search").val('').focus().delay(300),focus();
});

$('.search').change(function(){
    $(this).mouseleave();
});

/**********************************/
/****  Body Container Actions  ****/
/**********************************/

$('#body').on('mouseenter','.actions a',function(){
    $(this).closest(".header").css({'overflow':'visible'});
});

$('#body').on('mouseleave','.container',function(){
    $(this).find("div.header").css({'overflow':'hidden'});
});

// Add items to cart
/*
$("#body .actions a[href=#buy]").click(function(e){
    e.preventDefault();
});
$("#body .actions a[href=#buy]:not(.has-children)").click(function(e){
    e.preventDefault();
    var data = $(this).siblings('div.data');
    if( data.attr('data-id') in cart.contents ) {
        cart.add({id:data.attr('data-id'),amount:1});
    } else {
        cart.add({
            id:             data.attr('data-id'),
            name:           data.attr('data-name'),
            icon:           data.attr('data-icon'),
            manufacturer:   data.attr('data-manufacturer'),
            price:          data.attr('data-price'),
            amount:         1,
            vat:            data.attr('data-vat')
        });
    }
});
*/
$(document).on('click','.actions a[href=#buy]',function(e){
    e.preventDefault();
});
$(document).on('click','.actions a[href=#buy]:not(.has-children)',function(e){
    e.preventDefault();
    var data = $(this).siblings('div.data');
    if( data.attr('data-id') in cart.contents ) {
        cart.add({id:data.attr('data-id'),amount:1});
    } else {
        cart.add({
            id:             data.attr('data-id'),
            name:           data.attr('data-name'),
            icon:           data.attr('data-icon'),
            manufacturer:   data.attr('data-manufacturer'),
            price:          data.attr('data-price'),
            amount:         1,
            vat:            data.attr('data-vat')
        });
    }
});

// Add items to compare
$("#body .actions .compare").click(function(e){
    
    if( $(this).is(':checked') ){
        $(this).closest('.actions').addClass('active-compare');
    } else{
        $(this).closest('.actions').removeClass('active-compare');
    }
    
    setTimeout(function() {
        $("#body #do_compare .item_count span:first-child").html( $("#body .actions .compare:checked").size() );
        if( $("#body .actions .compare:checked").size() >= 2 ){

            setTimeout(function() {
                if( $("#body .actions .compare:checked").size() >= 2 ){
                    $("#body #do_compare").addClass('active');
                }
            }, 250);

        } else {

            $("#body #do_compare").removeClass('active');

            setTimeout(function() {
                if( !$("#body .actions .compare:checked").size() >= 2 ){
                    $("#body #do_compare").removeAttr('style');
                }
            }, 250);

        }
    }, 100);
});

$('#sidebar li').hover(function(e){
    $(this).siblings('li').stop(true,true).transition({
        opacity     :       0.5
    });
},function(e){
    $(this).siblings('li').stop(true,true).transition({
        opacity     :       1.0
    });
});

/**********************************/
/****    Body Containers on    ****/
/****     Document.Ready       ****/
/**********************************/

/*
$("#header_top a").click(function(e){
    if( $(this).find("div.logo_wrapper:last-child").hasClass("slideIn") ){
        $(this).find("div.logo_wrapper:last-child").removeClass("slideIn");
    } else {
        $(this).find("div.logo_wrapper:last-child").addClass("slideIn");
    }
});
*/

$.fn.spin.presets.speedprint = {
  lines: 17, // The number of lines to draw
  length: 37, // The length of each line
  width: 13, // The line thickness
  radius: 60, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#0290D0', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

$(document).ready(function(){
    $('body').removeClass('preload');
    $("body").removeClass("preload",function(){
        $('#body .container').each(function(i) {
            $(this).css({opacity:0}).delay(250*i).transition({opacity:1}).queue(function(next){
                
                $(this).find(".carousel").each(function(i){
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
                });
            });
        });
                        
        $("#products").load("/menu",function(){
        
            $("#products a").click(function(e){
                var $this = $(this);
                e.preventDefault();
                
                if( $this.siblings('ul.child').length > 0 ) {
                    var $id = '#submenu_category_' + $this.attr('href').split(/\//)[2];
                    if( $( $id ).length > 0 ) {
                        setTimeout(function(){
                            $( $id ).addClass('show');
                        },50);
                    } else {
                        var $clone = $this.siblings('ul.child').clone(true);
                        var $submenu = $(document.createElement('div'));
                        $submenu.attr('id', 'submenu_category_' + $this.attr('href').split(/\//)[2] )
                                .addClass('submenu')
                                .css({
                                    'z-index'       : 10000 + $this.attr('data-depth'),
                                    'width'         : 'calc( 100% - ' + ( ( 19 * $this.attr('data-depth') ) ) + 'px)',
                                    'height'        : '100%'
                                })
                                .prepend("<h2>" + $this.find("span").html() + "</h2>")
                                .prepend("<div class='close'><a><img src='/img/ui/icons/left_arrow.svg' alt='close sidebar'></a></div>")
                                .append( $clone );
                        $submenu.prependTo("#products");
                        setTimeout(function(){
                            $submenu.addClass('show');
                            $submenu.bind('click',function(e){
                                sidebar.productTree.closeChild( $(this), e );
                            });
                        },50);
                        $( $id ).find("div.close a").bind('click',function(){
                            if( $( $id ).hasClass('show') ) {
                                $( $id ).removeClass('show');
                            } else {
                                $( $id ).addClass('show');
                            }
                        });
                        
                    }
                }
            });
        });
        
        $("#products").click(function(e){
            if( !$( e.target ).hasParent(".submenu") ) {
                $(".submenu").each(function(){
                    if( $(this).hasClass("show") ) {
                        $(this).removeClass("show");
                    }
                });
            }
        });
        
    });
});