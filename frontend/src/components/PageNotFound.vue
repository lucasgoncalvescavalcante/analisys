<!-- Arquivo: PageNotFound.vue -->
<template>
    <div class="page-not-found">
      <div class="container">
        <h1 class="title">Oops! Página não encontrada</h1>
        <p class="message">A página que você está tentando acessar não foi encontrada.</p>
        <router-link to="/" class="home-link">Voltar para a página inicial</router-link>
      </div>
    </div>
  </template>
  
  <style>
  /* Estilos CSS para a página não encontrada */
  .page-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
  }
  
  .container {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .title {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .message {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
  }
  
  .home-link {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }
  
  .home-link:hover {
    background-color: #0056b3;
  }
  </style>
  