# Kullanıcı Giriş Sistemi (Vue 3 + TypeScript + Node.js)

Bu proje, bir kullanıcının kayıt olabileceği, giriş yapabileceği ve sadece giriş yaptığında görebileceği bir Main sayfasından oluşan tam kapsamlı bir web uygulamasıdır.

## Projenin Özellikleri:

- Frontend: Vue 3 ve TypeScript kullanılarak geliştirildi.

- Backend: Node.js ve Express.js ile bir API oluşturuldu.

- Veritabanı: Kullanıcılar backend/private/users.json dosyasında saklanır.

- Güvenlik: Giriş yapmayan kullanıcıların ana sayfaya erişimi engellenir.

- Tasarım: Modern, koyu tema kullanıldı.

## Kurulum ve Çalıştırma:

1- Adım: Projeyi indirin
- git clone https://github.com/vaxen404/password-auth.git

2- Adım: Frontend tarafını çalıştırın
- Proje ana klasöründe terminale "npm install" yazın, ardından "npm run dev" ile başlatın.

3- Adım: Backend tarafını çalıştırın
- Backend klasörüne girin, terminale "npm install" yazın ve "node server.js" ile sunucuyu başlatın.

## Klasör Yapısı:

- src: Vue bileşenleri ve TypeScript kodları.

- backend: Sunucu dosyaları.

- backend/private: Kullanıcı verileri.

#### Not: Bu proje eğitim amaçlıdır. Şifreler JSON dosyasında düz metin olarak tutulmaktadır.
