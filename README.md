# 📝 CRUD API with Supabase + Auth0 + CASL + PostgreSQL

This project demonstrates a fully functional **CRUD API** built with **Supabase** and secured with **Auth0**.  
It includes `posts` and `comments` tables, Row-Level Security (RLS), and CASL-based access control.

---

## 📚 **Project Overview**

- **Tech Stack:**

    - Frontend: React, TanStack Router/Query, Auth0, CASL
    - Database: PostgreSQL (Supabase)
    - API: Supabase REST API

- **Purpose:**
    - Create, update, delete, and list `posts` and `comments`.
    - Enforce Row-Level Security (RLS) for authenticated users.
    - Allow public users to read posts and comments.
    - Protect sensitive routes and actions using CASL.

⚠️ **Note:**  
The **schema and API boundaries** might change in the future.

## 🗂️ **Database Schema**

### 👤 Users Table

### 📚 **Posts Table**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth0_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 💬 **Comments Table**

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🔐 **Security Policies (RLS)**

### 📌 **RLS on `users` Table**

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own profiles
CREATE POLICY "Users can insert on users"
ON users
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can read users"
ON users
FOR SELECT
USING (true);
```

### 📌 **RLS on `posts` Table**

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow authors to manage their posts
CREATE POLICY "Allow authors to manage their posts"
ON posts
FOR ALL
USING (auth.uid() = author_id);

-- Allow public to read posts
CREATE POLICY "Allow public to read posts"
ON posts
FOR SELECT
USING (true);
```

### 📌 **RLS on `comments` Table**

```sql
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow authors to manage their comments
CREATE POLICY "Allow authors to manage their comments"
ON comments
FOR ALL
USING (auth.uid() = author_id);

-- Allow public to read comments
CREATE POLICY "Allow public to read comments"
ON comments
FOR SELECT
USING (true);
```

---

## 🔗 **Auth0 Audience Configuration**

⚡️ **Important:**  
Ensure that your **Auth0 `audience_url`** is correctly connected to your Supabase API.

✅ **Auth0 API Configuration:**

- **API Audience:** `https://rdnexruaxbfuepekecsj.supabase.co`
- **Token Issuer:** `https://your-auth0-domain/`
- **Enable RS256 Signing Algorithm.**

---

## 📡 **API Endpoints**

### 📚 **Posts API**

| Method   | Endpoint     | Auth Required | Description       |
| -------- | ------------ | ------------- | ----------------- |
| `GET`    | `/posts`     | ❌ Public     | Get all posts     |
| `POST`   | `/posts`     | ✅ JWT Token  | Create a new post |
| `PATCH`  | `/posts/:id` | ✅ JWT Token  | Update a post     |
| `DELETE` | `/posts/:id` | ✅ JWT Token  | Delete a post     |

---

### 💬 **Comments API**

| Method   | Endpoint                 | Auth Required | Description             |
| -------- | ------------------------ | ------------- | ----------------------- |
| `GET`    | `/comments?post_id=<id>` | ❌ Public     | Get comments for a post |
| `POST`   | `/comments`              | ✅ JWT Token  | Add a comment           |
| `DELETE` | `/comments/:id`          | ✅ JWT Token  | Delete a comment        |

---

## 🎯 **CASL Implementation**

⚠️ **Note:** might change in the future.

✅ **Rule setup**

```jsx
// abilities.ts
if (!user) {
    can("read", ["Post", "Comment"])

    return build()
}

const normalizedRoles = roles.map((role) => role.toLowerCase())
const isAdmin = normalizedRoles.includes("admin")
const isUser = normalizedRoles.includes("user")

if (isAdmin) {
    can("manage", "all")
    cannot("delete", "Post", {
        "authorId.auth0Id": { $ne: user.sub },
    })
    cannot("delete", "Comment", {
        "authorId.auth0Id": { $ne: user.sub },
    })
}

if (isUser) {
    can(["read", "create"], "Post")
    can(["update", "delete"], "Post", { "authorId.auth0Id": user.sub })

    can(["read", "create"], "Comment")
    can("delete", "Comment", { "authorId.auth0Id": user.sub })
}
```

## 🛡️ Auth0 Role Management and Role Assignment

Be sure Auth0 is configured to assign roles to get access to authorized routes and features such as edit/update post and or comments.

**Assign Default Role**

```javascript
exports.onExecutePostLogin = async (event, api) => {
    if (!event.authorization?.roles || event.authorization.roles.length === 0) {
        const { ManagementClient } = require("auth0")

        const management = new ManagementClient({
            domain: event.secrets.domain,
            clientId: event.secrets.clientId,
            clientSecret: event.secrets.clientSecret,
        })

        const params = { id: event.user.user_id }
        const data = { roles: [event.secrets.defaultRoleId] }

        try {
            await management.users.assignRoles(params, data)
        } catch (e) {
            console.error("Error assigning role:", e)
        }
    }
}
```

**Assign Roles to token**

```javascript
const namespace = "https://your-namespace.com/"

if (event.authorization) {
    api.idToken.setCustomClaim(`${namespace}roles`, event.authorization.roles)
    api.accessToken.setCustomClaim(
        `${namespace}roles`,
        event.authorization.roles
    )
}
```

**Sync user to Supabase**

```javascript
exports.onExecutePostLogin = async (event, api) => {
    const axios = require("axios")

    const SUPABASE_URL = event.secrets.SUPABASE_URL
    const SUPABASE_API_KEY = event.secrets.SUPABASE_API_KEY

    const user = {
        auth0_id: event.user.user_id,
        email: event.user.email,
        name: event.user.name,
        username: event.user.username,
        avatar_url: event.user.picture,
    }

    try {
        // check if user already exists
        const { data } = await axios.get(
            `${SUPABASE_URL}/users?auth0_id=eq.${user.auth0_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: SUPABASE_API_KEY,
                },
            }
        )

        if (data.length === 0) {
            await axios.post(`${SUPABASE_URL}/users`, user, {
                headers: {
                    apiKey: SUPABASE_API_KEY,
                    "Content-Type": "application/json",
                },
            })
        }
    } catch (error) {
        console.log("Error registering user to supabase: ", error)
    }
}
```

### ⚡️ **Post-Login Action Flow**

Set up the flow as follows:

1. **Start**
2. **Sync user to Supabase**
3. **Assign Default Role**
4. **Assign Roles to Token**
5. **Complete Token Issued**

---

## ⚠️ **Limitations and Considerations**

This project demonstrates RBAC with Auth0 and CASL, but due to the simplicity of the setup (Supabase API + Auth0 without a backend), there are some limitations:

1. **No Secure Token Refreshing:**

    - The app uses `localStorage` to persist the Auth0 session, which is less secure than storing tokens in HTTP-only, secure cookies.
    - In real-world app, refresh tokens should be stored and managed securely via a backend.

- ***

    **Workaround Suggestion:**

- For a production-grade app, introduce a backend that:
    - Stores and refreshes Auth0 tokens securely.
    - Listens to Auth0 events via webhooks to sync user updates with Supabase.
