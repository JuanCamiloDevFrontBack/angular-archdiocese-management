import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

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

  private readonly primengConf = inject(PrimeNGConfig);
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

    this.setLocaleSettings();
  }

  setLocaleSettings(): void {
    this.primengConf.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar',
      weekHeader: 'Sm'
      });
    // dateFormat: 'dd/mm/yy',
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
