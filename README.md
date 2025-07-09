# vibe-dash
Vibe-coded dashboard with graphs for personal cases

# Tech stack
### `Backend`
```
Node.js (LTS) + Express.js
```

*Simple and efficient API server, with direct access to Postgres via REST. Leaves room for future GraphQL if needed.*

---

### `Frontend`

```
React 18+ (SPA, TypeScript, Vite)
```

*Modern, fast, and widely supported. SPA is ideal for internal tools with dynamic data and no SEO needs.*

---

### `Graphs Library`

```
React ApexCharts
```

*Rich set of graph types (line, bar, pie, heatmap), highly customizable via JSON config—perfect for low-code editability.*

---

### `Database`

```
PostgreSQL
```

*Reliable SQL database, ideal for time-series and aggregate queries. No sharding needed for a personal project.*

---

### `Package Manager`

```
pnpm (with workspaces)
```

*Faster, disk-efficient package manager with native monorepo support. Great for projects with separate frontend/backend.*

---

### `Deployment`

```
Docker + Docker Compose
```

*Spin up the full stack with one command. Clean separation of services, easy to deploy, manage, and document.*

---

### `Configuration`

```
.env + ENABLE_EDIT env toggle
```

*Keeps secrets/configs out of code. `ENABLE_EDIT` controls edit mode without adding auth complexity.*

---

### `Documentation`

```
README.md (with setup, architecture, and usage)
```

*Makes project clear and maintainable, even for non-devs or external contributors (e.g., on GitHub).*

---
