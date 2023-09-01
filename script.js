const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
    link.addEventListener("click",(e)=>{
        links.forEach((link) => {
            link.classList.remove("nav-active");
        });
        link.classList.add("nav-active");
    });
});