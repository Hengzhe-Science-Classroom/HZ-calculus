// Chapter 14 – Power Series & Taylor Series
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
id: 'ch14',
number: 14,
title: 'Power Series & Taylor Series',
subtitle: 'Representing functions as infinite polynomials: power series, Taylor expansions, and their applications',
sections: [
// ========== Section 1: Power Series & Radius of Convergence ==========
{
    id: 'power-series-convergence',
    title: 'Power Series & Radius of Convergence',
    content: `
<h2>Power Series & Radius of Convergence</h2>

<div class="env-block definition">
<div class="env-title">Definition 14.1 — Power Series</div>
<p>A <strong>power series centered at \\(c\\)</strong> is a series of the form</p>
\\[
\\sum_{n=0}^{\\infty} a_n (x - c)^n = a_0 + a_1(x-c) + a_2(x-c)^2 + \\cdots
\\]
<p>where \\(a_0, a_1, a_2, \\ldots\\) are constants called the <strong>coefficients</strong> and \\(c\\) is the <strong>center</strong>.</p>
</div>

<p>A power series is a function of \\(x\\). For each value of \\(x\\), we get a numerical series that either converges or diverges. The fundamental question is: <em>for which values of \\(x\\) does the series converge?</em></p>

<div class="env-block theorem">
<div class="env-title">Theorem 14.1 — Convergence of Power Series</div>
<p>For a given power series \\(\\sum a_n(x-c)^n\\), exactly one of the following is true:</p>
<ol>
<li>The series converges only at \\(x = c\\).</li>
<li>The series converges for all \\(x\\).</li>
<li>There exists a number \\(R > 0\\) such that the series converges absolutely for \\(|x - c| < R\\) and diverges for \\(|x - c| > R\\).</li>
</ol>
</div>

<div class="env-block definition">
<div class="env-title">Definition 14.2 — Radius and Interval of Convergence</div>
<p>The number \\(R\\) in Theorem 14.1 is called the <strong>radius of convergence</strong>. We set \\(R = 0\\) in case (1) and \\(R = \\infty\\) in case (2). The <strong>interval of convergence</strong> is the set of all \\(x\\) for which the series converges, which always includes the open interval \\((c - R, c + R)\\) but may or may not include the endpoints.</p>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 14.2 — Ratio Test for Radius of Convergence</div>
<p>If the limit \\(L = \\displaystyle\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|\\) exists (or equals \\(\\infty\\)), then</p>
\\[
R = \\frac{1}{L}
\\]
<p>with the convention that \\(R = \\infty\\) when \\(L = 0\\) and \\(R = 0\\) when \\(L = \\infty\\).</p>
</div>

<div class="env-block example">
<div class="env-title">Example 14.1</div>
<p>Find the radius and interval of convergence of \\(\\displaystyle\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}\\).</p>
<p><strong>Solution.</strong> Here \\(a_n = 1/n!\\), so</p>
\\[
L = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{n!}{(n+1)!} = \\lim_{n \\to \\infty} \\frac{1}{n+1} = 0
\\]
<p>Therefore \\(R = \\infty\\). The series converges for all \\(x \\in (-\\infty, \\infty)\\). (This is the series for \\(e^x\\).)</p>
</div>

<div class="env-block example">
<div class="env-title">Example 14.2</div>
<p>Find the radius and interval of convergence of \\(\\displaystyle\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n}\\).</p>
<p><strong>Solution.</strong> We have \\(a_n = (-1)^{n+1}/n\\), so</p>
\\[
L = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{n}{n+1} = 1 \\implies R = 1
\\]
<p>The series converges absolutely on \\((-1, 1)\\). At \\(x = 1\\), we get the alternating harmonic series \\(\\sum (-1)^{n+1}/n\\), which converges. At \\(x = -1\\), we get \\(-\\sum 1/n\\), which diverges. So the interval of convergence is \\((-1, 1]\\). (This series represents \\(\\ln(1+x)\\).)</p>
</div>

<div class="viz-container" id="viz-power-series-convergence" data-viz="powerSeriesConvergence"></div>
    `,
    visualizations: [{
        id: 'powerSeriesConvergence',
        title: 'Power Series Convergence Region',
        setup(container) {
            const viz = new VizEngine(container, { scale: 60, originX: 280, originY: 200 });
            let R = 2;
            let center = 0;
            let nTerms = 8;

            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            VizEngine.createSlider(controls, 'Radius R', 0.5, 5, R, 0.5, v => { R = v; draw(); });
            VizEngine.createSlider(controls, 'Center c', -2, 2, center, 0.5, v => { center = v; draw(); });
            VizEngine.createSlider(controls, 'Terms n', 1, 20, nTerms, 1, v => { nTerms = v; draw(); });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Shade convergence interval
                const xL = center - R;
                const xR = center + R;
                viz.drawVerticalBand(center, R, '#58a6ff18');

                // Draw boundary lines
                viz.drawSegment(xL, -5, xL, 5, viz.colors.red, 1.5, true);
                viz.drawSegment(xR, -5, xR, 5, viz.colors.red, 1.5, true);

                // Draw center marker
                viz.drawPoint(center, 0, viz.colors.yellow, 'c = ' + center.toFixed(1), 6);

                // Partial sums: use geometric-like series sum a_n(x-c)^n with a_n = 1/n!
                const partialSum = (x) => {
                    let s = 0;
                    for (let k = 0; k < nTerms; k++) {
                        s += Math.pow(x - center, k) / VizEngine.factorial(k);
                    }
                    return s;
                };

                // Draw the actual function e^(x-c) if R is infinite (for reference)
                const xMin = -4;
                const xMax = 8;
                viz.drawFunction(x => Math.exp(x - center), xMin, xMax, viz.colors.white + '44', 1.5);
                viz.drawFunction(partialSum, xMin, xMax, viz.colors.blue, 2.5);

                // Labels
                viz.screenText('Convergence interval: |x - c| < R', viz.width / 2, 20, viz.colors.white, 13);
                viz.screenText('White: e^(x-c)   Blue: partial sum (n = ' + nTerms + ')', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                viz.screenText('R = ' + R.toFixed(1), viz.width - 60, 20, viz.colors.red, 12);
            }

            draw();
            return viz;
        }
    }],
    exercises: [
        {
            id: 'ex-14-1-1',
            type: 'multiple-choice',
            question: 'What is the radius of convergence of the power series \\(\\sum_{n=0}^{\\infty} n! \\, x^n\\)?',
            options: ['\\(R = 0\\)', '\\(R = 1\\)', '\\(R = \\infty\\)', '\\(R = e\\)'],
            answer: 0,
            explanation: 'Using the ratio test: \\(L = \\lim |a_{n+1}/a_n| = \\lim (n+1) = \\infty\\), so \\(R = 1/L = 0\\). The series converges only at \\(x = 0\\).'
        },
        {
            id: 'ex-14-1-2',
            type: 'multiple-choice',
            question: 'The power series \\(\\sum_{n=0}^{\\infty} \\frac{x^n}{2^n}\\) has radius of convergence:',
            options: ['\\(R = 1\\)', '\\(R = 2\\)', '\\(R = 1/2\\)', '\\(R = \\infty\\)'],
            answer: 1,
            explanation: 'Here \\(a_n = 1/2^n\\), so \\(L = \\lim |a_{n+1}/a_n| = \\lim 2^n/2^{n+1} = 1/2\\), giving \\(R = 1/L = 2\\).'
        },
        {
            id: 'ex-14-1-3',
            type: 'short-answer',
            question: 'Find the radius of convergence of \\(\\sum_{n=1}^{\\infty} \\frac{n^2}{3^n} (x - 1)^n\\). Enter a number.',
            answer: '3',
            explanation: '\\(a_n = n^2/3^n\\). Using the ratio test: \\(L = \\lim \\frac{(n+1)^2/3^{n+1}}{n^2/3^n} = \\lim \\frac{(n+1)^2}{3n^2} = 1/3\\), so \\(R = 3\\).'
        }
    ]
},

// ========== Section 2: Taylor & Maclaurin Series ==========
{
    id: 'taylor-maclaurin-series',
    title: 'Taylor & Maclaurin Series',
    content: `
<h2>Taylor & Maclaurin Series</h2>

<p>If a function \\(f\\) can be represented by a power series at \\(a\\), what must the coefficients be? This question leads to one of the most beautiful results in calculus.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 14.3 — Coefficients of a Power Series Representation</div>
<p>If \\(f(x) = \\sum_{n=0}^{\\infty} a_n (x - a)^n\\) for \\(|x - a| < R\\) with \\(R > 0\\), then \\(f\\) is infinitely differentiable on \\((a - R, a + R)\\) and</p>
\\[
a_n = \\frac{f^{(n)}(a)}{n!}
\\]
</div>

<p>This result follows by repeatedly differentiating the power series term by term and evaluating at \\(x = a\\). Each differentiation kills the constant term and brings down a factor, and evaluating at \\(a\\) zeros out all terms except one.</p>

<div class="env-block definition">
<div class="env-title">Definition 14.3 — Taylor Series</div>
<p>If \\(f\\) has derivatives of all orders at \\(a\\), then the <strong>Taylor series of \\(f\\) at \\(a\\)</strong> is</p>
\\[
\\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\cdots
\\]
<p>When \\(a = 0\\), this is called the <strong>Maclaurin series</strong>:</p>
\\[
\\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\cdots
\\]
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<p>Having a Taylor series does not automatically mean the series converges to \\(f(x)\\). The Taylor series of \\(f\\) converges to \\(f\\) if and only if \\(\\lim_{n\\to\\infty} R_n(x) = 0\\), where \\(R_n\\) is the remainder (see Section 3).</p>
</div>

<div class="env-block example">
<div class="env-title">Example 14.3 — Maclaurin Series of \\(e^x\\)</div>
<p>Since \\(f(x) = e^x\\) satisfies \\(f^{(n)}(x) = e^x\\) for all \\(n\\), we have \\(f^{(n)}(0) = 1\\). Therefore:</p>
\\[
e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots \\quad \\text{for all } x
\\]
</div>

<div class="env-block example">
<div class="env-title">Example 14.4 — Maclaurin Series of \\(\\sin x\\)</div>
<p>The derivatives of \\(\\sin x\\) cycle with period 4: \\(\\sin x, \\cos x, -\\sin x, -\\cos x, \\ldots\\). At \\(x = 0\\): \\(0, 1, 0, -1, 0, 1, \\ldots\\). Therefore:</p>
\\[
\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1)!} x^{2n+1} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\cdots \\quad \\text{for all } x
\\]
</div>

<div class="viz-container" id="viz-taylor-derivation" data-viz="taylorDerivation"></div>
    `,
    visualizations: [{
        id: 'taylorDerivation',
        title: 'Building the Taylor Series Term by Term',
        setup(container) {
            const viz = new VizEngine(container, { scale: 40, originX: 280, originY: 220 });
            let degree = 1;
            let funcChoice = 0; // 0 = e^x, 1 = sin x, 2 = cos x

            const funcs = [
                { name: 'e^x', f: Math.exp, coeffs: n => 1 / VizEngine.factorial(n) },
                { name: 'sin x', f: Math.sin, coeffs: n => n % 2 === 0 ? 0 : Math.pow(-1, (n - 1) / 2) / VizEngine.factorial(n) },
                { name: 'cos x', f: Math.cos, coeffs: n => n % 2 === 1 ? 0 : Math.pow(-1, n / 2) / VizEngine.factorial(n) }
            ];

            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            VizEngine.createSlider(controls, 'Degree n', 0, 15, degree, 1, v => { degree = v; draw(); });

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
            controls.appendChild(btnRow);
            ['e^x', 'sin x', 'cos x'].forEach((label, i) => {
                VizEngine.createButton(btnRow, label, () => { funcChoice = i; draw(); });
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const chosen = funcs[funcChoice];
                const xMin = -6;
                const xMax = 7;

                // Draw original function
                viz.drawFunction(chosen.f, xMin, xMax, viz.colors.white, 2);

                // Build Taylor coefficients up to degree
                const coeffs = [];
                for (let k = 0; k <= degree; k++) {
                    coeffs.push(chosen.coeffs(k));
                }

                // Draw Taylor polynomial
                viz.drawTaylorPoly(coeffs, 0, viz.colors.blue, xMin, xMax, 2.5);

                // Labels
                viz.screenText('White: ' + chosen.name + '   Blue: T_' + degree + '(x)', viz.width / 2, 20, viz.colors.white, 13);

                // Show first few nonzero terms
                let termStr = 'T_' + degree + '(x) = ';
                const termParts = [];
                for (let k = 0; k <= Math.min(degree, 6); k++) {
                    const c = chosen.coeffs(k);
                    if (Math.abs(c) > 1e-15) {
                        let part = '';
                        if (Math.abs(c - 1) < 1e-10 && k > 0) part = '';
                        else if (Math.abs(c + 1) < 1e-10 && k > 0) part = '-';
                        else part = c.toFixed(k > 4 ? 5 : 3);
                        if (k === 0) part = c.toFixed(1);
                        else part += 'x' + (k > 1 ? '^' + k : '');
                        termParts.push(part);
                    }
                }
                if (termParts.length > 4) termStr += termParts.slice(0, 4).join(' + ') + ' + ...';
                else termStr += termParts.join(' + ');
                viz.screenText(termStr, viz.width / 2, viz.height - 15, viz.colors.text, 10);
            }

            draw();
            return viz;
        }
    }],
    exercises: [
        {
            id: 'ex-14-2-1',
            type: 'multiple-choice',
            question: 'What is the coefficient of \\(x^3\\) in the Maclaurin series of \\(e^x\\)?',
            options: ['\\(1/2\\)', '\\(1/3\\)', '\\(1/6\\)', '\\(1/24\\)'],
            answer: 2,
            explanation: 'The coefficient of \\(x^n\\) in the Maclaurin series of \\(e^x\\) is \\(1/n!\\). For \\(n = 3\\): \\(1/3! = 1/6\\).'
        },
        {
            id: 'ex-14-2-2',
            type: 'multiple-choice',
            question: 'The Maclaurin series of \\(\\sin x\\) contains only:',
            options: ['even powers of \\(x\\)', 'odd powers of \\(x\\)', 'all powers of \\(x\\)', 'powers of \\(x^3\\)'],
            answer: 1,
            explanation: 'Since \\(\\sin x\\) is an odd function, its Maclaurin series contains only odd powers: \\(x - x^3/3! + x^5/5! - \\cdots\\).'
        },
        {
            id: 'ex-14-2-3',
            type: 'multiple-choice',
            question: 'The Taylor series of \\(f(x)\\) centered at \\(a = 2\\) has general term \\(\\frac{f^{(n)}(2)}{n!}(x-2)^n\\). If \\(f(2) = 3\\), \\(f\'(2) = -1\\), and \\(f\'\'(2) = 4\\), what is the second-degree Taylor polynomial \\(T_2(x)\\)?',
            options: [
                '\\(3 - (x-2) + 2(x-2)^2\\)',
                '\\(3 - (x-2) + 4(x-2)^2\\)',
                '\\(3 + (x-2) + 2(x-2)^2\\)',
                '\\(3 - (x-2) + (x-2)^2\\)'
            ],
            answer: 0,
            explanation: '\\(T_2(x) = f(2) + f\'(2)(x-2) + \\frac{f\'\'(2)}{2!}(x-2)^2 = 3 - (x-2) + \\frac{4}{2}(x-2)^2 = 3 - (x-2) + 2(x-2)^2\\).'
        },
        {
            id: 'ex-14-2-4',
            type: 'short-answer',
            question: 'What is \\(f^{(5)}(0)\\) if the Maclaurin series of \\(f\\) begins \\(f(x) = 2 + x - 3x^2 + 0 \\cdot x^3 + x^4 - 2x^5 + \\cdots\\)? Enter an integer.',
            answer: '-240',
            explanation: 'The coefficient of \\(x^5\\) is \\(f^{(5)}(0)/5! = -2\\), so \\(f^{(5)}(0) = -2 \\cdot 5! = -2 \\cdot 120 = -240\\).'
        }
    ]
},

// ========== Section 3: Taylor Polynomials & Remainder ==========
{
    id: 'taylor-remainder',
    title: 'Taylor Polynomials & Remainder',
    content: `
<h2>Taylor Polynomials & Remainder</h2>

<div class="env-block definition">
<div class="env-title">Definition 14.4 — Taylor Polynomial of Degree \\(n\\)</div>
<p>The <strong>\\(n\\)-th degree Taylor polynomial</strong> of \\(f\\) at \\(a\\) is the partial sum</p>
\\[
T_n(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(a)}{k!}(x-a)^k = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x-a)^n
\\]
<p>The <strong>remainder</strong> (or <strong>error</strong>) is \\(R_n(x) = f(x) - T_n(x)\\).</p>
</div>

<p>The Taylor polynomial \\(T_n\\) is the unique polynomial of degree at most \\(n\\) that matches \\(f\\) and its first \\(n\\) derivatives at \\(x = a\\). It gives the best polynomial approximation near \\(a\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem 14.4 — Taylor's Theorem (Lagrange Remainder)</div>
<p>If \\(f^{(n+1)}\\) is continuous on an interval \\(I\\) containing \\(a\\), then for each \\(x \\in I\\) there exists a \\(\\xi\\) between \\(a\\) and \\(x\\) such that</p>
\\[
R_n(x) = f(x) - T_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}
\\]
</div>

<div class="env-block corollary">
<div class="env-title">Corollary — Error Bound</div>
<p>If \\(|f^{(n+1)}(t)| \\le M\\) for all \\(t\\) between \\(a\\) and \\(x\\), then</p>
\\[
|R_n(x)| \\le \\frac{M}{(n+1)!} |x - a|^{n+1}
\\]
</div>

<p>This bound is extremely useful for determining how many terms are needed to achieve a desired accuracy.</p>

<div class="env-block example">
<div class="env-title">Example 14.5 — Error in Approximating \\(e\\)</div>
<p>Use the Taylor polynomial to approximate \\(e = e^1\\) with error less than \\(10^{-6}\\).</p>
<p><strong>Solution.</strong> For \\(f(x) = e^x\\) at \\(a = 0\\), \\(x = 1\\): \\(f^{(n+1)}(\\xi) = e^\\xi \\le e^1 < 3\\). We need</p>
\\[
\\frac{3}{(n+1)!} < 10^{-6} \\implies (n+1)! > 3 \\times 10^6
\\]
<p>Since \\(10! = 3{,}628{,}800 > 3{,}000{,}000\\), we need \\(n + 1 \\ge 10\\), i.e., \\(n \\ge 9\\). The 9th-degree Taylor polynomial gives at least 6 correct decimal places.</p>
</div>

<div class="env-block example">
<div class="env-title">Example 14.6 — Error in Approximating \\(\\sin(0.1)\\)</div>
<p>Approximate \\(\\sin(0.1)\\) using \\(T_3(x) = x - x^3/6\\) and bound the error.</p>
<p><strong>Solution.</strong> \\(T_3(0.1) = 0.1 - 0.001/6 = 0.1 - 0.000\\overline{16} \\approx 0.099833\\).</p>
<p>For the error: \\(f^{(4)}(x) = \\sin x\\), so \\(|f^{(4)}(\\xi)| \\le 1\\). Thus:</p>
\\[
|R_3(0.1)| \\le \\frac{1}{4!}(0.1)^4 = \\frac{10^{-4}}{24} \\approx 4.17 \\times 10^{-6}
\\]
<p>The approximation is accurate to about 5 decimal places.</p>
</div>

<div class="viz-container" id="viz-taylor-remainder" data-viz="taylorRemainder"></div>
    `,
    visualizations: [{
        id: 'taylorRemainder',
        title: 'Taylor Polynomial Approximation & Error',
        setup(container) {
            const viz = new VizEngine(container, { scale: 40, originX: 280, originY: 220 });
            let degree = 1;
            let xVal = 1;

            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            VizEngine.createSlider(controls, 'Degree n', 0, 10, degree, 1, v => { degree = v; draw(); });
            VizEngine.createSlider(controls, 'x value', -3, 3, xVal, 0.1, v => { xVal = v; draw(); });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const xMin = -5;
                const xMax = 6;

                // Target function: e^x
                viz.drawFunction(Math.exp, xMin, xMax, viz.colors.white, 2);

                // Taylor polynomial coefficients for e^x centered at 0
                const coeffs = [];
                for (let k = 0; k <= degree; k++) {
                    coeffs.push(1 / VizEngine.factorial(k));
                }
                viz.drawTaylorPoly(coeffs, 0, viz.colors.blue, xMin, xMax, 2.5);

                // Show the error at xVal
                const fVal = Math.exp(xVal);
                let tVal = 0;
                for (let k = 0; k <= degree; k++) {
                    tVal += Math.pow(xVal, k) / VizEngine.factorial(k);
                }
                const error = Math.abs(fVal - tVal);

                // Draw error segment
                if (isFinite(fVal) && isFinite(tVal) && Math.abs(fVal) < 10 && Math.abs(tVal) < 10) {
                    viz.drawSegment(xVal, fVal, xVal, tVal, viz.colors.red, 2);
                    viz.drawPoint(xVal, fVal, viz.colors.white, null, 4);
                    viz.drawPoint(xVal, tVal, viz.colors.blue, null, 4);
                }

                // Shade error region between curves
                viz.shadeBetween(
                    Math.exp,
                    x => { let s = 0; for (let k = 0; k <= degree; k++) s += Math.pow(x, k) / VizEngine.factorial(k); return s; },
                    Math.max(xMin, -3), Math.min(xMax, 4),
                    viz.colors.red + '18'
                );

                viz.screenText('White: e^x   Blue: T_' + degree + '(x)', viz.width / 2, 20, viz.colors.white, 13);
                viz.screenText('Error at x = ' + xVal.toFixed(1) + ':  |R_' + degree + '| = ' + error.toExponential(3), viz.width / 2, viz.height - 15, viz.colors.red, 12);
            }

            draw();
            return viz;
        }
    }],
    exercises: [
        {
            id: 'ex-14-3-1',
            type: 'multiple-choice',
            question: 'Taylor\'s theorem with Lagrange remainder says \\(R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}\\). For \\(f(x) = \\cos x\\), what is the maximum value of \\(|f^{(n+1)}(\\xi)|\\) for any \\(\\xi\\)?',
            options: ['0', '1', '\\(\\xi\\)', '\\(e^\\xi\\)'],
            answer: 1,
            explanation: 'All derivatives of \\(\\cos x\\) are \\(\\pm \\sin x\\) or \\(\\pm \\cos x\\), which are bounded by 1 in absolute value.'
        },
        {
            id: 'ex-14-3-2',
            type: 'multiple-choice',
            question: 'To approximate \\(e^{0.5}\\) using the Maclaurin polynomial \\(T_n\\), the error bound is \\(|R_n(0.5)| \\le \\frac{M \\cdot (0.5)^{n+1}}{(n+1)!}\\) where \\(M = e^{0.5} < 2\\). What is the smallest \\(n\\) that guarantees error < 0.001?',
            options: ['\\(n = 3\\)', '\\(n = 4\\)', '\\(n = 5\\)', '\\(n = 6\\)'],
            answer: 1,
            explanation: 'For \\(n=4\\): \\(\\frac{2 \\cdot (0.5)^5}{5!} = \\frac{2/32}{120} = \\frac{1}{1920} \\approx 0.00052 < 0.001\\). For \\(n=3\\): \\(\\frac{2 \\cdot (0.5)^4}{4!} = \\frac{2/16}{24} = \\frac{1}{192} \\approx 0.0052\\), which is too large.'
        },
        {
            id: 'ex-14-3-3',
            type: 'short-answer',
            question: 'The second-degree Taylor polynomial of \\(f(x) = \\sqrt{x}\\) at \\(a = 4\\) is \\(T_2(x) = 2 + \\frac{1}{4}(x-4) - \\frac{1}{64}(x-4)^2\\). Compute \\(T_2(4.1)\\) to four decimal places.',
            answer: '2.0248',
            explanation: '\\(T_2(4.1) = 2 + \\frac{0.1}{4} - \\frac{(0.1)^2}{64} = 2 + 0.025 - 0.00015625 = 2.02484375 \\approx 2.0248\\). (The actual value \\(\\sqrt{4.1} \\approx 2.02485\\).)'
        }
    ]
},

// ========== Section 4: Common Taylor Series ==========
{
    id: 'common-taylor-series',
    title: 'Common Taylor Series',
    content: `
<h2>Common Taylor Series</h2>

<p>Several functions have Taylor series that appear throughout mathematics and applications. These should be memorized.</p>

<div class="env-block theorem">
<div class="env-title">Important Maclaurin Series</div>
<p><strong>1. Exponential:</strong></p>
\\[
e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots \\qquad R = \\infty
\\]

<p><strong>2. Sine:</strong></p>
\\[
\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots \\qquad R = \\infty
\\]

<p><strong>3. Cosine:</strong></p>
\\[
\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots \\qquad R = \\infty
\\]

<p><strong>4. Geometric:</strong></p>
\\[
\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + x^3 + \\cdots \\qquad R = 1
\\]

<p><strong>5. Logarithm:</strong></p>
\\[
\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots \\qquad R = 1
\\]

<p><strong>6. Arctangent:</strong></p>
\\[
\\arctan x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{2n+1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots \\qquad R = 1
\\]

<p><strong>7. Binomial Series:</strong></p>
\\[
(1+x)^k = \\sum_{n=0}^{\\infty} \\binom{k}{n} x^n = 1 + kx + \\frac{k(k-1)}{2!}x^2 + \\cdots \\qquad R = 1
\\]
<p>where \\(\\binom{k}{n} = \\frac{k(k-1)\\cdots(k-n+1)}{n!}\\) for any real \\(k\\).</p>
</div>

<div class="env-block remark">
<div class="env-title">Remark — Deriving New Series from Known Ones</div>
<p>We can obtain new Taylor series by:</p>
<ul>
<li><strong>Substitution:</strong> Replace \\(x\\) by \\(-x\\), \\(x^2\\), etc. E.g., \\(e^{-x^2} = \\sum \\frac{(-1)^n x^{2n}}{n!}\\).</li>
<li><strong>Differentiation:</strong> Differentiate term by term. E.g., \\(\\frac{d}{dx}\\ln(1+x) = \\frac{1}{1+x} = \\sum (-1)^n x^n\\).</li>
<li><strong>Integration:</strong> Integrate term by term. E.g., \\(\\int_0^x \\frac{1}{1+t^2}\\,dt = \\arctan x\\).</li>
<li><strong>Multiplication:</strong> Multiply two known series.</li>
</ul>
</div>

<div class="env-block example">
<div class="env-title">Example 14.7 — Series for \\(e^{-x^2}\\)</div>
<p>Replace \\(x\\) by \\(-x^2\\) in the series for \\(e^x\\):</p>
\\[
e^{-x^2} = \\sum_{n=0}^{\\infty} \\frac{(-x^2)^n}{n!} = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{n!} = 1 - x^2 + \\frac{x^4}{2!} - \\frac{x^6}{3!} + \\cdots
\\]
</div>

<div class="viz-container" id="viz-common-taylor" data-viz="commonTaylor"></div>
    `,
    visualizations: [{
        id: 'commonTaylor',
        title: 'Common Taylor Series Comparison',
        setup(container) {
            const viz = new VizEngine(container, { scale: 40, originX: 280, originY: 220 });
            let degree = 5;
            let funcIdx = 0;

            const funcList = [
                {
                    name: 'e^x',
                    f: Math.exp,
                    coeffs: n => 1 / VizEngine.factorial(n),
                    xRange: [-5, 5]
                },
                {
                    name: 'sin x',
                    f: Math.sin,
                    coeffs: n => n % 2 === 0 ? 0 : Math.pow(-1, (n - 1) / 2) / VizEngine.factorial(n),
                    xRange: [-7, 7]
                },
                {
                    name: 'cos x',
                    f: Math.cos,
                    coeffs: n => n % 2 === 1 ? 0 : Math.pow(-1, n / 2) / VizEngine.factorial(n),
                    xRange: [-7, 7]
                },
                {
                    name: '1/(1-x)',
                    f: x => 1 / (1 - x),
                    coeffs: n => 1,
                    xRange: [-2, 0.95]
                },
                {
                    name: 'ln(1+x)',
                    f: x => Math.log(1 + x),
                    coeffs: n => n === 0 ? 0 : Math.pow(-1, n + 1) / n,
                    xRange: [-0.95, 2]
                },
                {
                    name: 'arctan x',
                    f: Math.atan,
                    coeffs: n => n % 2 === 0 ? 0 : Math.pow(-1, (n - 1) / 2) / n,
                    xRange: [-3, 3]
                }
            ];

            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            VizEngine.createSlider(controls, 'Degree n', 1, 20, degree, 1, v => { degree = v; draw(); });

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;';
            controls.appendChild(btnRow);
            funcList.forEach((item, i) => {
                VizEngine.createButton(btnRow, item.name, () => { funcIdx = i; draw(); });
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const chosen = funcList[funcIdx];
                const xMin = chosen.xRange[0];
                const xMax = chosen.xRange[1];

                // Original function
                viz.drawFunction(chosen.f, xMin, xMax, viz.colors.white, 2);

                // Taylor polynomial
                const coeffs = [];
                for (let k = 0; k <= degree; k++) {
                    coeffs.push(chosen.coeffs(k));
                }
                viz.drawTaylorPoly(coeffs, 0, viz.colors.teal, xMin - 1, xMax + 1, 2.5);

                // For functions with finite R, draw R boundaries
                if (chosen.name === '1/(1-x)' || chosen.name === 'ln(1+x)' || chosen.name === 'arctan x') {
                    viz.drawSegment(-1, -6, -1, 6, viz.colors.red, 1, true);
                    viz.drawSegment(1, -6, 1, 6, viz.colors.red, 1, true);
                    viz.screenText('R = 1', viz.width - 50, viz.height - 35, viz.colors.red, 11);
                } else {
                    viz.screenText('R = infinity', viz.width - 60, viz.height - 35, viz.colors.green, 11);
                }

                viz.screenText('White: ' + chosen.name + '   Teal: T_' + degree + '(x)', viz.width / 2, 20, viz.colors.white, 13);
            }

            draw();
            return viz;
        }
    }],
    exercises: [
        {
            id: 'ex-14-4-1',
            type: 'multiple-choice',
            question: 'The Maclaurin series for \\(\\cos x\\) is obtained from the series for \\(\\sin x\\) by:',
            options: [
                'Replacing \\(x\\) by \\(x^2\\)',
                'Differentiating term by term',
                'Integrating term by term',
                'Multiplying by \\(x\\)'
            ],
            answer: 1,
            explanation: 'Since \\(\\frac{d}{dx}\\sin x = \\cos x\\), differentiating the series for \\(\\sin x\\) term by term gives the series for \\(\\cos x\\): \\(\\frac{d}{dx}\\left(x - \\frac{x^3}{3!} + \\cdots\\right) = 1 - \\frac{x^2}{2!} + \\cdots\\).'
        },
        {
            id: 'ex-14-4-2',
            type: 'multiple-choice',
            question: 'What is the Maclaurin series for \\(\\frac{1}{1+x}\\)?',
            options: [
                '\\(\\sum_{n=0}^{\\infty} x^n\\)',
                '\\(\\sum_{n=0}^{\\infty} (-1)^n x^n\\)',
                '\\(\\sum_{n=0}^{\\infty} (-1)^n x^{2n}\\)',
                '\\(\\sum_{n=1}^{\\infty} x^n\\)'
            ],
            answer: 1,
            explanation: 'Replace \\(x\\) by \\(-x\\) in \\(\\frac{1}{1-x} = \\sum x^n\\) to get \\(\\frac{1}{1+x} = \\sum (-1)^n x^n\\), valid for \\(|x| < 1\\).'
        },
        {
            id: 'ex-14-4-3',
            type: 'short-answer',
            question: 'Find the first three nonzero terms of the Maclaurin series for \\(e^{-x^2}\\). Write them separated by spaces (e.g., "1 -x^2 x^4/2").',
            answer: '1 -x^2 x^4/2',
            explanation: 'Substituting \\(-x^2\\) for \\(x\\) in \\(e^x = 1 + x + x^2/2! + \\cdots\\): \\(e^{-x^2} = 1 + (-x^2) + (-x^2)^2/2! + \\cdots = 1 - x^2 + x^4/2 - \\cdots\\).'
        },
        {
            id: 'ex-14-4-4',
            type: 'multiple-choice',
            question: 'The radius of convergence of the binomial series \\((1+x)^k\\) for non-integer \\(k\\) is:',
            options: ['\\(R = 0\\)', '\\(R = 1\\)', '\\(R = |k|\\)', '\\(R = \\infty\\)'],
            answer: 1,
            explanation: 'The binomial series \\(\\sum \\binom{k}{n} x^n\\) converges for \\(|x| < 1\\) when \\(k\\) is not a non-negative integer, giving \\(R = 1\\).'
        }
    ]
},

// ========== Section 5: Applications of Power Series ==========
{
    id: 'applications-power-series',
    title: 'Applications of Power Series',
    content: `
<h2>Applications of Power Series</h2>

<p>Power series provide a powerful toolkit for problems that are difficult or impossible to solve using elementary methods.</p>

<h3>Computing Limits</h3>

<div class="env-block example">
<div class="env-title">Example 14.8 — Limits via Taylor Expansion</div>
<p>Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}\\).</p>
<p><strong>Solution.</strong> Using the Maclaurin series:</p>
\\[
e^x - 1 - x = \\left(1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\cdots\\right) - 1 - x = \\frac{x^2}{2} + \\frac{x^3}{6} + \\cdots
\\]
<p>Dividing by \\(x^2\\):</p>
\\[
\\frac{e^x - 1 - x}{x^2} = \\frac{1}{2} + \\frac{x}{6} + \\cdots \\to \\frac{1}{2} \\quad \\text{as } x \\to 0
\\]
</div>

<h3>Computing Integrals</h3>

<div class="env-block example">
<div class="env-title">Example 14.9 — Integrating \\(e^{-x^2}\\)</div>
<p>The integral \\(\\int e^{-x^2}\\,dx\\) has no elementary antiderivative. But using the series:</p>
\\[
\\int_0^x e^{-t^2}\\,dt = \\int_0^x \\sum_{n=0}^{\\infty} \\frac{(-1)^n t^{2n}}{n!}\\,dt = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{n!(2n+1)}
\\]
\\[
= x - \\frac{x^3}{3} + \\frac{x^5}{10} - \\frac{x^7}{42} + \\cdots
\\]
<p>This converges for all \\(x\\) and gives a practical way to compute the error function \\(\\text{erf}(x) = \\frac{2}{\\sqrt{\\pi}} \\int_0^x e^{-t^2}\\,dt\\).</p>
</div>

<h3>Solving Differential Equations</h3>

<div class="env-block example">
<div class="env-title">Example 14.10 — Power Series Solution of an ODE</div>
<p>Solve \\(y' = y\\) with \\(y(0) = 1\\) by assuming \\(y = \\sum_{n=0}^{\\infty} a_n x^n\\).</p>
<p><strong>Solution.</strong> Then \\(y' = \\sum_{n=1}^{\\infty} n a_n x^{n-1} = \\sum_{n=0}^{\\infty} (n+1) a_{n+1} x^n\\). Setting \\(y' = y\\):</p>
\\[
(n+1) a_{n+1} = a_n \\implies a_{n+1} = \\frac{a_n}{n+1}
\\]
<p>With \\(a_0 = y(0) = 1\\), we get \\(a_n = 1/n!\\), confirming \\(y = e^x\\).</p>
</div>

<h3>Euler's Formula</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 14.5 — Euler's Formula</div>
<p>By formally substituting \\(ix\\) into the series for \\(e^x\\) and using \\(i^2 = -1\\):</p>
\\[
e^{ix} = \\cos x + i \\sin x
\\]
<p>Setting \\(x = \\pi\\) yields the celebrated <strong>Euler's identity</strong>: \\(e^{i\\pi} + 1 = 0\\).</p>
</div>

<div class="env-block proof">
<div class="env-title">Sketch of Proof</div>
<p>Substitute \\(ix\\) for \\(x\\) in \\(e^x = \\sum x^n/n!\\):</p>
\\[
e^{ix} = \\sum_{n=0}^{\\infty} \\frac{(ix)^n}{n!} = \\sum_{n=0}^{\\infty} \\frac{i^n x^n}{n!}
\\]
<p>Since \\(i^0 = 1, i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1, \\ldots\\), the real and imaginary parts separate into the cosine and sine series respectively.</p>
</div>

<div class="viz-container" id="viz-applications" data-viz="powerSeriesApplications"></div>
    `,
    visualizations: [{
        id: 'powerSeriesApplications',
        title: 'Power Series Applications: e^(-x^2) Integration',
        setup(container) {
            const viz = new VizEngine(container, { scale: 50, originX: 280, originY: 260 });
            let nTerms = 5;
            let upperLim = 1.0;

            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            VizEngine.createSlider(controls, 'Terms', 1, 15, nTerms, 1, v => { nTerms = v; draw(); });
            VizEngine.createSlider(controls, 'Upper limit x', 0.1, 3, upperLim, 0.1, v => { upperLim = v; draw(); });

            function gaussianPartialSum(x, n) {
                let s = 0;
                for (let k = 0; k < n; k++) {
                    s += Math.pow(-1, k) * Math.pow(x, 2 * k) / VizEngine.factorial(k);
                }
                return s;
            }

            function integralPartialSum(x, n) {
                let s = 0;
                for (let k = 0; k < n; k++) {
                    s += Math.pow(-1, k) * Math.pow(x, 2 * k + 1) / (VizEngine.factorial(k) * (2 * k + 1));
                }
                return s;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const xMin = -3;
                const xMax = 3;

                // Draw e^{-x^2}
                viz.drawFunction(x => Math.exp(-x * x), xMin, xMax, viz.colors.white, 2);

                // Draw partial sum of e^{-x^2}
                viz.drawFunction(x => gaussianPartialSum(x, nTerms), xMin, xMax, viz.colors.blue, 2);

                // Shade the area under e^{-x^2} from 0 to upperLim
                viz.shadeUnder(x => Math.exp(-x * x), 0, upperLim, viz.colors.teal + '33');

                // Compute series approximation of the integral
                const seriesVal = integralPartialSum(upperLim, nTerms);

                // Numerical reference using Simpson's rule
                let numericVal = 0;
                const steps = 200;
                const h = upperLim / steps;
                for (let i = 0; i <= steps; i++) {
                    const t = i * h;
                    const w = (i === 0 || i === steps) ? 1 : (i % 2 === 0 ? 2 : 4);
                    numericVal += w * Math.exp(-t * t);
                }
                numericVal *= h / 3;

                viz.screenText('White: e^(-x^2)   Blue: partial sum (' + nTerms + ' terms)', viz.width / 2, 20, viz.colors.white, 12);
                viz.screenText('Integral from 0 to ' + upperLim.toFixed(1) + ':', viz.width / 2, viz.height - 38, viz.colors.teal, 12);
                viz.screenText('Series: ' + seriesVal.toFixed(6) + '   Actual: ' + numericVal.toFixed(6), viz.width / 2, viz.height - 18, viz.colors.text, 11);
            }

            draw();
            return viz;
        }
    }],
    exercises: [
        {
            id: 'ex-14-5-1',
            type: 'multiple-choice',
            question: 'Using Taylor series, evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sin x - x}{x^3}\\).',
            options: ['\\(0\\)', '\\(-1/6\\)', '\\(1/6\\)', '\\(-1/2\\)'],
            answer: 1,
            explanation: '\\(\\sin x - x = \\left(x - \\frac{x^3}{6} + \\cdots\\right) - x = -\\frac{x^3}{6} + \\cdots\\). Dividing by \\(x^3\\): \\(-1/6 + \\cdots \\to -1/6\\).'
        },
        {
            id: 'ex-14-5-2',
            type: 'multiple-choice',
            question: 'The integral \\(\\int_0^1 \\frac{\\sin x}{x}\\,dx\\) can be computed using the series \\(\\frac{\\sin x}{x} = 1 - \\frac{x^2}{3!} + \\frac{x^4}{5!} - \\cdots\\). The first three terms give:',
            options: [
                '\\(1 - 1/18 + 1/600\\)',
                '\\(1 - 1/6 + 1/120\\)',
                '\\(1 - 1/3 + 1/10\\)',
                '\\(1 - 1/18 + 1/120\\)'
            ],
            answer: 0,
            explanation: 'Integrating term by term from 0 to 1: \\(\\int_0^1 \\left(1 - \\frac{x^2}{6} + \\frac{x^4}{120} - \\cdots\\right)dx = 1 - \\frac{1}{18} + \\frac{1}{600} - \\cdots\\).'
        },
        {
            id: 'ex-14-5-3',
            type: 'multiple-choice',
            question: 'Euler\'s formula states \\(e^{ix} = \\cos x + i\\sin x\\). What is \\(e^{i\\pi/2}\\)?',
            options: ['\\(1\\)', '\\(-1\\)', '\\(i\\)', '\\(-i\\)'],
            answer: 2,
            explanation: '\\(e^{i\\pi/2} = \\cos(\\pi/2) + i\\sin(\\pi/2) = 0 + i \\cdot 1 = i\\).'
        },
        {
            id: 'ex-14-5-4',
            type: 'short-answer',
            question: 'Using the power series method, if \\(y\' = 2y\\) and \\(y(0) = 1\\), the recurrence relation gives \\(a_{n+1} = \\frac{2a_n}{n+1}\\). What is \\(a_3\\)? Enter a fraction like "4/3".',
            answer: '4/3',
            explanation: '\\(a_0 = 1\\), \\(a_1 = 2a_0/1 = 2\\), \\(a_2 = 2a_1/2 = 2\\), \\(a_3 = 2a_2/3 = 4/3\\). These are the coefficients of \\(e^{2x} = \\sum (2x)^n/n! = \\sum 2^n x^n/n!\\).'
        }
    ]
}
]
});
