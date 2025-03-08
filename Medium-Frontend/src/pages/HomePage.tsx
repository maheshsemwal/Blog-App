import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import PostPreviewComponent from '@/components/PostPreviewComponent';
import SkeletonPost from '@/components/SkeletonPost';
import { useRecoilValue } from 'recoil';
import { searchAtom } from '@/store/atom/atom';
import { usePosts, useSearchPosts } from '@/hooks/hooks';
import { toast } from '@/components/ui/use-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const searchQuery = useRecoilValue(searchAtom); // Access the search query from Recoil state

  // Default posts
  const { loading: loadingPosts, posts: defaultPosts } = usePosts();

  // Search posts
  const { loading: loadingSearch, searchResult: searchPosts } = useSearchPosts(searchQuery);

  useEffect(() => {
    const user = localStorage.getItem('authToken');
    if (user) {
      toast({
        title: 'Welcome Back',
        description: 'You are already logged in',
      });
    } else {
      navigate('/login');
    }
  }, []);

  // Determine which posts to display (search results or default posts)
  const postsToDisplay = useMemo(() => searchQuery ? searchPosts : defaultPosts, [searchQuery, searchPosts, defaultPosts]);
  const isLoading = searchQuery ? loadingSearch : loadingPosts;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="m-2 flex flex-col overflow-hidden md:flex-row md:ml-48">
        {isLoading ? (
          <div className="w-full overflow-y-auto p-4 scrollbar-hide md:w-1/2">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        ) : (
          <div className="w-full overflow-y-auto p-4 scrollbar-hide md:w-1/2">
            {postsToDisplay.map((post, index) => (
              <PostPreviewComponent
                key={post.id || index}
                id={post.id}
                postImage={post.postImage}
                date={post.createdAt}
                title={post.title}
                description={post.content}
                author={post.author.name}/>
            ))}
          </div>
        )}
        <div className="w-1/2 p-4 overflow-y-auto scrollbar-hide">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis soluta consequatur facere error, accusamus amet. Voluptas nulla quas dignissimos vero voluptatibus impedit expedita assumenda. Doloremque labore iste officiis molestiae debitis.
            Tenetur debitis dolores, commodi hic inventore fugit numquam perferendis atque ipsa eveniet adipisci velit, asperiores facilis molestias ipsam, laboriosam neque aliquam iste deserunt delectus dignissimos ut sequi. Commodi, voluptas qui?
            Non velit aperiam temporibus unde, quam doloremque? Deleniti, eligendi. Quasi minus consequatur vero inventore quia voluptate cumque suscipit numquam asperiores tempore doloremque officiis nulla tenetur cum ea veritatis, delectus corrupti!
            Fugiat recusandae officia doloribus quo sequi perferendis suscipit sed et possimus consequuntur neque voluptatum sint, odit eius sunt illum, incidunt facilis mollitia ut praesentium. Alias tempore repudiandae ipsa nisi magni?
            Sed esse eveniet praesentium, exercitationem beatae aliquam earum officiis quae eius a autem molestias ducimus pariatur dignissimos veritatis. Corrupti saepe laudantium debitis. Explicabo nemo qui voluptate saepe, vel amet labore.
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default HomePage;
