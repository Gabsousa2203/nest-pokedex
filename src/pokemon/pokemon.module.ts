import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //! IMPORTANTE No es el atributo "name", ese sale de la extension del documento en entitie
        schema: PokemonSchema,  //! Es la constante que se creo en entitie
      }
    ]),
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
