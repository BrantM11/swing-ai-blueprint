
import { Drill } from "../../types/drill";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

interface DrillCardTitleProps {
  drill: Drill;
  isCompleted: boolean;
  onComplete: () => void;
}

export const DrillCardTitle = ({ drill, isCompleted, onComplete }: DrillCardTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Checkbox 
          checked={isCompleted}
          onCheckedChange={onComplete}
          id={`drill-${drill.id}`}
        />
        <label 
          htmlFor={`drill-${drill.id}`}
          className={`
            font-medium text-base 
            ${isCompleted ? 'text-muted-foreground line-through' : ''}
          `}
        >
          {drill.title}
        </label>
      </div>
      
      <Badge variant="outline" className="text-xs">
        {drill.difficulty || 'Beginner'}
      </Badge>
    </div>
  );
};
