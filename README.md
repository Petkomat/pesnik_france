# Vse za dober biznis, vse za velik dnar

Pesnik France je po duši hitri zaslužkar. 5 000 000 sonetov napiše, kot bi mignil.

[Zgeneriraj si sonet](https://petkomat.github.io/pesnik_france/)

# Navodila za pythonanywhere

## Ustvari app

1. Naredi si app: bootle 3.10 python ...
2. Pusti, da se ustvari defaulten `bottle_app.py` v `/home/<ime>/mysite/`
3. Vidu boš, da definira `application = default_app()`

## Datoteke

Prekopiraj vsebino repozitorija v `/home/<ime>/mysite/`:

- img
- oblikovanje
- views
- model.py
- stevec/vrstice.txt

Povozi `bottle_app.py` z app.py, tako da if/else block 

```
if len(sys.argv) < 2 or sys.argv[1] == "local":
    bottle.run(host='localhost', port=8080, debug=True)
else:
    bottle.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
```

na koncu zamenjaš s preprostim `application = default_app()`.

## Web

### Code

je videti nekako tako:

| Nastavitev | Vrednost |
| --- | --- |
| Source code | /home/pfrance/mysite |
| Working directory | /home/pfrance |
| WSGI configuration file | /var/www/pfrance_eu_pythonanywhere_com_wsgi.py |
| Python version | 3.10 |

### Static files

pa so tkole (pazi na / na koncu):

| URL | Directory |
| --- | --- |
| /img/ | /home/pfrance/mysite/img/ |
| /oblikovanje/ | /home/pfrance/mysite/oblikovanje/ |

# GitHub Pages

Statična kopija generatorja, brez Pythona: vse teče v brskalniku.

Stran: <https://petkomat.github.io/pesnik_france/>

## Datoteke

- `github_pages/index.html`, `stran.css`, `sonet.js`: stran in logika (`model.py`, prepisan v JavaScript).
- `.github/workflows/github-pages.yml`: zloži `github_pages/*` + `img/` + `vrstice.txt` v `_site/` in to objavi.
  Verzi so torej samo v `vrstice.txt`, skupni za Python in statično različico.

## Objava

- Enkratno: Settings → Pages → Source: **GitHub Actions**.
- Nato se objavi samo ob vsakem pushu na `main`, ki spremeni `github_pages/`, `img/`, `vrstice.txt` ali workflow.
  Ročno: Actions → GitHub Pages → Run workflow.

## Kaj zna

- Števca: **v tej seji** (`sessionStorage`, velja za zavihek) in **na tej napravi** (`localStorage`).
  Skupnega števca za vse obiskovalce ni: GitHub Pages je statičen, za to bi rabili zunanjo storitev.
- Vsak sonet ima številko (1 … 4 782 969), ki je tudi povezava: `…/pesnik_france/#52506`.
- Klik na verz zamenja samo ta verz; preslednica = nov sonet.
- *Kopiraj* (besedilo + povezava) in *Odkupi za 1 cent* (mail s številko in besedilom soneta).

## Lokalni predogled

V Git Bashu, v korenu repozitorija:

```
rm -rf _site && mkdir _site && cp -r github_pages/. img vrstice.txt _site/ && python -m http.server -d _site 8000
```

in odpri <http://localhost:8000>. (Z dvoklikom na `index.html` ne gre, ker brskalnik ne pusti naložiti `vrstice.txt` z diska.)

# Heroku (upokojeno)

Prvotno (september 2022) je stran tekla na Herokuju. Heroku je brezplačne dyne ukinil 28. 11. 2022,
zato je zdaj na pythonanywhere in GitHub Pages (zgoraj). Od Herokuja so ostale tele datoteke:

| Datoteka | Vsebina | Čemu je služila |
| --- | --- | --- |
| `Procfile` | `web: python app.py global` | Heroku s tem ukazom zažene `web` dyno. Argument `global` pošlje `app.py` v `else` vejo: posluša na `0.0.0.0`, na vratih iz okoljske spremenljivke `PORT`, ki jo nastavi Heroku. |
| `Procfile.windows` | `web: python app.py local` | Lokalno testiranje s Heroku CLI na Windowsih: `heroku local web -f Procfile.windows` → `localhost:8080`, `debug=True`. |
| `requirements.txt` | `bottle` | Po tej datoteki Herokujev Python buildpack prepozna Python aplikacijo in namesti odvisnosti. |
| `runtime.txt` | `python-3.10.6` | Različica Pythona za buildpack. |

Deploy je šel bodisi s Heroku CLI:

```
heroku login
heroku create <ime-aplikacije>
git push heroku main
heroku open
```

bodisi prek povezave na GitHub repozitorij v Heroku dashboardu (Deploy → GitHub).

Števec zgeneriranih sonetov je v piškotku `stevec` (za vsakega obiskovalca posebej). `stevec.txt` koda ne uporablja.
Na Herokuju bi bil števec v datoteki tako ali tako neuporaben, ker se datotečni sistem ob vsakem ponovnem zagonu pobriše.

Pythonanywhere in GitHub Pages teh štirih datotek ne potrebujeta. `requirements.txt` je še vedno priročen za lokalni `pip install -r requirements.txt`.
