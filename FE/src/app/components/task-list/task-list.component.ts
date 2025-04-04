import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  displayedColumns: string[] = ['title', 'priority', 'status', 'dueDate', 'actions']; // 👈 columns to display
  loading: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.fetchTasks(), // Refresh the list after deletion
        error: (err) => console.error(err)
      });
    }
  }

  applyFilters(filters: any) {
    this.taskService.getTasks(filters.status, filters.priority).subscribe({
      next: (res) => {
        this.tasks = res.data;
      },
      error: (err) => console.error(err)
    });
  }
  
}
