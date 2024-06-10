import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { PriestEnum } from 'src/app/core/interfaces/priest.enum';
import { AlertsMsgService } from 'src/app/core/services/alerts-msg.service';
import { HttpBackendApiRestService } from 'src/app/core/services/http-backend-api-rest.service';
import { PriestI } from 'src/app/core/interfaces/priest.interface';

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
  listPriests!: PriestI[];
  selectedPriest!: null | PriestI;
  showAddBtn!: boolean;

  messages!: Message[];

  private readonly fb = inject(FormBuilder);
  private readonly alerts = inject(AlertsMsgService);
  private readonly httpB = inject(HttpBackendApiRestService);

  ngOnInit(): void {
    this.initVariables();
  }

  initVariables(): void {
    this.createForm();
    this.selectedPriest = null;
    this.showAddBtn = true;
    this.getListPriests();
  }

  getListPriests(): void {
    this.httpB.listPriestsHttp()
      .subscribe({
        next: res => this.listPriests = res as PriestI[],
        error: err => {
          console.log('error en la petición: ', err);
          this.alerts.error({ summary: 'Error', msg: 'A ocurrido un error al cosultar la información.' });
        }
      })
  }

  createForm(): void {
    const { ID, NAME, AGE, ORDINATION, HASPARISH, IDPARISH } = PriestEnum;
    this.form = this.fb.group({
      [ID]: [null],
      [NAME]: [null, Validators.required],
      [AGE]: [null, Validators.required],
      [ORDINATION]: [null, Validators.required],
      [HASPARISH]: [null, Validators.required],
      [IDPARISH]: [null, Validators.required]
    });
  }

  onEnter(event: any) {
    event.preventDefault();
  }

  submitForm(): void {
    this.httpB.createPriestHttp(this.form.value)
      .subscribe({
        next: res => {
          console.log('res: ', res);
          this.form.reset();
          this.getListPriests();
          this.alerts.success({ summary: 'Registro Guardado Correctamente', msg: 'Se guardo el registro en la base de datos.' })
        },
        error: err => {
          console.log('error en la petición: ', err);
          this.alerts.error({ summary: 'Error', msg: 'A ocurrido un error al guardar la información.' });
        }
      });
  }

  editPriest(): void {
    const id = this.selectedPriest?.id ?? '';

    if (id === '' || isNaN(Number(id))) {
      this.alerts.warning({ summary: 'Advertencia', msg: 'no se pudo editar el registro porque el id es inválido.' });
      return;
    }

    this.showAddBtn = false;
    const { ID, NAME, AGE, ORDINATION, HASPARISH, IDPARISH } = PriestEnum;
    this.form.patchValue({
      [ID]: this.selectedPriest?.id ?? '',
      [NAME]: this.selectedPriest?.name ?? '',
      [AGE]: this.selectedPriest?.age ?? '',
      [ORDINATION]: this.selectedPriest?.ordinationDate ?? '',
      [HASPARISH]: this.selectedPriest?.isParishPriest ?? '',
      [IDPARISH]: this.selectedPriest?.idParish ?? ''
    });
  }

  updateRegister(): void {
    this.httpB.updatePriestHttp(this.form.value)
      .subscribe({
        next: res => {
          console.log('res: ', res);
          this.selectedPriest = null;
          this.showAddBtn = true;
          this.form.reset();
          this.getListPriests();
          this.alerts.success({ summary: 'Registro Actualizado Correctamente', msg: 'Se actualizó el registro en la base de datos.' })
        },
        error: err => {
          console.log('error en la petición: ', err);
          this.alerts.error({ summary: 'Error al Editar', msg: 'A ocurrido un error al actualizar el registro.' });
        }
      });
  }

  deletePriest(): void {
    const id = this.selectedPriest?.id ?? '';

    if (id === '') {
      this.alerts.warning({ summary: 'Advertencia', msg: 'no se pudo eliminar el registro porque el id es inválido.' });
      return;
    }

    this.httpB.deletePriestHttp(id)
      .subscribe({
        next: res => {
          console.log('res: ', res);
          this.selectedPriest = null;
          this.getListPriests();
          this.alerts.success({ summary: 'Registro Eliminado Correctamente', msg: 'Se eliminó el registro en la base de datos.' })
        },
        error: err => {
          console.log('error en la petición: ', err);
          this.alerts.error({
            summary: 'Error', msg: 'A ocurrido un error al eliminar el registro.'

          })}})

  }

}