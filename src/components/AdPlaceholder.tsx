// src\components\AdPlaceholder.tsx
interface AdPlaceholderProps {
  slot: string;
  className?: string;
  format?: "horizontal" | "vertical" | "rectangle";
}

const AdPlaceholder = ({ slot, className = "", format = "horizontal" }: AdPlaceholderProps) => {
  const sizeClasses = {
    horizontal: "h-[90px] max-w-[728px]",
    vertical: "h-[600px] max-w-[160px]",
    rectangle: "h-[250px] max-w-[300px]",
  };

  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-xs text-muted-foreground ${sizeClasses[format]} w-full ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      Ad Space
    </div>
  );
};

export default AdPlaceholder;
