import { useRouterState } from "@tanstack/react-router";

/**
 * Centered spinning page-loading indicator shown while TanStack Router is
 * loading the next route (preloading data + lazy chunks).
 */
export function RouteProgress() {
  const status = useRouterState({ select: (s) => s.status });
  if (status !== "pending") return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none grid place-items-center">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/70 animate-spin shadow-[0_0_24px_oklch(0.82_0.22_88/0.5)]" />
        <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur-sm" />
      </div>
    </div>
  );
}
