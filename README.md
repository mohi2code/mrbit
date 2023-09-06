# Authentication feature

Proposed Components
1. <AuthIndex />
2. <AuthGuard />
3. <AdminGuard />
4. <Dashboard />
5. <UsersList />
6. <Login />
7. <Register />


### <AuthIndex />
- state.auth.credentials ? go to (a) : go to (b)
  a. cookie.user ? go to (c) : go to (d)
  b. Redirect to Dashboard.
  c. Load data into state.auth.credentials.
  d. Redirect to Login screen.

### <AuthGuard />
- state.auth.credentials ? go to (a) : go to (b)
  a. Render router outlet.
  b. Redirect to '/auth/.
