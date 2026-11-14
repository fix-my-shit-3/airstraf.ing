/* Tells a player when the game's script never started (FB37, "on some mobile devices it is not
   possible to launch ... the game at all"): a browser that cannot read the script (an iPhone on
   iOS 15), a game file that did not load. Until now the loading cover simply stayed for ever -
   the game's own failure popup (app/boot-failure.ts) needs the script to run.
   Plain old JavaScript on purpose: this has to work where the game does not. A file of its own
   because the page allows no inline script (tools/csp.mjs). It only watches until the game's
   canvas exists; everything after that is the game's own business. */
(function () {
  'use strict';
  var reason = '';
  var box = null;
  var timer = 0;

  function started() {
    return !!document.getElementById('game');
  }

  function line(text, css) {
    var el = document.createElement('div');
    el.style.cssText = css;
    el.textContent = text;
    return el;
  }

  function show() {
    var cover = document.getElementById('boot');
    if (box || started() || !cover) return;
    box = document.createElement('div');
    box.id = 'boot-failed';
    box.setAttribute('role', 'alert');
    box.style.cssText =
      'margin:18px auto 0;max-width:560px;padding:0 16px;text-align:center;' +
      'font:600 15px/1.4 Arial,sans-serif;color:#fff';
    box.appendChild(line('The game could not start in this browser.', ''));
    box.appendChild(
      line(
        'Update the browser or the device (iPhone and iPad: iOS 16.4 or newer) or open the ' +
          'page in a current Chrome, Firefox or Safari.',
        'margin-top:6px;font-weight:400;opacity:.8',
      ),
    );
    if (reason)
      box.appendChild(
        line(
          reason.slice(0, 200),
          'margin-top:8px;font-weight:400;font-size:12px;opacity:.55;word-break:break-word',
        ),
      );
    (cover.querySelector('.boot__center') || cover).appendChild(box);
    var fill = cover.querySelector('.boot__fill');
    if (fill) fill.style.animationPlayState = 'paused';
    // (it started after all - a slow device: the note goes)
    var check = setInterval(function () {
      if (!started()) return;
      clearInterval(check);
      if (box && box.parentNode) box.parentNode.removeChild(box);
      if (fill) fill.style.animationPlayState = '';
      box = null;
    }, 500);
  }

  /* not at once: the game may start in spite of an error some other script threw */
  function failed(why) {
    if (started() || reason) return;
    reason = String(why || 'unknown error');
    clearTimeout(timer);
    timer = setTimeout(show, 2500);
  }

  window.addEventListener(
    'error',
    function (e) {
      if (started() || !e) return;
      var t = e.target;
      if (t && t !== window && t.tagName === 'SCRIPT') {
        failed('A game file did not load: ' + String(t.src || '').replace(/^.*\//, ''));
        return;
      }
      if (e.message) failed(e.message);
    },
    true,
  );
  window.addEventListener('unhandledrejection', function (e) {
    if (started() || !e) return;
    var r = e.reason;
    failed(r && r.message ? r.message : r);
  });
})();
