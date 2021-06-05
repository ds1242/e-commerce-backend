const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
      model: Product, 
      attributes: ['id','product_name','price','stock','category_id']
    }
  ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    res.status(500).json({ message: 'No Categories Found' })
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    include: [ 
      {
        model: Product, 
        attributes: ['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    res.status(500).json({ message: 'Category not found' })
  })
});

router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name
    })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      res.status(400).json({ message: 'Something went wrong creating a category' })
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
    where: { id: req.params.id },
    }
  )
  .then(dbCategoryUpdate => res.json(dbCategoryUpdate))
  .catch(err => {
    res.status(500).json({ message: 'Unable to update '})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
  .then(dbCategoryDelete => res.json(dbCategoryDelete))
  .catch(err => {
    res.status(500).json({ message: 'Unable to delete' })
  })
});

module.exports = router;
