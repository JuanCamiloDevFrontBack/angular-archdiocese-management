import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ParishEnum } from 'src/app/core/interfaces/parish.enum';
import { AlertsMsgService } from 'src/app/core/services/alerts-msg.service';
import { HttpApiRestService } from 'src/app/core/services/http-api-rest.service';
import { ParishI } from 'src/app/core/interfaces/parish.interface';

@Component({
  selector: 'cmnt-admin-parished',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, MessagesModule, TranslateModule],
  templateUrl: './admin-parished.component.html',
  styleUrls: ['./admin-parished.component.css']
})
export class AdminParishedComponent implements OnInit {

  inputs = ParishEnum;

  form!: FormGroup;
  listParished!: any;
  selectedParished!: null | ParishI;

  messages!: Message[];

  private readonly fb = inject(FormBuilder);
  private readonly alerts = inject(AlertsMsgService);
  private readonly http = inject(HttpApiRestService);

  ngOnInit(): void {
      this.initVariables();
  }

  initVariables(): void {
    this.createForm();
    this.selectedParished = null;
    this.getListParished();
  }

  getListParished(): void {
    this.http.listParishedHttp()
    .subscribe({
      next: res => this.listParished = res,
      error: err => {
        console.log('error en la petición: ', err); 
        this.alerts.error({summary: 'Error', msg: 'A ocurrido un error al cosultar la información.'});
      }})
  }

  createForm(): void {
    const { ID, NAME, ADDRESS, LOCATION } = ParishEnum;
    this.form = this.fb.group({
      [ID]: [null],
      [NAME]: [null, Validators.required],
      [ADDRESS]: [null, Validators.required],
      [LOCATION]: [null, Validators.required]
    });
  }

  onEnter(event: any) {
    event.preventDefault();
  }

  submitForm(): void {
    this.http.createParishedHttp(this.form.value)
    .subscribe({
      next: res => {
        console.log('res: ', res);
        this.form.reset();
        this.getListParished();
        this.alerts.success({summary: 'Registro Guardado Correctamente', msg: 'Se guardo el registro en la base de datos.'})
      },
      error: err => {
        console.log('error en la petición: ', err); 
        this.alerts.error({summary: 'Error', msg: 'A ocurrido un error al guardar la información.'});
      }});
  }

  editParish(): void {}

  deleteParish(): void {
    const id = this.selectedParished?.id ?? '';

    if (id === '') {
      this.alerts.warning({summary: 'Advertencia', msg: 'no se pudo eliminar el registro porque el id es inválido.'});
      return;
    }

    this.http.deleteParishedHttp(id)
    .subscribe({
      next: res => {
        console.log('res: ', res);
        this.selectedParished = null;
        this.getListParished();
        this.alerts.success({summary: 'Registro Eliminado Correctamente', msg: 'Se eliminó el registro en la base de datos.'})
      },
      error: err => {
        console.log('error en la petición: ', err); 
        this.alerts.error({summary: 'Error', msg: 'A ocurrido un error al eliminar el registro.'});
      }})
  }

}
