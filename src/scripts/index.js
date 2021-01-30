import '../styles/index.scss';
import gsap from 'gsap';

/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
function wrapChars(str, tmpl) {
  return str.replace(/\w/g, tmpl || '<span>$&</span>');
}

/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || '<span>$&</span>');
}

/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
function wrapLines(str, tmpl) {
  return str.replace(/.+$/gm, tmpl || '<span>$&</span>');
}

/*!
 * FitText.js 1.0 jQuery free version
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 * Modified by Slawomir Kolodziej http://slawekk.info
 *
 * Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
 */
(function () {
  var addEvent = function (el, type, fn) {
    if (el.addEventListener) el.addEventListener(type, fn, false);
    else el.attachEvent('on' + type, fn);
  };

  var extend = function (obj, ext) {
    for (var key in ext) if (ext.hasOwnProperty(key)) obj[key] = ext[key];
    return obj;
  };

  window.fitText = function (el, kompressor, options) {
    var settings = extend(
      {
        minFontSize: -1 / 0,
        maxFontSize: 1 / 0,
      },
      options
    );

    var fit = function (el) {
      var compressor = kompressor || 1;

      var resizer = function () {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      };

      // Call once to set.
      resizer();

      // Bind events
      // If you have any js library which support Events, replace this part
      // and remove addEvent function (or use original jQuery version)
      addEvent(window, 'resize', resizer);
      addEvent(window, 'orientationchange', resizer);
    };

    if (el.length) for (var i = 0; i < el.length; i++) fit(el[i]);
    else fit(el);

    // return set of elements
    return el;
  };
})();

/* #region  Intro */

// Fit text
const $header = document.querySelector('.title-main');
window.fitText($header, 0.7);

// Split header in spans
const content = $header.textContent;
const spans = wrapChars(content);
$header.innerHTML = spans;

// Animate intro
const introTl = gsap.timeline();

introTl.from('.title-main span', {
  y: '100%',
  stagger: 0.025, // 0.1 seconds between when each ".box" element starts animating
  duration: 1,
  delay: 2.5,
  ease: 'power2.out',
});

introTl.from(
  '#main-header',
  {
    y: '-100%',
    duration: 1,
    ease: 'expo.out',
    autoAlpha: 0,
  },
  '-=.6'
);

introTl.from(
  '.cookie-banner__content',
  {
    y: '100%',
    duration: 1,
    ease: 'expo.out',
    autoAlpha: 0,
  },
  '-=.6'
);

// Hide cookies
const hideCookies = () => {
  gsap.to('.cookie-banner__content', {
    y: '100%',
    duration: 1,
    ease: 'expo.out',
    autoAlpha: 0,
  });
};

const $cookie = [document.querySelector('.cookie-banner__accept'), document.querySelector('.cookie-banner__close')];
$cookie.forEach((el) => el.addEventListener('click', hideCookies));

// Click indicator
const $clickIndicator = document.querySelector('.click-indicator');
let indicatorIsClicked = false;

const clickIndicator = (e) => {
  if (!indicatorIsClicked) {
    $clickIndicator.style.transform = `translate(${e.clientX + 15}px, ${e.clientY - 15}px)`;
  } else {
    $clickIndicator.style.opacity = 0;
  }
};

window.addEventListener('mousemove', clickIndicator);
window.addEventListener('mousedown', () => (indicatorIsClicked = true));

/* #endregion */
