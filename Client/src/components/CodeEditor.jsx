import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";

const CodeEditor = ({
  projectId,
  fileId,
  value,
  language = "plaintext",
  onChange,
}) => {
  const editorRef = useRef(null);
  const ydocRef = useRef(null);
  const bindingRef = useRef(null);

const handleEditorMount = (editor) => {
  editorRef.current = editor;

  const ydoc = new Y.Doc();
  ydocRef.current = ydoc;

  const roomName = `project-${projectId}-file-${fileId}`;
  console.log("Yjs room:", roomName);

  const provider = new WebsocketProvider(
    "ws://localhost:1234",
    roomName,
    ydoc
  );

  const ytext = ydoc.getText("monaco");

  provider.on("synced", (isSynced) => {
    console.log("Yjs synced:", isSynced);

    if (isSynced && ytext.length === 0 && value) {
      ytext.insert(0, value);
    }
  });

  ytext.observe(() => {
    console.log("Yjs content:", ytext.toString());
  });

  const binding = new MonacoBinding(
    ytext,
    editor.getModel(),
    new Set([editor])
  );

  bindingRef.current = binding;

  console.log("Yjs + Monaco connected");
  console.log("Monaco mounted");
};

  useEffect(() => {
    return () => {
      bindingRef.current?.destroy();
      ydocRef.current?.destroy();
    };
  }, []);

  return (
<Editor
  height="500px"
  theme="vs-dark"
  language={language}
  defaultValue={value}
  onMount={handleEditorMount}
  options={{
    minimap: { enabled: false },
    fontSize: 14,
  }}
/>
  );
};

export default CodeEditor;
