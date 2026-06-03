# Notice Board

A full-stack Notice Board application built using Next.js, Prisma, MySQL (TiDB Cloud), and Tailwind CSS.

## Features

* Create notices
* View all notices
* Edit notices
* Delete notices
* Category filtering
* Search notices
* Priority levels (Urgent / Normal)
* Responsive UI

## Tech Stack

* Next.js (Pages Router)
* Prisma ORM
* TiDB Cloud (MySQL)
* Tailwind CSS
* React

## How to Run Locally

### 1. Clone repository

```bash
git clone <repository-url>
cd notice-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env`

```env
DATABASE_URL="your_database_url"
```

### 4. Run database migration

```bash
npx prisma migrate dev
```

### 5. Start development server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:3000
```

## API Endpoints

### Get all notices

```text
GET /api/notices
```

### Create notice

```text
POST /api/notices
```

### Update notice

```text
PUT /api/notices/:id
```

### Delete notice

```text
DELETE /api/notices/:id
```

## One Thing I Would Improve With More Time

With more time, I would improve the UI further by adding a more polished design system, better animations, pagination, improved accessibility, and richer dashboard interactions.

## AI Usage

AI tools were used to:

* Debug Prisma and database integration issues
* Improve component structure and frontend layout
* Generate boilerplate code faster
* Assist with troubleshooting Next.js and deployment issues

All generated code was reviewed, modified, tested, and integrated manually.

## Deployment

Frontend and backend are deployed using Vercel with TiDB Cloud as the database.
