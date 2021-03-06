// 博客系统api
import Router from 'koa-router';

import controller from '../controller';
const commentController = controller.commentController;
const imageController = controller.imageController;
const postController = controller.postController;
const tagController = controller.tagController;
const postCommentController = controller.postCommentController;
const postLikeController = controller.postLikeController;
const postReadController = controller.postReadController;
const postTagController = controller.postTagController;

import blogSetting from '../../settings/appSettings';

// 路由配置
const router = new Router(
    {
        prefix: blogSetting.blog_admin_setting.prefix//每一个路由的前缀
    }
);
// ---swagger-doc-start---
router
    .post('/comment', commentController.createComment)
    .delete('/comment/:id', commentController.deleteComment)
    .put('/comment', commentController.updateComment)
    .get('/comment/:id', commentController.getComment)
    .get('/comment', commentController.getAllComment)

    .post('/image', imageController.createImage)
    .delete('/image/:id', imageController.deleteImage)
    .put('/image', imageController.updateImage)
    .get('/image/:id', imageController.getImage)
    .get('/image', imageController.getAllImage)

    .post('/post', postController.createPost)
    .delete('/post/:id', postController.deletePost)
    .put('/post', postController.updatePost)
    .get('/post/:id', postController.getPost)
    .get('/post', postController.getAllPost)

    .post('/tag', tagController.createTag)
    .delete('/tag/:id', tagController.deleteTag)
    .put('/tag', tagController.updateTag)
    .get('/tag/:id', tagController.getTag)
    .get('/tag', tagController.getAllTag)

    .post('/post_comment', postCommentController.createPostComment)
    .delete('/post_comment/:id', postCommentController.deletePostComment)
    .get('/post_comment/:id', postCommentController.getPostComment)
    .get('/post_comment', postCommentController.getAllPostComment)

    .post('/post_like', postLikeController.createPostLike)
    .delete('/post_like/:id', postLikeController.deletePostLike)
    .get('/post_like/:id', postLikeController.getPostLike)
    .get('/post_like', postLikeController.getAllPostLike)

    .post('/post_read', postReadController.createPostRead)
    .delete('/post_read/:id', postReadController.deletePostRead)
    .get('/post_read/:id', postReadController.getPostRead)
    .get('/post_read', postReadController.getAllPostRead)

    .post('/post_tag', postTagController.createPostTag)
    .delete('/post_tag/:id', postTagController.deletePostTag)
    .get('/post_tag/:id', postTagController.getPostTag)
    .get('/post_tag', postTagController.getAllPostTag);
// ---swagger-doc-end---
export default {
    router: router,
};
