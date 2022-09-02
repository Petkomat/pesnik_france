import bottle
import model
import sys
import os


PISKOT_STEVEC = "stevec"
FIX_ARG = {"KITICE": model.KITICE, "VRSTICE": model.VRSTICE}

@bottle.get("/img/<file>")
def staticne_slike(file):
    return bottle.static_file(file, root="img")


@bottle.get("/favicon.ico")
def favicon():
    return bottle.static_file("favicon.ico", root="img")


@bottle.get("/oblikovanje/<file>")
def staticni_css(file):
    return bottle.static_file(file, root="oblikovanje")


@bottle.get("/")
def osnovno():
    stevec = bottle.request.get_cookie(PISKOT_STEVEC) or "0"
    stevec = int(stevec)
    return bottle.template(
        "base",
        stevec=stevec,
        izbira=model.OSNOVNA_IZBIRA,
        **FIX_ARG
    )


@bottle.post("/")
def generiraj():
    stevec = bottle.request.get_cookie(PISKOT_STEVEC) or "0"
    stevec = int(stevec) + 1
    izbira = model.zgeneriraj()
    # shranimo piskotek
    bottle.response.set_cookie(PISKOT_STEVEC, str(stevec))
    return bottle.template(
        "base",
        stevec=stevec,
        izbira=izbira,
        **FIX_ARG
    )


if len(sys.argv) < 2 or sys.argv[1] == "local":
    bottle.run(host='localhost', port=8080, debug=True)
else:
    bottle.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
