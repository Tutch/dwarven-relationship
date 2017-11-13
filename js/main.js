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

  var dwarvenNameId = [];

  //id and name are necessary in order to build the graph
  for(i=0; i<ids.length; i++) {
    next:
    for(j=0; j<entities.length; j++) {
      if(ids[i] == entities[j].id) {
        dwarvenNameId.push({id:ids[i], name:entities[j].name});
        break next;
      }
    }
  }

  RelationshipGraph('relationship', entities, ids, dwarvenNameId);
}, true);

// Legends XML upload
fileChooser.addEventListener('change', function(e) {
    xmlReader.handleFileSelection(function(xml) {
        entitySearcher.legendsXML = xml;
        searchForm.getElementsByTagName('input')[1].disabled = false;
        searchForm.getElementsByTagName('input')[0].disabled  = false;
    });
}, false);
