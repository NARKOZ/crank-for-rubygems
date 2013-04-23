function openRubygemsPage(context) {
  chrome.tabs.create({
    url: 'https://rubygems.org/gems/' + context.selectionText
  });
}

chrome.contextMenus.create({
  'title': 'Open in Rubygems',
  'contexts': ['selection'],
  'onclick': openRubygemsPage
});
