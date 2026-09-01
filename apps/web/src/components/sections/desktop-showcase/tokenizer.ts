export interface Token {
  text: string;
  color: string;
}

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|export|from|function|const|let|var|return|default|type|interface|as|true|false)\b)|(<\/?[\w\d.-]+|\/?>)|(\b(?:createSignal|setCount|count|createDocumentTabs|createTauriWindow|createAppUpdater|useTheme|setTheme|setAccent)\b)|(\b\d+\b)|([{}()[\],;=:+*\/><.-])/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.substring(lastIndex, match.index), color: "text-foreground" });
    }
    const [full, str, kw, tag, fn, num, sym] = match;
    if (str) {
      tokens.push({ text: str, color: "text-emerald-600 dark:text-emerald-400 font-normal" });
    } else if (kw) {
      tokens.push({ text: kw, color: "text-purple-600 dark:text-purple-400 font-semibold" });
    } else if (tag) {
      tokens.push({ text: tag, color: "text-amber-600 dark:text-amber-400 font-semibold" });
    } else if (fn) {
      tokens.push({ text: fn, color: "text-sky-600 dark:text-sky-400 font-medium" });
    } else if (num) {
      tokens.push({ text: num, color: "text-orange-600 dark:text-orange-400 font-bold" });
    } else if (sym) {
      tokens.push({ text: sym, color: "text-muted-foreground" });
    } else {
      tokens.push({ text: full, color: "text-foreground" });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.substring(lastIndex), color: "text-foreground" });
  }

  return tokens.length > 0 ? tokens : [{ text: " ", color: "text-transparent" }];
}
