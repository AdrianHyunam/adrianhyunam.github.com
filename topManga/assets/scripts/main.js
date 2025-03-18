let links = document.querySelectorAll('.close');

links.forEach(function(link){
    link.addEventListener("click",function(ev){
        ev.preventDefault();
        
        let content = document.querySelector('.content');

        content.classList.remove('animate__animated', 'animate__zoomIn');

        content.classList.add('animate__animated', 'animate__zoomOut');

        setTimeout(function(){
            location.href = "../";
        },1000);

        return false;
    });
});

let irHome = document.querySelectorAll('.ir');

irHome.forEach(function(vamos){
    vamos.addEventListener("click",function(ev){
        ev.preventDefault();

        let content = document.querySelector('.content');

        content.classList.remove('animate__animated', 'animate__zoomIn');

        content.classList.add('animate__animated', 'animate__zoomOut');

        setTimeout(function(){
            location.href = vamos;
        },1000);

        return false;        
    });

});

document.addEventListener('swiped',function(e){
 location.href = "../";
});