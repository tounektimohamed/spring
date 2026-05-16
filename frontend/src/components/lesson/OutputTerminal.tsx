interface OutputTerminalProps {
  output: string;
}

export function OutputTerminal({ output }: OutputTerminalProps) {
  return (
    <div className="bg-[#0D1117] border border-border rounded-card overflow-hidden">
      <div className="bg-surfaceHigh px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs text-textMuted font-mono">Output</span>
        <span className="text-xs text-textMuted">Terminal</span>
      </div>
      <pre className="p-4 text-green-400 font-mono text-sm whitespace-pre-wrap min-h-[80px] max-h-[300px] overflow-y-auto">
        {output || '> Waiting for output...'}
      </pre>
    </div>
  );
}
