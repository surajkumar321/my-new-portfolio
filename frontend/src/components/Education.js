import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaEdit, FaTrash } from "react-icons/fa";

const Education = ({ isAdmin }) => {
  const [educationData, setEducationData] = useState(() => {
    const saved = localStorage.getItem("educationData");
    return saved
      ? JSON.parse(saved)
      : [
          {
            degree: "Bachelor of Technology (B.Tech)",
            institution: "Global Institute of Technology & Management, Farrukhnagar, Gurgaon",
            duration: "Aug 2020 - May 2024",
            description: "Focused on full-stack web development, Data Structures & Algorithms, and AI-based projects.",
          },
          {
            degree: "Senior Secondary (12th)",
            institution: "ABC School",
            duration: "Jun 2018 - May 2020",
            description: "Science stream with Physics, Chemistry, and Mathematics.",
          },
          {
            degree: "Secondary (10th)",
            institution: "XYZ School",
            duration: "Apr 2016 - Mar 2018",
            description: "Completed with distinction, strong foundation in science and mathematics.",
          },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newEdu, setNewEdu] = useState({ degree: "", institution: "", duration: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setNewEdu({ ...newEdu, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEdu.degree && newEdu.institution && newEdu.duration && newEdu.description) {
      const updatedData = [...educationData];
      if (editIndex !== null) updatedData[editIndex] = newEdu; // edit
      else updatedData.push(newEdu); // add
      setEducationData(updatedData);
      localStorage.setItem("educationData", JSON.stringify(updatedData));
      setNewEdu({ degree: "", institution: "", duration: "", description: "" });
      setEditIndex(null);
      setShowModal(false);
    } else alert("Please fill all fields");
  };

  const handleEdit = (index) => {
    setNewEdu(educationData[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      const updatedData = educationData.filter((_, i) => i !== index);
      setEducationData(updatedData);
      localStorage.setItem("educationData", JSON.stringify(updatedData));
    }
  };

  useEffect(() => {
    localStorage.setItem("educationData", JSON.stringify(educationData));
  }, [educationData]);

  return (
    <section id="education" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Education</h2>

        {/* Add Education button only for admin */}
        {isAdmin && (
          <div className="text-center mb-10">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add Education
            </button>
          </div>
        )}

        {/* Modal only for admin */}
        {showModal && isAdmin && (
          <div className="modal-overlay">
            <div className="modal-card">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                  setNewEdu({ degree: "", institution: "", duration: "", description: "" });
                }}
                className="modal-close"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">{editIndex !== null ? "Edit Education" : "Add Education"}</h3>
              <form onSubmit={handleSubmit} className="timeline-form space-y-4">
                <input type="text" name="degree" value={newEdu.degree} onChange={handleChange} placeholder="Degree" />
                <input type="text" name="institution" value={newEdu.institution} onChange={handleChange} placeholder="Institution" />
                <input type="text" name="duration" value={newEdu.duration} onChange={handleChange} placeholder="Duration" />
                <textarea name="description" value={newEdu.description} onChange={handleChange} placeholder="Description" />
                <button type="submit">{editIndex !== null ? "Update" : "Save"}</button>
              </form>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="timeline-item">
              <div className="circle-icon"><FaGraduationCap size={20} /></div>
              <div className="card">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="duration">{edu.duration}</p>
                <p className="description">{edu.description}</p>

                {/* Actions only for admin */}
                {isAdmin && (
                  <div className="actions">
                    <button className="edit" onClick={() => handleEdit(index)}><FaEdit /></button>
                    <button className="delete" onClick={() => handleDelete(index)}><FaTrash /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
