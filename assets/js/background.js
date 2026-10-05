(function () {
  var canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ctx = canvas.getContext("2d");
  var particles = [];
  var width, height, dpr;
  var mouse = { x: null, y: null };
  var frameId = null;
  var running = true;

  var DOT_COLOR = "rgba(140, 170, 255, 0.55)";
  var LINE_COLOR = "47, 125, 255"; // rgb channels, alpha applied per-line
  var LINK_DIST = 130;
  var SPEED = 0.18;

  function particleCount() {
    // Roughly one particle per 18k px^2 of viewport, capped for perf.
    var area = width * height;
    return Math.min(90, Math.max(28, Math.round(area / 18000)));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    var count = particleCount();
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: 1 + Math.random() * 1.4
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill();
    }

    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          var alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = "rgba(" + LINE_COLOR + ", " + alpha + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    if (running) frameId = requestAnimationFrame(step);
  }

  function drawStaticFrame() {
    // Reduced-motion: render one still frame, no animation loop.
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill();
    }
  }

  window.addEventListener("resize", function () {
    resize();
    if (reduceMotion) drawStaticFrame();
  });

  document.addEventListener("visibilitychange", function () {
    running = !document.hidden && !reduceMotion;
    if (running && !frameId) step();
  });

  resize();

  if (reduceMotion) {
    drawStaticFrame();
  } else {
    step();
  }
})();
