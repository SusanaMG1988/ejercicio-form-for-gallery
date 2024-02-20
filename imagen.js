// Al cargar la página, llamamos a inicializarDetallesImagen
window.onload = inicializarDetallesImagen // TODO 完了

// Inicializamos variables globales
var imgID = null
var token = null
var userID = null
var userName = null
var animacionCarga = null
var marcoImagen = null
var btnLikeImage = null
var datosImagen = null
var nuevoComentario = null
var timeoutCargarDetalles = null

/**
 * Se ejecuta una vez al cargar la página.
 */
function inicializarDetallesImagen() {
  imgID = getImageID()
  // Si no existe o no es válido el ID de la imagen en la URL, se redirige a gallery.html
  if (isNaN(imgID) || imgID <= 0) {
    window.location = 'galeria.html' // TODO 完了
  } else {
    // Se inicializan variables globales desde localStorage: token, userID y userName
    token = localStorage.getItem('token') // TODO 完了
    userID = localStorage.getItem('userID') // TODO 完了
    userName = localStorage.getItem('userName') // TODO 完了

    // Se inicializan variables DOM
    animacionCarga = document.querySelector('.loading')
    marcoImagen = document.querySelector('figure.image')
    btnLikeImage = document.getElementById('btnLikeImage')

    // Se inicializan Eventos
    btnLikeImage.addEventListener('click', onClickLike)

    // Se piden los detalles de la imagen al servidor
    cargarDetallesImagen()

    // Se pide al servidor si el usuario Likes la imagen
    comprobarUsuarioLikesImagen()

    // Se inicilizan los comentarios
    inicializarComentarios()
  }
}

/**
 * Esta función devuelve el ID de la image de la URL
 * ?image_id=1 devuelve el valor del parámetro de URL image_id, 1 como Number, no como string
 * Los parametros de la URL están en: window.location.search
 */
function getImageID() {
  imgID = window.location.search.replace('?image_id=', '')
  // TODO Se puede implementar trabjando con strings 完了
  // TODO o mediante expresiones regulares
  return Number(imgID)
}

/**
 * Solicitar al Servidor los detalles de la imagen
 */
/* Solicitar al Servidor los detalles de la imagen
 */
function cargarDetallesImagen() {
  // Petición GET al servidor para recuperar los datos de la imagen
  // TODO 完了
  axios.get(apiPrefix + 'gallery/images/' + imgID + '/?token=' + token + '&account_id=' + userID).then(
    function (response) {
      // Petición OK
      // Los datos se recuperan y guardan en la variable global: datosImagen
      localStorage.setItem('datosImagen', response.data) // TODO 完了
      datosImagen = response.data

      // Se oculta la animacionCarga
      animacionCarga.classList.add('is-hidden')
      // Se busca el elemento img de la página
      var img = marcoImagen.querySelector('img')
      // Se cambia el atributo SRC de la imagen con la url de la imagen
      img.setAttribute('src', datosImagen.highres_url) // TODO 完了, reemplazar null por la URL de la imagen
      // Se cambia el artributo ALT con la descripción de la imagen
      img.setAttribute('alt', datosImagen.description) // TODO 完了, reemplazar null por la descripción de la imagen
      // Cargamos la descripción de la imagen en tagDescripcion
      document.getElementById('tagDescripcion').innerText = img.alt // TODO 完了, reemplazar null por la descripción de la imagen
      // Cargamos el número de likes en tagNumLikes
      document.getElementById('tagNumLikes').innerText = datosImagen.num_likes // TODO 完了, reemplazar null por el número de likes de la imagen
      // Cargamos el número de comentarios en tagNumComentarios
      document.getElementById('tagNumComentarios').innerText = datosImagen.num_comments // TODO 完了, Buscar el elemento tag de número de comentarios y asignar el valor de número de comentarios de la imagen

      // Si existe un timeout de regarga, lo reseteamos
      if (timeoutCargarDetalles) {
        clearTimeout(timeoutCargarDetalles)
      }
      // Cargamos los detalles cada minuto
      timeoutCargarDetalles = setTimeout(cargarDetallesImagen, 60000) // TODO 完了

    }).catch(
    // Petición Error
    // TODO 完了
    function (error) {
      console.log('Error cargando datos', error)
      // Si hay un error ocultamos la animación de carga
      animacionCarga.classList.add('is-hiden')
      // Habría que mostrar un mensaje de error de carga
      document.getElementById('msgError').classList.remove(is - hidden)
    }
  )

}

/**
 * Esta función pide al servidor si el usuario actual Likes la imagen abierta
 */
function comprobarUsuarioLikesImagen() {
  // Petición GET para recuperar el estado de Like
  axios.get(apiPrefix + 'gallery/images/' + imgID + '/likes/?token=' + token + '&account_id=' + userID).then(
    function (response) {
      // Si OK
      btnLikeImage.classList.add('is-liked')
    }
  ).catch(
    function (error) {
      if (error.response.status === 404) {
        // Ocultar el corazón completo eliminando del botón btnLikeImage la clase 'is-liked'// TODO 完了
        // Mostrar el corazón completo añadiendo al botón btnLikeImage la clase 'is-liked'// TODO  完了
        //return document.getElementById('btnLikeImage').
        // document.getElementById('btnLikeImage').classList.add('is-liked')
        // Si es otro error, mostrar el error en consola
        btnLikeImage.classList.remove('is-liked')
        // TODO 完了
        // response.status == 404 ? console.log('error 404') : console.log('no es error 404, ha petao')

      } else {
        console.log('han petao los likes ¬¬ : ' + error)
      }
    })
}
/**
 * Función que gestión los clicks del botón btnLikeImage
 */
function onClickLike() {
  // Si actualmente la imagen está Liked por el usuario actual, llamar a unLikeImagen()
  if (btnLikeImage.classList.contains('is-liked')) {
    unLikeImagen()
    // TODO 完了
  } else
    // Si no, es decir, la imagen no está Liked por el usuario actual, llamar a likeImagen()
    // TODO 完了
    likeImagen()
}

/**
 * Esta función hace un POST al servidor para likear la imagen
 */
function likeImagen() {
  // Petición POST
  // TODO 完了
  // Petición OK
  axios.post(apiPrefix + 'gallery/images/' + imgID + '/likes/?token=' + token + '&account_id=' + userID).then(function (response) {
    // Actualizar el estado del corazón y recargarlos detalles de la imagen.
    // TODO 完了

    // btnLikeImage.classList.remove('is-not-liked')
    // btnLikeImage.classList.add('is-liked')
    cargarDetallesImagen()
    comprobarUsuarioLikesImagen()

  }).catch(function (error) {
    // Si error, mostrar el error en consola
    // TODO 完了
    console.log('ha habido un error al darle like' + error)
  })

}

/**
 * Esta función elimina el Like de la imagen del usuario actual mediante una petición DELETE
 */
function unLikeImagen() {
  // Petición DELETE
  // TODO 完了
  // Petición OK
  axios.delete(apiPrefix + 'gallery/images/' + imgID + '/likes/?token=' + token + '&account_id=' + userID).then(function (response) {
    // Actualizar el estado del corazón y recargarlos detalles de la imagen.
    // TODO 完了
    //if (response.status == 200) {
    // btnLikeImage.classList.remove('is-liked')
    // btnLikeImage.classList.add('is-not-liked')
    cargarDetallesImagen()
    comprobarUsuarioLikesImagen()
    //}
  }).catch(function (error) {
    // Si error, mostrar el error en consola
    // TODO 完了
    console.log('ha habido un error al darle like' + error);
  })
}

/**
 * Inicializa los elementos para comentarios
 */
/**
 * Inicializa los elementos para comentarios
 */
function inicializarComentarios() {
  // Inicializar variables con objetos del DOM
  nuevoComentario = document.getElementById('nuevoComentario') // TODO inicializar variable 完了
  nuevoComentario.querySelector('.autorUsuario').innerText = userName
  nuevoComentario.querySelector('textarea').addEventListener('input', validarComentario)
  nuevoComentario.querySelector('button').addEventListener('click', onNuevoComentarioClick)
  // Cargar los comentarios
  cargarComentarios()
}

/**
 * Función que solicita y carga en pantalla los comentarios
 */
function cargarComentarios() {
  // Petición GET al servidor para cargar los comentarios
  // TODO
  var URLComentarios = apiPrefix + 'gallery/images/' + imgID + '/comments/?token=' + token + '&account_id=' + userID
  axios.get(URLComentarios)
    .then(
      function (response) {
        // Inicializar los elementos necesarios del DOM
        var plantillaComentario = document.getElementById('plantillaComentario')
        var marcoComentarios = document.getElementById('marcoComentarios')
        // Elminamos los comentarios cargados anteriormente
        marcoComentarios.querySelectorAll('.comentario:not(#plantillaComentario)').forEach(c => c.remove())
        moment.locale('es')
        // Para cada comentario, generar un comentario.
        // TODO
        for (var index in response.data) {
          //console.log('Este es el comentario' + index_comentario)
          // console.log(response.data[index_comentario])
          var datosComentario = response.data[index]// TODO
          var newCom = document.createElement('article')
          newCom.classList.add('media', 'comentario')
          newCom.innerHTML = plantillaComentario.innerHTML
          newCom.querySelector('.contenido').innerText = datosComentario.comment// TODO 
          newCom.querySelector('.tiempo').innerText = moment.duration(moment(datosComentario.datetime).diff(moment())).humanize()
          newCom.querySelector('.autorUsuario').innerText = datosComentario.username // TODO username
          newCom.querySelector('.autorUsuario').setAttribute('href', 'usuario.html?user_id=' + datosComentario.user_id)
          newCom.querySelector('.autorNombre').innerText = datosComentario.fullname // TODO fullname
          // Si el usuario actual es el autor del comentario...
          // TODO
          //var isCurrentUserComment
          if (userName === datosComentario.username) {
            // mostrar el botón eliminar
            // TODO
            var btnEliminar = newCom.querySelector('button.is-danger')

            // guardamos la referencia a los datos del comentario en el botón de eliminar
            btnEliminar.comentario = datosComentario// TODO
            // añadimos un evento click al botón para que llame a la función eliminarComentario si se hace click
            // TODO
            btnEliminar.addEventListener('click', eliminarComentario)
            // Si no es el usuario actual el autor
          } else {// TODO
            // Ocultar el botón eliminar
            // TODO
            var btnEliminar = newCom.querySelector('button.is-danger')
            btnEliminar.classList.add('is-hidden')
          }
          // Se inserta el comentario en la lista de comentarios
          marcoComentarios.insertBefore(newCom, nuevoComentario)
        }
        // Se recargan los comentarios cada minuto
        // TODO
        setTimeout(cargarComentarios, 60000)
        // Petición ERROR
        // Mostrar en consola el error de carga de comentarios
      }).catch(  // TODO
        function (error) {
          console.log('Error en los comentarios' + error)
        })
}

/**
 * Validación del TextArea del comentario
 * @param {HTMLTextAreaElement} input 
 */
function validarComentario(input) {
  // Si input es un evento...
  if (input instanceof Event) {
    // acceder al campo del evento
    input = input.target
  }
  // Validar que el contenido tiene entre 3 y 1000 carácteres
  var valido = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_?\-=\+\*!\$]).{3,1000})$/.test(input.value)// TODO

  // Ocultamos los mensajes de validación
  nuevoComentario.querySelectorAll('.help').forEach(h => h.classList.add('is-hidden'))
  var errorComent = document.querySelector('.help.is-danger')
  var comentarioValido = document.querySelector('.help.is-success')
  if (valido) {
    // Mostramos el mensaje de OK si la validación es satisfactoria
    comentarioValido.classList.remove('is-hidden')// TODO
  } else {
    // Mostramos el mensaje de Error si la validación falla
    errorComent.classList.remove('is-hidden')// TODO
  }

  // Devolvemos el resultado de la validación
  return valido
}

/**
 * Función para gestionar el click del botón de crear nuevo comentario
 */
function onNuevoComentarioClick() {
  // Inicializamos una variable con el textarea
  var areaComentario = nuevoComentario.querySelector('textarea')
  // Validamos el text area antes de continuar
  // TODO
  validarComentario(areaComentario.value)
  // Accedemos al botón del comentario y mostramos animación de carga
  var botonComentario = nuevoComentario.querySelector('button')
  // Mostrar animación de carga en el botón
  botonComentario.classList.add('is-loading')
  // Desactivar el textarea
  areaComentario.setAttribute('disabled', 'disabled')
  var comentario = areaComentario.value.trim()
  // Preparar el objeto comentario para enviarlo al servidor
  var datosComentario = {// TODO
    user_id: Number(userID), //debe ser numero
    image_id: imgID,
    comment: comentario
  }
  // Petición POST al servidor con los datos del comentario
  // TODO
  axios.post(apiPrefix + 'gallery/images/' + imgID + '/comments/?token=' + token + '&account_id=' + userID, datosComentario)
    // Petición OK
    // TODO
    .then(
      function (response) {
        // Si la petición funciona
        // Reiniciar los campos del comentario: valor, activo y validación
        areaComentario.value = ''
        areaComentario.removeAttribute('disabled')
        // Quitar al botón la animación de carga
        botonComentario.classList.remove('is-loading')
        nuevoComentario.querySelectorAll('.help').forEach(h => h.classList.add('is-hidden'))
        // Cargar de nuevo los comentarios y los detalles de la imagen
        // TODO 
        inicializarComentarios()
        // TODO
        cargarDetallesImagen()
      }
    ).catch(
      // Petición ERROR
      function (error) {//TODO
        // Si falla la petición, mostrar el error en consola
        console.log('Error del comentario', error)
        // Habilitar de nuevo el campo y el botón
        areaComentario.removeAttribute('disabled')
        botonComentario.classList.remove('is-loading')
      })
}

/**
 * Elemina un comentario del usuario actual
 */
function eliminarComentario() {
  // Extraer el ID del comentario a borrar
  var borrarComentario = this.comentario.id
  var getURL = apiPrefix + 'gallery/images/' + imgID + '/comments/' + borrarComentario + '/?token=' + token + '&account_id=' + userID
  // TODO
  // Petición DELETE para borrar el comentario
  axios.delete(getURL)// TODO
    // Si se elimina el comentario
    // Cargar de nuevo los comentarios y los detalles de la imagen
    // TODO
    .then(
      function (response) {
        cargarComentarios()
        cargarDetallesImagen()
      })

    // Si falla la petición, mostrar el error en consola
    .catch(
      // TODO
      function (error) {
        console.log('Error en la peticion' + error)
      })
}
