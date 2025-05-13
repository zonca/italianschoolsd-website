---
title: "La Ratona y la Humildad"
subtitle: "La importancia de la amabilidad"
image: /img/Teatro_alla_Scala_interior_Milan_by_Wolfgang_Moroder.jpg
date: 2025-05-08
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

# 🎭 La Ratona y la Humildad

# ESCENA 1 – Un paseo presumido

**Tortuga (Jade):** ¡Ohhh, cuántos libros tienes! ¿Te gusta este? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Ohhh%2C%20cu%C3%A1ntos%20libros%20tienes!%20%C2%BFTe%20gusta%20este%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** ¡Sí! Lo leo para aprender. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1S%C3%AD!%20Lo%20leo%20para%20aprender.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** ¡Qué buen día hace! Hoy todo el bosque verá lo lista que soy. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Qu%C3%A9%20buen%20d%C3%ADa%20hace!%20Hoy%20todo%20el%20bosque%20ver%C3%A1%20lo%20lista%20que%20soy.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Hola, señora Lechuza. ¿Qué hace? <a href="https://translate.google.com/?sl=es&tl=it&text=Hola%2C%20se%C3%B1ora%20Lechuza.%20%C2%BFQu%C3%A9%20hace%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** Estoy ordenando mis libros con mi amiga tortuga. ¿Nos ayudas? <a href="https://translate.google.com/?sl=es&tl=it&text=Estoy%20ordenando%20mis%20libros%20con%20mi%20amiga%20tortuga.%20%C2%BFNos%20ayudas%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** No puedo, voy de paseo. ¡Soy muy rápida! <a href="https://translate.google.com/?sl=es&tl=it&text=No%20puedo%2C%20voy%20de%20paseo.%20%C2%A1Soy%20muy%20r%C3%A1pida!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** Ser rápida no siempre es lo mejor. A veces es mejor ayudar. Además, los libros enseñan cosas que la velocidad no puede. <a href="https://translate.google.com/?sl=es&tl=it&text=Ser%20r%C3%A1pida%20no%20siempre%20es%20lo%20mejor.%20A%20veces%20es%20mejor%20ayudar.%20Adem%C3%A1s%2C%20los%20libros%20ense%C3%B1an%20cosas%20que%20la%20velocidad%20no%20puede.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** ¡Pero yo soy la mejor del bosque! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Pero%20yo%20soy%20la%20mejor%20del%20bosque!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** ¡Hola! Estoy escondiendo mis frutas para el invierno. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Hola!%20Estoy%20escondiendo%20mis%20frutas%20para%20el%20invierno.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** ¡Yo soy buenísima cavando! ¡Lo hago mejor que nadie! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Yo%20soy%20buen%C3%ADsima%20cavando!%20%C2%A1Lo%20hago%20mejor%20que%20nadie!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** ¿De verdad? Pues me vendría bien una mano... <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFDe%20verdad%3F%20Pues%20me%20vendr%C3%ADa%20bien%20una%20mano...&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Ahora no, estoy ocupada mostrando mi talento. <a href="https://translate.google.com/?sl=es&tl=it&text=Ahora%20no%2C%20estoy%20ocupada%20mostrando%20mi%20talento.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** (al público) Siempre está ocupada mostrándose, nunca ayudando. <a href="https://translate.google.com/?sl=es&tl=it&text=Siempre%20est%C3%A1%20ocupada%20mostr%C3%A1ndose%2C%20nunca%20ayudando.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Erizo (Leo):** ¿A dónde vas tan feliz? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFAd%C3%B3nde%20vas%20tan%20feliz%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** A hacer figuras de barro. ¡Me salen perfectas! <a href="https://translate.google.com/?sl=es&tl=it&text=A%20hacer%20figuras%20de%20barro.%20%C2%A1Me%20salen%20perfectas!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Erizo (Leo):** ¿Y ayudas a tus amigas del bosque? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFY%20ayudas%20a%20tus%20amigas%20del%20bosque%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Mmm… no mucho. Pero no importa, yo soy muy lista. <a href="https://translate.google.com/?sl=es&tl=it&text=Mmm%E2%80%A6%20no%20mucho.%20Pero%20no%20importa%2C%20yo%20soy%20muy%20lista.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Erizo (Leo):** (al público) La inteligencia también sirve para hacer el bien. <a href="https://translate.google.com/?sl=es&tl=it&text=La%20inteligencia%20tambi%C3%A9n%20sirve%20para%20hacer%20el%20bien.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

(Se cierra el telón)

---

# ESCENA 2 – El problema del barro

**Ratona (Violet):** ¡Miren mis figuras! ¡Son las mejores del bosque! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Miren%20mis%20figuras!%20%C2%A1Son%20las%20mejores%20del%20bosque!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Tortuga (Jade):** Hola, ¿cuánto cuesta esta figura? <a href="https://translate.google.com/?sl=es&tl=it&text=Hola%2C%20%C2%BFcu%C3%A1nto%20cuesta%20esta%20figura%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** ¡5 dólares! Es muy bonita. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A15%20d%C3%B3lares!%20Es%20muy%20bonita.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Tortuga (Jade):** Mmm… Me parece cara, pero está bien. 1, 2, 3, 4, 5. (al público) Aunque camino lento, siempre llego con algo especial a casa de mi prima. <a href="https://translate.google.com/?sl=es&tl=it&text=Mmm%E2%80%A6%20Me%20parece%20cara%2C%20pero%20est%C3%A1%20bien.%201%2C%202%2C%203%2C%204%2C%205.%20Aunque%20camino%20lento%2C%20siempre%20llego%20con%20algo%20especial%20a%20casa%20de%20mi%20prima.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

(Lluvia fuerte)

**Tortuga (Jade):** ¡Ay! ¡Tu figura se ha deshecho! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Ay!%20%C2%A1Tu%20figura%20se%20ha%20deshecho!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** (llorando) ¡Nooo! ¡Mi trabajo se arruinó con la lluvia! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Nooo!%20%C2%A1Mi%20trabajo%20se%20arruin%C3%B3%20con%20la%20lluvia!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Erizo (Leo):** ¿Todo bien, Ratona? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFTodo%20bien%2C%20Ratona%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** No… la lluvia destruyó mis figuras. No puedo hacer nada ahora. <a href="https://translate.google.com/?sl=es&tl=it&text=No%E2%80%A6%20la%20lluvia%20destruy%C3%B3%20mis%20figuras.%20No%20puedo%20hacer%20nada%20ahora.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Tortuga (Jade):** (al público) A veces lo más fuerte no es lo que brilla, sino lo que dura. <a href="https://translate.google.com/?sl=es&tl=it&text=A%20veces%20lo%20m%C3%A1s%20fuerte%20no%20es%20lo%20que%20brilla%2C%20sino%20lo%20que%20dura.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** ¿Necesitas ayuda ahora, Ratona? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFNecesitas%20ayuda%20ahora%2C%20Ratona%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Sin barro no tengo comida. ¿Me ayudarán? <a href="https://translate.google.com/?sl=es&tl=it&text=Sin%20barro%20no%20tengo%20comida.%20%C2%BFMe%20ayudar%C3%A1n%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** ¿Y tú, nos ayudaste antes? <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFY%20t%C3%BA%2C%20nos%20ayudaste%20antes%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** Ser humilde es importante, Ratona. (al público) Solo cuando entendemos nuestras debilidades, podemos crecer. Y crecer no es subir más alto, sino mirar más profundo. <a href="https://translate.google.com/?sl=es&tl=it&text=Ser%20humilde%20es%20importante%2C%20Ratona.%20Solo%20cuando%20entendemos%20nuestras%20debilidades%2C%20podemos%20crecer.%20Y%20crecer%20no%20es%20subir%20m%C3%A1s%20alto%2C%20sino%20mirar%20m%C3%A1s%20profundo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Tenéis razón. Perdón. ¡Quiero cambiar! <a href="https://translate.google.com/?sl=es&tl=it&text=Ten%C3%A9is%20raz%C3%B3n.%20Perd%C3%B3n.%20%C2%A1Quiero%20cambiar!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Tortuga (Jade):** Yo te puedo ayudar a empezar de nuevo. El mejor barro está cerca del lago. <a href="https://translate.google.com/?sl=es&tl=it&text=Yo%20te%20puedo%20ayudar%20a%20empezar%20de%20nuevo.%20El%20mejor%20barro%20est%C3%A1%20cerca%20del%20lago.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Puedo enseñar a los más pequeños a modelar. Así comparto mis talentos. <a href="https://translate.google.com/?sl=es&tl=it&text=Puedo%20ense%C3%B1ar%20a%20los%20m%C3%A1s%20peque%C3%B1os%20a%20modelar.%20As%C3%AD%20comparto%20mis%20talentos.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** ¡Y podrías ayudarnos a esconder frutas el próximo invierno! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Y%20podr%C3%ADas%20ayudarnos%20a%20esconder%20frutas%20el%20pr%C3%B3ximo%20invierno!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** ¡Y leeremos juntas! Tengo un libro sobre cerámica. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Y%20leeremos%20juntas!%20Tengo%20un%20libro%20sobre%20cer%C3%A1mica.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Gracias, amigos. ¡He aprendido la lección! La amistad es el mejor tesoro que hay. <a href="https://translate.google.com/?sl=es&tl=it&text=Gracias%2C%20amigos.%20%C2%A1He%20aprendido%20la%20lecci%C3%B3n!%20La%20amistad%20es%20el%20mejor%20tesoro%20que%20hay.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

(Se cierra el telón)

---

# ESCENA FINAL – La fiesta de la amistad

**Ratona (Violet):** ¡Todo está listo! Gracias por ayudarme. Estas figuras no se deshacen con la lluvia… ¡y las hice con vosotros! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Todo%20est%C3%A1%20listo!%20Gracias%20por%20ayudarme.%20Estas%20figuras%20no%20se%20deshacen%20con%20la%20lluvia%E2%80%A6%20%C2%A1y%20las%20hice%20con%20vosotros!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Tortuga (Jade):** Te dije que el barro del lago era el mejor. (al público) Y el trabajo en equipo… aún mejor. <a href="https://translate.google.com/?sl=es&tl=it&text=Te%20dije%20que%20el%20barro%20del%20lago%20era%20el%20mejor.%20Y%20el%20trabajo%20en%20equipo%E2%80%A6%20a%C3%BAn%20mejor.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ardilla (Isabella):** Y yo he traído frutas para todos. Ahora las puedo esconder rápido gracias a ti, Ratona. (pausa, sonríe) Las frutas son mejores cuando se comparten con amigos. Mi favorita es la fresa, ¡dulce como una sonrisa! La amistad es como un árbol: crece si la cuidamos. <a href="https://translate.google.com/?sl=es&tl=it&text=Y%20yo%20he%20tra%C3%ADdo%20frutas%20para%20todos.%20Ahora%20las%20puedo%20esconder%20r%C3%A1pido%20gracias%20a%20ti%2C%20Ratona.%20Las%20frutas%20son%20mejores%20cuando%20se%20comparten%20con%20amigos.%20Mi%20favorita%20es%20la%20fresa%2C%20%C2%A1dulce%20como%20una%20sonrisa!%20La%20amistad%20es%20como%20un%20%C3%A1rbol%3A%20crece%20si%20la%20cuidamos.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Erizo (Leo):** (al público) ¿Ves? Compartir lo que sabes te hace aún más sabia. <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%BFVes%3F%20Compartir%20lo%20que%20sabes%20te%20hace%20a%C3%BAn%20m%C3%A1s%20sabia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Lechuza (Lily):** (al público) Y humilde. Como dice un libro muy viejo: “El corazón que ayuda es el que más brilla.” <a href="https://translate.google.com/?sl=es&tl=it&text=Y%20humilde.%20Como%20dice%20un%20libro%20muy%20viejo%3A%20%E2%80%9CEl%20coraz%C3%B3n%20que%20ayuda%20es%20el%20que%20m%C3%A1s%20brilla.%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Ratona (Violet):** Antes quería ser la mejor. Ahora quiero ser… una buena amiga. <a href="https://translate.google.com/?sl=es&tl=it&text=Antes%20quer%C3%ADa%20ser%20la%20mejor.%20Ahora%20quiero%20ser%E2%80%A6%20una%20buena%20amiga.&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Todos:** ¡Y lo eres! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Y%20lo%20eres!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

(Se abrazan. Ratona avanza al público.)

**Ratona (Violet):** Ser lista está bien… <a href="https://translate.google.com/?sl=es&tl=it&text=Ser%20lista%20est%C3%A1%20bien%E2%80%A6&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

**Todos:** ¡Pero ser amable es aún mejor! <a href="https://translate.google.com/?sl=es&tl=it&text=%C2%A1Pero%20ser%20amable%20es%20a%C3%BAn%20mejor!&op=translate" target="_blank"><button type="button" class="btn btn-success">Escucha 🎧</button></a>

(Inclinan. Telón se cierra / Final bow. Curtain closes)