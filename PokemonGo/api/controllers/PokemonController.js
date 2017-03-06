/**
 * PokemonController
 *
 * @description :: Server-side logic for managing pokemons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearPokemon: function(req,res){
        if (req.method == "POST"){
            
            var parametros = req.allParams();
            var pokemonCrear = {
                nombre: parametros.nombre,
                tipoPokemon1: parametros.tipoPokemon1,
                tipoPokemon2: parametros.tipoPokemon2,
                idPokemon: parametros.idPokemon
            }
            Pokemon.create(pokemonCrear).exec(function(err, pokemonCreado){
                if(err){
                    return res.view('404',{
                        error:{
                            descripcion:"Fallo al crear el entrenador",
                            rawError: err,
                            url:"/CrearPokemon"
                        }
                    });
                }
                
                Pokemon.find()
                        .exec(function (errorIndefinido, pokemonesEncontrados) {

                            if (errorIndefinido) {
                                res.view('404', {
                                    error: {
                                        desripcion: "Hubo un problema cargando los Pokemones",
                                        rawError: errorIndefinido,
                                        url: "/ListarPokemon"
                                    }
                                });
                            }

                            res.view('listarPokemon', {
                                pokemones: pokemonesEncontrados
                            });
                        })
                
                
                
                
                
            })
        }
    },
    EditarPokemon: function(req,res){
        var parametros = req.allParams();

        if (parametros.id ) {
            console.log("Hay parametros")
            var entrenadorAEditar = {
                nombre: parametros.nombre,
                region: parametros.region,
                fechaInicioMaestroPokemon: parametros.fechaInicioMaestroPokemon
            }

            if (entrenadorAEditar.nombre == "") {
                delete entrenadorAEditar.nombre
            }
            if (entrenadorAEditar.region == "") {
                delete entrenadorAEditar.region
            }
            if (entrenadorAEditar.fechaInicioMaestroPokemon == "") {
                delete entrenadorAEditar.fechaInicioMaestroPokemon
            }
            

            Entrenador.update({
                    id: parametros.id
                }, entrenadorAEditar)
                .exec(function (errorInesperado, entrenadorAEditar) {
                    if (errorInesperado) {
                        return res.view('404', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: errorInesperado,
                                url: "/ListarEntrenadores"
                            }
                            
                        });
                        console.log(error)
                    }
                
                    Entrenador.find()
                        .exec(function (errorIndefinido, entrenadoresEncontrados) {

                            if (errorIndefinido) {
                                res.view('404', {
                                    error: {
                                        desripcion: "Hubo un problema cargando los Usuarios",
                                        rawError: errorIndefinido,
                                        url: "/ListarEntrenadores"
                                    }
                                    
                                });
                                console.log(error)
                            }

                            res.view('listarEntrenadorPokemon', {
                                entrenadores: entrenadoresEncontrados
                            });
                        })
                

                })
            
            
            
            
            

        } else {
            return res.view('404', {
                error: {
                    desripcion: "Necesitamos que envies todo completo",
                    rawError: "No envia Parametros",
                    url: "/ListarEntrenadores"
                }
                
            });
            console.log(error)
        }
    },
    BorrarPokemon: function (req, res) {

        var parametros = req.allParams();

        if (parametros.id) {

            Pokemon.destroy({
                id: parametros.id
            }).exec(function (errorInesperado, PokemonRemovido) {
                if (errorInesperado) {
                    return res.view('vistas/Error', {
                        error: {
                            desripcion: "Tuvimos un Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarPokemones"
                        }
                    });
                }
                Pokemon.find()
                    .exec(function (errorIndefinido, pokemonesEncontrados) {

                        if (errorIndefinido) {
                            res.view('vistas/Error', {
                                error: {
                                    desripcion: "Hubo un problema cargando los Usuarios",
                                    rawError: errorIndefinido,
                                    url: "/ListarPokemones"
                                }
                            });
                        }

                        res.view('listarPokemon', {
                                pokemones: pokemonesEncontrados
                            });
                    })
            })

        } else {
            return res.view('vistas/Error', {
                error: {
                    desripcion: "Necesitamos el ID para borrar al Usuario",
                    rawError: "No envia ID",
                    url: "/ListarPokemones"
                }
            });
        }
    }
};

