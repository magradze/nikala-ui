import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Typography from "@tiptap/extension-typography";
import { Markdown } from "tiptap-markdown";
import type { Extension } from "@tiptap/core";

export interface DefaultExtensionsOptions {
  placeholder?: string;
  characterLimit?: number;
}

export function getDefaultExtensions(options?: DefaultExtensionsOptions): Extension[] {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: { class: "font-heading tracking-tight" },
      },
      bulletList: {
        HTMLAttributes: { class: "list-disc pl-6 my-3 space-y-1" },
      },
      orderedList: {
        HTMLAttributes: { class: "list-decimal pl-6 my-3 space-y-1" },
      },
      listItem: {
        HTMLAttributes: { class: "leading-normal my-0.5" },
      },
      codeBlock: {
        HTMLAttributes: {
          class: "rounded-lg bg-muted p-4 font-mono text-xs border border-border my-3 overflow-x-auto text-foreground",
        },
      },
      code: {
        HTMLAttributes: {
          class: "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-semibold border border-border/50",
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: "border-l-4 border-primary pl-4 italic text-muted-foreground my-3",
        },
      },
      horizontalRule: {
        HTMLAttributes: {
          class: "border-border my-6",
        },
      },
    }) as Extension,
    Placeholder.configure({
      placeholder: options?.placeholder || "Write something rich or type '/' for commands...",
      emptyEditorClass: "is-editor-empty",
    }) as Extension,
    Underline as Extension,
    Subscript as Extension,
    Superscript as Extension,
    Typography as Extension,
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: { class: "rounded px-1 py-0.5" },
    }) as Extension,
    TextAlign.configure({ types: ["heading", "paragraph"] }) as Extension,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "text-primary font-medium underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer",
      },
    }) as Extension,
    Image.configure({
      HTMLAttributes: {
        class: "rounded-lg max-w-full h-auto my-4 border border-border shadow-xs",
      },
    }) as Extension,
    TaskList.configure({
      HTMLAttributes: { class: "list-none pl-0 my-3 space-y-2" },
    }) as Extension,
    TaskItem.configure({
      nested: true,
      HTMLAttributes: { class: "flex items-start gap-2.5 my-1" },
    }) as Extension,
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: "border-collapse table-auto w-full my-4 border border-border rounded-lg overflow-hidden text-sm",
      },
    }) as Extension,
    TableRow as Extension,
    TableHeader.configure({
      HTMLAttributes: { class: "border border-border bg-muted/70 px-3 py-2 font-semibold text-left text-xs" },
    }) as Extension,
    TableCell.configure({
      HTMLAttributes: { class: "border border-border px-3 py-2 text-xs" },
    }) as Extension,
    CharacterCount.configure({ limit: options?.characterLimit }) as Extension,
    Markdown.configure({
      html: true,
      tightLists: true,
      tightListClass: "tight",
      bulletListMarker: "-",
      linkify: true,
      breaks: false,
      transformPastedText: true,
      transformCopiedText: true,
    }) as Extension,
  ];
}
