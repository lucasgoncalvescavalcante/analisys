<template>
  <nav class="navbar">
    <div class="navbar-user">
      <span class="username">{{ usernamedisplay }}</span>
      <button class="logout-button" @click="handleLogout">Logout</button>
    </div>
  </nav>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      usernamedisplay: '',
    };
  },
  mounted() {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Decodificar o token JWT para obter os dados do usuário
      const decodedToken = jwt_decode(token);
      this.usernamedisplay = decodedToken.username; // Definir o nome do usuário na variável usernamedisplay
    }
  },
  methods: {
    handleLogout() {
      // Implemente aqui a lógica para fazer logout (remover o token do localStorage, etc.)
      localStorage.removeItem('jwt');
      // Em seguida, redirecione o usuário para a página de login, por exemplo: this.$router.push('/login');
    },
  },
};
</script>

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