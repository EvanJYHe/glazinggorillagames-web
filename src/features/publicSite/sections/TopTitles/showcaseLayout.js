export const showcaseSlots = ["outer", "inner", "hero", "inner", "outer"];

export function orderGamesForCenter(games) {
  if (!games.length) return games;
  if (games.length === 5) {
    return [games[4], games[2], games[0], games[1], games[3]].filter(Boolean);
  }
  if (games.length <= 2) return games;

  const ordered = [];
  const centerIndex = Math.floor(games.length / 2);
  ordered[centerIndex] = games[0];

  let left = centerIndex - 1;
  let right = centerIndex + 1;
  let source = 1;

  while (source < games.length) {
    if (left >= 0) {
      ordered[left] = games[source];
      source += 1;
      left -= 1;
    }

    if (source < games.length && right < games.length) {
      ordered[right] = games[source];
      source += 1;
      right += 1;
    }
  }

  return ordered.filter(Boolean);
}

export function tabletOrder(games) {
  return [games[1], games[0], games[2]].filter(Boolean);
}
