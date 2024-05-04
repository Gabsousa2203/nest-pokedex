import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {//* Siempre debemos colocarla en el modulo de pokemon para que sepan que esta entiti existe

    // id: string // mongo me lo da

    @Prop({
        unique: true,
        index: true,
    }) //* utilizamos este decorador para darle propiedades al atributo
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}


export const PokemonSchema = SchemaFactory.createForClass( Pokemon );