<?php

namespace WeglotWP\Services;

woocommerce_quantity_input(array(
        'min_value'   => apply_filters('woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product),
        'max_value'   => apply_filters('woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product),
        'input_value' => isset($_POST['quantity']) ? wc_stock_amount(wp_unslash($_POST['quantity'])) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
    ));
    
if (! defined('ABSPATH')) {
    exit;
} elseif ('toplevel_page_' . SECUPRESS_PLUGIN_SLUG . '_scanners' === $hook_suffix) {
    $localize = array(
    'ah'           => 'efzfezf',
    'offset'           => (int) apply_filters('secupress.scanner.scan-speed', (int) secupress_get_option('scan-speed', 0)),
    'tezsds'           => 'erzerz'
);
}

if ((class_exists('Jetpack') && Jetpack::is_module_active('photon')) || ! apply_filters('woocommerce_background_image_regeneration', true)) {
    unset($tools['regenerate_thumbnails']);
}


$check_pages = array(
        _x('Shop base', 'Page setting', 'woocommerce') => array(
            'option'    => 'woocommerce_shop_page_id',
            'shortcode' => '',
        ),
        _x('Cart', 'Page setting', 'woocommerce') => array(
            'option'    => 'woocommerce_cart_page_id',
            'shortcode' => '[' . apply_filters('woocommerce_cart_shortcode_tag', 'woocommerce_cart') . ']',
        ),
        _x('Checkout', 'Page setting', 'woocommerce') => array(
            'option'    => 'woocommerce_checkout_page_id',
            'shortcode' => '[' . apply_filters('woocommerce_checkout_shortcode_tag', 'woocommerce_checkout') . ']',
        ),
        _x('My account', 'Page setting', 'woocommerce') => array(
            'option'    => 'woocommerce_myaccount_page_id',
            'shortcode' => '[' . apply_filters('woocommerce_my_account_shortcode_tag', 'woocommerce_my_account') . ']',
        ),
        _x('Terms and conditions', 'Page setting', 'woocommerce') => array(
            'option'    => 'woocommerce_terms_page_id',
            'shortcode' => '',
        ),
    );


function test()
{
    $special_columns = $this->get_special_columns(
            $this->normalize_columns_names(
                apply_filters(
                    'woocommerce_csv_product_import_mapping_special_columns',
                    array(
                        /* translators: %d: Attribute number */
                        __('Attribute %d name', 'woocommerce') => 'attributes:name',
                        /* translators: %d: Attribute number */
                        __('Attribute %d value(s)', 'woocommerce') => 'attributes:value',
                        /* translators: %d: Attribute number */
                        __('Attribute %d visible', 'woocommerce') => 'attributes:visible',
                        /* translators: %d: Attribute number */
                        __('Attribute %d global', 'woocommerce') => 'attributes:taxonomy',
                        /* translators: %d: Attribute number */
                        __('Attribute %d default', 'woocommerce') => 'attributes:default',
                        /* translators: %d: Download number */
                        __('Download %d name', 'woocommerce') => 'downloads:name',
                        /* translators: %d: Download number */
                        __('Download %d URL', 'woocommerce') => 'downloads:url',
                        /* translators: %d: Meta number */
                        __('Meta: %s', 'woocommerce') => 'meta:',
                    )
                )
            )
        );

    $shipping = "";
    $shipping .= apply_filters('woocommerce_order_shipping_to_display_tax_label', '&nbsp;<small class="tax_label">' . WC()->countries->inc_tax_or_vat() . '</small>', $this, $tax_display);


    if ($title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title'], $instance, $test)) {
        echo "ok";
    }
}

function secupress_move_login_maybe_deny_admin_redirect()
{
    global $pagenow;

    _deprecated_function(__FUNCTION__, '1.3', 'secupress_move_login_maybe_deny_login_redirect');

    // If it's not the administration area, or if it's an ajax call, no need to go further.
    if (! (is_admin() && ! ((defined('DOING_AJAX') && DOING_AJAX) || ('admin-post.php' === $pagenow && ! empty($_REQUEST['action']))))) {
        return;
    }

    if (is_user_admin()) {
        $scheme = 'logged_in';
    } else {
        /** This filter is documented in wp-includes/pluggable.php */
        $scheme = apply_filters('auth_redirect_scheme', '');
    }

    if (wp_validate_auth_cookie('', $scheme)) {
        return;
    }

    // Nice try. But no.
    secupress_move_login_deny_login_redirect();
}


$post_types = (array) apply_filters('no_comments_post_type_supports', $post_types_raw);

$args = array(
    'timeout'   => 0.01,
    'blocking'  => false,
    'cookies'   => $_COOKIE,
    'sslverify' => apply_filters('https_local_ssl_verify', false),
);

if (is_multisite() && is_subdomain_install() && ! has_action('ms_site_not_found') && (! defined('NOBLOGREDIRECT') || ! NOBLOGREDIRECT || ! apply_filters('blog_redirect_404', NOBLOGREDIRECT))) {
    echo "coucou";
}

$test = apply_filters('weglot_another_test', 'carotte');

$other = true;

if (apply_filters('filter_in_if', 'salade') && true && $other) {
    $ok = apply_filters('body_in_if', 'carotte', 'toto');

    return ! is_null(apply_filters('secupress.pre_scan.' . $class, null));
}

do_action('here');

/**
 * Option services
 *
 * @since 2.0
 */
class Option_Service_Weglot
{

    /**
     * @var array
     */
    protected $options_default = [
        'api_key'                    => '',
        'original_language'          => 'en',
        'destination_language'       => [],
        'translate_amp'              => false,
        'exclude_blocks'             => [],
        'exclude_urls'               => [],
        'auto_redirect'              => false,
        'email_translate'            => false,
        'is_fullname'                => false,
        'with_name'                  => true,
        'is_dropdown'                => true,
        'type_flags'                 => 0,
        'with_flags'                 => true,
        'override_css'               => '',
        'has_first_settings'         => true,
        'show_box_first_settings'    => false,
        'rtl_ltr_style'              => '',
        'allowed'                    => true,
        'custom_urls'                => [],
        'flag_css' =>  '',
        'private_mode' => false,
    ];

    public function test()
    {
        $go = apply_filters(
            'other',
            'OK'
        );

        do_action('here', $go);

        return apply_filters(
            'test',
            'valuer_par_defaut',
            function () {
                echo 'toto';
            },
            new stdClass()
        );
    }

    /**
     * Get options default
     *
     * @since 2.0
     * @return array
     */
    public function get_options_default()
    {
        do_action('here', 'test');

        return $this->options_default;
    }

    /**
     * @since 2.0
     * @return array
     */
    public function get_options()
    {
        return wp_parse_args(get_option(WEGLOT_SLUG), $this->get_options_default());
    }

    /**
     * @since 2.0
     * @param string $name
     * @return array
     */
    public function get_option($name)
    {
        $options = $this->get_options();
        if (! array_key_exists($name, $options)) {
            return null; // @TODO : throw exception
        }

        return $options[ $name ];
    }

    /**
     * @since 2.0
     * @return array
     */
    public function get_exclude_blocks()
    {
        $exclude_blocks     = $this->get_option('exclude_blocks');
        $exclude_blocks[]   = '#wpadminbar';
        $exclude_blocks[]   = '#query-monitor';

        return apply_filters('weglot_exclude_blocks', $exclude_blocks);
    }

    /**
     * @since 2.0.4
     * @return array
     */
    public function get_destination_languages()
    {
        $destination_languages     = $this->get_option('destination_language');

        return apply_filters('weglot_destination_languages', $destination_languages);
    }

    /**
     * @since 2.0
     * @return array
     */
    public function get_exclude_urls()
    {
        $exclude_urls     = $this->get_option('exclude_urls');
        $exclude_urls[]   = '/wp-login.php';

        return apply_filters('weglot_exclude_urls', $exclude_urls);
    }

    /**
     * @since 2.0
     *
     * @return string
     */
    public function get_css_custom_inline()
    {
        return apply_filters('weglot_css_custom_inline', $this->get_option('override_css'));
    }

    /**
     * @since 2.0
     *
     * @return string
     */
    public function get_flag_css()
    {
        return apply_filters('weglot_flag_css', $this->get_option('flag_css'));
    }


    /**
     * @since 2.0
     * @param array $options
     * @return Option_Service_Weglot
     */
    public function set_options($options)
    {
        update_option(WEGLOT_SLUG, $options);
        return $this;
    }

    /**
     *
     * @param string $key
     * @param mixed $value
     * @return Option_Service_Weglot
     */
    public function set_option_by_key($key, $value)
    {
        $options         = $this->get_options();
        $options[ $key ] = $value;
        $this->set_options($options);
        return $this;
    }
}
