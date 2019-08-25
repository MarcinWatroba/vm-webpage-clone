//declare and init global variables
let galleryIndex = 0;
let galleryLength = $(".gallery__img").length;
let maxCropHeight = 350;
let siteContainer = 0;
let cardIndex = 0;
let numOfCards = 0;
let cards = 0;
let prevColumns = 0;

init();

function init(){
    initCallbacks();
    initCSS();
    updateNavbar(checkWindowSize());
    createCardNavButtons();
}

//main function to initialise css values
function initCSS() {
    let sideBarsWidth = screen.width / 100 * 10
    siteContainer = 1400;
    
    if(screen.width > 1400)      
        siteContainer = screen.width - sideBarsWidth;
    
    let smallContainer = siteContainer / 100 * 80;
    maxCropHeight = siteContainer / 4; 
    let currentScreenWidth = $('body').innerWidth();
    let popInLeft = 0;


    let widthDifference = currentScreenWidth - siteContainer;
    if(widthDifference > 0)
        popInLeft = widthDifference / 2;

    $(".container").css("max-width", siteContainer);

    $(".navbar").css("width", siteContainer);
    
    $(".body-section--small").css("max-width", smallContainer);

    $(".gallery__img").hide();

    $(".gallery__img").eq(galleryIndex).show();

    $(".expandable__pop-up").css("width", siteContainer);
    $(".expandable__pop-up").css("left", popInLeft);

    btnDisplayElement($(".radio__btn--selected").attr("id"));
}

//function for displaying the correct sub-section based on the custom radio button clicked.
function btnDisplayElement(id) {
    const elementID = ("#" + id.replace("-btn", ""));
    const elementClass = ("." + $(elementID).attr("class"));
    $(elementClass).hide();
    $(elementID).show();
    updateCropHeight();

}

//function for changing the image in colour section
function selectColour(button) {

    $(".btn-group > .btn-select").removeClass("btn-select--round-checked");
    button.addClass("btn-select--round-checked");
    
    let link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Red.png";
    switch(button.attr("id"))
    {
        case "black": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Black.png"; break;
        case "solar": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Solar.png"; break;
        case "red": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Red.png"; break;
        case "silver": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Silver.png"; break;
        case "guard": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Guard.png"; break;
        case "magnetic": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Magnetic.png"; break;
        case "metalicious": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/Metalicious.png"; break;
        case "blazer-blue": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/BlazerBlue.png"; break;
        case "deep-impact-blue": link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/DeepImpactBlue.png"; break;
        default: link = "https://www.bristolstreetversa.com/images/colour_swatches/Grand-Tourneo-Connect/DeepImpactBlue.png"; break;
    }

    const image = $(".img--colour");
    image.attr("src", link);
}

//function for browsing gallery images, uses remainder to calcualte picture index
function browseGallery() {
    galleryIndex = ((galleryIndex%galleryLength)+galleryLength)%galleryLength;
    $(".gallery__index").text((galleryIndex+1) + "/" + galleryLength);
    $(".gallery__img").eq(galleryIndex).show("fast");
}

//function for updating the width of expandable navbar pop up
function updateExpandableWidth(currentScreenWidth) {
    let widthDifference = currentScreenWidth - siteContainer;
    popInLeft = 0;
    if(widthDifference > 0)
    {
        popInLeft = widthDifference / 2;

    }
    $(".expandable__pop-up").css("left", popInLeft);
}

//function updating navbar based on window size
function checkWindowSize() {
    let currentScreenWidth = $('body').innerWidth();
    updateExpandableWidth(currentScreenWidth);
    return currentScreenWidth;
}

//Update Navbar based on screen size
function updateNavbar(screenWidth) {
    
    if(screenWidth < 915)
    {
        screenWidth = screenWidth;
        $(".nav-items__item").addClass("hidden");
        $(".nav-main__menu-btn").removeClass("hidden");  
        $(".nav-main__menu-btn").addClass("displayMenuBttn");          
    }
    else
    {
        $(".nav-items__item").removeClass("hidden");
        $(".nav-main__menu-btn").removeClass("displayMenuBttn");  
        $(".nav-main__menu-btn").addClass("hidden");    
        $(".nav-items--dropbar").slideUp();         
    }
}


//Update height of the div content trimmer, this prevents it from cropping too much on smaller screens and of being larger than image it contains
function updateCropHeight() {

    const imgHeight = $(".trimmer__img").height();    
    const height = (imgHeight < maxCropHeight) ? imgHeight : maxCropHeight;
    $(".trimmer").css("height", height);

}

//Function for browsing cards in a card group, retrieves index of the first card to be shown, and shows it along with up to 3 next ones
function browseCardGroup(newIndex) {
    let max = 0;

    let hideNum = cardIndex + 4;

    hideNum = (hideNum > numOfCards) ? numOfCards : hideNum;
    
    for(let i = cardIndex; i < hideNum; i++)
        cards.eq(i).hide();

    if(newIndex > cardIndex) {
        cardIndex = newIndex;
        max = cardIndex + 4;
        max = (max > numOfCards) ? numOfCards : max;
    }
    else {
        cardIndex = newIndex;
        cardIndex = (cardIndex < 0) ? 0 : cardIndex;
        max = cardIndex + 4;
    }

    for(let i = cardIndex; i < max; i++)
        cards.eq(i).show();  
}

//Function for resetting cards in a card group, hides displayed cards, and shows up to 4 first cards in a group
function resetCardGroup(columns) {
    numOfCards = columns.length;
    let max = cardIndex + 4;
    if (prevColumns) {

        let prevLength = prevColumns.length;
        
        max = (max > prevLength) ? prevLength : max;
        for(let i = cardIndex; i < max; i++) {
            prevColumns.eq(i).hide();
        }

    }
    max = (numOfCards > 4) ? 4 : numOfCards;
    for(let i = 0; i < max; i++) {
        columns.eq(i).show();
    }
    cardIndex = 0;
    prevColumns = columns;
}


//function for creating navigation radio buttons in a card group
function createCardNavButtons() {
    $(".expandable__pop-up").each(function(index) {
        let length = $(this).find(".card-group__card").length;
        
        let radioButtons = Math.ceil(length / 4);
        
        let popIn = $(this).find(".card-group__nav");
        for(let i = 0; i < radioButtons; i++)
            popIn.append("<input type=\"radio\" name=\""+"pop-nav-"+ index + "\" class=\"nav-radio\" value=\"" + i + "\"></input>");

        popIn.children().first().prop("checked", true);
    })

    //event listener for newly created navigation radio buttons within a card group
    $(".nav-radio").on("click", function() {

        cards = $(this).closest(".expandable__pop-up").find(".card-group__card");

        let newIndex = $(this).attr("value") * 4;

        browseCardGroup(newIndex)
    });
}

//init callbacks
function initCallbacks() {

    $(".gallery__btn--left").on("click", function() {
        $(".gallery__img").eq(galleryIndex).hide("fast");
        galleryIndex -= 1;
        browseGallery();
    });

    $(".gallery__btn--right").on("click", function() {
        $(".gallery__img").eq(galleryIndex).hide("fast");
        galleryIndex += 1;
        browseGallery();
    });


    $(".btn-group").on("click", ".btn-select", function() {
        selectColour($(this));
    });

    $(".btn-select__card").on("click", function() {
        $(".btn-select__card").removeClass("btn-select--checked");
        $(this).addClass("btn-select--checked");
    });

    $(".radio__btn").on("click", function() {
        
        $(".radio__btn").removeClass("radio__btn--selected");
        $(this).addClass("radio__btn--selected");
        btnDisplayElement($(this).attr("id"));
    });

    $(".switch-btn").on("click", function() {
        $(".switch-btn").removeClass("switch-btn--selected");
        $(this).addClass("switch-btn--selected");
    });

    $(window).resize(function() {
        updateNavbar(checkWindowSize());
        updateCropHeight();
        
    });

    $("#main-menu-btn").on("click", function() {
        $("#sub-dropdown").hide();
        $("#main-dropdown").slideToggle();
    });

    $(".nav-items__title").on("click", function() {
        if(checkWindowSize() < 915)
        {
            $("#main-dropdown").hide();
            $("#sub-dropdown").slideToggle();
        }
    });


    $(".btn-chevron__left").on("click", function() {

        if (cardIndex > 3){
            let newIndex = cardIndex - 4;
            let radioBtnID = Math.floor(newIndex/4);
            $(this).closest(".expandable__pop-up").find(".nav-radio").eq(radioBtnID).prop("checked", true);
            browseCardGroup(newIndex - 4);
        }
            
    });

    $(".btn-chevron__right").on("click", function() {
        if (cardIndex < numOfCards - 4){
            let newIndex = cardIndex + 4;
            let radioBtnID = Math.floor(newIndex/4);
            $(this).closest(".expandable__pop-up").find(".nav-radio").eq(radioBtnID).prop("checked", true);
            browseCardGroup(cardIndex + 4);
        }
            
    });


    $(".expandable").mouseenter(function() {       
        cards = $(this).find(".card-group__card");
        resetCardGroup(cards);
        $(this).find(".card-group__nav").children().first().prop("checked", true);
    });

}