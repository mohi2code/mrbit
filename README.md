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


Components Detials
<UsersList /> Component 
- fetches all the data.
- serilazies the fetched data
  - <UsersTable />
    - Presents the data in a table.
  - <ActivateButton />
    - presents a button.
    - handles document update logic.

<Login />
- Gets credentials from user.
- Handles login logic.
  - <Form />
    - Handles state for fields.
      - [<Fields>]
      - <SubmitButton >

<Register />
- Create user with email and password (new).
- new exists ? goto a : goto b
  a. create new document('account').
  b. show error.
- <Form />
  - Get creds, and account details from user.
