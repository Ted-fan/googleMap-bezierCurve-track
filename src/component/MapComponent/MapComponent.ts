import { Component, Input } from "@angular/core";

declare var google;
declare var GmapCubicBezier;

@Component({
  selector: "ion-google-map",
  templateUrl: "MapComponent.html"
})
export class MapComponent {
  @Input() setData; //农场与所属农机坐标点
  map: any; //地图
  pointsPath: any = []; //轨迹点
  constructor() {}

  ngAfterViewInit() {
    let mapOpts = {
      center: { lat: 38.83821, lng: 121.497853 },
      mapTypeId: "hybrid",
      zoom: 8,
      mapTypeControl: false,
      fullscreenControl: false,
      scaleControl: true,
      zoomControl: false,
      streetViewControl: false
    };
    this.map = new google.maps.Map(document.getElementById("g_container"), mapOpts);
    this.setMarkerAndPath();
  }
  //设置marker与轨迹路线
  setMarkerAndPath() {
    for (var i = 0; i < this.setData.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: this.setData[i].lat, lng: this.setData[i].lng },
        icon: "assets/imgs/store.png",
        map: this.map
      });
      this.setData[i].children.forEach(element => {
        var Marker = new google.maps.Marker({
          position: { lat: element.lat, lng: element.lng },
          icon: "assets/imgs/icon_nav_car.png",
          map: this.map
        });
        let { ctrlALat, ctrlALng, ctrlBLat } = this.bezierCtrl(this.setData[i].lat, this.setData[i].lng, element.lat, element.lng);
        let curvedLinePoint = new GmapCubicBezier(this.setData[i].lat, this.setData[i].lng, ctrlALat, ctrlALng, ctrlBLat, ctrlALng, element.lat, element.lng, 0.01, this.map);
        this.initMachinePlay(curvedLinePoint);
      });
    }
  }

  //计算贝塞尔曲线控制点
  bezierCtrl(startLat, StartLng, EndLat, EndLng) {
    //第一个贝塞尔控制点
    let ctrlALat = startLat > EndLat ? (startLat - EndLat) / 3 + EndLat : (EndLat - startLat) / 3 + startLat;
    let ctrlALng = StartLng > EndLng ? StartLng : EndLng;
    let ctrlBLat = startLat > EndLat ? ((startLat - EndLat) / 3) * 2 + EndLat : ((EndLat - startLat) / 3) * 2 + startLat;
    return { ctrlALat, ctrlALng, ctrlBLat };
  }

  // 播放marker运动轨迹
  initMachinePlay(pointsPath) {
    let Marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(pointsPath[0].x), parseFloat(pointsPath[0].y)),
      map: this.map,
      icon: "assets/imgs/icon_nav_car.png"
    });
    let currentIndex = 0;
    let currentLatlng;
    let pathInterval = setInterval(() => {
      if (currentIndex === pointsPath.length - 1) {
        clearInterval(pathInterval);
        Marker.setMap(null)
      }
      currentLatlng = new google.maps.LatLng(parseFloat(pointsPath[currentIndex].x), parseFloat(pointsPath[currentIndex].y));
      Marker.setPosition(currentLatlng);
      currentIndex++;
    }, 10);
  }
}
