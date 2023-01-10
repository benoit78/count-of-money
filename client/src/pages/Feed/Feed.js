import React from 'react';
import { getFeed } from '../../services/feed';
import { Spinner } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormatUrlTitle } from '../../utils';

const Feed = () => {

  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();

  const loadPost = React.useCallback(() => {
      (async () => {
        const currentFeed = await getFeed();
        setPosts(currentFeed);
      })();
  }, []);

  React.useEffect(() => loadPost(), [loadPost]);

  const handlePost = (article) => {
    const formatTitle = FormatUrlTitle(article);
    navigate(`/feed/article/${formatTitle}`)
  }

  return (
    <div style={{ padding: '5rem' }}>
      <div style={{ borderBottom:  '2px solid #F1F3F4' }}>
        Nos derniers articles
      </div>
       { posts.length === 0 ?
       <Spinner animation="border" variant="primary" style={{ display: 'flex', marginRight: 'auto', marginLeft: 'auto' }}/> :
        <Row md={4} className="mt-5">
       { posts.items.map((post, index) => {
          const imageUrl = post['content:encoded'].match(/src="(.+?)"/);
          return (
            <div key={index} className="mb-5">
            <img onClick={()=> handlePost(post.title)} src={imageUrl[1]} alt="" style={{ width: '100%' }}/>
            <h3 onClick={()=> handlePost(post.title)}>{post.title}</h3>
        </div>
          )

        })}
        </Row>
      }
    </div>
  );
};

export default Feed;