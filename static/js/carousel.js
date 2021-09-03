export default class Carousel {
  constructor(films, idCarousel) {
    this.films = films;
    this.carousel = document.getElementById(idCarousel);
    this.carouselContent = this.carousel.querySelector(".carousel-content");
    this.slides = this.carouselContent.querySelectorAll(".slide");
    this.arrayOfSlides = Array.prototype.slice.call(this.slides);
    this.carouselDisplaying;
    this.screenSize;
    this.setScreenSize();
    this.lengthOfSlide;
    window.addEventListener("resize", this.setScreenSize.bind(this));

    this.moving = true;
    this.rightNav = this.carousel.querySelector(".nav-right");
    this.rightNav.addEventListener("click", this.moveLeft.bind(this));
    this.leftNav = this.carousel.querySelector(".nav-left");
    this.leftNav.addEventListener("click", this.moveRight.bind(this));
    // this.carouselContent.addEventListener(
    //   "mousedown",
    //   this.seeMovement.bind(this)
    // );
    this.bindedReplaceToEnd = this.replaceToEnd.bind(this);
    this.bindedActivateAgain = this.activateAgain.bind(this);
    this.moveSlidesRight();
  }

  /**
   * Creates a clone of the last slide - and add as first element
   */
  addClone() {
    const lastSlide = this.carouselContent.lastElementChild.cloneNode(true);
    console.log("Adding a clone");
    lastSlide.style.left = -this.lengthOfSlide + "px";
    this.carouselContent.insertBefore(
      lastSlide,
      this.carouselContent.firstChild
    );
  }

  removeClone() {
    var firstSlide = this.carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
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
    const slides = this.carouselContent.querySelectorAll(".slide");
    var slidesArray = Array.prototype.slice.call(slides);
    this.lengthOfSlide = this.carousel.offsetWidth / this.carouselDisplaying;
    var initialWidth = -this.lengthOfSlide;
    slidesArray.forEach(function (el) {
      el.style.width = this.lengthOfSlide + "px";
      el.style.left = initialWidth + "px";
      initialWidth += this.lengthOfSlide;
    }, this);
  }

  moveSlidesRight() {
    const slides = this.carouselContent.querySelectorAll(".slide");
    console.log("in moveSlidesRight", slides);
    var width = 0;
    for (const el of slides) {
      el.style.left = width + "px";
      width += this.lengthOfSlide;
    }
    this.addClone();
  }

  moveSlidesLeft() {
    const slides = this.carouselContent.querySelectorAll(".slide");
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    var maxWidth = (slidesArray.length - 1) * this.lengthOfSlide;
    slidesArray.forEach(function (el, i) {
      maxWidth -= this.lengthOfSlide;
      el.style.left = maxWidth + "px";
    }, this);
  }

  moveRight() {
    if (this.moving) {
      console.log("mooving in moveRight");
      this.moving = false;
      var lastSlide = this.carouselContent.lastElementChild;
      lastSlide.parentNode.removeChild(lastSlide);
      this.carouselContent.insertBefore(
        lastSlide,
        this.carouselContent.firstChild
      );
      this.removeClone();
      var firstSlide = this.carouselContent.firstElementChild;
      firstSlide.addEventListener("transitionend", this.bindedActivateAgain);
      this.moveSlidesRight();
    }
  }

  moveLeft() {
    if (this.moving) {
      this.moving = false;
      this.removeClone();
      var firstSlide = this.carouselContent.firstElementChild;
      firstSlide.addEventListener("transitionend", this.bindedReplaceToEnd);
      this.moveSlidesLeft();
    }
  }

  /**
   * Used in MoveRight
   */
  activateAgain() {
    var firstSlide = this.carouselContent.firstElementChild;
    this.moving = true;
    firstSlide.removeEventListener("transitionend", this.bindedActivateAgain);
  }

  /**
   * Used in MoveLeft
   */
  replaceToEnd() {
    const slides = this.carouselContent.querySelectorAll(".slide");
    var slidesArray = Array.prototype.slice.call(slides);
    const firstSlide = this.carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    this.carouselContent.appendChild(firstSlide);
    firstSlide.style.left =
      (slidesArray.length - 1) * this.lengthOfSlide + "px";
    this.addClone();
    this.moving = true;
    firstSlide.removeEventListener("transitionend", this.bindedReplaceToEnd);
  }
}

let liste = ["film1", "film2", "film3", "film4", "film5", "film6", "film7"];
let carousel1 = new Carousel(liste, "best-films");
