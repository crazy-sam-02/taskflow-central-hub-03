
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskColumn from './TaskColumn';
import AddTaskForm from './AddTaskForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { log_out } from 'lucide-react';

const TaskDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
  const { toast } = useToast();

  const handleAddTask = (title: string) => {
    addTask(title);
    toast({
      title: "Task added!",
      description: "Your new task has been created.",
    });
  };

  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    updateTaskStatus(taskId, newStatus);
    toast({
      title: "Task updated!",
      description: "Task status has been changed.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: "Task deleted!",
      description: "The task has been removed.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <log_out className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddTaskForm onAddTask={handleAddTask} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            color="text-gray-700"
          />
          <TaskColumn
            title="In Progress"
            status="in-progress"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            color="text-blue-700"
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            color="text-green-700"
          />
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
              <p className="text-gray-400">Create your first task to get started!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDashboard;
