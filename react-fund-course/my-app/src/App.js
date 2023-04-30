import React, { useMemo, useRef, useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/app.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./UI/buttron/MyButton";
import MyInput from "./UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "A.JavaScript", body: "D.Description" },
    { id: 2, title: "B.JavaScript2", body: "F.Description" },
    { id: 3, title: "C.JavaScript3", body: "G.Description" },
  ]);
  // const [posts2, setPosts2] = useState([
  //   { id: 1, title: "Python", body: "Description" },
  //   { id: 2, title: "Python 2", body: "Description" },
  //   { id: 3, title: "Python 3", body: "Description" },
  // ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // async function fetchPosts() {
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/posts"
  //   );
  //   setPosts(response.data);
  // }

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты по JS"
      />
      {/* <PostList posts={posts2} title="Посты по Python" /> */}
    </div>
  );
}

export default App;