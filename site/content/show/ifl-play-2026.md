---
title: "Un viaggio in Italia"
subtitle: "Recita di fine anno – Ifl ‘26"
image: /img/home-about-section.jpg
date: 2026-05-07
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
    const sectionHeaders = document.querySelectorAll('h1, h2, h3');
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


## Personaggi

Annabella, Arielle, Ben, Carolina, Caterina, Chiara A, Chiara B, Cosima, Devon, Eva, Giorgio, Giorgio/ Samuele, Julia, Kaleb, Link YouTube, Luisa, Max, Milena, Samuel, Siena, Tutti, Tutti e tre \+ i piccoli, Tutti i piccoli, Victoria

---


## Indice delle scene

- [SCENA 1 – INTRODUZIONE](#scena-1-introduzione)
- [SCENA 2 – PREPARIAMO LA VALIGIA](#scena-2-prepariamo-la-valigia)
- [SCENA 3 – L’AEREO**](#scena-3-laereo**)
- [SCENA 4 – ROMA](#scena-4-roma)
- [SCENA 5 – FIRENZE](#scena-5-firenze)
- [SCENA 6 – VENEZIA](#scena-6-venezia)
- [SCENA 7 – MILANO](#scena-7-milano)
- [SCENA 8 – NAPOLI](#scena-8-napoli)
- [SCENA 9 – LE ISOLE](#scena-9-le-isole)
- [SCENA 10 – L’ITALIA FINALE](#scena-10-litalia-finale)

---


1. **APERTURA MUSICALE** (Canzoncina del buongiorno dei piccoli): [0Jlamf8cPW8](https://www.youtube.com/watch?v=0Jlamf8cPW8&list=RD0Jlamf8cPW8&start_radio=1)  
2. **SCENA 4 – ROMA** ("Roma Capoccia" di Antonello Venditti): [YZLnG NrsCYg](https://www.youtube.com/watch?v=YZLnGNrsCYg&utm_source=chatgpt.com)  
3. **SCENA 5 – FIRENZE** ("Firenze sogna" di Claudio Villa): [z-8b3AmBnbQ](https://www.youtube.com/watch?v=z-8b3AmBnbQ&list=RDz-8b3AmBnbQ&start_radio=1)  
4. **SCENA 6 – VENEZIA** (Pre-scene song, second mention): [Rf9FJqX\_qYE](https://www.youtube.com/watch?v=Rf9FJqX_qYE&list=RDRf9FJqX_qYE&start_radio=1)  
5. **SCENA 7 – MILANO** ("Milano" di Lucio Dalla): [iTrMfJ39VS4](https://www.youtube.com/watch?v=iTrMfJ39VS4&list=RDiTrMfJ39VS4&start_radio=1)  
6. **SCENA 8 – NAPOLI** (Pre-scene song): [hWtL6nfV5HM](https://www.youtube.com/watch?v=hWtL6nfV5HM&list=RDhWtL6nfV5HM&start_radio=1)  
7. **SCENA 9 – LE ISOLE** (Pre-scene song): [3nxoYO6dsiY](https://www.youtube.com/watch?v=3nxoYO6dsiY&list=RD3nxoYO6dsiY&start_radio=1)  
8. **SCENA 10 – L’ITALIA FINALE** (Song by Mino Reitano): [rlwuYMo-\_Es](https://www.youtube.com/watch?v=rlwuYMo-_Es)  
9. **CANZONE FINALE** ("Arrivederci"): [au\_mgfqv7A4](https://www.youtube.com/watch?v=au_mgfqv7A4&list=RDau_mgfqv7A4&start_radio=1)

## **UN VIAGGIO IN ITALIA \-** Italian School of San Diego \- Recita di fine anno – Ifl ‘26

## **APERTURA MUSICALE \- Canzoncina del buongiorno dei piccoli**

**Link YouTube:** [https://www.youtube.com/watch?v=0Jlamf8cPW8\&list=RD0Jlamf8cPW8\&start\_radio=1](https://www.youtube.com/watch?v=0Jlamf8cPW8&list=RD0Jlamf8cPW8&start_radio=1) <a href="https://translate.google.com/?sl=it&tl=en&text=%5Bhttps%3A//www.youtube.com/watch%3Fv%3D0Jlamf8cPW8%5C%26list%3DRD0Jlamf8cPW8%5C%26start%5C_radio%3D1%5D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

#### **Buongiorno a te**

**Ritornello**  
Buongiorno a te,  
buongiorno a voi,  
buongiorno a tutti noi.

**Strofa 1**  
Il saluto è ricordarsi che  
nel mio cuore c’è posto anche per te.  
Basta un sorriso, un gesto di bontà,  
per donare la felicità.

**Ritornello**  
Buongiorno a te,  
buongiorno a voi,  
buongiorno a tutti noi.

**Strofa 2**  
Il saluto è ricordarsi che  
un amico è sempre accanto a te.  
Basta un gesto, la stretta di una mano,  
ma la forza è quella di un vulcano.

**Ritornello**  
Buongiorno a te,  
buongiorno a voi,  
buongiorno a tutti noi.

(Finita la canzone, i piccoli si siedono in fondo al palco)

#

#

<a name="scena-1-introduzione"></a>

## **SCENA 1 – INTRODUZIONE**

*Entrano In scena **Ben, Annabella e Devon** con una cartelletta in mano per la presentazione.*

**Ben:** Buonasera a tutti\! Io sono **Ben**. <a href="https://translate.google.com/?sl=it&tl=en&text=Buonasera%20a%20tutti%5C%21%20Io%20sono%20Ben.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Io sono **Annabella**. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20sono%20Annabella.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** E io sono **Devon**. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20io%20sono%20Devon.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Signore e signori, benvenuti all’**Italian School of San Diego**\! <a href="https://translate.google.com/?sl=it&tl=en&text=Signore%20e%20signori%2C%20benvenuti%20all%E2%80%99Italian%20School%20of%20San%20Diego%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Oggi vi portiamo con noi in un viaggio speciale in Italia.  
 Insieme visiteremo città bellissime, scopriremo la cultura, le tradizioni e alcune parole della lingua italiana. <a href="https://translate.google.com/?sl=it&tl=en&text=Oggi%20vi%20portiamo%20con%20noi%20in%20un%20viaggio%20speciale%20in%20Italia.%20%20%0A%20Insieme%20visiteremo%20citt%C3%A0%20bellissime%2C%20scopriremo%20la%20cultura%2C%20le%20tradizioni%20e%20alcune%20parole%20della%20lingua%20italiana.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** L’Italia è un paese molto amato.  
Ha città famose, arte bellissima, paesaggi diversi e cibi tipici molto buoni. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20un%20paese%20molto%20amato.%20%20%0AHa%20citt%C3%A0%20famose%2C%20arte%20bellissima%2C%20paesaggi%20diversi%20e%20cibi%20tipici%20molto%20buoni.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Ogni regione è diversa.  
Ogni città è speciale.  
Ogni luogo ha una storia da raccontare. <a href="https://translate.google.com/?sl=it&tl=en&text=Ogni%20regione%20%C3%A8%20diversa.%20%20%0AOgni%20citt%C3%A0%20%C3%A8%20speciale.%20%20%0AOgni%20luogo%20ha%20una%20storia%20da%20raccontare.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Studiare una lingua non vuol dire solo imparare parole nuove.  
Vuol dire anche scoprire un mondo nuovo.  
Vuol dire ascoltare, osservare, parlare e conoscere persone, luoghi e tradizioni. <a href="https://translate.google.com/?sl=it&tl=en&text=Studiare%20una%20lingua%20non%20vuol%20dire%20solo%20imparare%20parole%20nuove.%20%20%0AVuol%20dire%20anche%20scoprire%20un%20mondo%20nuovo.%20%20%0AVuol%20dire%20ascoltare%2C%20osservare%2C%20parlare%20e%20conoscere%20persone%2C%20luoghi%20e%20tradizioni.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Questa sera vogliamo condividere tutto questo con voi.  
Per questo non vedrete solo una recita, ma farete anche voi un piccolo viaggio in Italia e nella lingua italiana. <a href="https://translate.google.com/?sl=it&tl=en&text=Questa%20sera%20vogliamo%20condividere%20tutto%20questo%20con%20voi.%20%20%0APer%20questo%20non%20vedrete%20solo%20una%20recita%2C%20ma%20farete%20anche%20voi%20un%20piccolo%20viaggio%20in%20Italia%20e%20nella%20lingua%20italiana.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Siete pronti a viaggiare con noi?  
**Are you ready to travel with us?** <a href="https://translate.google.com/?sl=it&tl=en&text=Siete%20pronti%20a%20viaggiare%20con%20noi%3F%20%20%0AAre%20you%20ready%20to%20travel%20with%20us%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** *(si alzano in piedi, guardano i genitori e gridano)*  
Sììììì\! <a href="https://translate.google.com/?sl=it&tl=en&text=S%C3%AC%C3%AC%C3%AC%C3%AC%C3%AC%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:**

**Annabella:** Allora, partiamo davvero. <a href="https://translate.google.com/?sl=it&tl=en&text=Allora%2C%20partiamo%20davvero.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ma per viaggiare non bastano solo una valigia e un biglietto.  
Ci vuole anche fantasia. <a href="https://translate.google.com/?sl=it&tl=en&text=Ma%20per%20viaggiare%20non%20bastano%20solo%20una%20valigia%20e%20un%20biglietto.%20%20%0ACi%20vuole%20anche%20fantasia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ogni città che visiteremo oggi ha qualcosa da raccontare. <a href="https://translate.google.com/?sl=it&tl=en&text=Ogni%20citt%C3%A0%20che%20visiteremo%20oggi%20ha%20qualcosa%20da%20raccontare.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** In alcune città vedremo monumenti famosi.  
In altre scopriremo cibi tipici buonissimi.  
In altre ancora troveremo tradizioni, feste, maschere, musica e modi diversi di vivere. <a href="https://translate.google.com/?sl=it&tl=en&text=In%20alcune%20citt%C3%A0%20vedremo%20monumenti%20famosi.%20%20%0AIn%20altre%20scopriremo%20cibi%20tipici%20buonissimi.%20%20%0AIn%20altre%20ancora%20troveremo%20tradizioni%2C%20feste%2C%20maschere%2C%20musica%20e%20modi%20diversi%20di%20vivere.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ogni tappa del nostro viaggio ci farà conoscere una parte diversa dell’Italia. <a href="https://translate.google.com/?sl=it&tl=en&text=Ogni%20tappa%20del%20nostro%20viaggio%20ci%20far%C3%A0%20conoscere%20una%20parte%20diversa%20dell%E2%80%99Italia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** A volte rideremo.  
A volte impareremo una parola nuova.  
A volte ci sembrerà di essere davvero lì. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20volte%20rideremo.%20%20%0AA%20volte%20impareremo%20una%20parola%20nuova.%20%20%0AA%20volte%20ci%20sembrer%C3%A0%20di%20essere%20davvero%20l%C3%AC.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Per questo vi chiediamo di viaggiare con noi con gli occhi, con le orecchie e con l’immaginazione. <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20questo%20vi%20chiediamo%20di%20viaggiare%20con%20noi%20con%20gli%20occhi%2C%20con%20le%20orecchie%20e%20con%20l%E2%80%99immaginazione.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Io vi accompagno durante il viaggio. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20vi%20accompagno%20durante%20il%20viaggio.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Andremo piano, un passo alla volta.  
Prima prepariamo la valigia.  
Poi partiamo.  
Poi arriviamo in tante città italiane. <a href="https://translate.google.com/?sl=it&tl=en&text=Andremo%20piano%2C%20un%20passo%20alla%20volta.%20%20%0APrima%20prepariamo%20la%20valigia.%20%20%0APoi%20partiamo.%20%20%0APoi%20arriviamo%20in%20tante%20citt%C3%A0%20italiane.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Vedremo posti diversi, ascolteremo parole nuove e incontreremo tante scene divertenti.  
Se ogni tanto succederà un po’ di confusione, va bene così.  
Anche i viaggi più belli a volte cominciano in modo buffo. <a href="https://translate.google.com/?sl=it&tl=en&text=Vedremo%20posti%20diversi%2C%20ascolteremo%20parole%20nuove%20e%20incontreremo%20tante%20scene%20divertenti.%20%20%0ASe%20ogni%20tanto%20succeder%C3%A0%20un%20po%E2%80%99%20di%20confusione%2C%20va%20bene%20cos%C3%AC.%20%20%0AAnche%20i%20viaggi%20pi%C3%B9%20belli%20a%20volte%20cominciano%20in%20modo%20buffo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Io resterò con voi per accompagnarvi da una città all’altra. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20rester%C3%B2%20con%20voi%20per%20accompagnarvi%20da%20una%20citt%C3%A0%20all%E2%80%99altra.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** E allora... <a href="https://translate.google.com/?sl=it&tl=en&text=E%20allora...&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** ...la nostra avventura... <a href="https://translate.google.com/?sl=it&tl=en&text=...la%20nostra%20avventura...&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** ...può cominciare. <a href="https://translate.google.com/?sl=it&tl=en&text=...pu%C3%B2%20cominciare.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti e tre \+ i piccoli:** *( gridano)* Si parte\! <a href="https://translate.google.com/?sl=it&tl=en&text=Si%20parte%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*Chiusura sipario- preparazione dei props sul palco, spegnere proiettore*

**Tutti e tre \+ i piccoli:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-2-prepariamo-la-valigia"></a>

## **SCENA 2 – PREPARIAMO LA VALIGIA (scrivere nomi sui props, portare valigia, la banana)**

**Annabella:** Bambini, prima di partire facciamo un piccolo ripasso di vocabolario.  
Io dico una parola e voi la ripetete forte. <a href="https://translate.google.com/?sl=it&tl=en&text=Bambini%2C%20prima%20di%20partire%20facciamo%20un%20piccolo%20ripasso%20di%20vocabolario.%20%20%0AIo%20dico%20una%20parola%20e%20voi%20la%20ripetete%20forte.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Valigia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Valigia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Valigia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Valigia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Maglietta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Maglietta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Maglietta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Maglietta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Pantaloni\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pantaloni%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Pantaloni\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pantaloni%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Scarpe\! <a href="https://translate.google.com/?sl=it&tl=en&text=Scarpe%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Scarpe\! <a href="https://translate.google.com/?sl=it&tl=en&text=Scarpe%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Cappello\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cappello%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Cappello\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cappello%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Passaporto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Passaporto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti i piccoli:** Passaporto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Passaporto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Bravissimi. Adesso prepariamo la valigia per il nostro viaggio in Italia. <a href="https://translate.google.com/?sl=it&tl=en&text=Bravissimi.%20Adesso%20prepariamo%20la%20valigia%20per%20il%20nostro%20viaggio%20in%20Italia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Luisa:** Io metto l’acqua. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20l%E2%80%99acqua.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva:** Io metto i pantaloni. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20i%20pantaloni.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara B:** Io metto le scarpe. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20le%20scarpe.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Cosima:** Io metto il cappello. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20il%20cappello.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria:** Io metto il pigiama. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20il%20pigiama.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io metto... una banana\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto...%20una%20banana%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** (Tutti ridono.)

**Samuel:** No, Max.. La banana no\! <a href="https://translate.google.com/?sl=it&tl=en&text=No%2C%20Max..%20La%20banana%20no%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara A:** Io metto una maglietta. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20una%20maglietta.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Caterina:** Io metto un vestito. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto%20un%20vestito.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Giorgio:** Io metto... i biscotti\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20metto...%20i%20biscotti%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Giorgio:** (Tutti ridono.)

**Devon:** Molto bene.  
Abbiamo quasi tutto.  
Ma c’è una cosa importantissima per partire... <a href="https://translate.google.com/?sl=it&tl=en&text=Molto%20bene.%20%20%0AAbbiamo%20quasi%20tutto.%20%20%0AMa%20c%E2%80%99%C3%A8%20una%20cosa%20importantissima%20per%20partire...&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** (pausa)

**Devon:** Avete il passaporto? <a href="https://translate.google.com/?sl=it&tl=en&text=Avete%20il%20passaporto%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** (I bambini tirano fuori il passaporto e lo sventolano.)

**Tutti i piccoli:** Sìììì\! <a href="https://translate.google.com/?sl=it&tl=en&text=S%C3%AC%C3%AC%C3%AC%C3%AC%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*Preparazione props per scena successiva*

**Tutti i piccoli:** ## <a href="https://translate.google.com/?sl=it&tl=en&text=%23%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-3-laereo**"></a>

## **SCENA 3 – L’AEREO** (proiettare immagine interno aereo)

*(I bambini sono seduti come in aereo. Devon può stare davanti come piccolo accompagnatore di volo.)*

**Devon:** Signore e signori, benvenuti a bordo\!  
 Il nostro aereo sta per partire per l’Italia. Prima del decollo facciamo un piccolo gioco:  
 impariamo insieme alcune parole italiane del viaggio.  
 Io dico la parola… e voi la ripetete forte. <a href="https://translate.google.com/?sl=it&tl=en&text=Signore%20e%20signori%2C%20benvenuti%20a%20bordo%5C%21%20%20%0A%20Il%20nostro%20aereo%20sta%20per%20partire%20per%20l%E2%80%99Italia.%20Prima%20del%20decollo%20facciamo%20un%20piccolo%20gioco%3A%20%20%0A%20impariamo%20insieme%20alcune%20parole%20italiane%20del%20viaggio.%20%20%0A%20Io%20dico%20la%20parola%E2%80%A6%20e%20voi%20la%20ripetete%20forte.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Aereo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Aereo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Aereo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Aereo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Biglietto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Biglietto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Biglietto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Biglietto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Finestrino\! <a href="https://translate.google.com/?sl=it&tl=en&text=Finestrino%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Finestrino\! <a href="https://translate.google.com/?sl=it&tl=en&text=Finestrino%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Valigia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Valigia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Valigia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Valigia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Passaporto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Passaporto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Passaporto\! <a href="https://translate.google.com/?sl=it&tl=en&text=Passaporto%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Bravissimi\! Adesso sì… siamo davvero pronti.  
 Tutti seduti bene.  Il viaggio comincia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Bravissimi%5C%21%20Adesso%20s%C3%AC%E2%80%A6%20siamo%20davvero%20pronti.%20%20%0A%20Tutti%20seduti%20bene.%20%20Il%20viaggio%20comincia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Luisa:** Io guardo fuori. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20guardo%20fuori.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva:** Io sono felice\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20sono%20felice%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Samuel**: Io sono felice\!

**Victoria:** Io voglio il finestrino\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20voglio%20il%20finestrino%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io ho fame\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20ho%20fame%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara A:** Io non vedo l’ora. <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20non%20vedo%20l%E2%80%99ora.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Caterina:** Neanch’io. <a href="https://translate.google.com/?sl=it&tl=en&text=Neanch%E2%80%99io.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara B:** Io guardo le nuvole\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20guardo%20le%20nuvole%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Che bello\!  
 Sul nostro aereo c’è chi guarda fuori, chi pensa al cibo, chi si emoziona e chi sogna già di arrivare in Italia. <a href="https://translate.google.com/?sl=it&tl=en&text=Che%20bello%5C%21%20%20%0A%20Sul%20nostro%20aereo%20c%E2%80%99%C3%A8%20chi%20guarda%20fuori%2C%20chi%20pensa%20al%20cibo%2C%20chi%20si%20emoziona%20e%20chi%20sogna%20gi%C3%A0%20di%20arrivare%20in%20Italia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** Quando si parte per un viaggio si possono sentire tante cose insieme:  
 gioia, curiosità, sorpresa… e anche un po’ di agitazione.  
Ma va bene così.  
 Perché viaggiare vuol dire anche questo:  
 lasciare un posto… per scoprirne un altro. <a href="https://translate.google.com/?sl=it&tl=en&text=Quando%20si%20parte%20per%20un%20viaggio%20si%20possono%20sentire%20tante%20cose%20insieme%3A%20%20%0A%20gioia%2C%20curiosit%C3%A0%2C%20sorpresa%E2%80%A6%20e%20anche%20un%20po%E2%80%99%20di%20agitazione.%20%20%0AMa%20va%20bene%20cos%C3%AC.%20%20%0A%20Perch%C3%A9%20viaggiare%20vuol%20dire%20anche%20questo%3A%20%20%0A%20lasciare%20un%20posto%E2%80%A6%20per%20scoprirne%20un%20altro.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Bravissimi.  
 Adesso facciamo ancora un piccolo ripasso di parole utili,  
 così quando arriviamo siamo già pronti a parlare italiano. <a href="https://translate.google.com/?sl=it&tl=en&text=Bravissimi.%20%20%0A%20Adesso%20facciamo%20ancora%20un%20piccolo%20ripasso%20di%20parole%20utili%2C%20%20%0A%20cos%C3%AC%20quando%20arriviamo%20siamo%20gi%C3%A0%20pronti%20a%20parlare%20italiano.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ciao\! <a href="https://translate.google.com/?sl=it&tl=en&text=Ciao%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Ciao\! <a href="https://translate.google.com/?sl=it&tl=en&text=Ciao%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Buongiorno\! <a href="https://translate.google.com/?sl=it&tl=en&text=Buongiorno%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Buongiorno\! <a href="https://translate.google.com/?sl=it&tl=en&text=Buongiorno%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Grazie\! <a href="https://translate.google.com/?sl=it&tl=en&text=Grazie%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Grazie\! <a href="https://translate.google.com/?sl=it&tl=en&text=Grazie%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Per favore\! <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20favore%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Per favore\! <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20favore%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Mi piace\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mi%20piace%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Mi piace\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mi%20piace%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Italia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Italia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Italia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Italia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** Perfetto. Con queste parole, con i nostri sorrisi e con tanta voglia di scoprire,possiamo davvero iniziare il nostro viaggio in Italia. <a href="https://translate.google.com/?sl=it&tl=en&text=Perfetto.%20Con%20queste%20parole%2C%20con%20i%20nostri%20sorrisi%20e%20con%20tanta%20voglia%20di%20scoprire%2Cpossiamo%20davvero%20iniziare%20il%20nostro%20viaggio%20in%20Italia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*(Chiusura sipario, preparazione del prop successivo e pulizia del palco inizio  musica)*

**Devon:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-4-roma"></a>

## **SCENA 4 – ROMA**

*Prima della parte di Kaleb, parte in sottofondo “Roma Capoccia” di Antonello Venditti, dal minuto 0:00 al minuto 0:56. I bambini e Annabella sono seduti sul palco sul lato sx.*  
**Link YouTube:**  
[https://www.youtube.com/watch?v=YZLnGNrsCYg](https://www.youtube.com/watch?v=YZLnGNrsCYg&utm_source=chatgpt.com)

(Entra **Kaleb**.)

**Kaleb:**

***Welcome to Rome, the capital of Italy, the Eternal City, beautiful and full of wonders.***  
 Benvenuti a **Roma**, la capitale d’Italia, città eterna, bellissima e piena di meraviglie.

**Kaleb:** Roma si trova nel **Lazio**, una regione ricca di storia, cultura, ville antiche, laghi e paesaggi molto diversi.  
 **Il Lazio custodisce tesori famosi in tutto il mondo, ma anche luoghi più tranquilli e pieni di fascino, come i laghi, i borghi antichi e le ville storiche.** <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%20si%20trova%20nel%20Lazio%2C%20una%20regione%20ricca%20di%20storia%2C%20cultura%2C%20ville%20antiche%2C%20laghi%20e%20paesaggi%20molto%20diversi.%20%20%0A%20Il%20Lazio%20custodisce%20tesori%20famosi%20in%20tutto%20il%20mondo%2C%20ma%20anche%20luoghi%20pi%C3%B9%20tranquilli%20e%20pieni%20di%20fascino%2C%20come%20i%20laghi%2C%20i%20borghi%20antichi%20e%20le%20ville%20storiche.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Roma è chiamata la **Città Eterna**, perché la sua storia sembra non finire mai.  
 Qui il passato e il presente camminano insieme: basta guardarsi intorno per vedere rovine antiche, piazze, chiese, fontane e strade sempre piene di vita. <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%20%C3%A8%20chiamata%20la%20Citt%C3%A0%20Eterna%2C%20perch%C3%A9%20la%20sua%20storia%20sembra%20non%20finire%20mai.%20%20%0A%20Qui%20il%20passato%20e%20il%20presente%20camminano%20insieme%3A%20basta%20guardarsi%20intorno%20per%20vedere%20rovine%20antiche%2C%20piazze%2C%20chiese%2C%20fontane%20e%20strade%20sempre%20piene%20di%20vita.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Uno dei simboli più famosi è il **Colosseo**, grande, imponente e conosciuto in tutto il mondo.  
 È uno dei monumenti più importanti di Roma e ci fa pensare alla grandezza dell’antica Roma. <a href="https://translate.google.com/?sl=it&tl=en&text=Uno%20dei%20simboli%20pi%C3%B9%20famosi%20%C3%A8%20il%20Colosseo%2C%20grande%2C%20imponente%20e%20conosciuto%20in%20tutto%20il%20mondo.%20%20%0A%20%C3%88%20uno%20dei%20monumenti%20pi%C3%B9%20importanti%20di%20Roma%20e%20ci%20fa%20pensare%20alla%20grandezza%20dell%E2%80%99antica%20Roma.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Poi c’è la **Fontana di Trevi**, splendida e famosissima, dove tante persone lanciano una moneta per esprimere un desiderio e sperare di tornare un giorno a Roma. <a href="https://translate.google.com/?sl=it&tl=en&text=Poi%20c%E2%80%99%C3%A8%20la%20Fontana%20di%20Trevi%2C%20splendida%20e%20famosissima%2C%20dove%20tante%20persone%20lanciano%20una%20moneta%20per%20esprimere%20un%20desiderio%20e%20sperare%20di%20tornare%20un%20giorno%20a%20Roma.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** *( si alza)*  Io lancio una moneta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20lancio%20una%20moneta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Luisa:** *( si alza)* Anch’io\! <a href="https://translate.google.com/?sl=it&tl=en&text=Anch%E2%80%99io%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Roma è una città piena di meraviglie.  
Ci sono piazze bellissime, monumenti famosi, strade sempre piene di persone, gelaterie, artisti e tanta energia.  
 Ogni angolo sembra raccontare una storia. <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%20%C3%A8%20una%20citt%C3%A0%20piena%20di%20meraviglie.%20%20%0ACi%20sono%20piazze%20bellissime%2C%20monumenti%20famosi%2C%20strade%20sempre%20piene%20di%20persone%2C%20gelaterie%2C%20artisti%20e%20tanta%20energia.%20%20%0A%20Ogni%20angolo%20sembra%20raccontare%20una%20storia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** A Roma si mangiano piatti molto amati come la **carbonara**, la **cacio e pepe** e l’**amatriciana**.  
 La cucina romana è semplice, saporita e molto famosa anche fuori dall’Italia. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Roma%20si%20mangiano%20piatti%20molto%20amati%20come%20la%20carbonara%2C%20la%20cacio%20e%20pepe%20e%20l%E2%80%99amatriciana.%20%20%0A%20La%20cucina%20romana%20%C3%A8%20semplice%2C%20saporita%20e%20molto%20famosa%20anche%20fuori%20dall%E2%80%99Italia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Un nome famoso legato a Roma, conosciuto anche dagli americani, è **Federico Fellini**, uno dei più celebri registi italiani del Novecento. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%20nome%20famoso%20legato%20a%20Roma%2C%20conosciuto%20anche%20dagli%20americani%2C%20%C3%A8%20Federico%20Fellini%2C%20uno%20dei%20pi%C3%B9%20celebri%20registi%20italiani%20del%20Novecento.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Una frase famosa dice: **“Roma non fu fatta in un giorno.”**  
In inglese: **“Rome wasn’t built in a day.”** <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20frase%20famosa%20dice%3A%20%E2%80%9CRoma%20non%20fu%20fatta%20in%20un%20giorno.%E2%80%9D%20%20%0AIn%20inglese%3A%20%E2%80%9CRome%20wasn%E2%80%99t%20built%20in%20a%20day.%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** E una curiosità divertente?  
A Roma ci sono le **statue parlanti**. I romani, tanto tempo fa, scrivevano messaggi su queste statue e per questo sembrava che le statue parlassero davvero\! <a href="https://translate.google.com/?sl=it&tl=en&text=E%20una%20curiosit%C3%A0%20divertente%3F%20%20%0AA%20Roma%20ci%20sono%20le%20statue%20parlanti.%20I%20romani%2C%20tanto%20tempo%20fa%2C%20scrivevano%20messaggi%20su%20queste%20statue%20e%20per%20questo%20sembrava%20che%20le%20statue%20parlassero%20davvero%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Roma è una città che unisce storia, bellezza, cucina e immaginazione.  
 Per questo tante persone la visitano, la amano… e vogliono sempre tornarci. <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%20%C3%A8%20una%20citt%C3%A0%20che%20unisce%20storia%2C%20bellezza%2C%20cucina%20e%20immaginazione.%20%20%0A%20Per%20questo%20tante%20persone%20la%20visitano%2C%20la%20amano%E2%80%A6%20e%20vogliono%20sempre%20tornarci.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** *( si alza)* Bambini, impariamo le parole di Roma. Fontana\! <a href="https://translate.google.com/?sl=it&tl=en&text=Bambini%2C%20impariamo%20le%20parole%20di%20Roma.%20Fontana%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** *( si alzano e guardano il pubblico)* Fontana\! <a href="https://translate.google.com/?sl=it&tl=en&text=Fontana%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Moneta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Moneta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Moneta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Moneta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Colosseo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Colosseo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Colosseo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Colosseo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Pasta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pasta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Pasta\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pasta%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** Roma resta nel cuore. <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%20resta%20nel%20cuore.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Roma\! <a href="https://translate.google.com/?sl=it&tl=en&text=Roma%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*(chiusura sipario , sostituzione del cartellone , inizio nuova musica, bambini seduti alla sx con Annabella)*

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-5-firenze"></a>

## **SCENA 5 – FIRENZE**

Prima dell’ingresso di Julia, parte in sottofondo “Firenze sogna” di Claudio Villa.  
**Link YouTube:**  
[**https://www.youtube.com/watch?v=z-8b3AmBnbQ\&list=RDz-8b3AmBnbQ\&start\_radio=1**](https://www.youtube.com/watch?v=z-8b3AmBnbQ&list=RDz-8b3AmBnbQ&start_radio=1)

(Entra **Julia**.)

**Julia:** **(Entra Julia.)**

***Welcome to Florence, in Tuscany. Florence is a beautiful, elegant city, famous all over the world for art.***  
Benvenuti a **Firenze, in Toscana**. Firenze è una città bella, elegante e famosa in tutto il mondo per l’arte.

**Julia:** Firenze è una città molto importante del **Rinascimento.** Qui ricordiamo persone famose come **Dante, Michelangelo e Leonardo da Vinci.** <a href="https://translate.google.com/?sl=it&tl=en&text=Firenze%20%C3%A8%20una%20citt%C3%A0%20molto%20importante%20del%20Rinascimento.%20Qui%20ricordiamo%20persone%20famose%20come%20Dante%2C%20Michelangelo%20e%20Leonardo%20da%20Vinci.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** Il centro storico di Firenze è **Patrimonio UNESCO.** <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20centro%20storico%20di%20Firenze%20%C3%A8%20Patrimonio%20UNESCO.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Dante** è spesso chiamato il padre della lingua italiana. La sua opera più famosa è la **Divina Commedia.** È un viaggio immaginario tra Inferno, Purgatorio e Paradiso. Ancora oggi molte persone studiano questo libro, perché è molto importante per la letteratura italiana.

**Michelangelo** è uno degli artisti più famosi del mondo. A Firenze c’è il suo **David,** una statua molto alta e molto bella. Il David mostra forza, coraggio ed eleganza. È una delle opere più famose dell’arte italiana.

**Julia:** Anche **Leonardo da Vinci** è legato a Firenze e alla Toscana. Alcune sue opere famose sono **l’Annunciazione e l’Adorazione dei Magi,** che sono agli Uffizi. Leonardo non era solo un pittore. Studiava la natura, il corpo umano, le macchine e il mondo. <a href="https://translate.google.com/?sl=it&tl=en&text=Anche%20Leonardo%20da%20Vinci%20%C3%A8%20legato%20a%20Firenze%20e%20alla%20Toscana.%20Alcune%20sue%20opere%20famose%20sono%20l%E2%80%99Annunciazione%20e%20l%E2%80%99Adorazione%20dei%20Magi%2C%20che%20sono%20agli%20Uffizi.%20Leonardo%20non%20era%20solo%20un%20pittore.%20Studiava%20la%20natura%2C%20il%20corpo%20umano%2C%20le%20macchine%20e%20il%20mondo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** Il simbolo di Firenze è il **Duomo di Santa Maria del Fiore,** con la sua grande cupola.   
La Cupola del Duomo è ancora oggi la più grande cupola in muratura del mondo. Fu progettata da Filippo Brunelleschi e costruita tra il 1420 (millequattrocentoventi) e il 1436 (millequattrocentotrentasei). <a href="https://translate.google.com/?sl=it&tl=en&text=Il%20simbolo%20di%20Firenze%20%C3%A8%20il%20Duomo%20di%20Santa%20Maria%20del%20Fiore%2C%20con%20la%20sua%20grande%20cupola.%20%20%20%0ALa%20Cupola%20del%20Duomo%20%C3%A8%20ancora%20oggi%20la%20pi%C3%B9%20grande%20cupola%20in%20muratura%20del%20mondo.%20Fu%20progettata%20da%20Filippo%20Brunelleschi%20e%20costruita%20tra%20il%201420%20%20e%20il%201436%20.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** A Firenze c’è anche il **Ponte Vecchio**, un ponte antico e molto famoso. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Firenze%20c%E2%80%99%C3%A8%20anche%20il%20Ponte%20Vecchio%2C%20un%20ponte%20antico%20e%20molto%20famoso.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** A Firenze si può vedere anche il dito di Galileo Galilei. Al Museo Galileo c’è davvero il dito medio della mano destra di Galileo. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Firenze%20si%20pu%C3%B2%20vedere%20anche%20il%20dito%20di%20Galileo%20Galilei.%20Al%20Museo%20Galileo%20c%E2%80%99%C3%A8%20davvero%20il%20dito%20medio%20della%20mano%20destra%20di%20Galileo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Galileo** era uno scienziato italiano. Studiava il cielo, le stelle e i pianeti. È famoso perché aiutò le persone a capire meglio l’universo.

**Julia:** A Firenze si mangia la **bistecca alla fiorentina.** In Toscana sono importanti anche l’artigianato, le botteghe e il lavoro fatto con cura. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Firenze%20si%20mangia%20la%20bistecca%20alla%20fiorentina.%20In%20Toscana%20sono%20importanti%20anche%20l%E2%80%99artigianato%2C%20le%20botteghe%20e%20il%20lavoro%20fatto%20con%20cura.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** Una curiosità simpatica: a Firenze c’è il Porcellino, una famosa statua di cinghiale. Si dice che toccare il suo naso porti fortuna. Molti turisti lo toccano ed esprimono un desiderio. <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20curiosit%C3%A0%20simpatica%3A%20a%20Firenze%20c%E2%80%99%C3%A8%20il%20Porcellino%2C%20una%20famosa%20statua%20di%20cinghiale.%20Si%20dice%20che%20toccare%20il%20suo%20naso%20porti%20fortuna.%20Molti%20turisti%20lo%20toccano%20ed%20esprimono%20un%20desiderio.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** Una frase famosa di Dante dice:  
 **“Fatti non foste a viver come bruti...”**  
In inglese significa:  
 **“You were not made to live like beasts...”** <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20frase%20famosa%20di%20Dante%20dice%3A%20%20%0A%20%E2%80%9CFatti%20non%20foste%20a%20viver%20come%20bruti...%E2%80%9D%20%20%0AIn%20inglese%20significa%3A%20%20%0A%20%E2%80%9CYou%20were%20not%20made%20to%20live%20like%20beasts...%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** *( si alza)* Adesso impariamo nuove parole. Arte\! <a href="https://translate.google.com/?sl=it&tl=en&text=Adesso%20impariamo%20nuove%20parole.%20Arte%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Arte\! <a href="https://translate.google.com/?sl=it&tl=en&text=Arte%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ponte\! <a href="https://translate.google.com/?sl=it&tl=en&text=Ponte%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Ponte\! <a href="https://translate.google.com/?sl=it&tl=en&text=Ponte%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Cupola\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cupola%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Cupola\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cupola%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Pittura\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pittura%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Pittura\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pittura%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Bellissimo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Bellissimo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Bellissimo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Bellissimo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io sono artista\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20sono%20artista%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva:** Cos’è? <a href="https://translate.google.com/?sl=it&tl=en&text=Cos%E2%80%99%C3%A8%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara B:** Una pizza? <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20pizza%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Giorgio:** Mah\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mah%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** Firenze insegna la bellezza. <a href="https://translate.google.com/?sl=it&tl=en&text=Firenze%20insegna%20la%20bellezza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Firenze\! <a href="https://translate.google.com/?sl=it&tl=en&text=Firenze%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-6-venezia"></a>

## **SCENA 6 – VENEZIA**

*Prima della scena di Venezia, parte in sottofondo la canzone:* [https://www.youtube.com/watch?v=Rf9FJqX\_qYE\&list=RDRf9FJqX\_qYE\&start\_radio=1](https://www.youtube.com/watch?v=Rf9FJqX_qYE&list=RDRf9FJqX_qYE&start_radio=1)

(Entra **Arielle**.)

**Arielle:**

**Welcome to Venice, in the Veneto region, a city that is unique in the world.**  
Benvenuti a **Venezia**, nella regione **Veneto**, una città unica al mondo.

**Arielle:** Venezia è fatta di canali, ponti, gondole e palazzi che sembrano usciti da un sogno.  
Qui l’acqua accompagna ogni passo e ogni angolo sembra raccontare una storia. <a href="https://translate.google.com/?sl=it&tl=en&text=Venezia%20%C3%A8%20fatta%20di%20canali%2C%20ponti%2C%20gondole%20e%20palazzi%20che%20sembrano%20usciti%20da%20un%20sogno.%20%20%0AQui%20l%E2%80%99acqua%20accompagna%20ogni%20passo%20e%20ogni%20angolo%20sembra%20raccontare%20una%20storia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** Uno dei luoghi più famosi è **Piazza San Marco**, con la basilica e il campanile.  
E poi ci sono le **gondole**, eleganti e romantiche, simbolo della città. <a href="https://translate.google.com/?sl=it&tl=en&text=Uno%20dei%20luoghi%20pi%C3%B9%20famosi%20%C3%A8%20Piazza%20San%20Marco%2C%20con%20la%20basilica%20e%20il%20campanile.%20%20%0AE%20poi%20ci%20sono%20le%20gondole%2C%20eleganti%20e%20romantiche%2C%20simbolo%20della%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**La gondola e\` una barca lunga e stretta,** è lunga circa **11 (undici) metri** e si **guida con un solo remo.** Il gondoliere rema stando in piedi, dietro la barca.

**È fatta in modo speciale.** Per costruirla si usano **otto tipi di legno** ed è composta da **più di 280 (duecentoottanta) pezzi**.

**Ha una forma un po’ asimmetrica.** Questo aiuta la gondola ad andare dritta anche se viene spinta da un solo lato.

**Davanti ha un ferro decorato.** Si chiama **ferro di prua** ed è uno degli elementi più riconoscibili della gondola.

**Arielle:** Su una gondola possono salire fino a 5 persone**.** È una regola del servizio pubblico di gondola a Venezia. <a href="https://translate.google.com/?sl=it&tl=en&text=Su%20una%20gondola%20possono%20salire%20fino%20a%205%20persone.%20%C3%88%20una%20regola%20del%20servizio%20pubblico%20di%20gondola%20a%20Venezia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria:** Io sono in gondola\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20sono%20in%20gondola%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Cosima:** Anch’io\! <a href="https://translate.google.com/?sl=it&tl=en&text=Anch%E2%80%99io%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** Un’altra tradizione famosissima è il **Carnevale di Venezia**, con maschere bellissime, costumi ricchi e un’atmosfera quasi magica. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%E2%80%99altra%20tradizione%20famosissima%20%C3%A8%20il%20Carnevale%20di%20Venezia%2C%20con%20maschere%20bellissime%2C%20costumi%20ricchi%20e%20un%E2%80%99atmosfera%20quasi%20magica.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Le maschere servivano a non farsi riconoscere**, così durante il Carnevale le persone potevano divertirsi e sentirsi tutte più uguali.

**Arielle:** Una delle maschere più famose è la **bauta**, bianca e molto elegante. <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20delle%20maschere%20pi%C3%B9%20famose%20%C3%A8%20la%20bauta%2C%20bianca%20e%20molto%20elegante.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** A Venezia durante il Carnevale si vedono spesso **abiti ricchi, mantelli, cappelli e maschere decorate** che sembrano usciti da una fiaba. <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Venezia%20durante%20il%20Carnevale%20si%20vedono%20spesso%20abiti%20ricchi%2C%20mantelli%2C%20cappelli%20e%20maschere%20decorate%20che%20sembrano%20usciti%20da%20una%20fiaba.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara A:** Maschera\! <a href="https://translate.google.com/?sl=it&tl=en&text=Maschera%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Caterina:** Bella\! <a href="https://translate.google.com/?sl=it&tl=en&text=Bella%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Giorgio/ Samuele:** Splash\! <a href="https://translate.google.com/?sl=it&tl=en&text=Splash%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*(Tutti ridono.)*

**Arielle:** Venezia è una città delicata, preziosa e indimenticabile. <a href="https://translate.google.com/?sl=it&tl=en&text=Venezia%20%C3%A8%20una%20citt%C3%A0%20delicata%2C%20preziosa%20e%20indimenticabile.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** Dal punto di vista del cibo, Venezia è legata al mare.  
Per questo troviamo piatti di pesce e di riso, come il famoso **risotto al nero di seppia**. <a href="https://translate.google.com/?sl=it&tl=en&text=Dal%20punto%20di%20vista%20del%20cibo%2C%20Venezia%20%C3%A8%20legata%20al%20mare.%20%20%0APer%20questo%20troviamo%20piatti%20di%20pesce%20e%20di%20riso%2C%20come%20il%20famoso%20risotto%20al%20nero%20di%20seppia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** Una curiosità divertente?  
A Venezia è facilissimo perdersi... ma quasi nessuno si dispiace, perché anche perdersi è parte della magia. <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20curiosit%C3%A0%20divertente%3F%20%20%0AA%20Venezia%20%C3%A8%20facilissimo%20perdersi...%20ma%20quasi%20nessuno%20si%20dispiace%2C%20perch%C3%A9%20anche%20perdersi%20%C3%A8%20parte%20della%20magia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** Un nome famoso che tanti conoscono è **Marco Polo**, il grande viaggiatore veneziano. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%20nome%20famoso%20che%20tanti%20conoscono%20%C3%A8%20Marco%20Polo%2C%20il%20grande%20viaggiatore%20veneziano.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Marco Polo- Marco Polo- Marco Polo <a href="https://translate.google.com/?sl=it&tl=en&text=Marco%20Polo-%20Marco%20Polo-%20Marco%20Polo&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Una frase semplice che si può dire è:  
**“Venezia sembra un sogno.”**  
In inglese: **“Venice feels like a dream.”** <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20frase%20semplice%20che%20si%20pu%C3%B2%20dire%20%C3%A8%3A%20%20%0A%E2%80%9CVenezia%20sembra%20un%20sogno.%E2%80%9D%20%20%0AIn%20inglese%3A%20%E2%80%9CVenice%20feels%20like%20a%20dream.%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Venezia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Venezia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-7-milano"></a>

## **SCENA 7 – MILANO**

Prima dell’ingresso di Milena, parte in sottofondo “Milano” di Lucio Dalla, dal minuto 0:00 al minuto 1:26.  
**Link YouTube: [https://www.youtube.com/watch?v=iTrMfJ39VS4\&list=RDiTrMfJ39VS4\&start\_radio=1](https://www.youtube.com/watch?v=iTrMfJ39VS4&list=RDiTrMfJ39VS4&start_radio=1)**

(Entra **Milena**.)

**Milena:**

***Welcome to Milan, in the Lombardy region, an elegant, modern city full of energy.***  
Benvenuti a Milano, nella regione Lombardia, una città elegante, moderna e piena di energia.

**Milena:** Milano è una città che corre veloce, ma non dimentica la sua storia.  
È famosa nel mondo per la moda, per il design, per il lavoro, per la musica e per la sua vita culturale. <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%20%C3%A8%20una%20citt%C3%A0%20che%20corre%20veloce%2C%20ma%20non%20dimentica%20la%20sua%20storia.%20%20%0A%C3%88%20famosa%20nel%20mondo%20per%20la%20moda%2C%20per%20il%20design%2C%20per%20il%20lavoro%2C%20per%20la%20musica%20e%20per%20la%20sua%20vita%20culturale.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** In piazzale **Cadorna** c’è la famosa scultura **“Ago, filo e nodo”**, **un enorme ago con un filo colorato** **che esce e rientra in punti diversi della piazza**, come se stesse davvero cucendo la città. <a href="https://translate.google.com/?sl=it&tl=en&text=In%20piazzale%20Cadorna%20c%E2%80%99%C3%A8%20la%20famosa%20scultura%20%E2%80%9CAgo%2C%20filo%20e%20nodo%E2%80%9D%2C%20un%20enorme%20ago%20con%20un%20filo%20colorato%20che%20esce%20e%20rientra%20in%20punti%20diversi%20della%20piazza%2C%20come%20se%20stesse%20davvero%20cucendo%20la%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Milano e\`  una città internazionale, creativa e sempre in movimento. <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%20e%5C%60%20%20una%20citt%C3%A0%20internazionale%2C%20creativa%20e%20sempre%20in%20movimento.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Uno dei suoi simboli più importanti è il Duomo di Milano.  
Con le sue guglie, le statue e la sua architettura gotica, il Duomo lascia tutti a bocca aperta, è considerato il **più grande e complesso edificio gotico d’Italia**, sembra quasi un castello di marmo.  
È uno dei monumenti più famosi d’Italia e il cuore della città.**Sul Duomo c’è la Madonnina,** una statua dorata che guarda la città da **109 (centonove) metri** di altezza. È uno dei simboli più amati di Milano. <a href="https://translate.google.com/?sl=it&tl=en&text=Uno%20dei%20suoi%20simboli%20pi%C3%B9%20importanti%20%C3%A8%20il%20Duomo%20di%20Milano.%20%20%0ACon%20le%20sue%20guglie%2C%20le%20statue%20e%20la%20sua%20architettura%20gotica%2C%20il%20Duomo%20lascia%20tutti%20a%20bocca%20aperta%2C%20%C3%A8%20considerato%20il%20pi%C3%B9%20grande%20e%20complesso%20edificio%20gotico%20d%E2%80%99Italia%2C%20sembra%20quasi%20un%20castello%20di%20marmo.%20%20%0A%C3%88%20uno%20dei%20monumenti%20pi%C3%B9%20famosi%20d%E2%80%99Italia%20e%20il%20cuore%20della%20citt%C3%A0.Sul%20Duomo%20c%E2%80%99%C3%A8%20la%20Madonnina%2C%20una%20statua%20dorata%20che%20guarda%20la%20citt%C3%A0%20da%20109%20%20metri%20di%20altezza.%20%C3%88%20uno%20dei%20simboli%20pi%C3%B9%20amati%20di%20Milano.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Milano è famosa anche per il grande teatro La Scala, uno dei teatri d’opera più celebri del mondo.  
La Scala fu inaugurata nel 1778 (millesettecentosettantotto) ed e\` diventata un simbolo internazionale della musica, dell’opera e del balletto. <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%20%C3%A8%20famosa%20anche%20per%20il%20grande%20teatro%20La%20Scala%2C%20uno%20dei%20teatri%20d%E2%80%99opera%20pi%C3%B9%20celebri%20del%20mondo.%20%20%0ALa%20Scala%20fu%20inaugurata%20nel%201778%20%20ed%20e%5C%60%20diventata%20un%20simbolo%20internazionale%20della%20musica%2C%20dell%E2%80%99opera%20e%20del%20balletto.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Milano è famosa anche per i Navigli, i canali che rendono una parte della città più romantica e vivace.  
Oggi i Navigli sono amati per le passeggiate, per i ponti, per l’acqua, per i locali e per l’atmosfera piena di vita, soprattutto la sera. <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%20%C3%A8%20famosa%20anche%20per%20i%20Navigli%2C%20i%20canali%20che%20rendono%20una%20parte%20della%20citt%C3%A0%20pi%C3%B9%20romantica%20e%20vivace.%20%20%0AOggi%20i%20Navigli%20sono%20amati%20per%20le%20passeggiate%2C%20per%20i%20ponti%2C%20per%20l%E2%80%99acqua%2C%20per%20i%20locali%20e%20per%20l%E2%80%99atmosfera%20piena%20di%20vita%2C%20soprattutto%20la%20sera.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Cosima:** Io passeggio sui Navigli\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20passeggio%20sui%20Navigli%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io faccio la sfilata\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20faccio%20la%20sfilata%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Un personaggio famosissimo legato a Milano è Leonardo da Vinci.  
A Milano Leonardo ha lasciato una delle opere più celebri del mondo: Il Cenacolo o l’Ultima Cena,opera famosa in tutto il mondo, dipinto tra il 1494 (millequattrocentonovantaquattro) e il 1498 (millequattrocentonovantotto) nel refettorio di Santa Maria delle Grazie.  
Milano e\` una città dove l’arte antica e la vita moderna stanno insieme con grande naturalezza. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%20personaggio%20famosissimo%20legato%20a%20Milano%20%C3%A8%20Leonardo%20da%20Vinci.%20%20%0AA%20Milano%20Leonardo%20ha%20lasciato%20una%20delle%20opere%20pi%C3%B9%20celebri%20del%20mondo%3A%20Il%20Cenacolo%20o%20l%E2%80%99Ultima%20Cena%2Copera%20famosa%20in%20tutto%20il%20mondo%2C%20dipinto%20tra%20il%201494%20%20e%20il%201498%20%20nel%20refettorio%20di%20Santa%20Maria%20delle%20Grazie.%20%20%0AMilano%20e%5C%60%20una%20citt%C3%A0%20dove%20l%E2%80%99arte%20antica%20e%20la%20vita%20moderna%20stanno%20insieme%20con%20grande%20naturalezza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Nuovo vocabolario\! <a href="https://translate.google.com/?sl=it&tl=en&text=Nuovo%20vocabolario%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Moda\! <a href="https://translate.google.com/?sl=it&tl=en&text=Moda%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Moda\! <a href="https://translate.google.com/?sl=it&tl=en&text=Moda%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Teatro\! <a href="https://translate.google.com/?sl=it&tl=en&text=Teatro%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Teatro\! <a href="https://translate.google.com/?sl=it&tl=en&text=Teatro%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Musica\! <a href="https://translate.google.com/?sl=it&tl=en&text=Musica%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Musica\! <a href="https://translate.google.com/?sl=it&tl=en&text=Musica%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Canale\! <a href="https://translate.google.com/?sl=it&tl=en&text=Canale%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Canale\! <a href="https://translate.google.com/?sl=it&tl=en&text=Canale%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Elegante\! <a href="https://translate.google.com/?sl=it&tl=en&text=Elegante%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Elegante\! <a href="https://translate.google.com/?sl=it&tl=en&text=Elegante%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Duomo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Duomo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Duomo\! <a href="https://translate.google.com/?sl=it&tl=en&text=Duomo%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Scala\! <a href="https://translate.google.com/?sl=it&tl=en&text=Scala%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Scala\! <a href="https://translate.google.com/?sl=it&tl=en&text=Scala%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** Milano corre veloce, ma con stile. <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%20corre%20veloce%2C%20ma%20con%20stile.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Milano\! <a href="https://translate.google.com/?sl=it&tl=en&text=Milano%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-8-napoli"></a>

## **SCENA 8 – NAPOLI**

*Prima della scena di Napoli, parte in sottofondo la canzone:* [https://www.youtube.com/watch?v=hWtL6nfV5HM\&list=RDhWtL6nfV5HM\&start\_radio=1](https://www.youtube.com/watch?v=hWtL6nfV5HM&list=RDhWtL6nfV5HM&start_radio=1)

(Entra **Siena**.)

**Siena:**

***Welcome to Naples, in Campania, a city full of voices, light, music, colors, and passion.***  
Benvenuti a **Napoli**, in **Campania**, una città piena di voce, luce, musica, colori e passione.

**Siena:** Napoli è una città antichissima, fondata dai Greci. Per secoli è stata una delle città più importanti del Sud Italia e una capitale ricchissima di arte, cultura e tradizioni. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20%C3%A8%20una%20citt%C3%A0%20antichissima%2C%20fondata%20dai%20Greci.%20Per%20secoli%20%C3%A8%20stata%20una%20delle%20citt%C3%A0%20pi%C3%B9%20importanti%20del%20Sud%20Italia%20e%20una%20capitale%20ricchissima%20di%20arte%2C%20cultura%20e%20tradizioni.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Napoli ha avuto una storia molto movimentata. Dopo le origini greche e il periodo romano, la città passò nei secoli sotto diversi domini, tra cui **Normanni, Svevi, Angioini, Aragonesi, Spagnoli, Austriaci e Borbone**. Proprio per questo Napoli ha raccolto influenze diverse nell’arte, nell’architettura, nella lingua e nelle tradizioni. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20ha%20avuto%20una%20storia%20molto%20movimentata.%20Dopo%20le%20origini%20greche%20e%20il%20periodo%20romano%2C%20la%20citt%C3%A0%20pass%C3%B2%20nei%20secoli%20sotto%20diversi%20domini%2C%20tra%20cui%20Normanni%2C%20Svevi%2C%20Angioini%2C%20Aragonesi%2C%20Spagnoli%2C%20Austriaci%20e%20Borbone.%20Proprio%20per%20questo%20Napoli%20ha%20raccolto%20influenze%20diverse%20nell%E2%80%99arte%2C%20nell%E2%80%99architettura%2C%20nella%20lingua%20e%20nelle%20tradizioni.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Napoli guarda il mare, ma alle sue spalle si alza il **Vesuvio**, un **vulcano** famosissimo.  
Il Vesuvio domina tutto il golfo e rende il paesaggio ancora più magico.  
È uno dei simboli della città. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20guarda%20il%20mare%2C%20ma%20alle%20sue%20spalle%20si%20alza%20il%20Vesuvio%2C%20un%20vulcano%20famosissimo.%20%20%0AIl%20Vesuvio%20domina%20tutto%20il%20golfo%20e%20rende%20il%20paesaggio%20ancora%20pi%C3%B9%20magico.%20%20%0A%C3%88%20uno%20dei%20simboli%20della%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva:** Io vedo il vulcano\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20vedo%20il%20vulcano%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Luisa:** Che grande\! <a href="https://translate.google.com/?sl=it&tl=en&text=Che%20grande%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** A Napoli si trova la Biblioteca Nazionale Vittorio Emanuele III (terzo), una delle biblioteche più importanti d’Italia. Fu aperta al pubblico nel 1804 (milleottocentoquattro) . <a href="https://translate.google.com/?sl=it&tl=en&text=A%20Napoli%20si%20trova%20la%20Biblioteca%20Nazionale%20Vittorio%20Emanuele%20III%20%2C%20una%20delle%20biblioteche%20pi%C3%B9%20importanti%20d%E2%80%99Italia.%20Fu%20aperta%20al%20pubblico%20nel%201804%20%20.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Napoli è famosa anche per la sua università: la Federico II, fondata nel 1224 (milleduecentoventiquattro) dall’imperatore Federico II. È considerata la più antica università statale del mondo ancora attiva ed è uno dei grandi orgogli della città. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20%C3%A8%20famosa%20anche%20per%20la%20sua%20universit%C3%A0%3A%20la%20Federico%20II%2C%20fondata%20nel%201224%20%20dall%E2%80%99imperatore%20Federico%20II.%20%C3%88%20considerata%20la%20pi%C3%B9%20antica%20universit%C3%A0%20statale%20del%20mondo%20ancora%20attiva%20ed%20%C3%A8%20uno%20dei%20grandi%20orgogli%20della%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Napoli è famosa in tutto il mondo per il suo cibo, soprattutto per la **pizza**. L’UNESCO ha riconosciuto l’**arte del pizzaiuolo napoletano** come patrimonio culturale immateriale, perché non conta solo la pizza in sé, ma anche il sapere, i gesti e la tradizione con cui viene preparata. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20%C3%A8%20famosa%20in%20tutto%20il%20mondo%20per%20il%20suo%20cibo%2C%20soprattutto%20per%20la%20pizza.%20L%E2%80%99UNESCO%20ha%20riconosciuto%20l%E2%80%99arte%20del%20pizzaiuolo%20napoletano%20come%20patrimonio%20culturale%20immateriale%2C%20perch%C3%A9%20non%20conta%20solo%20la%20pizza%20in%20s%C3%A9%2C%20ma%20anche%20il%20sapere%2C%20i%20gesti%20e%20la%20tradizione%20con%20cui%20viene%20preparata.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Oltre alla pizza, Napoli è conosciuta anche per tanti altri cibi tipici, dolci e salati. La cucina napoletana è una parte importantissima della vita della città. <a href="https://translate.google.com/?sl=it&tl=en&text=Oltre%20alla%20pizza%2C%20Napoli%20%C3%A8%20conosciuta%20anche%20per%20tanti%20altri%20cibi%20tipici%2C%20dolci%20e%20salati.%20La%20cucina%20napoletana%20%C3%A8%20una%20parte%20importantissima%20della%20vita%20della%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Tra i personaggi più amati legati a Napoli c’è **Totò**, il cui vero nome era **Antonio De Curtis**, nato a Napoli nel **1898 (milleottocentonovantotto)**, e diventato uno dei più grandi attori comici italiani. <a href="https://translate.google.com/?sl=it&tl=en&text=Tra%20i%20personaggi%20pi%C3%B9%20amati%20legati%20a%20Napoli%20c%E2%80%99%C3%A8%20Tot%C3%B2%2C%20il%20cui%20vero%20nome%20era%20Antonio%20De%20Curtis%2C%20nato%20a%20Napoli%20nel%201898%20%2C%20e%20diventato%20uno%20dei%20pi%C3%B9%20grandi%20attori%20comici%20italiani.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Un altro personaggio famoso legato a Napoli  e al calcio è **Diego Armando Maradona**, diventato uno dei simboli della città. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%20altro%20personaggio%20famoso%20legato%20a%20Napoli%20%20e%20al%20calcio%20%C3%A8%20Diego%20Armando%20Maradona%2C%20diventato%20uno%20dei%20simboli%20della%20citt%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Una frase famosissima dice:  
**“Vedi Napoli e poi muori.”**  
In inglese: **“See Naples and then die.”**  
Vuol dire che Napoli è così bella e intensa da lasciare un ricordo indimenticabile. <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20frase%20famosissima%20dice%3A%20%20%0A%E2%80%9CVedi%20Napoli%20e%20poi%20muori.%E2%80%9D%20%20%0AIn%20inglese%3A%20%E2%80%9CSee%20Naples%20and%20then%20die.%E2%80%9D%20%20%0AVuol%20dire%20che%20Napoli%20%C3%A8%20cos%C3%AC%20bella%20e%20intensa%20da%20lasciare%20un%20ricordo%20indimenticabile.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io faccio la pizza\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20faccio%20la%20pizza%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara A:** Pizza\! <a href="https://translate.google.com/?sl=it&tl=en&text=Pizza%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Caterina:** Buona\! <a href="https://translate.google.com/?sl=it&tl=en&text=Buona%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Ancora parole nuove. <a href="https://translate.google.com/?sl=it&tl=en&text=Ancora%20parole%20nuove.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Vulcano\! <a href="https://translate.google.com/?sl=it&tl=en&text=Vulcano%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Vulcano\! <a href="https://translate.google.com/?sl=it&tl=en&text=Vulcano%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Mare\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mare%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Mare\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mare%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Musica\! <a href="https://translate.google.com/?sl=it&tl=en&text=Musica%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Musica\! <a href="https://translate.google.com/?sl=it&tl=en&text=Musica%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Cuore\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cuore%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Cuore\! <a href="https://translate.google.com/?sl=it&tl=en&text=Cuore%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Napoli canta anche quando parla. <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%20canta%20anche%20quando%20parla.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Napoli\! <a href="https://translate.google.com/?sl=it&tl=en&text=Napoli%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-9-le-isole"></a>

## **SCENA 9 – LE ISOLE**

*Prima della scena delle isole, parte in sottofondo la canzone:*  
[**https://www.youtube.com/watch?v=3nxoYO6dsiY\&list=RD3nxoYO6dsiY\&start\_radio=1**](https://www.youtube.com/watch?v=3nxoYO6dsiY&list=RD3nxoYO6dsiY&start_radio=1)

(Entra **Carolina:**)

**Carolina:** ***We have visited some of the great Italian cities.***  
***Now I will tell you about Italy’s most famous and important islands: Sicily and Sardinia***.  
 Abbiamo conosciuto alcune grandi città italiane.  
 Ora vi racconterò delle isole più famose e importanti d’Italia: **Sicilia e Sardegna.** <a href="https://translate.google.com/?sl=it&tl=en&text=We%20have%20visited%20some%20of%20the%20great%20Italian%20cities.%20%20%0ANow%20I%20will%20tell%20you%20about%20Italy%E2%80%99s%20most%20famous%20and%20important%20islands%3A%20Sicily%20and%20Sardinia.%20%20%0A%20Abbiamo%20conosciuto%20alcune%20grandi%20citt%C3%A0%20italiane.%20%20%0A%20Ora%20vi%20racconter%C3%B2%20delle%20isole%20pi%C3%B9%20famose%20e%20importanti%20d%E2%80%99Italia%3A%20Sicilia%20e%20Sardegna.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Sono due isole molto grandi, ricche di storia, tradizioni, bellezze naturali e caratteristiche uniche. <a href="https://translate.google.com/?sl=it&tl=en&text=Sono%20due%20isole%20molto%20grandi%2C%20ricche%20di%20storia%2C%20tradizioni%2C%20bellezze%20naturali%20e%20caratteristiche%20uniche.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** La Sicilia è l’isola più grande del Mediterraneo.  
È famosa per il mare, per i templi antichi, per il cibo buonissimo e per l**’Etna,** uno dei vulcani più celebri del mondo.  
L’Etna supera oggi i 3300 (tremilatrecento) metri di altezza, è molto attivo ed è stato inserito nella lista del **Patrimonio Mondiale UNESCO nel 2013 (duemilatredici).** <a href="https://translate.google.com/?sl=it&tl=en&text=La%20Sicilia%20%C3%A8%20l%E2%80%99isola%20pi%C3%B9%20grande%20del%20Mediterraneo.%20%20%0A%C3%88%20famosa%20per%20il%20mare%2C%20per%20i%20templi%20antichi%2C%20per%20il%20cibo%20buonissimo%20e%20per%20l%E2%80%99Etna%2C%20uno%20dei%20vulcani%20pi%C3%B9%20celebri%20del%20mondo.%20%20%0AL%E2%80%99Etna%20supera%20oggi%20i%203300%20%20metri%20di%20altezza%2C%20%C3%A8%20molto%20attivo%20ed%20%C3%A8%20stato%20inserito%20nella%20lista%20del%20Patrimonio%20Mondiale%20UNESCO%20nel%202013%20.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Intorno all’Etna la terra vulcanica è molto fertile.  
 Per questo si coltivano agrumi, ulivi, pistacchi e vigne.  
 La pietra lavica e la sabbia hanno spesso un colore nero o molto scuro, proprio perché nascono dalla lava. <a href="https://translate.google.com/?sl=it&tl=en&text=Intorno%20all%E2%80%99Etna%20la%20terra%20vulcanica%20%C3%A8%20molto%20fertile.%20%20%0A%20Per%20questo%20si%20coltivano%20agrumi%2C%20ulivi%2C%20pistacchi%20e%20vigne.%20%20%0A%20La%20pietra%20lavica%20e%20la%20sabbia%20hanno%20spesso%20un%20colore%20nero%20o%20molto%20scuro%2C%20proprio%20perch%C3%A9%20nascono%20dalla%20lava.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** In Sicilia ci sono templi antichissimi.  
 La **Valle dei Templi di Agrigento** è uno dei siti archeologici più importanti del mondo antico e custodisce il Tempio della Concordia, costruito intorno al 430 (quattrocentotrenta) avanti Cristo e considerato uno dei templi greci meglio conservati al mondo. <a href="https://translate.google.com/?sl=it&tl=en&text=In%20Sicilia%20ci%20sono%20templi%20antichissimi.%20%20%0A%20La%20Valle%20dei%20Templi%20di%20Agrigento%20%C3%A8%20uno%20dei%20siti%20archeologici%20pi%C3%B9%20importanti%20del%20mondo%20antico%20e%20custodisce%20il%20Tempio%20della%20Concordia%2C%20costruito%20intorno%20al%20430%20%20avanti%20Cristo%20e%20considerato%20uno%20dei%20templi%20greci%20meglio%20conservati%20al%20mondo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** La Sicilia è famosissima anche per i dolci, come il cannolo di ricotta e la granita con la brioscia. <a href="https://translate.google.com/?sl=it&tl=en&text=La%20Sicilia%20%C3%A8%20famosissima%20anche%20per%20i%20dolci%2C%20come%20il%20cannolo%20di%20ricotta%20e%20la%20granita%20con%20la%20brioscia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Un personaggio famoso legato alla Sicilia è Luigi Pirandello, nato vicino ad Agrigento.  
 È stato uno scrittore molto importante e ancora oggi è conosciuto in tutto il mondo. <a href="https://translate.google.com/?sl=it&tl=en&text=Un%20personaggio%20famoso%20legato%20alla%20Sicilia%20%C3%A8%20Luigi%20Pirandello%2C%20nato%20vicino%20ad%20Agrigento.%20%20%0A%20%C3%88%20stato%20uno%20scrittore%20molto%20importante%20e%20ancora%20oggi%20%C3%A8%20conosciuto%20in%20tutto%20il%20mondo.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** E una curiosità? Vicino all’Etna, nelle antiche storie greche, si raccontava che vivessero i Ciclopi, giganti fortissimi con un occhio solo.  
Per questo il vulcano sembrava ancora più misterioso. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20una%20curiosit%C3%A0%3F%20Vicino%20all%E2%80%99Etna%2C%20nelle%20antiche%20storie%20greche%2C%20si%20raccontava%20che%20vivessero%20i%20Ciclopi%2C%20giganti%20fortissimi%20con%20un%20occhio%20solo.%20%20%0APer%20questo%20il%20vulcano%20sembrava%20ancora%20pi%C3%B9%20misterioso.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** La Sardegna è un’isola famosa per il mare bellissimo, per le tradizioni antiche e per i nuraghi, costruzioni di pietra uniche al mondo.  
 Il sito più famoso, Su Nuraxi di Barumini, è stato dichiarato **Patrimonio UNESCO** nel 1997 (millenovecentonovantasette). <a href="https://translate.google.com/?sl=it&tl=en&text=La%20Sardegna%20%C3%A8%20un%E2%80%99isola%20famosa%20per%20il%20mare%20bellissimo%2C%20per%20le%20tradizioni%20antiche%20e%20per%20i%20nuraghi%2C%20costruzioni%20di%20pietra%20uniche%20al%20mondo.%20%20%0A%20Il%20sito%20pi%C3%B9%20famoso%2C%20Su%20Nuraxi%20di%20Barumini%2C%20%C3%A8%20stato%20dichiarato%20Patrimonio%20UNESCO%20nel%201997%20.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** I **nuraghi** sono torri di pietra costruite moltissimo tempo fa, e ancora oggi fanno pensare a una civiltà antica e piena di mistero. <a href="https://translate.google.com/?sl=it&tl=en&text=I%20nuraghi%20sono%20torri%20di%20pietra%20costruite%20moltissimo%20tempo%20fa%2C%20e%20ancora%20oggi%20fanno%20pensare%20a%20una%20civilt%C3%A0%20antica%20e%20piena%20di%20mistero.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** In Sardegna troviamo anche un pane sottilissimo e croccante che si chiama **pane carasau,** detto anche “carta da musica” per il suono che fa quando si spezza. <a href="https://translate.google.com/?sl=it&tl=en&text=In%20Sardegna%20troviamo%20anche%20un%20pane%20sottilissimo%20e%20croccante%20che%20si%20chiama%20pane%20carasau%2C%20detto%20anche%20%E2%80%9Ccarta%20da%20musica%E2%80%9D%20per%20il%20suono%20che%20fa%20quando%20si%20spezza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Un personaggio famoso** legato alla Sardegna è **Grazia Deledda,** una grande scrittrice sarda che vinse il **Premio Nobel per la Letteratura nel 1926 (millenovecentoventisei).** Fu la prima donna italiana a ricevere questo premio.

**Carolina:** E una curiosità molto bella? In Sardegna esistono le **Domus de Janas**, chiamate anche *case delle fate.*  
 Secondo la leggenda, erano le piccole case di creature misteriose che vivevano nella roccia. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20una%20curiosit%C3%A0%20molto%20bella%3F%20In%20Sardegna%20esistono%20le%20Domus%20de%20Janas%2C%20chiamate%20anche%20case%20delle%20fate.%20%20%0A%20Secondo%20la%20leggenda%2C%20erano%20le%20piccole%20case%20di%20creature%20misteriose%20che%20vivevano%20nella%20roccia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*Sicilia e Sardegna sono diverse tra loro, ma hanno una cosa in comune:*  
 *conservano una forte identità, una lunga memoria e una bellezza che resta nel cuore.*

**Carolina:** Una frase semplice da ricordare è: **“Ogni isola ha una voce speciale.”**  
In inglese: **“Every island has a special voice.”** <a href="https://translate.google.com/?sl=it&tl=en&text=Una%20frase%20semplice%20da%20ricordare%20%C3%A8%3A%20%E2%80%9COgni%20isola%20ha%20una%20voce%20speciale.%E2%80%9D%20%20%0AIn%20inglese%3A%20%E2%80%9CEvery%20island%20has%20a%20special%20voice.%E2%80%9D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Cosima:** Ogni città è diversa. <a href="https://translate.google.com/?sl=it&tl=en&text=Ogni%20citt%C3%A0%20%C3%A8%20diversa.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria:** Mare, sole, festa\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mare%2C%20sole%2C%20festa%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Sicilia e Sardegna sono due isole bellissime e diverse: la Sicilia sorprende con l’Etna e i templi antichi, la Sardegna con i nuraghi e le sue tradizioni misteriose. <a href="https://translate.google.com/?sl=it&tl=en&text=Sicilia%20e%20Sardegna%20sono%20due%20isole%20bellissime%20e%20diverse%3A%20la%20Sicilia%20sorprende%20con%20l%E2%80%99Etna%20e%20i%20templi%20antichi%2C%20la%20Sardegna%20con%20i%20nuraghi%20e%20le%20sue%20tradizioni%20misteriose.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** Isole\! <a href="https://translate.google.com/?sl=it&tl=en&text=Isole%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Tutti:** # <a href="https://translate.google.com/?sl=it&tl=en&text=%23&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

<a name="scena-10-litalia-finale"></a>

## **SCENA 10 – L’ITALIA FINALE**

*Prima di entrare in scena canzone di Mino reitano:* [https://www.youtube.com/watch?v=rlwuYMo-\_Es](https://www.youtube.com/watch?v=rlwuYMo-_Es)

*Si preparano i grandi, entra il primo va in centro recita la sua parte e si mette in fondo a dx poi entra la seconda stessa cosa e cosi’ via..*

**Kaleb:** Abbiamo visitato molte città e scoperto tante immagini diverse dell’Italia.  
Ma allora… che cos’è davvero l’Italia? <a href="https://translate.google.com/?sl=it&tl=en&text=Abbiamo%20visitato%20molte%20citt%C3%A0%20e%20scoperto%20tante%20immagini%20diverse%20dell%E2%80%99Italia.%20%20%0AMa%20allora%E2%80%A6%20che%20cos%E2%80%99%C3%A8%20davvero%20l%E2%80%99Italia%3F&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** L’Italia è un paese pieno di bellezza, storia, arte e tradizioni.  
È un luogo dove ogni città ha una voce diversa, ogni regione ha un sapore speciale e ogni paesaggio racconta qualcosa. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20un%20paese%20pieno%20di%20bellezza%2C%20storia%2C%20arte%20e%20tradizioni.%20%20%0A%C3%88%20un%20luogo%20dove%20ogni%20citt%C3%A0%20ha%20una%20voce%20diversa%2C%20ogni%20regione%20ha%20un%20sapore%20speciale%20e%20ogni%20paesaggio%20racconta%20qualcosa.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** L’Italia è fatta di piazze, monumenti, canzoni, feste, famiglie, mercati, gesti e parole.  
È fatta di ricordi antichi e di vita quotidiana.  
È fatta di cose grandi, ma anche di cose semplici: una tavola apparecchiata, una passeggiata, una festa di paese, una canzone cantata insieme. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20fatta%20di%20piazze%2C%20monumenti%2C%20canzoni%2C%20feste%2C%20famiglie%2C%20mercati%2C%20gesti%20e%20parole.%20%20%0A%C3%88%20fatta%20di%20ricordi%20antichi%20e%20di%20vita%20quotidiana.%20%20%0A%C3%88%20fatta%20di%20cose%20grandi%2C%20ma%20anche%20di%20cose%20semplici%3A%20una%20tavola%20apparecchiata%2C%20una%20passeggiata%2C%20una%20festa%20di%20paese%2C%20una%20canzone%20cantata%20insieme.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** Per chi studia italiano come lingua straniera, l’Italia non è soltanto un posto sulla cartina.  
È una scoperta continua.  
Ogni parola nuova apre una porta.  
Ogni città insegna qualcosa.  
Ogni piatto tipico racconta un territorio, una storia, una tradizione. <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20chi%20studia%20italiano%20come%20lingua%20straniera%2C%20l%E2%80%99Italia%20non%20%C3%A8%20soltanto%20un%20posto%20sulla%20cartina.%20%20%0A%C3%88%20una%20scoperta%20continua.%20%20%0AOgni%20parola%20nuova%20apre%20una%20porta.%20%20%0AOgni%20citt%C3%A0%20insegna%20qualcosa.%20%20%0AOgni%20piatto%20tipico%20racconta%20un%20territorio%2C%20una%20storia%2C%20una%20tradizione.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** Oggi noi non abbiamo fatto solo una recita.  
Abbiamo fatto un piccolo viaggio nella lingua italiana, nella geografia e nella cultura.  
Abbiamo viaggiato con le parole, con la fantasia, con il teatro e con la musica. <a href="https://translate.google.com/?sl=it&tl=en&text=Oggi%20noi%20non%20abbiamo%20fatto%20solo%20una%20recita.%20%20%0AAbbiamo%20fatto%20un%20piccolo%20viaggio%20nella%20lingua%20italiana%2C%20nella%20geografia%20e%20nella%20cultura.%20%20%0AAbbiamo%20viaggiato%20con%20le%20parole%2C%20con%20la%20fantasia%2C%20con%20il%20teatro%20e%20con%20la%20musica.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** E forse è proprio questa la cosa più bella:  
capire che una lingua non si studia soltanto…  
una lingua si vive. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20forse%20%C3%A8%20proprio%20questa%20la%20cosa%20pi%C3%B9%20bella%3A%20%20%0Acapire%20che%20una%20lingua%20non%20si%20studia%20soltanto%E2%80%A6%20%20%0Auna%20lingua%20si%20vive.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

*Entrano Devon, Ben, Annabella.*

**Devon:** Per questo l’Italia, per noi, oggi è molto più di un paese.  
È un’esperienza, un incontro, un ricordo da portare con noi. <a href="https://translate.google.com/?sl=it&tl=en&text=Per%20questo%20l%E2%80%99Italia%2C%20per%20noi%2C%20oggi%20%C3%A8%20molto%20pi%C3%B9%20di%20un%20paese.%20%20%0A%C3%88%20un%E2%80%99esperienza%2C%20un%20incontro%2C%20un%20ricordo%20da%20portare%20con%20noi.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** E adesso… prima di salutarvi…  
torniamo tutti insieme sul palco. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20adesso%E2%80%A6%20prima%20di%20salutarvi%E2%80%A6%20%20%0Atorniamo%20tutti%20insieme%20sul%20palco.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** Questo viaggio ci ha uniti con la lingua, con la musica e con l’immaginazione ma l’avventura non finisce qui.. <a href="https://translate.google.com/?sl=it&tl=en&text=Questo%20viaggio%20ci%20ha%20uniti%20con%20la%20lingua%2C%20con%20la%20musica%20e%20con%20l%E2%80%99immaginazione%20ma%20l%E2%80%99avventura%20non%20finisce%20qui..&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Kaleb:** L’Italia è storia. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20storia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Julia:** L’Italia è bellezza. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20bellezza.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Arielle:** L’Italia è meraviglia. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20meraviglia.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Milena:** L’Italia è creatività. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20creativit%C3%A0.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Siena:** L’Italia è passione. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20passione.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Carolina:** E per noi, oggi, l’Italia è anche una lingua da vivere insieme. <a href="https://translate.google.com/?sl=it&tl=en&text=E%20per%20noi%2C%20oggi%2C%20l%E2%80%99Italia%20%C3%A8%20anche%20una%20lingua%20da%20vivere%20insieme.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Ben:** L’Italia è un viaggio da condividere. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20un%20viaggio%20da%20condividere.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Annabella:** L’Italia è una lingua da ascoltare e da amare. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20una%20lingua%20da%20ascoltare%20e%20da%20amare.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Devon:** L’Italia è un ricordo bello da portare con noi. <a href="https://translate.google.com/?sl=it&tl=en&text=L%E2%80%99Italia%20%C3%A8%20un%20ricordo%20bello%20da%20portare%20con%20noi.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

### **Bimbi piccoli**

**Luisa:** Mi piace l’Italia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Mi%20piace%20l%E2%80%99Italia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Eva:** pizza, pasta, gelato <a href="https://translate.google.com/?sl=it&tl=en&text=pizza%2C%20pasta%2C%20gelato&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara B:** arte e cultura <a href="https://translate.google.com/?sl=it&tl=en&text=arte%20e%20cultura&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Cosima:** mare e sole <a href="https://translate.google.com/?sl=it&tl=en&text=mare%20e%20sole&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Chiara A:** moda <a href="https://translate.google.com/?sl=it&tl=en&text=moda&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Caterina:** caffe\` <a href="https://translate.google.com/?sl=it&tl=en&text=caffe%5C%60&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Victoria:** Italia bellissima\! <a href="https://translate.google.com/?sl=it&tl=en&text=Italia%20bellissima%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Max:** Io voglio tornare\! <a href="https://translate.google.com/?sl=it&tl=en&text=Io%20voglio%20tornare%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Giorgio:** Ciao Italia\! <a href="https://translate.google.com/?sl=it&tl=en&text=Ciao%20Italia%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Samuel:** Arrivederci\! <a href="https://translate.google.com/?sl=it&tl=en&text=Arrivederci%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

### **Tutti insieme:**

VIVA L’ITALIA\!  Ci rivediamo a Settembre\! <a href="https://translate.google.com/?sl=it&tl=en&text=VIVA%20L%E2%80%99ITALIA%5C%21%20%20Ci%20rivediamo%20a%20Settembre%5C%21&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

## **CANZONE FINALE**

Dopo **“Viva l’Italia”**, i **piccoli e i grandi** cantano **“Arrivederci”** salutando con la mano. <a href="https://translate.google.com/?sl=it&tl=en&text=Dopo%20%E2%80%9CViva%20l%E2%80%99Italia%E2%80%9D%2C%20i%20piccoli%20e%20i%20grandi%20cantano%20%E2%80%9CArrivederci%E2%80%9D%20salutando%20con%20la%20mano.&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>

**Link YouTube:** [https://www.youtube.com/watch?v=au\_mgfqv7A4\&list=RDau\_mgfqv7A4\&start\_radio=1](https://www.youtube.com/watch?v=au_mgfqv7A4&list=RDau_mgfqv7A4&start_radio=1) <a href="https://translate.google.com/?sl=it&tl=en&text=%5Bhttps%3A//www.youtube.com/watch%3Fv%3Dau%5C_mgfqv7A4%5C%26list%3DRDau%5C_mgfqv7A4%5C%26start%5C_radio%3D1%5D&op=translate" target="_blank"><button type="button" class="btn btn-success">Ascolta 🎧</button></a>