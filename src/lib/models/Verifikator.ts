import mongoose, { Schema, model, models } from "mongoose";


const VerifikatorSchema = new Schema({
    nama_verifikator: { type: String, required: true },
    region: { type: String, required: true },
    password: { type: String, required: true },
  }, { timestamps: true });
  
  export default models.Verifikator || model("Verifikator", VerifikatorSchema);
  