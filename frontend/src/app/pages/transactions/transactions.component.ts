import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BelvoService } from 'src/app/services/belvo.service';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  columns: string[] = ['account.number','balance', 'value_date', 'account.name', 'account.category', 'account.institution.name'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private belvoService: BelvoService

  ) { }

  ngOnInit() {
  }


  async bind(dateStart, dateEnd) {

    const transactions = await this.belvoService.getTransactions(belvoToken, dateStart, dateEnd);
    console.log('accounts', transactions)
    this.dataSource = new MatTableDataSource(transactions);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  dateFilterStart(value: string){
    console.log('dateFilterStart', value)
  }

  dateFiltering(value){
    console.log('dateFilterEnd', value.form.value)
    this.bind(value.form.value.startDate, value.form.value.endDate);
  }


}
