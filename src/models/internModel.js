const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
const InternSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    collegeId: {
      type: ObjectId,
      ref: "College",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Intern", InternSchema);
