const themes = {
  light: {
    'asdf' : 'asdf',
    '--bg': '#FFFFFF',
    '--bg2': '#F8F8F8',
    '--color-text': '#242121',
    '--title-text': '#01353E',
    '--del-btn': '#990000',
    '--icon-sun-color': '#010101',
    '--icon-moon-color': '#f8f8f8',
  },
  dark: {
    'asdf' : 'asdf',
    '--bg': '#000000',
    '--bg2': '#373A39',
    '--color-text': '#FFFFFF',
    '--title-text': '#ffffff',
    '--del-btn': '#ffbb00',
    '--icon-sun-color': '#f8f8f8',
    '--icon-moon-color': '#010101',
  },
}
const btnLightOrDark = document.querySelector('.navbar-theme'); 
const navbarClose = document.querySelector('.navbar-close')
btnLightOrDark.addEventListener('click', selectedTheme)
document.addEventListener('DOMContentLoaded', addTheme)
// изменение темы сайта
function selectedTheme(){
  if(btnLightOrDark.classList.contains('light')){
    navbarClose.classList.remove('black')
    btnLightOrDark.classList.remove('light')
    btnLightOrDark.classList.add('dark')
    btnLightOrDark.setAttribute('data-theme', 'dark')
  }else{
    navbarClose.classList.add('black')
    btnLightOrDark.classList.remove('dark')
    btnLightOrDark.classList.add('light')
    btnLightOrDark.setAttribute('data-theme', 'light')
  }
  const themeAttr = btnLightOrDark.getAttribute('data-theme')
  const themeObj = themes[themeAttr];
  let themeStr = '';
  for(const key in themeObj){
    themeStr += `${key}: ${themeObj[key]}; `
  }
  let locThemeStr = []
  if(localStorage.getItem('theme') === null){
    locThemeStr.push(themeStr)
  }else{
    locThemeStr.push(themeStr)
  }
  localStorage.setItem('theme', JSON.stringify(locThemeStr))
  addTheme(themeStr, locThemeStr)
  // btn start
  function nam() {
    let btnAttr = [btnLightOrDark.getAttribute('data-theme')]
    localStorage.setItem('btn', btnAttr)
  }
  nam()
}
if (localStorage.getItem('btn') == 'dark') {
  btnLightOrDark.classList.remove('light')
  btnLightOrDark.classList.add('dark')
  btnLightOrDark.setAttribute('data-theme', 'dark')
}
// btn end
function addTheme(themeStr, locThemeStr){
  let sws
  if(localStorage.getItem('theme') === null){
    locThemeStr.push(themeStr)
  }else{
    sws = JSON.parse(localStorage.getItem('theme'))
  }
  sws.forEach(function(s, key){
    document.documentElement.style = `${key}: ${s}; `
    console.log(s);
  })
}
// navbar
var element = document.getElementById('portfolio-content-nav');
window.addEventListener('scroll', function () {
   if (window.scrollY > 1) {
        element.classList.add("shadow");
    } else {
        element.classList.remove("shadow");
    }
});
// 134
const logo = document.querySelector('.header__content-timer')
let speed = 50
function lvl(i){
  i++
  logo.innerHTML = i
  if(i>50 && i<=60){speed = 70}
  else if(i>60 && i<=70){speed = 80}
  else if(i>70 && i<=80){speed = 90}
  else if(i>80 && i<=90){speed = 100}
  else if(i>90 && i<=120){speed = 120}
  else if(i>120 && i<=134){speed = 180}
  
  if(i <= 133){
    setTimeout(function(){
      lvl(i)
    }, speed)
  }
}
setTimeout(() => {
  lvl(0)
}, 850);
// animation text
const animItems = document.querySelectorAll(`._anim-items`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 10
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active`)
            } else {
                if (!(animItem.classList.contains(`_anim-no-hide`))) {
                    animItem.classList.remove(`_active`)
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 100)
}
setInterval(() => {
  animOnScroll()
}, 100);
// burger
const navbarBtn = document.querySelector('.navbar-btn')
const navbarBtnSpan = document.querySelectorAll('.navbar-btn span')
const navbarMenu = document.querySelector('.navbar__content-menu__tablet')
navbarBtn.addEventListener('click', burgerActive)
function burgerActive() {
  navbarMenu.classList.add('menu__active')
}
navbarClose.addEventListener('click', burgerClose)
function burgerClose() {
  navbarMenu.classList.remove('menu__active')
}
// slider
class SLIDER{
  constructor(option){
    this.parent = option.slider
    this.sliderList = this.parent.querySelector('.slider-list')
    this.sliderItems = this.parent.querySelectorAll('.slider-list__item')
    this.prevBtn = this.parent.querySelector('.prev')
    this.nextBtn = this.parent.querySelector('.next')
    this.moveSlide = 100;
    this.timeMove = 1000;
    this.activeSlide = 0;
    // dots
    this.ul = document.createElement('ul')
    this.ul.classList.add('slider-dots')
    this.sliderItems.forEach(()=>{
      const li = document.createElement('li')
      this.ul.append(li)
    })
    this.parent.append(this.ul)
    this.sliderDotsLi = this.parent.querySelectorAll('.slider-dots li')
    this.sliderDotsLi[this.activeSlide].classList.add('active')
    this.sliderDotsLi.forEach((dot, key)=>{
      dot.addEventListener('click', ()=>{this.controllers(key)})
    })
    this.active = true  
    // ==================
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translateX(${this.moveSlide}%)`
      }
      if(key == this.sliderItems.length - 1){
        slide.style.transform = `translateX(${-this.moveSlide}%)`
      }
    })
    this.prevBtn.addEventListener('click', ()=>{this.move(this.prevBtn)})
    this.nextBtn.addEventListener('click', ()=>{this.move(this.nextBtn)})
  }
  move(btn){
    this.nextBtn.disabled = true
    this.prevBtn.disabled = true
    setTimeout(()=>{
      this.nextBtn.disabled = false
      this.prevBtn.disabled = false
    }, this.timeMove + 200)
    let btnPrevOrNext = btn == this.nextBtn ? -this.moveSlide : this.moveSlide;
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translateX(${-btnPrevOrNext}%)`
        slide.style.transition = `0ms`
      }
    })
    setTimeout(()=>{
      this.sliderItems[this.activeSlide].style.transform = `translateX(${btnPrevOrNext}%)`
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
      this.sliderDotsLi[this.activeSlide].classList.remove('active')
      if(btn == this.nextBtn){
        this.activeSlide++
        if(this.activeSlide > this.sliderItems.length - 1){
          this.activeSlide = 0
        }
      }else if(btn == this.prevBtn){
        this.activeSlide--
        if(this.activeSlide < 0){
          this.activeSlide = this.sliderItems.length - 1
        }
      }
      this.sliderItems[this.activeSlide].style.transform = `translateX(0%)`
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
      this.sliderDotsLi[this.activeSlide].classList.add('active')
    }, 200)
  }
  controllers(dotKey){
    if(this.active && dotKey != this.activeSlide){
      this.sliderItems.forEach((slide)=>{
        slide.style.transition = '0ms'
      })
      this.active = false
      this.nextBtn.disabled = true
      this.prevBtn.disabled = true
      this.sliderDotsLi.forEach((dot)=>{dot.classList.remove('active')})
      let moveLeftOrRight = dotKey > this.activeSlide ? -this.moveSlide : this.moveSlide
      this.sliderItems[dotKey].style.transform = `translateX(${-moveLeftOrRight}%)`
      setTimeout(()=>{
        this.sliderItems[this.activeSlide].style.transform = `translateX(${moveLeftOrRight}%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDotsLi[this.activeSlide].classList.remove('active')
        this.activeSlide = dotKey
        this.sliderItems[this.activeSlide].style.transform = `translateX(0%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDotsLi[this.activeSlide].classList.add('active')    
      }, 100)
      setTimeout(()=>{
        this.active = true
        this.nextBtn.disabled = false
        this.prevBtn.disabled = false
      }, this.timeMove + 200)
    }
  }
}

const sliders = document.querySelectorAll('.slider')
for(const slider of sliders){
  new SLIDER({
    slider: slider 
  })
}
// mous
document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.custom-cursor');

  document.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursor.style.left = posX + 'px';
    cursor.style.top = posY + 'px';
  });
});
// 