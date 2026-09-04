// src/config/docs.ts
import type { Component } from "solid-js";
import { BookOpen, Terminal, Palette, Bot } from "lucide-solid";
import { DocComponentItem, DocHookItem, DocGuideItem, NavSection } from "@/types";

/* --- Documentation Guides List --- */
export const DOCUMENTATION_LIST: DocGuideItem[] = [
  {
    title: "Introduction",
    subtitle: "Architecture philosophy and Niko Pirosmani tribute",
    href: "/docs",
    shortcut: "⌘1",
    icon: BookOpen,
  },
  {
    title: "CLI Reference",
    subtitle: "nikala init, add, validate, diff, theme",
    href: "/docs/cli",
    shortcut: "⌘2",
    icon: Terminal,
  },
  {
    title: "Theming Guide",
    subtitle: "Dynamic theme provider and color palettes",
    href: "/docs/theming",
    shortcut: "⌘3",
    icon: Palette,
  },
  {
    title: "MCP",
    subtitle: "Model Context Protocol for AI coding assistants",
    href: "/docs/mcp",
    shortcut: "⌘4",
    icon: Bot,
  },
];

/* --- Hooks Registry List --- */
export const HOOKS_LIST: DocHookItem[] = [
  {
    name: "create-controllable-signal",
    title: "createControllableSignal",
    description: "SolidJS reactive primitive supporting both controlled and uncontrolled state management",
    href: "/docs/hooks/create-controllable-signal",
  },
  {
    name: "create-click-outside",
    title: "createClickOutside",
    description: "SolidJS reactive primitive for detecting click and pointer interactions outside target elements",
    href: "/docs/hooks/create-click-outside",
  },
  {
    name: "create-clipboard",
    title: "createClipboard",
    description: "SolidJS reactive primitive for copying text to clipboard with automatic status reset",
    href: "/docs/hooks/create-clipboard",
  },
  {
    name: "create-keybindings",
    title: "createKeybindings",
    description: "SolidJS reactive primitives for listening to keyboard shortcuts, key combinations, and Escape key presses",
    href: "/docs/hooks/create-keybindings",
  },
  {
    name: "create-lock-scroll",
    title: "createLockScroll",
    description: "SolidJS reactive primitive for locking body or container scrolling when overlays are active",
    href: "/docs/hooks/create-lock-scroll",
  },
  {
    name: "create-disclosure",
    title: "createDisclosure",
    description: "SolidJS reactive primitive for managing boolean open/close disclosure state with helper controls",
    href: "/docs/hooks/create-disclosure",
  },
  {
    name: "create-media-query",
    title: "createMediaQuery",
    description: "SolidJS reactive primitives for tracking CSS media queries and responsive Tailwind breakpoints",
    href: "/docs/hooks/create-media-query",
  },
  {
    name: "create-debounce",
    title: "createDebounce",
    description: "SolidJS reactive primitives for debouncing and throttling rate-limited function execution",
    href: "/docs/hooks/create-debounce",
  },
  {
    name: "create-intersection-observer",
    title: "createIntersectionObserver",
    description: "SolidJS reactive primitives for observing element visibility and viewport intersection status",
    href: "/docs/hooks/create-intersection-observer",
  },
  {
    name: "create-timer",
    title: "createTimer",
    description: "SolidJS reactive primitives for recurring interval ticks and formatted countdown timers",
    href: "/docs/hooks/create-timer",
  },
  {
    name: "create-resize-observer",
    title: "createResizeObserver",
    description: "SolidJS reactive primitives for tracking element width and height dimensions dynamically",
    href: "/docs/hooks/create-resize-observer",
  },
  {
    name: "create-window-size",
    title: "createWindowSize",
    description: "SolidJS reactive primitive for tracking window viewport inner width and height",
    href: "/docs/hooks/create-window-size",
  },
  {
    name: "create-scroll-position",
    title: "createScrollPosition",
    description: "SolidJS reactive primitive for tracking scroll position, scroll direction, and container bounds",
    href: "/docs/hooks/create-scroll-position",
  },
  {
    name: "create-focus-trap",
    title: "createFocusTrap",
    description: "SolidJS reactive primitive for trapping keyboard focus inside target container element for accessibility",
    href: "/docs/hooks/create-focus-trap",
  },
  {
    name: "create-mouse-position",
    title: "createMousePosition",
    description: "SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates",
    href: "/docs/hooks/create-mouse-position",
  },
  {
    name: "create-long-press",
    title: "createLongPress",
    description: "SolidJS reactive primitive for detecting long press / hold touch and pointer interactions",
    href: "/docs/hooks/create-long-press",
  },
  {
    name: "create-hover",
    title: "createHover",
    description: "SolidJS reactive primitive for tracking element hover state with entrance and exit delays",
    href: "/docs/hooks/create-hover",
  },
  {
    name: "create-storage",
    title: "createLocalStorage",
    description: "SolidJS reactive primitives for Web Storage state synchronization across components and browser tabs",
    href: "/docs/hooks/create-storage",
  },
  {
    name: "create-previous",
    title: "createPrevious",
    description: "SolidJS reactive primitive for tracking previous value of a signal accessor",
    href: "/docs/hooks/create-previous",
  },
  {
    name: "create-network-status",
    title: "createNetworkStatus",
    description: "SolidJS reactive primitives for tracking browser network connectivity and connection quality metrics",
    href: "/docs/hooks/create-network-status",
  },
  {
    name: "create-color-mode",
    title: "createColorMode",
    description: "SolidJS reactive primitive for managing dark/light themes and system preferences",
    href: "/docs/hooks/create-color-mode",
  },
  {
    name: "create-form",
    title: "createForm",
    description: "SolidJS reactive primitive for form state management, field validation, errors, and submission",
    href: "/docs/hooks/create-form",
  },
  {
    name: "create-input-mask",
    title: "createInputMask",
    description: "SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates)",
    href: "/docs/hooks/create-input-mask",
  },
  {
    name: "create-idle",
    title: "createIdle",
    description: "SolidJS reactive primitive for detecting user inactivity with customizable timeout",
    href: "/docs/hooks/create-idle",
  },
  {
    name: "create-active-element",
    title: "createActiveElement",
    description: "SolidJS reactive primitive for tracking the currently focused DOM element",
    href: "/docs/hooks/create-active-element",
  },
  {
    name: "create-infinite-scroll",
    title: "createInfiniteScroll",
    description: "SolidJS reactive primitive for dynamic infinite scrolling, auto-fetching pages, and scroll pagination",
    href: "/docs/hooks/create-infinite-scroll",
  },
  {
    name: "create-fullscreen",
    title: "createFullscreen",
    description: "SolidJS reactive primitive for requesting and monitoring element or document fullscreen status",
    href: "/docs/hooks/create-fullscreen",
  },
  {
    name: "create-audio",
    title: "createAudio & createVideo",
    description: "SolidJS reactive primitives for controlling HTML audio and video playback, duration, volume, and seeking",
    href: "/docs/hooks/create-audio",
  },
  {
    name: "create-orientation",
    title: "createOrientation",
    description: "SolidJS reactive primitive for observing mobile and desktop screen orientation changes and rotation angles",
    href: "/docs/hooks/create-orientation",
  },
  {
    name: "create-undo-redo",
    title: "createUndoRedo",
    description: "SolidJS reactive primitive for undo/redo state history management, history stack tracking, and reverting actions",
    href: "/docs/hooks/create-undo-redo",
  },
  {
    name: "create-fetch",
    title: "createFetch",
    description: "SolidJS reactive primitive for HTTP REST API fetching, request loading states, error handling, and refetching",
    href: "/docs/hooks/create-fetch",
  },
  {
    name: "create-geolocation",
    title: "createGeolocation",
    description: "SolidJS reactive primitive for tracking browser Geolocation position, coordinates, speed, and GPS accuracy",
    href: "/docs/hooks/create-geolocation",
  },
  {
    name: "create-permission",
    title: "createPermission",
    description: "SolidJS reactive primitive for querying and observing browser permission status changes",
    href: "/docs/hooks/create-permission",
  },
  {
    name: "create-battery",
    title: "createBattery",
    description: "SolidJS reactive primitive for observing device battery status, charge level, and charging metrics",
    href: "/docs/hooks/create-battery",
  },
  {
    name: "create-web-notification",
    title: "createWebNotification",
    description: "SolidJS reactive primitive for sending browser desktop notifications and managing notification permissions",
    href: "/docs/hooks/create-web-notification",
  },
  {
    name: "create-websocket",
    title: "createWebSocket",
    description: "SolidJS reactive primitive for WebSocket client connections, auto-reconnection, and message passing",
    href: "/docs/hooks/create-websocket",
  },
  {
    name: "create-document-title",
    title: "createDocumentTitle",
    description: "SolidJS reactive primitive for managing document title dynamically",
    href: "/docs/hooks/create-document-title",
  },
  {
    name: "create-favicon",
    title: "createFavicon",
    description: "SolidJS reactive primitive for dynamically updating browser favicon element",
    href: "/docs/hooks/create-favicon",
  },
  {
    name: "create-event-source",
    title: "createEventSource",
    description: "SolidJS reactive primitive for subscribing to Server-Sent Events (SSE) streams",
    href: "/docs/hooks/create-event-source",
  },
  {
    name: "create-scroll-into-view",
    title: "createScrollIntoView",
    description: "SolidJS reactive primitive for scrolling a target element into view smooth or auto behavior",
    href: "/docs/hooks/create-scroll-into-view",
  },
  {
    name: "create-drop-zone",
    title: "createDropZone",
    description: "SolidJS reactive primitive for file drag & drop operations, validation, and file chooser dialogs",
    href: "/docs/hooks/create-drop-zone",
  },
  {
    name: "create-pagination",
    title: "createPagination",
    description: "SolidJS reactive primitive for computing pagination state, dynamic page ranges with ellipses, and navigation controls",
    href: "/docs/hooks/create-pagination",
  },
  {
    name: "create-chat-scroll",
    title: "createChatScroll",
    description: "SolidJS reactive primitive for intelligent chat message streaming auto-scrolling with user-pinned override detection",
    href: "/docs/hooks/create-chat-scroll",
  },
  {
    name: "create-tauri-window",
    title: "createTauriWindow",
    description: "SolidJS reactive primitive for observing and controlling Tauri desktop window states with drag regions and platform detection",
    href: "/docs/desktop/create-tauri-window",
  },
  {
    name: "create-global-shortcut",
    title: "createGlobalShortcut",
    description: "SolidJS reactive primitive for registering native OS global hotkeys with automatic web keyboard fallback",
    href: "/docs/desktop/create-global-shortcut",
  },
  {
    name: "create-app-updater",
    title: "createAppUpdater",
    description: "SolidJS reactive primitive for controlling and observing Tauri v2 application updates and download streams",
    href: "/docs/desktop/create-app-updater",
  },
  {
    name: "create-document-tabs",
    title: "createDocumentTabs",
    description: "SolidJS reactive primitive for managing multi-document tabs, editor buffers, and browser tab stacks with adjacent activation and pinned state",
    href: "/docs/desktop/create-document-tabs",
  },
  {
    name: "create-tiptap-editor",
    title: "createTiptapEditor",
    description: "Fine-grained reactive SolidJS primitive for managing Tiptap rich text editor instances, signals, and formatting commands",
    href: "/docs/hooks/create-tiptap-editor",
  },
];

/* --- Component Library Registry List --- */
export const COMPONENTS_LIST: DocComponentItem[] = [
  { name: "accordion", title: "Accordion", description: "Vertically stacked collapsible content sections", href: "/docs/components/accordion" },
  { name: "alert", title: "Alert", description: "Callout banner for user feedback with status variants", href: "/docs/components/alert" },
  { name: "api-table", title: "API Table", description: "Structured API reference table for documenting props, types, defaults, and descriptions", href: "/docs/components/api-table" },
  { name: "avatar", title: "Avatar", description: "Profile image component with automatic fallback handling", href: "/docs/components/avatar" },
  { name: "badge", title: "Badge", description: "Status indicator and tag badges with multiple variants", href: "/docs/components/badge" },
  { name: "banner", title: "Banner", description: "Announcement banner with sticky positioning and dismissal", href: "/docs/components/banner" },
  { name: "breadcrumb", title: "Breadcrumb", description: "Accessible navigation trail hierarchy", href: "/docs/components/breadcrumb" },
  { name: "button", title: "Button", description: "Interactive button with variant and size options", href: "/docs/components/button" },
  { name: "button-group", title: "Button Group", description: "Connected horizontal or vertical group of related buttons", href: "/docs/components/button-group" },
  { name: "callout", title: "Callout", description: "Semantic callout and alert block with status variants and icons for notices and documentation", href: "/docs/components/callout" },
  { name: "card", title: "Card", description: "Compound card layout with header, title, and footer", href: "/docs/components/card" },
  { name: "container", title: "Container", description: "A responsive layout container constraining maximum width with semantic padding tokens", href: "/docs/components/container" },
  { name: "code-block", title: "Code Block", description: "Code block container with filename header, language badge, and interactive copy button", href: "/docs/components/code-block" },
  { name: "code-group", title: "Code Group", description: "Tabbed multi-file code snippet container built on Tabs", href: "/docs/components/code-group" },
  { name: "component-viewer", title: "Component Viewer", description: "Interactive preview canvas and code viewer container with responsive viewports, canvas grid, and AI prompts", href: "/docs/components/component-viewer" },
  { name: "checkbox", title: "Checkbox", description: "Checkable input box with custom checkmark indicator", href: "/docs/components/checkbox" },
  { name: "combobox", title: "Combobox", description: "Searchable autocomplete dropdown with single/multi-selection tags, avatars, and groups", href: "/docs/components/combobox" },
  { name: "command", title: "Command", description: "Fast, accessible command palette and search modal", href: "/docs/components/command" },
  { name: "dialog", title: "Dialog", description: "Accessible modal window overlaying main content", href: "/docs/components/dialog" },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Full-featured context menu with submenus and items", href: "/docs/components/dropdown-menu" },
  { name: "empty", title: "Empty", description: "Compound empty-state layout for collections and search results", href: "/docs/components/empty" },
  { name: "file-tree", title: "File Tree", description: "Hierarchical directory file tree with collapsible folders and file icons", href: "/docs/components/file-tree" },
  { name: "field", title: "Field", description: "Consistent form layout for labels, descriptions, and validation errors", href: "/docs/components/field" },
  { name: "form", title: "Form", description: "Semantic form wrapper designed for the createForm reactive primitive", href: "/docs/components/form" },
  { name: "form-message", title: "Form Message", description: "Validation message helper connected to createForm errors and touched state", href: "/docs/components/form-message" },
  { name: "input", title: "Input", description: "Reactive text input field with modern focus states", href: "/docs/components/input" },
  { name: "input-group", title: "Input Group", description: "Compound input wrapper with prefix and suffix addons", href: "/docs/components/input-group" },
  { name: "hover-card", title: "Hover Card", description: "Profile and link preview popover triggered on hover", href: "/docs/components/hover-card" },
  { name: "icon-button", title: "Icon Button", description: "Accessible square button for icon-only actions", href: "/docs/components/icon-button" },
  { name: "kbd", title: "Kbd", description: "Keyboard key and shortcut indicators for hotkeys", href: "/docs/components/kbd" },
  { name: "label", title: "Label", description: "Accessible caption label for form controls", href: "/docs/components/label" },
  { name: "list", title: "List", description: "Compound list components supporting icons, avatars, and hotkeys", href: "/docs/components/list" },
  { name: "radio-group", title: "Radio Group", description: "Accessible radio button group layout", href: "/docs/components/radio-group" },
  { name: "select", title: "Select", description: "Custom dropdown select menu component", href: "/docs/components/select" },
  { name: "separator", title: "Separator", description: "Visual or semantic horizontal/vertical line divider", href: "/docs/components/separator" },
  { name: "section-heading", title: "Section Heading", description: "Reusable heading block with title, badge, and description in page or section variants", href: "/docs/components/section-heading" },
  { name: "sheet", title: "Sheet", description: "Sliding panel component with slide-in animations", href: "/docs/components/sheet" },
  { name: "skeleton", title: "Skeleton", description: "Animated pulse loading placeholder", href: "/docs/components/skeleton" },
  { name: "spinner", title: "Spinner", description: "Accessible animated loading indicator for asynchronous UI states", href: "/docs/components/spinner" },
  { name: "status", title: "Status", description: "Compact semantic status dot and label indicator", href: "/docs/components/status" },
  { name: "steps", title: "Steps", description: "Vertical multi-step instruction container with connecting progress line", href: "/docs/components/steps" },
  { name: "slider", title: "Slider", description: "Numeric range selection slider supporting single/dual thumbs, custom steps, and vertical orientation", href: "/docs/components/slider" },
  { name: "switch", title: "Switch", description: "Toggle switch control for boolean states", href: "/docs/components/switch" },
  { name: "tabs", title: "Tabs", description: "Layered content switcher supporting horizontal/vertical tabs", href: "/docs/components/tabs" },
  { name: "textarea", title: "Textarea", description: "Multi-line text area field with focus styling", href: "/docs/components/textarea" },
  { name: "theme-manager", title: "Theme Manager", description: "Zero-dependency ThemeProvider and ThemeToggle", href: "/docs/components/theme-manager" },
  { name: "toast", title: "Toast", description: "Temporary feedback notification banners built on Kobalte primitives", href: "/docs/components/toast" },
  { name: "tooltip", title: "Tooltip", description: "Contextual hover information popup badge", href: "/docs/components/tooltip" },
  { name: "popover", title: "Popover", description: "Displays rich content in a portal layer triggered by a button", href: "/docs/components/popover" },
  { name: "pin-input", title: "Pin Input", description: "4 or 6-digit SMS/2FA verification PIN code input slots", href: "/docs/components/pin-input" },
  { name: "progress", title: "Progress", description: "Displays an indicator showing completion progress of a task or media", href: "/docs/components/progress" },
  { name: "collapsible", title: "Collapsible", description: "An interactive component that expands and collapses content panels with height transitions", href: "/docs/components/collapsible" },
  { name: "aspect-ratio", title: "Aspect Ratio", description: "Displays content within a specific aspect ratio using CSS aspect-ratio while preventing layout shifts", href: "/docs/components/aspect-ratio" },
  { name: "toggle", title: "Toggle", description: "A two-state interactive button component built on Kobalte primitives", href: "/docs/components/toggle" },
  { name: "number-input", title: "Number Input", description: "A numeric stepper input component supporting min, max, step, and keyboard navigation", href: "/docs/components/number-input" },
  { name: "context-menu", title: "Context Menu", description: "Displays a contextual popup menu triggered by right-clicking or tapping target areas", href: "/docs/components/context-menu" },
  { name: "resizable", title: "Resizable", description: "Accessible resizable panel layout component supporting drag-to-resize handles", href: "/docs/components/resizable" },
  { name: "scroll-area", title: "Scroll Area", description: "Augments native scroll functionality with custom styled scrollbars", href: "/docs/components/scroll-area" },
  { name: "table", title: "Table", description: "A responsive and accessible data table component with headers, rows, and footer summaries", href: "/docs/components/table" },
  { name: "table-of-contents", title: "Table of Contents", description: "An accessible heading navigation tree with ScrollSpy tracking and smooth scrolling", href: "/docs/components/table-of-contents" },
  { name: "dropzone", title: "Dropzone", description: "A compound drag-and-drop file upload container with file list previews and validation", href: "/docs/components/dropzone" },
  { name: "toggle-group", title: "Toggle Group", description: "A set of two-state buttons supporting single/multiple selection, size variants, and keyboard navigation", href: "/docs/components/toggle-group" },
  { name: "timeline", title: "Timeline", description: "A responsive chronological display for event streams, activity logs, and multi-step workflows", href: "/docs/components/timeline" },
  { name: "navigation-menu", title: "Navigation Menu", description: "A responsive and accessible top header navigation menu with mega-menu dropdowns and link previews", href: "/docs/components/navigation-menu" },
  { name: "navbar", title: "Navbar", description: "A responsive, accessible, and composable top navigation header suite with floating and mobile drawer variants", href: "/docs/components/navbar" },
  { name: "footer", title: "Footer", description: "A responsive, accessible, and structured bottom navigation layout suite for websites and applications", href: "/docs/components/footer" },
  { name: "package-manager-tabs", title: "Package Manager Tabs", description: "Interactive CLI command tabs for customizable package managers", href: "/docs/components/package-manager-tabs" },
  { name: "pagination", title: "Pagination", description: "An accessible multi-page navigation bar with previous, next, page numbers, and ellipsis controls", href: "/docs/components/pagination" },
  { name: "pager", title: "Pager", description: "Previous and next article navigation links with card previews for documentation and blog layouts", href: "/docs/components/pager" },
  { name: "message", title: "Message", description: "A structured chat and conversation message layout with avatars, alignment, headers, footers, and actions", href: "/docs/components/message" },
  { name: "bubble", title: "Bubble", description: "Chat message bubble container supporting variants, grouped consecutive bubbles, and emoji reactions", href: "/docs/components/bubble" },
  { name: "marker", title: "Marker", description: "System chat events, date dividers, and live typing indicator badges", href: "/docs/components/marker" },
  { name: "stat", title: "Stat", description: "Display key performance indicators, statistics, financial data, and metrics with trends and icons", href: "/docs/components/stat" },
  { name: "marquee", title: "Marquee", description: "A smooth, GPU-accelerated infinite scrolling ticker component for logo clouds, testimonials, and live ribbons", href: "/docs/components/marquee" },
  { name: "review-card", title: "Review Card", description: "A versatile, structured card component for customer testimonials, product ratings, and social proof", href: "/docs/components/review-card" },
  { name: "rating", title: "Rating", description: "An accessible star rating component supporting interactive inputs, hover preview states, and read-only score badges", href: "/docs/components/rating" },
  { name: "sidebar", title: "Sidebar", description: "A composable, collapsible, and accessible application sidebar navigation suite with icon mode and keyboard shortcuts", href: "/docs/components/sidebar" },
  { name: "titlebar", title: "Titlebar", description: "A native-feeling custom titlebar for frameless desktop windows supporting macOS Traffic Lights and Windows 11 controls", href: "/docs/desktop/titlebar" },
  { name: "updater-modal", title: "Updater Modal", description: "An automated application auto-updater dialog for Tauri v2 with release notes preview and progress bar", href: "/docs/desktop/updater-dialog" },
  { name: "rich-text-editor", title: "Rich Text Editor", description: "A full-featured WYSIWYG rich text editor with toolbar, bubble formatting, tables, and task lists built on Tiptap", href: "/docs/components/rich-text-editor" },
];

/* --- Global Sidebar Navigation Config --- */
export const GETTING_STARTED_SECTION: NavSection = {
  title: "Getting Started",
  items: [
    { title: "Introduction", href: "/docs" },
    { title: "CLI Reference", href: "/docs/cli" },
    { title: "Theming", href: "/docs/theming" },
    { title: "MCP", href: "/docs/mcp" },
  ],
};

/* --- Categorized Component Sections --- */
export const COMPONENT_SECTIONS: NavSection[] = [
  {
    title: "Inputs & Forms",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group", addedAt: "2026-08-10" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Dropzone", href: "/docs/components/dropzone", addedAt: "2026-08-29" },
      { title: "Field", href: "/docs/components/field", addedAt: "2026-08-10" },
      { title: "Form", href: "/docs/components/form", addedAt: "2026-08-10" },
      { title: "Form Message", href: "/docs/components/form-message", addedAt: "2026-08-10" },
      { title: "Icon Button", href: "/docs/components/icon-button", addedAt: "2026-08-10" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Number Input", href: "/docs/components/number-input", addedAt: "2026-08-08" },
      { title: "Pin Input", href: "/docs/components/pin-input" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Rating", href: "/docs/components/rating", addedAt: "2026-08-30" },
      { title: "Rich Text Editor", href: "/docs/components/rich-text-editor", addedAt: "2026-09-01" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toggle", href: "/docs/components/toggle", addedAt: "2026-08-08" },
      { title: "Toggle Group", href: "/docs/components/toggle-group", addedAt: "2026-08-30" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "API Table", href: "/docs/components/api-table", addedAt: "2026-09-02" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Bubble", href: "/docs/components/bubble", addedAt: "2026-08-30" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Code Block", href: "/docs/components/code-block", addedAt: "2026-09-02" },
      { title: "Code Group", href: "/docs/components/code-group", addedAt: "2026-09-02" },
      { title: "Component Viewer", href: "/docs/components/component-viewer", addedAt: "2026-09-02" },
      { title: "Empty", href: "/docs/components/empty", addedAt: "2026-08-10" },
      { title: "File Tree", href: "/docs/components/file-tree", addedAt: "2026-09-02" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "List", href: "/docs/components/list" },
      { title: "Marker", href: "/docs/components/marker", addedAt: "2026-08-30" },
      { title: "Marquee", href: "/docs/components/marquee", addedAt: "2026-08-30" },
      { title: "Message", href: "/docs/components/message", addedAt: "2026-08-30" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Resizable", href: "/docs/components/resizable", addedAt: "2026-08-08" },
      { title: "Review Card", href: "/docs/components/review-card", addedAt: "2026-08-30" },
      { title: "Scroll Area", href: "/docs/components/scroll-area", addedAt: "2026-08-08" },
      { title: "Section Heading", href: "/docs/components/section-heading", addedAt: "2026-09-03" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Stat", href: "/docs/components/stat", addedAt: "2026-08-30" },
      { title: "Table", href: "/docs/components/table", addedAt: "2026-08-29" },
      { title: "Timeline", href: "/docs/components/timeline", addedAt: "2026-08-30" },
    ],
  },
  {
    title: "Feedback & Status",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Banner", href: "/docs/components/banner" },
      { title: "Callout", href: "/docs/components/callout", addedAt: "2026-09-02" },
      { title: "Spinner", href: "/docs/components/spinner", addedAt: "2026-08-10" },
      { title: "Status", href: "/docs/components/status", addedAt: "2026-08-10" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Overlays & Dialogs",
    items: [
      { title: "Context Menu", href: "/docs/components/context-menu", addedAt: "2026-08-08" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Sheet", href: "/docs/components/sheet" },
    ],
  },
  {
    title: "Navigation & Layout",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio", addedAt: "2026-08-07" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Collapsible", href: "/docs/components/collapsible", addedAt: "2026-08-06" },
      { title: "Combobox", href: "/docs/components/combobox", addedAt: "2026-08-05" },
      { title: "Command", href: "/docs/components/command", addedAt: "2026-08-05" },
      { title: "Container", href: "/docs/components/container", addedAt: "2026-09-04" },
      { title: "Footer", href: "/docs/components/footer", addedAt: "2026-08-30" },
      { title: "Navbar", href: "/docs/components/navbar", addedAt: "2026-08-30" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu", addedAt: "2026-08-30" },
      { title: "Package Manager Tabs", href: "/docs/components/package-manager-tabs", addedAt: "2026-09-02" },
      { title: "Pagination", href: "/docs/components/pagination", addedAt: "2026-08-30" },
      { title: "Pager", href: "/docs/components/pager", addedAt: "2026-09-04" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sidebar", href: "/docs/components/sidebar", addedAt: "2026-08-30" },
      { title: "Slider", href: "/docs/components/slider", addedAt: "2026-08-04" },
      { title: "Steps", href: "/docs/components/steps", addedAt: "2026-09-02" },
      { title: "Table of Contents", href: "/docs/components/table-of-contents", addedAt: "2026-09-04" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Theme Manager", href: "/docs/components/theme-manager" },
    ],
  },
];

/* --- Categorized Hooks Sections --- */
export const HOOK_SECTIONS: NavSection[] = [
  {
    title: "State & Controls",
    items: [
      { title: "createControllableSignal", href: "/docs/hooks/create-controllable-signal" },
      { title: "createDisclosure", href: "/docs/hooks/create-disclosure" },
      { title: "createForm", href: "/docs/hooks/create-form" },
      { title: "createPagination", href: "/docs/hooks/create-pagination", addedAt: "2026-08-30" },
      { title: "createPrevious", href: "/docs/hooks/create-previous" },
      { title: "createUndoRedo", href: "/docs/hooks/create-undo-redo" },
    ],
  },
  {
    title: "DOM & Interactivity",
    items: [
      { title: "createActiveElement", href: "/docs/hooks/create-active-element" },
      { title: "createChatScroll", href: "/docs/hooks/create-chat-scroll", addedAt: "2026-08-30" },
      { title: "createClickOutside", href: "/docs/hooks/create-click-outside" },
      { title: "createClipboard", href: "/docs/hooks/create-clipboard" },
      { title: "createDebounce", href: "/docs/hooks/create-debounce" },
      { title: "createDropZone", href: "/docs/hooks/create-drop-zone", addedAt: "2026-08-29" },
      { title: "createFocusTrap", href: "/docs/hooks/create-focus-trap" },
      { title: "createHover", href: "/docs/hooks/create-hover" },
      { title: "createInputMask", href: "/docs/hooks/create-input-mask" },
      { title: "createKeybindings", href: "/docs/hooks/create-keybindings" },
      { title: "createLockScroll", href: "/docs/hooks/create-lock-scroll" },
      { title: "createLongPress", href: "/docs/hooks/create-long-press" },
      { title: "createMousePosition", href: "/docs/hooks/create-mouse-position" },
      { title: "createScrollIntoView", href: "/docs/hooks/create-scroll-into-view" },
      { title: "createTiptapEditor", href: "/docs/hooks/create-tiptap-editor", addedAt: "2026-09-01" },
    ],
  },
  {
    title: "Sensors & Observers",
    items: [
      { title: "createIdle", href: "/docs/hooks/create-idle" },
      { title: "createIntersectionObserver", href: "/docs/hooks/create-intersection-observer" },
      { title: "createMediaQuery", href: "/docs/hooks/create-media-query" },
      { title: "createOrientation", href: "/docs/hooks/create-orientation" },
      { title: "createResizeObserver", href: "/docs/hooks/create-resize-observer" },
      { title: "createScrollPosition", href: "/docs/hooks/create-scroll-position" },
      { title: "createWindowSize", href: "/docs/hooks/create-window-size" },
    ],
  },
  {
    title: "Browser & Network API",
    items: [
      { title: "createAudio & Video", href: "/docs/hooks/create-audio" },
      { title: "createBattery", href: "/docs/hooks/create-battery" },
      { title: "createColorMode", href: "/docs/hooks/create-color-mode" },
      { title: "createDocumentTitle", href: "/docs/hooks/create-document-title" },
      { title: "createEventSource", href: "/docs/hooks/create-event-source" },
      { title: "createFavicon", href: "/docs/hooks/create-favicon" },
      { title: "createFetch", href: "/docs/hooks/create-fetch" },
      { title: "createFullscreen", href: "/docs/hooks/create-fullscreen" },
      { title: "createGeolocation", href: "/docs/hooks/create-geolocation" },
      { title: "createInfiniteScroll", href: "/docs/hooks/create-infinite-scroll" },
      { title: "createLocalStorage", href: "/docs/hooks/create-storage" },
      { title: "createNetworkStatus", href: "/docs/hooks/create-network-status" },
      { title: "createPermission", href: "/docs/hooks/create-permission" },
      { title: "createTimer", href: "/docs/hooks/create-timer" },
      { title: "createWebNotification", href: "/docs/hooks/create-web-notification" },
      { title: "createWebSocket", href: "/docs/hooks/create-websocket" },
    ],
  },
];

export const BLOCK_SECTIONS: NavSection[] = [
  {
    title: "Authentication",
    items: [
      { title: "Login 01", href: "/blocks/login-01", addedAt: "2026-08-30" },
      { title: "Register 01", href: "/blocks/register-01", addedAt: "2026-08-30" },
      { title: "OTP Verification 01", href: "/blocks/otp-verification-01", addedAt: "2026-08-30" },
      { title: "Forgot Password 01", href: "/blocks/forgot-password-01", addedAt: "2026-08-30" },
    ],
  },
  {
    title: "Hero Sections",
    items: [
      { title: "Hero 01", href: "/blocks/hero-01", addedAt: "2026-08-30" },
    ],
  },
];

export const BLOCKS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  ...BLOCK_SECTIONS,
];

/* --- Desktop & Tauri Suite Sections --- */
export const DESKTOP_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/docs/desktop", addedAt: "2026-08-31" },
      { title: "Tauri v2 Setup", href: "/docs/desktop/setup", addedAt: "2026-08-31" },
    ],
  },
  {
    title: "Window & Chrome",
    items: [
      { title: "Titlebar", href: "/docs/desktop/titlebar", addedAt: "2026-08-31" },
      { title: "TitlebarTabs", href: "/docs/desktop/titlebar-tabs", addedAt: "2026-08-31" },
      { title: "UpdaterDialog", href: "/docs/desktop/updater-dialog", addedAt: "2026-08-31" },
    ],
  },
  {
    title: "OS Primitives (Hooks)",
    items: [
      { title: "createTauriWindow", href: "/docs/desktop/create-tauri-window", addedAt: "2026-08-31" },
      { title: "createGlobalShortcut", href: "/docs/desktop/create-global-shortcut", addedAt: "2026-08-31" },
      { title: "createAppUpdater", href: "/docs/desktop/create-app-updater", addedAt: "2026-08-31" },
      { title: "createDocumentTabs", href: "/docs/desktop/create-document-tabs", addedAt: "2026-08-31" },
    ],
  },
];

export const DESKTOP_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  ...DESKTOP_SECTIONS,
];

export const COMPONENTS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  ...COMPONENT_SECTIONS,
];

export const HOOKS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  ...HOOK_SECTIONS,
];

export const DOCS_SIDEBAR_NAVIGATION: NavSection[] = COMPONENTS_SIDEBAR_NAVIGATION;


