import swal from 'sweetalert';
import Api from './Api';

export default {
  async loginUser(user) {
    try {
      const response = await Api().post('/login', user);
      const { token } = response.data;
      localStorage.setItem('jwt', token);
      console.log('token');
      console.log(token);
      if (token) {
        swal({
          title: 'excelente',
          text: 'Usuário logado com sucesso',
          icon: 'success',
        });
      }
    } catch (error) {
      swal({
        title: 'Erro!',
        text: 'Erro ao logar no sistemaaaa',
        icon: 'error',
      });
      this.$router.push('/');
    }
  },
};
