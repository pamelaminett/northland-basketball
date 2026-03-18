<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="bn-header">
  <div class="bn-container bn-header-inner">
    <div class="bn-logo">
      <?php if (has_custom_logo()) : ?>
        <?php the_custom_logo(); ?>
      <?php else : ?>
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
      <?php endif; ?>
    </div>
    <nav class="bn-nav">
      <?php
      wp_nav_menu(array(
        'theme_location' => 'primary',
        'container' => false,
        'items_wrap' => '%3$s',
        'fallback_cb' => false,
      ));
      ?>
    </nav>
  </div>
</header>
