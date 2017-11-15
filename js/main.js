var entitySearcher    = new EntitySearcher();
var xmlReader         = new XMLReader();
var relationshipGraph = new RelationshipGraph();
var helper            = new Helper();

var fileChooser  = document.getElementById('xmlDumpUploader');
var siteEntities = document.getElementById('siteEntities');

var entities;
var dwarvenNamesIds;
var id;

// Search fort by name
var searchForm = document.getElementById('fortsearch');
searchForm.disabled = true;

// Searching for a fort
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var inputValue = searchForm.getElementsByTagName('input')[0].value;
  generateValues(inputValue);
}, true);

// Legends XML upload
fileChooser.addEventListener('change', function(e) {
    xmlReader.handleFileSelection(function(xml) {
        entitySearcher.legendsXML = xml;
        searchForm.getElementsByTagName('input')[1].disabled = false;
        searchForm.getElementsByTagName('input')[0].disabled  = false;
    });
}, false);

siteEntities.addEventListener('change', function(e,d) {
  var id = siteEntities.options[siteEntities.selectedIndex].value;
  relationshipGraph.drawSingleGraph('relationship', entities, dwarvenNamesIds, id);
}, false);

function generateValues(sitename) {
  var foundSite = entitySearcher.searchForSite(sitename);
  var ids = entitySearcher.searchForSettler(foundSite.id);
  entities = entitySearcher.getHistoricalFigureById(ids);
  dwarvenNamesIds = helper.joinNamesAndIds(ids, entities);

  console.log(entities);
  console.log(dwarvenNamesIds);

  helper.createEntityDropdown(dwarvenNamesIds);
  helper.showGraphHeader();
  //RelationshipGraph('relationship', entities, ids, dwarvenNameId);
}
