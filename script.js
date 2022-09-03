const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
    this.classList.add("trigger-enter");

    // trigger-enter-active added only when trigger-enter class is already in it.
    // reason: b/c you shuffle in and out instantly, there could be a moment where trigger-enter-active class don't get remove by handleLeave() fn b/c it's been added
    // after 150ms
    setTimeout( () => this.classList.contains('trigger-enter') && this.classList.add("trigger-enter-active"), 150);
    
    // to get the whitebackground behind the list start showing
    background.classList.add("open");
    
    // dropdown menu of the thing you clicked
    const dropdown = this.querySelector(".dropdown");
    
    // using getBoundingClientRect() to get all the details regarding width, height etc of an element
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    // getting height, width, top and left stored in an object
    
    // top = dropdownCoords.top - navCoords.top & left = dropdownCoords.left - navCoords.left
    // reason : we are subtracting the navCoords.top from the dropdownCoords.top b/c nav is not always going to be stuck at the top. If it changes , we want that 
    // we calculate the exact position of our dropdown menu that appears while hover
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    }

    // setting the height, width, tranform: translate(x,y) cordinates of background
    background.style.setProperty("height", `${coords.height}px`);
    background.style.setProperty("width", `${coords.width}px`);
    background.style.setProperty("transform", `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
    // Removing the trigger-enter and trigger-enter-active whenever the mouseleave event is trigger
    this.classList.remove("trigger-enter" , "trigger-enter-active");
    
    // removing the white background that appears behind the nav bar
    background.classList.remove("open");
}


triggers.forEach(trigger => trigger.addEventListener("mouseenter" , handleEnter ));
triggers.forEach(trigger => trigger.addEventListener("mouseleave" , handleLeave ));