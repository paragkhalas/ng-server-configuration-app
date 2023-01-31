import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface NetSpace {
  id: number;
  name: string;
  server_nat_ip: string;
}

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.scss']
})
export class AddServerComponent {

  natSpaces: NetSpace[] = [
    {
      id: 1,
      name: "Box",
      server_nat_ip: "122.12.19.21"
    },
    {
      id: 12,
      name: "DoS",
      server_nat_ip: "122.12.19.22"
    },
    {
      id: 13,
      name: "Server Box",
      server_nat_ip: "122.12.19.23"
    },
    {
      id: 14,
      name: "Nat-vat",
      server_nat_ip: "122.12.19.24"
    },
    {
      id: 15,
      name: "ZTh-vtc-1275844",
      server_nat_ip: "122.12.19.25"
    },
    {
      id: 17,
      name: "GBD",
      server_nat_ip: "122.12.19.26"
    }
  ];
  status = 'pending';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<AddServerComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(256)],
      description: ['', Validators.required, Validators.maxLength(256)],
      status: [this.status],
      nat_space_id: ['', Validators.required],
      server_ip: ['', Validators.required]
    });
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  }
}
