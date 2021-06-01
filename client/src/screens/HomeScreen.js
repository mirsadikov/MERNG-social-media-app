import { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { AuthContext } from '../context/auth'
import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'
import { HeaderContext } from '../context/header'

export default function HomeScreen() {
  const { user } = useContext(AuthContext)
  const { activateHeaderItem } = useContext(HeaderContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  useEffect(() => {
    activateHeaderItem('home')
  }, [])

  return (
    <Grid columns={3} doubling stackable>
      <Grid.Row className='page-title'>
        <h1>Recent posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}
