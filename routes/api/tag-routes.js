const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, { where: { id: req.params.id } });

    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a tag by its `id` value
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });

    if (deletedTag === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
