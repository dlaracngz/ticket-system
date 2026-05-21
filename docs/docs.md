# PROJE NOTLARI

## Proje Hakkında

Bu proje, kullanıcıların taleplerini (ticket) oluşturabildiği, takip edebildiği ve bu talepler üzerine yorum yapabildiği bir **Ticket Management System** uygulamasıdır.

---

## Projeden Ne Anladım?

Bu proje sayesinde fullstack bir uygulamanın nasıl tasarlandığını ve geliştirildiğini öğrendim.

Özellikle:

- Backend ve frontend mimarisinin ayrımı
- API geliştirme süreci
- Veritabanı ilişkileri
- State management
- Form ve validation yapıları

konularında deneyim kazandım.

---

## Kullanılan Teknolojiler

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JavaScript
- JWT (Authentication)

### Frontend

- Next.js
- TypeScript
- Redux Toolkit
- Formik
- Yup
- Tailwind CSS
- Material UI

---

## Veritabanı Yapısı

Projede MySQL kullanıldı ve Sequelize ORM ile yönetildi.

### Tablolar:

- Users
- Tickets
- Comments

### İlişkiler:

- User → Ticket (createdBy / assignedTo)
- Ticket → Comment
- User → Comment

---

## Geliştirme Süreci

### 1. Backend Kurulumu

- Express server oluşturuldu
- MySQL bağlantısı kuruldu
- Sequelize modelleri tanımlandı

### 2. Authentication Sistemi

- Register ve login işlemleri yapıldı
- JWT ile token sistemi kuruldu

### 3. Ticket Sistemi

- Ticket oluşturma
- Ticket listeleme
- Ticket güncelleme (status değişimi)
- Atanan kişi sistemi

### 4. Comment Sistemi

- Ticket’lara yorum ekleme
- Yorumları listeleme

---

## Frontend Geliştirme

### Yapı

- Next.js App Router kullanıldı
- Layout sistemi (header, sidebar, page structure)
- Modular component yapısı oluşturuldu

### Özellikler

- Ticket listeleme tablosu
- Ticket oluşturma / status güncelleme modal yapıları
- Detay sayfası (yorum sistemi ile birlikte)
- Search ve filtreleme sistemi

### State Management

- Redux Toolkit kullanıldı
- Auth, ticket ve comment state yönetimi yapıldı

### Form Yönetimi

- Formik ile form yapıları oluşturuldu
- Yup ile validation kuralları eklendi

---

## UI / UX

- Tailwind CSS ile modern tasarım
- Material UI table component entegrasyonu
- Status badge renkleri (Açık / İşlemde / Kapalı)
- Responsive layout yapısı
- Modal tabanlı işlemler

---

## Sonuç

Bu proje sayesinde:

- Gerçek bir fullstack uygulama geliştirme deneyimi kazandım
- Backend ve frontend entegrasyonunu öğrendim
- Modern frontend teknolojilerini aktif şekilde kullandım
- Veritabanı ilişkileri ve API tasarımını geliştirdim
