import { useState, useEffect } from 'react'
import { Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import MyPopup from './MyPopup'

export default function LikeButton({ post: { id, likeCount, likes }, user }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  return (
    <Button as='div' labelPosition='right' onClick={user && likePost}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>
        {user ? (
          liked ? (
            <Button color='teal'>
              <Icon name='heart' />
            </Button>
          ) : (
            <Button color='teal' basic>
              <Icon name='heart' />
            </Button>
          )
        ) : (
          <Button as={Link} to='/login' color='teal' basic>
            <Icon name='heart' />
          </Button>
        )}
      </MyPopup>

      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`
