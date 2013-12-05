SELECT
	products.id_products AS product_id,
	products.name_products AS product_name,
	products.description_products AS product_description,
	categories.name_categories AS product_category,
	categories.id_categories AS product_category_id

FROM
	categories AS active_category,
	products

LEFT JOIN product_categories_rel AS relationships ON products.id_products = relationships.id_products
LEFT JOIN categories ON relationships.id_categories = categories.id_categories

WHERE
	active_category.id_categories = :category_id
	AND
	categories.lft_categories BETWEEN active_category.lft_categories AND active_category.rgt_categories
	AND
	enabled_products = 'y';
