import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { CodeEditor } from '../components/lesson/CodeEditor';
import { OutputTerminal } from '../components/lesson/OutputTerminal';
import { Button } from '../components/ui/Button';

const templates = [
  {
    name: 'Hello World',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, SpringPath!");
    }
}`,
  },
  {
    name: 'REST Controller',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> endpoints = Arrays.asList(
            "@RestController",
            "@RequestMapping(\\"/api/users\\")",
            "@GetMapping",
            "@PostMapping",
            "@PutMapping",
            "@DeleteMapping"
        );
        System.out.println("Spring REST Annotations:");
        endpoints.forEach(e -> System.out.println("  " + e));
    }
}`,
  },
  {
    name: 'JPA Entity',
    code: `public class Main {
    public static void main(String[] args) {
        String[] fields = {"@Entity", "@Table", "@Id", "@GeneratedValue", "@Column", "@ManyToOne"};
        System.out.println("JPA Entity Annotations:");
        for (String f : fields) {
            System.out.println("  " + f);
        }
    }
}`,
  },
  {
    name: 'Service Layer',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Spring Service Layer Pattern:");
        System.out.println("  Controller -> Service -> Repository");
        System.out.println();
        System.out.println("Key Annotations:");
        System.out.println("  @Service, @Transactional, @Autowired");
    }
}`,
  },
  {
    name: 'JWT Filter',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Spring Security JWT Flow:");
        System.out.println("  1. User sends login request");
        System.out.println("  2. Server validates credentials");
        System.out.println("  3. Server generates JWT token");
        System.out.println("  4. Client stores token");
        System.out.println("  5. Client sends token in Authorization header");
        System.out.println("  6. JwtAuthFilter validates token on each request");
    }
}`,
  },
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(templates[0].code);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleRunCode = async () => {
    setRunning(true);
    setOutput('');
    try {
      const resp = await fetch('/api/code-run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ code }),
      });
      const data = await resp.json();
      if (!data.success) {
        setOutput(data.message || 'Rate limited. Please wait.');
        return;
      }
      const result = data.data;
      setOutput(result.success ? result.output : result.error || 'Execution failed');
    } catch {
      setOutput('Failed to execute code');
    } finally {
      setRunning(false);
    }
  };

  return (
    <AppShell>
      <TopBar title="محرر الأكواد" subtitle="بيئة برمجة تفاعلية" />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left: Template picker */}
        <div className="w-56 border-l border-border bg-surface p-4 overflow-y-auto flex-shrink-0">
          <h3 className="text-sm font-semibold text-textMuted mb-3">القوالب</h3>
          <div className="space-y-1">
            {templates.map((t) => (
              <button
                key={t.name}
                onClick={() => setCode(t.code)}
                className={`w-full text-right px-3 py-2 rounded-card text-sm transition-all ${
                  code === t.code
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-textMuted hover:text-textPrimary hover:bg-surfaceHigh'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-4 border-b border-border bg-surface/30 flex items-center justify-between">
            <span className="text-sm text-textMuted font-mono">Main.java</span>
            <Button size="sm" onClick={handleRunCode} disabled={running}>
              {running ? '⏳ جاري...' : '▶ تنفيذ'}
            </Button>
          </div>
          <div className="flex-1">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-96 border-r border-border flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-border bg-surface/30 flex items-center justify-between">
            <span className="text-sm font-semibold">المخرجات</span>
            <button
              onClick={() => setOutput('')}
              className="text-xs text-textMuted hover:text-textPrimary"
            >
              مسح
            </button>
          </div>
          <div className="flex-1 p-4 bg-[#0D1117] overflow-y-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
              {output || '> اكتب كوداً واضغط ▶ تنفيذ'}
            </pre>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
