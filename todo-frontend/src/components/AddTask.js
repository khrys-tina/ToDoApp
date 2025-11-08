import React, { useEffect, useState } from "react";
import { categoryApi, taskApi } from "../services/api";

export default function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then(({ data }) => setCategories(data || []));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await taskApi.create({
      title,
      description,
      isCompleted: false,
      categoryId: categoryId ? Number(categoryId) : 0,
      userId: 0, // бекенд візьме з токена, якщо не потрібно — видали
    });
    setTitle(""); setDescription(""); setCategoryId("");
    onTaskAdded?.();
  };

  return (
    <form onSubmit={onSubmit} className="card card-body">
      <h5 className="mb-3">Add Task</h5>
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
        </div>
        <div className="col-md-5">
          <input className="form-control" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <button className="btn btn-primary">Create</button>
      </div>
    </form>
  );
}
