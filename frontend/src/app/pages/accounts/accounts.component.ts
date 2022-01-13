import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BelvoService } from 'src/app/services/belvo.service';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  columns: string[] = ['name', 'number', 'balance.available', 'institution.name', 'category'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private belvoService: BelvoService

  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const accounts = await this.belvoService.getAllAccounts(belvoToken);
    console.log('accounts', accounts)
    this.dataSource = new MatTableDataSource(accounts);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
