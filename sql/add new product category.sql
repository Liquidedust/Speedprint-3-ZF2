LOCK TABLE categories WRITE;

SELECT @myRight := rgt_categories FROM categories
WHERE id_categories = :parent;

UPDATE categories SET rgt_categories = rgt_categories + 2 WHERE rgt_categories > @myRight;
UPDATE categories SET lft_categories = lft_categories + 2 WHERE lft_categories > @myRight;

INSERT INTO categories(name_categories, lft_categories, rgt_categories) VALUES(:category_name, @myRight + 1, @myRight + 2);

UNLOCK TABLES;