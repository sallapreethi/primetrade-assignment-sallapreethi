import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await api.get("/profile")).data.data,
  });
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, <b>{data?.name || "User"}</b></p>
    </div>
  );
}