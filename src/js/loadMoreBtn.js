export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.element = document.getElementById('.my-element-selector');
    // refs.label = refs.btn.querySelector('.label');
    // refs.spinner = refs.btn.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.btn.disabled = false;
    // this.refs.label.textContent = 'Показать ещё';
    // this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.btn.disabled = true;
    // this.refs.label.textContent = 'AAAA';
    // this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.btn.classList.remove('is-hidden');
  }

  hide() {
    this.refs.btn.classList.add('is-hidden');
  }
  scroll() {
    this.refs.element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}

//===== Scroll =====
// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
