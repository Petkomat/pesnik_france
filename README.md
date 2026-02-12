# Vse za dober biznis, vse za velik dnar

Pesnik France je po duši hitri zaslužkar. 5 000 000 sonetov napiše, kot bi mignil.

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
