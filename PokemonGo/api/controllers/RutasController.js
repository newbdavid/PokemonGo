/**
 * RutasController
 *
 * @description :: Server-side logic for managing rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearEntrenador: function(req, res) {
        return res.view('crearMaestroPokemon');
    },
    listarEntrenadores: function(req, res) {
        return res.view('listarEntrenadorPokemon');
    },
    editarEntrenador: function(req, res) {
        var parametros = req.allParams();

        if (parametros.id) {

            Entrenador.findOne({
                id: parametros.id
            }).exec(function (errorInesperado, EntrenadorEncontrado) {
                if (errorInesperado) {
                    return res.view('vistas/Error', {
                        error: {
                            desripcion: "Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarEntrenadores"
                        }
                    });
                }
                if(EntrenadorEncontrado){
                     return res.view("editarEntrenadorPokemon",{
                         entrenadorAEditar:EntrenadorEncontrado,
                     });
                }else{
                    return res.view('404', {
                        error: {
                            desripcion: "El entrenador con id: "+parametros.id+" no existe.",
                            rawError: "No existe el usuario",
                            url: "/ListarEntrenadores"
                        }
                    });
                }
            })
        } else {

            return res.view('404', {
                error: {
                    desripcion: "No ha enviado el parametro ID",
                    rawError: "Faltan Parametros",
                    url: "/ListarEntrenadores"
                }
            });

        }
    },
    crearPokemon: function(req, res) {
        return res.view('crearPokemon');
    },
    listarPokemones: function(req, res) {
        return res.view('listarPokemon');
    },
    editarPokemon: function(req, res) {
        var parametros = req.allParams();

        if (parametros.id) {

            Pokemon.findOne({
                id: parametros.id
            }).exec(function (errorInesperado, PokemonEncontrado) {
                if (errorInesperado) {
                    return res.view('vistas/Error', {
                        error: {
                            desripcion: "Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarPokemones"
                        }
                    });
                }
                if(PokemonEncontrado){
                     return res.view("editarPokemon",{
                         pokemonAEditar:PokemonEncontrado,
                     });
                }else{
                    return res.view('404', {
                        error: {
                            desripcion: "El entrenador con id: "+parametros.id+" no existe.",
                            rawError: "No existe el usuario",
                            url: "/ListarPokemones"
                        }
                    });
                }
            })
        } else {

            return res.view('404', {
                error: {
                    desripcion: "No ha enviado el parametro ID",
                    rawError: "Faltan Parametros",
                    url: "/ListarPokemones"
                }
            });

        }
    },
    
};

