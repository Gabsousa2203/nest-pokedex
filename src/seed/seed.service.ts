import { Injectable } from '@nestjs/common';
import { PokemonSeed } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel( Pokemon.name ) //! Para que se puedan inyectar modelos de mongoose
    private readonly pokemonModel: Model<Pokemon>,

    private readonly httpAxios: AxiosAdapter
  ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({});
    const data = await this.httpAxios.get<PokemonSeed>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //const insertPromisesArray = []; Esta forma sirve, pero es lenta

    //otra forma de hacerlo y mas rapida //!
    const pokemonToInsert: { name: string, no: number }[] = [];
    //!

    data.results.forEach( async({ name, url } ) =>{//*Desestructuramos el name con el Url al colocarlo de esa forma entre corchetes
      
      const segments = url .split('/'); //* Aqui dividimos el http sin los / //// Un ejemplo es [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
      
      const no = +segments[ segments.length - 2]; //* Aqui se toma el segmento que queremos especificamente que es el "1"
  
      //insertPromisesArray.push(this.pokemonModel.create({ name,no })); Esta forma sirve, pero es lenta

      //otra forma de hacerlo y mas rapida //!
      pokemonToInsert.push({ name,no });
      //!

    });

    //await Promise.all( insertPromisesArray ); Esta forma sirve, pero es lenta

    //otra forma de hacerlo y mas rapida //!
    await this.pokemonModel.insertMany(pokemonToInsert);
    //!

    return 'Seed executed';
  }

}
