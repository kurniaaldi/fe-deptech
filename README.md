# 👩‍💼 Employee Leave Management – Frontend

Frontend aplikasi manajemen cuti pegawai menggunakan:

- ✅ Next.js (App Router)
- 🎯 Redux Toolkit
- 💅 Material UI (MUI)
- 🧠 React Hook Form + Yup
- 🍪 js-cookie
- 🔔 react-toastify

## 📂 Struktur Fitur

```
├── app/
│   ├── login/
│   ├── employee/
│   ├── leave/
│   ├── profile/
│   ├── report/
├── features/
│   ├── auth/
│   ├── employee/
│   ├── leave/
│   ├── profile/
│   └── report/
├── components/
│   ├── EmployeeForm.tsx
│   ├── LeaveForm.tsx
│   └── Dialog.tsx
└── libs/
    └── api.ts
```

## ⚙️ Instalasi

```bash
git clone https://github.com/yourname/employee-leave-frontend.git
cd employee-leave-frontend
npm install
```

## 🚀 Menjalankan

```bash
npm run dev
```

## 🔐 Autentikasi

- Login: `/login`
- Token disimpan di cookie (`js-cookie`)
- Middleware Next.js digunakan untuk redirect user ke `/login` jika tidak ada token

## 📘 Halaman

- `/employee` → CRUD pegawai + pagination
- `/leave` → CRUD cuti + validasi
- `/profile` → profil admin
- `/report` → laporan cuti pegawai
- `/login` → login admin

## ✅ Fitur Tambahan

- Global toast untuk notifikasi (`react-toastify`)
- Validasi form dengan Yup
- Pagination backend (dari MySQL)
- Middleware route guard

## 📦 Tech Stack

- React 18 + Next.js 14
- Redux Toolkit + RTK AsyncThunk
- MUI + TailwindCSS (opsional)
- Toast (react-toastify)
- Axios Interceptor
