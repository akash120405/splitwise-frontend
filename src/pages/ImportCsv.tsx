import { useState } from "react";
import api from "../api/api";

export default function ImportCsv() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Select CSV file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(
        "/import",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(res.data);

      alert("Upload Successful");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h1>Import CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload CSV
      </button>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}