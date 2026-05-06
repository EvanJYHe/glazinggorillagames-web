import Link from "next/link";

import BrandLogo from "../../shared/BrandLogo/BrandLogo.jsx";
import Button from "../../ui/Button.jsx";
import HeaderNavLinks from "./HeaderNavLinks.jsx";
import NavScrollState from "./NavScrollState.jsx";

const Header = ({ brandLogoUrl, groupUrl, header, site }) => (
  <NavScrollState ariaLabel={header.ariaLabel}>
    <Link
      className="inline-flex shrink-0 items-center gap-[9px] text-ggg-text no-underline touch-manipulation"
      href="/"
      aria-label={header.homeAriaLabel}
    >
      <BrandLogo src={brandLogoUrl} variant="nav" />
      <span className="whitespace-nowrap font-bebas text-sm font-normal uppercase leading-none tracking-[0.1em] [font-synthesis:none] sm:text-ggg-body lg:text-lg">
        {site.name}
      </span>
    </Link>

    <div className="flex shrink-0 items-center gap-5 lg:gap-7">
      <HeaderNavLinks items={header.items} />
      <Button as="a" href={groupUrl} target="_blank" rel="noopener noreferrer" variant="pill">
        {header.groupCtaLabel}
      </Button>
    </div>
  </NavScrollState>
);

export default Header;
