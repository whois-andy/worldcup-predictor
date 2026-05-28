import React, { useState, useRef, useEffect } from "react";

// ─── FLAG CDN ────────────────────────────────────────────────────────────────
const FLAG_CODES = {
  // Group A
  "Mexico":"mx","South Africa":"za","South Korea":"kr","Czechia":"cz",
  // Group B
  "Canada":"ca","Bosnia-Herzegovina":"ba","Qatar":"qa","Switzerland":"ch",
  // Group C
  "Brazil":"br","Haiti":"ht","Morocco":"ma","Scotland":"gb-sct",
  // Group D
  "USA":"us","Paraguay":"py","Australia":"au","Türkiye":"tr",
  // Group E
  "Germany":"de","Curaçao":"cw","Ivory Coast":"ci","Ecuador":"ec",
  // Group F
  "Netherlands":"nl","Japan":"jp","Sweden":"se","Tunisia":"tn",
  // Group G
  "Belgium":"be","Egypt":"eg","Iran":"ir","New Zealand":"nz",
  // Group H
  "Spain":"es","Cape Verde":"cv","Saudi Arabia":"sa","Uruguay":"uy",
  // Group I
  "France":"fr","Iraq":"iq","Norway":"no","Senegal":"sn",
  // Group J
  "Argentina":"ar","Algeria":"dz","Austria":"at","Jordan":"jo",
  // Group K
  "Portugal":"pt","DR Congo":"cd","Uzbekistan":"uz","Colombia":"co",
  // Group L
  "England":"gb-eng","Croatia":"hr","Ghana":"gh","Panama":"pa",
};

function getCode(raw) {
  const name = raw.replace(/^[\p{Emoji_Presentation}\p{Emoji}\s]+/u,"").trim();
  return FLAG_CODES[name] || "un";
}
function teamName(raw) {
  return raw.replace(/^[\p{Emoji_Presentation}\p{Emoji}\s]+/u,"").trim();
}

// ── Flag emoji map — works on every device, no network needed ────────────────
const FLAG_EMOJI = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czechia":"🇨🇿",
  "Canada":"🇨🇦","Bosnia-Herzegovina":"🇧🇦","Qatar":"🇶🇦","Switzerland":"🇨🇭",
  "Brazil":"🇧🇷","Haiti":"🇭🇹","Morocco":"🇲🇦","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "USA":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Türkiye":"🇹🇷",
  "Germany":"🇩🇪","Curaçao":"🇨🇼","Ivory Coast":"🇨🇮","Ecuador":"🇪🇨",
  "Netherlands":"🇳🇱","Japan":"🇯🇵","Sweden":"🇸🇪","Tunisia":"🇹🇳",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","Iran":"🇮🇷","New Zealand":"🇳🇿",
  "Spain":"🇪🇸","Cape Verde":"🇨🇻","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "France":"🇫🇷","Iraq":"🇮🇶","Norway":"🇳🇴","Senegal":"🇸🇳",
  "Argentina":"🇦🇷","Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴",
  "Portugal":"🇵🇹","DR Congo":"🇨🇩","Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
  "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦",
};

function Flag({ team, size=24, radius=3 }) {
  const name = teamName(team);
  const code = getCode(team);
  const emoji = FLAG_EMOJI[name];
  const [imgOk, setImgOk] = React.useState(true);

  // Always try the real flag image first (looks best on desktop).
  // If it fails (mobile/CORS/network), fall back to emoji — works everywhere.
  if(!imgOk || !emoji){
    // Emoji flag — renders natively on every phone and tablet
    return(
      <span style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        width:size, height:Math.round(size*0.67),
        borderRadius:radius,
        fontSize:Math.round(size*0.85),
        lineHeight:1,
        flexShrink:0,
        verticalAlign:"middle",
        overflow:"hidden",
      }}>
        {emoji || "🏳️"}
      </span>
    );
  }

  return(
    <img
      src={`https://flagcdn.com/w${Math.max(size*2,48)}/${code}.png`}
      alt={name}
      style={{
        width:size, height:Math.round(size*0.67),
        borderRadius:radius, objectFit:"cover",
        flexShrink:0, display:"inline-block",
        boxShadow:"0 1px 4px rgba(0,0,0,0.4)",
        verticalAlign:"middle",
      }}
      onError={()=>setImgOk(false)}
    />
  );
}

// ─── REAL WC 2026 GROUPS ─────────────────────────────────────────────────────
const WC_GROUPS = {
  A: { teams: ["Mexico","South Africa","South Korea","Czechia"] },
  B: { teams: ["Canada","Bosnia-Herzegovina","Qatar","Switzerland"] },
  C: { teams: ["Brazil","Haiti","Morocco","Scotland"] },
  D: { teams: ["USA","Paraguay","Australia","Türkiye"] },
  E: { teams: ["Germany","Curaçao","Ivory Coast","Ecuador"] },
  F: { teams: ["Netherlands","Japan","Sweden","Tunisia"] },
  G: { teams: ["Belgium","Egypt","Iran","New Zealand"] },
  H: { teams: ["Spain","Cape Verde","Saudi Arabia","Uruguay"] },
  I: { teams: ["France","Iraq","Norway","Senegal"] },
  J: { teams: ["Argentina","Algeria","Austria","Jordan"] },
  K: { teams: ["Portugal","DR Congo","Uzbekistan","Colombia"] },
  L: { teams: ["England","Croatia","Ghana","Panama"] },
};
const ALL_TEAMS = Object.values(WC_GROUPS).flatMap(g=>g.teams);

// ─── SQUADS ──────────────────────────────────────────────────────────────────
// ? = inclusion uncertain / fitness doubt
const SQUADS = {
  // ── GROUP A ──
  "Mexico": {
    coach:"Javier Aguirre", formation:"4-2-3-1", ranking:16,
    gk:["Raúl Rangel","Guillermo Ochoa","Carlos Acevedo"],
    def:["Julian Araujo","Johan Vasquez","Cesar Montes","Jesus Gallardo","Jorge Sanchez","Israel Reyes","Edson Alvarez"],
    mid:["Alvaro Fidalgo","Orbelin Pineda","Obed Vargas","Roberto Alvarado","Luis Chavez","Efrain Alvarez"],
    fwd:["Raúl Jiménez","Santiago Gimenez","Cesar Huerta","Julian Quiñones","Alexis Vega"],
    injured:[], uncertain:["Guillermo Ochoa (form/age - 41)"],
  },
  "South Africa": {
    coach:"Hugo Broos", formation:"4-4-2", ranking:67,
    gk:["Ronwen Williams","Veli Mothwa","Bruce Bvuma"],
    def:["Siyanda Xulu","Terrence Mashego","Teboho Mokoena","Rushine De Reuck","Thibang Phete"],
    mid:["Bongani Zungu","Ethan Nkosi","Themba Zwane","Keagan Dolly","Lyle Foster"],
    fwd:["Evidence Makgopa","Percy Tau","Thembinkosi Lorch","Bradley Cross","Nestory Irankunda"],
    injured:[], uncertain:["Keagan Dolly (ankle)?","Thembinkosi Lorch (fitness)?"],
  },
  "South Korea": {
    coach:"Hong Myung-bo", formation:"4-3-3", ranking:22,
    gk:["Jo Hyeon-woo","Kim Seung-gyu","Song Bum-keun"],
    def:["Kim Min-jae","Seol Young-woo","Kim Moon-hwan","Jens Castrop","Lee Tae-seok","Park Jin-seob","Kim Tae-hyeon","Lee Han-beom","Lee Ki-hyuk","Cho Yu-min"],
    mid:["Lee Kang-in","Hwang In-beom","Hwang Hee-chan","Lee Jae-sung","Paik Seung-ho","Yang Hyun-jun","Kim Jin-gyu","Lee Dong-gyeong","Bae Jun-ho","Eom Ji-sung"],
    fwd:["Son Heung-min","Cho Gue-sung","Oh Hyeon-gyu"],
    injured:[], uncertain:[],
  },
  "Czechia": {
    coach:"Miroslav Koubek", formation:"4-2-3-1", ranking:36,
    gk:["Matej Kovar","Jindrich Stanek","Antonin Kinsky"],
    def:["Vladimir Coufal","David Jurasek","David Doudera","Tomas Holes","Robin Hranac","Martin Vitik","David Zima"],
    mid:["Tomas Soucek","Lukas Provod","Pavel Sulc","Adam Karabec","Michal Sadilek","Pavel Bucha"],
    fwd:["Patrik Schick","Adam Hlozek","Matej Vydra","Jan Kuchta","Tomas Chory"],
    injured:[], uncertain:["Patrik Schick (knee comeback)?"],
  },
  // ── GROUP B ──
  "Canada": {
    coach:"Jesse Marsch", formation:"4-3-3", ranking:43,
    gk:["Maxime Crepeau","Dayne St. Clair","James Pantemis"],
    def:["Alphonso Davies","Alistair Johnston","Kamal Miller","Derek Cornelius","Richie Laryea","Scott Kennedy"],
    mid:["Stephen Eustaquio","Jonathan Osorio","Samuel Piette","Ismaël Koné","Mark-Anthony Kaye"],
    fwd:["Jonathan David","Cyle Larin","Liam Millar","Lucas Cavallini","Tajon Buchanan"],
    injured:[], uncertain:["Alphonso Davies (form)?","Tajon Buchanan (fitness)?"],
  },
  "Bosnia-Herzegovina": {
    coach:"Sergej Barbarez", formation:"4-2-3-1", ranking:55,
    gk:["Nikola Vasilj","Martin Zlomislic","Osman Hadzikic"],
    def:["Sead Kolasinac","Dennis Hadzikadunic","Amar Dedic","Nikola Katic","Tarik Muharemovic","Nihad Mujakic","Stjepan Radeljic","Nidal Celik"],
    mid:["Amir Hadziahmetovic","Benjamin Tahirovic","Armin Gigovic","Dzenis Burnic","Ivan Basic","Esmir Bajraktarevic","Amar Memic","Ivan Sunjic","Kerim Alajbegovic","Ermin Mahmic"],
    fwd:["Edin Dzeko","Ermedin Demirovic","Samed Bazdar","Haris Tabakovic","Jovo Lukic"],
    injured:[], uncertain:["Edin Dzeko (age 40 - fitness)?"],
  },
  "Qatar": {
    coach:"Julen Lopetegui", formation:"4-3-3", ranking:37,
    gk:["Meshaal Barsham","Salah Zakaria","Shehab Elleithy"],
    def:["Boualem Khoukhi","Pedro Miguel","Sultan Al Brake","Bassam Al-Rawi","Lucas Mendes","Ayoub Al-Alawi","Tarek Salman"],
    mid:["Karim Boudiaf","Abdulaziz Hatem","Mohammed Mannai","Ahmed Fathi","Assim Madibo","Homam Al-Amin","Jassim Gaber"],
    fwd:["Akram Afif","Almoez Ali","Mohammed Muntari","Hassan Al-Haydos","Edmilson Junior","Tahsin Mohammed"],
    injured:[], uncertain:[],
  },
  "Switzerland": {
    coach:"Murat Yakin", formation:"4-3-3", ranking:13,
    gk:["Gregor Kobel","Yvon Mvogo","Marvin Keller"],
    def:["Manuel Akanji","Nico Elvedi","Ricardo Rodriguez","Silvan Widmer","Miro Muheim","Aurele Amenda","Eray Comert","Luca Jaquez"],
    mid:["Granit Xhaka","Remo Freuler","Denis Zakaria","Ardon Jashari","Djibril Sow","Michel Aebischer","Fabian Rieder","Christian Fassnacht","Ruben Vargas","Johan Manzambi"],
    fwd:["Breel Embolo","Noah Okafor","Dan Ndoye","Zeki Amdouni","Cedric Itten"],
    injured:[], uncertain:[],
  },
  // ── GROUP C ──
  "Brazil": {
    coach:"Carlo Ancelotti", formation:"4-2-3-1", ranking:5,
    gk:["Alisson","Ederson","Weverton"],
    def:["Marquinhos","Danilo","Alex Sandro","Gabriel Magalhaes","Bremer","Wesley","Roger Ibanez","Douglas Santos","Leo Pereira"],
    mid:["Casemiro","Lucas Paquetá","Bruno Guimaraes","Fabinho","Danilo Santos"],
    fwd:["Neymar","Vinicius Jr","Raphinha","Gabriel Martinelli","Matheus Cunha","Endrick","Luiz Henrique","Igor Thiago","Rayan"],
    injured:[], uncertain:["Neymar (long injury return - fitness)?","Bremer (ACL return)?"],
  },
  "Haiti": {
    coach:"Marc Collat", formation:"4-4-2", ranking:83,
    gk:["Johny Placide","Alexandre Pierre","Josue Duverger"],
    def:["Ricardo Ade","Carlens Arcus","Jean-Kevin Duverne","Duke Lacroix","Wilguens Paugain","Hannes Delcroix","Keeto Thermoncy"],
    mid:["Leverton Pierre","Danley Jean Jacques","Carl Sainte","Jean-Ricner Bellegarde","Woodensky Pierre","Dominique Simon"],
    fwd:["Duckens Nazon","Frantzdy Pierrot","Derrick Etienne Jr","Wilson Isidor","Ruben Providence","Josue Casimir","Lenny Joseph"],
    injured:[], uncertain:[],
  },
  "Morocco": {
    coach:"Walid Regragui", formation:"4-3-3", ranking:14,
    gk:["Bono","Munir Mohamedi","Mehdi Zniti"],
    def:["Achraf Hakimi","Noussair Mazraoui","Romain Saiss","Jawad El Yamiq","Nayef Aguerd","Yahia Attiyat Allah","Badr Benoun"],
    mid:["Sofyan Amrabat","Azzedine Ounahi","Selim Amallah","Bilal El Khannouss","Amine Harit","Abde Ezzalzouli"],
    fwd:["Hakim Ziyech","Youssef En-Nesyri","Ayoub El Kaabi","Anass Zaroury","Soufiane Rahimi"],
    injured:[], uncertain:["Hakim Ziyech (fitness/club situation)?"],
  },
  "Scotland": {
    coach:"Steve Clarke", formation:"4-3-3", ranking:35,
    gk:["Angus Gunn","Craig Gordon","Liam Kelly"],
    def:["Andy Robertson","Kieran Tierney","Anthony Ralston","John Souttar","Scott McKenna","Jack Hendry","Aaron Hickey","Nathan Patterson","Grant Hanley","Dominic Hyam"],
    mid:["Scott McTominay","Billy Gilmour","John McGinn","Kenny McLean","Lewis Ferguson","Ryan Christie","Findlay Curtis","Ben Doak"],
    fwd:["Lawrence Shankland","George Hirst","Che Adams","Ross Stewart","Lyndon Dykes"],
    injured:[], uncertain:["Craig Gordon (age 43 - fitness)?","Kieran Tierney (injury history)?"],
  },
  // ── GROUP D ──
  "USA": {
    coach:"Mauricio Pochettino", formation:"4-3-3", ranking:11,
    gk:["Matt Turner","Chris Brady","Matt Freese"],
    def:["Sergiño Dest","Chris Richards","Antonee Robinson","Auston Trusty","Miles Robinson","Tim Ream","Alex Freeman","Mark McKenzie","Joe Scally","Max Arfsten"],
    mid:["Tyler Adams","Weston McKennie","Christian Pulisic","Sebastian Berhalter","Cristian Roldan","Malik Tillman","Brenden Aaronson","Tim Weah","Alex Zendejas"],
    fwd:["Gio Reyna","Ricardo Pepi","Folarin Balogun","Haji Wright","Ollie Watkins"],
    injured:[], uncertain:["Gio Reyna (injury history)?"],
  },
  "Paraguay": {
    coach:"Gustavo Alfaro", formation:"4-4-2", ranking:60,
    gk:["Antony Silva","Alfredo Aguilar","Santiago Coronel"],
    def:["Fabian Balbuena","Junior Alonso","Omar Alderete","Mateo Gamarra","Robert Piris Da Motta","Diego Viera"],
    mid:["Miguel Almiron","Adam Bareiro","Andres Cubas","Diego Gomez","Angel Cardozo Lucena","Diego Lainez"],
    fwd:["Antonio Sanabria","Julio Enciso","Jorge Morel","Roberto Fernandez","Alex Arce"],
    injured:[], uncertain:["Julio Enciso (fitness)?"],
  },
  "Australia": {
    coach:"Tony Popovic", formation:"4-3-3", ranking:23,
    gk:["Mathew Ryan","Joe Gauci","Danny Vukovic"],
    def:["Harry Souttar","Milos Degenek","Aziz Behich","Bailey Wright","Nathaniel Atkinson","Thomas Deng"],
    mid:["Jackson Irvine","Aaron Mooy","Riley McGree","Keanu Baccus","Massimo Luongo","Connor Metcalfe"],
    fwd:["Mathew Leckie","Martin Boyle","Marco Tilio","Mitchell Duke","Nestory Irankunda","Brandon Borrello"],
    injured:[], uncertain:["Aaron Mooy (age/fitness)?"],
  },
  "Türkiye": {
    coach:"Vincenzo Montella", formation:"4-4-2", ranking:31,
    gk:["Mert Gunok","Altay Bayindir","Ugurcan Cakir"],
    def:["Zeki Celik","Merih Demiral","Samet Akaydin","Ferdi Kadioglu","Mert Muldur","Kaan Ayhan","Abdulkerim Bardakci"],
    mid:["Hakan Calhanoglu","Salih Ozcan","Orkun Kokcu","Arda Guler","Ismail Yuksek","Yunus Akgun"],
    fwd:["Kenan Yildiz","Baris Alper Yilmaz","Cenk Tosun","Irfan Can Kahveci","Yusuf Yazici"],
    injured:[], uncertain:["Arda Guler (fitness)?"],
  },
  // ── GROUP E ──
  "Germany": {
    coach:"Julian Nagelsmann", formation:"4-2-3-1", ranking:12,
    gk:["Manuel Neuer","Oliver Baumann","Alexander Nubel"],
    def:["Antonio Rudiger","Jonathan Tah","Nico Schlotterbeck","Nathaniel Brown","David Raum","Malick Thiaw","Waldemar Anton","Pascal Gross"],
    mid:["Joshua Kimmich","Leon Goretzka","Lennart Karl","Jamal Musiala","Florian Wirtz","Jamie Leweling","Aleksandar Pavlovic","Maximilian Beier","Nadiem Amiri","Leroy Sane","Angelo Stiller","Felix Nmecha"],
    fwd:["Kai Havertz","Denis Undav","Nick Woltemeade"],
    injured:[], uncertain:[],
  },
  "Curaçao": {
    coach:"Dick Advocaat", formation:"4-3-3", ranking:87,
    gk:["Eloy Room","Trevor Doornbusch","Tyrick Bodak"],
    def:["Jurien Gaari","Roshon van Eijma","Sherel Floranus","Joshua Brenet","Shurandy Sambo","Armando Obispo","Riechedly Bazoer","Deveron Fonville"],
    mid:["Leandro Bacuna","Juninho Bacuna","Godfried Roemeratoe","Kevin Felida","Livano Comenencia","Arjany Martha","Tyrese Noslin"],
    fwd:["Kenji Gorre","Brandley Kuwas","Gervane Kastaneer","Jeremy Antonisse","Jearl Margaritha","Jurgen Locadia","Sontje Hansen","Tahith Chong"],
    injured:[], uncertain:[],
  },
  "Ivory Coast": {
    coach:"Emerse Faé", formation:"4-3-3", ranking:27,
    gk:["Yahia Fofana","Alban Lafont","Mohamed Kone"],
    def:["Ghislain Konan","Odilon Kossounou","Wilfried Singo","Evan Ndicka","Emmanuel Agbadou","Guela Doue","Ousmane Diomande","Clement Akpa"],
    mid:["Franck Kessie","Jean Michael Seri","Ibrahim Sangare","Seko Fofana","Christ Inao Oulai","Parfait Guiagon"],
    fwd:["Nicolas Pepe","Oumar Diakite","Simon Adingra","Evann Guessand","Amad Diallo","Ange Yoan-Bonny","Elye Wahi"],
    injured:[], uncertain:["Nicolas Pepe (club situation)?"],
  },
  "Ecuador": {
    coach:"Sebastian Beccacece", formation:"4-2-3-1", ranking:42,
    gk:["Alexander Dominguez","Hernan Galindez","Moises Ramirez"],
    def:["Piero Hincapie","Felix Torres","William Pacho","Pervis Estupinan","Xavier Arreaga","Robert Arboleda"],
    mid:["Moises Caicedo","Jeremy Sarmiento","Jhegson Mendez","Romario Ibarra","Jose Cifuentes","Piero Hincapie"],
    fwd:["Enner Valencia","Leonardo Campana","Angel Mena","Kevin Rodriguez","Djorkaeff Reasco"],
    injured:[], uncertain:["Enner Valencia (age 36)?"],
  },
  // ── GROUP F ──
  "Netherlands": {
    coach:"Ronald Koeman", formation:"4-3-3", ranking:7,
    gk:["Bart Verbruggen","Mark Flekken","Remko Pasveer"],
    def:["Virgil van Dijk","Denzel Dumfries","Stefan de Vrij","Nathan Ake","Daley Blind","Jorrel Hato","Devyne Rensch"],
    mid:["Frenkie de Jong","Tijjani Reijnders","Jerdy Schouten","Xavi Simons","Teun Koopmeiners","Ryan Gravenberch"],
    fwd:["Cody Gakpo","Donyell Malen","Wout Weghorst","Brian Brobbey","Noa Lang","Steven Bergwijn"],
    injured:[], uncertain:["Frenkie de Jong (injury return)?"],
  },
  "Japan": {
    coach:"Hajime Moriyasu", formation:"4-2-3-1", ranking:18,
    gk:["Zion Suzuki","Keisuke Osako","Tomoki Hayakawa"],
    def:["Yuto Nagatomo","Takehiro Tomiyasu","Ko Itakura","Shogo Taniguchi","Hiroki Ito","Yukinari Sugawara","Ayumu Seko","Tsuyoshi Watanabe","Junnosuke Suzuki"],
    mid:["Wataru Endo","Junya Ito","Ritsu Doan","Daichi Kamada","Takefusa Kubo","Ao Tanaka","Keito Nakamura","Kaishu Sano"],
    fwd:["Ayase Ueda","Daizen Maeda","Koki Ogawa","Yuito Suzuki","Keisuke Goto","Kento Shiogai"],
    injured:[], uncertain:[],
  },
  "Sweden": {
    coach:"Graham Potter", formation:"4-3-3", ranking:24,
    gk:["Viktor Johansson","Kristoffer Nordfeldt","Jacob Widell Zetterstrom"],
    def:["Victor Lindelof","Isak Hien","Gabriel Gudmundsson","Carl Starfelt","Emil Holm","Hjalmar Ekdal","Daniel Svensson","Gustaf Lagerbielke","Eric Smith","Elliot Stroud"],
    mid:["Mattias Svanberg","Jesper Karlstrom","Yasin Ayari","Lucas Bergvall","Besfort Zeneli"],
    fwd:["Alexander Isak","Viktor Gyokeres","Ken Sema","Anthony Elanga","Benjamin Nygren","Alexander Bernhardsson","Gustaf Nilsson","Taha Ali"],
    injured:[], uncertain:[],
  },
  "Tunisia": {
    coach:"Sabri Lamouchi", formation:"4-3-3", ranking:32,
    gk:["Aymen Dahmen","Sabri Ben Hessen","Mouhib Chamakh"],
    def:["Montassar Talbi","Dylan Bronn","Ali Abdi","Yan Valery","Mohamed Amine Ben Hamida","Moutaz Neffati","Omar Rekik"],
    mid:["Ellyes Shkiri","Hannibal Mejbri","Anis Ben Slimane","Mortadha Ben Ouanes","Ismael Gharbi","Hadj Mahmoud","Rani Khedira"],
    fwd:["Elias Achouri","Firas Chaouat","Hazem Mastouri","Elias Saad","Khalil Ayari","Rayan Elloumi"],
    injured:[], uncertain:[],
  },
  // ── GROUP G ──
  "Belgium": {
    coach:"Rudi Garcia", formation:"4-3-3", ranking:3,
    gk:["Thibaut Courtois","Senne Lammens","Mike Penders"],
    def:["Thomas Meunier","Timothy Castagne","Arthur Theate","Zeno Debast","Maxim De Cuyper","Brandon Mechele","Koni De Winter","Joaquin Seys","Nathan Ngoy"],
    mid:["Axel Witsel","Kevin De Bruyne","Youri Tielemans","Hans Vanaken","Amadou Onana","Nicolas Raskin"],
    fwd:["Romelu Lukaku","Leandro Trossard","Jeremy Doku","Dodi Lukebakio","Charles De Ketelaere","Alexis Saelemaekers","Diego Moreira"],
    injured:[], uncertain:["Kevin De Bruyne (age/fitness 34)?"],
  },
  "Egypt": {
    coach:"Hossam Hassan", formation:"4-2-3-1", ranking:38,
    gk:["Mohamed El-Shenawy","Mostafa Shobier","Ibrahim Adel"],
    def:["Ahmed Hegazy","Omar Kamal","Mohamed Hamdy","Mahmoud Hamada","Akram Tawfik","Zizo","Mohamed Abdel-Monem"],
    mid:["Tarek Hamed","Emam Ashour","Ahmed Sayed Zizo","Mohamed Elneny","Hamdi Fathy"],
    fwd:["Mohamed Salah","Mostafa Mohamed","Omar Marmoush","Mahmoud Trezeguet","Amr Adel","Ramadan Sobhi"],
    injured:[], uncertain:["Mohamed Elneny (fitness)?"],
  },
  "Iran": {
    coach:"Amir Ghalenoei", formation:"4-1-4-1", ranking:20,
    gk:["Alireza Beiranvand","Payam Niazmand","Hossein Hosseini"],
    def:["Milad Mohammadi","Ehsan Hajsafi","Rouzbeh Cheshmi","Majid Hosseini","Shoja Khalilzadeh","Sadegh Moharrami","Morteza Pouraliganji"],
    mid:["Saeed Ezatolahi","Alireza Jahanbakhsh","Ali Gholizadeh","Mehdi Torabi","Ahmad Noorollahi","Vahid Amiri"],
    fwd:["Mehdi Taremi","Sardar Azmoun","Allahyar Sayyadmanesh","Karim Ansarifard","Reza Asadi"],
    injured:[], uncertain:["Sardar Azmoun (fitness)?"],
  },
  "New Zealand": {
    coach:"Darren Bazeley", formation:"4-4-2", ranking:101,
    gk:["Oliver Sail","Stefan Marinovic","Max Crocombe"],
    def:["Michael Boxall","Liberato Cacace","Winston Reid","Ryan Thomas","Elijah Just","Tim Payne"],
    mid:["Clayton Lewis","Andre de Jong","Joe Bell","Marko Stamenic","Louis Fenton","Ben Old"],
    fwd:["Chris Wood","Hamish Watson","Matthew Garbett","Callan Elliot","Myer Bevan"],
    injured:[], uncertain:["Winston Reid (age 36 - fitness)?"],
  },
  // ── GROUP H ──
  "Spain": {
    coach:"Luis de la Fuente", formation:"4-3-3", ranking:1,
    gk:["Unai Simon","David Raya","Alex Remiro"],
    def:["Daniel Carvajal","Robin Le Normand","Aymeric Laporte","Alejandro Grimaldo","Dani Vivian","Jesus Navas","Toni Kroos"],
    mid:["Rodri","Pedri","Fabian Ruiz","Martin Zubimendi","Mikel Merino","Alex Baena","Gavi"],
    fwd:["Lamine Yamal","Nico Williams","Dani Olmo","Mikel Oyarzabal","Ferran Torres","Yeremy Pino"],
    injured:[], uncertain:["Daniel Carvajal (ACL return)?","Gavi (fitness)?","Rodri (injury comeback)?"],
  },
  "Cape Verde": {
    coach:"Bubista", formation:"4-4-2", ranking:77,
    gk:["Vozinha","Marcio da Rosa","Carlos Santos"],
    def:["Steven Moreira","Wagner Pina","Logan Costa","Roberto Lopes","Stopira","Sidny Cabral"],
    mid:["Jamiro Monteiro","Telmo Arcanjo","Yannick Semedo","Deroy Duarte","Laros Duarte","Kevin Pina"],
    fwd:["Garry Rodrigues","Ryan Mendes","Dygo","Julio Tavares","Igor Tavares","Jovane Cabral"],
    injured:[], uncertain:[],
  },
  "Saudi Arabia": {
    coach:"Herve Renard", formation:"4-3-3", ranking:61,
    gk:["Mohammed Al-Owais","Nawaf Al-Aqidi","Fawaz Al-Qarni"],
    def:["Saud Abdulhamid","Sultan Al-Ghanam","Ali Al-Bulaihi","Yasir Al-Shahrani","Abdullah Madu","Hassan Tambakti"],
    mid:["Salman Al-Faraj","Sami Al-Najei","Abdulellah Al-Malki","Mohammed Al-Qasim","Abdullah Radif"],
    fwd:["Firas Al-Buraikan","Saleh Al-Shehri","Salem Al-Dawsari","Mohammed Kanno","Abdullah Al-Hamdan","Fahad Al-Muwallad"],
    injured:[], uncertain:["Yasir Al-Shahrani (injury)?"],
  },
  "Uruguay": {
    coach:"Marcelo Bielsa", formation:"4-3-3", ranking:15,
    gk:["Sebastian Sosa","Fernando Muslera","Mathias Brignoli"],
    def:["Ronald Araujo","Jose Maria Gimenez","Diego Godin","Nahitan Nandez","Martin Caceres","Matias Vina","Sebastian Caceres"],
    mid:["Federico Valverde","Rodrigo Bentancur","Facundo Pellistri","Nicolas De La Cruz","Giorgian De Arrascaeta","Matias Vecino","Ignacio Ramirez"],
    fwd:["Darwin Nunez","Luis Suarez","Edinson Cavani","Facundo Torres","Maximiliano Gomez"],
    injured:[], uncertain:["Luis Suarez (age 39)?","Edinson Cavani (age 38)?","Diego Godin (age 38)?","Rodrigo Bentancur (ban return)?"],
  },
  // ── GROUP I ──
  "France": {
    coach:"Didier Deschamps", formation:"4-3-3", ranking:2,
    gk:["Mike Maignan","Brice Samba","Robin Risser"],
    def:["Lucas Digne","Jules Kounde","Theo Hernandez","Lucas Hernandez","Dayot Upamecano","William Saliba","Ibrahima Konate","Malo Gusto","Maxence Lacroix"],
    mid:["N'Golo Kante","Adrien Rabiot","Aurelien Tchouameni","Manu Kone","Warren Zaire-Emery"],
    fwd:["Kylian Mbappe","Ousmane Dembele","Marcus Thuram","Bradley Barcola","Michael Olise","Maghnes Akliouche","Desire Doue","Rayan Cherki","Jean-Philippe Mateta"],
    injured:[], uncertain:["Lucas Hernandez (injury history)?"],
  },
  "Iraq": {
    coach:"Jesus Casas", formation:"4-2-3-1", ranking:54,
    gk:["Jalal Hassan","Dhurgham Ismail","Mohammed Hamid"],
    def:["Ali Adnan","Ahmed Ibrahim","Rebin Sulaka","Mustafa Mohammed","Amjad Atwan"],
    mid:["Safaa Hadi","Suad Natiq","Aymen Hussein","Ali Jasim","Bashar Resan","Ahmed Yasin"],
    fwd:["Mohanad Ali","Aymen Husain","Martyn Waghorn","Amir Al-Ammari","Donyell Malen"],
    injured:[], uncertain:[],
  },
  "Norway": {
    coach:"Stale Solbakken", formation:"4-3-3", ranking:25,
    gk:["Orjan Nyland","Ørjan Nyland","David Raya"],
    def:["Kristoffer Ajer","Leo Ostigard","Andreas Hanche-Olsen","Fredrik Andre Bjorkan","Julian Ryerson","Birger Meling"],
    mid:["Martin Odegaard","Sander Berge","Mathias Normann","Patrick Berg","Fredrik Aursnes","Kristian Thorvaldsen"],
    fwd:["Erling Haaland","Alexander Sorloth","Joshua King","Mohamed Elyounoussi","Antonio Nusa","Jens Petter Hauge"],
    injured:[], uncertain:["Martin Odegaard (fitness)?"],
  },
  "Senegal": {
    coach:"Aliou Cisse", formation:"4-3-3", ranking:19,
    gk:["Edouard Mendy","Alfred Gomis","Seny Dieng"],
    def:["Kalidou Koulibaly","Abdou Diallo","Ismail Jakobs","El-Hadji Malick Diouf","Moussa Niakhaté","Mamadou Sarr"],
    mid:["Idrissa Gueye","Pape Matar Sarr","Pape Gueye","Lamine Camara","Pathé Ciss","Habib Diarra","Bara Ndiaye"],
    fwd:["Sadio Mane","Ismaila Sarr","Boulaye Dia","Nicolas Jackson","Krépin Diatta"],
    injured:[], uncertain:["Sadio Mane (form)?","Edouard Mendy (fitness)?"],
  },
  // ── GROUP J ──
  "Argentina": {
    coach:"Lionel Scaloni", formation:"4-3-3", ranking:1,
    gk:["Emiliano Martinez","Franco Armani","Geronimo Rulli"],
    def:["Nahuel Molina","Lisandro Martinez","Cristian Romero","Nicolas Otamendi","Nicolas Tagliafico","German Pezzella","Facundo Medina"],
    mid:["Rodrigo De Paul","Enzo Fernandez","Alexis Mac Allister","Leandro Paredes","Exequiel Palacios"],
    fwd:["Lionel Messi","Lautaro Martinez","Julian Alvarez","Angel Di Maria","Paulo Dybala","Alejandro Garnacho","Thiago Almada"],
    injured:[], uncertain:["Lionel Messi (participation unconfirmed — aged 38)?","Angel Di Maria (retirement uncertainty)?"],
  },
  "Algeria": {
    coach:"Vladimir Petkovic", formation:"4-2-3-1", ranking:46,
    gk:["Rais M'Bolhi","Adi Ben Tahir","Alexandre Oukidja"],
    def:["Ramy Bensebaini","Djamel Benlamri","Aissa Mandi","Mohamed Amine Tougai","Adam Ounas","Hicham Boudaoui"],
    mid:["Said Benrahma","Samy Mmaee","Mehdi Zerkane","Youcef Atal","Amir Sayoud","Ryad Mahrez"],
    fwd:["Islam Slimani","Anis Harit","Billal Brahimi","Andy Delort","Baghdad Bounedjah"],
    injured:[], uncertain:["Ryad Mahrez (fitness/club)?"],
  },
  "Austria": {
    coach:"Ralf Rangnick", formation:"4-2-3-1", ranking:28,
    gk:["Patrick Pentz","Daniel Bachmann","Heinz Lindner"],
    def:["Philipp Mwene","Maximilian Wober","Kevin Danso","Stefan Posch","Phillipp Lienhart","David Alaba"],
    mid:["Florian Grillitsch","Konrad Laimer","Marcel Sabitzer","Christoph Baumgartner","Patrick Wimmer","Nicolas Seiwald"],
    fwd:["Marko Arnautovic","Michael Gregoritsch","Xaver Schlager","Aleksander Dragovic","Sasa Kalajdzic"],
    injured:[], uncertain:["David Alaba (ACL return)?","Marko Arnautovic (fitness/age)?"],
  },
  "Jordan": {
    coach:"Jamal Abu Abed", formation:"4-4-2", ranking:71,
    gk:["Yazan Arabiat","Mohammad Abu Hatoum","Amer Shafi"],
    def:["Khaled Al-Ababneh","Mosab Al-Bawab","Baher Madanat","Aws Qasem","Nour Al-Rawabdeh"],
    mid:["Ahmad Dababneh","Musa Al-Taamari","Mohammad Al-Shabatat","Yazan Al-Naimat","Oday Dabbagh"],
    fwd:["Baha Faisal","Qusai Al-Bawab","Qusai Mahmoud","Yazan Al-Arab","Ibrahim Obeidat"],
    injured:[], uncertain:[],
  },
  // ── GROUP K ──
  "Portugal": {
    coach:"Roberto Martinez", formation:"4-3-3", ranking:6,
    gk:["Diogo Costa","Jose Sa","Rui Patricio"],
    def:["Joao Cancelo","Ruben Dias","Pepe","Nuno Mendes","Antonio Silva","Goncalo Inacio","Diogo Dalot"],
    mid:["Bernardo Silva","Joao Neves","Vitinha","Bruno Fernandes","Joao Palinha","Matheus Nunes"],
    fwd:["Cristiano Ronaldo","Rafael Leao","Pedro Neto","Joao Felix","Goncalo Ramos","Diogo Jota","Francisco Trincao"],
    injured:[], uncertain:["Pepe (age 43 - fitness)?","Diogo Jota (fitness)?"],
  },
  "DR Congo": {
    coach:"Valdo", formation:"4-2-3-1", ranking:52,
    gk:["Joël Kiassumbua","Parfait Mandanda","Elia Meschak"],
    def:["Fiston Mayele","Marcel Tisserand","Chancel Mbemba","Nené Dorgeles","Cédric Bakambu"],
    mid:["Arthur Masuaku","Théo Bongonda","Paul-José Mpoku","Yoane Mwepu","Edo Kayembe","Mechack Jérôme"],
    fwd:["Silas Mvumpa","Yannick Bolasie","Cédric Bakambu","Leko Mvumpa","Fabrice Olinga"],
    injured:[], uncertain:[],
  },
  "Uzbekistan": {
    coach:"Srecko Katanec", formation:"4-3-3", ranking:66,
    gk:["Utkir Yusupov","Jahongir Shermatov","Eldor Shomurodov"],
    def:["Sanjar Tursunov","Jasurbek Yakhshiboev","Odil Ahmedov","Sherzod Nasirkulov","Khojimat Erkinov"],
    mid:["Jaloliddin Masharipov","Oston Urunov","Khurshid Tursunov","Sardor Rashidov","Dostonbek Khamdamov"],
    fwd:["Eldor Shomurodov","Behruz Toshmatov","Dostonbek Hamidov","Ilkhom Bakaev","Jasur Yakhshiboev"],
    injured:[], uncertain:[],
  },
  "Colombia": {
    coach:"Nestor Lorenzo", formation:"4-2-3-1", ranking:9,
    gk:["Camilo Vargas","David Ospina","Kevin Mier"],
    def:["Daniel Munoz","Davinson Sanchez","Carlos Cuesta","Johan Mojica","Stefan Medina","Yerry Mina"],
    mid:["Juan Cuadrado","Matheus Uribe","Jefferson Lerma","Jorge Carrascal","Jhon Arias","Wilmar Barrios"],
    fwd:["Luis Diaz","James Rodriguez","Rafael Santos Borre","Radamel Falcao","Jhon Cordoba","Duvan Zapata"],
    injured:[], uncertain:["David Ospina (age/fitness)?","Falcao (age 40)?","Duvan Zapata (ACL return)?","James Rodriguez (fitness)?"],
  },
  // ── GROUP L ──
  "England": {
    coach:"Thomas Tuchel", formation:"4-2-3-1", ranking:4,
    gk:["Jordan Pickford","Dean Henderson","James Trafford"],
    def:["John Stones","Marc Guehi","Reece James","Ezri Konsa","Dan Burn","Tino Livramento","Djed Spence","Nico O'Reilly","Jarell Quansah"],
    mid:["Declan Rice","Jude Bellingham","Eberechi Eze","Jordan Henderson","Kobbie Mainoo","Morgan Rogers","Elliot Anderson"],
    fwd:["Harry Kane","Bukayo Saka","Marcus Rashford","Ollie Watkins","Anthony Gordon","Noni Madueke","Ivan Toney"],
    injured:[], uncertain:["Phil Foden (NOT selected by Tuchel)","Cole Palmer (NOT selected by Tuchel)"],
  },
  "Croatia": {
    coach:"Zlatko Dalic", formation:"4-3-3", ranking:10,
    gk:["Dominik Livakovic","Dominik Kotarski","Ivor Pandur"],
    def:["Josko Gvardiol","Duje Caleta-Car","Josip Stanisic","Marin Pongracic","Martin Erlic","Luka Vuskovic"],
    mid:["Luka Modric","Mateo Kovacic","Mario Pasalic","Nikola Vlasic","Luka Sucic","Martin Baturina","Kristijan Jakic","Petar Sucic","Nikola Moro","Toni Fruk"],
    fwd:["Ivan Perisic","Andrej Kramaric","Ante Budimir","Marco Pasalic","Petar Musa","Igor Matanovic"],
    injured:[], uncertain:["Luka Modric (age 40)?","Ivan Perisic (fitness)?"],
  },
  "Ghana": {
    coach:"Otto Addo", formation:"4-3-3", ranking:56,
    gk:["Lawrence Ati Zigi","Richard Ofori","Jo Mensah"],
    def:["Tariq Lamptey","Daniel Amartey","Alexander Djiku","Abdul Rahman Baba","Gideon Mensah","Joseph Aidoo"],
    mid:["Thomas Partey","Mohammed Kudus","Elisha Owusu","Andre Ayew","Jordan Ayew","Salis Abdul Samed"],
    fwd:["Antoine Semenyo","Osman Bukari","Kamaldeen Sulemana","Felix Afena-Gyan","Inaki Williams"],
    injured:[], uncertain:["Thomas Partey (injury history)?","Inaki Williams (eligibility switch)?"],
  },
  "Panama": {
    coach:"Thomas Christiansen", formation:"4-4-2", ranking:72,
    gk:["Luis Mejia","Orlando Mosquera","Carlos De Gracia"],
    def:["Eric Davis","Harold Cummings","Fidel Escobar","Andres Andrade","Roderick Miller","Michael Amir Murillo"],
    mid:["Edgar Barcenas","Adalberto Carrasquilla","Alberto Quintero","Gabriel Torres","Anibal Godoy","Jovani Welch"],
    fwd:["Ismael Diaz","Frederico Balloy","Cesar Yanis","Jose Fajardo","Roman Torres"],
    injured:[], uncertain:[],
  },
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T={
  bg:"#080a0f",surface:"#0f1117",raised:"#161a22",card:"#1c2030",
  border:"rgba(255,255,255,0.06)",borderHi:"rgba(212,175,55,0.4)",
  gold:"#D4AF37",goldSoft:"rgba(212,175,55,0.1)",goldBright:"#f0c040",
  text:"#eef0f4",sub:"#8490a0",muted:"#4a5568",
  green:"#34d399",greenBg:"rgba(52,211,153,0.1)",
  red:"#f87171",redBg:"rgba(248,113,113,0.1)",
  amber:"#fbbf24",amberBg:"rgba(251,191,36,0.1)",
  blue:"#60a5fa",
  ff:"'DM Sans','Inter',system-ui,sans-serif",
  ffd:"'Playfair Display','Georgia',serif",
};

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function Confetti({active}){
  const ref=useRef(null);
  useEffect(()=>{
    if(!active)return;
    const cv=ref.current,ctx=cv.getContext("2d");
    cv.width=window.innerWidth;cv.height=window.innerHeight;
    const COLS=["#D4AF37","#C0392B","#2980B9","#27AE60","#E67E22","#fff"];
    const pts=Array.from({length:180},()=>({
      x:Math.random()*cv.width,y:-20,sz:Math.random()*8+3,
      col:COLS[Math.floor(Math.random()*COLS.length)],
      vx:(Math.random()-.5)*4,vy:Math.random()*3+1.5,
      rot:Math.random()*360,vr:(Math.random()-.5)*8,sh:Math.random()>.5?"r":"c",
    }));
    let af;
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p=>{
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.col;
        if(p.sh==="r")ctx.fillRect(-p.sz/2,-p.sz/4,p.sz,p.sz/2);
        else{ctx.beginPath();ctx.arc(0,0,p.sz/2,0,Math.PI*2);ctx.fill();}
        ctx.restore();
        p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.vy+=.05;
        if(p.y>cv.height+20){p.y=-20;p.x=Math.random()*cv.width;p.vy=Math.random()*3+1.5;}
      });
      af=requestAnimationFrame(draw);
    };
    draw();
    const t=setTimeout(()=>cancelAnimationFrame(af),5000);
    return()=>{cancelAnimationFrame(af);clearTimeout(t);};
  },[active]);
  if(!active)return null;
  return <canvas ref={ref} style={{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999}}/>;
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
// ─── PROGRESS TRACKER ────────────────────────────────────────────────────────
function ProgressBar({groupRankings,bracket,extras}){
  const defaultR=Object.keys(WC_GROUPS).reduce((a,g)=>({...a,[g]:[...WC_GROUPS[g].teams]}),{});
  const groupsDone=Object.keys(WC_GROUPS).filter(g=>groupRankings[g].some((t,i)=>t!==defaultR[g][i])).length;
  const r32Done=bracket.r32.filter(m=>m.winner).length;
  const r16Done=bracket.r16.filter(m=>m.winner).length;
  const qfDone=bracket.qf.filter(m=>m.winner).length;
  const sfDone=bracket.sf.filter(m=>m.winner).length;
  const finalDone=bracket.final[0].winner?1:0;
  const extrasDone=[extras.champion,extras.goldenBoot,extras.bestPlayer,extras.surpriseTeam,extras.flopTeam].filter(Boolean).length;
  // Total steps: 12 groups + 16 r32 + 8 r16 + 4 qf + 2 sf + 1 final + 5 extras = 48
  const total=48;
  const done=groupsDone+r32Done+r16Done+qfDone+sfDone+finalDone+extrasDone;
  const pct=Math.round((done/total)*100);
  const steps=[
    {label:"Groups",done:groupsDone,total:12},
    {label:"R32",done:r32Done,total:16},
    {label:"R16",done:r16Done,total:8},
    {label:"QF",done:qfDone,total:4},
    {label:"SF",done:sfDone,total:2},
    {label:"Final",done:finalDone,total:1},
    {label:"Extras",done:extrasDone,total:5},
  ];
  return(
    <div style={{background:T.card,border:"1px solid "+T.border,borderRadius:10,padding:"10px 16px",marginBottom:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:600,color:T.text}}>Prediction Progress</span>
        <span style={{fontSize:13,fontWeight:800,color:pct===100?T.green:T.gold}}>{pct}%</span>
      </div>
      <div style={{height:6,background:"rgba(255,255,255,0.07)",borderRadius:3,overflow:"hidden",marginBottom:10}}>
        <div style={{height:"100%",width:pct+"%",background:pct===100?"linear-gradient(90deg,"+T.green+",#22c55e)":"linear-gradient(90deg,"+T.goldBright+","+T.gold+")",borderRadius:3,transition:"width .4s ease"}}/>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {steps.map(s=>(
          <div key={s.label} style={{display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:9,color:s.done===s.total?T.green:T.muted,fontWeight:700,letterSpacing:.5,textTransform:"uppercase"}}>{s.label}</span>
            <span style={{fontSize:9,color:s.done===s.total?T.green:"rgba(255,255,255,0.25)",fontWeight:600}}>{s.done}/{s.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHead({label,sub}){
  return(
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:sub?6:0}}>
        <div style={{width:3,height:24,background:"linear-gradient(180deg,"+T.goldBright+","+T.gold+")",borderRadius:2,flexShrink:0}}/>
        <h2 style={{margin:0,fontSize:"clamp(18px,2vw,24px)",fontWeight:700,fontFamily:T.ffd,color:T.text}}>{label}</h2>
      </div>
      {sub&&<p style={{margin:"0 0 0 15px",fontSize:13,color:T.sub,lineHeight:1.5}}>{sub}</p>}
      <div style={{height:1,background:T.border,marginTop:14}}/>
    </div>
  );
}

function FormBadge({result}){
  const col=result==="W"?T.green:result==="D"?T.amber:T.red;
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:26,height:26,borderRadius:6,background:col+"22",border:"1px solid "+col+"44",fontSize:11,fontWeight:700,color:col}}>{result}</span>;
}

// ─── FORMATION PITCH ─────────────────────────────────────────────────────────
const FPOS={
  "4-2-3-1":[
    {r:"GK",x:50,y:88},{r:"LB",x:12,y:73},{r:"CB",x:34,y:73},{r:"CB",x:66,y:73},{r:"RB",x:88,y:73},
    {r:"CDM",x:36,y:57},{r:"CDM",x:64,y:57},
    {r:"LM",x:14,y:40},{r:"CAM",x:50,y:38},{r:"RM",x:86,y:40},{r:"ST",x:50,y:20},
  ],
  "4-3-3":[
    {r:"GK",x:50,y:88},{r:"LB",x:12,y:72},{r:"CB",x:34,y:72},{r:"CB",x:66,y:72},{r:"RB",x:88,y:72},
    {r:"CM",x:22,y:52},{r:"CM",x:50,y:50},{r:"CM",x:78,y:52},
    {r:"LW",x:16,y:26},{r:"ST",x:50,y:20},{r:"RW",x:84,y:26},
  ],
  "4-4-2":[
    {r:"GK",x:50,y:88},{r:"LB",x:12,y:73},{r:"CB",x:34,y:73},{r:"CB",x:66,y:73},{r:"RB",x:88,y:73},
    {r:"LM",x:12,y:54},{r:"CM",x:36,y:54},{r:"CM",x:64,y:54},{r:"RM",x:88,y:54},
    {r:"ST",x:35,y:22},{r:"ST",x:65,y:22},
  ],
};
function Pitch({formation,squad}){
  const pos=FPOS[formation]||FPOS["4-3-3"];
  const all=squad?[...squad.gk,...squad.def,...squad.mid,...squad.fwd]:[];
  return(
    <svg viewBox="0 0 100 110" style={{width:"100%",maxWidth:300,display:"block",borderRadius:8,overflow:"hidden",border:"1px solid "+T.border}}>
      <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14532d"/><stop offset="100%" stopColor="#166534"/></linearGradient></defs>
      <rect width="100" height="110" fill="url(#pg)"/>
      {[0,1,2,3,4,5].map(i=><rect key={i} x={i*17} width="9" height="110" fill="rgba(0,0,0,0.07)"/>)}
      <rect x="5" y="5" width="90" height="100" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth=".6" rx=".5"/>
      <line x1="5" y1="55" x2="95" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth=".5"/>
      <circle cx="50" cy="55" r="11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth=".5"/>
      <rect x="29" y="5" width="42" height="17" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth=".5"/>
      <rect x="29" y="88" width="42" height="17" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth=".5"/>
      {pos.map((p,i)=>(
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5.5" fill={T.gold} fillOpacity=".92" stroke="rgba(0,0,0,0.6)" strokeWidth=".7"/>
          <text x={p.x} y={p.y+.6} textAnchor="middle" dominantBaseline="middle" fontSize="3.4" fontWeight="700" fill="#000" fontFamily="sans-serif">{p.r}</text>
          {all[i]&&<text x={p.x} y={p.y+8} textAnchor="middle" fontSize="2.8" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">{all[i].split(" ").slice(-1)[0].replace("?","")}</text>}
        </g>
      ))}
    </svg>
  );
}

// ─── BRACKET CARD ─────────────────────────────────────────────────────────────
function BracketCard({match,onWinner,onTeamChange,isFinal,isR16,slot1Teams,slot2Teams,slot1Label,slot2Label}){
  return(
    <div style={{background:isFinal?"linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))":T.card,border:"1px solid "+(isFinal?T.borderHi:T.border),borderRadius:10,overflow:"hidden",minWidth:160,boxShadow:isFinal?"0 0 20px rgba(212,175,55,0.1)":"none"}}>
      <div style={{padding:"5px 10px",borderBottom:"1px solid "+T.border,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:isFinal?T.gold:T.muted,fontWeight:700}}>{match.label}</div>
      {["team1","team2"].map((slot,i)=>{
        const team=match[slot],won=match.winner&&match.winner===team,lost=match.winner&&match.winner!==team&&team;
        const allowed=isR16?(i===0?(slot1Teams||ALL_TEAMS):(slot2Teams||ALL_TEAMS)):ALL_TEAMS;
        const hint=isR16?(i===0?slot1Label:slot2Label):null;
        return(
          <div key={slot} style={{borderBottom:i===0?"1px solid "+T.border:"none",background:won?"linear-gradient(90deg,rgba(212,175,55,0.15),transparent)":"transparent",transition:"background .15s"}}>
            {isR16&&!team?(
              <div>
                {hint&&<div style={{padding:"4px 10px 0",fontSize:9,color:T.muted,letterSpacing:.5,fontStyle:"italic"}}>{hint}</div>}
                <select onChange={e=>e.target.value&&onTeamChange&&onTeamChange(slot,e.target.value)} defaultValue=""
                  style={{width:"100%",padding:"7px 10px",background:"transparent",border:"none",color:T.sub,fontFamily:"inherit",fontSize:12,cursor:"pointer",outline:"none"}}>
                  <option value="">— Pick —</option>
                  {allowed.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            ):(
              <div
                onClick={()=>{
                  if(!team)return;
                  // Prevent a team winning against itself
                  const other=slot==="team1"?match.team2:match.team1;
                  if(team===other&&match.winner===team)return;
                  onWinner(team);
                }}
                style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",cursor:team?"pointer":"default",opacity:lost?0.3:1,transition:"opacity .15s"}}
              >
                {team&&<Flag team={team} size={20} radius={3}/>}
                <span style={{fontSize:13,fontWeight:won?700:500,color:won?T.goldBright:team?T.text:T.muted,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{team||"TBD"}</span>
                {won&&<span style={{fontSize:9,color:T.gold,fontWeight:800,background:T.goldSoft,padding:"2px 6px",borderRadius:3,letterSpacing:.5}}>WIN</span>}
                {team&&!match.winner&&<span style={{fontSize:9,color:"rgba(255,255,255,0.2)"}}>tap</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PLAYERS LIST ─────────────────────────────────────────────────────────────
const PLAYERS_LIST=[
  "Kylian Mbappe (FRA)","Erling Haaland (NOR)","Vinicius Jr (BRA)","Harry Kane (ENG)",
  "Lionel Messi? (ARG)","Cristiano Ronaldo (POR)","Jude Bellingham (ENG)","Lamine Yamal (ESP)",
  "Pedri (ESP)","Bukayo Saka (ENG)","Rodri (ESP)","Federico Valverde (URU)",
  "Julian Alvarez (ARG)","Florian Wirtz (GER)","Alexander Isak (SWE)","Viktor Gyokeres (SWE)",
  "Mohamed Salah (EGY)","Jonathan David (CAN)","Raphinha (BRA)","Martin Odegaard (NOR)",
  "Son Heung-min (KOR)","Darwin Nunez (URU)","Luis Diaz (COL)","Takefusa Kubo (JPN)",
];


function defaultRankings(){
  const r={};
  Object.keys(WC_GROUPS).forEach(g=>{r[g]=[...WC_GROUPS[g].teams];});
  return r;
}

// ─── BRACKET ─────────────────────────────────────────────────────────────────
const R32_SLOTS=[
  {id:"r32_0",label:"1A vs 2B"},{id:"r32_1",label:"1C vs 2D"},
  {id:"r32_2",label:"1E vs 2F"},{id:"r32_3",label:"1G vs 2H"},
  {id:"r32_4",label:"1I vs 2J"},{id:"r32_5",label:"1K vs 2L"},
  {id:"r32_6",label:"1B vs 2A"},{id:"r32_7",label:"1D vs 2C"},
  {id:"r32_8",label:"1F vs 2E"},{id:"r32_9",label:"1H vs 2G"},
  {id:"r32_10",label:"1J vs 2I"},{id:"r32_11",label:"1L vs 2K"},
  {id:"r32_12",label:"Best 3rd #1"},{id:"r32_13",label:"Best 3rd #2"},
  {id:"r32_14",label:"Best 3rd #3"},{id:"r32_15",label:"Best 3rd #4"},
];
const R32_MATCHUPS=[
  [["A",0],["B",1]],[["C",0],["D",1]],[["E",0],["F",1]],[["G",0],["H",1]],
  [["I",0],["J",1]],[["K",0],["L",1]],[["B",0],["A",1]],[["D",0],["C",1]],
  [["F",0],["E",1]],[["H",0],["G",1]],[["J",0],["I",1]],[["L",0],["K",1]],
  null,null,null,null,
];
function emptyBracket(){
  return{
    r32:R32_SLOTS.map(s=>({...s,team1:"",team2:"",winner:""})),
    r16:Array.from({length:8},(_,i)=>({id:"r16_"+i,label:"R16 Match "+(i+1),team1:"",team2:"",winner:""})),
    qf:Array.from({length:4},(_,i)=>({id:"qf_"+i,label:"QF "+(i+1),team1:"",team2:"",winner:""})),
    sf:Array.from({length:2},(_,i)=>({id:"sf_"+i,label:"SF "+(i+1),team1:"",team2:"",winner:""})),
    final:[{id:"final",label:"The Final",team1:"",team2:"",winner:""}],
    third:[{id:"third",label:"3rd Place",team1:"",team2:"",winner:""}],
  };
}

// ─── GROUP STAGE ─────────────────────────────────────────────────────────────
function GroupStage({groupRankings,moveTeam}){
  return(
    <div>
      <SectionHead label="Group Stage" sub="Drag teams up/down — or use the arrows — to set your predicted finishing order. Top 2 from each group qualify automatically."/>
      <div className="group-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
        {Object.keys(WC_GROUPS).map(g=>(
          <GroupRankCard key={g} group={g} ranking={groupRankings[g]||WC_GROUPS[g].teams} moveTeam={moveTeam}/>
        ))}
      </div>
    </div>
  );
}

function GroupRankCard({group,ranking,moveTeam}){
  const [dragging,setDragging]=React.useState(null);
  const [dragOver,setDragOver]=React.useState(null);
  const touchDragIdx=React.useRef(null);
  const containerRef=React.useRef(null);

  // ── Desktop drag ──────────────────────────────────────────────
  const onDragStart=i=>setDragging(i);
  const onDragEnter=i=>setDragOver(i);
  const onDragOver=e=>e.preventDefault();
  const onDragEnd=()=>{
    if(dragging!==null&&dragOver!==null&&dragging!==dragOver)moveTeam(group,dragging,dragOver);
    setDragging(null);setDragOver(null);
  };

  // ── Mobile touch drag ─────────────────────────────────────────
  const onTouchStart=(e,i)=>{
    touchDragIdx.current=i;
    setDragging(i);
  };
  const onTouchMove=(e)=>{
    e.preventDefault(); // stop page scroll during drag
    const touch=e.touches[0];
    const el=document.elementFromPoint(touch.clientX,touch.clientY);
    if(!el)return;
    // Find the closest row with a data-idx attribute
    const row=el.closest("[data-dragidx]");
    if(row){
      const idx=parseInt(row.getAttribute("data-dragidx"));
      if(!isNaN(idx)&&idx!==touchDragIdx.current)setDragOver(idx);
    }
  };
  const onTouchEnd=()=>{
    if(touchDragIdx.current!==null&&dragOver!==null&&touchDragIdx.current!==dragOver){
      moveTeam(group,touchDragIdx.current,dragOver);
    }
    touchDragIdx.current=null;
    setDragging(null);setDragOver(null);
  };

  const POS_BG=["rgba(52,211,153,0.15)","rgba(52,211,153,0.08)","rgba(96,165,250,0.08)","rgba(255,255,255,0.03)"];
  const POS_COL=[T.green,T.green,T.blue,T.muted];
  const STATUS_LABEL=["Qualifies ✓","Qualifies ✓","Best 3rd?","Eliminated"];

  return(
    <div style={{background:T.surface,border:"1px solid "+T.border,borderRadius:14,overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"12px 16px",background:T.card,borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"rgba(212,175,55,0.12)",border:"1px solid rgba(212,175,55,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:14,fontWeight:900,color:T.gold,fontFamily:T.ffd}}>{group}</span>
          </div>
          <span style={{fontSize:12,fontWeight:600,color:T.text}}>Group {group}</span>
        </div>
        <div style={{display:"flex",gap:4}}>{ranking.map(t=><Flag key={t} team={t} size={18} radius={2}/>)}</div>
      </div>

      {/* Sub-header */}
      <div style={{padding:"6px 12px",fontSize:10,color:T.muted,background:"rgba(255,255,255,0.02)",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span>Hold & drag a row — or use ▲▼ arrows</span>
        <button
          onClick={()=>{
            const orig=WC_GROUPS[group].teams;
            orig.forEach(team=>{
              const from=ranking.indexOf(team);
              const to=orig.indexOf(team);
              if(from!==to)moveTeam(group,from,to);
            });
          }}
          style={{fontSize:9,color:T.muted,background:"none",border:"none",cursor:"pointer",letterSpacing:.5,textTransform:"uppercase",padding:0}}
        >Reset ↺</button>
      </div>

      {/* Rows */}
      <div ref={containerRef} style={{padding:"8px"}}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {ranking.map((team,i)=>(
          <div
            key={team}
            data-dragidx={i}
            draggable
            onDragStart={()=>onDragStart(i)}
            onDragEnter={()=>onDragEnter(i)}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onTouchStart={e=>onTouchStart(e,i)}
            style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 10px",marginBottom:i<3?6:0,
              borderRadius:10,
              background:dragging===i?"rgba(212,175,55,0.14)":dragOver===i?"rgba(255,255,255,0.09)":POS_BG[i],
              border:"1px solid "+(dragging===i?"rgba(212,175,55,0.5)":dragOver===i?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)"),
              cursor:"grab",userSelect:"none",
              transform:dragging===i?"scale(1.01)":"scale(1)",
              boxShadow:dragging===i?"0 4px 20px rgba(0,0,0,0.4)":"none",
              transition:"transform .1s,box-shadow .1s,background .1s",
              touchAction:"none", // critical for mobile touch drag
            }}
          >
            {/* Position badge */}
            <div style={{width:22,height:22,borderRadius:6,flexShrink:0,background:POS_BG[i],color:POS_COL[i],fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+POS_COL[i]+"30"}}>{i+1}</div>

            {/* Flag + name */}
            <Flag team={team} size={22} radius={3}/>
            <span style={{flex:1,fontSize:13,fontWeight:i<2?600:400,color:i<2?T.text:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{team}</span>

            {/* Status */}
            <span style={{fontSize:9,fontWeight:700,color:POS_COL[i],background:POS_BG[i],padding:"2px 7px",borderRadius:10,flexShrink:0}}>{STATUS_LABEL[i]}</span>

            {/* Arrow buttons — always visible, big touch targets on mobile */}
            <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0}}>
              <button
                onClick={e=>{e.stopPropagation();moveTeam(group,i,i-1);}}
                disabled={i===0}
                style={{width:24,height:18,border:"none",borderRadius:4,background:i===0?"transparent":"rgba(255,255,255,0.09)",color:i===0?T.muted:T.sub,fontSize:10,cursor:i===0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}
              >▲</button>
              <button
                onClick={e=>{e.stopPropagation();moveTeam(group,i,i+1);}}
                disabled={i===3}
                style={{width:24,height:18,border:"none",borderRadius:4,background:i===3?"transparent":"rgba(255,255,255,0.09)",color:i===3?T.muted:T.sub,fontSize:10,cursor:i===3?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}
              >▼</button>
            </div>

            {/* Drag handle */}
            <span style={{fontSize:16,color:T.muted,flexShrink:0,cursor:"grab",lineHeight:1}}>⠿</span>
          </div>
        ))}
      </div>
      <div style={{padding:"4px 12px 8px",fontSize:10,color:T.muted}}>* Best 8 third-place teams across all groups also advance</div>
    </div>
  );
}


function KnockoutStage({bracket,setWinner,setBracket,groupRankings,groupsCustomised,extra4,setExtra4}){

  // Auto-fill R32 from group rankings — fully clears all downstream rounds
  // Best-3rd opponents: per WC2026 format, best-3rd teams face these group winners
  const BEST3RD_OPPONENTS=[
    ["F",0],["G",0],["H",0],["I",0] // 1st place of groups F,G,H,I face best-3rd teams
  ];
  const autoFill=()=>{
    setBracket(prev=>{
      const nb={
        r32:prev.r32.map((m,i)=>{
          const mu=R32_MATCHUPS[i];
          if(!mu){
            // Best 3rd slot: keep team1 (already picked by user), assign opponent
            const oppGroup=BEST3RD_OPPONENTS[i-12];
            const opponent=oppGroup?groupRankings[oppGroup[0]]?.[oppGroup[1]]||"":"";
            return{...m,team2:opponent,winner:""};
          }
          const[[g1,p1],[g2,p2]]=mu;
          return{...m,team1:groupRankings[g1]?.[p1]||"",team2:groupRankings[g2]?.[p2]||"",winner:""};
        }),
        // Wipe all downstream completely — fresh slate
        r16:prev.r16.map(m=>({...m,team1:"",team2:"",winner:""})),
        qf:prev.qf.map(m=>({...m,team1:"",team2:"",winner:""})),
        sf:prev.sf.map(m=>({...m,team1:"",team2:"",winner:""})),
        final:[{...prev.final[0],team1:"",team2:"",winner:""}],
        third:[{...prev.third[0],team1:"",team2:"",winner:""}],
      };
      return nb;
    });
  };

  // Set a team in a R32 slot manually
  const setR32Team=(idx,slot,team)=>{
    setBracket(prev=>{
      const nb={...prev};const arr=[...nb.r32];
      arr[idx]={...arr[idx],[slot]:team,winner:""};nb.r32=arr;return nb;
    });
  };

  // Set best-3rd teams (slots 12-15)
  const setThirdTeam=(slotIdx,team)=>setR32Team(slotIdx+12,"team1",team);

  // All 3rd place teams from rankings
  const thirdPlaceTeams=Object.keys(WC_GROUPS).map(g=>groupRankings[g]?.[2]).filter(Boolean);

  return(
    <div>
      <SectionHead label="Knockout Stage" sub="Set your group rankings first, then auto-fill the bracket. Tap a team name to advance them — winners cascade automatically."/>

      {/* Auto-fill banner */}
      <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",marginBottom:20,padding:"14px 18px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12}}>
        <div style={{flex:1,minWidth:160}}>
          <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>
            {groupsCustomised?"✅ Group rankings set":"💡 Set group rankings first"}
          </div>
          <div style={{fontSize:12,color:T.sub}}>
            {groupsCustomised?"Auto-fill populates all 24 group-qualified spots.":"Go to Group Stage tab and drag teams into your predicted order, then auto-fill here."}
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap"}}>
          <button onClick={autoFill} style={{padding:"10px 20px",border:"none",borderRadius:8,background:"linear-gradient(135deg,"+T.goldBright+","+T.gold+")",color:"#000",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
            Auto-Fill from Groups →
          </button>
          <button onClick={()=>setBracket(emptyBracket())} style={{padding:"10px 16px",border:"1px solid "+T.border,borderRadius:8,background:"transparent",color:T.sub,fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            Reset ↺
          </button>
        </div>
      </div>

      {/* Best 8 Third-Place Picker */}
      {(()=>{
        // bracket slots 12-15: first 4 best-3rd (appear in bracket)
        const bracket4=[12,13,14,15].map(i=>bracket.r32[i].team1).filter(Boolean);
        // extra4: 4 more best-3rd teams that advance but face each other
        // stored in parent state so they persist across tab changes
        const allSelected=[...bracket4,...extra4];
        const totalSelected=allSelected.length;

        const toggleTeam=(team)=>{
          const inBracket=bracket4.includes(team);
          const inExtra=extra4.includes(team);

          if(inBracket){
            // Remove from bracket slots
            const slotIdx=[12,13,14,15].find(i=>bracket.r32[i].team1===team);
            if(slotIdx!==undefined)setR32Team(slotIdx,"team1","");
          } else if(inExtra){
            // Remove from extra4
            setExtra4(prev=>prev.filter(t=>t!==team));
          } else {
            // Add: first fill bracket slots 12-15, then extra4
            if(bracket4.length<4){
              const emptySlot=[12,13,14,15].find(i=>!bracket.r32[i].team1);
              if(emptySlot!==undefined)setR32Team(emptySlot,"team1",team);
            } else if(extra4.length<4){
              setExtra4(prev=>[...prev,team]);
            }
            // max 8 total — no-op if already at 8
          }
        };

        const clearAll=()=>{
          [12,13,14,15].forEach(i=>setR32Team(i,"team1",""));
          setExtra4([]);
        };

        return(
          <div style={{marginBottom:20,background:T.card,border:"1px solid "+T.border,borderRadius:12,padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,flexWrap:"wrap",marginBottom:12}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:3}}>
                  Best 8 Third-Place Teams
                  {totalSelected>0&&<span style={{marginLeft:10,fontSize:12,color:totalSelected===8?T.green:T.amber,fontWeight:700}}>{totalSelected}/8</span>}
                </div>
                <div style={{fontSize:12,color:T.sub,lineHeight:1.5}}>
                  Pick the <strong style={{color:T.text}}>8 third-place teams</strong> you think will advance.
                  <br/>
                  <span style={{color:T.gold}}>First 4</span> enter the bracket. <span style={{color:"#60a5fa"}}>Next 4</span> face each other in separate matches.
                </div>
              </div>
              {totalSelected>0&&(
                <button onClick={clearAll}
                  style={{fontSize:11,color:T.muted,background:"none",border:"1px solid "+T.border,borderRadius:6,cursor:"pointer",padding:"5px 12px",whiteSpace:"nowrap",flexShrink:0}}>
                  Clear all ↺
                </button>
              )}
            </div>

            {thirdPlaceTeams.length===0?(
              <div style={{textAlign:"center",padding:"24px 0",color:T.muted,fontSize:13}}>
                <div style={{fontSize:28,marginBottom:8}}>⚽</div>
                Set your Group Stage rankings first — 3rd place teams appear here automatically.
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(138px,1fr))",gap:7}}>
                {thirdPlaceTeams.map(team=>{
                  const bIdx=bracket4.indexOf(team);
                  const eIdx=extra4.indexOf(team);
                  const inBracket=bIdx!==-1;
                  const inExtra=eIdx!==-1;
                  const isSel=inBracket||inExtra;
                  const isMax=totalSelected>=8&&!isSel;

                  // Color: gold = in bracket, blue = in extra4, grey = not selected
                  const selColor=inBracket?T.gold:inExtra?"#60a5fa":null;
                  const selBg=inBracket
                    ?"linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.08))"
                    :inExtra
                    ?"linear-gradient(135deg,rgba(96,165,250,0.18),rgba(96,165,250,0.07))"
                    :T.raised;

                  return(
                    <button key={team} onClick={()=>!isMax&&toggleTeam(team)}
                      style={{
                        display:"flex",alignItems:"center",gap:8,padding:"9px 11px",
                        border:"1px solid "+(isSel?(selColor+"60"):T.border),
                        borderRadius:10,textAlign:"left",fontFamily:"inherit",
                        background:selBg,
                        cursor:isMax?"not-allowed":"pointer",
                        opacity:isMax?0.35:1,
                        transition:"all .12s",
                      }}>
                      <Flag team={team} size={22} radius={3}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:isSel?700:400,color:isSel?selColor:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{team}</div>
                        <div style={{fontSize:9,marginTop:1,color:isSel?selColor:T.muted}}>
                          {inBracket?"In bracket #"+(bIdx+1)+" ✓":inExtra?"Advancing #"+(eIdx+5)+" ✓":"3rd place"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Bracket scroll area */}
      <div className="bracket-hint" style={{display:"none",marginBottom:12,padding:"10px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12,color:T.sub}}>
        📱 Scroll right to see the full bracket. Tap a team to advance them.
      </div>

      <div style={{overflowX:"auto",paddingBottom:16,WebkitOverflowScrolling:"touch"}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start",minWidth:860,padding:"4px 2px"}}>

          {/* R32 — two columns */}
          <div style={{flex:"0 0 auto",width:360}} id="bracket-r32">
            <RoundLabel>Round of 32</RoundLabel>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {bracket.r32.map((m,i)=>{
                const isBestThird=i>=12; // slots 12-15 = best 3rd, no dropdowns needed
                return(
                  <BracketCard key={m.id} match={m} onWinner={w=>setWinner("r32",i,w)}
                    slot1Teams={R32_MATCHUPS[i]?WC_GROUPS[R32_MATCHUPS[i][0][0]].teams:ALL_TEAMS}
                    slot2Teams={R32_MATCHUPS[i]?WC_GROUPS[R32_MATCHUPS[i][1][0]].teams:ALL_TEAMS}
                    onTeamChange={(slot,team)=>setR32Team(i,slot,team)}
                    isR16={!isBestThird}/>
                );
              })}
            </div>
          </div>

          {/* R16 */}
          <div style={{flex:"0 0 auto",width:170}} id="bracket-r16">
            <RoundLabel>Round of 16</RoundLabel>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {bracket.r16.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("r16",i,w)}/>)}
            </div>
          </div>

          {/* QF */}
          <div style={{flex:"0 0 auto",width:170}} id="bracket-qf">
            <RoundLabel>Quarter-Finals</RoundLabel>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {bracket.qf.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("qf",i,w)}/>)}
            </div>
          </div>

          {/* SF — exactly 2 */}
          <div style={{flex:"0 0 auto",width:170}} id="bracket-sf">
            <RoundLabel>Semi-Finals</RoundLabel>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {bracket.sf.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("sf",i,w)}/>)}
            </div>
          </div>

          {/* Final + 3rd */}
          <div style={{flex:"0 0 auto",width:170}} id="bracket-f">
            <RoundLabel gold>Final 🏆</RoundLabel>
            {bracket.final.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("final",i,w)} isFinal/>)}
            <div style={{height:1,background:T.border,margin:"14px 0 8px"}}/>
            <div style={{fontSize:9,color:T.muted,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600,marginBottom:7}}>3rd Place</div>
            {bracket.third.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("third",i,w)}/>)}
          </div>

        </div>
      </div>
    </div>
  );
}

function RoundLabel({children,gold}){
  return(
    <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",fontWeight:700,color:gold?T.goldBright:T.muted,marginBottom:10,padding:"4px 0",display:"flex",alignItems:"center",gap:8}}>
      {gold&&<div style={{width:20,height:1.5,background:`linear-gradient(90deg,${T.gold},transparent)`}}/>}
      <span>{children}</span>
      {gold&&<div style={{width:20,height:1.5,background:`linear-gradient(270deg,${T.gold},transparent)`}}/>}
    </div>
  );
}

// ─── EXTRAS ───────────────────────────────────────────────────────────────────
function ExtrasSection({extras,setExtras}){
  const upd=(k,v)=>setExtras(p=>({...p,[k]:v}));
  const inp={width:"100%",padding:"9px 12px",background:T.raised,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontFamily:"inherit",fontSize:13,cursor:"pointer",boxSizing:"border-box",outline:"none"};
  const fw={background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:18};
  const lbl={fontSize:11,fontWeight:600,letterSpacing:1.5,color:T.sub,textTransform:"uppercase",display:"block",marginBottom:8};
  return(
    <div>
      <SectionHead label="Extra Predictions" sub="Optional bonus picks — add as many or as few as you like."/>
      <div className="extras-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        <div style={fw}>
          <span style={lbl}>World Cup Champion</span>
          <select style={inp} value={extras.champion} onChange={e=>upd("champion",e.target.value)}>
            <option value="">Select team</option>
            {ALL_TEAMS.map(t=><option key={t} value={t}>{teamName(t)}</option>)}
          </select>
          <div style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{...lbl,marginBottom:0}}>Confidence</span><span style={{fontSize:13,fontWeight:700,color:T.gold}}>{extras.championConf}%</span></div>
            <input type="range" min="1" max="100" value={extras.championConf} onChange={e=>upd("championConf",+e.target.value)} style={{width:"100%",accentColor:T.gold,cursor:"pointer"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.sub,marginTop:2}}><span>Wild guess</span><span>Dead certain</span></div>
          </div>
        </div>
        <div style={fw}>
          <span style={lbl}>Golden Boot</span>
          <select style={inp} value={extras.goldenBoot} onChange={e=>upd("goldenBoot",e.target.value)}>
            <option value="">Select player</option>
            {PLAYERS_LIST.map(p=><option key={p}>{p}</option>)}
          </select>
          <div style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{...lbl,marginBottom:0}}>Confidence</span><span style={{fontSize:13,fontWeight:700,color:T.gold}}>{extras.goldenBootConf}%</span></div>
            <input type="range" min="1" max="100" value={extras.goldenBootConf} onChange={e=>upd("goldenBootConf",+e.target.value)} style={{width:"100%",accentColor:T.gold,cursor:"pointer"}}/>
          </div>
        </div>
        <div style={fw}><span style={lbl}>Golden Ball — Best Player</span><select style={inp} value={extras.bestPlayer} onChange={e=>upd("bestPlayer",e.target.value)}><option value="">Select player</option>{PLAYERS_LIST.map(p=><option key={p}>{p}</option>)}</select></div>
        <div style={fw}><span style={lbl}>Biggest Surprise Team</span><select style={inp} value={extras.surpriseTeam} onChange={e=>upd("surpriseTeam",e.target.value)}><option value="">Select team</option>{ALL_TEAMS.map(t=><option key={t} value={t}>{teamName(t)}</option>)}</select></div>
        <div style={fw}><span style={lbl}>Biggest Flop Team</span><select style={inp} value={extras.flopTeam} onChange={e=>upd("flopTeam",e.target.value)}><option value="">Select team</option>{ALL_TEAMS.map(t=><option key={t} value={t}>{teamName(t)}</option>)}</select></div>
        <div style={{...fw,gridColumn:"1 / -1"}}><span style={lbl}>Bold Predictions</span><textarea value={extras.notes} onChange={e=>upd("notes",e.target.value)} placeholder="e.g. Morocco to go deep again... England on penalties as always... Messi's last dance... Haaland top scorer..." style={{...inp,minHeight:80,resize:"vertical",lineHeight:1.6}}/></div>
      </div>
    </div>
  );
}

// ─── TEAMS ────────────────────────────────────────────────────────────────────
function TeamsSection(){
  const [sel,setSel]=useState(null);
  const [filterGroup,setFilterGroup]=useState("all");
  const sq=sel?SQUADS[sel]:null;
  const groups=Object.keys(WC_GROUPS);
  const filtered=filterGroup==="all"?ALL_TEAMS:WC_GROUPS[filterGroup].teams;

  return(
    <div>
      <SectionHead label="Teams & Confirmed Squads"/>
      <p style={{color:T.sub,fontSize:14,marginBottom:16,marginTop:-16}}>
        All 48 qualified nations. Squads as announced by May 27, 2026. <span style={{color:T.amber}}>? = uncertain / fitness doubt.</span>
      </p>

      {/* Group filter */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
        <button onClick={()=>setFilterGroup("all")} style={{padding:"5px 12px",border:`1px solid ${filterGroup==="all"?T.gold:T.border}`,borderRadius:20,background:filterGroup==="all"?T.goldSoft:"transparent",color:filterGroup==="all"?T.gold:T.sub,fontFamily:T.ff,fontSize:12,fontWeight:600,cursor:"pointer"}}>All</button>
        {groups.map(g=>(
          <button key={g} onClick={()=>setFilterGroup(g)} style={{padding:"5px 12px",border:`1px solid ${filterGroup===g?T.gold:T.border}`,borderRadius:20,background:filterGroup===g?T.goldSoft:"transparent",color:filterGroup===g?T.gold:T.sub,fontFamily:T.ff,fontSize:12,fontWeight:600,cursor:"pointer"}}>Group {g}</button>
        ))}
      </div>

      <div className="team-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:sel?20:0}}>
        {filtered.map(t=>(
          <div key={t} onClick={()=>setSel(sel===t?null:t)} style={{background:sel===t?T.raised:T.surface,border:`1px solid ${sel===t?T.borderHi:T.border}`,borderRadius:10,padding:"14px 12px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all .15s"}}>
            <Flag team={t} size={36} radius={4}/>
            <div style={{fontSize:12,fontWeight:600,color:sel===t?T.text:T.sub,textAlign:"center",lineHeight:1.3}}>{teamName(t)}</div>
            {SQUADS[t]&&<div style={{fontSize:10,color:T.sub}}>#{SQUADS[t].ranking} · {SQUADS[t].formation}</div>}
          </div>
        ))}
      </div>

      {sel&&(
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginTop:4}}>
          {sq?(
            <>
              <div style={{padding:"18px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                <Flag team={sel} size={52} radius={6}/>
                <div>
                  <h3 style={{margin:0,fontSize:22,fontWeight:700,fontFamily:T.ffd,color:T.text}}>{teamName(sel)}</h3>
                  <div style={{fontSize:12,color:T.sub,marginTop:2}}>{sq.coach} · {sq.formation} · FIFA Rank #{sq.ranking}</div>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:0}}>
                <div style={{flex:1,minWidth:220,padding:"16px 18px"}}>

                  {sq.uncertain.length>0&&(
                    <div style={{background:"rgba(243,156,18,0.08)",border:"1px solid rgba(243,156,18,0.2)",borderRadius:8,padding:"10px 14px",marginBottom:16}}>
                      <div style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:T.amber,textTransform:"uppercase",marginBottom:6}}>⚠ Uncertain / Doubt</div>
                      {sq.uncertain.map((u,i)=><div key={i} style={{fontSize:12,color:T.amber,padding:"2px 0"}}>{u}</div>)}
                    </div>
                  )}

                  {[["GK — Goalkeepers",sq.gk],["DEF — Defenders",sq.def],["MID — Midfielders",sq.mid],["FWD — Forwards",sq.fwd]].map(([title,players])=>(
                    <div key={title} style={{marginBottom:14}}>
                      <div style={{fontSize:10,fontWeight:600,letterSpacing:1.5,color:T.sub,textTransform:"uppercase",marginBottom:8}}>{title}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {players.map((p,i)=>{
                          const isUncertain=p.includes("?");
                          return(
                            <span key={i} style={{padding:"3px 10px",background:isUncertain?"rgba(243,156,18,0.08)":T.raised,border:`1px solid ${isUncertain?"rgba(243,156,18,0.3)":T.border}`,borderRadius:20,fontSize:11,color:isUncertain?T.amber:T.text}}>
                              {p}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{minWidth:260,padding:"18px 22px",borderLeft:`1px solid ${T.border}`}}>
                  <div style={{fontSize:10,fontWeight:600,letterSpacing:1.5,color:T.sub,textTransform:"uppercase",marginBottom:12}}>Formation — {sq.formation}</div>
                  <Pitch formation={sq.formation} squad={sq}/>
                </div>
              </div>
            </>
          ):(
            <div style={{padding:40,textAlign:"center",color:T.sub}}>
              <Flag team={sel} size={64} radius={6}/>
              <div style={{fontWeight:600,color:T.text,marginTop:12}}>{teamName(sel)}</div>
              <div style={{fontSize:13,marginTop:6}}>Squad not yet officially confirmed.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── LOAD SCRIPT HELPER ──────────────────────────────────────────────────────
function loadScript(src){
  return new Promise(resolve=>{
    if(document.querySelector(`script[src="${src}"]`)){resolve();return;}
    const s=document.createElement("script");s.src=src;s.onload=resolve;document.head.appendChild(s);
  });
}

// ─── SHARE CARD (hidden, rendered to image) ───────────────────────────────────
function ShareCard({userName,champion,extras,bracket,groupRankings,extra4}){
  const sf=bracket.sf.filter(m=>m.winner);
  return(
    <div style={{
      width:600,background:"linear-gradient(160deg,#080a0f 0%,#0f1420 60%,#0a0f1a 100%)",
      fontFamily:"'DM Sans',system-ui,sans-serif",overflow:"hidden",position:"relative",
      border:"1px solid rgba(212,175,55,0.3)",
    }}>
      {/* Gold top stripe */}
      <div style={{height:3,background:`linear-gradient(90deg,transparent,${T.gold},transparent)`}}/>

      {/* Header */}
      <div style={{padding:"22px 28px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:10,letterSpacing:3,color:T.gold,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>FIFA World Cup 2026</div>
          <div style={{fontSize:24,fontWeight:700,color:"#eef0f4",fontFamily:"'Playfair Display',serif",lineHeight:1.1}}>
            {userName?"My Predictions":"World Cup Predictions"}
          </div>
          {userName&&<div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:3}}>{userName}</div>}
        </div>
        <div style={{fontSize:44,opacity:.9}}>🏆</div>
      </div>

      <div style={{padding:"18px 28px 22px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Champion */}
        {champion&&(
          <div style={{background:"linear-gradient(135deg,rgba(212,175,55,0.14),rgba(212,175,55,0.05))",border:"1px solid rgba(212,175,55,0.35)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:32}}>🏆</div>
            <div>
              <div style={{fontSize:9,letterSpacing:2.5,color:T.gold,textTransform:"uppercase",fontWeight:700,marginBottom:3}}>My World Cup Winner</div>
              <div style={{fontSize:22,fontWeight:700,color:"#f0c040",fontFamily:"'Playfair Display',serif"}}>{teamName(champion)}</div>
              {extras.championConf&&<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{extras.championConf}% confidence</div>}
            </div>
            <div style={{marginLeft:"auto"}}><Flag team={champion} size={40} radius={5}/></div>
          </div>
        )}

        {/* Final match */}
        {bracket.final[0]?.team1&&bracket.final[0]?.team2&&(
          <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 16px"}}>
            <div style={{fontSize:9,letterSpacing:2,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",fontWeight:700,minWidth:40}}>Final</div>
            <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
              <Flag team={bracket.final[0].team1} size={22} radius={3}/>
              <span style={{fontSize:13,fontWeight:600,color:bracket.final[0].winner===bracket.final[0].team1?"#f0c040":"rgba(255,255,255,0.7)"}}>{teamName(bracket.final[0].team1)}</span>
            </div>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontWeight:700}}>vs</span>
            <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"flex-end"}}>
              <span style={{fontSize:13,fontWeight:600,color:bracket.final[0].winner===bracket.final[0].team2?"#f0c040":"rgba(255,255,255,0.7)"}}>{teamName(bracket.final[0].team2)}</span>
              <Flag team={bracket.final[0].team2} size={22} radius={3}/>
            </div>
          </div>
        )}

        {/* Key picks row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {extras.goldenBoot&&(
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>Golden Boot</div>
              <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.85)"}}>{extras.goldenBoot.split("(")[0].trim()}</div>
              {extras.goldenBootConf&&<div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{extras.goldenBootConf}% conf.</div>}
            </div>
          )}
          {extras.surpriseTeam&&(
            <div style={{background:"rgba(52,211,153,0.07)",border:"1px solid rgba(52,211,153,0.15)",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:9,color:"rgba(52,211,153,0.6)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>Dark Horse 🚀</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Flag team={extras.surpriseTeam} size={16} radius={2}/>
                <span style={{fontSize:12,fontWeight:600,color:"rgba(52,211,153,0.9)"}}>{teamName(extras.surpriseTeam)}</span>
              </div>
            </div>
          )}
          {extras.flopTeam&&(
            <div style={{background:"rgba(248,113,113,0.07)",border:"1px solid rgba(248,113,113,0.15)",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:9,color:"rgba(248,113,113,0.6)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:5}}>Biggest Flop 💀</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Flag team={extras.flopTeam} size={16} radius={2}/>
                <span style={{fontSize:12,fontWeight:600,color:"rgba(248,113,113,0.9)"}}>{teamName(extras.flopTeam)}</span>
              </div>
            </div>
          )}
        </div>

        {/* SF winners mini-bracket */}
        {sf.length>0&&(
          <div>
            <div style={{fontSize:9,letterSpacing:2,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",marginBottom:7,fontWeight:700}}>Semi-Finalists</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {sf.map((m,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px",background:"rgba(255,255,255,0.04)",borderRadius:6}}>
                  <Flag team={m.winner} size={16} radius={2}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:500}}>{teamName(m.winner)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {extras.notes&&(
          <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:12}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",fontStyle:"italic",lineHeight:1.6}}>"{extras.notes.slice(0,120)}{extras.notes.length>120?"...":""}"</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{padding:"10px 28px",background:"rgba(0,0,0,0.3)",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:9,letterSpacing:2,color:"rgba(255,255,255,0.2)",textTransform:"uppercase"}}>WC 2026 Prediction Generator</span>
        <span style={{fontSize:9,color:"rgba(212,175,55,0.4)",letterSpacing:1}}>worldcup2026.app</span>
      </div>

      {/* Gold bottom stripe */}
      <div style={{height:3,background:`linear-gradient(90deg,transparent,${T.gold},transparent)`}}/>
    </div>
  );
}

// ─── SUMMARY ─────────────────────────────────────────────────────────────────
function SummaryPage({groupRankings,bracket,extras,userName,extra4}){
  const summaryRef=useRef(null);
  const shareCardRef=useRef(null);
  const [exporting,setExporting]=useState(false);
  const [sharing,setSharing]=useState(false);
  const [shareImg,setShareImg]=useState(null);
  const [showShareModal,setShowShareModal]=useState(false);
  const [actionMsg,setActionMsg]=useState("");
  const champion=bracket.final[0]?.winner||extras.champion;

  const flash=(msg,ms=2500)=>{setActionMsg(msg);setTimeout(()=>setActionMsg(""),ms);};

  // ── Detect mobile (iOS/Android) ─────────────────────────────────────────────
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // ── Load html2canvas from CDN ────────────────────────────────────────────────
  const ensureHtml2Canvas = async () => {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  };

  // ── Capture any element to a canvas dataURL ──────────────────────────────────
  const captureElement = async (el, width=600) => {
    el.style.visibility = "visible";
    el.style.zIndex = "9999";
    await new Promise(r => setTimeout(r, 250));
    const cv = await window.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#080a0f",
      logging: false,
      width,
      windowWidth: width,
    });
    el.style.visibility = "hidden";
    el.style.zIndex = "-1";
    return cv;
  };

  // ── Mobile-safe download: tries <a> click, falls back to window.open ─────────
  const mobileSafeDownload = (dataUrl, filename) => {
    try {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // iOS Safari fallback — open in new tab so user can long-press to save
      window.open(dataUrl, "_blank");
    }
  };

  // ── Generate share card image ────────────────────────────────────────────────
  const generateShareImage = async () => {
    setSharing(true);
    setActionMsg("Rendering image...");
    try {
      await ensureHtml2Canvas();
      const el = shareCardRef.current;
      if (!el) throw new Error("Ref missing");
      const cv = await captureElement(el, 600);
      const dataUrl = cv.toDataURL("image/png");
      setShareImg(dataUrl);
      setShowShareModal(true);
      setActionMsg("");
    } catch(e) {
      console.error("Share image error:", e);
      flash("❌ Could not generate image");
    }
    setSharing(false);
  };

  // ── Download share card as PNG ───────────────────────────────────────────────
  const downloadImage = () => {
    const fname = `WC2026_${(userName||"Prediction").replace(/\s+/g,"_")}.png`;
    mobileSafeDownload(shareImg, fname);
    flash(isMobile ? "✓ Image opened — long-press to save!" : "✓ Image downloaded!");
  };

  // ── Download FULL summary as PNG (new — mobile friendly) ─────────────────────
  const downloadSummaryImage = async () => {
    setExporting(true);
    flash("Capturing summary...");
    try {
      await ensureHtml2Canvas();
      const el = summaryRef.current;
      const cv = await window.html2canvas(el, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: "#080a0f", logging: false,
      });
      const dataUrl = cv.toDataURL("image/png");
      const fname = `WC2026_Summary_${(userName||"Prediction").replace(/\s+/g,"_")}.png`;
      mobileSafeDownload(dataUrl, fname);
      flash(isMobile ? "✓ Opened — long-press to save!" : "✓ Image saved!");
    } catch(e) {
      flash("❌ Could not capture summary");
    }
    setExporting(false);
  };

  // ── Copy image to clipboard (desktop only) ───────────────────────────────────
  const copyImage = async () => {
    try {
      const res = await fetch(shareImg);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
      flash("✓ Copied to clipboard!");
    } catch {
      flash("⚠ Clipboard not supported here — use Download instead");
    }
  };

  // ── Share text ───────────────────────────────────────────────────────────────
  const buildShareText = () => {
    const parts = [];
    if(champion) parts.push("🏆 My WC2026 winner: " + teamName(champion) + " (" + (extras.championConf||"?") + "% confidence)");
    if(extras.goldenBoot) parts.push("👟 Golden Boot: " + extras.goldenBoot.split("(")[0].trim());
    if(extras.surpriseTeam) parts.push("🚀 Dark horse: " + teamName(extras.surpriseTeam));
    if(extras.flopTeam) parts.push("💀 Biggest flop: " + teamName(extras.flopTeam));
    parts.push("Make your own predictions 👉 worldcup2026.app");
    parts.push("#WorldCup2026 #WC2026 #FootballPredictions");
    return parts.join("\n");
  };

  const shareNative = async () => {
    // Web Share API — works great on mobile (iOS/Android share sheet)
    const text = buildShareText();
    if(navigator.share) {
      try {
        await navigator.share({ title: "My WC 2026 Predictions", text });
        return;
      } catch {}
    }
    // Fallback: copy text
    try {
      await navigator.clipboard.writeText(text);
      flash("✓ Text copied to clipboard!");
    } catch {
      flash("⚠ Could not share");
    }
  };

  const shareToTwitter = () => {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(buildShareText()), "_blank");
  };

  const shareToWhatsApp = () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(buildShareText()), "_blank");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText());
      flash("✓ Text copied!");
    } catch {
      flash("⚠ Could not copy");
    }
  };

  // ── PDF export — mobile safe ──────────────────────────────────────────────────
  const exportPDF = async () => {
    setExporting(true);
    flash("Preparing PDF...");
    try {
      await ensureHtml2Canvas();
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      flash("Rendering...");
      const cv = await window.html2canvas(summaryRef.current, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: "#080a0f", logging: false,
      });
      const imgData = cv.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
      const pw = 210, ph = 297;
      const ih = (cv.height * pw) / cv.width;
      let y = 0;
      while(y < ih) {
        if(y > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -y, pw, ih);
        y += ph;
      }
      const fname = "WC2026_" + (userName||"Prediction").replace(/\s+/g,"_") + "_" + new Date().toISOString().slice(0,10) + ".pdf";
      if(isMobile) {
        // On mobile: open PDF as blob URL in new tab — user can then share/save from browser
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl, "_blank");
        flash("✓ PDF opened — use browser menu to save or share!");
      } else {
        pdf.save(fname);
        flash("✓ PDF downloaded!");
      }
    } catch(e) {
      console.error("PDF error:", e);
      flash("⚠ PDF failed — trying image download instead...");
      setTimeout(() => downloadSummaryImage(), 500);
    }
    setExporting(false);
  };

  return(
    <div>
      {/* Hidden share card — always in DOM but off-screen, visibility toggled for capture */}
      <div
        ref={shareCardRef}
        style={{position:"fixed",left:"-9999px",top:0,zIndex:-1,pointerEvents:"none",visibility:"hidden",width:600}}
      >
        <ShareCard
          userName={userName}
          champion={champion}
          extras={extras}
          bracket={bracket}
          groupRankings={groupRankings}
          extra4={extra4||[]}
        />
      </div>

      {/* Share image modal */}
      {showShareModal&&(
        <div
          onClick={e=>{if(e.target===e.currentTarget){setShowShareModal(false);setShareImg(null);}}}
          style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(6px)"}}
        >
          <div style={{background:T.surface,borderRadius:16,overflow:"hidden",border:`1px solid ${T.borderHi}`,maxWidth:660,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.7)"}}>
            <div style={{padding:"18px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:T.text}}>Share Your Predictions</div>
                <div style={{fontSize:12,color:T.sub,marginTop:2}}>Download the card or share directly to social media</div>
              </div>
              <button onClick={()=>{setShowShareModal(false);setShareImg(null);}} style={{background:"none",border:"none",color:T.sub,fontSize:20,cursor:"pointer",padding:"4px 8px",lineHeight:1}}>×</button>
            </div>

            {/* Preview */}
            {shareImg&&(
              <div style={{padding:"16px 22px",background:T.raised,borderBottom:`1px solid ${T.border}`}}>
                <img src={shareImg} alt="Share preview" style={{width:"100%",borderRadius:10,display:"block",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}/>
              </div>
            )}

            {/* Share buttons */}
            <div style={{padding:"16px 22px",display:"flex",flexDirection:"column",gap:10}}>
              {/* Primary: Download share card image */}
              <div style={{display:"flex",gap:8}}>
                <button onClick={downloadImage} style={{flex:1,padding:"11px",border:"none",borderRadius:8,background:"linear-gradient(135deg,"+T.goldBright+","+T.gold+")",color:"#000",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  ⬇ Save Image
                </button>
                {!isMobile&&(
                  <button onClick={copyImage} style={{padding:"11px 14px",border:"1px solid "+T.border,borderRadius:8,background:T.raised,color:T.text,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                    📋 Copy
                  </button>
                )}
              </div>

              {/* Mobile native share */}
              {isMobile&&(
                <button onClick={shareNative} style={{width:"100%",padding:"11px",border:"1px solid "+T.border,borderRadius:8,background:T.raised,color:T.text,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  📤 Share via...
                </button>
              )}

              {/* Social */}
              <div style={{fontSize:10,color:T.muted,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600,paddingTop:4}}>Share to social</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={shareToTwitter} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#1DA1F2",color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",minWidth:80}}>
                  𝕏 X
                </button>
                <button onClick={shareToWhatsApp} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#25D366",color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",minWidth:80}}>
                  💬 WhatsApp
                </button>
                {!isMobile&&<button onClick={copyText} style={{flex:1,padding:"10px",border:"1px solid "+T.border,borderRadius:8,background:T.raised,color:T.text,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer",minWidth:80}}>
                  🔗 Copy Link
                </button>}
              </div>

              {actionMsg&&<div style={{fontSize:12,color:T.gold,textAlign:"center",padding:"4px 0"}}>{actionMsg}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:28}}>
        <SectionHead label="Prediction Summary" sub="Your complete World Cup 2026 predictions at a glance."/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginTop:4,width:"100%",justifyContent:"flex-end"}}>
          <button
            onClick={generateShareImage}
            disabled={sharing}
            style={{padding:"10px 16px",border:"1px solid "+T.borderHi,borderRadius:8,background:T.goldSoft,color:T.gold,fontFamily:T.ff,fontSize:13,fontWeight:700,cursor:"pointer",opacity:sharing?0.7:1,whiteSpace:"nowrap"}}
          >
            {sharing?"Generating...":"📤 Share"}
          </button>
          <button
            onClick={downloadSummaryImage}
            disabled={exporting}
            style={{padding:"10px 16px",border:"1px solid "+T.border,borderRadius:8,background:T.raised,color:T.text,fontFamily:T.ff,fontSize:13,fontWeight:700,cursor:"pointer",opacity:exporting?0.7:1,whiteSpace:"nowrap"}}
          >
            🖼 Save as Image
          </button>
          <button
            onClick={exportPDF}
            disabled={exporting}
            style={{padding:"10px 16px",border:"none",borderRadius:8,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:13,fontWeight:700,cursor:"pointer",opacity:exporting?0.7:1,whiteSpace:"nowrap"}}
          >
            {exporting?"Exporting...":"⬇ Download PDF"}
          </button>
        </div>
      </div>

      {actionMsg&&!showShareModal&&<div style={{marginBottom:16,padding:"10px 16px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,fontSize:13,color:T.gold}}>{actionMsg}</div>}

      {/* Main summary card */}
      <div ref={summaryRef} style={{background:T.bg,borderRadius:12,overflow:"hidden",border:`1px solid ${T.border}`}}>
        <div style={{background:T.surface,borderBottom:`1px solid ${T.borderHi}`,padding:"28px 28px 22px"}}>
          <div style={{fontSize:10,letterSpacing:2.5,color:T.gold,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>FIFA World Cup 2026</div>
          <h2 style={{margin:"0 0 4px",fontFamily:T.ffd,fontSize:"clamp(22px,4vw,36px)",fontWeight:700,color:T.text}}>{userName?`${userName}'s Predictions`:"My Predictions"}</h2>
          <div style={{fontSize:12,color:T.sub}}>{new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div>
        </div>
        <div style={{padding:"24px 28px"}}>
          {champion&&(
            <div style={{display:"flex",alignItems:"center",gap:16,background:T.surface,border:`1px solid ${T.borderHi}`,borderRadius:10,padding:"16px 20px",marginBottom:20}}>
              <Flag team={champion} size={44} radius={6}/>
              <div>
                <div style={{fontSize:10,letterSpacing:2,color:T.gold,textTransform:"uppercase",fontWeight:600,marginBottom:3}}>My World Cup Winner</div>
                <div style={{fontSize:22,fontWeight:700,fontFamily:T.ffd,color:T.text}}>{teamName(champion)}</div>
                {extras.championConf&&<div style={{fontSize:12,color:T.sub,marginTop:2}}>{extras.championConf}% confidence</div>}
              </div>
            </div>
          )}
          {(extras.goldenBoot||extras.bestPlayer||extras.surpriseTeam||extras.flopTeam)&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:24}}>
              {extras.goldenBoot&&<SmallStat label="Golden Boot" value={extras.goldenBoot} conf={extras.goldenBootConf}/>}
              {extras.bestPlayer&&<SmallStat label="Golden Ball" value={extras.bestPlayer}/>}
              {extras.surpriseTeam&&<SmallStat label="Dark Horse" value={teamName(extras.surpriseTeam)} flag={extras.surpriseTeam} accent={T.green}/>}
              {extras.flopTeam&&<SmallStat label="Biggest Flop" value={teamName(extras.flopTeam)} flag={extras.flopTeam} accent={T.red}/>}
            </div>
          )}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,letterSpacing:2,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>Group Stage Predictions</div>
            <div className="summary-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
              {Object.keys(WC_GROUPS).map(g=>{
                const ranking=groupRankings[g]||WC_GROUPS[g].teams;
                return(
                  <div key={g} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden"}}>
                    <div style={{padding:"6px 12px",borderBottom:`1px solid ${T.border}`,fontSize:10,fontWeight:700,letterSpacing:1.5,color:T.gold,textTransform:"uppercase"}}>Group {g}</div>
                    {ranking.map((t,i)=>(
                      <div key={t} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",borderBottom:i<3?`1px solid rgba(255,255,255,0.04)`:"none",background:i<2?"rgba(52,211,153,0.03)":"transparent"}}>
                        <span style={{fontSize:9,color:i<2?T.green:T.muted,fontWeight:700,width:10}}>{i+1}</span>
                        <Flag team={t} size={15} radius={2}/>
                        <span style={{fontSize:11,flex:1,color:i<2?T.text:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t}</span>
                        {i<2&&<span style={{fontSize:8,color:T.green,fontWeight:700,background:"rgba(52,211,153,0.15)",padding:"1px 5px",borderRadius:3}}>Q</span>}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,letterSpacing:2,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>Knockout Stage</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {key:"r32",label:"Round of 32",cols:4},
                {key:"r16",label:"Round of 16",cols:4},
                {key:"qf",label:"Quarter-Finals",cols:4},
                {key:"sf",label:"Semi-Finals",cols:2},
                {key:"final",label:"Final",cols:1},
              ].map(({key,label,cols})=>{
                const winners=bracket[key]?.filter(m=>m.winner)||[];
                if(!winners.length)return null;
                return(
                  <div key={key}>
                    <div style={{fontSize:9,color:T.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:5,fontWeight:700}}>{label}</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat("+cols+",1fr)",gap:5}}>
                      {winners.map((m,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 9px",background:key==="final"?"linear-gradient(135deg,rgba(212,175,55,0.15),rgba(212,175,55,0.05))":T.surface,border:"1px solid "+(key==="final"?T.borderHi:T.border),borderRadius:6}}>
                          <Flag team={m.winner} size={16} radius={2}/>
                          <span style={{fontSize:11,fontWeight:key==="final"?700:600,color:key==="final"?T.gold:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.winner}</span>
                          {key==="final"&&<span style={{fontSize:12,marginLeft:"auto"}}>🏆</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Fun stats about the predictions */}
          {(bracket.final[0]?.winner||extras.champion)&&(()=>{
            const allWinners=[...bracket.r32,...bracket.r16,...bracket.qf,...bracket.sf].filter(m=>m.winner).map(m=>m.winner);
            const freq={};allWinners.forEach(t=>{freq[t]=(freq[t]||0)+1;});
            const topTeam=Object.entries(freq).sort((a,b)=>b[1]-a[1])[0];
            return(
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                {topTeam&&(
                  <div style={{flex:1,minWidth:140,background:T.surface,border:"1px solid "+T.border,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
                    <Flag team={topTeam[0]} size={24} radius={3}/>
                    <div>
                      <div style={{fontSize:9,color:T.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>Deepest Run</div>
                      <div style={{fontSize:12,fontWeight:700,color:T.text}}>{topTeam[0]}</div>
                      <div style={{fontSize:10,color:T.sub}}>{topTeam[1]} wins predicted</div>
                    </div>
                  </div>
                )}
                <div style={{flex:1,minWidth:140,background:T.surface,border:"1px solid "+T.border,borderRadius:8,padding:"10px 14px"}}>
                  <div style={{fontSize:9,color:T.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>Upsets Predicted</div>
                  <div style={{fontSize:22,fontWeight:800,color:T.gold}}>∞</div>
                  <div style={{fontSize:10,color:T.sub}}>Only time will tell</div>
                </div>
              </div>
            );
          })()}
          {extras.notes&&(
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"14px 16px",marginBottom:16}}>
              <div style={{fontSize:10,letterSpacing:1.5,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>Bold Predictions</div>
              <div style={{fontSize:13,color:T.text,lineHeight:1.7}}>{extras.notes}</div>
            </div>
          )}
          <div style={{marginTop:24,paddingTop:16,borderTop:`1px solid ${T.border}`,fontSize:10,color:"rgba(255,255,255,0.12)",letterSpacing:1.5,display:"flex",justifyContent:"space-between"}}>
            <span>WORLD CUP 2026 PREDICTION GENERATOR</span>
            <span>{userName?userName.toUpperCase():"ANONYMOUS"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("groups");
  const [userName,setUserName]=useState("");
  const [confetti,setConfetti]=useState(false);
  const [groupRankings,setGroupRankings]=useState(defaultRankings);
  const [bracket,setBracket]=useState(emptyBracket);
  const [extras,setExtras]=useState({champion:"",goldenBoot:"",bestPlayer:"",surpriseTeam:"",flopTeam:"",notes:"",championConf:70,goldenBootConf:65});
  const [extra4,setExtra4]=useState([]); // extra 4 best-3rd teams (not in bracket)

  const moveTeam=(g,fromIdx,toIdx)=>{
    if(toIdx<0||toIdx>3)return;
    setGroupRankings(prev=>{
      const arr=[...prev[g]];
      const [item]=arr.splice(fromIdx,1);
      arr.splice(toIdx,0,item);
      return{...prev,[g]:arr};
    });
  };

  const setWinner=(round,idx,winner)=>{
    setBracket(prev=>{
      // Deep-clone the entire bracket so we can mutate freely
      const nxt={
        r32:prev.r32.map(m=>({...m})),
        r16:prev.r16.map(m=>({...m})),
        qf:prev.qf.map(m=>({...m})),
        sf:prev.sf.map(m=>({...m})),
        final:[{...prev.final[0]}],
        third:[{...prev.third[0]}],
      };

      // The old winner that was already set (may have cascaded downstream)
      const oldWinner = nxt[round][idx].winner;

      // Set the new winner in this round
      nxt[round][idx].winner = winner;

      // Helper: remove a team from a specific slot in a round
      const clearTeamInSlot=(rd,matchIdx,slot)=>{
        if(nxt[rd][matchIdx]){
          nxt[rd][matchIdx][slot]="";
          nxt[rd][matchIdx].winner="";
        }
      };

      // Helper: recursively wipe a team from all downstream rounds
      // starting from where it would appear after this round/match
      const cascadeWipe=(rd,matchIdx,slot)=>{
        clearTeamInSlot(rd,matchIdx,slot);
        const NEXT={r32:"r16",r16:"qf",qf:"sf",sf:"final"};
        const nextRd=NEXT[rd];
        if(!nextRd)return;
        const nextIdx=Math.floor(matchIdx/2);
        const nextSlot=matchIdx%2===0?"team1":"team2";
        cascadeWipe(nextRd,nextIdx,nextSlot);
      };

      // If we're changing an existing winner, wipe the old winner from downstream
      if(oldWinner && oldWinner!==winner){
        const NEXT={r32:"r16",r16:"qf",qf:"sf",sf:"final"};
        const nextRd=NEXT[round];
        if(nextRd){
          const nextIdx=Math.floor(idx/2);
          const nextSlot=idx%2===0?"team1":"team2";
          // Only wipe downstream if the old winner actually occupies that slot
          if(nxt[nextRd][nextIdx][nextSlot]===oldWinner){
            cascadeWipe(nextRd,nextIdx,nextSlot);
          }
        }
      }

      // Now propagate the NEW winner forward into the next round slot
      const NEXT={r32:"r16",r16:"qf",qf:"sf",sf:"final"};
      const nextRd=NEXT[round];
      if(nextRd){
        const nextIdx=Math.floor(idx/2);
        const nextSlot=idx%2===0?"team1":"team2";
        nxt[nextRd][nextIdx][nextSlot]=winner;
        nxt[nextRd][nextIdx].winner=""; // reset winner since teams changed
      }

      // SF losers → 3rd place match
      if(round==="sf"){
        const m=nxt.sf[idx];
        const loser=m.team1===winner?m.team2:m.team1;
        if(idx===0) nxt.third[0].team1=loser;
        else nxt.third[0].team2=loser;
        nxt.third[0].winner="";
      }

      return nxt;
    });
  };

  const chaosMode=()=>{
    const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
    const nr={};Object.keys(WC_GROUPS).forEach(g=>{nr[g]=[...WC_GROUPS[g].teams].sort(()=>Math.random()-.5);});
    setGroupRankings(nr);
    const nb=emptyBracket();
    const sh=[...ALL_TEAMS].sort(()=>Math.random()-.5);
    nb.r32=nb.r32.map((m,i)=>({...m,team1:sh[i*2%sh.length]||"TBD",team2:sh[(i*2+1)%sh.length]||"TBD"}));
    ["r32","r16","qf","sf","final"].forEach(rd=>{
      nb[rd]=nb[rd].map((m,i)=>{
        const w=Math.random()>.5?m.team1:m.team2;
        const NR={r32:"r16",r16:"qf",qf:"sf",sf:"final"};
        if(NR[rd]&&nb[NR[rd]][Math.floor(i/2)])nb[NR[rd]][Math.floor(i/2)][i%2===0?"team1":"team2"]=w;
        return{...m,winner:w};
      });
    });
    const sf=nb.sf;
    nb.third[0]={...nb.third[0],team1:sf[0]?.team1===sf[0]?.winner?sf[0]?.team2:sf[0]?.team1||"",team2:sf[1]?.team1===sf[1]?.winner?sf[1]?.team2:sf[1]?.team1||"",winner:pick(ALL_TEAMS)};
    setExtras({champion:pick(ALL_TEAMS),goldenBoot:pick(PLAYERS_LIST),bestPlayer:pick(PLAYERS_LIST),surpriseTeam:pick(ALL_TEAMS),flopTeam:pick(ALL_TEAMS),notes:"Chaos Mode — all bets are off.",championConf:Math.floor(Math.random()*55)+20,goldenBootConf:Math.floor(Math.random()*55)+20});
    setExtra4([pick(ALL_TEAMS),pick(ALL_TEAMS),pick(ALL_TEAMS),pick(ALL_TEAMS)].filter((t,i,a)=>a.indexOf(t)===i));
    setBracket(nb);setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");
  };

  const defaultR=defaultRankings();
  const groupsCustomised=Object.keys(WC_GROUPS).some(g=>groupRankings[g].some((t,i)=>t!==defaultR[g][i]));

  const TABS=[{id:"groups",label:"Group Stage"},{id:"knockout",label:"Knockout"},{id:"extras",label:"Extras"},{id:"teams",label:"Teams"},{id:"summary",label:"Summary"}];
  const TAB_ICONS={groups:"⚽",knockout:"🏆",extras:"⭐",teams:"🌍",summary:"📋"};

  return(
    <div style={{width:"100vw",minHeight:"100vh",background:T.bg,color:T.text,fontFamily:T.ff,display:"flex",flexDirection:"column",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{width:100%;min-height:100vh;overflow-x:hidden;background:#080a0f;font-family:'DM Sans',system-ui,sans-serif;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        select option{background:#0f1117;color:#eef0f4;}
        select{-webkit-appearance:none;}
        button{-webkit-tap-highlight-color:transparent;font-family:'DM Sans',system-ui,sans-serif;}
        input,textarea,select{font-family:'DM Sans',system-ui,sans-serif;}
        @media(max-width:640px){
          .desktop-only{display:none!important;}
          .mobile-nav{display:flex!important;}
          .desktop-nav{display:none!important;}
          .main-pad{padding:16px 12px 90px!important;}
          .group-grid{grid-template-columns:1fr!important;}
          .team-grid{grid-template-columns:repeat(3,1fr)!important;}
          .extras-grid{grid-template-columns:1fr!important;}
          .summary-grid{grid-template-columns:repeat(2,1fr)!important;}
          .bracket-hint{display:block!important;}
        }
        @media(min-width:641px){
          .mobile-nav{display:none!important;}
          .mobile-only{display:none!important;}
        }
      `}</style>
      <Confetti active={confetti}/>

      {/* PROGRESS BAR — full width, not sticky to avoid layout issues */}
      <div style={{padding:"8px 24px 0",background:T.bg,borderBottom:"1px solid "+T.border}}>
        <ProgressBar groupRankings={groupRankings} bracket={bracket} extras={extras}/>
      </div>

      {/* DESKTOP HEADER */}
      <header className="desktop-nav" style={{flexShrink:0,background:T.surface,borderBottom:"1px solid "+T.border,position:"sticky",top:0,zIndex:200}}>
        <div style={{padding:"0 24px",display:"flex",alignItems:"center",height:54}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginRight:28,flexShrink:0}}>
            <span style={{fontSize:20}}>🏆</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:T.ffd}}>WC 2026</div>
              <div style={{fontSize:9,color:T.sub,letterSpacing:1.5,textTransform:"uppercase"}}>Predictor</div>
            </div>
          </div>
          <nav style={{display:"flex",gap:0,flex:1,overflowX:"auto",height:"100%"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{height:"100%",padding:"0 16px",border:"none",borderBottom:"3px solid "+(tab===t.id?T.gold:"transparent"),borderTop:"3px solid transparent",background:"transparent",color:tab===t.id?T.gold:T.sub,fontFamily:T.ff,fontSize:13,fontWeight:tab===t.id?600:400,cursor:"pointer",transition:"color .15s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:14}}>{TAB_ICONS[t.id]}</span><span>{t.label}</span>
              </button>
            ))}
          </nav>
          <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:12,flexShrink:0}}>
            <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Your name" style={{padding:"7px 12px",background:T.raised,border:"1px solid "+T.border,borderRadius:7,color:T.text,fontFamily:T.ff,fontSize:12,width:120,outline:"none"}}/>
            <button onClick={chaosMode} style={{padding:"7px 12px",border:"1px solid "+T.border,borderRadius:7,background:"transparent",color:T.sub,fontFamily:T.ff,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>💀 Chaos</button>
            <button onClick={()=>{setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");}} style={{padding:"7px 14px",border:"none",borderRadius:7,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Done ✓</button>
          </div>
        </div>
      </header>

      {/* MOBILE HEADER */}
      <header className="mobile-nav" style={{flexShrink:0,background:T.surface,borderBottom:"1px solid "+T.border,position:"sticky",top:0,zIndex:200,padding:"10px 14px",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>🏆</span>
          <div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:T.ffd}}>WC 2026</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Your name" style={{padding:"6px 10px",background:T.raised,border:"1px solid "+T.border,borderRadius:7,color:T.text,fontFamily:T.ff,fontSize:12,width:100,outline:"none"}}/>
          <button onClick={()=>{setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");}} style={{padding:"6px 12px",border:"none",borderRadius:7,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:12,fontWeight:700,cursor:"pointer"}}>Done ✓</button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="main-pad" style={{flex:1,padding:"24px 24px 80px",maxWidth:"100%",boxSizing:"border-box"}}>
        {tab==="groups"   && <GroupStage groupRankings={groupRankings} moveTeam={moveTeam}/>}
        {tab==="knockout" && <KnockoutStage bracket={bracket} setWinner={setWinner} setBracket={setBracket} groupRankings={groupRankings} groupsCustomised={groupsCustomised} extra4={extra4} setExtra4={setExtra4}/>}
        {tab==="extras"   && <ExtrasSection extras={extras} setExtras={setExtras}/>}
        {tab==="teams"    && <TeamsSection/>}
        {tab==="summary"  && <SummaryPage groupRankings={groupRankings} bracket={bracket} extras={extras} userName={userName} extra4={extra4}/>}
      </main>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="mobile-nav" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:300,background:T.surface,borderTop:"1px solid "+T.border,display:"flex",alignItems:"stretch",paddingBottom:"env(safe-area-inset-bottom)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"8px 2px 6px",cursor:"pointer",borderTop:"2px solid "+(tab===t.id?T.gold:"transparent"),transition:"all .15s"}}>
            <span style={{fontSize:18,lineHeight:1}}>{TAB_ICONS[t.id]}</span>
            <span style={{fontSize:9,fontWeight:tab===t.id?700:400,color:tab===t.id?T.gold:T.sub,letterSpacing:.3,fontFamily:T.ff,textTransform:"uppercase"}}>{t.label.split(" ")[0]}</span>
          </button>
        ))}
        <button onClick={chaosMode} style={{flex:1,border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"8px 2px 6px",cursor:"pointer",borderTop:"2px solid transparent"}}>
          <span style={{fontSize:18,lineHeight:1}}>💀</span>
          <span style={{fontSize:9,color:T.sub,letterSpacing:.3,fontFamily:T.ff,textTransform:"uppercase"}}>Chaos</span>
        </button>
      </nav>
    </div>
  );
}


function SmallStat({label,value,conf,flag,accent}){
  return(
    <div style={{flex:1,minWidth:140,background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"12px 14px"}}>
      <div style={{fontSize:10,letterSpacing:1.5,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:6}}>{label}</div>
      {flag&&<Flag team={flag} size={18} radius={2}/>}
      <div style={{fontSize:13,fontWeight:700,color:accent||T.text,marginTop:flag?5:0}}>{value}</div>
      {conf&&<div style={{fontSize:11,color:T.sub,marginTop:3}}>{conf}% confidence</div>}
    </div>
  );
}