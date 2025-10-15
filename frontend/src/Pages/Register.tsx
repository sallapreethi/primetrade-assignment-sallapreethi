import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
type Form = z.infer<typeof schema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });
  const nav = useNavigate();

  const onSubmit = async (data: Form) => {
    await api.post("/auth/signup", data);
    nav("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Create account</h1>
      <input {...register("name")} placeholder="Name" className="w-full border rounded px-3 py-2" />
      {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      <input {...register("email")} placeholder="Email" className="w-full border rounded px-3 py-2" />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      <input {...register("password")} type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      <button className="w-full bg-black text-white py-2 rounded">Sign up</button>
      <p className="text-sm">Have an account? <Link to="/login" className="underline">Login</Link></p>
    </form>
  );
}