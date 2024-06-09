import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
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

  /*constructor() {
    this.translate.addLangs(['es', 'en']);
    const lang = this.translate.getBrowserLang();
    if (lang !== 'en' && lang !== 'es') {
      this.translate.setDefaultLang('es');
    } else {
      this.translate.use(lang);
    }
  }*/
}
