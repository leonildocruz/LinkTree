import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Social from "../../components/social/social";

export default function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-white md:text-4xl text-3xl font-bold ">
        Dev Leo Silva
      </h1>
      <span className="text-white mt-3 mb-4 text-2xl">Veja meus links👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center ">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-102 cursor-pointer">
          <a className="md:text-xl text-base font-bold">
            <p>Canal do youtube</p>
          </a>
        </section>
        <footer className=" flex justify-center gap-4 my-4 text-white">
          <Social url="https://www.facebook.com/?locale=pt_BR">
            <FaFacebook size={35} color="#fff" />
          </Social>
          <Social url="https://www.instagram.com/">
            <FaInstagram size={35} color="#fff" />
          </Social>
          <Social url="https://www.youtube.com/">
            <FaYoutube size={35} color="#fff" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
