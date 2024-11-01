<?php
/**
 * Plugin Name: WPHobby Blocks
 * Plugin URI: https://wphobby.com
 * Description: Register WPHobby Blocks for the Gutenberg editor.
 * Version: 1.0.0
 * Author: WPHobby
 * Author URI: https://wphobby.com/
 * @package WPHobby
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
