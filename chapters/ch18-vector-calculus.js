window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Vector Calculus',
    subtitle: 'Vector fields, line integrals, and the classical theorems of Green, Stokes, and Gauss that unify multivariable calculus',
    sections: [
        // ===== SECTION 1: Vector Fields =====
        {
            id: 'vector-fields',
            title: 'Vector Fields',
            content: `
<h2>1 &middot; Vector Fields</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Vector Field</div>
A <strong>vector field</strong> on a region \\(D \\subseteq \\mathbb{R}^2\\) is a function
\\[\\mathbf{F}(x,y) = P(x,y)\\,\\mathbf{i} + Q(x,y)\\,\\mathbf{j}\\]
that assigns a vector to every point \\((x,y)\\) in \\(D\\). In three dimensions,
\\[\\mathbf{F}(x,y,z) = P\\,\\mathbf{i} + Q\\,\\mathbf{j} + R\\,\\mathbf{k}.\\]
</div>

<p>
Vector fields are everywhere in science: velocity fields in fluid flow, gravitational fields, electric fields,
and wind maps. We draw them by placing a small arrow at each sample point whose direction and length encode
the vector at that location.
</p>

<div class="env-block example">
<div class="env-label">Example &mdash; Common Vector Fields</div>
<ul>
<li><strong>Rotation:</strong> \\(\\mathbf{F}(x,y) = -y\\,\\mathbf{i} + x\\,\\mathbf{j}\\). Every vector is tangent to a circle centred at the origin.</li>
<li><strong>Radial (source):</strong> \\(\\mathbf{F}(x,y) = x\\,\\mathbf{i} + y\\,\\mathbf{j}\\). Vectors point away from the origin and grow with distance.</li>
<li><strong>Gradient field:</strong> If \\(f(x,y) = x^2 + y^2\\), then \\(\\nabla f = 2x\\,\\mathbf{i} + 2y\\,\\mathbf{j}\\), which is the radial field scaled by 2.</li>
</ul>
</div>

<div class="viz-container" data-viz="vector-field-gallery">
<div class="viz-canvas" id="vector-field-gallery"></div>
<div class="viz-controls" id="vector-field-gallery-controls"></div>
<div class="viz-caption">Select a preset vector field or adjust components to explore the flow pattern.</div>
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Conservative (Gradient) Field</div>
A vector field \\(\\mathbf{F}\\) is <strong>conservative</strong> (or a <strong>gradient field</strong>) if there exists a scalar function \\(f\\) such that
\\[\\mathbf{F} = \\nabla f = \\frac{\\partial f}{\\partial x}\\,\\mathbf{i} + \\frac{\\partial f}{\\partial y}\\,\\mathbf{j}.\\]
The function \\(f\\) is called a <strong>potential function</strong> for \\(\\mathbf{F}\\).
</div>

<div class="env-block theorem">
<div class="env-label">Test for Conservativeness (2D)</div>
Let \\(\\mathbf{F} = P\\,\\mathbf{i} + Q\\,\\mathbf{j}\\) be defined on a simply connected region with continuously differentiable components. Then \\(\\mathbf{F}\\) is conservative if and only if
\\[\\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}.\\]
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Checking Conservativeness</div>
Consider \\(\\mathbf{F}(x,y) = (2xy + 3)\\,\\mathbf{i} + (x^2 - 4y)\\,\\mathbf{j}\\).
Here \\(P = 2xy + 3\\) and \\(Q = x^2 - 4y\\). We check:
\\[\\frac{\\partial P}{\\partial y} = 2x, \\quad \\frac{\\partial Q}{\\partial x} = 2x.\\]
Since they are equal, the field is conservative. A potential function is \\(f(x,y) = x^2 y + 3x - 2y^2 + C\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning</div>
The cross-partial test requires the region to be <strong>simply connected</strong> (no holes). The classic counterexample
is \\(\\mathbf{F} = \\frac{-y}{x^2+y^2}\\,\\mathbf{i} + \\frac{x}{x^2+y^2}\\,\\mathbf{j}\\), which satisfies \\(\\partial P/\\partial y = \\partial Q/\\partial x\\) everywhere except the origin, yet is <em>not</em> conservative on \\(\\mathbb{R}^2 \\setminus \\{\\mathbf{0}\\}\\).
</div>
`,
            visualizations: [
                {
                    id: 'vector-field-gallery',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });

                        var presets = [
                            { name: 'Rotation', fx: function(x,y){return -y;}, fy: function(x,y){return x;} },
                            { name: 'Source', fx: function(x,y){return x;}, fy: function(x,y){return y;} },
                            { name: 'Sink', fx: function(x,y){return -x;}, fy: function(x,y){return -y;} },
                            { name: 'Saddle', fx: function(x,y){return x;}, fy: function(x,y){return -y;} },
                            { name: 'Shear', fx: function(x,y){return y;}, fy: function(x,y){return 0;} },
                            { name: 'Spiral', fx: function(x,y){return -y - 0.3*x;}, fy: function(x,y){return x - 0.3*y;} }
                        ];

                        var current = 0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var p = presets[current];
                            viz.drawVectorField(p.fx, p.fy, -6, 6, -4, 4, 14, 10);
                            viz.ctx.fillStyle = viz.colors.white;
                            viz.ctx.font = 'bold 14px -apple-system, sans-serif';
                            viz.ctx.textAlign = 'left';
                            viz.ctx.fillText(p.name + ' field', 12, 22);
                        }

                        presets.forEach(function(p, i) {
                            VizEngine.createButton(controls, p.name, function() { current = i; draw(); });
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'vf-ex1',
                    type: 'short-answer',
                    question: 'Is the vector field F(x,y) = (y^2)i + (2xy + 1)j conservative? If so, find a potential function.',
                    hint: 'Check whether dP/dy equals dQ/dx. If yes, integrate P with respect to x, then determine the constant-of-integration function using Q.',
                    solution: 'P = y^2, Q = 2xy + 1. dP/dy = 2y, dQ/dx = 2y. They are equal, so F is conservative. Integrating P with respect to x: f = xy^2 + g(y). Then df/dy = 2xy + g\'(y) = 2xy + 1, so g\'(y) = 1, g(y) = y + C. A potential function is f(x,y) = xy^2 + y + C.'
                },
                {
                    id: 'vf-ex2',
                    type: 'short-answer',
                    question: 'Sketch or describe the vector field F(x,y) = -xi + yj. What type of flow pattern does it represent?',
                    hint: 'Think about which direction each vector points: leftward when x > 0, rightward when x < 0, upward when y > 0, downward when y < 0.',
                    solution: 'This is a saddle-type flow. Vectors point inward along the x-axis (compressing toward the y-axis) and outward along the y-axis (expanding away from the x-axis). The flow pattern resembles a hyperbolic saddle with attraction along x and repulsion along y.'
                },
                {
                    id: 'vf-ex3',
                    type: 'short-answer',
                    question: 'Show that F(x,y) = (e^x sin y)i + (e^x cos y)j is conservative and find the potential function.',
                    hint: 'Check the cross-partial condition and then integrate.',
                    solution: 'P = e^x sin y, Q = e^x cos y. dP/dy = e^x cos y, dQ/dx = e^x cos y. Equal, so conservative. Integrate P w.r.t. x: f = e^x sin y + g(y). Then df/dy = e^x cos y + g\'(y) = e^x cos y, so g\'(y) = 0, g(y) = C. Potential function: f(x,y) = e^x sin y + C.'
                }
            ]
        },

        // ===== SECTION 2: Line Integrals =====
        {
            id: 'line-integrals',
            title: 'Line Integrals',
            content: `
<h2>2 &middot; Line Integrals</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Line Integral of a Scalar Function</div>
Let \\(f\\) be continuous on a smooth curve \\(C\\) parametrised by \\(\\mathbf{r}(t) = (x(t), y(t))\\) for \\(a \\le t \\le b\\). The <strong>line integral</strong> of \\(f\\) along \\(C\\) is
\\[\\int_C f\\,ds = \\int_a^b f\\bigl(\\mathbf{r}(t)\\bigr)\\,\\|\\mathbf{r}'(t)\\|\\,dt,\\]
where \\(ds = \\|\\mathbf{r}'(t)\\|\\,dt\\) is the arc-length element.
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Line Integral of a Vector Field</div>
Let \\(\\mathbf{F}\\) be a continuous vector field along a smooth curve \\(C\\) parametrised by \\(\\mathbf{r}(t)\\). The <strong>line integral of \\(\\mathbf{F}\\) along \\(C\\)</strong> is
\\[\\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_a^b \\mathbf{F}\\bigl(\\mathbf{r}(t)\\bigr) \\cdot \\mathbf{r}'(t)\\,dt.\\]
This measures the <strong>work done</strong> by the force field \\(\\mathbf{F}\\) along the path \\(C\\).
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Work Along a Path</div>
Imagine walking along a curve in a wind field. At each instant you decompose the wind into a component along your direction of travel (which pushes you forward or holds you back) and a cross-wind component (which does no work). The line integral sums up the along-path component over the entire walk.
</div>

<div class="viz-container" data-viz="line-integral-work">
<div class="viz-canvas" id="line-integral-work"></div>
<div class="viz-controls" id="line-integral-work-controls"></div>
<div class="viz-caption">The blue curve is the path C. Arrows show the vector field. The running total of work is displayed as the particle traverses the path.</div>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Computing a Line Integral</div>
Evaluate \\(\\int_C \\mathbf{F} \\cdot d\\mathbf{r}\\) where \\(\\mathbf{F}(x,y) = y\\,\\mathbf{i} + x\\,\\mathbf{j}\\) and \\(C\\) is the line segment from \\((0,0)\\) to \\((1,2)\\).
<br><br>
<strong>Solution.</strong> Parametrise: \\(\\mathbf{r}(t) = (t, 2t)\\), \\(0 \\le t \\le 1\\), so \\(\\mathbf{r}'(t) = (1, 2)\\).
Then \\(\\mathbf{F}(\\mathbf{r}(t)) = (2t, t)\\) and
\\[\\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_0^1 (2t)(1) + (t)(2)\\,dt = \\int_0^1 4t\\,dt = 2.\\]
</div>

<div class="env-block theorem">
<div class="env-label">Fundamental Theorem for Line Integrals</div>
If \\(\\mathbf{F} = \\nabla f\\) is conservative, then for any smooth curve \\(C\\) from point \\(A\\) to point \\(B\\),
\\[\\int_C \\mathbf{F} \\cdot d\\mathbf{r} = f(B) - f(A).\\]
In particular, the integral depends only on the endpoints, not the path.
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Path Independence</div>
A vector field is conservative if and only if its line integral is path-independent. Equivalently, \\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0\\) for every closed curve \\(C\\).
</div>
`,
            visualizations: [
                {
                    id: 'line-integral-work',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50 });

                        var pathType = 0;
                        var tParam = 1.0;

                        function fieldFx(x, y) { return -y * 0.5; }
                        function fieldFy(x, y) { return x * 0.5; }

                        var paths = [
                            {
                                name: 'Line',
                                rx: function(t) { return -3 + 6 * t; },
                                ry: function(t) { return -2 + 4 * t; },
                                drx: function() { return 6; },
                                dry: function() { return 4; }
                            },
                            {
                                name: 'Parabola',
                                rx: function(t) { return -3 + 6 * t; },
                                ry: function(t) { var x = -3 + 6 * t; return 0.3 * x * x - 2; },
                                drx: function() { return 6; },
                                dry: function(t) { var x = -3 + 6 * t; return 0.6 * x * 6; }
                            },
                            {
                                name: 'Circle',
                                rx: function(t) { return 2.5 * Math.cos(2 * Math.PI * t); },
                                ry: function(t) { return 2.5 * Math.sin(2 * Math.PI * t); },
                                drx: function(t) { return -2.5 * 2 * Math.PI * Math.sin(2 * Math.PI * t); },
                                dry: function(t) { return 2.5 * 2 * Math.PI * Math.cos(2 * Math.PI * t); }
                            }
                        ];

                        function computeWork(T) {
                            var steps = 200;
                            var sum = 0;
                            var dt = T / steps;
                            var p = paths[pathType];
                            for (var i = 0; i < steps; i++) {
                                var t = i * dt;
                                var x = p.rx(t), y = p.ry(t);
                                var dxdt = p.drx(t), dydt = p.dry(t);
                                sum += (fieldFx(x, y) * dxdt + fieldFy(x, y) * dydt) * dt;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            viz.drawVectorField(fieldFx, fieldFy, -5, 5, -3.5, 3.5, 12, 8);

                            var p = paths[pathType];
                            var ctx = viz.ctx;

                            // Draw the full curve faintly
                            ctx.strokeStyle = viz.colors.blue + '55';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 200; i++) {
                                var t = i / 200;
                                var sx = viz.toScreen(p.rx(t), p.ry(t));
                                if (!started) { ctx.moveTo(sx[0], sx[1]); started = true; }
                                else ctx.lineTo(sx[0], sx[1]);
                            }
                            ctx.stroke();

                            // Draw traversed portion brightly
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= 200; i++) {
                                var t = i / 200 * tParam;
                                if (t > 1) break;
                                var sx = viz.toScreen(p.rx(t), p.ry(t));
                                if (!started) { ctx.moveTo(sx[0], sx[1]); started = true; }
                                else ctx.lineTo(sx[0], sx[1]);
                            }
                            ctx.stroke();

                            // Draw particle
                            var tt = Math.min(tParam, 1);
                            var px = p.rx(tt), py = p.ry(tt);
                            viz.drawPoint(px, py, viz.colors.orange, null, 6);

                            // Start and end markers
                            viz.drawPoint(p.rx(0), p.ry(0), viz.colors.green, 'Start', 5);
                            if (pathType !== 2) {
                                viz.drawPoint(p.rx(1), p.ry(1), viz.colors.red, 'End', 5);
                            }

                            // Work display
                            var work = computeWork(tt);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Work = ' + work.toFixed(3), 12, 22);
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('Path: ' + p.name, 12, 42);
                        }

                        paths.forEach(function(p, i) {
                            VizEngine.createButton(controls, p.name, function() { pathType = i; draw(); });
                        });
                        VizEngine.createSlider(controls, 'Progress', 0, 1, 1, 0.01, function(v) { tParam = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'li-ex1',
                    type: 'short-answer',
                    question: 'Evaluate the line integral of F(x,y) = (2x)i + (3y)j along the path r(t) = (t, t^2) for 0 <= t <= 1.',
                    hint: 'Compute r\'(t) = (1, 2t), then F(r(t)) dot r\'(t), and integrate from 0 to 1.',
                    solution: 'r\'(t) = (1, 2t). F(r(t)) = (2t, 3t^2). The dot product is 2t(1) + 3t^2(2t) = 2t + 6t^3. Integrating: integral from 0 to 1 of (2t + 6t^3) dt = [t^2 + (3/2)t^4] from 0 to 1 = 1 + 3/2 = 5/2.'
                },
                {
                    id: 'li-ex2',
                    type: 'short-answer',
                    question: 'Let F = (2xy)i + (x^2)j. Use the Fundamental Theorem for Line Integrals to evaluate the integral of F dot dr along any path from (1,0) to (2,3).',
                    hint: 'First find a potential function f such that grad f = F, then apply f(B) - f(A).',
                    solution: 'Since dP/dy = 2x = dQ/dx, F is conservative. Integrating P = 2xy w.r.t. x gives f = x^2 y + g(y). Then df/dy = x^2 + g\'(y) = x^2, so g\'(y) = 0. Thus f(x,y) = x^2 y. By the Fundamental Theorem, the integral = f(2,3) - f(1,0) = 4(3) - 1(0) = 12.'
                },
                {
                    id: 'li-ex3',
                    type: 'short-answer',
                    question: 'Compute the line integral of f(x,y) = xy along the quarter circle r(t) = (cos t, sin t) for 0 <= t <= pi/2. (This is a scalar line integral with respect to arc length.)',
                    hint: 'For a scalar integral, use ds = ||r\'(t)|| dt. Here ||r\'(t)|| = 1 since r traces the unit circle.',
                    solution: 'r\'(t) = (-sin t, cos t), so ||r\'(t)|| = 1. f(r(t)) = cos t sin t = (1/2) sin(2t). The integral = integral from 0 to pi/2 of (1/2) sin(2t) dt = (1/2)[-cos(2t)/2] from 0 to pi/2 = (1/2)(1/2 + 1/2) = 1/2.'
                }
            ]
        },

        // ===== SECTION 3: Green's Theorem =====
        {
            id: 'greens-theorem',
            title: 'Green\'s Theorem',
            content: `
<h2>3 &middot; Green's Theorem</h2>

<div class="env-block theorem">
<div class="env-label">Green's Theorem</div>
Let \\(C\\) be a positively oriented (counterclockwise), piecewise-smooth, simple closed curve bounding a region \\(D\\). If \\(P\\) and \\(Q\\) have continuous partial derivatives on an open region containing \\(D\\), then
\\[\\oint_C P\\,dx + Q\\,dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)dA.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Circulation and Curl</div>
Green's Theorem says that the total circulation of a vector field around a closed curve equals the sum of all the microscopic rotations (curl) inside. Imagine tiny paddle wheels placed at every point of the region. The theorem equates the net spinning of the boundary with the integral of local spinning throughout the interior.
</div>

<div class="viz-container" data-viz="greens-theorem-viz">
<div class="viz-canvas" id="greens-theorem-viz"></div>
<div class="viz-controls" id="greens-theorem-viz-controls"></div>
<div class="viz-caption">The boundary integral (left side of Green's Theorem) equals the double integral of the curl over the interior (right side). Adjust the region to see both sides match.</div>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Verifying Green's Theorem</div>
Evaluate \\(\\oint_C (x^2 - y)\\,dx + (y^2 + x)\\,dy\\) where \\(C\\) is the unit circle traversed counterclockwise.
<br><br>
<strong>Via Green's Theorem:</strong> \\(P = x^2 - y\\), \\(Q = y^2 + x\\). Then
\\[\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} = 1 - (-1) = 2.\\]
So the integral equals \\(\\iint_D 2\\,dA = 2 \\cdot \\text{Area}(D) = 2\\pi\\).
</div>

<div class="env-block theorem">
<div class="env-label">Area via Green's Theorem</div>
The area of a region \\(D\\) bounded by \\(C\\) can be computed as
\\[\\text{Area}(D) = \\frac{1}{2}\\oint_C x\\,dy - y\\,dx.\\]
This formula is widely used in computer graphics and surveying (the <strong>shoelace formula</strong> is its discrete version).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Area of an Ellipse</div>
For the ellipse \\(x = a\\cos t\\), \\(y = b\\sin t\\), \\(0 \\le t \\le 2\\pi\\):
\\[\\text{Area} = \\frac{1}{2}\\oint_C x\\,dy - y\\,dx = \\frac{1}{2}\\int_0^{2\\pi}\\bigl(a\\cos t \\cdot b\\cos t + b\\sin t \\cdot a\\sin t\\bigr)dt = \\frac{ab}{2}\\int_0^{2\\pi}dt = \\pi ab.\\]
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Orientation Matters</div>
The positive orientation for a simple closed curve is counterclockwise&mdash;the region \\(D\\) is to your left as you walk along \\(C\\). Reversing orientation negates the integral. For regions with holes, the outer boundary goes counterclockwise and the inner boundary goes clockwise.
</div>
`,
            visualizations: [
                {
                    id: 'greens-theorem-viz',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50 });

                        var radiusX = 2.5;
                        var radiusY = 2.0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Vector field F = (-y, x) => curl = 2
                            viz.drawVectorField(
                                function(x, y) { return -y; },
                                function(x, y) { return x; },
                                -5, 5, -3.5, 3.5, 12, 8
                            );

                            // Draw filled ellipse region
                            var ctx = viz.ctx;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = 2 * Math.PI * i / 200;
                                var pt = viz.toScreen(radiusX * Math.cos(t), radiusY * Math.sin(t));
                                if (i === 0) ctx.moveTo(pt[0], pt[1]);
                                else ctx.lineTo(pt[0], pt[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.stroke();

                            // Arrow on boundary to show orientation
                            var arrowT = Math.PI / 4;
                            var ax = radiusX * Math.cos(arrowT);
                            var ay = radiusY * Math.sin(arrowT);
                            var tx = -radiusX * Math.sin(arrowT);
                            var ty = radiusY * Math.cos(arrowT);
                            var tlen = Math.sqrt(tx * tx + ty * ty);
                            tx /= tlen; ty /= tlen;
                            var sa = viz.toScreen(ax, ay);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            var angle = Math.atan2(-ty, tx);
                            ctx.moveTo(sa[0] + 10 * Math.cos(angle), sa[1] - 10 * Math.sin(angle));
                            ctx.lineTo(sa[0] + 10 * Math.cos(angle + 2.5), sa[1] - 10 * Math.sin(angle + 2.5));
                            ctx.lineTo(sa[0] + 10 * Math.cos(angle - 2.5), sa[1] - 10 * Math.sin(angle - 2.5));
                            ctx.closePath();
                            ctx.fill();

                            // Compute circulation numerically
                            var circSteps = 1000;
                            var circ = 0;
                            for (var i = 0; i < circSteps; i++) {
                                var t = 2 * Math.PI * i / circSteps;
                                var dt = 2 * Math.PI / circSteps;
                                var x = radiusX * Math.cos(t);
                                var y = radiusY * Math.sin(t);
                                var dxdt = -radiusX * Math.sin(t);
                                var dydt = radiusY * Math.cos(t);
                                circ += (-y * dxdt + x * dydt) * dt;
                            }

                            var area = Math.PI * radiusX * radiusY;
                            var doubleInt = 2 * area;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('F = -yi + xj,  curl F = 2', 12, 20);
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillText('Circulation (line integral): ' + circ.toFixed(3), 12, 40);
                            ctx.fillText('Double integral of curl: 2 * Area = ' + doubleInt.toFixed(3), 12, 58);
                        }

                        VizEngine.createSlider(controls, 'Radius X', 0.5, 4, radiusX, 0.1, function(v) { radiusX = v; draw(); });
                        VizEngine.createSlider(controls, 'Radius Y', 0.5, 3, radiusY, 0.1, function(v) { radiusY = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'gt-ex1',
                    type: 'short-answer',
                    question: 'Use Green\'s Theorem to evaluate the integral of (xy)dx + (x^2)dy around the triangle with vertices (0,0), (1,0), (0,1) traversed counterclockwise.',
                    hint: 'Compute dQ/dx - dP/dy = 2x - x = x, then integrate x over the triangular region.',
                    solution: 'P = xy, Q = x^2. dQ/dx - dP/dy = 2x - x = x. The triangular region is described by 0 <= x <= 1, 0 <= y <= 1 - x. The double integral is integral from 0 to 1 of integral from 0 to 1-x of x dy dx = integral from 0 to 1 of x(1-x) dx = integral from 0 to 1 of (x - x^2) dx = [x^2/2 - x^3/3] from 0 to 1 = 1/2 - 1/3 = 1/6.'
                },
                {
                    id: 'gt-ex2',
                    type: 'short-answer',
                    question: 'Use the area formula from Green\'s Theorem to find the area enclosed by the astroid x = cos^3(t), y = sin^3(t) for 0 <= t <= 2pi.',
                    hint: 'Area = (1/2) integral of (x dy - y dx). Compute dx and dy in terms of dt, then simplify using trig identities.',
                    solution: 'dx = -3cos^2(t)sin(t) dt, dy = 3sin^2(t)cos(t) dt. Area = (1/2) integral from 0 to 2pi of [cos^3(t)(3sin^2(t)cos(t)) - sin^3(t)(-3cos^2(t)sin(t))] dt = (3/2) integral of [cos^4(t)sin^2(t) + sin^4(t)cos^2(t)] dt = (3/2) integral of sin^2(t)cos^2(t) dt = (3/2)(pi/4) = 3pi/8.'
                },
                {
                    id: 'gt-ex3',
                    type: 'short-answer',
                    question: 'Use Green\'s Theorem to show that the integral of (-y^3)dx + (x^3)dy around any simple closed curve C equals 3 times the integral of (x^2 + y^2) over the enclosed region.',
                    hint: 'Compute dQ/dx - dP/dy and simplify.',
                    solution: 'P = -y^3, Q = x^3. dQ/dx - dP/dy = 3x^2 - (-3y^2) = 3x^2 + 3y^2 = 3(x^2 + y^2). By Green\'s Theorem, the line integral equals the double integral of 3(x^2 + y^2) dA over the enclosed region, which is 3 times the integral of (x^2 + y^2) dA.'
                }
            ]
        },

        // ===== SECTION 4: Divergence & Curl =====
        {
            id: 'divergence-curl',
            title: 'Divergence & Curl',
            content: `
<h2>4 &middot; Divergence &amp; Curl</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Divergence</div>
The <strong>divergence</strong> of a vector field \\(\\mathbf{F} = P\\,\\mathbf{i} + Q\\,\\mathbf{j} + R\\,\\mathbf{k}\\) is the scalar field
\\[\\text{div}\\,\\mathbf{F} = \\nabla \\cdot \\mathbf{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}.\\]
Divergence measures the rate at which "stuff" expands or contracts at a point&mdash;the net outward flux per unit volume.
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Curl</div>
The <strong>curl</strong> of \\(\\mathbf{F} = P\\,\\mathbf{i} + Q\\,\\mathbf{j} + R\\,\\mathbf{k}\\) is the vector field
\\[\\text{curl}\\,\\mathbf{F} = \\nabla \\times \\mathbf{F} = \\left(\\frac{\\partial R}{\\partial y} - \\frac{\\partial Q}{\\partial z}\\right)\\mathbf{i} + \\left(\\frac{\\partial P}{\\partial z} - \\frac{\\partial R}{\\partial x}\\right)\\mathbf{j} + \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)\\mathbf{k}.\\]
Curl measures the local rotation&mdash;the axis and rate of spinning at each point.
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Divergence vs. Curl</div>
<ul>
<li><strong>Divergence</strong>: Place a tiny balloon at a point. If div \\(\\mathbf{F} > 0\\), the balloon expands (source); if div \\(\\mathbf{F} < 0\\), it compresses (sink).</li>
<li><strong>Curl</strong>: Place a tiny paddle wheel at a point. The curl vector tells you the axis around which the paddle spins and how fast.</li>
</ul>
</div>

<div class="viz-container" data-viz="div-curl-explorer">
<div class="viz-canvas" id="div-curl-explorer"></div>
<div class="viz-controls" id="div-curl-explorer-controls"></div>
<div class="viz-caption">Explore different vector fields and see their divergence (expansion/contraction) and curl (rotation) at the probe point.</div>
</div>

<div class="env-block theorem">
<div class="env-label">Key Identities</div>
For sufficiently smooth scalar fields \\(f\\) and vector fields \\(\\mathbf{F}\\):
<ol>
<li>\\(\\nabla \\times (\\nabla f) = \\mathbf{0}\\) &mdash; the curl of a gradient is always zero.</li>
<li>\\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0\\) &mdash; the divergence of a curl is always zero.</li>
</ol>
These express the fact that "exact" fields have no circulation, and "curl" fields have no net flux.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Computing Divergence and Curl</div>
Let \\(\\mathbf{F}(x,y,z) = (xz)\\,\\mathbf{i} + (xyz)\\,\\mathbf{j} + (-z^2)\\,\\mathbf{k}\\).
<br><br>
<strong>Divergence:</strong> \\(\\nabla \\cdot \\mathbf{F} = z + xz - 2z = xz - z = z(x - 1)\\).
<br><br>
<strong>Curl:</strong>
\\[\\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ xz & xyz & -z^2 \\end{vmatrix} = (0 - xy)\\,\\mathbf{i} - (-2z - x)\\,\\mathbf{j} + (yz - 0)\\,\\mathbf{k} = -xy\\,\\mathbf{i} + (2z+x)\\,\\mathbf{j} + yz\\,\\mathbf{k}.\\]
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; The Laplacian</div>
The <strong>Laplacian</strong> of a scalar field is \\(\\nabla^2 f = \\nabla \\cdot (\\nabla f) = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2} + \\frac{\\partial^2 f}{\\partial z^2}\\). Functions satisfying \\(\\nabla^2 f = 0\\) are called <strong>harmonic</strong> and arise throughout physics (heat flow, electrostatics, fluid potential).
</div>
`,
            visualizations: [
                {
                    id: 'div-curl-explorer',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 45 });

                        var fields = [
                            {
                                name: 'Source (div > 0)',
                                fx: function(x, y) { return x; },
                                fy: function(x, y) { return y; },
                                divF: function(x, y) { return 2; },
                                curlF: function(x, y) { return 0; }
                            },
                            {
                                name: 'Rotation (curl > 0)',
                                fx: function(x, y) { return -y; },
                                fy: function(x, y) { return x; },
                                divF: function(x, y) { return 0; },
                                curlF: function(x, y) { return 2; }
                            },
                            {
                                name: 'Saddle (div = 0)',
                                fx: function(x, y) { return x; },
                                fy: function(x, y) { return -y; },
                                divF: function(x, y) { return 0; },
                                curlF: function(x, y) { return 0; }
                            },
                            {
                                name: 'Mixed',
                                fx: function(x, y) { return x - y; },
                                fy: function(x, y) { return x + y; },
                                divF: function(x, y) { return 2; },
                                curlF: function(x, y) { return 2; }
                            },
                            {
                                name: 'Vortex + Source',
                                fx: function(x, y) { return x - 2 * y; },
                                fy: function(x, y) { return 2 * x + y; },
                                divF: function(x, y) { return 2; },
                                curlF: function(x, y) { return 4; }
                            }
                        ];

                        var currentField = 0;
                        var probeX = 1, probeY = 1;

                        var probe = viz.addDraggable('probe', probeX, probeY, viz.colors.orange, 7, function(x, y) {
                            probeX = x;
                            probeY = y;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var f = fields[currentField];
                            viz.drawVectorField(f.fx, f.fy, -5.5, 5.5, -3.5, 3.5, 13, 8);

                            // Draw probe circle
                            var ctx = viz.ctx;
                            var sp = viz.toScreen(probeX, probeY);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], 25, 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.drawDraggables();

                            var divVal = f.divF(probeX, probeY);
                            var curlVal = f.curlF(probeX, probeY);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(f.name, 12, 20);
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('div F = ' + divVal.toFixed(2) + (divVal > 0 ? ' (expanding)' : divVal < 0 ? ' (contracting)' : ' (incompressible)'), 12, 40);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('curl F (z-comp) = ' + curlVal.toFixed(2) + (curlVal > 0 ? ' (CCW spin)' : curlVal < 0 ? ' (CW spin)' : ' (irrotational)'), 12, 58);
                        }

                        fields.forEach(function(f, i) {
                            VizEngine.createButton(controls, f.name, function() { currentField = i; draw(); });
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'dc-ex1',
                    type: 'short-answer',
                    question: 'Compute the divergence and curl of F(x,y,z) = (x^2 y)i + (y^2 z)j + (z^2 x)k.',
                    hint: 'div F = dP/dx + dQ/dy + dR/dz. For curl, use the determinant formula.',
                    solution: 'div F = 2xy + 2yz + 2zx. For the curl: (dR/dy - dQ/dz) = 0 - y^2 = -y^2. (dP/dz - dR/dx) = 0 - z^2 = -z^2. (dQ/dx - dP/dy) = 0 - x^2 = -x^2. So curl F = (-y^2)i + (-z^2)j + (-x^2)k.'
                },
                {
                    id: 'dc-ex2',
                    type: 'short-answer',
                    question: 'Verify that curl(grad f) = 0 for f(x,y,z) = x^2 yz + sin(xz).',
                    hint: 'Compute grad f, then take the curl of the resulting vector field.',
                    solution: 'grad f = (2xyz + z cos(xz))i + (x^2 z)j + (x^2 y + x cos(xz))k. Computing curl: (d/dy)(x^2 y + x cos(xz)) - (d/dz)(x^2 z) = x^2 - x^2 = 0 for the i-component. (d/dz)(2xyz + z cos(xz)) - (d/dx)(x^2 y + x cos(xz)) = 2xy + cos(xz) - xz sin(xz) - (2xy + cos(xz) - xz sin(xz)) = 0 for the j-component. (d/dx)(x^2 z) - (d/dy)(2xyz + z cos(xz)) = 2xz - 2xz = 0 for the k-component. Hence curl(grad f) = 0.'
                },
                {
                    id: 'dc-ex3',
                    type: 'short-answer',
                    question: 'A 2D vector field F = P(x,y)i + Q(x,y)j is both irrotational (curl F = 0) and incompressible (div F = 0). What conditions must P and Q satisfy?',
                    hint: 'Irrotational means dQ/dx = dP/dy. Incompressible means dP/dx + dQ/dy = 0. Together these are the Cauchy-Riemann equations (after a sign change).',
                    solution: 'The conditions are: (1) dP/dx + dQ/dy = 0 (divergence-free), and (2) dQ/dx - dP/dy = 0 (curl-free). These are equivalent to dP/dx = -dQ/dy and dP/dy = dQ/dx. If we set u = P and v = -Q, these become the Cauchy-Riemann equations u_x = v_y and u_y = -v_x, linking irrotational incompressible flows to analytic functions in complex analysis.'
                }
            ]
        },

        // ===== SECTION 5: Stokes' & Divergence Theorems =====
        {
            id: 'stokes-divergence',
            title: 'Stokes\' & Divergence Theorems',
            content: `
<h2>5 &middot; Stokes' &amp; Divergence Theorems</h2>

<div class="env-block theorem">
<div class="env-label">Stokes' Theorem</div>
Let \\(S\\) be an oriented smooth surface bounded by a simple, closed, piecewise-smooth boundary curve \\(C\\) with positive orientation. If \\(\\mathbf{F}\\) has continuous partial derivatives, then
\\[\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Stokes' Theorem</div>
Stokes' Theorem generalises Green's Theorem to surfaces in 3D. The circulation of \\(\\mathbf{F}\\) around the boundary curve equals the total curl flux through the surface. Think of it as: the net swirling around the edge equals the aggregate micro-swirling over the entire membrane.
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Green's Theorem as a Special Case</div>
When \\(S\\) is a flat region \\(D\\) in the \\(xy\\)-plane with upward normal \\(\\mathbf{k}\\), and \\(\\mathbf{F} = P\\,\\mathbf{i} + Q\\,\\mathbf{j}\\), Stokes' Theorem reduces to
\\[\\oint_C P\\,dx + Q\\,dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)dA,\\]
which is exactly Green's Theorem.
</div>

<div class="viz-container" data-viz="stokes-theorem-viz">
<div class="viz-canvas" id="stokes-theorem-viz"></div>
<div class="viz-controls" id="stokes-theorem-viz-controls"></div>
<div class="viz-caption">A surface S with boundary curve C. The circulation around C equals the flux of curl F through S. Tilt the surface to see Stokes' Theorem in action.</div>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Stokes' Theorem</div>
Let \\(\\mathbf{F} = -y\\,\\mathbf{i} + x\\,\\mathbf{j} + z\\,\\mathbf{k}\\) and let \\(S\\) be the part of the paraboloid \\(z = 4 - x^2 - y^2\\) above the \\(xy\\)-plane, with boundary the circle \\(x^2 + y^2 = 4\\), \\(z = 0\\).
<br><br>
<strong>Curl:</strong> \\(\\nabla \\times \\mathbf{F} = (0 - 0)\\,\\mathbf{i} - (0 - 0)\\,\\mathbf{j} + (1 - (-1))\\,\\mathbf{k} = 2\\mathbf{k}\\).
<br><br>
<strong>Surface integral:</strong> \\(\\iint_S 2\\mathbf{k} \\cdot d\\mathbf{S} = 2 \\cdot \\text{Area}(\\text{shadow in } xy\\text{-plane}) = 2 \\cdot \\pi(2)^2 = 8\\pi\\).
<br><br>
<strong>Verification via line integral:</strong> Parametrise the boundary: \\(\\mathbf{r}(t) = (2\\cos t, 2\\sin t, 0)\\). Then \\(\\mathbf{F}(\\mathbf{r}(t)) = (-2\\sin t, 2\\cos t, 0)\\) and \\(\\mathbf{r}'(t) = (-2\\sin t, 2\\cos t, 0)\\). So \\(\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_0^{2\\pi}(4\\sin^2 t + 4\\cos^2 t)\\,dt = 8\\pi\\). Both sides agree.
</div>

<div class="env-block theorem">
<div class="env-label">Divergence Theorem (Gauss's Theorem)</div>
Let \\(E\\) be a bounded solid region with outward-oriented boundary surface \\(S\\). If \\(\\mathbf{F}\\) has continuous partial derivatives, then
\\[\\oiint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_E \\nabla \\cdot \\mathbf{F}\\,dV.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Divergence Theorem</div>
The total outward flux through a closed surface equals the total "source strength" inside. Imagine a box in a flowing fluid: the net flow exiting the box equals the total amount of fluid being created (or destroyed) within.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Divergence Theorem</div>
Compute the outward flux of \\(\\mathbf{F} = x\\,\\mathbf{i} + y\\,\\mathbf{j} + z\\,\\mathbf{k}\\) through the sphere \\(x^2 + y^2 + z^2 = R^2\\).
<br><br>
<strong>Solution.</strong> \\(\\nabla \\cdot \\mathbf{F} = 1 + 1 + 1 = 3\\). By the Divergence Theorem,
\\[\\oiint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_E 3\\,dV = 3 \\cdot \\frac{4}{3}\\pi R^3 = 4\\pi R^3.\\]
</div>

<div class="env-block theorem">
<div class="env-label">The Grand Unification</div>
The classical theorems of vector calculus are all instances of the generalised Stokes' Theorem:
\\[\\int_{\\partial \\Omega} \\omega = \\int_{\\Omega} d\\omega.\\]
<table style="width:100%; border-collapse:collapse; margin:8px 0;">
<tr><th style="text-align:left; padding:6px;">Theorem</th><th style="text-align:left; padding:6px;">Dimension</th><th style="text-align:left; padding:6px;">Boundary integral</th><th style="text-align:left; padding:6px;">Interior integral</th></tr>
<tr><td style="padding:6px;">FTC</td><td style="padding:6px;">1D</td><td style="padding:6px;">\\(f(b) - f(a)\\)</td><td style="padding:6px;">\\(\\int_a^b f'(x)\\,dx\\)</td></tr>
<tr><td style="padding:6px;">Green's</td><td style="padding:6px;">2D</td><td style="padding:6px;">\\(\\oint_C P\\,dx+Q\\,dy\\)</td><td style="padding:6px;">\\(\\iint_D (Q_x-P_y)\\,dA\\)</td></tr>
<tr><td style="padding:6px;">Stokes'</td><td style="padding:6px;">3D (surface)</td><td style="padding:6px;">\\(\\oint_C \\mathbf{F}\\cdot d\\mathbf{r}\\)</td><td style="padding:6px;">\\(\\iint_S (\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}\\)</td></tr>
<tr><td style="padding:6px;">Divergence</td><td style="padding:6px;">3D (solid)</td><td style="padding:6px;">\\(\\oiint_S \\mathbf{F}\\cdot d\\mathbf{S}\\)</td><td style="padding:6px;">\\(\\iiint_E \\nabla\\cdot\\mathbf{F}\\,dV\\)</td></tr>
</table>
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Physical Consequences</div>
<ul>
<li>If \\(\\nabla \\cdot \\mathbf{F} = 0\\) everywhere (incompressible), the flux through any closed surface is zero&mdash;nothing is created or destroyed.</li>
<li>If \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\) everywhere (irrotational), the circulation around any closed curve is zero&mdash;the field is conservative.</li>
</ul>
These principles are the mathematical backbone of Maxwell's equations in electromagnetism.
</div>
`,
            visualizations: [
                {
                    id: 'stokes-theorem-viz',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });

                        var tilt = 0.3;
                        var showCurl = true;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2;

                            // Draw tilted surface as a filled ellipse
                            var R = 3;
                            var ry = R * Math.cos(tilt);

                            // Surface fill
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = 2 * Math.PI * i / 200;
                                var x = R * Math.cos(t);
                                var y = ry * Math.sin(t);
                                var pt = viz.toScreen(x, y);
                                if (i === 0) ctx.moveTo(pt[0], pt[1]);
                                else ctx.lineTo(pt[0], pt[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.purple + '25';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.stroke();

                            // Orientation arrow on boundary
                            var arrowAngle = Math.PI / 3;
                            var ax = R * Math.cos(arrowAngle);
                            var ay = ry * Math.sin(arrowAngle);
                            var sa = viz.toScreen(ax, ay);
                            var tangentX = -R * Math.sin(arrowAngle);
                            var tangentY = ry * Math.cos(arrowAngle);
                            var tl = Math.sqrt(tangentX * tangentX + tangentY * tangentY);
                            tangentX /= tl; tangentY /= tl;
                            var screenAngle = Math.atan2(-tangentY, tangentX);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(sa[0] + 12 * Math.cos(screenAngle), sa[1] + 12 * Math.sin(screenAngle));
                            ctx.lineTo(sa[0] + 12 * Math.cos(screenAngle + 2.5), sa[1] + 12 * Math.sin(screenAngle + 2.5));
                            ctx.lineTo(sa[0] + 12 * Math.cos(screenAngle - 2.5), sa[1] + 12 * Math.sin(screenAngle - 2.5));
                            ctx.closePath();
                            ctx.fill();

                            // Draw curl vectors on surface
                            if (showCurl) {
                                var curlMag = 2;
                                for (var gi = -2; gi <= 2; gi++) {
                                    for (var gj = -2; gj <= 2; gj++) {
                                        var gx = gi * 0.9;
                                        var gy = gj * 0.7;
                                        if (gx * gx / (R * R) + gy * gy / (ry * ry) > 0.7) continue;
                                        var screenPt = viz.toScreen(gx, gy);
                                        var arrowLen = curlMag * Math.cos(tilt) * 12;
                                        ctx.strokeStyle = viz.colors.green + 'aa';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(screenPt[0], screenPt[1]);
                                        ctx.lineTo(screenPt[0], screenPt[1] - arrowLen);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.green + 'aa';
                                        ctx.beginPath();
                                        ctx.moveTo(screenPt[0], screenPt[1] - arrowLen);
                                        ctx.lineTo(screenPt[0] - 4, screenPt[1] - arrowLen + 6);
                                        ctx.lineTo(screenPt[0] + 4, screenPt[1] - arrowLen + 6);
                                        ctx.closePath();
                                        ctx.fill();
                                    }
                                }
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Stokes\' Theorem', 12, 20);
                            ctx.font = '12px -apple-system, sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Boundary C: circulation of F', 12, 40);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Surface S: flux of curl F', 12, 58);

                            var area = Math.PI * R * ry;
                            var curlFlux = 2 * area;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Projected area = ' + area.toFixed(2) + ', Curl flux = 2 * area = ' + curlFlux.toFixed(2), 12, 78);
                        }

                        VizEngine.createSlider(controls, 'Surface tilt', 0, 1.4, tilt, 0.05, function(v) { tilt = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle curl arrows', function() { showCurl = !showCurl; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'sd-ex1',
                    type: 'short-answer',
                    question: 'Use the Divergence Theorem to compute the outward flux of F = (x^3)i + (y^3)j + (z^3)k through the unit sphere x^2 + y^2 + z^2 = 1.',
                    hint: 'Compute div F = 3x^2 + 3y^2 + 3z^2 = 3(x^2 + y^2 + z^2). Convert to spherical coordinates for the triple integral.',
                    solution: 'div F = 3x^2 + 3y^2 + 3z^2 = 3r^2 (in spherical). The triple integral = integral from 0 to 2pi d(phi) integral from 0 to pi sin(theta) d(theta) integral from 0 to 1 of 3r^2 * r^2 dr = 2pi * 2 * 3[r^5/5] from 0 to 1 = 2pi * 2 * 3/5 = 12pi/5.'
                },
                {
                    id: 'sd-ex2',
                    type: 'short-answer',
                    question: 'Use Stokes\' Theorem to evaluate the circulation of F = (z)i + (x)j + (y)k around the circle x^2 + y^2 = 1 in the plane z = 0, traversed counterclockwise when viewed from above.',
                    hint: 'Compute curl F, then evaluate the surface integral over the disk bounded by the circle.',
                    solution: 'curl F = (dR/dy - dQ/dz)i + (dP/dz - dR/dx)j + (dQ/dx - dP/dy)k = (1-0)i + (1-0)j + (1-0)k = i + j + k. With S being the disk in the xy-plane with upward normal k, the surface integral is the double integral of (i + j + k) dot k dA = the double integral of 1 dA = pi(1)^2 = pi.'
                },
                {
                    id: 'sd-ex3',
                    type: 'short-answer',
                    question: 'Explain why the Divergence Theorem implies that if div F = 0 everywhere inside a closed surface S, then the total outward flux through S is zero. Give a physical example.',
                    hint: 'Apply the theorem directly. For a physical example, think about an incompressible fluid.',
                    solution: 'By the Divergence Theorem, flux = triple integral of div F dV = triple integral of 0 dV = 0. Physical example: an incompressible fluid (like water at constant density) has div v = 0, where v is the velocity field. This means the net volume of fluid flowing out of any closed surface is zero: whatever flows in must flow out. No fluid is created or destroyed within the region.'
                }
            ]
        }
    ]
});
