interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'java' }: CodeBlockProps) {
  return (
    <div className="bg-surfaceHigh border border-border rounded-card overflow-hidden my-4">
      <div className="bg-surface px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs text-textMuted font-mono">{language}</span>
      </div>
      <pre className="p-4 text-sm font-mono text-java overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}
