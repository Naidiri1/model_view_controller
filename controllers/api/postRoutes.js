const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        // ids are unique so there will be no post with same id, so finding by user_id also isnt needed
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost:3001/api/posts/:id
router.put ('/:id', withAuth, async (req,res) => {
  try{
const postData = await Post.update(req.body ,{
  where: {
    id: req.params.id,
  },
});
if (!postData) {
  res.status(404).json({ message: 'No post found with this id!' });
  return;
  }
  res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
}

});

module.exports = router;
