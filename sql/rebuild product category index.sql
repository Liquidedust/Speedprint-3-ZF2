UPDATE categories
SET
lft_categories =
(
(
SELECT selected_value
FROM
(
SELECT MIN( lft_categories ) AS selected_value
FROM categories
WHERE name_categories != 'root'
)
AS sub_selected_value
)
- 1
)
WHERE name_categories = 'root';

UPDATE categories
SET
rgt_categories =
(
(
SELECT selected_value
FROM
(
SELECT MAX( rgt_categories ) AS selected_value
FROM categories
WHERE name_categories != 'root'
)
AS sub_selected_value
)
+ 1
)
WHERE name_categories = 'root';