/**
 * EntrenadorController
 *
 * @description :: Server-side logic for managing entrenadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearEntrenador: function(req,res){
        if (req.method == "POST"){
            
            var parametros = req.allParams();
            var entrenadorCrear = {
                nombre: parametros.nombre,
                region: parametros.region,
                fechaInicioMaestroPokemon: parametros.fechaInicioMaestroPokemon
            }
            Entrenador.create(entrenadorCrear).exec(function(err, entrenadorCreado){
                if(err){
                    return res.view('404',{
                        error:{
                            descripcion:"Fallo al crear el entrenador",
                            rawError: err,
                            url:"/CrearEntrenador"
                        }
                    });
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
                            }

                            res.view('listarEntrenadorPokemon', {
                                entrenadores: entrenadoresEncontrados
                            });
                        })
                
                
                
                
                
            })
        }
    },
    EditarEntrenador: function(req,res){
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
    BorrarEntrenador: function (req, res) {

        var parametros = req.allParams();

        if (parametros.id) {

            Entrenador.destroy({
                id: parametros.id
            }).exec(function (errorInesperado, EntrenadorRemovido) {
                if (errorInesperado) {
                    return res.view('vistas/Error', {
                        error: {
                            desripcion: "Tuvimos un Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarEntrenadores"
                        }
                    });
                }
                Entrenador.find()
                    .exec(function (errorIndefinido, entrenadoresEncontrados) {

                        if (errorIndefinido) {
                            res.view('vistas/Error', {
                                error: {
                                    desripcion: "Hubo un problema cargando los Usuarios",
                                    rawError: errorIndefinido,
                                    url: "/ListarEntrenadores"
                                }
                            });
                        }

                        res.view('listarEntrenadorPokemon', {
                                entrenadores: entrenadoresEncontrados
                            });
                    })
            })

        } else {
            return res.view('vistas/Error', {
                error: {
                    desripcion: "Necesitamos el ID para borrar al Usuario",
                    rawError: "No envia ID",
                    url: "/ListarEntrenadores"
                }
            });
        }
    }
    
    
    
};

