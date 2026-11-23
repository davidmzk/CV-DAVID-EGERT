/* Formulario de contacto – FormSubmit (https://formsubmit.co) */
(function () {
  const ENDPOINT = 'https://formsubmit.co/ajax/profedavidegert@gmail.com';
  const form = document.getElementById('contactForm'), btn = document.getElementById('sendBtn');
  const status = document.getElementById('formStatus');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: v => v.trim().length >= 3 ? '' : 'Ingresá tu nombre completo.',
    email: v => !v.trim() ? 'Ingresá tu correo electrónico.' : EMAIL.test(v.trim()) ? '' : 'El correo electrónico no es válido.',
    subject: v => v.trim().length >= 3 ? '' : 'Ingresá un asunto.',
    message: v => v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
  };
  function check(name) {
    const el = form.elements[name], msg = rules[name](el.value);
    el.closest('.field').classList.toggle('bad', !!msg);
    form.querySelector(`.err[data-for="${name}"]`).textContent = msg;
    el.setAttribute('aria-invalid', !!msg);
    return !msg;
  }
  Object.keys(rules).forEach(n => form.elements[n].addEventListener('blur', () => check(n)));
  Object.keys(rules).forEach(n => form.elements[n].addEventListener('input', () => { if (form.elements[n].closest('.field').classList.contains('bad')) check(n); }));

  function show(type, html) { status.className = 'status ' + type; status.innerHTML = html; }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.className = 'status'; status.textContent = '';
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { form.querySelector('.bad input, .bad textarea').focus(); return; }
    if (form.elements._honey.value) return; // anti-spam

    const mailto = `mailto:profedavidegert@gmail.com?subject=${encodeURIComponent(form.subject.value)}&body=${encodeURIComponent(form.message.value + '\n\n' + form.elements.name.value + ' (' + form.email.value + ')')}`;
    if (location.protocol === 'file:') {
      show('fail', `El envío automático no funciona al abrir el archivo directamente (file://). Publicá el sitio o usá un servidor local (ver README). Mientras tanto podés <a href="${mailto}">escribir por correo</a>.`);
      return;
    }

    btn.classList.add('loading'); btn.querySelector('.t').textContent = 'Enviando…';
    try {
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 20000);
      const res = await fetch(ENDPOINT, {
        method: 'POST', signal: ctl.signal,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.elements.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim(),
          _replyto: form.email.value.trim(), _subject: 'Portfolio web: ' + form.subject.value.trim(),
          _template: 'table', _captcha: 'false'
        })
      });
      clearTimeout(to);
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === true || data.success === 'true')) {
        show('ok', '¡Gracias! Tu mensaje fue enviado correctamente. Te responderé a la brevedad.');
        form.reset();
      } else {
        const m = (data.message || '').toString();
        const needsActivation = /activat|confirm/i.test(m);
        show('fail', needsActivation
          ? 'El servicio de envío todavía no está activado. Para activarlo, el titular debe confirmar el correo que FormSubmit envió a profedavidegert@gmail.com.'
          : `No se pudo enviar el mensaje${m ? ' (' + m.replace(/</g, '&lt;') + ')' : ''}. Podés intentar nuevamente o <a href="${mailto}">escribir por correo</a>.`);
      }
    } catch (err) {
      show('fail', `No hay conexión con el servicio de envío${err.name === 'AbortError' ? ' (tiempo agotado)' : ''}. Intentá nuevamente o <a href="${mailto}">escribí por correo</a>.`);
    } finally {
      btn.classList.remove('loading'); btn.querySelector('.t').textContent = 'Enviar mensaje';
    }
  });
})();
