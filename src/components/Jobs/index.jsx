import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import './index.css';
import Navbar from "../Navbar";
import Filter from "../Filter";

function Jobs() {
  const [data, setData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [mySubscriptionJobs, setMySubscriptionJobs] = useState([]);
  const [myPostJobs, setMyPostJobs] = useState([]);
  const [active, setActive] = useState(false);
  const [searchterm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("tab1");
  const experience = [
    { min: 0, max: 2 },
    { min: 2, max: 5 },
    { min: 5, max: 10 },
  ];

  useEffect(() => {
    fetch("https://api.json-generator.com/templates/ZM1r0eic3XEy/data")
      .then((response) => response.json())
      .then((data) => {
        const newData = data.map((item) => ({
          ...item,
          mySubscription: true,
          myPost: false,
        }));
        setData(newData);
        filterJobs(newData, searchterm);
      });
  }, []);

  const filterJobs = (jobs, searchString) => {
    const byStringPair = jobs.filter(job => job.someKey === searchString);
    const byListPair = jobs.filter(job => job.someListKey && job.someListKey.includes(searchString));

    setFilteredJobs(byStringPair);
    setMySubscriptionJobs(byListPair.filter((item) => item.mySubscription));
    setMyPostJobs(byListPair.filter((item) => item.myPost));
  };

  function saveClick(job) {
    window.localStorage.setItem("Job", JSON.stringify(job));
    setActive(true);
  }

  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    filterJobs(data, value);
  }

  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = data.filter((job) => {
          return (
            job.experience >= experience[index].min &&
            job.experience <= experience[index].max
          );
        });
        filters = [...filters, ...filterS];
      }
    });
    setFilteredJobs(filters);
  }

  const searchEvent = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    filterJobs(data, searchValue); // Filter based on search value
  };

  return (
    <div>
      <Navbar/>
      <div className="job-container">
        <div className="tabs">
          <button
            className={currentTab === "tab1" ?
            "active" : ""}
            onClick={() => setCurrentTab("tab1")}
          >
            Tab 1
          </button>
          <button
            className={currentTab === "tab2" ? "active" : ""}
            onClick={() => setCurrentTab("tab2")}
          >
            My Subscription
          </button>
          <button
            className={currentTab === "tab3" ? "active" : ""}
            onClick={() => setCurrentTab("tab3")}
          >
            My Post
          </button>
        </div>
        <div className="job-list-container">
          {currentTab === "tab1" ? (
            <div>
              {filteredJobs.map(({ id, logo, company, position, location, posted, role }) => (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={
                          logo.length > 20
                            ? logo
                            : "https://www.ubs.com/etc/designs/fit/img/UBS_Logo_Semibold.svg"
                        }
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                        <div className="job-footer">
                          <p>{posted}</p>
                          <button onClick={() => saveClick({ id, company, position, location, posted, role })}>
                            {active ? <AiFillHeart /> : <AiOutlineHeart />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : currentTab === "tab2" ? (
            <div>
              {mySubscriptionJobs.map(({ id, logo, company, position, location, posted, role }) => (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={
                          logo.length > 20
                            ? logo
                            : "https://www.ubs.com/etc/designs/fit/img/UBS_Logo_Semibold.svg"
                        }
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                        <div className="job-footer">
                          <p>{posted}</p>
                          <button onClick={() => saveClick({ id, company, position, location, posted, role })}>
                            {active ? <AiFillHeart /> : <AiOutlineHeart />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {myPostJobs.map(({ id, logo, company, position, location, posted, role }) => (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={
                          logo.length > 20
                            ? logo
                            : "https://www.ubs.com/etc/designs/fit/img/UBS_Logo_Semibold.svg"
                        }
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                        <div className="job-footer">
                          <p>{posted}</p>
                          <button onClick={() => saveClick({ id, company, position, location, posted, role })}>
                            {active ? <AiFillHeart /> : <AiOutlineHeart />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Filter
          experience={experience}
          handleExperienceFilter={handleExperienceFilter}
        />
        <input
          type="search"
          value={searchterm}
          onChange={searchEvent}
          placeholder="Search"
        />
        <button onClick={handleJobFilter}>Filter by Job Role</button>
      </div>
    </div>
  );
}

export default Jobs;
