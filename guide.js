const search = document.querySelector('#search');
const topic = document.querySelector('#topic');
const cards = [...document.querySelectorAll('article')];
function filter() {
  const query = search.value.toLocaleLowerCase().trim();
  let count = 0;
  for (const card of cards) {
    const number = card.id.replace('prop-', '');
    const text = `${number} prop ${number} proposition ${number} ${card.textContent}`.toLocaleLowerCase();
    card.hidden = !(text.includes(query) && (topic.value === 'All topics' || card.dataset.topic === topic.value));
    if (!card.hidden) count++;
  }
  document.querySelector('#count').textContent = count === 14 ? 'Showing all 14 measures' : `Showing ${count} of 14 measures`;
  document.querySelector('#empty').hidden = count !== 0;
}
search.addEventListener('input', filter);
topic.addEventListener('change', filter);
document.querySelector('#print').addEventListener('click', () => window.print());
function revealHash() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.matches('article') && target.hidden) {
    search.value = '';
    topic.value = 'All topics';
    filter();
    target.scrollIntoView();
  }
}
window.addEventListener('hashchange', revealHash);
document.querySelector('.jump').addEventListener('click', event => {
  const anchor = event.target.closest('a');
  if (anchor && document.querySelector(anchor.getAttribute('href'))?.hidden) {
    search.value = '';
    topic.value = 'All topics';
    filter();
  }
});
