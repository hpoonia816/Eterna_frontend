import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Error display component for API errors
 */
export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-[#25252b] rounded-lg shadow-sm border border-[#2a2a30]">
      <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-white">Error loading data</h2>
      <p className="text-gray-400 mb-6 text-center max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="min-w-[100px] bg-[#1f1f24] border-[#2a2a30] text-white hover:bg-[#2a2a30]">
          Retry
        </Button>
      )}
    </div>
  );
}

