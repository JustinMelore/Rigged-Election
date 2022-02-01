//A quick message that pops up when the page first loads
let loadMessage = () => {
    let loopCount = 0;
    while(true) {
        let text="";
        switch(loopCount) {
            case 0:
                text = "Welcome to the election! Remember, you only have one vote, so make sure you choose wisely (unless you vote for a certain candidate, in which case we'll give you pass)!";
                break;
            case 1:
                text= "Look, all we're saying is that maybe if you choose a certain republican candidate, we might let you vote again thats all!";
                break;
            case 2:
                text = "Listen here, you and I both know which candidate you're supposed to be voting for here, just vote for the guy on the left and we're all good here";
                break;
            default:
                text = "VOTE NIXON";
        }
        loopCount++;
        if(confirm(text)) break;
    }
    alert("Great! I'm glad we have an understanding");
    this.removeEventListener("DOMContentLoaded", loadMessage);
}

window.addEventListener("DOMContentLoaded",loadMessage);

//Turns McGovern into a demon when you hover over him
let anger = (opacity, spot) => {
    document.getElementById("mcgovernPic").style.filter = `invert(${opacity})`    
}

mcgovernPic.addEventListener("mouseover",()=> {anger(100,"32vh")});
mcgovernPic.addEventListener("mouseleave",()=>{anger(0,"34vh")});

//Makes a flag appear when you hover over Nixon
let happy = (opacity, spot) => {
    const flag = document.getElementById("flag");
    flag.style.opacity = opacity;
    flag.style.top = spot;
}

nixonPic.addEventListener("mouseover",()=>{happy(100, "18vh")});
nixonPic.addEventListener("mouseleave",()=>{happy(0,"20vh")});

//Lets the user right-click on each candidate to see information about them
function candidateInfo(event, message, reasons) {
    if(document.getElementsByClassName("candidateInfo").length==0) {
        let info = document.createElement("div");
        info.classList.add("candidateInfo");
        info.textContent = message;
        info.style.top = `${event.clientY}px`;
        info.style.left = `${event.clientX}px`;
        let traitList = document.createElement("ul");
        traitList.appendChild(document.createElement("br"));
        for(let i=0; i<reasons.length; i++) {
            let listItem = document.createElement("li");
            listItem.textContent = reasons[i];
            traitList.appendChild(listItem);
        }
        info.appendChild(traitList);
        info.addEventListener("mouseleave",function(){info.remove()});
        document.body.appendChild(info);
    }
}

function nixonInfo(event) {
    event.preventDefault();
    candidateInfo(event, `This is Richard Nixon, the most incredible presidential candidate to ever run! It should be obvious why you should vote for him, but in case you can't figure it out, we gave some reasons for you!`, ["Great leader","Good speaker", "Great hair","Not involved in illegal activity","Etcetera"]);
}

nixonPic.addEventListener("contextmenu",nixonInfo);

function mcgovernInfo(event) {
    event.preventDefault();
    candidateInfo(event, `This is George McGovern. Frankly I'm not really sure why you're looking for info on this guy. Don't vote for him.`,["He's an inept leader","Terrible speaker","Hair's not even that good","Doesn't have nearly as cool of a name","All in all just no good"]);
}

mcgovernPic.addEventListener("contextmenu",mcgovernInfo);

//Allows the user to put McGovern in the trash (covers the next three functions)
var canMove = false;

//Allows for the user to grab and hold McGovern; I made this an anonymous function so I can easily get the event
function grabMcgovern(event) {
    if(event.button == 0) {
        document.getElementById("trash").style.opacity="100%";
        canMove = true;
        this.style.transition = "none";
        this.style.position = "absolute";
        this.style.zIndex = "3";
        this.style.cursor = "grab";
        this.style.left = `${event.clientX-this.clientWidth/2}px`;
        this.style.top = `${event.clientY-this.clientHeight/4}px`;            
    }
}

mcgovernPic.addEventListener("mousedown",grabMcgovern);

//Determines what happens when the user lets go of McGovern; either returning him to his original position or deleting him
function releaseMcgovern(event) {
    canMove = false;
    this.style.position = "static";
    const can = document.getElementById("trash").getBoundingClientRect();
    if(
        event.clientY >= can.top &&
        (event.clientX > can.left && event.clientX < can.left + can.width)
    ) {
        document.getElementById("trash").remove();
        this.remove();
    }else{
        this.style.transition = "all 0.5s";
        this.style.cursor = "url('no.png') 15 15, pointer";
        document.getElementById("trash").style.opacity="0";
    }  
}

mcgovernPic.addEventListener("mouseup",releaseMcgovern)

//Lets the user actually drag McGovern as long as they are holding down the mouse
function moveMcgovern(event) {
    if(canMove) {
        const mcgovern = document.getElementById("mcgovernPic");
        mcgovern.style.left = `${event.clientX-mcgovern.clientWidth/2}px`;
        mcgovern.style.top = `${event.clientY-mcgovern.clientHeight/4}px`;
    }    
}

window.addEventListener("mousemove",moveMcgovern);

//Lets the user actually vote for Nixon with a quick alert message
nixonPic.addEventListener("mouseup",function(event){if(event.button==0){alert("Thank you for making the right choice!")}});