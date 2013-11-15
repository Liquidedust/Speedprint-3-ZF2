<?php
namespace Products\Statements;

class Products {
    
    protected static $select_by_id  =  "";
    
    protected static $select_by_seo  =  "SELECT
products.id_products as product_id,

products.name_products as product_name,

IFNULL(
	manufacturers.name_manufacturers,
	''
) as manufacturer,

manufacturers.id_manufacturers as manufacturer_id,

manufacturers.seo_manufacturers as manufacturer_seo,

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
) as fran_price,

products.seo_products as product_seo

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
AND
products.seo_products = :seo

GROUP BY
products.id_products

ORDER BY
product_id ASC";
    
    protected static  $select_variants_by_id = "SELECT
IFNULL(
	CONCAT(products.id_products, '-', product_variants.id_product_variants),
	products.id_products
) as product_id,

IFNULL(
	manufacturers.name_manufacturers,
	''
) as manufacturer,

IFNULL(
	CONCAT(products.name_products, ' ', product_variants.name_product_variants),
	products.name_products
) as product_name,

IFNULL(
	product_variants.name_product_variants,
	products.name_products
) as product_variant,

IFNULL(
	product_variants.description_product_variants,
	products.description_products
) as product_description,

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
AND
products.id_products = :id

GROUP BY
product_variants.id_product_variants,
products.id_products

ORDER BY
product_id ASC";
    
    protected static  $select_prices_by_id = "SELECT
IFNULL(
	CONCAT(products.id_products, '-', product_variants.id_product_variants),
	products.id_products
) as product_id,

IFNULL(
	CONCAT(products.name_products, ' ', product_variants.name_product_variants),
	products.name_products
) as product_name,

IFNULL(
	product_variants.name_product_variants,
	products.name_products
) as product_variant,

IFNULL(
	product_variant_bulk.product_bulk_rates_min_amount,
	product_bulk.product_bulk_rates_min_amount
) as min_amount,

IFNULL(
	product_variant_bulk.product_bulk_rates_max_amount,
	product_bulk.product_bulk_rates_max_amount
) as max_amount,

IFNULL(
	IFNULL(
		product_variant_bulk.product_bulk_prices,
		product_variants.price_product_variants
	),
	IFNULL(
		product_bulk.product_bulk_prices,
		products.price_products
	)
) as price

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
products.id_products = :id

ORDER BY
product_id ASC,
min_amount ASC";
    
    public static function ById() {
        
    }
    
    public static function BySeo() {
        return (string)Products::$select_by_seo;
    }
    
    public static function VariantsById() {
        return (string)Products::$select_variants_by_id;
    }
    
    public static function PricesById() {
        return (string)Products::$select_prices_by_id;
    }
}