/* Datos de certificaciones (fuente: CV actualizado, página 2) */
const CATS = {
  todas: 'Todas',
  prog: 'Programación y desarrollo',
  ia: 'Inteligencia artificial',
  edu: 'Educación y pedagogía',
  rob: 'Robótica y tecnología',
  dig: 'Herramientas digitales',
  otras: 'Otras capacitaciones'
};
const SCA = 'Subsecretaría de Contenidos Audiovisuales';
const DPIE = 'Dirección de Planeamiento e Investigación Educativa';
// [nombre, institución, año, carga horaria (o null), categoría, nota opcional]
const CERTS = [
  ['Robots de suelo', 'Instituto Nacional de Formación Docente (INFD)', '2026', '40 horas reloj', 'rob'],
  ['Enseñar en tiempos de IA', 'INFD, en colaboración con Paideia, UNICEF y Chicos.net', '2026', '40 horas reloj', 'ia'],
  ['Robótica y Matemática en el Nivel Inicial', 'Instituto Nacional de Formación Docente (INFD)', '2026', '40 horas reloj', 'rob'],
  ['Bienestar digital + IA: claves para enseñar con innovación y cuidado', SCA, '2025', '61 horas reloj', 'ia', 'Participación como disertante'],
  ['Gestión escolar con IA', SCA, '2025', '8 horas reloj', 'ia'],
  ['GPS Virtual: Navegá tu aula', SCA, '2025', '61 horas reloj', 'dig'],
  ['Introducción a la Modalidad de Educación Domiciliaria y Hospitalaria', DPIE, '2025', '61 horas reloj', 'edu'],
  ['Jugar sí, apostar no', SCA, '2025', '8 horas reloj', 'otras'],
  ['Marco de Gestión y Atención Educativa en la Modalidad de Educación Domiciliaria y Hospitalaria', null, '2025', '5 horas reloj', 'edu'],
  ['Mis primeros pasos en aulas virtuales', SCA, '2025', '8 horas reloj', 'dig'],
  ['Planificación inteligente: potenciando clases con Khanmigo', SCA, '2025', '8 horas reloj', 'ia'],
  ['Git y GitHub: repositorio, commit y versiones', 'Alura', '2025', '6 horas', 'prog'],
  ['Lógica de programación: sumérgete en la programación con JavaScript', 'Alura', '2025', '8 horas', 'prog'],
  ['Hábitos: ser productivo para cumplir sus metas personales', 'Alura', '2025', '8 horas', 'otras'],
  ['Programador en Aplicaciones Mobile', 'Fundación Start Coding AI', '2025', '43 horas', 'prog'],
  ['Full Stack Python', 'Codo a Codo 4.0', '2024', '208 horas reloj', 'prog'],
  ['El Diseño Universal para el Aprendizaje (DUA) y su Transversalidad en el Contexto Educativo', 'ISFD Bella Vista', '2024', '19 horas reloj', 'edu'],
  ['Colectivo de lectura: Los cuatro ejes de la narración (la voz, el cuerpo, el texto y el espacio)', DPIE, '2024', '5 horas reloj', 'edu'],
  ['La Alfabetización en Corrientes. Un plan estratégico para todos los niveles y modalidades', DPIE, '2024', '4 horas reloj', 'edu'],
  ['Música + IA: digitalizando el lenguaje musical', SCA, '2024', '61 horas reloj', 'ia'],
  ['Sesión de innovación: Programando con Scratch', SCA + ' y Fundación Varkey Argentina', '2024', '8 horas reloj', 'prog'],
  ['Sesión de innovación: Podcast Educativos', SCA + ' y Fundación Varkey Argentina', '2024', '8 horas reloj', 'dig'],
  ['TEA e inclusión educativa', 'Coordinación de Educación Especial', '2024', '4 horas reloj', 'edu'],
  ['Ciudadanos 2.0: Tu poder Digital', SCA, '2024', '8 horas reloj', 'dig'],
  ['Desarrollador Java intermedio', 'Universidad Tecnológica Nacional · Argentina Programa 4.0', '2023', null, 'prog', 'Aprobado en noviembre de 2023'],
  ['Primeros pasos del desarrollo frontend', 'Academia de Programación Frontend · Argentina Programa 4.0', '2023', null, 'prog'],
  ['Innovación Digital III – Edición Inteligencia Artificial: Descubre, Aprende, Aplica y Reflexiona', 'Gobierno de la Provincia de Corrientes', '2023', null, 'ia']
];

(function () {
  const $ = (s, c = document) => c.querySelector(s);

  // Año del pie
  $('#yr').textContent = new Date().getFullYear();

  // Navegación
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  // Aparición al desplazarse
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px' }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // Certificaciones: tarjetas + filtros
  const grid = $('#certGrid'), fbox = $('#filters'), count = $('#certCount');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function render(cat) {
    const list = CERTS.filter(c => cat === 'todas' || c[4] === cat);
    grid.innerHTML = list.map(c => `
      <article class="card">
        <span class="tag">${CATS[c[4]]}</span>
        <h3>${esc(c[0])}</h3>
        ${c[1] ? `<p class="inst">${esc(c[1])}</p>` : ''}
        ${c[5] ? `<p class="inst"><em>${esc(c[5])}</em></p>` : ''}
        <div class="meta"><span>${c[2]}</span>${c[3] ? `<span>${c[3]}</span>` : ''}</div>
      </article>`).join('');
    count.textContent = `Mostrando ${list.length} de ${CERTS.length} certificaciones`;
  }
  fbox.innerHTML = Object.entries(CATS).map(([k, v]) => `<button type="button" data-cat="${k}" aria-pressed="${k === 'todas'}" class="${k === 'todas' ? 'on' : ''}">${v}</button>`).join('');
  fbox.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    fbox.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    render(b.dataset.cat);
  });
  render('todas');
})();
