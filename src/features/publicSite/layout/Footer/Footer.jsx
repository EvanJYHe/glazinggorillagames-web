import Link from "next/link";

import BrandLogo from "../../shared/BrandLogo/BrandLogo.jsx";
import FooterLink from "../../ui/FooterLink.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const FooterColumnHeading = ({ children }) => (
  <h3 className="mb-3.5 text-ggg-label font-bold uppercase text-ggg-muted">{children}</h3>
);

const Footer = ({ brandLogoUrl, footer, groupUrl, media, site }) => (
  <>
    <PageContainer as="footer" className="border-t border-ggg-border pb-6 pt-12">
      <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-10 max-[700px]:grid-cols-2 max-[700px]:gap-x-6 max-[700px]:gap-y-8">
        <div className="max-[700px]:col-span-2">
          <Link className="mb-2.5 inline-flex items-center gap-[9px] text-ggg-text no-underline" href="/">
            <BrandLogo src={brandLogoUrl} variant="footer" />
            <span className="font-bebas text-lg font-normal uppercase leading-none tracking-[0.1em] [font-synthesis:none]">
              {site.name}
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-start">
          <FooterColumnHeading>{footer.studioHeading}</FooterColumnHeading>
          <FooterLink href="/games" className="mb-[9px]">{footer.links.games}</FooterLink>
          <FooterLink href="/#studio" className="mb-[9px]">{footer.links.about}</FooterLink>
          <FooterLink href="/#contact" className="mb-[9px]">{footer.links.contactSection}</FooterLink>
          <FooterLink href={`mailto:${site.contactEmail}`} external>{footer.links.email}</FooterLink>
        </div>

        <div className="flex flex-col items-start">
          <FooterColumnHeading>{footer.followHeading}</FooterColumnHeading>
          {media.links.map(link => (
            <FooterLink key={link.platform} href={link.href} external className="mb-[9px]">
              {link.platform}
            </FooterLink>
          ))}
          <FooterLink href={groupUrl} external>{footer.links.group}</FooterLink>
        </div>
      </div>
    </PageContainer>
    <PageContainer className="flex flex-wrap items-center justify-between gap-2 border-t border-ggg-border py-4.5 text-xs text-ggg-dim">
      <span>© {new Date().getFullYear()} {site.name}. {footer.copyrightTemplate}</span>
      <span>{site.contactEmail}</span>
    </PageContainer>
  </>
);

export default Footer;
