SELECT
IFNULL(
	product_variant_bulk.product_bulk_prices,
	products.price_products
) as price,

product_variant_bulk.product_bulk_rates_min_amount as min_amount,

product_variant_bulk.product_bulk_rates_max_amount as max_amount

FROM products

LEFT JOIN product_variants_rel ON products.id_products=product_variants_rel.id_products
LEFT JOIN product_variants ON product_variants_rel.id_product_variants=product_variants.id_product_variants AND product_variants.enabled_product_variants = 'y'

LEFT JOIN product_bulk_rates_rel ON products.id_products=product_bulk_rates_rel.id_products
LEFT JOIN product_bulk_rates AS product_bulk ON product_bulk_rates_rel.id_product_bulk_rates = product_bulk.id_product_bulk_rates

LEFT JOIN product_variants_bulk_rates_rel ON product_variants.id_product_variants=product_variants_bulk_rates_rel.id_product_variants
LEFT JOIN product_bulk_rates AS product_variant_bulk ON product_variants_bulk_rates_rel.id_product_bulk_rates = product_variant_bulk.id_product_bulk_rates

WHERE
products.enabled_products = 'y'
AND
products.seo_products = 'roll_up_compact' #:seo
AND
product_variants.id_product_variants = 6 #:variant
AND (
	50 >= product_variant_bulk.product_bulk_rates_min_amount #:amount
	AND (
		50 <= product_variant_bulk.product_bulk_rates_max_amount #:amount
		OR (
			50 > product_variant_bulk.product_bulk_rates_max_amount #:amount
			AND
			product_variant_bulk.product_bulk_rates_min_amount = product_variant_bulk.product_bulk_rates_max_amount
		)
	)
)