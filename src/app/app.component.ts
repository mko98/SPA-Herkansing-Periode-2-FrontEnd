import {Component, HostListener} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'game';

  @HostListener('window:unload')
  private onUnload(): void {
    localStorage.clear();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
