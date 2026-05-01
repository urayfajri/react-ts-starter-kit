import React from "react";
import type { ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { AppError } from "./AppError";

type Props = {
  children: React.ReactNode;
  title?: string;
  hint?: string;
};

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const title = this.props.title ?? "Something went wrong";
      const hint =
        this.props.hint ??
        "You can retry or refresh the page. If this keeps happening, contact support.";
      const err = this.state.error;

      let detail = err.message;
      if (err instanceof AppError && err.status !== undefined && import.meta.env.DEV) {
        detail += ` (${err.status})`;
      }

      return (
        <div className="flex min-h-[40vh] items-center justify-center p-6">
          <div
            className="max-w-md rounded-xl border border-border bg-card p-6 shadow-sm space-y-4"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" aria-hidden />
              </span>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">{detail}</p>
                <p className="text-sm text-muted-foreground">{hint}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={this.handleReset}>
                Try again
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
