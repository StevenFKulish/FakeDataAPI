import { Component } from '@angular/core';
import { DataAPIService } from '../data-api.service';
import { TopicData } from '../interfaces/TopicData';
import { Router, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [RouterModule, DataTablesModule, CommonModule],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.css'
})
export class TopicsListComponent {

  dataTable: any;
  topics: TopicData[] = [];
  selectedTopic: any;
  topic: any;
  dtOptions: any = { };
  //dtOptions: DataTables.Settings = {};

  constructor(
    private dataApiService: DataAPIService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.dataApiService.get_topics()
    .subscribe({
      next: (result: TopicData[]) => {
        this.topics = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.initializeDataTable();
      }
    });
  }

  initializeDataTable(): void {
    this.dataTable = $('#example').DataTable({
      data: this.topics,
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'User Id', data: 'userId' },
        { title: 'Title', data: 'title' },
        { title: 'Body', data: 'body' }/* ,
        {
          "data":null, defaultContent:function(data: TopicData){
            return `<button (click) = rowClick(` + data.id + `) class="btn btn-warning deleteBtn">Details</button>`;
          }
        } */
      ],
      columnDefs: [
        {
            targets: 0,
            searchable: false,
            orderable: false
        }
      ],
      "paging": true,
      "pageLength": 10
    });
  }

  rowSelect(topic: TopicData): void {
    this.selectedTopic = topic;

    // route to details page
    this.router.navigate(
      ['/details/', this.selectedTopic.id] 
    ); 
  }

  buttonInRowClick(topic: TopicData): void {
    //event.stopPropagation();
    console.log('Button in the row clicked.' + topic.id);
    this.router.navigate(
      ['/details/', topic.id] 
    ); 
  }

  rowClick(id: number): void {
    console.log('Row ' + id + ' clicked.');
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }
}
