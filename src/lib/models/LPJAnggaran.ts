import mongoose, { Schema, model, models } from "mongoose";

const LPJAnggaranSchema = new Schema({
  nama_lpj: { type: String, required: true },
  file_lpj: { type: String },
  status_verifikasi: { type: String },
  feedback_verifikator: { type: String },
  upload_at: { type: Date },
  updated_at: { type: Date },
  id_proyek: { type: Schema.Types.ObjectId, ref: "Proyek", required: true },
});

export default models.LPJAnggaran || model("LPJAnggaran", LPJAnggaranSchema);

