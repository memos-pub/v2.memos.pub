WIP v2 of [memos.pub](https://memos.pub).
Will replace https://github.com/thien-do/memos.pub.

### To start local dev

```
npm install
npm run dev
```

### To work on home page

Navigate to `http://localhost:3000`

### To work on blogs via sub-domain

Navigate to `http://<username>.localhost:3000/<repo>`

- `<repo>` is optional (will use `username` if omitted)
- E.g. http://thien-do.localhost:3000

### To work on blogs via custom domain

1. Add a custom domain to `/etc/hosts`: (You don't need to own it)

```sh
# /etc/hosts
127.0.0.1 thien.do
```

2. Map the domain in `./DOMAIN.ts`:

```ts
// DOMAINS.ts
[
  ["thien.do", "thien-do/thien-do"],
  // ...
];
```
