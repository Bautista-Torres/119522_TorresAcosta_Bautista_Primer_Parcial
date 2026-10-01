/*
6.(2pts) Modificar el retorno del método createHtmlElement ( ) para que:
a. Al clickear la imagen, se abre en otra pestaña el link contenido en el atributo url de
la clase Serie.
b. Agregar un botón debajo de la información de la serie que posea el texto
“ guardar ” y llame al método guardarSerie() .
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
