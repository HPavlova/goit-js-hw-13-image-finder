const API_KEY = '22966044-c718c1bbe050e09f7279dea2f';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(images => {
        this.incrementPage();
        // console.log(images.hits);
        return images.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
