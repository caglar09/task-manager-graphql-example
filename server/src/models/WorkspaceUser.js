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

WorkspaceUserSchema.pre("validate", function (next) {
  var self = this;

  model("WorkspaceUser", WorkspaceUserSchema).findOne(
    { user: this.user, workspace: this.workspace },
    function (err, results) {
      console.log(err, results);
      if (err) {
        next(err);
      } else if (results) {
        self.invalidate(
          "workspace",
          "User already has been add on the workspace"
        );

        next(new Error("User already has been add on the workspace"));
      } else {
        next();
      }
    }
  );
});

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
