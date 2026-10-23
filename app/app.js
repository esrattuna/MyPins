
/* ---------------- helpers ---------------- */
const $ = s => document.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (k === "text") n.textContent = v;
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c));
  return n;
};
/* ---------------- language ---------------- */
const I18N = {
  tr: {
    signIn: "Google ile giriş yap", signOut: "Çıkış yap", myMap: "Haritam", people: "Kişiler", settings: "Ayarlar", menu: "Menü",
    listTitleOther: "Gittiği yerler", followers: n => `${n} takipçi`, following: n => `${n} takip`,
    follow: "Takip et", unfollow: "Takibi bırak", requested: "İstek gönderildi", followingBtn: "Takip ediliyor", editProfile: "Profili düzenle",
    lockedT: "Bu profil gizli", lockedB: "Haritayı görmek için takip isteği gönder. Onaylanınca pinleri görebilirsin.", lockedSignIn: "Takip isteği göndermek için giriş yap.",
    notFoundT: "Harita bulunamadı", notFoundB: "Bu kullanıcı adıyla bir harita yok ya da profil gizlenmiş.", findPeople: "Kişi ara",
    ghostNote: "Hayalet moddasın: haritan sadece sana görünür. Başkaları seni bulamaz ve takip edemez.", privateNote: "Gizli profil: haritanı sadece onayladığın takipçiler görür.",
    welcomeT: "MyPins'e hoş geldin", welcomeP1: "Gezdiğin yerleri, yemek yediğin güzel adresleri ve notlarını kendi haritanda topla.", welcomeP2: "Arkadaşlarını takip et, onların haritalarında yeni yerler keşfet.", browseFirst: "Önce etrafa göz at",
    hello: n => `Merhaba, ben ${n}.`, noBio: "Henüz bir tanıtım yazısı yok.",
    sProfile: "Profil", sName: "Görünen ad", sUser: "Kullanıcı adı", sUserHint: "Haritanın adresi: ", sBio: "Hakkımda (Türkçe)", sBioEn: "Hakkımda (İngilizce)", sPhoto: "Profil fotoğrafı",
    sMode: "Profil modu", m_public: "Açık", m_publicD: "Haritanı herkes görebilir, herkes seni takip edebilir.", m_private: "Gizli", m_privateD: "Takip isteklerini sen onaylarsın, haritanı sadece onayladıkların görür.", m_ghost: "Hayalet", m_ghostD: "Haritan sadece sana görünür. Profilin başkalarına görünmez, ama sen açık profilleri gezip takip edebilirsin.",
    sSaved: "Profil kaydedildi", sUserTaken: "Bu kullanıcı adı alınmış, başka bir tane dene.", sUserBad: "Kullanıcı adı 3-24 karakter olmalı; küçük harf, rakam, nokta ve alt çizgi kullanılabilir.",
    requests: "Takip istekleri", noRequests: "Bekleyen istek yok.", accept: "Onayla", decline: "Reddet", followersT: "Takipçiler", followingT: "Takip ettiklerin", nobody: "Henüz kimse yok.",
    searchPh: "Kullanıcı adı ya da isim ara", searchNone: "Kimse bulunamadı.", needSignIn: "Bunun için giriş yapman gerekiyor.", loadErr: "Yüklenemedi. Bağlantını kontrol edip tekrar dene.", copyLink: "Linki kopyala", copied: "Link kopyalandı",
    eatHere: "🍴 Burada nerede yedim", nearbyFood: "🍴 Yakınındaki diğer sofralar", nearbyPlaces: "🌍 Yakınındaki yerler",
    home: "Yaşadığım şehir", siteName: "MyPins", about: "Hakkında",  explore: "Haritayı keşfet", photoUp: "Fotoğrafını yükle", photoChange: "Fotoğrafı değiştir", photoSaving: "Yükleniyor…", photoErr: "Fotoğraf yüklenemedi. Tekrar dene.",
    aboutP1: "Bu blogu, büyük şehirlere seyahat ederken etrafındaki daha lokal bölgeleri, kasabaları, doğal alanları, manzaraları ve adresleri keşfetmek isteyen benim gibi insanlar için açtım.",
    aboutP2: "Eğer seyahat ederken amacınız bir ülkedeki doğayı ve lokal hayatı deneyimlemek ve farklı bir realitenin parçası olabilmekse, burada hoşunuza gidecek yerler keşfetmenizi umuyorum.",
    tagline: "Seyir notları · yerler · sofralar", zoomIn: "Yakınlaştır", zoomOut: "Uzaklaştır", zoomHome: "Tüm haritayı göster",
    pickHint: "Haritada notun yerine dokun", cancel: "Vazgeç", mapLabel: "Akdeniz ve Avrupa haritası", sheet: "Paneli büyüt veya küçült",
    close: "Kapat", prev: "Önceki", next: "Sonraki",
    kind_yer: "Yer", kind_yemek: "Sofra", newNote: "Yeni not", eyebrowList: "Seyir defteri", listTitle: "Gittiğim yerler", addNote: "+ Not ekle",
    tally: (a, b, c) => `${a} yer · ${b} sofra · ${c} ülke`,
    noDb: "Notlar bu görünümde açılamıyor. Görmek için claude.ai hesabınla oturum açman gerekiyor.", dbErr: "Notlar yüklenemedi. Sayfayı yenileyip tekrar dene.",
    filter: "Filtre", f_all: "Tümü", f_yer: "Yerler", f_yemek: "Sofralar",
    exNotice: n => `Örnek olarak ${n} not ekledim, nasıl göründüğünü görebilmen için. `, exRemove: "Örnekleri kaldır", example: "örnek",
    loadingT: "Defter açılıyor…", loadingB: "Notların yükleniyor.", emptyFilter: "Bu filtrede not yok", emptyAll: "Defter henüz boş",
    emptyEdit: "“Not ekle”ye bas, sonra haritada gittiğin yere dokun. Fotoğraf, not ve yemek puanı ekleyebilirsin.", emptyView: "Henüz paylaşılmış bir not yok.",
    other: "Diğer", countries: "Ülkeler", pins: n => `${n} pin`, allNotes: "← Tüm notlar", photoN: i => `Fotoğraf ${i}`, date: "Tarih", dish: "Ne yedim", rating: "Puan", price: "Fiyat",
    edit: "Düzenle", del: "Sil", delQ: "Bu not ve fotoğrafları silinsin mi?", delYes: "Evet, sil",
    backCancel: "← Vazgeç", editNote: "Notu düzenle", type: "Tür", t_yer: "Gezdiğim yer", t_yemek: "Yemek yediğim yer",
    venue: "Mekânın adı", titleL: "Başlık", phVenue: "örn. Çiya Sofrası", phTitle: "örn. Kapadokya'da gün doğumu",
    city: "Şehir / bölge", country: "Ülke", phDish: "örn. içli köfte, kaburga dolması", star: i => `${i} yıldız`,
    notes: "Notlarım", notesEn: "Notlarım (İngilizce)", phNoteEn: "İngilizce ziyaretçiler bu metni görür. Boş bırakırsan Türkçe not gösterilir.", dishEn: "Ne yedim (İngilizce)", phNote: "Neler gördün, ne hissettin, kime tavsiye edersin?", photos: "Fotoğraflar", removePhoto: "Fotoğrafı kaldır",
    drop: "Fotoğraf seç ya da buraya sürükle", shrinkHint: "Büyük fotoğraflar yüklenirken 2000 piksele küçültülür.", noUpload: "Fotoğraf yükleme bu görünümde kullanılamıyor.",
    save: "Kaydet", saving: "Kaydediliyor…", uploading: (i, n) => `Fotoğraf ${i}/${n} yükleniyor…`,
    badFile: n => `“${n}” açılamadı. JPEG veya PNG olarak kaydedip tekrar dene.`, needTitle: "Bir başlık yaz.", needLogin: "Kaydetmek için giriş yapman gerekiyor.",
    noPerm: "Bu haritaya yazma iznin yok.", saveErr: "Kaydedilemedi. Bağlantını kontrol edip tekrar dene.",
    updated: "Not güncellendi", added: "Not deftere eklendi", deleted: "Not silindi", delErr: "Silinemedi. Tekrar dene.", exRemoved: "Örnekler kaldırıldı",
    N: "K", S: "G", E: "D", W: "B", locale: "tr-TR",
    prices: { "": "—", "Ucuz": "Ucuz", "Orta": "Orta", "Pahalı": "Pahalı", "Çok pahalı": "Çok pahalı" },
  },
  en: {
    signIn: "Sign in with Google", signOut: "Sign out", myMap: "My map", people: "People", settings: "Settings", menu: "Menu",
    listTitleOther: "Places they've been", followers: n => `${n} ${n === 1 ? "follower" : "followers"}`, following: n => `${n} following`,
    follow: "Follow", unfollow: "Unfollow", requested: "Requested", followingBtn: "Following", editProfile: "Edit profile",
    lockedT: "This profile is private", lockedB: "Send a follow request to see the map. Once approved, you'll see the pins.", lockedSignIn: "Sign in to send a follow request.",
    notFoundT: "Map not found", notFoundB: "There's no map with this username, or the profile is hidden.", findPeople: "Find people",
    ghostNote: "You're in ghost mode: your map is visible only to you. Others can't find or follow you.", privateNote: "Private profile: only followers you approve can see your map.",
    welcomeT: "Welcome to MyPins", welcomeP1: "Collect the places you've been, the good spots you've eaten at and your notes on your own map.", welcomeP2: "Follow your friends and discover new places on their maps.", browseFirst: "Look around first",
    hello: n => `Hi, I'm ${n}.`, noBio: "No introduction yet.",
    sProfile: "Profile", sName: "Display name", sUser: "Username", sUserHint: "Your map's address: ", sBio: "About me (Turkish)", sBioEn: "About me (English)", sPhoto: "Profile photo",
    sMode: "Profile mode", m_public: "Public", m_publicD: "Anyone can see your map and follow you.", m_private: "Private", m_privateD: "You approve follow requests; only approved followers see your map.", m_ghost: "Ghost", m_ghostD: "Your map is visible only to you. Your profile is hidden from others, but you can browse and follow public profiles.",
    sSaved: "Profile saved", sUserTaken: "That username is taken. Try another one.", sUserBad: "Usernames are 3-24 characters: lowercase letters, numbers, dots and underscores.",
    requests: "Follow requests", noRequests: "No pending requests.", accept: "Approve", decline: "Decline", followersT: "Followers", followingT: "Following", nobody: "Nobody yet.",
    searchPh: "Search by username or name", searchNone: "No one found.", needSignIn: "You need to sign in for this.", loadErr: "Couldn't load. Check your connection and try again.", copyLink: "Copy link", copied: "Link copied",
    eatHere: "🍴 Where I ate here", nearbyFood: "🍴 Other food spots nearby", nearbyPlaces: "🌍 Nearby places",
    home: "Where I live", siteName: "MyPins", about: "About",  explore: "Explore the map", photoUp: "Upload your photo", photoChange: "Change photo", photoSaving: "Uploading…", photoErr: "The photo didn't upload. Try again.",
    aboutP1: "I started this blog for people like me who, when traveling to big cities, also want to discover the more local areas around them: small towns, nature, views and good addresses.",
    aboutP2: "If your goal when traveling is to experience a country's nature and local life, and to become part of a different reality, I hope you'll find places here you'll love.",
    tagline: "Travel notes · places · tables", zoomIn: "Zoom in", zoomOut: "Zoom out", zoomHome: "Show the whole map",
    pickHint: "Tap the map where your note belongs", cancel: "Cancel", mapLabel: "Map of the Mediterranean and Europe", sheet: "Expand or collapse the panel",
    close: "Close", prev: "Previous", next: "Next",
    kind_yer: "Place", kind_yemek: "Food", newNote: "New note", eyebrowList: "Travel log", listTitle: "Places I've been", addNote: "+ Add note",
    tally: (a, b, c) => `${a} ${a === 1 ? "place" : "places"} · ${b} food ${b === 1 ? "spot" : "spots"} · ${c} ${c === 1 ? "country" : "countries"}`,
    noDb: "Notes can't load in this view. Sign in with a claude.ai account to see them.", dbErr: "Notes didn't load. Refresh the page and try again.",
    filter: "Filter", f_all: "All", f_yer: "Places", f_yemek: "Food",
    exNotice: n => `I added ${n} example notes so you can see how things look. `, exRemove: "Remove examples", example: "example",
    loadingT: "Opening the notebook…", loadingB: "Loading your notes.", emptyFilter: "No notes for this filter", emptyAll: "The notebook is empty",
    emptyEdit: "Press “Add note”, then tap the map where you went. You can add photos, notes and a food rating.", emptyView: "No notes have been shared yet.",
    other: "Other", countries: "Countries", pins: n => `${n} ${n === 1 ? "pin" : "pins"}`, allNotes: "← All notes", photoN: i => `Photo ${i}`, date: "Date", dish: "What I ate", rating: "Rating", price: "Price",
    edit: "Edit", del: "Delete", delQ: "Delete this note and its photos?", delYes: "Yes, delete",
    backCancel: "← Cancel", editNote: "Edit note", type: "Type", t_yer: "A place I visited", t_yemek: "A place I ate",
    venue: "Name of the place", titleL: "Title", phVenue: "e.g. Time Out Market", phTitle: "e.g. Sunrise in Cappadocia",
    city: "City / area", country: "Country", phDish: "e.g. grilled sardines, pastel de nata", star: i => `${i} ${i === 1 ? "star" : "stars"}`,
    notes: "My notes (Turkish)", notesEn: "My notes (English)", phNoteEn: "Shown to English-speaking visitors. If empty, the Turkish note is shown.", dishEn: "What I ate (English)", phNote: "What did you see, how did it feel, who would you recommend it to?", photos: "Photos", removePhoto: "Remove photo",
    drop: "Choose photos or drag them here", shrinkHint: "Large photos are resized to 2000 pixels on upload.", noUpload: "Photo upload isn't available in this view.",
    save: "Save", saving: "Saving…", uploading: (i, n) => `Uploading photo ${i}/${n}…`,
    badFile: n => `“${n}” couldn't be opened. Save it as JPEG or PNG and try again.`, needTitle: "Write a title.", needLogin: "Sign in to save.",
    noPerm: "You don't have permission to edit this map.", saveErr: "Couldn't save. Check your connection and try again.",
    updated: "Note updated", added: "Note added", deleted: "Note deleted", delErr: "Couldn't delete. Try again.", exRemoved: "Examples removed",
    N: "N", S: "S", E: "E", W: "W", locale: "en-GB",
    prices: { "": "—", "Ucuz": "Cheap", "Orta": "Moderate", "Pahalı": "Pricey", "Çok pahalı": "Very pricey" },
  },
};
let LANG = (() => { const s = ls("ad-lang"); if (s === "tr" || s === "en") return s; return (navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en"; })();
const t = (k, ...a) => { const v = I18N[LANG][k] ?? I18N.tr[k]; return typeof v === "function" ? v(...a) : v; };
const KIND_LABEL = k => t("kind_" + k);
const ICON = { yer: "🌍", yemek: "🍴" };
const REGION = {};
for (const lg of ["tr", "en"]) { try { REGION[lg] = new Intl.DisplayNames([lg], { type: "region" }); } catch (e) { REGION[lg] = null; } }
const regionName = (iso, lg = LANG) => { if (!iso || !REGION[lg]) return ""; try { const n = REGION[lg].of(iso); return n && n !== iso ? n : ""; } catch (e) { return ""; } };
const NAME_FIX = { "N. Cyprus": { tr: "Kuzey Kıbrıs", en: "Northern Cyprus" } };
const ISO_FIX = { "Norway": "NO" };
COUNTRIES.features.forEach(f => {
  const p = f.properties; const iso = p.i || ISO_FIX[p.n] || "";
  p.iso = iso;
  p.nm = { tr: NAME_FIX[p.n]?.tr || regionName(iso, "tr") || p.n, en: NAME_FIX[p.n]?.en || regionName(iso, "en") || p.n };
});
const cName = f => f.properties.nm[LANG];
const HIDE_LABEL = new Set(["Israel"]);
const DOT_ZOOM = 4;
const CITY_TR = { "Rome": "Roma", "Athens": "Atina", "Vienna": "Viyana", "Moscow": "Moskova", "Cairo": "Kahire", "Prague": "Prag", "Warsaw": "Varşova", "Venice": "Venedik", "Naples": "Napoli", "Florence": "Floransa", "Milan": "Milano", "Munich": "Münih", "Brussels": "Brüksel", "Geneva": "Cenevre", "Alexandria": "İskenderiye", "Belgrade": "Belgrad", "Bucharest": "Bükreş", "Copenhagen": "Kopenhag", "Kiev": "Kiev", "Seville": "Sevilla", "Algiers": "Cezayir", "Damascus": "Şam", "Jerusalem": "Kudüs", "Tripoli": "Trablus", "Tunis": "Tunus", "Thessaloniki": "Selanik", "Nicosia": "Lefkoşa", "Istanbul": "İstanbul", "Izmir": "İzmir", "Cologne": "Köln", "Lisbon": "Lizbon", "Casablanca": "Kazablanka", "Marrakesh": "Marakeş", "Beirut": "Beyrut", "Sofia": "Sofya" };
const CITY_EN = { "Lizbon": "Lisbon", "Kazablanka": "Casablanca" };
const cityName = n => LANG === "tr" ? (CITY_TR[n] || n) : (CITY_EN[n] || n);
const L = (p, f) => (LANG === "en" && p && p[f + "_en"]) || (p && p[f]) || "";
const placeCountry = p => (p.iso && regionName(p.iso)) || p.country || "";
const priceLabel = v => I18N[LANG].prices[v] ?? v;
function applyLang() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", t(e.dataset.i18nAria)));
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
  gWorld.selectAll("path.land title").text(d => HIDE_LABEL.has(d.properties.n) ? "" : cName(d));
  if (typeof renderChrome === "function") renderChrome();
}
document.querySelectorAll(".lang button").forEach(b => b.onclick = () => { LANG = b.dataset.lang; ls("ad-lang", LANG); applyLang(); render(); });
function dms(v, pos, neg) {
  const a = Math.abs(v), d = Math.floor(a), m = Math.round((a - d) * 60);
  const dd = m === 60 ? d + 1 : d, mm = m === 60 ? 0 : m;
  return `${dd}°${String(mm).padStart(2, "0")}′${v >= 0 ? pos : neg}`;
}
const fmtCoord = (lon, lat) => `${dms(lat, t("N"), t("S"))}  ${dms(lon, t("E"), t("W"))}`;
function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s + "T12:00:00");
  if (isNaN(d)) return s;
  return d.toLocaleDateString(t("locale"), { day: "numeric", month: "long", year: "numeric" });
}
const PHOTO = new Map();
const blobUrl = p => PHOTO.get(p) || "";
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2600); }
function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

/* ---------------- state ---------------- */
const S = {
  places: [], loaded: false, dbState: "pending", // pending | ok | error
  canEdit: false, canUpload: false,
  me: null, session: null, owner: null, ownerState: "loading", // loading | ok | locked | notfound | landing
  rel: null, counts: { followers: 0, following: 0 }, panelMode: "map", // map | settings | people
  view: "list", selId: null, filter: ls("ad-filter") || "all",
  picking: false, temp: null, form: null, lb: null,
};
const sb = supabase.createClient(MYPINS.supabaseUrl, MYPINS.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" } });

/* ---------------- map ---------------- */
const svg = d3.select("#svg");
const mapEl = $("#map");
const projection = d3.geoConicConformal().parallels([32, 62]).rotate([-15, 0]);
const path = d3.geoPath(projection);
const FRAME = { type: "MultiPoint", coordinates: [[-11, 27], [44, 27], [-11, 70], [44, 70], [16, 71], [16, 27], [-14, 50], [46, 50]] };
const gRoot = svg.append("g");
const gWorld = gRoot.append("g");
const gOver = svg.append("g");
const gLabels = gOver.append("g");
const gPins = gOver.append("g");
let W = 0, H = 0, T = d3.zoomIdentity;

const SEAS = [
  [["Akdeniz", "Mediterranean Sea"], 18.5, 34.6, 1, 0], [["Ege Denizi", "Aegean Sea"], 25.1, 38.9, 2.2, 0], [["Karadeniz", "Black Sea"], 34.5, 43.3, 1, 0],
  [["Adriyatik", "Adriatic Sea"], 15.6, 42.9, 2.2, -38], [["İyon Denizi", "Ionian Sea"], 18.6, 37.6, 2.6, 0], [["Tiren Denizi", "Tyrrhenian Sea"], 12.1, 39.9, 2.4, 0],
  [["Atlas Okyanusu", "Atlantic Ocean"], -17.5, 44, 1, 0], [["Kuzey Denizi", "North Sea"], 3.5, 56.2, 1, 0], [["Baltık Denizi", "Baltic Sea"], 19.4, 56.7, 1.6, 0],
  [["Kızıldeniz", "Red Sea"], 36.6, 22.3, 1.6, -58], [["Biskay Körfezi", "Bay of Biscay"], -5.2, 45.6, 2.2, 0], [["Alboran", "Alboran Sea"], -3.8, 36.0, 4, 0],
  [["Marmara", "Sea of Marmara"], 28.1, 40.72, 7, 0], [["Levant Denizi", "Levantine Sea"], 33.0, 33.3, 2.6, 0], [["Norveç Denizi", "Norwegian Sea"], 2, 66.5, 1, 0],
];
// Portolan rose sits in the Ionian, like the medieval charts drawn from Genoa and Venice.
const ROSES = [[19.2, 35.2, true], [-9, 40.5, false], [31, 37.3, false]];

function largestPolygonCentroid(f) {
  let best = null, bestA = -1;
  for (const poly of f.geometry.coordinates) {
    const g = { type: "Polygon", coordinates: poly };
    const a = d3.geoArea(g);
    if (a > bestA) { bestA = a; best = g; }
  }
  return d3.geoCentroid(best);
}
COUNTRIES.features.forEach(f => { f.properties.c = largestPolygonCentroid(f); f.properties.area = d3.geoArea(f); });
const LABEL_POS = { "Portugal": [-8.1, 39.7], "Norway": [9.5, 61.5], "Sweden": [15.5, 62.5], "Russia": [38, 58], "Croatia": [16.2, 45.4], "Greece": [21.9, 39.6], "Italy": [12.6, 42.9], "United Kingdom": [-1.8, 52.8], "Egypt": [29.5, 26.5], "Libya": [17.5, 28], "Algeria": [3, 30], "Turkey": [34.5, 39.2] };
COUNTRIES.features.forEach(f => { if (LABEL_POS[f.properties.n]) f.properties.c = LABEL_POS[f.properties.n]; });

const zoom = d3.zoom().scaleExtent([1, 90]).on("zoom", e => { T = e.transform; gRoot.attr("transform", T); mapEl.classList.toggle("zoomed", T.k >= 4); drawOverlay(); });
svg.call(zoom);

function layout() {
  const r = mapEl.getBoundingClientRect();
  W = Math.max(200, r.width); H = Math.max(200, r.height);
  const narrow = matchMedia("(max-width:760px)").matches;
  const padTop = narrow ? 70 : 20, padBottom = narrow ? H * 0.46 : 20;
  projection.fitExtent([[16, padTop], [W - 16, H - padBottom]], FRAME);
  zoom.translateExtent([[-W * .6, -H * .6], [W * 1.6, H * 1.6]]).extent([[0, 0], [W, H]]);
  drawWorld();
  svg.call(zoom.transform, T);
}

function drawWorld() {
  gWorld.selectAll("*").remove();
  gWorld.append("rect").attr("class", "sea-rect").attr("x", -W * 3).attr("y", -H * 3).attr("width", W * 7).attr("height", H * 7);
  if (false) gWorld.append("path").attr("class", "grat").attr("vector-effect", "non-scaling-stroke")
    .attr("d", path(d3.geoGraticule().step([10, 10]).extent([[-40, 0], [70, 80]])()));
  // rhumb lines: 32 winds radiating from each rose
  const R = Math.hypot(W, H) * 1.4;
  for (const [lon, lat, main] of []) {
    const [x, y] = projection([lon, lat]);
    const g = gWorld.append("g");
    let d = "";
    for (let i = 0; i < 32; i++) {
      const a = i / 32 * Math.PI * 2;
      d += `M${x},${y}L${x + Math.cos(a) * R},${y + Math.sin(a) * R}`;
    }
    g.append("path").attr("class", "rhumb" + (main ? " main" : "")).attr("vector-effect", "non-scaling-stroke").attr("d", d);
    if (main) {
      const rose = gWorld.append("g").attr("class", "rose").attr("transform", `translate(${x},${y})`);
      rose.append("circle").attr("r", 26).attr("stroke-width", .8).attr("vector-effect", "non-scaling-stroke");
      rose.append("circle").attr("r", 31).attr("stroke-width", .5).attr("vector-effect", "non-scaling-stroke");
      let star = "";
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2 - Math.PI / 2, L = i % 2 ? 17 : 30, wv = i % 2 ? 3 : 4.5;
        const ax = Math.cos(a), ay = Math.sin(a), px = -ay, py = ax;
        star += `M${ax * L},${ay * L}L${px * wv},${py * wv}L${-px * wv},${-py * wv}Z`;
      }
      rose.append("path").attr("d", star).attr("opacity", .8);
    }
  }
  for (const r of ["r1", "r2", "r3"]) {
    gWorld.append("g").selectAll("path").data(COUNTRIES.features).join("path")
      .attr("class", "ring " + r).attr("vector-effect", "non-scaling-stroke").attr("d", path);
  }
  gWorld.append("g").selectAll("path").data(COUNTRIES.features).join("path")
    .attr("class", "land").attr("vector-effect", "non-scaling-stroke").attr("d", path)
    .on("click", (e, d) => { if (S.picking) return; e.stopPropagation(); if (typeof onbLandClick === "function" && onbLandClick(d)) return; zoomToCountry(d); })
    .append("title").text(d => HIDE_LABEL.has(d.properties.n) ? "" : cName(d));
  gWorld.append("path").attr("class", "admin1").attr("vector-effect", "non-scaling-stroke").attr("d", path(ADMIN1));
}

function zoomToCountry(f) {
  const polys = f.geometry.coordinates;
  const areas = polys.map(p => d3.geoArea({ type: "Polygon", coordinates: p }));
  const maxA = d3.max(areas);
  const main = { type: "MultiPolygon", coordinates: polys.filter((p, i) => areas[i] >= maxA * 0.08) };
  let [[x0, y0], [x1, y1]] = path.bounds(main);
  const fb = path.bounds(FRAME);
  x0 = Math.max(x0, fb[0][0]); y0 = Math.max(y0, fb[0][1]); x1 = Math.min(x1, fb[1][0]); y1 = Math.min(y1, fb[1][1]);
  if (x1 <= x0 || y1 <= y0) return;
  const narrow = matchMedia("(max-width:760px)").matches;
  const top = narrow ? 70 : 20, availH = (narrow ? H * 0.52 : H) - top - 20, availW = W - 40;
  const k = Math.max(1, Math.min(40, 0.86 / Math.max((x1 - x0) / availW, (y1 - y0) / availH)));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const t = d3.zoomIdentity.translate(W / 2, top + availH / 2).scale(k).translate(-cx, -cy);
  gWorld.selectAll("path.land").classed("on", d => d === f);
  svg.transition().duration(matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 750).call(zoom.transform, t);
}

/* labels + pins live in screen space so text stays crisp at every zoom */
function drawOverlay() {
  const k = T.k;
  const P = ll => { const p = projection(ll); return p ? T.apply(p) : [-999, -999]; };
  const on = (x, y, m = 40) => x > -m && y > -m && x < W + m && y < H + m;
  const boxes = [];
  const free = (x, y, w, h) => { for (const b of boxes) if (x < b[2] && x + w > b[0] && y < b[3] && y + h > b[1]) return false; boxes.push([x, y, x + w, y + h]); return true; };
  const shown = S.places.filter(p => S.filter === "all" || p.kind === S.filter || p.id === S.selId);
  const pinPts = shown.map(p => P([p.lon, p.lat]));
  const FAR = k < DOT_ZOOM;
  const asDot = d => FAR && d.id !== S.selId && d.id !== "__temp";
  pinPts.forEach(([x, y], i) => {
    if (asDot(shown[i])) { boxes.push([x - 6, y - 6, x + 6, y + 6]); return; }
    boxes.push([x - 9, y - 26, x + 9, y + 2]);
    const w = L(shown[i], "title").length * 6.9 + 10;
    boxes.push([x - w / 2, y - 46, x + w / 2, y - 27]);
  });

  const lbls = [];
  // seas
  for (const [nn, lon, lat, minK, rot] of SEAS) {
    const n = nn[LANG === "tr" ? 0 : 1];
    if (k < minK || k > minK * 7) continue;
    const [x, y] = P([lon, lat]); if (!on(x, y)) continue;
    lbls.push({ t: n, x, y, cls: "lbl lbl-sea", rot, fs: Math.min(16, 12 + k) });
  }
  // countries
  if (k < 9) {
    const feats = COUNTRIES.features.filter(f => !HIDE_LABEL.has(f.properties.n) && f.properties.area * k * k > 0.00045).sort((a, b) => b.properties.area - a.properties.area);
    for (const f of feats) {
      const [x, y] = P(f.properties.c); if (!on(x, y)) continue;
      const nm = cName(f); const w = nm.length * 8.4;
      if (free(x - w / 2, y - 8, w, 14)) lbls.push({ t: nm, x, y, cls: "lbl lbl-country" });
    }
  }
  // cities
  const maxRank = k < 1.7 ? -1 : k < 2.8 ? 1 : k < 4.5 ? 2 : k < 7 ? 3 : k < 10 ? 4 : k < 15 ? 5 : k < 22 ? 6 : k < 32 ? 7 : 8;
  const cities = CITIES.filter(c => c[3] <= maxRank || (c[4] && k >= 2.2)).sort((a, b) => a[3] - b[3] || b[4] - a[4]);
  for (const c of cities) {
    const [x, y] = P([c[1], c[2]]); if (!on(x, y)) continue;
    const nm = cityName(c[0]); const w = nm.length * 6.6 + 8;
    if (free(x - 3, y - 7, w, 14)) lbls.push({ t: nm, x, y, cls: "lbl lbl-city", dot: true });
  }

  const sel = gLabels.selectAll("g.l").data(lbls, d => d.cls + d.t);
  sel.exit().remove();
  const ent = sel.enter().append("g").attr("class", "l");
  ent.each(function (d) {
    const g = d3.select(this);
    if (d.dot) g.append("circle").attr("class", "dot-city").attr("r", 2.6);
    g.append("text").attr("class", d.cls).attr("x", d.dot ? 6 : 0).attr("dy", d.dot ? "0.35em" : "0.35em")
      .attr("text-anchor", d.dot ? "start" : "middle").text(d.t);
  });
  ent.merge(sel).attr("transform", d => `translate(${d.x},${d.y})${d.rot ? ` rotate(${d.rot})` : ""}`)
    .select("text.lbl-sea").style("font-size", d => d.fs + "px");

  // pins
  const list = shown.slice();
  if (S.temp) list.push({ id: "__temp", kind: "temp", lon: S.temp.lon, lat: S.temp.lat, title: t("newNote") });
  const ps = gPins.selectAll("g.pin").data(list, d => d.id);
  ps.exit().remove();
  const pe = ps.enter().append("g").attr("tabindex", 0).attr("role", "button");
  pe.append("circle").attr("class", "dotc").attr("r", 5);
  pe.append("path").attr("class", "head").attr("d", "M0,0 C-3,-6 -9,-10 -9,-16 A9,9 0 1 1 9,-16 C9,-10 3,-6 0,0Z");
  pe.append("circle").attr("class", "eye").attr("cy", -16).attr("r", 3.2);
  const fk = pe.append("g").attr("class", "fk").attr("transform", "translate(0,-16)");
  fk.append("path").attr("d", "M-3,-5 V-1.2 M-1.5,-5 V5 M0,-5 V-1.2 M-3,-1.2 Q-1.5,0.6 0,-1.2");
  fk.append("path").attr("d", "M3,5 V-5 Q5,-2.8 3,0.6");
  pe.append("text").attr("class", "emo").attr("y", -11.5).attr("text-anchor", "middle");
  pe.append("text").attr("class", "pin-lbl").attr("y", -32).attr("text-anchor", "middle");
  pe.append("title");
  pe.on("click", (e, d) => { e.stopPropagation(); if (d.id !== "__temp") openDetail(d.id, true); })
    .on("keydown", (e, d) => { if ((e.key === "Enter" || e.key === " ") && d.id !== "__temp") { e.preventDefault(); openDetail(d.id, true); } });
  const all = pe.merge(ps);
  all.attr("class", d => `pin ${d.kind}${d.id === S.selId ? " sel" : ""}${d.id === "__temp" ? " temp" : ""}${d.example ? " example" : ""}${d.home ? " home" : ""}${asDot(d) ? " dot" : ""}`)
    .attr("aria-label", d => L(d, "title"))
    .attr("transform", d => { const [x, y] = P([d.lon, d.lat]); const s = asDot(d) ? 1 : d.id === S.selId || d.id === "__temp" ? 1.25 : 1; return `translate(${x},${y}) scale(${s})`; })
    .select("title").text(d => L(d, "title") + (d.city ? " · " + cityName(d.city) : ""));
  all.select("text.pin-lbl").text(d => d.id === "__temp" ? "" : L(d, "title"));
  all.select("text.emo").text(d => d.home ? "🏠" : "");
  all.filter(d => d.id === S.selId || d.id === "__temp").raise();
}

function flyTo(lon, lat, k = 7) {
  const p = projection([lon, lat]);
  const narrow = matchMedia("(max-width:760px)").matches;
  const cy = narrow ? H * 0.26 : H / 2;
  const t = d3.zoomIdentity.translate(W / 2, cy).scale(Math.max(k, T.k)).translate(-p[0], -p[1]);
  svg.transition().duration(matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 750).call(zoom.transform, t);
}

svg.on("mousemove", e => {
  const [mx, my] = d3.pointer(e);
  const ll = projection.invert(T.invert([mx, my]));
  if (ll) $("#readout").textContent = fmtCoord(ll[0], ll[1]);
});
svg.on("click", e => {
  if (!S.picking) return;
  const [mx, my] = d3.pointer(e);
  const ll = projection.invert(T.invert([mx, my]));
  if (!ll) return;
  setPicking(false);
  S.temp = { lon: +ll[0].toFixed(4), lat: +ll[1].toFixed(4) };
  startForm(null, S.temp);
});
function setPicking(on) {
  S.picking = on; mapEl.classList.toggle("picking", on); $("#pickBanner").hidden = !on;
  if (on) setSheet("collapsed");
}
$("#pickCancel").onclick = () => setPicking(false);

/* geography lookups for the form */
function whereIs(lon, lat) {
  const f = COUNTRIES.features.find(f => d3.geoContains(f, [lon, lat]));
  let best = null, bd = Infinity;
  for (const c of CITIES) { const d = d3.geoDistance([lon, lat], [c[1], c[2]]); if (d < bd) { bd = d; best = c; } }
  return { country: f ? f.properties.nm.tr : "", iso: f ? f.properties.iso : "", city: best && bd * 6371 < 60 ? cityName(best[0]) : "" };
}

/* ---------------- panel ---------------- */
const panel = $("#panel"), body = $("#panelBody");
function setSheet(s) { panel.classList.remove("collapsed", "tall"); if (s) panel.classList.add(s); }
$("#handle").onclick = () => {
  if (panel.classList.contains("collapsed")) setSheet(null);
  else if (panel.classList.contains("tall")) setSheet("collapsed");
  else setSheet("tall");
};

function render() {
  body.replaceChildren();
  body.dataset.view = S.panelMode === "map" ? S.view : S.panelMode;
  if (S.panelMode === "onboard") renderOnboard();
  else if (S.panelMode === "settings") renderSettings();
  else if (S.panelMode === "people") renderPeople();
  else if (S.ownerState === "notfound") renderNotFound();
  else if (S.view === "detail") renderDetail();
  else if (S.view === "form") renderForm();
  else renderList();
  drawOverlay();
}

function stars(n) {
  const s = el("span", { class: "stars", "aria-label": `${n} / 5` });
  for (let i = 1; i <= 5; i++) s.append(el("span", { class: i <= n ? "" : "off", text: "★" }));
  return s;
}

function renderList() {
  const yer = S.places.filter(p => p.kind === "yer").length;
  const yemek = S.places.filter(p => p.kind === "yemek").length;
  const countries = new Set(S.places.map(p => p.iso || p.country).filter(Boolean)).size;
  if (!S.owner) { body.append(el("div", { class: "empty" }, el("strong", { text: t("loadingT") }), t("loadingB"))); return; }
  body.append(profileCard());
  if (S.ownerState === "locked") { body.append(lockedBox()); return; }
  const head = el("div", { class: "ph" },
    el("div", {}, el("div", { class: "eyebrow", text: t("eyebrowList") }), el("h2", { text: S.canEdit ? t("listTitle") : t("listTitleOther") })),
    S.canEdit ? el("button", { class: "btn", type: "button", onclick: () => { S.temp = null; setPicking(true); } }, t("addNote")) : null);
  body.append(head);
  if (S.canEdit && S.owner.visibility === "ghost") body.append(el("div", { class: "notice", text: t("ghostNote") }));
  if (S.canEdit && S.owner.visibility === "private") body.append(el("div", { class: "notice", text: t("privateNote") }));
  body.append(el("div", { class: "stats", "aria-label": t("tally", yer, yemek, countries) },
    el("div", { class: "stat" }, el("b", { text: String(yer) }), el("span", { text: t("f_yer") })),
    el("div", { class: "stat" }, el("b", { text: String(yemek) }), el("span", { text: t("f_yemek") })),
    el("div", { class: "stat" }, el("b", { text: String(countries) }), el("span", { text: t("countries") }))));

  if (S.dbState === "error") {
    body.append(el("div", { class: "notice", text: t("dbErr") }));
  }

  const chips = el("div", { class: "chips", role: "group", "aria-label": t("filter") });
  for (const [k, lab] of [["all", t("f_all")], ["yer", t("f_yer")], ["yemek", t("f_yemek")]]) {
    chips.append(el("button", { class: "chip", type: "button", "aria-pressed": String(S.filter === k), onclick: () => { S.filter = k; ls("ad-filter", k); render(); } },
      k !== "all" ? el("span", { class: "chip-ic", "aria-hidden": "true", text: ICON[k] }) : null, lab));
  }
  body.append(chips);


  const items = S.places.filter(p => S.filter === "all" || p.kind === S.filter);
  if (!S.loaded && S.dbState === "pending") {
    body.append(el("div", { class: "empty" }, el("strong", { text: t("loadingT") }), t("loadingB")));
    return;
  }
  if (!items.length) {
    body.append(el("div", { class: "empty" },
      el("strong", { text: S.places.length ? t("emptyFilter") : t("emptyAll") }),
      S.canEdit ? t("emptyEdit") : t("emptyView"),
      S.canEdit && !S.places.length ? el("div", { style: "margin-top:12px" }, el("a", { class: "btn small", href: "#/start" }, ot("menu"))) : null));
    return;
  }
  const byCountry = d3.groups(items, p => placeCountry(p) || t("other"))
    .sort((a, b) => d3.max(b[1], p => p.date || "") .localeCompare(d3.max(a[1], p => p.date || "")));
  for (const [country, arr] of byCountry) {
    body.append(el("div", { class: "group-h" }, country, el("span", { text: t("pins", arr.length) })));
    const ul = el("ul", { class: "pcards" });
    arr.sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.createdAt || 0) - (a.createdAt || 0));
    for (const p of arr) {
      const ph = el("div", { class: "pc-ph" + (p.photos && p.photos.length ? " has" : "") });
      if (p.photos && p.photos.length) ph.append(el("img", { src: blobUrl(p.photos[0]), alt: "", loading: "lazy" }));
      if (p.iso) ph.append(el("span", { class: "stamp", text: p.iso }));
      if (p.example) ph.append(el("span", { class: "tag-ex on-ph", text: t("example") }));
      const sub = el("span", { class: "pc-s" }, el("i", { class: "sw " + p.kind }),
        p.home ? "🏠 " + t("home") : p.kind === "yemek" && p.rating ? stars(p.rating) : KIND_LABEL(p.kind),
        p.city && p.city !== p.title ? " · " + cityName(p.city) : "");
      ul.append(el("li", {}, el("button", { class: "pcard", type: "button", onclick: () => openDetail(p.id, true) }, ph,
        el("b", { class: "pc-t", text: L(p, "title") }), sub,
        p.date ? el("span", { class: "pc-d", text: fmtDate(p.date) }) : null)));
    }
    body.append(ul);
  }
}

const distKm = (a, b) => d3.geoDistance([a.lon, a.lat], [b.lon, b.lat]) * 6371;
function relRow(q) {
  const th = el("div", { class: "thumb" });
  if (q.photos && q.photos.length) th.append(el("img", { src: blobUrl(q.photos[0]), alt: "", loading: "lazy" }));
  else th.append(el("span", { class: "rel-ic", "aria-hidden": "true", text: q.home ? "\u{1F3E0}" : ICON[q.kind] }));
  const sub = q.kind === "yemek" ? [L(q, "dish"), q.rating ? stars(q.rating) : null] : [q.city && q.city !== q.title ? cityName(q.city) : KIND_LABEL(q.kind)];
  return el("li", {}, el("button", { class: "rel-row", type: "button", onclick: () => openDetail(q.id, true) }, th,
    el("div", { style: "min-width:0" }, el("div", { class: "rel-t", text: L(q, "title") }), el("div", { class: "rel-s" }, ...sub.filter(Boolean)))));
}
function renderRelated(p) {
  const R = p.home ? 35 : 15;
  const near = S.places.filter(q => q.id !== p.id && distKm(p, q) <= R).sort((a, b) => distKm(p, a) - distKm(p, b));
  const food = near.filter(q => q.kind === "yemek");
  const spots = near.filter(q => q.kind !== "yemek");
  const block = (title, arr) => { if (!arr.length) return; body.append(el("section", { class: "rel" }, el("h3", { text: title }), el("ul", {}, arr.map(relRow)))); };
  if (p.kind === "yemek") { block(t("nearbyFood"), food); block(t("nearbyPlaces"), spots); }
  else { block(t("eatHere"), food); block(t("nearbyPlaces"), spots); }
}

function openDetail(id, fly) {
  const p = S.places.find(x => x.id === id); if (!p) return;
  S.selId = id; S.view = "detail"; S.temp = null; S.confirmDel = false;
  if (panel.classList.contains("collapsed")) setSheet(null);
  render();
  if (fly) flyTo(p.lon, p.lat, 28);
  $("#panelBody").scrollTop = 0;
}
function backToList() { S.view = "list"; S.selId = null; S.temp = null; render(); }

function renderDetail() {
  const p = S.places.find(x => x.id === S.selId);
  if (!p) { S.view = "list"; renderList(); return; }
  body.append(el("button", { class: "back", type: "button", onclick: backToList }, t("allNotes")));
  body.append(el("div", { class: "kind-line eyebrow" }, el("span", { class: "sw " + p.kind }), p.home ? "🏠 " + t("home") : KIND_LABEL(p.kind), p.example ? el("span", { class: "tag-ex", text: t("example") }) : null));
  body.append(el("h2", { class: "d-title", text: L(p, "title") }));
  body.append(el("p", { class: "d-place", text: [p.city && cityName(p.city), placeCountry(p)].filter(Boolean).join(", ") }));
  body.append(el("div", { class: "coords", text: fmtCoord(p.lon, p.lat) }));

  if (p.photos && p.photos.length) {
    const g = el("div", { class: "gallery" });
    p.photos.forEach((id, i) => g.append(el("button", { type: "button", "aria-label": t("photoN", i + 1), onclick: () => openLb(p.photos, i) }, el("img", { src: blobUrl(id), alt: "", loading: "lazy" }))));
    body.append(g);
  }

  const facts = el("dl", { class: "facts" });
  const fact = (k, v) => { if (v) facts.append(el("dt", { text: k }), el("dd", {}, v)); };
  fact(t("date"), fmtDate(p.date));
  if (p.kind === "yemek") {
    fact(t("dish"), L(p, "dish"));
    if (p.rating) fact(t("rating"), stars(p.rating));
    fact(t("price"), p.price ? priceLabel(p.price) : "");
  }
  if (facts.children.length) body.append(facts);
  if (p.note) body.append(el("div", { class: "note", text: L(p, "note") }));
  renderRelated(p);

  if (S.canEdit) {
    const act = el("div", { class: "d-actions" });
    if (!S.confirmDel) {
      act.append(el("button", { class: "btn ghost", type: "button", onclick: () => startForm(p) }, t("edit")),
        el("button", { class: "btn ghost", type: "button", onclick: () => { S.confirmDel = true; render(); } }, t("del")));
    } else {
      act.append(el("div", { class: "confirm" }, t("delQ"),
        el("button", { class: "btn danger small", type: "button", onclick: () => deletePlace(p) }, t("delYes")),
        el("button", { class: "btn ghost small", type: "button", onclick: () => { S.confirmDel = false; render(); } }, t("cancel"))));
    }
    body.append(act);
  }
}

/* ---------------- form ---------------- */
function startForm(p, at) {
  const base = p ? { ...p, photos: [...(p.photos || [])] } : (() => {
    const w = whereIs(at.lon, at.lat);
    return { kind: "yer", title: "", city: w.city, country: w.country, iso: w.iso, lon: at.lon, lat: at.lat, date: new Date().toISOString().slice(0, 10), note: "", dish: "", rating: 0, price: "", photos: [] };
  })();
  S.form = { data: base, editingId: p ? p.id : null, newFiles: [], removed: [], busy: false, err: "" };
  S.view = "form"; S.selId = p ? p.id : null;
  if (panel.classList.contains("collapsed")) setSheet("tall");
  render();
  flyTo(base.lon, base.lat, Math.max(T.k, 4));
}

function renderForm() {
  const F = S.form, d = F.data;
  body.append(el("button", { class: "back", type: "button", onclick: cancelForm }, t("backCancel")));
  body.append(el("div", { class: "eyebrow", text: F.editingId ? t("editNote") : t("newNote") }));
  body.append(el("div", { class: "coords", style: "margin-bottom:14px", text: fmtCoord(d.lon, d.lat) + ((d.iso && regionName(d.iso)) || d.country ? "  ·  " + ((d.iso && regionName(d.iso)) || d.country) : "") }));

  const form = el("form", { class: "form", onsubmit: e => { e.preventDefault(); savePlace(); } });
  const bind = (key) => e => { d[key] = e.target.value; };

  const seg = el("div", { class: "seg", role: "group", "aria-label": t("type") });
  for (const k of ["yer", "yemek"]) seg.append(el("button", { type: "button", "aria-pressed": String(d.kind === k), onclick: () => { d.kind = k; render(); } }, el("span", { class: "sw " + k }), t("t_" + k)));
  form.append(el("div", { class: "field" }, el("span", { class: "lab", text: t("type") }), seg));

  form.append(el("div", { class: "field" }, el("label", { for: "f-title", text: d.kind === "yemek" ? t("venue") : t("titleL") }),
    el("input", { id: "f-title", required: true, maxlength: 120, value: d.title, placeholder: d.kind === "yemek" ? t("phVenue") : t("phTitle"), oninput: bind("title") })));

  form.append(el("div", { class: "row2" },
    el("div", { class: "field" }, el("label", { for: "f-city", text: t("city") }), el("input", { id: "f-city", maxlength: 80, value: d.city, oninput: bind("city") })),
    el("div", { class: "field" }, el("label", { for: "f-country", text: t("country") }), el("input", { id: "f-country", maxlength: 60, value: d.country, oninput: bind("country") }))));

  form.append(el("div", { class: "field" }, el("label", { for: "f-date", text: t("date") }), el("input", { id: "f-date", type: "date", value: d.date, oninput: bind("date") })));

  if (d.kind === "yemek") {
    form.append(el("div", { class: "field" }, el("label", { for: "f-dish", text: t("dish") }), el("input", { id: "f-dish", maxlength: 160, value: d.dish, placeholder: t("phDish"), oninput: bind("dish") })));
    form.append(el("div", { class: "field" }, el("label", { for: "f-dish-en", text: t("dishEn") }), el("input", { id: "f-dish-en", maxlength: 160, value: d.dish_en || "", placeholder: "e.g. almond croissant", oninput: bind("dish_en") })));
    const rate = el("div", { class: "rate", role: "group", "aria-label": t("rating") });
    for (let i = 1; i <= 5; i++) rate.append(el("button", { type: "button", class: i <= d.rating ? "on" : "", "aria-label": t("star", i), onclick: () => { d.rating = d.rating === i ? 0 : i; render(); } }, "★"));
    const price = el("select", { id: "f-price", onchange: bind("price") });
    for (const v of ["", "Ucuz", "Orta", "Pahalı", "Çok pahalı"]) price.append(el("option", { value: v, selected: d.price === v, text: priceLabel(v) }));
    form.append(el("div", { class: "row2" },
      el("div", { class: "field" }, el("span", { class: "lab", text: t("rating") }), rate),
      el("div", { class: "field" }, el("label", { for: "f-price", text: t("price") }), price)));
  }

  form.append(el("div", { class: "field" }, el("label", { for: "f-note", text: t("notes") }),
    el("textarea", { id: "f-note", maxlength: 8000, placeholder: t("phNote"), oninput: bind("note") }, d.note)));
  form.append(el("div", { class: "field" }, el("label", { for: "f-note-en", text: t("notesEn") }),
    el("textarea", { id: "f-note-en", maxlength: 8000, placeholder: t("phNoteEn"), oninput: bind("note_en") }, d.note_en || "")));

  // photos
  const pf = el("div", { class: "field" }, el("span", { class: "lab", text: t("photos") }));
  const pvs = el("div", { class: "previews" });
  d.photos.forEach(id => pvs.append(el("div", { class: "pv" }, el("img", { src: blobUrl(id), alt: "" }),
    el("button", { type: "button", "aria-label": t("removePhoto"), onclick: () => { d.photos = d.photos.filter(x => x !== id); F.removed.push(id); render(); } }, "✕"))));
  F.newFiles.forEach((f, i) => pvs.append(el("div", { class: "pv" }, el("img", { src: f.url, alt: "" }),
    el("button", { type: "button", "aria-label": t("removePhoto"), onclick: () => { URL.revokeObjectURL(f.url); F.newFiles.splice(i, 1); render(); } }, "✕"))));
  if (pvs.children.length) pf.append(pvs);
  if (S.canUpload) {
    const input = el("input", { type: "file", id: "f-photos", accept: "image/*", multiple: true, onchange: e => addFiles(e.target.files) });
    const drop = el("label", { class: "drop", for: "f-photos" }, input, t("drop"));
    drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("over"));
    drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("over"); addFiles(e.dataTransfer.files); });
    pf.append(drop, el("span", { class: "hint", text: t("shrinkHint") }));
  } else {
    pf.append(el("span", { class: "hint", text: t("noUpload") }));
  }
  form.append(pf);

  if (F.err) form.append(el("div", { class: "err", role: "alert", text: F.err }));
  form.append(el("div", { class: "form-actions" },
    el("button", { class: "btn ghost", type: "button", onclick: cancelForm, disabled: F.busy }, t("cancel")),
    el("button", { class: "btn", type: "submit", disabled: F.busy }, F.busy ? (F.progress || t("saving")) : t("save"))));
  body.append(form);
}

function addFiles(list) {
  const F = S.form;
  for (const f of list) {
    if (!f.type.startsWith("image/")) continue;
    F.newFiles.push({ file: f, url: URL.createObjectURL(f) });
  }
  // keep typed values: they are already bound into F.data
  render();
}
function cancelForm() {
  const F = S.form;
  F && F.newFiles.forEach(f => URL.revokeObjectURL(f.url));
  const back = F && F.editingId;
  S.form = null; S.temp = null;
  if (back) openDetail(back, false); else backToList();
}

async function shrink(file) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const max = 2000, s = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (s === 1 && file.size < 1.5e6 && /jpe?g|png|webp/.test(file.type)) return file;
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("encode")), "image/jpeg", 0.86));
  } catch (e) {
    if (/jpe?g|png|webp|gif/.test(file.type)) return file;
    throw new Error(t("badFile", file.name));
  }
}

/* ---------------- data (Supabase) ---------------- */
const PIN_COLS = "id,user_id,kind,home,title,title_en,city,country,iso,lat,lon,visited_on,note,note_en,dish,dish_en,rating,price,photos,created_at";
const fromRow = r => ({
  id: r.id, user_id: r.user_id, kind: r.kind, home: r.home, title: r.title, title_en: r.title_en, city: r.city, country: r.country, iso: r.iso,
  lat: r.lat, lon: r.lon, date: r.visited_on || "", note: r.note, note_en: r.note_en, dish: r.dish, dish_en: r.dish_en,
  rating: r.rating, price: r.price, photos: r.photos || [], createdAt: Date.parse(r.created_at) || 0,
});
const toRow = d => ({
  kind: d.kind, home: !!d.home, title: d.title.trim(), title_en: (d.title_en || "").trim(),
  city: (d.city || "").trim(), country: (d.country || "").trim(), iso: d.iso || "", lat: d.lat, lon: d.lon,
  visited_on: d.date || null, note: d.note || "", note_en: d.note_en || "",
  dish: d.kind === "yemek" ? (d.dish || "").trim() : "", dish_en: d.kind === "yemek" ? (d.dish_en || "").trim() : "",
  rating: d.kind === "yemek" ? (d.rating || 0) : 0, price: d.kind === "yemek" ? (d.price || "") : "",
  photos: d.photos || [],
});

async function signPhotos(paths) {
  const need = [...new Set(paths.filter(p => p && !PHOTO.has(p)))];
  if (!need.length) return;
  for (let i = 0; i < need.length; i += 100) {
    const { data } = await sb.storage.from("photos").createSignedUrls(need.slice(i, i + 100), 60 * 60 * 6);
    (data || []).forEach(x => { if (x.signedUrl) PHOTO.set(x.path, x.signedUrl); });
  }
}
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
async function uploadPhoto(blob) {
  const path = `${S.me.id}/${uid()}.jpg`;
  const { error } = await sb.storage.from("photos").upload(path, blob, { contentType: blob.type || "image/jpeg", upsert: false });
  if (error) throw error;
  PHOTO.set(path, URL.createObjectURL(blob));
  return path;
}
async function removePhotos(paths) { if (paths.length) { try { await sb.storage.from("photos").remove(paths); } catch (e) {} } }

async function savePlace() {
  const F = S.form, d = F.data;
  if (!d.title.trim()) { F.err = t("needTitle"); render(); return; }
  if (!S.me) { F.err = t("needLogin"); render(); return; }
  F.busy = true; F.err = ""; render();
  try {
    const ids = [...d.photos];
    for (let i = 0; i < F.newFiles.length; i++) {
      F.progress = t("uploading", i + 1, F.newFiles.length); render();
      ids.push(await uploadPhoto(await shrink(F.newFiles[i].file)));
    }
    F.progress = t("saving"); render();
    const row = toRow({ ...d, photos: ids });
    const q = F.editingId
      ? sb.from("pins").update(row).eq("id", F.editingId).select(PIN_COLS).single()
      : sb.from("pins").insert({ ...row, user_id: S.me.id }).select(PIN_COLS).single();
    const { data, error } = await q;
    if (error) throw error;
    await removePhotos(F.removed);
    F.newFiles.forEach(f => URL.revokeObjectURL(f.url));
    const wasEdit = !!F.editingId;
    S.form = null; S.temp = null;
    upsertLocal(fromRow(data));
    toast(wasEdit ? t("updated") : t("added"));
    openDetail(data.id, false);
  } catch (e) {
    console.error(e);
    F.busy = false; F.progress = "";
    F.err = e && (e.code === "42501" || e.statusCode === "403") ? t("noPerm") : (e && e.message && /açılamadı|couldn't be opened/.test(e.message) ? e.message : t("saveErr"));
    render();
  }
}
function upsertLocal(p) {
  const i = S.places.findIndex(x => x.id === p.id);
  if (i >= 0) S.places[i] = p; else S.places.push(p);
}
async function deletePlace(p) {
  const { error } = await sb.from("pins").delete().eq("id", p.id);
  if (error) { toast(t("delErr")); return; }
  await removePhotos(p.photos || []);
  S.places = S.places.filter(x => x.id !== p.id);
  toast(t("deleted")); backToList();
}

async function fetchMe() {
  const { data: { session } } = await sb.auth.getSession();
  S.session = session;
  if (!session) { S.me = null; return; }
  const { data } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  S.me = data || null;
  if (S.me && S.me.avatar_path) await signPhotos([S.me.avatar_path]);
}

async function loadOwner(username, quiet) {
  S.ownerState = "loading"; S.owner = null; S.places = []; S.loaded = false; S.rel = null; S.view = "list"; S.selId = null;
  render();
  const { data: prof, error } = await sb.from("profiles").select("*").ilike("username", username).maybeSingle();
  if (error) { S.dbState = "error"; S.ownerState = "notfound"; render(); return; }
  if (!prof) { S.ownerState = "notfound"; S.loaded = true; renderChrome(); render(); return; }
  S.owner = prof;
  S.canEdit = !!(S.me && S.me.id === prof.id);
  S.canUpload = S.canEdit;
  if (S.me && !S.canEdit) {
    const { data: rel } = await sb.from("follows").select("status").eq("follower_id", S.me.id).eq("following_id", prof.id).maybeSingle();
    S.rel = rel ? rel.status : null;
  }
  const allowed = S.canEdit || prof.visibility === "public" || (prof.visibility === "private" && S.rel === "accepted");
  const [fol, fing] = await Promise.all([
    sb.from("follows").select("follower_id", { count: "exact", head: true }).eq("following_id", prof.id).eq("status", "accepted"),
    sb.from("follows").select("following_id", { count: "exact", head: true }).eq("follower_id", prof.id).eq("status", "accepted"),
  ]);
  S.counts = { followers: fol.count || 0, following: fing.count || 0 };
  if (!allowed) { S.ownerState = "locked"; S.loaded = true; await signPhotos([prof.avatar_path]); renderChrome(); render(); return; }
  const { data: pins, error: pe } = await sb.from("pins").select(PIN_COLS).eq("user_id", prof.id);
  if (pe) { S.dbState = "error"; } else { S.dbState = "ok"; }
  S.places = (pins || []).map(fromRow);
  await signPhotos([prof.avatar_path, ...S.places.flatMap(p => p.photos)]);
  S.ownerState = "ok"; S.loaded = true;
  renderChrome(); render();
  maybeAutoIntro();
  if (!quiet && S.canEdit && !S.places.length && !ls("mp-onb-done-" + S.me.id)) location.hash = "#/start";
}

async function follow() {
  if (!S.me) return signIn();
  const { error } = await sb.from("follows").insert({ follower_id: S.me.id, following_id: S.owner.id });
  if (error) { toast(t("loadErr")); return; }
  await loadOwner(S.owner.username);
}
async function unfollow() {
  await sb.from("follows").delete().eq("follower_id", S.me.id).eq("following_id", S.owner.id);
  await loadOwner(S.owner.username);
}
async function signIn() {
  ls("mp-after", location.hash || "#/");
  await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } });
}
async function signOut() { await sb.auth.signOut(); S.me = null; location.hash = "#/"; route(); }
/* ---------------- lightbox ---------------- */
function openLb(list, i) { S.lb = { list, i }; showLb(); $("#lightbox").hidden = false; $("#lbClose").focus(); }
function showLb() { const { list, i } = S.lb; $("#lbImg").src = blobUrl(list[i]); $("#lbPrev").hidden = $("#lbNext").hidden = list.length < 2; }
function stepLb(n) { const L = S.lb; L.i = (L.i + n + L.list.length) % L.list.length; showLb(); }
function closeLb() { $("#lightbox").hidden = true; S.lb = null; }
$("#lbClose").onclick = closeLb; $("#lbPrev").onclick = () => stepLb(-1); $("#lbNext").onclick = () => stepLb(1);
$("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLb(); });
document.addEventListener("keydown", e => {
  if (S.lb) { if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") stepLb(-1); if (e.key === "ArrowRight") stepLb(1); return; }
  if (e.key === "Escape" && S.picking) setPicking(false);
});

/* ---------------- onboarding: countries → find places in photos → add pins ---------------- */
const OT = {
  tr: {
    eyebrow: "Haritanı oluştur", t1: "Hangi ülkelere gittin?", p1: "Haritada ülkelere dokun ya da listeden seç.",
    search: "Ülke ara", selected: n => `${n} ülke seçildi`, next: "Devam", skip: "Şimdilik geç",
    t2: "Gittiğin yerleri fotoğraflarından bulalım", p2: "Seçtiğin ülkelerde çektiğin fotoğrafların nerede çekildiğine bakıp gittiğin yerleri listeleriz.",
    privacy: "🔒 Fotoğrafların cihazından çıkmaz ve yüklenmez. Sadece içlerindeki konum ve tarih bilgisini okuruz.",
    pick: "Fotoğrafları seç", pickHint: "İpucu: Fotoğraflara tek tek dokunmak yerine parmağını fotoğrafların üzerinde kaydırarak onlarcasını tek hareketle seçebilirsin. Ne kadar çok fotoğraf, o kadar çok yer.",
    scanning: (a, b) => `Fotoğraflar inceleniyor… ${a} / ${b}`, back: "← Geri",
    t3: "Gittiğin yerler", p3: "Eklemek istediklerini işaretle. Fotoğraf ve not eklemeyi sonra yaparsın.",
    stats: (n, l) => `${n} fotoğrafın ${l} tanesinde konum bilgisi vardı.`, none: "Seçtiğin ülkelerde konum bilgisi olan fotoğraf bulamadık.",
    noneHint: "Telefonunda kamera için konum kaydı kapalı olabilir. Ülkelerini yine de ekleyebilir ya da yerleri haritadan tek tek işaretleyebilirsin.",
    photos: n => `${n} fotoğraf`, spots: n => `Noktaları gör (${n})`, hideSpots: "Noktaları gizle",
    spotHint: "Bu bölgedeki ayrı noktaları da pin olarak ekleyebilirsin. Neresi olduğunu hatırlamıyorsan yakındaki yerlerden birini seç.",
    asPin: "Ayrı pin olarak ekle", near: "Yakında:", loadingNear: "Yakındaki yerler aranıyor…", noNear: "Yakında isimli bir yer bulunamadı.",
    namePh: "Burası neresiydi?", unnamed: r => `İsimsiz yer, ${r} yakınları`, homeFlag: "🏠 Evin ya da iş yerin olabilir, bu yüzden işaretlemedik.",
    already: "Zaten haritanda", others: (c, n) => `${c} ülkesinde de ${n} fotoğrafın var.`, addCountry: "Bunu da ekle",
    add: n => `Seçilenleri ekle (${n})`, adding: "Ekleniyor…", done: n => `${n} pin haritana eklendi`, addErr: "Eklenemedi. Bağlantını kontrol edip tekrar dene.",
    menu: "📷 Fotoğraflardan yer bul", near_u: "yakınları",
  },
  en: {
    eyebrow: "Build your map", t1: "Which countries have you been to?", p1: "Tap countries on the map or pick them from the list.",
    search: "Search countries", selected: n => `${n} ${n === 1 ? "country" : "countries"} selected`, next: "Continue", skip: "Skip for now",
    t2: "Let's find the places you've been in your photos", p2: "We look at where your photos from the selected countries were taken and list the places you've been.",
    privacy: "🔒 Your photos never leave your device and aren't uploaded. We only read the location and date stored in them.",
    pick: "Choose photos", pickHint: "Tip: instead of tapping photos one by one, slide your finger across them to select dozens in one move. More photos, more places.",
    scanning: (a, b) => `Looking at photos… ${a} / ${b}`, back: "← Back",
    t3: "Places you've been", p3: "Tick the ones you want to add. You can add photos and notes later.",
    stats: (n, l) => `${l} of ${n} photos had location data.`, none: "We didn't find photos with location data in the selected countries.",
    noneHint: "Location saving may be off for your camera. You can still add your countries, or mark places on the map one by one.",
    photos: n => `${n} ${n === 1 ? "photo" : "photos"}`, spots: n => `See spots (${n})`, hideSpots: "Hide spots",
    spotHint: "You can also add separate spots in this area as pins. If you don't remember the name, pick one of the nearby places.",
    asPin: "Add as a separate pin", near: "Nearby:", loadingNear: "Looking for nearby places…", noNear: "No named places found nearby.",
    namePh: "What was this place?", unnamed: r => `Unnamed place near ${r}`, homeFlag: "🏠 This might be your home or workplace, so we left it unticked.",
    already: "Already on your map", others: (c, n) => `You also have ${n} photos in ${c}.`, addCountry: "Add it too",
    add: n => `Add selected (${n})`, adding: "Adding…", done: n => `${n} pins added to your map`, addErr: "Couldn't add. Check your connection and try again.",
    menu: "📷 Find places in photos", near_u: "area",
  },
};
const ot = (k, ...a) => { const v = OT[LANG][k] ?? OT.tr[k]; return typeof v === "function" ? v(...a) : v; };

/* --- tiny JPEG EXIF reader: GPS + DateTimeOriginal --- */
async function readExif(file) {
  try {
    const buf = await file.slice(0, 256 * 1024).arrayBuffer();
    const v = new DataView(buf);
    if (v.getUint16(0) !== 0xFFD8) return null;
    let o = 2;
    while (o + 4 < v.byteLength) {
      const marker = v.getUint16(o), len = v.getUint16(o + 2);
      if (marker === 0xFFE1 && v.getUint32(o + 4) === 0x45786966) return parseTiff(v, o + 10);
      if ((marker & 0xFF00) !== 0xFF00) break;
      o += 2 + len;
    }
  } catch (e) {}
  return null;
}
function parseTiff(v, t) {
  const le = v.getUint16(t) === 0x4949;
  const u16 = p => v.getUint16(p, le), u32 = p => v.getUint32(p, le);
  const ifd = off => {
    const out = {}; const n = u16(t + off);
    for (let i = 0; i < n; i++) {
      const e = t + off + 2 + i * 12, tag = u16(e), type = u16(e + 2), cnt = u32(e + 4);
      const sz = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 }[type] || 1;
      const p = sz * cnt > 4 ? t + u32(e + 8) : e + 8;
      if (type === 2) { let s = ""; for (let k = 0; k < cnt - 1; k++) s += String.fromCharCode(v.getUint8(p + k)); out[tag] = s; }
      else if (type === 5) { const a = []; for (let k = 0; k < cnt; k++) a.push(u32(p + k * 8) / (u32(p + k * 8 + 4) || 1)); out[tag] = a; }
      else if (type === 3) out[tag] = u16(p);
      else if (type === 4) out[tag] = u32(p);
    }
    return out;
  };
  const i0 = ifd(u32(t + 4));
  let date = i0[0x0132] || "";
  if (i0[0x8769]) { const ex = ifd(i0[0x8769]); if (ex[0x9003]) date = ex[0x9003]; }
  if (!i0[0x8825]) return { date: exifDate(date) };
  const g = ifd(i0[0x8825]);
  if (!g[2] || !g[4]) return { date: exifDate(date) };
  const deg = a => a[0] + a[1] / 60 + a[2] / 3600;
  let lat = deg(g[2]), lon = deg(g[4]);
  if (g[1] === "S") lat = -lat; if (g[3] === "W") lon = -lon;
  if (!isFinite(lat) || !isFinite(lon) || (lat === 0 && lon === 0)) return { date: exifDate(date) };
  return { lat, lon, date: exifDate(date) };
}
const exifDate = s => { const m = /^(\d{4}):(\d{2}):(\d{2})/.exec(s || ""); return m ? `${m[1]}-${m[2]}-${m[3]}` : ""; };

/* --- geography helpers --- */
const COUNTRY_LIST = COUNTRIES.features.filter(f => f.properties.iso).map(f => ({ iso: f.properties.iso, f, b: d3.geoBounds(f) }));
function countryOf(lon, lat) {
  for (const c of COUNTRY_LIST) {
    const [[x0, y0], [x1, y1]] = c.b;
    if (lon < x0 - .1 || lon > x1 + .1 || lat < y0 - .1 || lat > y1 + .1) continue;
    if (d3.geoContains(c.f, [lon, lat])) return c.iso;
  }
  return "";
}
const isoName = iso => { const c = COUNTRY_LIST.find(x => x.iso === iso); return c ? cName(c.f) : iso; };
const isoNameTr = iso => { const c = COUNTRY_LIST.find(x => x.iso === iso); return c ? c.f.properties.nm.tr : iso; };
const km = (a, b) => d3.geoDistance([a.lon, a.lat], [b.lon, b.lat]) * 6371;
function nearestCity(lon, lat) {
  let best = null, bd = Infinity;
  for (const c of CITIES) { const d = d3.geoDistance([lon, lat], [c[1], c[2]]) * 6371; if (d < bd) { bd = d; best = c; } }
  return best ? { name: best[0], lon: best[1], lat: best[2], d: bd } : null;
}
const flag = iso => iso && iso.length === 2 ? String.fromCodePoint(...[...iso.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0))) : "";

/* --- state --- */
let ONB = null;
const onbReset = () => { ONB = { step: "countries", sel: new Set(), q: "", pts: [], total: 0, scanned: 0, regions: [], others: {}, busy: false, err: "" }; };

function onbLandClick(f) {
  if (S.panelMode !== "onboard" || !ONB || ONB.step !== "countries" || !f.properties.iso) return false;
  const iso = f.properties.iso;
  ONB.sel.has(iso) ? ONB.sel.delete(iso) : ONB.sel.add(iso);
  onbPaint(); render();
  return true;
}
function onbPaint() {
  gWorld.selectAll("path.land").classed("picked", d => !!(ONB && S.panelMode === "onboard" && ONB.sel.has(d.properties.iso)));
}

/* --- clustering --- */
function onbGroup() {
  const pts = ONB.pts.filter(p => ONB.sel.has(p.iso));
  ONB.others = {};
  ONB.pts.forEach(p => { if (p.iso && !ONB.sel.has(p.iso)) ONB.others[p.iso] = (ONB.others[p.iso] || 0) + 1; });
  // spots: greedy 250 m clusters over a grid
  const spots = [], grid = new Map(), G = 0.005;
  const key = (x, y) => `${Math.floor(x / G)},${Math.floor(y / G)}`;
  for (const p of pts) {
    const gx = Math.floor(p.lon / G), gy = Math.floor(p.lat / G);
    let hit = null;
    for (let dx = -1; dx <= 1 && !hit; dx++) for (let dy = -1; dy <= 1 && !hit; dy++) {
      for (const s of grid.get(`${gx + dx},${gy + dy}`) || []) if (km(s, p) < 0.25) { hit = s; break; }
    }
    if (!hit) { hit = { lon: p.lon, lat: p.lat, n: 0, sx: 0, sy: 0, days: new Set(), dates: [], iso: p.iso }; spots.push(hit); const k = key(p.lon, p.lat); grid.set(k, [...(grid.get(k) || []), hit]); }
    hit.n++; hit.sx += p.lon; hit.sy += p.lat; if (p.date) { hit.days.add(p.date); hit.dates.push(p.date); }
  }
  spots.forEach(s => { s.lon = s.sx / s.n; s.lat = s.sy / s.n; s.date = s.dates.sort()[0] || ""; s.home = s.days.size >= 20; s.on = false; s.name = ""; s.kind = "yer"; s.near = null;
    s.existing = S.places.some(q => km(q, s) < 0.3); });
  // regions: greedy 8 km clusters of spots, named after the nearest known town
  const regsArr = [];
  for (const sp of [...spots].sort((a, b) => b.n - a.n)) {
    let r = regsArr.find(x => x.iso === sp.iso && km(x.seed, sp) < 8);
    if (!r) {
      const c = nearestCity(sp.lon, sp.lat), close = c && c.d <= 8;
      r = { key: sp.iso + "|" + sp.lon.toFixed(3) + sp.lat.toFixed(3), iso: sp.iso, seed: { lon: sp.lon, lat: sp.lat }, spots: [], n: 0, open: false,
        name: c ? cityName(c.name) + (close ? "" : " " + ot("near_u")) : isoName(sp.iso), city: close ? cityName(c.name) : "",
        lon: close ? c.lon : sp.lon, lat: close ? c.lat : sp.lat, needName: !close };
      regsArr.push(r);
    }
    r.spots.push(sp); r.n += sp.n;
  }
  const regs = new Map(regsArr.map(r => [r.key, r]));
  ONB.regions = [...regs.values()].map(r => {
    r.spots.sort((a, b) => b.n - a.n);
    r.home = r.spots.every(s => s.home);
    r.existing = S.places.some(q => km(q, r) < 3) || r.spots.every(s => s.existing);
    r.date = r.spots.map(s => s.date).filter(Boolean).sort()[0] || "";
    r.on = !r.home && !r.existing;
    return r;
  }).sort((a, b) => a.iso.localeCompare(b.iso) || b.n - a.n);
}

/* --- place names: OpenStreetMap (Nominatim + Overpass with mirrors) --- */
const OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];
async function overpass(q) {
  for (const url of OVERPASS) {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 9000);
    try {
      const r = await fetch(url, { method: "POST", body: "data=" + encodeURIComponent(q), signal: ctl.signal });
      clearTimeout(tm);
      if (r.ok) return await r.json();
    } catch (e) { clearTimeout(tm); }
  }
  return { elements: [] };
}
let nomQ = Promise.resolve();
function nominatim(lat, lon, zoom) {
  // public Nominatim allows ~1 request per second: queue calls
  const job = nomQ.then(async () => {
    try {
      const u = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat.toFixed(5)}&lon=${lon.toFixed(5)}&zoom=${zoom}&addressdetails=1&namedetails=1&accept-language=${LANG === "tr" ? "tr,en" : "en"}`;
      const r = await fetch(u); return r.ok ? await r.json() : null;
    } catch (e) { return null; }
  });
  nomQ = job.then(() => new Promise(res => setTimeout(res, 1100)));
  return job;
}
const townOf = a => a ? (a.village || a.town || a.city || a.municipality || a.suburb || a.hamlet || a.county || "") : "";
const FOOD = new Set(["restaurant", "cafe", "bar", "fast_food", "pub", "ice_cream", "biergarten", "food_court", "bakery", "pastry", "confectionery", "deli"]);
const KEEP = { amenity: /^(restaurant|cafe|bar|fast_food|pub|ice_cream|biergarten|food_court|marketplace|place_of_worship)$/, tourism: /^(attraction|viewpoint|museum|gallery|artwork|zoo|theme_park|picnic_site)$/,
  natural: /^(beach|bay|cape|peak|cliff|spring|waterfall|cave_entrance)$/, leisure: /^(park|garden|nature_reserve|marina|beach_resort)$/, historic: /./, shop: /^(bakery|pastry|confectionery|deli|coffee)$/, place: /^(square|islet|locality)$/ };
async function photonNear(s) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 9000);
  try {
    const r = await fetch(`https://photon.komoot.io/reverse?lat=${s.lat.toFixed(5)}&lon=${s.lon.toFixed(5)}&limit=25&radius=0.3&lang=${LANG === "tr" ? "default" : "en"}`, { signal: ctl.signal });
    clearTimeout(tm);
    if (!r.ok) return null;
    const j = await r.json();
    return (j.features || []).map(f => {
      const p = f.properties || {}, [lon, lat] = f.geometry.coordinates;
      return { name: p.name, key: p.osm_key, val: p.osm_value, d: km({ lat, lon }, s) * 1000 };
    }).filter(x => x.name && KEEP[x.key] && KEEP[x.key].test(x.val)).map(x => ({ name: x.name, food: FOOD.has(x.val), d: x.d, cat: x.val }));
  } catch (e) { clearTimeout(tm); return null; }
}
async function onbNear(s) {
  if (s.near) return;
  s.near = "loading"; render();
  try {
    let list = await photonNear(s);
    if (!list || !list.length) {
      const q = `[out:json][timeout:15];nwr(around:180,${s.lat.toFixed(5)},${s.lon.toFixed(5)})["name"][~"^(amenity|tourism|natural|leisure|historic)$"~"^(restaurant|cafe|bar|fast_food|pub|ice_cream|bakery|museum|attraction|viewpoint|gallery|artwork|beach|bay|cape|park|garden|nature_reserve|marina|castle|monument|ruins|fort|lighthouse|place_of_worship|marketplace)$"];out center 40;`;
      const j = await overpass(q);
      list = (j.elements || []).map(e => {
        const t = e.tags || {}, lat = e.lat ?? e.center?.lat, lon = e.lon ?? e.center?.lon;
        const cat = t.amenity || t.tourism || t.natural || t.leisure || t.historic || "";
        return { name: t.name, food: FOOD.has(cat), d: lat ? km({ lat, lon }, s) * 1000 : 999, cat };
      });
    }
    const seen = new Set();
    s.near = list.filter(x => x.name && x.d < 400 && !seen.has(x.name) && seen.add(x.name)).sort((a, b) => a.d - b.d).slice(0, 6);
    if (!s.name && s.near.length) { s.name = s.near[0].name; s.kind = s.near[0].food ? "yemek" : "yer"; s.suggested = true; }
  } catch (e) { s.near = []; }
  render();
}

async function onbNameRegions() {
  for (const r of ONB.regions.filter(x => !x.named)) {
    r.named = true;
    const j = await nominatim(r.seed.lat, r.seed.lon, 13);
    const town = townOf(j && j.address);
    if (town) { r.name = town; r.city = town; render(); continue; }
    if (!r.needName) continue;
    const q = `[out:json][timeout:15];node(around:12000,${r.seed.lat.toFixed(4)},${r.seed.lon.toFixed(4)})[place~"^(city|town|village)$"][name];out 30;`;
    const o = await overpass(q);
    const best = (o.elements || []).map(e => ({ name: e.tags.name, lat: e.lat, lon: e.lon })).sort((a, b) => km(a, r.seed) - km(b, r.seed))[0];
    if (best && km(best, r.seed) < 6) { r.name = best.name; r.city = best.name; render(); }
  }
}

/* --- scanning --- */
async function onbScan(files) {
  const list = [...files].filter(f => /image\//.test(f.type) || /\.(jpe?g|heic|heif|png)$/i.test(f.name));
  ONB.step = "scan"; ONB.total = list.length; ONB.scanned = 0; ONB.pts = []; render();
  let i = 0;
  const worker = async () => {
    while (i < list.length) {
      const f = list[i++];
      const ex = await readExif(f);
      if (ex && ex.lat != null) ONB.pts.push({ lat: ex.lat, lon: ex.lon, date: ex.date, iso: countryOf(ex.lon, ex.lat) });
      ONB.scanned++;
      if (ONB.scanned % 25 === 0) { const b = $("#onb-prog"); if (b) b.textContent = ot("scanning", ONB.scanned, ONB.total); }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  onbGroup();
  ONB.step = "results"; render();
  onbNameRegions();
  const all = ONB.regions.filter(r => r.on);
  if (all.length) fitPoints(all);
}
function fitPoints(arr) {
  const ext = d3.extent(arr, r => r.lon), eyt = d3.extent(arr, r => r.lat);
  const [x0, y0] = projection([ext[0], eyt[1]]), [x1, y1] = projection([ext[1], eyt[0]]);
  const narrow = matchMedia("(max-width:760px)").matches;
  const top = narrow ? 70 : 40, availH = (narrow ? H * 0.5 : H) - top - 40, availW = W - 80;
  const k = Math.max(1, Math.min(30, 0.8 / Math.max((x1 - x0 || 1) / availW, (y1 - y0 || 1) / availH)));
  const t = d3.zoomIdentity.translate(W / 2, top + availH / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
  svg.transition().duration(700).call(zoom.transform, t);
}

/* --- adding --- */
function onbCount() {
  return ONB.regions.reduce((a, r) => a + (r.on ? 1 : 0) + r.spots.filter(s => s.on).length, 0);
}
async function onbAdd() {
  const rows = [];
  for (const r of ONB.regions) {
    if (r.on) rows.push({ user_id: S.me.id, kind: "yer", title: r.city || r.name, city: r.city, country: isoNameTr(r.iso), iso: r.iso, lat: r.lat, lon: r.lon, visited_on: r.date || null });
    for (const s of r.spots) if (s.on) rows.push({ user_id: S.me.id, kind: s.kind, title: (s.name || "").trim() || ot("unnamed", r.city || r.name), city: r.city, country: isoNameTr(r.iso), iso: r.iso, lat: s.lat, lon: s.lon, visited_on: s.date || null });
  }
  if (!rows.length) return;
  ONB.busy = true; ONB.err = ""; render();
  const { data, error } = await sb.from("pins").insert(rows).select(PIN_COLS);
  ONB.busy = false;
  if (error) { console.error(error); ONB.err = ot("addErr"); render(); return; }
  ls("mp-onb-done-" + S.me.id, "1");
  S.places.push(...data.map(fromRow));
  toast(ot("done", data.length));
  ONB = null; location.hash = "#/u/" + S.me.username;
}

/* --- rendering --- */
function renderOnboard() {
  if (!S.me) { body.append(el("div", { class: "empty" }, el("strong", { text: ot("t1") }), t("needSignIn"))); return; }
  if (!ONB) onbReset();
  body.append(el("div", { class: "eyebrow", text: ot("eyebrow") }));
  if (ONB.step === "countries") return onbCountries();
  if (ONB.step === "scan") return onbScanView();
  return onbResults();
}
function onbCountries() {
  body.append(el("h2", { class: "d-title", text: ot("t1") }), el("p", { class: "onb-p", text: ot("p1") }));
  const sel = [...ONB.sel];
  if (sel.length) body.append(el("div", { class: "onb-sel" }, sel.map(iso => el("button", { class: "chip on", type: "button", "aria-pressed": "true", onclick: () => { ONB.sel.delete(iso); onbPaint(); render(); } }, flag(iso) + " " + isoName(iso) + " ✕"))));
  const input = el("input", { id: "onb-q", type: "search", placeholder: ot("search"), value: ONB.q, oninput: e => { ONB.q = e.target.value; render(); const i = $("#onb-q"); i.focus(); i.setSelectionRange(i.value.length, i.value.length); } });
  body.append(el("div", { class: "field search" }, input));
  const q = ONB.q.trim().toLocaleLowerCase(LANG);
  const list = COUNTRY_LIST.filter(c => !ONB.sel.has(c.iso) && (!q || cName(c.f).toLocaleLowerCase(LANG).includes(q))).sort((a, b) => cName(a.f).localeCompare(cName(b.f), LANG));
  body.append(el("div", { class: "onb-list" }, list.slice(0, q ? 40 : 60).map(c => el("button", { class: "chip", type: "button", onclick: () => { ONB.sel.add(c.iso); ONB.q = ""; onbPaint(); render(); } }, flag(c.iso) + " " + cName(c.f)))));
  body.append(el("div", { class: "onb-foot" },
    el("button", { class: "btn ghost", type: "button", onclick: onbSkip }, ot("skip")),
    el("button", { class: "btn", type: "button", disabled: !ONB.sel.size, onclick: () => { ONB.step = "photos"; render(); } }, ONB.sel.size ? ot("selected", ONB.sel.size) + " · " + ot("next") : ot("next"))));
}
function onbSkip() { if (S.me) ls("mp-onb-done-" + S.me.id, "1"); ONB = null; location.hash = "#/u/" + S.me.username; }
function onbScanView() {
  body.append(el("h2", { class: "d-title", text: ot("t2") }));
  body.append(el("div", { class: "onb-scan" }, el("span", { class: "spinner" }), el("span", { id: "onb-prog", text: ot("scanning", ONB.scanned, ONB.total) })));
}
function onbResults() {
  if (ONB.step === "photos") {
    body.append(el("button", { class: "back", type: "button", onclick: () => { ONB.step = "countries"; render(); } }, ot("back")));
    body.append(el("h2", { class: "d-title", text: ot("t2") }), el("p", { class: "onb-p", text: ot("p2") }));
    body.append(el("div", { class: "notice", text: ot("privacy") }));
    body.append(el("div", { class: "onb-sel" }, [...ONB.sel].map(iso => el("span", { class: "chip on" }, flag(iso) + " " + isoName(iso)))));
    const inp = el("input", { type: "file", id: "onb-files", accept: "image/*", multiple: true, class: "vh", onchange: e => onbScan(e.target.files) });
    body.append(el("label", { class: "btn onb-pick", for: "onb-files" }, "📷 " + ot("pick"), inp), el("p", { class: "hint", text: ot("pickHint") }));
    body.append(el("div", { class: "onb-foot" }, el("button", { class: "btn ghost", type: "button", onclick: onbSkip }, ot("skip"))));
    return;
  }
  body.append(el("button", { class: "back", type: "button", onclick: () => { ONB.step = "photos"; render(); } }, ot("back")));
  body.append(el("h2", { class: "d-title", text: ot("t3") }), el("p", { class: "onb-p", text: ot("p3") }));
  body.append(el("p", { class: "hint", text: ot("stats", ONB.total, ONB.pts.length) }));
  if (!ONB.regions.length) {
    body.append(el("div", { class: "empty" }, el("strong", { text: ot("none") }), ot("noneHint")));
  }
  let lastIso = null;
  for (const r of ONB.regions) {
    if (r.iso !== lastIso) { lastIso = r.iso; body.append(el("div", { class: "group-h" }, flag(r.iso) + " " + isoName(r.iso))); }
    const row = el("div", { class: "onb-reg" + (r.on ? " on" : "") });
    row.append(el("label", { class: "onb-check" },
      el("input", { type: "checkbox", checked: r.on, onchange: e => { r.on = e.target.checked; render(); } }),
      el("span", { class: "onb-reg-t" }, el("b", { text: r.name }),
        el("span", { text: [ot("photos", r.n), r.date ? fmtMonth(r.date) : "", r.existing ? ot("already") : ""].filter(Boolean).join(" · ") }))));
    if (r.home) row.append(el("p", { class: "hint", text: ot("homeFlag") }));
    if (r.spots.length > 1 || r.spots[0].n > 2) row.append(el("button", { class: "linkbtn", type: "button", onclick: () => { r.open = !r.open; if (r.open) { flyTo(r.spots[0].lon, r.spots[0].lat, 20); r.spots.slice(0, 12).forEach(onbNear); } render(); } }, r.open ? ot("hideSpots") : ot("spots", r.spots.length)));
    if (r.open) {
      row.append(el("p", { class: "hint", text: ot("spotHint") }));
      for (const s of r.spots.slice(0, 12)) {
        const sp = el("div", { class: "onb-spot" + (s.on ? " on" : "") });
        sp.append(el("label", { class: "onb-check" }, el("input", { type: "checkbox", checked: s.on, onchange: e => { s.on = e.target.checked; render(); } }),
          el("span", { class: "onb-reg-t" }, el("b", { text: s.name || ot("asPin") }), el("span", { text: [ot("photos", s.n), s.date ? fmtMonth(s.date) : "", s.existing ? ot("already") : ""].filter(Boolean).join(" · ") }))));
        if (s.on || s.near) {
          const near = el("div", { class: "onb-near" });
          if (s.near === "loading" || s.near === null) near.append(el("span", { class: "hint", text: ot("loadingNear") }));
          else if (!s.near.length) near.append(el("span", { class: "hint", text: ot("noNear") }));
          else { near.append(el("span", { class: "hint", text: ot("near") }));
            s.near.forEach(n => near.append(el("button", { class: "chip" + (s.name === n.name ? " on" : ""), type: "button", "aria-pressed": String(s.name === n.name),
              onclick: () => { s.name = n.name; s.kind = n.food ? "yemek" : "yer"; s.on = true; render(); } }, (n.food ? "🍴 " : "") + n.name + ` · ${Math.round(n.d)} m`))); }
          near.append(el("input", { class: "onb-name", type: "text", maxlength: 120, placeholder: ot("namePh"), value: s.name, onchange: e => { s.name = e.target.value; if (s.name) s.on = true; render(); } }));
          sp.append(near);
        }
        row.append(sp);
      }
    }
    body.append(row);
  }
  const oth = Object.entries(ONB.others).sort((a, b) => b[1] - a[1]).slice(0, 4);
  for (const [iso, n] of oth) body.append(el("div", { class: "notice onb-other" }, flag(iso) + " " + ot("others", isoName(iso), n) + " ",
    el("button", { class: "btn ghost small", type: "button", onclick: () => { ONB.sel.add(iso); onbGroup(); onbPaint(); render(); onbNameRegions(); } }, ot("addCountry"))));
  if (ONB.err) body.append(el("div", { class: "err", role: "alert", text: ONB.err }));
  const n = onbCount();
  body.append(el("div", { class: "onb-foot sticky" },
    el("button", { class: "btn ghost", type: "button", onclick: onbSkip }, ot("skip")),
    el("button", { class: "btn", type: "button", disabled: !n || ONB.busy, onclick: onbAdd }, ONB.busy ? ot("adding") : ot("add", n))));
}
const fmtMonth = s => { const d = new Date(s + "T12:00:00"); return isNaN(d) ? "" : d.toLocaleDateString(t("locale"), { month: "short", year: "numeric" }); };
/* ---------------- chrome: brand, account menu ---------------- */
const avatarEl = (prof, cls = "av") => {
  const box = el("span", { class: cls, "aria-hidden": "true" });
  const url = prof && prof.avatar_path ? blobUrl(prof.avatar_path) : "";
  if (url) box.append(el("img", { src: url, alt: "" }));
  else box.append(el("span", { text: ((prof && (prof.display_name || prof.username)) || "?").trim().charAt(0).toLocaleUpperCase(LANG) }));
  return box;
};
const mapLink = u => location.origin + location.pathname + "#/u/" + encodeURIComponent(u);

function renderChrome() {
  const o = S.owner;
  $("#brandName").textContent = o ? (o.display_name || o.username) : t("siteName");
  $("#brandSub").textContent = o ? "@" + o.username + " · MyPins" : t("tagline");
  $("#aboutBtn").hidden = !o;
  document.title = o ? `${o.display_name || o.username} · MyPins` : "MyPins";
  const acct = $("#acct");
  acct.replaceChildren();
  if (!S.me) {
    acct.append(el("button", { class: "acct-signin", type: "button", onclick: signIn }, googleMark(), t("signIn")));
  } else {
    const btn = el("button", { class: "acct-btn", type: "button", "aria-label": t("menu"), "aria-haspopup": "menu", "aria-expanded": "false" }, avatarEl(S.me));
    if (S.pending) btn.append(el("span", { class: "badge", text: String(S.pending) }));
    const menu = el("div", { class: "acct-menu", role: "menu", hidden: true },
      el("div", { class: "acct-who" }, el("b", { text: S.me.display_name || S.me.username }), el("span", { text: "@" + S.me.username })),
      el("a", { role: "menuitem", href: "#/u/" + S.me.username }, "🗺️ " + t("myMap")),
      el("a", { role: "menuitem", href: "#/start" }, ot("menu")),
      el("a", { role: "menuitem", href: "#/people" }, "👥 " + t("people"), S.pending ? el("span", { class: "badge in", text: String(S.pending) }) : null),
      el("a", { role: "menuitem", href: "#/settings" }, "⚙️ " + t("settings")),
      el("button", { role: "menuitem", type: "button", onclick: signOut }, t("signOut")));
    btn.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute("aria-expanded", String(!menu.hidden)); };
    menu.addEventListener("click", () => { menu.hidden = true; });
    acct.append(btn, menu);
  }
}
document.addEventListener("click", () => { const m = document.querySelector(".acct-menu"); if (m) m.hidden = true; });
function googleMark() {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 18 18"); s.setAttribute("width", "16"); s.setAttribute("height", "16"); s.setAttribute("aria-hidden", "true");
  s.innerHTML = '<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>';
  return s;
}

/* ---------------- profile card (top of the travel log) ---------------- */
function profileCard() {
  const o = S.owner;
  const card = el("div", { class: "pcardx" });
  card.append(avatarEl(o, "av av-lg"),
    el("div", { class: "pcx-main" },
      el("b", { class: "pcx-name", text: o.display_name || o.username }),
      el("span", { class: "pcx-user", text: "@" + o.username }),
      el("span", { class: "pcx-counts", text: t("followers", S.counts.followers) + " · " + t("following", S.counts.following) })));
  const acts = el("div", { class: "pcx-acts" });
  if (S.canEdit) {
    acts.append(el("a", { class: "btn ghost small", href: "#/settings" }, t("editProfile")));
    if (o.visibility !== "ghost") acts.append(el("button", { class: "btn ghost small", type: "button", onclick: () => copyText(mapLink(o.username)) }, t("copyLink")));
  } else if (S.rel === "accepted") {
    acts.append(el("button", { class: "btn ghost small", type: "button", onclick: unfollow }, t("followingBtn")));
  } else if (S.rel === "pending") {
    acts.append(el("button", { class: "btn ghost small", type: "button", onclick: unfollow }, t("requested")));
  } else {
    acts.append(el("button", { class: "btn small", type: "button", onclick: follow }, t("follow")));
  }
  card.append(acts);
  return card;
}
function lockedBox() {
  return el("div", { class: "empty" }, el("strong", { text: "🔒 " + t("lockedT") }), S.me ? t("lockedB") : t("lockedSignIn"));
}
function renderNotFound() {
  body.append(el("div", { class: "empty" }, el("strong", { text: t("notFoundT") }), t("notFoundB"), el("div", { style: "margin-top:12px" },
    el("a", { class: "btn small", href: "#/people" }, t("findPeople")))));
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); toast(t("copied")); }
  catch (e) { toast(txt); }
}

/* ---------------- settings ---------------- */
let SET = null;
function renderSettings() {
  if (!S.me) { body.append(el("div", { class: "empty" }, el("strong", { text: t("settings") }), t("needSignIn"), el("div", { style: "margin-top:12px" }, el("button", { class: "acct-signin", type: "button", onclick: signIn }, googleMark(), t("signIn"))))); return; }
  if (!SET) SET = { d: { display_name: S.me.display_name, username: S.me.username, bio: S.me.bio, bio_en: S.me.bio_en, visibility: S.me.visibility }, busy: false, err: "", msg: "" };
  const d = SET.d;
  body.append(el("a", { class: "back", href: "#/u/" + S.me.username }, "← " + t("myMap")));
  body.append(el("div", { class: "eyebrow", text: t("settings") }), el("h2", { class: "d-title", text: t("sProfile") }));
  const form = el("form", { class: "form", onsubmit: e => { e.preventDefault(); saveSettings(); } });
  const bind = k => e => { d[k] = e.target.value; };
  const ph = el("div", { class: "field" }, el("span", { class: "lab", text: t("sPhoto") }),
    el("div", { class: "set-photo" }, avatarEl(S.me, "av av-lg"),
      el("label", { class: "btn ghost small", for: "s-photo" }, t(S.me.avatar_path ? "photoChange" : "photoUp"),
        el("input", { type: "file", id: "s-photo", accept: "image/*", class: "vh", onchange: e => uploadAvatar(e.target.files[0]) })),
      el("span", { class: "hint", id: "s-photo-msg" })));
  form.append(ph);
  form.append(el("div", { class: "field" }, el("label", { for: "s-name", text: t("sName") }), el("input", { id: "s-name", maxlength: 60, value: d.display_name, oninput: bind("display_name") })));
  form.append(el("div", { class: "field" }, el("label", { for: "s-user", text: t("sUser") }),
    el("input", { id: "s-user", maxlength: 24, value: d.username, autocapitalize: "none", spellcheck: "false", oninput: e => { d.username = e.target.value.toLowerCase(); $("#s-user-hint").textContent = t("sUserHint") + mapLink(d.username); } }),
    el("span", { class: "hint", id: "s-user-hint", text: t("sUserHint") + mapLink(d.username) })));
  form.append(el("div", { class: "field" }, el("label", { for: "s-bio", text: t("sBio") }), el("textarea", { id: "s-bio", maxlength: 1200, oninput: bind("bio") }, d.bio)));
  form.append(el("div", { class: "field" }, el("label", { for: "s-bio-en", text: t("sBioEn") }), el("textarea", { id: "s-bio-en", maxlength: 1200, oninput: bind("bio_en") }, d.bio_en)));
  const modes = el("div", { class: "modes", role: "radiogroup", "aria-label": t("sMode") });
  for (const m of ["public", "private", "ghost"]) {
    modes.append(el("label", { class: "mode" + (d.visibility === m ? " on" : "") },
      el("input", { type: "radio", name: "s-mode", value: m, checked: d.visibility === m, onchange: () => { d.visibility = m; render(); } }),
      el("span", { class: "mode-t", text: { public: "🌍 ", private: "🔒 ", ghost: "👻 " }[m] + t("m_" + m) }),
      el("span", { class: "mode-d", text: t("m_" + m + "D") })));
  }
  form.append(el("div", { class: "field" }, el("span", { class: "lab", text: t("sMode") }), modes));
  if (SET.err) form.append(el("div", { class: "err", role: "alert", text: SET.err }));
  form.append(el("div", { class: "form-actions" }, el("button", { class: "btn", type: "submit", disabled: SET.busy }, SET.busy ? t("saving") : t("save"))));
  body.append(form);
  body.append(el("div", { class: "set-out" }, el("button", { class: "btn ghost small", type: "button", onclick: signOut }, t("signOut"))));
}
async function saveSettings() {
  const d = SET.d;
  if (!/^[a-z0-9_.]{3,24}$/.test(d.username)) { SET.err = t("sUserBad"); render(); return; }
  SET.busy = true; SET.err = ""; render();
  const { data, error } = await sb.from("profiles").update({
    display_name: d.display_name.trim(), username: d.username, bio: d.bio, bio_en: d.bio_en, visibility: d.visibility,
  }).eq("id", S.me.id).select("*").single();
  SET.busy = false;
  if (error) { SET.err = error.code === "23505" ? t("sUserTaken") : t("saveErr"); render(); return; }
  S.me = data; SET = null; toast(t("sSaved"));
  renderChrome(); render();
}
async function uploadAvatar(file) {
  if (!file) return;
  const msg = $("#s-photo-msg"); msg.textContent = t("photoSaving");
  try {
    const path = await uploadPhoto(await shrink(file));
    const old = S.me.avatar_path;
    const { data, error } = await sb.from("profiles").update({ avatar_path: path }).eq("id", S.me.id).select("*").single();
    if (error) throw error;
    S.me = data; if (old) removePhotos([old]);
    renderChrome(); render();
  } catch (e) { msg.textContent = t("photoErr"); }
}

/* ---------------- people: search, requests, followers ---------------- */
let PEOPLE = { q: "", results: null, requests: [], followers: [], following: [], loaded: false };
async function loadPeople() {
  if (!S.me) return;
  const sel = k => `${k},status,created_at,profiles!follows_${k}_fkey(id,username,display_name,avatar_path,visibility)`;
  const [req, fol, fing] = await Promise.all([
    sb.from("follows").select(sel("follower_id")).eq("following_id", S.me.id).eq("status", "pending"),
    sb.from("follows").select(sel("follower_id")).eq("following_id", S.me.id).eq("status", "accepted"),
    sb.from("follows").select(sel("following_id")).eq("follower_id", S.me.id),
  ]);
  PEOPLE.requests = (req.data || []).map(r => r.profiles).filter(Boolean);
  PEOPLE.followers = (fol.data || []).map(r => r.profiles).filter(Boolean);
  PEOPLE.following = (fing.data || []).map(r => ({ ...r.profiles, _status: r.status })).filter(p => p.id);
  S.pending = PEOPLE.requests.length;
  await signPhotos([...PEOPLE.requests, ...PEOPLE.followers, ...PEOPLE.following].map(p => p.avatar_path));
  PEOPLE.loaded = true;
}
let searchT;
function personRow(p, extra) {
  return el("li", { class: "person" },
    el("a", { class: "person-link", href: "#/u/" + p.username }, avatarEl(p),
      el("span", { class: "person-txt" }, el("b", { text: p.display_name || p.username }), el("span", { text: "@" + p.username + (p.visibility === "private" ? " · 🔒" : "") }))),
    extra || null);
}
function renderPeople() {
  body.append(el("div", { class: "eyebrow", text: "MyPins" }), el("h2", { class: "d-title", text: t("people") }));
  const input = el("input", { id: "p-search", type: "search", placeholder: t("searchPh"), value: PEOPLE.q, autocapitalize: "none", oninput: e => {
    PEOPLE.q = e.target.value; clearTimeout(searchT);
    searchT = setTimeout(async () => {
      const q = PEOPLE.q.trim().replace(/[%,()]/g, "");
      if (q.length < 2) { PEOPLE.results = null; render(); focusSearch(); return; }
      const { data } = await sb.from("profiles").select("id,username,display_name,avatar_path,visibility").or(`username.ilike.%${q}%,display_name.ilike.%${q}%`).limit(20);
      PEOPLE.results = (data || []).filter(p => !S.me || p.id !== S.me.id);
      await signPhotos(PEOPLE.results.map(p => p.avatar_path));
      render(); focusSearch();
    }, 280);
  } });
  body.append(el("div", { class: "field search" }, input));
  if (PEOPLE.results) {
    body.append(PEOPLE.results.length ? el("ul", { class: "people" }, PEOPLE.results.map(p => personRow(p))) : el("p", { class: "hint", text: t("searchNone") }));
  }
  if (!S.me) { body.append(el("p", { class: "hint", text: t("needSignIn") })); return; }
  if (!PEOPLE.loaded) { loadPeople().then(render); return; }
  const sec = (title, arr, extra) => body.append(el("section", { class: "rel" }, el("h3", { text: title + (arr.length ? ` (${arr.length})` : "") }),
    arr.length ? el("ul", { class: "people" }, arr.map(p => personRow(p, extra && extra(p)))) : el("p", { class: "hint", text: title === t("requests") ? t("noRequests") : t("nobody") })));
  if (S.me.visibility === "private" || PEOPLE.requests.length) sec(t("requests"), PEOPLE.requests, p => el("span", { class: "person-acts" },
    el("button", { class: "btn small", type: "button", onclick: () => answerRequest(p.id, true) }, t("accept")),
    el("button", { class: "btn ghost small", type: "button", onclick: () => answerRequest(p.id, false) }, t("decline"))));
  sec(t("followingT"), PEOPLE.following, p => p._status === "pending" ? el("span", { class: "hint", text: t("requested") }) : null);
  if (S.me.visibility !== "ghost") sec(t("followersT"), PEOPLE.followers);
}
const focusSearch = () => { const i = $("#p-search"); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };
async function answerRequest(followerId, ok) {
  const q = ok ? sb.from("follows").update({ status: "accepted" }) : sb.from("follows").delete();
  const { error } = await q.eq("follower_id", followerId).eq("following_id", S.me.id);
  if (error) { toast(t("loadErr")); return; }
  await loadPeople(); renderChrome(); render();
}

/* ---------------- intro / about modal ---------------- */
let lastFocus = null;
function fillIntro(kind) {
  const box = $("#introBody"); box.replaceChildren();
  if (kind === "welcome") {
    box.append(el("div", { class: "avatar brand-av" }, el("span", { text: "📍" })),
      el("h2", { id: "introTitle", text: t("welcomeT") }), el("p", { text: t("welcomeP1") }), el("p", { text: t("welcomeP2") }),
      el("div", { class: "intro-acts" }, el("button", { class: "acct-signin big", type: "button", onclick: signIn }, googleMark(), t("signIn")),
        el("button", { class: "btn ghost", type: "button", onclick: closeIntro }, t("browseFirst"))));
  } else {
    const o = S.owner; const bio = (LANG === "en" && o.bio_en) || o.bio || "";
    box.append(avatarEl(o, "avatar"), el("h2", { id: "introTitle", text: t("hello", o.display_name || o.username) }));
    (bio ? bio.split(/\n\s*\n/) : [t("noBio")]).forEach(par => box.append(el("p", { text: par })));
    box.append(el("div", { class: "intro-acts" }, el("button", { class: "btn", type: "button", onclick: closeIntro }, t("explore"))));
  }
}
function openIntro(kind = "about") { fillIntro(kind); lastFocus = document.activeElement; $("#intro").hidden = false; const b = $("#intro .intro-acts button"); if (b) b.focus(); }
function closeIntro() { $("#intro").hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
function maybeAutoIntro() {
  if (!S.owner || S.canEdit || !(S.owner.bio || S.owner.bio_en)) return;
  const k = "mp-seen-" + S.owner.id; if (ls(k)) return; ls(k, "1"); openIntro("about");
}
$("#aboutBtn").onclick = () => openIntro("about");
$("#introX").onclick = closeIntro;
$("#intro").addEventListener("click", e => { if (e.target.id === "intro") closeIntro(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#intro").hidden) closeIntro(); });

/* ---------------- routing ---------------- */
async function route() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const [a, b] = h.split("/");
  S.form = null; S.temp = null; setPicking(false);
  if (a === "start") { S.panelMode = "onboard"; if (!S.me) { render(); return; } if (!S.owner || S.owner.id !== S.me.id) await loadOwner(S.me.username, true); if (!ONB) onbReset(); S.panelMode = "onboard"; onbPaint(); render(); return; }
  if (typeof onbPaint === "function") { S.panelMode = "map"; onbPaint(); }
  if (a === "settings") { S.panelMode = "settings"; SET = null; if (!S.owner && S.me) await loadOwner(S.me.username); render(); return; }
  if (a === "people") { S.panelMode = "people"; PEOPLE.loaded = false; PEOPLE.results = null; PEOPLE.q = ""; if (!S.owner && S.me) await loadOwner(S.me.username); render(); return; }
  S.panelMode = "map";
  if (a === "u" && b) { if (!S.owner || S.owner.username.toLowerCase() !== b.toLowerCase() || S.ownerState !== "ok") await loadOwner(b); else render(); return; }
  if (S.me) { location.replace("#/u/" + S.me.username); return; }
  await loadOwner(MYPINS.featured);
  if (!ls("mp-welcomed")) { ls("mp-welcomed", "1"); openIntro("welcome"); }
}
window.addEventListener("hashchange", () => { svg.interrupt(); route(); });

/* ---------------- boot ---------------- */
let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(layout, 60); }).observe(mapEl);
layout(); applyLang(); renderChrome(); render();
(async () => {
  await fetchMe();
  const after = ls("mp-after");
  if (S.me && after) { try { localStorage.removeItem("mp-after"); } catch (e) {} if (after !== location.hash) { location.replace(after); } }
  if (S.me) loadPeople().then(renderChrome);
  renderChrome();
  await route();
  sb.auth.onAuthStateChange(async (ev) => {
    if (ev === "SIGNED_IN" && !S.me) { await fetchMe(); renderChrome(); route(); }
    if (ev === "SIGNED_OUT") { S.me = null; renderChrome(); }
  });
})();
