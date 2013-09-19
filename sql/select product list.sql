SELECT
products.id_products as product_id,
products.name_products as product_name,
IFNULL(
	manufacturers.name_manufacturers,
	''
) as product_manufacturer,
products.description_products as product_description,
COUNT( DISTINCT( product_variants.id_product_variants ) ) as product_variants,
IFNULL(
	IFNULL(
		MIN(product_variant_bulk.product_bulk_prices),
		product_variants.price_product_variants
	),
	IFNULL(
		MIN(product_bulk.product_bulk_prices),
		products.price_products
	)
) as fran_price

FROM products

LEFT JOIN manufacturers_rel ON products.id_products=manufacturers_rel.id_products
LEFT JOIN manufacturers ON manufacturers_rel.id_manufacturers=manufacturers.id_manufacturers

LEFT JOIN product_variants_rel ON products.id_products=product_variants_rel.id_products
LEFT JOIN product_variants ON product_variants_rel.id_product_variants=product_variants.id_product_variants AND product_variants.enabled_product_variants = 'y'

LEFT JOIN product_bulk_rates_rel ON products.id_products=product_bulk_rates_rel.id_products
LEFT JOIN product_bulk_rates AS product_bulk ON product_bulk_rates_rel.id_product_bulk_rates = product_bulk.id_product_bulk_rates

LEFT JOIN product_variants_bulk_rates_rel ON product_variants.id_product_variants=product_variants_bulk_rates_rel.id_product_variants
LEFT JOIN product_bulk_rates AS product_variant_bulk ON product_variants_bulk_rates_rel.id_product_bulk_rates = product_variant_bulk.id_product_bulk_rates

WHERE
products.enabled_products = 'y'
# AND
# products.id_products = 1

GROUP BY
products.id_products

ORDER BY
product_id ASC