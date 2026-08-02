import mongoose from "mongoose";
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const profileSchema = mongoose.Schema({
  name: String,
  email: String,
  userId: String, 
  address: String,
  profilePicture: String,
  currentLocation: String,
  memberCategory: [String],
  placeOfWork: String,
  title: String,
  phone: String,
  slug: { type: String, slug: "name", unique: true },
});

export default mongoose.model("Profile", profileSchema);