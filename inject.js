/*jslint browser: true, devel: true */

function inject() {
  var destinoUrl = "http://sla.herokuapp.com/",
      file = document.querySelector('.final-path'),
      hasGems = file && file.innerText.match(/Gemfile|\.gemspec/),
      tokens = document.querySelectorAll('.blob-code.js-file-line .pl-k');

  if (!hasGems) { return; }

  [].forEach.call(tokens, function(line) {
    if (line.innerHTML === 'gem') {
      var gemEl = line.nextSibling.nextSibling;
      if (!gemEl) { return; }
      if (!gemEl.innerText.match(/'|"/)) { return; }
      var gem = gemEl.innerHTML.match(/span>([^<]+)/);
      if (!gem || !gem[1]) { return; }
      gem = gem[1];

      var htmlModified = '<a class="pl-pds" href="' + destinoUrl + gem + '">' + gem + '</a>';

      gemEl.innerHTML = gemEl.innerHTML.replace(gem, htmlModified);
    }
  });
}

function registerInjector() {
  var target = document.querySelector('#js-repo-pjax-container'),
      config = {
        attributes    : false,
        childList     : true,
        characterData : false
      };

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        inject();
      }
    });
  });

  if (target) { observer.observe(target, config); }
  inject();
}

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      registerInjector();
    }
  }, 10);
});
