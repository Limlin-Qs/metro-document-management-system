# Post-Analysis Guide

Steps to complete after analysis is done: update AGENTS.md and report output locations to user.

## 1. Update AGENTS.md

**CRITICAL**: After completing analysis, you **MUST** update AGENTS.md. This is NOT optional.

### Steps

1. Check if `AGENTS.md` exists in the project root; if not, create it
2. Append the analysis record to `AGENTS.md` following the format below exactly

> **NOTE**: Before writing code that consumes analysis data, always read the corresponding type definition in `shared/static/types.ts` first to ensure correct field access.

### AGENTS.md Format (MUST follow exactly)

> ### [Date] Analysis of [filename]
> - **Source file**: `path/to/source/data.csv`
> - **Analysis type**: exploratory | confirmatory | diagnostic | descriptive
> - **Key findings**: Brief summary of main insights (1-2 sentences)
> - **Output location**: `tmp/output/filename_analysis.json`
> - **Copied to**: `shared/static/filename_analysis.json` (if applicable)
> - **Type definition**: `shared/static/types.ts` → `FilenameAnalysis`
>
> #### Consumption
>
> ```typescript
> import type { FilenameAnalysis } from '@shared/static/types';
> import rawData from '@shared/static/filename_analysis.json';
>
> const data = rawData as FilenameAnalysis;
> // access fields: data.insights, data.statistics, data.visualizations, etc.
> ```

### Example Entry

> ### 2024-01-15 Analysis of sales_2023.csv
> - **Source file**: `data/sales_2023.csv`
> - **Analysis type**: exploratory
> - **Key findings**: Strong correlation between customer age and order amount (r=0.72). Order amounts show right-skewed distribution.
> - **Output location**: `tmp/output/sales_2023_exploratory.json`
> - **Copied to**: `shared/static/sales_2023_exploratory.json`
> - **Type definition**: `shared/static/types.ts` → `Sales2023Exploratory`
>
> #### Consumption
>
> ```typescript
> import type { Sales2023Exploratory } from '@shared/static/types';
> import rawData from '@shared/static/sales_2023_exploratory.json';
>
> const data = rawData as Sales2023Exploratory;
> const highInsights = data.insights.filter(i => i.significance === 'high');
> ```

## 2. Report Output Locations

After completing analysis, report to user:

```text
Analysis complete! Artifacts saved to:

📁 tmp/
├── output/
│   ├── sales_2023_exploratory.json      # Structured analysis result
│   └── visualizations/
│       ├── sales_2023_age_vs_amount.png # Scatter plot
│       └── sales_2023_amount_dist.png   # Histogram
└── intermediate/
    └── sales_2023_cleaned.csv           # Cleaned data (if applicable)

To use in your code, copy the JSON to shared/static/:
  mkdir -p shared/static/ && cp tmp/output/sales_2023_exploratory.json shared/static/

Then import directly in your code:
  import analysisData from '@shared/static/sales_2023_exploratory.json'
```
