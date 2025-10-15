import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useState } from "react";

type Task = { id: number; title: string; description?: string; status: "PENDING"|"IN_PROGRESS"|"DONE" };

export default function Tasks() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);

  const fetchTasks = async () => (await api.get("/tasks", { params: { q, status } })).data.data;
  const { data } = useQuery({ queryKey: ["tasks", q, status], queryFn: fetchTasks });

  const create = useMutation({
    mutationFn: (d:any) => api.post("/tasks", d),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const update = useMutation({
    mutationFn: (d:any) => api.put(`/tasks/${editing?.id}`, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["tasks"] }); setEditing(null); },
  });

  const del = useMutation({
    mutationFn: (id:number) => api.delete(`/tasks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title..." className="border px-2 py-1 rounded grow"/>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <TaskForm
        key={editing ? "edit" : "create"}
        initial={editing || undefined}
        onSubmit={(d)=> editing ? update.mutate(d) : create.mutate(d)}
      />

      <TaskList
        items={data?.items || []}
        onEdit={(t:Task)=>setEditing(t)}
        onDelete={(id:number)=>del.mutate(id)}
      />
    </div>
  );
}

function TaskForm({ onSubmit, initial }:{ onSubmit:(d:any)=>void; initial?: Partial<Task> }) {
  const [title,setTitle]=useState(initial?.title||"");
  const [desc,setDesc]=useState(initial?.description||"");
  const [stat,setStat]=useState<Task["status"]>(initial?.status||"PENDING");
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit({ title, description: desc, status: stat });}} className="flex gap-2 flex-wrap">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="border px-2 py-1 rounded grow" required/>
      <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="border px-2 py-1 rounded grow"/>
      <select value={stat} onChange={e=>setStat(e.target.value as any)} className="border px-2 py-1 rounded">
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <button className="bg-black text-white px-3 py-1 rounded">{initial ? "Update" : "Add"}</button>
    </form>
  );
}

function TaskList({ items, onEdit, onDelete }:{ items:Task[]; onEdit:(t:Task)=>void; onDelete:(id:number)=>void }) {
  return (
    <div className="space-y-2">
      {items.map((t)=>(
        <div key={t.id} className="border p-3 rounded flex items-center gap-3">
          <div className="grow">
            <div className="font-semibold">
              {t.title} <span className="text-xs border rounded px-2">{t.status}</span>
            </div>
            {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
          </div>
          <button onClick={()=>onEdit(t)} className="border px-3 py-1 rounded">Edit</button>
          <button onClick={()=>onDelete(t.id)} className="border px-3 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}