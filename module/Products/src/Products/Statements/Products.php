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

    IFNULL(
        products.variants_title_products,
        'Alternativ'
    ) as variant_title,

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
    
    protected static  $select_media_by_id = "SELECT

    media.name_media AS name_media,
    media.type_media AS type_media,
    media.external_media AS external_media,
    IF(media.external_media = 'y', media.url_media, media.filename_media) AS file_media,
    product_media_rel.primary_product_media_rel AS primary_media,
    product_media_rel.sort_product_media_rel AS media_sort_order

    FROM products

    LEFT JOIN product_media_rel ON products.id_products=product_media_rel.id_products
    LEFT JOIN media ON product_media_rel.id_media=media.id_media

    WHERE products.id_products = :id

    ORDER BY
    media_sort_order ASC,
    name_media ASC";
    
    protected static $select_price_by_id_and_amount = "SELECT
    IFNULL(
            product_variant_bulk.product_bulk_prices,
            product_bulk.product_bulk_prices
    ) as price,

    :amount as amount,

    product_variant_bulk.product_bulk_rates_min_amount as min_amount,

    product_variant_bulk.product_bulk_rates_max_amount as max_amount,

    SUM(
            IFNULL(
                    product_variant_bulk.product_bulk_prices,
                    products.price_products
            ) * :amount
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
    products.id_products = :id
    AND
    product_variants.id_product_variants = :variant
    AND (
            :amount >= product_variant_bulk.product_bulk_rates_min_amount
            AND (
                    :amount <= product_variant_bulk.product_bulk_rates_max_amount
                    OR (
                            :amount > product_variant_bulk.product_bulk_rates_max_amount
                            AND
                            product_variant_bulk.product_bulk_rates_min_amount = product_variant_bulk.product_bulk_rates_max_amount
                    )
            )
    )";
    
    public static function ById() {
        return (string)Products::$select_by_id;
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
    
    public static function MediaById() {
        return (string)Products::$select_media_by_id;
    }
    
    public static function PriceByIdAndAmount() {
        return (string)Products::$select_price_by_id_and_amount;
    }
}