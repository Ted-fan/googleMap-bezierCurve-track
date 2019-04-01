import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
// component
import { MapComponent } from "./MapComponent/MapComponent";
export const components = [MapComponent];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components],
  providers: []
})
export class ComponentsModule {}
