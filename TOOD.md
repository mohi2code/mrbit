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
[x] <Register />

In progress
[ ] Dashboard.

Side Quests:
- UsersList presentation.
- Dashboard presentation.


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


