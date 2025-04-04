import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: [''],
      priority: ['']
    });
  }

  applyFilter() {
    this.filtersChanged.emit(this.filterForm.value); // send filters to parent
  }

  resetFilter() {
    this.filterForm.reset();
    this.applyFilter();
  }
}
