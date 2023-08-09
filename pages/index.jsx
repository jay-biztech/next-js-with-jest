import Head from 'next/head';
import Image from 'next/image';

import styles from '@/pages/index.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      axios
        .get('/api/posts')
        .then(function (response) {
          setPosts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts?.map((post) => {
        return (
          <div key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" data-testid={`title-${post.id}`}>
                  {post.title}
                </h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
