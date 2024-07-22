import { Component } from '@angular/core';
import { TopicData } from '../interfaces/TopicData';
import { RouterModule } from '@angular/router';
import { DataAPIService } from '../data-api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopicComment } from '../interfaces/TopicComment';

@Component({
  selector: 'app-topic-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './topic-details.component.html',
  styleUrl: './topic-details.component.css'
})
export class TopicDetailsComponent {
  topicId: string = '0';
  topic: TopicData = {
    id:0,
    userId:0,
    title:'',
    body:''
  };
  comments: TopicComment[] = [];

  constructor(
    private dataApiService: DataAPIService,
    private routerModule: RouterModule,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.topicId = this.activatedRoute.snapshot.paramMap.get('id') ?? '0';
    this.getTopic();
    this.getComments();
  }

  getTopic() {
    this.dataApiService.get_topic_by_id(this.topicId)
    .subscribe({
      next: (result: TopicData) => {
        this.topic = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getComments() {
    this.dataApiService.get_comments(this.topicId)
    .subscribe({
      next: (result: TopicComment[]) => {
        this.comments = result;
        console.log(result);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
