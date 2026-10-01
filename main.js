/*5. (3pts) En el archivo main.js crear los métodos:
a. paginaSiguiente() que permite traer las próximas 6 series de la api. Este eliminará
del documento las series ya insertadas e insertará las nuevas.
b. paginaAnterior() que permite traer las 6 anteriores series de la api (si es que hay
anteriores). Este eliminará del documento las series ya insertadas e insertará las
nuevas.
c. Asignar los métodos creados a los botones con ids “ anterior ” y “ siguiente ”.
 */

document.addEventListener("DOMContentLoaded", () => {
    const contenedorSeries = document.getElementById("series");
    const btnAnterior = document.getElementById("anterior");
    const btnSiguiente = document.getElementById("siguiente");

    let idInicial = 1; 
    const cantidadPorPagina = 6; 

    async function cargarSeries() {
        contenedorSeries.innerHTML = "";

        try {
            for (let i = 0; i < cantidadPorPagina; i++) {
                const id = idInicial + i; 
                
                const respuesta = await fetch("https://api.tvmaze.com/shows/" + id);

                if (!respuesta.ok) {
                    throw new Error("Error al obtener la serie " + id);
                    continue;
                }

                const data = await respuesta.json();

                let urlImagen = "";
                if (data.image){
                    urlImagen = data.image.medium
                }

                const nuevaSerie = new Serie(
                    data.id, 
                    data.url, 
                    data.name, 
                    data.language, 
                    data.genres, 
                    urlImagen
                );

                const tarjetaHtml = nuevaSerie.createHtmlElement();
                if (contenedorSeries) {
                    contenedorSeries.appendChild(tarjetaHtml);
                }
            }
        } catch (error) {
            console.error("Error al cargar las series:", error);
        }
    }

    function paginaSiguiente() {
        idInicial += cantidadPorPagina; 
        cargarSeries(); 
    }

    function paginaAnterior() {
        if (idInicial > 1) {
            idInicial -= cantidadPorPagina; 
            cargarSeries();
        }
    }

    btnSiguiente.addEventListener("click", paginaSiguiente);
    btnAnterior.addEventListener("click", paginaAnterior);

    cargarSeries();
});