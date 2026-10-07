/*
  Lavender Glass: behaviour for lavender-glass.css

  Put it in <head> (no defer) so the "hidden until scrolled" states apply before first paint:
    <script src="lavender-glass.js"></script>

  What it does
    1. adds class "lg-js" to <html>        (the CSS only hides things when this is set)
    2. <body data-lg-bg>                   inserts the animated background + moving lines
    3. [data-lg-words]                     splits text into words that fade in on scroll
    4. .lg-reveal .lg-stagger .lg-bar      get class "is-in" when scrolled into view
    5. [data-lg-count="40"]                counts up to 40 when scrolled into view
                                           optional: data-lg-suffix="+"

  If you add elements after page load (a framework, fetch, etc.) call LG.refresh().
*/
(function(){
  'use strict';
  var root = document.documentElement;
  root.classList.add('lg-js');

  var REVEAL = '.lg-reveal, .lg-stagger, .lg-bar, [data-lg-words], [data-lg-count]';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;

  /* ---- background with moving lines ---- */
  function addBackground(){
    if(document.querySelector('.lg-bg')) return;
    var bg = document.createElement('div');
    bg.className = 'lg-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML =
      '<svg viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      '<path d="M-50,180 C300,70 540,320 900,200 S1300,100 1500,210"/>' +
      '<path d="M-50,540 C260,440 640,660 980,520 S1340,430 1500,560"/>' +
      '<path d="M-50,820 C330,740 680,900 1040,800 S1370,720 1500,830"/>' +
      '</svg>';
    document.body.insertBefore(bg, document.body.firstChild);
  }

  /* ---- wrap each word in a span; keeps inline tags like <em> ---- */
  function splitWords(el){
    if(el.dataset.lgSplit === 'done') return;
    var i = 0;
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType === 3){
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(part){
            if(!part) return;
            if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span');
            s.className = 'lg-w';
            s.style.setProperty('--i', i++);
            s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if(n.nodeType === 1){ walk(n); }
      });
    })(el);
    el.dataset.lgSplit = 'done';
  }

  /* ---- number count-up (ease-out) ---- */
  function countUp(el){
    if(el.dataset.lgDone) return;
    el.dataset.lgDone = '1';
    var target = parseFloat(el.getAttribute('data-lg-count'));
    var suffix = el.getAttribute('data-lg-suffix') || '';
    if(isNaN(target)) return;
    if(reduce){ el.textContent = target + suffix; return; }
    var start = null, dur = 1100;
    function tick(now){
      if(start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (target % 1 ? v.toFixed(1) : Math.round(v)) + suffix;
      if(p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function reveal(el){
    el.classList.add('is-in');
    if(el.hasAttribute('data-lg-count')) countUp(el);
    Array.prototype.forEach.call(el.querySelectorAll('[data-lg-count]'), countUp);
  }

  function scan(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-lg-words]'), splitWords);
    var els = document.querySelectorAll(REVEAL);
    Array.prototype.forEach.call(els, function(el){
      if(el.classList.contains('is-in') || el.dataset.lgWatch) return;
      el.dataset.lgWatch = '1';
      if(io) io.observe(el); else reveal(el);
    });
  }

  function init(){
    if(document.body.hasAttribute('data-lg-bg')) addBackground();
    if('IntersectionObserver' in window){
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(!en.isIntersecting) return;
          reveal(en.target);
          io.unobserve(en.target);
        });
      }, {threshold: 0.15});
    }
    scan();
  }

  window.LG = {
    refresh: scan,
    theme: function(name){ root.setAttribute('data-lg-theme', name); }
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
