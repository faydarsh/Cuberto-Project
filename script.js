function loco(){gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
   }
loco()


const text  = document.querySelectorAll(".text h2");
text.forEach(function(el){
  el.innerHTML = el.innerText.split('').map(
    (el, i) =>
      `<span style= "transform:rotate(${i * 12}deg)">${el}</span>`
  ).join('')
})

window.addEventListener("mousemove",function(dets){
  document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`

})


var tl = gsap.timeline();

gsap.to("#nav img",{
  opacity:1,
  duration:2,
  delay:0.5
  

})
gsap.to(".bound h1",{
  y:"0%",
  duration:1,
  stagger:0.1,
  delay:0.5
})
gsap.to(".bound video",{
  y:"0%",
  duration:1,
  stagger:0.1,
  delay:0.5
})

var tl2 = gsap.timeline();
tl2.to(".bound2 #page2",{
  y:"0%",
  duration:1.5,
  delay:0.5
})



var proj = document.querySelectorAll("#page4-lower video");

proj.forEach(function(dets){
  dets.addEventListener("mouseenter",function(){
   dets.play()

   dets.autoplay = true;
   dets.loop = true;
   dets.muted = true;
  })
})

proj.forEach(function(dets){
  dets.addEventListener("mouseleave",function(){
    dets.pause()
    dets.currentTime = 0
  })
})