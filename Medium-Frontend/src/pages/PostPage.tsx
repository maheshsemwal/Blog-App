
import { useParams } from 'react-router-dom'

const PostPage = () => {
    
  const {id} = useParams();
  return (

    <div>
      {id}
    </div>
  )
}

export default PostPage
