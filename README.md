# Assignment 6 - User Management Dashboard

## Project Requirement:

### Fetch and Display Users:

- On component mount, fetch a list of users from the provided API.
- Display users in a table or card layout showing Name, Email, and Username.

### Add User:

- Create a form with inputs for Name, Email, and Username.
- On form submit, send a POST request to add the user.
- Update the UI to include the new user.

### Update User:

- Add an edit button for each user.
- When clicked, populate the form with the user’s data.
- Allow editing and submitting changes via a PUT/PATCH request.
- Reflect changes in the UI after a successful update.

### Delete User:

- Add a delete button for each user.
- Confirm deletion before sending a DELETE request.
- Remove the user from the UI on success.

### Error Handling:

- Show appropriate error messages when API requests fail.
- Validate form inputs (non-empty and valid email format).

### Loading State:

- Display a loading indicator while fetching data.

### API to use:

Use the JSON Placeholder fake API:

- GET users: https://jsonplaceholder.typicode.com/users
- POST user: https://jsonplaceholder.typicode.com/users
- PUT/PATCH user: https://jsonplaceholder.typicode.com/users/:id
- DELETE user: https://jsonplaceholder.typicode.com/users/:id
