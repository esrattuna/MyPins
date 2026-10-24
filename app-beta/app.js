
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
    sProfile: "Profil", sName: "Görünen ad", sUser: "Kullanıcı adı", sUserHint: "Haritanın adresi: ", sBio: "Hakkımda", sBioEn: "Hakkımda (İngilizce)", sBioHint: "Kaydedince Türkçe ve İngilizceye kendiliğinden çevrilir; profilin seçili dile göre görünür.", translating: "Çevriliyor…", sTransFail: "Çeviri şu an yapılamadı; metin yazdığın gibi kaydedildi.", sPhoto: "Profil fotoğrafı",
    sLang: "Dil", sAccount: "Hesap", delT: "Hesabı sil", delBtn: "Hesabımı sil", delWarn: "Bu işlem geri alınamaz. Haritan, pinlerin, fotoğrafların, Belki bir gün listen ve takiplerin kalıcı olarak silinir.",
    delType: n => `Onaylamak için kullanıcı adını yaz: ${n}`, delGo: "Kalıcı olarak sil", delDone: "Hesabın silindi.", delErr: "Hesap silinemedi, tekrar dene.", delMissing: "Hesap silme henüz kurulmadı (veritabanı güncellemesi bekleniyor).", deleting: "Siliniyor…",
    sMode: "Profil modu", m_public: "Açık", m_publicD: "Haritanı herkes görebilir, herkes seni takip edebilir.", m_private: "Gizli", m_privateD: "Takip isteklerini sen onaylarsın, haritanı sadece onayladıkların görür.", m_ghost: "Hayalet", m_ghostD: "Haritan sadece sana görünür. Profilin başkalarına görünmez, ama sen açık profilleri gezip takip edebilirsin.",
    sSaved: "Profil kaydedildi", sUserTaken: "Bu kullanıcı adı alınmış, başka bir tane dene.", sUserBad: "Kullanıcı adı 3-24 karakter olmalı; küçük harf, rakam, nokta ve alt çizgi kullanılabilir.",
    requests: "Takip istekleri", noRequests: "Bekleyen istek yok.", accept: "Onayla", decline: "Reddet", followersT: "Takipçiler", followingT: "Takip ettiklerin", nobody: "Henüz kimse yok.", peopleBtn: "👥 Kişiler", backProfile: "← Haritama dön",
    searchPh: "Kullanıcı adı ya da isim ara", searchNone: "Kimse bulunamadı.", needSignIn: "Bunun için giriş yapman gerekiyor.", loadErr: "Yüklenemedi. Bağlantını kontrol edip tekrar dene.", copyLink: "Linki kopyala", copied: "Link kopyalandı", shareMap: "Haritamı paylaş", shareText: n => `${n} · MyPins haritası`,
    ateT: "🍴 Burada ne yedim", addFood: "+ Ne yedim ekle", noFood: "Henüz bir sofra eklenmemiş.", foodLocPlace: n => `📍 ${n} (yerin konumu)`, foodLocSet: "📍 Mekânın konumu seçildi",
    foodLocSearch: "Mekânın adresini ara", backTo: n => `← ${n}`, delQFoods: n => `Bu yerin ${n} sofrası da silinecek.`, foodsN: n => `🍴 ${n}`,
    eatHere: "🍴 Burada nerede yedim", nearbyFood: "🍴 Yakınındaki diğer sofralar", nearbyPlaces: "🌍 Yakınındaki yerler",
    home: "Yaşadığım şehir", siteName: "MyPins", about: "Hakkında",  explore: "Haritayı keşfet", photoUp: "Fotoğrafını yükle", photoChange: "Fotoğrafı değiştir", photoSaving: "Yükleniyor…", photoErr: "Fotoğraf yüklenemedi. Tekrar dene.",
    aboutP1: "Bu blogu, büyük şehirlere seyahat ederken etrafındaki daha lokal bölgeleri, kasabaları, doğal alanları, manzaraları ve adresleri keşfetmek isteyen benim gibi insanlar için açtım.",
    aboutP2: "Eğer seyahat ederken amacınız bir ülkedeki doğayı ve lokal hayatı deneyimlemek ve farklı bir realitenin parçası olabilmekse, burada hoşunuza gidecek yerler keşfetmenizi umuyorum.",
    tagline: "Seyir notları · yerler · sofralar", zoomIn: "Yakınlaştır", zoomOut: "Uzaklaştır", zoomHome: "Tüm haritayı göster",
    pickHint: "Haritada pinin yerine dokun", cancel: "Vazgeç", mapLabel: "Akdeniz ve Avrupa haritası", sheet: "Paneli büyüt veya küçült",
    close: "Kapat", prev: "Önceki", next: "Sonraki",
    kind_yer: "Yer", kind_yemek: "Sofra", newNote: "Yeni not", eyebrowList: "Seyir defteri", listTitle: "Gittiğim yerler", addNote: "+ Pin ekle",
    addPinT: "Pin ekle", addPinPh: "Adres ya da yer adı yaz", addPinMap: "ya da haritada yerine dokun", addPinNone: "Sonuç bulunamadı. Başka bir yazım dene ya da haritada dokun.",
    addPinErr: "Adres araması şu an çalışmıyor; haritada dokunarak ekleyebilirsin.", addPinHint: "Örnek: Rua Augusta 24 Lizbon, Kardeşim Mantı Emirgan, Sintra",
    tally: (a, b, c) => `${a} yer · ${b} sofra · ${c} ülke`,
    noDb: "Notlar bu görünümde açılamıyor. Görmek için claude.ai hesabınla oturum açman gerekiyor.", dbErr: "Notlar yüklenemedi. Sayfayı yenileyip tekrar dene.",
    filter: "Filtre", f_all: "Tümü", f_yer: "Yerler", f_yemek: "Sofralar", f_wish: "Belki bir gün",
    wishBtn: "Belki bir gün giderim", wishOn: "Belki bir gün ✓", wishNew: "+ Yer ekle", wishWent: "Gittim", wishRemove: "Kaldır",
    wishEmptyOwn: "Henüz bir yer yok. Arkadaşlarının pinlerinden ya da haritadan ekleyebilirsin.", wishEmptyOther: "Bu listede henüz bir yer yok.",
    wishPick: "Haritada gitmek istediğin yere dokun", wishName: "Yerin adı", wishSave: "Listeye ekle",
    wishAddedT: "Belki bir gün listene eklendi", wishRemovedT: "Listeden çıkarıldı", wishWentT: "Haritana eklendi",
    wishErr: "Kaydedilemedi, tekrar dene.", wishMissing: "Bu liste henüz kurulmadı (veritabanı güncellemesi bekleniyor).",
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
    sProfile: "Profile", sName: "Display name", sUser: "Username", sUserHint: "Your map's address: ", sBio: "About me", sBioEn: "About me (English)", sBioHint: "When you save, it is translated into Turkish and English automatically; your profile shows the selected language.", translating: "Translating…", sTransFail: "Couldn't translate right now; your text was saved as you wrote it.", sPhoto: "Profile photo",
    sLang: "Language", sAccount: "Account", delT: "Delete account", delBtn: "Delete my account", delWarn: "This can't be undone. Your map, pins, photos, Someday List and follows are deleted permanently.",
    delType: n => `To confirm, type your username: ${n}`, delGo: "Delete permanently", delDone: "Your account was deleted.", delErr: "Couldn't delete the account, try again.", delMissing: "Account deletion isn't set up yet (database update pending).", deleting: "Deleting…",
    sMode: "Profile mode", m_public: "Public", m_publicD: "Anyone can see your map and follow you.", m_private: "Private", m_privateD: "You approve follow requests; only approved followers see your map.", m_ghost: "Ghost", m_ghostD: "Your map is visible only to you. Your profile is hidden from others, but you can browse and follow public profiles.",
    sSaved: "Profile saved", sUserTaken: "That username is taken. Try another one.", sUserBad: "Usernames are 3-24 characters: lowercase letters, numbers, dots and underscores.",
    requests: "Follow requests", noRequests: "No pending requests.", accept: "Approve", decline: "Decline", followersT: "Followers", followingT: "Following", nobody: "Nobody yet.", peopleBtn: "👥 People", backProfile: "← Back to my map",
    searchPh: "Search by username or name", searchNone: "No one found.", needSignIn: "You need to sign in for this.", loadErr: "Couldn't load. Check your connection and try again.", copyLink: "Copy link", copied: "Link copied", shareMap: "Share my map", shareText: n => `${n} · MyPins map`,
    ateT: "🍴 What I ate here", addFood: "+ Add what I ate", noFood: "No food spots added yet.", foodLocPlace: n => `📍 ${n} (the place's location)`, foodLocSet: "📍 Venue location set",
    foodLocSearch: "Find the venue's address", backTo: n => `← ${n}`, delQFoods: n => `Its ${n} food ${n === 1 ? "spot" : "spots"} will be deleted too.`, foodsN: n => `🍴 ${n}`,
    eatHere: "🍴 Where I ate here", nearbyFood: "🍴 Other food spots nearby", nearbyPlaces: "🌍 Nearby places",
    home: "Where I live", siteName: "MyPins", about: "About",  explore: "Explore the map", photoUp: "Upload your photo", photoChange: "Change photo", photoSaving: "Uploading…", photoErr: "The photo didn't upload. Try again.",
    aboutP1: "I started this blog for people like me who, when traveling to big cities, also want to discover the more local areas around them: small towns, nature, views and good addresses.",
    aboutP2: "If your goal when traveling is to experience a country's nature and local life, and to become part of a different reality, I hope you'll find places here you'll love.",
    tagline: "Travel notes · places · tables", zoomIn: "Zoom in", zoomOut: "Zoom out", zoomHome: "Show the whole map",
    pickHint: "Tap the map where your pin belongs", cancel: "Cancel", mapLabel: "Map of the Mediterranean and Europe", sheet: "Expand or collapse the panel",
    close: "Close", prev: "Previous", next: "Next",
    kind_yer: "Place", kind_yemek: "Food", newNote: "New note", eyebrowList: "Travel log", listTitle: "Places I've been", addNote: "+ Add pin",
    addPinT: "Add a pin", addPinPh: "Type an address or place name", addPinMap: "or tap its spot on the map", addPinNone: "No results. Try another spelling or tap the map.",
    addPinErr: "Address search isn't working right now; you can tap the map instead.", addPinHint: "e.g. Rua Augusta 24 Lisbon, Kardeşim Mantı Emirgan, Sintra",
    tally: (a, b, c) => `${a} ${a === 1 ? "place" : "places"} · ${b} food ${b === 1 ? "spot" : "spots"} · ${c} ${c === 1 ? "country" : "countries"}`,
    noDb: "Notes can't load in this view. Sign in with a claude.ai account to see them.", dbErr: "Notes didn't load. Refresh the page and try again.",
    filter: "Filter", f_all: "All", f_yer: "Places", f_yemek: "Food", f_wish: "Someday List",
    wishBtn: "Maybe someday", wishOn: "Someday ✓", wishNew: "+ Add a place", wishWent: "Been there", wishRemove: "Remove",
    wishEmptyOwn: "No places yet. Add them from friends' pins or from the map.", wishEmptyOther: "No places on this list yet.",
    wishPick: "Tap the map where you'd like to go", wishName: "Place name", wishSave: "Add to list",
    wishAddedT: "Added to your Someday List", wishRemovedT: "Removed from the list", wishWentT: "Added to your map",
    wishErr: "Couldn't save, try again.", wishMissing: "This list isn't set up yet (database update pending).",
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
const ICON = { yer: "🌍", yemek: "🍴", wish: "☆" };
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
  if (typeof applyMapLang === "function") applyMapLang();
  if (typeof renderChrome === "function") renderChrome();
}
document.querySelectorAll(".lang button").forEach(b => b.onclick = () => setLang(b.dataset.lang));
// language: chosen in the account menu or in Settings (the top-bar switch is hidden); visitors get the browser's language
function setLang(l) { if (l === LANG) return; LANG = l; ls("ad-lang", LANG); applyLang(); render(); }
const langSeg = (cls) => el("div", { class: cls, role: "group", "aria-label": "Dil / Language" },
  ["tr", "en"].map(l => el("button", { type: "button", "aria-pressed": String(LANG === l), onclick: e => { e.stopPropagation(); setLang(l); } }, l.toUpperCase())));
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
  view: "list", selId: null, filter: ls("ad-filter") === "wish" ? "wish" : "yer",
  wish: [], wishState: "ok", wishSel: null, wishForm: null, pickMode: "pin", mineSrc: new Map(),   // "Belki bir gün" list
  picking: false, temp: null, form: null, lb: null,
};
const sb = supabase.createClient(MYPINS.supabaseUrl, MYPINS.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" } });

/* ---------------- map (MapLibre GL + OpenFreeMap vector tiles) ----------------
   Map setup carried over from the map prototype (map-prototype/index.html, ad72685):
   - "Sade stil": fewer style layers (less work per tile); POI c: food & drink markers removed, stops/museums/etc. kept
   - no road number shields, labels in the interface language (TR/EN), island labels from country scale
   - tap to zoom: country, neighbouring country, city/town/island label, pin
   - smooth detail: fly on tap, detail layers fade in by zoom, labels fade, the target's tiles are requested as the flight starts
   - coarse country base up to zoom 7, 1200 tiles kept in memory
   - style request with a time limit and a "try again" message instead of an empty map */
const mapEl = $("#map");
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const C = { sea: "#7fcfd0", sea2: "#93d9d9", land: "#ecd3a0", land2: "#e4c78f", park: "#dccf94", wood: "#d4c98a", sand: "#f1dfb4", road: "#fbf7ee", roadCase: "#cfb27a", ink: "#2b3338", halo: "#fbf7ee", border: "#a98d58", building: "#e0c38b", pin: "#f4e08c", pinInk: "#5e5016" };
COUNTRIES.features.forEach(f => {
  let best = null, bestA = -1;
  for (const poly of f.geometry.coordinates) { const g = { type: "Polygon", coordinates: poly }; const a = d3.geoArea(g); if (a > bestA) { bestA = a; best = g; } }
  f.properties.c = d3.geoCentroid(best); f.properties.area = d3.geoArea(f); f.properties.main = best;
});
let map = null, mapReady = false;
const narrowView = () => matchMedia("(max-width:760px)").matches;
const mapPadding = () => narrowView() ? { top: 70, bottom: Math.round(mapEl.clientHeight * 0.5), left: 20, right: 20 } : { top: 40, bottom: 40, left: 40, right: 40 };
const kToZoom = k => Math.min(16, 3 + Math.log2(Math.max(1, k)) * 1.1);
const reducedMotion = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

/* --- style --- */
// The map host can be slow or unreachable; without a time limit the page waited on an empty map.
// Two tries of 12 s, then a message with "try again" is shown on the map.
async function fetchStyleJSON() {
  for (let k = 0; k < 2; k++) {
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 12000);
    try { const r = await fetch(MAP_STYLE, { signal: ctl.signal }); if (r.ok) return await r.json(); }
    catch (e) { console.warn("style fetch", k + 1, e.name); }
    finally { clearTimeout(timer); }
  }
  throw new Error("map-host-unreachable");
}
const POI_FOOD = ["restaurant", "fast_food", "cafe", "bar", "beer", "ice_cream", "bakery", "alcohol_shop"];
const LITE_DROP_SOURCE = new Set(["housenumber", "aeroway", "aerodrome_label", "building"]);
const LITE_DROP_ID = /oneway|shield|hatching|cablecar|path|pedestrian|highway-name-minor/;
function isLegacyFilter(f) {
  if (!Array.isArray(f)) return false;
  if (["all", "any", "none"].includes(f[0])) return f.slice(1).some(isLegacyFilter);
  return typeof f[1] === "string" && ["==", "!=", "<", ">", "<=", ">=", "in", "!in", "!has"].includes(f[0]);
}
function addFilter(l, legacy, expr) {
  if (!l.filter) l.filter = expr;
  else l.filter = isLegacyFilter(l.filter) ? ["all", l.filter, legacy] : ["all", l.filter, expr];
}
const showsName = l => l.type === "symbol" && l.layout && l.layout["text-field"] && /"name/.test(JSON.stringify(l.layout["text-field"]));
function restyle(s) {
  // "Sade stil" with POI c (select): drop detail layers and food & drink markers
  s.layers = s.layers.filter(l => {
    const sl = l["source-layer"];
    if (/shield/.test(l.id)) return false;                       // road number shields: removed
    if (!sl) return true;
    if (LITE_DROP_SOURCE.has(sl)) return false;
    if (sl !== "poi" && LITE_DROP_ID.test(l.id)) return false;
    return true;
  });
  const nameExpr = labelExpr();
  for (const l of s.layers) {
    const id = l.id, p = (l.paint = l.paint || {});
    if (l["source-layer"] === "poi") addFilter(l, ["!in", "class", ...POI_FOOD], ["!", ["in", ["get", "class"], ["literal", POI_FOOD]]]);
    if (l.type === "background") p["background-color"] = C.land;
    else if (id === "water" && l.type === "fill") p["fill-color"] = C.sea;
    else if (/^waterway/.test(id) && l.type === "line") p["line-color"] = C.sea2;
    else if (id === "natural_earth" || /park_outline/.test(id)) l.layout = { ...(l.layout || {}), visibility: "none" };
    else if (/park/.test(id) && l.type === "fill") { p["fill-color"] = C.park; p["fill-opacity"] = 0.7; }
    else if (/landcover_wood/.test(id)) { p["fill-color"] = C.wood; p["fill-opacity"] = 0.5; }
    else if (/landcover_grass|landuse_(pitch|track|cemetery)/.test(id)) { p["fill-color"] = C.park; p["fill-opacity"] = 0.45; }
    else if (/landcover_sand/.test(id)) p["fill-color"] = C.sand;
    else if (/landuse_residential/.test(id)) { p["fill-color"] = C.land2; p["fill-opacity"] = 0.5; }
    else if (l.type === "line" && /casing/.test(id)) p["line-color"] = C.roadCase;
    else if (l.type === "line" && /^(road|bridge|tunnel)_/.test(id) && !/rail|hatching|path/.test(id)) p["line-color"] = C.road;
    else if (l.type === "line" && /boundary/.test(id)) p["line-color"] = C.border;
    // only labels that show a name get the language-aware name (a road number replaced by a name left empty boxes)
    if (showsName(l)) {
      l.layout["text-field"] = nameExpr;
      p["text-color"] = /water/.test(id) ? "#3d8f93" : C.ink; p["text-halo-color"] = C.halo; p["text-halo-width"] = 1.4;
    }
  }
  // Island names: upstream they fall into "label_other" (from zoom 8). Own layers: islands from z6, islets from z10.
  const other = s.layers.find(l => l.id === "label_other");
  if (other) {
    other.filter = ["all", other.filter, ["!", ["in", ["get", "class"], ["literal", ["island", "islet"]]]]];
    const at = s.layers.indexOf(other);
    const islandLayer = (id, cls, minzoom) => ({ id, type: "symbol", source: other.source, "source-layer": "place", minzoom,
      filter: ["==", ["get", "class"], cls],
      layout: { "text-field": nameExpr, "text-font": (other.layout && other.layout["text-font"]) || ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 6, 11, 10, 13, 14, 15], "symbol-sort-key": ["coalesce", ["get", "rank"], 99],
        "text-max-width": 7, "text-padding": 4 },
      paint: { "text-color": "#3f5a5c", "text-halo-color": C.halo, "text-halo-width": 1.4 } });
    s.layers.splice(at + 1, 0, islandLayer("label_island", "island", 6), islandLayer("label_islet", "islet", 10));
  }
  // Country base: until a region's tiles arrive, the coarse country fill already shows land and sea at
  // continent scale (<= z7). Above z7 the background is land as before.
  const bg = s.layers.findIndex(l => l.type === "background");
  s.layers[bg].paint["background-color"] = ["step", ["zoom"], C.sea, 7, C.land];
  s.sources.countries = { type: "geojson", data: COUNTRIES, tolerance: 0.6, buffer: 32 };
  s.layers.splice(bg + 1, 0, { id: "base-land", type: "fill", source: "countries", maxzoom: 7, paint: { "fill-color": C.land, "fill-antialias": false } });
  return s;
}

// "Belki bir gün" marker: paper-coloured (not yet visited) pin with a small star
function star(g, cx, cy, R, r) {
  g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; g.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)); }
  g.closePath(); g.fill();
}
const pinImg = (kind) => {
  const s = 2, w = 22 * s, h = 30 * s, c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); g.scale(s, s);
  g.beginPath(); g.moveTo(11, 29); g.bezierCurveTo(8, 23, 2, 19, 2, 12); g.arc(11, 11, 9, Math.PI, 0); g.bezierCurveTo(20, 19, 14, 23, 11, 29); g.closePath();
  g.fillStyle = kind === "wish" ? C.halo : C.pin; g.fill(); g.lineWidth = kind === "wish" ? 1.8 : 1.5; g.strokeStyle = C.pinInk; g.stroke();
  g.fillStyle = C.pinInk; g.strokeStyle = C.pinInk;
  if (kind === "yemek") { g.lineWidth = 1.3; g.lineCap = "round"; g.beginPath(); g.moveTo(8, 6); g.lineTo(8, 16); g.moveTo(6.5, 6); g.lineTo(6.5, 10); g.moveTo(9.5, 6); g.lineTo(9.5, 10); g.moveTo(14, 16); g.lineTo(14, 6); g.quadraticCurveTo(16, 8, 14, 11); g.stroke(); }
  else if (kind === "home") { g.font = "11px sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("🏠", 11, 11.5); }
  else if (kind === "temp") { g.beginPath(); g.arc(11, 11, 3.4, 0, Math.PI * 2); g.fill(); }
  else if (kind === "wish") { star(g, 11, 11, 4.6, 2); }
  else { g.beginPath(); g.arc(11, 11, 3.4, 0, Math.PI * 2); g.fill(); }
  return { width: w, height: h, data: g.getImageData(0, 0, w, h).data };
};

function showMapError() {
  let box = $("#mapErr");
  if (!box) { box = el("div", { id: "mapErr", class: "map-err", role: "alert" }); mapEl.append(box); }
  box.replaceChildren(
    el("p", {}, LANG === "en" ? "Couldn't reach the map server (OpenFreeMap). This is usually a temporary connection problem." : "Harita sunucusuna (OpenFreeMap) ulaşılamadı. Bu genelde geçici bir bağlantı sorunu."),
    el("button", { class: "btn", type: "button", onclick: () => location.reload() }, LANG === "en" ? "Try again" : "Tekrar dene"));
}

let styleTpl = null;   // style source description, used to find the tile URL template for prefetching
async function initMap() {
  let style;
  try { style = restyle(await fetchStyleJSON()); styleTpl = style; }
  catch (e) { showMapError(); return; }
  map = new maplibregl.Map({ container: "mapgl", style, center: [15, 42], zoom: 2.6, minZoom: 1, maxZoom: 19, attributionControl: { compact: true },
    dragRotate: false, pitchWithRotate: false, fadeDuration: 300, maxTileCacheSize: 1200 });
  map.touchZoomRotate.disableRotation();
  map.on("load", () => {
    captureRamps(); applySmooth();
    for (const k of ["yer", "yemek", "home", "temp", "wish"]) map.addImage("pin-" + k, pinImg(k), { pixelRatio: 2 });
    map.addLayer({ id: "countries-hit", type: "fill", source: "countries", paint: { "fill-color": "#000", "fill-opacity": 0 } });
    map.addLayer({ id: "countries-picked", type: "fill", source: "countries", filter: ["in", ["get", "i"], ["literal", []]], paint: { "fill-color": C.pin, "fill-opacity": 0.55 } });
    map.addLayer({ id: "countries-picked-line", type: "line", source: "countries", filter: ["in", ["get", "i"], ["literal", []]], paint: { "line-color": C.pinInk, "line-width": 1.2 } });
    map.addSource("pins", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    map.addLayer({ id: "pins-dot", type: "circle", source: "pins", maxzoom: DOT_ZOOM_GL, filter: ["all", ["!=", ["get", "sel"], 1], ["!=", ["get", "icon"], "fooddot"]],
      paint: { "circle-radius": 5, "circle-color": ["case", ["==", ["get", "icon"], "wish"], C.halo, C.pin], "circle-stroke-color": C.pinInk, "circle-stroke-width": 1.6 } });
    map.addLayer({ id: "pins-pin", type: "symbol", source: "pins", minzoom: DOT_ZOOM_GL - 0.01, filter: ["!=", ["get", "icon"], "fooddot"],
      layout: { "icon-image": ["concat", "pin-", ["get", "icon"]], "icon-anchor": "bottom", "icon-size": ["case", ["==", ["get", "sel"], 1], 1.25, 1], "icon-allow-overlap": true,
        "text-field": ["get", "title"], "text-font": ["Noto Sans Bold"], "text-size": 12.5, "text-offset": [0, -2.9], "text-anchor": "bottom", "text-optional": true, "symbol-sort-key": ["case", ["==", ["get", "sel"], 1], 0, 1] },
      paint: { "text-color": C.ink, "text-halo-color": C.halo, "text-halo-width": 1.8 } });
    // food spots of the open place: small ink dots, names when zoomed in
    map.addLayer({ id: "food-dots", type: "circle", source: "pins", filter: ["==", ["get", "icon"], "fooddot"],
      paint: { "circle-radius": ["case", ["==", ["get", "sel"], 1], 6.5, 4.5], "circle-color": C.pinInk, "circle-stroke-color": C.halo, "circle-stroke-width": 1.8 } });
    map.addLayer({ id: "food-labels", type: "symbol", source: "pins", minzoom: 12, filter: ["==", ["get", "icon"], "fooddot"],
      layout: { "text-field": ["concat", "🍴 ", ["get", "title"]], "text-font": ["Noto Sans Bold"], "text-size": 11.5, "text-offset": [0, 0.9], "text-anchor": "top", "text-optional": true },
      paint: { "text-color": C.ink, "text-halo-color": C.halo, "text-halo-width": 1.6 } });
    map.addLayer({ id: "pins-sel", type: "symbol", source: "pins", maxzoom: DOT_ZOOM_GL, filter: ["all", ["==", ["get", "sel"], 1], ["!=", ["get", "icon"], "fooddot"]],
      layout: { "icon-image": ["concat", "pin-", ["get", "icon"]], "icon-anchor": "bottom", "icon-size": 1.25, "icon-allow-overlap": true, "text-field": ["get", "title"], "text-font": ["Noto Sans Bold"], "text-size": 12.5, "text-offset": [0, -3.4], "text-anchor": "bottom" },
      paint: { "text-color": C.ink, "text-halo-color": C.halo, "text-halo-width": 1.8 } });
    for (const id of PIN_LAYERS) {
      map.on("click", id, onPinTap);
      map.on("mouseenter", id, () => map.getCanvas().style.cursor = "pointer");
      map.on("mouseleave", id, () => map.getCanvas().style.cursor = S.picking ? "crosshair" : "");
    }
    map.on("click", onMapTap);
    mapReady = true;
    drawOverlay(); if (typeof onbPaint === "function") onbPaint();
    if (S.places.length && !S.selId) fitPins();
  });
  map.on("mousemove", e => { const r = $("#readout"); if (r) r.textContent = fmtCoord(e.lngLat.lng, e.lngLat.lat); });
}
const DOT_ZOOM_GL = 6;
const PIN_LAYERS = ["pins-dot", "pins-pin", "pins-sel", "food-dots"];

/* --- taps --- */
// Order: add-place mode, onboarding country picking, pin, then tap-to-zoom (neighbouring country, place label / island, country).
function onPinTap(e) {
  const f = e.features[0];
  if (!f || f.properties.id === "__temp" || S.picking) return;
  e.originalEvent._pin = true;
  if (String(f.properties.id).startsWith("w:")) { selectWish(f.properties.id.slice(2)); return; }
  openDetail(f.properties.id, false);
  const z = map.getZoom();
  camera({ center: f.geometry.coordinates, zoom: z < 12 ? Math.max(12, z + 3) : z });
}
const PLACE_ZOOM = { city: 11.5, town: 13, village: 14, suburb: 14.5, quarter: 15, neighbourhood: 15.5, hamlet: 15, island: 10.5, islet: 13 };
function countryAtPoint(pt) {
  const f = map.queryRenderedFeatures(pt, { layers: ["countries-hit"] })[0];
  return f ? COUNTRIES.features.find(x => x.properties.n === f.properties.n) : null;
}
// a tap on an island's land (not exactly on its name) still finds the island: nearest island label within ~45 px
function islandNear(pt) {
  const layers = ["label_island", "label_islet"].filter(id => map.getLayer(id)); if (!layers.length) return null;
  const r = 45, feats = map.queryRenderedFeatures([[pt.x - r, pt.y - r], [pt.x + r, pt.y + r]], { layers });
  let best = null, bd = Infinity;
  for (const f of feats) { const p = map.project(f.geometry.coordinates), d = (p.x - pt.x) ** 2 + (p.y - pt.y) ** 2; if (d < bd) { bd = d; best = f; } }
  return best;
}
// middle of the visible map (above the bottom sheet on phones)
function visibleCenterPoint() {
  const pad = mapPadding(), w = mapEl.clientWidth, h = mapEl.clientHeight;
  return [pad.left + (w - pad.left - pad.right) / 2, pad.top + (h - pad.top - pad.bottom) / 2];
}
function onMapTap(e) {
  if (e.originalEvent._pin) return;
  if (S.picking) {
    const mode = S.pickMode; setPicking(false); S.temp = { lon: +e.lngLat.lng.toFixed(5), lat: +e.lngLat.lat.toFixed(5) };
    if (mode === "wish") startWishForm(e.point, S.temp); else startForm(null, S.temp);
    return;
  }
  const tapped = countryAtPoint(e.point);
  if (tapped && typeof onbLandClick === "function" && onbLandClick(tapped)) return;
  const box = [[e.point.x - 10, e.point.y - 10], [e.point.x + 10, e.point.y + 10]];
  if (map.queryRenderedFeatures(box, { layers: PIN_LAYERS.filter(id => map.getLayer(id)) }).length) return;   // the pin handler owns this tap
  const z = map.getZoom();
  // Country scale: a tap in another country than the one in the middle of the screen frames that country
  // (checked before place labels so a nearby city label does not swallow the switch).
  if (z >= 5.5 && z < 8 && tapped) {
    const here = countryAtPoint(visibleCenterPoint());
    if (tapped !== here) { zoomToCountry(tapped); return; }
  }
  const place = map.queryRenderedFeatures(box).find(f => f.layer.type === "symbol" && f.sourceLayer === "place" && PLACE_ZOOM[f.properties.class])
    || islandNear(e.point);
  if (place) {
    const tz = PLACE_ZOOM[place.properties.class];
    camera({ center: place.geometry.coordinates, zoom: z < tz ? tz : Math.min(z + 2, 17) });
    return;
  }
  if (z < 5.5 && tapped) zoomToCountry(tapped);
}

/* --- camera --- */
function camera(opts) {
  if (reducedMotion()) { map.jumpTo({ ...opts, padding: mapPadding() }); return; }
  prefetchView(opts.center, opts.zoom);
  map.flyTo({ ...opts, padding: mapPadding(), duration: 1000, curve: 1.3, essential: true });
}
function drawOverlay() {
  if (!mapReady) return;
  if (S.filter === "wish") {
    const feats = S.wish.map(w => ({ type: "Feature", geometry: { type: "Point", coordinates: [w.lon, w.lat] },
      properties: { id: "w:" + w.id, title: L(w, "title"), icon: "wish", sel: w.id === S.wishSel ? 1 : 0 } }));
    if (S.temp) feats.push({ type: "Feature", geometry: { type: "Point", coordinates: [S.temp.lon, S.temp.lat] }, properties: { id: "__temp", title: "", icon: "temp", sel: 1 } });
    map.getSource("pins").setData({ type: "FeatureCollection", features: feats });
    return;
  }
  const sel = S.places.find(p => p.id === S.selId), focus = sel ? (parentOf(sel) || sel) : null;
  const feats = S.places.filter(isTop).map(p => ({ type: "Feature", geometry: { type: "Point", coordinates: [p.lon, p.lat] },
    properties: { id: p.id, title: L(p, "title"), icon: p.home ? "home" : p.kind === "yemek" ? "yemek" : "yer", sel: focus && p.id === focus.id ? 1 : 0 } }));
  if (focus) for (const f of foodsOf(focus.id)) feats.push({ type: "Feature", geometry: { type: "Point", coordinates: [f.lon, f.lat] },
    properties: { id: f.id, title: L(f, "title"), icon: "fooddot", sel: f.id === S.selId ? 1 : 0 } });
  if (S.temp) feats.push({ type: "Feature", geometry: { type: "Point", coordinates: [S.temp.lon, S.temp.lat] }, properties: { id: "__temp", title: "", icon: "temp", sel: 1 } });
  map.getSource("pins").setData({ type: "FeatureCollection", features: feats });
}
let lastFitOwner = null;
function fitPins() {
  if (!mapReady || !S.places.length) return;
  if (lastFitOwner === (S.owner && S.owner.id)) return;
  lastFitOwner = S.owner && S.owner.id;
  const b = new maplibregl.LngLatBounds();
  S.places.forEach(p => b.extend([p.lon, p.lat]));
  map.fitBounds(b, { padding: mapPadding(), maxZoom: 9, duration: 900 });
}
function flyTo(lon, lat, k = 7) {
  if (!mapReady) return;
  camera({ center: [lon, lat], zoom: Math.max(map.getZoom(), kToZoom(k)) });
}
function zoomToCountry(f) {
  const [[x0, y0], [x1, y1]] = d3.geoBounds(f.properties.main);
  if (x1 < x0) return;
  // fitBounds applies the panel padding once (cameraForBounds + a padded flyTo shifted it twice on phones)
  const bounds = [[x0, y0], [x1, y1]], opts = { padding: mapPadding(), maxZoom: 7.5 };
  if (reducedMotion()) { map.fitBounds(bounds, { ...opts, animate: false }); return; }
  const cam = map.cameraForBounds(bounds, opts);
  if (cam) prefetchView(cam.center, cam.zoom);
  map.fitBounds(bounds, { ...opts, linear: false, duration: 1000, curve: 1.3, essential: true });
}

/* --- smooth detail ---
   1) layers that start at a zoom (minor roads, small labels...) fade in over ~0.8 zoom instead of popping;
   2) taps fly to the target so intermediate zooms load progressively;
   3) the target's tiles are requested when the flight starts (HTTP cache), so they are ready on arrival;
   4) labels fade (fadeDuration). */
const OPACITY_PROPS = { fill: ["fill-opacity"], line: ["line-opacity"], symbol: ["text-opacity", "icon-opacity"], circle: ["circle-opacity"] };
const OWN_LAYERS = new Set(["base-land", "countries-hit", "countries-picked", "countries-picked-line", "food-labels", ...PIN_LAYERS]);
let RAMPS = [];
function captureRamps() {
  RAMPS = [];
  for (const l of map.getStyle().layers) {
    if (OWN_LAYERS.has(l.id) || !(l.minzoom > 0) || !OPACITY_PROPS[l.type]) continue;
    for (const prop of OPACITY_PROPS[l.type]) {
      const orig = map.getPaintProperty(l.id, prop);
      if (orig !== undefined && typeof orig !== "number") continue;   // already zoom-driven: leave it alone
      RAMPS.push({ id: l.id, prop, ramp: ["interpolate", ["linear"], ["zoom"], l.minzoom, 0, l.minzoom + 0.8, orig === undefined ? 1 : orig] });
    }
  }
}
function applySmooth() { for (const r of RAMPS) map.setPaintProperty(r.id, r.prop, r.ramp); }
let TILE_TPL = null, TILE_MAX = 14;
async function tileTemplate() {
  if (TILE_TPL !== null) return TILE_TPL;
  TILE_TPL = "";
  try {
    const src = Object.values(styleTpl.sources).find(x => x.type === "vector" && x.url);
    const tj = await (await fetch(src.url)).json();
    TILE_TPL = tj.tiles[0]; TILE_MAX = tj.maxzoom || 14;
  } catch (e) {}
  return TILE_TPL;
}
async function prefetchView(center, zoom) {
  const tpl = await tileTemplate(); if (!tpl || !center) return;
  const c = Array.isArray(center) ? center : [center.lng, center.lat];
  const tz = Math.max(0, Math.min(TILE_MAX, Math.floor(zoom))), n = 2 ** tz;
  const x = (c[0] + 180) / 360 * n, lr = c[1] * Math.PI / 180, y = (1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2 * n;
  const span = 512 * 2 ** (zoom - tz), hx = mapEl.clientWidth / 2 / span + 0.5, hy = mapEl.clientHeight / 2 / span + 0.5;
  const urls = [];
  for (let ty = Math.floor(y - hy); ty <= Math.floor(y + hy); ty++) for (let tx = Math.floor(x - hx); tx <= Math.floor(x + hx); tx++) {
    if (ty < 0 || ty >= n) continue;
    urls.push(tpl.replace("{z}", tz).replace("{x}", ((tx % n) + n) % n).replace("{y}", ty));
  }
  urls.slice(0, 24).forEach(u => fetch(u, { mode: "cors", credentials: "same-origin" }).catch(() => {}));
}

function layout() { if (map) map.resize(); }
function setPicking(on, mode = "pin") {
  S.picking = on; S.pickMode = on ? mode : "pin"; mapEl.classList.toggle("picking", on); $("#pickBanner").hidden = !on;
  if (on) $("#pickBanner span").textContent = t(mode === "wish" ? "wishPick" : "pickHint");
  if (map) map.getCanvas().style.cursor = on ? "crosshair" : "";
  if (on) setSheet("collapsed");
}
$("#pickCancel").onclick = () => setPicking(false);
function labelExpr() {
  const nm = LANG === "en" ? ["coalesce", ["get", "name:en"], ["get", "name_en"], ["get", "name:latin"], ["get", "name"]]
    : ["coalesce", ["get", "name:tr"], ["get", "name:latin"], ["get", "name"]];
  return ["case", ["==", ["coalesce", ["get", "name:en"], ["get", "name_en"], ""], "Israel"], "", nm];
}
function applyMapLang() {
  if (!mapReady) return;
  const nameExpr = labelExpr();
  for (const l of map.getStyle().layers) if (l.source === "openmaptiles" && showsName(l)) map.setLayoutProperty(l.id, "text-field", nameExpr);
}

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
  else if (S.view === "addpin") renderAddPin();
  else renderList();
  drawOverlay();
}

function stars(n) {
  const s = el("span", { class: "stars", "aria-label": `${n} / 5` });
  for (let i = 1; i <= 5; i++) s.append(el("span", { class: i <= n ? "" : "off", text: "★" }));
  return s;
}

function renderList() {
  const yer = S.places.filter(p => p.kind === "yer" && isTop(p)).length;
  const yemek = S.places.filter(p => p.kind === "yemek").length;
  const countries = new Set(S.places.map(p => p.iso || p.country).filter(Boolean)).size;
  if (!S.owner) { body.append(el("div", { class: "empty" }, el("strong", { text: t("loadingT") }), t("loadingB"))); return; }
  body.append(profileCard());
  if (S.ownerState === "locked") { body.append(lockedBox()); return; }
  const head = el("div", { class: "ph" },
    el("div", {}, el("div", { class: "eyebrow", text: t("eyebrowList") }), el("h2", { text: S.canEdit ? t("listTitle") : t("listTitleOther") })),
    S.canEdit ? el("button", { class: "btn", type: "button", onclick: openAddPin }, t("addNote")) : null);
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
  for (const [k, lab] of [["yer", t("f_yer")], ["wish", t("f_wish")]]) {
    chips.append(el("button", { class: "chip", type: "button", "aria-pressed": String(S.filter === k), onclick: () => { S.filter = k; ls("ad-filter", k); if (S.picking) setPicking(false); render(); } },
      el("span", { class: "chip-ic", "aria-hidden": "true", text: ICON[k] }), lab));
  }
  body.append(chips);
  if (S.filter === "wish") { renderWish(); return; }


  const items = S.places.filter(isTop);
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
        p.city && p.city !== p.title ? " · " + cityName(p.city) : "",
        foodsOf(p.id).length ? " · " + t("foodsN", foodsOf(p.id).length) : "");
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
function renderFoods(p) {
  const foods = foodsOf(p.id);
  const sec = el("section", { class: "rel foods" }, el("h3", { text: t("ateT") }));
  if (foods.length) sec.append(el("ul", { class: "food-list" }, foods.map(f => el("li", {},
    el("button", { class: "food", type: "button", onclick: () => openDetail(f.id, true) },
      f.photos && f.photos.length ? el("img", { src: blobUrl(f.photos[0]), alt: "", loading: "lazy" }) : el("span", { class: "food-ic", "aria-hidden": "true", text: "🍴" }),
      el("span", { class: "food-t" }, el("b", { text: L(f, "title") }),
        L(f, "dish") ? el("span", { text: L(f, "dish") }) : null,
        f.rating ? el("span", { class: "food-r" }, stars(f.rating)) : null))))));
  else if (!S.canEdit) return;
  else sec.append(el("p", { class: "hint", text: t("noFood") }));
  if (S.canEdit && HAS_PARENT) sec.append(el("button", { class: "btn ghost small", type: "button", onclick: () => startFoodForm(p) }, t("addFood")));
  body.append(sec);
}
function startFoodForm(place) {
  startForm(null, { lon: place.lon, lat: place.lat }, { kind: "yemek", parent_id: place.id, city: place.city || "", country: place.country || "", iso: place.iso || "" });
}
function renderRelated(p) {
  if (!isTop(p)) return;
  const R = p.home ? 35 : 15;
  const near = S.places.filter(q => q.id !== p.id && isTop(q) && distKm(p, q) <= R).sort((a, b) => distKm(p, a) - distKm(p, b));
  const food = near.filter(q => q.kind === "yemek");
  const spots = near.filter(q => q.kind !== "yemek");
  const block = (title, arr) => { if (!arr.length) return; body.append(el("section", { class: "rel" }, el("h3", { text: title }), el("ul", {}, arr.map(relRow)))); };
  if (p.kind === "yemek") { block(t("nearbyFood"), food); block(t("nearbyPlaces"), spots); }
  else { if (!HAS_PARENT) block(t("eatHere"), food); block(t("nearbyPlaces"), spots); }
}

function openDetail(id, fly) {
  const p = S.places.find(x => x.id === id); if (!p) return;
  S.selId = id; S.view = "detail"; S.temp = null; S.confirmDel = false;
  perfStart();
  if (panel.classList.contains("collapsed")) setSheet(null);
  render();
  if (fly) flyTo(p.lon, p.lat, 28);
  $("#panelBody").scrollTop = 0;
}
/* ---------------- ?perf=1: time to first photo and photo bytes after opening a place (nothing shows otherwise) ---------------- */
const PERF = /[?&]perf=1/.test(location.search) ? { id: 0, t0: 0, first: null } : null;
if (PERF) {
  try { performance.setResourceTimingBufferSize(5000); } catch (e) {}
  body.addEventListener("load", e => {
    if (e.target.tagName === "IMG" && PERF.t0 && PERF.first == null) { PERF.first = performance.now() - PERF.t0; perfShow(); }
  }, true);
}
function perfStart() {
  if (!PERF) return;
  const id = ++PERF.id; PERF.t0 = performance.now(); PERF.first = null;
  [300, 1500, 4000, 10000].forEach(ms => setTimeout(() => { if (id === PERF.id) perfShow(); }, ms));
  perfShow();
}
function perfShow() {
  if (!PERF) return;
  let box = document.getElementById("mpPerf");
  if (!box) { box = document.createElement("div"); box.id = "mpPerf"; box.style.cssText = "position:fixed;left:8px;top:8px;z-index:99999;background:rgba(0,0,0,.78);color:#fff;font:12px/1.3 ui-monospace,monospace;padding:4px 7px;border-radius:6px;pointer-events:none;white-space:pre"; document.body.append(box); }
  const ph = performance.getEntriesByType("resource").filter(r => r.startTime >= PERF.t0 - 5 && /\/storage\/v1\/object\//.test(r.name));
  const net = ph.reduce((a, r) => a + (r.transferSize || 0), 0), known = ph.some(r => r.encodedBodySize > 0 || r.transferSize > 0);
  const cached = ph.filter(r => r.transferSize === 0 && r.encodedBodySize > 0).length;
  const hasImg = !!body.querySelector("img");
  const first = PERF.first != null ? Math.round(PERF.first) + " ms" : hasImg ? "…" : "–";
  const size = !ph.length ? "0 KB" : known ? (net >= 1e6 ? (net / 1e6).toFixed(2) + " MB" : Math.round(net / 1e3) + " KB") : "?";
  box.textContent = `ilk foto ${first} · ${size} · ${ph.length} dosya${cached ? ` (${cached} önbellek)` : ""}`;
}
function backToList() { S.view = "list"; S.selId = null; S.temp = null; render(); }

function renderDetail() {
  const p = S.places.find(x => x.id === S.selId);
  if (!p) { S.view = "list"; renderList(); return; }
  const parent = parentOf(p);
  body.append(parent ? el("button", { class: "back", type: "button", onclick: () => openDetail(parent.id, true) }, t("backTo", L(parent, "title")))
    : el("button", { class: "back", type: "button", onclick: backToList }, t("allNotes")));
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
  if (isTop(p) && p.kind === "yer") renderFoods(p);
  if (!S.canEdit && S.wishState !== "missing") {
    const on = S.mineSrc.has(p.id);
    body.append(el("div", { class: "d-wish" }, el("button", { class: "btn " + (on ? "wish-on" : "ghost"), type: "button", "aria-pressed": String(on), onclick: () => toggleWishFromPin(p) }, on ? t("wishOn") : t("wishBtn"))));
  }
  renderRelated(p);

  if (S.canEdit) {
    const act = el("div", { class: "d-actions" });
    if (!S.confirmDel) {
      act.append(el("button", { class: "btn ghost", type: "button", onclick: () => startForm(p) }, t("edit")),
        el("button", { class: "btn ghost", type: "button", onclick: () => { S.confirmDel = true; render(); } }, t("del")));
    } else {
      const nf = foodsOf(p.id).length;
      act.append(el("div", { class: "confirm" }, t("delQ") + (nf ? " " + t("delQFoods", nf) : ""),
        el("button", { class: "btn danger small", type: "button", onclick: () => deletePlace(p) }, t("delYes")),
        el("button", { class: "btn ghost small", type: "button", onclick: () => { S.confirmDel = false; render(); } }, t("cancel"))));
    }
    body.append(act);
  }
}

/* ---------------- form ---------------- */
function startForm(p, at, prefill) {
  const base = p ? { ...p, photos: [...(p.photos || [])] } : (() => {
    const w = whereIs(at.lon, at.lat);
    return { kind: "yer", title: "", city: w.city, country: w.country, iso: w.iso, lon: at.lon, lat: at.lat, date: new Date().toISOString().slice(0, 10), note: "", dish: "", rating: 0, price: "", photos: [],
      ...(prefill || {}) };
  })();
  S.form = { data: base, editingId: p ? p.id : null, newFiles: [], removed: [], busy: false, err: "" };
  S.view = "form"; S.selId = p ? p.id : null;
  if (panel.classList.contains("collapsed")) setSheet("tall");
  render();
  flyTo(base.lon, base.lat, 60);
}

function renderForm() {
  const F = S.form, d = F.data;
  body.append(el("button", { class: "back", type: "button", onclick: cancelForm }, t("backCancel")));
  body.append(el("div", { class: "eyebrow", text: F.editingId ? t("editNote") : t("newNote") }));
  body.append(el("div", { class: "coords", style: "margin-bottom:14px", text: fmtCoord(d.lon, d.lat) + ((d.iso && regionName(d.iso)) || d.country ? "  ·  " + ((d.iso && regionName(d.iso)) || d.country) : "") }));

  const form = el("form", { class: "form", onsubmit: e => { e.preventDefault(); savePlace(); } });
  const bind = (key) => e => { d[key] = e.target.value; };

  // places come from "+ Pin ekle", food spots from a place's "+ Ne yedim ekle": no Yer/Sofra switch
  const par = d.parent_id ? S.places.find(x => x.id === d.parent_id) : null;
  if (par) form.append(el("div", { class: "food-loc" },
    el("span", { text: d.lon === par.lon && d.lat === par.lat ? t("foodLocPlace", L(par, "title")) : t("foodLocSet") }),
    el("button", { class: "linkbtn", type: "button", onclick: () => openAddPin("food") }, t("foodLocSearch"))));

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
const PIN_COLS_BASE = "id,user_id,kind,home,title,title_en,city,country,iso,lat,lon,visited_on,note,note_en,dish,dish_en,rating,price,photos,created_at";
let HAS_PARENT = true;   // false until supabase/07_sofra_yere_bagla.sql has added pins.parent_id
const pinCols = () => HAS_PARENT ? PIN_COLS_BASE + ",parent_id" : PIN_COLS_BASE;
const PIN_COLS = PIN_COLS_BASE + ",parent_id";
const missingParentCol = e => !!e && /parent_id/.test(e.message || "") && (e.code === "42703" || e.code === "PGRST204" || /does not exist|could not find/i.test(e.message || ""));
// food spots ("Sofra") belong to a place: top-level pins are places (and old food pins not attached yet)
const isTop = p => !p.parent_id;
const foodsOf = id => S.places.filter(x => x.parent_id === id).sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.createdAt || 0) - (a.createdAt || 0));
const parentOf = p => p && p.parent_id ? S.places.find(x => x.id === p.parent_id) : null;
const fromRow = r => ({
  id: r.id, user_id: r.user_id, kind: r.kind, home: r.home, title: r.title, title_en: r.title_en, city: r.city, country: r.country, iso: r.iso,
  lat: r.lat, lon: r.lon, date: r.visited_on || "", note: r.note, note_en: r.note_en, dish: r.dish, dish_en: r.dish_en,
  rating: r.rating, price: r.price, photos: r.photos || [], createdAt: Date.parse(r.created_at) || 0, parent_id: r.parent_id || null,
});
const toRow = d => ({
  ...(HAS_PARENT ? { parent_id: d.parent_id || null } : {}),
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
      ? sb.from("pins").update(row).eq("id", F.editingId).select(pinCols()).single()
      : sb.from("pins").insert({ ...row, user_id: S.me.id }).select(pinCols()).single();
    const { data, error } = await q;
    if (error) throw error;
    await removePhotos(F.removed);
    F.newFiles.forEach(f => URL.revokeObjectURL(f.url));
    const wasEdit = !!F.editingId;
    S.form = null; S.temp = null;
    upsertLocal(fromRow(data));
    toast(wasEdit ? t("updated") : t("added"));
    openDetail(data.parent_id || data.id, false);
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
  S.places = S.places.filter(x => x.id !== p.id && x.parent_id !== p.id);   // its food spots are deleted with it
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
  S.wish = []; S.wishSel = null; S.wishForm = null;
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
  let { data: pins, error: pe } = await sb.from("pins").select(pinCols()).eq("user_id", prof.id);
  if (missingParentCol(pe)) { HAS_PARENT = false; ({ data: pins, error: pe } = await sb.from("pins").select(pinCols()).eq("user_id", prof.id)); }
  if (pe) { S.dbState = "error"; } else { S.dbState = "ok"; }
  S.places = (pins || []).map(fromRow);
  await Promise.all([signPhotos([prof.avatar_path, ...S.places.flatMap(p => p.photos)]), loadWish(prof.id)]);
  await loadMineSrc();
  S.ownerState = "ok"; S.loaded = true;
  renderChrome(); render(); lastFitOwner = null; fitPins();
  maybeAutoIntro();
  if (!quiet && S.canEdit && !S.places.length && !ls("mp-onb-done-" + S.me.id)) location.hash = "#/start";
}

/* ---------------- "Pin ekle": type an address or a place name (Photon search), or tap the map ---------------- */
let ADDPIN = { q: "", results: null, err: false, mode: "pin" };
let addPinTimer = 0, addPinCtl = null;
function openAddPin(mode = "pin") {
  setPicking(false);
  ADDPIN = { q: mode === "food" && S.form ? S.form.data.title || "" : "", results: null, err: false, mode };
  if (mode === "pin") { S.temp = null; S.selId = null; }
  S.view = "addpin"; setSheet(""); render(); const i = $("#addpin-q"); if (i) i.focus();
  if (ADDPIN.q.length >= 3) searchAddress();
}
function renderAddPin() {
  const food = ADDPIN.mode === "food" && S.form;
  body.append(food ? el("button", { class: "back", type: "button", onclick: () => { S.view = "form"; render(); } }, t("backCancel"))
    : el("button", { class: "back", type: "button", onclick: backToList }, t("allNotes")));
  body.append(el("h2", { class: "d-title", text: food ? t("foodLocSearch") : t("addPinT") }));
  const input = el("input", { id: "addpin-q", type: "search", placeholder: t("addPinPh"), value: ADDPIN.q, autocomplete: "off", enterkeyhint: "search",
    oninput: e => { ADDPIN.q = e.target.value; clearTimeout(addPinTimer); addPinTimer = setTimeout(searchAddress, 350); },
    onkeydown: e => { if (e.key === "Enter") { e.preventDefault(); clearTimeout(addPinTimer); searchAddress(); } } });
  body.append(el("div", { class: "field search" }, input));
  body.append(el("div", { id: "addpin-res" }));
  if (!food) body.append(el("button", { class: "linkbtn", type: "button", onclick: () => { S.view = "list"; render(); setPicking(true); } }, "📍 " + t("addPinMap")));
  paintAddPinResults();
}
function paintAddPinResults() {
  const box = $("#addpin-res"); if (!box) return;
  box.replaceChildren();
  if (ADDPIN.err) { box.append(el("p", { class: "notice", text: t("addPinErr") })); return; }
  if (!ADDPIN.results) return;
  if (!ADDPIN.results.length) { box.append(el("p", { class: "hint", text: t("addPinNone") })); return; }
  box.append(el("ul", { class: "addr-list" }, ADDPIN.results.map(r => el("li", {},
    el("button", { class: "addr", type: "button", onclick: () => chooseAddress(r) }, el("b", { text: r.main }), r.sub ? el("span", { text: r.sub }) : null)))));
}
async function searchAddress() {
  const q = ADDPIN.q.trim();
  if (q.length < 3) { ADDPIN.results = null; ADDPIN.err = false; paintAddPinResults(); return; }
  if (addPinCtl) addPinCtl.abort();
  const ctl = addPinCtl = new AbortController(), timer = setTimeout(() => ctl.abort(), 8000);
  // results near the current map view first
  const c = mapReady ? map.getCenter() : null;
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=7&lang=${LANG === "en" ? "en" : "default"}` + (c ? `&lat=${c.lat.toFixed(3)}&lon=${c.lng.toFixed(3)}` : "");
  try {
    const r = await fetch(url, { signal: ctl.signal });
    const js = await r.json();
    if (ctl !== addPinCtl) return;
    ADDPIN.err = false;
    ADDPIN.results = (js.features || []).map(f => {
      const pr = f.properties || {}, [lon, lat] = f.geometry.coordinates;
      const street = [pr.street, pr.housenumber].filter(Boolean).join(" ");
      const town = pr.city || pr.town || pr.village || pr.district || "";
      const main = pr.name || street || town || pr.state || pr.country || "";
      const sub = [pr.name && street ? street : "", town !== main ? town : "", pr.country !== main ? pr.country : ""].filter(Boolean).join(", ");
      return { main, sub, lon: +lon.toFixed(5), lat: +lat.toFixed(5), name: pr.name || "", town, iso: (pr.countrycode || "").toUpperCase(), type: pr.type || "" };
    }).filter(r => r.main);
  } catch (e) { if (ctl !== addPinCtl) return; ADDPIN.err = true; }   // a newer search replaced this one: ignore; otherwise failed or timed out
  finally { clearTimeout(timer); }
  if (ctl === addPinCtl) paintAddPinResults();
}
function chooseAddress(r) {
  const at = { lon: r.lon, lat: r.lat }, w = whereIs(at.lon, at.lat);
  if (ADDPIN.mode === "food" && S.form) {        // a food spot's venue: only its position (and name if still empty) change
    const d = S.form.data; d.lon = at.lon; d.lat = at.lat; if (!d.title && r.name) d.title = r.name;
    S.temp = at; S.view = "form"; render();
    if (mapReady) camera({ center: [at.lon, at.lat], zoom: 16 });
    return;
  }
  S.temp = at;
  startForm(null, at, { title: r.name || "", city: w.city || r.town || "", country: w.country, iso: w.iso || r.iso });
  // close enough to see the exact spot: a house or a street much closer than a whole town
  const z = ({ house: 17, street: 16, locality: 15, district: 14, village: 14, town: 13, city: 12, county: 10, state: 8, country: 6 })[r.type] || 16;
  if (mapReady) camera({ center: [at.lon, at.lat], zoom: z });
}

/* ---------------- "Belki bir gün" (Someday List) ---------------- */
const WISH_COLS = "id,user_id,kind,title,title_en,city,country,iso,lat,lon,source_pin,source_user,created_at";
// table not created yet in Supabase (03_wishlist.sql not run): show a note instead of an error
const wishTableMissing = e => !!e && (e.code === "42P01" || e.code === "PGRST205" || /wishlist/i.test(e.message || "") && /not find|does not exist|schema cache/i.test(e.message || ""));
async function loadWish(ownerId) {
  const { data, error } = await sb.from("wishlist").select(WISH_COLS).eq("user_id", ownerId).order("created_at", { ascending: false });
  S.wishState = error ? (wishTableMissing(error) ? "missing" : "error") : "ok";
  S.wish = error ? [] : (data || []).sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
}
// which of the pins on screen are already on MY list (to show "Belki bir gün ✓" on someone else's pin)
async function loadMineSrc() {
  S.mineSrc = new Map();
  if (!S.me || S.wishState === "missing") return;
  const rows = S.canEdit ? S.wish : ((await sb.from("wishlist").select("id,source_pin").eq("user_id", S.me.id)).data || []);
  for (const r of rows) if (r.source_pin) S.mineSrc.set(r.source_pin, r.id);
}
async function toggleWishFromPin(p) {
  if (!S.me) return signIn();
  const have = S.mineSrc.get(p.id);
  if (have) {
    const { error } = await sb.from("wishlist").delete().eq("id", have);
    if (error) { toast(t("wishErr")); return; }
    S.mineSrc.delete(p.id); toast(t("wishRemovedT")); render(); return;
  }
  const row = { user_id: S.me.id, kind: p.kind, title: p.title, title_en: p.title_en || "", city: p.city || "", country: p.country || "", iso: p.iso || "",
    lat: p.lat, lon: p.lon, source_pin: p.id, source_user: p.user_id || (S.owner && S.owner.id) || null };
  const { data, error } = await sb.from("wishlist").insert(row).select(WISH_COLS).single();
  if (error) { toast(wishTableMissing(error) ? t("wishMissing") : t("wishErr")); return; }
  S.mineSrc.set(p.id, data.id); toast(t("wishAddedT")); render();
}
function selectWish(id) {
  const w = S.wish.find(x => x.id === id); if (!w) return;
  S.wishSel = id; S.view = "list"; S.filter = "wish"; render();
  const z = map ? map.getZoom() : 0;
  if (mapReady) camera({ center: [w.lon, w.lat], zoom: z < 12 ? 12 : z });
  const row = document.querySelector(`[data-wish="${id}"]`); if (row) row.scrollIntoView({ block: "nearest" });
}
// name for a tapped spot: the nearest place / island label on the map, otherwise the nearest known city
function labelNear(pt) {
  if (!mapReady) return "";
  const r = 40, feats = map.queryRenderedFeatures([[pt.x - r, pt.y - r], [pt.x + r, pt.y + r]])
    .filter(f => f.layer.type === "symbol" && f.sourceLayer === "place" && f.properties.class !== "country" && f.properties.class !== "continent");
  let best = null, bd = Infinity;
  for (const f of feats) { const q = map.project(f.geometry.coordinates), d = (q.x - pt.x) ** 2 + (q.y - pt.y) ** 2; if (d < bd) { bd = d; best = f; } }
  if (!best) return "";
  const pr = best.properties;
  return (LANG === "en" ? pr["name:en"] || pr.name_en : pr["name:tr"]) || pr["name:latin"] || pr.name || "";
}
function startWishForm(pt, at) {
  const w = whereIs(at.lon, at.lat);
  S.wishForm = { lon: at.lon, lat: at.lat, title: labelNear(pt) || w.city || "", city: w.city, country: w.country, iso: w.iso, busy: false };
  S.filter = "wish"; S.view = "list"; setSheet(""); render();
  const i = $("#wish-name"); if (i) { i.focus(); i.select(); }
}
async function saveWishForm() {
  const F = S.wishForm; if (!F || F.busy) return;
  const title = ($("#wish-name").value || "").trim(); if (!title) { $("#wish-name").focus(); return; }
  F.busy = true; render();
  const row = { user_id: S.me.id, kind: "yer", title, city: F.city || "", country: F.country || "", iso: F.iso || "", lat: F.lat, lon: F.lon };
  const { data, error } = await sb.from("wishlist").insert(row).select(WISH_COLS).single();
  if (error) { F.busy = false; toast(wishTableMissing(error) ? t("wishMissing") : t("wishErr")); render(); return; }
  S.wish.unshift(data); S.wishForm = null; S.temp = null; S.wishSel = data.id; toast(t("wishAddedT")); render();
}
async function removeWish(w) {
  const { error } = await sb.from("wishlist").delete().eq("id", w.id);
  if (error) { toast(t("wishErr")); return; }
  S.wish = S.wish.filter(x => x.id !== w.id); if (w.source_pin) S.mineSrc.delete(w.source_pin);
  if (S.wishSel === w.id) S.wishSel = null; toast(t("wishRemovedT")); render();
}
// "Gittim": becomes a pin on my map (note and photos can be added later), and leaves the list
async function wentWish(w) {
  const row = { user_id: S.me.id, kind: "yer", home: false, title: w.title, title_en: w.title_en || "", city: w.city || "", country: w.country || "", iso: w.iso || "",
    lat: w.lat, lon: w.lon, note: "", note_en: "", dish: "", dish_en: "", rating: 0, price: "", photos: [] };
  const { data, error } = await sb.from("pins").insert(row).select(pinCols()).single();
  if (error) { toast(t("wishErr")); return; }
  await sb.from("wishlist").delete().eq("id", w.id);
  S.wish = S.wish.filter(x => x.id !== w.id); if (w.source_pin) S.mineSrc.delete(w.source_pin);
  upsertLocal(fromRow(data)); S.wishSel = null; S.filter = "yer"; ls("ad-filter", "yer");
  toast(t("wishWentT")); openDetail(data.id, false);
}
function renderWish() {
  if (S.wishState === "missing") { body.append(el("div", { class: "notice", text: t("wishMissing") })); return; }
  if (S.wishState === "error") { body.append(el("div", { class: "notice", text: t("dbErr") })); return; }
  if (S.canEdit && !S.wishForm) body.append(el("div", { class: "wish-head" },
    el("button", { class: "btn small", type: "button", onclick: () => { S.temp = null; setPicking(!S.picking || S.pickMode !== "wish" ? true : false, "wish"); } }, t("wishNew"))));
  if (S.wishForm) {
    const F = S.wishForm;
    body.append(el("form", { class: "wish-form", onsubmit: e => { e.preventDefault(); saveWishForm(); } },
      el("label", { class: "field" }, el("span", { class: "lab", text: t("wishName") }), el("input", { id: "wish-name", type: "text", maxlength: "120", value: F.title, autocomplete: "off" })),
      F.city || F.country ? el("p", { class: "wish-where", text: [F.city, F.country].filter(Boolean).join(", ") }) : null,
      el("div", { class: "wish-acts" },
        el("button", { class: "btn", type: "submit", disabled: F.busy ? "" : null }, t("wishSave")),
        el("button", { class: "btn ghost", type: "button", onclick: () => { S.wishForm = null; S.temp = null; render(); } }, t("cancel")))));
  }
  if (!S.wish.length) { if (!S.wishForm) body.append(el("div", { class: "empty", text: S.canEdit ? t("wishEmptyOwn") : t("wishEmptyOther") })); return; }
  const ul = el("ul", { class: "wlist" });
  for (const w of S.wish) {
    const on = w.id === S.wishSel;
    const li = el("li", { class: on ? "on" : "", "data-wish": w.id },
      el("button", { class: "wrow", type: "button", "aria-pressed": String(on), onclick: () => selectWish(w.id) }, el("span", { class: "wstar", "aria-hidden": "true", text: "☆" }), L(w, "title")));
    if (on && S.canEdit) li.append(el("div", { class: "wacts" },
      el("button", { class: "btn small", type: "button", onclick: () => wentWish(w) }, t("wishWent")),
      el("button", { class: "btn ghost small", type: "button", onclick: () => removeWish(w) }, t("wishRemove"))));
    ul.append(li);
  }
  body.append(ul);
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
    diag: d => `Teşhis: ${d.jpeg} JPEG, ${d.heic} HEIC, ${d.other} diğer · ${d.exif} fotoğrafta bilgi bloğu var, ${d.gps} tanesinde konum var.`,
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
    diag: d => `Diagnostics: ${d.jpeg} JPEG, ${d.heic} HEIC, ${d.other} other · ${d.exif} photos have a metadata block, ${d.gps} have a location.`,
  },
};
const ot = (k, ...a) => { const v = OT[LANG][k] ?? OT.tr[k]; return typeof v === "function" ? v(...a) : v; };

/* --- EXIF reader: GPS + DateTimeOriginal from JPEG or HEIC (searches for the TIFF block) --- */
const DIAG = { jpeg: 0, heic: 0, other: 0, exif: 0, gps: 0 };
function findTiff(v) {
  // look for "Exif\0\0" followed by a TIFF header ("II*\0" or "MM\0*")
  const n = v.byteLength - 10;
  for (let i = 0; i < n; i++) {
    if (v.getUint8(i) === 0x45 && v.getUint8(i + 1) === 0x78 && v.getUint8(i + 2) === 0x69 && v.getUint8(i + 3) === 0x66 && v.getUint8(i + 4) === 0 && v.getUint8(i + 5) === 0) {
      const t = i + 6, h = v.getUint16(t);
      if ((h === 0x4949 && v.getUint16(t + 2, true) === 42) || (h === 0x4D4D && v.getUint16(t + 2) === 42)) return t;
    }
  }
  return -1;
}
async function readExif(file) {
  try {
    const head = new DataView(await file.slice(0, 16).arrayBuffer());
    const isJpeg = head.getUint16(0) === 0xFFD8;
    const brand = String.fromCharCode(...[8, 9, 10, 11].map(i => head.getUint8(i)));
    const isHeic = String.fromCharCode(...[4, 5, 6, 7].map(i => head.getUint8(i))) === "ftyp" && /hei|mif|hev|avif/i.test(brand);
    if (isJpeg) DIAG.jpeg++; else if (isHeic) DIAG.heic++; else { DIAG.other++; return null; }
    for (const [from, to] of [[0, 512 * 1024], [Math.max(0, file.size - 512 * 1024), file.size]]) {
      const v = new DataView(await file.slice(from, to).arrayBuffer());
      const t = findTiff(v);
      if (t >= 0) { DIAG.exif++; const r = parseTiff(v, t); if (r && r.lat != null) DIAG.gps++; return r; }
      if (file.size <= 512 * 1024) break;
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
  if (!mapReady) return;
  const isos = ONB && S.panelMode === "onboard" ? [...ONB.sel] : [];
  const flt = ["in", ["get", "i"], ["literal", isos]];
  map.setFilter("countries-picked", flt); map.setFilter("countries-picked-line", flt);
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
  ONB.step = "scan"; ONB.total = list.length; ONB.scanned = 0; ONB.pts = []; Object.keys(DIAG).forEach(k => DIAG[k] = 0); render();
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
  if (!mapReady || !arr.length) return;
  const b = new maplibregl.LngLatBounds(); arr.forEach(r => b.extend([r.lon, r.lat]));
  map.fitBounds(b, { padding: mapPadding(), maxZoom: 10, duration: 800 });
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
  const { data, error } = await sb.from("pins").insert(rows).select(pinCols());
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
  if (ONB.pts.length < ONB.total) body.append(el("p", { class: "hint diag", text: ot("diag", DIAG) }));
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
      S.me.visibility !== "ghost" ? el("button", { role: "menuitem", type: "button", onclick: shareMyMap }, "🔗 " + t("shareMap")) : null,
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
      S.canEdit
        ? el("span", { class: "pcx-counts" },
            el("a", { href: "#/people/followers" }, t("followers", S.counts.followers)), " · ",
            el("a", { href: "#/people/following" }, t("following", S.counts.following)))
        : el("span", { class: "pcx-counts", text: t("followers", S.counts.followers) + " · " + t("following", S.counts.following) })));
  const acts = el("div", { class: "pcx-acts" });
  if (S.canEdit) {
    acts.append(el("a", { class: "btn ghost small", href: "#/profile" }, t("editProfile")),
      el("a", { class: "btn ghost small", href: "#/people" }, t("peopleBtn"), S.pending ? el("span", { class: "badge in", text: String(S.pending) }) : null));
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
// phones: the system share sheet (WhatsApp, Messages...); elsewhere: copy the link
async function shareMyMap() {
  const url = mapLink(S.me.username);
  if (navigator.share) {
    try { await navigator.share({ title: t("shareText", S.me.display_name || S.me.username), url }); return; }
    catch (e) { if (e && e.name === "AbortError") return; }
  }
  copyText(url);
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); toast(t("copied")); }
  catch (e) { toast(txt); }
}

/* ---------------- settings ---------------- */
let SET = null;
let SETMODE = "account";   // "profile" = Profili düzenle (photo, name, about) · "account" = Ayarlar (username, language, mode, delete)
function renderSettings() {
  if (!S.me) { body.append(el("div", { class: "empty" }, el("strong", { text: t("settings") }), t("needSignIn"), el("div", { style: "margin-top:12px" }, el("button", { class: "acct-signin", type: "button", onclick: signIn }, googleMark(), t("signIn"))))); return; }
  const prof = SETMODE === "profile";
  if (!SET) { const about = (LANG === "en" && S.me.bio_en) || S.me.bio || "";
    SET = { d: { display_name: S.me.display_name, username: S.me.username, about, about0: about, visibility: S.me.visibility }, busy: false, err: "", msg: "", del: null }; }
  const d = SET.d;
  body.append(el("a", { class: "back", href: "#/u/" + S.me.username }, "← " + t("myMap")));
  body.append(el("h2", { class: "d-title", text: prof ? t("editProfile") : t("settings") }));
  const form = el("form", { class: "form", onsubmit: e => { e.preventDefault(); saveSettings(); } });
  const bind = k => e => { d[k] = e.target.value; };
  if (prof) {
    form.append(el("div", { class: "field" }, el("span", { class: "lab", text: t("sPhoto") }),
      el("div", { class: "set-photo" }, avatarEl(S.me, "av av-lg"),
        el("label", { class: "btn ghost small", for: "s-photo" }, t(S.me.avatar_path ? "photoChange" : "photoUp"),
          el("input", { type: "file", id: "s-photo", accept: "image/*", class: "vh", onchange: e => uploadAvatar(e.target.files[0]) })),
        el("span", { class: "hint", id: "s-photo-msg" }))));
    form.append(el("div", { class: "field" }, el("label", { for: "s-name", text: t("sName") }), el("input", { id: "s-name", maxlength: 60, value: d.display_name, oninput: bind("display_name") })));
    form.append(el("div", { class: "field" }, el("label", { for: "s-bio", text: t("sBio") }), el("textarea", { id: "s-bio", maxlength: 1200, oninput: bind("about") }, d.about)));
  } else {
    form.append(el("div", { class: "field" }, el("label", { for: "s-user", text: t("sUser") }),
      el("input", { id: "s-user", maxlength: 24, value: d.username, autocapitalize: "none", spellcheck: "false", oninput: e => { d.username = e.target.value.toLowerCase(); } })));
    form.append(el("div", { class: "field" }, el("span", { class: "lab", text: t("sLang") }), langSeg("seg lang-seg")));
    const modes = el("div", { class: "modes", role: "radiogroup", "aria-label": t("sMode") });
    for (const m of ["public", "private", "ghost"]) {
      modes.append(el("label", { class: "mode" + (d.visibility === m ? " on" : "") },
        el("input", { type: "radio", name: "s-mode", value: m, checked: d.visibility === m, onchange: () => { d.visibility = m; render(); } }),
        el("span", { class: "mode-t", text: { public: "🌍 ", private: "🔒 ", ghost: "👻 " }[m] + t("m_" + m) }),
        el("span", { class: "mode-d", text: t("m_" + m + "D") })));
    }
    form.append(el("div", { class: "field" }, el("span", { class: "lab", text: t("sMode") }), modes));
  }
  if (SET.err) form.append(el("div", { class: "err", role: "alert", text: SET.err }));
  form.append(el("div", { class: "form-actions" }, el("button", { class: "btn", type: "submit", disabled: SET.busy }, SET.busy ? (SET.busy === "tr" ? t("translating") : t("saving")) : t("save"))));
  body.append(form);
  if (prof) return;
  // account: sign out, delete (typed username confirms)
  body.append(el("div", { class: "set-out" }, el("button", { class: "btn ghost small", type: "button", onclick: signOut }, t("signOut"))));
  const del = el("section", { class: "set-del" }, el("h3", { text: t("delT") }));
  if (!SET.del) del.append(el("button", { class: "btn ghost small danger-t", type: "button", onclick: () => { SET.del = { typed: "", busy: false, err: "" }; render(); } }, t("delBtn")));
  else {
    const D = SET.del, ok = () => D.typed.trim().toLowerCase() === S.me.username.toLowerCase();
    const go = el("button", { class: "btn danger small", type: "button", disabled: !ok() || D.busy, onclick: deleteAccount }, D.busy ? t("deleting") : t("delGo"));
    del.append(el("p", { class: "del-warn", text: t("delWarn") }),
      el("label", { class: "field" }, el("span", { class: "lab", text: t("delType", "@" + S.me.username) }),
        el("input", { id: "del-user", autocapitalize: "none", spellcheck: "false", autocomplete: "off", value: D.typed, oninput: e => { D.typed = e.target.value; go.disabled = !ok() || D.busy; } })),
      D.err ? el("div", { class: "err", role: "alert", text: D.err }) : null,
      el("div", { class: "del-acts" }, go, el("button", { class: "btn ghost small", type: "button", onclick: () => { SET.del = null; render(); } }, t("cancel"))));
  }
  body.append(del);
}
// Translation of short texts into Turkish AND English. Returns { tr, en } or null.
// 1) Claude, through the Supabase Edge Function "translate" (supabase/functions/translate), once it is deployed;
// 2) until then (or if it fails): MyMemory, a free service with no key (lower quality, daily limit, 500 bytes per request).
// Switching to Claude later needs no code change: deploy the function and it is used automatically.
async function translatePair(text) {
  try {
    const { data, error } = await sb.functions.invoke("translate", { body: { text } });
    if (!error && data && typeof data.tr === "string" && typeof data.en === "string") return { tr: data.tr.trim(), en: data.en.trim() };
  } catch (e) { /* not deployed yet: use the free service */ }
  return translateFree(text);
}
// rough language guess: Turkish letters or very common Turkish words
const looksTurkish = s => /[çğıöşüİĞŞ]/.test(s) || /\b(ve|bir|bu|için|ile|çok|ben|gibi|olan|daha|en|ama|de|da)\b/i.test(s) && !/\b(the|and|with|is|are|of|to|in)\b/i.test(s);
// split into pieces under ~450 bytes (MyMemory's limit is 500 bytes per request), keeping paragraphs and sentences
function chunks(text) {
  const out = [], size = s => new TextEncoder().encode(s).length;
  for (const para of text.split(/(\n+)/)) {
    if (/^\n+$/.test(para) || size(para) <= 450) { out.push(para); continue; }
    let cur = "";
    for (const part of para.split(/(?<=[.!?…])\s+/)) {
      if (size(cur + " " + part) > 450 && cur) { out.push(cur); cur = part; } else cur = cur ? cur + " " + part : part;
    }
    if (cur) out.push(cur);
  }
  return out;
}
async function myMemory(piece, from, to) {
  if (!piece.trim() || /^\n+$/.test(piece)) return piece;
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(piece)}&langpair=${from}|${to}`, { signal: ctl.signal });
    const js = await r.json();
    const out = js && js.responseData && js.responseData.translatedText;
    if (!r.ok || +js.responseStatus !== 200 || !out || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out)) throw new Error("mymemory");
    return out;
  } finally { clearTimeout(timer); }
}
async function translateFree(text) {
  const from = looksTurkish(text) ? "tr" : "en", to = from === "tr" ? "en" : "tr";
  try {
    const parts = [];
    for (const piece of chunks(text)) parts.push(await myMemory(piece, from, to));
    const other = parts.join("").trim();
    return from === "tr" ? { tr: text, en: other } : { tr: other, en: text };
  } catch (e) { return null; }
}
async function saveSettings() {
  const d = SET.d, prof = SETMODE === "profile";
  if (!prof && !/^[a-z0-9_.]{3,24}$/.test(d.username)) { SET.err = t("sUserBad"); render(); return; }
  SET.busy = true; SET.err = ""; render();
  // "about": written once in either language, stored in both (bio = Turkish, bio_en = English)
  const upd = prof ? { display_name: d.display_name.trim() } : { username: d.username, visibility: d.visibility };
  let transFailed = false;
  const about = (d.about || "").trim();
  if (prof && about !== (d.about0 || "").trim()) {
    if (!about) { upd.bio = ""; upd.bio_en = ""; }
    else {
      SET.busy = "tr"; render();
      const pair = await translatePair(about);
      if (pair) { upd.bio = pair.tr; upd.bio_en = pair.en; }
      else { upd.bio = about; upd.bio_en = ""; transFailed = true; }
      SET.busy = true; render();
    }
  }
  const { data, error } = await sb.from("profiles").update(upd).eq("id", S.me.id).select("*").single();
  SET.busy = false;
  if (error) { SET.err = error.code === "23505" ? t("sUserTaken") : t("saveErr"); render(); return; }
  S.me = data; if (S.owner && S.owner.id === data.id) S.owner = { ...S.owner, ...data };
  SET = null; toast(transFailed ? t("sTransFail") : t("sSaved"));
  renderChrome(); render();
}
// delete my account: photos through the Storage API, then the account (and everything that belongs to it) in the database
async function deleteAccount() {
  const D = SET.del; if (!D || D.busy) return;
  D.busy = true; D.err = ""; render();
  try {
    // set up? (supabase/09). Checked before any photo is removed
    const chk = await sb.rpc("can_delete_account");
    if (chk.error || chk.data !== true) throw chk.error || { code: "PGRST202" };
    const folder = S.me.id, paths = [];
    for (let off = 0; ; off += 1000) {
      const { data } = await sb.storage.from("photos").list(folder, { limit: 1000, offset: off });
      (data || []).forEach(f => f.name && paths.push(folder + "/" + f.name));
      if (!data || data.length < 1000) break;
    }
    for (let i = 0; i < paths.length; i += 100) await sb.storage.from("photos").remove(paths.slice(i, i + 100));
    const { error } = await sb.rpc("delete_my_account");
    if (error) throw error;
  } catch (e) {
    D.busy = false;
    D.err = e && (e.code === "PGRST202" || /delete_my_account|can_delete_account/.test(e.message || "")) ? t("delMissing") : t("delErr");
    render(); return;
  }
  try { await sb.auth.signOut(); } catch (e) {}
  S.me = null; SET = null; S.owner = null; toast(t("delDone"));
  location.hash = "#/"; renderChrome();
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
let PEOPLE = { q: "", results: null, requests: [], followers: [], following: [], loaded: false, view: "search" };
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
  // three screens: #/people = search, #/people/followers, #/people/following
  const v = PEOPLE.view || "search";
  if (S.me) body.append(el("a", { class: "back", href: "#/u/" + S.me.username }, t("backProfile")));
  body.append(el("div", { class: "eyebrow", text: "MyPins" }), el("h2", { class: "d-title", text: v === "followers" ? t("followersT") : v === "following" ? t("followingT") : t("people") }));
  if (v === "search") {
    const input = el("input", { id: "p-search", type: "search", placeholder: t("searchPh"), value: PEOPLE.q, autocapitalize: "none", enterkeyhint: "search", oninput: e => {
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
    if (PEOPLE.results) body.append(PEOPLE.results.length ? el("ul", { class: "people" }, PEOPLE.results.map(p => personRow(p))) : el("p", { class: "hint", text: t("searchNone") }));
    if (!PEOPLE.q) setTimeout(focusSearch, 0);
  }
  if (!S.me) { body.append(el("p", { class: "hint", text: t("needSignIn") })); return; }
  if (!PEOPLE.loaded) { loadPeople().then(render); return; }
  const list = (arr, extra) => body.append(arr.length ? el("ul", { class: "people" }, arr.map(p => personRow(p, extra && extra(p)))) : el("p", { class: "hint", text: t("nobody") }));
  if (v === "followers") { list(S.me.visibility === "ghost" ? [] : PEOPLE.followers); return; }
  if (v === "following") { list(PEOPLE.following, p => p._status === "pending" ? el("span", { class: "hint", text: t("requested") }) : null); return; }
  // search screen: pending follow requests stay reachable here
  if (S.me.visibility === "private" || PEOPLE.requests.length) body.append(el("section", { class: "rel" }, el("h3", { text: t("requests") + (PEOPLE.requests.length ? ` (${PEOPLE.requests.length})` : "") }),
    PEOPLE.requests.length ? el("ul", { class: "people" }, PEOPLE.requests.map(p => personRow(p, el("span", { class: "person-acts" },
      el("button", { class: "btn small", type: "button", onclick: () => answerRequest(p.id, true) }, t("accept")),
      el("button", { class: "btn ghost small", type: "button", onclick: () => answerRequest(p.id, false) }, t("decline")))))) : el("p", { class: "hint", text: t("noRequests") })));
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
  S.form = null; S.temp = null; S.wishForm = null; setPicking(false);
  if (a === "start") { S.panelMode = "onboard"; if (!S.me) { render(); return; } if (!S.owner || S.owner.id !== S.me.id) await loadOwner(S.me.username, true); if (!ONB) onbReset(); S.panelMode = "onboard"; onbPaint(); render(); return; }
  if (typeof onbPaint === "function") { S.panelMode = "map"; onbPaint(); }
  if (a === "settings" || a === "profile") { S.panelMode = "settings"; SET = null; SETMODE = a === "profile" ? "profile" : "account"; if (!S.owner && S.me) await loadOwner(S.me.username); render(); return; }
  if (a === "people") { S.panelMode = "people"; PEOPLE.view = b === "followers" || b === "following" ? b : "search"; PEOPLE.loaded = false; PEOPLE.results = null; PEOPLE.q = ""; if (!S.owner && S.me) await loadOwner(S.me.username); render(); return; }
  S.panelMode = "map";
  if (a === "u" && b) { if (!S.owner || S.owner.username.toLowerCase() !== b.toLowerCase() || S.ownerState !== "ok") await loadOwner(b); else render(); return; }
  if (S.me) { location.replace("#/u/" + S.me.username); return; }
  await loadOwner(MYPINS.featured);
  if (!ls("mp-welcomed")) { ls("mp-welcomed", "1"); openIntro("welcome"); }
}
window.addEventListener("hashchange", () => { route(); });

/* ---------------- boot ---------------- */
let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(layout, 60); }).observe(mapEl);
initMap(); applyLang(); renderChrome(); render();
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
