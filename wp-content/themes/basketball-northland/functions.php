<?php

function bn_theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('custom-logo', array(
    'height' => 80,
    'width' => 240,
    'flex-height' => true,
    'flex-width' => true,
  ));

  register_nav_menus(array(
    'primary' => __('Primary Menu', 'basketball-northland'),
    'footer' => __('Footer Menu', 'basketball-northland'),
  ));
}
add_action('after_setup_theme', 'bn_theme_setup');

function bn_enqueue_assets() {
  wp_enqueue_style('bn-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'bn_enqueue_assets');

function bn_register_widget_areas() {
  register_sidebar(array(
    'name' => __('Footer Column 1', 'basketball-northland'),
    'id' => 'footer-1',
    'before_widget' => '<div class="bn-footer-widget">',
    'after_widget' => '</div>',
    'before_title' => '<h4>',
    'after_title' => '</h4>',
  ));

  register_sidebar(array(
    'name' => __('Footer Column 2', 'basketball-northland'),
    'id' => 'footer-2',
    'before_widget' => '<div class="bn-footer-widget">',
    'after_widget' => '</div>',
    'before_title' => '<h4>',
    'after_title' => '</h4>',
  ));
}
add_action('widgets_init', 'bn_register_widget_areas');

function bn_excerpt_length($length) {
  return 24;
}
add_filter('excerpt_length', 'bn_excerpt_length');

function bn_excerpt_more($more) {
  return '...';
}
add_filter('excerpt_more', 'bn_excerpt_more');
