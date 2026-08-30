import {
  createContext,
  useContext,
  splitProps,
  type Component,
  type JSX,
  type ParentComponent,
  type Accessor,
} from "solid-js";
import { cn } from "@/lib/cn";

/* --- 1. Message Context --- */
export type MessageAlignment = "start" | "end";

interface MessageContextValue {
  align: Accessor<MessageAlignment>;
}

const MessageContext = createContext<MessageContextValue>();

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a <Message />");
  }
  return context;
}

/* --- 2. Message Root --- */
export interface MessageProps extends JSX.HTMLAttributes<HTMLDivElement> {
  align?: MessageAlignment;
  class?: string;
}

export const Message: ParentComponent<MessageProps> = (props) => {
  const [local, rest] = splitProps(props, ["align", "class", "children"]);
  const align = () => local.align ?? "start";

  const contextValue: MessageContextValue = {
    align,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      <div
        data-align={align()}
        class={cn(
          "group/message flex w-full gap-3",
          align() === "end" ? "flex-row-reverse items-start" : "flex-row items-start",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </MessageContext.Provider>
  );
};

/* --- 3. MessageAvatar --- */
export interface MessageAvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MessageAvatar: ParentComponent<MessageAvatarProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("shrink-0 select-none pt-0.5", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 4. MessageHeader --- */
export interface MessageHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MessageHeader: ParentComponent<MessageHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { align } = useMessage();

  return (
    <div
      class={cn(
        "flex items-center gap-2 text-xs text-muted-foreground select-none mb-1",
        align() === "end" ? "justify-end" : "justify-start",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 5. MessageContent --- */
export interface MessageContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MessageContent: ParentComponent<MessageContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { align } = useMessage();

  return (
    <div
      class={cn(
        "flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%]",
        align() === "end" ? "items-end text-right" : "items-start text-left",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. MessageFooter --- */
export interface MessageFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MessageFooter: ParentComponent<MessageFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { align } = useMessage();

  return (
    <div
      class={cn(
        "flex items-center gap-1.5 text-[11px] text-muted-foreground select-none mt-1",
        align() === "end" ? "justify-end" : "justify-start",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 7. MessageActions --- */
export interface MessageActionsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MessageActions: ParentComponent<MessageActionsProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { align } = useMessage();

  return (
    <div
      class={cn(
        "opacity-0 group-hover/message:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1 p-0.5 rounded-md border border-border bg-background shadow-xs",
        align() === "end" ? "flex-row-reverse" : "flex-row",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};
