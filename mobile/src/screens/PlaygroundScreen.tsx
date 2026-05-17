import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { codeRunApi } from '../api/codeRun';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', success: '#10B981', text: '#F1F5F9', muted: '#64748B', code: '#0D1117' };

const templates = [
  { name: 'Hello World', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, SpringPath!");\n    }\n}' },
  { name: 'REST Controller', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Spring REST Annotations:");\n        System.out.println("  @RestController");\n        System.out.println("  @GetMapping");\n        System.out.println("  @PostMapping");\n    }\n}' },
  { name: 'JPA Entity', code: 'public class Main {\n    public static void main(String[] args) {\n        String[] fields = {"@Entity", "@Table", "@Id", "@GeneratedValue"};\n        for (String f : fields) System.out.println("  " + f);\n    }\n}' },
  { name: 'Service Layer', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Spring Service Pattern:");\n        System.out.println("  Controller -> Service -> Repository");\n    }\n}' },
];

export default function PlaygroundScreen() {
  const [code, setCode] = useState(templates[0].code);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true); setOutput('');
    try {
      const { data } = await codeRunApi.run(code);
      if (data.success) setOutput(data.data.output || data.data.error || 'No output');
      else setOutput(data.message || 'Error');
    } catch { setOutput('Failed to execute code'); }
    finally { setRunning(false); }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.templateBar} showsHorizontalScrollIndicator={false}>
        {templates.map(t => (
          <TouchableOpacity key={t.name} onPress={() => setCode(t.code)} style={[styles.templateBtn, code === t.code && styles.templateBtnActive]}>
            <Text style={[styles.templateText, code === t.code && styles.templateTextActive]}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.editorSection}>
        <View style={styles.editorHeader}>
          <Text style={styles.editorTitle}>Main.java</Text>
          <TouchableOpacity onPress={handleRun} disabled={running} style={[styles.runBtn, running && { opacity: 0.5 }]}>
            {running ? <ActivityIndicator size="small" color={COLORS.bg} /> : <Text style={styles.runBtnText}>▶ Run</Text>}
          </TouchableOpacity>
        </View>
        <TextInput style={styles.editor} value={code} onChangeText={setCode} multiline textAlignVertical="top" autoCapitalize="none" autoCorrect={false} spellCheck={false} fontFamily="monospace" />
      </View>

      <View style={styles.terminalSection}>
        <Text style={styles.terminalHeader}>Output</Text>
        <ScrollView style={styles.terminalBody}>
          <Text style={styles.terminalText}>{output || '> Write code and press ▶ Run'}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  templateBar: { maxHeight: 44, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderColor: COLORS.border },
  templateBtn: { paddingHorizontal: 16, paddingVertical: 12, justifyContent: 'center' },
  templateBtnActive: { borderBottomWidth: 2, borderColor: COLORS.primary },
  templateText: { color: COLORS.muted, fontSize: 13, fontWeight: '500' },
  templateTextActive: { color: COLORS.primary },
  editorSection: { flex: 1 },
  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderColor: COLORS.border },
  editorTitle: { color: COLORS.muted, fontSize: 12, fontFamily: 'monospace' },
  runBtn: { backgroundColor: COLORS.primary, borderRadius: 6, paddingHorizontal: 14, paddingVertical: 6 },
  runBtnText: { color: COLORS.bg, fontWeight: '700', fontSize: 13 },
  editor: { flex: 1, backgroundColor: COLORS.code, color: '#ED8936', fontFamily: 'monospace', fontSize: 13, padding: 16, lineHeight: 20 },
  terminalSection: { height: 200, backgroundColor: COLORS.code, borderTopWidth: 1, borderColor: COLORS.border },
  terminalHeader: { color: COLORS.muted, fontSize: 12, fontFamily: 'monospace', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  terminalBody: { flex: 1, padding: 16 },
  terminalText: { color: COLORS.success, fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
});
