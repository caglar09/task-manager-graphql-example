import { Schema, model, ObjectId } from "mongoose";

const WorkspaceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

WorkspaceSchema.path('id');
export default model("Workspace", WorkspaceSchema);
