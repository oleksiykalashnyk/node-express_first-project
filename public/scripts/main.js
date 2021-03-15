<!--    use w3school scripts-->
    function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
    /*check if the item starts with the same letters as the text field value:*/
    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
    /*create a DIV element for each matching element:*/
    b = document.createElement("DIV");
    /*make the matching letters bold:*/
    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
    b.innerHTML += arr[i].substr(val.length);
    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
    /*execute a function when someone clicks on the item value (DIV element):*/
    b.addEventListener("click", function(e) {
    /*insert the value for the autocomplete text field:*/
    inp.value = this.getElementsByTagName("input")[0].value;
    /*close the list of autocompleted values,
    (or any other open lists of autocompleted values:*/
    closeAllLists();
});
    a.appendChild(b);
}
}
});
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
    /*If the arrow DOWN key is pressed,
    increase the currentFocus variable:*/
    currentFocus++;
    /*and and make the current item more visible:*/
    addActive(x);
} else if (e.keyCode == 38) { //up
    /*If the arrow UP key is pressed,
    decrease the currentFocus variable:*/
    currentFocus--;
    /*and and make the current item more visible:*/
    addActive(x);
} else if (e.keyCode == 13) {
    /*If the ENTER key is pressed, prevent the form from being submitted,*/
    e.preventDefault();
    if (currentFocus > -1) {
    /*and simulate a click on the "active" item:*/
    if (x) x[currentFocus].click();
}
}
});
    function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
}
    function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
}
}
    function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != inp) {
    x[i].parentNode.removeChild(x[i]);
}
}
}
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

    /*An array containing all the country names in the world:*/
    var countries = [
    "Adama",
    "Alwernia",
    "Andrespol",
    "Andrychow",
    "Anin",
    "Annopol",
    "Arkadia",
    "Babienica",
    "Babimost",
    "Baborow",
    "Baboszewo",
    "Balice",
    "Balice",
    "Banino",
    "Baniocha",
    "Baran",
    "Baranow",
    "Baranowko",
    "Barciany",
    "Barcice",
    "Barcin",
    "Barczewo",
    "Barglowka",
    "Barlinek",
    "Bartoszyce",
    "Baruchowo",
    "Barwice",
    "Bazanowka",
    "Beblo",
    "Bedkow",
    "Bejsce",
    "Belk",
    "Belsk Duzy",
    "Belsznica",
    "Bestwina",
    "Bestwinka",
    "Biala",
    "Bialobrzegi",
    "Bialy Dunajec",
    "Bibice",
    "Biecz",
    "Biedrusko",
    "Bielany",
    "Bielany Wroclawskie",
    "Bielawa",
    "Bielawa",
    "Bielawy",
    "Bielcza",
    "Bieliny",
    "Bielkowo",
    "Bielsk",
    "Bielsk Podlaski",
    "Bielsko-Biala",
    "Bierun",
    "Bierun Nowy",
    "Bierutow",
    "Biesiekierz",
    "Biezanow-Prokocim",
    "Bircza",
    "Biskupice",
    "Biskupice",
    "Biskupice Oloboczne",
    "Biskupiec",
    "Biskupin",
    "Bisztynek",
    "Blachownia",
    "Blazowa",
    "Bledzew",
    "Blizne",
    "Blizyn",
    "Bobrowniki",
    "Bobrza",
    "Bochnia",
    "Bochotnica",
    "Bochowo",
    "Bodzentyn",
    "Bogatynia",
    "Bogdaszowice",
    "Bogumilowice",
    "Bogunice",
    "Boguslaw",
    "Bohdan",
    "Bojadla",
    "Bojano",
    "Bojanowo",
    "Bojszow",
    "Bojszowy",
    "Bolechowice",
    "Boleslaw",
    "Bolewice",
    "Bolkow",
    "Bolszewo",
    "Borek Strzelinski",
    "Borki",
    "Borkowice",
    "Borkowo",
    "Borne Sulinowo",
    "Borowa",
    "Borowe",
    "Borowiec",
    "Bory",
    "Borzecin",
    "Borzykowo",
    "Bralin",
    "Bramki",
    "Braniewo",
    "Braszewice",
    "Bratkowice",
    "Brenna",
    "Brochocin",
    "Brodnica",
    "Brok",
    "Brudzice",
    "Brudzowice",
    "Brynica",
    "Brzeg",
    "Brzeg Dolny",
    "Brzesko",
    "Brzeszcze",
    "Brzezinka",
    "Brzeziny",
    "Brzeznica",
    "Brzeznica",
    "Brzostek",
    "Brzostowka",
    "Brzoza Krolewska",
    "Brzozow",
    "Brzyska Wola",
    "Buczkowice",
    "Budziska",
    "Budzyn",
    "Buk",
    "Bukowice",
    "Bukowiec Opoczynski",
    "Bukowina Tatrzanska",
    "Bukowno",
    "Bukowsko",
    "Burzenin",
    "Bychawa",
    "Byczyna",
    "Bydgoszcz",
    "Bydlin",
    "Byslaw",
    "Bystra",
    "Bystrzyca Klodzka",
    "Bytom",
    "Cekcyn",
    "Cekow",
    "Chalupki",
    "Charzykowy",
    "Checiny",
    "Chelm",
    "Chelmek",
    "Chelmsko Slaskie",
    "Chmielnik",
    "Chmielnik",
    "Chmielow",
    "Chocianow",
    "Chociwel",
    "Choczewo",
    "Chocznia",
    "Chojna",
    "Chojnice",
    "Choroszcz",
    "Chorzele",
    "Chorzelow",
    "Choszczno",
    "Chotel",
    "Chotomow",
    "Chrzan",
    "Chrzastowka",
    "Chrzesne",
    "Chrzowice",
    "Chwaszczyno",
    "Chybie",
    "Chylice",
    "Chyliczki",
    "Cianowice Duze",
    "Ciasna",
    "Ciechocin",
    "Ciechocinek",
    "Cierpice",
    "Cieszkow",
    "Cieszyn",
    "Ciezkowice",
    "Cigacice",
    "Cisiec",
    "Cmielow",
    "Cmolas",
    "Cwiklice",
    "Cybinka",
    "Czaniec",
    "Czaplinek",
    "Czapury",
    "Czarna",
    "Czarne",
    "Czarnkow",
    "Czarnozyly",
    "Czarny Bor",
    "Czarny Dunajec",
    "Czarny Las",
    "Czarze",
    "Czastary",
    "Czechowice-Dziedzice",
    "Czekanow",
    "Czeladz",
    "Czempin",
    "Czernica",
    "Czernica",
    "Czernichow",
    "Czerniewice",
    "Czersk",
    "Czersk",
    "Czerwiensk",
    "Czerwionka-Leszczyny",
    "Czerwonak",
    "Czluchow",
    "Czosnow",
    "Czudec",
    "Czyzyny",
    "Dabki",
    "Dabrowa",
    "Dabrowa Bialostocka",
    "Dabrowa Biskupia",
    "Dabrowa Chelminska",
    "Dabrowa Chotomowska",
    "Dabrowka Wielka",
    "Dabrowno",
    "Dabrowskie",
    "Daleszyce",
    "Damnica",
    "Dankowice",
    "Dargoslaw",
    "Darnowo",
    "Debe Wielkie",
    "Debica",
    "Debina",
    "Deblin",
    "Debno",
    "Debno",
    "Debowiec",
    "Debrzno Wies",
    "Deszczno",
    "Dlugopole-Zdroj",
    "Dobiesz",
    "Dobieszowice",
    "Dobra",
    "Dobra",
    "Dobre Miasto",
    "Dobrodzien",
    "Dobromierz",
    "Dobron",
    "Dobroszyce",
    "Dobroszyce",
    "Dobrzany",
    "Dobrzen Wielki",
    "Dobrzyca",
    "Dolaszewo",
    "Dolice",
    "Domaniewice",
    "Domaradz",
    "Domaslaw",
    "Dopiewiec",
    "Drawno",
    "Drawsko Pomorskie",
    "Drewnica",
    "Drezdenko",
    "Drohiczyn",
    "Drozdowo",
    "Druzbice",
    "Drzewica",
    "Duczki",
    "Dukla",
    "Dulcza Wielka",
    "Dunaj",
    "Duszniki-Zdroj",
    "Dygowo",
    "Dylewo",
    "Dynow",
    "Dywity",
    "Dzialoszyn",
    "Dziechciniec",
    "Dziegielow",
    "Dziekanow Lesny",
    "Dzielna",
    "Dzierzazno",
    "Dzierzgon",
    "Dzierzoniow",
    "Dziewin",
    "Dzikowiec",
    "Dziwnow",
    "Dzwierzuty",
    "Elblag",
    "Elzbieta",
    "Fabianki",
    "Falkow",
    "Falkowo",
    "Frank",
    "Frombork",
    "Frydrychowice",
    "Frysztak",
    "Gadka Stara",
    "Garbow",
    "Garby",
    "Garki",
    "Garwolin",
    "Gaszowice",
    "Gaworzyce",
    "Gdow",
    "Gdynia",
    "Giby",
    "Gieraltowice",
    "Gieraltowice",
    "Gizalki",
    "Gizyce",
    "Gliwice",
    "Glogow Malopolski",
    "Glogowek",
    "Gloskow",
    "Glowienka",
    "Glowna",
    "Glowno",
    "Glubczyce",
    "Glucholazy",
    "Gluchow",
    "Gluszyca",
    "Gmina Babiak",
    "Gmina Bobrowo",
    "Gmina Chmielno",
    "Gmina Ciechanowiec",
    "Gmina Gnojno",
    "Gmina Kiszkowo",
    "Gmina Kolno",
    "Gmina Konarzyny",
    "Gmina Lipno",
    "Gmina Ludwin",
    "Gmina Lutomiersk",
    "Gmina Morawica",
    "Gmina Moszczenica",
    "Gmina Opole Lubelskie",
    "Gmina Przywidz",
    "Gmina Sadowie",
    "Gmina Sierakowice",
    "Gmina Strzelin",
    "Gmina Szubin",
    "Gmina Widawa",
    "Gmina Wyszki",
    "Gmina Zakliczyn",
    "Gniew",
    "Gniewino",
    "Gniewkowo",
    "Gniezno",
    "Gnuszyn",
    "Godziszewo",
    "Gogolin",
    "Golanice",
    "Golasowice",
    "Golczewo",
    "Goleszow",
    "Golkowice",
    "Golotczyzna",
    "Golub-Dobrzyn",
    "Gomunice",
    "Gora",
    "Gora",
    "Gora Kalwaria",
    "Gora Pulawska",
    "Gora Siewierska",
    "Gorazdze",
    "Gorki Wielkie",
    "Gorlice",
    "Gorno",
    "Gorz",
    "Gorzkow",
    "Gorzkowice",
    "Gorzow",
    "Gorzow Slaski",
    "Gorzyce",
    "Gorzyce",
    "Gorzyce",
    "Gorzyczki",
    "Gostyn",
    "Gostynin",
    "Goszczyn",
    "Gowarzewo",
    "Gowino",
    "Gozdnica",
    "Gozdowo",
    "Grabiec",
    "Grabki Duze",
    "Grabow nad Prosna",
    "Grabowka",
    "Gracze",
    "Grajewo",
    "Grebocice",
    "Grebocin",
    "Grodki",
    "Grodkow",
    "Grodzisk",
    "Grodzisk Mazowiecki",
    "Grodzisk Wielkopolski",
    "Grodzisko Dolne",
    "Grojec",
    "Gromiec",
    "Gronowo Elblaskie",
    "Gruczno",
    "Grunwald",
    "Grupa",
    "Gruszczyn",
    "Grybow",
    "Gryfice",
    "Gryfino",
    "Gryfow Slaski",
    "Grzebien",
    "Grzegorz",
    "Grzmiaca",
    "Grzmucin",
    "Gubin",
    "Gzin",
    "Haczow",
    "Harasiuki",
    "Hecznarowice",
    "Henrykow",
    "Hornowek",
    "Hucisko Jawornickie",
    "Humniska",
    "Huta Dabrowa",
    "Huta Dlutowska",
    "Huta Stara",
    "Ilowa",
    "Ilowo",
    "Ilza",
    "Imielin",
    "Iwaniska",
    "Iwanowice",
    "Iwiczna",
    "Iwierzyce",
    "Iwla",
    "Iwonicz-Zdroj",
    "Izabela",
    "Izabelin",
    "Jablonica",
    "Jablonka",
    "Jablonna",
    "Janin",
    "Jankowice",
    "Janow",
    "Janow Lubelski",
    "Jarkowice",
    "Jarocin",
    "Jaroszow",
    "Jaroszowiec",
    "Jasienica",
    "Jasienica Dolna",
    "Jasieniec",
    "Jaslo",
    "Jastkow",
    "Jastrowie",
    "Jastrzebie",
    "Jastrzebie",
    "Jawiszowice",
    "Jawor",
    "Jaworzno",
    "Jaworzyna Slaska",
    "Jedlicze",
    "Jedlnia-Letnisko",
    "Jelesnia",
    "Jemielnica",
    "Jerzmanowice",
    "Jeziora Wielkie",
    "Jeziorany",
    "Jezowe",
    "Jordanow",
    "Jozefatow",
    "Jozefoslaw",
    "Jozefow",
    "Juchnowiec Koscielny",
    "Jugow",
    "Juszkowo",
    "Jutrosin",
    "Kaczkowo",
    "Kaczor",
    "Kalety",
    "Kalisz",
    "Kalwaria Zebrzydowska",
    "Kamien",
    "Kamien",
    "Kamien Krajenski",
    "Kamien Pomorski",
    "Kamien Slaski",
    "Kamienica Polska",
    "Kamieniec",
    "Kamienna Gora",
    "Kamionki",
    "Kampinos",
    "Kanczuga",
    "Karchowice",
    "Karczew",
    "Kargowa",
    "Karlikowo",
    "Karlino",
    "Karnice",
    "Karniowice",
    "Karpacz",
    "Karpiska",
    "Karsko",
    "Kartuzy",
    "Kasinka",
    "Katarzyna",
    "Katowice",
    "Katy",
    "Katy",
    "Katy Wroclawskie",
    "Kazimierz Biskupi",
    "Kazimierz Dolny",
    "Kazimierza Wielka",
    "Kazmierz",
    "Kcynia",
    "Keblowo",
    "Keblowo",
    "Kedzierzyn",
    "Kedzierzyn-Kozle",
    "Kety",
    "Kicin",
    "Kielce",
    "Kielcz",
    "Kielczow",
    "Kielno",
    "Kielpin",
    "Kijewo Krolewskie",
    "Klaj",
    "Klecko",
    "Klecza Dolna",
    "Kleczany",
    "Klenica",
    "Kleszczewo",
    "Kleszczow",
    "Klikawa",
    "Klikuszowa",
    "Klimontow",
    "Kliniska",
    "Klobuck",
    "Klodawa",
    "Klomnice",
    "Kluczbork",
    "Klucze",
    "Knurow",
    "Knyszyn",
    "Kobiernice",
    "Kobierzyce",
    "Kobior",
    "Kobylanka",
    "Kobylka",
    "Kobylnica",
    "Kochcice",
    "Kocierzew Poludniowy",
    "Kocmyrzow",
    "Kojszowka",
    "Kokoszkowy",
    "Kolbudy",
    "Kolbuszowa",
    "Koleczkowo",
    "Kolno",
    "Kolodziejewo",
    "Kolonia Zawada",
    "Kolonowskie",
    "Koluszki",
    "Komorniki",
    "Komorow",
    "Komorsk",
    "Konarzewo",
    "Konarzyce",
    "Konczyce Male",
    "Koniakow",
    "Koniecpol",
    "Konin",
    "Koniusza",
    "Konopiska",
    "Konradowka",
    "Konstancin-Jeziorna",
    "Konstantyn",
    "Konstantynow",
    "Konstantynow Lodzki",
    "Kopki",
    "Korczyna",
    "Korfantow",
    "Kornik",
    "Koronowo",
    "Korsze",
    "Korytow",
    "Korzenna",
    "Kosakowo",
    "Koscielisko",
    "Koscierzyna",
    "Kosina",
    "Kostrzyn",
    "Kostrzyn nad Odra",
    "Koszalin",
    "Koszecin",
    "Koszyce",
    "Koszyce",
    "Koteze",
    "Kotlin",
    "Kowal",
    "Kowalew",
    "Kowalewo",
    "Kowalewo Pomorskie",
    "Kowalkow",
    "Kowalowa",
    "Kowary",
    "Kowiesy",
    "Kozieglowy",
    "Kozieglowy",
    "Kozienice",
    "Kozmin Wielkopolski",
    "Kozminek",
    "Kozuchow",
    "Kozy",
    "Kozy",
    "Krakow",
    "Krapkowice",
    "Krasiejow",
    "Krasne",
    "Krasnik",
    "Krasnystaw",
    "Krasocin",
    "Kraszew",
    "Krepa Kaszubska",
    "Krokowa",
    "Kroscienko Wyzne",
    "Krosno",
    "Krosno Odrzanskie",
    "Krosnowice",
    "Krotoszyn",
    "Kruszyn",
    "Kruszyna",
    "Krynica",
    "Krynica-Zdroj",
    "Krypno",
    "Krzepice",
    "Krzeszow",
    "Krzeszowice",
    "Krzyki-Partynice",
    "Krzyszkowice",
    "Krzywcza",
    "Krzywin",
    "Krzyz Wielkopolski",
    "Krzyzanowice",
    "Ksiazenice",
    "Ksieginice",
    "Kukow",
    "Kuligow",
    "Kunice",
    "Kunow",
    "Kurdwanow",
    "Kurek",
    "Kurylowka",
    "Kurzetnik",
    "Kusnierz",
    "Kutno",
    "Kuznia",
    "Kuznica Czarnkowska",
    "Kuzniki",
    "Kwaczala",
    "Kwidzyn",
    "Kwilcz",
    "Labiszyn",
    "Labowa",
    "Labunie",
    "Lachowice",
    "Lack",
    "Lacko",
    "Ladek",
    "Lajsk",
    "Laka",
    "Lancut",
    "Lany",
    "Lask",
    "Laska",
    "Laskarzew",
    "Latowicz",
    "Laziska",
    "Laziska Gorne",
    "Leba",
    "Lebork",
    "Leczna",
    "Ledziny",
    "Legionowo",
    "Legnica",
    "Legowo",
    "Lekawica",
    "Lelow",
    "Lesko",
    "Lesna",
    "Lesnica",
    "Leszkowice",
    "Leszno",
    "Leszno",
    "Lewin Brzeski",
    "Lezajsk",
    "Libiaz",
    "Lidzbark",
    "Ligota",
    "Limanowa",
    "Liniewo",
    "Linowko",
    "Lipinki Luzyckie",
    "Lipiny",
    "Lipnica Murowana",
    "Lipnica Wielka",
    "Lipnik",
    "Lipno",
    "Lipowa",
    "Lipsko",
    "Lipusz",
    "Lisewo",
    "Liskow",
    "Liszki",
    "Liw",
    "Lobez",
    "Lobzenica",
    "Lochow",
    "Lochowo",
    "Lodygowice",
    "Lomianki",
    "Lomianki Dolne",
    "Lomnica",
    "Lotyn",
    "Lowicz",
    "Lubaczow",
    "Luban",
    "Lubanie",
    "Lubartow",
    "Lubaszowa",
    "Lubawa",
    "Lubawka",
    "Lubenia",
    "Lubichowo",
    "Lubicz",
    "Lubien",
    "Lubin",
    "Lublewo",
    "Lublin",
    "Lubliniec",
    "Lubnice",
    "Lubochnia",
    "Lubomia",
    "Lubomierz",
    "Lubon",
    "Luborzyca",
    "Lubraniec",
    "Lubsko",
    "Lubsza",
    "Lubycza Krolewska",
    "Lukow",
    "Lulin",
    "Lusowko",
    "Lutynia",
    "Luzino",
    "Lysomice",
    "Mackowice",
    "Magnuszew",
    "Majdan Krolewski",
    "Majewo",
    "Makow",
    "Makow Mazowiecki",
    "Makow Podhalanski",
    "Makowiec",
    "Maksymilianowo",
    "Malbork",
    "Malczyce",
    "Malogoszcz",
    "Manowo",
    "Marcinowice",
    "Marek",
    "Margonin",
    "Maria",
    "Marki",
    "Marklowice",
    "Marta",
    "Mary",
    "MaryLka",
    "Maslice",
    "Maslow",
    "Maszewo",
    "Mazancowice",
    "Mechelinki",
    "Medyka",
    "Medynia Glogowska",
    "Melno",
    "Meszna",
    "Mialy",
    "Miasteczko Slaskie",
    "Miastko",
    "Michalowice",
    "Miechow",
    "Mieczewo",
    "Miedzna",
    "Miedzyborow",
    "Miedzyborz",
    "Miedzybrodzie Zywieckie",
    "Miedzylesie",
    "Miedzyzdroje",
    "Miejska Gorka",
    "Mielec",
    "Mielno",
    "Mieroszow",
    "Mierzecice",
    "Mierzeszyn",
    "Mikolajki",
    "Mikoszewo",
    "Mikstat",
    "Milanow",
    "Milcza",
    "Milejow",
    "Milicz",
    "Milkowice",
    "Milobadz",
    "Miloradz",
    "Milowka",
    "Minoga",
    "Mirkow",
    "Miroslaw",
    "Miroslawiec",
    "Mirsk",
    "Miszkowice",
    "Mniow",
    "Modlnica",
    "Modlniczka",
    "Modrze",
    "Mogilany",
    "Mogilno",
    "Mokrsko",
    "Morawica",
    "Moryn",
    "Mosina",
    "Mosty",
    "Moszczanka",
    "Mragowo",
    "Mrocza",
    "Mrowino",
    "Mscice",
    "Msciwojow",
    "Mszana",
    "Mszana Dolna",
    "Mucharz",
    "Murowana Goslina",
    "Muszyna",
    "Myslachowice",
    "Myslenice",
    "Mysliborz",
    "Myszkow",
    "Myszyniec",
    "Nacpolsk",
    "Nadarzyn",
    "Naklo",
    "Naleczow",
    "Namyslow",
    "Naprawa",
    "Narew",
    "Narzym",
    "Nasielsk",
    "Nawodna",
    "Nebrowo Wielkie",
    "Nidzica",
    "Nieborowice",
    "Niechanowo",
    "Niedomice",
    "Niedrzwica Duza",
    "Niegoslawice",
    "Nielisz",
    "Niemcz",
    "Niemcza",
    "Niemodlin",
    "Nienadowka",
    "Niepolomice",
    "Niewierz",
    "Nisko",
    "Niwica",
    "Nowa",
    "Nowa Biala",
    "Nowa Deba",
    "Nowa Huta",
    "Nowa Ruda",
    "Nowa Slupia",
    "Nowa Sol",
    "Nowa Wies Elcka",
    "Nowe Chechlo",
    "Nowe Lignowy",
    "Nowe Miasto Lubawskie",
    "Nowe Miasto nad Pilica",
    "Nowe Miasto nad Warta",
    "Nowe Skalmierzyce",
    "Nowo-Aleksandrowo",
    "Nowogard",
    "Nowogrodziec",
    "Nowy Dwor",
    "Nowy Dwor Gdanski",
    "Nowy Dwor Mazowiecki",
    "Nowy Korczyn",
    "Nowy Staw",
    "Nowy Swietow",
    "Nowy Targ",
    "Nowy Tomysl",
    "Nowy Wisnicz",
    "Nysa",
    "Oblaczkowo",
    "Oborniki",
    "Obrzycko",
    "Obsza",
    "Odolanow",
    "Odolin",
    "Odrzykon",
    "Ogrody",
    "Ogrodzieniec",
    "Ojrzen",
    "Oksywie",
    "Olawa",
    "Olecko",
    "Olejnica",
    "Olesnica",
    "Olesno",
    "Oleszno",
    "Olimpia",
    "Olkusz",
    "Olszany",
    "Olszowice",
    "Olsztyn",
    "Olsztynek",
    "Olszyna",
    "Oltarzew",
    "Opalenica",
    "Opatow",
    "Opatowek",
    "Opoczno",
    "Opole",
    "Orchowo",
    "Orneta",
    "Ornontowice",
    "Orzel",
    "Orzesze",
    "Orzysz",
    "Osieck",
    "Osieczna",
    "Osiek",
    "Osiek",
    "Osiek Jasielski",
    "Osielsko",
    "Osno",
    "Osno Lubuskie",
    "Ostaszewo",
    "Ostrog",
    "Ostroszowice",
    "Ostrow",
    "Ostrow Lubelski",
    "Ostrow Mazowiecka",
    "Ostrowek",
    "Ostrowite",
    "Ostrowy",
    "Ostrzeszow",
    "Otoki",
    "Otomin",
    "Otrebusy",
    "Otwock",
    "Otyn",
    "Owinska",
    "Ozarow Mazowiecki",
    "Ozimek",
    "Ozorkow",
    "Pabianice",
    "Pacanow",
    "Pajeczno",
    "Paledzie",
    "Paliszewo",
    "Paniowki",
    "Papowo",
    "Parczew",
    "Pastuchow",
    "Paulina",
    "Pawlowice",
    "Pawlowice",
    "Pcim",
    "Peczniew",
    "Pedziwiatry",
    "Pegow",
    "Pelplin",
    "Pepowo",
    "Pewel Mala",
    "Piaseczno",
    "Piasek",
    "Piaski",
    "Piaski",
    "Piastow",
    "Piechowice",
    "Piekary",
    "Piekary Slaskie",
    "Piekielnik",
    "Piekoszow",
    "Pielgrzymka",
    "Pielice",
    "Piensk",
    "Pierwoszyno",
    "Pieszkow",
    "Pieszyce",
    "Pietrowice Wielkie",
    "Pietrzykowice",
    "Pila",
    "Pila",
    "Pila Koscielecka",
    "Pilawa",
    "Pilawa",
    "Pilawa Gorna",
    "Pilchowice",
    "Pilica",
    "Pinczow",
    "Pionki",
    "Pisarzowice",
    "Pisz",
    "Plesna",
    "Pleszew",
    "Plewiska",
    "Plochocin",
    "Pniewy",
    "Pniewy",
    "Pobiedna",
    "Pobiedziska",
    "Poczesna",
    "Podegrodzie",
    "Podgorne",
    "Podgorze",
    "Podlasie",
    "Podleze",
    "Pogodki",
    "Pogorzela",
    "Pogwizdow",
    "Pokrzywnica",
    "Polajewo",
    "Polanka Wielka",
    "Polczyn-Zdroj",
    "Police",
    "Polkowice",
    "Polomia",
    "Polskie",
    "Pomiechowek",
    "Pomorskie",
    "Popow",
    "Popowice",
    "Poraj",
    "Poreba",
    "Poswietne",
    "Poznan",
    "Prabuty",
    "Prabuty",
    "Praca",
    "Praszka",
    "Prawiedniki",
    "Prochowice",
    "Prokocim",
    "Prosna",
    "Proszowice",
    "Pruchna",
    "Prudnik",
    "Prusice",
    "Pruszcz Gdanski",
    "Pruszcz Pomorski",
    "Przasnysz",
    "Przechlewo",
    "Przeclaw",
    "Przeclaw",
    "Przemet",
    "Przemysl",
    "Przemysl",
    "Przemyslaw",
    "Przeworsk",
    "Przezmierowo",
    "Przygodzice",
    "Przylep",
    "Przyrow",
    "Przysiek",
    "Przystajn",
    "Przyszowice",
    "Pszczew",
    "Pszczyna",
    "Pszow",
    "Puck",
    "Pustkow",
    "Puszczew",
    "Puszczykowo",
    "Pyrzyce",
    "Pyskowice",
    "Pysznica",
    "Rabien",
    "Rabka-Zdroj",
    "Raciaz",
    "Raciazek",
    "Racula",
    "Raczka",
    "Raczki",
    "Radgoszcz",
    "Radlin",
    "Radlow",
    "Radom",
    "Radomin",
    "Radomsko",
    "Radomysl Wielki",
    "Radoslaw",
    "Radostowice",
    "Radoszyce",
    "Radymno",
    "Radzanow",
    "Radzanowo",
    "Radziechowy",
    "Radziejowice",
    "Radzionkow",
    "Radzymin",
    "Radzyn Podlaski",
    "Rajszew",
    "Rakow",
    "Rakowiec",
    "Rakszawa",
    "Ranizow",
    "Raszowa",
    "Raszowka",
    "Raszyn",
    "Rawa Mazowiecka",
    "Rawicz",
    "Rebkow",
    "Rebowo",
    "Reczno",
    "Reda",
    "Regimin",
    "Rejowiec",
    "Reszel",
    "Rewa",
    "Rewal",
    "Roczyny",
    "Rogalinek",
    "Rogow",
    "Rogow",
    "Rogowo",
    "Rogoznik",
    "Rogozno",
    "Rokietnica",
    "Rokitki",
    "Rokitnica",
    "Ropczyce",
    "Rosnowko",
    "Rostarzewo",
    "Rozanka",
    "Rozgarty",
    "Rozprza",
    "Roztoka",
    "Ruda",
    "Rudka",
    "Rudna Mala",
    "Rudnik nad Sanem",
    "Rudy",
    "Rudzica",
    "Rudziniec",
    "Rumia",
    "Rumianek",
    "Rusiec",
    "Rybna",
    "Rybnik",
    "Rybno",
    "Rychwal",
    "Rydzyna",
    "Ryglice",
    "Ryki",
    "Ryman",
    "Rymanow",
    "Ryn",
    "Rypin",
    "Rzasnia",
    "Rzeczyce",
    "Rzemien",
    "Rzepin",
    "Rzeszotary",
    "Rzewnie",
    "Rzgow Pierwszy",
    "Rzuchowa",
    "Sadlinki",
    "Sadlno",
    "Sady",
    "Samin",
    "Sandomierz",
    "Sanniki",
    "Sanok",
    "Santok",
    "Sarbinowo",
    "Scinawa Mala",
    "Scinawa Nyska",
    "Sedziszow",
    "Sedziszow Malopolski",
    "Sepolno Krajenskie",
    "Serock",
    "Serock",
    "Serwis",
    "Sianow",
    "Sidra",
    "Sidzina",
    "Siechnice",
    "Siedlce",
    "Siedlec",
    "Siekierczyn",
    "Siemiatycze",
    "Siemirowice",
    "Siemkowice",
    "Sieniawa",
    "Sieniawa Zarska",
    "Sieniawka",
    "Siennica",
    "Siennica Nadolna",
    "Sieradz",
    "Sieroszowice",
    "Sierpc",
    "Siewierz",
    "Siwek",
    "Skala",
    "Skarszewy",
    "Skarzysko-Kamienna",
    "Skawina",
    "Skierdy",
    "Skierniewice",
    "Skoczow",
    "Skomlin",
    "Skopanie",
    "Skorcz",
    "Skorzec",
    "Skorzewo",
    "Skrbensko",
    "Skrzetusz",
    "Skrzyszow",
    "Skwierzyna",
    "Slawkow",
    "Slawno B",
    "Slawoszyno",
    "Slemien",
    "Slomniki",
    "Slone",
    "Slupca",
    "Slupno",
    "Smardzew",
    "Smardzowice",
    "Smigiel",
    "Smolec",
    "Smolnica",
    "Smolnik",
    "Sobienie Jeziory",
    "Sobotka",
    "Sobotka",
    "Sobowidz",
    "Sochaczew",
    "Sochocin",
    "Soczewka",
    "Sokolow Malopolski",
    "Sokolowsko",
    "Solec Kujawski",
    "Sompolno",
    "Sopot",
    "Sosnie",
    "Sosnowiec",
    "Sroda Wielkopolska",
    "Stadla",
    "Stalowa Wola",
    "Staniatki",
    "Staniszow",
    "Stankowo",
    "Stanowice",
    "Stara",
    "Stara Kamienica",
    "Stara Lubianka",
    "Starachowice",
    "Stare Babice",
    "Stare Bogaczowice",
    "Stare Czarnowo",
    "Stare Juchy",
    "Stare Kurowo",
    "Stare Miasto",
    "Stary Broniszew",
    "Stary Garbow",
    "Stary Sacz",
    "Stary Zamosc",
    "Staszow",
    "Staw",
    "Stawiany",
    "Stawiguda",
    "Stegna",
    "Steszew",
    "Stoczek",
    "Stolno",
    "Stopnica",
    "Straszyn",
    "Strawczyn",
    "Strazow",
    "Stronie Slaskie",
    "Stroze",
    "Strumien",
    "Strykow",
    "Stryszawa",
    "Stryszow",
    "Strzalkowo",
    "Strzebielino",
    "Strzebin",
    "Strzegom",
    "Strzelce Krajenskie",
    "Strzelce Opolskie",
    "Strzeleczki",
    "Strzelno",
    "Strzeszow",
    "Strzyze",
    "Strzyzow",
    "Strzyzow",
    "Studzieniec",
    "Subkowy",
    "Sucha Beskidzka",
    "Suchedniow",
    "Suchowola",
    "Suchy Dab",
    "Suchy Las",
    "Sulechow",
    "Sulejow",
    "Sulejowek",
    "Sulistrowice",
    "Sulmierzyce",
    "Sulmierzyce",
    "Sulmin",
    "Suloszowa",
    "Supienie",
    "Susiec",
    "Susz",
    "Suszec",
    "Suwaki",
    "Swarorzyn",
    "Swarzedz",
    "Swarzewo",
    "Swiatki",
    "Swidnica",
    "Swidnik",
    "Swidwin",
    "Swiebodzice",
    "Swiebodzin",
    "Swiecie nad Osa",
    "Swiekatowo",
    "Swierk",
    "Swierklany",
    "Swieta Katarzyna",
    "Swietno",
    "Swietoniowa",
    "Swiniary",
    "Swoboda",
    "Sycewice",
    "Sycow",
    "Syrynia",
    "Szadek",
    "Szadlowice",
    "Szczaniec",
    "Szczawno",
    "Szczawno-Zdroj",
    "Szczecin",
    "Szczecinek",
    "Szczejkowice",
    "Szczepanow",
    "Szczercow",
    "Szczucin",
    "Szczuczyn",
    "Szczurowa",
    "Szczyrk",
    "Szczytniki",
    "Szczytno",
    "Szebnie",
    "Szemud",
    "Szepietowo",
    "Szewce",
    "Szlachta",
    "Szostka",
    "Szowsko",
    "Szprotawa",
    "Szreniawa",
    "Sztum",
    "Sztutowo",
    "Szyce",
    "Szydlowiec",
    "Szydlowo",
    "Szyldak",
    "Szymanow",
    "Szypliszki",
    "Tanowo",
    "Tarchaly Wielkie",
    "Tarczyn",
    "Targanice",
    "Tarnobrzeg",
    "Tarnogrod",
    "Tarnow Opolski",
    "Tarnowiec",
    "Tarnowo Podgorne",
    "Tarnowskie Gory",
    "Tczew",
    "Tecza",
    "Tegoborze",
    "Tenczyn",
    "Teofilow",
    "Teresin",
    "Terespol",
    "Tluczan",
    "Tolkmicko",
    "Tomaszow",
    "Tomaszow",
    "Tomaszow Lubelski",
    "Tomaszowice",
    "Topola Mala",
    "Torzym",
    "Toszek",
    "Towarzystwo",
    "Trabki",
    "Trawniki",
    "Trojanow",
    "Trzciana",
    "Trzcianka",
    "Trzciel",
    "Trzcinsko",
    "Trzebinia",
    "Trzebnica",
    "Trzebownisko",
    "Trzebunia",
    "Trzemesnia",
    "Trzemeszno",
    "Trzemeszno Lubuskie",
    "Trzesniow",
    "Trzeszczyn",
    "Trzyciaz",
    "Trzydnik Duzy",
    "Tuchola",
    "Tuchow",
    "Tuczno",
    "Tulce",
    "Turbia",
    "Turek",
    "Turobin",
    "Turowiec",
    "Tuszyn",
    "Twardawa",
    "Twardogora",
    "Tworog",
    "Tychy",
    "Tyczyn",
    "Tyczyn",
    "Tykocin",
    "Tylicz",
    "Tylmanowa",
    "Tymbark",
    "Tymowa",
    "Tyszowce",
    "Uciechow",
    "Ujazd",
    "Ujscie",
    "Ulez",
    "Unieszewo",
    "Ustanow",
    "Ustka",
    "Ustron",
    "Ustrzyki Dolne",
    "Wabrzezno",
    "Wachock",
    "Wadowice",
    "Wadowice Gorne",
    "Waganiec",
    "Wagrowiec",
    "Walcz",
    "Walim",
    "Wambierzyce",
    "Wapielsk",
    "Warka",
    "Warsaw",
    "Warzachewka Polska",
    "Warzno",
    "Warzymice",
    "Wasilkow",
    "Wasniow",
    "Wawel",
    "Wawolnica",
    "Wegierska Gorka",
    "Wegliniec",
    "Weglowice",
    "Wegrzce Wielkie",
    "Wejherowo",
    "Wiazow",
    "Wicko",
    "Wieckowice",
    "Wielbark",
    "Wielen Zaobrzanski",
    "Wielgie",
    "Wielichowo",
    "Wieliczka",
    "Wieliszew",
    "Wielki Klincz",
    "Wieloglowy",
    "Wielopole Skrzynskie",
    "Wielowies",
    "Wieruszow",
    "Wierzchowisko",
    "Wieszowa",
    "Wijewo",
    "Wilczeta",
    "Wilczyce",
    "Wilczyn",
    "Wilga",
    "Wilkanowo",
    "Wilkow",
    "Wilkowice",
    "Wilkowisko",
    "Winnica",
    "Winsko",
    "Wiorek",
    "Wisla",
    "Wisla Wielka",
    "Wisniew",
    "Wisniowa",
    "Wisznice",
    "Witaszyce",
    "Witkowo",
    "Witnica",
    "Wlodawa",
    "Wlodzimierz",
    "Wloszczowa",
    "Wojciech",
    "Wojkowice",
    "Wojkowice Koscielne",
    "Wola Baranowska",
    "Wola Filipowska",
    "Wola Kopcowa",
    "Wola Krzysztoporska",
    "Wola Radlowska",
    "Wola Rasztowska",
    "Wola Rebkowska",
    "Wola Zaradzynska",
    "Wolborz",
    "Wolbrom",
    "Wolin",
    "Wolka",
    "Wolow",
    "Wolsztyn",
    "Wozniki",
    "Wreczyca Wielka",
    "Wronki",
    "Wrzesnia",
    "Wrzosowa",
    "Wrzosowka",
    "Wschowa",
    "Wylatowo",
    "Wymiarki",
    "Wyrzysk",
    "Wysogotowo",
    "Wysoka",
    "Wysoka Strzyzowska",
    "Wysokie Mazowieckie",
    "Wystep",
    "Wyszogrod",
    "Zabia Wola",
    "Zabierzow Bochenski",
    "Zablocie",
    "Zabno",
    "Zabor",
    "Zabrowo",
    "Zabrze",
    "Zabrzeg",
    "Zaczernie",
    "Zagnansk",
    "Zagorow",
    "Zagorzyce",
    "Zagosciniec",
    "Zagrodno",
    "Zakopane",
    "Zalakowo",
    "Zalasewo",
    "Zalesie",
    "Zaleszany",
    "Zalewo",
    "Zalubice Nowe",
    "Zalubice Stare",
    "Zaluski",
    "Zaniemysl",
    "Zaparcin",
    "Zarow",
    "Zarowka",
    "Zarszyn",
    "Zary",
    "Zator",
    "Zawada",
    "Zawada",
    "Zawady",
    "Zawadzkie",
    "Zawidow",
    "Zawiercie",
    "Zawoja",
    "Zawonia",
    "Zbaszyn",
    "Zbaszynek",
    "Zbiczno",
    "Zblewo",
    "Zbroslawice",
    "Zdunska Wola",
    "Zduny",
    "Zduny",
    "Zdzieszowice",
    "Zebowice",
    "Zebrzydowice",
    "Zegrze Pomorskie",
    "Zelazkow",
    "Zelow",
    "Zembrzyce",
    "Zerkow",
    "Zernica",
    "Zerniki",
    "Zgierz",
    "Zglobice",
    "Zglobien",
    "Zgorsko",
    "Zgorzala",
    "Zgorzelec",
    "Ziebice",
    "Zielona",
    "Zielone",
    "Zielonka",
    "Zielonki",
    "Zielonki-Wies",
    "Zlocieniec",
    "Zloczew",
    "Zlotow",
    "Zloty Stok",
    "Zmigrod",
    "Znin",
    "Zofia",
    "Zorawia",
    "Zorawina",
    "Zosin",
    "Zrecin",
    "Zukowo",
    "Zurawica",
    "Zwolen",
    "Zyrakow"
    ];

    /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
    autocomplete(document.getElementById("myInput"), countries);

    //Get the button:
    mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
}

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}