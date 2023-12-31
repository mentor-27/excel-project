class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) node = node.$el;
    if (Element.prototype.append) this.$el.append(node);
    else this.$el.appendChild(node);
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getPosData() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
    return this.$el;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagname, classes = '', htmlContent = null, textContent = null) => {
  const el = document.createElement(tagname);
  if (classes) el.classList.add(classes);
  if (htmlContent) el.innerHTML = htmlContent;
  if (textContent) el.textContent = textContent;
  return $(el);
}
