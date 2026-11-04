// =============================================================================
// «El repartidor confundido», jugable en la portada.
//
// Es el árbol socrático real de la actividad (NativIAapp,
// packages/content/src/activities/b1-repartidor.ts): el mismo que usa la app
// sin conexión. Si cambia allí, se copia aquí. Ningún nodo da el resultado:
// las preguntas llevan a él.
// =============================================================================

const ACTIVIDAD = {
  "inicio": "r1",
  "nodos": {
    "r1": {
      "say": "Mira lo que dijo la IA. ¿Qué pasaría si le das 5 arepas a cada uno de los 6 amigos?",
      "choices": [
        ["Sobran arepas", "r2_sobran"],
        ["Faltan arepas", "r2_faltan"],
        ["Quedan justas", "r2_justas"]
      ]
    },
    "r2_faltan": {
      "say": "Vamos a comprobarlo. Si repartes 5 a cada uno de los 6, ¿cuántas repartes en total?",
      "choices": [
        ["11", "r3_no"],
        ["30", "r3_si"],
        ["24", "r3_no"]
      ]
    },
    "r2_sobran": {
      "say": "Contemos juntos: 5, 10, 15, 20, 25, 30. ¿Cuántas arepas repartiste?",
      "choices": [
        ["30", "r3_si"],
        ["24", "r3_no"]
      ]
    },
    "r2_justas": {
      "say": "Contemos juntos: 5, 10, 15, 20, 25, 30. ¿Cuántas arepas repartiste?",
      "choices": [
        ["30", "r3_si"],
        ["24", "r3_no"]
      ]
    },
    "r3_no": {
      "say": "Casi. Contemos de a 5, una vez por cada amigo: 5, 10, 15, 20, 25, 30. ¿En cuánto terminamos?",
      "choices": [
        ["30", "r3_si"],
        ["En otro número", "r3_ayuda"]
      ]
    },
    "r3_ayuda": {
      "say": "Tranquilo, esto cuesta. ¿Quieres intentarlo con tu profe? También puedes volver a contar conmigo.",
      "choices": [
        ["Contar otra vez", "r3_no"],
        ["Preguntar al profe", "fin_profe"]
      ]
    },
    "r3_si": {
      "say": "Repartiste 30 arepas. ¿Y cuántas arepas tenía María?",
      "choices": [
        ["24", "r4"],
        ["30", "r3_no"]
      ]
    },
    "r4": {
      "say": "María tenía 24 y la IA repartió 30. ¿Alcanzan las arepas?",
      "choices": [
        ["No, faltarían", "r5"],
        ["Sí, alcanzan", "r3_si"]
      ]
    },
    "r5": {
      "say": "¡Lo encontraste! La IA se equivocó y tú lo comprobaste. ¿Cuántas arepas le darías tú a cada amigo para que alcancen justas?",
      "choices": [
        ["Menos de 5", "fin"],
        ["Más de 5", "r4"]
      ]
    },
    "fin": {
      "say": "Exacto: con menos de 5 alcanzan. Y lo mejor: no le creíste a la IA, lo comprobaste tú. Eso es pensar con la IA, no por la IA.",
      "fin": true
    },
    "fin_profe": {
      "say": "Perfecto. Tu profe te va a ayudar. Lo importante es que no te quedaste con la respuesta de la IA sin revisarla.",
      "fin": true
    }
  }
};

(function () {
  const raiz = document.getElementById('prueba');
  if (!raiz) return;

  const conversacion = raiz.querySelector('.conversacion');
  const opciones = raiz.querySelector('.opciones');
  const avatarNati = document.getElementById('avatar-nati');
  const avatarNino = document.getElementById('avatar-nino');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pausa = () => (sinMovimiento.matches ? 0 : 650);

  function turno(quien, texto, extra) {
    const fila = document.createElement('div');
    fila.className = 'turno turno-' + quien + (extra ? ' ' + extra : '');
    const avatar = (quien === 'nati' ? avatarNati : avatarNino).content.cloneNode(true);
    const burbuja = document.createElement('p');
    burbuja.textContent = texto;
    fila.append(avatar, burbuja);
    conversacion.append(fila);
    conversacion.scrollTop = conversacion.scrollHeight;
    return fila;
  }

  function pensando() {
    const fila = document.createElement('div');
    fila.className = 'turno turno-nati';
    fila.setAttribute('aria-hidden', 'true');
    const puntos = document.createElement('span');
    puntos.className = 'pensando';
    puntos.innerHTML = '<span></span><span></span><span></span>';
    fila.append(avatarNati.content.cloneNode(true), puntos);
    conversacion.append(fila);
    conversacion.scrollTop = conversacion.scrollHeight;
    return fila;
  }

  function mostrarOpciones(nodo, conTeclado) {
    opciones.replaceChildren();
    if (nodo.fin) {
      const otra = document.createElement('button');
      otra.type = 'button';
      otra.className = 'otra-vez';
      otra.textContent = 'Empezar de nuevo';
      otra.addEventListener('click', () => empezar(true));
      opciones.append(otra);
      if (conTeclado) otra.focus();
      return;
    }
    nodo.choices.forEach(([etiqueta, siguiente], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = etiqueta;
      b.addEventListener('click', (e) => elegir(etiqueta, siguiente, e.detail === 0));
      opciones.append(b);
      if (conTeclado && i === 0) b.focus();
    });
  }

  function elegir(etiqueta, siguiente, conTeclado) {
    opciones.querySelectorAll('button').forEach((b) => (b.disabled = true));
    turno('nino', etiqueta);
    const espera = pensando();
    setTimeout(() => {
      espera.remove();
      const nodo = ACTIVIDAD.nodos[siguiente];
      turno('nati', nodo.say, nodo.fin ? 'turno-logro' : '');
      mostrarOpciones(nodo, conTeclado);
    }, pausa());
  }

  function empezar(conTeclado) {
    conversacion.replaceChildren();
    const nodo = ACTIVIDAD.nodos[ACTIVIDAD.inicio];
    turno('nati', nodo.say);
    mostrarOpciones(nodo, conTeclado);
  }

  empezar(false);
})();
