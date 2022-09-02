</html>
<!DOCTYPE html>
<html>
<head>
<title>W3.CSS Template</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link type="text/css" href="/oblikovanje/main.css" rel="stylesheet">
<link rel="stylesheet" href="/oblikovanje/fonti.css">
<style>
body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
</style>
</head>
<body class="w3-light-grey">

<!-- w3-content defines a container for fixed size centered content,
and is wrapped around the whole page content, except for the footer in this example -->
<div class="w3-content" style="max-width:1400px">

<!-- Header -->
<header class="w3-container w3-center w3-padding-32">
  <h1><b>PESNIK FRANCE: BLOG in ŠE KAJ</b></h1>
  <p>Dobrodošli na spletni strani pesnika Franceta</p>
</header>

<!-- Grid -->
<div class="w3-row">

<!-- Blog entries -->
<div class="w3-col l8 s12">
  <!-- Blog entry -->
  <div class="w3-card-4 w3-margin w3-white">
  <img src="/img/uz.png" alt="soneti" style="width:100%">
    <div class="w3-container">
      <h3><b>ŠOPEK SONETOV</b></h3>
      <h5>Slovenija, <span class="w3-opacity">8. september 2022</span></h5>
    </div>

    <div class="w3-container">
      <p>Kot vemo, je kruh že v glasbeni industriji trd, še težje je pri poeziji in besedilih.
      A tudi glasbena industrija je le industrija, zato sem se odločil prodreti na trg z
      masovno proizvodnjo in zelo nizkimi cenami pesmi.</p>

      <p>Nastopil sem v oddaji Ugriznimo znanost, kjer so mi omogočili, da se pokažem širšemu občinstvu.
      V okviru sodelovanja sem ustvaril skoraj 5 milijon sonetov. Spodaj si jih lahko zgenerirate enega po enega.
      Vsakega, ki vam je všeč, lahko odkupite že za en cent.
      </p>
    </div>
  </div>
  <hr>

  <!-- Blog entry -->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
      <h3><b>Generator sonetov</b></h3>
      <!-- <h5>Title description, <span class="w3-opacity">April 2, 2014</span></h5> -->
    </div>

    <div class="w3-container">
        % for i, i_start in enumerate(KITICE[:-1]):
        %     i_end = KITICE[i + 1]
              <p>
        %     for i_vrsta in range(i_start, i_end):
                 {{VRSTICE[i_vrsta][izbira[i_vrsta]]}}<br>
        %     end
              </p>
        % end
      <div class="w3-row">
        <div class="w3-col m8 s12">

          <p><form action="/" method="post"><button class="w3-button w3-padding-large w3-white w3-border" type="post"><b>Zgeneriraj nov sonet &raquo;</b></button></form></p>
        </div>
        <div class="w3-col m4 w3-hide-small">
          <p><span class="w3-padding-large w3-right"><b>Št. zgeneriranih sonetov: &nbsp;</b> <span class="w3-tag">{{stevec}}</span></span></p>
        </div>
      </div>
    </div>
  </div>
<!-- END BLOG ENTRIES -->
</div>

<!-- Introduction menu -->
<div class="w3-col l4">
  <!-- About Card -->
  <div class="w3-card w3-margin w3-margin-top">
  <img src="/img/portret.png" style="width:100%">
    <div class="w3-container w3-white">
      <h4><b>Nekaj o meni</b></h4>
      <p>
        Sem lep, mlad in nadarjen, nisem pa še uspešen. Ta kamenček v mozaik bom dodal
        s pisanjem pesmi in problem bo rešen. Potrebujete ljubezenski sonet? Napeto balado?
        Ste napisali narodno-zabavno vižo ali ljubko pop skladbo, besedila zanjo pa ne najdete?
        Pišite na <a href="mailto:france.pesnik@gmail.com">france.pesnik@gmail.com</a> in se bomo zmenili.
        Delam in pišem rime od pomladi do zime, od oseke do plime.
      </p>
      <p>
      Avtor moje podobe zgoraj je Blaž Zajc.
      </p>
    </div>
  </div><hr>

  <!-- Posts -->
  <div class="w3-card w3-margin">
    <div class="w3-container w3-padding">
      <h4>Napiši svoj sonet</h4>
    </div>
    <ul class="w3-ul w3-hoverable w3-white">
      <li class="w3-padding-16">
        <img src="/img/sonet.png" alt="soneti" style="width:100%">
        <span>Predlogo zanj ti je pripravil Blaž Zajc, sedaj pa si na vrsti ti.</span>
      </li>
    </ul>
  </div>
  <hr>

  <!-- Labels / tags -->
  <div class="w3-card w3-margin">
    <div class="w3-container w3-padding">
      <h4>Oznake</h4>
    </div>
    <div class="w3-container w3-white">
    <p>
    <span class="w3-tag w3-black w3-margin-bottom">pesnik</span>
    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">ugriznimo znanost</span>

    <span class="w3-tag w3-black w3-margin-bottom">sonet</span>
    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">hitro in poceni</span>

    <span class="w3-tag w3-black w3-margin-bottom">marljiv</span>
    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">ljubezen</span>

    <span class="w3-tag w3-black w3-margin-bottom">romantika</span>
    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">rime</span>

    <span class="w3-tag w3-black w3-margin-bottom">šola pisanja</span>


    </p>
    </div>
  </div>

<!-- END Introduction Menu -->
</div>

<!-- END GRID -->
</div><br>

<!-- END w3-content -->
</div>

<!-- Footer -->
<footer class="w3-container w3-dark-grey w3-padding-32 w3-margin-top">
  <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>

</body>

<script>
  document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = localStorage.getItem("scrollpos");
    if (scrollpos) window.scrollTo(0, scrollpos);
  });

  window.onscroll = function (e) {
    localStorage.setItem("scrollpos", window.scrollY);
  };
</script>

</html>