<?php get_header(); ?>

<section class="bn-page">
  <div class="bn-container">
    <h1><?php the_archive_title(); ?></h1>
    <?php if (have_posts()) : ?>
      <div class="bn-news-list">
        <?php while (have_posts()) : the_post(); ?>
          <article class="bn-news-item">
            <strong><?php the_title(); ?></strong>
            <span style="font-size:14px; opacity:0.7;"><?php echo get_the_date(); ?></span>
            <p><?php the_excerpt(); ?></p>
            <a href="<?php the_permalink(); ?>">Read more</a>
          </article>
        <?php endwhile; ?>
      </div>
    <?php else : ?>
      <div class="bn-placeholder">No posts yet.</div>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
