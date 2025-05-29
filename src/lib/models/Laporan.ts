import mongoose, { Schema, model, models } from "mongoose";

const LaporanSchema = new Schema({
  deskripsi: { type: String },
  file_bukti: { type: String },
  tanggal_laporan: { type: Date },
  feedback_verifikator: { type: String },
  upload_at: { type: Date },
  id_proyek: { type: Schema.Types.ObjectId, ref: "Proyek", required: true },
  id_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default models.Laporan || model("Laporan", LaporanSchema);
