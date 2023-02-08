// const { update } = require("../../models/User");

const delButtonHandler = async (event) => {
  //this delete fetch only runs if the element clicked on has an attribute of data-id
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log("clicked");
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();
    // console.log(event.target);
    const id = event.target.getAttribute('data-update-id');
    console.log(id);
    const title = document.querySelector('#updated-post-name').value.trim();
    const content = document.querySelector('#updated-post-content').value.trim();
   
    if (title && content) {
      //localhost:3001/api/posts/:id
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };

  document
  .querySelector('.edit-post-form')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('#updateBtn')
  .addEventListener('click', updatePost);