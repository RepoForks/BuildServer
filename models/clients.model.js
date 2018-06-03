import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  clientId: String,
  clientSecret: String,
});

const Clients = mongoose.model('Client', ClientSchema);

export default Clients;
