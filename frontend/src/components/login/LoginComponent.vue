<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template >
 <div class="telalogin" >
  <div class="row">
    <form
      class="text-center"
      style="margin-top: 90px; height: auto; padding-top: 40px !important"
      v-on:submit.prevent="loginSubmitUserForm()"
      >
    <!---------------Inicio do bloco e-mail----------->
    <img src="http://santacasacg.org.br/images/logo-santa-casa.png" alt="Imagem de login" style="width: 300px;">
    <br><br><br>
    <label for="username" />
      <input
      size="37"
        type="text"
        id="username"
        name="username"
        placeholder="Digite seu usuário"
        v-model="loginForm.username"
      />
      <br><br>
    <!---------------Fim do bloco Email--------------->
    <!-------------Inicio do bloco: SENHA------------->
      <label for="senha" />
          <input
            :type="mostrarSenha ? 'text' : 'password'"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            v-model="loginForm.password"
          />
          <button type="button" @click="alternarExibicaoSenha">
            {{ mostrarSenha ? 'Esconder' : 'Mostrar' }} senha
          </button>
    <!-------------Fim do bloco: SENHA------------->
      <p class="center">
        Não tem uma conta cadastrada?<router-link to="/register"> Cadastre Aqui</router-link>
      </p>
    <!-------------Inicio do bloco: BOTÃO------------->
    <center>
      <button
      @click="submitLoginUser"
      class="btn btn-primary btn-block w-33 my-2">entrar</button>
    </center>
    <!-------------Fim do bloco: BOTÃO------------->
    </form>
  </div>
 </div>
</template>
<script src="./Login.js"></script>
<style>
.telalogin {
  background-image: url('https://downloader.la/temp/[Downloader.la]-6462eaf6119ab.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

</style>
