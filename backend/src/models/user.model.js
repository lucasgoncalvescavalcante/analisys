const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, maxlength: 50, required: true },
  username: { type: String, maxlength: 50, required: true },
  password: { type: String, required: true },
  funcao: { type: Number, default: null },
  tokens: [
    {
      token: { type: String, require: true }
    }
  ]
}, {
  timestamps: true,
  collection: 'users',
})


userSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {

  const user = this;
  const token = jwt.sign({ _id:user._id, name: user.name, username: user.username } , 'secret');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

//responsavel por fazer uma pesquisa 
userSchema.statics.findByCredentials = async (username, password) => {
  const user =  await User.findOne({username});
  console.log('findby este e o user');
  console.log(user);
  if(!user){
    throw new Error({error:'Erro: Login Invalido'});
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);//compara a senha com a senha cryptografada
  if(!isPasswordMatch) {
    throw new Error({error:'Erro: Senha Invalida'});
  }
  return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;

