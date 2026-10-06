# DocCure Patient Frontend

Patient-facing web application for the DocCure appointment platform. It connects to the DocCure backend API for doctor listings, accounts, appointments, payments, and contact inquiries.

## Features

- Browse doctors and view doctor details.
- Register, log in, and manage a patient profile.
- Book and manage appointments.
- Submit a contact inquiry.
- Browse the application on desktop and mobile layouts.

Contact messages are saved by the backend. SMTP acknowledgment email is optional; visitors see an on-page confirmation after a successful submission.

## Tech stack

React 19, Vite, React Router, Axios, Tailwind CSS, and Stripe Elements.

## Requirements

- Node.js and npm
- The [DocCure backend](https://github.com/zeeshan92git/doc-backend) running locally or deployed

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file at the project root:

```dotenv
VITE_BACKEND_URL=http://localhost:5000
```

Set `VITE_BACKEND_URL` to the backend origin, without an API path suffix. For a deployed frontend, set this variable in the hosting provider's build environment to the deployed API URL.

Start the Vite development server:

```bash
npm run dev
```

## Contact inquiry

The Contact page sends the visitor's name, email, subject, and message to:

```http
POST {VITE_BACKEND_URL}/api/email/send-email
Content-Type: application/json
```

The backend validates and stores the inquiry. An email confirmation is sent only when optional SMTP credentials are configured on the backend.

## Scripts

- `npm run dev`: Start the local development server.
- `npm run build`: Create a production build in `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.
- `npm test`: Placeholder; automated frontend tests are not configured.

## Related applications

- [Backend API](https://github.com/zeeshan92git/doc-backend)
- [Admin and doctor interface](https://github.com/zeeshan92git/doc-admin)
