/* eslint-disable linebreak-style */
import swal from 'sweetalert';
import Api from './Api';

export default {
  async registerNewUser(newUser) {
    try {
      console.log('1');
      console.log(newUser);
      const response = await Api().post('/register', newUser);
      console.log('3');
      const { token } = response.data;
      console.log('2');
      if (token) {
        localStorage.setItem('jwt', token);
        swal({
          title: 'excelente',
          text: 'usuário registrado com sucesso',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: 'Ops',
        text: 'Erro ao criar um novo usuário',
        icon: 'error',
      });
    }
  },
};
