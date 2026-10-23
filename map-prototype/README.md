# Harita prototipi (map-prototype dalı)

Ana menüdeki etkileşimli haritanın akıcılığını ölçmek için bağımsız bir test ekranı. Ana uygulamaya (`app/`) dokunmaz; bu dal `main`'e birleştirilmedikçe yayına çıkmaz.

## Yaklaşım
- **MapLibre GL JS 4.7.1** (tek yeni bağımlılık, CDN) + **OpenFreeMap** vektör tile'ları (ücretsiz, anahtarsız).
- Mevcut uygulamanın haritası D3 ile SVG çiziyor: yakınlaştırmada her karede binlerce SVG yolu ve etiket yeniden hesaplanıyor, işi tamamen ana iş parçacığı yapıyor. MapLibre çizimi GPU'ya (WebGL) taşır, sadece görünen alanın tile'larını yükler ve yakınlaştırma seviyesine göre detayı otomatik azaltır.
- Pinler tek bir GeoJSON kaynağı olarak GPU'da çizilir (DOM işaretçisi yok). Clustering ve fotoğraflı pin isteğe bağlı, maliyetleri karşılaştırmak için.

## Test kontrolleri
- 20 / 50 / 100 / 500 nokta, animasyon aç/kapa, clustering, fotoğraflı pin. Varsayılan: 50 nokta, fotoğraflı pin açık, animasyon kapalı, otomatik senaryo kapalı (`?auto=1` ile açılır).
- Geliştirme paneli: FPS, kare süresi p95, takılma (>34 ms) sayısı, uzun görevler, görünen pin ve yüklü tile sayısı, kare süresi grafiği.
- "Senaryoları çalıştır": sürükleme, yakınlaştırma, kıta ölçeğinde zoom, nokta seçimi ve ekrandan çıkıp geri dönme senaryolarını tekrarlanabilir şekilde ölçer.

## Veri
Esra'nın herkese açık 30 pini ve 34 fotoğrafı gerçek olarak kullanılır. 100 ve 500 için bu pinlerin çevresine örnek pinler eklenir ve aynı fotoğraflar döngüyle kullanılır.
