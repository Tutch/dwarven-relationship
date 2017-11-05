// Entity Searcher object
var entitySearcher = new EntitySearcher();
var xmlReader = new XMLReader();

// Upload legends XML dump
var fileChooser = document.getElementById('xmlDumpUploader');

// Search fort by name
var searchForm = document.getElementById('fortsearch');
searchForm.disabled = true;

// Searching for a fort
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var inputValue = searchForm.getElementsByTagName('input')[0].value;
  var foundSite = entitySearcher.searchForSite(inputValue);
  var ids = entitySearcher.searchForSettler(foundSite.id);
  var entities = entitySearcher.getHistoricalFigureById(ids);

  showDwarves(entities);
}, true);

// Legends XML upload
fileChooser.addEventListener('change', function(e) {
    xmlReader.handleFileSelection(function(xml) {
        entitySearcher.legendsXML = xml;
        searchForm.getElementsByTagName('input')[1].disabled = false;
    });
}, false);
