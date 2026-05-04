import { refreshRobloxRuntime } from "../lib/runtime/refresh.js";

try {
  const result = await refreshRobloxRuntime();
  console.log(
    `Runtime refresh ${result.status}: ${result.games.length} games, ${result.groups.length} groups, ${result.warnings.length} warnings.`
  );
  process.exit(0);
} catch (error) {
  console.error("Runtime refresh failed:", error);
  process.exit(1);
}
