import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Server {
  name: string;
  description: string;
  server_ip: string;
  nat_space_id: string;
  server_nat_ip: string;
  status: string;
};
interface NetSpace {
  id: number;
  name: string;
}

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
      status: "erorr"
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

  natSpaces: NetSpace[] = [
    {
      id: 1,
      name: "Box"
    },
    {
      id: 12,
      name: "DoS"
    },
    {
      id: 13,
      name: "Server Box"
    },
    {
      id: 14,
      name: "Nat-vat"
    },
    {
      id: 15,
      name: "ZTh-vtc-1275844"
    },
    {
      id: 17,
      name: "GBD"
    }
  ];

  addToSelection(name: string) {
    if (this.selectedServer.includes(name)) {
      this.selectedServer = this.selectedServer.filter((server) => server !== name);
      return;
    }
    this.selectedServer = [...this.selectedServer, name];
  }

  updateServer(server: string) {
    console.log('update server', server);
  }

  createServer() {
    console.log('create new server');
  }

  removeServer(servers: string[]) {
    console.log('remove server list', servers);
  }
}
