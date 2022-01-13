import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BelvoService } from 'src/app/services/belvo.service';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {

  columns: string[] = ['account.number','balance', 'value_date', 'account.name', 'account.category', 'account.institution.name'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private belvoService: BelvoService

  ) { }

  ngOnInit() {
  }


  async bind(dateStart, dateEnd) {

    const balances = await this.belvoService.getAllBalances(belvoToken, dateStart, dateEnd);
    console.log('accounts', balances)
    this.dataSource = new MatTableDataSource(balances);
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
