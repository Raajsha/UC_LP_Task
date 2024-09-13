const apiUrl = 'https://dummyjson.com/posts';

async function createPost() {
    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;

    console.log('Creating post with title:', title);

    const response = await fetch(apiUrl + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
            userId: 1 // Assuming a user ID
        })
    });

    const data = await response.json();
    console.log('Post creation response:', data);

    if (response.ok) {
        newpost = document.getElementById("30");
        newpost.innerHTML +=`
        <div class ="post-item" id = "31">
            <h3>${document.getElementById("post-title").value}</h3>
            <p>${document.getElementById("post-body").value}</p>
            <button class="update" onclick="updatePost(31)">Update</button>
            <button class="delete" onclick="deletePost(31)">Delete</button>
        </div>
        `;
        alert('Post created successfully!');
    } else {
        alert('Failed to create post.');
    }
}

async function fetchPosts() {
    console.log('Fetching posts from API...');
    const response = await fetch(apiUrl);
    console.log('Fetch response:', response);
    
    if (!response.ok) {
        console.error('Failed to fetch posts.');
        alert('Failed to load posts.');
        return;
    }

    const data = await response.json();
    console.log('Posts data:', data);

    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    data.posts.forEach(post => {
        postsList.innerHTML += `
            <div class="post-item" id ="${post.id}">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="update" onclick="updatePost(${post.id})">Update</button>
                <button class="delete" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;
    });
}

async function updatePost(id) {
    const newTitle = prompt('Enter new title');
    const newBody = prompt('Enter new body');

    console.log(`Updating post ID ${id} with new title: ${newTitle}`);

    const response = await fetch(`${apiUrl}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            body: newBody
        })
    });
    const data = await response.json();
    console.log('Update response:', response);

    if (response.ok) {
        document.getElementById(`${id}`).innerHTML =`
            <div class="post-item" id ="${id}">
                <h3>${newTitle}</h3>
                <p>${newBody}</p>
                <button class="update" onclick="updatePost(${id})">Update</button>
                <button class="delete" onclick="deletePost(${id})">Delete</button>
            </div>
        `;
        alert('Post updated successfully!');
    } else {
        alert('Failed to update post.');
    }
}

async function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        console.log(`Deleting post ID ${id}`);
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        console.log('Delete response:', response);

        if (response.ok) {
            document.getElementById(`${id}`).remove();
            alert('Post deleted successfully!');
        } else {
            alert('Failed to delete post.');
        }
    }
}

document.getElementById('create-post-btn').addEventListener('click', createPost);
fetchPosts();