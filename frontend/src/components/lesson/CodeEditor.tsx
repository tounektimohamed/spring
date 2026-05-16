import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ code, onChange, readOnly = false }: CodeEditorProps) {
  return (
    <div className="border border-border rounded-card overflow-hidden">
      <div className="bg-surfaceHigh px-4 py-2 border-b border-border flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-danger/60" />
        <div className="w-3 h-3 rounded-full bg-warning/60" />
        <div className="w-3 h-3 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-textMuted font-mono">Main.java</span>
      </div>
      <Editor
        height="300px"
        language="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || '')}
        options={{
          readOnly,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          lineNumbers: 'on',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          tabSize: 4,
        }}
        loading={<div className="h-[300px] bg-surface flex items-center justify-center text-textMuted">Loading editor...</div>}
      />
    </div>
  );
}
