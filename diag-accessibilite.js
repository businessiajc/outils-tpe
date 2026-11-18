/* Diagnostic d'accessibilité en un clic (Outils TPE). Charge axe-core 4.11.1 (Deque Systems, licence MPL-2.0)
   depuis jsDelivr, l'exécute sur la page ouverte et affiche un résumé en français. Rien n'est envoyé ailleurs. */
(function () {
  var d = document, ID = "otpe-a11y";
  var old = d.getElementById(ID); if (old) { old.remove(); }
  var FR = {
    "color-contrast": "Texte trop peu contrasté avec son fond",
    "image-alt": "Image sans texte de remplacement (attribut alt)",
    "link-name": "Lien sans intitulé lisible (souvent une icône seule)",
    "button-name": "Bouton sans intitulé lisible",
    "label": "Champ de formulaire sans étiquette",
    "select-name": "Liste déroulante sans étiquette",
    "html-has-lang": "Langue de la page non déclarée",
    "html-lang-valid": "Langue de la page mal déclarée",
    "document-title": "Page sans titre",
    "frame-title": "Cadre (iframe) sans titre",
    "list": "Liste mal construite",
    "listitem": "Élément de liste hors d'une liste",
    "nested-interactive": "Élément cliquable placé dans un autre",
    "link-in-text-block": "Lien dans un texte repérable seulement par sa couleur",
    "aria-allowed-attr": "Attribut ARIA non autorisé sur cet élément",
    "aria-prohibited-attr": "Attribut ARIA interdit sur cet élément",
    "aria-required-children": "Rôle ARIA sans les enfants obligatoires",
    "aria-required-parent": "Rôle ARIA hors de son parent obligatoire",
    "aria-hidden-focus": "Élément masqué aux lecteurs d'écran mais atteignable au clavier",
    "aria-valid-attr-value": "Valeur d'attribut ARIA invalide",
    "aria-command-name": "Commande ARIA sans intitulé",
    "aria-progressbar-name": "Barre de progression sans intitulé",
    "aria-input-field-name": "Champ ARIA sans intitulé",
    "aria-toggle-field-name": "Case ou interrupteur ARIA sans intitulé",
    "aria-dialog-name": "Fenêtre de dialogue sans intitulé",
    "role-img-alt": "Image (role=img) sans texte de remplacement",
    "svg-img-alt": "Image SVG sans texte de remplacement",
    "input-image-alt": "Bouton image sans texte de remplacement",
    "input-button-name": "Bouton de formulaire sans intitulé",
    "meta-viewport": "Zoom bloqué sur mobile",
    "scrollable-region-focusable": "Zone défilante inaccessible au clavier",
    "duplicate-id-aria": "Identifiant en double utilisé par ARIA",
    "definition-list": "Liste de définitions mal construite",
    "dlitem": "Terme de définition hors d'une liste",
    "td-headers-attr": "Cellule de tableau mal reliée à ses en-têtes",
    "th-has-data-cells": "En-tête de tableau sans cellules",
    "valid-lang": "Code de langue invalide",
    "video-caption": "Vidéo sans sous-titres",
    "autocomplete-valid": "Valeur autocomplete invalide",
    "object-alt": "Objet intégré sans texte de remplacement",
    "area-alt": "Zone cliquable d'image sans texte de remplacement",
    "blink": "Texte clignotant",
    "marquee": "Texte défilant",
    "meta-refresh": "Rechargement automatique de la page"
  };
  var IMP = { critical: "critique", serious: "grave", moderate: "moyen", minor: "mineur" };
  var ORD = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  function box(html) {
    var b = d.getElementById(ID);
    if (!b) {
      b = d.createElement("div"); b.id = ID; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Diagnostic d'accessibilité");
      b.style.cssText = "all:initial;position:fixed;top:12px;right:12px;z-index:2147483647;width:min(440px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;background:#fff;color:#1a1a1a;border:2px solid #0b5d56;border-radius:6px;box-shadow:0 4px 18px rgba(0,0,0,.25);font:14px/1.45 system-ui,Segoe UI,Arial,sans-serif;padding:14px 16px;box-sizing:border-box";
      d.body.appendChild(b);
    }
    b.innerHTML = html + '<p style="margin:12px 0 0;font-size:12px;color:#555">axe-core 4.11.1, règles WCAG 2.0/2.1 niveaux A et AA. Un test automatique ne repère qu\'une partie des problèmes : ce n\'est pas un audit de conformité RGAA. <button type="button" id="' + ID + '-x" style="margin-left:6px;font:inherit;padding:2px 8px;border:1px solid #0b5d56;background:#fff;color:#0b5d56;border-radius:4px;cursor:pointer">Fermer</button></p>';
    d.getElementById(ID + "-x").onclick = function () { b.remove(); };
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function run() {
    box('<strong style="font-size:15px">Analyse en cours…</strong>');
    window.axe.run(d, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }, resultTypes: ["violations"] })
      .then(function (r) {
        var v = r.violations.filter(function (x) { return !(x.nodes.length === 1 && x.nodes[0].target.join(" ").indexOf("#" + ID) === 0); });
        v.sort(function (a, b) { return (ORD[a.impact] - ORD[b.impact]) || (b.nodes.length - a.nodes.length); });
        var nEl = 0, c = { critical: 0, serious: 0, moderate: 0, minor: 0 };
        v.forEach(function (x) { nEl += x.nodes.length; c[x.impact] = (c[x.impact] || 0) + 1; });
        var h = '<strong style="font-size:15px">' + v.length + ' type' + (v.length > 1 ? "s" : "") + ' d\'erreur, ' + nEl + ' élément' + (nEl > 1 ? "s" : "") + ' concerné' + (nEl > 1 ? "s" : "") + '</strong>';
        h += '<p style="margin:6px 0">Critiques : ' + c.critical + ' · graves : ' + c.serious + ' · moyennes : ' + c.moderate + ' · mineures : ' + c.minor + '</p>';
        if (!v.length) { h += "<p>Aucune erreur détectée automatiquement sur cette page. Testez aussi la navigation au clavier et un lecteur d'écran.</p>"; }
        else {
          h += '<ol style="margin:6px 0 0 18px;padding:0">';
          v.forEach(function (x) {
            var ex = x.nodes[0] && x.nodes[0].target ? x.nodes[0].target.join(" ") : "";
            h += '<li style="margin:0 0 6px">' + esc(FR[x.id] || x.help) + ' <span style="color:#555">(' + (IMP[x.impact] || x.impact) + ', ' + x.nodes.length + ' élément' + (x.nodes.length > 1 ? "s" : "") + ')</span>'
              + '<br><code style="font-size:12px;background:#f3f3f3;padding:0 3px;word-break:break-all">' + esc(ex.slice(0, 120)) + '</code></li>';
          });
          h += "</ol>";
        }
        box(h);
      })
      .catch(function (e) { box("<strong>Analyse impossible</strong><p>" + esc(e && e.message ? e.message : e) + "</p>"); });
  }
  if (window.axe && window.axe.run) { run(); return; }
  var s = d.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/axe-core@4.11.1/axe.min.js";
  s.integrity = "sha384-wb3zgvLcZeMFSec08dk7g8K8yDFFAX2uNKVwOUuowwc/wIfE2t6XVUjTEgPrOJCS";
  s.crossOrigin = "anonymous";
  s.onload = run;
  s.onerror = function () { box("<strong>Le site bloque le chargement du script</strong><p>Sa politique de sécurité (CSP) interdit les scripts externes. Utilisez plutôt l'extension gratuite axe DevTools ou WAVE dans votre navigateur.</p>"); };
  (d.head || d.documentElement).appendChild(s);
})();
