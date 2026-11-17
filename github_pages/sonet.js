// Pesnik France – generator sonetov (statična različica za GitHub Pages).
// Logika je ista kot v model.py: vsak verz ima več različic (ločenih z "||"
// v vrstice.txt), sonet je ena izbira različice za vsak verz.
"use strict";

const KITICE = [0, 4, 8, 11, 14];
const OSNOVNA_IZBIRA = [
  0, 0, 0, 0,
  2, 2, 0, 0,
  0, 0, 0,
  1, 2, 2,
];
const NASLOV_ODKUPA = "france.pesnik@gmail.com";
const KLJUC_SEJA = "pesnikFrance.seja";
const KLJUC_SKUPAJ = "pesnikFrance.skupaj";

const $ = (id) => document.getElementById(id);

let vrstice = [];          // vrstice[i] = različice i-tega verza
let izbira = [];           // izbira[i] = indeks izbrane različice i-tega verza
let elementiVerzov = [];
let stMoznih = 0;
let stSeja = 0;
let stSkupaj = 0;

// ---------- pomožne ----------

function oblikujStevilo(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function preberiStevec(vrsta, kljuc) {
  try {
    return parseInt(window[vrsta].getItem(kljuc), 10) || 0;
  } catch {
    return 0;   // shramba ni na voljo (zasebno brskanje, blokirani piškotki ...)
  }
}

function zapisiStevec(vrsta, kljuc, vrednost) {
  try {
    window[vrsta].setItem(kljuc, String(vrednost));
  } catch {
    /* števec bo vsaj v pomnilniku */
  }
}

// Sonet <-> številka: vsak verz je ena "števka" v mešanem številskem sistemu.
function izbiraVStevilko(izb) {
  let n = 0;
  izb.forEach((v, i) => { n = n * vrstice[i].length + v; });
  return n + 1;
}

function stevilkaVIzbiro(st) {
  let n = st - 1;
  const izb = new Array(vrstice.length);
  for (let i = vrstice.length - 1; i >= 0; i--) {
    const k = vrstice[i].length;
    izb[i] = n % k;
    n = Math.floor(n / k);
  }
  return izb;
}

function stevilkaIzNaslova() {
  const m = /^#(\d{1,9})$/.exec(window.location.hash);
  if (!m) return null;
  const st = Number(m[1]);
  return st >= 1 && st <= stMoznih ? st : null;
}

function povezava(st) {
  return window.location.origin + window.location.pathname + "#" + st;
}

function besediloSoneta() {
  const kitice = [];
  for (let k = 0; k < KITICE.length - 1; k++) {
    const verzi = [];
    for (let i = KITICE[k]; i < KITICE[k + 1]; i++) verzi.push(vrstice[i][izbira[i]]);
    kitice.push(verzi.join("\n"));
  }
  return kitice.join("\n\n");
}

// ---------- prikaz ----------

function zgradiSonet() {
  const koren = $("sonet");
  koren.textContent = "";
  elementiVerzov = [];
  for (let k = 0; k < KITICE.length - 1; k++) {
    const kitica = document.createElement("p");
    kitica.className = "kitica";
    for (let i = KITICE[k]; i < KITICE[k + 1]; i++) {
      const verz = document.createElement("span");
      verz.className = "verz";
      verz.dataset.i = String(i);
      verz.title = "Kliknite za drugo različico verza";
      kitica.appendChild(verz);
      elementiVerzov.push(verz);
    }
    koren.appendChild(kitica);
  }
}

function prikazi(novaIzbira, { posodobiNaslov = true } = {}) {
  let zamik = 0;
  novaIzbira.forEach((v, i) => {
    if (izbira[i] === v) return;   // nespremenjene verze pustimo pri miru
    const el = elementiVerzov[i];
    el.textContent = vrstice[i][v];
    el.style.setProperty("--zamik", String(zamik++));
    el.classList.remove("nov");
    void el.offsetWidth;           // ponovno sproži animacijo
    el.classList.add("nov");
  });
  izbira = novaIzbira.slice();

  const st = izbiraVStevilko(izbira);
  $("st-soneta").textContent = oblikujStevilo(st);
  if (posodobiNaslov) history.replaceState(null, "", "#" + st);

  const zadeva = `Odkup soneta št. ${st}`;
  const telo = `Pozdravljeni, France!\n\nŽelim odkupiti sonet št. ${st} za 1 cent:\n\n${besediloSoneta()}\n\n${povezava(st)}\n`;
  $("odkupi").href = `mailto:${NASLOV_ODKUPA}?subject=${encodeURIComponent(zadeva)}&body=${encodeURIComponent(telo)}`;
}

function pokaziStevce(poskok) {
  $("st-seja").textContent = oblikujStevilo(stSeja);
  $("st-skupaj").textContent = oblikujStevilo(stSkupaj);
  if (!poskok) return;
  for (const id of ["stevec-seja", "stevec-skupaj"]) {
    const el = $(id);
    el.classList.remove("poskok");
    void el.offsetWidth;
    el.classList.add("poskok");
  }
}

// ---------- dejanja ----------

function zgeneriraj() {
  const nova = vrstice.map((moznosti) => Math.floor(Math.random() * moznosti.length));
  prikazi(nova);
  stSeja += 1;
  stSkupaj += 1;
  zapisiStevec("sessionStorage", KLJUC_SEJA, stSeja);
  zapisiStevec("localStorage", KLJUC_SKUPAJ, stSkupaj);
  pokaziStevce(true);
}

function zamenjajVerz(i) {
  const nova = izbira.slice();
  nova[i] = (nova[i] + 1) % vrstice[i].length;
  prikazi(nova);
}

async function kopiraj() {
  const gumb = $("kopiraj");
  const st = izbiraVStevilko(izbira);
  const besedilo = `Sonet št. ${oblikujStevilo(st)}\n\n${besediloSoneta()}\n\n— Pesnik France\n${povezava(st)}\n`;
  try {
    await navigator.clipboard.writeText(besedilo);
    gumb.textContent = "Kopirano ✓";
  } catch {
    gumb.textContent = "Ni uspelo";
  }
  clearTimeout(kopiraj.casovnik);
  kopiraj.casovnik = setTimeout(() => { gumb.textContent = "Kopiraj"; }, 1600);
}

// ---------- zagon ----------

async function naloziVrstice() {
  const odziv = await fetch("vrstice.txt");
  if (!odziv.ok) throw new Error(`HTTP ${odziv.status}`);
  const besedilo = (await odziv.text()).replace(/^﻿/, "");
  return besedilo
    .split(/\r?\n/)
    .filter((vrsta) => vrsta.trim())
    .map((vrsta) => vrsta.split("||").map((moznost) => moznost.trim()));
}

async function zazeni() {
  try {
    vrstice = await naloziVrstice();
  } catch (napaka) {
    $("sonet").innerHTML = '<p class="napaka">Verzov ni bilo mogoče naložiti. Poskusite znova čez trenutek.</p>';
    console.error("Nalaganje vrstice.txt ni uspelo:", napaka);
    return;
  }

  stMoznih = vrstice.reduce((produkt, moznosti) => produkt * moznosti.length, 1);
  $("st-moznih").textContent = oblikujStevilo(stMoznih);

  stSeja = preberiStevec("sessionStorage", KLJUC_SEJA);
  stSkupaj = preberiStevec("localStorage", KLJUC_SKUPAJ);
  pokaziStevce(false);

  zgradiSonet();
  const st = stevilkaIzNaslova();
  if (st) prikazi(stevilkaVIzbiro(st));
  else prikazi(OSNOVNA_IZBIRA, { posodobiNaslov: false });

  $("zgeneriraj").disabled = false;
  $("kopiraj").disabled = false;
  $("zgeneriraj").addEventListener("click", zgeneriraj);
  $("kopiraj").addEventListener("click", kopiraj);

  $("sonet").addEventListener("click", (e) => {
    const verz = e.target.closest(".verz");
    if (verz) zamenjajVerz(Number(verz.dataset.i));
  });

  // preslednica = nov sonet (razen če je fokus na povezavi, gumbu ipd.)
  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space" || e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.target instanceof Element &&
        e.target.closest("a, button, input, textarea, select, [contenteditable]")) return;
    e.preventDefault();
    zgeneriraj();
  });

  // ročno spremenjena številka v naslovu (#1234567)
  window.addEventListener("hashchange", () => {
    const st = stevilkaIzNaslova();
    if (st) prikazi(stevilkaVIzbiro(st), { posodobiNaslov: false });
  });
}

zazeni();
