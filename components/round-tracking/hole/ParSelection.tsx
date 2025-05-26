
import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

interface ParSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ParSelection = ({ value, onChange }: ParSelectionProps) => {
  return (
    <div>
      <Label htmlFor="par-selection" className="text-sm text-muted-foreground mb-1 block">Par</Label>
      <ToggleGroup 
        type="single" 
        variant="outline" 
        value={value} 
        onValueChange={onChange}
        className="justify-start"
      >
        <ToggleGroupItem value="3" className="w-12 h-8">3</ToggleGroupItem>
        <ToggleGroupItem value="4" className="w-12 h-8">4</ToggleGroupItem>
        <ToggleGroupItem value="5" className="w-12 h-8">5</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
