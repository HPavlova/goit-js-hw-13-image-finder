import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  const dataImgSource = event.target.dataset.src;
  console.log(dataImgSource);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${dataImgSource}" width="800" height="600">
`);

  instance.show();
}
