import Link from "next/link";

import Footer from "../../layout/Footer/Footer.jsx";
import Header from "../../layout/Header/Header.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const GamesShell = ({ children, groupUrl, mediaAssets, siteContent }) => {
  const { gamesPage } = siteContent;

  return (
    <div className="min-h-screen isolate overflow-x-hidden bg-ggg-bg text-ggg-text font-medium">
      <Header
        brandLogoUrl={mediaAssets.brandLogo.url}
        groupUrl={groupUrl}
        header={siteContent.header}
        site={siteContent.site}
      />

      <PageContainer as="main" className="block">
        <header className="pb-[clamp(12px,1.8vw,20px)] pt-[calc(60px+clamp(18px,2.4vw,34px))]">
          <Link
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.02em] text-ggg-muted transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ggg-accent sm:mb-[clamp(20px,2.8vw,34px)] sm:text-ggg-body-sm"
            href="/"
          >
            <span aria-hidden className="text-base leading-none sm:text-lg">←</span>
            <span>{gamesPage.backLabel}</span>
          </Link>

          <div className="flex max-w-[640px] flex-col items-start">
            <h1
              className="m-0 whitespace-nowrap font-bebas text-[72px] font-bold uppercase leading-[0.88] tracking-[0.005em] text-white [font-synthesis:weight_style] sm:text-[104px] lg:text-[128px]"
              id="games-page-heading"
            >
              {gamesPage.titleLead}{" "}
              <span className="text-ggg-accent">{gamesPage.titleAccent}</span>
            </h1>
          </div>
        </header>

        <div className="mb-[clamp(28px,4vw,40px)] h-px w-full bg-ggg-border" role="presentation" aria-hidden />

        <div className="pb-[clamp(56px,8vw,88px)] pt-0">{children}</div>
      </PageContainer>

      <Footer
        brandLogoUrl={mediaAssets.brandLogo.url}
        footer={siteContent.footer}
        groupUrl={groupUrl}
        media={siteContent.media}
        site={siteContent.site}
      />
    </div>
  );
};

export default GamesShell;
