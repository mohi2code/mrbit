Proposed Components

[x] <AuthIndex />
[x] <AuthGuard />
[x] <HydrateAccount />
[x] <AdminGuard />
[ ] <Dashboard />
[x] <UsersList />
  [x] <UsersTable />
  [x] <ActivateButton />
[x] <Login />
[ ] <Register />


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

