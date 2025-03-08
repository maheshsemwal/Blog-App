
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { cn } from 'shadcn-utils'; // Adjust import based on your project setup
interface Post {
    id: string;
    postImage: string;
    date: string;
    title: string;
    description: string;
    author: string;
}

const PostPreviewComponent = memo((post: Post) => {
  const navigate = useNavigate();
  const handlePostRedirect = (id : string) => {
    navigate(`/post/${id}`);
  }
  
  return (
    <div className="pb-4 pt-4 m-2 max-w-md border-b-2 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden md:max-w-2xl"
      onClick={()=> {
        handlePostRedirect(post.id)
      }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover rounded-md md:w-48" src={post.postImage} alt="Post image" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{post.date}</div>
          <div>{post.id}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white hover:underline">{post.title}</a>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{post.description}</p>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            By <span className="font-semibold">{post.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostPreviewComponent;
