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
    <div
      style={{
        width: "700px",
        margin: "50px auto",
      }}
    >
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
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2>Import Report</h2>

          <p>
            Users Imported:
            {" "}
            {result.usersImported}
          </p>

          <p>
            Expenses Created:
            {" "}
            {result.expensesCreated}
          </p>

          <p>
            Processed:
            {" "}
            {result.report.processed}
          </p>

          <p>
            Imported:
            {" "}
            {result.report.imported}
          </p>

          <p>
            Warnings:
            {" "}
            {result.report.warnings}
          </p>

          <p>
            Errors:
            {" "}
            {result.report.errors}
          </p>

          <h3>Anomalies</h3>

          {result.report.anomalies.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                style={{
                  border:
                    "1px solid gray",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Row:</strong>{" "}
                  {item.row}
                </p>

                <p>
                  <strong>Type:</strong>{" "}
                  {item.type}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  {item.severity}
                </p>

                <p>
                  <strong>Message:</strong>{" "}
                  {item.message}
                </p>

                <p>
                  <strong>Action:</strong>{" "}
                  {item.action}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}