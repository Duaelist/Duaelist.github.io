// Language switch helper (EN / ES).
// - remembers the visitor's explicit choice
// - keeps the current #section when switching language
// - on the English home page, sends first-time Spanish-language browsers to /es/
(function () {
  var KEY = 'lang-pref';
  var body = document.body;
  var current = body.getAttribute('data-lang');
  var enUrl = body.getAttribute('data-en-url');
  var esUrl = body.getAttribute('data-es-url');
  if (!current || !enUrl || !esUrl) return; // not one of the two home pages

  document.querySelectorAll('.lang-switch a').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem(KEY, a.getAttribute('data-lang')); } catch (e) {}
      if (location.hash) a.href = a.href.split('#')[0] + location.hash;
    });
  });

  if (current !== 'en') return; // never redirect away from the Spanish page

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  var wantsSpanish = saved === 'es' ||
    (!saved && /^es\b/i.test(navigator.language || ''));

  if (wantsSpanish) location.replace(esUrl + location.hash);
})();
