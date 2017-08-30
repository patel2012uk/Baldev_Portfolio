//This is my JavaScript code

//The Parallax JS code

/*Let's take a step by step look at exactly what's going on here.

1. We first find all our sections with a class of .parallax.
2. We then set our speed as a fraction between 0 and 1. In this case, I used 0.5.
3. On scroll, we loop through each of our parallax sections, finding the y offset of the window.
4. We then adjust the background-position property of our parallax section accordingly, based on our speed fraction.
5. The position of our background image is now updated each time a scroll occurs, giving the impression that it is scrolling at a slower speed than the foreground elements.*/

//
// $('.scrollDownCBP').click(function(){
//        $('html, body').stop().animate({scrollTop:1000},'50');
//    });

(function(){

  var myParallax = document.querySelectorAll(".bgImageBP"), speed = 0.3;

  window.onscroll = function(){
    myParallax.forEach(function(elP){

      var windowYOffset = - window.pageYOffset,
          elPBackgrounPos = "50% " + (windowYOffset * speed) + "px";

          elP.style.backgroundPosition = elPBackgrounPos;
    });

  };

})();


/*Here is the jQuery solution for the parallax*/

/*  This sample code is for jQuery solution*/

$(window).scroll(function(){
    
    var wScroll = $(this).scrollTop();
    

    if (wScroll > $(".productBox").offset().top - ($(window).height() / 1.3)) {
         
        console.log("hi");
        
        $(".productBox").each(function(i) {
            
            setTimeout(function() {
                
                $(".productBox").eq(i).addClass("isShowing");
            }, 150 * (i+1));

        });
    }
    
    if (wScroll > $(".logoC").offset().top) {
     
        $(".navC").addClass("navShowing");
        
    } else if (wScroll < $(".logoC").offset().top) {
        
        
        $(".navC").removeClass("navShowing");
    }
      
});



   
    /*  Make nav fixed at top and Highlight the current link or active link
    -----------------------------------------------*/
    
    $(function() {
        
        
        var section1C = $("#home").offset().top + 400;
        var section2C = $("#products").offset().top + 900;
        var section3C = $("#sales").offset().top + 600;
        var section4C = $("#about").offset().top + 200;
        var section5C = $("#contact").offset().top;
        
        var activeLink;
        $(document).on("scroll", function() {
        
            var scrollUp = $(document).scrollTop();
            
            if (scrollUp <= section1C) {
                
                activeLink = $(".menu-items > li:nth-child(1)");
                
            } else if (scrollUp < section2C) {
                
                activeLink = $(".menu-items > li:nth-child(2)");
            
            } else if (scrollUp < section3C) {
                
                activeLink = $(".menu-items > li:nth-child(5)");
        
            } else if (scrollUp < section4C) {
                
                activeLink = $(".menu-items > li:nth-child(3)");
        
            } else if (scrollUp < section5C) {
                
                activeLink = $(".menu-items > li:nth-child(4)");
        
            }
            
            activeLink.addClass("current");
            $(".menu-items > li").not(activeLink).removeClass("current");
        });
        
    });


/*  Smoothscroll
    -----------------------------------------------*/
var $root = $('html, body');
$('.scrollDownCBP a').click(function() {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});


//$('.scrollDownCBP').click(function(event) {
//    // Preventing default action of the event
//    event.preventDefault();
//    // Getting the height of the document
//    var n = $(document).height();
//    $('html, body').animate({ scrollTop: n }, 10);

//
//   $(function() {
//        $('.scrollDownCBP').bind('click', function(event) {
//            
//            $('html, body').stop().animate({
//                scrollTop: 1000
//            }, 50);
////            event.preventDefault();
//        });
//    });
//


/*  The Modal JavaScript
    -----------------------------------------------*/

// Get the modal
var theModal = document.getElementById('myModal');

// Get the button that opens the modal

var modalButton = document.getElementById("newCB");

modalButton.addEventListener("click", openModel, false);

function openModel() {
    
    theModal.style.display = "block";
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    theModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == theModal) {
        theModal.style.display = "none";
    }
}



/*  This is the jQuery script for the mobile devices
    -----------------------------------------------*/

// Mobile Menu toggle


    $("span.navBtn").click(function() {

        $("ul.menu-items").slideToggle();
    });


    $(window).resize(function() {

        if ( $(window).width() > 480 ) {

            $("ul.menu-items").removeAttr("style");
        }
    });


    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/

    $(".menu-items li").on("click", function(){
        
        if ( $(window).width() < 800 ) {
        $("span.navBtn").click();
        }
    });




/*** DISABLE PARALLAX ON MOBILE ON SCROLL ***/


$(window).on('scroll',function(){

var windowWidth = $(window).width();

if (windowWidth <= 800) {
    
    console.log(windowWidth);
    
        $("#remParallax").removeAttr("style");

}   
    
/*** DISABLE PARALLAX ON MOBILE ON RESIZE ***/
    
$(window).on('resize', function () {
    
    var windowWidth = $(window).width();
    
    /*** DISABLE PARALLAX ON MOBILE ON LOAD ***/
    
    if (windowWidth <= 800) {
        
        console.log(windowWidth);
        
            $("#remParallax").removeAttr("style");
    } 
});
});

/*  This is the JavaScript code for the accordion
    -----------------------------------------------*/

/*This is my code for the accordion*/

var myDeliveryForm = document.getElementsByClassName("deliveryO");
var i;

for (i = 0; i < myDeliveryForm.length; i++) {
  myDeliveryForm[i].onclick = function() {
    this.classList.toggle("active");
    var myDeliveryForm = this.nextElementSibling;
    if (myDeliveryForm.style.maxHeight){
      myDeliveryForm.style.maxHeight = null;
    } else {
      myDeliveryForm.style.maxHeight = myDeliveryForm.scrollHeight + "px";
    } 
  }
}



//java script code for promotion and sales section


//The Drag and Drop JavaScript code

document.addEventListener("DOMContentLoaded", myDragandDrop, false);

function myDragandDrop() {
    
    var trainersImages = document.getElementsByClassName("productSales");
    var shoppingDropArea = document.getElementById("shoppingcart");
    var theShoppingCart = document.querySelectorAll("#shoppingcart ul")[0];
    
    for (var i = 0; i < trainersImages.length; i++) {
        
        trainersImages[i].addEventListener("dragstart", function(ev) {
            
            ev.dataTransfer.effectAllowed = "copy";
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
            console.log(this.id);
        }, false);
    }
    
    shoppingDropArea.addEventListener("dragover", function(ev) {
        
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
        return false;
        
    }, false);
    
    shoppingDropArea.addEventListener("drop", function(ev) {
        
        if (ev.preventDefault)
            ev.preventDefault();
        var trainerId = ev.dataTransfer.getData("Text");
        var element = document.getElementById(trainerId);
        
        addTrainerToShoppingCart(element, trainerId);
        ev.stopPropagation();
        return false;
        
    }, false);
    
    function addTrainerToShoppingCart(item, id) {
        var displayData = id + " " + item.getAttribute("data-price");
        
        var myli = document.createElement("li");
        myli.innerHTML = displayData;
        theShoppingCart.appendChild(myli);
    }
    
}



// Delivery info locan storage saving code
var deliveryRegistration = [];

function myRegistration(){
  
  name = document.getElementById("name").innerHTML;
  
  localStorage.setItem("regData", name);

  for(var i=0; i<deliveryRegistration.length; i++)
    {
      deliveryRegistration = localStorage.getItem("regData", name);
      
    }
  
  
  

  
}

//map loading with google api

/*
     var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }*/
//====================================back ground video wnen page load==================

//$(window).bind(".bgVideo", function(){
//  $(".bgVideo").load(window);
//});
//
//
//
//
//
//

/*Map -*/ 
function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }








