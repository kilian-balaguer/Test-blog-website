document.addEventListener('DOMContentLoaded', function () {
    const blogPostsContainer = document.getElementById('blog-posts');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const popupContent = document.getElementById('popup-content');

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
                    <p>${issue.body.substring(0, 200)}...</p>
                    <button class="read-more" data-url="${issue.html_url}">Read more</button>
                `;
                blogPostsContainer.appendChild(post);
            });

            // Event listener for read more buttons
            const readMoreButtons = document.querySelectorAll('.read-more');
            readMoreButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const issueUrl = this.getAttribute('data-url');
                    openPopup(issueUrl);
                });
            });
        })
        .catch(error => console.error('Error fetching GitHub issues:', error));

    // Function to open popup with full issue content
    function openPopup(url) {
        fetch(url)
            .then(response => response.json())
            .then(issue => {
                popupContent.innerHTML = `
                    <h2>${issue.title}</h2>
                    <p>${issue.body}</p>
                `;
                overlay.style.display = 'block';
                popup.style.display = 'block';
            })
            .catch(error => console.error('Error fetching GitHub issue:', error));
    }

    // Close popup
    closeBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
});
