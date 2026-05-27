import { useState, useRef, useEffect } from "react";

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

function Flag({ team, size=24, radius=3 }) {
  const code = getCode(team);
  return (
    <img
      src={`https://flagcdn.com/w${size*2}/${code}.png`}
      alt={team}
      style={{ width:size, height:size*0.67, borderRadius:radius, objectFit:"cover", flexShrink:0, display:"inline-block", boxShadow:"0 1px 4px rgba(0,0,0,0.4)" }}
      onError={e => { e.target.style.display="none"; }}
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

// ─── MATCH GENERATION ────────────────────────────────────────────────────────
function getGroupMatches(g) {
  const t=WC_GROUPS[g].teams, ms=[];
  for(let i=0;i<t.length;i++)
    for(let j=i+1;j<t.length;j++)
      ms.push({home:t[i],away:t[j],homeGoals:"",awayGoals:""});
  return ms;
}
function computeStandings(teams,matches){
  const tb={};
  teams.forEach(t=>{tb[t]={p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};});
  matches.forEach(m=>{
    const hg=parseInt(m.homeGoals),ag=parseInt(m.awayGoals);
    if(isNaN(hg)||isNaN(ag))return;
    tb[m.home].p++;tb[m.away].p++;
    tb[m.home].gf+=hg;tb[m.home].ga+=ag;
    tb[m.away].gf+=ag;tb[m.away].ga+=hg;
    if(hg>ag){tb[m.home].w++;tb[m.home].pts+=3;tb[m.away].l++;}
    else if(hg<ag){tb[m.away].w++;tb[m.away].pts+=3;tb[m.home].l++;}
    else{tb[m.home].d++;tb[m.home].pts++;tb[m.away].d++;tb[m.away].pts++;}
  });
  return Object.entries(tb).map(([name,s])=>({name,...s,gd:s.gf-s.ga}))
    .sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
}

// ─── BRACKET ─────────────────────────────────────────────────────────────────
const R16_LABELS=[
  "1A vs 2B","1C vs 2D","1E vs 2F","1G vs 2H","1I vs 2J","1K vs 2L",
  "1B vs 2A","1D vs 2C","1F vs 2E","1H vs 2G","1J vs 2I","1L vs 2K",
  "Best 3rd α","Best 3rd β","Best 3rd γ","Best 3rd δ",
];
function emptyBracket(){
  return{
    r16:R16_LABELS.map((label,i)=>({id:`r16_${i}`,label,team1:"",team2:"",winner:""})),
    qf:Array.from({length:8},(_,i)=>({id:`qf_${i}`,label:`QF ${i+1}`,team1:"",team2:"",winner:""})),
    sf:Array.from({length:4},(_,i)=>({id:`sf_${i}`,label:`SF ${i+1}`,team1:"",team2:"",winner:""})),
    final:[{id:"final",label:"The Final",team1:"",team2:"",winner:""}],
    third:[{id:"third",label:"3rd Place",team1:"",team2:"",winner:""}],
  };
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T={
  bg:"#080a0f",surface:"#0f1117",raised:"#161a22",card:"#1c2030",
  border:"rgba(255,255,255,0.06)",borderHi:"rgba(212,175,55,0.4)",
  gold:"#D4AF37",goldSoft:"rgba(212,175,55,0.1)",goldBright:"#f0c040",
  text:"#eef0f4",sub:"#8490a0",muted:"#4a5568",
  green:"#34d399",greenBg:"rgba(52,211,153,0.1)",
  red:"#f87171",redBg:"rgba(248,113,113,0.1)",
  amber:"#fbbf24",amberBg:"rgba(251,191,36,0.1)",
  blue:"#60a5fa",
  ff:"'DM Sans','Inter',system-ui,sans-serif",ffd:"'Playfair Display','Georgia',serif",
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
function SectionHead({label,sub}){
  return(
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:sub?6:0}}>
        <div style={{width:3,height:24,background:`linear-gradient(180deg,${T.goldBright},${T.gold})`,borderRadius:2,flexShrink:0}}/>
        <h2 style={{margin:0,fontSize:"clamp(18px,2vw,24px)",fontWeight:700,fontFamily:T.ffd,color:T.text,letterSpacing:-.3}}>{label}</h2>
      </div>
      {sub&&<p style={{margin:"0 0 0 15px",fontSize:13,color:T.sub,lineHeight:1.5}}>{sub}</p>}
      <div style={{height:1,background:T.border,marginTop:14}}/>
    </div>
  );
}
function FormBadge({result}){
  const col=result==="W"?T.green:result==="D"?T.amber:T.red;
  return <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:26,height:26,borderRadius:6,background:`${col}22`,border:`1px solid ${col}44`,fontSize:11,fontWeight:700,color:col}}>{result}</span>;
}

// ─── FORMATION SVG ────────────────────────────────────────────────────────────
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
  "4-1-4-1":[
    {r:"GK",x:50,y:88},{r:"LB",x:12,y:73},{r:"CB",x:34,y:73},{r:"CB",x:66,y:73},{r:"RB",x:88,y:73},
    {r:"DM",x:50,y:60},
    {r:"LM",x:12,y:44},{r:"CM",x:34,y:44},{r:"CM",x:66,y:44},{r:"RM",x:88,y:44},
    {r:"ST",x:50,y:20},
  ],
};
function Pitch({formation,squad}){
  const pos=FPOS[formation]||FPOS["4-3-3"];
  const all=squad?[...squad.gk,...squad.def,...squad.mid,...squad.fwd]:[];
  return(
    <svg viewBox="0 0 100 110" style={{width:"100%",maxWidth:300,display:"block",borderRadius:8,overflow:"hidden",border:`1px solid ${T.border}`}}>
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
    <div style={{
      background:isFinal?`linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))`:T.card,
      border:`1px solid ${isFinal?T.borderHi:T.border}`,
      borderRadius:10,overflow:"hidden",minWidth:175,
      boxShadow:isFinal?"0 0 24px rgba(212,175,55,0.12)":"none",
    }}>
      <div style={{padding:"5px 10px",borderBottom:`1px solid ${T.border}`,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:isFinal?T.gold:T.muted,fontWeight:700}}>{match.label}</div>
      {["team1","team2"].map((slot,i)=>{
        const team=match[slot],won=match.winner&&match.winner===team;
        const lost=match.winner&&match.winner!==team&&team;
        // Which pool of teams is allowed for this slot
        const allowedTeams = isR16 ? (i===0 ? (slot1Teams||ALL_TEAMS) : (slot2Teams||ALL_TEAMS)) : ALL_TEAMS;
        const slotHint = isR16 ? (i===0 ? slot1Label : slot2Label) : null;
        return(
          <div key={slot} style={{
            borderBottom:i===0?`1px solid ${T.border}`:"none",
            background:won?`linear-gradient(90deg,rgba(212,175,55,0.15),transparent)`:"transparent",
            transition:"background .15s",
          }}>
            {isR16&&!team?(
              <div>
                {slotHint&&(
                  <div style={{padding:"4px 10px 0",fontSize:9,color:T.muted,letterSpacing:.5,fontStyle:"italic"}}>
                    {slotHint}
                  </div>
                )}
                <select
                  onChange={e=>e.target.value&&onTeamChange&&onTeamChange(slot,e.target.value)}
                  defaultValue=""
                  style={{width:"100%",padding:"6px 10px 8px",background:"rgba(255,255,255,0.03)",border:"none",color:T.sub,fontFamily:"inherit",fontSize:12,cursor:"pointer",outline:"none"}}
                >
                  <option value="">— Pick team —</option>
                  {allowedTeams.map(t=><option key={t} value={t}>{teamName(t)}</option>)}
                </select>
              </div>
            ):(
              <div
                onClick={()=>team&&onWinner(team)}
                style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",cursor:team?"pointer":"default",opacity:lost?0.4:1,transition:"opacity .15s"}}
              >
                {team&&<Flag team={team} size={20} radius={3}/>}
                <span style={{fontSize:13,fontWeight:won?700:500,color:won?T.goldBright:team?T.text:T.muted,flex:1,fontFamily:"inherit",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{team?teamName(team):"TBD"}</span>
                {won&&<span style={{fontSize:9,color:T.gold,letterSpacing:1,fontWeight:700,background:T.goldSoft,padding:"2px 5px",borderRadius:3}}>✓</span>}
                {team&&!match.winner&&<span style={{fontSize:9,color:T.muted,flexShrink:0}}>tap</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PLAYERS ─────────────────────────────────────────────────────────────────
const PLAYERS_LIST=[
  "Kylian Mbappe (FRA)","Erling Haaland (NOR)","Vinicius Jr (BRA)","Harry Kane (ENG)",
  "Lionel Messi? (ARG)","Cristiano Ronaldo (POR)","Jude Bellingham (ENG)","Lamine Yamal (ESP)",
  "Pedri (ESP)","Bukayo Saka (ENG)","Rodri (ESP)","Federico Valverde (URU)",
  "Julian Alvarez (ARG)","Florian Wirtz (GER)","Alexander Isak (SWE)","Viktor Gyokeres (SWE)",
  "Mohamed Salah (EGY)","Jonathan David (CAN)","Raphinha (BRA)","Martin Odegaard (NOR)",
  "Son Heung-min (KOR)","Darwin Nunez (URU)","Luis Diaz (COL)","Takefusa Kubo (JPN)",
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("groups");
  const [userName,setUserName]=useState("");
  const [confetti,setConfetti]=useState(false);
  const [groupMatches,setGroupMatches]=useState(()=>{
    const m={};Object.keys(WC_GROUPS).forEach(g=>{m[g]=getGroupMatches(g);});return m;
  });
  const [bracket,setBracket]=useState(emptyBracket);
  const [extras,setExtras]=useState({champion:"",goldenBoot:"",bestPlayer:"",surpriseTeam:"",flopTeam:"",notes:"",championConf:70,goldenBootConf:65});

  const updateMatch=(g,idx,field,val)=>setGroupMatches(prev=>{const arr=[...prev[g]];arr[idx]={...arr[idx],[field]:val};return{...prev,[g]:arr};});

  const setWinner=(round,idx,winner)=>{
    setBracket(prev=>{
      const nxt={...prev};const arr=[...nxt[round]];arr[idx]={...arr[idx],winner};nxt[round]=arr;
      const NR={r16:"qf",qf:"sf",sf:"final"};const nr=NR[round];
      if(nr){
        const na=[...nxt[nr]];const ni=Math.floor(idx/2);const slot=idx%2===0?"team1":"team2";
        na[ni]={...na[ni],[slot]:winner,winner:""};nxt[nr]=na;
        if(nr==="qf"){const sa=[...nxt.sf];const si=Math.floor(ni/2);sa[si]={...sa[si],winner:"",[ni%2===0?"team1":"team2"]:""};nxt.sf=sa;nxt.final=[{...nxt.final[0],winner:"",team1:"",team2:""}];}
        if(nr==="sf")nxt.final=[{...nxt.final[0],winner:""}];
      }
      if(round==="sf"){const ta=[...nxt.third];const m=arr[idx];const loser=m.team1===winner?m.team2:m.team1;ta[0]={...ta[0],[idx===0?"team1":"team2"]:loser,winner:""};nxt.third=ta;}
      return nxt;
    });
  };

  const chaosMode=()=>{
    const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
    const nm={};Object.keys(WC_GROUPS).forEach(g=>{nm[g]=getGroupMatches(g).map(m=>({...m,homeGoals:String(Math.floor(Math.random()*5)),awayGoals:String(Math.floor(Math.random()*5))}));});
    setGroupMatches(nm);
    const nb=emptyBracket();const sh=[...ALL_TEAMS].sort(()=>Math.random()-.5);
    nb.r16=nb.r16.map((m,i)=>({...m,team1:sh[i*2%sh.length]||"TBD",team2:sh[(i*2+1)%sh.length]||"TBD"}));
    ["r16","qf","sf","final"].forEach(rd=>{
      nb[rd]=nb[rd].map((m,i)=>{const w=Math.random()>.5?m.team1:m.team2;const NR={r16:"qf",qf:"sf",sf:"final"};if(NR[rd]&&nb[NR[rd]][Math.floor(i/2)])nb[NR[rd]][Math.floor(i/2)][i%2===0?"team1":"team2"]=w;return{...m,winner:w};});
    });
    nb.third[0]={...nb.third[0],team1:pick(ALL_TEAMS),team2:pick(ALL_TEAMS),winner:pick(ALL_TEAMS)};
    setExtras({champion:pick(ALL_TEAMS),goldenBoot:pick(PLAYERS_LIST),bestPlayer:pick(PLAYERS_LIST),surpriseTeam:pick(ALL_TEAMS),flopTeam:pick(ALL_TEAMS),notes:"Chaos Mode — all bets are off.",championConf:Math.floor(Math.random()*55)+20,goldenBootConf:Math.floor(Math.random()*55)+20});
    setBracket(nb);setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");
  };

  const TABS=[{id:"groups",label:"Group Stage"},{id:"knockout",label:"Knockout"},{id:"extras",label:"Extras"},{id:"teams",label:"Teams"},{id:"summary",label:"Summary"}];

  const TAB_ICONS={groups:"⚽",knockout:"🏆",extras:"⭐",teams:"🌍",summary:"📋"};

  return(
    <div style={{width:"100vw",minHeight:"100vh",background:T.bg,color:T.text,fontFamily:T.ff,display:"flex",flexDirection:"column",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700;900&display=swap" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{width:100%;min-height:100vh;overflow-x:hidden;background:#080a0f;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.2);}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        select option{background:#0f1117;color:#eef0f4;}
        select{-webkit-appearance:none;appearance:none;}
        button{-webkit-tap-highlight-color:transparent;}
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

      {/* ── DESKTOP TOP BAR ── */}
      <header className="desktop-nav" style={{flexShrink:0,background:T.surface,borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:200}}>
        <div style={{padding:"0 24px",display:"flex",alignItems:"center",gap:0,height:54}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginRight:28,flexShrink:0}}>
            <span style={{fontSize:20,lineHeight:1}}>🏆</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:T.text,lineHeight:1.1,fontFamily:T.ffd}}>WC 2026</div>
              <div style={{fontSize:9,color:T.sub,letterSpacing:1.5,textTransform:"uppercase"}}>Predictor</div>
            </div>
          </div>
          <nav style={{display:"flex",gap:0,flex:1,overflowX:"auto",height:"100%"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                height:"100%",padding:"0 16px",border:"none",
                borderBottom:`3px solid ${tab===t.id?T.gold:"transparent"}`,
                borderTop:"3px solid transparent",
                background:"transparent",color:tab===t.id?T.gold:T.sub,
                fontFamily:T.ff,fontSize:13,fontWeight:tab===t.id?600:400,
                cursor:"pointer",transition:"color .15s",whiteSpace:"nowrap",
                display:"flex",alignItems:"center",gap:6,
              }}>
                <span style={{fontSize:14}}>{TAB_ICONS[t.id]}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
          <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:12,flexShrink:0}}>
            <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Your name"
              style={{padding:"7px 12px",background:T.raised,border:`1px solid ${T.border}`,borderRadius:7,color:T.text,fontFamily:T.ff,fontSize:12,width:120,outline:"none"}}/>
            <button onClick={chaosMode} style={{padding:"7px 12px",border:`1px solid ${T.border}`,borderRadius:7,background:"transparent",color:T.sub,fontFamily:T.ff,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>💀 Chaos</button>
            <button onClick={()=>{setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");}} style={{padding:"7px 14px",border:"none",borderRadius:7,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Done ✓</button>
          </div>
        </div>
      </header>

      {/* ── MOBILE TOP BAR ── */}
      <header className="mobile-nav" style={{flexShrink:0,background:T.surface,borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:200,padding:"10px 14px",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>🏆</span>
          <div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:T.ffd}}>WC 2026</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Your name"
            style={{padding:"6px 10px",background:T.raised,border:`1px solid ${T.border}`,borderRadius:7,color:T.text,fontFamily:T.ff,fontSize:12,width:100,outline:"none"}}/>
          <button onClick={()=>{setConfetti(true);setTimeout(()=>setConfetti(false),5500);setTab("summary");}} style={{padding:"6px 12px",border:"none",borderRadius:7,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:12,fontWeight:700,cursor:"pointer"}}>Done ✓</button>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="main-pad" style={{flex:1,padding:"24px 24px 80px",maxWidth:"100%",boxSizing:"border-box"}}>
        {tab==="groups"   && <GroupStage groupMatches={groupMatches} updateMatch={updateMatch}/>}
        {tab==="knockout" && <KnockoutStage bracket={bracket} setWinner={setWinner} setBracket={setBracket} groupMatches={groupMatches}/>}
        {tab==="extras"   && <ExtrasSection extras={extras} setExtras={setExtras}/>}
        {tab==="teams"    && <TeamsSection/>}
        {tab==="summary"  && <SummaryPage groupMatches={groupMatches} bracket={bracket} extras={extras} userName={userName}/>}
      </main>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav className="mobile-nav" style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:300,
        background:T.surface,borderTop:`1px solid ${T.border}`,
        display:"flex",alignItems:"stretch",
        paddingBottom:"env(safe-area-inset-bottom)",
      }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1,border:"none",background:"transparent",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            gap:3,padding:"8px 2px 6px",cursor:"pointer",
            borderTop:`2px solid ${tab===t.id?T.gold:"transparent"}`,
            transition:"all .15s",
          }}>
            <span style={{fontSize:18,lineHeight:1}}>{TAB_ICONS[t.id]}</span>
            <span style={{fontSize:9,fontWeight:tab===t.id?700:400,color:tab===t.id?T.gold:T.sub,letterSpacing:.3,fontFamily:T.ff,textTransform:"uppercase"}}>{t.label.split(" ")[0]}</span>
          </button>
        ))}
        <button onClick={chaosMode} style={{
          flex:1,border:"none",background:"transparent",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          gap:3,padding:"8px 2px 6px",cursor:"pointer",
          borderTop:"2px solid transparent",
        }}>
          <span style={{fontSize:18,lineHeight:1}}>💀</span>
          <span style={{fontSize:9,fontWeight:400,color:T.sub,letterSpacing:.3,fontFamily:T.ff,textTransform:"uppercase"}}>Chaos</span>
        </button>
      </nav>
    </div>
  );
}

// ─── GROUP STAGE ─────────────────────────────────────────────────────────────
function GroupStage({groupMatches,updateMatch}){
  return(
    <div>
      <SectionHead label="Group Stage" sub="All 12 official groups — FIFA World Cup 2026. Enter your predicted scorelines and standings update live."/>
      <div className="group-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:18}}>
        {Object.keys(WC_GROUPS).map(g=><GroupCard key={g} group={g} matches={groupMatches[g]} onUpdate={(i,f,v)=>updateMatch(g,i,f,v)}/>)}
      </div>
    </div>
  );
}
function ScoreInput({value,onChange}){
  return(
    <input
      type="number" min="0" max="20"
      value={value}
      onChange={onChange}
      style={{
        width:42,height:42,textAlign:"center",
        background:value!==""?"rgba(212,175,55,0.12)":"rgba(255,255,255,0.05)",
        border:`1.5px solid ${value!==""?"rgba(212,175,55,0.5)":"rgba(255,255,255,0.1)"}`,
        borderRadius:8,
        color:value!==""?T.goldBright:T.sub,
        fontSize:18,fontWeight:800,fontFamily:"inherit",
        outline:"none",
        transition:"all .15s",
        boxSizing:"border-box",
      }}
    />
  );
}

function MatchRow({m,i,onUpdate}){
  const hg=parseInt(m.homeGoals),ag=parseInt(m.awayGoals);
  const played=!isNaN(hg)&&!isNaN(ag);
  const homeWin=played&&hg>ag,awayWin=played&&ag>hg,draw=played&&hg===ag;
  return(
    <div style={{
      display:"flex",alignItems:"center",gap:0,
      padding:"10px 10px",
      background:T.raised,
      borderRadius:10,
      marginBottom:6,
      border:`1px solid ${T.border}`,
      position:"relative",
      overflow:"hidden",
    }}>
      {/* Home team */}
      <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
        <Flag team={m.home} size={22} radius={3}/>
        <span style={{
          fontSize:13,fontWeight:homeWin?700:500,
          color:homeWin?T.text:played?T.sub:T.text,
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
        }}>{teamName(m.home)}</span>
      </div>

      {/* Score box */}
      <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,padding:"0 10px"}}>
        <ScoreInput value={m.homeGoals} onChange={e=>onUpdate(i,"homeGoals",e.target.value)}/>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,width:18}}>
          <span style={{fontSize:9,color:T.muted,fontWeight:600,letterSpacing:.5}}>VS</span>
          {played&&<span style={{fontSize:8,color:draw?T.amber:T.muted}}>{draw?"D":""}</span>}
        </div>
        <ScoreInput value={m.awayGoals} onChange={e=>onUpdate(i,"awayGoals",e.target.value)}/>
      </div>

      {/* Away team */}
      <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0,justifyContent:"flex-end"}}>
        <span style={{
          fontSize:13,fontWeight:awayWin?700:500,
          color:awayWin?T.text:played?T.sub:T.text,
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"right",
        }}>{teamName(m.away)}</span>
        <Flag team={m.away} size={22} radius={3}/>
      </div>

      {/* Winner glow strip */}
      {played&&!draw&&(
        <div style={{
          position:"absolute",bottom:0,left:homeWin?"0":"auto",right:awayWin?"0":"auto",
          width:"30%",height:2,
          background:`linear-gradient(${homeWin?"90deg":"270deg"},${T.green},transparent)`,
        }}/>
      )}
    </div>
  );
}

function GroupCard({group,matches,onUpdate}){
  const teams=WC_GROUPS[group].teams,standings=computeStandings(teams,matches);
  const filledCount=matches.filter(m=>m.homeGoals!==""&&m.awayGoals!=="").length;
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:T.card}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${T.gold}22,${T.gold}11)`,border:`1px solid ${T.borderHi}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:13,fontWeight:900,color:T.gold,fontFamily:T.ffd}}>{group}</span>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,color:T.gold,textTransform:"uppercase"}}>Group {group}</div>
            <div style={{fontSize:10,color:T.sub,marginTop:1}}>{filledCount}/{matches.length} matches predicted</div>
          </div>
        </div>
        <div style={{display:"flex",gap:4}}>
          {teams.map(t=><Flag key={t} team={t} size={18} radius={3}/>)}
        </div>
      </div>

      {/* Matches */}
      <div style={{padding:"12px 14px"}}>
        {matches.map((m,i)=><MatchRow key={i} m={m} i={i} onUpdate={onUpdate}/>)}
      </div>

      {/* Standings */}
      <div style={{borderTop:`1px solid ${T.border}`,background:T.card}}>
        <div style={{padding:"6px 14px 3px",display:"flex",gap:0,fontSize:9,color:T.muted,letterSpacing:.8,textTransform:"uppercase",fontWeight:600}}>
          <span style={{flex:1}}>Team</span>
          <span style={{width:18,textAlign:"center"}}>W</span>
          <span style={{width:18,textAlign:"center"}}>D</span>
          <span style={{width:18,textAlign:"center"}}>L</span>
          <span style={{width:22,textAlign:"center"}}>GD</span>
          <span style={{width:26,textAlign:"right"}}>Pts</span>
          <span style={{width:14}}/>
        </div>
        {standings.map((t,i)=>{
          const qualified=i<2,third=i===2;
          return(
            <div key={t.name} style={{
              display:"flex",alignItems:"center",gap:0,
              padding:"7px 16px",
              borderTop:`1px solid ${T.border}`,
              background:qualified?"rgba(52,211,153,0.04)":"transparent",
              transition:"background .15s",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
                <span style={{
                  width:20,height:20,borderRadius:5,flexShrink:0,
                  background:qualified?T.greenBg:third?"rgba(96,165,250,0.15)":"rgba(255,255,255,0.04)",
                  color:qualified?T.green:third?T.blue:T.muted,
                  fontSize:10,fontWeight:700,
                  display:"inline-flex",alignItems:"center",justifyContent:"center",
                }}>{i+1}</span>
                <Flag team={t.name} size={18} radius={3}/>
                <span style={{fontSize:12,fontWeight:qualified?600:400,color:qualified?T.text:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{teamName(t.name)}</span>
              </div>
              <span style={{width:18,textAlign:"center",fontSize:11,color:T.muted}}>{t.w}</span>
              <span style={{width:18,textAlign:"center",fontSize:11,color:T.muted}}>{t.d}</span>
              <span style={{width:18,textAlign:"center",fontSize:11,color:T.muted}}>{t.l}</span>
              <span style={{width:22,textAlign:"center",fontSize:11,color:t.gd>0?T.green:t.gd<0?T.red:T.muted,fontWeight:t.gd!==0?600:400}}>{t.gd>0?"+"+t.gd:t.gd}</span>
              <span style={{width:26,textAlign:"right",fontSize:12,fontWeight:700,color:qualified?T.text:T.sub}}>{t.pts}</span>
              <span style={{width:16,textAlign:"right"}}>
                {qualified?<span style={{fontSize:8,color:T.green,fontWeight:700,background:T.greenBg,padding:"1px 4px",borderRadius:3}}>Q</span>
                :third?<span style={{fontSize:8,color:T.blue,fontWeight:700,background:"rgba(96,165,250,0.1)",padding:"1px 4px",borderRadius:3}}>3</span>
                :<span style={{fontSize:8,color:T.muted}}>—</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── KNOCKOUT ─────────────────────────────────────────────────────────────────
// Real WC2026 R16 matchup mapping: slot index -> [group1winner, group2winner]
// Format: [groupLetter, position] where position 0=1st, 1=2nd
const R16_MATCHUPS = [
  [["A",0],["B",1]], // 1A vs 2B
  [["C",0],["D",1]], // 1C vs 2D
  [["E",0],["F",1]], // 1E vs 2F
  [["G",0],["H",1]], // 1G vs 2H
  [["I",0],["J",1]], // 1I vs 2J
  [["K",0],["L",1]], // 1K vs 2L
  [["B",0],["A",1]], // 1B vs 2A
  [["D",0],["C",1]], // 1D vs 2C
  [["F",0],["E",1]], // 1F vs 2E
  [["H",0],["G",1]], // 1H vs 2G
  [["J",0],["I",1]], // 1J vs 2I
  [["L",0],["K",1]], // 1L vs 2K
  // last 4 are best 3rd place teams — left as manual
  null, null, null, null,
];

function KnockoutStage({bracket,setWinner,setBracket,groupMatches}){

  // Derive group standings from current match results
  const getQualified = () => {
    const q = {};
    Object.keys(WC_GROUPS).forEach(g => {
      const st = computeStandings(WC_GROUPS[g].teams, groupMatches[g]);
      q[g] = st; // full sorted standings array
    });
    return q;
  };

  // Auto-fill R16 from group stage results
  const autoFillR16 = () => {
    const q = getQualified();
    setBracket(prev => {
      const nb = {...prev};
      const newR16 = prev.r16.map((m, i) => {
        const mu = R16_MATCHUPS[i];
        if (!mu) return m; // best 3rd place slots — leave manual
        const [[g1, p1], [g2, p2]] = mu;
        const t1 = q[g1]?.[p1]?.name || "";
        const t2 = q[g2]?.[p2]?.name || "";
        return {...m, team1: t1, team2: t2, winner: ""};
      });
      nb.r16 = newR16;
      // Clear downstream rounds
      nb.qf = prev.qf.map(m=>({...m,team1:"",team2:"",winner:""}));
      nb.sf = prev.sf.map(m=>({...m,team1:"",team2:"",winner:""}));
      nb.final = [{...prev.final[0],team1:"",team2:"",winner:""}];
      nb.third = [{...prev.third[0],team1:"",team2:"",winner:""}];
      return nb;
    });
  };

  // Manually update a single R16 team slot
  const setR16Team = (matchIdx, slot, team) => {
    setBracket(prev => {
      const nb = {...prev};
      const newR16 = [...nb.r16];
      newR16[matchIdx] = {...newR16[matchIdx], [slot]: team, winner: ""};
      nb.r16 = newR16;
      return nb;
    });
  };

  const allGroupsDone = Object.keys(WC_GROUPS).every(g =>
    groupMatches[g].every(m => m.homeGoals !== "" && m.awayGoals !== "")
  );
  const someGroupsDone = Object.keys(WC_GROUPS).some(g =>
    groupMatches[g].some(m => m.homeGoals !== "" && m.awayGoals !== "")
  );

  return(
    <div>
      <SectionHead label="Knockout Stage"/>

      {/* Auto-fill banner */}
      <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",marginBottom:28,marginTop:-14,padding:"16px 20px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12}}>
        <div style={{fontSize:28,flexShrink:0}}>{allGroupsDone?"✅":someGroupsDone?"⏳":"💡"}</div>
        <div style={{flex:1,minWidth:180}}>
          <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:3}}>
            {allGroupsDone?"Groups complete — ready to auto-fill":someGroupsDone?"Groups partially filled":"Start by predicting Group Stage scores"}
          </div>
          <div style={{fontSize:12,color:T.sub}}>
            {allGroupsDone?"Click to populate all R32 slots from your group predictions.":someGroupsDone?"Partial auto-fill available — empty slots will remain for manual pick.":"Or skip ahead and pick teams manually using the dropdowns in each slot below."}
          </div>
        </div>
        <button
          onClick={autoFillR16}
          style={{padding:"10px 20px",border:"none",borderRadius:8,background:`linear-gradient(135deg,${T.goldBright},${T.gold})`,color:"#000",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}
        >
          Auto-Fill from Groups →
        </button>
      </div>

      {/* Mobile hint */}
      <div className="bracket-hint" style={{display:"none",marginBottom:16,padding:"10px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,fontSize:12,color:T.sub}}>
        📱 Scroll right to see the full bracket, or use the round buttons below to jump to each stage.
      </div>

      {/* Mobile round jump buttons */}
      <div className="mobile-only" style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {[["r32","R32"],["qf","QF"],["sf","SF"],["f","Final"]].map(([id,lbl])=>(
          <a key={id} href={`#bracket-${id}`} style={{padding:"6px 14px",border:`1px solid ${T.border}`,borderRadius:20,background:T.card,color:T.sub,fontSize:11,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>
            {lbl}
          </a>
        ))}
      </div>

      <div style={{overflowX:"auto",paddingBottom:12,WebkitOverflowScrolling:"touch"}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",minWidth:900,padding:"4px 0"}}>
          <div style={{flex:2.2}} id="bracket-r32">
            <RoundLabel>Round of 32</RoundLabel>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {bracket.r16.map((m,i)=>{
                // Build the allowed team list for each slot based on R16_MATCHUPS
                const mu = R16_MATCHUPS[i];
                let slot1Teams = ALL_TEAMS; // best-3rd slots: any team
                let slot2Teams = ALL_TEAMS;
                let slot1Label = "team1";
                let slot2Label = "team2";
                if(mu){
                  const [[g1,p1],[g2,p2]] = mu;
                  slot1Teams = WC_GROUPS[g1].teams;
                  slot2Teams = WC_GROUPS[g2].teams;
                  slot1Label = `${p1===0?"1st":"2nd"} in Group ${g1}`;
                  slot2Label = `${p2===0?"1st":"2nd"} in Group ${g2}`;
                }
                return(
                  <BracketCard
                    key={m.id}
                    match={m}
                    onWinner={w=>setWinner("r16",i,w)}
                    onTeamChange={(slot,team)=>setR16Team(i,slot,team)}
                    isR16
                    slot1Teams={slot1Teams}
                    slot2Teams={slot2Teams}
                    slot1Label={slot1Label}
                    slot2Label={slot2Label}
                  />
                );
              })}
            </div>
          </div>
          <div style={{flex:1.5}} id="bracket-qf">
            <RoundLabel>Quarter-Finals</RoundLabel>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {bracket.qf.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("qf",i,w)}/>)}
            </div>
          </div>
          <div style={{flex:1}} id="bracket-sf">
            <RoundLabel>Semi-Finals</RoundLabel>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {bracket.sf.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("sf",i,w)}/>)}
            </div>
          </div>
          <div style={{flex:.9}} id="bracket-f">
            <RoundLabel gold>Final</RoundLabel>
            {bracket.final.map((m,i)=><BracketCard key={m.id} match={m} onWinner={w=>setWinner("final",i,w)} isFinal/>)}
            <div style={{height:1,background:T.border,margin:"16px 0 8px"}}/>
            <div style={{fontSize:10,color:T.sub,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>3rd Place</div>
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
      <SectionHead label="Extra Predictions"/>
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
function ShareCard({userName,champion,extras,bracket,groupMatches}){
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
function SummaryPage({groupMatches,bracket,extras,userName}){
  const summaryRef=useRef(null);
  const shareCardRef=useRef(null);
  const [exporting,setExporting]=useState(false);
  const [sharing,setSharing]=useState(false);
  const [shareImg,setShareImg]=useState(null);
  const [showShareModal,setShowShareModal]=useState(false);
  const [actionMsg,setActionMsg]=useState("");
  const champion=bracket.final[0]?.winner||extras.champion;

  const flash=(msg,ms=2500)=>{setActionMsg(msg);setTimeout(()=>setActionMsg(""),ms);};

  // Load html2canvas once
  const ensureHtml2Canvas=async()=>{
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  };

  // Generate the share card image
  const generateShareImage=async()=>{
    setSharing(true);
    setActionMsg("Generating image...");
    try{
      await ensureHtml2Canvas();
      const el=shareCardRef.current;
      if(!el) throw new Error("Share card ref not found");
      // Make visible for capture
      el.style.visibility="visible";
      el.style.zIndex="9999";
      await new Promise(r=>setTimeout(r,200)); // let fonts/flags render
      const cv=await window.html2canvas(el,{
        scale:2,
        useCORS:true,
        allowTaint:true,
        backgroundColor:"#080a0f",
        logging:false,
        width:600,
        windowWidth:600,
      });
      // Hide again
      el.style.visibility="hidden";
      el.style.zIndex="-1";
      const dataUrl=cv.toDataURL("image/png");
      setShareImg(dataUrl);
      setShowShareModal(true);
      setActionMsg("");
    }catch(e){
      console.error("Share image error:",e);
      flash("❌ Could not generate image — check console for details");
    }
    setSharing(false);
  };

  // Download the share image
  const downloadImage=()=>{
    const a=document.createElement("a");
    a.href=shareImg;
    a.download=`WC2026_${(userName||"Prediction").replace(/\s+/g,"_")}.png`;
    a.click();
    flash("✓ Image downloaded!");
  };

  // Copy image to clipboard
  const copyImage=async()=>{
    try{
      const res=await fetch(shareImg);
      const blob=await res.blob();
      await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);
      flash("✓ Copied to clipboard!");
    }catch(e){
      flash("⚠ Copy not supported — use download instead");
    }
  };

  // Share text builders
  const buildShareText=()=>{
    const parts=[];
    if(champion) parts.push(`🏆 My WC2026 winner: ${teamName(champion)} (${extras.championConf||"?"}% confidence)`);
    if(extras.goldenBoot) parts.push(`👟 Golden Boot: ${extras.goldenBoot.split("(")[0].trim()}`);
    if(extras.surpriseTeam) parts.push(`🚀 Dark horse: ${teamName(extras.surpriseTeam)}`);
    if(extras.flopTeam) parts.push(`💀 Biggest flop: ${teamName(extras.flopTeam)}`);
    parts.push("Make your own predictions 👉 worldcup2026.app");
    parts.push("#WorldCup2026 #WC2026 #FootballPredictions");
    return parts.join("\n");
  };

  const shareToTwitter=()=>{
    const text=encodeURIComponent(buildShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`,"_blank");
  };

  const shareToWhatsApp=()=>{
    const text=encodeURIComponent(buildShareText());
    window.open(`https://wa.me/?text=${text}`,"_blank");
  };

  const copyText=async()=>{
    try{
      await navigator.clipboard.writeText(buildShareText());
      flash("✓ Text copied!");
    }catch(e){
      flash("⚠ Could not copy");
    }
  };

  // PDF export
  const exportPDF=async()=>{
    setExporting(true);flash("Preparing PDF...","99999");
    try{
      await ensureHtml2Canvas();
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      flash("Rendering...");
      const cv=await window.html2canvas(summaryRef.current,{scale:2,useCORS:true,backgroundColor:"#080a0f",logging:false});
      const img=cv.toDataURL("image/png");
      const{jsPDF}=window.jspdf;
      const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const pw=210,ph=297,ih=(cv.height*pw)/cv.width;let y=0;
      while(y<ih){if(y>0)pdf.addPage();pdf.addImage(img,"PNG",0,-y,pw,ih);y+=ph;}
      pdf.save(`WC2026_${(userName||"Prediction").replace(/\s+/g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`);
      flash("✓ PDF downloaded!");
    }catch(e){flash("⚠ Trying print...");setTimeout(()=>window.print(),300);}
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
          groupMatches={groupMatches}
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
              {/* Image actions */}
              <div style={{display:"flex",gap:8}}>
                <button onClick={downloadImage} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:T.gold,color:"#000",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  ⬇ Download Image
                </button>
                <button onClick={copyImage} style={{flex:1,padding:"10px",border:`1px solid ${T.border}`,borderRadius:8,background:T.raised,color:T.text,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  📋 Copy Image
                </button>
              </div>

              {/* Social share */}
              <div style={{fontSize:10,color:T.muted,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600,marginTop:4}}>Share text + link</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={shareToTwitter} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#1DA1F2",color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  𝕏 Post on X
                </button>
                <button onClick={shareToWhatsApp} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#25D366",color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  💬 WhatsApp
                </button>
                <button onClick={copyText} style={{flex:1,padding:"10px",border:`1px solid ${T.border}`,borderRadius:8,background:T.raised,color:T.text,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  🔗 Copy Text
                </button>
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
            style={{padding:"10px 18px",border:`1px solid ${T.borderHi}`,borderRadius:8,background:T.goldSoft,color:T.gold,fontFamily:T.ff,fontSize:13,fontWeight:700,cursor:"pointer",opacity:sharing?0.7:1,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}
          >
            {sharing?"Generating...":"📤 Share Predictions"}
          </button>
          <button
            onClick={exportPDF}
            disabled={exporting}
            style={{padding:"10px 18px",border:"none",borderRadius:8,background:T.gold,color:"#000",fontFamily:T.ff,fontSize:13,fontWeight:700,cursor:"pointer",opacity:exporting?0.7:1,whiteSpace:"nowrap"}}
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
            <div style={{fontSize:11,letterSpacing:2,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>Group Stage</div>
            <div className="summary-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
              {Object.keys(WC_GROUPS).map(g=>{
                const st=computeStandings(WC_GROUPS[g].teams,groupMatches[g]);
                return(
                  <div key={g} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden"}}>
                    <div style={{padding:"7px 12px",borderBottom:`1px solid ${T.border}`,fontSize:10,fontWeight:700,letterSpacing:1.5,color:T.gold,textTransform:"uppercase"}}>Group {g}</div>
                    {st.map((t,i)=>(
                      <div key={t.name} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",borderBottom:i<3?`1px solid rgba(255,255,255,0.04)`:"none"}}>
                        <span style={{fontSize:9,color:i<2?T.green:T.sub,fontWeight:700}}>{i+1}</span>
                        <Flag team={t.name} size={14} radius={2}/>
                        <span style={{fontSize:11,flex:1,color:i<2?T.text:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{teamName(t.name)}</span>
                        <span style={{fontSize:11,fontWeight:700,color:T.sub}}>{t.pts}p</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,letterSpacing:2,color:T.sub,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>Knockout Stage</div>
            {[{key:"r16",label:"Round of 32"},{key:"qf",label:"Quarter-Finals"},{key:"sf",label:"Semi-Finals"},{key:"final",label:"Final"}].map(({key,label})=>{
              const winners=bracket[key].filter(m=>m.winner);
              if(!winners.length)return null;
              return(
                <div key={key} style={{marginBottom:12}}>
                  <div style={{fontSize:10,color:T.sub,letterSpacing:1.5,textTransform:"uppercase",marginBottom:7,fontWeight:600}}>{label}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {winners.map((m,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:6}}>
                        <Flag team={m.winner} size={14} radius={2}/>
                        <span style={{fontSize:12,fontWeight:600,color:T.text}}>{teamName(m.winner)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {extras.notes&&(
            <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,padding:"14px 16px"}}>
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