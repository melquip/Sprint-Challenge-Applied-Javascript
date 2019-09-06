/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

function createCarousel(data) {
	
	const carousel = document.createElement('div');
	carousel.classList.add('carousel');
	
	carousel.addEventListener('mouseleave', stopCarouselInfiniteLoop);
	carousel.addEventListener('mouseup', stopCarouselInfiniteLoop);
	
	const leftBtn = createCarouselButton('left-button', ' < ');
	leftBtn.addEventListener('mousedown', function() {
		carouselBtnMousedown = true;
		carouselGoBack();
	});
	carousel.appendChild(leftBtn);
	data.forEach((slide, i) => {
		const newSlide = document.createElement('img');
		newSlide.src = slide;
		if(i === 0) newSlide.classList.add('active');
		carousel.appendChild(newSlide);
	});
	const rightBtn = createCarouselButton('right-button', ' > ');
	rightBtn.addEventListener('mousedown', function() {
		carouselBtnMousedown = true;
		carouselGoForth();
	});
	carousel.appendChild(rightBtn);

	return carousel;
}

function createCarouselButton(classname, text) {
	const btn = document.createElement('div');
	btn.classList.add(classname);
	btn.textContent = text;
	return btn;
}
function carouselGoBack() {
	if(carouselCurrIndex === 0) {
		carouselCurrIndex = slides.length;
	}
	carouselCurrIndex--;
	updateCarousel();
	if(carouselBtnMousedown) {
		carouselInfiniteLoop = setTimeout(function() {
			if(carouselBtnMousedown) carouselGoBack();
		}, carouselInfiniteLoopTimer);
	}
}
function carouselGoForth() {
	if(carouselCurrIndex === slides.length - 1) {
		carouselCurrIndex = -1;
	}
	carouselCurrIndex++;
	updateCarousel();
	if(carouselBtnMousedown) {
		carouselInfiniteLoop = setTimeout(function() {
			if(carouselBtnMousedown) carouselGoForth();
		}, carouselInfiniteLoopTimer);
	}
}

function updateCarousel() {
	const domSlides = document.querySelectorAll('.carousel img');
	domSlides.forEach((slide, i) => {
		if(i != carouselCurrIndex) {
			slide.classList.remove('active');
		} else {
			slide.classList.add('active');
		}
		slide.style.transform = `translateX(-${carouselCurrIndex * 100}%)`;
	});
}

function stopCarouselInfiniteLoop() {
	carouselBtnMousedown = false;
	clearTimeout(carouselInfiniteLoop);
}

const carouselContainer = document.querySelector('.carousel-container');

let carouselCurrIndex = 0;
let carouselBtnMousedown = false;
let carouselInfiniteLoop;
const carouselInfiniteLoopTimer = 1000;
const slides = [
	"./assets/carousel/mountains.jpeg",
	"./assets/carousel/computer.jpeg",
	"./assets/carousel/trees.jpeg",
	"./assets/carousel/turntable.jpeg"
];
carouselContainer.appendChild(createCarousel(slides));