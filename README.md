Here are simplified, clean versions of the `README.md` files for your frontend and backend repositories. They contain just the essentials to get your projects running quickly.

---

## 1. Frontend Repository `README.md`

```markdown
# 🌐 CeylonTech Labs - Frontend Website

The frontend web platform for **CeylonTech Labs**, built using modern web development standards.

## 🛠️ Tech Stack
* **Framework:** Next.js / React.js
* **Styling:** Tailwind CSS
* **Hosting:** Vercel

## 💻 Getting Started

### 1. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Run Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 🧪 Available Scripts

* 
`npm run dev` - Starts the local development server.

* 
`npm run build` - Builds the application for production.

* 
`npm run start` - Runs the compiled production build locally.

* 
`npm run lint` - Checks code formatting and identifies errors.

---

📩 **Contact:** ceylontechlabs@gmail.com | Colombo, Sri Lanka 

```

---

## 2. Backend Repository `README.md`

```markdown
# ⚙️ CeylonTech Labs - Backend API

The core backend API engine servicing **CeylonTech Labs** contact forms and server integrations.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Mailing:** Nodemailer (SMTP)

## 💻 Getting Started

### 1. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Setup
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ceylontechlabs@gmail.com
SMTP_PASS=your_secure_app_password

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Start Server

```bash
npm run dev

```

The server will run on port `5000` (`http://localhost:5000`).

## 📁 Key Project Folders

```text
├── src/
│   ├── controllers/     # Route logic handling
│   ├── middleware/      # Security & validations
│   ├── routes/          # API endpoints mapping
│   └── app.js           # Express configuration
└── server.js            # Entry point listener

```

---

📩 **Contact:** ceylontechlabs@gmail.com | Colombo, Sri Lanka 

```

```
