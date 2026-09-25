import { useEffect, useState } from "react";
import {
  getProjectFiles,
  createProjectFile,
  updateProjectFile,
} from "../services/fileApi";
import CodeEditor from "./CodeEditor";
import axios from "axios";

const getLanguageFromFileName = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const languages = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    java: "java",
    py: "python",
    cpp: "cpp",
    c: "c",
    html: "html",
    css: "css",
    json: "json",
  };

  return languages[extension] || "plaintext";
};

const FileExplorer = ({ projectId, token }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState("");
  const [output, setOutput] = useState("TEST OUTPUT");
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const projectFiles = await getProjectFiles(projectId, token);
        setFiles(projectFiles);
      } catch (error) {
        console.error("Failed to load project files:", error);
      }
    };

    loadFiles();
  }, [projectId, token]);

  const handleCreateFile = async () => {
    if (!fileName.trim()) {
      return;
    }

    try {
      const newFile = await createProjectFile(
        projectId,
        {
          name: fileName,
          path: fileName,
          language: getLanguageFromFileName(fileName),
          content: "",
        },
        token,
      );

      setFiles((currentFiles) => [...currentFiles, newFile]);

      setFileName("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const updatedFile = await updateProjectFile(
        projectId,
        selectedFile.id,
        {
          name: selectedFile.name,
          path: selectedFile.path,
          language: selectedFile.language,
          content: selectedFile.content,
        },
        token,
      );

      setSelectedFile(updatedFile);

      setFiles((currentFiles) =>
        currentFiles.map((file) =>
          file.id === updatedFile.id ? updatedFile : file,
        ),
      );

      alert("File saved successfully!");
    } catch (error) {
      console.error("Failed to save file:", error);
      alert("Failed to save file");
    }
  };

  const handleRunCode = async () => {
    if (!selectedFile) {
      return;
    }

    try {
            const response = await axios.post(
        "http://localhost:5000/api/code/run",
        {
          code: selectedFile.content,
          language: selectedFile.language || "java",
          fileName: selectedFile.name,
          stdin: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("FULL RESPONSE:", response.data);
      setOutput(
        response.data.error ||
          `${response.data.output}\nExecution time: ${response.data.executionTime} ms`,
      );
    } catch (error) {
      console.error("Failed to run code:", error);
    }
  };

  return (
    <div>
      <h2>Files — FILE EXPLORER UPDATED</h2>

      <button onClick={() => setShowForm(true)}>+ New File</button>

      {showForm && (
        <div>
          <input
            type="text"
            placeholder="File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />

          <button onClick={handleCreateFile}>Create</button>

          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div>
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => setSelectedFile(file)}
            style={{
              cursor: "pointer",
              margin: "8px 0",
            }}
          >
            📄 {file.name}
          </div>
        ))}
      </div>

      {selectedFile && (
        <div>
          <h3>{selectedFile.name}</h3>


          <div>
  <h3>Input</h3>

<textarea
  value={input}
  onInput={(e) => {
        setInput(e.currentTarget.value);
  }}
  placeholder="Enter program input here..."
  rows={5}
/>
</div>

          <CodeEditor
            projectId={projectId}
            fileId={selectedFile.id}
            value={selectedFile.content}
            language={selectedFile.language || "plaintext"}
            onChange={(value) => {
              const newContent = value || "";

              setSelectedFile({
                ...selectedFile,
                content: newContent,
              });
            }}
          />
          <button onClick={handleSaveFile}>💾 Save File</button>
          <button onClick={handleRunCode}>▶ Run Code</button>{" "}
          <div>
            <h3>Output</h3>

            <pre>{output || "Run your code to see the output here."}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
