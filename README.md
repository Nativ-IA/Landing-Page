# NativIA · página para colegios

Página pública de NativIA para rectores, coordinadores y docentes: qué es, cómo funciona, cómo se
cuida a los niños y cómo pedir una demostración. La app vive en otro repositorio (`NativIAapp`).

Es un sitio estático: HTML, CSS y un archivo de JavaScript. No tiene dependencias ni paso de
compilación; se publica tal cual en cualquier hosting de archivos.

```
index.html                  la página
estilos.css                 colores y tipografía del design system de la app
prueba.js                   la actividad jugable de la portada
assets/fonts/               Nunito Sans (licencia SIL Open Font), servida desde aquí
assets/pantallas/           capturas reales de la app, con datos de demostración
assets/favicon.svg          el símbolo de la marca
```

## Verla en el computador

Abrir `index.html` en el navegador funciona. Para verla como quedará publicada:

```powershell
python -m http.server 8080      # y abrir http://localhost:8080
```

## Antes de publicar

1. **Correo de contacto.** Hoy dice `equipo@nativia.example`, que no existe. Buscar
   `nativia.example` en `index.html` y cambiarlo por el correo del equipo (aparece tres veces: dos
   botones «Solicitar una demostración» y el enlace del pie).
2. **Dirección de la app.** Los enlaces «Entrar a NativIA» apuntan a la demo en Cloud Run. Si se
   apaga la demo (`--ingress internal`), esos enlaces fallan; si cambia la dirección, buscar
   `run.app` en `index.html`.
3. **Páginas legales.** Cuando existan la política de privacidad y los términos de uso, enlazarlos
   en el pie.

## Publicarla en GitHub Pages

1. Crear el repositorio en GitHub (por ejemplo `Nativ-IA/nativia-landing`) y subir esta carpeta.
2. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, rama
   `main`, carpeta `/ (root)`.
3. Queda en `https://nativ-ia.github.io/nativia-landing/`. Con un dominio propio, se configura en
   la misma pantalla.

En el plan gratuito de GitHub, Pages solo publica repositorios públicos. El archivo `.nojekyll`
evita que GitHub procese la carpeta.

Otra opción, en el mismo proyecto de Google Cloud de la demo: Firebase Hosting
(`firebase init hosting` con esta carpeta como `public`, y `firebase deploy`).

## De dónde sale cada cosa

| Qué | Fuente en `NativIAapp` |
|---|---|
| Colores, tipografía, claim | `docs/03-design-system.md` §2, §3 y §11 |
| Símbolo, sellos de eje, Nati, avatar | `apps/web/src/components/` (`Logo`, `Emblem`, `Fauna`), exportados a SVG |
| La actividad de la portada | `packages/content/src/activities/b1-repartidor.ts`, árbol sin conexión |
| Ejes y actividades de ejemplo | `packages/content/src/` |
| Capturas | La app con los datos de `pnpm db:seed` y actividad simulada |

Si cambia el árbol de «El repartidor confundido» en la app, se copia a `prueba.js`. Si cambia una
pantalla, se vuelve a capturar (1280 px de ancho, al doble de densidad) y se guarda en WebP.

## Reglas del texto

Las mismas del proyecto: no se inventan cifras, ni testimonios, ni logos de colegios. Todo lo que la
página dice que NativIA hace está construido en el prototipo; lo que es meta de diseño se dice como
meta («está pensado para…»). Los nombres de las capturas son sintéticos y la página lo dice.
