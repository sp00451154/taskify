import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required]
    });

    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.taskForm.patchValue(res.data);
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => console.error(err)
        });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => console.error(err)
        });
      }
    }
  }
}
