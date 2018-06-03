import mongoose from 'mongoose';
import Users from './users.model';

const TokenSchema = new mongoose.Schema({
  accessToken: String,
  expires: Date,
  clientId: String,
  user: Users.schema,
});

const Tokens = mongoose.model('Tokens', TokenSchema);

export default Tokens;
