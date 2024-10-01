import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
interface Post {
    id: string
    postImage: string,
    createdAt: string,
    title: string,
    content: string,
    author: {
      name: string
    }
  }
export const usePosts = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          try {
            const res = await fetch(`${BACKEND_URL}/api/v1/blog`);
            const data = await res.json();
            console.log(data);
            setPosts(data);
            setLoading(false);
          } catch (e) {
            setLoading(false);
            toast({
              title: 'Error',
              description: 'Something went wrong',
            });
            return;
    
          }
        }
    
        fetchPosts();
      }, [])

    return {loading , posts};
}

export const useSearchPosts = (searchQuery: string) => {

  const [searchResult, setSearchResult] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  //fetch data from backend
  useEffect(() => {
    if (searchQuery) {
      const fetchSearchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/blog/search?q=${searchQuery}`);
          const data = res.data;
          setSearchResult(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast({
            title: "Error",
            description: "Error fetching data",
          });
        }
      };
      fetchSearchData();
    }
  }, [searchQuery]);

  return {loading, searchQuery, searchResult};

}