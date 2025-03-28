///// Gasp ////--


gsap.to("#name", {
    scrollTrigger:{
        trigger: "#back",
        start: "50% 50%",
        end: "150% 150%",
        scrub: 3,

    },
    x: 800,
    duration: 20,
})

gsap.from("#navi", {
    scrollTrigger:{
        trigger: "#back",
        start: "50% 50%",
        end: "150% 150%",
        scrub: 2,

    },
    y:40,
    opacity: 0,
    duration: 1

})

// gsap.to("#freelance svg", {
//     scrollTrigger:{
//         trigger: "#back",
//         start: "50% 45%",
//         end: "60% 60%",
//         scrub: 2,

//     },
//     rotate: "25deg",
//     duration: 1

// })

gsap.from("#helpingbrand h1", {
    scrollTrigger:{
        trigger: "#one",
        start: "20% 80%",
        end: "50% 70%",
        scrub: 2,

    },
    y: 40,
    opacity: 0,
    duration: 2

})

gsap.from("#helpingbrand p", {
    scrollTrigger:{
        trigger: "#one",
        start: "20% 80%",
        end: "50% 70%",
        scrub: 2,

    },
    y: 40,
    opacity: 0,
    duration: 2

})

gsap.from(".slideshow1", {
    scrollTrigger:{
        trigger: "#three",
        start: "0% 50%",
        end: "100% 100%",
        scrub: 2,

    },
    x: -200,
    duration: 1

})

gsap.from(".slideshow2", {
    scrollTrigger:{
        trigger: "#three",
        start: "0% 50%",
        end: "100% 100%",
        scrub: 2,

    },
    x: 150,
    duration: 1

})

gsap.from("#getintouch", {
    scrollTrigger:{
        trigger: "#four",
        start: "0% 50%",
        end: "100% 100%",
        scrub: 2,

    },
    x: -150,
    duration: 1

})



///////add Event Listner/////------

window.addEventListener("mousemove", function(dets){
    document.querySelector("#slidephoto").style.top=`${dets.clientY}px`
    document.querySelector("#slidephoto").style.left=`${dets.clientX}px`
    document.querySelector("#slidephoto").style.transform =`translate(${-dets.clientX*0.21}px, ${-dets.clientY*0.7}px)`
    document.querySelector("#slidephoto").style.cursor = "pointer"
});

window.addEventListener("DOMContentLoaded", function(){
    var loader = document.querySelector(".loader");
});

document.querySelector("#aboutme")
.addEventListener("mousemove", function(dets){
    document.querySelector("#aboutme").style.transform = `translate(${dets.clientX*0.02}px, ${dets.clientY*0.02}px)`
    document.querySelector("#aboutme").style.backgroundColor = "#333"
    document.querySelector("#aboutme").style.cursor = "pointer"
})

document.querySelector("#aboutme")
.addEventListener("mouseleave", function(){
    document.querySelector("#aboutme").style.transform = `translate(0px, 0px)`
    document.querySelector("#aboutme").style.cursor = "pointer"
    document.querySelector("#aboutme").style.backgroundColor = "#333"

})

document.querySelector("#chainn")
.addEventListener("mousemove", function(){
    document.querySelector("#slidephotos").style.marginTop = "0px"
    document.querySelector("#chainn").style.color = "rgb(177, 177, 177)"
})

document.querySelector("#chainn")
.addEventListener("mouseleave", function(){
    document.querySelector("#chainn").style.color = "initial"
})

document.querySelector("#aty")
.addEventListener("mousemove", function(){
    document.querySelector("#slidephotos").style.marginTop = "-120%"
    document.querySelector("#aty").style.color = "rgb(177, 177, 177)"
})

document.querySelector("#aty")
.addEventListener("mouseleave", function(){
    document.querySelector("#aty").style.color = "initial"
})

document.querySelector("#mic")
.addEventListener("mousemove", function(){
    document.querySelector("#slidephotos").style.marginTop = "-240%"
    document.querySelector("#mic").style.color = "rgb(177, 177, 177)"
})

document.querySelector("#mic")
.addEventListener("mouseleave", function(){
    document.querySelector("#mic").style.color = "initial"
})

document.querySelector("#tapso")
.addEventListener("mousemove", function(){
    document.querySelector("#slidephotos").style.marginTop = "-360%"
    document.querySelector("#tapso").style.color = "rgb(177, 177, 177)"
})

document.querySelector("#tapso")
.addEventListener("mouseleave", function(){
    document.querySelector("#tapso").style.color = "initial"
})

document.querySelector("#eff")
.addEventListener("mousemove", function(){
    document.querySelector("#slidephoto").style.display = "initial"
    document.querySelector("#slidephoto").style.opacity = 1
    document.querySelector("#slidephoto").style.scale = 1
})

document.querySelector("#eff")
.addEventListener("mouseleave", function(){
    document.querySelector("#slidephoto").style.display = "none"
    document.querySelector("#slidephoto").style.opacity = 1
    document.querySelector("#slidephoto").style.scale = 0

})

document.querySelector("#button-item")
.addEventListener("mousemove", function(dets){
    document.querySelector("#button-item").style.transform = `translate(${dets.clientX*0.02}px, ${dets.clientY*0.02}px)`
})

document.querySelector("#button-item")
.addEventListener("mouseleave", function(){
    document.querySelector("#button-item").style.transform = `translate(0px, 0px)`

})


document.querySelector("#close")
.addEventListener("click", function(){
    document.querySelector("#menubar").style.left = "150%"
})



