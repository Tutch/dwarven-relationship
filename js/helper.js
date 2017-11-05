function showDwarves(entities) {
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
