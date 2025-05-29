import mongoose, { Schema, model, models } from "mongoose";


const InstansiSchema = new Schema({
  nama_instansi: { type: String, required: true },
  region: { type: String, required: true },
  password: { type: String, required: true },
  id_verifikator: { type: Schema.Types.ObjectId, ref: "Verifikator", required: true },
}, { timestamps: true });

export default models.Instansi || model("Instansi", InstansiSchema);
