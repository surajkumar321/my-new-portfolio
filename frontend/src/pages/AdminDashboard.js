import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaEdit, FaTrash } from 'react-icons/fa';

// Project Modal
const ProjectFormModal = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', liveUrl: '', githubUrl: '',
  });

  useEffect(() => { if (project) setFormData(project); }, [project]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

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
          <button type="button" onClick={onCancel} className="submit-button" style={{backgroundColor: '#6c757d', marginLeft: '10px'}}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

// Education Modal
const EducationFormModal = ({ education, onSave, onCancel }) => {
  const [formData, setFormData] = useState({degree:'', institution:'', duration:'', description:''});
  useEffect(() => { if(education) setFormData(education); }, [education]);
  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{education ? 'Edit Education' : 'Add Education'}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" required />
          <input name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" required />
          <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={onCancel} className="submit-button" style={{backgroundColor: '#6c757d', marginLeft: '10px'}}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);

  const navigate = useNavigate();
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
  });

  useEffect(() => {
    fetchProjects();
    const savedEdu = localStorage.getItem('educationData');
    if(savedEdu) setEducation(JSON.parse(savedEdu));
  }, []);

  // --- Projects ---
  const fetchProjects = async () => {
    try{
      const { data } = await api.get('/projects');
      setProjects(data);
    }catch(err){
      console.error(err);
    }
  };

  const saveProject = async (pData) => {
  try {
    const formData = new FormData();
    formData.append("title", pData.title);
    formData.append("description", pData.description);
    formData.append("liveUrl", pData.liveUrl);
    formData.append("githubUrl", pData.githubUrl);
    if (pData.image instanceof File) {
      formData.append("image", pData.image); // file bhej rahe hai
    }

    if (editingProject) {
      await api.put(`/projects/${editingProject._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    fetchProjects();
    closeProjectModal();
  } catch (err) {
    console.error(err);
  }
};


  const deleteProject = async (id) => {
    if(window.confirm('Delete project?')){
      try{ await api.delete(`/projects/${id}`); fetchProjects(); }
      catch(err){ console.error(err); }
    }
  };

  const openProjectModal = (project=null)=>{ setEditingProject(project); setIsProjectModalOpen(true); }
  const closeProjectModal = ()=>{ setEditingProject(null); setIsProjectModalOpen(false); }

  // --- Education ---
  const saveEducation = (eduData)=>{
    let updated = [...education];
    if(editingEducation !== null){
      updated[editingEducation] = eduData;
    }else{
      updated.push(eduData);
    }
    setEducation(updated);
    localStorage.setItem('educationData', JSON.stringify(updated));
    closeEducationModal();
  };

  const deleteEducation = (index)=>{
    if(window.confirm('Delete education?')){
      const updated = education.filter((_,i)=>i!==index);
      setEducation(updated);
      localStorage.setItem('educationData', JSON.stringify(updated));
    }
  };

  const openEducationModal = (edu=null, index=null)=>{
    setEditingEducation(index);
    if(index !== null) setEditingEducation(index);
    setIsEducationModalOpen(true);
  };

  const closeEducationModal = ()=>{
    setEditingEducation(null);
    setIsEducationModalOpen(false);
  };

  const logout = ()=>{
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div style={{padding:'50px 10%'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="submit-button" style={{backgroundColor:'#dc3545'}}>Logout</button>
      </div>

      {/* Projects Section */}
      <div style={{marginBottom:'40px'}}>
        <h3>Projects</h3>
        <button onClick={()=>openProjectModal()} className="submit-button mb-2">Add Project</button>
        {isProjectModalOpen && <ProjectFormModal project={editingProject} onSave={saveProject} onCancel={closeProjectModal} />}
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr><th>Title</th><th>Actions</th></tr></thead>
          <tbody>
            {projects.map(p=>(
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>
                  <button onClick={()=>openProjectModal(p)}>Edit</button>
                  <button onClick={()=>deleteProject(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Education Section */}
      <div>
        <h3>Education</h3>
        <button onClick={()=>openEducationModal()} className="submit-button mb-2">Add Education</button>
        {isEducationModalOpen && <EducationFormModal education={editingEducation !== null ? education[editingEducation] : null} onSave={saveEducation} onCancel={closeEducationModal} />}
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr><th>Degree</th><th>Institution</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {education.map((e,i)=>(
              <tr key={i}>
                <td>{e.degree}</td>
                <td>{e.institution}</td>
                <td>{e.duration}</td>
                <td>
                  <button onClick={()=>openEducationModal(e,i)}>Edit</button>
                  <button onClick={()=>deleteEducation(i)}>Delete</button>
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
