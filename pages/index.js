import Image from "next/image";
import Layout from "../componets/Layout";
import Link from "next/link";
export default function Home({ pokemon }) {
  // console.log(pokemon);
  return (
    <Layout title="Pokédex">
      <h1 className="text-4xl mb-8 text-center">Pokédex</h1>
      <ul className=" ">
        {pokemon.map((pokeman, index) => (
          <li key={index} className="">
            {/* index+1 since pokemons api start at 1 not 0 */}
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="flex items-center w-  capitalize text-xl border p-4 border-gray my-2 bg-gray-200 rounded-md">
                <Image
                  src={pokeman.image}
                  alt={pokeman.name}
                  width="132"
                  height="132"
                  className=""
                />
                <span className="font-bold mx-2">{index + 1}.</span>
                <h1>{pokeman.name}</h1>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    // json obj has results that we can grab
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3); //001 or 0010 00100
      // console.log(paddedIndex);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
