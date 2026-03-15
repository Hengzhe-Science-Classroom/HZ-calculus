// === Chapter 3: The Derivative ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'The Derivative',
    subtitle: 'From secant lines to tangent lines: the limit definition of the derivative and its meaning',
    sections: [
        // ======================== Section 1 ========================
        {
            id: 'tangent-line-problem',
            title: 'The Tangent Line Problem',
            content: `
<div class="env-block env-intuition">
<div class="env-header">From Continuity to the Derivative</div>
<div class="env-body">
<p>In Chapter 2, we established what it means for a function to be continuous: no breaks, no jumps, no holes. Continuity guarantees that small changes in the input produce small changes in the output. But continuity alone says nothing about <em>how fast</em> the output is changing. Two continuous functions can behave very differently, one climbing steeply while the other barely moves. The derivative answers this deeper question: at any given instant, what is the rate of change?</p>
</div>
</div>

<h2>The Tangent Line Problem</h2>

<p>Our goal in this section is to give a precise meaning to "the slope of a curve at a point." We will do this by approximating the curve with secant lines and then taking a limit. This idea, simple as it sounds, is the foundation of differential calculus.</p>

<div class="env-block env-intuition">
<div class="env-header">Intuition</div>
<div class="env-body">
<p>How do you define the slope of a curve at a single point? A straight line has a constant slope, but a curve is always changing direction. The key idea is to <em>approximate</em> the curve near a point by a line — and then make the approximation better and better using limits.</p>
</div>
</div>

<p>Consider a function \\(f(x)\\) and a point \\(P = (a, f(a))\\) on its graph. If we pick a nearby point \\(Q = (a+h, f(a+h))\\), the line through \\(P\\) and \\(Q\\) is called a <strong>secant line</strong>.</p>

<p>The slope of a secant line is easy to compute, it is just "rise over run." The key insight is that by letting the second point slide closer and closer to the first, the secant slope converges to a single value: the slope of the tangent line.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.1 — Secant Line</div>
<div class="env-body">
<p>Given a function \\(f\\) and two points \\(P = (a, f(a))\\) and \\(Q = (a+h, f(a+h))\\) on its graph (with \\(h \\neq 0\\)), the <strong>secant line</strong> through \\(P\\) and \\(Q\\) has slope</p>
\\[m_{\\text{sec}} = \\frac{f(a+h) - f(a)}{h}.\\]
<p>This ratio is called the <strong>difference quotient</strong>.</p>
</div>
</div>

<p>As \\(h \\to 0\\), the point \\(Q\\) slides along the curve toward \\(P\\), and the secant line rotates toward a limiting position — the <strong>tangent line</strong> at \\(P\\).</p>

<div class="viz-placeholder" data-viz="secant-to-tangent"></div>

<p>The visualization above shows the secant line converging to a limiting position. We now capture this limiting position with a formal definition. The tangent line at a point is defined as the line whose slope is the limit of secant slopes.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.2 — Tangent Line</div>
<div class="env-body">
<p>The <strong>tangent line</strong> to \\(y = f(x)\\) at the point \\(P = (a, f(a))\\) is the line through \\(P\\) with slope</p>
\\[m_{\\tan} = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h},\\]
<p>provided this limit exists.</p>
</div>
</div>

<p>Let us put this definition to work. The following example shows that computing a tangent slope amounts to setting up a difference quotient, simplifying, and evaluating a limit.</p>

<div class="env-block env-example">
<div class="env-header">Example 3.1</div>
<div class="env-body">
<p>Find the slope of the tangent line to \\(f(x) = x^2\\) at \\(x = 1\\).</p>
<p><strong>Solution.</strong> We compute the difference quotient:</p>
\\[\\frac{f(1+h) - f(1)}{h} = \\frac{(1+h)^2 - 1}{h} = \\frac{1 + 2h + h^2 - 1}{h} = \\frac{2h + h^2}{h} = 2 + h.\\]
<p>Taking the limit as \\(h \\to 0\\):</p>
\\[m_{\\tan} = \\lim_{h \\to 0}(2 + h) = 2.\\]
<p>The tangent line at \\((1, 1)\\) has slope \\(2\\), so its equation is \\(y - 1 = 2(x - 1)\\), i.e., \\(y = 2x - 1\\).</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Geometric Insight</div>
<div class="env-body">
<p>The tangent line is the <em>best linear approximation</em> to the curve near the point. It captures the instantaneous rate of change — how fast the function is changing at that exact moment.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="difference-quotient-table"></div>

<div class="env-block env-example">
<div class="env-header">Example 3.2</div>
<div class="env-body">
<p>Find the equation of the tangent line to \\(f(x) = x^3\\) at \\(x = 2\\).</p>
<p><strong>Solution.</strong></p>
\\[\\frac{f(2+h) - f(2)}{h} = \\frac{(2+h)^3 - 8}{h} = \\frac{8 + 12h + 6h^2 + h^3 - 8}{h} = 12 + 6h + h^2.\\]
<p>So \\(m_{\\tan} = \\lim_{h\\to 0}(12 + 6h + h^2) = 12\\). The tangent line is \\(y - 8 = 12(x - 2)\\), i.e., \\(y = 12x - 16\\).</p>
</div>
</div>

<p>So far, we have computed the tangent slope at one specific point at a time. In the next section, we formalize this process into a general definition: the <strong>derivative</strong>.</p>
`,
            visualizations: [
                {
                    id: 'secant-to-tangent',
                    title: 'Secant Line Approaching the Tangent Line',
                    description: 'Drag the slider to shrink \\(h\\) toward 0. Watch the secant line (orange) rotate toward the tangent line (blue) on \\(f(x) = x^2\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 50, originX: 200, originY: 320 });
                        var a = 1;
                        var h = { value: 2.0 };
                        var f = function(x) { return x * x; };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw curve
                            viz.drawFunction(f, -2, 5, viz.colors.white, 2);

                            var fa = f(a);
                            var fah = f(a + h.value);
                            var mSec = (fah - fa) / h.value;

                            // Tangent line (the limit as h -> 0)
                            var mTan = 2 * a;
                            viz.drawLine(a, fa, a + 1, fa + mTan, viz.colors.blue, 2);

                            // Secant line
                            if (Math.abs(h.value) > 0.01) {
                                viz.drawLine(a, fa, a + h.value, fah, viz.colors.orange, 2);
                                // Draw Q point
                                viz.drawPoint(a + h.value, fah, viz.colors.orange, 'Q', 6);
                                // Vertical and horizontal dashes for the difference quotient
                                viz.drawSegment(a, fa, a + h.value, fa, viz.colors.yellow, 1, true);
                                viz.drawSegment(a + h.value, fa, a + h.value, fah, viz.colors.yellow, 1, true);
                                // Labels
                                viz.drawText('h', a + h.value / 2, fa - 0.3, viz.colors.yellow, 12);
                                viz.drawText('f(a+h)-f(a)', a + h.value + 0.3, (fa + fah) / 2, viz.colors.yellow, 11, 'left');
                            }

                            // Draw P point
                            viz.drawPoint(a, fa, viz.colors.blue, 'P', 6);

                            // Info text
                            viz.screenText('h = ' + h.value.toFixed(2), 20, 25, viz.colors.white, 14, 'left');
                            viz.screenText('Secant slope = ' + mSec.toFixed(4), 20, 45, viz.colors.orange, 13, 'left');
                            viz.screenText('Tangent slope = ' + mTan.toFixed(4), 20, 65, viz.colors.blue, 13, 'left');
                        }

                        draw();
                        VizEngine.createSlider(controls, 'h', 0.01, 3.0, h.value, 0.01, function(v) {
                            h.value = v;
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'difference-quotient-table',
                    title: 'Difference Quotient Values',
                    description: 'See how the difference quotient \\(\\frac{f(a+h)-f(a)}{h}\\) approaches the derivative as \\(h \\to 0\\) for \\(f(x)=x^2\\) at \\(a=1\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 300, originY: 280 });
                        var a = 1;
                        var f = function(x) { return x * x; };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the function
                            viz.drawFunction(f, -2, 5, viz.colors.white, 2);

                            // Draw tangent at a
                            var mTan = 2 * a;
                            viz.drawLine(a, f(a), a + 1, f(a) + mTan, viz.colors.blue, 2);
                            viz.drawPoint(a, f(a), viz.colors.blue, 'P=(1,1)', 5);

                            // Table of values
                            var hValues = [2, 1, 0.5, 0.1, 0.01, 0.001];
                            var startY = 20;
                            viz.screenText('h', viz.width - 160, startY, viz.colors.text, 12, 'center');
                            viz.screenText('Slope', viz.width - 60, startY, viz.colors.text, 12, 'center');
                            for (var i = 0; i < hValues.length; i++) {
                                var hv = hValues[i];
                                var slope = (f(a + hv) - f(a)) / hv;
                                var y = startY + 22 * (i + 1);
                                viz.screenText(hv.toString(), viz.width - 160, y, viz.colors.white, 12, 'center');
                                viz.screenText(slope.toFixed(4), viz.width - 60, y, viz.colors.orange, 12, 'center');
                            }
                            viz.screenText('0', viz.width - 160, startY + 22 * 7, viz.colors.teal, 12, 'center');
                            viz.screenText('2.0000', viz.width - 60, startY + 22 * 7, viz.colors.teal, 12, 'center');
                            viz.screenText('(limit)', viz.width - 110, startY + 22 * 7, viz.colors.teal, 10, 'center');
                        }

                        draw();
                        VizEngine.createSlider(controls, 'a', -2, 3, a, 0.1, function(v) {
                            a = v;
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the slope of the tangent line to \\(f(x) = 3x^2\\) at \\(x = 2\\) using the limit definition.',
                    hint: 'Compute \\(\\lim_{h\\to 0}\\frac{3(2+h)^2 - 3(4)}{h}\\) and simplify.',
                    solution: 'We have \\(\\frac{f(2+h)-f(2)}{h} = \\frac{3(2+h)^2 - 12}{h} = \\frac{3(4+4h+h^2)-12}{h} = \\frac{12h+3h^2}{h} = 12+3h\\). Taking the limit: \\(m = \\lim_{h\\to 0}(12+3h) = 12\\).'
                },
                {
                    question: 'Find the equation of the tangent line to \\(f(x) = \\sqrt{x}\\) at \\(x = 4\\).',
                    hint: 'Rationalize: multiply by \\(\\frac{\\sqrt{4+h}+2}{\\sqrt{4+h}+2}\\).',
                    solution: 'We compute \\(\\frac{\\sqrt{4+h}-2}{h} \\cdot \\frac{\\sqrt{4+h}+2}{\\sqrt{4+h}+2} = \\frac{(4+h)-4}{h(\\sqrt{4+h}+2)} = \\frac{1}{\\sqrt{4+h}+2}\\). As \\(h \\to 0\\), this gives \\(\\frac{1}{4}\\). The tangent line at \\((4,2)\\) is \\(y - 2 = \\frac{1}{4}(x-4)\\), i.e., \\(y = \\frac{1}{4}x + 1\\).'
                },
                {
                    question: 'Use the difference quotient to show that the slope of the tangent to \\(f(x) = x^2 + x\\) at \\(x = a\\) is \\(2a + 1\\).',
                    hint: 'Expand \\((a+h)^2 + (a+h) - (a^2 + a)\\) and simplify before taking the limit.',
                    solution: '\\(\\frac{(a+h)^2+(a+h)-(a^2+a)}{h} = \\frac{a^2+2ah+h^2+a+h-a^2-a}{h} = \\frac{2ah+h^2+h}{h} = 2a+h+1\\). As \\(h \\to 0\\): slope \\(= 2a+1\\).'
                },
                {
                    question: 'A ball is thrown upward with position \\(s(t) = 20t - 5t^2\\) meters. Find the instantaneous velocity at \\(t = 1\\) second using the limit definition.',
                    hint: 'The instantaneous velocity is \\(\\lim_{h\\to 0}\\frac{s(1+h)-s(1)}{h}\\).',
                    solution: '\\(s(1) = 15\\). \\(s(1+h) = 20(1+h)-5(1+h)^2 = 20+20h-5-10h-5h^2 = 15+10h-5h^2\\). So \\(\\frac{s(1+h)-s(1)}{h} = \\frac{10h-5h^2}{h} = 10-5h\\). As \\(h\\to 0\\): velocity \\(= 10\\) m/s.'
                }
            ]
        },

        // ======================== Section 2 ========================
        {
            id: 'definition-of-derivative',
            title: 'Definition of the Derivative',
            content: `
<h2>Definition of the Derivative</h2>

<p>In this section we give a formal name to the tangent-slope limit from Section 1. We define the <strong>derivative at a point</strong>, explore its multiple interpretations, and see examples where the derivative fails to exist.</p>

<p>In the previous section we found the slope of the tangent line at a <em>specific</em> point. Now we formalize this as a general definition.</p>

<p>The natural question is: can we package the limit of the difference quotient into a single, reusable concept? The answer is the derivative. Rather than repeating the limit computation from scratch each time, we define one object that encapsulates the tangent slope at any point.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.3 — The Derivative at a Point</div>
<div class="env-body">
<p>The <strong>derivative of \\(f\\) at \\(a\\)</strong>, denoted \\(f'(a)\\), is</p>
\\[f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h},\\]
<p>provided this limit exists. If the limit exists, we say \\(f\\) is <strong>differentiable at \\(a\\)</strong>.</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Equivalent Form</div>
<div class="env-body">
<p>Setting \\(x = a + h\\) (so \\(h = x - a\\)), we get an equivalent definition:</p>
\\[f'(a) = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}.\\]
<p>Both forms are used interchangeably.</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Interpretation</div>
<div class="env-body">
<p>The derivative \\(f'(a)\\) represents:</p>
<ul>
<li><strong>Geometrically:</strong> The slope of the tangent line to \\(y = f(x)\\) at \\(x = a\\).</li>
<li><strong>Physically:</strong> The instantaneous rate of change of \\(f\\) at \\(x = a\\).</li>
<li><strong>Analytically:</strong> The best linear approximation coefficient — \\(f(a+h) \\approx f(a) + f'(a)h\\) for small \\(h\\).</li>
</ul>
</div>
</div>

<p>The interactive visualization below lets you explore all three interpretations at once. Try different functions and watch how the secant line converges to the tangent as \\(h\\) shrinks.</p>

<div class="viz-placeholder" data-viz="derivative-at-point"></div>

<p>Let us practice computing derivatives from the definition. The algebraic strategy is always the same: form the difference quotient, simplify until you can cancel the \\(h\\) in the denominator, then take the limit.</p>

<div class="env-block env-example">
<div class="env-header">Example 3.3</div>
<div class="env-body">
<p>Find \\(f'(3)\\) for \\(f(x) = \\frac{1}{x}\\).</p>
<p><strong>Solution.</strong></p>
\\[f'(3) = \\lim_{h \\to 0} \\frac{\\frac{1}{3+h} - \\frac{1}{3}}{h} = \\lim_{h \\to 0} \\frac{\\frac{3 - (3+h)}{3(3+h)}}{h} = \\lim_{h \\to 0} \\frac{-h}{3h(3+h)} = \\lim_{h \\to 0} \\frac{-1}{3(3+h)} = -\\frac{1}{9}.\\]
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 3.4</div>
<div class="env-body">
<p>Find the derivative of \\(f(x) = |x|\\) at \\(x = 0\\).</p>
<p><strong>Solution.</strong> We check the one-sided limits:</p>
\\[\\lim_{h \\to 0^+} \\frac{|0+h| - |0|}{h} = \\lim_{h \\to 0^+} \\frac{h}{h} = 1,\\]
\\[\\lim_{h \\to 0^-} \\frac{|0+h| - |0|}{h} = \\lim_{h \\to 0^-} \\frac{-h}{h} = -1.\\]
<p>Since the one-sided limits differ, \\(f'(0)\\) does <strong>not exist</strong>. The function \\(|x|\\) is not differentiable at \\(x = 0\\).</p>
</div>
</div>

<p>This example reveals something important: the existence of the derivative is a stronger condition than it might first appear. Not every continuous function is differentiable.</p>

<div class="env-block env-warning">
<div class="env-header">Warning</div>
<div class="env-body">
<p>A function can be continuous at a point without being differentiable there. The function \\(f(x) = |x|\\) is continuous everywhere but has a "corner" at the origin, where the derivative fails to exist. We will explore this further in Section 4.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="derivative-does-not-exist"></div>

<p>Up to now, we have treated the derivative as a number attached to a single point. But if we compute \\(f'(a)\\) for <em>every</em> value of \\(a\\) in the domain, we obtain a new function. The next section makes this idea precise.</p>
`,
            visualizations: [
                {
                    id: 'derivative-at-point',
                    title: 'The Derivative as a Limit',
                    description: 'Choose a function and a point \\(a\\). The derivative \\(f\'(a)\\) equals the slope of the tangent line (blue). Shrink \\(h\\) to see the secant converge.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 45, originX: 220, originY: 280 });
                        var state = { a: 1, h: 1.5, fn: 0 };
                        var funcs = [
                            { name: 'x^2', f: function(x) { return x * x; }, df: function(x) { return 2 * x; } },
                            { name: '1/x', f: function(x) { return x === 0 ? NaN : 1 / x; }, df: function(x) { return -1 / (x * x); } },
                            { name: 'sin(x)', f: function(x) { return Math.sin(x); }, df: function(x) { return Math.cos(x); } }
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var cur = funcs[state.fn];
                            var f = cur.f;
                            var df = cur.df;

                            viz.drawFunction(f, -5, 8, viz.colors.white, 2);

                            var fa = f(state.a);
                            var mTan = df(state.a);

                            // Tangent line
                            if (isFinite(mTan) && isFinite(fa)) {
                                viz.drawLine(state.a, fa, state.a + 1, fa + mTan, viz.colors.blue, 2);
                            }

                            // Secant line
                            if (Math.abs(state.h) > 0.005) {
                                var fah = f(state.a + state.h);
                                if (isFinite(fah) && isFinite(fa)) {
                                    var mSec = (fah - fa) / state.h;
                                    viz.drawLine(state.a, fa, state.a + state.h, fah, viz.colors.orange, 1.5);
                                    viz.drawPoint(state.a + state.h, fah, viz.colors.orange, 'Q', 5);
                                    viz.screenText('Secant slope: ' + mSec.toFixed(4), 20, 45, viz.colors.orange, 13, 'left');
                                }
                            }

                            viz.drawPoint(state.a, fa, viz.colors.blue, 'P', 6);
                            viz.screenText("f(x) = " + cur.name, 20, 25, viz.colors.white, 14, 'left');
                            viz.screenText("f'(" + state.a.toFixed(1) + ") = " + mTan.toFixed(4), 20, 65, viz.colors.blue, 13, 'left');
                        }

                        draw();
                        VizEngine.createSlider(controls, 'a', -3, 4, state.a, 0.1, function(v) { state.a = v; draw(); });
                        VizEngine.createSlider(controls, 'h', 0.01, 3, state.h, 0.01, function(v) { state.h = v; draw(); });

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
                        funcs.forEach(function(fn, i) {
                            VizEngine.createButton(btnContainer, fn.name, function() { state.fn = i; draw(); });
                        });
                        controls.appendChild(btnContainer);

                        return viz;
                    }
                },
                {
                    id: 'derivative-does-not-exist',
                    title: 'When the Derivative Does Not Exist',
                    description: 'Three classic cases where the derivative fails to exist: a corner (\\(|x|\\)), a cusp (\\(x^{2/3}\\)), and a vertical tangent (\\(x^{1/3}\\)).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 60, originX: 280, originY: 250 });
                        var state = { fn: 0, h: 1.0 };
                        var cases = [
                            { name: '|x| (corner)', f: function(x) { return Math.abs(x); }, a: 0 },
                            { name: 'x^(2/3) (cusp)', f: function(x) { return Math.pow(Math.abs(x), 2/3); }, a: 0 },
                            { name: 'x^(1/3) (vertical)', f: function(x) { return Math.sign(x) * Math.pow(Math.abs(x), 1/3); }, a: 0 }
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = cases[state.fn];
                            viz.drawFunction(c.f, -4, 4, viz.colors.white, 2);

                            var fa = c.f(c.a);
                            var hv = state.h;
                            // Right secant
                            var fRight = c.f(c.a + hv);
                            var mRight = (fRight - fa) / hv;
                            // Left secant
                            var fLeft = c.f(c.a - hv);
                            var mLeft = (fa - fLeft) / hv;

                            if (isFinite(mRight)) {
                                viz.drawLine(c.a, fa, c.a + hv, fRight, viz.colors.teal, 1.5);
                                viz.drawPoint(c.a + hv, fRight, viz.colors.teal, null, 4);
                            }
                            if (isFinite(mLeft)) {
                                viz.drawLine(c.a, fa, c.a - hv, fLeft, viz.colors.orange, 1.5);
                                viz.drawPoint(c.a - hv, fLeft, viz.colors.orange, null, 4);
                            }

                            viz.drawPoint(c.a, fa, viz.colors.red, null, 6);

                            viz.screenText(c.name, 20, 25, viz.colors.white, 14, 'left');
                            viz.screenText('Right slope: ' + (isFinite(mRight) ? mRight.toFixed(3) : 'undefined'), 20, 45, viz.colors.teal, 13, 'left');
                            viz.screenText('Left slope: ' + (isFinite(mLeft) ? mLeft.toFixed(3) : 'undefined'), 20, 65, viz.colors.orange, 13, 'left');
                            if (Math.abs(mRight - mLeft) > 0.01 || !isFinite(mRight) || !isFinite(mLeft)) {
                                viz.screenText('Derivative DNE at x = 0', 20, 90, viz.colors.red, 13, 'left');
                            }
                        }

                        draw();
                        VizEngine.createSlider(controls, 'h', 0.01, 2, state.h, 0.01, function(v) { state.h = v; draw(); });

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
                        cases.forEach(function(c, i) {
                            VizEngine.createButton(btnContainer, c.name, function() { state.fn = i; draw(); });
                        });
                        controls.appendChild(btnContainer);

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the limit definition to find \\(f\'(2)\\) where \\(f(x) = x^2 - 3x + 1\\).',
                    hint: 'Compute \\(f(2+h) = (2+h)^2 - 3(2+h) + 1\\) and subtract \\(f(2) = -1\\).',
                    solution: '\\(f(2+h) = 4+4h+h^2 - 6-3h+1 = -1+h+h^2\\). So \\(\\frac{f(2+h)-f(2)}{h} = \\frac{h+h^2}{h} = 1+h\\). Limit: \\(f\'(2) = 1\\).'
                },
                {
                    question: 'Use the alternative form \\(f\'(a) = \\lim_{x \\to a}\\frac{f(x)-f(a)}{x-a}\\) to find \\(f\'(4)\\) where \\(f(x) = \\sqrt{x}\\).',
                    hint: 'Rationalize \\(\\frac{\\sqrt{x}-2}{x-4}\\) by multiplying by \\(\\frac{\\sqrt{x}+2}{\\sqrt{x}+2}\\).',
                    solution: '\\(\\frac{\\sqrt{x}-2}{x-4} = \\frac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)} = \\frac{x-4}{(x-4)(\\sqrt{x}+2)} = \\frac{1}{\\sqrt{x}+2}\\). As \\(x \\to 4\\): \\(f\'(4) = \\frac{1}{4}\\).'
                },
                {
                    question: 'Show that \\(f(x) = |x - 3|\\) is not differentiable at \\(x = 3\\).',
                    hint: 'Compute the left and right limits of the difference quotient at \\(a = 3\\).',
                    solution: 'Right: \\(\\lim_{h\\to 0^+}\\frac{|3+h-3|-0}{h} = \\lim_{h\\to 0^+}\\frac{h}{h} = 1\\). Left: \\(\\lim_{h\\to 0^-}\\frac{|3+h-3|}{h} = \\lim_{h\\to 0^-}\\frac{-h}{h} = -1\\). Since \\(1 \\neq -1\\), the limit does not exist and \\(f\\) is not differentiable at \\(x=3\\).'
                }
            ]
        },

        // ======================== Section 3 ========================
        {
            id: 'derivative-as-function',
            title: 'The Derivative as a Function',
            content: `
<h2>The Derivative as a Function</h2>

<p>In this section, we shift perspective: instead of computing the derivative at one point, we define the derivative as a function in its own right. We also introduce the various notations used across mathematics, physics, and engineering.</p>

<p>Instead of computing the derivative at a single point \\(x = a\\), we can let \\(a\\) vary and define a new function.</p>

<p>The question driving this section is: what if we let the base point \\(a\\) roam freely? For each \\(x\\) in the domain, the limit of the difference quotient (when it exists) produces a value \\(f'(x)\\). Collecting all these values gives us a new function, the derivative function.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.4 — The Derivative Function</div>
<div class="env-body">
<p>The <strong>derivative of \\(f\\)</strong> is the function \\(f'\\) defined by</p>
\\[f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h},\\]
<p>for all \\(x\\) where this limit exists. The domain of \\(f'\\) is the set of all points where \\(f\\) is differentiable.</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Notation</div>
<div class="env-body">
<p>Multiple notations exist for the derivative of \\(y = f(x)\\):</p>
<table style="margin:8px auto;color:#c9d1d9;border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="padding:6px 16px;text-align:left;">Notation</th><th style="padding:6px 16px;text-align:left;">Name</th><th style="padding:6px 16px;text-align:left;">Read as</th></tr>
<tr><td style="padding:6px 16px;">\\(f'(x)\\)</td><td style="padding:6px 16px;">Lagrange</td><td style="padding:6px 16px;">"f prime of x"</td></tr>
<tr><td style="padding:6px 16px;">\\(\\dfrac{dy}{dx}\\)</td><td style="padding:6px 16px;">Leibniz</td><td style="padding:6px 16px;">"dee-y dee-x"</td></tr>
<tr><td style="padding:6px 16px;">\\(\\dfrac{df}{dx}\\)</td><td style="padding:6px 16px;">Leibniz</td><td style="padding:6px 16px;">"dee-f dee-x"</td></tr>
<tr><td style="padding:6px 16px;">\\(\\dot{y}\\)</td><td style="padding:6px 16px;">Newton</td><td style="padding:6px 16px;">"y-dot" (for time derivatives)</td></tr>
<tr><td style="padding:6px 16px;">\\(Df\\)</td><td style="padding:6px 16px;">Operator</td><td style="padding:6px 16px;">"D of f"</td></tr>
</table>

<p>The Leibniz notation \\(\\frac{dy}{dx}\\) reminds us that the derivative is a <em>limit of ratios</em> \\(\\frac{\\Delta y}{\\Delta x}\\). It is <strong>not</strong> a fraction, but it often behaves like one (e.g., in the chain rule).</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 3.5</div>
<div class="env-body">
<p>Find \\(f'(x)\\) for \\(f(x) = x^3\\).</p>
<p><strong>Solution.</strong></p>
\\[f'(x) = \\lim_{h \\to 0}\\frac{(x+h)^3 - x^3}{h} = \\lim_{h \\to 0}\\frac{3x^2h + 3xh^2 + h^3}{h} = \\lim_{h \\to 0}(3x^2 + 3xh + h^2) = 3x^2.\\]
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 3.6</div>
<div class="env-body">
<p>Find \\(\\frac{d}{dx}\\left(\\frac{1}{x}\\right)\\).</p>
<p><strong>Solution.</strong></p>
\\[\\frac{d}{dx}\\left(\\frac{1}{x}\\right) = \\lim_{h \\to 0} \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h} = \\lim_{h \\to 0} \\frac{x - (x+h)}{hx(x+h)} = \\lim_{h \\to 0} \\frac{-1}{x(x+h)} = -\\frac{1}{x^2}.\\]
</div>
</div>

<div class="viz-placeholder" data-viz="derivative-function-graph"></div>

<p>A pattern emerges from these examples. Each time we differentiate \\(x^n\\), the exponent drops by one and multiplies the coefficient. This observation leads to one of the most useful formulas in calculus.</p>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.1 — Power Rule (Preview)</div>
<div class="env-body">
<p>For any positive integer \\(n\\),</p>
\\[\\frac{d}{dx}(x^n) = nx^{n-1}.\\]
<p>We will prove this rigorously in Chapter 4, but the pattern is already visible:</p>
<ul>
<li>\\((x^2)' = 2x\\)</li>
<li>\\((x^3)' = 3x^2\\)</li>
<li>\\((x^{-1})' = -x^{-2}\\)</li>
</ul>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Warning</div>
<div class="env-body">
<p>The Leibniz notation \\(\\frac{dy}{dx}\\) is suggestive but potentially misleading. It is defined as a limit, not as a ratio of infinitesimals. The "cancellation" \\(\\frac{dy}{dx} \\cdot \\frac{dx}{dt} = \\frac{dy}{dt}\\) works, but only because the chain rule theorem justifies it.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="graph-f-and-fprime"></div>

<p>We can now compute derivatives and view them as functions. But we noticed earlier that some functions, like \\(|x|\\), are continuous yet not differentiable. In the next section, we investigate the precise relationship between differentiability and continuity.</p>
`,
            visualizations: [
                {
                    id: 'derivative-function-graph',
                    title: 'Building the Derivative Function',
                    description: 'Drag \\(a\\) along the curve. At each point, the tangent slope is plotted below to form the graph of \\(f\'(x)\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 35, originX: 220, originY: 200 });
                        var f = function(x) { return x * x; };
                        var df = function(x) { return 2 * x; };

                        var drag = viz.addDraggable('a', 1, f(1), viz.colors.blue, 8, function(wx) {
                            drag.x = wx;
                            drag.y = f(wx);
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // f(x) curve
                            viz.drawFunction(f, -5, 6, viz.colors.white, 2);

                            // Tangent at dragged point
                            var a = drag.x;
                            var fa = f(a);
                            var mTan = df(a);
                            viz.drawLine(a, fa, a + 1, fa + mTan, viz.colors.blue, 2);
                            viz.drawPoint(a, fa, viz.colors.blue, null, 6);

                            // Trace of derivative values
                            for (var x = -5; x <= 6; x += 0.1) {
                                var alpha = Math.abs(x - a) < 0.05 ? 'ff' : '33';
                                viz.drawPoint(x, df(x), viz.colors.teal + alpha, null, 1.5);
                            }

                            // Derivative point highlighted
                            viz.drawPoint(a, mTan, viz.colors.teal, null, 6);

                            // Horizontal guide
                            viz.drawSegment(a, fa, a, mTan, viz.colors.text + '44', 1, true);

                            viz.screenText("f(x) = x^2", 20, 20, viz.colors.white, 14, 'left');
                            viz.screenText("f'(x) = 2x", 20, 40, viz.colors.teal, 14, 'left');
                            viz.screenText("f'(" + a.toFixed(1) + ") = " + mTan.toFixed(2), 20, 60, viz.colors.blue, 13, 'left');

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'graph-f-and-fprime',
                    title: 'Graph of \\(f\\) and \\(f\'\\) Side by Side',
                    description: 'Compare different functions with their derivatives. Where \\(f\\) is increasing, \\(f\' > 0\\); where \\(f\\) is decreasing, \\(f\' < 0\\); at maxima/minima of \\(f\\), \\(f\' = 0\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 30, originX: 280, originY: 200 });
                        var state = { fn: 0 };
                        var funcs = [
                            { name: 'x^3 - 3x', f: function(x) { return x*x*x - 3*x; }, df: function(x) { return 3*x*x - 3; } },
                            { name: 'sin(x)', f: function(x) { return Math.sin(x); }, df: function(x) { return Math.cos(x); } },
                            { name: 'x^4/4 - 2x^2', f: function(x) { return x*x*x*x/4 - 2*x*x; }, df: function(x) { return x*x*x - 4*x; } }
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var cur = funcs[state.fn];
                            viz.drawFunction(cur.f, -6, 6, viz.colors.white, 2);
                            viz.drawFunction(cur.df, -6, 6, viz.colors.teal, 2);

                            // Mark zeros of f' (critical points of f)
                            for (var x = -5.95; x < 5.95; x += 0.05) {
                                var d1 = cur.df(x);
                                var d2 = cur.df(x + 0.05);
                                if (d1 * d2 <= 0 && (Math.abs(d1) + Math.abs(d2)) > 0.001) {
                                    var root = x + 0.05 * Math.abs(d1) / (Math.abs(d1) + Math.abs(d2));
                                    viz.drawPoint(root, cur.f(root), viz.colors.yellow, null, 5);
                                    viz.drawPoint(root, 0, viz.colors.yellow, null, 5);
                                    viz.drawSegment(root, cur.f(root), root, 0, viz.colors.yellow + '44', 1, true);
                                }
                            }

                            viz.screenText('f(x) = ' + cur.name, 20, 20, viz.colors.white, 14, 'left');
                            viz.screenText("f'(x)", 20, 40, viz.colors.teal, 14, 'left');
                            viz.screenText("Critical points (yellow)", 20, 60, viz.colors.yellow, 12, 'left');
                        }

                        draw();

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
                        funcs.forEach(function(fn, i) {
                            VizEngine.createButton(btnContainer, fn.name, function() { state.fn = i; draw(); });
                        });
                        controls.appendChild(btnContainer);

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the limit definition to find the derivative function \\(f\'(x)\\) for \\(f(x) = 5x - x^2\\).',
                    hint: 'Expand \\(f(x+h) = 5(x+h) - (x+h)^2\\) and subtract \\(f(x)\\).',
                    solution: '\\(f(x+h) = 5x+5h - x^2 - 2xh - h^2\\). \\(\\frac{f(x+h)-f(x)}{h} = \\frac{5h - 2xh - h^2}{h} = 5 - 2x - h\\). Limit: \\(f\'(x) = 5 - 2x\\).'
                },
                {
                    question: 'Find \\(\\frac{d}{dx}\\left(\\sqrt{x}\\right)\\) from the limit definition.',
                    hint: 'Rationalize: \\(\\frac{\\sqrt{x+h}-\\sqrt{x}}{h} \\cdot \\frac{\\sqrt{x+h}+\\sqrt{x}}{\\sqrt{x+h}+\\sqrt{x}}\\).',
                    solution: '\\(\\frac{\\sqrt{x+h}-\\sqrt{x}}{h} = \\frac{(x+h)-x}{h(\\sqrt{x+h}+\\sqrt{x})} = \\frac{1}{\\sqrt{x+h}+\\sqrt{x}}\\). As \\(h \\to 0\\): \\(f\'(x) = \\frac{1}{2\\sqrt{x}}\\), for \\(x > 0\\).'
                },
                {
                    question: 'The graph of \\(f(x)\\) has a local maximum at \\(x = 2\\) and a local minimum at \\(x = 5\\). What can you say about \\(f\'(2)\\) and \\(f\'(5)\\)?',
                    hint: 'What is the tangent line slope at a peak or valley?',
                    solution: 'At a local maximum, the tangent line is horizontal, so \\(f\'(2) = 0\\). Similarly, \\(f\'(5) = 0\\). These are critical points. Between them, \\(f\\) is decreasing so \\(f\'(x) < 0\\) for \\(x \\in (2, 5)\\).'
                },
                {
                    question: 'Write \\(\\frac{dy}{dx}\\) in Lagrange notation and vice versa: write \\(g\'(t)\\) in Leibniz notation.',
                    hint: 'They are just different notations for the same concept.',
                    solution: '\\(\\frac{dy}{dx} = f\'(x)\\) if \\(y = f(x)\\). And \\(g\'(t) = \\frac{dg}{dt}\\).'
                }
            ]
        },

        // ======================== Section 4 ========================
        {
            id: 'differentiability-continuity',
            title: 'Differentiability vs Continuity',
            content: `
<h2>Differentiability and Continuity</h2>

<p>This section answers a fundamental structural question: how do differentiability and continuity relate to each other? We prove that differentiability is a strictly stronger condition, and we catalog the classic ways a continuous function can fail to be differentiable.</p>

<p>We have seen that not every function is differentiable everywhere. What is the relationship between differentiability and continuity?</p>

<p>Recall from Chapter 2 that continuity means "no breaks." Differentiability means "has a well-defined tangent." Intuitively, a smooth curve certainly has no breaks, so differentiability should imply continuity. The following theorem confirms this.</p>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.2 — Differentiable Implies Continuous</div>
<div class="env-body">
<p>If \\(f\\) is differentiable at \\(a\\), then \\(f\\) is continuous at \\(a\\).</p>
</div>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<div class="env-body">
<p>We need to show \\(\\lim_{x \\to a} f(x) = f(a)\\), which is equivalent to \\(\\lim_{x \\to a}[f(x) - f(a)] = 0\\).</p>
<p>For \\(x \\neq a\\), we can write:</p>
\\[f(x) - f(a) = \\frac{f(x) - f(a)}{x - a} \\cdot (x - a).\\]
<p>Taking the limit:</p>
\\[\\lim_{x \\to a}[f(x) - f(a)] = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} \\cdot \\lim_{x \\to a}(x - a) = f'(a) \\cdot 0 = 0.\\]
<p>We used the product rule for limits. The first factor equals \\(f'(a)\\) (which exists by hypothesis), and the second factor tends to 0. \\(\\square\\)</p>
</div>
</div>

<p>The natural follow-up question is: does the converse hold? If a function is continuous, must it be differentiable? The answer is a resounding no, and the counterexamples are both instructive and visually striking.</p>

<div class="env-block env-warning">
<div class="env-header">The Converse is False!</div>
<div class="env-body">
<p>Continuity does <strong>not</strong> imply differentiability. A function can be continuous at a point but fail to be differentiable there. There are three classic ways this can happen:</p>
<ol>
<li><strong>Corner/kink:</strong> \\(f(x) = |x|\\) at \\(x = 0\\). The left and right derivatives exist but are different (\\(-1\\) and \\(+1\\)).</li>
<li><strong>Cusp:</strong> \\(f(x) = x^{2/3}\\) at \\(x = 0\\). The slopes from each side both become infinite.</li>
<li><strong>Vertical tangent:</strong> \\(f(x) = x^{1/3}\\) at \\(x = 0\\). The difference quotient tends to \\(+\\infty\\).</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="diff-vs-cont"></div>

<div class="env-block env-example">
<div class="env-header">Example 3.7</div>
<div class="env-body">
<p>Consider \\(f(x) = \\begin{cases} x^2 \\sin(1/x) & x \\neq 0 \\\\ 0 & x = 0 \\end{cases}\\).</p>
<p>This function is differentiable at \\(x = 0\\). To verify:</p>
\\[f'(0) = \\lim_{h \\to 0} \\frac{h^2 \\sin(1/h) - 0}{h} = \\lim_{h \\to 0} h\\sin(1/h) = 0,\\]
<p>by the Squeeze Theorem (since \\(-|h| \\leq h\\sin(1/h) \\leq |h|\\)).</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Summary Diagram</div>
<div class="env-body">
<p>The logical relationship is:</p>
\\[\\text{Differentiable} \\implies \\text{Continuous} \\implies \\text{Defined}\\]
<p>But none of the reverse arrows hold in general. Think of it as a containment:</p>
<p style="text-align:center;">\\(\\{\\text{differentiable functions}\\} \\subset \\{\\text{continuous functions}\\} \\subset \\{\\text{all functions}\\}\\)</p>
</div>
</div>

<div class="viz-placeholder" data-viz="diff-cont-venn"></div>

<p>Now that we understand when derivatives exist and how they relate to continuity, we are ready to go further. If the derivative \\(f'\\) is itself a function, can we differentiate it again? The next section explores higher-order derivatives and their physical and geometric meaning.</p>
`,
            visualizations: [
                {
                    id: 'diff-vs-cont',
                    title: 'Differentiability Failures',
                    description: 'Explore three continuous-but-not-differentiable functions. Use the slider to zoom in on the origin and see why the derivative fails to exist.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 80, originX: 280, originY: 280 });
                        var state = { fn: 0, zoom: 1 };
                        var cases = [
                            {
                                name: '|x| — Corner',
                                f: function(x) { return Math.abs(x); },
                                explain: 'Left slope = -1, Right slope = +1'
                            },
                            {
                                name: 'x^(2/3) — Cusp',
                                f: function(x) { return Math.pow(Math.abs(x), 2/3); },
                                explain: 'Slopes tend to +/- infinity'
                            },
                            {
                                name: 'x^(1/3) — Vertical tangent',
                                f: function(x) { return Math.sign(x) * Math.pow(Math.abs(x), 1/3); },
                                explain: 'Slope tends to +infinity'
                            }
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = cases[state.fn];
                            var range = 3 / state.zoom;
                            viz.drawFunction(c.f, -range, range, viz.colors.white, 2.5);

                            // Highlight the problem point
                            viz.drawPoint(0, c.f(0), viz.colors.red, null, 7);

                            viz.screenText(c.name, 20, 25, viz.colors.white, 15, 'left');
                            viz.screenText(c.explain, 20, 50, viz.colors.orange, 12, 'left');
                            viz.screenText('Continuous at 0: YES', 20, 75, viz.colors.green, 12, 'left');
                            viz.screenText('Differentiable at 0: NO', 20, 95, viz.colors.red, 12, 'left');
                        }

                        draw();
                        VizEngine.createSlider(controls, 'Zoom', 0.5, 5, state.zoom, 0.1, function(v) { state.zoom = v; draw(); });

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
                        cases.forEach(function(c, i) {
                            VizEngine.createButton(btnContainer, c.name, function() { state.fn = i; draw(); });
                        });
                        controls.appendChild(btnContainer);

                        return viz;
                    }
                },
                {
                    id: 'diff-cont-venn',
                    title: 'Differentiable vs Continuous vs Defined',
                    description: 'A conceptual Venn diagram showing the containment relationship between classes of functions.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 280, originY: 200 });

                        function draw() {
                            viz.clear();

                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2;

                            // Outer ellipse: Defined
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, 240, 150, 0, 0, Math.PI * 2);
                            ctx.fillStyle = '#1a1a40';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Middle ellipse: Continuous
                            ctx.beginPath();
                            ctx.ellipse(cx, cy + 10, 180, 110, 0, 0, Math.PI * 2);
                            ctx.fillStyle = '#0f2a1f';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Inner ellipse: Differentiable
                            ctx.beginPath();
                            ctx.ellipse(cx, cy + 20, 110, 70, 0, 0, Math.PI * 2);
                            ctx.fillStyle = '#1a1a3f';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 14px -apple-system, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Differentiable', cx, cy + 20);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Continuous', cx, cy - 65);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Defined', cx, cy - 125);

                            // Examples
                            ctx.font = '11px -apple-system, sans-serif';
                            ctx.fillStyle = viz.colors.blue + 'cc';
                            ctx.fillText('x^2, sin(x), e^x', cx, cy + 45);

                            ctx.fillStyle = viz.colors.green + 'cc';
                            ctx.fillText('|x|, x^(2/3)', cx + 120, cy - 30);

                            ctx.fillStyle = viz.colors.text + 'cc';
                            ctx.fillText('1/x, step functions', cx + 140, cy + 110);

                            // Arrows
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.fillText('Differentiable  =>  Continuous  =>  Defined', cx, cy + 155);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(f\\) is differentiable at \\(x = a\\), then \\(\\lim_{x \\to a} f(x) = f(a)\\).',
                    hint: 'Write \\(f(x) - f(a) = \\frac{f(x)-f(a)}{x-a}\\cdot(x-a)\\) and use the product rule for limits.',
                    solution: 'For \\(x \\neq a\\): \\(f(x) - f(a) = \\frac{f(x)-f(a)}{x-a}\\cdot(x-a)\\). Taking \\(\\lim_{x\\to a}\\): the first factor tends to \\(f\'(a)\\) (exists by hypothesis), the second factor tends to 0. Product = 0. So \\(\\lim_{x\\to a}[f(x)-f(a)] = 0\\), i.e., \\(\\lim_{x\\to a}f(x) = f(a)\\).'
                },
                {
                    question: 'Give an example of a function that is continuous on \\(\\mathbb{R}\\) but not differentiable at exactly one point.',
                    hint: 'Think of a simple function with a corner.',
                    solution: '\\(f(x) = |x - 1|\\) is continuous everywhere but not differentiable at \\(x = 1\\) (corner). The left derivative is \\(-1\\) and the right derivative is \\(+1\\).'
                },
                {
                    question: 'Consider \\(f(x) = x|x|\\). Is \\(f\\) differentiable at \\(x = 0\\)? If so, find \\(f\'(0)\\).',
                    hint: 'Note that \\(f(x) = x^2\\) for \\(x \\geq 0\\) and \\(f(x) = -x^2\\) for \\(x < 0\\). Compute the limit of the difference quotient.',
                    solution: '\\(\\frac{f(0+h)-f(0)}{h} = \\frac{h|h|}{h} = |h|\\). As \\(h \\to 0\\), \\(|h| \\to 0\\). So \\(f\'(0) = 0\\). Yes, \\(f\\) is differentiable at 0 despite the absolute value in its formula.'
                }
            ]
        },

        // ======================== Section 5 ========================
        {
            id: 'higher-order-derivatives',
            title: 'Higher-Order Derivatives',
            content: `
<h2>Higher-Order Derivatives</h2>

<p>In this section, we define higher-order derivatives and explore their meaning. The second derivative reveals acceleration in physics and concavity in geometry; higher derivatives continue to unlock deeper structure.</p>

<p>Since the derivative \\(f'\\) is itself a function, we can take <em>its</em> derivative to get the <strong>second derivative</strong>, and continue further.</p>

<p>Why would we want to differentiate more than once? The first derivative tells us how fast a quantity is changing, but it says nothing about whether that rate of change is itself speeding up or slowing down. The second derivative answers exactly this question.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 3.5 — Higher-Order Derivatives</div>
<div class="env-body">
<p>The <strong>second derivative</strong> of \\(f\\) is the derivative of the derivative:</p>
\\[f''(x) = (f')'(x) = \\frac{d}{dx}\\left(\\frac{df}{dx}\\right) = \\frac{d^2f}{dx^2}.\\]
<p>More generally, the \\(n\\)-th derivative is:</p>
\\[f^{(n)}(x) = \\frac{d^n f}{dx^n}.\\]
<p>Common notations:</p>
<ul>
<li>First: \\(f'\\), \\(\\frac{dy}{dx}\\), \\(\\dot{y}\\)</li>
<li>Second: \\(f''\\), \\(\\frac{d^2y}{dx^2}\\), \\(\\ddot{y}\\)</li>
<li>Third: \\(f'''\\), \\(\\frac{d^3y}{dx^3}\\)</li>
<li>\\(n\\)-th: \\(f^{(n)}\\), \\(\\frac{d^ny}{dx^n}\\)</li>
</ul>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Physical Meaning</div>
<div class="env-body">
<p>If \\(s(t)\\) is the position of an object at time \\(t\\), then:</p>
<ul>
<li>\\(s'(t) = v(t)\\) is the <strong>velocity</strong> (rate of change of position).</li>
<li>\\(s''(t) = v'(t) = a(t)\\) is the <strong>acceleration</strong> (rate of change of velocity).</li>
<li>\\(s'''(t) = a'(t) = j(t)\\) is the <strong>jerk</strong> (rate of change of acceleration).</li>
</ul>
<p>Acceleration tells you <em>how the velocity is changing</em>. If you are in a car:</p>
<ul>
<li>\\(a(t) > 0\\): you feel pushed backward (speeding up)</li>
<li>\\(a(t) < 0\\): you feel pushed forward (braking)</li>
<li>\\(a(t) = 0\\): constant velocity (smooth ride)</li>
</ul>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 3.8</div>
<div class="env-body">
<p>Find all higher-order derivatives of \\(f(x) = x^4\\).</p>
<p><strong>Solution.</strong></p>
\\[f'(x) = 4x^3, \\quad f''(x) = 12x^2, \\quad f'''(x) = 24x, \\quad f^{(4)}(x) = 24, \\quad f^{(n)}(x) = 0 \\text{ for } n \\geq 5.\\]
</div>
</div>

<div class="viz-placeholder" data-viz="position-velocity-acceleration"></div>

<div class="env-block env-example">
<div class="env-header">Example 3.9</div>
<div class="env-body">
<p>A particle moves along a line with position \\(s(t) = t^3 - 6t^2 + 9t\\) (meters, seconds).</p>
<p><strong>(a)</strong> Find the velocity and acceleration at time \\(t\\).</p>
<p>\\(v(t) = s'(t) = 3t^2 - 12t + 9\\), \\(a(t) = s''(t) = 6t - 12\\).</p>
<p><strong>(b)</strong> When is the particle at rest?</p>
<p>At rest when \\(v(t) = 0\\): \\(3t^2 - 12t + 9 = 3(t-1)(t-3) = 0\\), so \\(t = 1\\) or \\(t = 3\\).</p>
<p><strong>(c)</strong> What is the acceleration at these times?</p>
<p>\\(a(1) = 6(1)-12 = -6\\) m/s\\(^2\\) (decelerating), \\(a(3) = 6(3)-12 = 6\\) m/s\\(^2\\) (accelerating).</p>
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Concavity</div>
<div class="env-body">
<p>The second derivative also tells us about the shape of the graph:</p>
<ul>
<li>\\(f''(x) > 0\\): The graph is <strong>concave up</strong> (holds water, like a cup).</li>
<li>\\(f''(x) < 0\\): The graph is <strong>concave down</strong> (spills water, like a frown).</li>
<li>\\(f''(x) = 0\\): Potential <strong>inflection point</strong> (change of concavity).</li>
</ul>
<p>We will study concavity in detail in Chapter 5 (Curve Sketching).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="concavity-second-derivative"></div>

<p>To close this section, we record a general formula for the higher derivatives of power functions. This pattern will be useful throughout the course.</p>

<div class="env-block env-theorem">
<div class="env-header">Theorem 3.3 — Higher Derivatives of \\(x^n\\)</div>
<div class="env-body">
<p>For \\(f(x) = x^n\\) (\\(n\\) a positive integer):</p>
\\[f^{(k)}(x) = \\frac{n!}{(n-k)!} x^{n-k} \\quad \\text{for } k \\leq n,\\]
\\[f^{(k)}(x) = 0 \\quad \\text{for } k > n.\\]
</div>
</div>

<div class="env-block env-intuition">
<div class="env-header">Looking Ahead: Differentiation Rules</div>
<div class="env-body">
<p>In this chapter, every derivative was computed directly from the limit definition. While this approach is rigorous and reveals exactly what the derivative means, it quickly becomes tedious for more complicated functions. How would you differentiate \\(f(x) = x^5 \\sin(x) / (1 + x^2)\\) from the definition alone? In Chapter 4, we develop a toolkit of differentiation rules (the power rule, product rule, quotient rule, and chain rule) that let us differentiate virtually any function built from elementary pieces, without returning to limits each time.</p>
</div>
</div>
`,
            visualizations: [
                {
                    id: 'position-velocity-acceleration',
                    title: 'Position, Velocity, and Acceleration',
                    description: 'The position \\(s(t) = t^3 - 6t^2 + 9t\\) of a particle. Drag the time marker to see velocity and acceleration at each instant.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 25, originX: 80, originY: 280 });
                        var s = function(t) { return t * t * t - 6 * t * t + 9 * t; };
                        var v = function(t) { return 3 * t * t - 12 * t + 9; };
                        var a = function(t) { return 6 * t - 12; };
                        var tVal = { value: 1.0 };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Position
                            viz.drawFunction(s, -0.5, 5, viz.colors.white, 2.5);
                            // Velocity
                            viz.drawFunction(v, -0.5, 5, viz.colors.teal, 2);
                            // Acceleration
                            viz.drawFunction(a, -0.5, 5, viz.colors.orange, 1.5);

                            var t = tVal.value;
                            // Vertical line at current t
                            viz.drawSegment(t, -8, t, 12, viz.colors.text + '44', 1, true);

                            // Points on each curve
                            viz.drawPoint(t, s(t), viz.colors.white, null, 6);
                            viz.drawPoint(t, v(t), viz.colors.teal, null, 5);
                            viz.drawPoint(t, a(t), viz.colors.orange, null, 5);

                            // Legend
                            viz.screenText('s(t) — position', viz.width - 20, 20, viz.colors.white, 12, 'right');
                            viz.screenText('v(t) — velocity', viz.width - 20, 38, viz.colors.teal, 12, 'right');
                            viz.screenText('a(t) — acceleration', viz.width - 20, 56, viz.colors.orange, 12, 'right');

                            // Current values
                            viz.screenText('t = ' + t.toFixed(2), 20, 20, viz.colors.white, 14, 'left');
                            viz.screenText('s = ' + s(t).toFixed(2), 20, 40, viz.colors.white, 12, 'left');
                            viz.screenText('v = ' + v(t).toFixed(2), 20, 58, viz.colors.teal, 12, 'left');
                            viz.screenText('a = ' + a(t).toFixed(2), 20, 76, viz.colors.orange, 12, 'left');

                            // State description
                            var stateDesc = '';
                            if (Math.abs(v(t)) < 0.3) stateDesc = 'At rest';
                            else if (v(t) > 0 && a(t) > 0) stateDesc = 'Moving right, speeding up';
                            else if (v(t) > 0 && a(t) < 0) stateDesc = 'Moving right, slowing down';
                            else if (v(t) < 0 && a(t) > 0) stateDesc = 'Moving left, slowing down';
                            else if (v(t) < 0 && a(t) < 0) stateDesc = 'Moving left, speeding up';
                            viz.screenText(stateDesc, 20, 96, viz.colors.yellow, 12, 'left');
                        }

                        draw();
                        VizEngine.createSlider(controls, 't', 0, 4.5, tVal.value, 0.05, function(val) {
                            tVal.value = val;
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'concavity-second-derivative',
                    title: 'Concavity and the Second Derivative',
                    description: 'When \\(f\'\'(x) > 0\\), the curve bends upward (concave up). When \\(f\'\'(x) < 0\\), the curve bends downward (concave down). Where \\(f\'\'(x) = 0\\) may be an inflection point.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 25, originX: 250, originY: 230 });
                        var f = function(x) { return x * x * x / 3 - x * x - 3 * x + 4; };
                        var df = function(x) { return x * x - 2 * x - 3; };
                        var ddf = function(x) { return 2 * x - 2; };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Shade concave up regions (f'' > 0)
                            for (var x = -4; x < 8; x += 0.05) {
                                if (ddf(x) > 0) {
                                    var sx1 = viz.toScreen(x, 0)[0];
                                    var sx2 = viz.toScreen(x + 0.05, 0)[0];
                                    viz.ctx.fillStyle = viz.colors.blue + '15';
                                    viz.ctx.fillRect(sx1, 0, sx2 - sx1, viz.height);
                                } else {
                                    var sx1 = viz.toScreen(x, 0)[0];
                                    var sx2 = viz.toScreen(x + 0.05, 0)[0];
                                    viz.ctx.fillStyle = viz.colors.red + '15';
                                    viz.ctx.fillRect(sx1, 0, sx2 - sx1, viz.height);
                                }
                            }

                            // f(x)
                            viz.drawFunction(f, -4, 8, viz.colors.white, 2.5);
                            // f''(x)
                            viz.drawFunction(ddf, -4, 8, viz.colors.purple, 1.5);

                            // Inflection point at x = 1
                            var ip = 1;
                            viz.drawPoint(ip, f(ip), viz.colors.yellow, 'inflection', 6);
                            viz.drawSegment(ip, -5, ip, 10, viz.colors.yellow + '44', 1, true);

                            viz.screenText('f(x) = x^3/3 - x^2 - 3x + 4', 20, 20, viz.colors.white, 13, 'left');
                            viz.screenText("f''(x) = 2x - 2", 20, 40, viz.colors.purple, 13, 'left');
                            viz.screenText("Blue region: f'' > 0 (concave up)", 20, 65, viz.colors.blue, 12, 'left');
                            viz.screenText("Red region: f'' < 0 (concave down)", 20, 85, viz.colors.red, 12, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find \\(f\'(x)\\), \\(f\'\'(x)\\), and \\(f\'\'\'(x)\\) for \\(f(x) = x^5 - 2x^3 + x\\).',
                    hint: 'Apply the power rule repeatedly.',
                    solution: '\\(f\'(x) = 5x^4 - 6x^2 + 1\\). \\(f\'\'(x) = 20x^3 - 12x\\). \\(f\'\'\'(x) = 60x^2 - 12\\).'
                },
                {
                    question: 'A ball is thrown upward with position \\(s(t) = -4.9t^2 + 20t + 1\\) (meters). Find the velocity when \\(s(t) = 0\\) (when the ball hits the ground). What does the sign of \\(s\'\'(t)\\) tell you?',
                    hint: 'First find \\(v(t) = s\'(t)\\), then find the time when \\(s(t) = 0\\) using the quadratic formula. \\(s\'\'(t)\\) is the acceleration due to gravity.',
                    solution: '\\(v(t) = -9.8t + 20\\). \\(s\'\'(t) = -9.8\\) (constant downward acceleration). Setting \\(s(t) = 0\\): \\(-4.9t^2 + 20t + 1 = 0\\). Using the quadratic formula, \\(t = \\frac{-20 \\pm \\sqrt{400 + 19.6}}{-9.8}\\). Taking the positive root \\(t \\approx 4.13\\) s. Then \\(v(4.13) = -9.8(4.13) + 20 \\approx -20.5\\) m/s (negative means downward). Since \\(s\'\'(t) = -9.8 < 0\\), the graph of \\(s(t)\\) is concave down (the ball always decelerates upward or accelerates downward).'
                },
                {
                    question: 'If \\(f(x) = \\sin(x)\\), find \\(f^{(100)}(x)\\).',
                    hint: 'Compute the first few derivatives and look for a pattern. The derivatives of \\(\\sin(x)\\) cycle with period 4.',
                    solution: '\\(f\' = \\cos x\\), \\(f\'\' = -\\sin x\\), \\(f\'\'\' = -\\cos x\\), \\(f^{(4)} = \\sin x\\). The cycle repeats every 4 derivatives. Since \\(100 = 4 \\times 25\\), we have \\(f^{(100)}(x) = \\sin(x)\\).'
                },
                {
                    question: 'For the position function \\(s(t) = t^3 - 6t^2 + 9t\\), find the times when the particle changes direction and the total distance traveled from \\(t = 0\\) to \\(t = 4\\).',
                    hint: 'The particle changes direction when \\(v(t) = 0\\). Find where velocity changes sign, then add up the absolute displacements.',
                    solution: '\\(v(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3) = 0\\) at \\(t = 1\\) and \\(t = 3\\). \\(s(0) = 0\\), \\(s(1) = 4\\), \\(s(3) = 0\\), \\(s(4) = 4\\). The particle goes right (0 to 4), then left (4 to 0), then right (0 to 4). Total distance = \\(|4-0| + |0-4| + |4-0| = 4 + 4 + 4 = 12\\) meters.'
                }
            ]
        }
    ]
});
