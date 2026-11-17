import { useEffect, useState } from "react";
import Input from "../../components/input/input";
import { FiTrash } from "react-icons/fi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface Linkprops {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#121212");
  const [bgColorInput, setBgColorInput] = useState("#fff");
  const [link, setLinks] = useState<Linkprops[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRaf = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRaf, (snapshot) => {
      const lista = [] as Linkprops[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function HandleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Prenche todos os campos");
      return;
    }

    try {
      await addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        bg: bgColorInput,
        color: textColorInput,
        created: new Date(),
      });
      setUrlInput("");
      setNameInput("");
      alert("Link Cadastrado!");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className=" flex items-center flex-col  pb-7 px-2">
      <form
        onSubmit={HandleRegister}
        className="flex flex-col mt-3 w-full max-w-xl"
      >
        <label className="text-white font-medium text-xl mb-2">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium text-xl mt-3 mb-2">
          URL do Link
        </label>
        <Input
          type="url"
          placeholder="Digite a url do link..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="mt-5">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2">
              <label className="text-white font-medium text-xl ">
                Fundo do Link
              </label>
              <input
                className="h-10"
                type="color"
                value={bgColorInput}
                onChange={(e) => setBgColorInput(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-white font-medium text-xl ">
                Cor do Link
              </label>
              <input
                className="h-10"
                type="color"
                value={textColorInput}
                onChange={(e) => setTextColorInput(e.target.value)}
              />
            </div>
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center flex-col mt-7 py-2 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium text-xl  mb-3">
              Preview do Link
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col rounded-md items-center justify-between p-1"
              style={{ backgroundColor: bgColorInput }}
            >
              <p
                style={{
                  color: textColorInput,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium mt-5"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white text-2xl mb-4 mt-4">Meus links</h2>
      <div className="flex items-center w-11/12 max-w-xl flex-col gap-2">
        {link.map((link) => {
          const iconColor = link.color || "#ffffff";

          const finalIconColor = iconColor === link.bg ? "#000000" : iconColor;

          return (
            <article
              key={link.id}
              className=" flex items-center justify-between w-full  rounded-md p-2 select-none"
              style={{ backgroundColor: link.bg, color: link.color }}
            >
              <p>{link.name}</p>

              <div>
                <button
                  onClick={() => handleDeletLink(link.id)}
                  className="transition-all hover:scale-108 hover:rounded-full cursor-pointer flex"
                >
                  <FiTrash size={18} color={finalIconColor} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
