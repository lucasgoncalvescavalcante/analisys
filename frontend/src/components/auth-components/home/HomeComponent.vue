<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <navbar></navbar>
        </div>
        <div class="col-md-7">
        <table id="myTable" class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
</template>
<script src="./Home.js"></script>
<style>
@import 'datatables.net-dt';</style>
