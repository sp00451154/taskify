import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { io, Socket } from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter = when item appears
        style({ opacity: 0 }),
        animate('1500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  displayedColumns: string[] = ['title', 'priority', 'status', 'dueDate', 'actions']; // 👈 columns to display
  loading: boolean = true;
  socket!: Socket;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchTasks();

    // Connect to Socket.IO
    this.socket = io('http://localhost:5050');

    // Listen for new task events
    this.socket.on('taskCreated', (newTask) => {
      console.log('🆕 Real-time task received:', newTask);
      this.tasks = [...this.tasks, newTask];
      // 🛎️ Show a toast notification
      this.snackBar.open('🆕 New task added!', 'Close', {
        duration: 3000, // 3 seconds
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-snackbar'] // Optional for styling
      });
    });

    

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

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
