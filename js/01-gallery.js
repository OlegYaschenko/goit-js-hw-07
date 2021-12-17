import { galleryItems } from './gallery-items.js';
// Change code below this line
const instance = basicLightbox.create(
  `<img src="" width="800" height="600">`,
   {
      onShow: (instance) => {
       document.addEventListener('keydown', onPressEscCloseModal);
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', onPressEscCloseModal);
      },
    } 
);

const refs = {
  gallery: document.querySelector('.gallery'),
  image: instance.element().querySelector('img'),
}


const createMarkupEl = galleryItems.map(({ original, preview, description}) =>
  `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`)
.join('');


refs.gallery.innerHTML = createMarkupEl;

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(e) { 
  e.preventDefault();
  if (e.target.nodeName !== "IMG") { 
    return
  }
  
  refs.image.src = e.target.dataset.source;
  instance.show();
}

function onPressEscCloseModal(e) { 
  if (e.code === 'Escape') {
    instance.close();
   }
}
