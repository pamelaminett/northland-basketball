<?php get_header(); ?>

<section class="bn-page">
  <div class="bn-container">
    <?php if (have_posts()) : ?>
      <?php while (have_posts()) : the_post(); ?>
        <article>
          <h1><?php the_title(); ?></h1>
          <p style="opacity:0.7; font-size:14px;">Posted <?php echo get_the_date(); ?></p>
          <div><?php the_content(); ?></div>
        </article>
      <?php endwhile; ?>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
