const postdata = [
    {
      title: 'Sed euismod felis ut libero consequat.',
      post_text: 'https://example.com/sed/euismod/felis.png',
      user_id: 5
    },
    {
      title: 'Nulla facilisi. Etiam id dolor vitae libero feugiat vestibulum.',
      post_text: 'https://example.com/nulla/facilisi.jpg',
      user_id: 8
    },
    {
      title: 'Fusce gravida nisi vitae elit suscipit, in consectetur elit lacinia.',
      post_text: 'https://example.com/fusce/gravida/nisi.txt',
      user_id: 3
    }
  ];
  
  const seedPosts = () => Post.bulkCreate(postdata);
  
  module.exports = seedPosts;
  