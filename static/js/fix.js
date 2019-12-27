/**
 * Created by tom on 2017/7/20.
 */
;(function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});
  win.refreshRemTimes = 0;
  if (metaEl) {
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }
  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // In iOS, for 2 and 3 screens, use 2 times the solution, and for the rest, use 1 times the solution
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // Other equipment, still use 1 - fold solution
      dpr = 1;
    }
    scale = 1 / dpr;
  }
  //Add the data-dpr attribute for the HTML tag
  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    // Dynamically setting meta
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }
  function ispc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  //Rem is set based on DPR and physical pixels
  function refreshRem(){
    win.refreshRemTimes++;
    //GetBoundingClientRect ().width equals physical pixels
    var width = docEl.getBoundingClientRect().width;
    // Width/DPR > 540 is equal to independent pixels
    if(ispc()){
      var v = docEl.clientHeight;
      width = parseInt(v*0.5625)
    }
    // else {
    //   if (width / dpr > 640) {
    //     width = 640 * dpr;
    //   }
    // }

    var rem = width / 10; // Divide the screen width into 10 parts, and 1 part is 1rem.rem transform px calculation formula =d*(width/10)
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }
  // Listen for window changes and resize
  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  //When the page is reloaded, determine if it is a cache, and if so, execute refreshRem()
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  // if (doc.readyState === 'complete') {
  //   doc.body.style.fontSize = 12 * dpr + 'px';
  //
  // } else {
  //   doc.addEventListener('DOMContentLoaded', function(e) {
  //     doc.body.style.fontSize = 12 * dpr + 'px';
  //   }, false);
  // }


    refreshRem();
  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }
  flexible.px2rem = function(d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }
})(window, window['lib'] || (window['lib'] = {}));
