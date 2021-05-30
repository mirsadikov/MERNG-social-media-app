import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import PostCard from '../component/PostCard'

export default function HomeScreen() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent posts</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`
