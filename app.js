document.addEventListener('DOMContentLoaded', function () {
    const blogPostsContainer = document.getElementById('blog-posts');

    // GitHub repository details
    const username = 'kilian-balaguer';
    const repo = 'Test-blog-website';
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/issues`;

    // Fetch GitHub issues
    fetch(apiUrl)
        .then(response => response.json())
        .then(issues => {
            // Iterate through issues and create blog posts
            issues.forEach(issue => {
                const post = document.createElement('article');
                post.innerHTML = `
                    <h2>${issue.title}</h2>
                    <p>${issue.body}</p>
                    <a href="${issue.html_url}" target="_blank">Read more</a>
                `;
                blogPostsContainer.appendChild(post);
            });
        })
        .catch(error => console.error('Error fetching GitHub issues:', error));
});
