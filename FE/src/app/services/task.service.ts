import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5050/tasks'; // 🌐 Backend URL

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(status?: string, priority?: string) {
    let query = '';
  
    if (status) query += `status=${status}&`;
    if (priority) query += `priority=${priority}`;
  
    if (query) query = '?' + query; // ✅ add ? if there are filters
  
    return this.http.get<any>(`${this.apiUrl}${query}`);
  }

  // Get task by ID
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Create a new task
  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData, { headers: this.getHeaders() });
  }

  // Update a task
  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, taskData, { headers: this.getHeaders() });
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  

  // Helper: get Authorization Headers
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }
}
