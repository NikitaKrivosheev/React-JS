import React, { useState, useEffect, useRef } from "react";
import "../styles/app.css";
import PostList from "../components/PostList";
import MyButton from "../UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../UI/pagination/pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
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
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты по JS"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }} />
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />

      {/* <PostList posts={posts2} title="Посты по Python" /> */}
    </div>
  );
}

export default Posts;
