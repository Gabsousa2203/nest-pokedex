import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  
  //*Debido a que Model no es injectable debemos agregarle un decorador 
  constructor(
    @InjectModel( Pokemon.name ) //! Para que se puedan inyectar modelos de mongoose
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService
  ){}
  
  async create(createPokemonDto: CreatePokemonDto) {//* Se coloca async porque las inserciones a la BD son asincronas
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );

      return pokemon;
    }catch (error){
      this.handleExceptions( error );
    }
  }

  findAll( paginationDto: PaginationDto) {

    const { limit = 10, offset = 0} = paginationDto; //* Se desestructura por si nno llega ningun valor y se coloca dde manera local 

    return this.pokemonModel.find()
      .limit( limit ) //* Este especifica cuanto se muestra
      .skip( offset ) //* este especifica desde donde comienza
      .sort({ //* Esto ordena las columnas de namera ascendente
        no: 1
      })
      .select('-__v')
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if( !isNaN(+term) ) {pokemon = await this.pokemonModel.findOne({ no: term })}
    //MongoID
    if( !pokemon && isValidObjectId( term ) ) { pokemon = await this.pokemonModel.findById( term ); }
    //Name
    if( !pokemon ){ pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() }); }
    
    if( !pokemon ) throw new NotFoundException( `Pokemon with id, name or no '${ term }' not found` );

    return pokemon;
  }



  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );

    if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try{

      await pokemon.updateOne( updatePokemonDto, {new: true} ); //* Siempre se debe colocar { new: true }, para que se mande a la BD el nuevo objeto
      
      return pokemon;

    }catch (error){
      this.handleExceptions( error );
    }

  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne(); //* Con este se puede eliminar con cualquier atributo que tenga 
    const result = await this.pokemonModel.findByIdAndDelete( id );
    return result;
  }

  private handleExceptions( error: any ){
    if (error.code === 11000) throw new BadRequestException( `Pokemon exists in db ${ JSON.stringify( error.keyValue ) }` );
    console.log(error);
    throw new InternalServerErrorException( `Cant't create pokemon - Check server logs` );
  }

}
