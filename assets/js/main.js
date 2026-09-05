const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const dialog = document.querySelector('#image-dialog');
const dialogImage = dialog?.querySelector('img');
const dialogCaption = dialog?.querySelector('p');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!dialog || !dialogImage || !dialogCaption) return;
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.dataset.alt || '';
    dialogCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
  });
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());

const copyButton = document.querySelector('[data-copy]');
copyButton?.addEventListener('click', async () => {
  const target = document.querySelector(copyButton.dataset.copy);
  if (!target) return;
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    const oldLabel = copyButton.textContent;
    copyButton.textContent = 'Copied';
    setTimeout(() => { copyButton.textContent = oldLabel; }, 1600);
  } catch {
    copyButton.textContent = 'Select and copy';
  }
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
