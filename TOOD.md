Proposed Components

[x] <AuthIndex />
[x] <AuthGuard />
[x] <HydrateAccount />
[ ] <AdminGuard />
[ ] <Dashboard />
[ ] <UsersList />
[ ] <Login />
[ ] <Register />

In Progress
[ ] <AdminGuard />
[ ] <UsersList />


:bulb: <AdminGuard /> Component
- Checks if account.accountType == 'admin' ? go to (A) : go to (B)
  a. render router outlet.
  b. render Access Denied.
