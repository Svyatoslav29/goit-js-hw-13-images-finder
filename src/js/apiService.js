export default class PixabyApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
    }
  
    fetchArticles() {
      const API_KEY = '23250657-60999439b4e5e927be309f9a4';
      const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}&key=${API_KEY}`;
  
      return fetch(BASE_URL)
        .then(r => r.json())
        .then(data => {
          this.incrementPage();
  
          return data.hits;
        })
        .catch(err => console.log('Error'));
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