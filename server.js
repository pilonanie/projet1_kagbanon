<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>User Management</title>
</head>
<body>
  <h1>User Management System</h1>
  <form id="userForm">
    <input type="text" id="username" placeholder="Username" required />
    <input type="email" id="email" placeholder="Email" required />
    <input type="password" id="password" placeholder="Password" required />
    <select id="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <button type="submit">Submit</button>
  </form>
  <script src="script.js"></script>
</body>
</html>
