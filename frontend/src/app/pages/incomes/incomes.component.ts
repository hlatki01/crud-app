import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BelvoService } from 'src/app/services/belvo.service';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  columns: string[] = ['account.number', 'aggregations', 'sources'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private belvoService: BelvoService

  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const incomes = await this.belvoService.getAllIncomes(belvoToken);
    console.log('accounts', incomes)
    this.dataSource = new MatTableDataSource(incomes);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
