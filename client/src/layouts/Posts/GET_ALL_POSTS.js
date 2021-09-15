import { gql } from "graphql-tag";

export const GET_ALL_POSTS = gql`
  query {
    posts {
      text
      author {
        name
      }
      comments {
        content
        author {
          name
        }
        reply {
          content
          author {
            name
          }
        }
      }
    }
  }
`;
