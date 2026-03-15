// === Chapter 7: Implicit & Parametric ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Implicit & Parametric',
    subtitle: 'Implicit differentiation, parametric curves, and polar coordinates',
    sections: [
        // ==================== SECTION 1 ====================
        {
            id: 'implicit-differentiation',
            title: 'Implicit Differentiation',
            content: `
<div class="env-block intuition">
<div class="env-label">From Explicit to Implicit and Parametric</div>
<p>Until now we have differentiated functions \\(y = f(x)\\) given as explicit formulas. But many curves, such as circles, ellipses, and the folium of Descartes, are defined by equations like \\(x^2 + y^2 = 1\\) where \\(y\\) is not isolated. Others are most naturally described by a pair of equations \\(x = f(t),\\; y = g(t)\\) that trace a path as a parameter \\(t\\) varies. This chapter extends differentiation to these <strong>implicit</strong> and <strong>parametric</strong> settings, and then introduces <strong>polar coordinates</strong> as a powerful alternative to the Cartesian frame.</p>
<p>We build directly on the chain rule and product rule from earlier chapters. In Chapter 6 we used derivatives to optimize explicit functions; here we will see that the same differentiation rules, applied more creatively, unlock a much wider class of curves.</p>
</div>

<h2>Implicit Differentiation</h2>

<p>Many important curves in mathematics cannot be written as \\(y = f(x)\\). A circle \\(x^2 + y^2 = 25\\), an ellipse \\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\), or the folium \\(x^3 + y^3 = 6xy\\) are all defined by equations relating \\(x\\) and \\(y\\) without explicitly solving for one in terms of the other. In this section we develop a technique, <strong>implicit differentiation</strong>, that finds \\(dy/dx\\) directly from such equations by treating \\(y\\) as a function of \\(x\\) and applying the chain rule.</p>

<div class="env-block definition">
<div class="env-label">Explicitly vs. Implicitly Defined Functions</div>
<p>An <strong>explicit</strong> function is given as \\(y = f(x)\\), where \\(y\\) is isolated on one side. An <strong>implicit</strong> relation is an equation like \\(F(x,y) = 0\\) where \\(y\\) is <em>not</em> explicitly solved for.</p>
<p>Example: The equation \\(x^2 + y^2 = 25\\) defines a circle implicitly. We cannot write it as a single function \\(y = f(x)\\) (it fails the vertical line test), but near most points it determines \\(y\\) as a <em>local</em> function of \\(x\\).</p>
</div>

<div class="env-block technique">
<div class="env-label">Implicit Differentiation Procedure</div>
<p>To find \\(\\frac{dy}{dx}\\) from an implicit equation:</p>
<ol>
<li>Differentiate both sides with respect to \\(x\\), treating \\(y\\) as a function of \\(x\\).</li>
<li>Every time you differentiate a term involving \\(y\\), apply the chain rule and multiply by \\(\\frac{dy}{dx}\\).</li>
<li>Solve algebraically for \\(\\frac{dy}{dx}\\).</li>
</ol>
</div>

<div class="env-block example">
<div class="env-label">Example: Circle \\(x^2 + y^2 = 25\\)</div>
<p>Differentiate both sides:</p>
\\[
2x + 2y\\frac{dy}{dx} = 0
\\]
<p>Solve for \\(\\frac{dy}{dx}\\):</p>
\\[
\\frac{dy}{dx} = -\\frac{x}{y}
\\]
<p>At the point \\((3,4)\\) on the circle, the slope is \\(\\frac{dy}{dx} = -\\frac{3}{4}\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Ellipse \\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\)</div>
<p>Differentiate implicitly:</p>
\\[
\\frac{2x}{9} + \\frac{2y}{4}\\frac{dy}{dx} = 0
\\]
<p>Solving:</p>
\\[
\\frac{dy}{dx} = -\\frac{4x}{9y}
\\]
</div>

<div class="env-block example">
<div class="env-label">Example: Product and Power Rule</div>
<p>Find \\(\\frac{dy}{dx}\\) if \\(x^3 + y^3 = 6xy\\).</p>
<p>Differentiate both sides (using the product rule on the right):</p>
\\[
3x^2 + 3y^2\\frac{dy}{dx} = 6y + 6x\\frac{dy}{dx}
\\]
<p>Collect the \\(\\frac{dy}{dx}\\) terms:</p>
\\[
(3y^2 - 6x)\\frac{dy}{dx} = 6y - 3x^2
\\]
\\[
\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}
\\]
</div>

<div class="env-block theorem">
<div class="env-label">Tangent Line to an Implicit Curve</div>
<p>The tangent line to the curve \\(F(x,y) = 0\\) at a point \\((a,b)\\) is:</p>
\\[
y - b = \\frac{dy}{dx}\\bigg|_{(a,b)} (x - a)
\\]
<p>where \\(\\frac{dy}{dx}\\) is found by implicit differentiation.</p>
</div>

<p><strong>Looking ahead.</strong> Implicit differentiation treats \\(y\\) as a hidden function of \\(x\\). In the next section we take a different approach: instead of hiding the relationship, we <em>parametrize</em> both coordinates as explicit functions of a third variable \\(t\\). This gives us parametric curves, which can represent paths, motions, and shapes that no single equation \\(y = f(x)\\) can capture.</p>

<div class="viz-placeholder" data-viz="viz-implicit-circle"></div>
<div class="viz-placeholder" data-viz="viz-implicit-ellipse"></div>
`,
            visualizations: [
                {
                    id: 'viz-implicit-circle',
                    title: 'Implicit Differentiation on a Circle',
                    description: 'Drag the point along the circle \\(x^2 + y^2 = 25\\). The tangent line is computed using \\(dy/dx = -x/y\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 28 });
                        var R = 5;
                        var theta = Math.PI / 4;
                        var drag = viz.addDraggable('pt', R * Math.cos(theta), R * Math.sin(theta), viz.colors.blue, 8, function(wx, wy) {
                            var len = Math.sqrt(wx * wx + wy * wy);
                            if (len < 0.01) len = 0.01;
                            drag.x = R * wx / len;
                            drag.y = R * wy / len;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw circle
                            viz.drawParametric(
                                function(t) { return R * Math.cos(t); },
                                function(t) { return R * Math.sin(t); },
                                0, 2 * Math.PI, viz.colors.teal, 2
                            );

                            var px = drag.x, py = drag.y;
                            // Tangent slope: dy/dx = -x/y
                            if (Math.abs(py) > 0.01) {
                                var slope = -px / py;
                                var dx = 3;
                                viz.drawSegment(px - dx, py - slope * dx, px + dx, py + slope * dx, viz.colors.orange, 2);
                                viz.screenText('dy/dx = ' + slope.toFixed(3), viz.width - 10, 20, viz.colors.orange, 13, 'right', 'top');
                            } else {
                                // Vertical tangent
                                viz.drawSegment(px, py - 3, px, py + 3, viz.colors.orange, 2);
                                viz.screenText('dy/dx = undefined (vertical)', viz.width - 10, 20, viz.colors.orange, 13, 'right', 'top');
                            }

                            // Normal line (passes through origin for circles centered at origin)
                            viz.drawSegment(0, 0, px, py, viz.colors.purple, 1, true);

                            viz.drawPoint(px, py, viz.colors.blue, '(' + px.toFixed(2) + ', ' + py.toFixed(2) + ')');
                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-implicit-ellipse',
                    title: 'Tangent Lines on an Ellipse',
                    description: 'Drag the point on the ellipse \\(x^2/9 + y^2/4 = 1\\). The tangent slope is \\(dy/dx = -4x/(9y)\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50 });
                        var a = 3, b = 2;
                        var theta = Math.PI / 3;
                        var drag = viz.addDraggable('pt', a * Math.cos(theta), b * Math.sin(theta), viz.colors.green, 8, function(wx, wy) {
                            // Project onto ellipse
                            var angle = Math.atan2(wy / b, wx / a);
                            drag.x = a * Math.cos(angle);
                            drag.y = b * Math.sin(angle);
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw ellipse
                            viz.drawParametric(
                                function(t) { return a * Math.cos(t); },
                                function(t) { return b * Math.sin(t); },
                                0, 2 * Math.PI, viz.colors.teal, 2
                            );

                            var px = drag.x, py = drag.y;
                            if (Math.abs(py) > 0.01) {
                                var slope = -(b * b * px) / (a * a * py);
                                var ddx = 2;
                                viz.drawSegment(px - ddx, py - slope * ddx, px + ddx, py + slope * ddx, viz.colors.orange, 2);
                                viz.screenText('dy/dx = ' + slope.toFixed(3), viz.width - 10, 20, viz.colors.orange, 13, 'right', 'top');
                            } else {
                                viz.drawSegment(px, py - 2, px, py + 2, viz.colors.orange, 2);
                                viz.screenText('dy/dx = undefined', viz.width - 10, 20, viz.colors.orange, 13, 'right', 'top');
                            }

                            viz.drawPoint(px, py, viz.colors.green, '(' + px.toFixed(2) + ', ' + py.toFixed(2) + ')');
                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find \\(\\frac{dy}{dx}\\) for the curve \\(x^2 + xy + y^2 = 7\\).',
                    hint: 'Differentiate each term: \\(\\frac{d}{dx}(xy) = y + x\\frac{dy}{dx}\\) by the product rule.',
                    solution: 'Differentiate implicitly: \\(2x + y + x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0\\). Solving: \\[\\frac{dy}{dx} = -\\frac{2x + y}{x + 2y}\\]'
                },
                {
                    question: 'Find the equation of the tangent line to \\(x^2 + y^2 = 25\\) at the point \\((3, -4)\\).',
                    hint: 'Use \\(dy/dx = -x/y\\) to find the slope at \\((3,-4)\\).',
                    solution: 'Slope: \\(\\frac{dy}{dx} = -\\frac{3}{-4} = \\frac{3}{4}\\). Tangent line: \\(y + 4 = \\frac{3}{4}(x - 3)\\), i.e., \\(y = \\frac{3}{4}x - \\frac{25}{4}\\).'
                },
                {
                    question: 'If \\(\\sin(x + y) = y^2\\cos x\\), find \\(\\frac{dy}{dx}\\).',
                    hint: 'Differentiate both sides using the chain rule on the left and the product rule on the right.',
                    solution: 'Left side: \\(\\cos(x+y)(1 + \\frac{dy}{dx})\\). Right side: \\(2y\\frac{dy}{dx}\\cos x - y^2\\sin x\\). Expanding and solving: \\[\\frac{dy}{dx} = \\frac{y^2\\sin x + \\cos(x+y)}{2y\\cos x - \\cos(x+y)}\\]'
                },
                {
                    question: 'For the folium of Descartes \\(x^3 + y^3 = 6xy\\), find all points where the tangent line is horizontal.',
                    hint: 'A horizontal tangent occurs when \\(dy/dx = 0\\), i.e., when the numerator \\(2y - x^2 = 0\\).',
                    solution: 'From \\(\\frac{dy}{dx} = \\frac{2y - x^2}{y^2 - 2x} = 0\\), we need \\(2y = x^2\\), i.e., \\(y = x^2/2\\). Substituting into \\(x^3 + y^3 = 6xy\\): \\(x^3 + x^6/8 = 3x^3\\), so \\(x^6/8 = 2x^3\\), giving \\(x^3 = 16\\) and \\(x = 2\\sqrt[3]{2}\\), \\(y = \\sqrt[3]{4} \\cdot \\sqrt[3]{2} = 2\\sqrt[3]{4}\\).'
                }
            ]
        },

        // ==================== SECTION 2 ====================
        {
            id: 'parametric-curves',
            title: 'Parametric Curves',
            content: `
<h2>Parametric Curves</h2>

<p>An implicit equation like \\(x^2 + y^2 = 25\\) tells us <em>which</em> points lie on a curve, but not <em>how</em> or <em>when</em> a point traverses it. <strong>Parametric equations</strong> fill this gap: they describe a curve as a moving point \\((x(t), y(t))\\), where the parameter \\(t\\) often represents time. This representation naturally encodes direction, speed, and self-intersections, making it indispensable in physics, computer graphics, and engineering.</p>

<p>In this section we define parametric curves, study several famous examples (including the cycloid), and practice eliminating the parameter to recover Cartesian equations. The next section will develop the calculus (slopes, arc lengths, areas) of these curves.</p>

<div class="env-block definition">
<div class="env-label">Parametric Equations</div>
<p>A <strong>parametric curve</strong> in the plane is defined by two functions:</p>
\\[
x = f(t), \\quad y = g(t), \\quad t \\in [a, b]
\\]
<p>The variable \\(t\\) is the <strong>parameter</strong>. As \\(t\\) varies, the point \\((x,y) = (f(t), g(t))\\) traces out a curve in the plane.</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Circle via Parametric Equations</div>
<p>The unit circle can be parametrized as:</p>
\\[
x = \\cos t, \\quad y = \\sin t, \\quad 0 \\le t \\le 2\\pi
\\]
<p>To verify: \\(x^2 + y^2 = \\cos^2 t + \\sin^2 t = 1\\). Eliminating the parameter recovers the implicit equation.</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Line Segment</div>
<p>The line segment from \\((1, 2)\\) to \\((4, 6)\\) can be written:</p>
\\[
x = 1 + 3t, \\quad y = 2 + 4t, \\quad 0 \\le t \\le 1
\\]
<p>Eliminating \\(t\\): from the first equation \\(t = (x-1)/3\\), substituting gives \\(y = 2 + \\frac{4}{3}(x-1) = \\frac{4}{3}x + \\frac{2}{3}\\).</p>
</div>

<div class="env-block definition">
<div class="env-label">The Cycloid</div>
<p>A <strong>cycloid</strong> is the curve traced by a point on the rim of a circle of radius \\(r\\) rolling along a straight line:</p>
\\[
x = r(t - \\sin t), \\quad y = r(1 - \\cos t)
\\]
<p>The cycloid has remarkable properties: it is the <strong>brachistochrone</strong> (curve of fastest descent) and the <strong>tautochrone</strong> (equal time of descent regardless of starting point).</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Eliminating the Parameter</div>
<p>Given \\(x = t^2\\), \\(y = t^3\\), eliminate \\(t\\):</p>
<p>From \\(x = t^2\\), we get \\(t = \\pm\\sqrt{x}\\), so \\(y = t^3 = t \\cdot t^2 = \\pm x\\sqrt{x} = \\pm x^{3/2}\\). Squaring: \\(y^2 = x^3\\).</p>
</div>

<div class="env-block remark">
<div class="env-label">Why Parametric?</div>
<p>Parametric curves can represent paths that pass through the same \\((x,y)\\) point multiple times, curves with vertical tangents, and self-intersecting curves. They also encode <em>motion</em> — the parameter \\(t\\) can represent time, giving direction and speed to the traversal of the curve.</p>
</div>

<p><strong>Looking ahead.</strong> We can now describe curves parametrically, but we have not yet done calculus on them. How do we find the tangent slope, the arc length, or the area under a parametric curve? The next section answers these questions by combining the chain rule with the parametric representation.</p>

<div class="viz-placeholder" data-viz="viz-parametric-tracer"></div>
<div class="viz-placeholder" data-viz="viz-cycloid"></div>
`,
            visualizations: [
                {
                    id: 'viz-parametric-tracer',
                    title: 'Parametric Curve Tracer',
                    description: 'Use the slider to trace out parametric curves. Watch how the point \\((x(t), y(t))\\) moves as \\(t\\) increases.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });
                        var tVal = 0;
                        var curveType = 0;
                        var curves = [
                            { name: 'Circle', fx: function(t) { return 2 * Math.cos(t); }, fy: function(t) { return 2 * Math.sin(t); }, tMin: 0, tMax: 2 * Math.PI },
                            { name: 'Lissajous', fx: function(t) { return 3 * Math.sin(2 * t); }, fy: function(t) { return 2 * Math.sin(3 * t); }, tMin: 0, tMax: 2 * Math.PI },
                            { name: 'Astroid', fx: function(t) { return 3 * Math.pow(Math.cos(t), 3); }, fy: function(t) { return 3 * Math.pow(Math.sin(t), 3); }, tMin: 0, tMax: 2 * Math.PI },
                            { name: 'Spiral', fx: function(t) { return 0.3 * t * Math.cos(t); }, fy: function(t) { return 0.3 * t * Math.sin(t); }, tMin: 0, tMax: 6 * Math.PI }
                        ];

                        var slider = VizEngine.createSlider(controls, 't =', 0, 100, 100, 1, function(v) {
                            tVal = v / 100;
                        });
                        tVal = 1;

                        VizEngine.createButton(controls, 'Next Curve', function() {
                            curveType = (curveType + 1) % curves.length;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = curves[curveType];
                            var tEnd = c.tMin + tVal * (c.tMax - c.tMin);

                            // Full curve in dim color
                            viz.drawParametric(c.fx, c.fy, c.tMin, c.tMax, viz.colors.teal + '33', 1.5);
                            // Traced portion
                            viz.drawParametric(c.fx, c.fy, c.tMin, tEnd, viz.colors.teal, 2.5);

                            // Current point
                            var px = c.fx(tEnd), py = c.fy(tEnd);
                            viz.drawPoint(px, py, viz.colors.orange, '', 6);

                            // Info
                            viz.screenText(c.name, viz.width / 2, 18, viz.colors.white, 15, 'center', 'top');
                            viz.screenText('t = ' + tEnd.toFixed(2), 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                            viz.screenText('(' + px.toFixed(2) + ', ' + py.toFixed(2) + ')', 10, viz.height - 26, viz.colors.orange, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-cycloid',
                    title: 'The Cycloid',
                    description: 'Watch a point on a rolling circle trace a cycloid. The slider controls the rolling angle.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 35, originX: 30, originY: 280 });
                        var tVal = 0;
                        var r = 1.5;

                        VizEngine.createSlider(controls, 'angle', 0, 4 * Math.PI, 0, 0.05, function(v) {
                            tVal = v;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw full cycloid curve (multiple arches)
                            viz.drawParametric(
                                function(t) { return r * (t - Math.sin(t)); },
                                function(t) { return r * (1 - Math.cos(t)); },
                                0, 4 * Math.PI, viz.colors.teal + '55', 1.5
                            );

                            // Draw traced portion
                            if (tVal > 0.01) {
                                viz.drawParametric(
                                    function(t) { return r * (t - Math.sin(t)); },
                                    function(t) { return r * (1 - Math.cos(t)); },
                                    0, tVal, viz.colors.teal, 2.5
                                );
                            }

                            // Rolling circle center
                            var cx = r * tVal;
                            var cy = r;
                            viz.drawCircle(cx, cy, r, null, viz.colors.purple + 'aa', 1.5);

                            // Spoke from center to point
                            var px = r * (tVal - Math.sin(tVal));
                            var py = r * (1 - Math.cos(tVal));
                            viz.drawSegment(cx, cy, px, py, viz.colors.orange, 1.5);

                            // Point on rim
                            viz.drawPoint(px, py, viz.colors.orange, '', 6);

                            // Ground line
                            viz.drawSegment(-1, 0, 22, 0, viz.colors.axis, 1);

                            viz.screenText('Cycloid: x = r(t - sin t), y = r(1 - cos t)', viz.width / 2, 14, viz.colors.white, 12, 'center', 'top');
                            viz.screenText('t = ' + tVal.toFixed(2), 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Eliminate the parameter to find a Cartesian equation for the curve \\(x = 3\\cos t\\), \\(y = 3\\sin t\\).',
                    hint: 'Use the identity \\(\\cos^2 t + \\sin^2 t = 1\\).',
                    solution: 'Since \\(\\cos t = x/3\\) and \\(\\sin t = y/3\\), we have \\((x/3)^2 + (y/3)^2 = 1\\), i.e., \\(x^2 + y^2 = 9\\). This is a circle of radius 3.'
                },
                {
                    question: 'A curve is defined by \\(x = t^2 - 1\\), \\(y = t^3 - t\\). Find the points where the curve crosses itself.',
                    hint: 'The curve crosses itself when \\((x(t_1), y(t_1)) = (x(t_2), y(t_2))\\) for \\(t_1 \\neq t_2\\).',
                    solution: 'From \\(t_1^2 - 1 = t_2^2 - 1\\), we get \\(t_1^2 = t_2^2\\), so \\(t_2 = -t_1\\) (since \\(t_1 \\neq t_2\\)). Then \\(t_1^3 - t_1 = t_2^3 - t_2 = -t_1^3 + t_1\\), giving \\(2t_1^3 = 2t_1\\), so \\(t_1 = \\pm 1\\). At \\(t = 1\\) and \\(t = -1\\): \\(x = 0\\), \\(y = 0\\). The curve crosses itself at the origin.'
                },
                {
                    question: 'Write parametric equations for the ellipse \\(\\frac{x^2}{16} + \\frac{y^2}{9} = 1\\) traversed counterclockwise starting at \\((4,0)\\).',
                    hint: 'An ellipse \\(x^2/a^2 + y^2/b^2 = 1\\) has a natural parametrization involving cosine and sine.',
                    solution: '\\(x = 4\\cos t\\), \\(y = 3\\sin t\\), \\(0 \\le t \\le 2\\pi\\). At \\(t=0\\): \\((4,0)\\). Counterclockwise traversal is automatic since \\(y\\) increases for small positive \\(t\\).'
                }
            ]
        },

        // ==================== SECTION 3 ====================
        {
            id: 'calculus-parametric',
            title: 'Calculus with Parametric Curves',
            content: `
<h2>Calculus with Parametric Curves</h2>

<p>In the previous section we described curves using parametric equations \\(x = f(t),\\; y = g(t)\\). Now we develop the calculus of these curves: finding tangent slopes, computing arc lengths, and calculating enclosed areas. The key idea is the chain rule. Since \\(dy/dx = (dy/dt)/(dx/dt)\\), we can compute the slope entirely from the parametric derivatives, without ever eliminating the parameter.</p>

<p>This section covers three core calculations: <strong>tangent slopes</strong> (first and second derivatives), <strong>arc length</strong>, and <strong>area</strong>. Each formula reduces to an integral in the parameter \\(t\\), which is often simpler than the corresponding Cartesian integral.</p>

<div class="env-block theorem">
<div class="env-label">Slope of a Parametric Curve</div>
<p>If \\(x = f(t)\\) and \\(y = g(t)\\) are differentiable and \\(f'(t) \\neq 0\\), then the slope of the curve is:</p>
\\[
\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{g'(t)}{f'(t)}
\\]
<p>This follows from the chain rule: \\(\\frac{dy}{dt} = \\frac{dy}{dx} \\cdot \\frac{dx}{dt}\\).</p>
</div>

<div class="env-block theorem">
<div class="env-label">Second Derivative of a Parametric Curve</div>
<p>The second derivative is:</p>
\\[
\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}
\\]
<p>Note: it is <strong>not</strong> simply \\(\\frac{d^2y/dt^2}{d^2x/dt^2}\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Slope of the Cycloid</div>
<p>For \\(x = t - \\sin t\\), \\(y = 1 - \\cos t\\):</p>
\\[
\\frac{dx}{dt} = 1 - \\cos t, \\quad \\frac{dy}{dt} = \\sin t
\\]
\\[
\\frac{dy}{dx} = \\frac{\\sin t}{1 - \\cos t}
\\]
<p>Using the identity \\(\\sin t = 2\\sin(t/2)\\cos(t/2)\\) and \\(1 - \\cos t = 2\\sin^2(t/2)\\):</p>
\\[
\\frac{dy}{dx} = \\frac{2\\sin(t/2)\\cos(t/2)}{2\\sin^2(t/2)} = \\cot\\frac{t}{2}
\\]
</div>

<div class="env-block theorem">
<div class="env-label">Arc Length of a Parametric Curve</div>
<p>The length of a parametric curve \\(x = f(t)\\), \\(y = g(t)\\) for \\(a \\le t \\le b\\) is:</p>
\\[
L = \\int_a^b \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\, dt
\\]
</div>

<div class="env-block example">
<div class="env-label">Example: Circumference of a Circle</div>
<p>For \\(x = r\\cos t\\), \\(y = r\\sin t\\), \\(0 \\le t \\le 2\\pi\\):</p>
\\[
L = \\int_0^{2\\pi} \\sqrt{r^2\\sin^2 t + r^2\\cos^2 t}\\, dt = \\int_0^{2\\pi} r\\, dt = 2\\pi r
\\]
</div>

<div class="env-block theorem">
<div class="env-label">Area Under a Parametric Curve</div>
<p>The area under a curve \\(y = g(t)\\) where \\(x = f(t)\\), from \\(t = a\\) to \\(t = b\\), is:</p>
\\[
A = \\int_a^b g(t) \\, f'(t)\\, dt
\\]
<p>This comes from the substitution \\(A = \\int y\\, dx = \\int g(t)\\, f'(t)\\, dt\\).</p>
</div>

<p><strong>Looking ahead.</strong> Parametric equations use a parameter \\(t\\) that is, conceptually, a "time" variable. But there is another natural way to parametrize curves: by the angle \\(\\theta\\) from the origin. This leads us to <strong>polar coordinates</strong>, a coordinate system where the position of a point is described by its distance \\(r\\) from the origin and the angle \\(\\theta\\) it makes with the positive \\(x\\)-axis.</p>

<div class="viz-placeholder" data-viz="viz-parametric-tangent"></div>
<div class="viz-placeholder" data-viz="viz-parametric-arclength"></div>
`,
            visualizations: [
                {
                    id: 'viz-parametric-tangent',
                    title: 'Tangent Vectors on Parametric Curves',
                    description: 'The tangent vector has components \\((dx/dt, dy/dt)\\). The slope \\(dy/dx = (dy/dt)/(dx/dt)\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });
                        var tVal = 1.0;

                        VizEngine.createSlider(controls, 't =', 0, 6.28, 1.0, 0.05, function(v) {
                            tVal = v;
                        });

                        // Lissajous-like parametric curve
                        var fx = function(t) { return 3 * Math.cos(t); };
                        var fy = function(t) { return 2 * Math.sin(2 * t); };
                        var dfx = function(t) { return -3 * Math.sin(t); };
                        var dfy = function(t) { return 4 * Math.cos(2 * t); };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Full curve
                            viz.drawParametric(fx, fy, 0, 2 * Math.PI, viz.colors.teal, 2);

                            // Current point
                            var px = fx(tVal), py = fy(tVal);
                            var vx = dfx(tVal), vy = dfy(tVal);

                            // Tangent vector (scaled)
                            var vlen = Math.sqrt(vx * vx + vy * vy);
                            var sc = 2 / (vlen > 0.01 ? vlen : 1);
                            viz.drawVector(px, py, px + vx * sc, py + vy * sc, viz.colors.orange, '', 2);

                            // Tangent line extended
                            if (vlen > 0.01) {
                                var ux = vx / vlen, uy = vy / vlen;
                                viz.drawSegment(px - ux * 4, py - uy * 4, px + ux * 4, py + uy * 4, viz.colors.orange + '44', 1);
                            }

                            viz.drawPoint(px, py, viz.colors.blue, '', 6);

                            var slopeText = Math.abs(vx) < 0.01 ? 'undefined' : (vy / vx).toFixed(3);
                            viz.screenText('dy/dx = ' + slopeText, viz.width - 10, 20, viz.colors.orange, 13, 'right', 'top');
                            viz.screenText('dx/dt = ' + vx.toFixed(2) + ', dy/dt = ' + vy.toFixed(2), viz.width - 10, 38, viz.colors.text, 12, 'right', 'top');
                            viz.screenText('t = ' + tVal.toFixed(2), 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-parametric-arclength',
                    title: 'Parametric Arc Length',
                    description: 'The highlighted portion of the curve shows the arc length from \\(t=0\\) to the slider value, computed via numerical integration.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });
                        var tVal = Math.PI;

                        VizEngine.createSlider(controls, 't =', 0, 6.28, 3.14, 0.05, function(v) {
                            tVal = v;
                        });

                        // Ellipse
                        var a = 3, b = 2;
                        var fx = function(t) { return a * Math.cos(t); };
                        var fy = function(t) { return b * Math.sin(t); };

                        function arcLength(tEnd, steps) {
                            var dt = tEnd / steps;
                            var len = 0;
                            for (var i = 0; i < steps; i++) {
                                var t1 = i * dt, t2 = (i + 1) * dt;
                                var dx = fx(t2) - fx(t1), dy = fy(t2) - fy(t1);
                                len += Math.sqrt(dx * dx + dy * dy);
                            }
                            return len;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Full ellipse dim
                            viz.drawParametric(fx, fy, 0, 2 * Math.PI, viz.colors.teal + '33', 1.5);

                            // Highlighted arc
                            if (tVal > 0.01) {
                                viz.drawParametric(fx, fy, 0, tVal, viz.colors.teal, 3);
                            }

                            // Endpoints
                            viz.drawPoint(fx(0), fy(0), viz.colors.green, 'start', 5);
                            var px = fx(tVal), py = fy(tVal);
                            viz.drawPoint(px, py, viz.colors.orange, '', 6);

                            var L = arcLength(tVal, 500);
                            viz.screenText('Arc length = ' + L.toFixed(3), viz.width / 2, 18, viz.colors.white, 14, 'center', 'top');
                            viz.screenText('t = ' + tVal.toFixed(2), 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the parametric curve \\(x = t^2\\), \\(y = t^3\\), find \\(dy/dx\\) and \\(d^2y/dx^2\\).',
                    hint: 'Compute \\(dy/dx = (dy/dt)/(dx/dt) = 3t^2/(2t) = 3t/2\\). For the second derivative, differentiate \\(dy/dx\\) with respect to \\(t\\) and divide by \\(dx/dt\\).',
                    solution: '\\(\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3t}{2}\\). Then \\(\\frac{d}{dt}(\\frac{dy}{dx}) = \\frac{3}{2}\\) and \\(\\frac{d^2y}{dx^2} = \\frac{3/2}{2t} = \\frac{3}{4t}\\).'
                },
                {
                    question: 'Find the arc length of the curve \\(x = \\cos t\\), \\(y = \\sin t\\) for \\(0 \\le t \\le \\pi/2\\).',
                    hint: 'Compute \\(\\sqrt{(dx/dt)^2 + (dy/dt)^2}\\) first.',
                    solution: '\\(dx/dt = -\\sin t\\), \\(dy/dt = \\cos t\\). So \\(\\sqrt{\\sin^2 t + \\cos^2 t} = 1\\). Therefore \\(L = \\int_0^{\\pi/2} 1\\, dt = \\pi/2\\). This is a quarter of the unit circle.'
                },
                {
                    question: 'Find the area under one arch of the cycloid \\(x = t - \\sin t\\), \\(y = 1 - \\cos t\\) for \\(0 \\le t \\le 2\\pi\\).',
                    hint: 'Use \\(A = \\int_0^{2\\pi} y(t) \\cdot x\'(t)\\, dt\\) with \\(x\'(t) = 1 - \\cos t\\).',
                    solution: '\\(A = \\int_0^{2\\pi} (1 - \\cos t)(1 - \\cos t)\\, dt = \\int_0^{2\\pi}(1 - \\cos t)^2\\, dt\\). Expanding: \\(1 - 2\\cos t + \\cos^2 t = 1 - 2\\cos t + \\frac{1 + \\cos 2t}{2}\\). Integrating: \\(A = [\\frac{3t}{2} - 2\\sin t + \\frac{\\sin 2t}{4}]_0^{2\\pi} = 3\\pi\\).'
                }
            ]
        },

        // ==================== SECTION 4 ====================
        {
            id: 'polar-coordinates',
            title: 'Polar Coordinates',
            content: `
<h2>Polar Coordinates</h2>

<p>Cartesian coordinates describe every point by its horizontal and vertical displacements \\((x, y)\\). But for curves with rotational symmetry (circles, spirals, flower-shaped petals), a more natural description uses <strong>distance from the origin</strong> and <strong>angle</strong>. This is the polar coordinate system. A polar curve \\(r = f(\\theta)\\) is really a parametric curve with \\(\\theta\\) as the parameter: \\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\). So the parametric machinery we just built applies immediately.</p>

<p>In this section we introduce the polar coordinate system, practice converting between polar and Cartesian forms, and derive the formula for the slope of a polar curve.</p>

<div class="env-block definition">
<div class="env-label">Polar Coordinate System</div>
<p>A point in the plane can be represented by <strong>polar coordinates</strong> \\((r, \\theta)\\) where:</p>
<ul>
<li>\\(r\\) is the distance from the origin (the <strong>pole</strong>)</li>
<li>\\(\\theta\\) is the angle measured counterclockwise from the positive \\(x\\)-axis (the <strong>polar axis</strong>)</li>
</ul>
</div>

<div class="env-block theorem">
<div class="env-label">Conversion Formulas</div>
<p><strong>Polar to Cartesian:</strong></p>
\\[
x = r\\cos\\theta, \\quad y = r\\sin\\theta
\\]
<p><strong>Cartesian to Polar:</strong></p>
\\[
r = \\sqrt{x^2 + y^2}, \\quad \\theta = \\arctan\\frac{y}{x} \\quad (\\text{with appropriate quadrant adjustment})
\\]
</div>

<div class="env-block example">
<div class="env-label">Example: Converting Points</div>
<p>Polar \\((2, \\pi/3)\\) to Cartesian: \\(x = 2\\cos(\\pi/3) = 1\\), \\(y = 2\\sin(\\pi/3) = \\sqrt{3}\\). So the point is \\((1, \\sqrt{3})\\).</p>
<p>Cartesian \\((-1, 1)\\) to Polar: \\(r = \\sqrt{1 + 1} = \\sqrt{2}\\), \\(\\theta = \\arctan(-1) + \\pi = 3\\pi/4\\). So the point is \\((\\sqrt{2}, 3\\pi/4)\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Polar Equations of Common Curves</div>
<ul>
<li><strong>Circle centered at origin:</strong> \\(r = a\\) (constant radius)</li>
<li><strong>Line through origin:</strong> \\(\\theta = c\\) (constant angle)</li>
<li><strong>Circle through origin:</strong> \\(r = 2a\\cos\\theta\\) is a circle of radius \\(a\\) centered at \\((a,0)\\)</li>
</ul>
</div>

<div class="env-block remark">
<div class="env-label">Negative \\(r\\) Values</div>
<p>When \\(r < 0\\), the point \\((r, \\theta)\\) is plotted in the opposite direction: it is the same as \\((|r|, \\theta + \\pi)\\). For example, \\((-2, \\pi/4)\\) is the same point as \\((2, 5\\pi/4)\\).</p>
</div>

<div class="env-block theorem">
<div class="env-label">Slope of a Polar Curve</div>
<p>For a polar curve \\(r = f(\\theta)\\), the slope in Cartesian coordinates is:</p>
\\[
\\frac{dy}{dx} = \\frac{\\frac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta}{\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}
\\]
<p>This follows from treating the polar curve as parametric: \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\).</p>
</div>

<p><strong>Looking ahead.</strong> Now that we can plot polar curves and compute their slopes, we turn to two important geometric questions: what are the shapes of famous polar curves (cardioids, roses, lemniscates), and how do we compute the area they enclose? The polar area formula \\(A = \\frac{1}{2}\\int r^2\\, d\\theta\\) will be the centerpiece of the next section.</p>

<div class="viz-placeholder" data-viz="viz-polar-coords"></div>
<div class="viz-placeholder" data-viz="viz-polar-conversion"></div>
`,
            visualizations: [
                {
                    id: 'viz-polar-coords',
                    title: 'Polar Coordinate Grid',
                    description: 'Drag the point to see its polar \\((r, \\theta)\\) and Cartesian \\((x, y)\\) coordinates.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40 });
                        var drag = viz.addDraggable('pt', 2, 1.5, viz.colors.blue, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw polar grid: concentric circles
                            var ctx = viz.ctx;
                            for (var rr = 1; rr <= 5; rr++) {
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                var sr = rr * viz.scale;
                                ctx.arc(viz.originX, viz.originY, sr, 0, 2 * Math.PI);
                                ctx.stroke();
                            }
                            // Radial lines
                            for (var k = 0; k < 12; k++) {
                                var ang = k * Math.PI / 6;
                                var ex = 5.5 * Math.cos(ang), ey = 5.5 * Math.sin(ang);
                                viz.drawSegment(0, 0, ex, ey, viz.colors.grid, 0.5);
                            }

                            var px = drag.x, py = drag.y;
                            var r = Math.sqrt(px * px + py * py);
                            var theta = Math.atan2(py, px);
                            if (theta < 0) theta += 2 * Math.PI;

                            // Draw radius line
                            viz.drawSegment(0, 0, px, py, viz.colors.orange, 2);

                            // Draw angle arc
                            if (r > 0.2) {
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var arcR = Math.min(r * viz.scale * 0.3, 40);
                                ctx.arc(viz.originX, viz.originY, arcR, -theta, 0);
                                ctx.stroke();
                            }

                            viz.drawPoint(px, py, viz.colors.blue, '', 7);
                            viz.drawDraggables();

                            viz.screenText('Cartesian: (' + px.toFixed(2) + ', ' + py.toFixed(2) + ')', 10, 18, viz.colors.teal, 13, 'left', 'top');
                            viz.screenText('Polar: (r=' + r.toFixed(2) + ', \u03b8=' + (theta * 180 / Math.PI).toFixed(1) + '\u00b0)', 10, 36, viz.colors.orange, 13, 'left', 'top');
                            viz.screenText('\u03b8 = ' + (theta / Math.PI).toFixed(2) + '\u03c0 rad', 10, 54, viz.colors.purple, 12, 'left', 'top');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-polar-conversion',
                    title: 'Polar Curve: \\(r = f(\\theta)\\)',
                    description: 'Visualize common polar equations. Toggle between different curves.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 35 });
                        var curveType = 0;
                        var thetaVal = 2 * Math.PI;

                        var curves = [
                            { name: 'r = 2 (circle)', fn: function() { return 2; } },
                            { name: 'r = 2cos(\u03b8)', fn: function(t) { return 2 * Math.cos(t); } },
                            { name: 'r = 1 + cos(\u03b8) (cardioid)', fn: function(t) { return 1 + Math.cos(t); } },
                            { name: 'r = \u03b8/\u03c0 (spiral)', fn: function(t) { return t / Math.PI; } }
                        ];

                        VizEngine.createSlider(controls, '\u03b8 max', 0, 4 * Math.PI, 2 * Math.PI, 0.1, function(v) {
                            thetaVal = v;
                        });

                        VizEngine.createButton(controls, 'Next Curve', function() {
                            curveType = (curveType + 1) % curves.length;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = curves[curveType];

                            // Full curve dim
                            viz.drawPolar(c.fn, 0, 4 * Math.PI, viz.colors.teal + '22', 1);

                            // Traced portion
                            viz.drawPolar(c.fn, 0, thetaVal, viz.colors.teal, 2.5);

                            // Current point
                            var rVal = c.fn(thetaVal);
                            var px = rVal * Math.cos(thetaVal);
                            var py = rVal * Math.sin(thetaVal);
                            viz.drawPoint(px, py, viz.colors.orange, '', 6);
                            viz.drawSegment(0, 0, px, py, viz.colors.orange + '88', 1);

                            viz.screenText(c.name, viz.width / 2, 18, viz.colors.white, 14, 'center', 'top');
                            viz.screenText('\u03b8 = ' + thetaVal.toFixed(2), 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert the polar point \\((4, 5\\pi/6)\\) to Cartesian coordinates.',
                    hint: 'Use \\(x = r\\cos\\theta\\) and \\(y = r\\sin\\theta\\).',
                    solution: '\\(x = 4\\cos(5\\pi/6) = 4 \\cdot (-\\sqrt{3}/2) = -2\\sqrt{3}\\). \\(y = 4\\sin(5\\pi/6) = 4 \\cdot (1/2) = 2\\). The Cartesian point is \\((-2\\sqrt{3}, 2)\\).'
                },
                {
                    question: 'Convert the Cartesian equation \\(x^2 + y^2 = 4x\\) to a polar equation.',
                    hint: 'Use \\(x^2 + y^2 = r^2\\) and \\(x = r\\cos\\theta\\).',
                    solution: 'Substituting: \\(r^2 = 4r\\cos\\theta\\). Dividing by \\(r\\) (for \\(r \\neq 0\\)): \\(r = 4\\cos\\theta\\). This is a circle of radius 2 centered at \\((2, 0)\\).'
                },
                {
                    question: 'Find the slope \\(dy/dx\\) of the cardioid \\(r = 1 + \\cos\\theta\\) at \\(\\theta = \\pi/2\\).',
                    hint: 'Use \\(\\frac{dy}{dx} = \\frac{(dr/d\\theta)\\sin\\theta + r\\cos\\theta}{(dr/d\\theta)\\cos\\theta - r\\sin\\theta}\\). Compute \\(dr/d\\theta = -\\sin\\theta\\).',
                    solution: 'At \\(\\theta = \\pi/2\\): \\(r = 1 + 0 = 1\\), \\(dr/d\\theta = -1\\). Numerator: \\((-1)(1) + (1)(0) = -1\\). Denominator: \\((-1)(0) - (1)(1) = -1\\). So \\(dy/dx = (-1)/(-1) = 1\\).'
                }
            ]
        },

        // ==================== SECTION 5 ====================
        {
            id: 'polar-curves-areas',
            title: 'Polar Curves & Areas',
            content: `
<h2>Polar Curves & Areas</h2>

<p>With the polar coordinate system in hand, we now explore the rich gallery of curves it produces and develop the tools to measure them. The polar area formula replaces the familiar \\(\\int y\\, dx\\) with a sum of infinitesimal circular sectors, giving \\(A = \\frac{1}{2}\\int r^2\\, d\\theta\\). We will also derive the polar arc length formula and tackle the more subtle problem of finding the area <em>between</em> two polar curves.</p>

<div class="env-block definition">
<div class="env-label">Famous Polar Curves</div>
<ul>
<li><strong>Cardioid:</strong> \\(r = a(1 + \\cos\\theta)\\) or \\(r = a(1 + \\sin\\theta)\\). Heart-shaped curve passing through the origin.</li>
<li><strong>Rose curves:</strong> \\(r = a\\cos(n\\theta)\\) or \\(r = a\\sin(n\\theta)\\). If \\(n\\) is odd, there are \\(n\\) petals; if \\(n\\) is even, there are \\(2n\\) petals.</li>
<li><strong>Lemniscate:</strong> \\(r^2 = a^2\\cos(2\\theta)\\). A figure-eight (infinity shape).</li>
<li><strong>Limacon:</strong> \\(r = a + b\\cos\\theta\\). Depending on \\(a/b\\), it can have an inner loop, be a cardioid, or be convex.</li>
</ul>
</div>

<div class="env-block theorem">
<div class="env-label">Area in Polar Coordinates</div>
<p>The area enclosed by a polar curve \\(r = f(\\theta)\\) from \\(\\theta = \\alpha\\) to \\(\\theta = \\beta\\) is:</p>
\\[
A = \\frac{1}{2}\\int_\\alpha^\\beta r^2\\, d\\theta = \\frac{1}{2}\\int_\\alpha^\\beta [f(\\theta)]^2\\, d\\theta
\\]
<p>This formula comes from summing infinitesimal circular sectors of area \\(\\frac{1}{2}r^2\\, d\\theta\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example: Area of a Cardioid</div>
<p>For \\(r = 1 + \\cos\\theta\\), the full curve is traced for \\(0 \\le \\theta \\le 2\\pi\\):</p>
\\[
A = \\frac{1}{2}\\int_0^{2\\pi}(1 + \\cos\\theta)^2\\, d\\theta = \\frac{1}{2}\\int_0^{2\\pi}(1 + 2\\cos\\theta + \\cos^2\\theta)\\, d\\theta
\\]
<p>Using \\(\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}\\):</p>
\\[
A = \\frac{1}{2}\\left[\\frac{3}{2}(2\\pi)\\right] = \\frac{3\\pi}{2}
\\]
</div>

<div class="env-block theorem">
<div class="env-label">Area Between Two Polar Curves</div>
<p>The area between \\(r_1 = f(\\theta)\\) (outer) and \\(r_2 = g(\\theta)\\) (inner) is:</p>
\\[
A = \\frac{1}{2}\\int_\\alpha^\\beta \\left([f(\\theta)]^2 - [g(\\theta)]^2\\right) d\\theta
\\]
</div>

<div class="env-block theorem">
<div class="env-label">Arc Length in Polar Coordinates</div>
<p>For a polar curve \\(r = f(\\theta)\\), the arc length from \\(\\theta = \\alpha\\) to \\(\\theta = \\beta\\) is:</p>
\\[
L = \\int_\\alpha^\\beta \\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2}\\, d\\theta
\\]
</div>

<div class="env-block intuition">
<div class="env-label">Chapter Reflection: The Full Differentiation Toolkit</div>
<p>We have now fully explored differentiation in three settings: <strong>explicit</strong> functions \\(y = f(x)\\), <strong>implicit</strong> relations \\(F(x,y) = 0\\), and <strong>parametric/polar</strong> curves \\(x = f(t),\\; y = g(t)\\). In each case the chain rule was the essential engine. Together, these techniques let us analyze tangent lines, slopes, arc lengths, and areas for virtually any curve in the plane.</p>
<p>A natural question arises: can we reverse the process? Given a derivative \\(f'(x)\\), can we recover the original function \\(f(x)\\)? This is the idea of <strong>antidifferentiation</strong>, and it leads to one of the most powerful ideas in all of mathematics: the integral. That is the subject of Chapter 8.</p>
</div>

<div class="viz-placeholder" data-viz="viz-polar-gallery"></div>
<div class="viz-placeholder" data-viz="viz-polar-area"></div>
`,
            visualizations: [
                {
                    id: 'viz-polar-gallery',
                    title: 'Gallery of Polar Curves',
                    description: 'Explore famous polar curves: cardioid, rose, lemniscate, and limacon.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50 });
                        var curveType = 0;

                        var curves = [
                            {
                                name: 'Cardioid: r = 1 + cos(\u03b8)',
                                fn: function(t) { return 1 + Math.cos(t); },
                                tMax: 2 * Math.PI,
                                sc: 50
                            },
                            {
                                name: '3-petal Rose: r = 2cos(3\u03b8)',
                                fn: function(t) { return 2 * Math.cos(3 * t); },
                                tMax: Math.PI,
                                sc: 50
                            },
                            {
                                name: '4-petal Rose: r = 2cos(2\u03b8)',
                                fn: function(t) { return 2 * Math.cos(2 * t); },
                                tMax: 2 * Math.PI,
                                sc: 50
                            },
                            {
                                name: 'Lemniscate: r\u00b2 = 4cos(2\u03b8)',
                                fn: function(t) {
                                    var val = 4 * Math.cos(2 * t);
                                    return val >= 0 ? Math.sqrt(val) : 0;
                                },
                                tMax: 2 * Math.PI,
                                sc: 60
                            },
                            {
                                name: 'Limacon: r = 1 + 2cos(\u03b8)',
                                fn: function(t) { return 1 + 2 * Math.cos(t); },
                                tMax: 2 * Math.PI,
                                sc: 45
                            }
                        ];

                        VizEngine.createButton(controls, 'Next Curve', function() {
                            curveType = (curveType + 1) % curves.length;
                        });

                        function draw() {
                            var c = curves[curveType];
                            viz.scale = c.sc;

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw polar grid
                            var ctx = viz.ctx;
                            for (var rr = 1; rr <= 4; rr++) {
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.3;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, rr * viz.scale, 0, 2 * Math.PI);
                                ctx.stroke();
                            }

                            viz.drawPolar(c.fn, 0, c.tMax, viz.colors.teal, 2.5);

                            // Also draw negative r portion for lemniscate
                            if (curveType === 3) {
                                viz.drawPolar(function(t) {
                                    var val = 4 * Math.cos(2 * t);
                                    return val >= 0 ? -Math.sqrt(val) : 0;
                                }, 0, 2 * Math.PI, viz.colors.teal, 2.5);
                            }

                            viz.screenText(c.name, viz.width / 2, 18, viz.colors.white, 14, 'center', 'top');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-polar-area',
                    title: 'Polar Area: \\(A = \\frac{1}{2}\\int r^2\\, d\\theta\\)',
                    description: 'The shaded region shows the area swept from \\(\\theta = 0\\) to the slider value, computed as \\(\\frac{1}{2}\\int_0^\\theta r^2\\, d\\theta\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 55 });
                        var thetaEnd = Math.PI;

                        VizEngine.createSlider(controls, '\u03b8 =', 0, 6.28, 3.14, 0.05, function(v) {
                            thetaEnd = v;
                        });

                        // Cardioid
                        var rFn = function(t) { return 1 + Math.cos(t); };

                        function computeArea(tEnd, steps) {
                            var dt = tEnd / steps;
                            var area = 0;
                            for (var i = 0; i < steps; i++) {
                                var t = (i + 0.5) * dt;
                                var rVal = rFn(t);
                                area += 0.5 * rVal * rVal * dt;
                            }
                            return area;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw shaded area as filled sectors
                            if (thetaEnd > 0.01) {
                                var ctx = viz.ctx;
                                var steps = 200;
                                var dt = thetaEnd / steps;
                                ctx.fillStyle = viz.colors.teal + '33';
                                ctx.beginPath();
                                var ox = viz.originX, oy = viz.originY;
                                ctx.moveTo(ox, oy);
                                for (var i = 0; i <= steps; i++) {
                                    var t = i * dt;
                                    var rVal = rFn(t);
                                    var px = ox + rVal * Math.cos(t) * viz.scale;
                                    var py = oy - rVal * Math.sin(t) * viz.scale;
                                    ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Full curve
                            viz.drawPolar(rFn, 0, 2 * Math.PI, viz.colors.teal + '55', 1.5);
                            // Highlighted portion
                            viz.drawPolar(rFn, 0, thetaEnd, viz.colors.teal, 2.5);

                            // Radial boundary lines
                            var r0 = rFn(0);
                            viz.drawSegment(0, 0, r0, 0, viz.colors.orange, 1.5);
                            var rEnd = rFn(thetaEnd);
                            viz.drawSegment(0, 0, rEnd * Math.cos(thetaEnd), rEnd * Math.sin(thetaEnd), viz.colors.orange, 1.5);

                            // Current point
                            viz.drawPoint(rEnd * Math.cos(thetaEnd), rEnd * Math.sin(thetaEnd), viz.colors.orange, '', 5);

                            var area = computeArea(thetaEnd, 500);
                            viz.screenText('r = 1 + cos(\u03b8)', viz.width / 2, 18, viz.colors.white, 14, 'center', 'top');
                            viz.screenText('Area = ' + area.toFixed(3), viz.width / 2, 38, viz.colors.teal, 14, 'center', 'top');
                            viz.screenText('\u03b8 = ' + thetaEnd.toFixed(2) + ' (' + (thetaEnd * 180 / Math.PI).toFixed(0) + '\u00b0)', 10, viz.height - 10, viz.colors.text, 12, 'left', 'bottom');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the area enclosed by one petal of the rose curve \\(r = \\cos(3\\theta)\\).',
                    hint: 'One petal is traced from \\(-\\pi/6\\) to \\(\\pi/6\\). Use \\(A = \\frac{1}{2}\\int_{-\\pi/6}^{\\pi/6} \\cos^2(3\\theta)\\, d\\theta\\).',
                    solution: 'By symmetry, \\(A = 2 \\cdot \\frac{1}{2}\\int_0^{\\pi/6} \\cos^2(3\\theta)\\, d\\theta = \\int_0^{\\pi/6} \\frac{1 + \\cos(6\\theta)}{2}\\, d\\theta = \\frac{1}{2}[\\theta + \\frac{\\sin(6\\theta)}{6}]_0^{\\pi/6} = \\frac{1}{2} \\cdot \\frac{\\pi}{6} = \\frac{\\pi}{12}\\).'
                },
                {
                    question: 'Find the total area enclosed by the lemniscate \\(r^2 = 4\\cos(2\\theta)\\).',
                    hint: 'The curve exists only where \\(\\cos(2\\theta) \\ge 0\\). By symmetry, the total area is \\(4 \\cdot \\frac{1}{2}\\int_0^{\\pi/4} 4\\cos(2\\theta)\\, d\\theta\\).',
                    solution: 'Total area: \\(A = 4 \\cdot \\frac{1}{2}\\int_0^{\\pi/4} 4\\cos(2\\theta)\\, d\\theta = 8[\\frac{\\sin(2\\theta)}{2}]_0^{\\pi/4} = 8 \\cdot \\frac{1}{2} = 4\\).'
                },
                {
                    question: 'Find the arc length of the cardioid \\(r = 1 + \\cos\\theta\\) for \\(0 \\le \\theta \\le 2\\pi\\).',
                    hint: 'Use \\(L = \\int_0^{2\\pi} \\sqrt{r^2 + (dr/d\\theta)^2}\\, d\\theta\\) with \\(dr/d\\theta = -\\sin\\theta\\).',
                    solution: '\\(r^2 + (dr/d\\theta)^2 = (1+\\cos\\theta)^2 + \\sin^2\\theta = 2 + 2\\cos\\theta = 4\\cos^2(\\theta/2)\\). So \\(L = \\int_0^{2\\pi} 2|\\cos(\\theta/2)|\\, d\\theta = 4\\int_0^{\\pi} \\cos(\\theta/2)\\, d\\theta = 4[2\\sin(\\theta/2)]_0^{\\pi} = 8\\).'
                },
                {
                    question: 'Find the area of the region inside the circle \\(r = 3\\sin\\theta\\) and outside the cardioid \\(r = 1 + \\sin\\theta\\).',
                    hint: 'First find intersection points by setting \\(3\\sin\\theta = 1 + \\sin\\theta\\), giving \\(\\sin\\theta = 1/2\\), so \\(\\theta = \\pi/6\\) and \\(\\theta = 5\\pi/6\\).',
                    solution: 'The area between the curves from \\(\\theta = \\pi/6\\) to \\(\\theta = 5\\pi/6\\): \\(A = \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}[(3\\sin\\theta)^2 - (1+\\sin\\theta)^2]\\, d\\theta = \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}(8\\sin^2\\theta - 2\\sin\\theta - 1)\\, d\\theta = \\pi\\).'
                }
            ]
        }
    ]
});
