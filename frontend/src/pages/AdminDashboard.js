import React, { useState, useEffect, useCallback } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

// --- Project Modal ---
const ProjectFormModal = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', liveUrl: '', githubUrl: ''
  });

  useEffect(() => {
    if (project) setFormData(project);
  }, [project]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{project ? 'Edit Project' : 'Add Project'}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            required={!project} 
          />
          <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="Live URL" />
          <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL" />
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={onCancel} className="submit-button" style={{backgroundColor:'#6c757d', marginLeft:'10px'}}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const navigate = useNavigate();
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
  });

  // --- Fetch Projects (useCallback to fix warning) ---
  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  }, [api]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // --- Project CRUD ---
  const saveProject = async (pData) => {
    try {
      const formData = new FormData();
      formData.append("title", pData.title);
      formData.append("description", pData.description);
      formData.append("liveUrl", pData.liveUrl);
      formData.append("githubUrl", pData.githubUrl);
      if (pData.image instanceof File) formData.append("image", pData.image);

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/projects", formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      fetchProjects();
      closeProjectModal();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Delete project?')) {
      try { await api.delete(`/projects/${id}`); fetchProjects(); } 
      catch (err) { console.error(err); }
    }
  };

  const openProjectModal = (project=null) => { setEditingProject(project); setIsProjectModalOpen(true); }
  const closeProjectModal = () => { setEditingProject(null); setIsProjectModalOpen(false); }

  const logout = () => { localStorage.removeItem('adminToken'); navigate('/login'); }

  return (
    <div style={{ padding:'50px 10%' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="submit-button" style={{ backgroundColor:'#dc3545' }}>Logout</button>
      </div>

      {/* Projects Section */}
      <div>
        <h3>Projects</h3>
        <button onClick={()=>openProjectModal()} className="submit-button mb-2">Add Project</button>
        {isProjectModalOpen && <ProjectFormModal project={editingProject} onSave={saveProject} onCancel={closeProjectModal} />}
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr><th>Title</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id}>
                <td data-label="Title">{p.title}</td>
                <td data-label="Actions">
                  <button onClick={()=>openProjectModal(p)}>Edit</button>
                  <button onClick={()=>deleteProject(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
