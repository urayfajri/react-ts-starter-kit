import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

export default function ComponentShowcase() {
  const [feedback, setFeedback] = useState<string>("");

  const handleButtonClick = (variant: string) => {
    setFeedback(`Clicked ${variant} button!`);
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Component Showcase</h3>
        <p className="text-muted-foreground">Try different button variants and colors</p>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Color Variants
        </h4>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleButtonClick("Primary")}>Primary</Button>
          <Button variant="secondary" onClick={() => handleButtonClick("Secondary")}>
            Secondary
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleButtonClick("Success")}
          >
            Success
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleButtonClick("Error")}
          >
            Error
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => handleButtonClick("Warning")}
          >
            Warning
          </Button>
        </div>
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Size Variants
        </h4>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm" onClick={() => handleButtonClick("Small")}>
            Small
          </Button>
          <Button onClick={() => handleButtonClick("Default")}>Default</Button>
          <Button size="lg" onClick={() => handleButtonClick("Large")}>
            Large
          </Button>
        </div>
      </div>

      {/* Style Variants */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Style Variants
        </h4>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleButtonClick("Default Style")}>Default</Button>
          <Button variant="outline" onClick={() => handleButtonClick("Outline")}>
            Outline
          </Button>
          <Button variant="ghost" onClick={() => handleButtonClick("Ghost")}>
            Ghost
          </Button>
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className="mt-4 p-4 rounded-lg bg-primary/20 border border-primary/30 text-sm font-medium text-primary animate-in fade-in duration-200">
          ✓ {feedback}
        </div>
      )}
    </div>
  );
}
