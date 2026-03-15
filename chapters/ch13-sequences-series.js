// === Chapter 13: Sequences & Series ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Sequences & Series',
    subtitle: 'Infinite sums: when they converge, when they diverge, and how to tell the difference',
    sections: [
        // ============================================================
        // Section 1: Sequences & Their Limits
        // ============================================================
        {
            id: 'sequences-limits',
            title: 'Sequences & Their Limits',
            content: `
<div class="env-block intuition">
<p><strong>From continuous to discrete.</strong> So far in calculus, we have worked with continuous processes: limits of functions, derivatives, integrals. Now we turn to discrete processes: <em>sequences</em> (ordered lists of numbers) and <em>series</em> (infinite sums). The key insight is that a series is really a sequence in disguise; we study the sequence of partial sums. This chapter develops the tools to decide when an infinite sum converges, setting the stage for power series and Taylor series in Chapter 14.</p>
</div>

<h2>Sequences & Their Limits</h2>

<p>We begin with the most fundamental discrete object: a sequence of real numbers. Sequences appear everywhere in mathematics, from recursive algorithms to the partial sums that define series. Understanding when and how a sequence converges is the foundation for everything that follows in this chapter.</p>

<div class="env-block definition">
<div class="env-label">Definition 13.1 — Sequence</div>
<p>A <strong>sequence</strong> is a function \\(a : \\mathbb{N} \\to \\mathbb{R}\\). We write \\(\\{a_n\\}_{n=1}^{\\infty}\\) or simply \\(\\{a_n\\}\\). The values \\(a_1, a_2, a_3, \\ldots\\) are the <strong>terms</strong> of the sequence.</p>
</div>

<p>Examples of sequences:</p>
<ul>
<li>\\(a_n = \\dfrac{1}{n}\\): the terms \\(1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\ldots\\) get closer and closer to \\(0\\).</li>
<li>\\(b_n = (-1)^n\\): the terms \\(-1, 1, -1, 1, \\ldots\\) oscillate forever.</li>
<li>\\(c_n = \\dfrac{n}{n+1}\\): the terms \\(\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\ldots\\) approach \\(1\\).</li>
</ul>

<div class="env-block definition">
<div class="env-label">Definition 13.2 — Limit of a Sequence</div>
<p>We say \\(\\lim_{n \\to \\infty} a_n = L\\) if for every \\(\\varepsilon > 0\\) there exists \\(N \\in \\mathbb{N}\\) such that</p>
\\[n > N \\implies |a_n - L| < \\varepsilon.\\]
<p>If such an \\(L\\) exists, the sequence <strong>converges</strong>; otherwise it <strong>diverges</strong>.</p>
</div>

<p>Intuitively, convergence means that no matter how tight a band \\((L - \\varepsilon, L + \\varepsilon)\\) we draw around the limit, eventually all terms of the sequence stay inside that band.</p>

<div class="viz-placeholder" data-viz="seq-convergence-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.1 — Limit Laws for Sequences</div>
<p>If \\(\\lim a_n = L\\) and \\(\\lim b_n = M\\), then:</p>
<ol>
<li>\\(\\lim (a_n \\pm b_n) = L \\pm M\\)</li>
<li>\\(\\lim (a_n \\cdot b_n) = L \\cdot M\\)</li>
<li>\\(\\lim \\dfrac{a_n}{b_n} = \\dfrac{L}{M}\\) provided \\(M \\neq 0\\)</li>
<li>\\(\\lim c \\cdot a_n = c \\cdot L\\) for any constant \\(c\\)</li>
</ol>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.2 — Squeeze Theorem for Sequences</div>
<p>If \\(a_n \\le b_n \\le c_n\\) for all \\(n\\) sufficiently large, and \\(\\lim a_n = \\lim c_n = L\\), then \\(\\lim b_n = L\\).</p>
</div>

<div class="env-block definition">
<div class="env-label">Definition 13.3 — Bounded and Monotone Sequences</div>
<p>A sequence \\(\\{a_n\\}\\) is:</p>
<ul>
<li><strong>Bounded above</strong> if there exists \\(M\\) such that \\(a_n \\le M\\) for all \\(n\\).</li>
<li><strong>Bounded below</strong> if there exists \\(m\\) such that \\(a_n \\ge m\\) for all \\(n\\).</li>
<li><strong>Bounded</strong> if it is bounded both above and below.</li>
<li><strong>Increasing</strong> (or non-decreasing) if \\(a_{n+1} \\ge a_n\\) for all \\(n\\).</li>
<li><strong>Decreasing</strong> (or non-increasing) if \\(a_{n+1} \\le a_n\\) for all \\(n\\).</li>
<li><strong>Monotone</strong> if it is either increasing or decreasing.</li>
</ul>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.3 — Monotone Convergence Theorem</div>
<p>Every bounded, monotone sequence converges.</p>
<p>More precisely: if \\(\\{a_n\\}\\) is increasing and bounded above, then \\(\\lim a_n = \\sup\\{a_n : n \\ge 1\\}\\). If \\(\\{a_n\\}\\) is decreasing and bounded below, then \\(\\lim a_n = \\inf\\{a_n : n \\ge 1\\}\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.1</div>
<p>Consider \\(a_n = \\left(1 + \\frac{1}{n}\\right)^n\\). This sequence is increasing and bounded above by \\(3\\). By the Monotone Convergence Theorem, it converges. Its limit is Euler's number \\(e \\approx 2.71828\\).</p>
</div>

<div class="viz-placeholder" data-viz="monotone-convergence-viz"></div>
`,
            visualizations: [
                {
                    id: 'seq-convergence-viz',
                    title: 'Sequence Convergence: \\(\\varepsilon\\)-\\(N\\) Definition',
                    description: 'Use the sliders to choose a sequence and adjust \\(\\varepsilon\\). The visualization highlights the epsilon-band and the value of \\(N\\) beyond which all terms lie inside the band.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 22, originX: 50, originY: 320
                        });

                        var seqChoice = 0;
                        var epsilon = 0.5;

                        var sequences = [
                            { name: '1/n', fn: function(n) { return 1 / n; }, limit: 0, label: 'a_n = 1/n, L = 0' },
                            { name: 'n/(n+1)', fn: function(n) { return n / (n + 1); }, limit: 1, label: 'a_n = n/(n+1), L = 1' },
                            { name: '(-1)^n/n', fn: function(n) { return Math.pow(-1, n) / n; }, limit: 0, label: 'a_n = (-1)^n/n, L = 0' }
                        ];

                        function findN(seq, eps) {
                            for (var n = 1; n <= 30; n++) {
                                var allInside = true;
                                for (var k = n; k <= 30; k++) {
                                    if (Math.abs(seq.fn(k) - seq.limit) >= eps) { allInside = false; break; }
                                }
                                if (allInside) return n;
                            }
                            return 30;
                        }

                        function draw() {
                            var seq = sequences[seqChoice];
                            viz.clear();

                            // Draw grid and axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 30; gx += 5) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -2; gy <= 2; gy += 0.5) {
                                var sy = viz.originY - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= 25; lx += 5) {
                                ctx.fillText(lx, viz.originX + lx * viz.scale, viz.originY + 4);
                            }
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var ly = -1; ly <= 2; ly++) {
                                if (ly === 0) continue;
                                ctx.fillText(ly, viz.originX - 6, viz.originY - ly * viz.scale);
                            }

                            var L = seq.limit;

                            // Epsilon band
                            var bandTop = viz.originY - (L + epsilon) * viz.scale;
                            var bandBot = viz.originY - (L - epsilon) * viz.scale;
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(viz.originX, bandTop, viz.width - viz.originX, bandBot - bandTop);

                            // Limit line
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, viz.originY - L * viz.scale);
                            ctx.lineTo(viz.width, viz.originY - L * viz.scale);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Band boundary lines
                            ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 0.8;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, bandTop); ctx.lineTo(viz.width, bandTop); ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, bandBot); ctx.lineTo(viz.width, bandBot); ctx.stroke();
                            ctx.setLineDash([]);

                            // Find N
                            var N = findN(seq, epsilon);

                            // N line
                            var Nsx = viz.originX + N * viz.scale;
                            ctx.strokeStyle = viz.colors.orange + '88'; ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath(); ctx.moveTo(Nsx, 0); ctx.lineTo(Nsx, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot sequence points
                            for (var n = 1; n <= 25; n++) {
                                var val = seq.fn(n);
                                var inside = Math.abs(val - L) < epsilon;
                                var c = n >= N ? viz.colors.green : (inside ? viz.colors.teal : viz.colors.red);
                                var px = viz.originX + n * viz.scale;
                                var py = viz.originY - val * viz.scale;
                                ctx.fillStyle = c;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('L = ' + L, viz.width - 60, viz.originY - L * viz.scale - 4);

                            ctx.fillStyle = viz.colors.orange; ctx.textBaseline = 'top';
                            ctx.fillText('N = ' + N, Nsx + 4, 10);

                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText(seq.label, 10, 10);

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green; ctx.fillText('n >= N (inside band)', 10, 30);
                            ctx.fillStyle = viz.colors.red; ctx.fillText('n < N or outside band', 10, 46);
                        }

                        VizEngine.createSlider(controls, 'Sequence', 0, 2, 0, 1, function(v) {
                            seqChoice = Math.round(v);
                            draw();
                        });

                        VizEngine.createSlider(controls, 'epsilon', 0.05, 1.5, 0.5, 0.05, function(v) {
                            epsilon = v;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'monotone-convergence-viz',
                    title: 'Monotone Convergence Theorem',
                    description: 'An increasing, bounded sequence must converge. Drag the slider to add more terms and watch the sequence approach its supremum.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 340,
                            scale: 22, originX: 50, originY: 280
                        });

                        var nTerms = 10;
                        var seqChoice = 0;

                        var sequences = [
                            {
                                name: '(1+1/n)^n -> e',
                                fn: function(n) { return Math.pow(1 + 1 / n, n); },
                                bound: Math.E,
                                yScale: 1,
                                label: '(1+1/n)^n'
                            },
                            {
                                name: '1 - 1/2^n',
                                fn: function(n) { return 1 - Math.pow(0.5, n); },
                                bound: 1,
                                yScale: 1,
                                label: '1 - 1/2^n'
                            },
                            {
                                name: 'sum 1/k! (partial sums)',
                                fn: function(n) {
                                    var s = 0;
                                    var fact = 1;
                                    for (var k = 0; k <= n; k++) {
                                        if (k > 0) fact *= k;
                                        s += 1 / fact;
                                    }
                                    return s;
                                },
                                bound: Math.E,
                                yScale: 1,
                                label: 'sum_{k=0}^n 1/k!'
                            }
                        ];

                        function draw() {
                            var seq = sequences[seqChoice];
                            viz.clear();

                            var ctx = viz.ctx;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 25; gx += 5) {
                                var sx = viz.originX + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 4; gy++) {
                                var sy = viz.originY - gy * viz.scale * seq.yScale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= 20; lx += 5) {
                                ctx.fillText(lx, viz.originX + lx * viz.scale, viz.originY + 4);
                            }

                            // Bound line (supremum)
                            var boundY = viz.originY - seq.bound * viz.scale * seq.yScale;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(viz.originX, boundY); ctx.lineTo(viz.width, boundY); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('sup = ' + seq.bound.toFixed(4), viz.width - 120, boundY - 4);

                            // Plot points
                            var prev = null;
                            for (var n = 1; n <= nTerms; n++) {
                                var val = seq.fn(n);
                                var px = viz.originX + n * viz.scale;
                                var py = viz.originY - val * viz.scale * seq.yScale;

                                // Connect with line
                                if (prev) {
                                    ctx.strokeStyle = viz.colors.teal + '66'; ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Title label
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText(seq.label + ', n = 1..' + nTerms, 10, 10);
                        }

                        VizEngine.createSlider(controls, 'n (terms)', 1, 20, 10, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Sequence', 0, 2, 0, 1, function(v) {
                            seqChoice = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Determine whether the sequence \\(a_n = \\dfrac{3n^2 + 1}{n^2 + 5n}\\) converges. If it does, find its limit.',
                    hint: 'Divide numerator and denominator by \\(n^2\\).',
                    solution: 'Dividing by \\(n^2\\): \\[a_n = \\frac{3 + 1/n^2}{1 + 5/n} \\to \\frac{3 + 0}{1 + 0} = 3.\\] The sequence converges to \\(3\\).'
                },
                {
                    question: 'Show that the sequence \\(a_n = \\dfrac{n!}{n^n}\\) converges to \\(0\\).',
                    hint: 'Bound \\(n!/n^n\\) by noting that each factor \\(k/n \\le 1\\) and the first factor is \\(1/n\\).',
                    solution: 'We have \\(\\frac{n!}{n^n} = \\frac{1}{n} \\cdot \\frac{2}{n} \\cdots \\frac{n}{n} \\le \\frac{1}{n} \\cdot 1 \\cdots 1 = \\frac{1}{n}\\). Since \\(0 \\le a_n \\le 1/n\\) and \\(1/n \\to 0\\), by the Squeeze Theorem \\(a_n \\to 0\\).'
                },
                {
                    question: 'Let \\(a_1 = 1\\) and \\(a_{n+1} = \\frac{1}{2}(a_n + 3)\\). Show that \\(\\{a_n\\}\\) is increasing and bounded above by \\(3\\), then find its limit.',
                    hint: 'Use induction to show \\(a_n < 3\\) and \\(a_{n+1} > a_n\\). For the limit, set \\(L = \\frac{1}{2}(L + 3)\\).',
                    solution: '<p><strong>Bounded above:</strong> \\(a_1 = 1 < 3\\). If \\(a_n < 3\\), then \\(a_{n+1} = \\frac{1}{2}(a_n + 3) < \\frac{1}{2}(3 + 3) = 3\\). By induction, \\(a_n < 3\\) for all \\(n\\).</p><p><strong>Increasing:</strong> \\(a_{n+1} - a_n = \\frac{1}{2}(3 - a_n) > 0\\) since \\(a_n < 3\\).</p><p>By the Monotone Convergence Theorem, the limit \\(L\\) exists. Then \\(L = \\frac{1}{2}(L + 3)\\), giving \\(L = 3\\).</p>'
                },
                {
                    question: 'Does the sequence \\(a_n = \\sin(n)\\) converge?',
                    hint: 'Consider the density of \\(\\{n \\mod 2\\pi\\}\\) in \\([0, 2\\pi)\\).',
                    solution: 'No. Since \\(\\pi\\) is irrational, the sequence \\(\\{n \\bmod 2\\pi\\}\\) is dense in \\([0, 2\\pi)\\) (equidistribution theorem). Therefore \\(\\sin(n)\\) takes values arbitrarily close to every point in \\([-1, 1]\\) infinitely often, so it cannot converge.'
                }
            ]
        },

        // ============================================================
        // Section 2: Infinite Series & Partial Sums
        // ============================================================
        {
            id: 'infinite-series',
            title: 'Infinite Series & Partial Sums',
            content: `
<div class="env-block intuition">
<p><strong>From sequences to series.</strong> In the previous section we studied sequences and their limits. Now we ask a bolder question: can we <em>add up</em> infinitely many numbers and get a finite result? The answer is sometimes yes, sometimes no, and the key to deciding is elegant: define the <em>partial sums</em> \\(S_N = a_1 + a_2 + \\cdots + a_N\\), which form a new sequence \\(\\{S_N\\}\\). The infinite series \\(\\sum a_n\\) converges precisely when this sequence of partial sums converges. In other words, series convergence <em>is</em> sequence convergence.</p>
</div>

<h2>Infinite Series & Partial Sums</h2>

<div class="env-block definition">
<div class="env-label">Definition 13.4 — Infinite Series</div>
<p>Given a sequence \\(\\{a_n\\}\\), the <strong>infinite series</strong> \\(\\displaystyle\\sum_{n=1}^{\\infty} a_n\\) is defined as the limit of the <strong>partial sums</strong></p>
\\[S_N = \\sum_{n=1}^{N} a_n = a_1 + a_2 + \\cdots + a_N.\\]
<p>If \\(\\lim_{N \\to \\infty} S_N = S\\) exists and is finite, we say the series <strong>converges</strong> to \\(S\\) and write \\(\\sum_{n=1}^{\\infty} a_n = S\\). Otherwise the series <strong>diverges</strong>.</p>
</div>

<p>A series is nothing more than a sequence of partial sums. All of our convergence theory for sequences applies directly.</p>

<div class="viz-placeholder" data-viz="partial-sums-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.4 — Geometric Series</div>
<p>The geometric series \\(\\displaystyle\\sum_{n=0}^{\\infty} ar^n\\) converges if and only if \\(|r| < 1\\), in which case</p>
\\[\\sum_{n=0}^{\\infty} ar^n = \\frac{a}{1 - r}.\\]
<p>If \\(|r| \\ge 1\\), the series diverges.</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.2 — Geometric Series</div>
<p>\\(\\displaystyle\\sum_{n=0}^{\\infty} \\frac{1}{2^n} = \\frac{1}{1 - 1/2} = 2\\).</p>
<p>\\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{3}{4^n} = \\frac{3/4}{1 - 1/4} = 1\\).</p>
</div>

<div class="viz-placeholder" data-viz="geometric-series-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.5 — Telescoping Series</div>
<p>A <strong>telescoping series</strong> has the form \\(\\sum (b_n - b_{n+1})\\). Its partial sum simplifies to</p>
\\[S_N = b_1 - b_{N+1},\\]
<p>so the series converges if and only if \\(\\lim_{N \\to \\infty} b_{N+1}\\) exists, in which case \\(\\sum_{n=1}^{\\infty} (b_n - b_{n+1}) = b_1 - \\lim b_{n+1}\\).</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.3 — Telescoping</div>
<p>\\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)} = \\sum_{n=1}^{\\infty}\\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = 1 - \\lim_{N \\to \\infty} \\frac{1}{N+1} = 1\\).</p>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.6 — Divergence of the Harmonic Series</div>
<p>The <strong>harmonic series</strong> \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n}\\) diverges.</p>
</div>

<div class="env-block proof">
<div class="env-label">Proof sketch</div>
<p>Group terms: \\(\\frac{1}{3} + \\frac{1}{4} > \\frac{1}{2}\\), \\(\\frac{1}{5} + \\cdots + \\frac{1}{8} > \\frac{1}{2}\\), and so on. Each group of \\(2^k\\) terms sums to more than \\(\\frac{1}{2}\\). Since we get infinitely many such groups, \\(S_N \\to \\infty\\).</p>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.7 — Divergence Test (nth-Term Test)</div>
<p>If \\(\\displaystyle\\sum_{n=1}^{\\infty} a_n\\) converges, then \\(\\lim_{n \\to \\infty} a_n = 0\\).</p>
<p><strong>Contrapositive:</strong> If \\(\\lim a_n \\neq 0\\) (or does not exist), then \\(\\sum a_n\\) diverges.</p>
<p><strong>Warning:</strong> \\(\\lim a_n = 0\\) does NOT imply convergence. The harmonic series is a counterexample.</p>
</div>
`,
            visualizations: [
                {
                    id: 'partial-sums-viz',
                    title: 'Partial Sums: Convergence vs Divergence',
                    description: 'Watch partial sums accumulate. Compare a convergent series to the divergent harmonic series.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 18, originX: 50, originY: 340
                        });

                        var nMax = 15;
                        var seriesChoice = 0;

                        var seriesList = [
                            {
                                name: '1/n^2 (converges to pi^2/6)',
                                term: function(n) { return 1 / (n * n); },
                                limit: Math.PI * Math.PI / 6,
                                label: 'sum 1/n^2'
                            },
                            {
                                name: '1/n (harmonic, diverges)',
                                term: function(n) { return 1 / n; },
                                limit: null,
                                label: 'sum 1/n'
                            },
                            {
                                name: '1/2^n (geometric)',
                                term: function(n) { return Math.pow(0.5, n); },
                                limit: 1,
                                label: 'sum 1/2^n (n>=1)'
                            },
                            {
                                name: '1/(n(n+1)) (telescoping)',
                                term: function(n) { return 1 / (n * (n + 1)); },
                                limit: 1,
                                label: 'sum 1/(n(n+1))'
                            }
                        ];

                        function draw() {
                            var ser = seriesList[seriesChoice];
                            viz.clear();

                            var ctx = viz.ctx;

                            // Compute partial sums
                            var partials = [];
                            var s = 0;
                            for (var n = 1; n <= nMax; n++) {
                                s += ser.term(n);
                                partials.push(s);
                            }

                            // Determine y-scale
                            var yMax = Math.max(2, partials[partials.length - 1] * 1.3);
                            var yScale = (viz.height - 60) / yMax;
                            var xScale = (viz.width - 80) / Math.max(nMax, 1);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= nMax; gx += 5) {
                                var sx = 50 + gx * xScale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.height - 40); ctx.lineTo(viz.width, viz.height - 40); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, viz.height - 36);
                            }
                            ctx.fillText('n', viz.width - 15, viz.height - 36);

                            // Limit line
                            if (ser.limit !== null) {
                                var ly = viz.height - 40 - ser.limit * yScale;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(50, ly); ctx.lineTo(viz.width, ly); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                                ctx.fillText('S = ' + ser.limit.toFixed(4), viz.width - 110, ly - 4);
                            }

                            // Plot partial sums as bar chart and connected dots
                            var prev = null;
                            for (var i = 0; i < partials.length; i++) {
                                var px = 50 + (i + 1) * xScale;
                                var py = viz.height - 40 - partials[i] * yScale;

                                // Bar
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.fillRect(px - xScale * 0.3, py, xScale * 0.6, viz.height - 40 - py);
                                ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1;
                                ctx.strokeRect(px - xScale * 0.3, py, xScale * 0.6, viz.height - 40 - py);

                                // Connecting line
                                if (prev) {
                                    ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                // Dot
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText(ser.label, 10, 10);

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('S_' + nMax + ' = ' + partials[partials.length - 1].toFixed(6), 10, 30);

                            if (ser.limit === null) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('DIVERGES', 10, 48);
                            }
                        }

                        VizEngine.createSlider(controls, 'N (terms)', 1, 30, 15, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Series', 0, 3, 0, 1, function(v) {
                            seriesChoice = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'geometric-series-viz',
                    title: 'Geometric Series \\(\\sum ar^n\\)',
                    description: 'Adjust \\(a\\) and \\(r\\) to see how the geometric series behaves. When \\(|r| < 1\\), partial sums converge to \\(a/(1-r)\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 360,
                            scale: 18, originX: 50, originY: 310
                        });

                        var a = 1;
                        var r = 0.5;
                        var nMax = 20;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var converges = Math.abs(r) < 1;
                            var limit = converges ? a / (1 - r) : null;

                            // Compute partial sums: sum from n=0 to N of a*r^n
                            var partials = [];
                            var s = 0;
                            for (var n = 0; n <= nMax; n++) {
                                s += a * Math.pow(r, n);
                                partials.push(s);
                            }

                            var yMax = converges ? Math.max(Math.abs(limit) * 1.5, 2) : Math.max(Math.abs(partials[partials.length - 1]) * 1.2, 2);
                            var yMin = 0;
                            if (r < 0) {
                                var allVals = partials.slice();
                                var minVal = Math.min.apply(null, allVals);
                                yMin = Math.min(minVal * 1.2, -0.5);
                                yMax = Math.max(yMax, 0.5);
                            }
                            var plotHeight = viz.height - 60;
                            var yScale = plotHeight / (yMax - yMin);
                            var xScale = (viz.width - 80) / Math.max(nMax, 1);
                            var baseY = viz.height - 40 + yMin * yScale;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(viz.width, baseY); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, baseY + 4);
                            }

                            // Limit line
                            if (converges) {
                                var ly = baseY - limit * yScale;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(50, ly); ctx.lineTo(viz.width, ly); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                                ctx.fillText('a/(1-r) = ' + limit.toFixed(3), viz.width - 10, ly - 4);
                            }

                            // Plot partial sums
                            var prev = null;
                            for (var i = 0; i <= nMax; i++) {
                                var px = 50 + i * xScale;
                                var py = baseY - partials[i] * yScale;

                                if (prev) {
                                    ctx.strokeStyle = viz.colors.blue + '88'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('a = ' + a.toFixed(1) + ', r = ' + r.toFixed(2), 10, 10);

                            ctx.fillStyle = converges ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(converges ? 'CONVERGES' : 'DIVERGES (|r| >= 1)', 10, 30);
                        }

                        VizEngine.createSlider(controls, 'a', 0.5, 3, 1, 0.1, function(v) { a = v; draw(); });
                        VizEngine.createSlider(controls, 'r', -0.95, 0.95, 0.5, 0.05, function(v) { r = v; draw(); });
                        VizEngine.createSlider(controls, 'N', 5, 30, 20, 1, function(v) { nMax = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the sum of the geometric series \\(\\displaystyle\\sum_{n=0}^{\\infty} \\frac{(-1)^n}{3^n}\\).',
                    hint: 'Write this as \\(\\sum_{n=0}^{\\infty} (-1/3)^n\\).',
                    solution: 'This is a geometric series with \\(a = 1\\) and \\(r = -1/3\\). Since \\(|r| = 1/3 < 1\\), it converges: \\[\\sum_{n=0}^{\\infty} \\left(-\\frac{1}{3}\\right)^n = \\frac{1}{1 - (-1/3)} = \\frac{1}{4/3} = \\frac{3}{4}.\\]'
                },
                {
                    question: 'Evaluate the telescoping series \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n(n+2)}\\).',
                    hint: 'Use partial fractions: \\(\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)\\).',
                    solution: '<p>By partial fractions: \\(\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)\\).</p><p>The partial sum: \\[S_N = \\frac{1}{2}\\left[\\left(1 - \\frac{1}{3}\\right) + \\left(\\frac{1}{2} - \\frac{1}{4}\\right) + \\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\cdots\\right] = \\frac{1}{2}\\left(1 + \\frac{1}{2} - \\frac{1}{N+1} - \\frac{1}{N+2}\\right).\\]</p><p>As \\(N \\to \\infty\\): \\(S = \\frac{1}{2}\\left(\\frac{3}{2}\\right) = \\frac{3}{4}\\).</p>'
                },
                {
                    question: 'Use the Divergence Test to show that \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{n}{2n+3}\\) diverges.',
                    hint: 'Compute \\(\\lim_{n \\to \\infty} \\frac{n}{2n+3}\\).',
                    solution: '\\(\\lim_{n \\to \\infty} \\frac{n}{2n + 3} = \\lim_{n \\to \\infty} \\frac{1}{2 + 3/n} = \\frac{1}{2} \\neq 0\\). By the Divergence Test, the series diverges.'
                }
            ]
        },

        // ============================================================
        // Section 3: Comparison & Integral Tests
        // ============================================================
        {
            id: 'comparison-integral',
            title: 'Comparison & Integral Tests',
            content: `
<div class="env-block intuition">
<p><strong>Beyond closed-form sums.</strong> In the last section we computed series by finding explicit formulas for partial sums (geometric, telescoping). But most series have no closed-form partial sum. We need indirect methods: if we already know a "benchmark" series converges or diverges, we can compare our unknown series to it. This section introduces two families of such tests: <em>comparison tests</em> (direct and limit) and the <em>integral test</em>, which connects discrete sums back to the continuous integrals of Chapter 12.</p>
</div>

<h2>Comparison & Integral Tests</h2>

<p>For most series, we cannot find a closed-form for the partial sums. Instead, we develop <strong>convergence tests</strong> that compare a given series to one we already understand.</p>

<div class="env-block theorem">
<div class="env-label">Theorem 13.8 — Direct Comparison Test</div>
<p>Suppose \\(0 \\le a_n \\le b_n\\) for all \\(n\\) sufficiently large.</p>
<ol>
<li>If \\(\\sum b_n\\) converges, then \\(\\sum a_n\\) converges.</li>
<li>If \\(\\sum a_n\\) diverges, then \\(\\sum b_n\\) diverges.</li>
</ol>
</div>

<p>Think of it this way: a series smaller than a convergent series must converge; a series larger than a divergent series must diverge.</p>

<div class="env-block example">
<div class="env-label">Example 13.4</div>
<p>Does \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n^2 + 1}\\) converge?</p>
<p>Since \\(\\frac{1}{n^2 + 1} < \\frac{1}{n^2}\\) and \\(\\sum 1/n^2\\) converges (it is a \\(p\\)-series with \\(p = 2 > 1\\)), the Direct Comparison Test gives convergence.</p>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.9 — Limit Comparison Test</div>
<p>Suppose \\(a_n > 0\\) and \\(b_n > 0\\) for all \\(n\\) sufficiently large. If</p>
\\[L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n}\\]
<p>exists and \\(0 < L < \\infty\\), then \\(\\sum a_n\\) and \\(\\sum b_n\\) either both converge or both diverge.</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.5</div>
<p>Does \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{n}{n^3 + 5}\\) converge?</p>
<p>Compare with \\(b_n = 1/n^2\\): \\(\\frac{a_n}{b_n} = \\frac{n \\cdot n^2}{n^3 + 5} = \\frac{n^3}{n^3 + 5} \\to 1\\). Since \\(\\sum 1/n^2\\) converges, so does \\(\\sum \\frac{n}{n^3+5}\\).</p>
</div>

<div class="viz-placeholder" data-viz="comparison-test-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.10 — The Integral Test</div>
<p>Let \\(f\\) be a continuous, positive, decreasing function on \\([1, \\infty)\\) with \\(a_n = f(n)\\). Then</p>
\\[\\sum_{n=1}^{\\infty} a_n \\quad \\text{and} \\quad \\int_1^{\\infty} f(x)\\,dx\\]
<p>either both converge or both diverge.</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.6 — p-Series</div>
<p>The \\(p\\)-series \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n^p}\\) converges if \\(p > 1\\) and diverges if \\(p \\le 1\\).</p>
<p><strong>Proof via Integral Test:</strong> \\(\\int_1^{\\infty} x^{-p}\\,dx\\) converges iff \\(p > 1\\).</p>
</div>

<div class="viz-placeholder" data-viz="integral-test-viz"></div>
`,
            visualizations: [
                {
                    id: 'comparison-test-viz',
                    title: 'Direct Comparison Test',
                    description: 'The blue series \\(a_n\\) is bounded above by the green series \\(b_n\\). If the green series converges, so must the blue.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 360,
                            scale: 18, originX: 50, originY: 310
                        });

                        var nMax = 20;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // a_n = 1/(n^2+1), b_n = 1/n^2
                            var xScale = (viz.width - 80) / nMax;
                            var yScale = 250;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.height - 40); ctx.lineTo(viz.width, viz.height - 40); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, viz.height - 36);
                            }

                            var sumA = 0, sumB = 0;
                            for (var n = 1; n <= nMax; n++) {
                                var an = 1 / (n * n + 1);
                                var bn = 1 / (n * n);
                                sumA += an;
                                sumB += bn;

                                var px = 50 + n * xScale;
                                var baseY = viz.height - 40;

                                // b_n bar (green, behind)
                                ctx.fillStyle = viz.colors.green + '33';
                                ctx.fillRect(px - xScale * 0.35, baseY - bn * yScale, xScale * 0.7, bn * yScale);
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 1;
                                ctx.strokeRect(px - xScale * 0.35, baseY - bn * yScale, xScale * 0.7, bn * yScale);

                                // a_n bar (blue, in front)
                                ctx.fillStyle = viz.colors.blue + '55';
                                ctx.fillRect(px - xScale * 0.25, baseY - an * yScale, xScale * 0.5, an * yScale);
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1;
                                ctx.strokeRect(px - xScale * 0.25, baseY - an * yScale, xScale * 0.5, an * yScale);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('a_n = 1/(n^2+1), partial sum = ' + sumA.toFixed(4), 10, 10);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('b_n = 1/n^2, partial sum = ' + sumB.toFixed(4), 10, 28);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('a_n <= b_n, so if sum(b_n) converges, sum(a_n) converges', 10, 46);
                        }

                        VizEngine.createSlider(controls, 'N', 5, 30, 20, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'integral-test-viz',
                    title: 'Integral Test for \\(\\sum 1/n^p\\)',
                    description: 'Compare the partial sums of \\(1/n^p\\) with the integral \\(\\int_1^N x^{-p}\\,dx\\). Adjust \\(p\\) to see when they converge or diverge.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 30, originX: 50, originY: 330
                        });

                        var p = 2;
                        var nMax = 15;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var f = function(x) { return Math.pow(x, -p); };

                            var xScale = (viz.width - 80) / nMax;
                            var yScale = 200;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.height - 40); ctx.lineTo(viz.width, viz.height - 40); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 1; lx <= nMax; lx += 2) {
                                ctx.fillText(lx, 50 + lx * xScale, viz.height - 36);
                            }

                            var baseY = viz.height - 40;

                            // Draw function curve
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 300; i++) {
                                var x = 0.5 + (nMax + 0.5) * i / 300;
                                var y = f(x);
                                if (!isFinite(y) || y > 5) { started = false; continue; }
                                var sx = 50 + x * xScale;
                                var sy = baseY - y * yScale;
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Shade integral (right Riemann = lower bound for decreasing f)
                            ctx.fillStyle = viz.colors.teal + '22';
                            for (var n = 1; n < nMax; n++) {
                                var sx1 = 50 + n * xScale;
                                var sx2 = 50 + (n + 1) * xScale;
                                var fy = f(n + 1); // right endpoint (smaller for decreasing)
                                if (!isFinite(fy) || fy > 5) continue;
                                ctx.fillRect(sx1, baseY - fy * yScale, sx2 - sx1, fy * yScale);
                            }

                            // Draw rectangles at each integer (left Riemann = series terms)
                            var sum = 0;
                            for (var n = 1; n <= nMax; n++) {
                                var val = f(n);
                                sum += val;
                                var sx = 50 + n * xScale;

                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(sx - xScale * 0.4, baseY - val * yScale, xScale * 0.8, val * yScale);
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1;
                                ctx.strokeRect(sx - xScale * 0.4, baseY - val * yScale, xScale * 0.8, val * yScale);
                            }

                            // Compute integral
                            var integralVal;
                            if (Math.abs(p - 1) < 0.01) {
                                integralVal = Math.log(nMax);
                            } else {
                                integralVal = (Math.pow(nMax, 1 - p) - 1) / (1 - p);
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('p = ' + p.toFixed(2), 10, 10);

                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('S_' + nMax + ' = ' + sum.toFixed(4), 10, 30);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('integral = ' + integralVal.toFixed(4), 10, 48);

                            var converges = p > 1;
                            ctx.fillStyle = converges ? viz.colors.green : viz.colors.red;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText(converges ? 'p > 1: CONVERGES' : 'p <= 1: DIVERGES', 10, 66);
                        }

                        VizEngine.createSlider(controls, 'p', 0.5, 3, 2, 0.05, function(v) { p = v; draw(); });
                        VizEngine.createSlider(controls, 'N', 5, 25, 15, 1, function(v) { nMax = Math.round(v); draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Direct Comparison Test to determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{\\sin^2 n}{n^2}\\) converges.',
                    hint: 'What is the maximum value of \\(\\sin^2 n\\)?',
                    solution: 'Since \\(0 \\le \\sin^2 n \\le 1\\), we have \\(0 \\le \\frac{\\sin^2 n}{n^2} \\le \\frac{1}{n^2}\\). Since \\(\\sum 1/n^2\\) converges (\\(p\\)-series with \\(p = 2 > 1\\)), by the Direct Comparison Test, \\(\\sum \\frac{\\sin^2 n}{n^2}\\) converges.'
                },
                {
                    question: 'Use the Limit Comparison Test to determine whether \\(\\displaystyle\\sum_{n=2}^{\\infty} \\frac{1}{\\sqrt{n^2 - 1}}\\) converges or diverges.',
                    hint: 'Compare with \\(1/n\\).',
                    solution: 'Let \\(a_n = \\frac{1}{\\sqrt{n^2-1}}\\) and \\(b_n = \\frac{1}{n}\\). Then \\[\\frac{a_n}{b_n} = \\frac{n}{\\sqrt{n^2-1}} = \\frac{1}{\\sqrt{1 - 1/n^2}} \\to 1.\\] Since \\(\\sum 1/n\\) diverges (harmonic), by the Limit Comparison Test, \\(\\sum \\frac{1}{\\sqrt{n^2-1}}\\) also diverges.'
                },
                {
                    question: 'Use the Integral Test to determine whether \\(\\displaystyle\\sum_{n=2}^{\\infty} \\frac{1}{n \\ln n}\\) converges or diverges.',
                    hint: 'Evaluate \\(\\int_2^{\\infty} \\frac{1}{x \\ln x}\\,dx\\) using the substitution \\(u = \\ln x\\).',
                    solution: 'Let \\(u = \\ln x\\), so \\(du = dx/x\\). Then \\[\\int_2^{\\infty} \\frac{dx}{x \\ln x} = \\int_{\\ln 2}^{\\infty} \\frac{du}{u} = \\lim_{b \\to \\infty} [\\ln u]_{\\ln 2}^{b} = \\infty.\\] The integral diverges, so by the Integral Test, \\(\\sum \\frac{1}{n \\ln n}\\) diverges.'
                },
                {
                    question: 'Does \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{2^n}{n!}\\) converge? Use a comparison argument.',
                    hint: 'For \\(n \\ge 3\\), compare \\(2^n / n!\\) with a geometric series.',
                    solution: '<p>For \\(n \\ge 3\\): \\(\\frac{2^n}{n!} = \\frac{2 \\cdot 2 \\cdot 2 \\cdots 2}{1 \\cdot 2 \\cdot 3 \\cdots n} \\le \\frac{4}{3} \\cdot \\left(\\frac{2}{3}\\right)^{n-3} \\cdot \\frac{1}{1}\\).</p><p>More precisely, for \\(n \\ge 3\\): \\(\\frac{2^n}{n!} \\le \\frac{4}{3} \\cdot \\frac{2^{n-3}}{3 \\cdot 4 \\cdots n}\\). Since each factor \\(2/k \\le 2/3\\) for \\(k \\ge 3\\), we get \\(\\frac{2^n}{n!} \\le \\frac{4}{3} \\cdot (2/3)^{n-3}\\).</p><p>This is bounded by a convergent geometric series (\\(|r| = 2/3 < 1\\)), so \\(\\sum 2^n/n!\\) converges by the Direct Comparison Test. (In fact, \\(\\sum_{n=0}^{\\infty} 2^n/n! = e^2\\).)</p>'
                }
            ]
        },

        // ============================================================
        // Section 4: Ratio & Root Tests
        // ============================================================
        {
            id: 'ratio-root',
            title: 'Ratio & Root Tests',
            content: `
<div class="env-block intuition">
<p><strong>Measuring the rate of decay.</strong> The comparison and integral tests work well for series whose terms look like rational functions of \\(n\\). But what about series with factorials (\\(n!\\)) or exponentials (\\(a^n\\))? For those, we need tests that measure the <em>ratio</em> of consecutive terms or the <em>nth root</em> of each term. Both tests reduce convergence to a single number \\(L\\): if \\(L < 1\\) the terms shrink fast enough to converge; if \\(L > 1\\) they grow too fast; if \\(L = 1\\) the test cannot decide.</p>
</div>

<h2>Ratio & Root Tests</h2>

<p>The Ratio and Root Tests are especially useful for series involving factorials, exponentials, and \\(n\\)-th powers. They measure how fast the terms of a series decay.</p>

<div class="env-block theorem">
<div class="env-label">Theorem 13.11 — The Ratio Test</div>
<p>Let \\(\\sum a_n\\) be a series with \\(a_n > 0\\). Define</p>
\\[L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}.\\]
<ol>
<li>If \\(L < 1\\), the series converges absolutely.</li>
<li>If \\(L > 1\\) (or \\(L = \\infty\\)), the series diverges.</li>
<li>If \\(L = 1\\), the test is <strong>inconclusive</strong>.</li>
</ol>
</div>

<div class="env-block example">
<div class="env-label">Example 13.7</div>
<p>Test \\(\\displaystyle\\sum_{n=0}^{\\infty} \\frac{n!}{n^n}\\).</p>
<p>\\(\\frac{a_{n+1}}{a_n} = \\frac{(n+1)! \\cdot n^n}{(n+1)^{n+1} \\cdot n!} = \\frac{n^n}{(n+1)^n} = \\left(\\frac{n}{n+1}\\right)^n = \\left(1 - \\frac{1}{n+1}\\right)^n \\to e^{-1} \\approx 0.368.\\)</p>
<p>Since \\(L = 1/e < 1\\), the series converges.</p>
</div>

<div class="viz-placeholder" data-viz="ratio-test-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.12 — The Root Test</div>
<p>Let \\(\\sum a_n\\) be a series with \\(a_n \\ge 0\\). Define</p>
\\[L = \\lim_{n \\to \\infty} \\sqrt[n]{a_n} = \\lim_{n \\to \\infty} (a_n)^{1/n}.\\]
<ol>
<li>If \\(L < 1\\), the series converges absolutely.</li>
<li>If \\(L > 1\\) (or \\(L = \\infty\\)), the series diverges.</li>
<li>If \\(L = 1\\), the test is <strong>inconclusive</strong>.</li>
</ol>
</div>

<div class="env-block example">
<div class="env-label">Example 13.8</div>
<p>Test \\(\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{2n+1}{3n+2}\\right)^n\\).</p>
<p>\\(\\sqrt[n]{a_n} = \\frac{2n+1}{3n+2} \\to \\frac{2}{3} < 1\\). By the Root Test, the series converges.</p>
</div>

<div class="env-block remark">
<div class="env-label">Remark — When Tests Are Inconclusive</div>
<p>Both the Ratio and Root Tests give \\(L = 1\\) for any \\(p\\)-series \\(\\sum 1/n^p\\). Since \\(p\\)-series can converge (\\(p > 1\\)) or diverge (\\(p \\le 1\\)), these tests genuinely cannot decide when \\(L = 1\\). In such cases, use the Comparison Test or Integral Test instead.</p>
</div>

<div class="viz-placeholder" data-viz="root-test-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.13 — Strategy Guide for Convergence Tests</div>
<p>Here is a rough decision tree:</p>
<ol>
<li><strong>Divergence Test first:</strong> If \\(\\lim a_n \\neq 0\\), the series diverges. Stop.</li>
<li><strong>Geometric series:</strong> If \\(a_n = ar^n\\), use the geometric series formula.</li>
<li><strong>Factorial or exponential terms:</strong> Try the Ratio Test.</li>
<li><strong>n-th power terms:</strong> Try the Root Test.</li>
<li><strong>Rational function of n:</strong> Try Limit Comparison with a \\(p\\)-series.</li>
<li><strong>Decreasing positive function:</strong> Try the Integral Test.</li>
<li><strong>Alternating signs:</strong> Try the Alternating Series Test (next section).</li>
</ol>
</div>
`,
            visualizations: [
                {
                    id: 'ratio-test-viz',
                    title: 'Ratio Test: \\(a_{n+1}/a_n\\)',
                    description: 'Watch the ratio \\(a_{n+1}/a_n\\) approach its limit \\(L\\). When \\(L < 1\\), terms shrink fast enough for convergence.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 18, originX: 50, originY: 200
                        });

                        var seriesChoice = 0;
                        var nMax = 15;

                        var seriesList = [
                            {
                                name: 'n!/n^n (L=1/e, converges)',
                                term: function(n) {
                                    // n!/n^n
                                    var val = 1;
                                    for (var k = 1; k <= n; k++) val *= k / n;
                                    return val;
                                },
                                limit: 1 / Math.E,
                                label: 'n!/n^n'
                            },
                            {
                                name: 'n!/2^n (L=inf, diverges)',
                                term: function(n) {
                                    var val = 1;
                                    for (var k = 1; k <= n; k++) val *= k / 2;
                                    return val;
                                },
                                limit: Infinity,
                                label: 'n!/2^n'
                            },
                            {
                                name: '2^n/n! (L=0, converges)',
                                term: function(n) {
                                    var val = 1;
                                    for (var k = 1; k <= n; k++) val *= 2 / k;
                                    return val;
                                },
                                limit: 0,
                                label: '2^n/n!'
                            }
                        ];

                        function draw() {
                            var ser = seriesList[seriesChoice];
                            viz.clear();
                            var ctx = viz.ctx;

                            var xScale = (viz.width - 80) / Math.max(nMax, 1);
                            var baseY = viz.originY;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(viz.width, baseY); ctx.stroke();

                            // y=1 line
                            ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 0.8;
                            ctx.setLineDash([4, 3]);
                            var y1line = baseY - 1 * 150;
                            ctx.beginPath(); ctx.moveTo(50, y1line); ctx.lineTo(viz.width, y1line); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('1', 46, y1line);

                            // Limit line
                            if (isFinite(ser.limit)) {
                                var lline = baseY - ser.limit * 150;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(50, lline); ctx.lineTo(viz.width, lline); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                                ctx.fillText('L = ' + ser.limit.toFixed(3), viz.width - 100, lline - 4);
                            }

                            // Compute ratios
                            var terms = [];
                            for (var n = 1; n <= nMax + 1; n++) {
                                terms.push(ser.term(n));
                            }

                            var prev = null;
                            for (var i = 0; i < nMax; i++) {
                                var ratio = (terms[i] !== 0) ? terms[i + 1] / terms[i] : 0;
                                if (!isFinite(ratio)) ratio = 3;
                                var clampedRatio = Math.min(Math.max(ratio, -0.5), 2.5);
                                var px = 50 + (i + 1) * xScale;
                                var py = baseY - clampedRatio * 150;

                                if (prev) {
                                    ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                var c = ratio < 1 ? viz.colors.green : viz.colors.red;
                                ctx.fillStyle = c;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, baseY + 4);
                            }

                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Ratio a_{n+1}/a_n for: ' + ser.label, 10, 10);

                            var converges = ser.limit < 1;
                            ctx.fillStyle = converges ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(converges ? 'L < 1: CONVERGES' : 'L >= 1: DIVERGES', 10, 30);
                        }

                        VizEngine.createSlider(controls, 'Series', 0, 2, 0, 1, function(v) {
                            seriesChoice = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'N', 5, 20, 15, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'root-test-viz',
                    title: 'Root Test: \\((a_n)^{1/n}\\)',
                    description: 'Plot the nth root \\((a_n)^{1/n}\\) and see whether it converges below 1.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 360,
                            scale: 18, originX: 50, originY: 200
                        });

                        var seriesChoice = 0;
                        var nMax = 20;

                        var seriesList = [
                            {
                                name: '((2n+1)/(3n+2))^n',
                                term: function(n) { return Math.pow((2 * n + 1) / (3 * n + 2), n); },
                                rootLimit: 2 / 3,
                                label: '((2n+1)/(3n+2))^n'
                            },
                            {
                                name: '(1/n)^n',
                                term: function(n) { return Math.pow(1 / n, n); },
                                rootLimit: 0,
                                label: '(1/n)^n'
                            },
                            {
                                name: '((n+1)/n)^(n^2)',
                                term: function(n) { return Math.pow((n + 1) / n, n * n); },
                                rootLimit: Math.E,
                                label: '((n+1)/n)^(n^2)'
                            }
                        ];

                        function draw() {
                            var ser = seriesList[seriesChoice];
                            viz.clear();
                            var ctx = viz.ctx;

                            var xScale = (viz.width - 80) / Math.max(nMax, 1);
                            var baseY = viz.originY;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(viz.width, baseY); ctx.stroke();

                            // y=1 line
                            ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 0.8;
                            ctx.setLineDash([4, 3]);
                            var y1line = baseY - 1 * 120;
                            ctx.beginPath(); ctx.moveTo(50, y1line); ctx.lineTo(viz.width, y1line); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('1', 46, y1line);

                            // Limit line
                            if (isFinite(ser.rootLimit) && ser.rootLimit > 0) {
                                var lline = baseY - ser.rootLimit * 120;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(50, lline); ctx.lineTo(viz.width, lline); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                                ctx.fillText('L = ' + ser.rootLimit.toFixed(3), viz.width - 100, lline - 4);
                            }

                            // Compute nth roots
                            var prev = null;
                            for (var n = 1; n <= nMax; n++) {
                                var an = ser.term(n);
                                var root = Math.pow(an, 1 / n);
                                if (!isFinite(root)) continue;
                                var clamped = Math.min(Math.max(root, -0.3), 3);
                                var px = 50 + n * xScale;
                                var py = baseY - clamped * 120;

                                if (prev) {
                                    ctx.strokeStyle = viz.colors.purple + '66'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                var c = root < 1 ? viz.colors.green : viz.colors.red;
                                ctx.fillStyle = c;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, baseY + 4);
                            }

                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('(a_n)^(1/n) for: ' + ser.label, 10, 10);

                            var converges = ser.rootLimit < 1;
                            ctx.fillStyle = converges ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(converges ? 'L < 1: CONVERGES' : 'L >= 1: DIVERGES', 10, 30);
                        }

                        VizEngine.createSlider(controls, 'Series', 0, 2, 0, 1, function(v) {
                            seriesChoice = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'N', 5, 25, 20, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Ratio Test to determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{3^n}{n!}\\) converges.',
                    hint: 'Compute \\(\\frac{a_{n+1}}{a_n} = \\frac{3^{n+1}/(n+1)!}{3^n/n!}\\).',
                    solution: '\\(\\frac{a_{n+1}}{a_n} = \\frac{3^{n+1}}{(n+1)!} \\cdot \\frac{n!}{3^n} = \\frac{3}{n+1} \\to 0\\) as \\(n \\to \\infty\\). Since \\(L = 0 < 1\\), the series converges by the Ratio Test.'
                },
                {
                    question: 'Use the Root Test to determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{n}{2n+1}\\right)^n\\) converges.',
                    hint: 'Compute \\(\\sqrt[n]{a_n}\\).',
                    solution: '\\(\\sqrt[n]{a_n} = \\frac{n}{2n+1} \\to \\frac{1}{2}\\) as \\(n \\to \\infty\\). Since \\(L = 1/2 < 1\\), the series converges by the Root Test.'
                },
                {
                    question: 'Show that the Ratio Test is inconclusive for the \\(p\\)-series \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n^p}\\), for any \\(p > 0\\).',
                    hint: 'Compute \\(\\lim \\frac{a_{n+1}}{a_n}\\) where \\(a_n = 1/n^p\\).',
                    solution: '\\(\\frac{a_{n+1}}{a_n} = \\frac{n^p}{(n+1)^p} = \\left(\\frac{n}{n+1}\\right)^p = \\left(1 - \\frac{1}{n+1}\\right)^p \\to 1^p = 1\\). The limit is \\(1\\) for all \\(p > 0\\), so the Ratio Test is inconclusive. (Yet the series converges for \\(p > 1\\) and diverges for \\(p \\le 1\\).)'
                }
            ]
        },

        // ============================================================
        // Section 5: Alternating Series & Absolute Convergence
        // ============================================================
        {
            id: 'alternating-absolute',
            title: 'Alternating Series & Absolute Convergence',
            content: `
<div class="env-block intuition">
<p><strong>What if the signs alternate?</strong> Every convergence test so far (comparison, integral, ratio, root) assumed non-negative terms. But many natural series, such as \\(1 - \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} + \\cdots\\), flip sign at each step. The cancellation between positive and negative terms can rescue convergence even when the absolute values diverge. This leads to a crucial distinction: <em>absolute</em> versus <em>conditional</em> convergence, one of the subtlest ideas in analysis.</p>
</div>

<h2>Alternating Series & Absolute Convergence</h2>

<p>Up to now, our convergence tests applied only to series with positive terms. But many important series have terms that alternate in sign.</p>

<div class="env-block definition">
<div class="env-label">Definition 13.5 — Alternating Series</div>
<p>An <strong>alternating series</strong> has the form</p>
\\[\\sum_{n=1}^{\\infty} (-1)^{n+1} b_n = b_1 - b_2 + b_3 - b_4 + \\cdots\\]
<p>where \\(b_n > 0\\) for all \\(n\\).</p>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.14 — Alternating Series Test (Leibniz Test)</div>
<p>If \\(\\{b_n\\}\\) is a sequence of positive terms such that:</p>
<ol>
<li>\\(b_{n+1} \\le b_n\\) for all \\(n\\) (the terms are decreasing), and</li>
<li>\\(\\lim_{n \\to \\infty} b_n = 0\\),</li>
</ol>
<p>then the alternating series \\(\\displaystyle\\sum_{n=1}^{\\infty} (-1)^{n+1} b_n\\) converges.</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.9 — Alternating Harmonic Series</div>
<p>The alternating harmonic series \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = 1 - \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} + \\cdots\\) converges by the Alternating Series Test (\\(b_n = 1/n\\) is decreasing and \\(\\to 0\\)).</p>
<p>In fact, \\(\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = \\ln 2 \\approx 0.6931\\).</p>
</div>

<div class="viz-placeholder" data-viz="alternating-series-viz"></div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.15 — Alternating Series Estimation</div>
<p>If \\(S = \\sum (-1)^{n+1} b_n\\) converges by the Alternating Series Test, and \\(S_N\\) is the \\(N\\)-th partial sum, then</p>
\\[|S - S_N| \\le b_{N+1}.\\]
<p>The error is bounded by the first omitted term.</p>
</div>

<div class="env-block definition">
<div class="env-label">Definition 13.6 — Absolute and Conditional Convergence</div>
<p>A series \\(\\sum a_n\\) is:</p>
<ul>
<li><strong>Absolutely convergent</strong> if \\(\\sum |a_n|\\) converges.</li>
<li><strong>Conditionally convergent</strong> if \\(\\sum a_n\\) converges but \\(\\sum |a_n|\\) diverges.</li>
</ul>
</div>

<div class="env-block theorem">
<div class="env-label">Theorem 13.16 — Absolute Convergence Implies Convergence</div>
<p>If \\(\\sum |a_n|\\) converges, then \\(\\sum a_n\\) converges.</p>
</div>

<div class="env-block proof">
<div class="env-label">Proof sketch</div>
<p>Note that \\(0 \\le a_n + |a_n| \\le 2|a_n|\\). If \\(\\sum |a_n|\\) converges, then \\(\\sum 2|a_n|\\) converges, so by comparison \\(\\sum (a_n + |a_n|)\\) converges. Then \\(\\sum a_n = \\sum (a_n + |a_n|) - \\sum |a_n|\\) converges.</p>
</div>

<div class="env-block example">
<div class="env-label">Example 13.10</div>
<p>The alternating harmonic series \\(\\sum (-1)^{n+1}/n\\) converges but \\(\\sum 1/n\\) diverges, so it is <strong>conditionally convergent</strong>.</p>
<p>The series \\(\\sum (-1)^n/n^2\\) has \\(\\sum 1/n^2\\) convergent, so it is <strong>absolutely convergent</strong>.</p>
</div>

<div class="viz-placeholder" data-viz="absolute-vs-conditional-viz"></div>

<div class="env-block remark">
<div class="env-label">Remark — Riemann Rearrangement Theorem</div>
<p>A conditionally convergent series can be rearranged to converge to <em>any</em> prescribed value, or even to diverge. This remarkable theorem shows that the order of summation matters for conditionally convergent series, but not for absolutely convergent ones.</p>
</div>

<div class="env-block intuition">
<p><strong>Looking ahead.</strong> We now have a full toolkit for deciding whether a series of <em>constants</em> converges or diverges. But the most powerful application comes when the terms involve a variable \\(x\\), giving us <em>power series</em>, infinite polynomials of the form \\(\\sum a_n x^n\\). These can represent functions like \\(e^x\\), \\(\\sin x\\), and \\(\\ln(1+x)\\) with extraordinary precision. In Chapter 14 we will see how every convergence test from this chapter finds a natural home in the theory of power series and Taylor series.</p>
</div>
`,
            visualizations: [
                {
                    id: 'alternating-series-viz',
                    title: 'Alternating Series: Partial Sums Oscillate & Converge',
                    description: 'Partial sums of an alternating series bounce above and below the true sum, gradually closing in.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 18, originX: 50, originY: 330
                        });

                        var nMax = 20;
                        var seriesChoice = 0;

                        var seriesList = [
                            {
                                name: 'Alternating harmonic: (-1)^(n+1)/n',
                                term: function(n) { return Math.pow(-1, n + 1) / n; },
                                limit: Math.LN2,
                                label: 'sum (-1)^(n+1)/n = ln 2'
                            },
                            {
                                name: '(-1)^(n+1)/n^2',
                                term: function(n) { return Math.pow(-1, n + 1) / (n * n); },
                                limit: Math.PI * Math.PI / 12,
                                label: 'sum (-1)^(n+1)/n^2 = pi^2/12'
                            },
                            {
                                name: '(-1)^(n+1)/(2n-1) (Leibniz pi/4)',
                                term: function(n) { return Math.pow(-1, n + 1) / (2 * n - 1); },
                                limit: Math.PI / 4,
                                label: 'sum (-1)^(n+1)/(2n-1) = pi/4'
                            }
                        ];

                        function draw() {
                            var ser = seriesList[seriesChoice];
                            viz.clear();
                            var ctx = viz.ctx;

                            // Compute partial sums
                            var partials = [];
                            var s = 0;
                            for (var n = 1; n <= nMax; n++) {
                                s += ser.term(n);
                                partials.push(s);
                            }

                            // Determine y range
                            var allVals = partials.concat([ser.limit]);
                            var yMin = Math.min.apply(null, allVals) - 0.2;
                            var yMax = Math.max.apply(null, allVals) + 0.2;
                            var plotHeight = viz.height - 70;
                            var yScale = plotHeight / (yMax - yMin);
                            var xScale = (viz.width - 80) / Math.max(nMax, 1);

                            function toY(val) { return viz.height - 40 - (val - yMin) * yScale; }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.height - 40); ctx.lineTo(viz.width, viz.height - 40); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, viz.height - 36);
                            }

                            // Limit line
                            var limY = toY(ser.limit);
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(50, limY); ctx.lineTo(viz.width, limY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                            ctx.fillText('S = ' + ser.limit.toFixed(4), viz.width - 10, limY - 4);

                            // Error bound band
                            if (nMax > 0) {
                                var lastBound = Math.abs(ser.term(nMax + 1));
                                var bandTop = toY(ser.limit + lastBound);
                                var bandBot = toY(ser.limit - lastBound);
                                ctx.fillStyle = viz.colors.green + '15';
                                ctx.fillRect(50, bandTop, viz.width - 50, bandBot - bandTop);
                            }

                            // Plot partial sums with zigzag
                            var prev = null;
                            for (var i = 0; i < partials.length; i++) {
                                var px = 50 + (i + 1) * xScale;
                                var py = toY(partials[i]);

                                if (prev) {
                                    ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(px, py); ctx.stroke();
                                }

                                var c = (i % 2 === 0) ? viz.colors.teal : viz.colors.purple;
                                ctx.fillStyle = c;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                prev = [px, py];
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText(ser.label, 10, 10);

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('S_' + nMax + ' = ' + partials[partials.length - 1].toFixed(6), 10, 30);

                            if (nMax > 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Error <= |a_{' + (nMax + 1) + '}| = ' + Math.abs(ser.term(nMax + 1)).toFixed(6), 10, 48);
                            }
                        }

                        VizEngine.createSlider(controls, 'N (terms)', 1, 30, 20, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Series', 0, 2, 0, 1, function(v) {
                            seriesChoice = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'absolute-vs-conditional-viz',
                    title: 'Absolute vs Conditional Convergence',
                    description: 'Compare partial sums of a series and the absolute-value series side by side. The alternating harmonic series converges conditionally (its absolute version, the harmonic series, diverges).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            width: 560, height: 380,
                            scale: 18, originX: 50, originY: 330
                        });

                        var nMax = 25;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Alternating harmonic: (-1)^(n+1)/n
                            // Absolute version: 1/n (harmonic)
                            var partialsAlt = [];
                            var partialsAbs = [];
                            var sAlt = 0, sAbs = 0;
                            for (var n = 1; n <= nMax; n++) {
                                sAlt += Math.pow(-1, n + 1) / n;
                                sAbs += 1 / n;
                                partialsAlt.push(sAlt);
                                partialsAbs.push(sAbs);
                            }

                            var yMax = Math.max(sAbs * 1.1, 2);
                            var yMin = Math.min.apply(null, partialsAlt) - 0.3;
                            var plotHeight = viz.height - 60;
                            var yScale = plotHeight / (yMax - yMin);
                            var xScale = (viz.width - 80) / Math.max(nMax, 1);

                            function toY(val) { return viz.height - 40 - (val - yMin) * yScale; }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, toY(0)); ctx.lineTo(viz.width, toY(0)); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lx = 5; lx <= nMax; lx += 5) {
                                ctx.fillText(lx, 50 + lx * xScale, toY(0) + 4);
                            }

                            // ln 2 line
                            var ln2Y = toY(Math.LN2);
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(50, ln2Y); ctx.lineTo(viz.width, ln2Y); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                            ctx.fillText('ln 2', viz.width - 10, ln2Y - 3);

                            // Plot absolute version (harmonic - red, diverges)
                            var prevAbs = null;
                            for (var i = 0; i < partialsAbs.length; i++) {
                                var px = 50 + (i + 1) * xScale;
                                var py = toY(partialsAbs[i]);

                                if (prevAbs) {
                                    ctx.strokeStyle = viz.colors.red + '55'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prevAbs[0], prevAbs[1]); ctx.lineTo(px, py); ctx.stroke();
                                }
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
                                prevAbs = [px, py];
                            }

                            // Plot alternating version (blue, converges)
                            var prevAlt = null;
                            for (var j = 0; j < partialsAlt.length; j++) {
                                var px2 = 50 + (j + 1) * xScale;
                                var py2 = toY(partialsAlt[j]);

                                if (prevAlt) {
                                    ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(prevAlt[0], prevAlt[1]); ctx.lineTo(px2, py2); ctx.stroke();
                                }
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px2, py2, 4, 0, Math.PI * 2); ctx.fill();
                                prevAlt = [px2, py2];
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('sum (-1)^(n+1)/n: CONVERGES to ln 2', 10, 10);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('sum 1/n (absolute): DIVERGES', 10, 28);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Conditional convergence', 10, 46);
                        }

                        VizEngine.createSlider(controls, 'N', 5, 40, 25, 1, function(v) {
                            nMax = Math.round(v);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Does the series \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{\\sqrt{n}}\\) converge? Is it absolutely or conditionally convergent?',
                    hint: 'Check the Alternating Series Test conditions, then check whether \\(\\sum 1/\\sqrt{n}\\) converges.',
                    solution: '<p><strong>Convergence:</strong> \\(b_n = 1/\\sqrt{n}\\) is decreasing and \\(\\to 0\\). By the Alternating Series Test, the series converges.</p><p><strong>Absolute convergence?</strong> \\(\\sum 1/\\sqrt{n} = \\sum 1/n^{1/2}\\) is a \\(p\\)-series with \\(p = 1/2 < 1\\), so it diverges.</p><p>The series is <strong>conditionally convergent</strong>.</p>'
                },
                {
                    question: 'Determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{(-1)^n \\cdot n}{n^2 + 1}\\) converges.',
                    hint: 'Check that \\(b_n = n/(n^2+1)\\) is eventually decreasing and \\(\\to 0\\).',
                    solution: '<p>Let \\(b_n = \\frac{n}{n^2+1}\\). Then \\(\\lim b_n = 0\\).</p><p>To check decreasing: let \\(f(x) = x/(x^2+1)\\). Then \\(f\'(x) = (1-x^2)/(x^2+1)^2 < 0\\) for \\(x > 1\\). So \\(b_n\\) is decreasing for \\(n \\ge 2\\).</p><p>By the Alternating Series Test, \\(\\sum (-1)^n \\cdot n/(n^2+1)\\) converges.</p><p>(It is conditionally convergent since \\(\\sum n/(n^2+1)\\) diverges by limit comparison with \\(1/n\\).)</p>'
                },
                {
                    question: 'Determine whether \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{\\cos(n\\pi)}{n^3}\\) converges absolutely, conditionally, or diverges.',
                    hint: 'Note that \\(\\cos(n\\pi) = (-1)^n\\).',
                    solution: 'Since \\(\\cos(n\\pi) = (-1)^n\\), the series is \\(\\sum (-1)^n/n^3\\). The absolute-value series is \\(\\sum 1/n^3\\), which is a \\(p\\)-series with \\(p = 3 > 1\\), hence convergent. Therefore the original series converges <strong>absolutely</strong>.'
                }
            ]
        }
    ]
});
