import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    course_name: "",
    instructor: "",
    term: "",
    year: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedCourse = {
      course_name: form.course_name,
      instructor: form.instructor,
      year:form.year,
      term: form.term,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedCourse),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Course Record</h3>
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
            value="Update course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
