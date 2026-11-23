# CV web interactivo – Bernardo David Egert

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks ni backend.

## Cómo ejecutarlo
1. Abrí la carpeta en Visual Studio Code.
2. Abrí `index.html` en el navegador (doble clic) **o**, mejor, con la extensión *Live Server* (clic derecho > Open with Live Server).
3. Necesita internet para cargar las tipografías de Google Fonts y la biblioteca del libro (StPageFlip, vía CDN jsDelivr).

## Formulario de contacto (FormSubmit)
- Envía a `profedavidegert@gmail.com` mediante FormSubmit (AJAX).
- **Primera vez:** FormSubmit envía un correo de activación a esa casilla; hay que confirmarlo. Hasta entonces el formulario mostrará un error (no simula envíos).
- Funciona desde un sitio publicado (http/https) o Live Server. Abierto como `file://` el navegador bloquea el envío; el sitio lo avisa y ofrece un enlace `mailto`.
- Para publicarlo gratis: GitHub Pages, Netlify o Vercel (subiendo la carpeta tal cual).

## Estructura
- `index.html` – página principal
- `css/styles.css` – estilos
- `js/script.js` – navegación, animaciones, datos y filtros de certificaciones
- `js/flipbook.js` – libro digital (portada, 12 páginas, contraportada)
- `js/contact.js` – validación y envío del formulario
- `assets/images/david-egert.png` – tu fotografía, recuperada del CV (recortada en círculo)

## Editar contenido
- Certificaciones: arreglo `CERTS` en `js/script.js` (se actualizan tarjetas y libro).
- Otros textos del libro: `js/flipbook.js`.
- WhatsApp: enlace `wa.me/543794272394` en `index.html`.
