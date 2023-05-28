L.Choropleth = L.GeoJSON.extend({
    options: {
      valueProperty: 'value',
      scale: ['white', 'red'],
      steps: 5,
      mode: 'q',
      style: {
        color: '#fff',
        weight: 1,
        fillOpacity: 0.7
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup('<strong>' + feature.properties.name + '</strong><br />' +
          feature.properties.value);
      }
    },
  
    initialize: function(geojson, options) {
      this.geojson = geojson;
      L.setOptions(this, options);
      this._style = this.options.style;
      L.GeoJSON.prototype.initialize.call(this, geojson, options);
    },
  
    getColor: function(d) {
      var colors = this.options.scale;
      var n = colors.length - 1;
      var max = this._max || d;
      var min = this._min || d;
      var delta = max - min;
      var step = delta / this.options.steps;
      var i = (d - min) / step;
      return colors[Math.floor(i)];
    },
  
    style: function(feature) {
      var valueProperty = this.options.valueProperty;
      var value = feature.properties[valueProperty];
      var color = this.getColor(value);
      var style = L.extend({}, this._style);
      style.fillColor = color;
      return style;
    },
  
    onAdd: function(map) {
      this.eachLayer(map.addLayer, map);
    },
  
    onRemove: function(map) {
      this.eachLayer(map.removeLayer, map);
    },
  
    addTo: function(map) {
      map.addLayer(this);
      return this;
    },
  
    processData: function() {
      var values = this.geojson.features.map(function(feature) {
        return feature.properties[this.options.valueProperty];
      }, this);
  
      this._min = Math.min.apply(null, values);
      this._max = Math.max.apply(null, values);
    }
  });
  
  L.choropleth = function(geojson, options) {
    return new L.Choropleth(geojson, options);
  };
  