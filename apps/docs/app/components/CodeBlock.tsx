"use client";

import React from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  const highlightCode = (raw: string) => {
    const lines = raw.split("\n");

    return lines.map((line, lineIdx) => {
      // Regex tokenizer for JS/TS/JSX
      const tokenRegex =
        /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[\w\d]+(?=[\s/>])|\/?>)|(\b(?:import|export|default|from|const|let|var|function|return|interface|type|extends|as|typeof|new|if|else|switch|case|break)\b)|(\b(?:true|false|null|undefined|void|string|boolean|number|any|ReactNode)\b)|(\b[a-zA-Z_$][\w$]*(?=\s*[:=]))|(\b[a-zA-Z_$][\w$]*(?=\s*\())|([{}()[\]=,;.:<>+\-*/!&|?])/g;

      const tokens: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = tokenRegex.exec(line)) !== null) {
        // Push text before match
        if (match.index > lastIndex) {
          tokens.push(line.slice(lastIndex, match.index));
        }

        const [
          full,
          comment,
          str,
          jsxTag,
          keyword,
          typeLiteral,
          propKey,
          funcName,
          punct,
        ] = match;

        if (comment) {
          // VS Code comment green
          tokens.push(
            <span
              key={match.index}
              className="text-[#008000] dark:text-[#6a9955] italic"
            >
              {comment}
            </span>
          );
        } else if (str) {
          // VS Code string orange/terracotta
          tokens.push(
            <span
              key={match.index}
              className="text-[#a31515] dark:text-[#ce9178]"
            >
              {str}
            </span>
          );
        } else if (jsxTag) {
          // VS Code JSX tag blue/teal
          tokens.push(
            <span
              key={match.index}
              className="text-[#0000ff] dark:text-[#4ec9b0] font-medium"
            >
              {jsxTag}
            </span>
          );
        } else if (keyword) {
          // VS Code keyword purple/magenta
          tokens.push(
            <span
              key={match.index}
              className="text-[#af00db] dark:text-[#c586c0] font-semibold"
            >
              {keyword}
            </span>
          );
        } else if (typeLiteral) {
          // VS Code type/literal teal/blue
          tokens.push(
            <span
              key={match.index}
              className="text-[#267f99] dark:text-[#4ec9b0]"
            >
              {typeLiteral}
            </span>
          );
        } else if (propKey) {
          // VS Code JSX prop / object key navy/sky blue
          tokens.push(
            <span
              key={match.index}
              className="text-[#001080] dark:text-[#9cdcfe]"
            >
              {propKey}
            </span>
          );
        } else if (funcName) {
          // VS Code function yellow/gold
          tokens.push(
            <span
              key={match.index}
              className="text-[#795e26] dark:text-[#dcdcaa]"
            >
              {funcName}
            </span>
          );
        } else if (punct) {
          // Punctuation charcoal
          tokens.push(
            <span
              key={match.index}
              className="text-[#383a42] dark:text-[#d4d4d4]"
            >
              {punct}
            </span>
          );
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        tokens.push(line.slice(lastIndex));
      }

      return (
        <div key={lineIdx} className="flex leading-relaxed">
          {showLineNumbers && (
            <span className="w-8 shrink-0 select-none text-right pr-4 text-gray-400 dark:text-gray-600 font-mono text-[11px]">
              {lineIdx + 1}
            </span>
          )}
          <span className="flex-1 whitespace-pre overflow-x-auto">
            {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
          </span>
        </div>
      );
    });
  };

  return (
    <pre
      className={`font-mono text-xs overflow-x-auto leading-relaxed select-text text-gray-800 dark:text-gray-200 ${className}`}
    >
      <code>{highlightCode(code.trim())}</code>
    </pre>
  );
}
