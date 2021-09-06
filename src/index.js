import './sass/styles.scss';
import galleryCards from './templates/card.hbs';
import { refs } from './js/refs';
import PixabyApiService from './js/apiService';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, success, defaultModules } from '@pnotify/core';

const pixabyApiService = new PixabyApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabyApiService.query = e.currentTarget.elements.query.value;
  pixabyApiService.resetPage();
  pixabyApiService.fetchArticles().then(data => {
    errorResult(data);
    clearArticlesContainer();
  });
  refs.loadMoreBtn.classList.add('is-open');
}

function errorResult(data) {
  if (data.length === 0) {
    error({
      text: 'Picture not found',
      delay: 1500,
    });
  }
  pixabyApiService.fetchArticles().then(appArticlesMarkup);
  return;
}

function onLoadMore(e) {
  e.preventDefault();

  pixabyApiService
    .fetchArticles()
    .then(appArticlesMarkup)
    .then(() => {
      refs.loadMoreBtn.scrollIntoView({ block: 'end', behavior: 'smooth' });
      success({ text: 'More pictures uploaded' });
    });
}

function appArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryCards(hits));
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
