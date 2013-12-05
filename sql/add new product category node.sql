LOCK TABLE categories WRITE;

SELECT @myRight := rgt_categories FROM categories
WHERE id_categories = :id;

UPDATE categories SET rgt_categories = rgt_categories + 2 WHERE rgt_categories >= @myRight;
UPDATE categories SET lft_categories = lft_categories + 2 WHERE lft_categories > @myRight;

INSERT INTO categories(name_categories, lft_categories, rgt_categories, enabled_categories) VALUES(:category_node, @myRight, @myRight + 1, :enabled_category);

UNLOCK TABLES;