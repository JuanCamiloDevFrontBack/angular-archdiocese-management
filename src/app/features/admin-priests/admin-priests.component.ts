import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { PriestEnum } from 'src/app/core/interfaces/priest.enum';
import { AlertsMsgService } from 'src/app/core/services/alerts-msg.service';
import { HttpBackendApiRestService } from 'src/app/core/services/http-backend-api-rest.service';

@Component({
  selector: 'cmnt-admin-priests',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, MessagesModule, TranslateModule],
  templateUrl: './admin-priests.component.html',
  styleUrls: ['./admin-priests.component.css']
})
export class AdminPriestsComponent implements OnInit {

  inputs = PriestEnum;

  form!: FormGroup;

  messages!: Message[];

  private readonly fb = inject(FormBuilder);
  private readonly alerts = inject(AlertsMsgService);
  private readonly httpB = inject(HttpBackendApiRestService);

  ngOnInit(): void {
      
  }

}
