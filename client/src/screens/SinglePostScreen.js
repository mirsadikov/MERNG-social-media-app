import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import moment from 'moment'
import { Grid, Image, Button, Icon, Label, Card } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import LikeButton from '../component/LikeButton'
import DeleteButton from '../component/DeleteButton'

export default function SinglePostScreen(props) {
  const postId = props.match.params.postId
  console.log(postId)

  const { user } = useContext(AuthContext)

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  })

  function deletePostCallback() {
    props.history.push('/')
  }

  let postMarkup

  if (!data) {
    postMarkup = <p>Loading posts...</p>
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => console.log('comment on post')}
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`