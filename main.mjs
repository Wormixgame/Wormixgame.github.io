
const swiper_block1 = new Swiper('#block1 > #slider', {
  navigation: {
    nextEl: '#block1 #forward',
    prevEl: '#block1 #back'
  },
  spaceBetween: 16,
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 'auto'
    },
  }

})

const swiper_block2 = new Swiper('#block2 > #slider', {
  navigation: {
    nextEl: '#block2 #forward',
    prevEl: '#block2 #back'
  },
  allowTouchMove: false,
  spaceBetween: 30,
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      allowTouchMove: true,
    },
    1280: {
      spaceBetween: 40,
    }
  }

})


document.getElementById('add-card-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const imageUrl = document.getElementById('image-url').value;
  const cardTitle = document.getElementById('card-title').value;
  const cardDescription = document.getElementById('card-description').value;

  addCardToSwiper(imageUrl, cardTitle, cardDescription)

  let cards = JSON.parse(localStorage.getItem("cards")) || [];

  cards.push({
    url: imageUrl,
    title: cardTitle,
    description: cardDescription
  });

  localStorage.setItem("cards", JSON.stringify(cards));

  // Reset the form
  event.target.reset();

  setTimeout(function () {
    swiper_block1.update();
   }, 500);
});

function addCardToSwiper(url, title, description){
  const cardContainer = document.getElementById('card-container');

  const newCard = document.createElement('div');
  newCard.className = 'card swiper-slide';

  const newImage = document.createElement('img');
  newImage.src = url;

  const newTextBlock = document.createElement('div');
  newTextBlock.className = 'card-text-block';

  const newTitle = document.createElement('span');
  newTitle.textContent = title;

  const newDescription = document.createElement('p');
  newDescription.textContent = description;

  newTextBlock.appendChild(newTitle);
  newTextBlock.appendChild(newDescription);

  newCard.appendChild(newImage);
  newCard.appendChild(newTextBlock);

  cardContainer.appendChild(newCard);
}

window.onload = function (){
  let cards = JSON.parse(localStorage.getItem("cards")) || [];

  cards.forEach(function (card){
    addCardToSwiper(card.url, card.title, card.description);
  });

  setTimeout(function () {
    swiper_block1.update();
  }, 500);
}