import { useState } from 'react'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        })
      }

      callback && callback()
    },
    variables: {
      postId,
      commentId,
    },
  })

  return (
    <>
      <Button
        floated='right'
        as='div'
        color='red'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`
