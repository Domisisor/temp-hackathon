import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const techStackOptions = [
  "React",
  "Node.js",
  "Angular",
  "Vue.js",
  "Python",
  "Java",
  "Ruby on Rails",
  "Django",
  "PHP",
  "JavaScript",
  "TypeScript",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
];

const PostJob = () => {
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [techStack, setTechStack] = useState([]); 
  const [pointOfContact, setPointOfContact] = useState(""); 
  const [requiredByDate, setRequiredByDate] = useState(""); 
  const [landingPageData, setLandingPageData] = useState(null);
  const [formCompleted, setFormCompleted] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false); 

  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["logo"] = base64;
      setLogo(base64);
    });
  };

  const handleFormComplete = (e) => {
    e.preventDefault();

    if (
      company === "" ||
      position === "" ||
      experience === "" ||
      salary === "" ||
      title === "" ||
      description === "" ||
      techStack.length === 0 ||
      pointOfContact === "" ||
      requiredByDate === ""
    ) {
      window.alert("Please fill all the required fields.");
      return;
    }

    setFormCompleted(true);
    fetchLandingPageData();
  };

  const handleFinalSubmit = async () => {
    const jobPost = {
      company,
      position,
      salary,
      experience,
      role,
      location,
      logo,
      title, 
      description, 
      techStack, 
      pointOfContact, 
      requiredByDate, 
    };

    try {
      const response = await axios.post("https://your-api-endpoint.com/jobs", jobPost);
      window.alert("Form Submitted Successfully");
      navigate("/Jobs");
    } catch (error) {
      console.error("Error submitting form data:", error);
      window.alert("Failed to submit the form. Please try again.");
    }
  };

  const fetchLandingPageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://your-api-endpoint.com/landing-data");
      setLandingPageData(response.data);
    } catch (error) {
      console.error("Error fetching landing page data:", error);
      setError("Failed to load landing page data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTechStackChange = (tech) => {
    setTechStack((prevTechStack) =>
      prevTechStack.includes(tech)
        ? prevTechStack.filter((t) => t !== tech)
        : [...prevTechStack, tech]
    );
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (formCompleted) {
    return (
      <div>
        <Navbar />
        <div className="landing-page">
          <h2>Landing Page Information</h2>
          {landingPageData && (
            <div>
              <h3>Data from Backend:</h3>
              <p>{landingPageData.message}</p>
            </div>
          )}
          <button onClick={handleFinalSubmit} className="submit-button">
            Proceed with Submission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="job-background">
        <div className="title">
          <h2>Post a Job</h2>
        </div>
      </div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Fill the form</h1>
        </header>
        <form>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Job Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter Job Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="techStack">Tech Stack</label>
            <div className="dropdown-container">
              <button type="button" className="select-tech-stack-button" onClick={toggleDropdown}>
                {techStack.length > 0 ? techStack.join(", ") : "Select Tech Stack"}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {techStackOptions.map((tech) => (
                    <label key={tech} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={techStack.includes(tech)}
                        onChange={() => handleTechStackChange(tech)}
                      />
                      {tech}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pointOfContact">Point of Contact</label>
            <input
              type="text"
              name="pointOfContact"
              className="form-control"
              placeholder="Enter Point of Contact"
              onChange={(e) => setPointOfContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requiredByDate">Required By Date</label>
            <input
              type="date"
              name="requiredByDate"
              className="form-control"
              onChange={(e) => setRequiredByDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="Enter Company Name"
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Company Logo</label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleImg}
              required
            />
          </div>
          <div className="form-group">
            <button type="button" className="submit-button" onClick={handleFormComplete}>
              Proceed to Landing Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
