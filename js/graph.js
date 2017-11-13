// https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function RelationshipGraph(element, entities, idList, dwarvenNamesIds) {
  // create a network
  var container = document.getElementById(element);

  // Each entity node
  var nodes='';
  // All edges
  var edges='';

  var femaleNode = "[color=#db8fd3 fillcolor=#db8fd3]";
  var maleNode   = "[color=#6fb8e6 fillcolor=#6fb8e6]";

  for(i=0; i<entities.length; i++) {
    nodes += '\"'+ toTitleCase(entities[i].name) +'\"';
    if(entities[i].caste == "FEMALE") {
      nodes+= femaleNode + ";";
    }else{
      nodes+= maleNode + ";";
    }

    for(j=0; j<entities[i].relationships.length; j++) {
      //console.log(entities[i].relationships[j].hfid);
      if(idList.includes(entities[i].relationships[j].hfid)) {
        var result = dwarvenNamesIds.filter(x => x.id === entities[i].relationships[j].hfid);

        edges += '\"'+ toTitleCase(entities[i].name) + '\" -- \"'+ toTitleCase(result[0].name) +'\";';

        if(j != entities[i].relationships.length - 1) {
          //edges += ';'
        }
      }
    }

  }

  var DOTstring = 'network {'+ nodes + edges +'}';
  var parsedData = vis.network.convertDot(DOTstring);

  var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
  }

  var options = parsedData.options;

  options.autoResize = true;

  // you can extend the options like a normal JSON variable:
  options.nodes = {
     shape: 'box',
     margin: 5,
     font: {
       multi: true
     }
  }

  var calcLength = 300 + entities.length * 10;

  options.edges = {
    length: calcLength,
    //physics:false
  }

  options.layout = {
      improvedLayout: true
  }

  options.physics = {
    //enabled: false,
    adaptiveTimestep: true
    //stabilization: false
  }

  document.getElementById('loading').style.display = 'table';

  // create a network
  var network = new vis.Network(container, data, options);

  network.once("afterDrawing", function() {
      console.log('im back, bitch');
      document.getElementById('loading').style.display = 'none';
  });
}
