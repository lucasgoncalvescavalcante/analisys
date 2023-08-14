<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>

  <div class="telalogin">
    <div class="row">
      <form class="text-center form-container" v-on:submit.prevent="loginSubmitUserForm()">
        <img src="http://santacasacg.org.br/images/logo-santa-casa.png" alt="Imagem de login" style="width: 300px;">
        <div class="group">
        <input required=""
        type="text"
        class="input"
        v-model="loginForm.username">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Usuário</label>
</div>
        <div class="group">
          <input
          required=""
            type="text"
            id="username"
            name="username"
            v-model="loginForm.username"
            class="input"
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Name</label>
        </div>
        
        <button type="button" @click="alternarExibicaoSenha">
          {{ mostrarSenha ? 'Esconder' : 'Mostrar' }} senha
        </button>
        <button @click="submitLoginUser" class="btn btn-primary btn-block w-33 my-2">entrar</button>

      </form>
    </div>
  </div>
</template>
<script src="./Login.js"></script>
<style>
  .img
  {
    border-bottom: 30;
  }
  .telalogin {
    background-image: url('https://img.freepik.com/free-vector/blue-hexagonal-medical-healthcare-background-design_1017-26836.jpg?w=1380&t=st=1691908404~exp=1691909004~hmac=4413927ecfcad860305cd15b08814f10d5d49513ed6ffd224ec720890f7d8416');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    margin-top: 90px;
    padding-top: 40px !important;
    background-color: rgba(255, 255, 255, 0.61);
    border-radius: 15px;
    width: 400px;
  }


  /* Estilos para o botão de alternar a visibilidade da senha */
  .form-container button {
    background-color: rgb(196, 196, 196);
    border: none;
    color: rgb(0, 0, 0);
    cursor: pointer;
  }

  /* Estilos para o link de cadastro */
  .center {
    text-align: center;
  }

  /* Estilos para o botão de login */
  .form-container center button {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #1171d8;
    color: rgb(207, 8, 8);
    border-radius: 5px;
    cursor: pointer;

  }
  
  .group {
 position: relative;
 margin-bottom: 30px;
}

.input {
  background: transparent !important;
 font-size: 16px;
 padding: 10px 10px 10px 5px;
 display: block;
 width: 200px;
 border: none;
 border-bottom: 1px solid #515151;
}

.input:focus {
 outline: none;
}

label {
 color: #999;
 font-size: 18px;
 font-weight: normal;
 position: absolute;
 pointer-events: none;
 left: 5px;
 top: 10px;
 transition: 0.2s ease all;
 -moz-transition: 0.2s ease all;
 -webkit-transition: 0.2s ease all;
}

.input:focus ~ label, .input:valid ~ label {
 top: -20px;
 font-size: 14px;
 color: #5264AE;
}

.bar {
 position: relative;
 display: block;
 width: 200px;
}

.bar:before, .bar:after {
 content: '';
 height: 2px;
 width: 0;
 bottom: 1px;
 position: absolute;
 background: #5264AE;
 transition: 0.2s ease all;
 -moz-transition: 0.2s ease all;
 -webkit-transition: 0.2s ease all;
}

.bar:before {
 left: 50%;
}

.bar:after {
 right: 50%;
}

.input:focus ~ .bar:before, .input:focus ~ .bar:after {
 width: 50%;
}

.highlight {
 position: absolute;
 height: 60%;
 width: 100px;
 top: 25%;
 left: 0;
 pointer-events: none;
 opacity: 0.5;
}

.input:focus ~ .highlight {
 animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
 from {
  background: #5264AE;
 }

 to {
  width: 0;
  background: transparent;
 }
}

</style>



