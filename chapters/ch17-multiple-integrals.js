window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Multiple Integrals',
    subtitle: 'Double and triple integrals: computing volumes, areas, and mass over regions in the plane and space',
    sections: [
        // ===== SECTION 1: Double Integrals over Rectangles =====
        {
            id: 'double-integrals-rectangles',
            title: 'Double Integrals over Rectangles',
            content: `
<h2>1 &middot; Double Integrals over Rectangles</h2>

<div class="env-block intuition">
<div class="env-label">The Big Picture</div>
Single integrals compute areas under curves. Now we generalize: double integrals compute volumes under surfaces, and triple integrals compute "hypervolumes." The idea is the same &mdash; chop, approximate, sum, take a limit &mdash; but now we slice in multiple directions. In Chapter 16 we used partial derivatives to find extrema of multivariable functions. Here we turn to the other half of calculus &mdash; integration &mdash; and ask: how do we accumulate a quantity that varies over a two- or three-dimensional region?
</div>

<p>
This chapter builds from simple to sophisticated: we start with double integrals over rectangles (where Fubini's theorem reduces everything to iterated single integrals), then handle general regions, learn to change integration order, exploit polar coordinates for circular symmetry, and finally extend to triple integrals with cylindrical and spherical coordinates.
</p>

<p>
In single-variable calculus we integrate a function \\(f(x)\\) over an interval \\([a,b]\\) to obtain the
signed area under its graph. The natural extension to two variables is the <strong>double integral</strong>
of \\(f(x,y)\\) over a region \\(R\\) in the \\(xy\\)-plane.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Double Integral over a Rectangle</div>
Let \\(f(x,y)\\) be a bounded function on the closed rectangle
\\[R = [a,b] \\times [c,d] = \\{(x,y) : a \\le x \\le b,\\; c \\le y \\le d\\}.\\]
Partition \\([a,b]\\) into \\(m\\) subintervals and \\([c,d]\\) into \\(n\\) subintervals, forming \\(mn\\) sub-rectangles
\\(R_{ij}\\) each with area \\(\\Delta A = \\Delta x_i \\,\\Delta y_j\\). Choose sample points \\((x_i^*,y_j^*)\\in R_{ij}\\).
The <strong>double integral</strong> of \\(f\\) over \\(R\\) is
\\[\\iint_R f(x,y)\\,dA = \\lim_{m,n\\to\\infty} \\sum_{i=1}^{m}\\sum_{j=1}^{n} f(x_i^*,y_j^*)\\,\\Delta A,\\]
provided this limit exists (in which case \\(f\\) is said to be <em>integrable</em> over \\(R\\)).
</div>

<p>
Geometrically, when \\(f(x,y) \\ge 0\\) the double integral gives the <strong>volume</strong> of the solid that sits
above \\(R\\) and beneath the surface \\(z = f(x,y)\\).
</p>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Fubini's Theorem (Rectangle Case)</div>
If \\(f\\) is continuous on the rectangle \\(R = [a,b]\\times[c,d]\\), then
\\[\\iint_R f(x,y)\\,dA = \\int_a^b\\!\\int_c^d f(x,y)\\,dy\\,dx = \\int_c^d\\!\\int_a^b f(x,y)\\,dx\\,dy.\\]
That is, the double integral equals either <strong>iterated integral</strong>, and the order of integration may be reversed.
</div>

<p>
Fubini's theorem is the computational workhorse: it reduces a double integral to two successive
single-variable integrations. The inner integral treats one variable as a constant while integrating
with respect to the other.
</p>

<div class="env-block example">
<div class="env-label">Example</div>
Compute \\(\\displaystyle \\iint_R (x^2 + 3y)\\,dA\\) where \\(R = [0,2]\\times[0,1]\\).
<br><br>
<strong>Solution.</strong> Using Fubini's theorem, integrate \\(y\\) first:
\\[\\int_0^2\\!\\int_0^1 (x^2+3y)\\,dy\\,dx = \\int_0^2\\!\\left[x^2 y + \\tfrac{3}{2}y^2\\right]_0^1 dx = \\int_0^2\\!\\left(x^2 + \\tfrac{3}{2}\\right)\\,dx = \\left[\\tfrac{x^3}{3} + \\tfrac{3x}{2}\\right]_0^2 = \\tfrac{8}{3}+3 = \\tfrac{17}{3}.\\]
</div>

<div class="env-block remark">
<div class="env-label">Remark</div>
Fubini's theorem requires \\(f\\) to be continuous (or more generally, bounded with discontinuities on a set of
measure zero). If \\(f\\) is not well-behaved, the two iterated integrals can give <em>different</em> values.
</div>
            `,
            visualizations: [
                {
                    id: 'viz-riemann-sum-rectangle',
                    title: 'Double Riemann Sum over a Rectangle',
                    description: 'Approximate a double integral by summing f(x*,y*) times the area of sub-rectangles. Increase n to see the approximation converge.',
                    setup: function(container) {
                        const viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 80, originX: 60, originY: 360
                        });
                        let n = 4;

                        const f = (x, y) => x * x + 2 * y;
                        const a = 0, b = 2, c = 0, d = 1.5;

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Grid and axes
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            const dx = (b - a) / n;
                            const dy = (d - c) / n;
                            let totalSum = 0;

                            // Draw sub-rectangles colored by height
                            for (let i = 0; i < n; i++) {
                                for (let j = 0; j < n; j++) {
                                    const xm = a + (i + 0.5) * dx;
                                    const ym = c + (j + 0.5) * dy;
                                    const val = f(xm, ym);
                                    totalSum += val * dx * dy;

                                    // Color intensity based on function value
                                    const t = Math.min(val / 7, 1);
                                    const r = Math.round(88 + t * 100);
                                    const g = Math.round(166 - t * 80);
                                    const bl = Math.round(255 - t * 100);
                                    const fillColor = 'rgba(' + r + ',' + g + ',' + bl + ',0.5)';

                                    const [sx1, sy1] = viz.toScreen(a + i * dx, c + (j + 1) * dy);
                                    const [sx2, sy2] = viz.toScreen(a + (i + 1) * dx, c + j * dy);
                                    ctx.fillStyle = fillColor;
                                    ctx.fillRect(sx1, sy1, sx2 - sx1, sy2 - sy1);
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 0.8;
                                    ctx.strokeRect(sx1, sy1, sx2 - sx1, sy2 - sy1);

                                    // Sample point
                                    viz.drawPoint(xm, ym, viz.colors.orange, null, 2);
                                }
                            }

                            // Border of R
                            const [rx1, ry1] = viz.toScreen(a, d);
                            const [rx2, ry2] = viz.toScreen(b, c);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(rx1, ry1, rx2 - rx1, ry2 - ry1);

                            // Labels
                            viz.drawText('x', 2.8, -0.15, viz.colors.text, 13);
                            viz.drawText('y', -0.15, 2, viz.colors.text, 13);
                            viz.drawText('R = [0,2] x [0,1.5]', 1, -0.3, viz.colors.white, 12);

                            // Exact value
                            var exact = 8 / 3 * 1.5 + 1.5 * 1.5 * 2;
                            viz.screenText('n = ' + n + ' subdivisions per side', 300, 20, viz.colors.white, 13);
                            viz.screenText('Riemann sum = ' + totalSum.toFixed(4), 300, 40, viz.colors.teal, 13);
                            viz.screenText('Exact value = ' + exact.toFixed(4), 300, 58, viz.colors.orange, 13);
                        }

                        draw();

                        VizEngine.createSlider(container, 'n', 1, 20, 4, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-1-1',
                    type: 'mc',
                    question: 'Compute the iterated integral: \\(\\displaystyle \\int_0^1\\!\\int_0^2 (x + y)\\,dx\\,dy\\).',
                    options: ['2', '3', '4', '5'],
                    correct: 1,
                    explanation: 'Inner integral: \\(\\int_0^2(x+y)\\,dx = [x^2/2 + xy]_0^2 = 2+2y\\). Outer: \\(\\int_0^1(2+2y)\\,dy = [2y+y^2]_0^1 = 3\\).'
                },
                {
                    id: 'ex-1-2',
                    type: 'mc',
                    question: 'Fubini\'s theorem guarantees that the two iterated integrals of a continuous function on a rectangle are:',
                    options: [
                        'Always different',
                        'Equal',
                        'Equal only for polynomials',
                        'Equal only when f is non-negative'
                    ],
                    correct: 1,
                    explanation: 'Fubini\'s theorem states that for any continuous function on a rectangle, both iterated integrals exist and are equal.'
                },
                {
                    id: 'ex-1-3',
                    type: 'mc',
                    question: 'What does \\(\\iint_R 1\\,dA\\) give when \\(R = [a,b] \\times [c,d]\\)?',
                    options: [
                        '(b-a) + (d-c)',
                        '(b-a)(d-c)',
                        '(b+a)(d+c)/2',
                        '0'
                    ],
                    correct: 1,
                    explanation: '\\(\\iint_R 1\\,dA = \\int_a^b\\int_c^d 1\\,dy\\,dx = (b-a)(d-c)\\), which is the area of the rectangle.'
                }
            ]
        },

        // ===== SECTION 2: Double Integrals over General Regions =====
        {
            id: 'double-integrals-general',
            title: 'Double Integrals over General Regions',
            content: `
<h2>2 &middot; Double Integrals over General Regions</h2>

<div class="env-block intuition">
<div class="env-label">From Rectangles to Curves</div>
Fubini's theorem on rectangles is clean, but real problems rarely involve perfectly rectangular domains. A lake, a wing cross-section, or the region between two curves all have curved boundaries. The key insight is that we can still iterate, but now the <em>limits of integration become functions</em> rather than constants. This section develops the machinery for handling such regions.
</div>

<p>
Most regions of integration are not rectangles. A general bounded region \\(D\\) in the plane can often
be described in one of two standard forms.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Type I and Type II Regions</div>
<ul>
<li>A <strong>Type I</strong> (vertically simple) region has the form
\\[D = \\{(x,y) : a \\le x \\le b,\\; g_1(x) \\le y \\le g_2(x)\\}\\]
where \\(g_1,g_2\\) are continuous on \\([a,b]\\).</li>
<li>A <strong>Type II</strong> (horizontally simple) region has the form
\\[D = \\{(x,y) : c \\le y \\le d,\\; h_1(y) \\le x \\le h_2(y)\\}\\]
where \\(h_1,h_2\\) are continuous on \\([c,d]\\).</li>
</ul>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Fubini's Theorem (General Regions)</div>
If \\(f\\) is continuous on a Type I region \\(D\\), then
\\[\\iint_D f(x,y)\\,dA = \\int_a^b\\!\\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx.\\]
Similarly, for a Type II region:
\\[\\iint_D f(x,y)\\,dA = \\int_c^d\\!\\int_{h_1(y)}^{h_2(y)} f(x,y)\\,dx\\,dy.\\]
</div>

<p>
The key skill is <em>describing the region</em> correctly. For a Type I setup, you fix \\(x\\) and determine
the lower and upper bounds for \\(y\\) as functions of \\(x\\). For a Type II setup, you fix \\(y\\) and find
the left and right bounds for \\(x\\) as functions of \\(y\\).
</p>

<div class="env-block example">
<div class="env-label">Example</div>
Compute \\(\\displaystyle\\iint_D x\\,dA\\) where \\(D\\) is the region bounded by \\(y = x^2\\) and \\(y = x\\).
<br><br>
<strong>Solution.</strong> The curves intersect at \\((0,0)\\) and \\((1,1)\\). Since \\(x \\ge x^2\\) on \\([0,1]\\),
the region is Type I with \\(g_1(x) = x^2\\) and \\(g_2(x) = x\\):
\\[\\int_0^1\\!\\int_{x^2}^{x} x\\,dy\\,dx = \\int_0^1 x(x - x^2)\\,dx = \\int_0^1 (x^2 - x^3)\\,dx = \\frac{1}{3} - \\frac{1}{4} = \\frac{1}{12}.\\]
</div>

<div class="env-block example">
<div class="env-label">Example</div>
Compute the area of the region bounded by \\(x = y^2\\) and \\(x = 4\\).
<br><br>
<strong>Solution.</strong> As a Type II region: \\(y\\) runs from \\(-2\\) to \\(2\\), and for fixed \\(y\\),
\\(x\\) runs from \\(y^2\\) to \\(4\\):
\\[\\text{Area} = \\int_{-2}^{2}\\!\\int_{y^2}^{4} 1\\,dx\\,dy = \\int_{-2}^{2} (4-y^2)\\,dy = \\left[4y - \\frac{y^3}{3}\\right]_{-2}^{2} = \\frac{32}{3}.\\]
</div>
            `,
            visualizations: [
                {
                    id: 'viz-type-i-type-ii',
                    title: 'Type I vs Type II Regions',
                    description: 'Visualize how a region is sliced vertically (Type I, dx-first) or horizontally (Type II, dy-first). Drag the slider to sweep the slicing direction.',
                    setup: function(container) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 100, originX: 80, originY: 340
                        });
                        var mode = 'type1';
                        var slicePos = 0.5;

                        function g1(x) { return x * x; }
                        function g2(x) { return Math.sqrt(x); }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Shade region between y=x^2 and y=sqrt(x) on [0,1]
                            viz.shadeBetween(g2, g1, 0, 1, 'rgba(88,166,255,0.2)');

                            // Draw boundary curves
                            viz.drawFunction(g1, -0.2, 1.3, viz.colors.blue, 2);
                            viz.drawFunction(g2, 0, 1.3, viz.colors.teal, 2);

                            // Labels
                            viz.drawText('y = x\u00B2', 1.15, 1.35, viz.colors.blue, 12, 'left');
                            viz.drawText('y = \u221Ax', 1.15, 1.05, viz.colors.teal, 12, 'left');

                            if (mode === 'type1') {
                                // Vertical slice at x = slicePos
                                var x0 = slicePos;
                                var yBot = g1(x0);
                                var yTop = g2(x0);
                                viz.drawSegment(x0, yBot, x0, yTop, viz.colors.orange, 3);
                                viz.drawPoint(x0, yBot, viz.colors.orange, null, 4);
                                viz.drawPoint(x0, yTop, viz.colors.orange, null, 4);

                                // Show slice strip
                                var stripW = 0.03;
                                var pts = [];
                                for (var t = yBot; t <= yTop; t += 0.01) {
                                    pts.push([x0 - stripW, t]);
                                }
                                for (var t2 = yTop; t2 >= yBot; t2 -= 0.01) {
                                    pts.push([x0 + stripW, t2]);
                                }
                                if (pts.length > 2) viz.drawPolygon(pts, 'rgba(240,136,62,0.4)', viz.colors.orange, 1);

                                viz.screenText('Type I: fix x, integrate y from x\u00B2 to \u221Ax', 310, 20, viz.colors.white, 13);
                                viz.screenText('x = ' + x0.toFixed(2) + ', y from ' + yBot.toFixed(2) + ' to ' + yTop.toFixed(2), 310, 40, viz.colors.orange, 12);
                            } else {
                                // Horizontal slice at y = slicePos
                                var y0 = slicePos;
                                var xLeft = y0 * y0;
                                var xRight = Math.min(y0 < 0 ? 0 : y0 * y0, 1);
                                xLeft = y0 * y0;
                                xRight = y0 >= 0 ? y0 * y0 : 0;
                                // For type II between y=x^2 and y=sqrt(x):
                                // x goes from y^2 to sqrt(y)
                                if (y0 >= 0 && y0 <= 1) {
                                    xLeft = y0 * y0;
                                    xRight = Math.sqrt(y0);
                                } else {
                                    xLeft = 0;
                                    xRight = 0;
                                }
                                viz.drawSegment(xLeft, y0, xRight, y0, viz.colors.purple, 3);
                                viz.drawPoint(xLeft, y0, viz.colors.purple, null, 4);
                                viz.drawPoint(xRight, y0, viz.colors.purple, null, 4);

                                var stripH = 0.02;
                                var pts2 = [];
                                for (var s = xLeft; s <= xRight; s += 0.01) {
                                    pts2.push([s, y0 - stripH]);
                                }
                                for (var s2 = xRight; s2 >= xLeft; s2 -= 0.01) {
                                    pts2.push([s2, y0 + stripH]);
                                }
                                if (pts2.length > 2) viz.drawPolygon(pts2, 'rgba(188,140,255,0.4)', viz.colors.purple, 1);

                                viz.screenText('Type II: fix y, integrate x from y\u00B2 to \u221Ay', 310, 20, viz.colors.white, 13);
                                viz.screenText('y = ' + y0.toFixed(2) + ', x from ' + xLeft.toFixed(2) + ' to ' + xRight.toFixed(2), 310, 40, viz.colors.purple, 12);
                            }

                            viz.drawText('x', 1.5, -0.08, viz.colors.text, 12);
                            viz.drawText('y', -0.1, 1.4, viz.colors.text, 12);

                            // Intersection points
                            viz.drawPoint(0, 0, viz.colors.white, '(0,0)', 4);
                            viz.drawPoint(1, 1, viz.colors.white, '(1,1)', 4);
                        }

                        draw();

                        VizEngine.createButton(container, 'Type I (vertical slices)', function() {
                            mode = 'type1';
                            draw();
                        });
                        VizEngine.createButton(container, 'Type II (horizontal slices)', function() {
                            mode = 'type2';
                            draw();
                        });
                        VizEngine.createSlider(container, 'Slice position', 0.05, 0.95, 0.5, 0.01, function(val) {
                            slicePos = val;
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-2-1',
                    type: 'mc',
                    question: 'The region bounded by \\(y = 0\\), \\(y = x\\), and \\(x = 2\\) is best described as which Type I region?',
                    options: [
                        '0 \\le x \\le 2, \\; 0 \\le y \\le x',
                        '0 \\le x \\le 2, \\; x \\le y \\le 2',
                        '0 \\le y \\le 2, \\; 0 \\le x \\le y',
                        '0 \\le x \\le 2, \\; 0 \\le y \\le 2'
                    ],
                    correct: 0,
                    explanation: 'For fixed \\(x\\in[0,2]\\), \\(y\\) ranges from the lower boundary \\(y=0\\) to the upper boundary \\(y=x\\).'
                },
                {
                    id: 'ex-2-2',
                    type: 'mc',
                    question: 'Evaluate \\(\\displaystyle\\iint_D 1\\,dA\\) where \\(D\\) is the triangle with vertices \\((0,0)\\), \\((1,0)\\), \\((0,1)\\).',
                    options: ['1/4', '1/3', '1/2', '1'],
                    correct: 2,
                    explanation: 'The triangle has base 1 and height 1, so area = 1/2. Alternatively: \\(\\int_0^1\\int_0^{1-x}dy\\,dx = \\int_0^1(1-x)\\,dx = 1/2\\).'
                },
                {
                    id: 'ex-2-3',
                    type: 'mc',
                    question: 'To integrate over the region bounded by \\(x = y^2\\) and \\(x = 1\\), which setup is simpler?',
                    options: [
                        'Type I: integrate y first for fixed x',
                        'Type II: integrate x first for fixed y',
                        'Both are equally simple',
                        'Neither works; polar coordinates are needed'
                    ],
                    correct: 1,
                    explanation: 'Type II gives simple bounds: \\(y\\in[-1,1]\\), \\(x\\in[y^2,1]\\). Type I would require splitting at the turning point of the parabola.'
                }
            ]
        },

        // ===== SECTION 3: Changing Order of Integration =====
        {
            id: 'changing-order',
            title: 'Changing Order of Integration',
            content: `
<h2>3 &middot; Changing Order of Integration</h2>

<div class="env-block intuition">
<div class="env-label">Why Order Matters</div>
Section 2 showed that the same double integral can be set up as either a Type I or Type II iterated integral. But sometimes one order leads to an integrand with no elementary antiderivative, while the reversed order yields an easy computation. Recognizing <em>when</em> and <em>how</em> to reverse the order of integration is one of the most practically important skills in multivariable calculus. The key is always geometric: sketch the region, then re-describe it from the other perspective.
</div>

<p>
Sometimes an iterated integral is much easier (or even only possible) to evaluate when the order
of integration is reversed. The strategy is always the same:
</p>
<ol>
<li><strong>Sketch the region</strong> \\(D\\) described by the original limits.</li>
<li><strong>Re-describe</strong> \\(D\\) using the other type (Type I to Type II or vice versa).</li>
<li><strong>Write the new iterated integral</strong> with the reversed limits.</li>
</ol>

<div class="env-block example">
<div class="env-label">Example &mdash; Reversing the Order</div>
Evaluate \\(\\displaystyle \\int_0^1\\!\\int_x^1 e^{y^2}\\,dy\\,dx\\).
<br><br>
<strong>Solution.</strong> The inner integral \\(\\int_x^1 e^{y^2}\\,dy\\) has no elementary antiderivative. We reverse order.
<br><br>
The region is \\(D = \\{(x,y): 0 \\le x \\le 1,\\; x \\le y \\le 1\\}\\). Sketching: this is the triangle
above the line \\(y = x\\) and below \\(y = 1\\), with \\(0 \\le x \\le 1\\).
<br><br>
Re-describing as Type II: for fixed \\(y\\in[0,1]\\), \\(x\\) runs from \\(0\\) to \\(y\\):
\\[\\int_0^1\\!\\int_0^y e^{y^2}\\,dx\\,dy = \\int_0^1 y\\,e^{y^2}\\,dy = \\left[\\tfrac{1}{2}e^{y^2}\\right]_0^1 = \\tfrac{1}{2}(e-1).\\]
</div>

<div class="env-block warning">
<div class="env-label">Common Mistake</div>
When reversing order, do <em>not</em> simply swap the limits mechanically. You must re-derive the
bounds by analyzing the geometry of the region. A sketch is essential.
</div>

<div class="env-block example">
<div class="env-label">Example</div>
Reverse the order of integration for \\(\\displaystyle\\int_0^4\\!\\int_0^{\\sqrt{x}} f(x,y)\\,dy\\,dx\\).
<br><br>
<strong>Solution.</strong> The region is \\(D = \\{(x,y): 0 \\le x \\le 4,\\; 0 \\le y \\le \\sqrt{x}\\}\\).
Equivalently, \\(y\\) ranges from \\(0\\) to \\(2\\) (since \\(\\sqrt{4}=2\\)), and for fixed \\(y\\),
\\(x\\) ranges from \\(y^2\\) to \\(4\\) (since \\(y \\le \\sqrt{x} \\iff x \\ge y^2\\)):
\\[\\int_0^2\\!\\int_{y^2}^{4} f(x,y)\\,dx\\,dy.\\]
</div>
            `,
            visualizations: [
                {
                    id: 'viz-change-order',
                    title: 'Visualizing Order Reversal',
                    description: 'See how the same region is swept differently when integrating dx dy vs dy dx. The triangle bounded by y = x, y = 1, x = 0.',
                    setup: function(container) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 180, originX: 80, originY: 340
                        });
                        var order = 'dydx';
                        var pos = 0.5;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Shade the triangle: 0<=x<=1, x<=y<=1
                            var pts = [[0, 0], [1, 1], [0, 1]];
                            viz.drawPolygon(pts, 'rgba(88,166,255,0.15)', viz.colors.blue, 1.5);

                            // Boundary lines
                            viz.drawFunction(function(x) { return x; }, -0.1, 1.2, viz.colors.blue, 2);
                            viz.drawSegment(0, 1, 1.1, 1, viz.colors.teal, 2);
                            viz.drawSegment(0, 0, 0, 1.1, viz.colors.purple, 1.5, true);

                            viz.drawText('y = x', 0.85, 0.72, viz.colors.blue, 12);
                            viz.drawText('y = 1', 0.7, 1.08, viz.colors.teal, 12);

                            if (order === 'dydx') {
                                // Fix x, sweep y from x to 1
                                var x0 = pos;
                                viz.drawSegment(x0, x0, x0, 1, viz.colors.orange, 3);
                                viz.drawPoint(x0, x0, viz.colors.orange, null, 4);
                                viz.drawPoint(x0, 1, viz.colors.orange, null, 4);

                                viz.screenText('dy dx: fix x = ' + x0.toFixed(2) + ', y from ' + x0.toFixed(2) + ' to 1', 310, 20, viz.colors.orange, 13);
                                viz.screenText('Outer: x from 0 to 1', 310, 40, viz.colors.white, 12);
                            } else {
                                // Fix y, sweep x from 0 to y
                                var y0 = Math.max(pos, 0.02);
                                viz.drawSegment(0, y0, y0, y0, viz.colors.green, 3);
                                viz.drawPoint(0, y0, viz.colors.green, null, 4);
                                viz.drawPoint(y0, y0, viz.colors.green, null, 4);

                                viz.screenText('dx dy: fix y = ' + y0.toFixed(2) + ', x from 0 to ' + y0.toFixed(2), 310, 20, viz.colors.green, 13);
                                viz.screenText('Outer: y from 0 to 1', 310, 40, viz.colors.white, 12);
                            }

                            viz.drawPoint(0, 0, viz.colors.white, '(0,0)', 3);
                            viz.drawPoint(1, 1, viz.colors.white, '(1,1)', 3);
                            viz.drawPoint(0, 1, viz.colors.white, '(0,1)', 3);
                            viz.drawText('x', 1.3, -0.06, viz.colors.text, 12);
                            viz.drawText('y', -0.06, 1.3, viz.colors.text, 12);
                        }

                        draw();

                        VizEngine.createButton(container, 'dy dx (vertical slices)', function() {
                            order = 'dydx';
                            draw();
                        });
                        VizEngine.createButton(container, 'dx dy (horizontal slices)', function() {
                            order = 'dxdy';
                            draw();
                        });
                        VizEngine.createSlider(container, 'Slice position', 0.02, 0.98, 0.5, 0.01, function(val) {
                            pos = val;
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-3-1',
                    type: 'mc',
                    question: 'The integral \\(\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx\\) with reversed order becomes:',
                    options: [
                        '\\(\\int_0^1\\int_0^1 e^{y^2}\\,dx\\,dy\\)',
                        '\\(\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy\\)',
                        '\\(\\int_0^1\\int_y^1 e^{y^2}\\,dx\\,dy\\)',
                        '\\(\\int_0^1\\int_0^x e^{y^2}\\,dx\\,dy\\)'
                    ],
                    correct: 1,
                    explanation: 'The region is the triangle where \\(0 \\le x \\le y\\) and \\(0 \\le y \\le 1\\). For fixed \\(y\\), \\(x\\) runs from \\(0\\) to \\(y\\).'
                },
                {
                    id: 'ex-3-2',
                    type: 'mc',
                    question: 'Evaluate \\(\\displaystyle\\int_0^1\\int_x^1 2y\\,dy\\,dx\\) by reversing the order of integration.',
                    options: ['1/3', '1/2', '2/3', '1'],
                    correct: 2,
                    explanation: 'Reversed: \\(\\int_0^1\\int_0^y 2y\\,dx\\,dy = \\int_0^1 2y^2\\,dy = 2/3\\).'
                },
                {
                    id: 'ex-3-3',
                    type: 'mc',
                    question: 'Why might we reverse the order of integration?',
                    options: [
                        'The reversed integral always gives a different value',
                        'The inner integral may not have an elementary antiderivative in the original order',
                        'It is always required by Fubini\'s theorem',
                        'Reversing always simplifies the outer integral to a constant'
                    ],
                    correct: 1,
                    explanation: 'Sometimes the inner integral is impossible to evaluate in closed form with the original order, but switching makes it tractable (as in the \\(e^{y^2}\\) example).'
                }
            ]
        },

        // ===== SECTION 4: Double Integrals in Polar Coordinates =====
        {
            id: 'polar-double-integrals',
            title: 'Double Integrals in Polar Coordinates',
            content: `
<h2>4 &middot; Double Integrals in Polar Coordinates</h2>

<div class="env-block intuition">
<div class="env-label">Matching Coordinates to Geometry</div>
Sections 1 through 3 worked entirely in Cartesian coordinates, where the area element \\(dA = dx\\,dy\\) represents a small rectangle. But for a disk, an annulus, or a cardioid, rectangular slicing creates unnecessarily complicated limits. Polar coordinates \\((r,\\theta)\\) align naturally with circular geometry. The trade-off: the area element picks up an extra factor of \\(r\\), reflecting the fact that "wedge-shaped" polar sub-regions grow wider as you move away from the origin. This is our first encounter with a <em>change of variables</em> in multiple integrals, a theme that will recur with cylindrical and spherical coordinates in the next section.
</div>

<p>
When the region of integration has circular symmetry, or when the integrand involves
\\(x^2 + y^2\\), polar coordinates \\((r,\\theta)\\) can dramatically simplify the computation.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Polar Coordinate Transformation</div>
The change of variables from Cartesian \\((x,y)\\) to polar \\((r,\\theta)\\) is
\\[x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad x^2 + y^2 = r^2.\\]
The area element transforms according to
\\[dA = dx\\,dy \\;\\longrightarrow\\; r\\,dr\\,d\\theta.\\]
The extra factor of \\(r\\) is the Jacobian determinant of the transformation.
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Double Integral in Polar Coordinates</div>
If \\(D\\) is described in polar coordinates by \\(\\alpha \\le \\theta \\le \\beta\\) and
\\(r_1(\\theta) \\le r \\le r_2(\\theta)\\), then
\\[\\iint_D f(x,y)\\,dA = \\int_\\alpha^\\beta\\!\\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta,\\,r\\sin\\theta)\\;r\\,dr\\,d\\theta.\\]
</div>

<p>
The crucial detail is the <strong>extra factor of \\(r\\)</strong> in the integrand. Forgetting this is one of
the most common errors in polar integration.
</p>

<div class="env-block example">
<div class="env-label">Example</div>
Compute \\(\\displaystyle\\iint_D e^{-(x^2+y^2)}\\,dA\\) where \\(D\\) is the disk \\(x^2+y^2 \\le 4\\).
<br><br>
<strong>Solution.</strong> In polar: \\(D\\) is \\(0 \\le r \\le 2\\), \\(0 \\le \\theta \\le 2\\pi\\):
\\[\\int_0^{2\\pi}\\!\\int_0^2 e^{-r^2}\\;r\\,dr\\,d\\theta = 2\\pi\\int_0^2 r\\,e^{-r^2}\\,dr = 2\\pi\\left[-\\tfrac{1}{2}e^{-r^2}\\right]_0^2 = \\pi(1 - e^{-4}).\\]
</div>

<div class="env-block example">
<div class="env-label">Example</div>
Find the area of the cardioid \\(r = 1 + \\cos\\theta\\).
<br><br>
<strong>Solution.</strong>
\\[A = \\int_0^{2\\pi}\\!\\int_0^{1+\\cos\\theta} r\\,dr\\,d\\theta = \\int_0^{2\\pi} \\frac{(1+\\cos\\theta)^2}{2}\\,d\\theta = \\frac{3\\pi}{2}.\\]
</div>

<div class="env-block remark">
<div class="env-label">Where Does the \\(r\\) Come From?</div>
The Jacobian of the polar transformation is
\\[\\frac{\\partial(x,y)}{\\partial(r,\\theta)} = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r\\cos^2\\theta + r\\sin^2\\theta = r.\\]
Since \\(r \\ge 0\\), we have \\(|J| = r\\), giving the area element \\(dA = r\\,dr\\,d\\theta\\).
</div>
            `,
            visualizations: [
                {
                    id: 'viz-polar-area-element',
                    title: 'Polar Area Element',
                    description: 'See how the area element dA = r dr d-theta arises from the shape of polar sub-regions. Drag the sliders to adjust r and theta.',
                    setup: function(container) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 440,
                            scale: 70, originX: 280, originY: 260
                        });
                        var r0 = 2.0;
                        var theta0 = 0.8;
                        var dr = 0.5;
                        var dtheta = 0.4;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw concentric circles for reference
                            for (var rc = 1; rc <= 4; rc++) {
                                viz.drawCircle(0, 0, rc, null, viz.colors.grid + '60', 0.5);
                            }

                            // Highlight the polar sub-region
                            ctx.beginPath();
                            var steps = 40;
                            // Inner arc
                            for (var i = 0; i <= steps; i++) {
                                var angle = theta0 + dtheta * i / steps;
                                var px = r0 * Math.cos(angle);
                                var py = r0 * Math.sin(angle);
                                var sc = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(sc[0], sc[1]);
                                else ctx.lineTo(sc[0], sc[1]);
                            }
                            // Outer arc (backwards)
                            for (var i2 = steps; i2 >= 0; i2--) {
                                var angle2 = theta0 + dtheta * i2 / steps;
                                var px2 = (r0 + dr) * Math.cos(angle2);
                                var py2 = (r0 + dr) * Math.sin(angle2);
                                var sc2 = viz.toScreen(px2, py2);
                                ctx.lineTo(sc2[0], sc2[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = 'rgba(88,166,255,0.35)';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Draw radial lines
                            viz.drawSegment(0, 0, (r0 + dr + 0.3) * Math.cos(theta0), (r0 + dr + 0.3) * Math.sin(theta0), viz.colors.orange, 1, true);
                            viz.drawSegment(0, 0, (r0 + dr + 0.3) * Math.cos(theta0 + dtheta), (r0 + dr + 0.3) * Math.sin(theta0 + dtheta), viz.colors.orange, 1, true);

                            // Labels
                            var midR = r0 + dr / 2;
                            var midTheta = theta0 + dtheta / 2;
                            var labelX = midR * Math.cos(midTheta);
                            var labelY = midR * Math.sin(midTheta);

                            viz.drawText('dA', labelX, labelY, viz.colors.white, 14);

                            // Dimension labels
                            var rLabelX = (r0 + dr / 2) * Math.cos(theta0 - 0.15);
                            var rLabelY = (r0 + dr / 2) * Math.sin(theta0 - 0.15);
                            viz.drawText('dr', rLabelX, rLabelY, viz.colors.teal, 12);

                            var arcLabelR = r0 + dr + 0.4;
                            var arcLabelX = arcLabelR * Math.cos(midTheta);
                            var arcLabelY = arcLabelR * Math.sin(midTheta);
                            viz.drawText('r d\u03B8', arcLabelX, arcLabelY, viz.colors.purple, 12);

                            // Show formula
                            var area = midR * dr * dtheta;
                            viz.screenText('dA = r dr d\u03B8 \u2248 ' + area.toFixed(3), 290, 20, viz.colors.white, 14);
                            viz.screenText('r = ' + r0.toFixed(1) + ', dr = ' + dr.toFixed(1) + ', d\u03B8 = ' + dtheta.toFixed(2), 290, 42, viz.colors.teal, 12);
                        }

                        draw();

                        VizEngine.createSlider(container, 'r', 0.5, 3.5, 2.0, 0.1, function(val) {
                            r0 = val;
                            draw();
                        });
                        VizEngine.createSlider(container, '\u03B8', 0.1, 5.5, 0.8, 0.1, function(val) {
                            theta0 = val;
                            draw();
                        });
                        VizEngine.createSlider(container, 'dr', 0.1, 1.0, 0.5, 0.05, function(val) {
                            dr = val;
                            draw();
                        });
                        VizEngine.createSlider(container, 'd\u03B8', 0.1, 1.2, 0.4, 0.05, function(val) {
                            dtheta = val;
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-polar-region-integral',
                    title: 'Polar Integration Region',
                    description: 'Shade the integration region for a polar integral. Choose between a disk, annulus, or cardioid.',
                    setup: function(container) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 70, originX: 280, originY: 230
                        });
                        var regionType = 'disk';

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var steps = 300;

                            if (regionType === 'disk') {
                                // Disk r <= 2
                                viz.drawCircle(0, 0, 2, 'rgba(88,166,255,0.2)', viz.colors.blue, 2);
                                viz.screenText('Disk: 0 \u2264 r \u2264 2, 0 \u2264 \u03B8 \u2264 2\u03C0', 280, 20, viz.colors.white, 13);
                                viz.screenText('\u222C dA = \u03C0(2)\u00B2 = 4\u03C0', 280, 42, viz.colors.teal, 13);
                            } else if (regionType === 'annulus') {
                                // Annulus 1 <= r <= 2.5
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var angle = 2 * Math.PI * i / steps;
                                    var sc = viz.toScreen(2.5 * Math.cos(angle), 2.5 * Math.sin(angle));
                                    if (i === 0) ctx.moveTo(sc[0], sc[1]);
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.closePath();
                                for (var i2 = steps; i2 >= 0; i2--) {
                                    var angle2 = 2 * Math.PI * i2 / steps;
                                    var sc2 = viz.toScreen(1 * Math.cos(angle2), 1 * Math.sin(angle2));
                                    if (i2 === steps) ctx.moveTo(sc2[0], sc2[1]);
                                    else ctx.lineTo(sc2[0], sc2[1]);
                                }
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(63,185,160,0.25)';
                                ctx.fill('evenodd');
                                viz.drawCircle(0, 0, 2.5, null, viz.colors.teal, 2);
                                viz.drawCircle(0, 0, 1, null, viz.colors.teal, 2);
                                viz.screenText('Annulus: 1 \u2264 r \u2264 2.5, 0 \u2264 \u03B8 \u2264 2\u03C0', 280, 20, viz.colors.white, 13);
                                viz.screenText('\u222C dA = \u03C0(2.5\u00B2 - 1\u00B2) = 5.25\u03C0', 280, 42, viz.colors.teal, 13);
                            } else {
                                // Cardioid r = 1 + cos(theta)
                                ctx.beginPath();
                                for (var i3 = 0; i3 <= steps; i3++) {
                                    var theta = 2 * Math.PI * i3 / steps;
                                    var rr = 1 + Math.cos(theta);
                                    var px = rr * Math.cos(theta);
                                    var py = rr * Math.sin(theta);
                                    var sc3 = viz.toScreen(px, py);
                                    if (i3 === 0) ctx.moveTo(sc3[0], sc3[1]);
                                    else ctx.lineTo(sc3[0], sc3[1]);
                                }
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(240,136,62,0.2)';
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                viz.screenText('Cardioid: r = 1 + cos\u03B8', 280, 20, viz.colors.white, 13);
                                viz.screenText('Area = 3\u03C0/2', 280, 42, viz.colors.orange, 13);
                            }

                            viz.drawText('x', 3.5, -0.2, viz.colors.text, 12);
                            viz.drawText('y', -0.2, 2.8, viz.colors.text, 12);
                        }

                        draw();

                        VizEngine.createButton(container, 'Disk', function() { regionType = 'disk'; draw(); });
                        VizEngine.createButton(container, 'Annulus', function() { regionType = 'annulus'; draw(); });
                        VizEngine.createButton(container, 'Cardioid', function() { regionType = 'cardioid'; draw(); });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-4-1',
                    type: 'mc',
                    question: 'The area element in polar coordinates is:',
                    options: [
                        'dr d\\theta',
                        'r^2 dr d\\theta',
                        'r\\,dr\\,d\\theta',
                        'dr\\,d\\theta / r'
                    ],
                    correct: 2,
                    explanation: 'The Jacobian of the polar transformation is \\(r\\), so \\(dA = r\\,dr\\,d\\theta\\). The extra factor of \\(r\\) must not be forgotten.'
                },
                {
                    id: 'ex-4-2',
                    type: 'mc',
                    question: 'Evaluate \\(\\displaystyle\\int_0^{2\\pi}\\!\\int_0^3 r\\,dr\\,d\\theta\\).',
                    options: ['3\\pi', '9\\pi/2', '9\\pi', '18\\pi'],
                    correct: 2,
                    explanation: '\\(\\int_0^{2\\pi}\\!\\int_0^3 r\\,dr\\,d\\theta = 2\\pi \\cdot [r^2/2]_0^3 = 2\\pi \\cdot 9/2 = 9\\pi\\). This is the area of a disk of radius 3.'
                },
                {
                    id: 'ex-4-3',
                    type: 'mc',
                    question: 'To convert \\(\\iint_D (x^2+y^2)\\,dA\\) over the unit disk to polar, we get:',
                    options: [
                        '\\(\\int_0^{2\\pi}\\!\\int_0^1 r^2\\,dr\\,d\\theta\\)',
                        '\\(\\int_0^{2\\pi}\\!\\int_0^1 r^3\\,dr\\,d\\theta\\)',
                        '\\(\\int_0^{2\\pi}\\!\\int_0^1 r^4\\,dr\\,d\\theta\\)',
                        '\\(\\int_0^{2\\pi}\\!\\int_0^1 r\\,dr\\,d\\theta\\)'
                    ],
                    correct: 1,
                    explanation: '\\(x^2+y^2 = r^2\\) and \\(dA = r\\,dr\\,d\\theta\\), so the integrand becomes \\(r^2 \\cdot r = r^3\\).'
                }
            ]
        },

        // ===== SECTION 5: Triple Integrals =====
        {
            id: 'triple-integrals',
            title: 'Triple Integrals',
            content: `
<h2>5 &middot; Triple Integrals</h2>

<div class="env-block intuition">
<div class="env-label">One More Dimension</div>
Double integrals sum over flat regions in the plane. Triple integrals do the same over solid regions in space. The conceptual leap is modest (add one more integral sign, one more limit), but the practical payoff is enormous: triple integrals let us compute volumes, masses, centers of mass, and moments of inertia for three-dimensional objects. We also gain two powerful new coordinate systems (cylindrical and spherical) that exploit the symmetry of common solids such as cylinders, cones, and spheres.
</div>

<p>
Extending double integrals one dimension further, the <strong>triple integral</strong>
\\(\\iiint_E f(x,y,z)\\,dV\\) integrates a function over a solid region \\(E\\) in three-dimensional space.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Triple Integral</div>
If \\(f(x,y,z)\\) is continuous on a bounded solid region \\(E\\), the <strong>triple integral</strong>
\\[\\iiint_E f(x,y,z)\\,dV = \\lim_{l,m,n\\to\\infty} \\sum_{i=1}^l\\sum_{j=1}^m\\sum_{k=1}^n f(x_i^*,y_j^*,z_k^*)\\,\\Delta V\\]
where \\(\\Delta V = \\Delta x\\,\\Delta y\\,\\Delta z\\). When \\(f = 1\\), this gives the <strong>volume</strong> of \\(E\\).
</div>

<div class="env-block theorem">
<div class="env-label">Fubini's Theorem for Triple Integrals</div>
If \\(E\\) can be described as
\\[E = \\{(x,y,z): a \\le x \\le b,\\; g_1(x) \\le y \\le g_2(x),\\; u_1(x,y) \\le z \\le u_2(x,y)\\},\\]
then
\\[\\iiint_E f\\,dV = \\int_a^b\\!\\int_{g_1(x)}^{g_2(x)}\\!\\int_{u_1(x,y)}^{u_2(x,y)} f(x,y,z)\\,dz\\,dy\\,dx.\\]
</div>

<div class="env-block example">
<div class="env-label">Example</div>
Find the volume of the tetrahedron bounded by \\(x + y + z = 1\\), \\(x = 0\\), \\(y = 0\\), \\(z = 0\\).
<br><br>
<strong>Solution.</strong> For \\(x\\in[0,1]\\), \\(y\\in[0,1-x]\\), \\(z\\in[0,1-x-y]\\):
\\[V = \\int_0^1\\!\\int_0^{1-x}\\!\\int_0^{1-x-y} dz\\,dy\\,dx = \\int_0^1\\!\\int_0^{1-x}(1-x-y)\\,dy\\,dx = \\int_0^1 \\frac{(1-x)^2}{2}\\,dx = \\frac{1}{6}.\\]
</div>

<h3>Cylindrical Coordinates</h3>
<p>
Cylindrical coordinates \\((r,\\theta,z)\\) extend polar coordinates by adding a vertical axis:
\\[x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad z = z.\\]
The volume element is \\(dV = r\\,dr\\,d\\theta\\,dz\\). Use cylindrical coordinates when the region
has an axis of symmetry aligned with the \\(z\\)-axis.
</p>

<div class="env-block example">
<div class="env-label">Example</div>
Find the volume of the solid cylinder \\(x^2 + y^2 \\le 4\\), \\(0 \\le z \\le 3\\).
<br><br>
<strong>Solution.</strong>
\\[V = \\int_0^{2\\pi}\\!\\int_0^2\\!\\int_0^3 r\\,dz\\,dr\\,d\\theta = 2\\pi \\cdot \\int_0^2 3r\\,dr = 2\\pi \\cdot 3 \\cdot \\frac{4}{2} = 12\\pi.\\]
</div>

<h3>Spherical Coordinates</h3>
<p>
Spherical coordinates \\((\\rho,\\phi,\\theta)\\) are ideal for regions with spherical symmetry:
\\[x = \\rho\\sin\\phi\\cos\\theta, \\quad y = \\rho\\sin\\phi\\sin\\theta, \\quad z = \\rho\\cos\\phi,\\]
where \\(\\rho \\ge 0\\), \\(0 \\le \\phi \\le \\pi\\) (polar angle from the positive \\(z\\)-axis),
and \\(0 \\le \\theta \\le 2\\pi\\) (azimuthal angle).
The volume element is
\\[dV = \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta.\\]
</p>

<div class="env-block example">
<div class="env-label">Example</div>
Find the volume of a sphere of radius \\(R\\).
<br><br>
<strong>Solution.</strong>
\\[V = \\int_0^{2\\pi}\\!\\int_0^{\\pi}\\!\\int_0^{R} \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta
= 2\\pi \\cdot \\left[-\\cos\\phi\\right]_0^{\\pi} \\cdot \\frac{R^3}{3} = 2\\pi \\cdot 2 \\cdot \\frac{R^3}{3} = \\frac{4}{3}\\pi R^3.\\]
</div>

<div class="env-block remark">
<div class="env-label">Choosing the Right Coordinate System</div>
<ul>
<li><strong>Cartesian</strong> \\((x,y,z)\\): Use for box-like regions or when the integrand involves no special symmetry.</li>
<li><strong>Cylindrical</strong> \\((r,\\theta,z)\\): Use when the region is symmetric about the \\(z\\)-axis (cylinders, cones).</li>
<li><strong>Spherical</strong> \\((\\rho,\\phi,\\theta)\\): Use for spheres, hemispheres, and cones centered at the origin.</li>
</ul>
</div>

<div class="env-block intuition">
<div class="env-label">Looking Ahead</div>
Multiple integrals handle scalar-valued functions: given a number \\(f(x,y,z)\\) at each point, we accumulate it over a region. But what about integrating <em>vector fields</em> along curves or over surfaces? This is the domain of <strong>vector calculus</strong> (Chapter 18), where derivatives and integrals interact in beautiful ways through Green's, Stokes', and the Divergence theorems. Those results unify everything we have built so far, connecting line integrals, surface integrals, and the multiple integrals of this chapter into a single coherent framework.
</div>
            `,
            visualizations: [
                {
                    id: 'viz-coordinate-systems',
                    title: 'Cylindrical vs Spherical Coordinates',
                    description: 'See how a point in 3D space is described in cylindrical and spherical coordinates. Adjust the coordinates to move the point.',
                    setup: function(container) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 440,
                            scale: 50, originX: 280, originY: 300
                        });
                        var coordType = 'cylindrical';
                        var rho = 2.5;
                        var phi = 0.8;
                        var theta = 0.7;
                        var zCyl = 2.0;

                        function project3D(x3, y3, z3) {
                            // Simple isometric-like projection
                            var px = x3 * 0.85 - y3 * 0.5;
                            var py = -z3 * 0.9 - x3 * 0.2 - y3 * 0.35;
                            return [px, -py]; // negate py because screen y is flipped in toScreen
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw 3D axes
                            var ox = project3D(0, 0, 0);
                            var ax = project3D(4, 0, 0);
                            var ay = project3D(0, 4, 0);
                            var az = project3D(0, 0, 4);

                            viz.drawSegment(ox[0], ox[1], ax[0], ax[1], viz.colors.red, 1.5);
                            viz.drawSegment(ox[0], ox[1], ay[0], ay[1], viz.colors.green, 1.5);
                            viz.drawSegment(ox[0], ox[1], az[0], az[1], viz.colors.blue, 1.5);
                            viz.drawText('x', ax[0] + 0.3, ax[1], viz.colors.red, 13);
                            viz.drawText('y', ay[0] + 0.3, ay[1], viz.colors.green, 13);
                            viz.drawText('z', az[0], az[1] + 0.3, viz.colors.blue, 13);

                            var x3, y3, z3;

                            if (coordType === 'cylindrical') {
                                var rCyl = rho;
                                x3 = rCyl * Math.cos(theta);
                                y3 = rCyl * Math.sin(theta);
                                z3 = zCyl;

                                var p = project3D(x3, y3, z3);
                                var pBase = project3D(x3, y3, 0);
                                var pOrigin = project3D(0, 0, 0);
                                var pZ = project3D(0, 0, z3);

                                // Draw r line on xy-plane
                                viz.drawSegment(pOrigin[0], pOrigin[1], pBase[0], pBase[1], viz.colors.teal, 2);
                                // Draw vertical z line
                                viz.drawSegment(pBase[0], pBase[1], p[0], p[1], viz.colors.orange, 2, true);
                                // Draw theta arc
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var i = 0; i <= 30; i++) {
                                    var a = theta * i / 30;
                                    var arcP = project3D(0.8 * Math.cos(a), 0.8 * Math.sin(a), 0);
                                    var sc = viz.toScreen(arcP[0], arcP[1]);
                                    if (i === 0) ctx.moveTo(sc[0], sc[1]);
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();

                                viz.drawPoint(p[0], p[1], viz.colors.white, 'P', 6);

                                viz.screenText('Cylindrical: (r, \u03B8, z) = (' + rCyl.toFixed(1) + ', ' + theta.toFixed(2) + ', ' + zCyl.toFixed(1) + ')', 280, 20, viz.colors.white, 13);
                                viz.screenText('dV = r dr d\u03B8 dz', 280, 42, viz.colors.teal, 12);

                                // Labels on diagram
                                var midBase = project3D(x3 / 2, y3 / 2, 0);
                                viz.drawText('r', midBase[0] - 0.3, midBase[1] + 0.3, viz.colors.teal, 12);
                                var midZ = project3D(x3, y3, z3 / 2);
                                viz.drawText('z', midZ[0] + 0.3, midZ[1], viz.colors.orange, 12);
                            } else {
                                x3 = rho * Math.sin(phi) * Math.cos(theta);
                                y3 = rho * Math.sin(phi) * Math.sin(theta);
                                z3 = rho * Math.cos(phi);

                                var p2 = project3D(x3, y3, z3);
                                var pOr = project3D(0, 0, 0);

                                // Draw rho line
                                viz.drawSegment(pOr[0], pOr[1], p2[0], p2[1], viz.colors.teal, 2);

                                // Draw projection onto xy-plane
                                var pBase2 = project3D(x3, y3, 0);
                                viz.drawSegment(pBase2[0], pBase2[1], p2[0], p2[1], viz.colors.text, 1, true);
                                viz.drawSegment(pOr[0], pOr[1], pBase2[0], pBase2[1], viz.colors.text, 1, true);

                                // Draw phi arc (from z-axis to rho line)
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var j = 0; j <= 30; j++) {
                                    var ph = phi * j / 30;
                                    var arcX = 1.0 * Math.sin(ph) * Math.cos(theta);
                                    var arcY = 1.0 * Math.sin(ph) * Math.sin(theta);
                                    var arcZ = 1.0 * Math.cos(ph);
                                    var arcP2 = project3D(arcX, arcY, arcZ);
                                    var sc2 = viz.toScreen(arcP2[0], arcP2[1]);
                                    if (j === 0) ctx.moveTo(sc2[0], sc2[1]);
                                    else ctx.lineTo(sc2[0], sc2[1]);
                                }
                                ctx.stroke();

                                // Draw theta arc
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var k = 0; k <= 30; k++) {
                                    var a2 = theta * k / 30;
                                    var arcP3 = project3D(0.8 * Math.cos(a2), 0.8 * Math.sin(a2), 0);
                                    var sc3 = viz.toScreen(arcP3[0], arcP3[1]);
                                    if (k === 0) ctx.moveTo(sc3[0], sc3[1]);
                                    else ctx.lineTo(sc3[0], sc3[1]);
                                }
                                ctx.stroke();

                                viz.drawPoint(p2[0], p2[1], viz.colors.white, 'P', 6);

                                viz.screenText('Spherical: (\u03C1, \u03C6, \u03B8) = (' + rho.toFixed(1) + ', ' + phi.toFixed(2) + ', ' + theta.toFixed(2) + ')', 280, 20, viz.colors.white, 13);
                                viz.screenText('dV = \u03C1\u00B2 sin\u03C6 d\u03C1 d\u03C6 d\u03B8', 280, 42, viz.colors.teal, 12);

                                // Labels
                                var midRho = project3D(x3 / 2, y3 / 2, z3 / 2);
                                viz.drawText('\u03C1', midRho[0] - 0.3, midRho[1], viz.colors.teal, 12);
                            }
                        }

                        draw();

                        VizEngine.createButton(container, 'Cylindrical', function() { coordType = 'cylindrical'; draw(); });
                        VizEngine.createButton(container, 'Spherical', function() { coordType = 'spherical'; draw(); });
                        VizEngine.createSlider(container, '\u03C1 / r', 0.5, 3.5, 2.5, 0.1, function(val) {
                            rho = val;
                            draw();
                        });
                        VizEngine.createSlider(container, '\u03B8', 0.1, 6.0, 0.7, 0.1, function(val) {
                            theta = val;
                            draw();
                        });
                        VizEngine.createSlider(container, '\u03C6 / z', 0.1, 3.0, 0.8, 0.1, function(val) {
                            if (coordType === 'spherical') { phi = val; }
                            else { zCyl = val; }
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-5-1',
                    type: 'mc',
                    question: 'The volume element in spherical coordinates \\((\\rho,\\phi,\\theta)\\) is:',
                    options: [
                        '\\(\\rho\\,d\\rho\\,d\\phi\\,d\\theta\\)',
                        '\\(\\rho^2\\,d\\rho\\,d\\phi\\,d\\theta\\)',
                        '\\(\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\)',
                        '\\(\\rho\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\)'
                    ],
                    correct: 2,
                    explanation: 'The Jacobian of the spherical transformation gives \\(dV = \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\).'
                },
                {
                    id: 'ex-5-2',
                    type: 'mc',
                    question: 'What is the volume of the tetrahedron bounded by \\(x=0\\), \\(y=0\\), \\(z=0\\), and \\(x+y+z=1\\)?',
                    options: ['1/2', '1/3', '1/6', '1/8'],
                    correct: 2,
                    explanation: '\\(V = \\int_0^1\\int_0^{1-x}\\int_0^{1-x-y}dz\\,dy\\,dx = 1/6\\).'
                },
                {
                    id: 'ex-5-3',
                    type: 'mc',
                    question: 'To compute the volume of a cone \\(z = \\sqrt{x^2+y^2}\\), \\(0 \\le z \\le h\\), which coordinate system is most natural?',
                    options: [
                        'Cartesian',
                        'Cylindrical',
                        'Spherical',
                        'None of the above'
                    ],
                    correct: 1,
                    explanation: 'The cone is \\(z = r\\) in cylindrical coordinates, and the region is symmetric about the \\(z\\)-axis, making cylindrical the natural choice.'
                },
                {
                    id: 'ex-5-4',
                    type: 'mc',
                    question: 'Evaluate \\(\\displaystyle\\int_0^1\\!\\int_0^1\\!\\int_0^1 (x+y+z)\\,dz\\,dy\\,dx\\).',
                    options: ['1', '3/2', '2', '3'],
                    correct: 1,
                    explanation: 'By symmetry each of the three terms contributes equally. \\(\\iiint x\\,dV = \\int_0^1 x\\,dx = 1/2\\). So the total is \\(3 \\times 1/2 = 3/2\\).'
                }
            ]
        }
    ]
});
