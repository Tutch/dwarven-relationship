function XMLReader(){/*nothing here but us chickens*/}

XMLReader.prototype.parseTextAsXml = function(text, callback) {
    var parser = new DOMParser(),
        xmlDom = parser.parseFromString(text, "text/xml");

        if(typeof callback == 'function') {
          callback(xmlDom);
        }
};

XMLReader.prototype.waitForTextReadComplete = function(reader, callback) {
    var xmlreader = this;
    reader.onloadend = function(event) {
        var text = event.target.result;

        xmlreader.parseTextAsXml(text, function(xml) {
          if(typeof callback == 'function') {
            callback(xml);
          }
        });
    }
};

XMLReader.prototype.handleFileSelection = function(callback) {
    var file = fileChooser.files[0],
        reader = new FileReader();
    reader.readAsText(file);

    this.waitForTextReadComplete(reader, function(xml) {
      if(typeof callback == 'function') {
        callback(xml);
      }
    });
};
