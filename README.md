# 🏡 Home Manager

A simple and modern tool to manage your household expenses and incomes.

## 🚀 Getting Started

### 1. Start a PostgreSQL instance

You can use Docker, a local installation, or any hosted service.

> Example with Docker:

```bash
docker run --name home-manager-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

### 2. Configure the environment

Create a .env file based on the .env.example file provided:

```bash
cp .env.example .env
```

Then fill in the required environment variables.

### 3. Sync the database

Push the drizzle schema to your database:

```bash
npm run db:push
Or using another package manager:

yarn db:push

pnpm db:push

bun db:push
```

### 4. Start the development server

```bash
npm run dev
Or:

yarn dev

pnpm dev

bun dev
```

### 🛠 Tech Stack

Next.js

TypeScript

Tailwind CSS

Prisma + PostgreSQL

Shadcn UI + Radix

### 📂 Project Structure

/app: Application routes

app/modules: Domain-specific features (e.g. categories, expenses)
../components: UI components and form helpers
../schemas: Zod schemas and validation logic
../queries: queries
../mutation: mutations
../server: server actions

### 💡 Features

[x] Track expenses
[ ] Track incomes
[x] Categorize transactions
[x] Clean and responsive UI

### 📦 Requirements

Node.js 20+

PostgreSQL instance

Package manager (npm, yarn, pnpm, or bun)

### 📣 License

MIT – feel free to use, modify, and share!
