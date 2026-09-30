/*4.(3pts) Crear el archivo main.js que se encargue de: 
a. Al momento de cargar la página, utilizar el método fetch para traer 6 series de la api: https://www.tvmaze.com/api#shows. 
Ejemplos: https://api.tvmaze.com/shows/1 
https://api.tvmaze.com/shows/2 
https://api.tvmaze.com/shows/3 
etc. 
b. Utilizar los datos que traen los fetch para instanciar objetos de la clase Serie. 
c. Utilizar los objetos de la clase Serie para llamar al método createHtmlElement() e insertar en el DOM dichos elementos como hijos del elemento con id=series. 
 */

document.addEventListener("DOMContentLoaded", async () => {
    const contenedorSeries = document.getElementById("series");
    const idsSeries = [1, 2, 3, 4, 5, 6];

    try{
        for (const id of idsSeries){
            const respuesta = await fetch("https://api.tvmaze.com/shows/" + id);

            if (!respuesta.ok){
                throw new Error("Error al obtener la serie " + id);
            }

            const data = await respuesta.json();

            const nuevaSerie = new Serie(data.id, data.url, data.name, data.language, data.genres, data.image.medium);

            const tarjetaHtml = nuevaSerie.createHtmlElement();
            if (contenedorSeries){
                contenedorSeries.appendChild(tarjetaHtml);
            }
        }
    } catch (error){
        console.error("Error al cargar las series:", error)
    }
});