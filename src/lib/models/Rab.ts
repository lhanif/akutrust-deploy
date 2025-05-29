import mongoose from 'mongoose';

const RabSchema = new mongoose.Schema(
  {
    id_proyek: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    file_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Rab || mongoose.model('Rab', RabSchema);
