import Link from "next/link";

import { cn } from "../../../lib/utils.js";

const linkClass =
  "text-ggg-body-xs text-ggg-dim transition-colors hover:text-ggg-text";

const FooterLink = ({ href, external = false, className, children }) => {
  if (external) {
    const isMailto = href?.startsWith("mailto:");
    return (
      <a
        className={cn(linkClass, className)}
        href={href}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={cn(linkClass, className)} href={href}>
      {children}
    </Link>
  );
};

export default FooterLink;
