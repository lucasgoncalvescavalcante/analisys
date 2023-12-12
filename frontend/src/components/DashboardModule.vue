<template>
  <div>
    <h4>Bem vindo ao Gerenciamento Hospitalar, {{ usernamedisplay }}!</h4>
    <h2>Pacientes ativos por Plano:</h2>
    <div style="width: 300px;">
    <canvas id="myChart"></canvas>
    </div>
    <!--<div>iphone cartaocelulariphone cartao
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" />
    </div>
    <table id="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>-->
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      username: '',
      name: '',
      usernamedisplay: '',
      dataTable: null,
    };
  },
  mounted() {
    this.initDataTable();
    const token = localStorage.getItem('jwt');
    console.log('Token:', token);
    if (token) {
      // Decodificar o token JWT para obter os dados do usuário
      const decodedToken = jwt_decode(token);
      this.usernamedisplay = decodedToken.username; // Definir o nome do usuário na variável userName
    }
    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['SUS', 'Cassems', 'Unimed'],
      datasets: [{
        backgroundColor: ['#2754A6', '#748493', '#00874D'],
        label: '# of Votes',
        data: [80, 10, 20],
        borderWidth: 2,
        weight: 1
      }]
    },
    options: {
      scales: {
        y: {
          responsive: true,
        }
      }
    }
  });
  },
  methods: {
    initDataTable() {
      this.dataTable = $(this.$el).find('#user-table').DataTable({
        serverSide: true, // Habilita o processamento no lado do servidor
        ajax: (dataTablesData, callback) => {
          const params = {
            username: this.username,
            name: this.name,
            ...dataTablesData,
          };

          axios.get('http://localhost:3000/api/users', { params })
            .then(response => {
              callback({
                draw: dataTablesData.draw,
                data: response.data,
                recordsTotal: response.data.length,
                recordsFiltered: response.data.length,
              });
            })
            .catch(error => {
              console.error('Erro ao buscar usuários:', error);
            });
        },
        columns: [
          { data: 'username' },
          { data: 'name' },
        ],
        paging: true, // Habilita a paginação
        pageLength: 10, // Número de usuários exibidos por página
      });
    },
  },
};
</script>
