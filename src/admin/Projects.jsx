import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { uploadFile } from "../api/client.js";
import MarkdownEditor from "../components/MarkdownEditor.jsx";

const API = import.meta.env.VITE_API_BASE;

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyForm = {
    title: "",
    slug: "",
    excerpt: "",
    cover_url: "",
    cover_public_id: "",
    content: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Load projects
  const loadProjects = async (pageNum = 1, query = "") => {
    try {
      setLoading(true);
      setError("");
      
      const url = new URL(`${API}/api/projects-paged`);
      url.searchParams.set("page", String(pageNum));
      url.searchParams.set("pageSize", "10");
      if (query) url.searchParams.set("query", query);
      
      console.log("Loading projects from:", url.toString());
      
      const response = await fetch(url.toString(), {
        credentials: "include"
      });
      
      console.log("Load projects response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Load projects error response:", errorText);
        throw new Error(errorText || "Failed to load projects");
      }
      
      const data = await response.json();
      console.log("Projects loaded:", data.items?.length || 0, "items");
      setItems(data.items);
      setPage(data.page);
    } catch (err) {
      console.error("Load projects error:", err);
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(1, "");
  }, []);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setBusy(true);
    setError("");
    setDebugInfo(`Uploading file: ${file.name}, size: ${file.size} bytes`);
    
    try {
      console.log("Starting file upload...");
      const result = await uploadFile(file);
      console.log("Upload result:", result);
      setForm(f => ({ 
        ...f, 
        cover_url: result.url, 
        cover_public_id: result.public_id 
      }));
      setDebugInfo(`File uploaded successfully: ${result.url}`);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed");
      setDebugInfo(`Upload error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  // Create new project
  const createProject = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setDebugInfo("");
    setBusy(true);

    try {
      // Log form data
      console.log("Form data to submit:", form);
      
      // Validate required fields
      if (!form.title.trim() || !form.slug.trim()) {
        throw new Error("Title and slug are required");
      }

      // Prepare the data
      const dataToSend = {
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
        excerpt: form.excerpt.trim() || null,
        cover_url: form.cover_url || null,
        cover_public_id: form.cover_public_id || null,
        content: form.content || ""
      };
      
      console.log("Sending data to server:", dataToSend);
      setDebugInfo(`Sending request to: ${API}/api/projects`);
      
      const response = await fetch(`${API}/api/projects`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      console.log("Server response status:", response.status);
      console.log("Server response headers:", response.headers);
      
      const responseText = await response.text();
      console.log("Server response text:", responseText);
      
      if (!response.ok) {
        // Try to parse as JSON if possible
        let errorMessage = responseText;
        try {
          const errorJson = JSON.parse(responseText);
          errorMessage = errorJson.message || errorJson.error || responseText;
        } catch {
          // Keep as text
        }
        
        // Special handling for common errors
        if (response.status === 401) {
          errorMessage = "You are not logged in. Please log in again.";
        } else if (response.status === 403) {
          errorMessage = "You don't have permission to create projects.";
        } else if (response.status === 400) {
          errorMessage = `Validation error: ${errorMessage}`;
        }
        
        throw new Error(errorMessage);
      }

      setSuccess("Project created successfully!");
      setDebugInfo("Project created successfully on server");
      setForm(emptyForm);
      loadProjects();
      
      setTimeout(() => {
        setSuccess("");
        setDebugInfo("");
      }, 5000);
    } catch (err) {
      console.error("Create project error:", err);
      console.error("Error stack:", err.stack);
      setError(err.message || "Failed to create project");
      setDebugInfo(`Error details: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  // Start editing a project
  const startEdit = (project) => {
    setEditing(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      excerpt: project.excerpt || "",
      cover_url: project.cover_url || "",
      cover_public_id: project.cover_public_id || "",
      content: project.content || ""
    });
    setError("");
    setSuccess("");
    setDebugInfo(`Editing project ID: ${project.id}`);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setDebugInfo("");
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const response = await fetch(`${API}/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete project");
      }

      loadProjects();
    } catch (err) {
      console.error("Delete project error:", err);
      setError(err.message || "Failed to delete project");
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    try {
      setDebugInfo("Testing API connection...");
      const response = await fetch(`${API}/api/health`, { credentials: "include" });
      const data = await response.json();
      console.log("API health check:", data);
      setDebugInfo(`API connection OK. Database time: ${data.now}`);
    } catch (err) {
      console.error("API test failed:", err);
      setDebugInfo(`API test failed: ${err.message}`);
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">Projects</h2>
      <p className="card__sub">
        Manage portfolio projects. After creating, they'll be visible at <code>/portfolio/slug</code>
      </p>

      {/* Debug Section */}
      <div style={{ 
        background: "rgba(59, 130, 246, 0.1)", 
        border: "1px solid rgba(59, 130, 246, 0.3)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 20
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: 8 
        }}>
          <strong style={{ fontSize: 14, color: "#3b82f6" }}>Debug Info</strong>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testApiConnection}
          >
            Test API
          </Button>
        </div>
        <div style={{ 
          fontSize: 12, 
          color: "#64748b",
          fontFamily: "monospace",
          wordBreak: "break-all" 
        }}>
          {debugInfo || "No debug info yet. Fill the form and click Create to see details."}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ 
        display: "flex", 
        gap: 8, 
        alignItems: "center", 
        marginBottom: 20 
      }}>
        <Input
          placeholder="Search projects by title or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <Button 
          variant="outline" 
          onClick={() => loadProjects(1, searchQuery)}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("");
            loadProjects(1, "");
          }}
        >
          Clear
        </Button>
      </div>

      {/* Form */}
      <form 
        onSubmit={createProject} 
        className="form" 
        style={{ maxWidth: 720, marginBottom: 30 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input
            label="Title *"
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            required
            disabled={busy}
            placeholder="My Awesome Project"
          />
          <Input
            label="Slug *"
            value={form.slug}
            onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
            required
            disabled={busy}
            placeholder="my-awesome-project"
            helpText="Lowercase, use hyphens for spaces"
          />
        </div>

        <label className="field">
          <span className="field__label">Excerpt (optional)</span>
          <textarea
            className="field__input"
            rows="3"
            value={form.excerpt}
            onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
            disabled={busy}
            placeholder="Brief description shown in portfolio list"
          />
        </label>

        <label className="field">
          <span className="field__label">Cover Image (optional)</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            disabled={busy}
          />
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
            Max 5MB. Supported: JPG, PNG, WebP, GIF
          </div>
          {form.cover_url && (
            <div style={{ marginTop: 8 }}>
              <img 
                src={form.cover_url} 
                alt="Preview" 
                style={{ 
                  maxWidth: 240, 
                  maxHeight: 160,
                  borderRadius: 8, 
                  border: "1px solid rgba(255,255,255,.1)" 
                }} 
              />
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                Image uploaded: {form.cover_url.substring(0, 50)}...
              </div>
            </div>
          )}
        </label>

        <label className="field">
          <span className="field__label">Content (Markdown)</span>
          <MarkdownEditor
            value={form.content}
            onChange={(value) => setForm(f => ({ ...f, content: value }))}
            disabled={busy}
            height="200px"
          />
        </label>

        {error && (
          <div className="alert" style={{ 
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)"
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="alert" style={{ 
            background: "rgba(22, 163, 74, 0.1)",
            border: "1px solid rgba(22, 163, 74, 0.3)" 
          }}>
            <strong>Success:</strong> {success}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Button 
            type="submit" 
            loading={busy}
            disabled={busy}
          >
            Create Project
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              console.log("Current form state:", form);
              setDebugInfo(`Form state logged to console. Title: "${form.title}", Slug: "${form.slug}"`);
            }}
          >
            Log Form State
          </Button>
        </div>
      </form>

      {/* Projects List */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
        Existing Projects ({items.length})
      </h3>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            border: "3px solid rgba(148,163,184,0.2)", 
            borderTopColor: "#3b82f6",
            borderRadius: "50%", 
            margin: "0 auto 12px",
            animation: "spin 1s linear infinite"
          }} />
          Loading projects...
        </div>
      ) : items.length === 0 ? (
        <div className="card" style={{ 
          background: "rgba(255,255,255,.02)", 
          textAlign: "center", 
          padding: 40 
        }}>
          No projects found. Create your first project above.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((project) => (
            <div 
              key={project.id} 
              className="card" 
              style={{ background: "rgba(255,255,255,.03)" }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {project.cover_url && (
                  <img 
                    src={project.cover_url} 
                    alt={project.title} 
                    style={{ 
                      width: 100, 
                      height: 70, 
                      objectFit: "cover", 
                      borderRadius: 8 
                    }} 
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{project.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                    Slug: {project.slug}
                  </div>
                  {project.excerpt && (
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                      {project.excerpt}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/portfolio/${project.slug}`, "_blank")}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}