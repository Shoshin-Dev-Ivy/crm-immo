import { Component, Input, OnChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Task } from '../../../core/types/task.type';

@Component({
  selector: 'app-overdue-tasks',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './overdue-tasks.html',
  styleUrl: './overdue-tasks.css'
})
export class OverdueTasksComponent implements OnChanges {

  @Input() tasks: Task[] = [];

  overdueTasks: Task[] = [];

  ngOnChanges(): void {
    this.computeOverdue();
  }

  private computeOverdue(): void {

    const today = new Date();

    this.overdueTasks = this.tasks.filter(task =>
      new Date(task.dueDate) < today
    );

  }

  get sortedOverdueTasks(): Task[] {

    return [...this.overdueTasks]
      .sort((a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );

  }

  get isEmpty(): boolean {
    return this.sortedOverdueTasks.length === 0;
  }

  isUrgent(task: Task): boolean {

    const diff =
      new Date().getTime() -
      new Date(task.dueDate).getTime();

    const days = diff / (1000 * 60 * 60 * 24);

    return days >= 2;

  }

}