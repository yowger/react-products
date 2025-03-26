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

### 📚 **Posts Table**

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
if (normalizedRoles.includes("admin")) {
    can("manage", "all")
    cannot("delete", "Post")
    cannot("delete", "Comment")
} else if (normalizedRoles.includes("User")) {
    can("read", "Post")
    can("create", "Post")
    can("update", "Post", { author_id: user?.sub })
    can("delete", "Post", { author_id: user?.sub })

    can("read", "Comment")
    can("create", "Comment")
    can("delete", "Comment", { author_id: user?.sub })
} else {
    can("read", "Post")
    can("read", "Comment")
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

### ⚡️ **Post-Login Action Flow**

Set up the flow as follows:

1. **Start**
2. **Assign Default Role**
3. **Assign Roles to Token**
4. **Complete Token Issued**

---

## ⚠️ **Limitations and Considerations**

This project demonstrates RBAC with Auth0 and CASL, but due to the simplicity of the setup (Supabase API + Auth0 without a backend), there are some limitations:

1. **No Secure Token Refreshing:**

    - The app uses `localStorage` to persist the Auth0 session, which is less secure than storing tokens in HTTP-only, secure cookies.
    - In real-world app, refresh tokens should be stored and managed securely via a backend.

2. **No Backend API for User Data:**

    - Since Supabase is used as the API, it does not have direct integration with Auth0 to fetch user profiles.
    - To display user names in posts and comments, the username and avatar are stored in the `posts` and `comments` tables. Consider creating another table for user and using auth0 webhooks to sync data.

3. **No Real-Time Sync Between Auth0 and Supabase:**
    - For real-time sync between Auth0 and Supabase, a webhook or backend listener would be required to update Supabase when Auth0 profile/role changes.

---

**Workaround Suggestion:**

- For a production-grade app, introduce a backend that:
    - Stores and refreshes Auth0 tokens securely.
    - Listens to Auth0 events via webhooks to sync user updates with Supabase.
    - Provides an API endpoint to fetch user information securely.
