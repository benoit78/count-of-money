import React from 'react';
import { getFeed } from '../../services/feed';
import { FormatUrlTitle } from '../../utils';

const FeedArticle = () => {

  const [article, setArticle] = React.useState([]);
  const ArticleValue  = window.location.pathname.split("/").pop();

  const loadPost = React.useCallback(() => {
    (async () => {
      const currentFeed = await getFeed();
      const parseByArticle = currentFeed.items.filter((post) =>  FormatUrlTitle(post.title) === ArticleValue)

      setArticle(parseByArticle);
    })();
}, [ArticleValue]);

React.useEffect(() => loadPost(), [loadPost]);

  return (
    <div style={{ padding: '3rem' }}>
       {article ?  article.map((post, index) => {
          return (
            <div key={index} className="mb-5">
            <h1 >{post.title}</h1>
            <div
            dangerouslySetInnerHTML={{
              __html: post['content:encoded']
            }}
          />
        </div>
          )

        }): []}
    </div>
  );
};

export default FeedArticle;