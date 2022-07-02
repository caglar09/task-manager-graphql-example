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
    id: true,
  }
);

// Duplicate the ID field.
WorkspaceSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
WorkspaceSchema.set("toJSON", {
  virtuals: true,
});

WorkspaceSchema.get("toJSON", {
  virtuals: true,
});



export default model("Workspace", WorkspaceSchema);
