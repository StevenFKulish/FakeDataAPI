import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCommentComponent } from './topic-comment.component';

describe('TopicCommentComponent', () => {
  let component: TopicCommentComponent;
  let fixture: ComponentFixture<TopicCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
