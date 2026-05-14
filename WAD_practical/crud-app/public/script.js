const API = "http://localhost:3000/api/users";

let editId = null;

// Load Users
async function loadUsers() {
  const res = await fetch(API + "/all");
  const users = await res.json();

  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="edit" onclick="editUser('${user._id}','${user.name}','${user.email}','${user.age}')">Edit</button>
          <button class="delete" onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add / Update User
async function addUser() {
  const user = {
    name: name.value,
    email: email.value,
    age: age.value
  };

  if (editId) {
    // UPDATE
    await fetch(API + "/update/" + editId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    editId = null;
  } else {
    // CREATE
    await fetch(API + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  }

  // Clear inputs
  name.value = "";
  email.value = "";
  age.value = "";

  loadUsers();
}

// Delete
async function deleteUser(id) {
  await fetch(API + "/delete/" + id, { method: "DELETE" });
  loadUsers();
}

// Edit
function editUser(id, nameVal, emailVal, ageVal) {
  name.value = nameVal;
  email.value = emailVal;
  age.value = ageVal;

  editId = id;
}

// Initial load
loadUsers();