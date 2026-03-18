<footer class="bn-footer">
  <div class="bn-container bn-footer-grid">
    <div>
      <h4>Basketball Northland</h4>
      <p>Building pathways, competitions, and community across Northland.</p>
    </div>
    <div>
      <?php if (is_active_sidebar('footer-1')) : ?>
        <?php dynamic_sidebar('footer-1'); ?>
      <?php else : ?>
        <h4>Contact</h4>
        <p>info@northland.basketball</p>
      <?php endif; ?>
    </div>
    <div>
      <?php if (is_active_sidebar('footer-2')) : ?>
        <?php dynamic_sidebar('footer-2'); ?>
      <?php else : ?>
        <h4>Explore</h4>
        <p><a href="<?php echo esc_url(home_url('/news/')); ?>">News</a></p>
        <p><a href="<?php echo esc_url(home_url('/get-involved/')); ?>">Get Involved</a></p>
      <?php endif; ?>
    </div>
  </div>
  <div class="bn-container" style="margin-top:30px; font-size:14px; opacity:0.8;">
    © <?php echo date('Y'); ?> Basketball Northland. All rights reserved.
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
