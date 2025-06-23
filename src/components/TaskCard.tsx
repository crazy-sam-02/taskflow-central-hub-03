
import React from 'react';
import { Task } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { chevronDown, chevronUp, x } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  };

  const canMoveUp = task.status !== 'done';
  const canMoveDown = task.status !== 'todo';

  const moveUp = () => {
    if (task.status === 'todo') {
      onStatusChange(task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onStatusChange(task.id, 'done');
    }
  };

  const moveDown = () => {
    if (task.status === 'done') {
      onStatusChange(task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onStatusChange(task.id, 'todo');
    }
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow duration-200 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 mb-2 break-words">{task.title}</h3>
            <Badge className={getStatusColor(task.status)}>
              {getStatusText(task.status)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {canMoveDown && (
              <Button
                variant="ghost"
                size="sm"
                onClick={moveDown}
                className="h-8 w-8 p-0"
                title="Move backwards"
              >
                <chevronDown className="h-4 w-4" />
              </Button>
            )}
            {canMoveUp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={moveUp}
                className="h-8 w-8 p-0"
                title="Move forward"
              >
                <chevronUp className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              title="Delete task"
            >
              <x className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Created {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
