<template>
  <div class="col-md-3">
  <nav class="animated bounceInDown bg-dark">
    <ul>
      <li><a href="#profile">Perfil</a></li>
      <li><a href="#message">Lista</a></li>
      <li class="sub-menu" @click="toggleSubMenu(1)">
        <a href="#settings">
          Admin
          <div class="fa fa-caret-down right"></div>
        </a>
        <ul v-if="submenus[0].showSubMenu">
          <li><a href="#settings">Admin</a></li>
          <li><a href="#settings">Criar usuário</a></li>
          <li><a href="#settings">Segurança &amp; Privacy</a></li>
          <li><a href="#settings">Mudar senha</a></li>
          <li><a href="#settings">slavei</a></li>
        </ul>
      </li>
      <li class="sub-menu" @click="toggleSubMenu(2)">
        <a href="#message">
          Contabilidade
          <div class="fa fa-caret-down right"></div>
        </a>
        <ul v-if="submenus[1].showSubMenu">
          <li><a href="#settings">Alterar conta contabil</a></li>
          <li><a href="#settings">Enviar ticket</a></li>
          <li><a href="#settings">Enviar</a></li>
        </ul>
      </li>
      <li><a href="#message">Logout</a></li>
    </ul>
  </nav>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  data() {
    return {
      submenus: [
        {
          id: 1,
          label: 'Settings',
          showSubMenu: false
        },
        {
          id: 2,
          label: 'Help',
          showSubMenu: false
        }
      ]
    };
  },
  methods: {
    toggleSubMenu(submenuId) {
      this.submenus.forEach(submenu => {
        if (submenu.id === submenuId) {
          submenu.showSubMenu = !submenu.showSubMenu;
        } else {
          submenu.showSubMenu = false;
        }
      });
    }
  }
};
</script>
<style>
body {
  background-color: #fff;
  font-size: 14px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 5cm;
  height: 100vh;
  background: #343a40;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 20px;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
nav ul li {
  position: relative;
  width: 100%;
}
nav ul li a {
  display: block;
  padding: 15px;
  color: #fff;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  -moz-transition: 0.2s linear;
  -ms-transition: 0.2s linear;
  -o-transition: 0.2s linear;
  transition: 0.2s linear;
  width: 100%;
  box-sizing: border-box;
}
nav ul li a:hover {
  background: #1d4f71;
  color: #fff;
}
nav ul li ul {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
}
nav ul li:hover ul {
  display: block;
}
nav ul li ul li {
  position: relative;
  width: 100%;
}
nav ul li ul li a {
  display: block;
  padding: 15px 20px;
  border-left: 4px solid transparent;
}
nav ul li ul li a:hover {
  border-left: 4px solid #3498db;
}
</style>
