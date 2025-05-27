
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { DayPlan } from "../../types/practice-plan";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DrillCard } from "./DrillCard";

interface DailyPlanSectionProps {
  dayPlan: DayPlan;
  dayNumber: number;
  completedDrills: Record<string, boolean>;
  onDrillComplete: (drillName: string) => void;
}

export const DailyPlanSection = ({ 
  dayPlan, 
  dayNumber, 
  completedDrills, 
  onDrillComplete 
}: DailyPlanSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Make sure we have valid drills
  const drills = Array.isArray(dayPlan?.drills) ? dayPlan.drills : [];

  // Calculate completion percentage
  const totalDrills = drills.length;
  const completedCount = drills.filter(d => {
    if (!d.drill) return false;
    return completedDrills[d.drill.title];
  }).length;
  const completionPercentage = totalDrills > 0 ? Math.round((completedCount / totalDrills) * 100) : 0;

  // Format the focus text - Remove "Day X: " prefix if it exists
  const focusText = dayPlan?.focus && dayPlan.focus.startsWith(`Day ${dayNumber}: `) 
    ? dayPlan.focus.substring(`Day ${dayNumber}: `.length)
    : (dayPlan?.focus || '');

  return (
    <Card>
      <CardHeader className="bg-muted/50 cursor-pointer py-3" onClick={toggleOpen}>
        <div className="space-y-1">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Day {dayNumber}: {focusText}</span>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {completionPercentage}% Complete
            </span>
            <span>{dayPlan?.duration || '30 minutes'}</span>
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="p-6">
          <div className="space-y-4">
            {drills.length > 0 ? (
              drills.map((drillWithSets, index) => {
                if (!drillWithSets?.drill) return null;
                
                const drillObject = drillWithSets.drill;
                
                return (
                  <DrillCard
                    key={`${dayNumber}-${index}-${drillObject.id || index}`}
                    drill={drillObject}
                    sets={drillWithSets.sets || 3}
                    reps={drillWithSets.reps || 10}
                    isCompleted={!!completedDrills[drillObject.title]}
                    onComplete={() => onDrillComplete(drillObject.title)}
                  />
                );
              })
            ) : (
              <p className="text-amber-600">No drills available for this day.</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
