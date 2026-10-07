// Opens a project overlay when a "Most recent works" card is clicked.
(function () {
  var modal = document.getElementById('credit-modal');
  if (!modal || typeof modal.showModal !== 'function') return;

  var panel = modal.querySelector('.credit-modal__panel');
  var content = modal.querySelector('.credit-modal__content');
  var closeBtn = modal.querySelector('.credit-modal__close');
  var lastTrigger = null;
  var closing = false;

  function open(index, trigger) {
    var tpl = document.getElementById('credit-detail-' + index);
    if (!tpl) return;
    content.innerHTML = '';
    content.appendChild(tpl.content.cloneNode(true));
    lastTrigger = trigger;
    modal.showModal();
    modal.scrollTop = 0;
    document.body.classList.add('modal-open');
    // Two frames so the closed state paints first and the transition runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('is-open'); });
    });
  }

  function close() {
    if (!modal.open || closing) return;
    closing = true;
    modal.classList.remove('is-open');
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      panel.removeEventListener('transitionend', onEnd);
      modal.close();
      document.body.classList.remove('modal-open');
      closing = false;
      if (lastTrigger) lastTrigger.focus();
    }
    function onEnd(e) { if (e.target === panel) finish(); }
    panel.addEventListener('transitionend', onEnd);
    setTimeout(finish, 400); // fallback (e.g. reduced motion)
  }

  document.querySelectorAll('.credit-card__open').forEach(function (btn) {
    btn.addEventListener('click', function () { open(btn.dataset.credit, btn); });
  });

  closeBtn.addEventListener('click', close);
  // Click on the dark area outside the panel
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  // Esc key: use the animated close instead of the instant default
  modal.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
})();
