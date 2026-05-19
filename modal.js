(function () {
  'use strict';

  const modal = document.getElementById('member-modal');
  if (!modal) return;
  const content = document.getElementById('member-modal-content');
  const triggers = document.querySelectorAll('[data-panel]');
  let lastTrigger = null;

  function openModal(panelId, trigger) {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    // Clone panel inner content into the modal
    const clone = panel.cloneNode(true);
    clone.removeAttribute('hidden');
    clone.removeAttribute('id');
    content.innerHTML = '';
    content.appendChild(clone);

    lastTrigger = trigger;
    modal.removeAttribute('hidden');
    document.documentElement.classList.add('modal-open');

    // Stagger reveal
    requestAnimationFrame(() => modal.classList.add('is-open'));

    // Focus close button after a tick
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('modal-open');
    // Wait for transition, then hide
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      content.innerHTML = '';
      if (lastTrigger) {
        lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
      }
    }, 240);
  }

  triggers.forEach((t) => {
    t.addEventListener('click', (e) => {
      const id = t.getAttribute('data-panel');
      if (id) {
        e.preventDefault();
        openModal(id, t);
      }
    });
  });

  // Close on backdrop or close button
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-modal-close')) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
