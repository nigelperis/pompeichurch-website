export const languages = {
  en: "English",
  kok: "ಕೊಂಕಣಿ",
} as const;

export const defaultLang: keyof typeof languages = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about-us": "About Us",
    "nav.associations": "Associations",
    "nav.wards": "Wards",
    "nav.news": "News",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.parish-history": "Parish History",
    "nav.parish-priests-and-deacons": "Parish Priests and Deacons",
    "nav.parish-pastoral-council": "Parish Pastoral Council",
    "nav.parish-finance-committee": "Parish Finance Committee",
    "nav.pompei-sabha-bhavan": "Pompei Sabha Bhavan",
    "nav.centenary-hall": "Centenary Hall",
    "nav.parish-pastoral-21-commissions": "Parish Pastoral 21 Commissions",
    "nav.ex-vp-secretaries": "Ex Vice-Presidents and Secretaries",
    "nav.religious-vocations": "Religious Vocations",
    "nav.institutions": "Institutions",
    "nav.convents": "Convents",
    "nav.halls": "Halls",
    "nav.svp": "SVP",
    "nav.icym-pyc": "ICYM-PYC",
    "nav.altar-servers": "Altar Servers",
    "nav.catholic-sabha": "Catholic Sabha",
    "nav.ycs": "YCS",
    "nav.secular-franciscan": "Secular Franciscan",
    "nav.catechism": "Catechism",
    "nav.small-christian-community": "Small Christian Community",
    "nav.gurpur-choir": "Gurpur Church Choir",
    "nav.womens-forum": "Women’s Forum",
    "nav.christian-life-community": "Christian Life Community",
    "nav.kowdoor-a-ward": "Kowdoor A",
    "nav.kowdoor-b-ward": "Kowdoor B",
    "nav.monel-ward": "Monel",
    "nav.gurpur-ward": "Gurpur",
    "nav.church-ward": "Church",
    "nav.pompei-a-ward": "Pompei A",
    "nav.pompei-b-ward": "Pompei B",
    "nav.kandar-a-ward": "Kandar A",
    "nav.kandar-b-ward": "Kandar B",
    "nav.addoor-ward": "Addoor",
    "nav.obituary": "Obituary",
    "nav.events": "Events",
    "nav.pompeichem-falkem": "Pompeichem Falkem",
    "nav.prayer-corner": "Prayer Corner",
    "landing.church-name": "Our Lady of Pompei Church",
    "landing.town-name": "Gurpur Kaikamba",
    "landing.priest": "Parish Priest",
    "landing.priest-speaks": "Parish Priest Speaks",
    "landing.pastoral-commission-coordinator":
      "21 Pastoral Commissions Coordinator",
    "landing.pastoral-commission-coordinator-name": "Mrs. Hilda Menezes",
    "landing.about-church": "ABOUT POMPEI CHURCH",
    "landing.pastoral-parishad": "Parish Pastoral Council Core Committee",
    "parish.pastoral-parishad": "Parish Pastoral Council",
    "landing.mass-timings": "Mass Timings",
    "landing.adoration-note": "(Adoration every first Sunday of the Month)",
    "landing.mon-sat": "Monday - Saturday",
    "landing.friday": "Friday:",
    "landing.friday-note": "Chaplet of Divine Mercy & Mass",
    "landing.saturday": "Saturday",
    "landing.saturday-note": "Sunday Liturgy",
    "landing.sunday": "Sunday",
    "landing.daily-mass": "Daily Mass",
    "landing.catechism": "Catechism",
    "landing.catechism-note": "Sundays at 9:15 AM (Except first Sunday)",
    "landing.novena": "Novena",
    "landing.novena-note": "Saturday and Sunday after Mass",
    "landing.follow-our-journey": "Follow Our Journey",
    "landing.upcoming-events": "Upcoming Events",
    "parish-priests": "Parish Priests",
    deacons: "Deacons",
    "pp.subtitle":
      "Here is a glimpse of the esteemed former parish priests and deacons who have nurtured our faith, enriched our community and individual lives, and upheld the cherished legacy of our church throughout these years.",
    "ui.more-button-know": "KNOW MORE",
    "ui.more-button-show": "SHOW MORE",
    "ui.more-button-read": "Read More",
    "ui.show-more-events": "Show More Events",
    "ui.view-all": "View All",
    "contact.title": "Contact Us",
    "history.title": "Our History",
    "history.subtitle":
      "A Glimpse on the history of Our Lady of Pompei Church Gurpur",
    "history.sweet-memories": "Sweet Memories",
    "gallery.title": "Gallery",
    "gallery.subtitle": "Capturing moments of grace",
    "priest.service-period": "Service Period",
    "bethany.title": "Bethany School (CBSE)",
    "rosamystica.title": "Rosa Mystica Educational Institutions",
    "rosamystica.higher-primary-school": "Rosa Mystica Higher Primary School",
    "rosamystica.high-school":
      "Rosa Mystica High School, Kinnikambla, Mangalore",
    "rosamystica.p-u-college":
      "Rosa Mystica PU College, Kinnikambla, Mangalore",
    "jeevadaan.title": "Jeevadaan",
    "snehasadan.title": "Snehasadan",
    "pompeiconvent.title": "Pompei Convent",
    "rosamysticaconvent.title": "Rosa Mystica Convent",
    "hall.title": "Pompei Sabha Bhavan",
    "centenaryhall.title": "Centenary Hall",
    "church.patron": "Vailankani Mai",
    "obituary.subtitle": "Tribute of love ",
    "commissions.convenor": "Convenor ",
    "commissions.heading": "Commission",
    "commissions.secretary": "Secretary",
    "associations.about-us": "About our Association",
    "associations.office-bearers": "Office Bearers",
    "ward.kowdoor-a-ward": "Kowdoor A",
    "ward.kowdoor-b-ward": "Kowdoor B",
    "ward.monel-ward": "Monel",
    "ward.gurpur-ward": "Gurpur",
    "ward.church-ward": "Church",
    "ward.pompei-a-ward": "Pompei A",
    "ward.pompei-b-ward": "Pompei B",
    "ward.kandar-a-ward": "Kandar A",
    "ward.kandar-b-ward": "Kandar B",
    "ward.addoor-ward": "Addoor",
    "ward.gurkar": "Gurkar",
    "ward.gurkarn": "Gurkarn",
    "ward.pratinidi": "Representative",
    "ward.family": "No. of Families",
    "ward.patron": "Dedicated to",
    "ward.patron-addoor": "Holy Family",
    "ward.patron-church": "Our Lady of Vailankani",
    "ward.patron-gurpur": "Our Lady of Fatima",
    "ward.patron-kandar-a": "Our Lady of Mount Mary",
    "ward.patron-kandar-b": "Our Lady of Rosary",
    "ward.patron-kowdoor-a": "Our Lady of Immaculate Conception",
    "ward.patron-kowdoor-b": "Our Lady of Carmel",
    "ward.patron-pompei-a": "Our Lady of Pompei",
    "ward.patron-pompei-b": "Our Lady of Perpetual Succour",
    "ward.patron-monel": "St. Anna",
    "ward.select-label": "Select Ward…",
    "president-male": "President",
    "president-female": "President",
    "coordinator-male": "Coordinator",
    "coordinator-female": "Coordinator",
    "choir-master": "Choir Master",
    representative: "Representative",
    secretary: "Secretary",
    "convenor-male": "Convenor",
    "convenor-female": "Convenor",
    prefect: "Prefect ",
    "animator-male": "Animator",
    "animator-female": "Animator",
    animators: "Animators",
    "prayer.lets-join-hands-in-prayer": `Let's join hands in prayer`,
    "prayer.novena-of-our-lady-of-pompei": "Novena of Our Lady of Pompei",
    "prayer.pray-for-us": "Our Lady of Pompei, Pray for us all",
    "prayer.psalms": "Psalms",
    "prayer.pope-intention": `Pope's Monthly Intention`,
    "prayer.jubliee-2025": "Jubliee 2025",
    "contact.address": "Gurpur, Kinnikambla, Mangaluru",
    "contact.mon-sat": "Mon-Sat:",
    "vpsec.title": "Ex Vice-Presidents and Secretaries in Parish Mission",
    "vpsec.subtitle": `From the day our parish came into existence, along with the parish priest, many lay leaders contributed their services to the all-around growth of the parish. Lay leaders were initially referred to as 'Treasurers.' Later, they were called 'Administrators', and now they are known as 'Vice-Presidents'. Through the sacrifices and wholehearted service of these individuals, our parish was able to celebrate its centenary. Here is a glimpse of all the leaders who have served in our parish!`,
    "vpsec.subtitle1": "Treasurers",
    "vpsec.subtitle2": "Administrators",
    "vpsec.subtitle3": "Vice Presidents",
    "vpsec.subtitle4": "Secretaries",
    "treasurer.parodrigues": "Late P. A. Rodrigues",
    "treasurer.benjaminpais": "Late Benjamin Pais",
    "treasurer.rosariodsouza": "Late Rosario DSouza",
    "treasurer.kashmirtauro": "Late Kashmir Tauro",
    "treasurer.trindadpinto": "Late Trindad Pinto",
    "treasurer.rosariomendonca": "Late Rosario Mendonca",
    "treasurer.baptistrasquinha": "Late Baptist Rasquinha",
    "administrator.richardrodrigues": "Late Richard Rodrigues",
    "administrator.hilarypinto": "Late Hilary Pinto",
    "administrator.alexlobo": "Late Alex J. Lobo",
    "vp.georgepinto": "Late George Pinto",
    "vp.eliasrodrigues": "Late Elias Rodrigues",
    "vp.jeraldrasquinha": "Mr. Jerald Rasquinha",
    "vp.richardlobo": "Late Richard Lobo",
    "vp.wilfredpinto": "Late Eugin Wilfred Pinto",
    "vp.johnsonlobo": "Mr. Johnson Lobo",
    "vp.romanslobo": "Mr. Romans Lobo",
    "vp.richardfernandes": "Mr. Richard Fernandes",
    "vp.jeraldlobo": "Mr. Jerald Lobo",
    "sec.alexdsouza": "Late Alex Dsouza",
    "sec.agnesrodrigues": "Mrs. Agnes Rodrigues",
    "sec.srjacintha": "Sr. M. Jacintha",
    "sec.benedictperis": "Late Benedict Peris",
    "sec.oswaldperis": "Mr. Oswald Peris",
    "sec.jeraldrasquinha": "Mr. Jerald Rasquinha",
    "sec.wilfredpinto": "Late Eugin Wilfred Pinto",
    "sec.lillymathias": "Mrs. Lilly Mathias",
    "sec.richardfernandes": "Mr. Richard Fernandes",
    "sec.jeraldlobo": "Mr. Jerald Lobo",
    "sec.praveenlobo": "Mr. Praveen Lobo",
    "sec.johnsonlobo": "Mr. Johnson Lobo",
    "vocation.title": `A glimpse of our parishioners who have embraced religious vocations, and are spreading God's kingdom.`,
    "vocation.subtitle1": "Priests",
    "vocation.subtitle2": "Nuns",
    "vocation.ward": "Ward:",
    "vocation.dob": "Date of Birth:",
    "vocation.dod": "Date of Death:",
    "vocation.so": "S/O:",
    "vocation.do": "D/O:",
    "priest.josephlobo": "Late| Rev| Fr| Joseph N Lobo",
    "priest.paullobo": "Late| Br| Paul Lobo",
    "priest.cyrilrasquinha": "Late| Rev| Fr| Cyril Rasquinha",
    "priest.herbertpinto": "Late| Rev| Fr| Herbert Pinto",
    "priest.josephtauro": "Late| Rev| Fr| Joseph Peter Tauro",
    "priest.gilbertpinto": "Late| Rev| Fr| Gilbert Pinto",
    "priest.gregorydcunha": "Late| Rev| Fr| Gregory DCunha",
    "priest.stanydcunha": "Late| Rev| Fr| Stany DCunha",
    "priest.johnmendonca": "Rev| Fr| John Baptist Mendonca",
    "priest.felixmoras": "Rev| Fr| Felix Bajil Moras",
    "priest.andrewmoras": "Rev| Fr| Andrew Leo Moras",
    "priest.johnperis": "Rev| Fr| John Peris",
    "priest.victorlobo": "Rev| Fr| Victor Lobo",
    "priest.piuspinto": "Rev| Dr| Pius Fidelis Pinto",
    "priest.ivanmendonca": "Rev| Fr| Ivan Mendonca",
    "priest.melwynmendonca": "Rev| Fr| Melwyn Mendonca",
    "priest.richarddsouza": "Rev| Fr| Richard Francis DSouza",
    "priest.rudolphpinto": "Rev| Dr| Rudolph Raj Pinto",
    "priest.rohanmiranda": "Rev| Dr| Rohan Miranda",
    "priest.vincentsaldanha": "Rev| Fr| Vincent Saldanha",
    "priest.santoshmenezes": "Rev| Fr| Santosh Menezes",
    "priest.anilfernandes": "Rev| Fr| Anil Fernandes",
    "priest.stephenlobo": "Rev| Fr| Stephen Arun Lobo",
    "priest.prakashdcunha": "Rev| Fr| Prakash DCunha",
    "priest.roshanpinto": "Rev| Fr| Roshan Pinto",
    "priest.cyrildsouza": "Br| Cyril DSouza",
    "priest.johnrodrigues": "Rev| Fr| John Rodrigues",
    "priest.wilsonsaldanha": "Rev| Fr| Wilson Saldanha",
    "priest.secularmangalore": "Secular, Mangalore Diocese",
    "priest.seculardelhi": "Secular, Delhi Archdiocese",
    "priest.secularchikkmangalore": "Secular, Chikkamangalore Diocese",
    "priest.capuchin": "Capuchin",
    "priest.secularkarwar": "Secular, Karwar Diocese",
    "priest.secularshivmogga": "Secular, Shivamogga Diocese",
    "priest.secularnagpur": "Secular, Nagpur Diocese",
    "priest.secularlucknow": "Secular, Lucknow Diocese",
    "priest.carmelite": "Carmelite",
    "priest.svd": "SVD",
    "priest.jesuitorder": "Jesuit Order",
    "priest.jesuit": "Jesuit",
    "priest.kowdoor-a": "Kowdoor A",
    "priest.kowdoor-b": "Kowdoor B",
    "priest.pompei-a": "Pompei A",
    "priest.pompei-b": "Pompei B",
    "priest.kandar-a": "Kandar A",
    "priest.kandar-b": "Kandar B",
    "priest.church": "Church",
    "priest.monel": "Monel",
    "priest.gurpur": "Gurpur",
    "priest.marcellobo": "Late| Marcel Lobo, Late| Magdaline DSouza",
    "priest.baltazarlobo": "Late| Baltazar Lobo, Late| Magdaline DSouza",
    "priest.ignasiusrasquniha":
      "Late| Ignatius Rasquinha, Late| Coses Rodrigues",
    "priest.trindadpinto": "Late| Trindad Pinto, Late| Brijit Saldanha",
    "priest.kashmirtauro": "Late| Kashmir Tauro, Late| Igneshia Tauro",
    "priest.eliaspinto": "Late| Elias Pinto, Late| Juvanna Lucy Rodrigues",
    "priest.denisdcunha": "Late| Denis DCunha, Late| Mary DCunha",
    "priest.ruzarmendonca": "Late| Ruzar Mendonca, Late| Florine Mendonca",
    "priest.pascalmoras": "Late| Pascal Moras, Late| Pascinha Saldanha",
    "priest.lawrenceperis": "Mr Lawrence Peris, Mr Cecilia Coelho",
    "priest.pascallobo": "Late| Pascal Lobo, Late| Alice DSouza",
    "priest.lawrencepinto": "Late| Lawrence Fredrik Pinto, Mrs Stella Lobo",
    "priest.aloysiusmendonca": "Mr Aloysius Mendonca, Late| Juliana Mendonca",
    "priest.gabrielmendonca": "Late| Gabriel Mendonca, Mrs Celine Mendonca",
    "priest.mouricedsouza": "Late| Mourice DSouza, Mrs Eliza Pinto",
    "priest.georgepinto": "Late| George Pinto, Late| Jeevith Pinto",
    "priest.leomiranda": "Late| Leo Miranda, Mrs Lucy Miranda",
    "priest.johnsaldanha": "Late| John Saldanha, Mrs Gertrude Saldanha",
    "priest.antonymenezes":
      "Late| Antony Francis Menezes, Late| Anna Maria Menezes",
    "priest.mauricefernandes": "Mr Maurice Fernandes, Mrs Christine Mendonca",
    "priest.williamlobo": "Late| William Lobo, Mrs Carmine Lobo",
    "priest.ijidoredcunha": "Late| Ijidore DCunha, Mrs Irene DCunha",
    "priest.norbertpinto": "Mr Norbert Pinto, Mrs Celine DSouza",
    "priest.pauldsouza": "Late| Paul DSouza, Late| Coses DSouza",
    "priest.cyrilrodrigues": "Mr Cyril Rodrigues, Mrs Leena Rodrigues",
    "priest.dominicsaldanha": "Late| Dominic Saldanha, Mrs Cynthia Saldanha",
    "nun.kowdoor-a": "Kowdoor A",
    "nun.kowdoor-b": "Kowdoor B",
    "nun.pompei-a": "Pompei A",
    "nun.pompei-b": "Pompei B",
    "nun.kandar-a": "Kandar A",
    "nun.kandar-b": "Kandar B",
    "nun.church": "Church",
    "nun.monel": "Monel",
    "nun.gurpur": "Gurpur",
    "nun.addoor": "Addoor",
    "nun.kandar": "Kandar",
    "nun.charity": "Charity",
    "nun.ocd": "O.C.D.",
    "nun.bethany": "Bethany",
    "nun.apostaliccarmel": "Apostalic Carmel",
    "nun.stanns": `St Ann's Providence`,
    "nun.salesian": "Salesian",
    "nun.angelapinto": "Late| Sr| Angela Pinto",
    "nun.agnespinto": "Late| Sr| Agnes Pinto",
    "nun.agnesdcunha": "Late| Sr| Agnes DCunha",
    "nun.emiliana": "Late| Sr| Emiliana",
    "nun.marjary": "Late| Sr| Marjary",
    "nun.marijohn": "Late| Sr| Marijohn",
    "nun.melvis": "Late| Sr| Melvis",
    "nun.regis": "Late| Sr| Regis",
    "nun.teresa": "Late| Sr| Teresa Margarette",
    "nun.afemiya": "Late| Sr| A Femiya",
    "nun.gilberta": "Late| Sr| Gilberta",
    "nun.maryperis": "Late| Sr| Mary Baptista Peris",
    "nun.marianoncietta": "Late| Sr| Maria Nuncietta",
    "nun.melwyn": "Sr| Melwyn",
    "nun.flevian": "Sr| Flevian",
    "nun.eveline": "Sr| Eveline",
    "nun.nimpha": "Sr| Nimpha",
    "nun.blanchepinto": "Sr| Blanche Pinto",
    "nun.norbertine": "Sr| Norbertine",
    "nun.felician": "Sr| Felician",
    "nun.merician": "Sr| Merician",
    "nun.mallika": "Sr| Mallika",
    "nun.dulsis": "Sr| Dulsis",
    "nun.julianamary": "Sr| Juliana Mary",
    "nun.reginald": "Sr| Reginald",
    "nun.moad": "Sr| Moad",
    "nun.marianavitha": "Sr| Maria Navitha",
    "nun.josita": "Sr| Josita",
    "nun.renuka": "Sr| Renuka",
    "nun.mariasudeepa": "Sr| Maria Sudeepa",
    "nun.irenepinto": "Sr| Irene Pinto",
    "nun.tressila": "Sr| Dr | Tresilla",
    "nun.maryjane": "Sr| Mary Jane",
    "nun.shaletsequiera": "Sr| Shalet Sequiera",
    "nun.roselita": "Sr| Roselita",
    "nun.evelinesequiera": "Sr| Eveline Sequiera",
    "nun.marylobo": "Sr| Mary Stephan Lobo",
    "nun.hildaguard": "Sr| Hildaguard",
    "nun.mariejane": "Sr| Marie Jane",
    "nun.linetdsouza": "Sr| Linet Preetha DSouza",
    "nun.jacintharodrigues": "Sr| Jacintha Rodrigues",
    "nun.mfrancis": "Sr| M Francis",
    "nun.titus": "Sr| Titus",
    "nun.allen": "Sr| Allen",
    "nun.marianpinto": "Late| Marian Pinto, Late| Magdaline Miranda",
    "nun.benjaminpinto": "Late| Benjamin Pinto, Late| Miliyana Pinto",
    "nun.martindcunha": "Late| Martin DCunha, Late| Angel Fernandes",
    "nun.bajilrodrigues": "Late| Bajil Rodrigues, Late| Benedicta Rodrigues",
    "nun.trindadpinto": "Late| Trindad Pinto, Late| Brijit Saldanha",
    "nun.antonymenezes": "Late| Antony Menezes, Late| Florine DCunha",
    "nun.vincentdcunha": "Late| Vincent DCunha, Late| Delphin Rodrigues",
    "nun.domingorodrigues":
      "Late| Domingo Rodrigues, Late| Magdaline Rodrigues",
    "nun.alexanderrodrigues":
      "Late| Alexander Rodrigues, Late| Marta Rodrigues",
    "nun.bernardperis": "Late| Bernard Peris, Late| Alice Lobo",
    "nun.francistauro": "Late| Francis Tauro, Late| Catherine Pinto",
    "nun.sebastianmiranda": "Late| Sebastian Miranda, Late| Cecilia Pereira",
    "nun.peterrodrigues": "Late| Peter Rodrigues, Late| Anna Maria Rodrigues",
    "nun.markpinto": "Late| Mark Pinto, Late| Piad Nazareth",
    "nun.jeromepinto": "Late| Jerome Pinto, Late| Juliana Nazareth",
    "nun.fredrickrodrigues":
      "Late| Fredrick Rodrigues, Late| Florine Rodrigues",
    "nun.ignatiusrodrigues":
      "Late| Ignatius Rodrigues, Late| Monti Mary Rodrigues",
    "nun.jackyrodrigues":
      "Late| Jacky Micheal Rodrigues, Late| Seraphine Rodrigues",
    "nun.hilaryvaz": "Late| Hilary Vaz, Mrs Benedicta DSouza",
    "nun.pascalrodrigues":
      "Late| Pascal Rodrigues, Late| Eliz Roseline Rodrigues",
    "nun.julianlobo": "Late| Julian Lobo, Late| Apoline Lobo",
    "nun.hilarypinto": "Late| Hilary Pinto, Late| Helen Pinto",
    "nun.ambrosepinto": "Late| Ambrose Pinto, Late| Juvanna Rodrigues",
    "nun.lawrencepinto": "Late| Lawrence Fredrick Pinto, Mrs Stella Lobo",
    "nun.alexserrao": "Late| Alex Serrao, Late| Seraphina Rodrigues",
    "nun.piadsequiera": "Late| Piad Sequiera, Late| Gertrude Pinto",
    "nun.johndsouza": "Late| John DSouza, Late| Angeline DSouza",
    "nun.thomassequiera": "Late| Thomas Sequiera, Late| Christine Pinto",
    "nun.anaclituslobo": "Late| Aanaclitus Lobo, Late| Mercine Lobo",
    "nun.felixdsouza": "Late| Felix DSouza, Late| Pauline Coelho",
    "nun.baptistdsouza": "Late| Baptist DSouza, Late| Sebina DSouza",
    "nun.plastiddsouza": "Mr Placid DSouza, Mrs Prescilla DSouza",
    "nun.albertrodrigues": "Late| Albert Rodrigues, Late| Emiliana Rodrigues",
    "nun.denisdcunha": "Late| Denis DCunha, Late| Mary DCunha",
    "events.subtitle":
      "Celebrating the moments that unite our parish community.",
    "funeral.rites": "Funeral Rites",
    "funeral.subtitle": "Parish Priest and Parishioners",
    "funeral.youtube": "Watch on YouTube",
    "push.notification":
      "Stay informed about upcoming events, event highlights, and obituaries",
    "push.enable": "Enable",
    "push.disable": "Not Now!",
    download: "Download",
  },
  kok: {
    "nav.home": "ಹೋಮ್",
    "nav.about-us": "ಆಮ್ಚಿ ಫಿರ್ಗಜ್",
    "nav.institutions": "ಸಂಸ್ಥೆ",
    "nav.associations": "ಸಂಘ್-ಸಂಸ್ಥೆ",
    "nav.wards": "ವಾಡೆ",
    "nav.news": "ಖಬ್ರೊ",
    "nav.gallery": "ಗ್ಯಾಲರಿ",
    "nav.contact": "ಸಂಪರ್ಕ್",
    "nav.parish-history": "ಫಿರ್ಗಜೆಚಿ ಚರಿತ್ರಾ",
    "nav.parish-priests-and-deacons": "ಫಿರ್ಗಜೆಚೆ ವಿಗಾರ್ ಅನಿ ದಿಯಾಕೊನ್",
    "nav.parish-pastoral-council": "ಫಿರ್ಗಜ್ ಗೊವ್ಳಿಕ್ ಪರಿಷಧ್",
    "nav.parish-finance-committee": "ಫಿರ್ಗಜ್ ಆರ್ಥಿಕ್ ಸಮಿತಿ",
    "nav.parish-pastoral-21-commissions": "21 ಆಯೋಗ್",
    "nav.ex-vp-secretaries": "ಫಿರ್ಗಜೆoತ್ ಸೆವಾ ದಿಲ್ಲೆ ಉಪಾಧ್ಯಕ್ಷ್ ಅನಿ ಕಾರ್ಯದರ್ಶಿ",
    "nav.religious-vocations": "ಆಮ್ಚ್ಯೆ ಫಿರ್ಗಜಿಂತ್ಲಿ ಧಾರ್ಮಿಕಾಂ",
    "nav.convents": "ಕೊವೆಂತಾಂ",
    "nav.halls": "ಸಭಾ ಸಾಲಾಂ",
    "nav.svp": "ಸಾಂ. ವಿಶೆಂತ್ ಪಾವ್ಲ್ ಸಭಾ",
    "nav.icym-pyc": "ಐ.ಸಿ.ವೈ.ಎಮ್.-ಪಿ.ವೈ.ಸಿ.",
    "nav.altar-servers": "ವೆದಿ ಸೆವಕ್",
    "nav.catholic-sabha": "ಕಥೊಲಿಕ್ ಸಭಾ",
    "nav.ycs": "ವೈ.ಸಿ.ಯಸ್.",
    "nav.secular-franciscan": "ಸೆಕ್ಯುಲರ್ ಫ್ರಾನ್ಸಿಸ್ಕನ್",
    "nav.catechism": "ಕ್ರೀಸ್ತಿ ಶಿಕ್ಷಣ್",
    "nav.small-christian-community": "ಲ್ಹಾನ್  ಕ್ರೀಸ್ತಾಂವ್  ಸಮುದಾಯ್",
    "nav.gurpur-choir": "ಗುರ್ಪುರ್ ಗಾಯನ್ ಮಂಡಳಿ",
    "nav.womens-forum": "ಸ್ನೇಹ ಸ್ತ್ರೀ ಸಂಘಟನ್",
    "nav.christian-life-community": "ಕ್ರಿಸ್ತಾಂವ್ ಜೀವನ್ ಸಮುದಾಯ್",
    "nav.kowdoor-a-ward": "ಕೌಡೂರ್ ಎ",
    "nav.kowdoor-b-ward": "ಕೌಡೂರ್ ಬಿ",
    "nav.monel-ward": "ಮಣೆಲ್",
    "nav.gurpur-ward": "ಗುರ್ಪುರ್",
    "nav.church-ward": "ಇಗರ್ಜೆ",
    "nav.pompei-a-ward": "ಪೊಂಪೈ ಎ",
    "nav.pompei-b-ward": "ಪೊಂಪೈ ಬಿ",
    "nav.kandar-a-ward": "ಕಂದಾರ್ ಎ",
    "nav.kandar-b-ward": "ಕಂದಾರ್ ಬಿ",
    "nav.addoor-ward": "ಅಡ್ಡೂರ್",
    "nav.obituary": "ಫಿರ್ಗಜೆಂತ್ ಮರಣ್",
    "nav.events": "ಘಡಿತಾಂ",
    "nav.pompeichem-falkem": "ಪೊಂಪೈಚೆಂ ಫಾಲ್ಕೆಂ",
    "nav.prayer-corner": "ಮಾಗ್ಣ್ಯಾ ಪಾನ್",
    "nav.pompei-sabha-bhavan": "ಪೊಂಪೈ ಸಭಾ ಭವನ್",
    "nav.centenary-hall": "ಶತಾಬ್ದಿ ಸಾಲ್",
    "landing.church-name": "ಪೊಂಪೈ ಮಾಯೆಚಿ ಫಿರ್ಗಜ್",
    "landing.town-name": "ಗುರ್ಪುರ್ ಕೈಕಂಬ​",
    "landing.priest": "ಫಿರ್ಗಜ್ ವಿಗಾರ್",
    "landing.priest-speaks": "ಫಿರ್ಗಜ್ ವಿಗಾರ್ ಉಲಯ್ತಾ",
    "landing.pastoral-commission-coordinator": "21 ಆಯೋಗಾಂಚಿ ಸಂಯೋಜಕಿ",
    "landing.pastoral-commission-coordinator-name": "ಶ್ರೀಮತಿ ಹಿಲ್ಡಾ ಮಿನೇಜಸ್",
    "landing.about-church": "ಆಮ್ಚ್ಯಾ ಫಿರ್ಗಜೆಚಿ ಮಾಹೆತ್",
    "landing.pastoral-parishad": "ಫಿರ್ಗಜ್ ಗೊವ್ಳಿಕ್ ಪರಿಷದ್ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ",
    "parish.pastoral-parishad": "ಗೊವ್ಳಿಕ್ ಪರಿಷಧ್",
    "landing.mass-timings": "ಮಿಸಾಚೊ ವೇಳ್",
    "landing.adoration-note":
      "(ಸಾಕ್ರಾಮೆಂತಾಚೆಂ ಆರಾಧನ್ ಮಹಿನ್ಯಾಚಾ ಪಯ್ಲ್ಯಾ ಆಯ್ತಾರಾ ಸಕಾಳಿಂ ಮಿಸಾ ಉಪ್ರಾಂತ್)",
    "landing.mon-sat": "ಸೊಮಾರಾ - ಸನ್ವಾರಾ:",
    "landing.friday": "ಸುಕ್ರಾರಾ:",
    "landing.friday-note": "ದೈವಿಕ್ ಕಾಕುಳ್ತಿಚೊ ತೇರ್ಸ್ ಆನಿಂ ಮೀಸ್",
    "landing.saturday": "ಸನ್ವಾರಾ",
    "landing.saturday-note": "ಆಯ್ತಾರಾಚಿ ದೇವ್ ಸ್ತುತಿ",
    "landing.sunday": "ಆಯ್ತಾರಾ",
    "landing.daily-mass": "ಸದಾಂ ಮೀಸ್",
    "landing.catechism": "ಭುರ್ಗ್ಯಾಂಕ್ ದೊತೊರ್ನ್",
    "landing.catechism-note":
      "ಆಯ್ತಾರಾ ಸಾಕಾಳಿಂ, 9:15AM (ಮಹಿನ್ಯಾಚೊ ಪಯ್ಲೊ ಆಯ್ತಾರ್  ಸೊಡ್ನ್)",
    "landing.novena": "ಪೊಂಪೈ ಮಾಯೆಚೆ‌ ನೊವೆನ್",
    "landing.novena-note": "ಸನ್ವಾರಾ ಸಾಂಜೆರ್ ಆನಿ ಆಯ್ತಾರಾ ಸಕಾಳಿಂ ಮಿಸಾ ಉಪ್ರಾಂತ್",
    "landing.follow-our-journey": "ಮಾಧ್ಯಮನಿಂ ಆಮ್ಚಿಂ ಪಾವ್ಲಾಂ",
    "landing.upcoming-events": "ಫುಡ್ಲಿಂ ಕಾರ್ಯಿಂ",
    "parish-priests": "ಫಿರ್ಗಜೆಚೆ ವಿಗಾರ್",
    deacons: "ದಿಯಾಕೊನ್",
    "pp.subtitle":
      "ಫಿರ್ಗಜೆಚೊ ಶತಮಾನೋತ್ಸವ್ ಸಂಭ್ರಮ್ ಆಚರಣ್ ಕರ್ತನಾ ಪಾಟ್ಲ್ಯಾ ಶೆಂಬೊರ್ ವರ್ಸಾನಿಂ ಫಿರ್ಗಜೆಚ್ಯಾ ಭಾವಾರ್ಥಾಚಾ ಆತ್ಮಿಕ್ ಪಯ್ಣಾರ್ ತಶೆಂಚ್ ಸಾಮಾಜಿಕ್ ಆನಿ ಲೌಕಿಕ್ ಜಿಣಿಯೆಕ್ ಆಧಾರ್ ಜಾಲ್ಲ್ಯಾ ಫಿರ್ಗಜೆಚೆಂ ಸುಂಕಾಣ್ ಹಾತಿಂ ಘೆವ್ನ್ ಫಿರ್ಗಜ್ ಕುಟ್ಮಾo ಬರ‍್ಯಾ ರಿತಿನ್ ಚಲವ್ನ್ ವ್ಹರ್ನ್ ಆಮ್ಕಾಂ ಶತಮಾನೋತ್ಸವಾಚೆಂ ಭಾಗ್ ಪಳೊಂವ್ಕ್ ಫಾವೊ ಕೆಲ್ಲ್ಯಾ ಸರ್ವ್ ಫಿರ್ಗಜ್ ವಿಗಾರಾಂಚಿ ಅನಿ ದಿಯಾಕೊನಾಂಚಿ ಮೊಟ್ವಿ ಝಳಕ್.",
    "ui.more-button-know": "ಚಡಿತ್ ಮಾಹೆತ್",
    "ui.more-button-show": "ಚಡಿತ್ ಮಾಹೆತ್",
    "ui.more-button-read": "ಚಡಿತ್ ಮಾಹೆತ್",
    "ui.show-more-events": "ಚಡಿತ್ ಘಡಿತಾಂ",
    "ui.view-all": "ಚಡಿತ್ ಮಾಹೆತ್",
    "contact.title": "ಸಂಪರ್ಕ್ ಕರಾ",
    "history.title": "ಆಮ್ಚಿ ಚರಿತ್ರಾ",
    "history.subtitle": "ಪೊಂಪೈ ಮಾಯೆಚಿ ಫಿರ್ಗಜ್, ಗುರ್ಪುರ್ - ಚರಿತ್ರೆಚೆರ್ ಏಕ್ ನದರ್",
    "history.sweet-memories": "ಮಧುರ್ ಉಗ್ಡಾಸ್",
    "gallery.title": "ಗ್ಯಾಲರಿ",
    "gallery.subtitle": "Capturing moments of grace",
    "priest.service-period": "ಅವ್ದಿ",
    "bethany.title": "ಬೆಥನಿ ಸ್ಕೂಲ್ (ಸಿ.ಬಿ.ಎಸ್.ಸಿ)",
    "jeevadaan.title": "ಜೀವದಾನ",
    "rosamystica.title": "ರೋಸಾ ಮಿಸ್ತಿಕಾ ಶಿಕ್ಪಾ ಸಂಸ್ಥೆ",
    "rosamystica.higher-primary-school": "ರೋಸಾ ಮಿಸ್ತಿಕಾ ಹೈಯರ್ ಪ್ರೈಮರಿ ಸ್ಕೂಲ್",
    "rosamystica.high-school": "ರೋಸಾ ಮಿಸ್ತಿಕಾ ಹೈ ಸ್ಕೂಲ್, ಕಿನ್ನಿಕಂಬಳ, ಮಂಗಳೂರು",
    "rosamystica.p-u-college":
      "ರೋಸಾ ಮಿಸ್ತಿಕಾ ಪಿ. ಯು . ಕಾಲೇಜ್,  ಕಿನ್ನಿಕಂಬಳ, ಮಂಗಳೂರು",
    "snehasadan.title": "ಸ್ನೇಹಾಸದನ",
    "pompeiconvent.title": "ಪೊಂಪೈ ಕೊವೆಂತ್ ",
    "rosamysticaconvent.title": "ರೋಸಾ ಮಿಸ್ತಿಕಾ ಕೊವೆಂತ್",
    "hall.title": "ಪೊಂಪೈ ಸಭಾ ಭವನ್",
    "centenaryhall.title": "ಶತಾಬ್ದಿ ಸಾಲ್",
    "church.patron": "ವೈಲಂಕಣಿ ಮಾಯ್",
    "obituary.subtitle": "ಮೊಗಾಚೊ ಉಡಾಸ್",
    "commissions.convenor": " ಸಂಚಾಲಕಿ/ಕ್ ",
    "commissions.heading": "ಆಯೋಗ್",
    "commissions.secretary": "ಕಾರ್ಯದರ್ಶಿ",
    "associations.about-us": "ಆಮ್ಚ್ಯಾ ಸಂಘಾ ವಿಶ್ಯಾoತ್",
    "associations.office-bearers": "ಪದಾಧಿಕಾರಿ",
    "ward.kowdoor-a-ward": "ಕೌಡೂರ್ ಎ",
    "ward.kowdoor-b-ward": "ಕೌಡೂರ್ ಬಿ",
    "ward.monel-ward": "ಮಣೆಲ್",
    "ward.gurpur-ward": "ಗುರ್ಪುರ್",
    "ward.church-ward": "ಇಗರ್ಜೆ",
    "ward.pompei-a-ward": "ಪೊಂಪೈ ಎ",
    "ward.pompei-b-ward": "ಪೊಂಪೈ ಬಿ",
    "ward.kandar-a-ward": "ಕಂದಾರ್ ಎ",
    "ward.kandar-b-ward": "ಕಂದಾರ್ ಬಿ",
    "ward.addoor-ward": "ಅಡ್ಡೂರ್",
    "ward.gurkar": "ಗುರ್ಕಾರ್",
    "ward.gurkarn": "ಗುರ್ಕಾರ್ನ್",
    "ward.pratinidi": "ಪ್ರತಿನಿಧಿ",
    "ward.family": "ವಾಡ್ಯಾಂತ್ ಕುಟ್ಮಾ",
    "ward.patron": "ಸಮರ್ಪಿಲ್ಲೊ ವಾಡೊ ",
    "ward.patron-addoor": " ಭಾಗೆವಂತ್ ಕುಟ್ಮಾಕ್ ",
    "ward.patron-church": "ವೆಲಂಕಣಿ ಮಾಯೆಕ್",
    "ward.patron-gurpur": "ಫಾತಿಮಾ ಮಾಯೆಕ್",
    "ward.patron-kandar-a": "ಮೊಂತಿ ಸಾಯ್ಭಿಣಿಕ್",
    "ward.patron-kandar-b": "ರೊಜಾರ್ ಮಾಯೆಕ್",
    "ward.patron-kowdoor-a": " ಕೊಸೆಸಾಂವ್ ಸಾಯ್ಬಿಣೆಕ್",
    "ward.patron-kowdoor-b": "ಕಾರ್ಮೆಲ್ ಸಾಯ್ಭಿಣೆಕ್",
    "ward.patron-pompei-a": "ಪೊಂಪೈ ಮಾಯೆಕ್",
    "ward.patron-pompei-b": "ನಿತ್ಯಾದಾರ್ ಮಾಯೆಕ್",
    "ward.patron-monel": "ಸಾಂ ಅನ್ನಾಕ್",
    "ward.select-label": "ವಾಡೊ ವಿಂಚಾ...",
    "president-male": "ಅಧ್ಯಕ್ಷ್",
    "president-female": "ಅಧ್ಯಕ್ಷಿಣ್",
    "coordinator-male": "ಸಂಯೋಜಕ್",
    "coordinator-female": "ಸಂಯೋಜಕಿ",
    "choir-master": "ಕೊಯರ್ ಮೇಸ್ತ್ರಿ",
    representative: "ಪ್ರತಿನಿಧಿ",
    secretary: "ಕಾರ್ಯದರ್ಶಿ",
    "convenor-male": "ಸಂಚಾಲಕ್",
    "convenor-female": "ಸಂಚಾಲಕಿ",
    prefect: "ಪ್ರೆಫೆಕ್ಟ್",
    "animator-male": "ಸಚೇತಕ್",
    "animator-female": "ಸಚೇತಕಿ",
    animators: "ಸಚೇತಕಾಂ",
    "prayer.lets-join-hands-in-prayer": "ಮಾಗ್ಣ್ಯಾಕ್ ಆಮ್ಚೆ ಹಾತ್ ಜೊಡ್ಯಾಂ",
    "prayer.novena-of-our-lady-of-pompei": "ಪೊಂಪೈ ರೊಜಾರ್ ಸಾಯ್ಬಿಣಿಚೆಂ ನೊವೆನ್",
    "prayer.pray-for-us": "ಪೊಂಪೈ ಮಾಯೆ ಆಮಾ ಪಾಸುನ್ ವಿನತಿ ಕರ್ ",
    "prayer.psalms": "ಕೀರ್ತನಾ",
    "prayer.pope-intention": "ಪಾಪಾಚೊ ಮಹಿನ್ಯಾಳೊ ಇರಾದೊ",
    "prayer.jubliee-2025": "ಜುಬ್ಲೆವ್ 2025",
    "contact.address": "ಗುರ್ಪುರ್, ಕಿನ್ನಿಕಂಬಳ, ಮಂಗಳೂರು",
    "contact.mon-sat": "ಸೊಮಾರಾ - ಸನ್ವಾರಾ:",
    "vpsec.title": "ಫಿರ್ಗಜೆoತ್ ಸೆವಾ ದಿಲ್ಲೆ ಉಪಾಧ್ಯಕ್ಷ್ ಅನಿ ಕಾರ್ಯದರ್ಶಿ",
    "vpsec.subtitle": `ಆಮ್ಚಿ ಫಿರ್ಗಜ್ ಅಸ್ತಿತ್ವಾಕ್ ಆಯಿಲ್ಲ್ಯಾ ದಿಸಾ ಥಾವ್ನ್ ಫಿರ್ಗಜ್ ವಿಗಾರಾ ಸಂಗಿ ಫಿರ್ಗಜೆಚ್ಯಾ ಸರ್ವತೋಮುಖ್ ವಾಡಾವಳಿಂತ್ ಸಭಾರ್ ಲಾಯಿಕಾಂನಿ ಸೆವಾ ದಿಲ್ಯಾ. ಲಾಯಿಕ್ ಮುಖೆಲ್ಯಾಂಕ್ ಪಯ್ಲೆಂ 'ತ್ರಿದೆರ್' ಮ್ಹಣ್ ಆಪಯ್ತಾಲೆ. ತ್ಯಾ ನಂತರ್, 'ಅಡಳ್ತೆದಾರ್' ಅನಿ ಪ್ರಸ್ತುತ್ 'ಉಪಾಧ್ಯಕ್ಷ್' ಮ್ಹಣ್ ಆಪಯ್ತಾತ್. ಹಾಂಚಾ ಸರ್ವಾಂಚ್ಯಾ ತ್ಯಾಗಾನ್, ಮೊಗಾಚಾ ಸೆವೆದ್ವಾರಿಂ ಅಮ್ಚ್ಯಾ ಫಿರ್ಗಜೆಕ್ ಶತಮಾನೊತ್ಸವ್ ಆಚರಣ್ ಕರ್ಚೆಂ  ಭಾಗ್ ಫಾವೊ ಜಾಲೆಂ. ಹ್ಯೆ ದಿಶೆನ್, ಫಿರ್ಗಜೆಂತ್ ಸೆವಾ ದಿಲ್ಲ್ಯಾ ಸರ್ವ್ ಮುಖೆಲ್ಯಾಂಚಿ ಏಕ್ ‍ಝಳಕ್!`,
    "vpsec.subtitle1": "ತ್ರಿದೆರ್",
    "vpsec.subtitle2": "ಅಡಳ್ತೆದಾರ್",
    "vpsec.subtitle3": "ಉಪಾಧ್ಯಕ್ಷ್",
    "vpsec.subtitle4": "ಕಾರ್ಯದರ್ಶಿ",
    "treasurer.parodrigues": "ದೆ| ಪಿ.ಎ. ರೊಡ್ರಿಗಸ್",
    "treasurer.benjaminpais": "	ದೆ| ಬೆಂಜಮಿನ್ ಪಾಯ್ಸ್",
    "treasurer.rosariodsouza": "ದೆ| ರೊಜಾರ್ ಡಿಸೋಜ​",
    "treasurer.kashmirtauro": "ದೆ| ಕಾಶ್ಮಿರ್ ತಾವ್ರೊ",
    "treasurer.trindadpinto": "ದೆ| ತ್ರಿಂದಾದ್ ಪಿಂಟೊ",
    "treasurer.rosariomendonca": "ದೆ| ರೊಜಾರ್ ಮೆಂಡೊನ್ಸಾ",
    "treasurer.baptistrasquinha": "ದೆ| ಬ್ಯಾಪ್ಟಿಸ್ಟ್ ರಸ್ಕಿನ್ಹಾ",
    "administrator.richardrodrigues": "ದೆ| ರಿಚ್ಚರ್ಡ್ ರೊಡ್ರಿಗಸ್",
    "administrator.hilarypinto": "ದೆ| ಹಿಲರಿ ಪಿಂಟೊ",
    "administrator.alexlobo": "ದೆ| ಅಲೆಕ್ಸ್ ಜೆ. ಲೋಬೊ",
    "vp.georgepinto": "ದೆ| ಜೊರ್ಜ್ ಪಿಂಟೊ",
    "vp.eliasrodrigues": "ದೆ| ಎಲ್ಯಾಸ್ ರೊಡ್ರಿಗಸ್",
    "vp.jeraldrasquinha": "ಶ್ರೀಮಾನ್ ಜೆರಾಲ್ಡ್ ರಸ್ಕಿನ್ಹಾ",
    "vp.richardlobo": "ದೆ| ರಿಚ್ಚರ್ಡ್ ಲೋಬೊ",
    "vp.wilfredpinto": "ದೆ| ಎವ್ಜಿನ್ ವಿಲ್ಫ್ರೆಡ್ ಪಿಂಟೊ",
    "vp.johnsonlobo": "ಶ್ರೀಮಾನ್ ಜೊನ್ಸನ್ ಲೋಬೊ",
    "vp.romanslobo": "ಶ್ರೀಮಾನ್ ರೋಮನ್ಸ್ ಲೋಬೊ",
    "vp.richardfernandes": "ಶ್ರೀಮಾನ್ ರಿಚ್ಚರ್ಡ್ ಫೆರ್ನಾಂಡಿಸ್",
    "vp.jeraldlobo": "ಶ್ರೀಮಾನ್ ಜೆರಾಲ್ಡ್ ಲೋಬೊ",
    "sec.alexdsouza": "ದೆ| ಅಲೆಕ್ಸ್ ಡಿಸೋಜಾ",
    "sec.agnesrodrigues": "ಶ್ರೀಮತಿ ಆಗ್ನೆಸ್ ರೊಡ್ರಿಗಸ್",
    "sec.srjacintha": "ಭ| ಎಮ್. ಜೆಸಿಂತಾ",
    "sec.benedictperis": "ದೆ| ಬೆನೆಡಿಕ್ತ್ ಪೇರಿಸ್",
    "sec.oswaldperis": "ಶ್ರೀಮಾನ್ ಒಜ್ವಲ್ಡ್ ಪೇರಿಸ್",
    "sec.jeraldrasquinha": "ಶ್ರೀಮಾನ್ ಜೆರಾಲ್ಡ್ ರಸ್ಕಿನ್ಹಾ",
    "sec.wilfredpinto": "ದೆ| ಎವ್ಜಿನ್ ವಿಲ್ಫ್ರೆಡ್ ಪಿಂಟೊ",
    "sec.lillymathias": "ಶ್ರೀಮತಿ ಲಿಲ್ಲಿ ಮಥಾಯಸ್",
    "sec.richardfernandes": "ಶ್ರೀಮಾನ್ ರಿಚ್ಚರ್ಡ್ ಫೆರ್ನಾಂಡಿಸ್",
    "sec.jeraldlobo": "ಶ್ರೀಮಾನ್ ಜೆರಾಲ್ಡ್ ಲೋಬೊ",
    "sec.praveenlobo": "ಶ್ರೀಮಾನ್ ಪ್ರವೀಣ್ ಲೋಬೊ",
    "sec.johnsonlobo": "ಶ್ರೀಮಾನ್ ಜೊನ್ಸನ್ ಲೋಬೊ",
    "vocation.title":
      "ಸೊಮ್ಯಾಚ್ಯಾ ಶೆತಾಂತ್ಲೆಂ ದೇವ್ ಆಪೊವ್ಣ್ಯಾಕ್ ಪಾಳೊ ದೀವ್ನ್ ದೆವಾಚೆಂ ರಾಜ್ ವಿಸ್ತಾರುನ್ ಆಸ್ಚ್ಯಾ ಆಮ್ಚ್ಯಾ ಫಿರ್ಗಜ್ ಗಾರಾಂಚಿಂ ಝಳಕ್.",
    "vocation.subtitle1": "ಯಾಜಕ್-ಬಾಪ್",
    "vocation.subtitle2": "ಧರ್ಮ್-ಭಯ್ಣಿಂ",
    "vocation.ward": "ವಾಡೊ :",
    "vocation.dob": "ಜನನ್ :",
    "vocation.dod": "ಮರಣ್ :",
    "vocation.so": "ಪೂತ್ :",
    "vocation.do": "ಧುವ್ :",
    "priest.josephlobo": "ದೆ| ಮಾ| ಬಾ| ಜೋಸೆಫ್ ಎನ್ ಲೋಬೊ",
    "priest.paullobo": "ದೆ| ಬ್ರದರ್ ಪಾವ್ಲ್ ಲೋಬೊ",
    "priest.cyrilrasquinha": "ದೆ| ಮಾ| ಬಾ| ಸಿರಿಲ್ ರಸ್ಕಿನ್ಹಾ",
    "priest.herbertpinto": "ದೆ| ಮಾ| ಬಾ| ಹರ್ಬಟ್ ಪಿಂಟೊ",
    "priest.josephtauro": "ದೆ| ಮಾ| ಬಾ| ಜೋಸೆಫ್ ಪೀಟರ್ ತಾವ್ರೊ",
    "priest.gilbertpinto": "ದೆ| ಮಾ| ಬಾ| ಗಿಲ್ಬರ್ಟ್ ಪಿಂಟೊ",
    "priest.gregorydcunha": "ದೆ| ಮಾ| ಬಾ| ಗ್ರೆಗರಿ ಡಿಕುನ್ಹಾ",
    "priest.stanydcunha": "ದೆ| ಮಾ| ಬಾ| ಸ್ಟೇನಿ ಡಿಕುನ್ಹಾ",
    "priest.johnmendonca": "ಮಾ| ಬಾ| ಜೊನ್ ಬ್ಯಾಪ್ಟಿಸ್ಟ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.felixmoras": "ಮಾ| ಬಾ| ಫೆಲಿಕ್ಸ್ ಬಾಜಿಲ್ ಮೊರಾಸ್",
    "priest.andrewmoras": "ಮಾ| ಬಾ| ಆಂದ್ರು ಲಿಯೊ ಮೊರಾಸ್",
    "priest.johnperis": "ಮಾ| ಬಾ| ಜೊನ್ ಪೆರಿಸ್",
    "priest.victorlobo": "ಮಾ| ಬಾ| ವಿಕ್ಟರ್ ಲೋಬೊ",
    "priest.piuspinto": "ಮಾ| ದೊ| ಪಿಯುಸ್ ಫಿದೆಲಿಸ್ ಪಿಂಟೊ",
    "priest.ivanmendonca": "ಮಾ| ಬಾ| ಐವನ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.melwynmendonca": "ಮಾ| ಬಾ| ಮೆಲ್ವಿನ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.richarddsouza": "ಮಾ| ದೊ| ರಿಚ್ಚರ್ಡ್ ಫ್ರಾನ್ಸಿಸ್ ಡಿಸೋಜ​",
    "priest.rudolphpinto": "ಮಾ| ದೊ| ರುಡೊಲ್ಫ್ ರಾಜ್ ಪಿಂಟೊ",
    "priest.rohanmiranda": "ಮಾ| ದೊ| ರೋಹನ್ ಮಿರಾಂದ​",
    "priest.vincentsaldanha": "ಮಾ| ಬಾ| ವಿನ್ಸೆಂಟ್ ಸಲ್ಡಾನ್ಹಾ",
    "priest.santoshmenezes": "ಮಾ| ಬಾ| ಸಂತೋಷ್ ಮಿನೇಜಸ್",
    "priest.anilfernandes": "ಮಾ| ಬಾ| ಅನಿಲ್ ಫೆರ್ನಾಂಡಿಸ್",
    "priest.stephenlobo": "ಮಾ| ಬಾ| ಸ್ಟೀಫನ್ ಅರುಣ್ ಲೋಬೊ",
    "priest.prakashdcunha": "ಮಾ| ಬಾ| ಪ್ರಕಾಶ್ ಡಿಕುನ್ಹಾ",
    "priest.roshanpinto": "ಮಾ| ಬಾ| ರೋಶನ್ ಪಿಂಟೊ",
    "priest.cyrildsouza": "ಬ್ರದರ್ ಸಿರಿಲ್ ಡಿಸೋಜ​",
    "priest.johnrodrigues": "ಮಾ| ಬಾ| ಜೊನ್ ಕ್ಲಿಫರ್ಡ್ ರೊಡ್ರಿಗಸ್",
    "priest.wilsonsaldanha": "ಮಾ| ಬಾ| ವಿಲ್ಸನ್ ಸಲ್ಡಾನ್ಹಾ",
    "priest.secularmangalore": "ಸೆಕುಲಾರ್, ಮಂಗ್ಳುರ್ ದಿಯೆಸಿಜ್",
    "priest.seculardelhi": "ಸೆಕುಲಾರ್, ಡೆಲ್ಲಿ ಆರ್ಚ್ ದಿಯೆಸಿಜ್",
    "priest.secularchikkmangalore": "ಸೆಕುಲಾರ್, ಶಿವಮೊಗ್ಗ​ ದಿಯೆಸಿಜ್",
    "priest.capuchin": "ಕಾಪುಚಿನ್",
    "priest.secularkarwar": "ಸೆಕುಲಾರ್, ಕಾರ್ ವಾರ್ ದಿಯೆಸಿಜ್",
    "priest.secularshivmogga": "ಸೆಕುಲಾರ್, ಶಿವಮೊಗ್ಗ​ ದಿಯೆಸಿಜ್",
    "priest.secularnagpur": "ಸೆಕುಲಾರ್, ನಾಗ್ಪುರ್ ದಿಯೆಸಿಜ್",
    "priest.secularlucknow": "ಸೆಕುಲಾರ್, ಲಕ್ನೋ ದಿಯೆಸಿಜ್",
    "priest.carmelite": "ಕಾರ್ಮೆಲಿತ್",
    "priest.svd": "ಎಸ್. ವಿ. ಡಿ.",
    "priest.jesuitorder": "ಜೆಜ್ವಿತ್ ಸಭಾ",
    "priest.jesuit": "ಜೆಜ್ವಿತ್",
    "priest.kowdoor-a": "ಕೌಡೂರ್ ಎ",
    "priest.kowdoor-b": "ಕೌಡೂರ್ ಎ",
    "priest.pompei-a": "ಪೊಂಪೈ ಎ",
    "priest.pompei-b": "ಪೊಂಪೈ ಬಿ",
    "priest.kandar-a": "ಕಂದಾರ್ ಎ",
    "priest.kandar-b": "ಕಂದಾರ್ ಬಿ",
    "priest.church": "ಇಗರ್ಜೆ",
    "priest.monel": "ಮಣೆಲ್",
    "priest.gurpur": "ಗುರ್ಪುರ್",
    "priest.marcellobo": "ದೆ| ಮಾರ್ಸೆಲ್ ಲೋಬೊ, ದೆ| ಮಾಗ್ದೆಲಿನ್ ಡಿಸೋಜ​",
    "priest.baltazarlobo": "ದೆ| ಬಾಲ್ತಜಾರ್ ಲೋಬೊ, ದೆ| ಮಾಗ್ದೆಲಿನ್ ಡಿಸೋಜ​",
    "priest.ignasiusrasquniha":
      "ದೆ| ಇಗ್ನೇಶಿಯಸ್ ರಸ್ಕಿನ್ಹಾ, ದೆ| ಕೊಸೆಸ್ ರೊಡ್ರಿಗಸ್",
    "priest.trindadpinto": "ದೆ| ತ್ರಿಂದಾದ್ ಪಿಂಟೊ, ದೆ| ಬ್ರಿಜಿತ್ ಸಲ್ಡಾನ್ಹಾ",
    "priest.kashmirtauro": "ದೆ| ಕಾಶ್ಮೀರ್ ತಾವ್ರೊ, ದೆ| ಇಗ್ನೇಶಿಯಾ ತಾವ್ರೊ",
    "priest.eliaspinto": "ದೆ| ಎಲಿಯಾಸ್ ಪಿಂಟೊ, ದೆ| ಜುವಾನ್ನ ಲೂಸಿ ರೊಡ್ರಿಗಸ್",
    "priest.denisdcunha": "ದೆ| ಡೆನಿಸ್ ಡಿಕುನ್ಹಾ, ದೆ| ಮೇರಿ ಡಿಕುನ್ಹಾ",
    "priest.ruzarmendonca": "ದೆ| ರುಜಾರ್ ಮೆಂಡೊನ್ಸಾ, ದೆ| ಫ್ಲೋರಿನ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.pascalmoras": "ದೆ| ಪಾಸ್ಕಲ್ ಮೊರಾಸ್, ದೆ| ಪಾಸ್ಕಿನ್ಹಾ ಸಲ್ಡಾನ್ಹಾ",
    "priest.lawrenceperis": "ಲೊರೆನ್ಸ್ ಪೆರಿಸ್, ಸಿಸಿಲಿಯಾ ಕುವೆಲ್ಲೊ",
    "priest.pascallobo": "ದೆ| ಪಾಸ್ಕಲ್ ಲೋಬೊ, ದೆ| ಆಲಿಸ್ ಡಿಸೋಜ​",
    "priest.lawrencepinto":
      "ದೆ| ಲೊರೆನ್ಸ್ ಫ್ರೆಡ್ರಿಕ್ ಪಿಂಟೊ, ಶ್ರೀಮತಿ ಸ್ಟೆಲ್ಲಾ ಲೋಬೊ",
    "priest.aloysiusmendonca":
      "ಶ್ರೀ ಎಲೋಶಿಯಸ್ ಮೆಂಡೊನ್ಸಾ, ದೆ| ಜುಲಿಯಾನಾ ಮೆಂಡೊನ್ಸಾ",
    "priest.gabrielmendonca":
      "ದೆ| ಗ್ಯಾಬ್ರಿಯೆಲ್ ಮೆಂಡೊನ್ಸಾ, ಶ್ರೀಮತಿ ಸೆಲಿನ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.mouricedsouza": "ದೆ| ಮೌರಿಸ್ ಡಿಸೋಜ​, ಶ್ರೀಮತಿ ಎಲಿಜ್ ಪಿಂಟೊ",
    "priest.georgepinto": "ದೆ| ಜೊರ್ಜ್ ಪಿಂಟೊ, ದೆ| ಜಿವಿತ್ ಮಿರಾಂದ​",
    "priest.leomiranda": "ದೆ| ಲಿಯೊ ಮಿರಾಂದ​, ಶ್ರೀಮತಿ ಲಿಯೊ ಮಿರಾಂದ​",
    "priest.johnsaldanha": "ದೆ| ಜೊನ್ ಸಲ್ಡಾನ್ಹಾ, ಶ್ರೀಮತಿ ಜೆತ್ರುದ್ ಸಲ್ಡಾನ್ಹಾ",
    "priest.antonymenezes":
      "ದೆ| ಆಂತೊನ್ ಫ್ರಾನ್ಸಿಸ್ ಮಿನೇಜಸ್, ದೆ| ಅನ್ನಾ ಮರಿಯ​ ಮಿನೇಜಸ್",
    "priest.mauricefernandes":
      "ಶ್ರೀ ಮೌರಿಸ್ ಫೆರ್ನಾಂಡಿಸ್, ಶ್ರೀಮತಿ ಕ್ರಿಸ್ತಿನ್ ಮೆಂಡೊನ್ಸಾ",
    "priest.williamlobo": "ದೆ| ವಿಲ್ಲಿಯಮ್ ಲೋಬೊ, ಶ್ರೀಮತಿ ಕಾರ್ಮಿಣ್ ಲೋಬೊ",
    "priest.ijidoredcunha": "ದೆ| ಇಜಿದೋರ್ ಡಿಕುನ್ಹಾ, ಶ್ರೀಮತಿ ಐರಿನ್ ಡಿಕುನ್ಹಾ",
    "priest.norbertpinto": "ಶ್ರೀ ನೊರ್ಬರ್ಟ್ ಪಿಂಟೊ, ಶ್ರೀಮತಿ ಸೆಲಿನ್ ಡಿಸೋಜ​",
    "priest.pauldsouza": "ದೆ| ಪಾವ್ಲ್ ಡಿಸೋಜ​, ದೆ| ಕೊಸೆಸ್ ಡಿಸೋಜ​",
    "priest.cyrilrodrigues": "ಶ್ರೀ ಸಿರಿಲ್ ರೊಡ್ರಿಗಸ್, ಶ್ರೀಮತಿ ಲೀನಾ ರೊಡ್ರಿಗಸ್",
    "priest.dominicsaldanha":
      "ದೆ| ದೊಮಿನಿಕ್ ಸಲ್ಡಾನ್ಹಾ, ಶ್ರೀಮತಿ ಸಿಂತಿಯಾ ಸಲ್ಡಾನ್ಹಾ",
    "nun.kowdoor-a": "ಕೌಡೂರ್ ಎ",
    "nun.kowdoor-b": "ಕೌಡೂರ್ ಎ",
    "nun.pompei-a": "ಪೊಂಪೈ ಎ",
    "nun.pompei-b": "ಪೊಂಪೈ ಬಿ",
    "nun.kandar-a": "ಕಂದಾರ್ ಎ",
    "nun.kandar-b": "ಕಂದಾರ್ ಬಿ",
    "nun.church": "ಇಗರ್ಜೆ",
    "nun.monel": "ಮಣೆಲ್",
    "nun.gurpur": "ಗುರ್ಪುರ್",
    "nun.addoor": "ಅಡ್ಡೂರ್",
    "nun.kandar": "ಕಂದಾರ್",
    "nun.charity": "ಚ್ಯಾರಿಟಿ",
    "nun.ocd": "ಒ.ಸಿ.ಡಿ. (ಭಿತರ್ಲಿ ಮಾದ್ರ್)",
    "nun.bethany": "ಬೆಥನಿ",
    "nun.apostaliccarmel": "ಅಪೊಸ್ತಲಿಕ್ ಕಾರ್ಮೆಲ್",
    "nun.stanns": `ಸೈಂಟ್ ಆನ್ಸ್ ಪ್ರೊವಿಡೆನ್ಸ್`,
    "nun.salesian": "ಸೆಲೆಸಿಯನ್",
    "nun.angelapinto": "ದೆ| ಭಯ್ಣ್ ಆಂಜೆಲಾ ಪಿಂಟೊ",
    "nun.agnespinto": "ದೆ| ಭಯ್ಣ್ ಆಗ್ನೆಸ್ ಪಿಂಟೊ",
    "nun.agnesdcunha": "ದೆ| ಭಯ್ಣ್ ಆಗ್ನೆಸ್ ಡಿಕುನ್ಹಾ",
    "nun.emiliana": "ದೆ| ಭಯ್ಣ್ ಎಮಿಲಿಯಾನಾ",
    "nun.marjary": "ದೆ| ಭಯ್ಣ್ ಮಾರ್ಜರಿ",
    "nun.marijohn": "ದೆ| ಭಯ್ಣ್ ಮಾರಿಜೋನ್",
    "nun.melvis": "ದೆ| ಭಯ್ಣ್ ಮೆಲ್ವಿಸ್",
    "nun.regis": "ದೆ| ಭಯ್ಣ್ ರೆಜಿಸ್",
    "nun.teresa": "ದೆ| ಭಯ್ಣ್ ತೆರೆಜ್ ಮಾರ್ಗರೆಟ್",
    "nun.afemiya": "ದೆ| ಭಯ್ಣ್ ಎ. ಫೆಮಿಯಾ",
    "nun.gilberta": "ದೆ| ಭಯ್ಣ್ ಗಿಲ್ಬರ್ಟಾ",
    "nun.maryperis": "ದೆ| ಭಯ್ಣ್ ಮೇರಿ ಬ್ಯಾಪ್ಟಿಸ್ಟಾ ಪೇರಿಸ್",
    "nun.marianoncietta": "ದೆ| ಭಯ್ಣ್ ಮರಿಯ ನೊನ್ಸಿಯೆಟಾ",
    "nun.melwyn": "ಭಯ್ಣ್ ಮೆಲ್ವಿನ್",
    "nun.flevian": "ಭಯ್ಣ್ ಫ್ಲೇವಿಯನ್",
    "nun.eveline": "ಭಯ್ಣ್ ಎವ್ಲಿನ್",
    "nun.nimpha": "ಭಯ್ಣ್ ನಿಂಫಾ",
    "nun.blanchepinto": "ಭಯ್ಣ್ ಬ್ಲಾಂಚ್ ಪಿಂಟೊ",
    "nun.norbertine": "ಭಯ್ಣ್ ನೊರ್ಬರ್ಟಿನ್",
    "nun.felician": "ಭಯ್ಣ್ ಫೆಲಿಸಿಯನ್",
    "nun.merician": "ಭಯ್ಣ್ ಮೆರಿಸಿಯನ್",
    "nun.mallika": "ಭಯ್ಣ್ ಮಲ್ಲಿಕಾ",
    "nun.dulsis": "ಭಯ್ಣ್ ದುಲ್ಸಿಸ್",
    "nun.julianamary": "ಭಯ್ಣ್ ಜುಲ್ಯಾನಾ ಮೇರಿ",
    "nun.reginald": "ಭಯ್ಣ್ ರೆಜಿನಾಲ್ಡ್",
    "nun.moad": "ಭಯ್ಣ್ ಮೋಡ್",
    "nun.marianavitha": "ಭಯ್ಣ್ ಮರಿಯಾ ನವಿತಾ",
    "nun.josita": "ಭಯ್ಣ್ ಜೊಸಿಟಾ",
    "nun.renuka": "ಭಯ್ಣ್ ರೇಣುಕಾ",
    "nun.mariasudeepa": "ಭಯ್ಣ್ ಮರಿಯಾ ಸುದೀಪ​",
    "nun.irenepinto": "ಭಯ್ಣ್ ಐರಿನ್ ಪಿಂಟೊ",
    "nun.tressila": "ಭಯ್ಣ್ ದೊ| ಟ್ರೆಸಿಲ್ಲಾ",
    "nun.maryjane": "ಭಯ್ಣ್ ಮೇರಿ ಜೇನ್",
    "nun.shaletsequiera": "ಭಯ್ಣ್ ಶಾಲೆಟ್ ಸಿಕ್ವೇರಾ",
    "nun.roselita": "ಭಯ್ಣ್ ರೋಜ್ ಲಿಟಾ",
    "nun.evelinesequiera": "ಭಯ್ಣ್ ಎವ್ಲಿನ್ ಸಿಕ್ವೇರಾ",
    "nun.marylobo": "ಭಯ್ಣ್ ಮೇರಿ ಸ್ತೆಫಾನ್ ಲೋಬೊ",
    "nun.hildaguard": "ಭಯ್ಣ್ ಹಿಲ್ಡಾಗಾರ್ಡ್",
    "nun.mariejane": "ಭಯ್ಣ್ ಮಾರಿ ಜೇನ್",
    "nun.linetdsouza": "ಭಯ್ಣ್ ಲಿನೆಟ್ ಪ್ರೀತಾ ಡಿಸೋಜ​",
    "nun.jacintharodrigues": "ಭಯ್ಣ್ ಜೆಸಿಂತಾ ರೊಡ್ರಿಗಸ್",
    "nun.mfrancis": "ಭಯ್ಣ್ ಎಮ್ ಫ್ರಾನ್ಸಿಸ್",
    "nun.titus": "ಭಯ್ಣ್ ಟೈಟಸ್",
    "nun.allen": "ಭಯ್ಣ್ ಎಲ್ಲನ್",
    "nun.marianpinto": "ದೆ| ಮರಿಯಾಣ್ ಪಿಂಟೊ, ದೆ| ಮಾಗ್ದೆಲಿನ್ ಮಿರಾಂದ​",
    "nun.benjaminpinto": "ದೆ| ಬೆಂಜಾಮಿನ್ ಪಿಂಟೊ, ದೆ| ಮಿಲಿಯಾನಾ ಪಿಂಟೊ",
    "nun.martindcunha": "ದೆ| ಮಾರ್ಟಿನ್ ಡಿಕುನ್ಹಾ, ದೆ| ಆಂಜೆಲ್ ಫೆರ್ನಾಂಡಿಸ್",
    "nun.bajilrodrigues": "ದೆ| ಬಾಜಿಲ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಬೆನೆಡಿಕ್ಟಾ ರೊಡ್ರಿಗಸ್",
    "nun.trindadpinto": "ದೆ| ತ್ರಿಂದಾದ್ ಪಿಂಟೊ, ದೆ| ಬ್ರಿಜಿತ್ ಸಲ್ಡಾನ್ಹಾ",
    "nun.antonymenezes": "ದೆ| ಆಂತೊನ್ ಮಿನೇಜಸ್, ದೆ| ಫ್ಲೋರಿನ್ ಡಿಕುನ್ಹಾ",
    "nun.vincentdcunha": "ದೆ| ವಿನ್ಸೆಂಟ್ ಡಿಕುನ್ಹಾ, ದೆ| ದೆಲ್ಫಿನ್ ರೊಡ್ರಿಗಸ್",
    "nun.domingorodrigues": "ದೆ| ದುಮಿಂಗೊ ರೊಡ್ರಿಗಸ್, ದೆ| ಮಾಗ್ದೆಲಿನ್ ರೊಡ್ರಿಗಸ್",
    "nun.alexanderrodrigues": "ದೆ| ಅಲೆಗ್ಸಾಂಡರ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಮಾರ್ತಾ ರೊಡ್ರಿಗಸ್",
    "nun.bernardperis": "ದೆ| ಬರ್ನಾರ್ಡ್ ಪೇರಿಸ್, ದೆ| ಆಲಿಸ್ ಲೋಬೊ",
    "nun.francistauro": "ದೆ| ಫ್ರಾನ್ಸಿಸ್ ತಾವ್ರೊ, ದೆ| ಕ್ಯಾತ್ರಿನ್ ಪಿಂಟೊ",
    "nun.sebastianmiranda": "ದೆ| ಸೆಬೆಸ್ಟಿಯನ್ ಮಿರಾಂದ​, ದೆ| ಸಿಸಿಲಿಯಾ ಪಿರೇರಾ",
    "nun.peterrodrigues": "ದೆ| ಪೀಟರ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಅನ್ನಾ ಮರಿಯ ರೊಡ್ರಿಗಸ್",
    "nun.markpinto": "ದೆ| ಮಾರ್ಕ್ ಪಿಂಟೊ, ದೆ| ಪಿಯಾದ್ ನಜ್ರೆತ್",
    "nun.jeromepinto": "ದೆ| ಜೆರೊಮ್ ಪಿಂಟೊ, ದೆ| ಜುಲಿಯಾನಾ ನಜ್ರೆತ್",
    "nun.fredrickrodrigues": "ದೆ| ಫ್ರೆಡ್ರಿಕ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಫ್ಲೋರಿನ್ ರೊಡ್ರಿಗಸ್",
    "nun.ignatiusrodrigues":
      "ದೆ| ಇಗ್ನೇಶಿಯಸ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಮೊಂತಿ ಮೇರಿ ರೊಡ್ರಿಗಸ್",
    "nun.jackyrodrigues": "ದೆ| ಜಾಕಿ ಮಿಂಗೆಲ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಸೆರಾಫಿನ್ ರೊಡ್ರಿಗಸ್",
    "nun.hilaryvaz": "ದೆ| ಹಿಲರಿ ವಾಸ್, ಶ್ರೀಮತಿ ಬೆನೆದಿಕ್ತಾ ಡಿಸೋಜ​",
    "nun.pascalrodrigues":
      "ದೆ| ಪಾಸ್ಕಲ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಎಲಿಜ್ ರೊಜ್ ಲಿನ್ ರೊಡ್ರಿಗಸ್",
    "nun.julianlobo": "ದೆ| ಜುಲಿಯಾನ್ ಲೋಬೊ, ದೆ| ಆಪೊಲಿನ್	 ಲೋಬೊ",
    "nun.hilarypinto": "ದೆ| ಹಿಲರಿ ಪಿಂಟೊ, ದೆ| ಹೆಲೆನ್ ಪಿಂಟೊ",
    "nun.ambrosepinto": "ದೆ| ಆಂಬ್ರೊಜ್ ಪಿಂಟೊ, ದೆ| ಜುವಾನ್ನಾ ರೊಡ್ರಿಗಸ್",
    "nun.lawrencepinto": "ದೆ| ಲೊರೆನ್ಸ್ ಫ್ರೆಡ್ರಿಕ್ ಪಿಂಟೊ, ಶ್ರೀಮತಿ ಸ್ಟೆಲ್ಲಾ ಲೋಬೊ",
    "nun.alexserrao": "ದೆ| ಆಲೆಕ್ಸ್ ಸೆರಾವೊ, ದೆ| ಸೆರಾಫಿನಾ ರೊಡ್ರಿಗಸ್",
    "nun.piadsequiera": "ದೆ| ಪಿಯಾದ್ ಸಿಕ್ವೇರಾ, ದೆ| ಜೆತ್ರುದ್ ಪಿಂಟೊ",
    "nun.johndsouza": "ದೆ| ಜೊನ್ ಡಿಸೋಜಾ, ದೆ| ಆಂಜೆಲಿನ್ ಡಿಸೋಜಾ",
    "nun.thomassequiera": "ದೆ| ತೋಮಸ್ ಸಿಕ್ವೇರಾ, ದೆ| ಕ್ರಿಸ್ತಿನ್ ಪಿಂಟೊ",
    "nun.anaclituslobo": "ದೆ| ಆನಾಕ್ಲೀಟಸ್ ಲೋಬೊ, ದೆ| ಮೆರ್ಸಿನ್ ಲೋಬೊ",
    "nun.felixdsouza": "ದೆ| ಫೆಲಿಕ್ಸ್ ಡಿಸೋಜ​, ದೆ| ಪಾವ್ಲಿನ್ ಕುವೆಲ್ಲೊ",
    "nun.baptistdsouza": "ದೆ| ಬ್ಯಾಪ್ಟಿಸ್ಟ್ ಡಿಸೋಜ​, ದೆ| ಸೆಬಿನ​ ಡಿಸೋಜ​",
    "nun.plastiddsouza": "ಶ್ರೀ ಪ್ಲಾಸಿಡ್ ಡಿಸೋಜ​, ಶ್ರೀಮತಿ ಪ್ರೆಸಿಲ್ಲಾ ಡಿಸೋಜ​",
    "nun.albertrodrigues": "ದೆ| ಆಲ್ಬರ್ಟ್ ರೊಡ್ರಿಗಸ್, ದೆ| ಎಮಿಲಿಯಾನಾ ರೊಡ್ರಿಗಸ್",
    "nun.denisdcunha": "ದೆ| ಡೆನಿಸ್ ಡಿಕುನ್ಹಾ, ದೆ| ಮೇರಿ ಡಿಕುನ್ಹಾ",
    "events.subtitle": "ಫಿರ್ಗಜ್ ಕುಟ್ಮಾಚ್ಯಾ ಎಕ್ವಟ್ಪಣಾಚ್ಯೊ ಘಡಿಯೊ",
    "funeral.rites": "ಮೊರ್ಣಾಚಿ ರೀತ್",
    "funeral.subtitle": "ವಿಗಾರ್ ಆನಿ ಫಿರ್ಗಜ್ ಕುಟಾಮ್",
    "funeral.youtube": "ಯೂಟೂಬಾರ್ ಪೊಳೆಯಾ",
    "push.notification":
      "ಫಿರ್ಗಜೆಂತ್ಲಿ ಫುಡ್ಲಿಂ ಕಾರ್ಯಿಂ, ಘಡಿತಾಂಚಿ ಝಳಕ್ ಆನಿ ಮೊರ್ಣಾಚಿ ಖಬರ್ ಅಪ್ಣಾಂವ್ಕ್",
    "push.enable": "ಅನ್ಕೂಲ್ ಕರಾ",
    "push.disable": "ಆತಾಂ ನಾಕಾ!",
    download: "ಡೌನ್ಲೋಡ್",
  },
} as const;
