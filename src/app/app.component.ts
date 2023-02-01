import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddServerComponent } from './components/add-server/add-server.component';
import { ConfirmDialogModel, ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { Server } from './typings/server-modals';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchServer = '';
  selectedServer: string[] = [];
  title = 'Main Page';
  serverList: Server[] = [
    {
      name: "Box",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: "12",
      server_nat_ip: "122.12.19.21",
      status: "online"
    },
    {
      name: "DoS",
      description: "Server Box xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: "1",
      server_nat_ip: "122.12.19.21",
      status: "online"
    },
    {
      name: "Server Box",
      description: " 10.013.122-xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: "12",
      server_nat_ip: "122.12.19.21",
      status: "error"
    },
    {
      name: "Nat-vat",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: "15",
      server_nat_ip: "122.12.19.21",
      status: "online"
    },
    {
      name: "ZTh-vtc-1275844",
      description: "xyz lorem 324 got boty doty",
      server_ip: "10.19.19.23",
      nat_space_id: "14",
      server_nat_ip: "122.12.19.21",
      status: "error"
    }
  ];


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  addToSelection(name: string) {
    if (this.selectedServer.includes(name)) {
      this.selectedServer = this.selectedServer.filter((server) => server !== name);
      return;
    }
    this.selectedServer = [...this.selectedServer, name];
  }

  updateServer(serverName: string) {
    const filteredServer = this.serverList.filter((serverObj: Server) => serverObj.name === serverName);
    if (filteredServer.length) {
      const server = filteredServer[0];
      const dialogRef = this.dialog.open(AddServerComponent, {
        width: '80vw',
        data: {
          formVal: {
            name: server.name,
            description: server.description,
            server_ip: server.server_ip,
            nat_space_id: server.nat_space_id,
            server_nat_ip: server.server_nat_ip,
            status: server.status
          },
          serverList: this.serverList,
          isUpdate: true
        }
      });

      dialogRef.afterClosed().subscribe((data) => {
        this.selectedServer = [];
        if (data.clicked === 'submit') {
          let serverIndex = this.serverList.findIndex((serverObj => serverObj.server_ip === server.server_ip));
          this.serverList[serverIndex] = { ...data.form, server_ip: server.server_ip };
          this.snackBar.open('Server updated successfully.', 'Done');
        }
      });
    } else {
      this.snackBar.open('Server not available.')
    }

  }

  createServer() {
    const dialogRef = this.dialog.open(AddServerComponent, {
      width: '80vw',
      data: {
        formVal: {
          name: '',
          description: '',
          server_ip: '',
          nat_space_id: '',
          server_nat_ip: '',
          status: 'pending',

        },
        serverList: this.serverList,
        isUpdate: false
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.serverList.push(data.form);
        this.snackBar.open('Server added successfully.', 'Done');
      }
    });
  }

  removeServer(servers: string[]) {
    const dialogData = new ConfirmDialogModel("Confirm Action", "Are you sure you want to delete?");
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(isRemove => {
      if (isRemove) {
        this.serverList = this.serverList.filter(({ name }) => !servers.some((e) => e === name));
        this.selectedServer = [];
        this.snackBar.open('Server removed successfully.', 'Close');
      }
    });
  }
}
