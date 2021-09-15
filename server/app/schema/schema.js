const graphql = require("graphql");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Reply = require("../models/reply");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

/**
 * User Type declaration
 */

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

/**
 * Comment Type declaration
 */

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      },
    },
    post: {
      type: PostType,
      resolve(parent, args) {
        return Post.findById(parent.postId);
      },
    },
    reply: {
      type: new GraphQLList(ReplyType),
      resolve(parent, args) {
        return Reply.find({ commentId: parent.id });
      },
    },
  }),
});

const ReplyType = new GraphQLObjectType({
  name: "reply",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      },
    },
  }),
});

/**
 * Post Type Declaration
 */

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ postId: parent.id });
      },
    },
  }),
});

/**
 * Root Query to Get Data using GraphQL
 * @name post
 * @requires id
 * @description Returns Post data from a perticular user
 */

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: new GraphQLList(PostType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Post.find({ authorId: args.id });
      },
    },
    /**
     * @description Returns all posts with comments
     */
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({}).populate({
          path: "comments",
        });
      },
    },
  },
});

/**
 * GraphQL Mutations for update , add , delete documents using mongoose queries
 *
 * AddPost
 * @requires text,author
 * @description add post
 *
 *
 */

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = new Post({
          text: args.text,
          author: args.author,
        });
        return post.save();
      },
    },
    addComment: {
      type: CommentType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let comment = new Comment({
          content: args.content,
          authorId: args.authorId,
          postId: args.postId,
        });

        await comment.save();
        await Post.findByIdAndUpdate(args.postId, {
          $push: {
            comments: comment,
          },
        });
        return comment;
      },
    },
    addUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          id: args.id,
          username: args.username,
          name: args.name,
        });
        return user.save();
      },
    },
    addPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let post = new Post({
          id: args.id,
          text: args.text,
          authorId: args.authorId,
        });

        return post.save();
      },
    },
    addReply: {
      type: ReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let reply = new Reply({
          id: args.id,
          content: args.content,
          authorId: args.authorId,
          commentId: args.commentId,
        });
        await reply.save();
        await Comment.findByIdAndUpdate(args.commentId, {
          $push: {
            replies: reply,
          },
        });
        return reply;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
