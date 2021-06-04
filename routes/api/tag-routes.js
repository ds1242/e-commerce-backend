const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    res.status(500).json({ message: 'Cannot find Tags' })
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    res.status(500).json({ message: 'Connot find a Tag with that Id'})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagCreate => res.json(dbTagCreate))
  .catch(err => {
    res.status(500).json({ message: 'Unable to create a Tag' })
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
