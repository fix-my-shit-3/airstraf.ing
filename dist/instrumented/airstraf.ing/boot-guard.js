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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdC1ndWFyZC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi9yZWFkYWJsZS9haXJzdHJhZi5pbmcvYm9vdC1ndWFyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUZWxscyBhIHBsYXllciB3aGVuIHRoZSBnYW1lJ3Mgc2NyaXB0IG5ldmVyIHN0YXJ0ZWQgKEZCMzcsIFwib24gc29tZSBtb2JpbGUgZGV2aWNlcyBpdCBpcyBub3RcbiAgIHBvc3NpYmxlIHRvIGxhdW5jaCAuLi4gdGhlIGdhbWUgYXQgYWxsXCIpOiBhIGJyb3dzZXIgdGhhdCBjYW5ub3QgcmVhZCB0aGUgc2NyaXB0IChhbiBpUGhvbmUgb25cbiAgIGlPUyAxNSksIGEgZ2FtZSBmaWxlIHRoYXQgZGlkIG5vdCBsb2FkLiBVbnRpbCBub3cgdGhlIGxvYWRpbmcgY292ZXIgc2ltcGx5IHN0YXllZCBmb3IgZXZlciAtXG4gICB0aGUgZ2FtZSdzIG93biBmYWlsdXJlIHBvcHVwIChhcHAvYm9vdC1mYWlsdXJlLnRzKSBuZWVkcyB0aGUgc2NyaXB0IHRvIHJ1bi5cbiAgIFBsYWluIG9sZCBKYXZhU2NyaXB0IG9uIHB1cnBvc2U6IHRoaXMgaGFzIHRvIHdvcmsgd2hlcmUgdGhlIGdhbWUgZG9lcyBub3QuIEEgZmlsZSBvZiBpdHMgb3duXG4gICBiZWNhdXNlIHRoZSBwYWdlIGFsbG93cyBubyBpbmxpbmUgc2NyaXB0ICh0b29scy9jc3AubWpzKS4gSXQgb25seSB3YXRjaGVzIHVudGlsIHRoZSBnYW1lJ3NcbiAgIGNhbnZhcyBleGlzdHM7IGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhhdCBpcyB0aGUgZ2FtZSdzIG93biBidXNpbmVzcy4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgcmVhc29uID0gJyc7XG4gIHZhciBib3ggPSBudWxsO1xuICB2YXIgdGltZXIgPSAwO1xuICBmdW5jdGlvbiBzdGFydGVkKCkge1xuICAgIHJldHVybiAhIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG4gIH1cbiAgZnVuY3Rpb24gbGluZSh0ZXh0LCBjc3MpIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzcztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICBmdW5jdGlvbiBzaG93KCkge1xuICAgIHZhciBjb3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib290Jyk7XG4gICAgaWYgKGJveCB8fCBzdGFydGVkKCkgfHwgIWNvdmVyKSByZXR1cm47XG4gICAgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm94LmlkID0gJ2Jvb3QtZmFpbGVkJztcbiAgICBib3guc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgYm94LnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOjE4cHggYXV0byAwO21heC13aWR0aDo1NjBweDtwYWRkaW5nOjAgMTZweDt0ZXh0LWFsaWduOmNlbnRlcjsnICsgJ2ZvbnQ6NjAwIDE1cHgvMS40IEFyaWFsLHNhbnMtc2VyaWY7Y29sb3I6I2ZmZic7XG4gICAgYm94LmFwcGVuZENoaWxkKGxpbmUoJ1RoZSBnYW1lIGNvdWxkIG5vdCBzdGFydCBpbiB0aGlzIGJyb3dzZXIuJywgJycpKTtcbiAgICBib3guYXBwZW5kQ2hpbGQobGluZSgnVXBkYXRlIHRoZSBicm93c2VyIG9yIHRoZSBkZXZpY2UgKGlQaG9uZSBhbmQgaVBhZDogaU9TIDE2LjQgb3IgbmV3ZXIpIG9yIG9wZW4gdGhlICcgKyAncGFnZSBpbiBhIGN1cnJlbnQgQ2hyb21lLCBGaXJlZm94IG9yIFNhZmFyaS4nLCAnbWFyZ2luLXRvcDo2cHg7Zm9udC13ZWlnaHQ6NDAwO29wYWNpdHk6LjgnKSk7XG4gICAgaWYgKHJlYXNvbikgYm94LmFwcGVuZENoaWxkKGxpbmUocmVhc29uLnNsaWNlKDAsIDIwMCksICdtYXJnaW4tdG9wOjhweDtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjEycHg7b3BhY2l0eTouNTU7d29yZC1icmVhazpicmVhay13b3JkJykpO1xuICAgIChjb3Zlci5xdWVyeVNlbGVjdG9yKCcuYm9vdF9fY2VudGVyJykgfHwgY292ZXIpLmFwcGVuZENoaWxkKGJveCk7XG4gICAgdmFyIGZpbGwgPSBjb3Zlci5xdWVyeVNlbGVjdG9yKCcuYm9vdF9fZmlsbCcpO1xuICAgIGlmIChmaWxsKSBmaWxsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgIC8vIChpdCBzdGFydGVkIGFmdGVyIGFsbCAtIGEgc2xvdyBkZXZpY2U6IHRoZSBub3RlIGdvZXMpXG4gICAgdmFyIGNoZWNrID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzdGFydGVkKCkpIHJldHVybjtcbiAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2spO1xuICAgICAgaWYgKGJveCAmJiBib3gucGFyZW50Tm9kZSkgYm94LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYm94KTtcbiAgICAgIGlmIChmaWxsKSBmaWxsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICcnO1xuICAgICAgYm94ID0gbnVsbDtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgLyogbm90IGF0IG9uY2U6IHRoZSBnYW1lIG1heSBzdGFydCBpbiBzcGl0ZSBvZiBhbiBlcnJvciBzb21lIG90aGVyIHNjcmlwdCB0aHJldyAqL1xuICBmdW5jdGlvbiBmYWlsZWQod2h5KSB7XG4gICAgaWYgKHN0YXJ0ZWQoKSB8fCByZWFzb24pIHJldHVybjtcbiAgICByZWFzb24gPSBTdHJpbmcod2h5IHx8ICd1bmtub3duIGVycm9yJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoc2hvdywgMjUwMCk7XG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoc3RhcnRlZCgpIHx8ICFlKSByZXR1cm47XG4gICAgdmFyIHQgPSBlLnRhcmdldDtcbiAgICBpZiAodCAmJiB0ICE9PSB3aW5kb3cgJiYgdC50YWdOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgZmFpbGVkKCdBIGdhbWUgZmlsZSBkaWQgbm90IGxvYWQ6ICcgKyBTdHJpbmcodC5zcmMgfHwgJycpLnJlcGxhY2UoL14uKlxcLy8sICcnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlLm1lc3NhZ2UpIGZhaWxlZChlLm1lc3NhZ2UpO1xuICB9LCB0cnVlKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKHN0YXJ0ZWQoKSB8fCAhZSkgcmV0dXJuO1xuICAgIHZhciByID0gZS5yZWFzb247XG4gICAgZmFpbGVkKHIgJiYgci5tZXNzYWdlID8gci5tZXNzYWdlIDogcik7XG4gIH0pO1xufSkoKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFlBQVk7RUFDWCxZQUFZO0VBRVosSUFBSSxNQUFNLEdBQUcsRUFBRTtFQUNmLElBQUksR0FBRyxHQUFHLElBQUk7RUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDOztFQUNiLFNBQVMsT0FBTyxBQUFDLEdBQUU7SUFDakIsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7RUFDMUM7O0VBQ0EsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN2QixJQUFJLEVBQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMzQyxFQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHO0lBQzNCLEVBQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSTtJQUMxQixPQUFPLEVBQU87RUFDaEI7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
