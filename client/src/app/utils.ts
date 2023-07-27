export const BASE_URL = 'http://localhost:3000';

export const PROJECT_STATUS = [
  { id: 0, title: 'created', color: 'text-secondary' },
  { id: 1, title: 'in progress', color: 'text-success' },
  { id: 2, title: 'on hold', color: 'text-warning' },
  { id: 3, title: 'delayed', color: 'text-danger' },
  { id: 4, title: 'under review', color: 'text-info' },
  { id: 5, title: 'completed', color: 'text-primary' },
];

export const TASK_PRIORITY = [
  { id: 1, title: 'low', color: 'text-success' },
  { id: 2, title: 'medium', color: 'text-info' },
  { id: 3, title: 'high', color: 'text-warning' },
  { id: 4, title: 'critical', color: 'text-danger' },
  { id: 5, title: 'routine', color: 'text-secondary' }
]

export const TASK_STATUS = [
  { id: 1, title: "In Progress", color: "text-primary" },
  { id: 2, title: "On Hold", color: "text-warning" },
  { id: 3, title: "Completed", color: "text-success" },
  { id: 4, title: "Delayed", color: "text-danger" },
  { id: 5, title: "Cancelled", color: "text-secondary" },
  { id: 6, title: "Not Started", color: "text-info" }
];
