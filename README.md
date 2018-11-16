# ConFab
ConFab is a website that has been designed as a project to mimic an anonymous message board. The main focus of this project was to deploy a functional website created with MongoDB, ExpressJS, NodeJS and ejs as a way to gain experience in full-stack development, with more focus on the back-end.

The following is a brief list of some of the features available:
- Ability to create threads and posts, through express routes and storing/retrieving data in a MongoDB database using the npm package Mongoose
- Sorting and displaying threads, based on the most recent thread/post using the post number
- Attaching images to threads/posts using a file browser
- Storing attached images on the server which can then be displayed, this involved the use of the npm package Multer
- Displaying image specifications if necessary on a post, eg. file dimensions and size
- User feedback provided for certain errors, this is displayed through the use of the npm package connect-flash
- Basic authentication using PassportJS and express sessions in order to log into an administrator account capable of deleting threads/posts

The primary resource used as the foundation has been the Web Developer Bootcamp course by Colt Steele available on Udemy: https://www.udemy.com/the-web-developer-bootcamp/