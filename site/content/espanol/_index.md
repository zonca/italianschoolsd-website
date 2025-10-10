---
title: "Espanol material"
date: 2025-10-10T10:00:00-07:00
draft: false
---

# Spanish Markdown Pages

Here is a list of all Markdown pages in this section:

<ul>
{{ range where .Site.RegularPages "Section" "espanol" }}
    {{ if eq .File.Ext "md" }}
        <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
{{ end }}
</ul>