<template>
  <nav class="navbar">
    <div class="navbar-user">
      <span class="username">Nome de Usuário</span>
      <button class="logout-button">Logout</button>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: #343a40;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
}

.navbar-user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.username {
  margin-right: 10px;
  font-weight: bold;
  color: #fff;
}

.logout-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>