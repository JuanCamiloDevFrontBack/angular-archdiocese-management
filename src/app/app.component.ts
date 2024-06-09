import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  header {
    background-color: #f8f9fa;
  }

  .footer {
    padding: 20px 0;
    text-align: center;
  }
  
  .footer a {
    color: #333;
    text-decoration: none;
  }
  `],
})
export class AppComponent {
  title = 'app-archdiocese-management';

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    const lang = this.translate.getBrowserLang();
    if (lang !== 'en' && lang !== 'es') {
      this.translate.setDefaultLang('es');
    } else {
      this.translate.use(lang);
    }
  }

  goToparishedSection(): void {}

  goTopriestsSection(): void {}

}
