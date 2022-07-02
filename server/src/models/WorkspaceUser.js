import { Schema, model } from "mongoose";

const WorkspaceUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    permissions: [Number],
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

// Duplicate the ID field.
WorkspaceUserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
WorkspaceUserSchema.set("toJSON", {
  virtuals: true,
});

WorkspaceUserSchema.get("toJSON", {
  virtuals: true,
});

export default model("WorkspaceUser", WorkspaceUserSchema);
