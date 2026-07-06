---
title: "Cuando el balcón queda solo"
subtitle: "Una obra sobre libertad y seguridad"
image: /img/home-about-section.jpg
date: 2026-04-22
---

<div style="margin-bottom: 20px;">
  <label for="actorSearch" style="font-weight: bold; margin-right: 10px;">Busca tu nombre:</label>
  <input type="text" id="actorSearch" placeholder="Escribe tu nombre..." style="padding: 8px; width: 250px; border-radius: 4px; border: 1px solid #ccc;">
  <button onclick="clearSearch()" type="button" class="btn btn-success" style="margin-left: 5px;">Borrar</button>
</div>

<script>
  function filterScript() {
    const searchText = document.getElementById('actorSearch').value.toLowerCase();
    const actorLines = document.querySelectorAll('p');
    const sectionHeaders = document.querySelectorAll('h1');
    const horizontalRules = document.querySelectorAll('hr');

    sectionHeaders.forEach(header => header.style.display = 'block');
    horizontalRules.forEach(rule => rule.style.display = 'block');

    let visibleLines = 0;
    actorLines.forEach(line => {
      // Skip <p> elements inside a div with class "cover"
      let parent = line.parentElement;
      let insideCover = false;
      while (parent) {
        if (parent.classList && parent.classList.contains('cover')) {
          insideCover = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (insideCover) {
        line.style.display = 'block';
        visibleLines++;
        return;
      }

      const lineText = line.textContent.toLowerCase();
      if (lineText.includes(':')) {
        const actorMatch = lineText.match(/^(.*?):/);
        if (actorMatch && actorMatch[1]) {
          const actorName = actorMatch[1].toLowerCase();
          if (searchText === '' || actorName.includes(searchText)) {
            line.style.display = 'block';
            visibleLines++;
          } else {
            line.style.display = 'none';
          }
        }
      } else {
        line.style.display = searchText === '' ? 'block' : 'none';
      }
    });

    const noResultsMsg = document.getElementById('noResultsMsg');
    if (searchText !== '' && visibleLines === 0) {
      if (!noResultsMsg) {
        const msg = document.createElement('p');
        msg.id = 'noResultsMsg';
        msg.style.color = 'red';
        msg.style.fontWeight = 'bold';
        msg.textContent = 'No se encontraron líneas para este nombre.';
        document.getElementById('actorSearch').parentNode.appendChild(msg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  function clearSearch() {
    document.getElementById('actorSearch').value = '';
    filterScript();
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('actorSearch').addEventListener('keyup', filterScript);
    filterScript();
  });
</script>

# Personajes

**Mia (Jade):** Una Mia elegante, dramática y algo mandona. Cree ser la reina del hogar.

**Chiquita (Isabella):** Una pajarita nerviosa, rápida para hablar y paranoica.

**Skyla (Violet):** Una pájara bien grande, relajada, soñadora y filosófica.

---

# ACTO 1

(Escenario: Un apartamento con un balcón. Hay una jaula abierta, una cama de gato, juguetes y plantas. Se escucha la puerta cerrarse. Silencio... luego, lentamente, todo cobra vida.)

**Mia (Jade):** (estirándose exageradamente) Ahhh... por fin. Silencio. Orden. Civilización. <a href="https://translate.google.com/?sl=es&tl=es&text=Ahhh...%20por%20fin.%20Silencio.%20Orden.%20Civilizaci%C3%B3n.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Chiquita aparece de repente desde la jaula.)

**Chiquita (Isabella):** ¿Se fue?! ¿Seguro que se fue? ¿Y si regresa? ¿Y si olvidó algo? ¡Siempre olvidan algo! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFSe%20fue%3F!%20%C2%BFSeguro%20que%20se%20fue%3F%20%C2%BFY%20si%20regresa%3F%20%C2%BFY%20si%20olvid%C3%B3%20algo%3F%20%C2%A1Siempre%20olvidan%20algo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** (saliendo tranquilamente) Chiquita, respira. La puerta hizo “clic”. Ese es el sonido de la libertad. <a href="https://translate.google.com/?sl=es&tl=es&text=Chiquita%2C%20respira.%20La%20puerta%20hizo%20%E2%80%9Cclic%E2%80%9D.%20Ese%20es%20el%20sonido%20de%20la%20libertad.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** ¡O el sonido del peligro! ¡El “clic” puede significar muchas cosas! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1O%20el%20sonido%20del%20peligro!%20%C2%A1El%20%E2%80%9Cclic%E2%80%9D%20puede%20significar%20muchas%20cosas!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (con desdén) El “clic” significa que este reino vuelve a estar bajo mi control. <a href="https://translate.google.com/?sl=es&tl=es&text=El%20%E2%80%9Cclic%E2%80%9D%20significa%20que%20este%20reino%20vuelve%20a%20estar%20bajo%20mi%20control.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** ¡Nuestro control! ¡Compartido! ¡Democrático! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1Nuestro%20control!%20%C2%A1Compartido!%20%C2%A1Democr%C3%A1tico!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (mirándolo fijamente) No. <a href="https://translate.google.com/?sl=es&tl=es&text=No.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Pausa. Chiquita se esconde detrás de Skyla.)

---

# ACTO 2 - El gran plan

**Skyla (Violet):** Hoy propongo algo distinto. <a href="https://translate.google.com/?sl=es&tl=es&text=Hoy%20propongo%20algo%20distinto.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** No me gusta cómo suena eso. <a href="https://translate.google.com/?sl=es&tl=es&text=No%20me%20gusta%20c%C3%B3mo%20suena%20eso.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** Estamos siempre aquí... esperando. Volando en círculos. Durmiendo. Comiendo semillas. <a href="https://translate.google.com/?sl=es&tl=es&text=Estamos%20siempre%20aqu%C3%AD...%20esperando.%20Volando%20en%20c%C3%ADrculos.%20Durmiendo.%20Comiendo%20semillas.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** ¡Eso suena perfecto! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1Eso%20suena%20perfecto!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** ¿Y si exploramos? <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFY%20si%20exploramos%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Silencio dramático.)

**Chiquita (Isabella):** ¿Explorar... qué? <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFExplorar...%20qu%C3%A9%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** (mirando al balcón) El mundo. <a href="https://translate.google.com/?sl=es&tl=es&text=El%20mundo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Mia se ríe con elegancia.)

**Mia (Jade):** El mundo es caótico, sucio, lleno de perros... y aspiradoras. <a href="https://translate.google.com/?sl=es&tl=es&text=El%20mundo%20es%20ca%C3%B3tico%2C%20sucio%2C%20lleno%20de%20perros...%20y%20aspiradoras.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** (temblando) ¡No menciones esa cosa! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1No%20menciones%20esa%20cosa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** Pero es también ... grande. <a href="https://translate.google.com/?sl=es&tl=es&text=Pero%20es%20tambi%C3%A9n%20...%20grande.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** Este apartamento es perfecto. Tiene comida, sol... y yo. <a href="https://translate.google.com/?sl=es&tl=es&text=Este%20apartamento%20es%20perfecto.%20Tiene%20comida%2C%20sol...%20y%20yo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** (asintiendo) Eso último no estoy segura si es una ventaja o una amenaza. <a href="https://translate.google.com/?sl=es&tl=es&text=Eso%20%C3%BAltimo%20no%20estoy%20segura%20si%20es%20una%20ventaja%20o%20una%20amenaza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

---

# ACTO 3 — Conflicto

(Un ruido afuera. Las tres se congelan.)

**Chiquita (Isabella):** ¡¿QUÉ FUE ESO?! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1%C2%BFQU%C3%89%20FUE%20ESO%3F!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (alerta) Silencio. <a href="https://translate.google.com/?sl=es&tl=es&text=Silencio.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Se escucha un pájaro desde fuera.)

**Skyla (Violet):** (emocionada) ¿Escucharon eso? ¡Es... uno de los nuestros! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFEscucharon%20eso%3F%20%C2%A1Es...%20uno%20de%20los%20nuestros!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** ¡Un infiltrado! ¡¿Nos encontró?! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1Un%20infiltrado!%20%C2%A1%C2%BFNos%20encontr%C3%B3%3F!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** No, Chiquita... es libertad llamando. <a href="https://translate.google.com/?sl=es&tl=es&text=No%2C%20Chiquita...%20es%20libertad%20llamando.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (fría) Es PELIGRO llamando. <a href="https://translate.google.com/?sl=es&tl=es&text=Es%20PELIGRO%20llamando.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** ¿Nunca te has preguntado qué hay más allá? <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFNunca%20te%20has%20preguntado%20qu%C3%A9%20hay%20m%C3%A1s%20all%C3%A1%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** No. Porque yo soy el “más allá”. <a href="https://translate.google.com/?sl=es&tl=es&text=No.%20Porque%20yo%20soy%20el%20%E2%80%9Cm%C3%A1s%20all%C3%A1%E2%80%9D.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

---

# ACTO 4 - El intento de fuga

(Skyla vuela hacia el balcón.)

**Chiquita (Isabella):** ¡¿QUÉ HACES?! ¡Eso no está en el protocolo! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1%C2%BFQU%C3%89%20HACES%3F!%20%C2%A1Eso%20no%20est%C3%A1%20en%20el%20protocolo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** No hay protocolo para vivir. <a href="https://translate.google.com/?sl=es&tl=es&text=No%20hay%20protocolo%20para%20vivir.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Abre un poco la puerta del balcón.)

**Chiquita (Isabella):** ¡Eso definitivamente no está permitido! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1Eso%20definitivamente%20no%20est%C3%A1%20permitido!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (levantándose lentamente) Cierra. Eso. Ahora. <a href="https://translate.google.com/?sl=es&tl=es&text=Cierra.%20Eso.%20Ahora.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Silencio tenso.)

**Skyla (Violet):** Solo un vistazo. <a href="https://translate.google.com/?sl=es&tl=es&text=Solo%20un%20vistazo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Abre mas. Entra luz brillante.)

**Chiquita (Isabella):** (tapándose los ojos) ¡Es demasiado mundo! <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%A1Es%20demasiado%20mundo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

---

# ACTO 5 — Revelaciones

**Skyla (Violet):** ¿Sabes qué veo? Cielo... infinito. Otros pájaros... libres. Viento... sin límites. <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFSabes%20qu%C3%A9%20veo%3F%20Cielo...%20infinito.%20Otros%20p%C3%A1jaros...%20libres.%20Viento...%20sin%20l%C3%ADmites.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** Yo veo... corrientes de aire imprevistas, predadores potenciales y... ¡Una hoja sospechosa! <a href="https://translate.google.com/?sl=es&tl=es&text=Yo%20veo...%20corrientes%20de%20aire%20imprevistas%2C%20predadores%20potenciales%20y...%20%C2%A1Una%20hoja%20sospechosa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (mirando fijamente) Yo veo ... algo que no puedo controlar. <a href="https://translate.google.com/?sl=es&tl=es&text=Yo%20veo%20...%20algo%20que%20no%20puedo%20controlar.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Pausa.)

**Skyla (Violet):** Eso da miedo. <a href="https://translate.google.com/?sl=es&tl=es&text=Eso%20da%20miedo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** (bajando la voz) Sí. <a href="https://translate.google.com/?sl=es&tl=es&text=S%C3%AD.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

---

# ACTO 6- El pasado de Mia

**Chiquita (Isabella):** (sorprendido) ¿Tú... tienes miedo? <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFT%C3%B9...%20tienes%20miedo%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** Una vez... estuve afuera. <a href="https://translate.google.com/?sl=es&tl=es&text=Una%20vez...%20estuve%20afuera.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Silencio.)

**Skyla (Violet):** ¿Y? <a href="https://translate.google.com/?sl=es&tl=es&text=%C2%BFY%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** No habia comida lista. No habia ventanas seguras. No habia nadie que dijera “todo está bien”. <a href="https://translate.google.com/?sl=es&tl=es&text=No%20habia%20comida%20lista.%20No%20habia%20ventanas%20seguras.%20No%20habia%20nadie%20que%20dijera%20%E2%80%9Ctodo%20est%C3%A1%20bien%E2%80%9D.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Chiquita (Isabella):** Eso suena... terrible. <a href="https://translate.google.com/?sl=es&tl=es&text=Eso%20suena...%20terrible.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Mia (Jade):** Aprendi algo: La libertad sin seguridad... es caos. <a href="https://translate.google.com/?sl=es&tl=es&text=Aprendi%20algo%3A%20La%20libertad%20sin%20seguridad...%20es%20caos.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

**Skyla (Violet):** Y la seguridad sin libertad... es una jaula. <a href="https://translate.google.com/?sl=es&tl=es&text=Y%20la%20seguridad%20sin%20libertad...%20es%20una%20jaula.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escuchar 🎧</button></a>

(Chiquita mira su jaula. Triste.)
