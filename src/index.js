import './sass/main.scss';
import NewsApiService from './js/apiService';
import onOpenModal from './js/image-lightbox';
import imagesTpl from './templates/card';
import refs from './js/refs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';

const newsApiService = new NewsApiService();
console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.imagesContainer.addEventListener('click', onOpenModal);

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.query.value;
  console.log(newsApiService.query);

  if (newsApiService.query === '') {
    const myNotice = error({
      type: 'notice',
      delay: 8000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
    return myNotice;
  }
  newsApiService.resetPage();

  newsApiService
    .fetchImages()
    .then(data => {
      clearImagesContainer();
      renderImages(data);
      onScrollMore();
    })
    .catch(error => console.log(error));
}

function renderImages(data) {
  appendImagesMarcup(data, imagesTpl);
}

function appendImagesMarcup(data, imagesTpl) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(data));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function onScrollMore() {
  const options = {
    rootMargin: '200px',
  };

  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && newsApiService.query !== '') {
        newsApiService
          .fetchImages()
          .then(data => {
            renderImages(data);
          })
          .catch(error => console.log(error));
      }
    });
  };

  const observer = new IntersectionObserver(onEntry, options);

  observer.observe(refs.target);
}
