import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  header {
    background-color: #f8f9fa;
  }

  .footer {
    margin-top: 10px;
    padding: 20px 0;
    text-align: center;
    background-color: #f8f9fa;
  }
  
  .footer a {
    color: #333;
    text-decoration: none;
  }
  `],
})
export class AppComponent {
  title = 'app-archdiocese-management';
  showParishBtn = false;
  showPriestBtn = true;

  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    const lang = this.translate.getBrowserLang();
    if (lang !== 'en' && lang !== 'es') {
      this.translate.setDefaultLang('es');
    } else {
      this.translate.use(lang);
    }
  }

  routeIsActive(): void {
    const currentUrl = (this.router.url === '/parished') ? 0 : 1;
    ({
      0: () => this.goToparishedSection(),
      1: () => this.goTopriestsSection()
    })[currentUrl]();
  }

  goToparishedSection(): void {
    this.showParishBtn = false;
    this.showPriestBtn = true;
    this.router.navigate(['parished']);
  }

  goTopriestsSection(): void {
    this.showParishBtn = true;
    this.showPriestBtn = false;
    this.router.navigate(['priests']);
  }

}
