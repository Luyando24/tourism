import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DateRangePicker = ({ value, onChange, placeholder = "Add travel dates", className }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDateRange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return "";
    const startStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endStr = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${startStr} - ${endStr}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (date >= selectedStartDate) {
      setSelectedEndDate(date);
      const formattedRange = formatDateRange(selectedStartDate, date);
      onChange(formattedRange);
      setIsOpen(false);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateSelected = (date: Date) => {
    return (selectedStartDate && date.getTime() === selectedStartDate.getTime()) ||
           (selectedEndDate && date.getTime() === selectedEndDate.getTime());
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className={cn("relative", className)}>
      <div 
        className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarDays className="size-4 sm:size-5 text-primary flex-shrink-0" />
        <span className={cn(
          "text-sm sm:text-base font-medium flex-1",
          value ? "text-foreground" : "text-muted-foreground"
        )}>
          {value || placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-semibold text-sm">{monthYear}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <button
                    onClick={() => handleDateClick(date)}
                    className={cn(
                      "w-full h-full text-sm rounded-md transition-colors hover:bg-primary/10",
                      isDateSelected(date) && "bg-primary text-white hover:bg-primary/90",
                      isDateInRange(date) && !isDateSelected(date) && "bg-primary/20",
                      date < new Date() && "text-muted-foreground opacity-50 cursor-not-allowed"
                    )}
                    disabled={date < new Date()}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (selectedStartDate && selectedEndDate) {
                  const formattedRange = formatDateRange(selectedStartDate, selectedEndDate);
                  onChange(formattedRange);
                }
                setIsOpen(false);
              }}
              disabled={!selectedStartDate || !selectedEndDate}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;