
import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
  color: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onStatusChange,
  onDelete,
  color,
}) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <Card className="flex-1 min-w-0">
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg font-semibold ${color} flex items-center justify-between`}>
          {title}
          <span className="text-sm font-normal bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {filteredTasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 min-h-[200px]">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm">No tasks here</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskColumn;
