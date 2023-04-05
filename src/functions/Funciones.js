/**
 * Genera una Identificador unico
 * @returns Devuelve un Numero
 */
const generarUUID = () => {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  };
  
/**
 * Devuelve la posicion exacta del cursor
 * @returns Devuelve un Numero
 */
const getPosition = ()=>{
  if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.getRangeAt) {
        return sel.getRangeAt(0).endOffset;
        //return sel.getRangeAt(0).startOffset;
      }
  }
  return null;
}

/**
 * Realiza una peticion get a un servidor mediante una URL
 * @param {String} url Pasas la URL que se quiera consumir
 * @returns Devuelve una Promesa con los datos del Servidor
 */
const cogerDatos = (url)=>{
    return fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => datos);
}

export { generarUUID, getPosition, cogerDatos };