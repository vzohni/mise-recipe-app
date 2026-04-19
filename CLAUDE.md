# Mise Recipe App — Claude Context

## Project Overview
A recipe management web app called **Mise**. Users can browse, create, and favorite recipes. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, and Supabase for auth and database.

Live: https://mise-recipe-app-w9y9.vercel.app/

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Backend/Auth/DB:** Supabase (supabase-js v2)
- **Fonts:** Fraunces (serif), Roboto Flex (sans-serif) via next/font/google
- **Deployment:** Vercel

## Project Structure
```
src/
  app/
    page.tsx              # Home — recipe browse/search/filter (client component)
    layout.tsx            # Root layout with font setup and metadata
    login/page.tsx        # Login + signup toggle form
    recipes/[slug]/       # Recipe detail (server component)
    add-recipe/page.tsx   # Protected form to create recipes
    account/page.tsx      # Protected user profile, created & favorited recipes
    reset-password/page.tsx # Handles Supabase PASSWORD_RECOVERY event, lets user set new password
  components/
    Header.tsx            # Nav with auth state, mobile hamburger
    Footer.tsx
    RecipeCard.tsx        # Card with favorite + optional delete button
    FavoriteButton.tsx    # Standalone heart button (used on detail page)
    ProtectedRoute.tsx    # Auth guard wrapper
    DynamicInputList.tsx  # Reusable add/remove input list (ingredients/instructions)
    SearchBar.tsx
    Button.tsx
    TagSelect.tsx
    LoginMessages.tsx
  lib/
    supabase.ts           # Supabase client (uses NEXT_PUBLIC_ env vars)
    auth.ts               # signIn, signUp, signOut, getCurrentUser, requestPasswordReset, updatePassword
    favorites.ts          # toggle, check, get favorites from `favorites` table
    utils.ts              # formatDate, generateSlug (appends random suffix)
    constants.ts          # RECIPE_TAGS array
```

## Database (Supabase)
Two main tables:
- **recipes** — `id, title, slug, description, image_url, prep_time, cook_time, servings, difficulty, ingredients, instructions, tags[], user_id, author, created_at`
- **favorites** — `id, user_id, recipe_id`

### RLS Policies (recipes table):
- **SELECT** — `USING (true)` — public, no auth required
- **INSERT** — `WITH CHECK (auth.uid() = user_id)` — authenticated users only
- **UPDATE** — `USING (auth.uid() = user_id)` — owner only
- **DELETE** — `USING (auth.uid() = user_id)` — owner only

### Column type notes (confirmed from real row):
- `ingredients` — stored as **TEXT** (stringified JSON array, e.g. `'["item1", "item2"]'`)
- `instructions` — stored as **TEXT** (stringified JSON array)
- `tags` — stored as a native **Postgres array** (use `ARRAY['Tag1', 'Tag2']` in SQL)
- `difficulty` — **capitalized string**: `'Easy'`, `'Medium'`, `'Hard'`

## Design System
CSS custom properties defined in `globals.css`:
- `--primary`: `#2e4442` (dark green)
- `--tan`: `#f2ebe3` (warm beige)
- `--background`: `#fafafa`
- `--foreground`: `#222222`
- `--hover`: `#2f5c58`
- `--heart-red`: `#ef4444`

Tailwind usage: `text-(--primary)`, `bg-(--tan)`, etc. (CSS variable shorthand syntax from Tailwind v4).

## Next.js 15 Notes
- **`params` is a Promise** in Next.js 15 — always `await params` before accessing properties in server components: `const { slug } = await params`
- Same applies to `searchParams` in server components

## Key Conventions
- All pages are client components using `useEffect` + Supabase for data fetching — server components were abandoned because the anon Supabase client has no session server-side, causing RLS to block reads
- Client components use `useEffect` + Supabase for data fetching (home, account)
- Auth is checked via `getCurrentUser()` (calls `supabase.auth.getUser()`)
- Slugs are generated with a random 6-char suffix to avoid collisions
- `ProtectedRoute` wraps pages that require login
- Build errors and ESLint are suppressed in `next.config.ts` (intentional for now)

## Known Issues / TODOs
- `console.log(user)` left in `Header.tsx:18` — remove before production
- `alert()` used in several places (add recipe success, delete confirm, login prompt) — should be replaced with toast notifications
- Many `any` types used for user and recipe data — could be typed more strictly
- ~~"Forgot Password" link on login page is a dead `href="#"`~~ — **Fixed**: Forgot Password flow implemented with Supabase `resetPasswordForEmail`. Redirects to `/reset-password` which listens for the `PASSWORD_RECOVERY` auth event.
- `console.log(user)` in `Header.tsx` — **Removed**
