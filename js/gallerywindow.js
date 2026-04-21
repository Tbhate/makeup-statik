const items = document.querySelectorAll('.item img');
const cards = document.querySelectorAll('.item');

const lightbox = document.getElementById('lightbox');
const preview = document.getElementById('preview');
const count = document.getElementById('count');

const closeBtn = document.querySelector('.close');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let current = 0;

/* OPEN IMAGE */
function openImage(index, direction = "next"){
  current = index;

  preview.classList.remove('slide-next','slide-prev');
  void preview.offsetWidth;

  preview.src = items[index].src;
  count.innerText = `${index + 1} / ${items.length}`;

  if(direction === "next"){
    preview.classList.add('slide-next');
  }else{
    preview.classList.add('slide-prev');
  }

  lightbox.classList.add('active');
  preview.classList.remove("zoomed");
}

/* click image */
items.forEach((img,index)=>{
  img.addEventListener('click',()=>{
    openImage(index,"next");
  });
});

/* next */
next.onclick = ()=>{
  current++;
  if(current >= items.length) current = 0;
  openImage(current,"next");
}

/* prev */
prev.onclick = ()=>{
  current--;
  if(current < 0) current = items.length - 1;
  openImage(current,"prev");
}

/* close */
closeBtn.onclick = ()=>{
  lightbox.classList.remove('active');
}

/* click bg close */
lightbox.addEventListener('click',(e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove('active');
  }
});

/* ESC CLOSE */
document.addEventListener('keydown',(e)=>{
  if(e.key === "Escape"){
    lightbox.classList.remove('active');
  }

  if(e.key === "ArrowRight" && lightbox.classList.contains('active')){
    next.click();
  }

  if(e.key === "ArrowLeft" && lightbox.classList.contains('active')){
    prev.click();
  }
});

/* SCROLL APPEAR */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{
  threshold:.15
});

cards.forEach(card=>{
  observer.observe(card);
});

/* SWIPE MOBILE */
let startX = 0;
let endX = 0;

lightbox.addEventListener('touchstart',(e)=>{
  startX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend',(e)=>{
  endX = e.changedTouches[0].screenX;

  if(startX - endX > 50){
    next.click();
  }

  if(endX - startX > 50){
    prev.click();
  }
});


const zoomView = document.getElementById("zoomView");

zoomView.onclick = ()=>{
  preview.classList.toggle("zoomed");
}