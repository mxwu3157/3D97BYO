import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    course_name: "",
    instructor: "",
    year:"",
    term: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newCourse = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ course_name: "", instructor: "",year:"", term: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Course Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="course_name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="course_name"
            value={form.course_name}
            onChange={(e) => updateForm({ course_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            className="form-control"
            id="instructor"
            value={form.instructor}
            onChange={(e) => updateForm({ instructor: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            className="form-control"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="termOptions"
              id="term-fa"
              value="Fall"
              checked={form.term === "Fall"}
              onChange={(e) => updateForm({ term: e.target.value })}
            />
            <label htmlFor="term-fa" className="form-check-label">Fall</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="termOptions"
              id="term-sp"
              value="Spring"
              checked={form.term === "Spring"}
              onChange={(e) => updateForm({ term: e.target.value })}
            />
            <label htmlFor="term-sp" className="form-check-label">Spring</label>
          </div>

        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
