# Harita prototipi (map-prototype dalı)

Ana menüdeki etkileşimli haritanın akıcılığını ölçmek için bağımsız bir test ekranı. Ana uygulamaya (`app/`) dokunmaz; bu dal `main`'e birleştirilmedikçe yayına çıkmaz.

## Yaklaşım
- **MapLibre GL JS 4.7.1** (tek yeni bağımlılık, CDN) + **OpenFreeMap** vektör tile'ları (ücretsiz, anahtarsız).
- Mevcut uygulamanın haritası D3 ile SVG çiziyor: yakınlaştırmada her karede binlerce SVG yolu ve etiket yeniden hesaplanıyor, işi tamamen ana iş parçacığı yapıyor. MapLibre çizimi GPU'ya (WebGL) taşır, sadece görünen alanın tile'larını yükler ve yakınlaştırma seviyesine göre detayı otomatik azaltır.
- Pinler tek bir GeoJSON kaynağı olarak GPU'da çizilir (DOM işaretçisi yok). Clustering ve fotoğraflı pin isteğe bağlı, maliyetleri karşılaştırmak için.

## Test kontrolleri
- 20 / 50 / 100 / 500 nokta, animasyon aç/kapa, clustering, fotoğraflı pin. Varsayılan: 50 nokta, fotoğraflı pin açık, animasyon kapalı, otomatik senaryo kapalı (`?auto=1` ile açılır).
- Geliştirme paneli: FPS, kare süresi p95, takılma (>34 ms) sayısı, uzun görevler, görünen pin ve yüklü tile sayısı, kare süresi grafiği.
- **Worker ×4** (`?workers=4`): tile'ları işleyen arka plan iş parçacığı sayısını artırır. Havuz ilk haritadan önce kurulduğu için değiştirince sayfa yeniden yüklenir. Panelde gerçek sayı görünür. Varsayılan: kapalı (MapLibre'nin kendi sayısı).
- **Sade stil** (`?lite=1`): ev numarası, bina, havalimanı, yol kalkanı, tek yön oku, patika ve küçük yol adı katmanlarını kaldırır. POI davranışı `?poi=` ile seçilir: `off` (a, tamamen kaldır), `street` (b, sadece zoom 16+), `select` (c, yeme-içme kalkar; durak, müze ve diğerleri kalır). Varsayılan: kapalı.
- "⏱ Hızlı uzaklaşma testi": Barcelona sokak seviyesinden (z16) z5'e 1,2 saniyede uzaklaşır. Bu sırada istenen tile'ların ortalama hazır olma süresini, en çok bekleyen tile sayısını ve hareket bittikten sonra haritanın dolma süresini ("doluş") rapora yazar.
- "Senaryoları çalıştır": sürükleme, yakınlaştırma, kıta ölçeğinde zoom, nokta seçimi ve ekrandan çıkıp geri dönme senaryolarını tekrarlanabilir şekilde ölçer.

## Veri
Esra'nın herkese açık 30 pini ve 34 fotoğrafı gerçek olarak kullanılır. 100 ve 500 için bu pinlerin çevresine örnek pinler eklenir ve aynı fotoğraflar döngüyle kullanılır.
