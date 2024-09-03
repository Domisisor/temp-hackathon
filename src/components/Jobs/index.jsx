import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import './index.css'

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
        setFilteredJobs(newData);
        setMySubscriptionJobs(newData.filter((item) => item.mySubscription));
        setMyPostJobs(newData.filter((item) => item.myPost));
      });
  }, []);

  function saveClick(job) {
    window.localStorage.setItem("Job", JSON.stringify(job));
    setActive(true);
  }

  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    setFilteredJobs(
      data.filter((job) => {
        return job.role === value;
      })
    );
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
    if (searchValue !== "") {
      const filterData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(data);
    }
  };

  return (
    <>
      <div className="job-container">
        <div className="tabs">
          <button
            className={currentTab === "tab1" ? "active" : ""}
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
              {/* content for tab 1 */}
              {filteredJobs.map(({ id, logo, company, position, location, posted, role }) => {
                return (
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
                );
              })}
            </div>
          ) : (
            <div>
              {/* content for other tabs */}
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
    </>
  );
}

export default Jobs;
