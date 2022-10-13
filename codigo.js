/*------------------------------------------------TARJETAS-POKEMON-----------------------------------------------------------------------------*/

let btnNext;
let btnPrevious;
let div = document.querySelector("#resultados");
let btn = document.querySelector("#botones");

let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';

let selectGeneraciones = document.querySelector("#select_generacion");
selectGeneraciones.addEventListener("change", filtrarGeneracion);

function filtrarGeneracion() {

    let generacionSeleccionada = selectGeneraciones.value;

    //const expr = 'Papayas';
    switch (generacionSeleccionada) {
        case 'listarTodas':
            console.log('listado de paginacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
            btn.innerHTML = '';
            //obtenerPokemons(urlPokemon)
            break;

        case 'primeraGeneracion':
            console.log('listar primera generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
            console.log(urlPokemon)
            //obtenerPokemons(urlPokemon)

            break;

        case 'segundaGeneracion':
            console.log('listar segunda generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151';
            break;

        case 'terceraGeneracion':
            console.log('listar tercera generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251';
            break;

        case 'cuartaGeneracion':
            console.log('listar cuarta generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=386';
            break;

        case 'quintaGeneracion':
            console.log('listar quinta generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=156&offset=521';
            break;

        case 'sextaGeneracion':
            console.log('listar sexta generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=72&offset=677';
            break;

        case 'septimaGeneracion':
            console.log('listar septima generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=88&offset=749';
            break;

        case 'octavaGeneracion':
            console.log('listar octava generacion.');

            urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=68&offset=837';
            break;

        default:
            console.log(`Sorry, we are out of ${generacionSeleccionada}.`);
    }

    obtenerPokemons(urlPokemon)
}

let obtenerPokemons = (url) => {

    try {

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(pokemon => {

                console.log(pokemon)
                infoPokemons(pokemon.results);

                if (btnNext = pokemon.next) {

                    btnNext = `<button class="btn" data-url=${pokemon.next}>SIGUIENTE</button>`;
                    console.log("siguiente " + pokemon.next)
                } else {

                    btnNext = ``;
                }

                if (btnPrevious = pokemon.previous) {

                    btnPrevious = `<button class="btn" data-url=${pokemon.previous}>ANTERIOR</button>`;
                } else {

                    btnPrevious = ``;
                }

                btn.innerHTML = btnPrevious + " " + btnNext;
            })
    } catch (error) {

        console.log(error)
    }

}

obtenerPokemons(urlPokemon)

let infoPokemons = (data) => {

    div.innerHTML = "";

    try {
        for (let index of data) {

            console.log(data)
            console.log(index)
            fetch(index.url)
                .then(respuesta => respuesta.json())
                .then(pokemon => {

                    //console.log("index: "+ index)
                    //console.log("index: "+ index.url)

                    let id = pokemon.id;
                    let nombre = pokemon.name;
                    let altura = pokemon.height;
                    let peso = pokemon.weight;
                    let imagenPoke = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                    if (pokemon.types.length == 2) {

                        let tipo1 = pokemon.types[0].type.name;
                        let tipo2 = pokemon.types[1].type.name;
                        //console.log("tengo dos tipos")

                        div.innerHTML += `
                                        <article id="modalPrueba">
                                        <div class="contenedorTipos">
                                            <div class="icon ${tipo1}">
                                                <img src="img/icons/${tipo1}.svg" alt="${nombre}">
                                            </div>
                                            <div class="icon ${tipo2}">
                                                <img src="img/icons/${tipo2}.svg" alt="${nombre}">
                                            </div>
                                        </div>    
                                            <div>
                                                <img src="${imagenPoke}" alt="${nombre}">
                                            </div>    
                                            <div id="info">
                                                <h3>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>   
                                                <p>#${id.toString().padStart(3, 0)}</p>                               
                                            </div>
                                        </article>`

                    } else {
                        let tipo1 = pokemon.types[0].type.name;

                        //console.log("trngo un tipo")

                        div.innerHTML += `
                                        <article>
                                            <div class="icon ${tipo1}">
                                                <img src="img/icons/${tipo1}.svg" alt="${nombre}">
                                            </div>
                                            <div id="">
                                                <img src="${imagenPoke}" alt="${nombre}">
                                            </div>    
                                            <div id="info">
                                                <h3>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>   
                                                <p>#${id.toString().padStart(3, 0)}</p>                               
                                            </div>
                                        </article>`
                    }
                })
        }

    } catch (error) {

        console.log(error)
    }
}

btn.addEventListener("click", (e) => {

    if (e.target.classList.contains('btn')) {

        let value = e.target.dataset.url

        console.log(value)
        obtenerPokemons(value)
    }
})

//-------------------------------------------------------------------------------------------------------------------------------

let pokeCard = document.querySelector("#card");
let pokeName = document.querySelector("#titulo");
let pokeImg = document.querySelector(".poke-img");
let pokeTypes = document.querySelector("#types");
let pokeBusqueda = document.querySelector("#busqueda");
let pokeTxt = document.querySelector("#buscar");
let pokeInfo = document.querySelector("#muestra");
let pokeDescripcion = document.querySelector("#descripcion");

let colores = {
    bug: '#92BC2C',
    dark: '#595761',
    dragon: '#0C69C8',
    electric: '#F2D94E',
    fire: '#FBA54C',
    fairy: '#EE90E6',
    fighting: '#D3425F',
    flying: '#A1BBEC',
    ghost: '#5F6DBC',
    grass: '#5FBD58',
    ground: '#DA7C4D',
    ice: '#75D0C1',
    normal: '#A0A29F',
    poison: '#B763CF',
    psychic: '#FA8581',
    rock: '#C9BB8A',
    steel: '#5695A3',
    water: '#539DDF',
};

//------------------------------------------------------BUSCADOR---------------------------------------------------

function buscarPokemon() {

    let busqueda = pokeTxt.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`)
        .then(respuesta => respuesta.json())
        .then(pokemon => renderPokemonData(pokemon))
        .catch(err => noEncontrado())

    renderPokemonData();
}

let renderPokemonData = data => {

    pokeTxt.value = '';
    let { types } = data;

    let id = data.id;
    let nombre = data.name;
    let altura = data.height;
    let peso = data.weight;
    let imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    pokeName.innerHTML = `<h3>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>
                        <p>#${id.toString().padStart(3, 0)}</p>`;

    pokeImg.setAttribute('src', imagen);

    pokeInfo.innerHTML = `
                        <div id="info1">
                            <div id="info2"> 
                                <div>
                                    <p>${data.stats[0].stat.name.toUpperCase()}</p>
                                    <p>Ataque</p>
                                    <p>Defensa</p>
                                    <p>Ataque Esp.</p>
                                    <p>Defensa Esp.</p>
                                    <p>Velocidad</p>
                                </div>  
                                <div>
                                    <p>${data.stats[0].base_stat}%</p>
                                    <p>${data.stats[1].base_stat}%</p>
                                    <p>${data.stats[2].base_stat}%</p>
                                    <p>${data.stats[3].base_stat}%</p>
                                    <p>${data.stats[4].base_stat}%</p>
                                    <p>${data.stats[5].base_stat}%</p>
                                </div> 
                            </div>
                            <div id="info3">
                                <progress id="file" max="150" value="${data.stats[0].base_stat}"></progress>                                 
                                <progress id="file" max="150" value="${data.stats[1].base_stat}"></progress>                                
                                <progress id="file" max="150" value="${data.stats[2].base_stat}"></progress>                              
                                <progress id="file" max="150" value="${data.stats[3].base_stat}"></progress>                                
                                <progress id="file" max="150" value="${data.stats[4].base_stat}"></progress>                                
                                <progress id="file" max="150" value="${data.stats[5].base_stat}"></progress>
                            </div>                             
                        </div>`;

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombre}/?language=es-MX`)
        .then(respuesta => respuesta.json())
        .then(pokemonDescripcion => {

            //console.log(pokemonDescripcion.flavor_text_entries[50].flavor_text)
            let descripcion = pokemonDescripcion.flavor_text_entries[50].flavor_text;
            pokeDescripcion.innerHTML = `<p id="descripcion">${descripcion}</p>`;
        });

    colorDelTipoDePokemon(types);
}

let colorDelTipoDePokemon = types => {

    pokeTypes.innerHTML = '';

    types.forEach(type => {

        let typeTextElement = document.createElement("div");

        typeTextElement.style.background = colores[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);

    });
}

let noEncontrado = () => {

    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'img/poke-shadow.png');
    pokeImg.style.background = '#fff';

    pokeTypes.innerHTML = '';
    pokeInfo.innerHTML = '';
}

//-----------------------------------------------ENCUENTRA-TU-COMPAÑERO-----------------------------------------------------------------------------

let diaValue = document.querySelector("#diaNacimiento");
let mesValue = document.querySelector("#mesNacimiento");
let nombreValue = document.querySelector("#nombreUsuario");
let btnEncontrar = document.querySelector("#btnEncontrar");
let imgCompaniero = document.querySelector(".img-compañero");
let nombreIdpokemon = document.querySelector("#nombreIdpokemon");

let companieroInfo = document.querySelector("#conpanieroInfoMuestra");
let companieroTypes = document.querySelector("#companieroTypesMuestra");

let errorDia = document.querySelector("#errorDia");
let errorMes = document.querySelector("#errorMes");
let errorNombre = document.querySelector("#errorNombre");
let errorGeneral = document.querySelector("#errorGeneral");

btnEncontrar.addEventListener("click", quePokemonEres);
diaValue.addEventListener("keyup", evaluarDia);
mesValue.addEventListener("keyup", evaluarMes);
nombreValue.addEventListener("keyup", evaluarNombre);

let colorDelTipoDePokemonCompaniero = types => {

    companieroTypes.innerHTML = '';

    types.forEach(type => {

        let typeTextElement = document.createElement("div");

        typeTextElement.style.background = colores[type.type.name];
        typeTextElement.textContent = type.type.name;

        companieroTypes.appendChild(typeTextElement);

    });
}

function quePokemonEres() {

    let dia = diaValue.value;
    let mes = mesValue.value;
    let nombre = nombreValue.value;

    if (dia.length == 0) {    // || 

        diaValue.style.borderColor = 'salmon';
        errorGeneral.textContent = 'Debe de completar el o los campos vacios';
    }
    if (mes.length == 0) {    // || 

        mesValue.style.borderColor = 'salmon';
        errorGeneral.textContent = 'Debe de completar el o los campos vacios';
    }
    if (nombre.length == 0) {    // || 

        nombreValue.style.borderColor = 'salmon';
        errorGeneral.textContent = 'Debe de completar el o los campos vacios';
    } else {

        diaValue.style.borderColor = 'black';
        mesValue.style.borderColor = 'black';
        nombreValue.style.borderColor = 'black';
        errorGeneral.textContent = ' ';
        errorDia.textContent = ' ';
        errorMes.textContent = ' ';
        errorNombre.textContent = ' ';
        diaValue.value = '';
        mesValue.value = '';
        nombreValue.value = '';

        let paso1 = dia * mes;
        console.log("paso1 " + paso1)

        let largoNombre = nombre.length;
        console.log("nombre " + largoNombre)

        let paso2 = largoNombre * paso1;
        console.log("paso2 " + paso2)

        let paso3 = paso2 / 2;

        console.log("paso3 " + paso3)

        while (paso3 >= 807) {

            paso3 /= 2;
            console.log("dentro del while " + paso3)
            //let idCompaniero = paso3;
        }

        console.log("fuera del while " + paso3)

        let url = `https://pokeapi.co/api/v2/pokemon/${Math.trunc(paso3)}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(pokemon => {

                let id = pokemon.id;
                let nombrePoke = pokemon.name;

                nombreIdpokemon.innerHTML = `<h3>${nombrePoke.charAt(0).toUpperCase() + nombrePoke.slice(1)}</h3>
                                    <p>#${id.toString().padStart(3, 0)}</p>`;


                companieroInfo.innerHTML = `
        <div id="info1Companiero">
            <div id="info2Companiero"> 
                <div>
                    <p>${pokemon.stats[0].stat.name.toUpperCase()}</p>
                    <p>Ataque</p>
                    <p>Defensa</p>
                    <p>Ataque Esp.</p>
                    <p>Defensa Esp.</p>
                    <p>Velocidad</p>
                </div>  
                <div>
                    <p>${pokemon.stats[0].base_stat}%</p>
                    <p>${pokemon.stats[1].base_stat}%</p>
                    <p>${pokemon.stats[2].base_stat}%</p>
                    <p>${pokemon.stats[3].base_stat}%</p>
                    <p>${pokemon.stats[4].base_stat}%</p>
                    <p>${pokemon.stats[5].base_stat}%</p>
                </div> 
            </div>
            <div id="info3Companiero">
                <progress id="file" max="150" value="${pokemon.stats[0].base_stat}"></progress>                                 
                <progress id="file" max="150" value="${pokemon.stats[1].base_stat}"></progress>                                
                <progress id="file" max="150" value="${pokemon.stats[2].base_stat}"></progress>                              
                <progress id="file" max="150" value="${pokemon.stats[3].base_stat}"></progress>                                
                <progress id="file" max="150" value="${pokemon.stats[4].base_stat}"></progress>                                
                <progress id="file" max="150" value="${pokemon.stats[5].base_stat}"></progress>
            </div>                             
        </div>`;

                colorDelTipoDePokemonCompaniero(pokemon.types);
                console.log(pokemon.types)

            });

        let imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Math.trunc(paso3)}.png`;

        imgCompaniero.setAttribute('src', imagen);
    }
}

function evaluarDia() {

    diaValue.textContent = "";
    let dia = this.value;

    if (isNaN(dia)) {

        this.value = "";
        errorDia.textContent = 'Solamente valores numéricos';
    } else if (dia <= 0 || dia >= 32) {

        this.value = "";
        errorDia.textContent = 'Rango no valido, del día 1 al 31';
    }
}
function evaluarMes() {

    mesValue.textContent = "";
    let mes = this.value;

    if (isNaN(mes)) {

        this.value = "";
        errorMes.textContent = 'Solamente valores numéricos';
    } else if (mes <= 0 || mes >= 13) {

        this.value = "";
        errorMes.textContent = 'Rango no valido, del mes 1 al 12';
    }
}
function evaluarNombre() {

    nombreValue.textContent = "";
    let nombre = this.value;

    if (!/^[a-zA-Z]+$/.test(nombre)) {

        this.value = "";
        errorNombre.textContent = 'No se permiten valores numéricos';
    }
}

//----------------------------JUEGO-DE-POKEMON----------------------------------------------------

let imagenPoke = document.querySelector(".image-dark");
let pokeIngresado = document.querySelector("#adivina");
let btnEnviar = document.querySelector("#adivinaEnviar");
let btnRecargar = document.querySelector("#recargarEnviar");

let msjGanador = document.querySelector("#mensajeGanador");
let msjAyuda = document.querySelector("#mensajeAyuda");

let randomGlobal = 0;
let cont = 0;

let cargarPokemon = () => {

    cont = 0;
    imagenPoke.style = 'filter: brightness(0) invert(0);';
    msjGanador.innerHTML = '';
    msjAyuda.innerHTML = '';
    pokeIngresado.value = '';

    randomGlobal = Math.floor(Math.random() * 806 + 1);
    //let url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomGlobal}`)
        .then(respuesta => respuesta.json())
        .then(pokemon => {

            let id = pokemon.id;
            let name = pokemon.species.name.toLowerCase();
            let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            //console.log(pokemon);
            imagenPoke.src = img;
            //document.getElementById("pokemon-image").title = name;

            //adivinarPokemon(name)
        });
};

cargarPokemon();

btnEnviar.addEventListener("click", adivinarPokemon);
btnRecargar.addEventListener("click", cargarPokemon);

let charCont = 0;

function adivinarPokemon() {

    let nombreBusqueda = pokeIngresado.value.toLowerCase();
    //console.log("nombre ingresado " + nombreBusqueda)
    //let nombrePokemon = "hola";

    if (nombreBusqueda == "") {

        console.log("LOS DATOS ESTAN VACIOS")
        msjAyuda.innerHTML = `<p>El campo se encuentra vacio</p>`;
    } else {

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomGlobal}`)
            .then(respuesta => respuesta.json())
            .then(pokemon => {

                let nombrePokemon = pokemon.species.name.toLowerCase();

                if (nombreBusqueda == nombrePokemon) {

                    imagenPoke.style.filter = 'none';
                    console.log("ADIVINASTE: " + nombreBusqueda)

                    msjGanador.innerHTML = `<h2 id="tituloAdivinaste">Felicitaciones adivinaste a <span style="color: red;">${nombrePokemon}</span></h2>`;

                } else if (nombreBusqueda !== nombrePokemon) {

                    cont++;
                    console.log("Nombre incorrecto " + cont)
                    let restantes = 3 - cont;
                    msjAyuda.innerHTML = `<p>Intentos para la primera pista: <span style="color: red;">${restantes}</span></p>`;

                    if (restantes <= 0) {
                        restantes = 0;
                        restantes = 6 - cont;
                        msjAyuda.innerHTML = `<p>Intentos para la segunda pista: <span style="color: red;">${restantes}</span></p>`;

                        if (restantes <= 0) {
                            restantes = 0;
                            restantes = 9 - cont;
                            msjAyuda.innerHTML = `<p>Intentos para la tercera pista: <span style="color: red;">${restantes}</span></p>`;

                            if (restantes <= 0) {
                                restantes = 0;
                                restantes = 12 - cont;
                                msjAyuda.innerHTML = `<p>Intentos para la última pista: <span style="color: red;">${restantes}</span></p>`;

                                if (restantes <= 0) {

                                    restantes = 0;
                                    restantes = 15 - cont;
                                    msjAyuda.innerHTML = `<p>Sin intentos restantes,</p><p>a <span style="color: red;">${restantes}</span> de ser mostrado</p>`;

                                    if (restantes <= 0) {

                                        imagenPoke.style.filter = 'none';
                                        pokeIngresado.value = '';
                                        msjAyuda.innerHTML = `<p>El pokémon era, <span style="color: red;">${nombrePokemon}</span></p>`;
                                    }
                                }
                            }
                        }
                    }
                }
                //---------------------------------------------------------------------------------------LETRAS----
                let letras = nombrePokemon.charAt(charCont);

                //---------------------------------------------------------------------------------------LETRAS----
                if (cont == 3) {

                    console.log("La primera letra es: " + letras)
                    msjAyuda.innerHTML = `<p>La primera letra es, <span style="color: red;">${letras}</span></p>`;
                    charCont++;
                } else if (cont == 6) {

                    console.log("La segunda letra es: " + letras)
                    msjAyuda.innerHTML = `<p>La segunda letra es, <span style="color: red;">${letras}</span></p>`;
                    charCont++;
                } else if (cont == 9) {

                    console.log("La tercera letra es: " + letras)
                    msjAyuda.innerHTML = `<p>La tercera letra es. <span style="color: red;">${letras}</span></p>`;
                    charCont++;
                } else if (cont == 12) {

                    console.log("La última letra es: " + nombrePokemon.charAt(nombrePokemon.length - 1))
                    msjAyuda.innerHTML = `<p>La última letra es, <span style="color: red;">${nombrePokemon.charAt(nombrePokemon.length - 1)}</span></p>
                                            <p>El largo del nombres es de, <span style="color: red;">${nombrePokemon.length}</span></p>`;
                    charCont = 0;
                }
            });
    }
}

/*--------------------------------------------------MODAL-CARD-POKEMON--------------------------------------------------------------*/

pokeBusqueda.addEventListener("click", validar);

let mostrarPestaniaModalError = document.querySelector("#pestaniaModalError");
let mostrarModalDeVerificacion = document.querySelector("#msjError");

function cerrarModalDeVerificacion() {

    mostrarPestaniaModalError.style.visibility = `hidden`;
    mostrarModalDeVerificacion.style.visibility = `hidden`;
}

/*---------------------------------------------VALIDAR-MODAL-----------------------------------------------------------*/

let btCerrarModalDeVerificacion = document.querySelector("#cerrarMsjError");
btCerrarModalDeVerificacion.addEventListener('click', cerrarModalDeVerificacion);

function validar() {

    mostrarPestaniaModalError.style.visibility = `visible`;
    mostrarModalDeVerificacion.style.visibility = `visible`;

    buscarPokemon()
}

//----------------------------------------------------------------------------------

let mostrarInfoCuriosidad1 = document.querySelector("#curiosidades1");
let infoCuriosidad1 = document.querySelector("#infoCuriosidad1");
let contenedorInfoCuriosidad1 = document.querySelector("#contenedorInfoCuriosidad1");

mostrarInfoCuriosidad1.addEventListener("mouseenter", mostrarCuriosidad1);
mostrarInfoCuriosidad1.addEventListener("mouseleave", ocultarCuriosidad1);


function mostrarCuriosidad1() {

    infoCuriosidad1.style.visibility = `visible`;
    contenedorInfoCuriosidad1.style.visibility = `visible`;

}

function ocultarCuriosidad1() {

    infoCuriosidad1.style.visibility = `hidden`;
    contenedorInfoCuriosidad1.style.visibility = `hidden`;

}

//----------------------------------------------------------------------------------

let mostrarInfoCuriosidad2 = document.querySelector("#curiosidades2");
let infoCuriosidad2 = document.querySelector("#infoCuriosidad2");
let contenedorInfoCuriosidad2 = document.querySelector("#contenedorInfoCuriosidad2");


mostrarInfoCuriosidad2.addEventListener("mouseenter", mostrarCuriosidad2);
mostrarInfoCuriosidad2.addEventListener("mouseleave", ocultarCuriosidad2);

function mostrarCuriosidad2() {

    infoCuriosidad2.style.visibility = `visible`;
    contenedorInfoCuriosidad2.style.visibility = `visible`;

}

function ocultarCuriosidad2() {

    infoCuriosidad2.style.visibility = `hidden`;
    contenedorInfoCuriosidad2.style.visibility = `hidden`;

}

//----------------------------------------------------------------------------------

let mostrarInfoCuriosidad3 = document.querySelector("#curiosidades3");
let infoCuriosidad3 = document.querySelector("#infoCuriosidad3");
let contenedorInfoCuriosidad3 = document.querySelector("#contenedorInfoCuriosidad3");


mostrarInfoCuriosidad3.addEventListener("mouseenter", mostrarCuriosidad3);
mostrarInfoCuriosidad3.addEventListener("mouseleave", ocultarCuriosidad3);

function mostrarCuriosidad3() {

    infoCuriosidad3.style.visibility = `visible`;
    contenedorInfoCuriosidad3.style.visibility = `visible`;

}

function ocultarCuriosidad3() {

    infoCuriosidad3.style.visibility = `hidden`;
    contenedorInfoCuriosidad3.style.visibility = `hidden`;

}

//----------------------------------------------------------------------------------

let mostrarInfoCuriosidad4 = document.querySelector("#curiosidades4");
let infoCuriosidad4 = document.querySelector("#infoCuriosidad4");
let contenedorInfoCuriosidad4 = document.querySelector("#contenedorInfoCuriosidad4");


mostrarInfoCuriosidad4.addEventListener("mouseenter", mostrarCuriosidad4);
mostrarInfoCuriosidad4.addEventListener("mouseleave", ocultarCuriosidad4);

function mostrarCuriosidad4() {

    infoCuriosidad4.style.visibility = `visible`;
    contenedorInfoCuriosidad4.style.visibility = `visible`;

}

function ocultarCuriosidad4() {

    infoCuriosidad4.style.visibility = `hidden`;
    contenedorInfoCuriosidad4.style.visibility = `hidden`;

}

//---------------------------------EVOLUCIONES-------------------------------------------

let imagenPokeEvolucion1 = document.querySelector(".img-evolucion1");
let imagenPokeEvolucion2 = document.querySelector(".img-evolucion2");
let imagenPokeEvolucion3 = document.querySelector(".img-evolucion3");
let errorMensaje = document.querySelector("#errorMensaje");

let nombreIdpokemon1 = document.querySelector("#nombreIdpokemon1");
let nombreIdpokemon2 = document.querySelector("#nombreIdpokemon2");
let nombreIdpokemon3 = document.querySelector("#nombreIdpokemon3");

let buscarEvolucion = document.querySelector("#buscarEvolucion");
let btnEvolucion = document.querySelector("#busquedaEvolucion");

btnEvolucion.addEventListener("click", mostrarCadenaEvolutiva);

function mostrarCadenaEvolutiva() {

    let nombreBusqueda = buscarEvolucion.value.toLowerCase();

    if (buscarEvolucion.value == "") {

        console.log("LOS DATOS ESTAN VACIOS EVOLUCION")
        //alert("campo vacio")
        errorMensaje.textContent = 'El campo se encuentra vacio';
    } else {

        errorMensaje.textContent = '';
        buscarEvolucion.value = '';

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombreBusqueda}`)
            .then(respuesta => respuesta.json())
            .then(pokemon1 => {

                let urlPrimeraEvolucion = pokemon1.evolution_chain.url;
                //console.log(urlPrimeraEvolucion)

                fetch(urlPrimeraEvolucion)
                    .then(respuesta => respuesta.json())
                    .then(pokemon2 => {

                        let urlSegundaEvolucion = pokemon2.chain.evolves_to[0].species.url;
                        //console.log("evolucion " + urlSegundaEvolucion)
                        //console.log("Segunda Evo " + pokemon2.chain.evolves_to[0].species.name)

                        //let urlSegundaEvolucion = `https://pokeapi.co/api/v2/pokemon-species/${pokemon2.chain.evolves_to[0].species.name}`
                        fetch(urlSegundaEvolucion)
                            .then(respuesta => respuesta.json())
                            .then(pokemon3 => {

                                //console.log("Tercera Evo " + pokemon3)
                                //console.log("Tercera Evo " + pokemon3.evolves_from_species.name)

                                let idPoke1 = pokemon1.id;
                                let idPoke2 = pokemon3.id;
                                let idPoke3 = pokemon3.id + 1;
                                let imgPoke1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPoke1}.png`;
                                let imgPoke2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPoke2}.png`;
                                let imgPoke3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPoke3}.png`;

                                imagenPokeEvolucion1.src = imgPoke1;
                                imagenPokeEvolucion2.src = imgPoke2;
                                imagenPokeEvolucion3.src = imgPoke3;


                                nombreIdpokemon1.innerHTML = `<p>#${idPoke1.toString().padStart(3, 0)}</p>`;
                                nombreIdpokemon2.innerHTML = `<p>#${idPoke2.toString().padStart(3, 0)}</p>`;
                                nombreIdpokemon3.innerHTML = `<p>#${idPoke3.toString().padStart(3, 0)}</p>`;

                                //});
                            });
                    });
            });
    }

}