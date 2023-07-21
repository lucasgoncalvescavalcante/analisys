const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, maxlength: 50, required: true },
  email: { type: String, maxlength: 50, required: true },
  password: { type: String, required: true },
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
  const token = jwt.sign({ _id:user._id, name: user.name, email: user.email } , 'secret');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

//responsavel por fazer uma pesquisa 
userSchema.statics.findByCredentials = async (email, password) => {
  console.log('t12312312312');
  const user =  await User.findOne({email});
  console.log('t1111111111111111111111');
  if(!user){
    console.log('gfgdfgmsfkdgjmçksdlfgjmsakdlgjnsadlfjgkdfd');
    throw new Error({error:'Erro: Login Invalido'});
    console.log('gfgdfgmsfkdgjmçksdlfgjmsakdlgjnsadlfjgkdfd');
  }
  console.log('VEAAAAAA');
  const isPasswordMatch = await bcrypt.compare(password, user.password);//compara a senha com a senha cryptografada
  if(!isPasswordMatch) {
    throw new Error({error:'Erro: Senha Invalida'});
  }
  console.log('VEEEIIIIIIIII');
  return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;

