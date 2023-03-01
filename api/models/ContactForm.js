const mongoose = require("mongoose");

const ContactFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactForm", ContactFormSchema);
