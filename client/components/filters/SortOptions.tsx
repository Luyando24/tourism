import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type SortOption = {
  value: string;
  label: string;
  direction?: 'asc' | 'desc';
};

interface SortOptionsProps {
  options: SortOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const SortOptions = ({ options, value, onValueChange, className }: SortOptionsProps) => {
  const currentOption = options.find(option => option.value === value);
  
  const getSortIcon = () => {
    if (!currentOption?.direction) return <ArrowUpDown className="h-4 w-4" />;
    return currentOption.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("flex items-center gap-2", className)}>
          {getSortIcon()}
          Sort: {currentOption?.label || 'Default'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {option.direction && (
                  <span className="text-muted-foreground">
                    {option.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptions;