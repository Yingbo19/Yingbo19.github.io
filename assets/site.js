const search = document.querySelector('#publication-search');
if (search) {
  const papers = [...document.querySelectorAll('.paper')];
  const count = document.querySelector('#publication-count');
  const empty = document.querySelector('#empty-results');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const paper of papers) {
      paper.hidden = !paper.textContent.toLocaleLowerCase().includes(query);
      if (!paper.hidden) visible += 1;
    }
    for (const section of document.querySelectorAll('.pub-year')) {
      section.hidden = ![...section.querySelectorAll('.paper')].some(paper => !paper.hidden);
    }
    count.textContent = `${visible} ${visible === 1 ? 'paper' : 'papers'}`;
    empty.hidden = visible !== 0;
  });
}

// Keep the image links useful without JavaScript; enhance them with a native dialog.
const figureLinks = document.querySelectorAll('a[data-figure]');
if (figureLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'figure-dialog';
  dialog.setAttribute('aria-label', 'Research figure');
  dialog.innerHTML = '<button type="button" class="dialog-close" aria-label="Close figure" title="Close figure"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button><img alt=""><p></p>';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  for (const link of figureLinks) {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      const source = link.closest('figure')?.querySelector('figcaption');
      caption.replaceChildren(...(source ? [...source.childNodes].map(node => node.cloneNode(true)) : []));
      dialog.showModal();
    });
  }
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}
