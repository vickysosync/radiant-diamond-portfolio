import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { login, toast, DEMO_EMAIL } from "@/lib/store";
import { Logo } from "@/components/ui-kit";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Radiant Diamond LLP" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form className="w-full max-w-sm space-y-5 bg-pearl p-8" onSubmit={(e) => {
        e.preventDefault();
        if (login(email, pw)) { setOk(true); toast("Signed in (demo)."); } else toast("Invalid email or password.", "error");
      }}>
        <div className="bg-navy p-4"><Logo /></div>
        <h1 className="text-3xl">Admin Login</h1>
        <p className="text-xs text-muted-foreground">Demo-only sign-in stored in your browser. Not secure production authentication. Demo email: {DEMO_EMAIL}</p>
        <input className="field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button className="btn btn-dark w-full">Sign In</button>
        {ok && <p className="text-sm text-success">Signed in. The full admin dashboard is not built yet.</p>}
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-gold">← Back to website</Link>
      </form>
    </div>
  );
}
