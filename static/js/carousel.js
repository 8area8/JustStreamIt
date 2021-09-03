export default class Carousel {

    constructor(films, idCarousel) {
        this.films = films;
        this.carousel = document.getElementById(idCarousel);
        this.carouselContent = this.carousel.querySelector('.carousel-content');
        this.slides = this.carouselContent.querySelectorAll('.slide');
        this.arrayOfSlides = Array.prototype.slice.call(this.slides);
        this.carouselDisplaying;
        this.screenSize;
        this.setScreenSize();
        this.lengthOfSlide;
        window.addEventListener('resize', () => this.setScreenSize());

        this.moving = true;
        this.rightNav = this.carousel.querySelector('.nav-right');
        this.rightNav.addEventListener('click', () => this.moveLeft());
        this.leftNav = this.carousel.querySelector('.nav-left');
        this.leftNav.addEventListener('click', () => this.moveRight());
        this.carouselContent.addEventListener('mousedown', () => this.seeMovement());
        this.moveSlidesRight();
    }

    addClone() {
        var lastSlide = this.carouselContent.lastElementChild.cloneNode(true);
        lastSlide.style.left = (-this.lengthOfSlide) + "px";
        this.carouselContent.insertBefore(lastSlide, this.carouselContent.firstChild);
    }

    removeClone() {
        var firstSlide = this.carouselContent.firstElementChild;
        firstSlide.parentNode.removeChild(firstSlide);
    }

    moveSlidesRight() {
        var slidesArray = Array.prototype.slice.call(this.slides);
        var width = 0;
        slidesArray.forEach(function (el, i) {
            el.style.left = width + "px";
            console.log("to right", el.style.left)
            width += this.lengthOfSlide;
        }, this);
        this.addClone();
    }

    moveSlidesLeft() {
        var slidesArray = Array.prototype.slice.call(this.slides);
        slidesArray = slidesArray.reverse();
        var maxWidth = (slidesArray.length - 1) * this.lengthOfSlide;
        slidesArray.forEach(function (el, i) {
            maxWidth -= this.lengthOfSlide;
            el.style.left = maxWidth + "px";
        }, this);
    }

    setScreenSize() {
        if (window.innerWidth >= 500) {
            this.carouselDisplaying = 3;
        } else if (window.innerWidth >= 300) {
            this.carouselDisplaying = 2;
        } else {
            this.carouselDisplaying = 1;
        }
        this.getScreenSize();
    }

    getScreenSize() {
        var slidesArray = Array.prototype.slice.call(this.slides);
        this.lengthOfSlide = (this.carousel.offsetWidth / this.carouselDisplaying);
        var initialWidth = -this.lengthOfSlide;
        slidesArray.forEach(function (el) {
            el.style.width = this.lengthOfSlide + "px";
            el.style.left = initialWidth + "px";
            initialWidth += this.lengthOfSlide;
        }, this);
    }

    moveRight() {
        console.log("cc", this.moving)
        if (this.moving) {
            this.moving = false;
            var lastSlide = this.carouselContent.lastElementChild;
            console.log("bb", lastSlide);
            lastSlide.parentNode.removeChild(lastSlide);
            this.carouselContent.insertBefore(lastSlide, this.carouselContent.firstChild);
            this.removeClone();
            var firstSlide = this.carouselContent.firstElementChild;
            firstSlide.addEventListener('transitionend', () => this.activateAgain());
            this.moveSlidesRight();
        }
    }

    activateAgain() {
        console.log("ici")
        var firstSlide = this.carouselContent.firstElementChild;
        this.moving = true;
        firstSlide.removeEventListener('transitionend', () => this.activateAgain());
    }

    moveLeft() {
        if (this.moving) {
            this.moving = false;
            this.removeClone();
            var firstSlide = this.carouselContent.firstElementChild;
            firstSlide.addEventListener('transitionend', () => this.replaceToEnd());
            this.moveSlidesLeft();
        }
    }

    replaceToEnd() {
        var firstSlide = this.carouselContent.firstElementChild;
        firstSlide.parentNode.removeChild(firstSlide);
        this.carouselContent.appendChild(firstSlide);
        firstSlide.style.left = ((arrayOfSlides.length - 1) * this.lengthOfSlide) + "px";
        this.addClone();
        this.moving = true;
        firstSlide.removeEventListener('transitionend', () => this.replaceToEnd());
    }


}

let liste = ["film1", "film2", "film3", "film4", "film5", "film6", "film7"];
let carousel1 = new Carousel(liste, "best-films");