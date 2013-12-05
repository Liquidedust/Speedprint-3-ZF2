SELECT
	node.id_categories AS id,
	node.name_categories AS name,
	(COUNT(parent.name_categories) - 1) AS depth

FROM
	categories AS node,
	categories AS parent

WHERE
	node.lft_categories BETWEEN parent.lft_categories AND parent.rgt_categories
	AND node.enabled_categories = 'y'
	AND parent.enabled_categories = 'y'

GROUP BY
	node.id_categories

ORDER BY
	node.lft_categories ASC, node.sort_categories ASC;
