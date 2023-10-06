import { useEffect, useState } from 'react';

import Button from '@components/react/Button';
import Skeleton from '@components/react/Skeleton';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const Card = () => {
  const [pokemon, setPokemon] = useState<PokemonDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const url = pokemon ? pokemon.next : import.meta.env.PUBLIC_API_BASE_URL;

    async function getPokemon() {
      const signal = controller.signal;
      const res = await fetch(url, { signal });
      const data = await res.json();

      if (pokemon) {
        setPokemon((old) => ({
          ...data,
          results: [...(old?.results ?? []), ...data.results],
        }));
      } else {
        setPokemon(data);
      }
      setIsLoading(false);
    }

    getPokemon();

    return () => {
      controller.abort();
    };
  }, [page]);

  if (!pokemon) {
    return <Skeleton />;
  }

  return (
    <>
      <section className='grid grid-cols-5 gap-3'>
        {pokemon.results.map((item) => (
          <a
            key={item.name}
            href={`/pokedex/${item.name}`}>
            <div className='bg-white rounded-md transition-transform duration-200 ease-in-out hover:-translate-y-2'>
              <figure className='block w-full'>
                <img
                  src={`${import.meta.env.PUBLIC_IMG_URL}/${item.url.slice(34).replace('/', '')}.png`}
                  alt='poke'
                />
              </figure>
              <div className='py-4'>
                <p className='text-slate-800 text-lg text-center'>{item.name}</p>
              </div>
            </div>
          </a>
        ))}
      </section>
      <div className='text-center mt-8'>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={isLoading}>
          Load More Pokemon
        </Button>
      </div>
    </>
  );
};

export default Card;
