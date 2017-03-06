/**
 * Entrenador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      nombre:{
          type:'string',
          required:true
      },
      region:{
          type:'string',
          enum:['Kanto',' Johto',' Hoenn',' Sinnoh',' Teselia',' Kalos','Alola'],
          required:true
      },
      fechaInicioMaestroPokemon:{
          type:'date',
          required:true
      },
      //pokemones -> es el nombre en plural del modelo a relacionarse
        pokemones: {
            // Collection -> Nombre del Modelo en Sails
            collection: 'Pokemon',
            // Via-> Es el campo por el cual vamos a relacionar FOREIGN KEY
            via: 'idPokemon'
        }
  }
};

