<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package WPHobby
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if(!function_exists('wphobby_gutenberg_block_assets')) {
    /**
     * Enqueue Gutenberg block assets for both frontend + backend.
     *
     * `wp-blocks`: includes block type registration and related functions.
     *
     * @since 1.0.0
     */
    function wphobby_gutenberg_block_assets()
    {
        // Styles.
        wp_enqueue_style(
            'wphobby-gutenberg-block-style-css', // Handle.
            plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
            array('wp-edit-blocks') // Dependency to include the CSS after it.
        // filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
        );

        // Image magnifier Scripts.
        wp_enqueue_script(
            'wphobby-gutenberg-image-magnifier-js', // Handle.
            plugins_url('/assets/js/image-magnifier.js', dirname(__FILE__)), // image-magnifier.js
            array('jquery') // Dependencies, defined above.
        // filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
        );
        wp_enqueue_script(
            'wphobby-gutenberg-jquery-magnify-js', // Handle.
            plugins_url('/assets/js/jquery.magnify.js', dirname(__FILE__)), // image-magnifier.js
            array('jquery') // Dependencies, defined above.
        // filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
        );
    } // End function wphobby_gutenberg_block_assets().
}
// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'wphobby_gutenberg_block_assets' );

if(!function_exists('wphobby_gutenberg_editor_assets')) {
    /**
     * Enqueue Gutenberg block assets for backend editor.
     *
     * `wp-blocks`: includes block type registration and related functions.
     * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
     * `wp-i18n`: To internationalize the block's text.
     *
     * @since 1.0.0
     */
    function wphobby_gutenberg_editor_assets()
    {
        // Scripts.
        wp_enqueue_script(
            'wphobby-gutenberg-block-js', // Handle.
            plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components') // Dependencies, defined above.
        // filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
        );

        // Styles.
        wp_enqueue_style(
            'wphobby-gutenberg-block-editor-css', // Handle.
            plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
            array('wp-edit-blocks') // Dependency to include the CSS after it.
        // filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
        );
    } // End function wphobby_gutenberg_editor_assets().
}
// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'wphobby_gutenberg_editor_assets' );

if(!function_exists('wphobby_include_block_attribute_css')) {
    function wphobby_include_block_attribute_css()
    {
        require_once plugin_dir_path(__FILE__) . 'common.php';
        $presentBlocks = wphobby_getPresentBlocks();
        $blockStylesheets = "";

        foreach ($presentBlocks as $block) {
            $attributes = $block['attrs'];

            if (isset($attributes) && array_key_exists('blockID', $attributes) && $attributes['blockID'] != '') {

                switch ($block['blockName']) {
                    default:
                        //nothing could be done
                        break;
                    case 'wphobby-gutenberg/wphobby-list':
                        $prefix = '#wphobby-styled-list-' . $attributes['blockID'] . ' li::before';
                        $blockStylesheets .= $prefix . '{' . PHP_EOL .
                            'background: ' . (!empty($attributes['iconColor']) ? $attributes['iconColor'] : '#000000') . ';' . PHP_EOL .
                            'border-radius: ' . (!empty($attributes['iconRound']) ? $attributes['iconRound'] : '0') . ';' . PHP_EOL .
                            '}' . PHP_EOL;
                        break;

                }
            }
        }
        $blockStylesheets = preg_replace('/\s+/', ' ', $blockStylesheets);
        ob_start(); ?>

        <style><?php echo($blockStylesheets); ?></style>

        <?php
        ob_end_flush();
    }
}
add_action('wp_head', 'wphobby_include_block_attribute_css');

if(!function_exists('wphobby_dynamic_render_cb')) {
/**
 * CALLBACK
 *
 * Render callback for the dynamic block.
 *
 * Instead of rendering from the block's save(), this callback will render the front-end
 *
 * @since    1.0.0
 * @param $att Attributes from the JS block
 * @return string Rendered HTML
 */
function wphobby_dynamic_render_cb ( $att ) {

    // Coming from RichText, each line is an array's element
    $html = '<div class="wphobby-styled-list" id="wphobby-styled-list-'.$att['blockID'].'"><ul class="fa-ul">'.$att['list'].'</ul></div>';

    return $html;

}
}

if(!function_exists('wphobby_image_render_cb')) {
    /**
     * CALLBACK
     *
     * Render callback for the dynamic block.
     *
     * Instead of rendering from the block's save(), this callback will render the front-end
     *
     * @since    1.0.0
     * @param $att Attributes from the JS block
     * @return string Rendered HTML
     */
    function wphobby_image_render_cb($att)
    {

        // Coming from RichText, each line is an array's element
        $html = '<div class="">
	<img class="zoom" src="' . $att['imgUrl'] . '" width="720" data-magnify-src="' . $att['imgUrl'] . '"/>
    </div>';

        return $html;

    }
}
if(!function_exists('wphobby_register_dynamic_blocks')) {
    function wphobby_register_dynamic_blocks()
    {

        register_block_type('wphobby-gutenberg/wphobby-list', array(
            'attributes' => array(
                'alignment' => array(
                    'type' => 'string',
                    'default' => 'left'
                ),
                'blockID' => array(
                    'type' => 'string',
                    'default' => ''
                ),
                'list' => array(
                    'type' => 'text',
                    'default' => '<li>Item 1</li><li>Item 2</li><li>Item 3</li>'
                ),
                'listItem' => array(
                    'type' => 'array',
                    'default' => array_fill(0, 3,
                        array(
                            'text' => '',
                            'selectedIcon' => 'check',
                            'indent' => 0
                        )
                    )
                ),
                'selectedIcon' => array(
                    'type' => 'string',
                    'default' => 'check'
                ),
                'iconColor' => array(
                    'type' => 'string',
                    'default' => '#000000'
                ),
                'iconSize' => array(
                    'type' => 'number',
                    'default' => 5
                )
            ),
            'render_callback' => 'wphobby_dynamic_render_cb', // The render callback
        ));

        register_block_type('wphobby-gutenberg/wphobby-image', array(
            'attributes' => array(
                'bodyContent' => array(
                    'type' => 'text',
                    'default' => ''
                ),
                'heading' => array(
                    'type' => 'text',
                    'default' => ''
                ),
                'imgUrl' => array(
                    'type' => 'string',
                    'default' => ''
                )
            ),
            'render_callback' => 'wphobby_image_render_cb', // The render callback
        ));

    }
}

add_action( 'init', 'wphobby_register_dynamic_blocks' );

