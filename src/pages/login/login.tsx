import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import { useState } from "react";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      alert("Email ou senha icorreta!");
      console.log(`Falha ao acessar usuario! ${error}`);
    }
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className=" mt-11 text-white mb-7 font-bold text-5xl">
          Dev<span className="text-yellow-500">Link</span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          type="email"
          autoComplete="username"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg text-white font-bold"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
