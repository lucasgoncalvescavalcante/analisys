<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template >
  <div class="telaregister">
   <div class="row">
    <navbar></navbar>
     <form
      class="text-center"
      style="margin-top: 160px; height: auto; padding-top: 40px !important"
      v-on:submit.prevent="RegisterSubmitUserForm()"
      >
    <img src="http://santacasacg.org.br/images/logo-santa-casa.png" alt="Imagem de login" style="width: 260px;"><br><br>
     <!---------------Inicio do bloco NOME----------->
     <label for="nome" />
       <input
         size="37"
         type="text"
         id="nome"
         name="nome"
         placeholder="Digite seu nome"
         v-model="RegisterForm.name"
       /><br>
     <!---------------Fim do bloco NOME--------------->
     <!---------------Inicio do bloco e-mail----------->
     <br>
     <label for="username" />
       <input
       size="37"
         type="text"
         id="username"
         name="username"
         placeholder="Digite seu nome de usuário"
         v-model="RegisterForm.username"
         @input="handleInput"
       /><br><br>
     <!---------------Fim do bloco Email--------------->

     <!-------------Inicio do bloco: FUNÇÃO------------->
     <label for="funcao" />
      <select id="funcao" v-model="RegisterForm.functionId" style="width: 200px;">
        <option value="1">1. Auxiliar</option>
        <option value="2">2. Administrativo</option>
        <option value="3">3. Gerência</option>
      </select><br>
     <!-------------Fim do bloco: FUNÇÃO------------->
     <br>
     <!-------------Inicio do bloco: SENHA------------->
       <label for="senha" />
           <input
             :type="mostrarSenha ? 'text' : 'password'"
             id="senha"
             name="senha"
             placeholder="Digite sua senha"
             v-model="RegisterForm.password"
           />
           <button type="button" @click="alternarExibicaoSenha">
             {{ mostrarSenha ? 'Esconder' : 'Mostrar' }} senha
           </button>
     <!-------------Fim do bloco: SENHA------------->
     <!-------------Inicio do bloco: BOTÃO------------->
     <center>
       <button
       @click="submitRegisterUser"
       class="btn btn-primary btn-block w-33 my-2">Registrar</button>
     </center>
     <!-------------Fim do bloco: BOTÃO------------->
     </form>
   </div>
  </div>
 </template>
<script src="./Register.js"></script>
<style>
</style>
