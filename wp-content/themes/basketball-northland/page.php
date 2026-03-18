<?php get_header(); ?>

<section class="bn-page">
  <div class="bn-container">
    <?php if (have_posts()) : ?>
      <?php while (have_posts()) : the_post(); ?>
        <article>
          <h1><?php the_title(); ?></h1>
          <div><?php the_content(); ?></div>
        </article>
      <?php endwhile; ?>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
