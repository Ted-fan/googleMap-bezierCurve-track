import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  setMarkerData: any = [];
  constructor(public navCtrl: NavController) {
    this.setMarkerData = [{ storeId: 0, storeName: "farm1", lat: 38.83821, lng: 121.497853, children: [
      { carId: 0, carName: "machine1", lat: 41.67729, lng: 123.465009 }, 
      { carId: 1, carName: "machine2", lat: 39.921894, lng: 119.597138 },
      { carId: 2, carName: "machine3", lat: 40.749902, lng: 120.866059 },
      { carId: 3, carName: "machine4", lat: 37.416574, lng: 118.668793 },] 
    }];
  }
}