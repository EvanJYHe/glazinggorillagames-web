import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MediaLoopVideo } from "../../src/features/publicSite/sections/Media/MediaCarousel.jsx";

describe("showcase video playback", () => {
  let intersect;
  let play;

  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect() {}
    });
    play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("allows a user gesture to retry blocked autoplay", async () => {
    play.mockRejectedValueOnce(new DOMException("Autoplay blocked", "NotAllowedError"));
    const { container } = render(React.createElement(MediaLoopVideo, {
      src: "/reel.mp4", caption: "CONSUME reel", isActive: true,
    }));
    await act(async () => intersect([{ isIntersecting: true }]));
    fireEvent.click(screen.getByRole("button", { name: "Play CONSUME reel" }));
    expect(play).toHaveBeenCalledTimes(2);
    fireEvent.playing(container.querySelector("video"));
    expect(screen.queryByRole("button")).toBeNull();
    fireEvent.pause(container.querySelector("video"));
    expect(screen.getByRole("button", { name: "Play CONSUME reel" })).toBeTruthy();
  });

  it("does not start hidden or inactive carousel videos", () => {
    const { rerender } = render(React.createElement(MediaLoopVideo, {
      src: "/reel.mp4", isActive: true,
    }));
    act(() => intersect([{ isIntersecting: false }]));
    expect(play).not.toHaveBeenCalled();
    rerender(React.createElement(MediaLoopVideo, { src: "/reel.mp4", isActive: false }));
    act(() => intersect([{ isIntersecting: true }]));
    expect(play).not.toHaveBeenCalled();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
