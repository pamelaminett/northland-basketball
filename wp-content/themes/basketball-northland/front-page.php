<?php get_header(); ?>

<section class="bn-hero">
  <div class="bn-container bn-hero-grid">
    <div>
      <h1>Basketball for every Northland player.</h1>
      <p>From first-time hoopers to representative pathways, Basketball Northland connects clubs, schools, and communities with the competitions, coaching, and resources to thrive.</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a class="bn-button" href="<?php echo esc_url(home_url('/play-basketball/')); ?>">Play Basketball</a>
        <a class="bn-button bn-accent" href="<?php echo esc_url(home_url('/get-involved/')); ?>">Get Involved</a>
      </div>
    </div>
    <div class="bn-hero-card">
      <strong>Season Highlights</strong>
      <div class="bn-placeholder">Add upcoming events, registration links, and key dates here.</div>
      <a class="bn-button" href="<?php echo esc_url(home_url('/competitions/')); ?>">View Competitions</a>
    </div>
  </div>
</section>

<section class="bn-section">
  <div class="bn-container">
    <h2 class="bn-section-title">Quick Links</h2>
    <div class="bn-quick-links">
      <a href="<?php echo esc_url(home_url('/programmes/')); ?>">Find a Programme</a>
      <a href="<?php echo esc_url(home_url('/competitions/')); ?>">Find a Competition</a>
      <a href="<?php echo esc_url(home_url('/coaches-refs/')); ?>">Coach / Ref Pathways</a>
      <a href="<?php echo esc_url(home_url('/news/')); ?>">Latest News</a>
      <a href="<?php echo esc_url(home_url('/resources/')); ?>">Resources</a>
      <a href="<?php echo esc_url(home_url('/get-involved/')); ?>">Get Involved</a>
    </div>
  </div>
</section>

<section class="bn-section">
  <div class="bn-container">
    <h2 class="bn-section-title">Play Basketball</h2>
    <div class="bn-cards">
      <div class="bn-card">
        <h3>Junior Programmes</h3>
        <p>Grassroots programmes for tamariki and rangatahi across Northland.</p>
      </div>
      <div class="bn-card">
        <h3>Competitions</h3>
        <p>Club, school, and representative competitions across all age groups.</p>
      </div>
      <div class="bn-card">
        <h3>Pathways</h3>
        <p>Clear steps from local play into regional and national teams.</p>
      </div>
      <div class="bn-card">
        <h3>Coaches & Refs</h3>
        <p>Training, accreditation, and support for coaches and officials.</p>
      </div>
    </div>
  </div>
</section>

<section class="bn-section bn-strip">
  <div class="bn-container">
    <h2 class="bn-section-title">Programmes & Pathways</h2>
    <div class="bn-cards">
      <div class="bn-card">
        <h3>School Engagement</h3>
        <p>In-school activations, skills clinics, and tournament support.</p>
      </div>
      <div class="bn-card">
        <h3>Regional Camps</h3>
        <p>Performance camps connecting talent with high-level coaching.</p>
      </div>
      <div class="bn-card">
        <h3>Talent ID</h3>
        <p>Identification pathways for players ready for the next level.</p>
      </div>
    </div>
    <div style="margin-top:28px;">
      <h3 style="margin:0 0 12px; font-family:'Bebas Neue', sans-serif; letter-spacing:1px;">Upcoming Events / Key Dates</h3>
      <div class="bn-placeholder" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.2);">
        Add your calendar items or link to draws, fixtures, and registration deadlines here.
      </div>
    </div>
  </div>
</section>

<section class="bn-section">
  <div class="bn-container">
    <h2 class="bn-section-title">Latest News</h2>
    <div class="bn-news-list">
      <?php
      $news_query = new WP_Query(array(
        'posts_per_page' => 3,
      ));
      if ($news_query->have_posts()) :
        while ($news_query->have_posts()) : $news_query->the_post();
      ?>
          <article class="bn-news-item">
            <strong><?php the_title(); ?></strong>
            <span style="font-size:14px; opacity:0.7;"><?php echo get_the_date(); ?></span>
            <p><?php the_excerpt(); ?></p>
            <a href="<?php the_permalink(); ?>">Read more</a>
          </article>
      <?php
        endwhile;
        wp_reset_postdata();
      else :
      ?>
        <div class="bn-placeholder">Add your first news post to show updates here.</div>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="bn-section">
  <div class="bn-container bn-two-col">
    <div>
      <h2 class="bn-section-title">Resources</h2>
      <p>Share policies, forms, and tools for clubs, schools, coaches, and volunteers.</p>
      <div class="bn-placeholder">Upload your resources to feature them here.</div>
    </div>
    <div>
      <h2 class="bn-section-title">Get Involved</h2>
      <p>Volunteers, sponsors, and partners power basketball in Northland.</p>
      <a class="bn-button" href="<?php echo esc_url(home_url('/get-involved/')); ?>">Partner with us</a>
    </div>
  </div>
</section>

<section class="bn-section bn-strip">
  <div class="bn-container">
    <h2 class="bn-section-title">Partners & Funders</h2>
    <div class="bn-partners">
      <div class="bn-partner-card">Basketball NZ</div>
      <div class="bn-partner-card">Sport NZ</div>
      <div class="bn-partner-card">Funders</div>
      <div class="bn-partner-card">Community Partners</div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
