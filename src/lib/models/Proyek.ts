import mongoose, { Schema, model, models } from "mongoose";

const ProyekSchema = new Schema({
  id_proyek: {
    type: String,
    unique: true,
    default: function () {
      const timestamp = Date.now().toString(36); // waktu dalam base36
      const random = Math.random().toString(36).substring(2, 5); // 3 huruf acak
      return `IDP-${timestamp}${random}`.toUpperCase();
    },
  },
  nama_proyek: { type: String },
  lokasi_proyek: { type: String },
  deskripsi_proyek: { type: String },
  foto_proyek: { type: String }, // URL atau path file
  dokumen_proyek: { type: String}, // URL atau path file dokumen
  status_proyek:{type :String, default: "Belum"},
  created_at: { type: Date, default: Date.now },
  id_user: { type: Schema.Types.ObjectId, ref: "User"},
});

export default models.Proyek || model("Proyek", ProyekSchema);
