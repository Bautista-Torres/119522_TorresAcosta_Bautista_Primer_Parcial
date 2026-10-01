/*
7.(1pts) Crear el método de clase guardarSerie(serie) de la clase Serie, el cuál guardará la
serie seleccionada en un array del localstorage.
*/ 

class Serie{
    constructor(id, url, name, language, genres, image){
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString(){
        return JSON.stringify(this);
    }

    static createFromJsonString(jsonString){
        const data = JSON.parse(jsonString);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    static guardarSerie(serie){
        let listaGuardadas = [];
        const datosEnStorage = localStorage.getItem("seriesGuardadas");

        if (datosEnStorage){
            listaGuardadas = JSON.parse(datosEnStorage);
        }
        listaGuardadas.push(serie);

        localStorage.setItem("serieGuardadas:", JSON.stringify(listaGuardadas));
        console.log("Se Guardo en LocalStorage: "+ serie.name);
    }

    createHtmlElement(){
        const card = document.createElement("article");

        const enlaceElement = document.createElement("a");
        enlaceElement.href = this.url;
        enlaceElement.target = "_blank";

        const imgElement = document.createElement("img");
        imgElement.src = this.image;
        imgElement.alt = "Imagen de la serie" + this.name;
        imgElement.style.width = "100%";
        enlaceElement.appendChild(imgElement);
        card.appendChild(imgElement);

        const tituloElement = document.createElement("h3");
        tituloElement.textContent = this.name;
        card.appendChild(tituloElement);

        const languageElement = document.createElement("p");
        languageElement.textContent = "Idioma: " + this.language;
        card.appendChild(languageElement);

        const genresElement = document.createElement("p");
        let textoGeneros = "Sin Genero";
        if (this.genres){
            textoGeneros = this.genres.join(", ");
        }
        genresElement.textContent = "Genero: " + this.genres.join(", ");
        card.appendChild(genresElement);

        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "guardar";

        btnGuardar.addEventListener("click", () =>{
            this.guardarSerie();
        })

        card.appendChild(btnGuardar);

        return card;
    }

    guardarSerie(){
        console.log("Serie Guardada: " + this.name);
    }
}
