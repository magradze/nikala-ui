if (typeof window === "undefined") {
  const dummyEl = () => ({
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    appendChild: () => {},
    removeChild: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    style: {},
  });

  const doc = {
    createElement: () => dummyEl(),
    createTextNode: () => ({}),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    body: dummyEl(),
    documentElement: dummyEl(),
  };

  const win: any = {
    document: doc,
    history: { state: {}, length: 1, replaceState: () => {}, pushState: () => {} },
    location: { href: "http://localhost/", pathname: "/", search: "", hash: "" },
    navigator: { userAgent: "node" },
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    CustomEvent: class CustomEvent { constructor(type: string) {} },
    Event: class Event { constructor(type: string) {} },
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
  };

  (globalThis as any).window = win;
  (globalThis as any).document = doc;
  (globalThis as any).history = win.history;
  (globalThis as any).location = win.location;
  (globalThis as any).CustomEvent = win.CustomEvent;
  (globalThis as any).Event = win.Event;

  try {
    Object.defineProperty(globalThis, "navigator", {
      value: win.navigator,
      writable: true,
      configurable: true,
    });
  } catch {}
}
