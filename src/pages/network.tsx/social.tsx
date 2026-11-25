import { useEffect, useState } from "react";
import Input from "../../components/input/input";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export default function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fb = facebook.trim();
    const ig = instagram.trim();
    const yt = youtube.trim();

    const todosVazios = fb === "" && ig === "" && yt === "";

    if (todosVazios) {
      alert("Preencha pelo menos uma rede social!");
      return;
    }
    try {
      await setDoc(doc(db, "redesSociais", "link"), {
        facebook: fb,
        instagram: ig,
        youtube: yt,
      });
      alert("Cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar!" + error);
    }
  }

  useEffect(() => {
    async function handleLinks() {
      const docsRef = doc(db, "redesSociais", "link");

      try {
        const snapshot = await getDoc(docsRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setFacebook(data?.facebook?.trim() ?? "");
          setInstagram(data?.instagram?.trim() ?? "");
          setYoutube(data?.youtube?.trim() ?? "");
        }
      } catch (error) {
        console.log(error);
        setLoadError(true);
      }
      setLoading(false);
    }

    handleLinks();
  }, []);

  if (loading) {
    return (
      <p className="text-white flex  justify-center mt-6">Carregando...</p>
    );
  }

  if (loadError) {
    return (
      <div className="text-white flex flex-col items-center justify-center mt-6">
        <p>Não foi possível carregar suas redes.</p>
        <p>Recarregue a página</p>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col ">
      <h1 className="text-white text-2xl font-medium">Minhas redes sociais</h1>

      <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Youtube
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do Youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md justify-center items-center flex mb-7 font-medium"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
