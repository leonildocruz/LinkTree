import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConnection";

async function handleLogout() {
  await signOut(auth);
}

export default function Header() {
  return (
    <header className="flex justify-center items-center px-2 py-5">
      <nav className=" flex justify-between gap-2 bg-white w-full max-w-2xl py-2 px-4 rounded-md">
        <div className="flex  gap-5 text-lg font-medium ">
          <Link className="transition-all duration-300 hover:scale-105" to="/">
            Home
          </Link>
          <Link
            className="transition-all duration-300 hover:scale-105"
            to="/admin"
          >
            Links
          </Link>
          <Link
            className="transition-all duration-300 hover:scale-105"
            to="/admin/social"
          >
            Redes Sociais
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="transition-all duration-300 hover:scale-108 cursor-pointer"
        >
          <BiLogOut size={30} color="#db2628" />
        </button>
      </nav>
    </header>
  );
}
