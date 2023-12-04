<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="..\..\..\public\logo-santa-casa.png" class="brand_logo" alt="Logo">
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input required=""
  type="password"
  id="password"
  name="password"
  v-model="loginForm.username"
  class="form-control input_user">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input
  required=""
  type="password"
  id="password"
  name="password"
  v-model="loginForm.password"
  class="form-control input_pass"
/>
						</div>
						<div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline">
								<label class="custom-control-label" for="customControlInline">Lembre-me</label>
							</div>
						</div>
							<div class="d-flex justify-content-center mt-3 login_container">
					<button type="button" name="button" class="btn login_btn" @click="submitLoginUser()">Login</button>
				</div>
					</form>
				</div>
			</div>
		</div>

  <!--<div class="telalogin">
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
  </div>-->
</template>
<script src="./Login.js"></script>
<style>
  body,
		html {
			margin: 0;
			padding: 0;
			height: 100%;
			background: #60a3bc !important;
		}
		.user_card {
			height: 400px;
			width: 350px;
			margin-top: 14%;
			margin-bottom: auto;
			background: #F0F3F7;
			position: relative;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 10px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-radius: 5px;

		}
		.brand_logo_container {
			position: absolute;
			height: 170px;
			width: 170px;
			top: -75px;
			border-radius: 50%;
			background: #60a3bc;
			padding: 10px;
			text-align: center;
		}
		.brand_logo {
			height: 150px;
			width: 150px;
			border-radius: 50%;
			border: 4px solid #0a80ad;
		}
		.form_container {
			margin-top: 100px;
		}
		.login_btn {
			width: 100%;
			background: #0a80ad !important;
			color: white !important;
		}
		.login_btn:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.login_container {
			padding: 0 2rem;
		}
		.input-group-text {
			background: #0a80ad !important;
			color: white !important;
			border: 0 !important;
			border-radius: 0.25rem 0 0 0.25rem !important;
		}
		.input_user,
		.input_pass:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
			background-color: #c0392b !important;
		}

</style>



