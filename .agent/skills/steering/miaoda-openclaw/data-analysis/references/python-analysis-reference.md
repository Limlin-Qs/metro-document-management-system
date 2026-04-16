# Python Code Standards & Templates

## Recommended Libraries

```python
import pandas as pd        # Data processing
import numpy as np         # Numerical computation
from scipy import stats    # Statistical analysis
from datetime import datetime
import json
import uuid
```

## Phase-Specific Code Templates

### Phase 2: Data Understanding

```python
import pandas as pd

df = pd.read_csv('data.csv')  # or pd.read_excel(), pd.read_json()

print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"Dtypes:\n{df.dtypes}")
print(f"Head:\n{df.head()}")
```

### Phase 3: Data Quality Assessment

```python
# Missing values
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(2)
print(f"Missing values:\n{missing[missing > 0]}")

# Duplicate rows
duplicates = df.duplicated().sum()
print(f"Duplicate rows: {duplicates}")

# Numeric outliers (IQR)
def detect_outliers_iqr(series):
    Q1, Q3 = series.quantile([0.25, 0.75])
    IQR = Q3 - Q1
    lower, upper = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
    return ((series < lower) | (series > upper)).sum()

for col in df.select_dtypes(include='number').columns:
    outliers = detect_outliers_iqr(df[col])
    if outliers > 0:
        print(f"{col}: {outliers} outliers")
```

### Phase 4: Descriptive Analysis

```python
# 4.1 Numeric variables
numeric_stats = df.describe(percentiles=[0.25, 0.5, 0.75]).T
numeric_stats['skew'] = df.select_dtypes(include='number').skew()
numeric_stats['kurtosis'] = df.select_dtypes(include='number').kurtosis()

# 4.2 Categorical variables
for col in df.select_dtypes(include='object').columns:
    print(f"\n{col}:")
    print(f"  Unique: {df[col].nunique()}")
    print(f"  Top values:\n{df[col].value_counts().head()}")

# 4.3 Correlation analysis (Pearson)
import numpy as np
correlation_matrix = df.select_dtypes(include='number').corr(method='pearson')
corr_pairs = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        r = correlation_matrix.iloc[i, j]
        if abs(r) > 0.7:
            corr_pairs.append({
                'col1': correlation_matrix.columns[i],
                'col2': correlation_matrix.columns[j],
                'correlation': round(r, 3)
            })

# 4.4 Group aggregation
grouped = df.groupby('category_column').agg({
    'numeric_col1': ['mean', 'std', 'count'],
    'numeric_col2': ['mean', 'std', 'count']
})
```

## Complete Analysis Template

```python
import pandas as pd
import numpy as np
from scipy import stats
import json
import uuid
from datetime import datetime
from pathlib import Path


def setup_tmp_dirs(project_root: Path = None) -> dict:
    """Initialize tmp directory structure for analysis artifacts."""
    if project_root is None:
        project_root = Path.cwd()

    tmp_dir = project_root / "tmp"
    paths = {
        "root": tmp_dir,
        "scripts": tmp_dir / "analysis_scripts",
        "intermediate": tmp_dir / "intermediate",
        "output": tmp_dir / "output",
        "visualizations": tmp_dir / "output" / "visualizations",
    }

    for path in paths.values():
        path.mkdir(parents=True, exist_ok=True)

    return paths


def analyze_data(file_path: str, analysis_type: str = "exploratory",
                 project_root: Path = None) -> dict:
    """
    Execute complete data analysis workflow.

    Args:
        file_path: Data file path
        analysis_type: exploratory/confirmatory/diagnostic/descriptive
        project_root: Project root for tmp directory. Defaults to cwd.

    Returns:
        Analysis result JSON conforming to specification
    """
    # 0. Setup tmp directories
    tmp_paths = setup_tmp_dirs(project_root)

    # 1. Load data
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    elif file_path.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file_path)
    elif file_path.endswith('.json'):
        df = pd.read_json(file_path)
    else:
        raise ValueError(f"Unsupported file format: {file_path}")

    # 2. Initialize result structure
    result = {
        "analysis_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "metadata": {
            "data_source": file_path,
            "row_count": len(df),
            "column_count": len(df.columns),
            "analysis_type": analysis_type
        },
        "data_quality": {},
        "statistics": {},
        "insights": [],
        "recommendations": [],
        "visualizations": []
    }

    # 3. Data quality assessment
    missing = df.isnull().sum()
    result["data_quality"] = {
        "completeness": round(1 - df.isnull().sum().sum() / df.size, 4),
        "missing_values": {k: int(v) for k, v in missing[missing > 0].items()},
        "duplicates": int(df.duplicated().sum()),
        "outliers": {},
        "issues": []
    }

    for col in df.select_dtypes(include='number').columns:
        Q1, Q3 = df[col].quantile([0.25, 0.75])
        IQR = Q3 - Q1
        outlier_count = int(((df[col] < Q1 - 1.5 * IQR) | (df[col] > Q3 + 1.5 * IQR)).sum())
        if outlier_count > 0:
            result["data_quality"]["outliers"][col] = outlier_count

    # 4. Descriptive statistics - Numeric
    numeric_cols = df.select_dtypes(include='number').columns
    if len(numeric_cols) > 0:
        result["statistics"]["numeric_summary"] = {}
        for col in numeric_cols:
            series = df[col].dropna()
            result["statistics"]["numeric_summary"][col] = {
                "count": int(series.count()),
                "mean": round(float(series.mean()), 4),
                "std": round(float(series.std()), 4),
                "min": round(float(series.min()), 4),
                "max": round(float(series.max()), 4),
                "quartiles": [
                    round(float(series.quantile(0.25)), 4),
                    round(float(series.quantile(0.50)), 4),
                    round(float(series.quantile(0.75)), 4)
                ],
                "skew": round(float(series.skew()), 4),
                "kurtosis": round(float(series.kurtosis()), 4)
            }

    # Categorical
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    if len(categorical_cols) > 0:
        result["statistics"]["categorical_summary"] = {}
        for col in categorical_cols:
            value_counts = df[col].value_counts()
            total = len(df[col].dropna())
            result["statistics"]["categorical_summary"][col] = {
                "unique_count": int(df[col].nunique()),
                "top_values": [
                    {
                        "value": str(idx),
                        "count": int(cnt),
                        "percentage": round(cnt / total * 100, 2)
                    }
                    for idx, cnt in value_counts.head(5).items()
                ],
                "mode": str(value_counts.index[0]) if len(value_counts) > 0 else None
            }

    # 5. Correlation analysis
    if len(numeric_cols) > 1:
        corr_matrix = df[numeric_cols].corr()
        correlations = []
        for i in range(len(numeric_cols)):
            for j in range(i + 1, len(numeric_cols)):
                r = corr_matrix.iloc[i, j]
                if abs(r) > 0.5:
                    correlations.append({
                        "column1": numeric_cols[i],
                        "column2": numeric_cols[j],
                        "coefficient": round(float(r), 4),
                        "method": "pearson"
                    })
        if correlations:
            result["statistics"]["correlations"] = correlations

    # 6. Save output
    base_name = Path(file_path).stem
    output_file = tmp_paths["output"] / f"{base_name}_{analysis_type}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print(f"Analysis result saved to: {output_file}")

    return result


def save_visualization(fig, viz_id: str, tmp_paths: dict, format: str = "png"):
    """Save matplotlib/seaborn figure to tmp/output/visualizations."""
    output_path = tmp_paths["visualizations"] / f"{viz_id}.{format}"
    fig.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"Visualization saved to: {output_path}")
    return output_path


# Usage:
# result = analyze_data("sales_2023.csv", "exploratory")
# print(json.dumps(result, indent=2, ensure_ascii=False))
```
