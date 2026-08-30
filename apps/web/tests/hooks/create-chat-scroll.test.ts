import { describe, it, expect, vi } from "vitest";
import { createRoot, createSignal } from "solid-js";
import { createChatScroll } from "@/hooks/create-chat-scroll";

describe("createChatScroll", () => {
  it("initializes at bottom state", () => {
    createRoot((dispose) => {
      const mockElement = {
        scrollHeight: 500,
        scrollTop: 400,
        clientHeight: 100,
        scrollTo: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLElement;

      const chatScroll = createChatScroll({
        target: () => mockElement,
      });

      expect(chatScroll.isAtBottom()).toBe(true);
      expect(chatScroll.isScrolledUp()).toBe(false);
      dispose();
    });
  });

  it("triggers scrollToBottom correctly", () => {
    createRoot((dispose) => {
      const scrollTo = vi.fn();
      const mockElement = {
        scrollHeight: 1000,
        scrollTop: 200,
        clientHeight: 400,
        scrollTo,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as HTMLElement;

      const chatScroll = createChatScroll({
        target: () => mockElement,
      });

      chatScroll.scrollToBottom();
      expect(scrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: "smooth",
      });

      dispose();
    });
  });
});
