import { describe, it, expect } from "vitest";
import {
  Message,
  MessageAvatar,
  MessageHeader,
  MessageContent,
  MessageFooter,
  MessageActions,
} from "@/components/ui/message";
import {
  Bubble,
  BubbleGroup,
  BubbleContent,
  BubbleReactions,
  BubbleReaction,
} from "@/components/ui/bubble";
import {
  Marker,
  MarkerContent,
  MarkerDate,
  MarkerTyping,
} from "@/components/ui/marker";

describe("UI Components - Message, Bubble, Marker Suite", () => {
  it("should define all Message subcomponents", () => {
    expect(typeof Message).toBe("function");
    expect(typeof MessageAvatar).toBe("function");
    expect(typeof MessageHeader).toBe("function");
    expect(typeof MessageContent).toBe("function");
    expect(typeof MessageFooter).toBe("function");
    expect(typeof MessageActions).toBe("function");
  });

  it("should define all Bubble subcomponents", () => {
    expect(typeof Bubble).toBe("function");
    expect(typeof BubbleGroup).toBe("function");
    expect(typeof BubbleContent).toBe("function");
    expect(typeof BubbleReactions).toBe("function");
    expect(typeof BubbleReaction).toBe("function");
  });

  it("should define all Marker subcomponents", () => {
    expect(typeof Marker).toBe("function");
    expect(typeof MarkerContent).toBe("function");
    expect(typeof MarkerDate).toBe("function");
    expect(typeof MarkerTyping).toBe("function");
  });
});
