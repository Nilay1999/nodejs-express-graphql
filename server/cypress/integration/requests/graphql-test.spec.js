const {
  getAllPosts,
  getPostById,
  addComment,
  addPost,
  addUser,
} = require("../../support/graphql-queries");

describe("Get All Posts with Comments", () => {
  it("should use a locally defined query to make the request", () => {
    const query = getAllPosts;
    cy.request({
      url: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: query,
      },
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body.data);
    });
  });
});

describe("Get post by User id", () => {
  it("Should print all Posts from perticular user", () => {
    const query = getPostById;
    cy.request({
      url: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        query: query,
      },
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body.data);
    });
  });
});

// describe("Add Comment On post by Id", () => {
//   it("Should add comment on perticular Post by a perticular user", () => {
//     const mutation = addComment;
//     cy.request({
//       url: "/graphql",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         query: mutation,
//       },
//       failOnStatusCode: false,
//     });
//   });
// });

// describe("Add Post", () => {
//   it("Should add Post by a perticular user", () => {
//     const mutation = addPost;
//     cy.request({
//       url: "/graphql",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         query: mutation,
//       },
//       failOnStatusCode: false,
//     });
//   });
// });
