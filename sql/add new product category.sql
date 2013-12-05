LOCK TABLE categories WRITE;

SELECT @myRight := MAX(rgt_categories) FROM categories;

INSERT INTO categories(name_categories, lft_categories, rgt_categories, enabled_categories) VALUES(:category_name, @myRight+1, @myRight+2, :category_enabled);

UNLOCK TABLES;
