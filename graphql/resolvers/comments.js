const { UserInputError, AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/auth')

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const user = checkAuth(context)

            if (body.trim() === '') {
                throw new UserInputError('Empty comment!', {
                    errors: {
                        body: 'Comment body must be not empty!',
                    },
                })
            }

            const post = await Post.findById(postId)

            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                })

                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found!')
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const user = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comments.findIndex(
                    (c) => c.id === commentId
                )

                if (commentIndex < 0) {
                    throw new UserInputError('Comment not found!')
                }
                if (post.comments[commentIndex].username === user.username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError(
                        'Action not allowed, not original user!'
                    )
                }
            } else {
                throw new UserInputError('Post not found!')
            }
        },
    },
}
