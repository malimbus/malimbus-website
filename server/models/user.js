import mongoose from "mongoose";
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, default: 'user'},
  slug: { type: String, slug: "name", unique: true },
  isSubscriber: Boolean,
  resetToken:String,
  expireToken:Date,
});

export default mongoose.model("User", userSchema);