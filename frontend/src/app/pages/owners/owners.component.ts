import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BelvoService } from 'src/app/services/belvo.service';

const belvoToken = localStorage.getItem('bankconnector:link');


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  columns: string[] = ['display_name', 'document_id.document_number', 'address', 'accounts'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private belvoService: BelvoService

  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const owners = await this.belvoService.getAllOwners(belvoToken);
    console.log('accounts', owners)
    this.dataSource = new MatTableDataSource(owners);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
