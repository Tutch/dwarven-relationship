function RelationshipGraph() {
  this.colors = {
    male:  '#6fb8e6',
    female: '#db8fd3',
    buddy: '#63c54f',
    acquaintance: '#a4b0a2',
    family: '#e0a847',
    marriage: '#f7ed46',
    lovers: '#db3434'
  }

  this.familymembers = ['father','mother','child'];
}

RelationshipGraph.prototype.createNode = function(entity) {
  var node = '\"'+ toTitleCase(entity.name) +'\"';
  var color = '';
  var race_profession = `${toTitleCase(entity.race)} ${toTitleCase(entity.type)}`

  if(entity.caste == "FEMALE") {
    color = this.colors.female;
  }else{
    color = this.colors.male;
  }

  return node  + `[color=${color}
                   fillcolor=${color}
                   title="<b>${race_profession}</b><br/>
                   Born on year ${entity.birth}<br/>"
                  ];`;
}

RelationshipGraph.prototype.showLegend = function () {
  document.getElementById('legend').style.display = 'block';
}

RelationshipGraph.prototype.createEdge = function(entityOne, entityTwo, relationship) {
  var color = 'red';
  var weight = 1.0;
  var style = '""';
  var label = '""';

  if(parseInt(relationship.rep_buddy) > 1) {
    color = this.colors.buddy;
  }else if(relationship.rep_buddy <= 1 &&
           relationship.rep_friendly == -1 && relationship.meet_count > 0) {
    color = this.colors.acquaintance;
    style = 'dotted';
  }else if(relationship.rep_friendly > 0  && relationship.meet_count > 0) {
    color = this.colors.buddy;
    style = 'dashed';
  }else if(relationship.link_type != undefined) {
    if(this.familymembers.includes(relationship.link_type)) {
      color = this.colors.family;
      label = relationship.link_type;
    }else if(relationship.link_type == 'spouse') {
      color = this.colors.marriage;
    }else if(relationship.link_type == 'lover') {
      color = this.colors.lovers;
    }
  }

  var edge= `\"${toTitleCase(entityOne.name)}\" --
             \"${toTitleCase(entityTwo.name)}\"[color=${color} style=${style} label=${label}];`;
  return edge;
}

RelationshipGraph.prototype.drawSingleGraph = function(element, entities, dwarvenNamesIds, id) {
  var container = document.getElementById(element);
  // Each entity node
  var nodes='';
  // All edges
  var edges='';

  // Step one: find the selected entity on the entity list
  var selectedEntity = {};
  var entityRelationships = [];
  var entityLinks = [];

  for(i=0; i<entities.length; i++) {
    if(entities[i].id == id) {
      selectedEntity = entities[i];
      entityRelationships = entities[i].relationships;
      entityLinks = entities[i].hflinks;
      break;
    }
  }

  // Step two: add its node
  nodes += this.createNode(selectedEntity);

  // Step three: find every entity on-site that is related to it (relationship)
  for(i=0; i<entityRelationships.length; i++) {
    var relationship = entityRelationships[i];

    if(relationship.meet_count > 0) {
      for(j=0; j<entities.length; j++) {
          if(relationship.hfid == entities[j].id) {
            nodes += this.createNode(entities[j]);
            edges += this.createEdge(selectedEntity, entities[j], relationship);
            break;
          }
      }
    }
  }

  // Step three: find every entity on-site that is related to it (hflink)
  for(i=0; i<entityLinks.length; i++) {
    var link = entityLinks[i];

    for(j=0; j<entities.length; j++) {
        if(link.hfid == entities[j].id) {
          nodes += this.createNode(entities[j]);
          edges += this.createEdge(selectedEntity, entities[j], link);
          break;
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

  var calcLength = 300;

  options.edges = {
    length: calcLength,
    width: 2
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
  var graph = this;
  network.once("afterDrawing", function() {
      document.getElementById('loading').style.display = 'none';
      graph.showLegend();
  });
}
