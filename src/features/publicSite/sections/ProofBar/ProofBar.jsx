import CredibilityTicker from "./CredibilityTicker.jsx";
import MetricBand from "./MetricBand.jsx";

const ProofBar = ({ proofBar, stats }) => (
  <>
    <CredibilityTicker ticker={proofBar.ticker} />
    <MetricBand stats={stats} statsAriaLabel={proofBar.statsAriaLabel} />
  </>
);

export default ProofBar;
