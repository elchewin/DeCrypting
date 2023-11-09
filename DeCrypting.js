// ==UserScript==
// @name         DECRIPTER
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    // Función para obtener y mostrar las letras mayúsculas
    function almacenarMayusculas(texto) {
        const mayusculas = texto.match(/[A-Z]/g);
        return mayusculas.join("");
    }

    // Función para obtener y mostrar los IDs de los elementos <div> y contarlos
    function obtenerIDsDeDivs() {
        const divs = document.querySelectorAll('div');
        const divIDs = Array.from(divs).map(div => div.id);
        return divIDs;
    }

    function decrypt(clave, textoCifradoArray) {
        const textoDescifradoArray = [];

        for (let i = 0; i < textoCifradoArray.length; i++) {
            const textoCifrado = textoCifradoArray[i];
            const textoCifradoBytes = CryptoJS.enc.Base64.parse(textoCifrado)
            const descifrado = CryptoJS.TripleDES.decrypt({ ciphertext: textoCifradoBytes }, CryptoJS.enc.Utf8.parse(clave), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            const textoDescifrado = descifrado.toString(CryptoJS.enc.Utf8);
            textoDescifradoArray.push(textoDescifrado);
        }

        return textoDescifradoArray;
    }

    //Selecciona el elemento
    const elemento = document.querySelector('p');
    //Aplica la funcion de almacenar mayusculas al elemento
    const key = almacenarMayusculas(elemento.textContent);
    console.log('La llave es: ' + key);

    // Llama a la función para obtener
    const cifrado = obtenerIDsDeDivs();
    console.log('los mensajes cifrados son: ' + cifrado.length);

    //decifro el texto
    const textoDescifradoArray = decrypt(key, cifrado);
    for (let i = 0; i < cifrado.length; i++) {
        console.log(cifrado[i]+" "+textoDescifradoArray[i]); // Imprime cada elemento del arreglo en la consola
    }

    // Crear un elemento <pre> para mantener el formato de los saltos de línea
    const contenedor = document.createElement("pre");
    // Recorrer el arreglo y agregar cada elemento al contenedor
    textoDescifradoArray.forEach(elemento => {
        contenedor.appendChild(document.createTextNode(elemento + '\n'));
    });
    // Insertar el contenedor en el cuerpo de la página
    document.body.appendChild(contenedor);
})();