/**
 * Searches for stuff in the XML DOM.
 * This constructor takes the DOM object from a DOMParser and initializes an
 * internal variable with this value. Also a simple object to hold the site
 * values.
 */
function EntitySearcher(DOM) {
  this.legendsXML = DOM;
}

/**
 * Searches for a site based on sitename.
 * Sitename is converted to lowercase characters, since the legendsxml stores it
 * this way. Important to note that the entities name are all in english.
 */
EntitySearcher.prototype.searchForSite = function(sitename) {
    var sitesRoot = this.legendsXML.getElementsByTagName('sites')[0];
    var sites = sitesRoot.childNodes;
    sitename = sitename.toLowerCase();
    var site = {
      id:0,
      type:'',
      name:''
    }

    for(i=0; i<sites.length; i++) {
      if(sites[i].nodeName == 'site') {
        for(j=0; j<sites[i].childNodes.length; j++) {

          var siteChildren = sites[i].childNodes[j];

          if(siteChildren.nodeName == 'id') {
            site.id = siteChildren.childNodes[0].nodeValue;
          }else if(siteChildren.nodeName == 'type') {
            site.type = siteChildren.childNodes[0].nodeValue;
          }else if(siteChildren.nodeName == 'name') {
            site.name = siteChildren.childNodes[0].nodeValue;
          }
        }

        if(site.name == sitename) {
          break;
        }
      }
    }

    return site;
};

/**
 * Searches for historical events where an entity has settled at the players
 * fort.
 */
EntitySearcher.prototype.searchForSettler = function(siteid) {
    var hEventsRoot = this.legendsXML.getElementsByTagName('historical_events')[0];
    var hEvents = hEventsRoot.childNodes;
    var idList = [];

    for(i=0; i<hEvents.length; i++) {
      if(hEvents[i].nodeName == 'historical_event') {

        var info = {
          hfid:'',
          site:'',
          state:''
        };

        for(j=0; j<hEvents[i].childNodes.length; j++) {
          var eventChildren = hEvents[i].childNodes[j];

          if(eventChildren.nodeName == 'hfid') {
            info.hfid = eventChildren.childNodes[0].nodeValue;
          }else if(eventChildren.nodeName == 'site_id') {
            info.site = eventChildren.childNodes[0].nodeValue;
          }else if(eventChildren.nodeName == 'state') {
            info.state = eventChildren.childNodes[0].nodeValue;
          }
        }

        if(info.site == siteid && info.state == 'settled') {
          idList.push(info.hfid);
        }
      }
    }

    return idList;
};

EntitySearcher.prototype.getHistoricalFigureById = function(hfids) {
  var hFiguresRoot = this.legendsXML.getElementsByTagName('historical_figures')[0];
  var hFigures = hFiguresRoot.childNodes;
  var figList = [];

  for(i=0; i<hFigures.length; i++) {
    if(hFigures[i].nodeName == 'historical_figure') {

      var historical_figure = {
        id:'',
        name:'',
        race:'',
        caste:'',
        birth:'',
        death:'',
        type:'',
        relationships: [],
        hflinks: []
      };

      for(j=0; j<hFigures[i].childNodes.length; j++) {
        var figuresChildren = hFigures[i].childNodes[j];

        if(figuresChildren.nodeName == 'id') {
          historical_figure.id = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'name') {
          historical_figure.name = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'caste') {
          historical_figure.caste = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'race') {
          historical_figure.race = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'birth_year') {
          historical_figure.birth = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'death_year') {
          historical_figure.death = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'associated_type') {
          historical_figure.type = figuresChildren.childNodes[0].nodeValue;
        }else if(figuresChildren.nodeName == 'relationship_profile_hf') {
          var relationshipChildren = figuresChildren.childNodes;
          var relationship = {
            hfid:'',
            rep_friendly:-1,
            rep_buddy:-1,
            meet_count:''
          }

          for(h=0; h<relationshipChildren.length; h++) {
            if(relationshipChildren[h].nodeName == 'hf_id') {
              relationship.hfid = relationshipChildren[h].childNodes[0].nodeValue;
            }else if(relationshipChildren[h].nodeName == 'rep_friendly') {
              relationship.rep_friendly = relationshipChildren[h].childNodes[0].nodeValue;
            }else if(relationshipChildren[h].nodeName == 'rep_buddy') {
              relationship.rep_buddy = relationshipChildren[h].childNodes[0].nodeValue;
            }else if(relationshipChildren[h].nodeName == 'meet_count') {
              relationship.meet_count = relationshipChildren[h].childNodes[0].nodeValue;
            }
          }

          historical_figure.relationships.push(relationship);
        }else if(figuresChildren.nodeName == 'hf_link') {
          var hflinkChildren = figuresChildren.childNodes;

          var hflink = {
            hfid:'',
            link_type:''
          }

          for(h=0; h<hflinkChildren.length; h++) {
            if(hflinkChildren[h].nodeName == 'hfid') {
              hflink.hfid = hflinkChildren[h].childNodes[0].nodeValue;
            }else if(hflinkChildren[h].nodeName == 'link_type') {
              hflink.link_type = hflinkChildren[h].childNodes[0].nodeValue;
            }
          }
          historical_figure.hflinks.push(hflink);
        }
      }

      if(hfids.includes(historical_figure.id)) {
        figList.push(historical_figure);
      }
    }
  }

  return figList;
};
