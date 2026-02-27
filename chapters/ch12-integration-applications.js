window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Applications of Integration',
    subtitle: 'Geometric and physical applications: areas, volumes of revolution, arc length, and work',
    sections: [
        // ===== Section 1: Area Between Curves =====
        {
            id: 'ch12-sec01',
            title: 'Area Between Curves',
            content: `
                <h2>Area Between Curves 曲线围成面积</h2>

                <p>One of the most natural applications of the definite integral is computing the area of a region bounded by two or more curves. We already know that \\(\\int_a^b f(x)\\,dx\\) gives the signed area under \\(f(x)\\) from \\(a\\) to \\(b\\). Now we extend this idea to find the area <em>between</em> two curves.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.1 (Area Between Two Curves — Vertical Slicing)</div>
                    <div class="env-body">
                        <p>Let \\(f(x) \\ge g(x)\\) for all \\(x \\in [a, b]\\). The area of the region bounded above by \\(y = f(x)\\), below by \\(y = g(x)\\), and on the sides by \\(x = a\\) and \\(x = b\\) is</p>
                        \\[A = \\int_a^b \\bigl[f(x) - g(x)\\bigr]\\,dx\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of slicing the region into thin vertical strips of width \\(dx\\). Each strip has height \\(f(x) - g(x)\\), so its area is \\([f(x) - g(x)]\\,dx\\). Summing (integrating) over all strips from \\(a\\) to \\(b\\) gives the total area.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.1</div>
                    <div class="env-body">
                        <p>Find the area enclosed by \\(y = x^2\\) and \\(y = x\\).</p>
                        <p><strong>Solution.</strong> Setting \\(x^2 = x\\), we get \\(x(x-1) = 0\\), so the curves intersect at \\(x = 0\\) and \\(x = 1\\). On \\([0,1]\\), \\(x \\ge x^2\\), so</p>
                        \\[A = \\int_0^1 (x - x^2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="area-between-curves"></div>

                <div class="env-block theorem">
                    <div class="env-title">General Formula (Curves May Cross)</div>
                    <div class="env-body">
                        <p>If \\(f\\) and \\(g\\) are continuous on \\([a,b]\\), the area between them is</p>
                        \\[A = \\int_a^b |f(x) - g(x)|\\,dx\\]
                        <p>In practice, we split the interval at each crossing point and integrate \\(|f - g|\\) on each subinterval.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.2 (Horizontal Slicing — Integrating with Respect to \\(y\\))</div>
                    <div class="env-body">
                        <p>If a region is bounded on the left by \\(x = g(y)\\) and on the right by \\(x = f(y)\\) for \\(y \\in [c, d]\\), the area is</p>
                        \\[A = \\int_c^d \\bigl[f(y) - g(y)\\bigr]\\,dy\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.2</div>
                    <div class="env-body">
                        <p>Find the area enclosed by \\(x = y^2\\) and \\(x = y + 2\\).</p>
                        <p><strong>Solution.</strong> Setting \\(y^2 = y + 2\\) gives \\(y^2 - y - 2 = 0\\), so \\(y = -1\\) and \\(y = 2\\). Since \\(y + 2 \\ge y^2\\) on \\([-1, 2]\\):</p>
                        \\[A = \\int_{-1}^{2}\\bigl[(y+2) - y^2\\bigr]\\,dy = \\left[\\frac{y^2}{2} + 2y - \\frac{y^3}{3}\\right]_{-1}^{2} = \\frac{9}{2}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="horizontal-area"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark — Choosing the Variable of Integration</div>
                    <div class="env-body">
                        <p>When a region is more naturally described by horizontal slices (e.g., the boundary curves are functions of \\(y\\)), integrating with respect to \\(y\\) avoids splitting the integral into multiple pieces. Always sketch the region and choose the variable that simplifies the computation.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'area-between-curves',
                    title: 'Interactive: Area Between Two Curves',
                    description: 'Drag the endpoints or choose different function pairs to explore the area between curves',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 80, originX: 100, originY: 300
                        });

                        var funcPair = 0;
                        var pairs = [
                            {
                                f: function(x) { return x; },
                                g: function(x) { return x * x; },
                                a: 0, b: 1,
                                fLabel: 'y = x', gLabel: 'y = x^2',
                                title: 'y = x  vs  y = x^2'
                            },
                            {
                                f: function(x) { return Math.sqrt(x); },
                                g: function(x) { return x * x; },
                                a: 0, b: 1,
                                fLabel: 'y = sqrt(x)', gLabel: 'y = x^2',
                                title: 'y = sqrt(x)  vs  y = x^2'
                            },
                            {
                                f: function(x) { return 2 - x * x; },
                                g: function(x) { return x; },
                                a: -2, b: 1,
                                fLabel: 'y = 2 - x^2', gLabel: 'y = x',
                                title: 'y = 2 - x^2  vs  y = x'
                            }
                        ];

                        var nSlices = 0;

                        function numericalArea(f, g, a, b) {
                            var sum = 0;
                            var steps = 1000;
                            var dx = (b - a) / steps;
                            for (var i = 0; i < steps; i++) {
                                var x = a + (i + 0.5) * dx;
                                sum += Math.abs(f(x) - g(x)) * dx;
                            }
                            return sum;
                        }

                        function draw() {
                            var p = pairs[funcPair];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            if (nSlices > 0) {
                                var dx = (p.b - p.a) / nSlices;
                                for (var i = 0; i < nSlices; i++) {
                                    var xL = p.a + i * dx;
                                    var xR = xL + dx;
                                    var xM = (xL + xR) / 2;
                                    var top = Math.max(p.f(xM), p.g(xM));
                                    var bot = Math.min(p.f(xM), p.g(xM));
                                    var pts = [[xL, bot], [xL, top], [xR, top], [xR, bot]];
                                    viz.drawPolygon(pts, viz.colors.teal + '33', viz.colors.teal, 1);
                                }
                            } else {
                                viz.shadeBetween(p.f, p.g, p.a, p.b, viz.colors.teal + '44');
                            }

                            viz.drawFunction(p.f, -3, 4, viz.colors.blue, 2.5);
                            viz.drawFunction(p.g, -3, 4, viz.colors.orange, 2.5);

                            viz.drawSegment(p.a, -0.15, p.a, 0.15, viz.colors.white, 2);
                            viz.drawSegment(p.b, -0.15, p.b, 0.15, viz.colors.white, 2);

                            var area = numericalArea(p.f, p.g, p.a, p.b);
                            viz.screenText(p.title, viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Area = ' + area.toFixed(4), viz.width / 2, 40, viz.colors.teal, 13);
                            viz.screenText(p.fLabel, viz.width - 60, 60, viz.colors.blue, 12);
                            viz.screenText(p.gLabel, viz.width - 60, 78, viz.colors.orange, 12);
                        }

                        VizEngine.createButton(controls, 'y=x vs y=x^2', function() { funcPair = 0; draw(); });
                        VizEngine.createButton(controls, 'sqrt(x) vs x^2', function() { funcPair = 1; draw(); });
                        VizEngine.createButton(controls, '2-x^2 vs x', function() { funcPair = 2; draw(); });
                        VizEngine.createSlider(controls, 'Rectangles', 0, 50, 0, 1, function(v) { nSlices = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'horizontal-area',
                    title: 'Interactive: Horizontal Slicing (Integrating w.r.t. y)',
                    description: 'Visualize area calculation using horizontal slices between x = y^2 and x = y + 2',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 60, originX: 120, originY: 280
                        });

                        var nSlices = 0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var yMin = -1, yMax = 2;
                            var rightF = function(y) { return y + 2; };
                            var leftF = function(y) { return y * y; };

                            if (nSlices > 0) {
                                var dy = (yMax - yMin) / nSlices;
                                for (var i = 0; i < nSlices; i++) {
                                    var yL = yMin + i * dy;
                                    var yR = yL + dy;
                                    var yM = (yL + yR) / 2;
                                    var xLeft = leftF(yM);
                                    var xRight = rightF(yM);
                                    var pts = [[xLeft, yL], [xRight, yL], [xRight, yR], [xLeft, yR]];
                                    viz.drawPolygon(pts, viz.colors.purple + '33', viz.colors.purple, 1);
                                }
                            } else {
                                var ctx = viz.ctx;
                                ctx.fillStyle = viz.colors.purple + '44';
                                ctx.beginPath();
                                var steps = 200;
                                for (var i = 0; i <= steps; i++) {
                                    var y = yMin + (yMax - yMin) * i / steps;
                                    var x = rightF(y);
                                    var sx = viz.toScreen(x, y);
                                    i === 0 ? ctx.moveTo(sx[0], sx[1]) : ctx.lineTo(sx[0], sx[1]);
                                }
                                for (var i = steps; i >= 0; i--) {
                                    var y = yMin + (yMax - yMin) * i / steps;
                                    var x = leftF(y);
                                    var sx = viz.toScreen(x, y);
                                    ctx.lineTo(sx[0], sx[1]);
                                }
                                ctx.closePath();
                                ctx.fill();
                            }

                            viz.drawFunction(function(x) { return Math.sqrt(x); }, 0, 5, viz.colors.orange, 2);
                            viz.drawFunction(function(x) { return -Math.sqrt(x); }, 0, 5, viz.colors.orange, 2);
                            viz.drawFunction(function(x) { return x - 2; }, -1, 5, viz.colors.blue, 2);

                            viz.drawPoint(1, -1, viz.colors.white, '(-1, 1)', 4);
                            viz.drawPoint(4, 2, viz.colors.white, '(2, 4)', 4);

                            viz.screenText('x = y^2 (orange)  vs  x = y+2 (blue)', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('Area = 9/2 = 4.5', viz.width / 2, 40, viz.colors.purple, 13);
                        }

                        VizEngine.createSlider(controls, 'Horizontal strips', 0, 40, 0, 1, function(v) { nSlices = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch12-ex01',
                    type: 'numeric',
                    question: 'Find the area enclosed by y = x^2 and y = 2x. Give your answer as a fraction (numerator only if denominator is 3).',
                    hint: 'The curves intersect at x = 0 and x = 2. Integrate (2x - x^2) from 0 to 2.',
                    answer: '4/3',
                    solution: 'Setting x^2 = 2x gives x = 0, 2. On [0,2], 2x >= x^2. A = integral from 0 to 2 of (2x - x^2) dx = [x^2 - x^3/3] from 0 to 2 = 4 - 8/3 = 4/3.'
                },
                {
                    id: 'ch12-ex02',
                    type: 'numeric',
                    question: 'Find the area of the region bounded by y = sin(x) and y = cos(x) from x = 0 to x = pi/2. Round to 4 decimal places.',
                    hint: 'The curves cross at x = pi/4. Split into two integrals.',
                    answer: '0.8284',
                    solution: 'On [0, pi/4], cos(x) >= sin(x). On [pi/4, pi/2], sin(x) >= cos(x). A = integral_0^{pi/4} (cos x - sin x) dx + integral_{pi/4}^{pi/2} (sin x - cos x) dx = [sin x + cos x]_0^{pi/4} + [-cos x - sin x]_{pi/4}^{pi/2} = (sqrt(2) - 1) + (sqrt(2) - 1) = 2(sqrt(2) - 1) approx 0.8284.'
                },
                {
                    id: 'ch12-ex03',
                    type: 'mc',
                    question: 'For the region enclosed by x = y^2 and x = 4, which integral gives the area using horizontal slices?',
                    options: [
                        'integral from -2 to 2 of (4 - y^2) dy',
                        'integral from 0 to 4 of (sqrt(x) - (-sqrt(x))) dx',
                        'integral from 0 to 4 of (4 - x^2) dx',
                        'integral from -2 to 2 of (y^2 - 4) dy'
                    ],
                    answer: 0,
                    solution: 'Using horizontal slices, the right boundary is x = 4 and the left boundary is x = y^2. The y-limits are from -2 to 2 (where y^2 = 4). So A = integral from -2 to 2 of (4 - y^2) dy.'
                }
            ]
        },

        // ===== Section 2: Volume by Disk/Washer Method =====
        {
            id: 'ch12-sec02',
            title: 'Volume by Disk/Washer Method',
            content: `
                <h2>Volume by Disk/Washer Method 圆盘/垫圈法</h2>

                <p>When a region in the plane is rotated about an axis, it sweeps out a <strong>solid of revolution</strong> (旋转体). The disk and washer methods compute the volume of such solids by slicing them into thin circular cross-sections perpendicular to the axis of rotation.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.3 (Disk Method)</div>
                    <div class="env-body">
                        <p>If the region under \\(y = f(x) \\ge 0\\) on \\([a, b]\\) is rotated about the \\(x\\)-axis, each cross-section at position \\(x\\) is a disk of radius \\(R(x) = f(x)\\). The volume is</p>
                        \\[V = \\pi \\int_a^b [f(x)]^2\\,dx\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Imagine slicing the solid like a loaf of bread. Each slice is a thin disk with radius \\(f(x)\\) and thickness \\(dx\\). Its volume is \\(\\pi [f(x)]^2 dx\\). Summing all slices gives the total volume.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.3</div>
                    <div class="env-body">
                        <p>Find the volume of the solid obtained by rotating \\(y = \\sqrt{x}\\) from \\(x = 0\\) to \\(x = 4\\) about the \\(x\\)-axis.</p>
                        <p><strong>Solution.</strong></p>
                        \\[V = \\pi \\int_0^4 (\\sqrt{x})^2\\,dx = \\pi \\int_0^4 x\\,dx = \\pi\\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="disk-method"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.4 (Washer Method)</div>
                    <div class="env-body">
                        <p>If the region between \\(y = f(x)\\) (outer) and \\(y = g(x)\\) (inner), with \\(f(x) \\ge g(x) \\ge 0\\), is rotated about the \\(x\\)-axis, each cross-section is a <strong>washer</strong> (annulus) with outer radius \\(R(x) = f(x)\\) and inner radius \\(r(x) = g(x)\\). The volume is</p>
                        \\[V = \\pi \\int_a^b \\bigl([f(x)]^2 - [g(x)]^2\\bigr)\\,dx\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.4</div>
                    <div class="env-body">
                        <p>Find the volume of the solid obtained by rotating the region between \\(y = x\\) and \\(y = x^2\\) (on \\([0,1]\\)) about the \\(x\\)-axis.</p>
                        <p><strong>Solution.</strong> The outer radius is \\(R = x\\) and the inner radius is \\(r = x^2\\).</p>
                        \\[V = \\pi \\int_0^1 (x^2 - x^4)\\,dx = \\pi\\left[\\frac{x^3}{3} - \\frac{x^5}{5}\\right]_0^1 = \\pi\\left(\\frac{1}{3} - \\frac{1}{5}\\right) = \\frac{2\\pi}{15}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="washer-method"></div>

                <div class="env-block theorem">
                    <div class="env-title">Rotation About Other Axes</div>
                    <div class="env-body">
                        <p>When rotating about a horizontal line \\(y = L\\), the radii become:</p>
                        \\[R(x) = f(x) - L \\quad \\text{or} \\quad R(x) = L - f(x)\\]
                        <p>depending on which side of the line the curve lies. Similarly, rotation about a vertical line \\(x = L\\) uses integration with respect to \\(y\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The disk method is a special case of the washer method with \\(r(x) = 0\\). Always check: the axis of rotation determines which function is the outer radius and which is the inner radius.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'disk-method',
                    title: 'Interactive: Disk Method — Rotation About the x-axis',
                    description: 'See how the curve y = sqrt(x) generates a solid of revolution via disk cross-sections',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 55, originX: 80, originY: 210
                        });

                        var xSlice = 2;
                        var nDisks = 0;
                        var showCrossSection = true;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var f = function(x) { return Math.sqrt(x); };
                            var a = 0, b = 4;

                            if (nDisks > 0) {
                                var dx = (b - a) / nDisks;
                                for (var i = 0; i < nDisks; i++) {
                                    var xc = a + (i + 0.5) * dx;
                                    var r = f(xc);
                                    var xL = a + i * dx;
                                    var xR = xL + dx;
                                    viz.drawPolygon(
                                        [[xL, -r], [xL, r], [xR, r], [xR, -r]],
                                        viz.colors.blue + '22', viz.colors.blue + '66', 1
                                    );
                                }
                            } else {
                                viz.shadeBetween(f, function(x) { return -f(x); }, a, b, viz.colors.blue + '22');
                            }

                            viz.drawFunction(f, 0, 5, viz.colors.blue, 2.5);
                            viz.drawFunction(function(x) { return -f(x); }, 0, 5, viz.colors.blue + '88', 1.5, 300);

                            if (showCrossSection && xSlice >= a && xSlice <= b) {
                                var r = f(xSlice);
                                viz.drawSegment(xSlice, -r, xSlice, r, viz.colors.orange, 2);
                                viz.drawCircle(xSlice, 0, r, null, viz.colors.orange, 2);
                                viz.drawSegment(xSlice, 0, xSlice, r, viz.colors.red, 2);
                                viz.drawText('R = ' + r.toFixed(2), xSlice + 0.3, r / 2, viz.colors.red, 12, 'left');
                            }

                            var volume = Math.PI * b * b / 2;
                            viz.screenText('y = sqrt(x) rotated about x-axis', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('V = 8pi = ' + volume.toFixed(2), viz.width / 2, 38, viz.colors.blue, 13);
                        }

                        VizEngine.createSlider(controls, 'Slice at x', 0, 4, 2, 0.1, function(v) { xSlice = v; draw(); });
                        VizEngine.createSlider(controls, 'Number of disks', 0, 30, 0, 1, function(v) { nDisks = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'washer-method',
                    title: 'Interactive: Washer Method — Two Curves',
                    description: 'Visualize the washer cross-sections when rotating the region between y = x and y = x^2 about the x-axis',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 140, originX: 80, originY: 210
                        });

                        var xSlice = 0.5;
                        var showWasher = true;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var fOuter = function(x) { return x; };
                            var fInner = function(x) { return x * x; };

                            viz.shadeBetween(fOuter, function(x) { return -fOuter(x); }, 0, 1, viz.colors.blue + '15');
                            viz.shadeBetween(fInner, function(x) { return -fInner(x); }, 0, 1, viz.colors.bg);

                            viz.shadeBetween(fOuter, fInner, 0, 1, viz.colors.teal + '33');

                            viz.drawFunction(fOuter, -0.5, 1.5, viz.colors.blue, 2.5);
                            viz.drawFunction(fInner, -0.5, 1.5, viz.colors.orange, 2.5);
                            viz.drawFunction(function(x) { return -fOuter(x); }, 0, 1.5, viz.colors.blue + '55', 1.5);
                            viz.drawFunction(function(x) { return -fInner(x); }, 0, 1.5, viz.colors.orange + '55', 1.5);

                            if (showWasher && xSlice > 0 && xSlice < 1) {
                                var R = fOuter(xSlice);
                                var r = fInner(xSlice);
                                viz.drawCircle(xSlice, 0, R, viz.colors.blue + '22', viz.colors.blue, 2);
                                viz.drawCircle(xSlice, 0, r, viz.colors.bg, viz.colors.orange, 2);
                                viz.drawSegment(xSlice, 0, xSlice, R, viz.colors.blue, 2);
                                viz.drawSegment(xSlice, 0, xSlice, r, viz.colors.orange, 2);
                                viz.drawText('R=' + R.toFixed(2), xSlice + 0.08, R / 2, viz.colors.blue, 11, 'left');
                                viz.drawText('r=' + r.toFixed(2), xSlice + 0.08, r / 2 - 0.05, viz.colors.orange, 11, 'left');
                            }

                            viz.screenText('Washer: y = x (outer) and y = x^2 (inner)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('V = 2pi/15 = ' + (2 * Math.PI / 15).toFixed(4), viz.width / 2, 38, viz.colors.teal, 13);
                        }

                        VizEngine.createSlider(controls, 'Slice at x', 0.05, 0.95, 0.5, 0.01, function(v) { xSlice = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch12-ex04',
                    type: 'mc',
                    question: 'The volume of the solid obtained by rotating y = x^3 from x = 0 to x = 1 about the x-axis is:',
                    options: [
                        'pi/7',
                        'pi/5',
                        'pi/3',
                        '2pi/7'
                    ],
                    answer: 0,
                    solution: 'V = pi * integral_0^1 (x^3)^2 dx = pi * integral_0^1 x^6 dx = pi * [x^7/7]_0^1 = pi/7.'
                },
                {
                    id: 'ch12-ex05',
                    type: 'numeric',
                    question: 'Find the volume when the region between y = sqrt(x) and y = x (from x = 0 to x = 1) is rotated about the x-axis. Express your answer as a multiple of pi (e.g., if V = 3pi, enter 3). Give a fraction.',
                    hint: 'Use the washer method: V = pi * integral_0^1 [(sqrt(x))^2 - x^2] dx.',
                    answer: '1/6',
                    solution: 'V = pi * integral_0^1 (x - x^2) dx = pi * [x^2/2 - x^3/3]_0^1 = pi(1/2 - 1/3) = pi/6. So the answer is 1/6.'
                },
                {
                    id: 'ch12-ex06',
                    type: 'numeric',
                    question: 'The region under y = e^(-x) from x = 0 to x = 1 is rotated about the x-axis. Find the volume. Round to 4 decimal places.',
                    hint: 'V = pi * integral_0^1 e^(-2x) dx.',
                    answer: '1.3582',
                    solution: 'V = pi * integral_0^1 e^(-2x) dx = pi * [-e^(-2x)/2]_0^1 = pi * (1/2 - e^(-2)/2) = pi(1 - e^(-2))/2 = pi * 0.4323 approx 1.3582.'
                }
            ]
        },

        // ===== Section 3: Volume by Shell Method =====
        {
            id: 'ch12-sec03',
            title: 'Volume by Shell Method',
            content: `
                <h2>Volume by Shell Method 柱壳法</h2>

                <p>The <strong>shell method</strong> (cylindrical shells method, 柱壳法) provides an alternative approach to computing volumes of revolution. Instead of slicing the solid into disks perpendicular to the axis, we decompose it into thin cylindrical shells parallel to the axis.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.5 (Shell Method — Rotation About the \\(y\\)-axis)</div>
                    <div class="env-body">
                        <p>If the region under \\(y = f(x) \\ge 0\\) on \\([a, b]\\) (with \\(0 \\le a < b\\)) is rotated about the \\(y\\)-axis, the volume is</p>
                        \\[V = 2\\pi \\int_a^b x \\cdot f(x)\\,dx\\]
                        <p>Here \\(x\\) is the <strong>shell radius</strong>, \\(f(x)\\) is the <strong>shell height</strong>, and \\(2\\pi x\\,dx\\) is the circumference times thickness.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Imagine peeling the solid like an onion — each layer is a thin cylindrical shell. A shell at distance \\(x\\) from the \\(y\\)-axis has:</p>
                        <ul>
                            <li><strong>Radius</strong>: \\(x\\)</li>
                            <li><strong>Height</strong>: \\(f(x)\\)</li>
                            <li><strong>Thickness</strong>: \\(dx\\)</li>
                            <li><strong>Volume</strong>: \\(2\\pi x \\cdot f(x)\\,dx\\) (circumference times height times thickness)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.5</div>
                    <div class="env-body">
                        <p>Find the volume of the solid obtained by rotating \\(y = x^2\\) from \\(x = 0\\) to \\(x = 1\\) about the \\(y\\)-axis.</p>
                        <p><strong>Solution (Shell Method).</strong></p>
                        \\[V = 2\\pi \\int_0^1 x \\cdot x^2\\,dx = 2\\pi \\int_0^1 x^3\\,dx = 2\\pi \\cdot \\frac{1}{4} = \\frac{\\pi}{2}\\]
                        <p><strong>Verification (Disk Method about \\(y\\)-axis).</strong> Solving \\(y = x^2\\) gives \\(x = \\sqrt{y}\\). For \\(y \\in [0,1]\\):</p>
                        \\[V = \\pi \\int_0^1 (\\sqrt{y})^2\\,dy = \\pi \\int_0^1 y\\,dy = \\frac{\\pi}{2} \\quad \\checkmark\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="shell-method"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.1 (When to Use Shells vs. Disks)</div>
                    <div class="env-body">
                        <p>Both methods compute the same volume, but one may be easier than the other:</p>
                        <ul>
                            <li><strong>Disk/Washer</strong>: Slices perpendicular to the axis of rotation. Use when the boundary is easily expressed as a function of the variable along the axis.</li>
                            <li><strong>Shell</strong>: Slices parallel to the axis of rotation. Use when the boundary is easily expressed as a function of the variable perpendicular to the axis, or when solving for the perpendicular variable is difficult.</li>
                        </ul>
                        <p>Rule of thumb: if the axis of rotation is vertical and the integrand is naturally \\(f(x)\\), <strong>shells</strong> are often simpler.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.6</div>
                    <div class="env-body">
                        <p>Find the volume when the region between \\(y = x\\) and \\(y = x^2\\) is rotated about the \\(y\\)-axis.</p>
                        <p><strong>Solution.</strong> The shell height is \\(x - x^2\\) (top minus bottom), and the shell radius is \\(x\\):</p>
                        \\[V = 2\\pi \\int_0^1 x(x - x^2)\\,dx = 2\\pi \\int_0^1 (x^2 - x^3)\\,dx = 2\\pi\\left[\\frac{x^3}{3} - \\frac{x^4}{4}\\right]_0^1 = 2\\pi \\cdot \\frac{1}{12} = \\frac{\\pi}{6}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="shell-vs-disk"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark — Shell Method About Other Axes</div>
                    <div class="env-body">
                        <p>When rotating about \\(x = L\\) instead of the \\(y\\)-axis, the shell radius becomes \\(|x - L|\\). When rotating about the \\(x\\)-axis and integrating with respect to \\(y\\), the shell formula becomes \\(V = 2\\pi \\int_c^d y \\cdot [\\text{right} - \\text{left}]\\,dy\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'shell-method',
                    title: 'Interactive: Shell Method — Cylindrical Shells',
                    description: 'Visualize cylindrical shells formed by rotating y = x^2 about the y-axis',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 120, originX: 280, originY: 320
                        });

                        var nShells = 6;
                        var highlightShell = 3;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var f = function(x) { return x * x; };
                            var a = 0, b = 1;
                            var dx = (b - a) / nShells;

                            for (var i = nShells - 1; i >= 0; i--) {
                                var xc = a + (i + 0.5) * dx;
                                var h = f(xc);
                                var rOuter = xc + dx / 2;
                                var rInner = xc - dx / 2;
                                if (rInner < 0) rInner = 0;

                                var isHighlight = (i === highlightShell - 1);
                                var fillColor = isHighlight ? viz.colors.orange + '55' : viz.colors.teal + '22';
                                var strokeColor = isHighlight ? viz.colors.orange : viz.colors.teal + '88';

                                var pts = [[-rOuter, 0], [-rOuter, h], [-rInner, h], [-rInner, 0]];
                                viz.drawPolygon(pts, fillColor, strokeColor, 1);

                                var pts2 = [[rInner, 0], [rInner, h], [rOuter, h], [rOuter, 0]];
                                viz.drawPolygon(pts2, fillColor, strokeColor, 1);

                                if (isHighlight) {
                                    viz.drawEllipse(0, h, rOuter, rOuter * 0.2, 0, fillColor, strokeColor);
                                    viz.drawEllipse(0, 0, rOuter, rOuter * 0.2, 0, null, strokeColor);
                                }
                            }

                            viz.drawFunction(f, 0, 1.2, viz.colors.blue, 2.5);
                            viz.drawFunction(function(x) { return f(-x); }, -1.2, 0, viz.colors.blue + '88', 1.5);

                            var vol = Math.PI / 2;
                            viz.screenText('y = x^2 rotated about y-axis (Shells)', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('V = pi/2 = ' + vol.toFixed(4), viz.width / 2, 38, viz.colors.teal, 13);
                            if (highlightShell >= 1 && highlightShell <= nShells) {
                                var xH = a + (highlightShell - 0.5) * dx;
                                viz.screenText('Shell #' + highlightShell + ': radius = ' + xH.toFixed(2) + ', height = ' + f(xH).toFixed(2), viz.width / 2, 58, viz.colors.orange, 12);
                            }
                        }

                        VizEngine.createSlider(controls, 'Number of shells', 2, 20, 6, 1, function(v) {
                            nShells = Math.round(v);
                            if (highlightShell > nShells) highlightShell = nShells;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Highlight shell #', 1, 20, 3, 1, function(v) {
                            highlightShell = Math.min(Math.round(v), nShells);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'shell-vs-disk',
                    title: 'Interactive: Shells vs. Disks Comparison',
                    description: 'Compare the shell and disk decompositions for the same solid of revolution',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 120, originX: 100, originY: 320
                        });

                        var method = 'shell';
                        var n = 6;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var f = function(x) { return x; };
                            var g = function(x) { return x * x; };

                            viz.shadeBetween(f, g, 0, 1, viz.colors.teal + '22');

                            if (method === 'shell') {
                                var dx = 1.0 / n;
                                for (var i = 0; i < n; i++) {
                                    var xc = (i + 0.5) * dx;
                                    var h = f(xc) - g(xc);
                                    var xL = i * dx;
                                    var xR = xL + dx;
                                    viz.drawPolygon(
                                        [[xL, g(xc)], [xL, f(xc)], [xR, f(xc)], [xR, g(xc)]],
                                        viz.colors.purple + '33', viz.colors.purple, 1
                                    );
                                }
                                viz.screenText('Shell method: V = 2pi * integral x(x - x^2) dx', viz.width / 2, 38, viz.colors.purple, 12);
                            } else {
                                var dy = 1.0 / n;
                                for (var i = 0; i < n; i++) {
                                    var yc = (i + 0.5) * dy;
                                    var xRight = Math.sqrt(yc);
                                    var xLeft = yc;
                                    var yL = i * dy;
                                    var yR = yL + dy;
                                    viz.drawPolygon(
                                        [[xLeft, yL], [xRight, yL], [xRight, yR], [xLeft, yR]],
                                        viz.colors.orange + '33', viz.colors.orange, 1
                                    );
                                }
                                viz.screenText('Washer method: V = pi * integral (sqrt(y)^2 - y^2) dy', viz.width / 2, 38, viz.colors.orange, 12);
                            }

                            viz.drawFunction(f, -0.2, 1.3, viz.colors.blue, 2.5);
                            viz.drawFunction(g, -0.2, 1.3, viz.colors.orange, 2.5);

                            var vol = Math.PI / 6;
                            viz.screenText('y = x (blue) vs y = x^2 (orange) about y-axis', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('V = pi/6 = ' + vol.toFixed(4), viz.width / 2, 56, viz.colors.teal, 13);
                        }

                        VizEngine.createButton(controls, 'Shells', function() { method = 'shell'; draw(); });
                        VizEngine.createButton(controls, 'Washers', function() { method = 'washer'; draw(); });
                        VizEngine.createSlider(controls, 'Subdivisions', 2, 25, 6, 1, function(v) { n = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch12-ex07',
                    type: 'numeric',
                    question: 'Use the shell method to find the volume when y = 1 - x^2 (for x >= 0, y >= 0) is rotated about the y-axis. Express as a multiple of pi (e.g., if V = 3pi, enter 3). Give a fraction.',
                    hint: 'V = 2pi * integral_0^1 x(1 - x^2) dx.',
                    answer: '1/2',
                    solution: 'V = 2pi * integral_0^1 x(1 - x^2) dx = 2pi * integral_0^1 (x - x^3) dx = 2pi * [x^2/2 - x^4/4]_0^1 = 2pi * (1/2 - 1/4) = 2pi * 1/4 = pi/2. As a multiple of pi: 1/2.'
                },
                {
                    id: 'ch12-ex08',
                    type: 'mc',
                    question: 'Which integral gives the volume when y = sin(x), x in [0, pi], is rotated about the y-axis using the shell method?',
                    options: [
                        '2pi * integral_0^pi x sin(x) dx',
                        'pi * integral_0^pi sin^2(x) dx',
                        '2pi * integral_0^1 y arcsin(y) dy',
                        'pi * integral_0^pi x^2 sin(x) dx'
                    ],
                    answer: 0,
                    solution: 'Using shells about the y-axis with vertical strips: shell radius = x, shell height = sin(x), so V = 2pi * integral_0^pi x sin(x) dx.'
                },
                {
                    id: 'ch12-ex09',
                    type: 'mc',
                    question: 'For computing the volume of y = ln(x) from x = 1 to x = e, rotated about the y-axis, which method avoids solving for x in terms of y?',
                    options: [
                        'Shell method (integrate with respect to x)',
                        'Disk method (integrate with respect to y)',
                        'Washer method (integrate with respect to x)',
                        'Either method is equally convenient'
                    ],
                    answer: 0,
                    solution: 'The shell method integrates with respect to x: V = 2pi * integral_1^e x ln(x) dx. The disk method would require integrating with respect to y and using x = e^y, which is also tractable but requires different limits. The shell method avoids the variable change entirely.'
                }
            ]
        },

        // ===== Section 4: Arc Length =====
        {
            id: 'ch12-sec04',
            title: 'Arc Length',
            content: `
                <h2>Arc Length 弧长</h2>

                <p>We now turn to measuring the <strong>length of a curve</strong> (弧长). The key idea is to approximate the curve by a sequence of line segments and take the limit as the number of segments approaches infinity.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.6 (Arc Length of \\(y = f(x)\\))</div>
                    <div class="env-body">
                        <p>If \\(f'\\) is continuous on \\([a, b]\\), the arc length of the curve \\(y = f(x)\\) from \\(x = a\\) to \\(x = b\\) is</p>
                        \\[L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Derivation</div>
                    <div class="env-body">
                        <p>Partition \\([a, b]\\) into \\(n\\) subintervals \\([x_{i-1}, x_i]\\). The length of the line segment from \\((x_{i-1}, f(x_{i-1}))\\) to \\((x_i, f(x_i))\\) is</p>
                        \\[\\Delta s_i = \\sqrt{(\\Delta x_i)^2 + (\\Delta y_i)^2} = \\sqrt{1 + \\left(\\frac{\\Delta y_i}{\\Delta x_i}\\right)^2}\\,\\Delta x_i\\]
                        <p>By the Mean Value Theorem, \\(\\frac{\\Delta y_i}{\\Delta x_i} = f'(c_i)\\) for some \\(c_i \\in (x_{i-1}, x_i)\\). Taking the limit as \\(n \\to \\infty\\):</p>
                        \\[L = \\lim_{n \\to \\infty} \\sum_{i=1}^n \\sqrt{1 + [f'(c_i)]^2}\\,\\Delta x_i = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.7</div>
                    <div class="env-body">
                        <p>Find the arc length of \\(y = x^{3/2}\\) from \\(x = 0\\) to \\(x = 4\\).</p>
                        <p><strong>Solution.</strong> \\(f'(x) = \\frac{3}{2}x^{1/2}\\), so \\([f'(x)]^2 = \\frac{9}{4}x\\).</p>
                        \\[L = \\int_0^4 \\sqrt{1 + \\frac{9}{4}x}\\,dx\\]
                        <p>Let \\(u = 1 + \\frac{9}{4}x\\), \\(du = \\frac{9}{4}dx\\):</p>
                        \\[L = \\frac{4}{9}\\int_1^{10} \\sqrt{u}\\,du = \\frac{4}{9} \\cdot \\frac{2}{3}\\left[u^{3/2}\\right]_1^{10} = \\frac{8}{27}(10\\sqrt{10} - 1) \\approx 9.0734\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="arc-length"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.7 (Parametric Arc Length)</div>
                    <div class="env-body">
                        <p>If a curve is given parametrically as \\(x = x(t)\\), \\(y = y(t)\\) for \\(t \\in [\\alpha, \\beta]\\), with \\(x'(t)\\) and \\(y'(t)\\) continuous, the arc length is</p>
                        \\[L = \\int_\\alpha^\\beta \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.8</div>
                    <div class="env-body">
                        <p>Find the circumference of the circle \\(x = r\\cos t\\), \\(y = r\\sin t\\), \\(0 \\le t \\le 2\\pi\\).</p>
                        <p><strong>Solution.</strong> \\(x'(t) = -r\\sin t\\), \\(y'(t) = r\\cos t\\).</p>
                        \\[L = \\int_0^{2\\pi} \\sqrt{r^2\\sin^2 t + r^2\\cos^2 t}\\,dt = \\int_0^{2\\pi} r\\,dt = 2\\pi r\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="parametric-arc-length"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark — The Differential of Arc Length</div>
                    <div class="env-body">
                        <p>We write \\(ds = \\sqrt{1 + [f'(x)]^2}\\,dx\\) or equivalently \\(ds = \\sqrt{(dx)^2 + (dy)^2}\\). This "arc length element" appears in many formulas including surface area and line integrals in vector calculus.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'arc-length',
                    title: 'Interactive: Arc Length Approximation',
                    description: 'See how polygonal approximations converge to the true arc length as the number of segments increases',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 60, originX: 80, originY: 320
                        });

                        var nSegments = 4;
                        var funcChoice = 0;
                        var funcs = [
                            {
                                f: function(x) { return Math.pow(x, 1.5); },
                                fp: function(x) { return 1.5 * Math.sqrt(x); },
                                a: 0, b: 4,
                                label: 'y = x^(3/2)',
                                trueLength: 8 / 27 * (10 * Math.sqrt(10) - 1)
                            },
                            {
                                f: function(x) { return Math.sin(x); },
                                fp: function(x) { return Math.cos(x); },
                                a: 0, b: Math.PI,
                                label: 'y = sin(x)',
                                trueLength: 3.8202
                            },
                            {
                                f: function(x) { return x * x / 4; },
                                fp: function(x) { return x / 2; },
                                a: 0, b: 4,
                                label: 'y = x^2/4',
                                trueLength: 4.6468
                            }
                        ];

                        function polyLength(fc, n) {
                            var dx = (fc.b - fc.a) / n;
                            var len = 0;
                            for (var i = 0; i < n; i++) {
                                var x0 = fc.a + i * dx;
                                var x1 = x0 + dx;
                                var y0 = fc.f(x0);
                                var y1 = fc.f(x1);
                                len += Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
                            }
                            return len;
                        }

                        function draw() {
                            var fc = funcs[funcChoice];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.drawFunction(fc.f, fc.a - 0.5, fc.b + 0.5, viz.colors.blue, 2.5);

                            var dx = (fc.b - fc.a) / nSegments;
                            for (var i = 0; i < nSegments; i++) {
                                var x0 = fc.a + i * dx;
                                var x1 = x0 + dx;
                                viz.drawSegment(x0, fc.f(x0), x1, fc.f(x1), viz.colors.orange, 2);
                                viz.drawPoint(x0, fc.f(x0), viz.colors.orange, null, 3);
                            }
                            viz.drawPoint(fc.b, fc.f(fc.b), viz.colors.orange, null, 3);

                            var approxLen = polyLength(fc, nSegments);
                            viz.screenText(fc.label + ', n = ' + nSegments + ' segments', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Approx length: ' + approxLen.toFixed(4), viz.width / 2, 38, viz.colors.orange, 13);
                            viz.screenText('True length: ' + fc.trueLength.toFixed(4), viz.width / 2, 56, viz.colors.blue, 13);
                        }

                        VizEngine.createButton(controls, 'x^(3/2)', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'sin(x)', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'x^2/4', function() { funcChoice = 2; draw(); });
                        VizEngine.createSlider(controls, 'Segments', 1, 50, 4, 1, function(v) { nSegments = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'parametric-arc-length',
                    title: 'Interactive: Parametric Curve Arc Length',
                    description: 'Trace parametric curves and compute their arc length',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 400,
                            scale: 50, originX: 280, originY: 200
                        });

                        var curveChoice = 0;
                        var tEnd = 1.0;
                        var curves = [
                            {
                                x: function(t) { return 2 * Math.cos(t); },
                                y: function(t) { return 2 * Math.sin(t); },
                                dx: function(t) { return -2 * Math.sin(t); },
                                dy: function(t) { return 2 * Math.cos(t); },
                                tMax: 2 * Math.PI,
                                label: 'Circle: r = 2'
                            },
                            {
                                x: function(t) { return 3 * Math.cos(t); },
                                y: function(t) { return 2 * Math.sin(t); },
                                dx: function(t) { return -3 * Math.sin(t); },
                                dy: function(t) { return 2 * Math.cos(t); },
                                tMax: 2 * Math.PI,
                                label: 'Ellipse: a=3, b=2'
                            },
                            {
                                x: function(t) { return t - Math.sin(t); },
                                y: function(t) { return 1 - Math.cos(t); },
                                dx: function(t) { return 1 - Math.cos(t); },
                                dy: function(t) { return Math.sin(t); },
                                tMax: 2 * Math.PI,
                                label: 'Cycloid'
                            }
                        ];

                        function arcLen(c, t0, t1) {
                            var steps = 500;
                            var dt = (t1 - t0) / steps;
                            var len = 0;
                            for (var i = 0; i < steps; i++) {
                                var t = t0 + (i + 0.5) * dt;
                                var dxv = c.dx(t);
                                var dyv = c.dy(t);
                                len += Math.sqrt(dxv * dxv + dyv * dyv) * dt;
                            }
                            return len;
                        }

                        function draw() {
                            var c = curves[curveChoice];
                            var tActual = tEnd * c.tMax;
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.drawParametric(c.x, c.y, 0, c.tMax, viz.colors.blue + '44', 1.5);
                            viz.drawParametric(c.x, c.y, 0, tActual, viz.colors.blue, 2.5);

                            viz.drawPoint(c.x(0), c.y(0), viz.colors.green, 'start', 5);
                            viz.drawPoint(c.x(tActual), c.y(tActual), viz.colors.red, 'end', 5);

                            var length = arcLen(c, 0, tActual);
                            viz.screenText(c.label, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Arc length (0 to t=' + tActual.toFixed(2) + '): ' + length.toFixed(4), viz.width / 2, 38, viz.colors.blue, 13);
                        }

                        VizEngine.createButton(controls, 'Circle', function() { curveChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'Ellipse', function() { curveChoice = 1; draw(); });
                        VizEngine.createButton(controls, 'Cycloid', function() { curveChoice = 2; draw(); });
                        VizEngine.createSlider(controls, 't (fraction of full)', 0.01, 1, 1, 0.01, function(v) { tEnd = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch12-ex10',
                    type: 'numeric',
                    question: 'Find the arc length of y = (2/3)x^(3/2) from x = 0 to x = 3. Round to 4 decimal places.',
                    hint: 'f\'(x) = x^(1/2), so 1 + [f\'(x)]^2 = 1 + x.',
                    answer: '4.6667',
                    solution: 'f\'(x) = x^(1/2). L = integral_0^3 sqrt(1+x) dx. Let u = 1+x: L = integral_1^4 sqrt(u) du = [2u^(3/2)/3]_1^4 = 2/3(8 - 1) = 14/3 approx 4.6667.'
                },
                {
                    id: 'ch12-ex11',
                    type: 'mc',
                    question: 'The arc length of one arch of the cycloid x = t - sin(t), y = 1 - cos(t) for t in [0, 2pi] is:',
                    options: [
                        '4',
                        '8',
                        '2pi',
                        '4pi'
                    ],
                    answer: 1,
                    solution: 'x\'(t) = 1 - cos(t), y\'(t) = sin(t). [x\']^2 + [y\']^2 = (1 - cos t)^2 + sin^2 t = 2 - 2cos t = 4sin^2(t/2). So sqrt = 2|sin(t/2)| = 2sin(t/2) on [0, 2pi]. L = integral_0^{2pi} 2sin(t/2) dt = [-4cos(t/2)]_0^{2pi} = -4(-1) - (-4)(1) = 4 + 4 = 8.'
                },
                {
                    id: 'ch12-ex12',
                    type: 'numeric',
                    question: 'Find the arc length of y = ln(cos(x)) from x = 0 to x = pi/4. Round to 4 decimal places.',
                    hint: 'f\'(x) = -tan(x). So 1 + tan^2(x) = sec^2(x).',
                    answer: '0.8814',
                    solution: 'f\'(x) = -sin(x)/cos(x) = -tan(x). 1 + tan^2(x) = sec^2(x). L = integral_0^{pi/4} sec(x) dx = [ln|sec(x) + tan(x)|]_0^{pi/4} = ln(sqrt(2) + 1) - ln(1) = ln(1 + sqrt(2)) approx 0.8814.'
                }
            ]
        },

        // ===== Section 5: Surface Area & Work =====
        {
            id: 'ch12-sec05',
            title: 'Surface Area & Work',
            content: `
                <h2>Surface Area & Work 旋转曲面面积与功</h2>

                <p>In this final section we cover two more applications: the surface area of a solid of revolution, and the physical concept of work done by a variable force.</p>

                <h3>Surface Area of Revolution</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.8 (Surface Area of Revolution)</div>
                    <div class="env-body">
                        <p>If \\(f(x) \\ge 0\\) has a continuous derivative on \\([a, b]\\), the surface area generated by rotating \\(y = f(x)\\) about the \\(x\\)-axis is</p>
                        \\[S = 2\\pi \\int_a^b f(x)\\sqrt{1 + [f'(x)]^2}\\,dx\\]
                        <p>This is \\(\\int 2\\pi f(x)\\,ds\\), where \\(ds = \\sqrt{1+[f'(x)]^2}\\,dx\\) is the arc length element.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Each small arc element \\(ds\\) at height \\(f(x)\\) sweeps out a thin band (frustum) of circumference \\(2\\pi f(x)\\) and width \\(ds\\). The area of this band is \\(2\\pi f(x)\\,ds\\). Integrating gives the total surface area.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.9 (Surface Area of a Sphere)</div>
                    <div class="env-body">
                        <p>Derive the surface area of a sphere of radius \\(r\\) by rotating \\(y = \\sqrt{r^2 - x^2}\\) about the \\(x\\)-axis.</p>
                        <p><strong>Solution.</strong> \\(f(x) = \\sqrt{r^2 - x^2}\\), \\(f'(x) = \\frac{-x}{\\sqrt{r^2 - x^2}}\\).</p>
                        \\[1 + [f'(x)]^2 = 1 + \\frac{x^2}{r^2 - x^2} = \\frac{r^2}{r^2 - x^2}\\]
                        \\[S = 2\\pi \\int_{-r}^{r} \\sqrt{r^2 - x^2} \\cdot \\frac{r}{\\sqrt{r^2 - x^2}}\\,dx = 2\\pi \\int_{-r}^{r} r\\,dx = 2\\pi r \\cdot 2r = 4\\pi r^2\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="surface-area-revolution"></div>

                <h3>Work Done by a Variable Force</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.9 (Work)</div>
                    <div class="env-body">
                        <p>If a variable force \\(F(x)\\) acts on an object as it moves from \\(x = a\\) to \\(x = b\\) along a straight line, the <strong>work</strong> (功) done is</p>
                        \\[W = \\int_a^b F(x)\\,dx\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>For a constant force, \\(W = F \\cdot d\\). When the force varies, we break the motion into tiny displacements \\(dx\\) over which the force is approximately constant, giving \\(dW = F(x)\\,dx\\). Integrating accumulates all the small contributions.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.10 (Spring — Hooke's Law)</div>
                    <div class="env-body">
                        <p>A spring has natural length 0.5 m and spring constant \\(k = 40\\) N/m. Find the work required to stretch it from its natural length to 0.7 m.</p>
                        <p><strong>Solution.</strong> Let \\(x\\) be the displacement from the natural length. By Hooke's Law, \\(F(x) = kx = 40x\\). The displacement goes from 0 to 0.2 m.</p>
                        \\[W = \\int_0^{0.2} 40x\\,dx = 40 \\cdot \\frac{x^2}{2}\\bigg|_0^{0.2} = 20 \\cdot 0.04 = 0.8 \\text{ J}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="work-variable-force"></div>

                <div class="env-block example">
                    <div class="env-title">Example 12.11 (Pumping Water)</div>
                    <div class="env-body">
                        <p>A hemispherical tank of radius 3 m is full of water (density \\(\\rho = 1000\\) kg/m\\(^3\\)). Find the work needed to pump all the water to the top of the tank.</p>
                        <p><strong>Solution.</strong> Place the origin at the top of the hemisphere. At depth \\(y\\) below the top (\\(0 \\le y \\le 3\\)), the cross-section is a circle of radius \\(r = \\sqrt{9 - (3-y)^2} = \\sqrt{6y - y^2}\\). The slice at depth \\(y\\) has volume \\(\\pi(6y - y^2)\\,dy\\), weight \\(1000g \\cdot \\pi(6y-y^2)\\,dy\\), and must be lifted \\(y\\) meters. So</p>
                        \\[W = 1000g\\pi \\int_0^3 y(6y - y^2)\\,dy = 1000g\\pi \\int_0^3 (6y^2 - y^3)\\,dy\\]
                        \\[= 1000g\\pi\\left[2y^3 - \\frac{y^4}{4}\\right]_0^3 = 1000g\\pi\\left(54 - \\frac{81}{4}\\right) = 1000g\\pi \\cdot \\frac{135}{4}\\]
                        <p>With \\(g = 9.8\\) m/s\\(^2\\), \\(W = 1000 \\cdot 9.8 \\cdot \\pi \\cdot 33.75 \\approx 1{,}038{,}741\\) J \\(\\approx 1{,}039\\) kJ.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark — Other Physical Applications</div>
                    <div class="env-body">
                        <p>Integration also computes:</p>
                        <ul>
                            <li><strong>Hydrostatic pressure/force</strong>: \\(F = \\int_a^b \\rho g \\cdot (\\text{depth}) \\cdot w(y)\\,dy\\)</li>
                            <li><strong>Center of mass</strong>: \\(\\bar{x} = \\frac{1}{A}\\int x\\,dA\\), \\(\\bar{y} = \\frac{1}{A}\\int y\\,dA\\)</li>
                            <li><strong>Moments of inertia</strong>: \\(I = \\int r^2\\,dm\\)</li>
                        </ul>
                        <p>These all follow the same pattern: slice, approximate, integrate.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'surface-area-revolution',
                    title: 'Interactive: Surface of Revolution',
                    description: 'Visualize the surface generated by rotating a curve about the x-axis, with frustum approximations',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 420,
                            scale: 50, originX: 80, originY: 210
                        });

                        var nBands = 8;
                        var funcChoice = 0;
                        var funcs = [
                            {
                                f: function(x) { return Math.sqrt(4 - x * x); },
                                fp: function(x) { return -x / Math.sqrt(4 - x * x); },
                                a: -2, b: 2,
                                label: 'Sphere: y = sqrt(4 - x^2)',
                                trueArea: 4 * Math.PI * 4
                            },
                            {
                                f: function(x) { return Math.sqrt(x); },
                                fp: function(x) { return 0.5 / Math.sqrt(x); },
                                a: 0.01, b: 4,
                                label: 'y = sqrt(x)',
                                trueArea: 0
                            },
                            {
                                f: function(x) { return 1 + 0.3 * Math.sin(2 * x); },
                                fp: function(x) { return 0.6 * Math.cos(2 * x); },
                                a: 0, b: Math.PI * 2,
                                label: 'y = 1 + 0.3sin(2x)',
                                trueArea: 0
                            }
                        ];

                        function numericalSA(fc) {
                            var steps = 1000;
                            var dx = (fc.b - fc.a) / steps;
                            var sum = 0;
                            for (var i = 0; i < steps; i++) {
                                var x = fc.a + (i + 0.5) * dx;
                                var fv = fc.f(x);
                                var fpv = fc.fp(x);
                                sum += fv * Math.sqrt(1 + fpv * fpv) * dx;
                            }
                            return 2 * Math.PI * sum;
                        }

                        function draw() {
                            var fc = funcs[funcChoice];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var dx = (fc.b - fc.a) / nBands;
                            for (var i = 0; i < nBands; i++) {
                                var xL = fc.a + i * dx;
                                var xR = xL + dx;
                                var rL = fc.f(xL);
                                var rR = fc.f(xR);
                                var pts = [[xL, rL], [xR, rR], [xR, -rR], [xL, -rL]];
                                viz.drawPolygon(pts, viz.colors.purple + '22', viz.colors.purple + '66', 1);
                            }

                            viz.drawFunction(fc.f, fc.a, fc.b, viz.colors.blue, 2.5);
                            viz.drawFunction(function(x) { return -fc.f(x); }, fc.a, fc.b, viz.colors.blue + '66', 1.5);

                            var sa = fc.trueArea > 0 ? fc.trueArea : numericalSA(fc);
                            viz.screenText(fc.label + ' rotated about x-axis', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('Surface area = ' + sa.toFixed(2), viz.width / 2, 38, viz.colors.purple, 13);
                            viz.screenText(nBands + ' frustum bands shown', viz.width / 2, 56, viz.colors.text, 12);
                        }

                        VizEngine.createButton(controls, 'Sphere', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'sqrt(x)', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, '1+0.3sin(2x)', function() { funcChoice = 2; draw(); });
                        VizEngine.createSlider(controls, 'Frustum bands', 2, 40, 8, 1, function(v) { nBands = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'work-variable-force',
                    title: 'Interactive: Work Done by a Variable Force',
                    description: 'Visualize work as the area under the force-displacement curve, with spring and custom force examples',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 40, originX: 80, originY: 300
                        });

                        var forceChoice = 0;
                        var xEnd = 5;
                        var forces = [
                            {
                                F: function(x) { return 40 * x; },
                                a: 0, bMax: 8,
                                label: 'Spring: F = 40x (Hooke\'s Law)',
                                unit: 'N, m'
                            },
                            {
                                F: function(x) { return 100 / ((x + 1) * (x + 1)); },
                                a: 0, bMax: 10,
                                label: 'Gravity-like: F = 100/(x+1)^2',
                                unit: 'N, m'
                            },
                            {
                                F: function(x) { return 10 + 5 * Math.sin(x); },
                                a: 0, bMax: 10,
                                label: 'Oscillating: F = 10 + 5sin(x)',
                                unit: 'N, m'
                            }
                        ];

                        function numericalWork(fc, b) {
                            var steps = 1000;
                            var dx = (b - fc.a) / steps;
                            var sum = 0;
                            for (var i = 0; i < steps; i++) {
                                var x = fc.a + (i + 0.5) * dx;
                                sum += fc.F(x) * dx;
                            }
                            return sum;
                        }

                        function draw() {
                            var fc = forces[forceChoice];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.shadeUnder(fc.F, fc.a, xEnd, viz.colors.green + '44');
                            viz.drawFunction(fc.F, fc.a - 0.5, fc.bMax + 0.5, viz.colors.blue, 2.5);

                            viz.drawSegment(xEnd, 0, xEnd, fc.F(xEnd), viz.colors.orange, 1.5, true);

                            var work = numericalWork(fc, xEnd);
                            viz.screenText(fc.label, viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('Work from 0 to ' + xEnd.toFixed(1) + ' = ' + work.toFixed(2) + ' J', viz.width / 2, 38, viz.colors.green, 13);

                            viz.drawText('F(x)', -0.5, fc.F(1) + 0.5, viz.colors.text, 12, 'right');
                            viz.drawText('x', fc.bMax + 0.5, -0.5, viz.colors.text, 12, 'center');
                        }

                        VizEngine.createButton(controls, 'Spring', function() { forceChoice = 0; xEnd = 5; draw(); });
                        VizEngine.createButton(controls, 'Gravity-like', function() { forceChoice = 1; xEnd = 5; draw(); });
                        VizEngine.createButton(controls, 'Oscillating', function() { forceChoice = 2; xEnd = 5; draw(); });
                        VizEngine.createSlider(controls, 'Endpoint x', 0.1, 10, 5, 0.1, function(v) { xEnd = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch12-ex13',
                    type: 'mc',
                    question: 'The surface area of the cone generated by rotating y = 2x from x = 0 to x = 3 about the x-axis is:',
                    options: [
                        '6pi * sqrt(5)',
                        '18pi * sqrt(5)',
                        '36pi * sqrt(5)',
                        '9pi * sqrt(5)'
                    ],
                    answer: 1,
                    solution: 'f(x) = 2x, f\'(x) = 2. S = 2pi * integral_0^3 2x * sqrt(1+4) dx = 2pi * integral_0^3 2x * sqrt(5) dx = 4pi*sqrt(5) * [x^2/2]_0^3 = 4pi*sqrt(5) * 9/2 = 18pi*sqrt(5).'
                },
                {
                    id: 'ch12-ex14',
                    type: 'numeric',
                    question: 'A spring requires 6 J of work to stretch from its natural length to 0.1 m beyond. Find the spring constant k (in N/m).',
                    hint: 'W = integral_0^d kx dx = k*d^2/2. Solve for k.',
                    answer: '1200',
                    solution: 'W = k*d^2/2, so 6 = k*(0.1)^2/2 = k*0.01/2 = k/200. Therefore k = 1200 N/m.'
                },
                {
                    id: 'ch12-ex15',
                    type: 'numeric',
                    question: 'Find the work (in joules) to lift a 50 kg chain of length 20 m hanging from a cliff, using g = 9.8 m/s^2. The chain has uniform density.',
                    hint: 'Linear density = 50/20 = 2.5 kg/m. A slice at height y (from bottom) must be lifted y meters. W = integral_0^20 2.5*9.8*y dy.',
                    answer: '4900',
                    solution: 'Linear density lambda = 50/20 = 2.5 kg/m. The element at distance y from the bottom must be lifted y meters. W = integral_0^20 lambda*g*y dy = 2.5*9.8*[y^2/2]_0^20 = 2.5*9.8*200 = 4900 J.'
                }
            ]
        }
    ]
});
