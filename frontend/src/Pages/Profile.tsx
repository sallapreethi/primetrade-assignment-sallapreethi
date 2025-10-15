import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useState } from "react";

export default function Profile() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["profile"], queryFn: async () => (await api.get("/profile")).data.data });
  const [name, setName] = useState("");
  const m = useMutation({
    mutationFn: (n: string) => api.put("/profile", { name: n }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
  return (
    <div className="space-y-3 max-w-md">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="border p-3 rounded">
        <p><b>Name:</b> {data?.name}</p>
        <p><b>Email:</b> {data?.email}</p>
      </div>
      <div className="border p-3 rounded space-y-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Update name" className="border px-2 py-1 rounded w-full"/>
        <button onClick={()=>m.mutate(name)} className="bg-black text-white px-3 py-1 rounded">Save</button>
      </div>
    </div>
  );
}