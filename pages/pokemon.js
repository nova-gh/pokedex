import Layout from "../componets/Layout";
import Link from "next/link";
import Image from "next/image";
// server sided rended page for details of each pokeman.
const pokemon = ({ pokeman }) => {
  //   console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <div className="border p-4 border-gray  bg-gray-200 rounded-md flex flex-col items-center">
        <p className="ml-auto font-medium underline text-lg">
          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
        <h1 className="capitalize font-bold text-4xl text-center mb-2">
          {pokeman.name}
        </h1>
        <div className="flex flex-col items-center">
          <Image
            src={pokeman.image}
            alt={pokeman.name}
            width="400"
            height="400"
            className=""
          />
        </div>
        <div className="flex items-center p-2 ">
          <h1 className="font-bold mr-2 text-xl">Weight:</h1>
          <p className="text-l text-gray-900"> {pokeman.weight}</p>
        </div>
        <div className="flex items-center p-2">
          <h1 className="font-bold mr-2 text-xl">Height:</h1>
          <p className="text-l text-gray-900"> {pokeman.height}</p>
        </div>
        <div className="flex items-center p-2">
          <h1 className="font-bold mr-2 text-xl">Types:</h1>
          {pokeman.types.map((type, index) => (
            <p className="mr-4 capitalize" key={index}>
              {type.type.name}
            </p>
          ))}
          <p className="">
            <Link href="/">
              <a>Home</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default pokemon;

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3); //001 or 0010 00100
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
