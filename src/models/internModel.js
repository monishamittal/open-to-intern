const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
const InternSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    mobile: {
      type: Number,
      unique: true,
      required: true,
      trim: true
    },
    collegeId: {
      type: ObjectId,
      ref: "College",
      trim: true

    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Intern", InternSchema);
