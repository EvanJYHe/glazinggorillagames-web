import { refreshRobloxRuntime } from "../lib/runtime/refresh.js";

const intervalMs = 5 * 60 * 1000;
let isRunning = false;

async function runOnce() {
  if (isRunning) {
    console.warn("Previous runtime refresh is still running; skipping this interval.");
    return;
  }

  isRunning = true;

  try {
    const result = await refreshRobloxRuntime();
    console.log(
      `Runtime refresh ${result.status}: ${result.games.length} games, ${result.groups.length} groups, ${result.warnings.length} warnings.`
    );
  } catch (error) {
    console.error("Runtime refresh failed:", error);
  } finally {
    isRunning = false;
  }
}

await runOnce();
setInterval(runOnce, intervalMs);
