---
name: data-analysis
description: "Data analysis and insight extraction skill. Outputs structured JSON for downstream code consumption. MUST be used FIRST when user's message contains or references data file attachments (CSV/Excel/JSON/Markdown), even if the final goal is building a webpage or dashboard. Use when: (1) exploring/comparing datasets, finding patterns/trends/correlations, (2) preparing data for visualization, dashboard, or analysis webpage, (3) assessing data quality or generating statistical reports. Keywords: 分析数据, 数据分析, 统计, 对比, 趋势, 评估, 数据看板, 数据大屏, 分析页面, 分析网页, 数据探索, 数据展示, 找规律, 画图, 报表, 报告, 可视化, 图表, visualize, dashboard, chart, plot, trend, pattern, insight, comparison, overview, correlation"
available-agents:
  - DesignLite
---

# Data Analysis

Systematic data analysis workflow that produces structured JSON output for downstream code consumption.

## Execution Flow

When this skill is triggered, execute **ALL** steps below in order. **Do NOT skip any step** — every step is mandatory unless explicitly marked as optional.

1. **Setup tmp directory**: Initialize `tmp/` directory structure in project root. **MUST read `references/tmp-file-management-guide.md` before proceeding.**
2. **Confirm data source**: Confirm the file path to analyze with user
3. **Execute Phase 1-3**: Business Understanding → Data Understanding → Quality Assessment (see "Analysis Methodology")
4. **Report initial findings**: Inform user about data overview and quality issues
5. **Execute Phase 4-5**: Descriptive Analysis → Insight Extraction (see "Analysis Methodology")
6. **Generate JSON output**: Save structured result to `tmp/output/`. **MUST read `references/json-output-specification.md` before generating — do NOT guess the schema.**
7. **Generate visualizations** (optional): Save charts to `tmp/output/visualizations/`
8. **[CRITICAL] Update type definitions**: Extract TS type definitions from analysis JSON and append/update to `shared/static/types.ts` (check if file exists first; if not, create it with directory). Naming convention: remove file extension, convert snake_case to PascalCase (e.g. `sales_2023_exploratory.json` → `Sales2023Exploratory`). Do NOT skip.
9. **[CRITICAL] Update AGENTS.md**: Record analysis summary in AGENTS.md with type definition location and consumption example. **MUST read `references/post-analysis-guide.md` before updating.** Do NOT skip.
10. **Report output locations**: Inform user where artifacts are saved. **MUST read "Output Summary Template" in `references/post-analysis-guide.md`.**

### Quality Checklist

After completing all steps above, verify the following before considering the task done:

- [ ] **tmp/ directory initialized**: All subdirectories created
- [ ] **Data quality assessed**: `data_quality` section fully populated
- [ ] **Statistics complete**: All numeric/categorical columns have corresponding summary
- [ ] **Insights have evidence**: Every insight has an `evidence` field
- [ ] **Insights answer business question**: Corresponds to `metadata.business_question`
- [ ] **JSON conforms to spec**: Field names, types, required fields all correct
- [ ] **Visualization config is valid**: Field names in `config` exist in the data
- [ ] **At least 1 recommendation**: `recommendations` is not empty
- [ ] **No hardcoded paths**: File paths come from user input
- [ ] **Outputs saved to tmp/**: JSON result and visualizations written to correct locations
- [ ] **tmp/ in .gitignore**: Ensure tmp/ is excluded from version control
- [ ] **types.ts updated**: TS type definitions extracted and appended to `shared/static/types.ts` (created if not exists)
- [ ] **AGENTS.md updated**: Analysis record appended with type definition location and consumption example

---

## Analysis Methodology (6 Phases)

Follow a simplified CRISP-DM methodology. **MUST read `references/python-analysis-reference.md` for Python code templates before writing analysis code.**

### Phase 1: Business Understanding

**Goal**: Clarify the analysis purpose and avoid blind exploration.

1. Confirm analysis type (see "Analysis Type Quick Reference")
2. Extract the user's core question or hypothesis
3. Define success criteria: What does the user expect from the analysis?

**Output**: Record in `metadata.analysis_type` and `metadata.business_question` in JSON.

### Phase 2: Data Understanding

**Goal**: Fully understand the structure and content of the data.

1. Load data and get basic information (row/column count, field names, dtypes, sample rows)
2. Identify field semantics:

| Type | Examples |
| ---- | -------- |
| Numeric (continuous) | price, age, amount |
| Numeric (discrete) | count, quantity |
| Categorical (ordinal) | rating, education level |
| Categorical (nominal) | color, city, product name |
| DateTime | order_date, created_at |
| Text | description, comments |

3. Initial statistical overview

### Phase 3: Data Quality Assessment

**Goal**: Identify data issues for credibility reference.

| Check | Method |
| ----- | ------ |
| Missing values | Per-column missing ratio, random vs systematic pattern |
| Duplicates | Full-row and key-field duplicates |
| Outliers | Numeric: IQR or Z-score; Categorical: rare categories |
| Consistency | Date formats, category value spelling |

**Output**: Populate the `data_quality` section of JSON.

### Phase 4: Descriptive Analysis

**Goal**: Extract statistical characteristics and distribution patterns.

| Sub-phase | Focus | Key Metrics |
| --------- | ----- | ----------- |
| 4.1 Numeric | Central tendency & dispersion | mean, median, std, skew, kurtosis, quartiles |
| 4.2 Categorical | Frequency distribution | unique count, top N values, mode |
| 4.3 Correlation | Variable relationships | Pearson (linear), Spearman (monotonic), \|r\| > 0.7 = strong |
| 4.4 Group Aggregation | Group comparisons | group-by mean/std/count |

**Output**: Populate the `statistics` section of JSON.

### Phase 5: Insight Extraction

**Goal**: Extract business-valuable findings from statistical results.

| Type | Identification Criteria | Example |
| ---- | ----------------------- | ------- |
| `correlation` | \|r\| > 0.7 or p < 0.05 | "Price and sales show strong negative correlation" |
| `trend` | Directional change in time series | "Monthly revenue shows continuous growth" |
| `anomaly` | Beyond 3σ or IQR boundary | "5 anomalous high-value orders detected" |
| `distribution` | Obvious skewness or multimodal | "Income shows right-skewed distribution" |
| `comparison` | Significant group differences | "Group A conversion rate significantly higher than Group B" |

Each insight must include: **evidence** (specific supporting data), **significance** (high/medium/low), **affected_columns**.

### Phase 6: JSON Output

Generate structured analysis result. **MUST read `references/json-output-specification.md` and strictly conform to its schema.**

---

## Analysis Type Quick Reference

Select the appropriate analysis focus based on user intent. Phase numbers refer to "Analysis Methodology" above.

| User Expression | Analysis Type | Focus Phase | Key Output |
| --------------- | ------------- | ----------- | ---------- |
| "explore data", "overview", "understand data" | `exploratory` | Phase 2-4 | Basic stats, quality report, distribution |
| "find patterns", "correlations", "relationships" | `exploratory` | Phase 4.3 | Correlation matrix, significant pairs |
| "compare", "A vs B", "differences" | `diagnostic` | Phase 4.4 | Group statistics, group differences |
| "validate hypothesis", "significance test" | `confirmatory` | Phase 4-5 | Statistical tests, p-values |
| "statistics", "summary", "report" | `descriptive` | Phase 4 | Aggregation results, frequency stats |
| "trend", "changes", "time series" | `exploratory` | Phase 4 | Time series trends, periodicity |

---

## Common Mistakes

| Mistake | Correct Approach |
| ------- | ---------------- |
| Analyze directly without checking data quality | Execute Phase 3 first, assess missing values and outliers |
| Ignore missing values when calculating mean | Clarify missing value handling strategy, or use `dropna()` |
| Interpret correlation as causation | Explicitly label "correlation" not "causes" in insights |
| Ignore data types and analyze directly | Confirm dtype first, numeric vs categorical need different handling |
| Output non-standardized JSON | Strictly follow the Schema in `references/json-output-specification.md` |
| Insights without supporting evidence | Every insight must have an `evidence` field |
| Visualization config doesn't match data | Ensure field names in `config` exist in the data |

