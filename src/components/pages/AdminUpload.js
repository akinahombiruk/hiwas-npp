import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AdminUpload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("News");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [fileName, setFileName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ================= 🔐 PROTECT PAGE =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/admin/login";
    }
  }, []);

  // ================= LOAD DATA =================
  const fetchData = async () => {
    try {
      const res = await fetch("https://hiwas-backend-production-56c5.up.railway.app/api/newsletters");
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= 🔐 LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin/login";
  };

  // ================= RESET =================
  const resetForm = () => {
    setTitle("");
    setCategory("News");
    setContent("");
    setFile(null);
    setCover(null);
    setFileName("");
    setCoverName("");
    setEditingId(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You are not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    if (cover) formData.append("cover", cover);
    if (file) formData.append("file", file);

    const url = editingId
      ? `https://hiwas-backend-production-56c5.up.railway.app/api/newsletters/${editingId}`
      : "https://hiwas-backend-production-56c5.up.railway.app/api/newsletters/upload";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(data.message);
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Request failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You are not logged in!");
      return;
    }

    try {
      const res = await fetch(
        `https://hiwas-backend-production-56c5.up.railway.app/api/newsletters/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }
      alert("Deleted successfully");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };
  
  // ================= EDIT =================
  const handleEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content || "");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      
      {/* 🔐 LOGOUT BUTTON */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>
          {editingId ? "✏️ Edit Newsletter" : "📤 Upload Newsletter"}
        </h2>

        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "#fff",
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            height: "40px",
          }}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        >
          <option value="">-- Select Category --</option>
          <option value="Tiny Architect Big Question">Tiny Architect Big Question</option>
          <option value="Signal and Sign">Signal and Sign</option>
          <option value="Pulsea">Pulsea</option>
          <option value="Stethoscope report">Stethoscope report</option>
        </select>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          style={{ height: "200px", marginBottom: "50px" }}
        />

        {/* COVER IMAGE INPUT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            📸 Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setCover(e.target.files[0]);
              setCoverName(e.target.files[0]?.name || "");
            }}
            style={{ 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "5px",
              cursor: "pointer"
            }}
          />
          {coverName && (
            <span style={{ fontSize: "12px", color: "#666" }}>
              Selected: {coverName}
            </span>
          )}
        </div>

        {/* PDF FILE INPUT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            📄 PDF File (Optional)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0]?.name || "");
            }}
            style={{ 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "5px",
              cursor: "pointer"
            }}
          />
          {fileName && (
            <span style={{ fontSize: "12px", color: "#666" }}>
              Selected: {fileName}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: "12px", 
            background: "#007bff", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {editingId ? "Update Newsletter" : "Upload Newsletter"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>📋 All Newsletters</h3>
      {list.map((item) => (
        <div
          key={item._id}
          style={{
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h4>{item.title}</h4>
          <p>{item.category}</p>

          {/* FIXED: Removed the wrapping <p> tag */}
          <div 
            style={{ fontSize: "13px", color: "#555" }}
            dangerouslySetInnerHTML={{
              __html: item.content?.slice(0, 200) + "...",
            }}
          />

          <button
            onClick={() => handleEdit(item)}
            style={{ 
              marginRight: "10px",
              padding: "5px 15px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            ✏️ Edit
          </button>

          <button 
            onClick={() => handleDelete(item._id)}
            style={{
              padding: "5px 15px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
};