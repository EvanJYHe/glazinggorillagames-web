import Link from "next/link";

import BrandLogo from "../../shared/BrandLogo/BrandLogo.jsx";
import Button from "../../ui/Button.jsx";
import HeaderNavLinks from "./HeaderNavLinks.jsx";
import HeaderShell from "./HeaderShell.jsx";

const Header = ({ brandLogoUrl, groupUrl, header, site }) => (
  <HeaderShell ariaLabel={header.ariaLabel}>
    <Link
      className="inline-flex shrink-0 items-center gap-[9px] justify-self-start text-ggg-text no-underline touch-manipulation"
      href="/"
      aria-label={header.homeAriaLabel}
    >
      <BrandLogo src={brandLogoUrl} variant="nav" />
      <span className="whitespace-nowrap font-bebas text-base font-normal uppercase leading-none tracking-[0.1em] [font-synthesis:none] sm:text-lg lg:text-xl">
        {site.name}
      </span>
    </Link>

    <div className="hidden shrink-0 items-center gap-7 justify-self-center sm:flex lg:gap-10">
      <HeaderNavLinks items={header.items} />
    </div>

    <Button
      as="a"
      href={groupUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="pill"
      className="justify-self-end"
    >
      {header.groupCtaLabel}
    </Button>
  </HeaderShell>
);

export default Header;
