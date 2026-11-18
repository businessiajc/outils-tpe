(function(){
var $=function(i){return document.getElementById(i)};
var EN=(document.documentElement.lang||'fr').slice(0,2)==='en';
var M=EN?{
fn:"a) Manufacturer name or trade mark missing.",fa:"a) Manufacturer postal address missing.",faw:"a) The manufacturer postal address looks incomplete (no postcode found).",fm:"a) Manufacturer email address missing.",fmx:"a) The manufacturer email address is not valid.",
rn:"b) Name of the EU responsible person missing.",ra:"b) Postal address of the responsible person missing.",raw:"b) The responsible person address looks incomplete.",rm:"b) Email address of the responsible person missing.",rmx:"b) The responsible person email address is not valid.",
ty:"c) Product type missing.",id:"c) No identifier: give at least a reference, a model or an EAN code.",img:"c) The listing must show a picture of the product.",gf:"c) An EAN/GTIN code has 8, 12, 13 or 14 digits.",gk:"c) The EAN check digit is wrong: check what you typed.",
av:"d) Copy the warnings from the label or the manual, or tick “no warning”.",ok:"compliant",ko:"incomplete",chk:"Check of the 4 points",pa:"a) Manufacturer",pb:"b) Responsible person",pbn:"not required (manufacturer established in the EU)",pc:"c) Identification",pd:"d) Warnings",fix:"To fix",ver:"To check",
bt:"Text block to paste",btn:"(warnings stay in the language you typed them in)",cp:"Copy the text",bh:"HTML version",bhn:"(for Shopify, WooCommerce or PrestaShop)",ch:"Copy the HTML",done:"Copied"}:{
fn:"a) Nom ou marque du fabricant manquant.",fa:"a) Adresse postale du fabricant manquante.",faw:"a) L'adresse postale du fabricant ne semble pas complète (pas de code postal détecté).",fm:"a) Adresse électronique du fabricant manquante.",fmx:"a) L'adresse électronique du fabricant n'a pas un format valide.",
rn:"b) Nom de la personne responsable dans l'UE manquant.",ra:"b) Adresse postale de la personne responsable manquante.",raw:"b) L'adresse de la personne responsable ne semble pas complète.",rm:"b) Adresse électronique de la personne responsable manquante.",rmx:"b) L'adresse électronique de la personne responsable n'a pas un format valide.",
ty:"c) Type de produit manquant.",id:"c) Aucun identifiant : indiquez au moins une référence, un modèle ou un code EAN.",img:"c) L'annonce doit montrer une image du produit.",gf:"c) Le code EAN/GTIN doit compter 8, 12, 13 ou 14 chiffres.",gk:"c) La clé de contrôle du code EAN est fausse : vérifiez la saisie.",
av:"d) Recopiez les avertissements de l'étiquette ou de la notice, ou cochez « aucun avertissement ».",ok:"conforme",ko:"incomplet",chk:"Contrôle des 4 points",pa:"a) Fabricant",pb:"b) Personne responsable",pbn:"non requise (fabricant établi dans l'UE)",pc:"c) Identification",pd:"d) Avertissements",fix:"À corriger",ver:"À vérifier",
bt:"Bloc texte à coller",btn:"(les avertissements restent dans la langue où vous les avez saisis)",cp:"Copier le texte",bh:"Version HTML",bhn:"(pour Shopify, WooCommerce ou PrestaShop)",ch:"Copier le HTML",done:"Copié"};
$('horsue').addEventListener('change',function(){$('blocrp').hidden=!this.checked});
var L={
fr:{t:"Informations sur le produit et sa sécurité",f:"Fabricant",rp:"Personne responsable dans l'Union européenne",ty:"Produit",ref:"Référence",ean:"Code EAN",lot:"Lot",av:"Avertissements et consignes de sécurité",none:"Aucun avertissement particulier.",s:" : "},
en:{t:"Product and safety information",f:"Manufacturer",rp:"Responsible person in the European Union",ty:"Product",ref:"Reference",ean:"EAN code",lot:"Batch",av:"Warnings and safety information",none:"No specific warning.",s:": "},
es:{t:"Información sobre el producto y su seguridad",f:"Fabricante",rp:"Persona responsable en la Unión Europea",ty:"Producto",ref:"Referencia",ean:"Código EAN",lot:"Lote",av:"Advertencias e información de seguridad",none:"Ninguna advertencia específica.",s:": "},
de:{t:"Produkt- und Sicherheitsinformationen",f:"Hersteller",rp:"Verantwortliche Person in der Europäischen Union",ty:"Produkt",ref:"Artikelnummer",ean:"EAN-Code",lot:"Charge",av:"Warnhinweise und Sicherheitsinformationen",none:"Keine besonderen Warnhinweise.",s:": "}};
function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function v(i){return $(i).value.trim()}
function mailOk(s){return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(s)}
function adrOk(s){return /\d{4,5}/.test(s)&&s.length>=12}
function gtin(s){s=s.replace(/\s/g,'');if(!/^\d+$/.test(s)||[8,12,13,14].indexOf(s.length)<0)return 'format';var n=s.length,sum=0;for(var i=0;i<n-1;i++){var d=+s[n-2-i];sum+=d*(i%2===0?3:1)}var k=(10-sum%10)%10;return k===+s[n-1]?'ok':'cle'}
function run(){
var p=[],warn=[];
var fn=v('fnom'),fa=v('fadr'),fm=v('fmail');
var a=!!(fn&&adrOk(fa)&&mailOk(fm));
if(!fn)p.push(M.fn);
if(!fa)p.push(M.fa);else if(!adrOk(fa))warn.push(M.faw);
if(!fm)p.push(M.fm);else if(!mailOk(fm))p.push(M.fmx);
var hors=$('horsue').checked,b=true;
if(hors){var rn=v('rnom'),ra=v('radr'),rm=v('rmail');b=!!(rn&&adrOk(ra)&&mailOk(rm));
if(!rn)p.push(M.rn);
if(!ra)p.push(M.ra);else if(!adrOk(ra))warn.push(M.raw);
if(!rm)p.push(M.rm);else if(!mailOk(rm))p.push(M.rmx);}
var ty=v('ptype'),rf=v('pref'),ea=v('pean').replace(/\s/g,''),lo=v('plot'),img=$('pimg').checked;
var g=ea?gtin(ea):'ok';
var c=!!(ty&&(rf||ea)&&img&&g==='ok');
if(!ty)p.push(M.ty);
if(!rf&&!ea)p.push(M.id);
if(!img)p.push(M.img);
if(g==='format')p.push(M.gf);else if(g==='cle')p.push(M.gk);
var av=v('pavert'),none=$('pnone').checked,d=!!av||none;
if(!d)p.push(M.av);
var ok=function(x){return x?'<span style="color:var(--ok)">'+M.ok+'</span>':'<span style="color:var(--ko)">'+M.ko+'</span>'};
var h='<p><strong>'+M.chk+'</strong></p><ul><li>'+M.pa+' : '.slice(EN?1:0)+ok(a)+'</li><li>'+M.pb+(EN?': ':' : ')+(hors?ok(b):M.pbn)+'</li><li>'+M.pc+(EN?': ':' : ')+ok(c)+'</li><li>'+M.pd+(EN?': ':' : ')+ok(d)+'</li></ul>';
if(p.length)h+='<p><strong>'+M.fix+'</strong></p><ul>'+p.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
if(warn.length)h+='<p><strong>'+M.ver+'</strong></p><ul>'+warn.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
var t=L[$('langue').value],S=t.s;
var rows=[[t.f,[fn,fa,fm].filter(Boolean).join(', ')]];
if(hors)rows.push([t.rp,[v('rnom'),v('radr'),v('rmail')].filter(Boolean).join(', ')]);
var J=S===' : '?' ; ':'; ';rows.push([t.ty,ty+(rf?J+t.ref+S+rf:'')+(ea?J+t.ean+S+ea:'')+(lo?J+t.lot+S+lo:'')]);
rows.push([t.av,av||(none?t.none:'')]);
var txt=t.t+'\n\n'+rows.map(function(r){return r[0]+S+r[1]}).join('\n');
var htm='<section class="infos-securite">\n<h3>'+esc(t.t)+'</h3>\n<ul>\n'+rows.map(function(r){return '<li><strong>'+esc(r[0])+'</strong>'+S+esc(r[1])+'</li>'}).join('\n')+'\n</ul>\n</section>';
h+='<p><strong>'+M.bt+'</strong> '+M.btn+'</p><textarea readonly rows="7" style="width:100%;font-family:var(--mono);font-size:.82rem" id="btxt">'+esc(txt)+'</textarea><p><button type="button" class="btn ghost" data-c="btxt">'+M.cp+'</button></p>';
h+='<p><strong>'+M.bh+'</strong> '+M.bhn+'</p><textarea readonly rows="7" style="width:100%;font-family:var(--mono);font-size:.82rem" id="bhtm">'+esc(htm)+'</textarea><p><button type="button" class="btn ghost" data-c="bhtm">'+M.ch+'</button></p>';
$('out').innerHTML=h;
}
$('go').addEventListener('click',run);
$('out').addEventListener('click',function(e){var bt=e.target.closest('[data-c]');if(!bt)return;var ta=$(bt.getAttribute('data-c'));ta.select();if(navigator.clipboard){navigator.clipboard.writeText(ta.value).catch(function(){document.execCommand('copy')})}else{document.execCommand('copy')}bt.textContent=M.done});
$('ex').addEventListener('click',function(){
$('fnom').value='Shenzhen Example Lighting Co., Ltd';$('fadr').value=EN?'88 Example Road, Bao’an District, 518000 Shenzhen, China':'88 Example Road, Bao’an District, 518000 Shenzhen, Chine';$('fmail').value='sales@example-lighting.cn';
$('horsue').checked=true;$('blocrp').hidden=false;$('rnom').value=EN?'Example Imports GmbH':'Import Exemple SAS';$('radr').value=EN?'Beispielstrasse 5, 10115 Berlin, Germany':'5 avenue Exemple, 33000 Bordeaux, France';$('rmail').value=EN?'quality@example-imports.de':'qualite@import-exemple.fr';
$('ptype').value=EN?'LED night light for children’s rooms':"Veilleuse LED pour chambre d'enfant";$('pref').value='VL-200';$('pean').value='4006381333931';$('plot').value='';$('pimg').checked=true;
$('pavert').value=EN?'Not suitable for children under 36 months. Contains small parts: choking hazard. Keep the mains adapter out of reach of children.':"Ne convient pas aux enfants de moins de 36 mois. Contient des petits éléments : risque d'étouffement. Ne pas laisser l'enfant manipuler l'adaptateur secteur.";$('pnone').checked=false;
$('langue').value=EN?'en':'fr';run();});
})();
