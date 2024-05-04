import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { IsMongoId } from 'class-validator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')

export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}


  //!Si presionas crtl + HttpCode ves los diferentes codigos 
  @Post()
  //@HttpCode( HttpStatus.UNAUTHORIZED ) //* Con este decorador le decimos a nest como queremos que se vean los mensajes HTTP 
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne( term );
  }

  @Patch(':term')
  update(@Param('term') term: string, 
  @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove(id);
  }
}