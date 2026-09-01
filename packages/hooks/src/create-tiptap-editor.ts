import {
  createSignal,
  onMount,
  onCleanup,
  type Accessor,
} from "solid-js";
import { Editor, type EditorOptions, type Extension } from "@tiptap/core";
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

export interface CreateTiptapEditorOptions
  extends Partial<Omit<EditorOptions, "element">> {
  placeholder?: string;
  characterLimit?: number;
}

export interface CreateTiptapEditorReturn {
  editor: Accessor<Editor | null>;
  html: Accessor<string>;
  text: Accessor<string>;
  markdown: Accessor<string>;
  isEmpty: Accessor<boolean>;
  characterCount: Accessor<number>;
  wordCount: Accessor<number>;
  canUndo: Accessor<boolean>;
  canRedo: Accessor<boolean>;
  mount: (element: HTMLElement) => void;
  destroy: () => void;
  isActive: (name: string | Record<string, any>, attributes?: Record<string, any>) => boolean;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleStrike: () => void;
  toggleCode: () => void;
  toggleHighlight: (color?: string) => void;
  setHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => void;
  setParagraph: () => void;
  toggleBulletList: () => void;
  toggleOrderedList: () => void;
  toggleTaskList: () => void;
  toggleBlockquote: () => void;
  toggleCodeBlock: () => void;
  setTextAlign: (alignment: "left" | "center" | "right" | "justify") => void;
  setLink: (options: string | { href: string; target?: string }) => void;
  unsetLink: () => void;
  setImage: (options: string | { src: string; alt?: string; title?: string }) => void;
  insertTable: (options?: { rows?: number; cols?: number; withHeaderRow?: boolean }) => void;
  insertHorizontalRule: () => void;
  clearContent: () => void;
  setContent: (content: string) => void;
  setEditable: (editable: boolean) => void;
  undo: () => void;
  redo: () => void;
}

export function createTiptapEditor(
  options: CreateTiptapEditorOptions = {}
): CreateTiptapEditorReturn {
  const [editorInstance, setEditorInstance] = createSignal<Editor | null>(null);
  const [html, setHtml] = createSignal<string>("");
  const [text, setText] = createSignal<string>("");
  const [markdown, setMarkdown] = createSignal<string>("");
  const [isEmpty, setIsEmpty] = createSignal<boolean>(true);
  const [characterCount, setCharacterCount] = createSignal<number>(0);
  const [wordCount, setWordCount] = createSignal<number>(0);
  const [canUndo, setCanUndo] = createSignal<boolean>(false);
  const [canRedo, setCanRedo] = createSignal<boolean>(false);
  const [transactionVersion, setTransactionVersion] = createSignal<number>(0);

  let targetElement: HTMLElement | null = null;

  const updateStats = (ed: Editor) => {
    const currentHtml = ed.getHTML();
    const currentText = ed.getText();
    const currentMd = (ed.storage as any).markdown?.getMarkdown?.() || "";
    setHtml(currentHtml);
    setText(currentText);
    setMarkdown(currentMd);
    setIsEmpty(ed.isEmpty);
    setCharacterCount(ed.storage.characterCount?.characters?.() ?? currentText.length);
    setWordCount(ed.storage.characterCount?.words?.() ?? currentText.split(/\s+/).filter(Boolean).length);
    setCanUndo(ed.can().undo());
    setCanRedo(ed.can().redo());
    setTransactionVersion((v) => v + 1);
  };

  const defaultExtensions: Extension[] = [
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
    }) as Extension,
    Placeholder.configure({
      placeholder: options.placeholder || "Write something rich or type '/' for commands...",
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
    CharacterCount.configure({ limit: options.characterLimit }) as Extension,
    Markdown.configure({
      html: true,
      tightLists: true,
      bulletListMarker: "-",
      linkify: true,
      breaks: false,
      transformPastedText: true,
      transformCopiedText: true,
    }) as Extension,
  ];

  const initEditor = (el: HTMLElement) => {
    if (typeof window === "undefined") return;

    const extensions = [...defaultExtensions, ...(options.extensions || [])];

    const editor = new Editor({
      element: el,
      content: options.content,
      editable: options.editable ?? true,
      autofocus: options.autofocus ?? false,
      extensions,
      editorProps: {
        attributes: {
          class:
            "focus:outline-hidden min-h-[220px] w-full max-w-none text-foreground leading-relaxed text-sm " +
            "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-6 [&_h1]:mb-3 " +
            "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-5 [&_h2]:mb-2.5 " +
            "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 " +
            "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-1.5 " +
            "[&_p]:my-2 [&_p]:leading-7 " +
            "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1 " +
            "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1 " +
            "[&_li]:my-0.5 " +
            "[&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:pl-0 [&_ul[data-type=taskList]]:my-3 [&_ul[data-type=taskList]]:space-y-2 " +
            "[&_ul[data-type=taskList]_li]:flex [&_ul[data-type=taskList]_li]:items-start [&_ul[data-type=taskList]_li]:gap-2.5 " +
            "[&_ul[data-type=taskList]_input[type=checkbox]]:mt-1 [&_ul[data-type=taskList]_input[type=checkbox]]:h-4 [&_ul[data-type=taskList]_input[type=checkbox]]:w-4 [&_ul[data-type=taskList]_input[type=checkbox]]:rounded [&_ul[data-type=taskList]_input[type=checkbox]]:border-border [&_ul[data-type=taskList]_input[type=checkbox]]:accent-primary [&_ul[data-type=taskList]_input[type=checkbox]]:cursor-pointer " +
            "[&_mark]:text-foreground [&_mark]:dark:text-background [&_mark]:font-medium [&_mark]:rounded-xs [&_mark]:px-1 [&_mark]:py-0.5 " +
            "[&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:text-muted-foreground [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:h-0",
        },
        ...options.editorProps,
      },
      onUpdate: (props) => {
        updateStats(props.editor);
        options.onUpdate?.(props);
      },
      onSelectionUpdate: (props) => {
        updateStats(props.editor);
        options.onSelectionUpdate?.(props);
      },
      onTransaction: (props) => {
        updateStats(props.editor);
        options.onTransaction?.(props);
      },
      onFocus: (args) => options.onFocus?.(args),
      onBlur: (args) => options.onBlur?.(args),
    });

    setEditorInstance(editor);
    updateStats(editor);
  };

  const mount = (element: HTMLElement) => {
    targetElement = element;
    initEditor(element);
  };

  const destroy = () => {
    editorInstance()?.destroy();
    setEditorInstance(null);
  };

  onCleanup(() => {
    destroy();
  });

  const isActive = (name: string | Record<string, any>, attributes?: Record<string, any>) => {
    transactionVersion();
    const ed = editorInstance();
    if (!ed) return false;
    if (typeof name === "string") {
      return ed.isActive(name, attributes);
    }
    return ed.isActive(name);
  };

  return {
    editor: editorInstance,
    html,
    text,
    markdown,
    isEmpty,
    characterCount,
    wordCount,
    canUndo,
    canRedo,
    mount,
    destroy,
    isActive,
    toggleBold: () => editorInstance()?.chain().focus().toggleBold().run(),
    toggleItalic: () => editorInstance()?.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editorInstance()?.chain().focus().toggleUnderline().run(),
    toggleStrike: () => editorInstance()?.chain().focus().toggleStrike().run(),
    toggleCode: () => editorInstance()?.chain().focus().toggleCode().run(),
    toggleHighlight: (color) => {
      const ed = editorInstance();
      if (!ed) return;
      if (color) {
        ed.chain().focus().toggleHighlight({ color }).run();
      } else {
        ed.chain().focus().toggleHighlight().run();
      }
    },
    setHeading: (level) => editorInstance()?.chain().focus().toggleHeading({ level }).run(),
    setParagraph: () => editorInstance()?.chain().focus().setParagraph().run(),
    toggleBulletList: () => editorInstance()?.chain().focus().toggleBulletList().run(),
    toggleOrderedList: () => editorInstance()?.chain().focus().toggleOrderedList().run(),
    toggleTaskList: () => editorInstance()?.chain().focus().toggleTaskList().run(),
    toggleBlockquote: () => editorInstance()?.chain().focus().toggleBlockquote().run(),
    toggleCodeBlock: () => editorInstance()?.chain().focus().toggleCodeBlock().run(),
    setTextAlign: (alignment) => editorInstance()?.chain().focus().setTextAlign(alignment).run(),
    setLink: (opts) => {
      const ed = editorInstance();
      if (!ed) return;
      if (typeof opts === "string") {
        ed.chain().focus().setLink({ href: opts, target: "_blank" }).run();
      } else {
        ed.chain().focus().setLink({ href: opts.href, target: opts.target ?? "_blank" }).run();
      }
    },
    unsetLink: () => editorInstance()?.chain().focus().unsetLink().run(),
    setImage: (opts) => {
      const ed = editorInstance();
      if (!ed) return;
      if (typeof opts === "string") {
        ed.chain().focus().setImage({ src: opts }).run();
      } else {
        ed.chain().focus().setImage(opts).run();
      }
    },
    insertTable: (opts) =>
      editorInstance()?.chain().focus().insertTable({
        rows: opts?.rows ?? 3,
        cols: opts?.cols ?? 3,
        withHeaderRow: opts?.withHeaderRow ?? true,
      }).run(),
    insertHorizontalRule: () => editorInstance()?.chain().focus().setHorizontalRule().run(),
    clearContent: () => editorInstance()?.chain().focus().clearContent().run(),
    setContent: (c) => editorInstance()?.commands.setContent(c),
    setEditable: (editable: boolean) => editorInstance()?.setEditable(editable),
    undo: () => editorInstance()?.chain().focus().undo().run(),
    redo: () => editorInstance()?.chain().focus().redo().run(),
  };
}
