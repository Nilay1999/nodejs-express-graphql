export const getAllPosts = `
    query{
       posts{
         text,author{
           name
         },comments{
           content,author{
             name
           },reply{
             content,author{
               username
             }
           }
         }
       }
    }
`;

export const getPostById = `
    query{
       post(id:"614195adf2036e140761147f"){
         author{
           username
         },text,comments{
           content,author{
             username
           },reply{
             content,author{
                 username
             }
           }
         }
       }
     }
`;

export const addComment = `
    mutation{
        addComment(content:"lets go!",author:"613f3e1c16a4ab2966f485c4",postId:"613f33501ac216d613721ed2"){
            content,author{
                name
                },post{
                    text,
                }
            }
        }
    }
`;

export const addUser = `{
    mutation{
        addUser(id:0,username:"Jones",name:"David Jones"){
            id , name , username
        }
    }
}`;

export const addPost = `{
    mutation{
        addPost(id:0,text:"My First Post on Social Media",authorId:"613f3108626823ba83552c4b"){
            id,text,author{
                name,id
            }
        }
    }
}`;
