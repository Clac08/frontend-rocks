
import { PokeAPI } from "./pokeapi.Client";
import { useEffect, useState } from "react";

interface PokemonCard{
  id: number;
  image: string;
  name:string;
  types: string[];
}

async function fetchData(): Promise<PokemonCard[]> {
  const data = await PokeAPI.getPokemonsList();
  const pokemons = await Promise.all(
    data.results.map((pokemon) => {
      return PokeAPI.getPokemonByName(pokemon.name)
    })
  );

  return pokemons.map((pokemon) => {
    return{
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_shiny ?? "",
      types: pokemon.types.map((t) => t.type.name),
    };
  });
}


const typeColors: {[key: string]: string} = {
  fire : "bg-red-400 rounded-lg w-20 h-10 text-center font-bold text-white",
  water: "bg-blue-700 rounded lg w-20 h-10 text-center font-bold text-white",
  poison: "bg-purple-700 rounded lg w-20 h-10 text-center font-bold text-white",
  grass: "bg-green-500 rounded lg w-20 h-10 text-center font-bold text-white",
  flying: "bg-sky-200 rounded lg w-20 h-10 text-center font-bold text-white",
  bug: "bg-lime-500 rounded lg w-20 h-10 text-center font-bold text-white",
  normal: "bg-grey-500 rounded lg w-20 h-10 text-center font-bold text-white",

}

function getColoreTipo(type: string){
  const color = typeColors[type];
  return color;
}

interface Cardprops{
  id: number;
  image: string;
  name:string;
  types: string[];
}

const Card = (props : Cardprops) => {
  return (<div className = "bg-white w-2xs ">
    {props.id} - {props.name} 
    <img src={props.image}/>
    <div className = "flex flex-wrap gap-4" >
    {props.types.map((type) => {
      return(
        <div className ={`p-2 ${getColoreTipo(type)}`}>{type}</div>
      )
    })}
    </div>
  </div>
  )
}



export const App = () => {
  const [data, setData] = useState<PokemonCard[]>([]);

  useEffect(() => {
    fetchData().then((result) => {
      setData(
        result.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          types: item.types,
        }))
      );
    });
  }, []);


  return (<div>
    <div className = "flex flex-wrap gap-4">
      {data.map((item) => {
        return(
          <Card 
          id={item.id} 
          name={item.name} 
          image={item.image} 
          types={item.types}/>
        ) 
      })}
   </div>
  </div>
  );
};


export const Detail = () => {
  return null
}