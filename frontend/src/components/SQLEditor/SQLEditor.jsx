import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import './SQLEditor.scss';

const DEFAULT_QUERY = 'SELECT * FROM users;';

const MONACO_OPTIONS = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontLigatures: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  lineNumbers: 'on',
  renderLineHighlight: 'line',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  smoothScrolling: true,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
  tabSize: 2,
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
};

const SQLEditor = ({ value, onChange, onExecute, disabled }) => {
  const editorRef = useRef(null);

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;

    // Ctrl+Enter to run query
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (!disabled) onExecute?.();
    });

    // SQL keywords completion
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: () => ({
        suggestions: [
          'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'GROUP BY',
          'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'COUNT', 'SUM',
          'AVG', 'MAX', 'MIN', 'AS', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'IS NULL',
          'IS NOT NULL', 'BETWEEN', 'LIKE', 'IN', 'EXISTS', 'WITH', 'UNION',
        ].map((kw) => ({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
        })),
      }),
    });
  };

  return (
    <div className="sql-editor">
      <div className="sql-editor__toolbar">
        <div className="sql-editor__title">
          <span className="sql-editor__title-dot" />
          query.sql
        </div>
        <span className="sql-editor__shortcut">Ctrl + Enter to run</span>
      </div>

      <div className="sql-editor__monaco">
        <Editor
          height="100%"
          language="sql"
          theme="vs-dark"
          value={value || DEFAULT_QUERY}
          onChange={onChange}
          onMount={handleMount}
          options={MONACO_OPTIONS}
          loading={
            <div className="sql-editor__loading">Loading editor…</div>
          }
        />
      </div>
    </div>
  );
};

export default SQLEditor;
