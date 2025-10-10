---
title: "Espanol material"
date: 2025-10-10T10:00:00-07:00
draft: false
description: "A collection of Spanish markdown pages."
---

# Material for the Spanish class

Here is a list of all material for the Spanish class:

<ul>
{{ range where .Site.RegularPages "Section" "espanol" }}
    {{ if eq .File.Ext "md" }}
        <li>
            <a href="{{ .Permalink }}">{{ .Title }}</a>
            {{ if .Date }} - {{ .Date.Format "January 2, 2006" }}{{ end }}
            {{ if .Description }}<p>{{ .Description }}</p>{{ end }}
        </li>
    {{ end }}
{{ end }}
</ul>