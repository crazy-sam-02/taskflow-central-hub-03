
import { useState, useEffect } from 'react';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const userTasks = allTasks.filter((task: Task) => task.userId === user.id);
      setTasks(userTasks);
    }
  }, [user]);

  const addTask = (title: string) => {
    if (!user) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: 'todo',
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = allTasks.map((task: Task) => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = allTasks.filter((task: Task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
};
