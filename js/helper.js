function Helper(){/*eerie silence over the peaks*/}

Helper.prototype.showDwarves = function(entities) {
  var dorfList = document.getElementById('dorfs');
  dorfList.innerHTML = '';

  for(i=0; i<entities.length; i++) {
      var output = entities[i].name + ', ' + entities[i].type.replace('_',' ').toLowerCase();
      var p = document.createElement('P');
      var text = document.createTextNode(output);
      p.appendChild(text);
      dorfList.appendChild(p);
  }
}

Helper.prototype.joinNamesAndIds = function(ids,entities) {
    var dwarvenNamesIds = [];

    for(i=0; i<ids.length; i++) {
      next:
      for(j=0; j<entities.length; j++) {
        if(ids[i] == entities[j].id) {
          dwarvenNamesIds.push({id:ids[i], name:entities[j].name});
          break next;
        }
      }
    }

    return dwarvenNamesIds;
}

Helper.prototype.showGraphHeader = function() {
  var header = document.getElementById('graphHeader');
  var h3List = header.getElementsByTagName('h3');
  var selectList = header.getElementsByTagName('select');

  // show header
  header.style.display = 'block';

  // show titles
  for(i=0; i<h3List.length; i++) {
    h3List[i].style.display = 'block';
  }

  // show selects
  for(i=0; i<selectList.length; i++) {
    selectList[i].style.display = 'block';
  }
}

Helper.prototype.createEntityDropdown = function(entities) {
  var select = document.getElementById('siteEntities');
  select.innerHTML = '';

  select.innerHTML += '<option value="" selected disabled hidden>Select an entity</option>'

  for(var i = 0; i < entities.length; i++) {
      select.innerHTML += '<option value=\'' + entities[i].id + '\'>' +
                             toTitleCase(entities[i].name) +
                          '</option>';
  }
}
