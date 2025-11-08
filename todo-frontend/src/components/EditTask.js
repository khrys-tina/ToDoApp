import React, { useEffect, useState } from "react";
import { categoryApi, taskApi } from "../services/api";

export default function EditTask({ task, onSaved, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [categoryId, setCategoryId] = useState(task.categoryId || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then(({ data }) => setCategories(data || []));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await taskApi.update(task.id, {
      ...task,
      title,
      description,
      categoryId: categoryId ? Number(categoryId) : 0
    });
    onSaved?.();
  };

  return (
    <form onSubmit={onSubmit} className="card card-body mt-2">
      <h6 className="mb-2">Edit Task</h6>
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
        </div>
        <div className="col-md-5">
          <input className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-2 d-flex gap-2">
        <button className="btn btn-success btn-sm" type="submit">Save</button>
        <button className="btn btn-secondary btn-sm" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
