import random


def nalozi():
    vrstice = []
    with open("vrstice.txt", encoding="utf-8") as f:
        for vrsta in f:
            moznosti = [moznost.strip() for moznost in vrsta.split("||")]
            vrstice.append(moznosti)
    return vrstice


VRSTICE = nalozi()
OSNOVNA_IZBIRA = [
    0, 0, 0, 0,
    2, 2, 0, 0,
    0, 0, 0,
    1, 2, 2
]
KITICE = [0, 4, 8, 11, 14]


def zgeneriraj():
    izbira = []
    for i, moznosti in enumerate(VRSTICE):
        izbira.append(random.choice(range(len(moznosti))))
    return izbira


def pripravi_besedilo(izbira):
    besedilo = []
    for i, i_start in enumerate(KITICE[:-1]):
        i_end = KITICE[i + 1]
        besedilo.append("<p>")
        for i_vrsta in range(i_start, i_end):
            besedilo.append(f"{VRSTICE[i_vrsta][izbira[i_vrsta]]}<br>")
        besedilo.append("</p>")
    return "\n".join(besedilo)


def test_pripravi_besedilo():
    print(pripravi_besedilo(OSNOVNA_IZBIRA))


if __name__ == "__main__":
    test_pripravi_besedilo()
