SET @seo = 'roll_up_professional', @variant = 5, @amount = 1;
SELECT
IFNULL(
	product_variant_bulk.product_bulk_prices,
	product_bulk.product_bulk_prices
) as price,

@amount as amount,

product_variant_bulk.product_bulk_rates_min_amount as min_amount,

product_variant_bulk.product_bulk_rates_max_amount as max_amount,

SUM(
	IFNULL(
		product_variant_bulk.product_bulk_prices,
		products.price_products
	) * @amount
) as total_price

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
products.seo_products = @seo #:seo
AND
product_variants.id_product_variants = @variant #:variant
AND (
	@amount >= product_variant_bulk.product_bulk_rates_min_amount #:amount
	AND (
		@amount <= product_variant_bulk.product_bulk_rates_max_amount #:amount
		OR (
			@amount > product_variant_bulk.product_bulk_rates_max_amount #:amount
			AND
			product_variant_bulk.product_bulk_rates_min_amount = product_variant_bulk.product_bulk_rates_max_amount
		)
	)
)