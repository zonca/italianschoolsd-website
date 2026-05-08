---
title: "Audio Test"
date: 2026-05-07
---

<button onclick="playText('Benvenuti alla scuola', 'it')" class="btn btn-cta">Ascolta</button>

<script>
function playText(text, lang) {
    // Encode text to handle spaces and special characters
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodedText}`;
    
    const audio = new Audio(url);
    audio.play().catch(error => {
        console.error("Playback failed. Google may be blocking the request.", error);
    });
}
</script>
