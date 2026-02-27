window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Extrema & Lagrange Multipliers',
    subtitle: 'Finding peaks, valleys, and saddle points of multivariable functions, then optimizing under constraints with the method of Lagrange multipliers',
    sections: [
        // ===== SECTION 1: Local Extrema =====
        {
            id: 'local-extrema',
            title: 'Local Extrema',
            content: `
<h2>1 &middot; Local Extrema</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Local Extremum</div>
Let \\(f : \\mathbb{R}^n \\to \\mathbb{R}\\). A point \\(\\mathbf{a}\\) is a <strong>local minimum</strong> of \\(f\\) if there exists a neighborhood \\(U\\) of \\(\\mathbf{a}\\) such that
\\[f(\\mathbf{x}) \\ge f(\\mathbf{a}) \\quad \\text{for all } \\mathbf{x} \\in U.\\]
Analogously, \\(\\mathbf{a}\\) is a <strong>local maximum</strong> if \\(f(\\mathbf{x}) \\le f(\\mathbf{a})\\) for all \\(\\mathbf{x} \\in U\\). Either type is called a <strong>local extremum</strong>.
</div>

<p>
In single-variable calculus, we found extrema by setting \\(f'(x) = 0\\). The multivariable analog replaces the derivative with the gradient.
</p>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; First-Order Necessary Condition</div>
If \\(f\\) is differentiable at \\(\\mathbf{a}\\) and \\(\\mathbf{a}\\) is a local extremum, then
\\[\\nabla f(\\mathbf{a}) = \\mathbf{0}.\\]
That is, every partial derivative vanishes: \\(\\frac{\\partial f}{\\partial x_i}(\\mathbf{a}) = 0\\) for each \\(i\\).
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Critical Point</div>
A point \\(\\mathbf{a}\\) where \\(\\nabla f(\\mathbf{a}) = \\mathbf{0}\\) (or where \\(\\nabla f\\) does not exist) is called a <strong>critical point</strong> (or <strong>stationary point</strong>) of \\(f\\).
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Tangent Plane is Horizontal</div>
At a critical point, the tangent plane to the graph \\(z = f(x, y)\\) is horizontal (parallel to the \\(xy\\)-plane). The surface momentarily &ldquo;levels off&rdquo; in every direction. However, this does not guarantee an extremum &mdash; the point could be a saddle point where some directions go up and others go down.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Finding Critical Points</div>
Let \\(f(x,y) = x^3 - 3xy + y^3\\). The gradient is
\\[\\nabla f = (3x^2 - 3y,\\; -3x + 3y^2).\\]
Setting both components to zero: \\(x^2 = y\\) and \\(y^2 = x\\). Substituting the first into the second gives \\(x^4 = x\\), so \\(x(x^3 - 1) = 0\\). The critical points are \\((0,0)\\) and \\((1,1)\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning</div>
Not every critical point is an extremum. The classic example is \\(f(x,y) = x^2 - y^2\\) at the origin: \\(\\nabla f(0,0) = \\mathbf{0}\\), but the point is a <strong>saddle point</strong> &mdash; a minimum along the \\(x\\)-axis and a maximum along the \\(y\\)-axis.
</div>

<div class="viz-container" data-viz="critical-points-explorer">
<div class="viz-canvas" id="critical-points-explorer"></div>
<div class="viz-controls" id="critical-points-explorer-controls"></div>
<div class="viz-caption">Explore the contour plot of \\(f(x,y) = ax^2 + bxy + cy^2\\). The gradient vanishes at the origin. Adjust \\(a\\), \\(b\\), \\(c\\) to see local min, local max, and saddle behavior.</div>
</div>
`,
            visualizations: [
                {
                    id: 'critical-points-explorer',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        let a = 1, b = 0, c = 1;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Draw contour plot of f(x,y) = a*x^2 + b*x*y + c*y^2
                            var levels = [-4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 4];
                            var posColor = viz.colors.blue;
                            var negColor = viz.colors.orange;

                            for (var li = 0; li < levels.length; li++) {
                                var L = levels[li];
                                var col = L > 0 ? posColor : negColor;
                                ctx.strokeStyle = col;
                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = 0.7;
                                ctx.beginPath();
                                var started = false;

                                // Parametric sweep: for each angle theta, solve a*r^2*cos^2 + b*r^2*cos*sin + c*r^2*sin^2 = L
                                for (var t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
                                    var ct = Math.cos(t), st = Math.sin(t);
                                    var q = a * ct * ct + b * ct * st + c * st * st;
                                    if (q === 0 || L / q < 0) {
                                        started = false;
                                        continue;
                                    }
                                    var r = Math.sqrt(L / q);
                                    var sx = r * ct, sy = r * st;
                                    var px = viz.originX + sx * viz.scale;
                                    var py = viz.originY - sy * viz.scale;
                                    if (px < 0 || px > w || py < 0 || py > h) {
                                        started = false;
                                        continue;
                                    }
                                    if (!started) {
                                        ctx.moveTo(px, py);
                                        started = true;
                                    } else {
                                        ctx.lineTo(px, py);
                                    }
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }

                            // Mark origin as critical point
                            viz.drawPoint(0, 0, viz.colors.yellow, '', 6);

                            // Classify
                            var disc = 4 * a * c - b * b;
                            var label = '';
                            if (disc > 0 && a > 0) label = 'Local Minimum';
                            else if (disc > 0 && a < 0) label = 'Local Maximum';
                            else if (disc < 0) label = 'Saddle Point';
                            else label = 'Degenerate';

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,y) = ' + a.toFixed(1) + 'x\u00B2 + ' + b.toFixed(1) + 'xy + ' + c.toFixed(1) + 'y\u00B2', 12, 20);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Origin: ' + label, 12, 40);
                            ctx.fillStyle = '#888';
                            ctx.fillText('D = 4ac - b\u00B2 = ' + disc.toFixed(1), 12, 58);
                        }

                        VizEngine.createSlider(controls, 'a', -3, 3, a, 0.1, function(v) { a = v; draw(); });
                        VizEngine.createSlider(controls, 'b', -4, 4, b, 0.1, function(v) { b = v; draw(); });
                        VizEngine.createSlider(controls, 'c', -3, 3, c, 0.1, function(v) { c = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'local-ex1',
                    type: 'short-answer',
                    question: 'Find all critical points of f(x,y) = x^2 + y^2 - 4x + 6y + 13.',
                    hint: 'Set each partial derivative to zero: f_x = 2x - 4 = 0 and f_y = 2y + 6 = 0.',
                    solution: 'We have f_x = 2x - 4 = 0, giving x = 2, and f_y = 2y + 6 = 0, giving y = -3. The only critical point is (2, -3). Here f(2,-3) = 4 + 9 - 8 - 18 + 13 = 0.'
                },
                {
                    id: 'local-ex2',
                    type: 'short-answer',
                    question: 'Find all critical points of f(x,y) = x^2 - 2xy + 2y^2 - 2x + 2y + 1.',
                    hint: 'Compute partial derivatives, set them to zero, and solve the resulting 2x2 system.',
                    solution: 'f_x = 2x - 2y - 2 = 0 and f_y = -2x + 4y + 2 = 0. From f_x: x = y + 1. Substituting into f_y: -2(y+1) + 4y + 2 = 2y = 0, so y = 0 and x = 1. The only critical point is (1, 0).'
                },
                {
                    id: 'local-ex3',
                    type: 'short-answer',
                    question: 'Show that f(x,y) = xy has a saddle point at the origin.',
                    hint: 'Check that the gradient vanishes at (0,0), then look at f along the lines y = x and y = -x.',
                    solution: 'f_x = y and f_y = x, both zero at (0,0), so it is a critical point. Along y = x: f(x,x) = x^2 > 0 (minimum-like). Along y = -x: f(x,-x) = -x^2 < 0 (maximum-like). Since f is positive in some directions and negative in others near the origin, (0,0) is a saddle point.'
                }
            ]
        },

        // ===== SECTION 2: The Hessian Test =====
        {
            id: 'hessian-test',
            title: 'The Hessian Test',
            content: `
<h2>2 &middot; The Hessian Test</h2>

<p>
The gradient tells us <em>where</em> to look; the <strong>Hessian matrix</strong> tells us <em>what</em> we have found.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Hessian Matrix</div>
For \\(f : \\mathbb{R}^n \\to \\mathbb{R}\\) with continuous second partial derivatives, the <strong>Hessian matrix</strong> at \\(\\mathbf{a}\\) is the \\(n \\times n\\) matrix of second partials:
\\[H_f(\\mathbf{a}) = \\begin{pmatrix} f_{x_1 x_1} & f_{x_1 x_2} & \\cdots & f_{x_1 x_n} \\\\ f_{x_2 x_1} & f_{x_2 x_2} & \\cdots & f_{x_2 x_n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ f_{x_n x_1} & f_{x_n x_2} & \\cdots & f_{x_n x_n} \\end{pmatrix}.\\]
By equality of mixed partials (Clairaut), \\(H_f\\) is <strong>symmetric</strong>.
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Second Derivative Test (Two Variables)</div>
Let \\(f(x,y)\\) have continuous second partials near a critical point \\((a,b)\\). Define
\\[D = f_{xx}(a,b)\\,f_{yy}(a,b) - \\bigl(f_{xy}(a,b)\\bigr)^2 = \\det H_f(a,b).\\]
<ul>
<li>If \\(D > 0\\) and \\(f_{xx}(a,b) > 0\\), then \\((a,b)\\) is a <strong>local minimum</strong>.</li>
<li>If \\(D > 0\\) and \\(f_{xx}(a,b) < 0\\), then \\((a,b)\\) is a <strong>local maximum</strong>.</li>
<li>If \\(D < 0\\), then \\((a,b)\\) is a <strong>saddle point</strong>.</li>
<li>If \\(D = 0\\), the test is <strong>inconclusive</strong>.</li>
</ul>
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Why the Determinant?</div>
The Hessian captures the curvature of the surface at the critical point. In two dimensions, the determinant \\(D\\) tells us whether the curvatures in the principal directions have the <em>same sign</em> (bowl-shaped, \\(D > 0\\)) or <em>opposite signs</em> (saddle-shaped, \\(D < 0\\)). The sign of \\(f_{xx}\\) then distinguishes concave-up from concave-down.
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; General \\(n\\) Variables</div>
For \\(f : \\mathbb{R}^n \\to \\mathbb{R}\\), the second derivative test uses the <strong>definiteness</strong> of the Hessian:
<ul>
<li>\\(H_f(\\mathbf{a})\\) positive definite \\(\\Rightarrow\\) local minimum.</li>
<li>\\(H_f(\\mathbf{a})\\) negative definite \\(\\Rightarrow\\) local maximum.</li>
<li>\\(H_f(\\mathbf{a})\\) indefinite \\(\\Rightarrow\\) saddle point.</li>
<li>\\(H_f(\\mathbf{a})\\) semidefinite \\(\\Rightarrow\\) inconclusive.</li>
</ul>
Definiteness can be checked using eigenvalues or Sylvester&rsquo;s criterion.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Classifying Critical Points</div>
Let \\(f(x,y) = x^3 - 3xy + y^3\\). We found critical points \\((0,0)\\) and \\((1,1)\\).
<br><br>
The second partials are \\(f_{xx} = 6x\\), \\(f_{yy} = 6y\\), \\(f_{xy} = -3\\).
<br><br>
At \\((0,0)\\): \\(D = (0)(0) - (-3)^2 = -9 < 0\\). <strong>Saddle point.</strong>
<br><br>
At \\((1,1)\\): \\(D = (6)(6) - (-3)^2 = 27 > 0\\) and \\(f_{xx} = 6 > 0\\). <strong>Local minimum.</strong>
</div>

<div class="viz-container" data-viz="hessian-classifier">
<div class="viz-canvas" id="hessian-classifier"></div>
<div class="viz-controls" id="hessian-classifier-controls"></div>
<div class="viz-caption">Explore the Hessian test: the contour plot shows \\(f(x,y)\\) near a critical point. Adjust the second partials \\(f_{xx}\\), \\(f_{xy}\\), \\(f_{yy}\\) and see how the determinant \\(D\\) classifies the point.</div>
</div>
`,
            visualizations: [
                {
                    id: 'hessian-classifier',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });

                        var fxx = 2, fxy = 0, fyy = 2;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // f(x,y) ~ 0.5*fxx*x^2 + fxy*x*y + 0.5*fyy*y^2 near the critical point
                            var resolution = 3;
                            for (var px = 0; px < w; px += resolution) {
                                for (var py = 0; py < h; py += resolution) {
                                    var x = (px - viz.originX) / viz.scale;
                                    var y = (viz.originY - py) / viz.scale;
                                    var val = 0.5 * fxx * x * x + fxy * x * y + 0.5 * fyy * y * y;

                                    // Color by value
                                    var intensity = Math.min(Math.abs(val) / 4, 1);
                                    if (val > 0) {
                                        ctx.fillStyle = 'rgba(100, 149, 237, ' + (intensity * 0.5) + ')';
                                    } else if (val < 0) {
                                        ctx.fillStyle = 'rgba(255, 140, 0, ' + (intensity * 0.5) + ')';
                                    } else {
                                        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                                    }
                                    ctx.fillRect(px, py, resolution, resolution);
                                }
                            }

                            // Draw contours
                            var levels = [-3, -2, -1, -0.5, 0.5, 1, 2, 3];
                            for (var li = 0; li < levels.length; li++) {
                                var L = levels[li];
                                ctx.strokeStyle = L > 0 ? viz.colors.blue : viz.colors.orange;
                                ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                var started = false;
                                for (var t = 0; t <= 2 * Math.PI + 0.01; t += 0.015) {
                                    var ct = Math.cos(t), st = Math.sin(t);
                                    var q = 0.5 * fxx * ct * ct + fxy * ct * st + 0.5 * fyy * st * st;
                                    if (q === 0 || L / q < 0) { started = false; continue; }
                                    var r = Math.sqrt(Math.abs(L / q));
                                    var sx = viz.originX + r * ct * viz.scale;
                                    var sy = viz.originY - r * st * viz.scale;
                                    if (sx < 0 || sx > w || sy < 0 || sy > h) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else { ctx.lineTo(sx, sy); }
                                }
                                ctx.stroke();
                            }

                            // Mark origin
                            viz.drawPoint(0, 0, viz.colors.yellow, '', 6);

                            // Classification
                            var D = fxx * fyy - fxy * fxy;
                            var label = '';
                            if (D > 0 && fxx > 0) label = 'Local Minimum (D > 0, fxx > 0)';
                            else if (D > 0 && fxx < 0) label = 'Local Maximum (D > 0, fxx < 0)';
                            else if (D < 0) label = 'Saddle Point (D < 0)';
                            else label = 'Inconclusive (D = 0)';

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('D = fxx\u00B7fyy - fxy\u00B2 = ' + D.toFixed(2), 12, 20);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText(label, 12, 38);
                        }

                        VizEngine.createSlider(controls, 'fxx', -4, 4, fxx, 0.1, function(v) { fxx = v; draw(); });
                        VizEngine.createSlider(controls, 'fxy', -4, 4, fxy, 0.1, function(v) { fxy = v; draw(); });
                        VizEngine.createSlider(controls, 'fyy', -4, 4, fyy, 0.1, function(v) { fyy = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'hess-ex1',
                    type: 'short-answer',
                    question: 'Use the second derivative test to classify the critical point (1, 0) of f(x,y) = x^2 - 2xy + 2y^2 - 2x + 2y + 1.',
                    hint: 'Compute fxx, fyy, fxy and form D = fxx*fyy - fxy^2.',
                    solution: 'f_xx = 2, f_yy = 4, f_xy = -2. So D = (2)(4) - (-2)^2 = 8 - 4 = 4 > 0 and f_xx = 2 > 0. Therefore (1, 0) is a local minimum.'
                },
                {
                    id: 'hess-ex2',
                    type: 'short-answer',
                    question: 'Classify all critical points of f(x,y) = x^4 + y^4 - 4xy + 1.',
                    hint: 'Find critical points from the system f_x = 4x^3 - 4y = 0 and f_y = 4y^3 - 4x = 0. Then apply the second derivative test at each.',
                    solution: 'From f_x: y = x^3. Substituting into f_y: 4x^9 - 4x = 0, so x(x^8 - 1) = 0, giving x = 0, 1, -1. Critical points: (0,0), (1,1), (-1,-1). Second partials: f_xx = 12x^2, f_yy = 12y^2, f_xy = -4. At (0,0): D = 0 - 16 = -16 < 0, saddle point. At (1,1): D = 12*12 - 16 = 128 > 0 and f_xx = 12 > 0, local min. At (-1,-1): D = 12*12 - 16 = 128 > 0 and f_xx = 12 > 0, local min.'
                },
                {
                    id: 'hess-ex3',
                    type: 'short-answer',
                    question: 'Give an example showing the second derivative test can be inconclusive. Consider f(x,y) = x^4 + y^4 and g(x,y) = x^4 - y^4 at the origin.',
                    hint: 'Compute D for both functions at (0,0). Then determine the actual nature of each critical point by other means.',
                    solution: 'For both functions, f_xx(0,0) = f_yy(0,0) = 0, f_xy(0,0) = 0, so D = 0 (inconclusive). However, f(x,y) = x^4 + y^4 >= 0 with equality only at (0,0), so the origin is a local (and global) minimum. For g(x,y) = x^4 - y^4, along the x-axis g > 0 and along the y-axis g < 0, so the origin is a saddle point. Same D, different outcomes.'
                }
            ]
        },

        // ===== SECTION 3: Absolute Extrema =====
        {
            id: 'absolute-extrema',
            title: 'Absolute Extrema',
            content: `
<h2>3 &middot; Absolute Extrema</h2>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Extreme Value Theorem (Multivariable)</div>
If \\(f\\) is continuous on a <strong>closed and bounded</strong> subset \\(D \\subseteq \\mathbb{R}^n\\), then \\(f\\) attains both an absolute maximum and an absolute minimum on \\(D\\).
</div>

<div class="env-block intuition">
<div class="env-label">Intuition</div>
This is the multivariable version of the single-variable result: a continuous function on a closed interval \\([a,b]\\) must achieve its maximum and minimum. The key conditions are: <strong>continuous</strong> function, <strong>closed</strong> domain (includes its boundary), and <strong>bounded</strong> domain (fits inside some large ball).
</div>

<div class="env-block definition">
<div class="env-label">Strategy &mdash; Finding Absolute Extrema on a Closed Region</div>
To find the absolute maximum and minimum of \\(f\\) on a closed bounded region \\(D\\):
<ol>
<li><strong>Interior:</strong> Find all critical points of \\(f\\) inside \\(D\\) and evaluate \\(f\\) there.</li>
<li><strong>Boundary:</strong> Restrict \\(f\\) to each piece of the boundary (parametrize or substitute the constraint) and find the extrema of the resulting single-variable or lower-dimensional function.</li>
<li><strong>Compare:</strong> The largest value is the absolute maximum; the smallest is the absolute minimum.</li>
</ol>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Extrema on a Triangular Region</div>
Find the absolute extrema of \\(f(x,y) = x^2 + y^2 - 2x\\) on the triangular region \\(D\\) with vertices \\((0,0)\\), \\((4,0)\\), \\((0,4)\\).
<br><br>
<strong>Interior:</strong> \\(\\nabla f = (2x - 2,\\, 2y) = \\mathbf{0}\\) gives \\((1, 0)\\). Check that it is inside \\(D\\): yes, since \\(1 + 0 < 4\\). Here \\(f(1,0) = -1\\).
<br><br>
<strong>Boundary edge 1:</strong> \\(y = 0\\), \\(0 \\le x \\le 4\\). Then \\(f(x,0) = x^2 - 2x\\). Min at \\(x = 1\\): \\(f = -1\\). Endpoints: \\(f(0,0) = 0\\), \\(f(4,0) = 8\\).
<br><br>
<strong>Boundary edge 2:</strong> \\(x = 0\\), \\(0 \\le y \\le 4\\). Then \\(f(0,y) = y^2\\). Min at \\(y = 0\\): \\(f = 0\\). Endpoint: \\(f(0,4) = 16\\).
<br><br>
<strong>Boundary edge 3:</strong> \\(x + y = 4\\), so \\(x = 4 - y\\), \\(0 \\le y \\le 4\\). Then \\(f = (4-y)^2 + y^2 - 2(4-y) = 2y^2 - 6y + 8\\). Min at \\(y = 3/2\\): \\(f = 7/2\\). Already counted endpoints.
<br><br>
<strong>Comparison:</strong> Absolute minimum is \\(-1\\) at \\((1,0)\\). Absolute maximum is \\(16\\) at \\((0,4)\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning</div>
Do not forget the boundary! In many optimization problems, the extreme value actually occurs on the boundary, not at an interior critical point. Always check both.
</div>

<div class="viz-container" data-viz="absolute-extrema-region">
<div class="viz-canvas" id="absolute-extrema-region"></div>
<div class="viz-controls" id="absolute-extrema-region-controls"></div>
<div class="viz-caption">The triangular region \\(D\\) with contour lines of \\(f(x,y) = x^2 + y^2 - 2x\\). The absolute min (blue dot) and max (red dot) are marked.</div>
</div>
`,
            visualizations: [
                {
                    id: 'absolute-extrema-region',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50, originX: 80, originY: null });
                        viz.originY = viz.height - 60;

                        function draw() {
                            viz.clear();

                            var ctx = viz.ctx;
                            var sc = viz.scale;
                            var ox = viz.originX, oy = viz.originY;

                            // Draw grid lines
                            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                            ctx.lineWidth = 0.5;
                            for (var i = -1; i <= 6; i++) {
                                ctx.beginPath();
                                ctx.moveTo(ox + i * sc, 0);
                                ctx.lineTo(ox + i * sc, viz.height);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(0, oy - i * sc);
                                ctx.lineTo(viz.width, oy - i * sc);
                                ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(ox, 0); ctx.lineTo(ox, viz.height);
                            ctx.moveTo(0, oy); ctx.lineTo(viz.width, oy);
                            ctx.stroke();

                            // Fill triangular region
                            ctx.fillStyle = 'rgba(100, 149, 237, 0.1)';
                            ctx.beginPath();
                            ctx.moveTo(ox, oy);
                            ctx.lineTo(ox + 4 * sc, oy);
                            ctx.lineTo(ox, oy - 4 * sc);
                            ctx.closePath();
                            ctx.fill();

                            // Draw triangle boundary
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(ox, oy);
                            ctx.lineTo(ox + 4 * sc, oy);
                            ctx.lineTo(ox, oy - 4 * sc);
                            ctx.closePath();
                            ctx.stroke();

                            // Contour lines of f(x,y) = x^2 + y^2 - 2x = (x-1)^2 + y^2 - 1
                            // Circles centered at (1,0) with radius sqrt(L+1)
                            var levels = [-0.5, 0, 1, 2, 4, 7, 10, 14];
                            for (var li = 0; li < levels.length; li++) {
                                var L = levels[li];
                                var r2 = L + 1;
                                if (r2 <= 0) continue;
                                var r = Math.sqrt(r2);
                                ctx.strokeStyle = L < 0 ? viz.colors.blue : 'rgba(200,200,200,0.3)';
                                ctx.lineWidth = L === 0 ? 1.5 : 1;
                                ctx.beginPath();
                                var startedContour = false;
                                for (var t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
                                    var x = 1 + r * Math.cos(t);
                                    var y = r * Math.sin(t);
                                    // Check if inside triangle: x >= 0, y >= 0, x + y <= 4
                                    if (x < -0.05 || y < -0.05 || x + y > 4.05) {
                                        startedContour = false;
                                        continue;
                                    }
                                    var px = ox + x * sc;
                                    var py = oy - y * sc;
                                    if (!startedContour) {
                                        ctx.moveTo(px, py);
                                        startedContour = true;
                                    } else {
                                        ctx.lineTo(px, py);
                                    }
                                }
                                ctx.stroke();
                            }

                            // Mark absolute min (1,0) -> f = -1
                            viz.drawPoint((1 * sc + ox - viz.originX) / sc, 0, viz.colors.blue, '', 7);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Min: (1,0), f = -1', ox + 1 * sc + 10, oy - 10);

                            // Mark absolute max (0,4) -> f = 16
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(ox, oy - 4 * sc, 7, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Max: (0,4), f = 16', ox + 8, oy - 4 * sc - 10);

                            // Labels for vertices
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillText('(0,0)', ox + 4, oy + 15);
                            ctx.fillText('(4,0)', ox + 4 * sc - 5, oy + 15);
                            ctx.fillText('(0,4)', ox + 4, oy - 4 * sc + 18);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'abs-ex1',
                    type: 'short-answer',
                    question: 'Find the absolute maximum and minimum of f(x,y) = x^2 + y^2 on the closed disk x^2 + y^2 <= 4.',
                    hint: 'Look for interior critical points. Then check the boundary x^2 + y^2 = 4, where f is constant.',
                    solution: 'The only interior critical point is (0,0) where f = 0. On the boundary x^2 + y^2 = 4, f = 4 everywhere. Thus the absolute minimum is 0 at the origin and the absolute maximum is 4 on the entire boundary circle.'
                },
                {
                    id: 'abs-ex2',
                    type: 'short-answer',
                    question: 'Find the absolute extrema of f(x,y) = 2x + 3y on the rectangle [0,2] x [0,3].',
                    hint: 'For a linear function, are there any interior critical points? Where must the extrema occur?',
                    solution: 'A linear function has no critical points (the gradient (2, 3) is never zero), so the extrema must occur on the boundary. In fact, for a linear function on a polygon, the extrema occur at vertices. f(0,0) = 0, f(2,0) = 4, f(0,3) = 9, f(2,3) = 13. Absolute min = 0 at (0,0), absolute max = 13 at (2,3).'
                },
                {
                    id: 'abs-ex3',
                    type: 'short-answer',
                    question: 'Find the absolute extrema of f(x,y) = xy on the region bounded by x^2 + y^2 = 1 in the first quadrant (x >= 0, y >= 0).',
                    hint: 'Check the interior, then the circular arc, then the two straight segments on the axes. On the arc, write x = cos(t), y = sin(t) and maximize sin(t)cos(t).',
                    solution: 'Interior: f_x = y = 0 and f_y = x = 0 gives (0,0), where f = 0. On x-axis (y=0): f = 0. On y-axis (x=0): f = 0. On the arc: f = cos(t)sin(t) = sin(2t)/2, max at t = pi/4 giving f = 1/2 at (1/sqrt(2), 1/sqrt(2)). Absolute min = 0 (along axes). Absolute max = 1/2 at (1/sqrt(2), 1/sqrt(2)).'
                }
            ]
        },

        // ===== SECTION 4: Lagrange Multipliers =====
        {
            id: 'lagrange-multipliers',
            title: 'Lagrange Multipliers',
            content: `
<h2>4 &middot; Lagrange Multipliers</h2>

<p>
We now turn to one of the most elegant ideas in optimization: how to find extrema of a function subject to a <strong>constraint</strong>.
</p>

<div class="env-block definition">
<div class="env-label">Problem &mdash; Constrained Optimization</div>
<strong>Optimize</strong> \\(f(\\mathbf{x})\\) subject to the constraint \\(g(\\mathbf{x}) = c\\).
<br><br>
Geometrically: find the highest or lowest value of \\(f\\) among all points that lie on the level set \\(g(\\mathbf{x}) = c\\).
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Lagrange Multipliers</div>
Let \\(f, g : \\mathbb{R}^n \\to \\mathbb{R}\\) be continuously differentiable. If \\(f\\) has a local extremum at \\(\\mathbf{a}\\) subject to the constraint \\(g(\\mathbf{x}) = c\\) and \\(\\nabla g(\\mathbf{a}) \\neq \\mathbf{0}\\), then there exists a scalar \\(\\lambda\\) (the <strong>Lagrange multiplier</strong>) such that
\\[\\nabla f(\\mathbf{a}) = \\lambda \\, \\nabla g(\\mathbf{a}).\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Gradients Must Be Parallel</div>
At a constrained extremum, the level curve of \\(f\\) is <strong>tangent</strong> to the constraint curve \\(g = c\\). If they crossed transversely, you could move along the constraint to increase (or decrease) \\(f\\), contradicting the extremum.
<br><br>
Since the gradient is perpendicular to level curves, &ldquo;tangent level curves&rdquo; means &ldquo;parallel gradients,&rdquo; i.e., \\(\\nabla f = \\lambda \\nabla g\\) for some scalar \\(\\lambda\\).
</div>

<div class="env-block definition">
<div class="env-label">Method &mdash; Lagrange Multiplier Procedure</div>
<ol>
<li>Form the system of equations:
\\[\\nabla f = \\lambda \\nabla g \\quad \\text{and} \\quad g(\\mathbf{x}) = c.\\]
In two variables this gives three equations in three unknowns \\((x, y, \\lambda)\\).</li>
<li>Solve for all candidate points \\((x, y)\\) and their associated \\(\\lambda\\) values.</li>
<li>Evaluate \\(f\\) at each candidate. The largest value is the constrained maximum; the smallest is the constrained minimum.</li>
</ol>
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; The Lagrangian</div>
Equivalently, define the <strong>Lagrangian</strong>
\\[\\mathcal{L}(\\mathbf{x}, \\lambda) = f(\\mathbf{x}) - \\lambda\\bigl(g(\\mathbf{x}) - c\\bigr).\\]
The Lagrange conditions are precisely the requirement that all partial derivatives of \\(\\mathcal{L}\\) vanish: \\(\\nabla_{\\mathbf{x}} \\mathcal{L} = \\mathbf{0}\\) and \\(\\frac{\\partial \\mathcal{L}}{\\partial \\lambda} = 0\\).
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Multiple Constraints</div>
To optimize \\(f(\\mathbf{x})\\) subject to \\(g_1(\\mathbf{x}) = c_1, \\ldots, g_k(\\mathbf{x}) = c_k\\), there exist multipliers \\(\\lambda_1, \\ldots, \\lambda_k\\) such that
\\[\\nabla f = \\lambda_1 \\nabla g_1 + \\cdots + \\lambda_k \\nabla g_k\\]
at each constrained extremum (provided the gradients \\(\\nabla g_i\\) are linearly independent at that point).
</div>

<div class="viz-container" data-viz="lagrange-contour">
<div class="viz-canvas" id="lagrange-contour"></div>
<div class="viz-controls" id="lagrange-contour-controls"></div>
<div class="viz-caption">Blue curves are level sets of \\(f(x,y) = x^2 + y^2\\). The red curve is the constraint \\(g(x,y) = c\\). At the tangency point (yellow dot), \\(\\nabla f\\) and \\(\\nabla g\\) are parallel.</div>
</div>
`,
            visualizations: [
                {
                    id: 'lagrange-contour',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 35 });

                        // f(x,y) = x^2 + y^2, constraint: ax + by = c (a line)
                        var ca = 1, cb = 1, cc = 3;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var sc = viz.scale;

                            // Draw contours of f = x^2 + y^2 (circles)
                            var flevels = [1, 2, 3, 4, 5, 7, 9, 12, 16];
                            for (var li = 0; li < flevels.length; li++) {
                                var r = Math.sqrt(flevels[li]);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, r * sc, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }

                            // Draw constraint line: ca*x + cb*y = cc
                            // y = (cc - ca*x) / cb (if cb != 0)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            if (Math.abs(cb) > 0.01) {
                                var x1 = -8, y1 = (cc - ca * x1) / cb;
                                var x2 = 8, y2 = (cc - ca * x2) / cb;
                                ctx.moveTo(viz.originX + x1 * sc, viz.originY - y1 * sc);
                                ctx.lineTo(viz.originX + x2 * sc, viz.originY - y2 * sc);
                            } else {
                                var xv = cc / ca;
                                ctx.moveTo(viz.originX + xv * sc, 0);
                                ctx.lineTo(viz.originX + xv * sc, h);
                            }
                            ctx.stroke();

                            // Find closest point on line to origin: minimizes x^2 + y^2 s.t. ax+by=c
                            // Solution: x = ac/(a^2+b^2), y = bc/(a^2+b^2)
                            var denom = ca * ca + cb * cb;
                            if (denom > 0.001) {
                                var xopt = ca * cc / denom;
                                var yopt = cb * cc / denom;
                                var fopt = xopt * xopt + yopt * yopt;

                                // Mark optimal point
                                viz.drawPoint(xopt, yopt, viz.colors.yellow, '', 7);

                                // Draw gradient of f at optimal: (2x, 2y) -> direction from origin
                                var gfx = 2 * xopt, gfy = 2 * yopt;
                                var gfLen = Math.sqrt(gfx * gfx + gfy * gfy);
                                if (gfLen > 0.01) {
                                    var arrowLen = 1.5;
                                    var ux = gfx / gfLen * arrowLen, uy = gfy / gfLen * arrowLen;
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.originX + xopt * sc, viz.originY - yopt * sc);
                                    ctx.lineTo(viz.originX + (xopt + ux) * sc, viz.originY - (yopt + uy) * sc);
                                    ctx.stroke();
                                    // arrowhead
                                    var ax1 = xopt + ux, ay1 = yopt + uy;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + ax1 * sc, viz.originY - ay1 * sc, 4, 0, 2 * Math.PI);
                                    ctx.fill();
                                }

                                // Draw gradient of g at optimal: (a, b) direction
                                var ggLen = Math.sqrt(ca * ca + cb * cb);
                                if (ggLen > 0.01) {
                                    var arrowLen2 = 1.5;
                                    var vx = ca / ggLen * arrowLen2, vy = cb / ggLen * arrowLen2;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.originX + xopt * sc, viz.originY - yopt * sc);
                                    ctx.lineTo(viz.originX + (xopt + vx) * sc, viz.originY - (yopt + vy) * sc);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + (xopt + vx) * sc, viz.originY - (yopt + vy) * sc, 4, 0, 2 * Math.PI);
                                    ctx.fill();
                                }

                                // Labels
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Min f = ' + fopt.toFixed(2) + ' at (' + xopt.toFixed(2) + ', ' + yopt.toFixed(2) + ')', 12, 20);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('\u2207f (blue arrow)', 12, 38);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('\u2207g (orange arrow)', 12, 54);

                                // Show lambda
                                var lambda = fopt > 0.001 ? (2 * cc / denom) : 0;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('\u03BB = ' + lambda.toFixed(3), 12, 72);
                            }
                        }

                        VizEngine.createSlider(controls, 'a (constraint)', -3, 3, ca, 0.1, function(v) { ca = v; draw(); });
                        VizEngine.createSlider(controls, 'b (constraint)', -3, 3, cb, 0.1, function(v) { cb = v; draw(); });
                        VizEngine.createSlider(controls, 'c (constraint)', 0.5, 6, cc, 0.1, function(v) { cc = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'lagr-ex1',
                    type: 'short-answer',
                    question: 'Use Lagrange multipliers to find the point on the line 2x + y = 5 closest to the origin.',
                    hint: 'Minimize f(x,y) = x^2 + y^2 subject to g(x,y) = 2x + y = 5. Set up the system (2x, 2y) = lambda(2, 1) and 2x + y = 5.',
                    solution: 'From 2x = 2*lambda: x = lambda. From 2y = lambda: y = lambda/2. Substituting into constraint: 2*lambda + lambda/2 = 5, so 5*lambda/2 = 5, lambda = 2. Thus x = 2, y = 1. The closest point is (2, 1) with distance sqrt(5).'
                },
                {
                    id: 'lagr-ex2',
                    type: 'short-answer',
                    question: 'Find the maximum and minimum values of f(x,y) = 3x + 4y on the circle x^2 + y^2 = 1.',
                    hint: 'Set (3, 4) = lambda(2x, 2y) and x^2 + y^2 = 1.',
                    solution: 'From the Lagrange equations: 3 = 2*lambda*x and 4 = 2*lambda*y. So x = 3/(2*lambda) and y = 4/(2*lambda) = 2/lambda. Substituting into the constraint: 9/(4*lambda^2) + 4/lambda^2 = 1, so 25/(4*lambda^2) = 1, lambda^2 = 25/4, lambda = +/- 5/2. For lambda = 5/2: (x,y) = (3/5, 4/5), f = 9/5 + 16/5 = 5. For lambda = -5/2: (x,y) = (-3/5, -4/5), f = -5. Max = 5, Min = -5.'
                },
                {
                    id: 'lagr-ex3',
                    type: 'short-answer',
                    question: 'Use Lagrange multipliers to find the dimensions of the rectangular box of maximum volume with surface area 6a^2.',
                    hint: 'Maximize V = xyz subject to 2(xy + yz + xz) = 6a^2. By symmetry, expect x = y = z. Set up the Lagrange equations and verify.',
                    solution: 'Maximize f = xyz subject to g = 2(xy + yz + xz) = 6a^2. The Lagrange equations: yz = lambda*2(y+z), xz = lambda*2(x+z), xy = lambda*2(x+y). Dividing the first by the second: y/x = (y+z)/(x+z). Cross-multiplying: xy + yz = xy + xz, so yz = xz, meaning y = z (assuming z > 0). Similarly x = y. So x = y = z. From the constraint: 6x^2 = 6a^2, so x = a. The box is a cube with side a and volume a^3.'
                }
            ]
        },

        // ===== SECTION 5: Constrained Optimization Examples =====
        {
            id: 'constrained-examples',
            title: 'Constrained Examples',
            content: `
<h2>5 &middot; Constrained Optimization Examples</h2>

<p>
In this section we work through several complete examples to illustrate the variety of constrained optimization problems.
</p>

<div class="env-block example">
<div class="env-label">Example 1 &mdash; Ellipse Constraint</div>
<strong>Problem:</strong> Find the extrema of \\(f(x,y) = xy\\) on the ellipse \\(\\frac{x^2}{4} + y^2 = 1\\).
<br><br>
<strong>Solution:</strong> Set \\(g(x,y) = \\frac{x^2}{4} + y^2\\). Lagrange conditions:
\\[y = \\lambda \\cdot \\frac{x}{2}, \\quad x = 2\\lambda y, \\quad \\frac{x^2}{4} + y^2 = 1.\\]
From the first two: \\(y = \\frac{\\lambda x}{2}\\) and \\(x = 2\\lambda y = 2\\lambda \\cdot \\frac{\\lambda x}{2} = \\lambda^2 x\\). So \\(\\lambda^2 = 1\\), giving \\(\\lambda = \\pm 1\\).
<br><br>
If \\(\\lambda = 1\\): \\(y = x/2\\). Constraint: \\(x^2/4 + x^2/4 = 1\\), so \\(x = \\pm\\sqrt{2}\\). Points: \\((\\sqrt{2}, \\frac{\\sqrt{2}}{2})\\) and \\((-\\sqrt{2}, -\\frac{\\sqrt{2}}{2})\\) with \\(f = 1\\).
<br><br>
If \\(\\lambda = -1\\): \\(y = -x/2\\). Points: \\((\\sqrt{2}, -\\frac{\\sqrt{2}}{2})\\) and \\((-\\sqrt{2}, \\frac{\\sqrt{2}}{2})\\) with \\(f = -1\\).
<br><br>
<strong>Answer:</strong> Max of \\(f = 1\\), min of \\(f = -1\\).
</div>

<div class="env-block example">
<div class="env-label">Example 2 &mdash; Distance from a Point to a Curve</div>
<strong>Problem:</strong> Find the point on the parabola \\(y = x^2\\) closest to \\((0, 1)\\).
<br><br>
<strong>Solution:</strong> Minimize \\(f(x,y) = x^2 + (y-1)^2\\) subject to \\(g(x,y) = y - x^2 = 0\\).
\\[2x = -2\\lambda x, \\quad 2(y-1) = \\lambda, \\quad y = x^2.\\]
From the first equation: \\(2x(1 + \\lambda) = 0\\), so \\(x = 0\\) or \\(\\lambda = -1\\).
<br><br>
<strong>Case 1:</strong> \\(x = 0 \\Rightarrow y = 0 \\Rightarrow f = 1\\).
<br><br>
<strong>Case 2:</strong> \\(\\lambda = -1 \\Rightarrow 2(y-1) = -1 \\Rightarrow y = 1/2 \\Rightarrow x^2 = 1/2 \\Rightarrow x = \\pm \\frac{1}{\\sqrt{2}}\\). Here \\(f = 1/2 + 1/4 = 3/4\\).
<br><br>
<strong>Answer:</strong> The closest points are \\(\\bigl(\\pm\\frac{1}{\\sqrt{2}}, \\frac{1}{2}\\bigr)\\) at distance \\(\\frac{\\sqrt{3}}{2}\\).
</div>

<div class="env-block example">
<div class="env-label">Example 3 &mdash; Two Constraints</div>
<strong>Problem:</strong> Find the extrema of \\(f(x,y,z) = x + y + z\\) on the curve defined by \\(x^2 + y^2 + z^2 = 1\\) and \\(x + y + z = 0\\).
<br><br>
Wait &mdash; the constraint \\(x + y + z = 0\\) means \\(f = 0\\) everywhere on the feasible set! So \\(f\\) is constant (equal to 0) subject to these constraints. This is a degenerate case.
<br><br>
Instead, let us find the extrema of \\(f(x,y,z) = z\\) subject to \\(x^2 + y^2 + z^2 = 1\\) and \\(x + y = 0\\).
<br><br>
<strong>Solution:</strong> Lagrange equations: \\(0 = 2\\lambda x + \\mu\\), \\(0 = 2\\lambda y + \\mu\\), \\(1 = 2\\lambda z\\).
<br><br>
From the first two: \\(2\\lambda x + \\mu = 2\\lambda y + \\mu\\), so \\(x = y\\) (assuming \\(\\lambda \\neq 0\\)). Combined with \\(x + y = 0\\): \\(x = y = 0\\). Then \\(z^2 = 1\\), so \\(z = \\pm 1\\).
<br><br>
<strong>Answer:</strong> Max \\(z = 1\\) at \\((0,0,1)\\), min \\(z = -1\\) at \\((0,0,-1)\\).
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Interpreting \\(\\lambda\\)</div>
The multiplier \\(\\lambda\\) has a concrete meaning: it measures the <strong>sensitivity</strong> of the optimal value to the constraint. If the constraint is \\(g(\\mathbf{x}) = c\\) and we let \\(M(c)\\) denote the optimal value of \\(f\\), then
\\[\\frac{dM}{dc} = \\lambda.\\]
This is fundamental in economics (shadow prices), engineering (sensitivity analysis), and machine learning (KKT conditions for inequality constraints).
</div>

<div class="env-block warning">
<div class="env-label">Warning &mdash; Checking \\(\\nabla g \\neq \\mathbf{0}\\)</div>
The Lagrange multiplier theorem requires \\(\\nabla g \\neq \\mathbf{0}\\) at the extremum (this is the <strong>constraint qualification</strong>). If \\(\\nabla g = \\mathbf{0}\\) at a feasible point, that point must be checked separately &mdash; it is a singular point of the constraint set.
</div>

<div class="viz-container" data-viz="constrained-ellipse">
<div class="viz-canvas" id="constrained-ellipse"></div>
<div class="viz-controls" id="constrained-ellipse-controls"></div>
<div class="viz-caption">Level curves of \\(f(x,y) = xy\\) (hyperbolas) and an ellipse constraint. Drag the eccentricity slider to change the shape of the ellipse and observe how the tangency points (optimal solutions) move.</div>
</div>
`,
            visualizations: [
                {
                    id: 'constrained-ellipse',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50 });

                        var aa = 2; // semi-axis in x

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var sc = viz.scale;
                            var ox = viz.originX, oy = viz.originY;
                            var bb = 1; // semi-axis in y fixed at 1

                            // Draw level curves of f = xy (hyperbolas: xy = k)
                            var kvals = [-2, -1, -0.5, 0.5, 1, 2];
                            for (var ki = 0; ki < kvals.length; ki++) {
                                var k = kvals[ki];
                                ctx.strokeStyle = k > 0 ? 'rgba(100,200,100,0.4)' : 'rgba(200,100,100,0.4)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started1 = false, started2 = false;
                                for (var x = 0.05; x < 5; x += 0.03) {
                                    var y = k / x;
                                    var px = ox + x * sc, py = oy - y * sc;
                                    if (py > 0 && py < viz.height && px < viz.width) {
                                        if (!started1) { ctx.moveTo(px, py); started1 = true; }
                                        else ctx.lineTo(px, py);
                                    }
                                }
                                ctx.stroke();
                                ctx.beginPath();
                                started2 = false;
                                for (var x2 = -5; x2 < -0.05; x2 += 0.03) {
                                    var y2 = k / x2;
                                    var px2 = ox + x2 * sc, py2 = oy - y2 * sc;
                                    if (py2 > 0 && py2 < viz.height && px2 > 0) {
                                        if (!started2) { ctx.moveTo(px2, py2); started2 = true; }
                                        else ctx.lineTo(px2, py2);
                                    }
                                }
                                ctx.stroke();
                            }

                            // Draw ellipse x^2/aa^2 + y^2 = 1
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var t = 0; t <= 2 * Math.PI + 0.01; t += 0.02) {
                                var ex = aa * Math.cos(t);
                                var ey = bb * Math.sin(t);
                                var epx = ox + ex * sc;
                                var epy = oy - ey * sc;
                                if (t === 0) ctx.moveTo(epx, epy);
                                else ctx.lineTo(epx, epy);
                            }
                            ctx.stroke();

                            // Optimal points: xy max/min on x^2/a^2 + y^2 = 1
                            // From Lagrange: x = a/sqrt(2), y = 1/sqrt(2) (and reflections)
                            var xopt = aa / Math.sqrt(2);
                            var yopt = bb / Math.sqrt(2);
                            var fmax = xopt * yopt;

                            var pts = [
                                [xopt, yopt], [-xopt, -yopt],
                                [xopt, -yopt], [-xopt, yopt]
                            ];

                            for (var pi = 0; pi < 4; pi++) {
                                var col = pi < 2 ? viz.colors.green : viz.colors.red;
                                viz.drawPoint(pts[pi][0], pts[pi][1], col, '', 6);
                            }

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Ellipse: x\u00B2/' + aa.toFixed(1) + '\u00B2 + y\u00B2 = 1', 12, 20);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Max f = xy = ' + fmax.toFixed(3) + ' (green)', 12, 38);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Min f = xy = ' + (-fmax).toFixed(3) + ' (red)', 12, 56);
                        }

                        VizEngine.createSlider(controls, 'Semi-axis a', 0.5, 4, aa, 0.1, function(v) { aa = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'const-ex1',
                    type: 'short-answer',
                    question: 'Find the maximum and minimum of f(x,y) = x^2 + 2y^2 on the circle x^2 + y^2 = 1.',
                    hint: 'Set up Lagrange equations: (2x, 4y) = lambda(2x, 2y). Consider the cases x = 0 and x != 0 separately.',
                    solution: 'From 2x = 2*lambda*x: either x = 0 or lambda = 1. Case 1: x = 0, then y^2 = 1, y = +/- 1, f = 2. Case 2: lambda = 1, from 4y = 2y: 2y = 0, so y = 0, x^2 = 1, x = +/- 1, f = 1. Minimum = 1 at (+/-1, 0). Maximum = 2 at (0, +/-1).'
                },
                {
                    id: 'const-ex2',
                    type: 'short-answer',
                    question: 'A rectangular box with no lid has surface area 12. Find the dimensions that maximize the volume.',
                    hint: 'Let the box have base x by y and height z. The surface area (no lid) is xy + 2xz + 2yz = 12. Maximize V = xyz. Use symmetry: the base should be square.',
                    solution: 'By symmetry, x = y. Constraint becomes x^2 + 4xz = 12. Lagrange or substitution: z = (12 - x^2)/(4x). Then V = x^2 * (12 - x^2)/(4x) = x(12 - x^2)/4 = (12x - x^3)/4. dV/dx = (12 - 3x^2)/4 = 0 gives x = 2. Then z = (12 - 4)/8 = 1. Dimensions: 2 x 2 x 1, V = 4.'
                },
                {
                    id: 'const-ex3',
                    type: 'short-answer',
                    question: 'Use Lagrange multipliers to find the shortest distance from the point (1, 0) to the parabola y^2 = 4x.',
                    hint: 'Minimize f(x,y) = (x-1)^2 + y^2 subject to g(x,y) = y^2 - 4x = 0.',
                    solution: 'Lagrange equations: 2(x-1) = -4*lambda, 2y = 2*lambda*y, y^2 = 4x. From the second: 2y(1 - lambda) = 0, so y = 0 or lambda = 1. If y = 0: x = 0, f = 1. If lambda = 1: 2(x-1) = -4, x = -1, y^2 = -4 which is impossible. So the only candidate is (0, 0) with distance 1. But we should also check: from lambda = 1 being invalid, the minimum distance is 1 at (0, 0).'
                },
                {
                    id: 'const-ex4',
                    type: 'short-answer',
                    question: 'Find the maximum of f(x,y,z) = xyz subject to x + y + z = 3 and x, y, z > 0.',
                    hint: 'By AM-GM or Lagrange multipliers, the maximum of a symmetric function under a symmetric constraint occurs when all variables are equal.',
                    solution: 'Lagrange: yz = lambda, xz = lambda, xy = lambda. From the first two: yz = xz, so y = x (z > 0). Similarly x = z. So x = y = z. From x + y + z = 3: x = 1. Maximum f = 1*1*1 = 1. Alternatively by AM-GM: xyz <= ((x+y+z)/3)^3 = 1, with equality when x = y = z = 1.'
                }
            ]
        }
    ]
});
