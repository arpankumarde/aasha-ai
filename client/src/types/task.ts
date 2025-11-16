export interface Task {
  phrase: string;
  timestamp: string;
}

export interface TasksResponse {
  tasks: Task[];
}
