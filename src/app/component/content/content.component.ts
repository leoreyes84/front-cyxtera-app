import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  listClients: ClientModel[];
  listClientsTotal: ClientModel[];

  /**  */
  displayedColumns: string[] = ['sharedKey', 'businessID', 'email', 'phone', 'dateAdd',
    'enrolledQty', 'maxDevices', 'lastLocation', 'status'];


  constructor(public clientService: ClientService,
              public toastrService: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrentList();

  }

  // It charges the list
  getCurrentList() {
    // Find all clients
    this.clientService.getAll().subscribe((listResult: ClientModel[]) => {
      this.listClients = listResult;
      this.listClientsTotal = listResult;
      // tslint:disable-next-line:no-console
      console.info('List of clients charged');
    }, error => {
      console.error(error);
      this.toastrService.error('Error getting the list', 'Error!');
    });
  }

  /** It saves the client */
  save(data: any) {
    if (data) {
      const client = new ClientModel();
      client.sharedKey = this.camelCase(data.name);
      client.businessID = data.name;
      client.email = data.email;
      client.phone = data.phone;
      client.dateAdd = new Date();
      client.enrolledQty = '2';
      client.maxDevices = 2;
      client.lastConnection = new Date();
      client.status = 'Active';
      // The service is called to save
      this.clientService.save(client).subscribe((listResult: any) => {
        this.listClients = listResult;
        this.listClientsTotal = listResult;
        // tslint:disable-next-line:no-console
        console.info('Client ' + client.sharedKey + ' saved');
      }, error => {
        console.error(error);
        this.toastrService.error('Error al intentar guardar', 'Error!');
      });
    }
  }

  /** it returns the camel case */
  camelCase(str: string) {
    str = str
      .replace(/\-/g, ' ') // convert all hyphens to spaces
      .replace(/\s[a-z]/g, this.upperCase) // convert first char of each word to UPPERCASE
      .replace(/\s+/g, '') // remove spaces
      .replace(/^[A-Z]/g, this.lowerCase); // convert first char to lowercase
    return str;
  }
  /** It returns the lower case of string */
  lowerCase(str: string) {
    return str ? str.toLowerCase() : str;
  }
  /** It returns the upper case of string */
  upperCase(str: string) {
    return str ? str.toUpperCase() : str;
  }

  /** It finds clients by sharedKey */
  applyFilter(filterValue: string) {
    let list: any;
    if (filterValue.length === 0) {
      list = this.listClientsTotal;
    } else {
      list = this.listClientsTotal.filter(client =>
        client.sharedKey.trim().toLowerCase() === filterValue.trim().toLowerCase()
      );
    }
    this.listClients = list;
  }

  /** Dialog  */
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Create New Client'
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => this.save(data));

  }

}
