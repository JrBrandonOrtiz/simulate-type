"use client";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    user_id: number;
}

interface Like {
    id: number;
    quantity: number;
    post_id: number;
}

interface ApiResponse<T> {
    message: string;
    data?: T;
    [key: string]: any;
}

const API_BASE_URL = 'https://simuate-test-backend-1.onrender.com/api';

async function fetchData<T>(endpoint: string, method: string = 'GET', body?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    return response.json();
}

const HomePage: React.FC = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const [postsResponse, usersResponse, likesResponse] = await Promise.all([
                    fetchData<Post[]>('/posts'),
                    fetchData<User[]>('/users'),
                    fetchData<Like[]>('/likes')
                ]);

                if (postsResponse.message === 'Posts found' && Array.isArray(postsResponse.posts)) {
                    setPosts(postsResponse.posts);
                }
                if (usersResponse.message === 'users found' && Array.isArray(usersResponse.users)) {
                    setUsers(usersResponse.users);
                }
                if (likesResponse.message === 'Likes found' && Array.isArray(likesResponse.likes)) {
                    setLikes(likesResponse.likes);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError('Failed to load data.');
            }
        }

        loadData();
    }, []);

    const handleCreatePost = async () => {
        if (!title || !description || !selectedUserId) {
            setError('Title, description, and user are required.');
            return;
        }

        try {
            const newPost = { title, description, user_id: selectedUserId };
            const response = await fetchData<Post>('/posts', 'POST', newPost);

            if (response.message === 'Created post correctly') {
                setPosts([...posts, response.post]);
                setTitle('');
                setDescription('');
                setSelectedUserId(null);
                setError('');
            } else {
                setError('Failed to create post.');
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setError('Failed to create post.');
        }
    };

    const handleEditPost = async () => {
        if (editingPostId === null || !title || !description || !selectedUserId) {
            setError('Title, description, and user are required.');
            return;
        }

        try {
            const updatedPost = { title, description, user_id: selectedUserId };
            const response = await fetchData<null>(`/posts/${editingPostId}`, 'PUT', updatedPost);

            if (response.message === 'Updated post correctly') {
                setPosts(posts.map(post => post.id === editingPostId ? { ...post, ...updatedPost } : post));
                setTitle('');
                setDescription('');
                setSelectedUserId(null);
                setEditingPostId(null);
                setIsEditing(false);
                setError('');
            } else {
                setError('Failed to update post.');
            }
        } catch (error) {
            console.error("Error updating post:", error);
            setError('Failed to update post.');
        }
    };

    const startEditing = (post: Post) => {
        setTitle(post.title);
        setDescription(post.description);
        setSelectedUserId(post.user_id);
        setEditingPostId(post.id);
        setIsEditing(true);
    };

    const handleDeletePost = async (postId: number) => {
        try {
            const response = await fetchData<null>(`/posts/${postId}`, 'DELETE');

            if (response.message === 'Deleted post correctly') {
                setPosts(posts.filter(post => post.id !== postId));
                setLikes(likes.filter(like => like.post_id !== postId));
                setError('');
            } else {
                setError('Failed to delete post.');
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            setError('Failed to delete post.');
        }
    };

    const handleLike = async (postId: number) => {
        try {
            const existingLike = likes.find(like => like.post_id === postId);
            if (existingLike) {
                const updatedLike = { ...existingLike, quantity: existingLike.quantity + 1 };
                await fetchData<null>(`/likes/${existingLike.id}`, 'PUT', updatedLike);
                setLikes(likes.map(like => like.id === existingLike.id ? updatedLike : like));
            } else {
                const newLike = { quantity: 1, post_id: postId };
                const response = await fetchData<Like>('/likes', 'POST', newLike);
                if (response.message === 'Created like correctly') {
                    setLikes([...likes, response.createdLike]);
                }
            }
        } catch (error) {
            console.error("Error handling like:", error);
            setError('Failed to update like.');
        }
    };

    return (
        <Container>
            <Section>
                <Title>{isEditing ? 'Edit Post' : 'Create Post'}</Title>
                <Form>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextArea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Select
                        value={selectedUserId || ''}
                        onChange={(e) => setSelectedUserId(Number(e.target.value))}
                    >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </Select>
                    <Button onClick={isEditing ? handleEditPost : handleCreatePost}>
                        {isEditing ? 'Update Post' : 'Create Post'}
                    </Button>
                    {error && <Error>{error}</Error>}
                </Form>
            </Section>

            <Section>
                <Title>Posts</Title>
                {posts.length === 0 ? (
                    <p>No posts found</p>
                ) : (
                    <PostList>
                        {posts.map(post => (
                            <PostItem key={post.id}>
                                <PostText>ID: {post.id}</PostText>
                                <PostText>Title: {post.title}</PostText>
                                <PostText>Description: {post.description}</PostText>
                                <PostText>User: {users.find(u => u.id === post.user_id)?.name || 'Unknown'}</PostText>
                                <PostText>
                                    Likes: {likes.find(l => l.post_id === post.id)?.quantity || 0}
                                    <LikeButton onClick={() => handleLike(post.id)}>👍</LikeButton>
                                </PostText>
                                <Button onClick={() => startEditing(post)}>Edit</Button>
                                <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>
                            </PostItem>
                        ))}
                    </PostList>
                )}
            </Section>
        </Container>
    );
};

export default HomePage;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
`;

const Section = styled.section`
    margin-bottom: 30px;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #00a64f;
    padding-bottom: 10px;
`;

const Form = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    background-color: #00a64f;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #007c3f;
    }
`;

const Error = styled.p`
    color: red;
    font-size: 0.9rem;
`;

const PostList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
`;

const PostItem = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;

const PostText = styled.p`
    font-size: 1rem;
    color: #555;
`;

const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin-left: 5px;
`;

