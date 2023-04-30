import React, { useState } from "react";
import MyButton from "../UI/buttron/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({ create }) => {
  // оставляем объект в неизменном виде
  const [post, setPost] = useState({ title: "", body: "" });

  //   добавка компонентов
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

  // ref
  // const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();

    //   добавка компонентов
    // const newPost = {
    //   id: Date.now(),
    //   title,
    //   body,
    // };
    // setPosts([...posts, newPost]);

    // если всё в одном месте
    // setPosts([...posts, { ...post, id: Date.now() }]);

    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "" });

    // setTitle("");
    // setBody("");

    // console.log(bodyInputRef.current.value);
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />

      {/* Упровляемый компонент */}
      {/* <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
          placeholder="Описание поста"
        /> */}

      {/* не очищается инпут */}
      {/* Неупровляемый\Неконтролируемый компонент */}
      {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}

      {/* на прямую */}
      {/* <input ref={bodyInputRef} type="text" /> */}
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
