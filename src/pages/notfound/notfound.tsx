import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white gap-2  ">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-4xl">Página não encontrada!</p>
      <Link
        to="/"
        className="text-2xl mt-4 hover:bg-gray-400 transition bg-gray-500 p-2 rounded-md"
      >
        ⬅️Voltar
      </Link>
    </div>
  );
}
