if (!$.support.transition) {
    $.fn.transition = $.fn.animate;
}

$.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.transition({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};

var cart_count = 0;
var search_timer_obj;
var resizeTimer;
var flag_dragging = false;//counter Chrome dragging/text selection issue
var templates = new Object;

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
                    new_amount = parent.children('input').val();
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
    add: function(product) {
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
                    
                cart.insert( template, product.id );
                
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
                    
                    cart.insert( template, product.id );

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
                delete cart.contents[product.id];
                delete cart.elements[product.id]
                $("#cart-product-" + product.id).css({"height": "45px"}).find('td').fadeOut(function(){
                    $("#cart-product-" + product.id).transition({
                        'height': '0px'
                    }, function(){
                        $(this).remove();
                    });
                });
            }
        
            cart.animations.bounceDown();
            cart.animations.removeItem(product.id);
            
        } else {
        }

        cart.count();
        cart.value();
        cart.to_cookie();
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
    insert: function(template,id){
        
        $("#sidebar-cart table tbody").append( $.parseHTML( template ) );
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
        
        cart.elements[id] = $("#sidebar-cart table tbody tr[data-processed=false]");
        cart.elements[id].removeAttr("data-processed");
        
        console.log( cart.elements[id] );
        
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
            });
        }
    },
});

function resizeDone() {
    $('#sidebar').removeClass('notransition');
    $("#body .container .content").dotdotdot();
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

if( cookie.read("list-format") ) {
    $("input[name=listformat][data-format=" + cookie.read("list-format") + "]").prop('checked', true);
}

if( $(document).width() >= 1100 ){
    $("#sidebar").addClass("maximized");
}

if( $(document).width() <= 1099 && cookie.read("sidebar") !== 'open' ){
    $("#sidebar").removeClass("maximized");
}

$(window).resize(function() {
    $('#sidebar').addClass('notransition');
    $("#sidebar-cart .name").dotdotdot();
    $('#sidebar').height();

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeDone, 250);
});


$(window).scroll(function(){ 
    var offset = $("#header_wrapper").height() - $("#menu_wrapper").height();
    var sticky = false;
    var top = $(window).scrollTop();
    
    $("#header_wrapper").addClass("notransition").delay(250).removeClass("notransition",0);
    $("#menu_wrapper").addClass("notransition").delay(250).removeClass("notransition",0);
    
    if ($("#header_wrapper").offset().top <= top - offset) {
        $("#menu_wrapper").addClass("sticky");
        sticky = true;
    } else { 
        if( $("#menu_wrapper").hasClass('sticky') ) {
            $("#menu_wrapper").removeClass("sticky");
        }
    }
});

// Reset Cart on Page Load
cart.count();
cart.from_cookie();

// Hide Page Body
$("#body .container").addClass('no-opacity');

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

$("input[name=listformat]").click(function(){
    cookie.create('list-format',$(this).attr('data-format'));
});

$('.search').siblings(".empty").bind('click',function(){
    $(".search").val('').focus().delay(300),focus();
});

$('.search').change(function(){
    $(this).mouseleave();
});

$("#body .container .content").dotdotdot();
$("#sidebar-cart .name").dotdotdot();

$("input[name=listformat]").change(function(){
    $("#body .container .content").dotdotdot();
});

$("#body .list-type").click(function(){
    $("#body #do_compare").removeAttr('style');
});

/**********************************/
/****  Body Container Actions  ****/
/**********************************/

$("#body .actions").hover(function(){
    $(this).closest(".header").css({'overflow':'visible'});
});

$("#body > .container").mouseleave(function(){
    $(this).find("div.header").css({'overflow':'hidden'});
});

// Add items to cart
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

/**********************************/
/****    Body Containers on    ****/
/****     Document.Ready       ****/
/**********************************/
$(document).ready(function(){
    $("body").removeClass("preload",function(){
        $('#body .container').each(function(i) {
            $(this).delay(250*i).queue(function(next){
                $(this).addClass('fade-in').removeClass('no-opacity').find(".image img:not(.indicator)").each(function(i){
                    $(this).delay(750 + 250*i).queue(function(next){
                       $(this).addClass('fade-in');
                    });
                });
            });
        });
    });
});