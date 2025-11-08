import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import { taskApi, categoryApi } from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await taskApi.get({
      page,
      pageSize,
      search,
      categoryId: categoryId || null
    });
    setTasks(data || []);
  };

  useEffect(() => {
    categoryApi.getAll().then(({ data }) => setCategories(data || []));
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [page, search, categoryId]);

  const onDelete = async (id) => {
    await taskApi.remove(id);
    load();
  };

  return (
    <div>
      <h2 className="mb-3">To-Do Tasks</h2>

      <AddTask onTaskAdded={() => { setPage(1); load(); }} />

      <div className="row g-2 mt-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e)=>{ setPage(1); setSearch(e.target.value); }}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select"
                  value={categoryId}
                  onChange={(e)=>{ setPage(1); setCategoryId(e.target.value); }}>
            <option value="">All categories</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <ul className="list-group mt-3">
        {tasks.length === 0 && <li className="list-group-item text-muted">No tasks found</li>}
        {tasks.map(t => (
          <li key={t.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div><strong>{t.title}</strong></div>
                {t.description && <div className="text-muted">{t.description}</div>}
                {t.category && <span className="badge bg-secondary mt-1">{t.category.name}</span>}
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={()=>setEditingId(t.id)}>Edit</button>
                <button className="btn btn-outline-danger btn-sm" onClick={()=>onDelete(t.id)}>Delete</button>
              </div>
            </div>
            {editingId === t.id && (
              <EditTask
                task={t}
                onSaved={() => { setEditingId(null); load(); }}
                onCancel={() => setEditingId(null)}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-secondary" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button>
        <button className="btn btn-secondary" disabled={tasks.length < pageSize} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
