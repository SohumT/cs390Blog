import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const fetchPosts=  async function () {
    const req = await fetch("http://localhost:3000/blog/");
    const json = await req.json();
    setPosts(json);
  }
  useEffect(() => {
  fetchPosts()
  }, []);
  async function deletePost(postId){

    console.log(postId)
  
    const header = {"content-type": "application/json"};
  
    const requestData = JSON.stringify({postId});
  
    const req = await fetch("http://localhost:3000/blog/delete-post", {
      method: "post",
      body: requestData,
      headers: header
    })
  
    const ret_val = await req.text();
    if(ret_val){
      fetchPosts()
    }
    
    return 0;
  }
  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            key={post.title}
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content} <button onClick={() => deletePost(post._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
