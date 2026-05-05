import { cn } from "../../../lib/utils.js";

const StateCard = ({ children, className }) => (
  <div
    className={cn(
      "rounded-ggg-md border border-ggg-border bg-ggg-panel px-5 py-4 text-ggg-body-sm leading-6 text-ggg-muted",
      className,
    )}
  >
    {children}
  </div>
);

export default StateCard;
