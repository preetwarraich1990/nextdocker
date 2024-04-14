"use client";

import * as React from "react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "../ui/form";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full bg-white text-black rounded hover:bg-white hover:text-black justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? (
              format(value, "dd/MM/yyyy")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) {
              onChange(date);
              setCalendarOpen(false)
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
