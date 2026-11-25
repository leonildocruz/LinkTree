import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Social from "../../components/social/social";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export default function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialProps>();

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      try {
        const snapshot = await getDocs(queryRef);
        const list: LinkProps[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        }));

        setLinks(list);
      } catch (error) {
        console.log(error);
      }
    }

    loadLinks();
  }, []);

  useEffect(() => {
    async function handleLinks() {
      const docsRef = doc(db, "redesSociais", "link");

      try {
        const snapshot = await getDoc(docsRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setSocialLinks({
            facebook: data?.facebook?.trim() ?? "",
            instagram: data?.instagram?.trim() ?? "",
            youtube: data?.youtube?.trim() ?? "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleLinks();
  }, []);

  const hasFacebook = Boolean(socialLinks?.facebook);
  const hasInstagram = Boolean(socialLinks?.instagram);
  const hasYoutube = Boolean(socialLinks?.youtube);
  const hasAnySocialLink = hasFacebook || hasInstagram || hasYoutube;

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-white md:text-4xl mt-10 text-3xl font-bold">
        Dev Leo Silva
      </h1>
      <span className="text-white mt-3 mb-4 text-2xl">Veja meus links👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.bg }}
            className="mb-4 w-full py-2 rounded-lg select-none transition-transform md:text-xl text-base font-bold hover:scale-102 cursor-pointer"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p style={{ color: link.color }}>{link.name}</p>
            </a>
          </section>
        ))}

        {hasAnySocialLink && (
          <footer className="flex justify-center gap-4 my-4 text-white">
            {hasFacebook && (
              <Social url={socialLinks?.facebook ?? ""}>
                <FaFacebook size={35} color="#fff" />
              </Social>
            )}

            {hasInstagram && (
              <Social url={socialLinks?.instagram ?? ""}>
                <FaInstagram size={35} color="#fff" />
              </Social>
            )}

            {hasYoutube && (
              <Social url={socialLinks?.youtube ?? ""}>
                <FaYoutube size={35} color="#fff" />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}
