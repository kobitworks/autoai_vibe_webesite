const header=document.querySelector(".site-header");
const menuButton=document.getElementById("menuButton");
const mobileMenu=document.getElementById("mobileMenu");

function updateHeader(){
  header.classList.toggle("scrolled",window.scrollY>30);
}
updateHeader();
window.addEventListener("scroll",updateHeader,{passive:true});

menuButton.addEventListener("click",()=>{
  const open=!mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open",open);
  menuButton.classList.toggle("active",open);
  menuButton.setAttribute("aria-expanded",String(open));
  mobileMenu.setAttribute("aria-hidden",String(!open));
  document.body.style.overflow=open?"hidden":"";
});

mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileMenu.classList.remove("open");
  menuButton.classList.remove("active");
  menuButton.setAttribute("aria-expanded","false");
  mobileMenu.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));