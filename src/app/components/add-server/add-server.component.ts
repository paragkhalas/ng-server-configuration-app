import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NatSpace, Server } from '../../typings/server-modals';





export function customIPV4Validator(): ValidatorFn {
  return (control: AbstractControl) => {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (regex.test(control.value)) {
      return null;
    }
    return { ipError: true };
  };
}

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.scss']
})
export class AddServerComponent implements OnInit {

  natSpaces: any = []
  form!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { formVal: Server, serverList: Server[], isUpdate: boolean },
    public dialogRef: MatDialogRef<AddServerComponent>
  ) {
    this.form = this.fb.group({
      name: [this.data.formVal.name, Validators.compose([Validators.required, Validators.maxLength(256)])],
      description: [this.data.formVal.description, Validators.compose([Validators.required, Validators.maxLength(256)])],
      status: [this.data.formVal.status],
      nat_space_id: [{
        value: this.data.formVal.nat_space_id
      }, Validators.required],
      server_nat_ip: [{
        value: this.getNATIPAddress(this.data.formVal.nat_space_id)
      }],
      server_ip: [{
        value: this.data.formVal.server_ip,
        disabled: true
      }, Validators.compose([Validators.required, customIPV4Validator()])]
    });
    this.form?.get("nat_space_id")?.valueChanges.subscribe(x => {
      if (x) {
        this.form.patchValue({
          server_nat_ip: this.getNATIPAddress(x)
        });
        if (!this.data.isUpdate) {
          this.form.controls['server_ip'].enable();
        }
      }
    });

  }

  ngOnInit(): void {
    this.natSpaces = [
      {
        id: "1",
        name: "Box",
        server_nat_ip: "122.12.19.21"
      },
      {
        id: "12",
        name: "DoS",
        server_nat_ip: "122.12.19.22"
      },
      {
        id: "13",
        name: "Server Box",
        server_nat_ip: "122.12.19.23"
      },
      {
        id: "14",
        name: "Nat-vat",
        server_nat_ip: "122.12.19.24"
      },
      {
        id: "15",
        name: "ZTh-vtc-1275844",
        server_nat_ip: "122.12.19.25"
      },
      {
        id: "17",
        name: "GBD",
        server_nat_ip: "122.12.19.26"
      }
    ];

    if (this.data.isUpdate) {
      this.form.patchValue({
        nat_space_id: this.data.formVal.nat_space_id
      });
    }
  }

  getNATIPAddress(id: string) {
    const filterNATSpace: NatSpace[] = this.natSpaces.filter((nat: NatSpace) => nat.id = id);
    return filterNATSpace.length ? filterNATSpace[0]['server_nat_ip'] : '';
  }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit(form: NgForm) {
    const isRecordExists = this.data.serverList.filter((server: Server) => server.name === form.name);
    if (isRecordExists.length && this.data.formVal.name !== form.name) {
      this.snackBar.open('Error! Server already exist. Please try different name.');
    } else {
      this.dialogRef.close({
        clicked: 'submit',
        form: form,
      });
    }
  }
}
