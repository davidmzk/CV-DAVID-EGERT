/* Libro digital – CV interactivo (StPageFlip vía CDN) */
(function () {
  const overlay = document.getElementById('bookOverlay'), host = document.getElementById('book');
  const num = document.getElementById('bNum'), fail = document.getElementById('bookFail');
  let pf = null, lastFocus = null;

  const pageNo = n => `<div class="pn">${n}</div>`;
  const wrap = (cls, inner, n, hard) =>
    `<div class="pg ${cls}" ${hard ? 'data-density="hard"' : ''}><div class="in">${inner}</div>${n ? pageNo(n) : ''}</div>`;
  const head = (a, b) => `<h2>${a} <em>${b}</em></h2><div class="rule"></div>`;

  function certPages() {
    const per = 7, out = [];
    for (let i = 0; i < CERTS.length; i += per) {
      const chunk = CERTS.slice(i, i + per);
      const items = chunk.map(c => `<div class="c"><i>${c[2]}${c[3] ? ' · ' + c[3] : ''}</i><b>${c[0]}</b>${c[1] ? `<span>${c[1]}${c[5] ? ' · ' + c[5] : ''}</span>` : (c[5] ? `<span>${c[5]}</span>` : '')}</div>`).join('');
      out.push({ title: i === 0, items });
    }
    return out;
  }

  function buildPages() {
    const p = [];
    p.push(`<div class="pg cover" data-density="hard"><div class="in">
      <div class="ph"><img src="assets/images/david-egert.png" alt="Bernardo David Egert"></div>
      <p class="k">Curriculum Vitae</p>
      <h3>Bernardo David <em>Egert</em></h3>
      <p class="s">Profesor de Educación Secundaria en Informática · Docente de Programación</p>
      <p class="y">CORRIENTES · ARGENTINA</p></div></div>`);

    p.push(wrap('l', head('Perfil', 'profesional') +
      `<p>Profesor de Educación Secundaria en Informática, con experiencia comprobable en planificación y dictado de clases y cursos de formación en programación e informática.</p>
       <p>Experiencia docente en nivel primario, secundario y terciario, especialmente en la asignatura Lenguajes de Programación para el Profesorado de Informática.</p>
       <p>Sólidos conocimientos de programación con Scratch y Python, además de fundamentos de lógica de programación, JavaScript y Java.</p>
       <p>Perfil orientado a la enseñanza práctica, la resolución de problemas, la integración de tecnologías digitales y el uso pedagógico de herramientas de inteligencia artificial. He realizado juegos en Scratch y soy diseñador web front end.</p>
       <h5>Contacto</h5><p class="sm">Corrientes Capital, Argentina<br>379-4272394<br>profedavidegert@gmail.com<br>mzksistem@gmail.com</p>`, 2));

    p.push(wrap('r', head('Competencias', 'docentes y tecnológicas') +
      `<ul>
        <li><b>Docencia de programación:</b> planificación y dictado de clases, algoritmos, lógica y resolución de problemas.</li>
        <li><b>Programación:</b> Scratch y Python; conocimientos de Java, JavaScript y desarrollo web frontend.</li>
        <li><b>Educación digital:</b> IA aplicada a la enseñanza, aulas virtuales, recursos audiovisuales y ciudadanía digital.</li>
        <li><b>Robótica educativa:</b> robots de suelo, robótica y matemática en nivel inicial; Arduino.</li>
        <li><b>Diseño y desarrollo web:</b> HTML, CSS, JavaScript, Bootstrap, React y WordPress.</li>
        <li><b>Informática:</b> hardware, software, sistemas operativos, redes y mantenimiento de PC.</li>
        <li><b>Herramientas y gestión:</b> paquete Office, Excel, ERP (Tango Gestión y JD Edwards EnterpriseOne), Git y GitHub.</li></ul>`, 3));

    p.push(wrap('l', head('Experiencia', 'docente') +
      `<h4>ISFD Juan Gregorio Pujol – Extensión San Cosme</h4><p class="sm">2026</p>
       <p>Docente de Lenguajes de Programación, Profesorado de Informática (nivel terciario). Planificación y desarrollo de clases sobre fundamentos de programación y enseñanza de lenguajes de programación.</p>
       <h4>Subsecretaría de Contenidos Audiovisuales – Proyecto EducaPlay</h4><p class="sm">2025</p>
       <p>Creación de contenidos audiovisuales y dictado de cursos de formación vinculados con informática, tecnologías digitales e innovación educativa.</p>
       <h4>Instituto Grupo Educativo R.A. (actualmente Nueva Generación)</h4><p class="sm">2008–2011</p>
       <p>Profesor y capacitador en Operador Administrativo (Paquete Office), Diseño Gráfico (Photoshop, Illustrator y CorelDRAW), Diseño Web y Reparación de PC y Redes. Gestión administrativa integral de la sucursal, supervisión de personal, inscripciones, facturación y liquidación de sueldos.</p>`, 4));

    p.push(wrap('r', head('Experiencia', 'complementaria') +
      `<h4>Litocuyo S.R.L.</h4><p class="sm">2011–2026</p>
       <ul><li><b>2011–2015:</b> Administrativo de ventas.</li>
       <li><b>2015–2017:</b> Administración general y encargado de sistemas.</li>
       <li><b>2017–2026:</b> Logística, control de stock y compras; coordinación de pedidos, proveedores y entregas, seguimiento de inventario y tareas administrativas.</li></ul>`, 5));

    p.push(wrap('l', head('Formación', 'académica') +
      `<h5>Finalizada</h5><ul>
        <li><b>Profesor de Educación Secundaria en Informática</b> – Instituto Superior de Formación Docente Juan Gregorio Pujol, Corrientes.</li>
        <li><b>Perito Mercantil con especialización contable e impositiva</b> – Escuela Provincial de Comercio N.º 49.</li>
        <li><b>Desarrollador Web Frontend</b> – Academia de Programación Argentina, Programa Argentina Programa 4.0.</li></ul>
       <h5>En curso</h5><ul>
        <li><b>Técnico en Desarrollo de Software</b> – IFTS N.º 29, Buenos Aires (modalidad a distancia).</li>
        <li><b>Tecnicatura en Informática de Gestión</b> – Universidad Nacional de La Pampa.</li></ul>`, 6));

    let n = 7;
    certPages().forEach(cp => {
      p.push(wrap(n % 2 ? 'r' : 'l', (cp.title ? head('Formación', 'complementaria') + '<h5 style="margin-top:0">Certificaciones</h5>' : '<h5 style="margin-top:0">Certificaciones (continuación)</h5>') + `<div class="cl">${cp.items}</div>`, n));
      n++;
    });

    p.push(wrap(n % 2 ? 'r' : 'l', head('Otros', 'conocimientos') +
      `<p>Diseño gráfico y edición digital; creación de contenidos educativos; administración de plataformas y recursos digitales; sistemas ERP; gestión administrativa, compras, logística y control de stock. Sistemas contables.</p>
       <h5>Información adicional</h5>
       <p>Disponibilidad para propuestas docentes en nivel primario, secundario, técnico y superior, así como para capacitación y formación profesional en informática, programación, tecnologías digitales y robótica educativa.</p>`, n));
    n++;

    p.push(`<div class="pg back" data-density="hard"><div class="in">
      <h3>Gracias por hojear</h3>
      <p>Bernardo David Egert</p><p>Corrientes Capital, Argentina</p>
      <p>WhatsApp 379-4272394</p><p>profedavidegert@gmail.com</p><p>mzksistem@gmail.com</p>
      <p class="b">Profesor de Educación Secundaria en Informática · Docente de Programación · Desarrollador Web Frontend</p></div></div>`);
    return p;
  }

  function update() {
    if (!pf) return;
    const i = pf.getCurrentPageIndex(), total = pf.getPageCount();
    num.textContent = i === 0 ? 'Portada' : i >= total - 1 ? 'Contraportada' : `Página ${i + 1} de ${total}`;
  }

  function init() {
    if (pf) return true;
    if (!window.St || !St.PageFlip) { fail.hidden = false; return false; }
    fail.hidden = true;
    host.innerHTML = buildPages().join('');
    pf = new St.PageFlip(host, {
      width: 400, height: 560, size: 'stretch',
      minWidth: 260, maxWidth: 560, minHeight: 364, maxHeight: 784,
      showCover: true, usePortrait: true, drawShadow: true, maxShadowOpacity: .55,
      flippingTime: 900, startPage: 0, mobileScrollSupport: false, swipeDistance: 20,
      showPageCorners: true, clickEventForward: false
    });
    pf.loadFromHTML(host.querySelectorAll('.pg'));
    pf.on('flip', update); pf.on('changeState', update);
    update();
    return true;
  }

  function open() {
    lastFocus = document.activeElement;
    overlay.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { init(); document.getElementById('bookClose').focus(); });
  }
  function close() {
    overlay.hidden = true; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.getElementById('openBook').addEventListener('click', open);
  document.getElementById('bookClose').addEventListener('click', close);
  document.getElementById('bNext').addEventListener('click', () => pf && pf.flipNext());
  document.getElementById('bPrev').addEventListener('click', () => pf && pf.flipPrev());
  addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') pf && pf.flipNext();
    else if (e.key === 'ArrowLeft') pf && pf.flipPrev();
  });
})();
