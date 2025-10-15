import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Form>({ resolver: zodResolver(schema) }) as any;
  const { setUser } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setUser(res.data.data.user);
      nav("/dashboard");
    } catch (e: any) {
      setError("root", { message: e?.response?.data?.message || "Login failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <input {...register("email")} placeholder="Email" className="w-full border rounded px-3 py-2" />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      <input {...register("password")} type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      <button className="w-full bg-black text-white py-2 rounded">Login</button>
      {/* @ts-ignore */}
      {errors.root && <p className="text-sm text-red-600">{/* @ts-ignore */errors.root.message}</p>}
      <p className="text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
    </form>
  );
}