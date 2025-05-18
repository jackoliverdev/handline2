"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function TimePicker({ value, onChange, disabled, className }: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value || "12:00");
  
  // Common time slots for easier selection
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  ];
  
  // Format time for display (HH:MM to h:MM AM/PM)
  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    return `${hoursNum % 12 || 12}:${minutes} ${hoursNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(newValue)) {
      onChange(newValue);
    }
  };
  
  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setLocalValue(time);
    onChange(time);
    setIsOpen(false);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? formatTimeDisplay(value) : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start">
        <div className="space-y-4">
          <div>
            <Input
              type="time"
              value={localValue}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={time === localValue ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeSelect(time)}
                className={cn(
                  "text-xs",
                  time === localValue && "bg-primary text-primary-foreground"
                )}
              >
                {formatTimeDisplay(time)}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}