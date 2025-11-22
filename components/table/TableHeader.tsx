import React, { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SortField, SortDirection } from "@/types";

interface TableHeaderProps {
  field: SortField;
  currentSort: { field: SortField | null; direction: SortDirection };
  onSort: (field: SortField) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Sortable table header component
 */
export const TableHeader = memo(function TableHeader({
  field,
  currentSort,
  onSort,
  children,
  className,
}: TableHeaderProps) {
  const isActive = currentSort.field === field;
  const direction = isActive ? currentSort.direction : null;

  const handleClick = () => {
    onSort(field);
  };

  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-all duration-150 select-none",
        isActive && "bg-gray-100",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {direction === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : direction === "desc" ? (
            <ArrowDown className="h-3 w-3" />
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          )}
        </Button>
      </div>
    </th>
  );
});

