import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';
import { addNewPost } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePost = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.log('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePost}>
        <div>
          <label htmlFor='postTitle'>Post Title:</label>
          <input
            id='postTitle'
            type='text'
            name='postTitle'
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div>
          <label htmlFor='postContent'>Post Content:</label>
          <textarea
            id='postContent'
            name='postContent'
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <div>
          <label htmlFor='postAuthor'>Author:</label>
          <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
            <option value=''></option>
            {userOptions}
          </select>
        </div>
        <button type='submit' disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
