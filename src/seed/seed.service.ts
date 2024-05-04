import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonSeed } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  async executeSeed(){
    const { data } = await this.axios.get<PokemonSeed>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach( ({ name, url } ) =>{//*Desestructuramos el name con el Url al colocarlo de esa forma entre corchetes
      const segments = url .split('/'); //* Aqui dividimos el http sin los / //// Un ejemplo es [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
      const no = +segments[ segments.length - 2]; //* Aqui se toma el segmento que queremos especificamente que es el "1"
      console.log(segments);
    })

    return data.results;
  }
}
