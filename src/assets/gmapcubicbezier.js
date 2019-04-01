var GmapCubicBezier = (function() {
  var GmapsCubicBezier = function(lat1, long1, lat2, long2, lat3, long3, lat4, long4, resolution, map) {
    var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var icons = [
      {
        icon: lineSymbol,
        offset: "100%"
      }
    ]
    var points = [];
    for (let it = 0; it <= 1; it += resolution) {
      points.push(this.getBezier({ x: lat1, y: long1 }, { x: lat2, y: long2 }, { x: lat3, y: long3 }, { x: lat4, y: long4 }, it));
    }
    for (var i = 0; i < points.length - 1; i++) {
      var Line = new google.maps.Polyline({
        path: [new google.maps.LatLng(points[i].x, points[i].y), new google.maps.LatLng(points[i + 1].x, points[i + 1].y)],
        strokeColor: "violet",
        
      });
      if(i==(points.length/2).toFixed(0)||i==(points.length/2).toFixed(0)-4){
        Line.set('icons', icons);
      }
      Line.setMap(map);
    }
    return points;
  };

  GmapsCubicBezier.prototype = {
    B1: function(t) {
      return t * t * t;
    },
    B2: function(t) {
      return 3 * t * t * (1 - t);
    },
    B3: function(t) {
      return 3 * t * (1 - t) * (1 - t);
    },
    B4: function(t) {
      return (1 - t) * (1 - t) * (1 - t);
    },

    getBezier: function(C1, C2, C3, C4, percent) {
      var pos = {};
      pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
      pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
      return pos;
    }
  };

  return GmapsCubicBezier;
})();
