import SplitText from "../../shared/SplitText/SplitText.jsx";
import PageContainer from "../../ui/PageContainer.jsx";
import MediaCarouselIsland from "./MediaCarousel.jsx";

export default function Media({ cards, media }) {
  return (
    <PageContainer as="section" id="social" className="py-16 sm:py-20 lg:py-[88px]">
      <MediaCarouselIsland
        cards={cards}
        media={media}
        heading={
          <h2
            className="font-bebas font-bold text-ggg-section uppercase text-ggg-text [font-synthesis:weight_style]"
            id="social-media-heading"
          >
            <SplitText text={media.heading} />
          </h2>
        }
      />
    </PageContainer>
  );
}
