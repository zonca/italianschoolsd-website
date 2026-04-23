---
title: "Balcon Solo"
subtitle: "Ejercicio de traducción"
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
        msg.textContent = 'No se encontró ningún diálogo para este nombre.';
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

# Acto I: El balcón

**Narrador:** Había una vez una casa muy especial en un pequeño pueblo cerca del mar. La casa tenía un balcón precioso con macetas de flores de colores. <a href="https://translate.google.com/?sl=es&tl=en&text=Hab%C3%ADa%20una%20vez%20una%20casa%20muy%20especial%20en%20un%20peque%C3%B1o%20pueblo%20cerca%20del%20mar.%20La%20casa%20ten%C3%ADa%20un%20balc%C3%B3n%20precioso%20con%20macetas%20de%20flores%20de%20colores.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Narrador:** En el balcón vivían tres amigos: un gato gris, un pajarillo amarillo y una planta de albahaca verde. <a href="https://translate.google.com/?sl=es&tl=en&text=En%20el%20balc%C3%B3n%20viv%C3%ADan%20tres%20amigos%3A%20un%20gato%20gris%2C%20un%20pajarillo%20amarillo%20y%20una%20planta%20de%20albahaca%20verde.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Gato:** (bostezo) ¡Qué mañana tan bonita! El sol calienta mi pelo. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFQu%C3%A9%20ma%C3%B1ana%20tan%20bonita!%20El%20sol%20calienta%20mi%20pelo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** Sí, pero hoy debo volar lejos. Debo llevar un mensaje importante. <a href="https://translate.google.com/?sl=es&tl=en&text=S%C3%AD%2C%20pero%20hoy%20debo%20volar%20lejos.%20Debo%20llevar%20un%20mensaje%20importante.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Albahaca:** ¿Un mensaje? ¿De quién? ¿Para quién? <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFDn%20mensaje%3F%20%C2%BFDe%20qui%C3%A9n%3F%20%C2%BFPara%20qui%C3%A9n%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Es un secreto! No se lo puedo decir a nadie. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Es%20un%20secreto!%20No%20se%20lo%20puedo%20decir%20a%20nadie.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Gato:** (curioso) ¿Un secreto? Me encantan los secretos. ¿Puedo ayudarte? <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFDn%20secreto%3F%20Me%20encantan%20los%20secretos.%20%C2%BFPuedo%20ayudarte%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** Tal vez. El mensaje es para el pescador que vive cerca del puerto. <a href="https://translate.google.com/?sl=es&tl=en&text=Tal%20vez.%20El%20mensaje%20es%20para%20el%20pescador%20que%20vive%20cerca%20del%20puerto.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Albahaca:** ¡Ah! ¿El de la barba blanca? Es un hombre muy amable. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Ah!%20%C2%BFEl%20de%20la%20barba%20blanca%3F%20Es%20un%20hombre%20muy%20amable.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Sí, exactamente él! Pero el problema es que no sé nadar... <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1S%C3%AD%2C%20exactamente%20%C3%A9l!%20Pero%20el%20problema%20es%20que%20no%20s%C3%A9%20nadar...&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Gato:** ¿Y qué? Yo no sé volar, pero tú sabes nadar. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFY%20qu%C3%A9%3F%20Yo%20no%20s%C3%A9%20volar%2C%20pero%20t%C3%BA%20sabes%20nadar.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Verdad! Pero tengo miedo del agua profunda. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Verdad!%20Pero%20tengo%20miedo%20del%20agua%20profunda.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Albahaca:** No te preocupes. El agua es tu amiga. <a href="https://translate.google.com/?sl=es&tl=en&text=No%20te%20preocupes.%20El%20agua%20es%20tu%20amiga.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

---

# Acto II: El viaje

**Narrador:** El pajarillo partió al amanecer. Voló sobre el mar azul y vio muchos pececitos plateados. <a href="https://translate.google.com/?sl=es&tl=en&text=El%20pajarillo%20parti%C3%B3%20al%20amanecer.%20Vol%C3%B3%20sobre%20el%20mar%20azul%20y%20vi%C3%B3%20muchos%20pececitos%20plateados.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Qué bonito! Me gustaría pararme a jugar... <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFQu%C3%A9%20bonito!%20Me%20gustar%C3%ADa%20pararme%20a%20jugar...&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pez:** (saltando) ¡Hola pajarillo! ¡Ven a jugar con nosotros! <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Hola%20pajarillo!%20%C2%A1Ven%20a%20jugar%20con%20nosotros!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** Me gustaría, pero tengo un mensaje urgente. Debo encontrar al pescador de la barba blanca. <a href="https://translate.google.com/?sl=es&tl=en&text=Me%20gustar%C3%ADa%2C%20pero%20tengo%20un%20mensaje%20urgente.%20Debo%20encontrar%20al%20pescador%20de%20la%20barba%20blanca.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pez:** ¡Ah! Él es muy mayor, pero sabe contar historias maravillosas. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Ah!%20%C3%89l%20es%20muy%20mayor%2C%20pero%20sabe%20contar%20historias%20maravillosas.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¿Historias? ¡Me encantan las historias! <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFHistorias%3F%20%C2%A1Me%20encantan%20las%20historias!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pez:** Te puedo llevar cerca de su barca. ¡Sube a mi espalda! <a href="https://translate.google.com/?sl=es&tl=en&text=Te%20puedo%20llevar%20cerca%20de%20su%20barca.%20%C2%A1Sube%20a%20mi%20espalda!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** (dudoso) No sé... tengo un poco de miedo. <a href="https://translate.google.com/?sl=es&tl=en&text=No%20s%C3%A9...%20tengo%20un%20poco%20de%20miedo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pez:** No te preocupes. Yo te protejo. <a href="https://translate.google.com/?sl=es&tl=en&text=No%20te%20preocupes.%20Yo%20te%20protejo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Narrador:** Y así el pajarillo encontró el valor de nadar con su nuevo amigo pez. <a href="https://translate.google.com/?sl=es&tl=en&text=Y%20as%C3%AD%20el%20pajarillo%20encontr%C3%B3%20el%20valor%20de%20nadar%20con%20su%20nuevo%20amigo%20pez.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

---

# Acto III: El pescador

**Narrador:** El pajarillo llegó a la barca del pescador. El hombre estaba arreglando una red. <a href="https://translate.google.com/?sl=es&tl=en&text=El%20pajarillo%20lleg%C3%B3%20a%20la%20barca%20del%20pescador.%20El%20hombre%20estaba%20arreglando%20una%20red.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** (sorprendido) ¡Oh! ¡Un pajarillo! ¿De dónde vienes, amiguito? <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Oh!%20%C2%A1Un%20pajarillo!%20%C2%BFDe%20d%C3%B3nde%20vienes%2C%20amiguito%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Vengo del balcón de las flores! Traigo un mensaje de mis amigos. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Vengo%20del%20balc%C3%B3n%20de%20las%20flores!%20Traigo%20un%20mensaje%20de%20mis%20amigos.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** ¿Tus amigos? ¿Son el gato gris y la albahaca? <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFTus%20amigos%3F%20%C2%BFSon%20el%20gato%20gris%20y%20la%20albahaca%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Sí, exactamente! Quieren darte las gracias por el pescado que les llevas cada semana. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1S%C3%AD%2C%20exactamente!%20Quieren%20darte%20las%20gracias%20por%20el%20pescado%20que%20les%20llevas%20cada%20semana.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** ¡Oh, qué amables! Ellos son los que me dan las mejores verduras. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Oh%2C%20qu%C3%A9%20amables!%20Ellos%20son%20los%20que%20me%20dan%20las%20mejores%20verduras.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Así es! Y hoy te traen esto: semillas de tomate fresco de nuestra huerta. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1As%C3%AD%20es!%20Y%20hoy%20te%20traen%20esto%3A%20semillas%20de%20tomate%20fresco%20de%20nuestra%20huerta.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** (contento) ¡Fantástico! Plántalos en mi terraza. <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Fant%C3%A1stico!%20Pl%C3%A1ntalos%20en%20mi%20terraza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** Pero hay una condición... <a href="https://translate.google.com/?sl=es&tl=en&text=Pero%20hay%20una%20condici%C3%B3n...&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** ¿Qué condición? <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%BFQu%C3%A9%20condici%C3%B3n%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pájaro:** ¡Debes contarnos una historia nueva cada domingo! <a href="https://translate.google.com/?sl=es&tl=en&text=%C2%A1Debes%20contarnos%20una%20historia%20nueva%20cada%20domingo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Pescador:** (riendo) ¡Hecho!