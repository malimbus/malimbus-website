import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const postSchema = mongoose.Schema({
    postType: String,
    author: String,
    userId: String,
    email: String,
    fileUrl: String,
    title: String,
    authors: [String],
    content: String,
    page: String,
    year: String,
    volume: String,
    region: String,
    avatar: String,
    isApproved: Boolean,
    isPrivate: Boolean,
    slug: { type: String, slug: "title", unique: true },
    createdAt: { type: Date, default: new Date() },
})

var PostModel = mongoose.model('PostModel', postSchema);

export default PostModel;


    // authors:[
    //     {
    //         name: String,
    //         email: String,
    //         memberCategory: [String],
    //         yearOfGraduation: String,
    //         userId: String,
    //         title: String,
    //         bio: String,
    //         profilePicture: String,
    //         currentLocation: String,
    //         placeofWork: String,
    //         designation: String,
    //         affiliation: String
    //       }
    // ]