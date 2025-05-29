import mongoose, { Schema, model, models } from "mongoose";

const ProposalSchema = new Schema({
  nama_proposal: { type: String, required: true },
  file_proposal: { type: String },
  status_verifikasi: { type: String },
  feedback_verifikator: { type: String },
  upload_at: { type: Date },
  updated_at: { type: Date },
  id_proyek: { type: Schema.Types.ObjectId, ref: "Proyek", required: true },
});

export default models.Proposal || model("Proposal", ProposalSchema);
