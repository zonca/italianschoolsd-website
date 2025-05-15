---
title: "Arcobaleno"
subtitle: "Il mondo dei colori"
image: /img/Teatro_alla_Scala_interior_Milan_by_Wolfgang_Moroder.jpg
date: 2025-05-08
---

<div style="margin-bottom: 20px;">
  <label for="actorSearch" style="font-weight: bold; margin-right: 10px;">Cerca il tuo nome:</label>
  <input type="text" id="actorSearch" placeholder="Scrivi il tuo nome..." style="padding: 8px; width: 250px; border-radius: 4px; border: 1px solid #ccc;">
  <button onclick="clearSearch()" type="button" class="btn btn-success" style="margin-left: 5px;">Cancella</button>
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
        msg.textContent = 'Nessuna battuta trovata per questo nome.';
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

# Atto I : in scena

**Narratrice (Arielle):** Il Rosso era pieno di energia. <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20Rosso%20era%20pieno%20di%20energia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Narratrice (Arielle):** Il Viola era molto creativo. <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20Viola%20era%20molto%20creativo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Narratrice (Arielle):** Il Verde era molto attento. <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20Verde%20era%20molto%20attento.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Narratrice (Arielle):** Il Blu era sensibile. <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20Blu%20era%20sensibile.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Narratrice (Arielle):** Il Giallo era sempre allegro. <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20Giallo%20era%20sempre%20allegro.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

---

# Atto II : Il litigio

**Ale-Verde:** Ehi tu, stai attenta! Guarda dove cammini! <a href="https://translate.google.com/?sl=it&tl=en&text=Ehi%20tu%2C%20stai%20attenta!%20Guarda%20dove%20cammini!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Daisy-Rosso:** Ma non fare sempre il tranquillone dai e divertiti un po’! <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20non%20fare%20sempre%20il%20tranquillone%20dai%20e%20divertiti%20un%20po%E2%80%99!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Aria-Rosso:** si` e` vero,sempre! <a href="https://translate.google.com/?sl=it&tl=en&text=si%60%20e%60%20vero%2Csempre!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Pierce-Rosso:** Tu non vedi niente,mai! <a href="https://translate.google.com/?sl=it&tl=en&text=Tu%20non%20vedi%20niente%2Cmai!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Dante-Verde:** Calmatevi, dai! Fate i bravi! <a href="https://translate.google.com/?sl=it&tl=en&text=Calmatevi%2C%20dai!%20Fate%20i%20bravi!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ale-Verde:** Sì, sei piena di energia… ma solo nei piedi! <a href="https://translate.google.com/?sl=it&tl=en&text=S%C3%AC%2C%20sei%20piena%20di%20energia%E2%80%A6%20ma%20solo%20nei%20piedi!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Daisy-Rosso:** Basta! Guarda che non ci siamo solo noi! <a href="https://translate.google.com/?sl=it&tl=en&text=Basta!%20Guarda%20che%20non%20ci%20siamo%20solo%20noi!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben-Giallo:** Infatti ci siamo anche noi qui!! Il giallo si vede benissimo! <a href="https://translate.google.com/?sl=it&tl=en&text=Infatti%20ci%20siamo%20anche%20noi%20qui!!%20Il%20giallo%20si%20vede%20benissimo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Damiano-Giallo:** È il momento per un po’ di allegria! <a href="https://translate.google.com/?sl=it&tl=en&text=%C3%88%20il%20momento%20per%20un%20po%E2%80%99%20di%20allegria!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon-Giallo:** Dai ragazzi,divertiamoci! Vi canto una bella canzone! <a href="https://translate.google.com/?sl=it&tl=en&text=Dai%20ragazzi%2Cdivertiamoci!%20Vi%20canto%20una%20bella%20canzone!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Damiano-Giallo:** Ed io suono il tamburo! <a href="https://translate.google.com/?sl=it&tl=en&text=Ed%20io%20suono%20il%20tamburo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre-Blu:** Aspetta! L’allegria è bella, ma serve anche sensibilità per sapere quando usarla. <a href="https://translate.google.com/?sl=it&tl=en&text=Aspetta!%20L%E2%80%99allegria%20%C3%A8%20bella%2C%20ma%20serve%20anche%20sensibilit%C3%A0%20per%20sapere%20quando%20usarla.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Lorenzo-Blu:** Tu hai tanta allegria, ma devi anche usare la testa! <a href="https://translate.google.com/?sl=it&tl=en&text=Tu%20hai%20tanta%20allegria%2C%20ma%20devi%20anche%20usare%20la%20testa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre-Blu:** È vero! Non basta sentire il ritmo… <a href="https://translate.google.com/?sl=it&tl=en&text=%C3%88%20vero!%20Non%20basta%20sentire%20il%20ritmo%E2%80%A6&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Lorenzo-Blu:** dobbiamo sentire tutte le emozioni! <a href="https://translate.google.com/?sl=it&tl=en&text=dobbiamo%20sentire%20tutte%20le%20emozioni!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben-Giallo:** Anche l’allegria è un’emozione! La più bella di tutte! <a href="https://translate.google.com/?sl=it&tl=en&text=Anche%20l%E2%80%99allegria%20%C3%A8%20un%E2%80%99emozione!%20La%20pi%C3%B9%20bella%20di%20tutte!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Damiano-Giallo:** Ed È molto importante! <a href="https://translate.google.com/?sl=it&tl=en&text=Ed%20%C3%88%20molto%20importante!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon-Giallo:** importantissima! E’ il momento per la mia canzone! <a href="https://translate.google.com/?sl=it&tl=en&text=importantissima!%20E%E2%80%99%20il%20momento%20per%20la%20mia%20canzone!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Damiano-Giallo:** Aspetta che vado a prendere il tamburo! <a href="https://translate.google.com/?sl=it&tl=en&text=Aspetta%20che%20vado%20a%20prendere%20il%20tamburo!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ale-Verde:** Ma noo.. Dovete stare più calmi! <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20noo..%20Dovete%20stare%20pi%C3%B9%20calmi!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Dante-Verde:** E pensare prima di parlare, suonare o cantare! <a href="https://translate.google.com/?sl=it&tl=en&text=E%20pensare%20prima%20di%20parlare%2C%20suonare%20o%20cantare!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia-Viola:** Perché non pitturiamo i muri tutti di viola? Mi piace il Viola! <a href="https://translate.google.com/?sl=it&tl=en&text=Perch%C3%A9%20non%20pitturiamo%20i%20muri%20tutti%20di%20viola%3F%20Mi%20piace%20il%20Viola!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria-Viola:** Sii! E disegniamo tante farfalle. <a href="https://translate.google.com/?sl=it&tl=en&text=Sii!%20E%20disegniamo%20tante%20farfalle.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva-Viola:** E tanti fiori colorati!! <a href="https://translate.google.com/?sl=it&tl=en&text=E%20tanti%20fiori%20colorati!!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon-Giallo:** E cantiamo una canzone! “Ogni favola e’ un gioco, che si fa con il tempo..” <a href="https://translate.google.com/?sl=it&tl=en&text=E%20cantiamo%20una%20canzone!%20%E2%80%9COgni%20favola%20e%E2%80%99%20un%20gioco%2C%20che%20si%20fa%20con%20il%20tempo..%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ale-Verde:** Basta!Qui sono tutti matti!Me ne vado <a href="https://translate.google.com/?sl=it&tl=en&text=Basta!Qui%20sono%20tutti%20matti!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Dante-Verde:** Hai ragione! Non si capisce piu’ niente.. <a href="https://translate.google.com/?sl=it&tl=en&text=Hai%20ragione!%20Non%20si%20capisce%20piu%E2%80%99%20niente..&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre-Blu:** Si meglio chiudere e andare.. <a href="https://translate.google.com/?sl=it&tl=en&text=Si%20meglio%20chiudere%20e%20andare..&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Lorenzo-Blu:** si ma dove? <a href="https://translate.google.com/?sl=it&tl=en&text=si%20ma%20dove%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**4 Piccolette:** "Col pennello sulla testa… facciamo festa, festa, festa!" <a href="https://translate.google.com/?sl=it&tl=en&text=%22Col%20pennello%20sulla%20testa%E2%80%A6%20facciamo%20festa%2C%20festa%2C%20festa!%22&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

---

# Atto III: Tavola rotonda

**Ben-Giallo:** Per favore, silenzio. Parliamo del problema. <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20favore%2C%20silenzio.%20Parliamo%20del%20problema.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia-Viola:** Ma quale problema? La creatività è la cosa più importante per noi! <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20quale%20problema%3F%20La%20creativit%C3%A0%20%C3%A8%20la%20cosa%20pi%C3%B9%20importante%20per%20noi!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre-Blu:** Per vedere la bellezza della vita, dobbiamo essere sensibili. <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20vedere%20la%20bellezza%20della%20vita%2C%20dobbiamo%20essere%20sensibili.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Lorenzo-Blu:** Ed è giusto anche piangere, se siamo sensibili. <a href="https://translate.google.com/?sl=it&tl=en&text=Ed%20%C3%A8%20giusto%20anche%20piangere%2C%20se%20siamo%20sensibili.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Daisy-Rosso:** Le lacrime non aiutano! Ci vuole energia e voglia di vivere! <a href="https://translate.google.com/?sl=it&tl=en&text=Le%20lacrime%20non%20aiutano!%20Ci%20vuole%20energia%20e%20voglia%20di%20vivere!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**4 Piccolette:** "Col pennello sulla testa… facciamo festa, festa, festa!" <a href="https://translate.google.com/?sl=it&tl=en&text=%22Col%20pennello%20sulla%20testa%E2%80%A6%20facciamo%20festa%2C%20festa%2C%20festa!%22&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ale-Verde:** Dai, amici colori! Senza attenzione cosa possiamo fare? <a href="https://translate.google.com/?sl=it&tl=en&text=Dai%2C%20amici%20colori!%20Senza%20attenzione%20cosa%20possiamo%20fare%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben-Giallo:** Ho capito! Ognuno vuole essere il più importante. <a href="https://translate.google.com/?sl=it&tl=en&text=Ho%20capito!%20Ognuno%20vuole%20essere%20il%20pi%C3%B9%20importante.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon-Giallo:** Allora facciamo una gara per scegliere il colore guida! <a href="https://translate.google.com/?sl=it&tl=en&text=Allora%20facciamo%20una%20gara%20per%20scegliere%20il%20colore%20guida!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Pierce-Rosso:** Sii, una gara di salto! <a href="https://translate.google.com/?sl=it&tl=en&text=Sii%2C%20una%20gara%20di%20salto!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Ma nooo! Non è una buona idea! <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20nooo!%20Non%20%C3%A8%20una%20buona%20idea!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre-Blu:** Dipingiamo un quadro! È il nostro modo di esprimerci! <a href="https://translate.google.com/?sl=it&tl=en&text=Dipingiamo%20un%20quadro!%20%C3%88%20il%20nostro%20modo%20di%20esprimerci!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Dante-Verde:** Si, Il quadro più bello vince! Vincerò sicuramente io! <a href="https://translate.google.com/?sl=it&tl=en&text=Si%2C%20Il%20quadro%20pi%C3%B9%20bello%20vince!%20Vincer%C3%B2%20sicuramente%20io!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Lorenzo-Blu:** Non possiamo giudicare noi! Non e’ giusto! <a href="https://translate.google.com/?sl=it&tl=en&text=Non%20possiamo%20giudicare%20noi!%20Non%20e%E2%80%99%20giusto!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Damiano-Giallo:** Noi potremmo suonare qualcosa! <a href="https://translate.google.com/?sl=it&tl=en&text=Noi%20potremmo%20suonare%20qualcosa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria-Viola:** C’e’ una persona… <a href="https://translate.google.com/?sl=it&tl=en&text=C%E2%80%99e%E2%80%99%20una%20persona%E2%80%A6&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva-Viola:** si chiama “il pittore della vita”. <a href="https://translate.google.com/?sl=it&tl=en&text=si%20chiama%20%E2%80%9Cil%20pittore%20della%20vita%E2%80%9D.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia-Viola:** È la persona giusta! Io la conosco, eravamo in classe insieme! Era una chiacchierona.. <a href="https://translate.google.com/?sl=it&tl=en&text=%C3%88%20la%20persona%20giusta!%20Io%20la%20conosco%2C%20eravamo%20in%20classe%20insieme!%20Era%20una%20chiacchierona..&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Le 4 piccole:** Chiamiamola subito! <a href="https://translate.google.com/?sl=it&tl=en&text=Chiamiamola%20subito!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

---

# Atto IV: Il pittore della vita guarda i quadri

**Arielle-Narratrice:** "Ma chi è questa pittrice della vita? Scopriamolo insieme! È una donna speciale. Ha un cappello grande e un pennello magico. Cammina piano e guarda tutto con amore. Parla molto e sorride sempre. Con i suoi colori… può far nascere un arcobaleno nel cielo! La pittrice della vita è gentile e saggia. Ama i colori e le persone. Con il suo pennello, disegna fiori, sorrisi e pace. Vuole aiutare tutti ad essere felici insieme." <a href="https://translate.google.com/?sl=it&tl=en&text=%22Ma%20chi%20%C3%A8%20questa%20pittrice%20della%20vita%3F%20Scopriamolo%20insieme!%20%C3%88%20una%20donna%20speciale.%20Ha%20un%20cappello%20grande%20e%20un%20pennello%20magico.%20Cammina%20piano%20e%20guarda%20tutto%20con%20amore.%20Parla%20molto%20e%20sorride%20sempre.%20Con%20i%20suoi%20colori%E2%80%A6%20pu%C3%B2%20far%20nascere%20un%20arcobaleno%20nel%20cielo!%20La%20pittrice%20della%20vita%20%C3%A8%20gentile%20e%20saggia.%20Ama%20i%20colori%20e%20le%20persone.%20Con%20il%20suo%20pennello%2C%20disegna%20fiori%2C%20sorrisi%20e%20pace.%20Vuole%20aiutare%20tutti%20ad%20essere%20felici%20insieme.%22&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita:** Bello, molto bello. È pieno di energia. Ma… manca qualcosa. <a href="https://translate.google.com/?sl=it&tl=en&text=Bello%2C%20molto%20bello.%20%C3%88%20pieno%20di%20energia.%20Ma%E2%80%A6%20manca%20qualcosa.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Manca un po' di giallo per scaldare il sole, un po' di arancione per colorare il cielo. <a href="https://translate.google.com/?sl=it&tl=en&text=Manca%20un%20po%E2%80%99%20di%20giallo%20per%20scaldare%20il%20sole%2C%20un%20po%E2%80%99%20di%20arancione%20per%20colorare%20il%20cielo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** "Così il sole sembra in pigiama… ha bisogno dei suoi vestiti colorati per uscire!" e "Senza arancione, il cielo sembra triste… Dai, mettiamoci un po' di succo d'arancia!" <a href="https://translate.google.com/?sl=it&tl=en&text=%22Cos%C3%AC%20il%20sole%20sembra%20in%20pigiama%E2%80%A6%20ha%20bisogno%20dei%20suoi%20vestiti%20colorati%20per%20uscire!%22%20e%20%22Senza%20arancione%2C%20il%20cielo%20sembra%20triste%E2%80%A6%20Dai%2C%20mettiamoci%20un%20po%E2%80%99%20di%20succo%20d%E2%80%99arancia!%22&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita:** La notte è bella… ma con stelle gialle è ancora più bella! "Così sembra la notte quando manca la corrente! Le stelle sono i sorrisi del cielo… qui manca qualche sorriso!" <a href="https://translate.google.com/?sl=it&tl=en&text=La%20notte%20%C3%A8%20bella%E2%80%A6%20ma%20con%20stelle%20gialle%20%C3%A8%20ancora%20pi%C3%B9%20bella!%20Cos%C3%AC%20sembra%20la%20notte%20quando%20manca%20la%20corrente!%20Le%20stelle%20sono%20i%20sorrisi%20del%20cielo%E2%80%A6%20qui%20manca%20qualche%20sorriso!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita (guardando il quadro blu):** La notte è bella… ma con stelle gialle è ancora più bella! "Così sembra la notte quando manca la corrente! (guardando il pubblico) Le stelle sono i sorrisi del cielo… qui manca qualche sorriso!" <a href="https://translate.google.com/?sl=it&tl=en&text=La%20notte%20%C3%A8%20bella%E2%80%A6%20ma%20con%20stelle%20gialle%20%C3%A8%20ancora%20pi%C3%B9%20bella!%20Cos%C3%AC%20sembra%20la%20notte%20quando%20manca%20la%20corrente!%20Le%20stelle%20sono%20i%20sorrisi%20del%20cielo%E2%80%A6%20qui%20manca%20qualche%20sorriso!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita (guardando il quadro verde):** Questo prato è perfetto… ma dov’è il fiore rosso o quello giallo? "Le api mi hanno detto: ‘Qui non c’è niente di buono!’" <a href="https://translate.google.com/?sl=it&tl=en&text=Questo%20prato%20%C3%A8%20perfetto%E2%80%A6%20ma%20dov%E2%80%99%C3%A8%20il%20fiore%20rosso%20o%20quello%20giallo%3F%20Le%20api%20mi%20hanno%20detto%3A%20%E2%80%98Qui%20non%20c%E2%80%99%C3%A8%20niente%20di%20buono!%E2%80%99&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita (guardando il quadro viola):** "È un quadro pieno di fantasia… ma forse manca un pizzico di realtà!" (guardando il pubblico) "Senza un tocco di rosso, sembra che il quadro abbia dimenticato di mettere il naso fuori di casa!" <a href="https://translate.google.com/?sl=it&tl=en&text=%C3%88%20un%20quadro%20pieno%20di%20fantasia%E2%80%A6%20ma%20forse%20manca%20un%20pizzico%20di%20realt%C3%A0!%20Senza%20un%20tocco%20di%20rosso%2C%20sembra%20che%20il%20quadro%20abbia%20dimenticato%20di%20mettere%20il%20naso%20fuori%20di%20casa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti fermi** <a href="https://translate.google.com/?sl=it&tl=en&text=Tutti%20fermi&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle-Narratrice:** I colori ascoltano in silenzio. Il pittore ha fatto pensare tutti. <a href="https://translate.google.com/?sl=it&tl=en&text=I%20colori%20ascoltano%20in%20silenzio.%20Il%20pittore%20ha%20fatto%20pensare%20tutti.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

(Chiusura tende Maura e Arielle) <a href="https://translate.google.com/?sl=it&tl=en&text=Chiusura%20tende%20Maura%20e%20Arielle&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

# Atto V: Gli anziani parlano del pittore

**Arielle-Narratrice:** Ma gli anziani non erano contenti. Il pittore parlava di novità e cambiamento. <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20gli%20anziani%20non%20erano%20contenti.%20Il%20pittore%20parlava%20di%20novit%C3%A0%20e%20cambiamento.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

(Si apre la tenda Maura e Arielle) <a href="https://translate.google.com/?sl=it&tl=en&text=Si%20apre%20la%20tenda%20Maura%20e%20Arielle&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

In scena solo Daisy, Alessandro, Andre`, Julia, Devon (Gli anziani parlano sottovoce, sembrano preoccupati) <a href="https://translate.google.com/?sl=it&tl=en&text=In%20scena%20solo%20Daisy%2C%20Alessandro%2C%20Andre%60%2C%20Julia%2C%20Devon%20(Gli%20anziani%20parlano%20sottovoce%2C%20sembrano%20preoccupati)&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

## Scena V: Colori vs. pittore

**Julia-Viola:** Non capisco come la tua sensibilità possa aiutare la mia creatività. Io sono perfetta cosi come sono! <a href="https://translate.google.com/?sl=it&tl=en&text=Non%20capisco%20come%20la%20tua%20sensibilit%C3%A0%20possa%20aiutare%20la%20mia%20creativit%C3%A0.%20Io%20sono%20perfetta%20cosi%20come%20sono!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre`-Blu:** Forse ci manca qualcosa a tutti… <a href="https://translate.google.com/?sl=it&tl=en&text=Forse%20ci%20manca%20qualcosa%20a%20tutti%E2%80%A6&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ale-Verde:** A volte penso troppo… e non faccio niente! <a href="https://translate.google.com/?sl=it&tl=en&text=A%20volte%20penso%20troppo%E2%80%A6%20e%20non%20faccio%20niente!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Daisy-Rosso:** Ma finora abbiamo vissuto da soli. Perché cambiare ora? Io non voglio cambiare! <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20finora%20abbiamo%20vissuto%20da%20soli.%20Perch%C3%A9%20cambiare%20ora%3F%20Io%20non%20voglio%20cambiare!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Andre`-Blu:** (al pittore) Tu pensi che possiamo cambiare? <a href="https://translate.google.com/?sl=it&tl=en&text=al%20pittore%20Tu%20pensi%20che%20possiamo%20cambiare%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita:** Sì! Voi siete tutti belli e speciali. Ma insieme potete essere ancora più belli! <a href="https://translate.google.com/?sl=it&tl=en&text=S%C3%AC!%20Voi%20siete%20tutti%20belli%20e%20speciali.%20Ma%20insieme%20potete%20essere%20ancora%20pi%C3%B9%20belli!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita:** Provate a mescolare i vostri colori. Aiutatevi. Ascoltatevi. Così la vostra vita sarà piena di luce! <a href="https://translate.google.com/?sl=it&tl=en&text=Provate%20a%20mescolare%20i%20vostri%20colori.%20Aiutatevi.%20Ascoltatevi.%20Cos%C3%AC%20la%20vostra%20vita%20sar%C3%A0%20piena%20di%20luce!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**4 Piccolette:** (entrano correndo e fanno un giro attorno al tavolo poi si fermano davanti al pubblico e dicono.. ) "Col pennello sulla testa… facciamo festa, festa, festa!" <a href="https://translate.google.com/?sl=it&tl=en&text=Col%20pennello%20sulla%20testa%E2%80%A6%20facciamo%20festa%2C%20festa%2C%20festa!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon-Giallo:** (guardando i piccoli) Beh, a loro potremmo cambiare almeno la battuta! <a href="https://translate.google.com/?sl=it&tl=en&text=Beh%2C%20a%20loro%20potremmo%20cambiare%20almeno%20la%20battuta!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

(Il pittore dà loro un foglio bianco e esce.) <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20pittore%20d%C3%A0%20loro%20un%20foglio%20bianco%20e%20esce.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

Entrano tutti gli altri e fanno finta di parlare tra loro poi si mettono tutti intorno al tavolo tondo e fanno finta di dipingere. (preparare disegno con le impronte colorate di tutti i bimbi) <a href="https://translate.google.com/?sl=it&tl=en&text=Entrano%20tutti%20gli%20altri%20e%20fanno%20finta%20di%20parlare%20tra%20loro%20poi%20si%20mettono%20tutti%20intorno%20al%20tavolo%20tondo%20e%20fanno%20finta%20di%20dipingere.%20(preparare%20disegno%20con%20le%20impronte%20colorate%20di%20tutti%20i%20bimbi)&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

Silenzio parla la narratrice. <a href="https://translate.google.com/?sl=it&tl=en&text=Silenzio%20parla%20la%20narratrice.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle-Narratrice:** Quanta verità nelle favole! E noi? Viviamo con un solo colore O vogliamo dipingere la vita con tutti i colori? <a href="https://translate.google.com/?sl=it&tl=en&text=Quanta%20verit%C3%A0%20nelle%20favole!%20E%20noi%3F%20Viviamo%20con%20un%20solo%20colore%20O%20vogliamo%20dipingere%20la%20vita%20con%20tutti%20i%20colori%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

Chiusura tenda <a href="https://translate.google.com/?sl=it&tl=en&text=Chiusura%20tenda&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

# Scena Finale

**Arielle-Narratrice:** I colori sono pieni di speranza. Hanno capito il messaggio. <a href="https://translate.google.com/?sl=it&tl=en&text=I%20colori%20sono%20pieni%20di%20speranza.%20Hanno%20capito%20il%20messaggio.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

Apertura tenda (Maura Arielle) <a href="https://translate.google.com/?sl=it&tl=en&text=Apertura%20tenda%20(Maura%20Arielle)&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Pierce-Aria:** (entrano correndo e urlando) Pittore vieni! <a href="https://translate.google.com/?sl=it&tl=en&text=entrano%20correndo%20e%20urlando%20Pittore%20vieni!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

(Il pittore torna per salutare tutti.) <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20pittore%20torna%20per%20salutare%20tutti.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria -Eva:** (mostrando il nuovo quadro al pittore): Guarda! Abbiamo imparato! <a href="https://translate.google.com/?sl=it&tl=en&text=mostrando%20il%20nuovo%20quadro%20al%20pittore%20Guarda!%20Abbiamo%20imparato!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina-Pittrice della vita:** Bravi, avete capito! Amicizia, rispetto e colori diversi… questo è il segreto! <a href="https://translate.google.com/?sl=it&tl=en&text=Bravi%2C%20avete%20capito!%20Amicizia%2C%20rispetto%20e%20colori%20diversi%E2%80%A6%20questo%20%C3%A8%20il%20segreto!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

Tutti esultano per la gioia! Poi silenzio <a href="https://translate.google.com/?sl=it&tl=en&text=Tutti%20esultano%20per%20la%20gioia!%20Poi%20silenzio&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle-Narratrice:** La nostra favola è finita. Ma ora tocca a noi: coloriamo la nostra vita con mille colori! <a href="https://translate.google.com/?sl=it&tl=en&text=La%20nostra%20favola%20%C3%A8%20finita.%20Ma%20ora%20tocca%20a%20noi%3A%20coloriamo%20la%20nostra%20vita%20con%20mille%20colori!&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>