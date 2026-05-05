import { cn } from "../../../lib/utils.js";

const PageContainer = ({ as: Component = "div", className, children, ...rest }) => (
  <Component className={cn("mx-auto w-full max-w-ggg px-ggg", className)} {...rest}>
    {children}
  </Component>
);

export default PageContainer;
