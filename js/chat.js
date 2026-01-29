(() => {
  const btn = document.querySelector('.support-btn');
  const modal = document.getElementById('supportModal');
  const form = document.getElementById('supportForm');
  const toast = document.getElementById('supportToast');
  let toastTimer;
  let lastFocus;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const focusableSel = 'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])';
    const panel = modal.querySelector('.support-modal__panel');
    const focusables = Array.from(panel.querySelectorAll(focusableSel)).filter(el => !el.disabled);
    (focusables[0] || panel).focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function showToast(text) {
    toast.querySelector('.support-toast__text').textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  btn.addEventListener('click', openModal);

  modal.addEventListener('click', (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close === 'true') closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const panel = modal.querySelector('.support-modal__panel');
      const focusableSel = 'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(panel.querySelectorAll(focusableSel)).filter(el => !el.disabled);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!email || !message) return;
    form.reset();
    showToast('Message sent successfully');
    setTimeout(closeModal, 400);
  });
})();
