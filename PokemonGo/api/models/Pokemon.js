/**
 * Pokemon.js
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
      tipoPokemon1:{
          type:'string',
          required:true
      },
      tipoPokemon2:{
          type:'string',
          required:true
      },
      // idEntrenador es el nombre del Foreign Key solo que se creo mal desde el principio y no le pude cambiar
      
      idPokemon:{
          // Model-> es el nombre de la tabla padre
          model: 'Entrenador',
          // Required es OPCIONAL si no queremos registros huerfanos de raza
          required:true
      }
  }
};

