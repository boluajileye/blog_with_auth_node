// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class PostsController {
    public async index({ response }) {
        const posts = await Post.all()

        return response.ok({
            "status": 'success',
             "code": "200",
             "message": "Post retrieved Successfully",
             "data": posts
         })
    }

    public async store({ request, response, auth }) {
        const postSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.maxLength(255)
            ]),
            content: schema.string({ escape: true }, [
                rules.maxLength(1000)
            ]),
        })

        const payload: any = await request.validate({ schema: postSchema })
        payload['user_id'] = auth.user!.id

        const post: Post = await Post.create(payload)

        return response.ok({
           "status": 'success',
            "code": "200",
            "message": "Post created Successfully",
            "data": post
        })
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params

        const post: any = await Post.find(id)
        if (!post) {
            return response.notFound({ message: 'Post not found' })
        }

        return response.ok({
            "status": 'success',
             "code": "200",
             "message": "Post retrieved Successfully",
             "data": post
         })
    }

    public async update({ request, params, response }) {
        const postSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.maxLength(255)
            ]),
            content: schema.string({ escape: true }, [
                rules.maxLength(1000)
            ]),
        })

        const payload: any = await request.validate({ schema: postSchema })

        const { id }: { id: Number } = params

        const post: any = await Post.find(id)
        if (!post) {
            return response.notFound({ message: 'Post not found' })
        }

        post.title = payload.title
        post.content = payload.content

        await post.save()

        return response.ok({
            "status": 'success',
             "code": "200",
             "message": "Post updated Successfully",
             "data": post
         })
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params

        const post: any = await Post.find(id)
        if (!post) {
            return response.notFound({ message: 'Post not found' })
        }

        await post.delete()

        return response.ok({
            "status": 'success',
             "code": "200",
             "message": "Post deleted Successfully"
         })
    }

    public async user_posts({ params, response }) {
        const { username }: { username } = params
        
        const user: any = await User
                                .query()
                                .where('username', username)
                                .first()

        if (!user) {
         return response.notFound({ message: 'Post not found' })
        }
                                
        const post: any = await Post
                                .query()
                                .where('user_id', user.id)

        if (!post) {
            return response.notFound({ message: 'Post not found' })
        }

        return response.ok({
            "status": 'success',
             "code": "200",
             "message": "Post fetched Successfully for "+ user.username,
             "data": post
         })
    }
}