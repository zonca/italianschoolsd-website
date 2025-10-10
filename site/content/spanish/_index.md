---
title: "All Spanish HTML Pages"
date: 2025-10-10T10:00:00-07:00
draft: false
---

# Spanish HTML Pages

Here is a list of all HTML pages in this section:

<ul>
{{ range where .Site.RegularPages "Section" "spanish" }}
    {{ if eq .File.Ext "html" }}
        <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
{{ end }}
</ul>