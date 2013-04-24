function openRubygemsPage(context) {
  chrome.tabs.create({
    url: 'https://rubygems.org/gems/' + context.selectionText
  });
}

chrome.contextMenus.create({
  'title': 'Open in RubyGems.org',
  'contexts': ['selection'],
  'onclick': openRubygemsPage
});
