# How to run locally
Clone the repo then: 
```
cd mrbit
npm install
npm run dev
```

# App Components

**Folder Structure** 

```
src
├── App.jsx
├── HomePage.jsx
├── app
│   ├── features
│   │   ├── auth
│   │   │   ├── authSlice.js
│   │   │   └── components
│   │   │       ├── AdminGuard.jsx
│   │   │       ├── AdminOrClientGurad.jsx
│   │   │       ├── AuthGurad.jsx
│   │   │       ├── AuthIndex.jsx
│   │   │       ├── HydrateAccount.jsx
│   │   │       ├── Login.jsx
│   │   │       ├── Logout.jsx
│   │   │       ├── Register.jsx
│   │   │       └── layout
│   │   │           └── FullPage.jsx
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── DashboardHome.jsx
│   │   │   │   ├── NewUserForm.jsx
│   │   │   │   └── UsersList.jsx
│   │   │   └── dashboardSlice.js
│   │   └── proposal
│   │       └── components
│   │           ├── InvitationsList.jsx
│   │           ├── NewDocumentProposal.jsx
│   │           ├── NewProposalDetails.jsx
│   │           ├── NewProposalTranslator.jsx
│   │           ├── NewSessionProposal.jsx
│   │           └── ProposalsList.jsx
│   ├── services
│   │   └── firebaseConfig.js
│   └── store.js
├── index.css
└── main.jsx
```

Below is an overview of the components used to implement the UI and functionality requirements for the application. Basically the application has two features now; Authentication feature & Proposals feature. Below is an overview of the components of each feature.

## Authentication & Authorization feature components.
Below is a high level overview of the components used to implement the Authentication & Authorization functionality requirements for the application. The table goes over each component, the logic it performs, and state it holds.

| High level components list |  |
|--|--|
| `<Login />` |  |
| `<Register />` |  |
| `<AuthIndex />` |  |
| `<HydrateAccount />` |  |
| `<AuthGuard />` |  |
| `<AdminOnlyGuard />` |  |
| `<AdminOrClientGuard />` |  |

---

#### Login Component

`<Login />`
 - Handles login logic.
 - `<LoginForm />`
	 - Collects credentials data.
	 - `<EmailField />`
	 - `<PasswordField />` 
	 - `<SubmitButton />` 
---

#### Register Component
`<Register />`
- Handles register logic.
- `<ReigsterForm />` 
	- Collects new user's information data
	- `<EmailField />`
	- `<PasswordField />`
	- `<PasswordConfirmField />`
	- `<AccountTypeField />`
	- `<SubmitButton />`
---

#### AuthIndex Component
`<AuthIndex />`
1. Checks if the user credentials are stored in memory ? goto (1) : goto (2)
2. Redirect user to dashboard.
3. Check if users's token is still active ? goto (4)
4. Set user's credentials in memory.
---

#### HydrateAccount Component 
`<HydrateAccount />`
- Store user's account details in memory.
---

#### Guards Components
Guards are used to protect routes. Giving specific roles a privilege to access a route

`<AuthGuard />`
1. check if credentials are present in memory ? goto (2) : goto (3)
2. Render `<Outlet />`
3. Redirect to `/auth` route

`<AdminOnlyGuard />`
Self explanatory

`<AdminOrClientGuard />`
Self explanatory


## Proposals feature components
TODO....
