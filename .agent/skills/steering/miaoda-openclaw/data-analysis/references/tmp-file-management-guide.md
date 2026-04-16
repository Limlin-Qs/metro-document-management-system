# Temporary File Management

All temporary code and intermediate artifacts generated during analysis should be written to the project's `tmp/` directory.

## Directory Structure

```text
<project_root>/
├── tmp/                          # Analysis temp directory
│   ├── analysis_scripts/         # Temporary analysis scripts
│   │   └── sales_2023_analysis.py
│   ├── intermediate/             # Intermediate artifacts
│   │   ├── sales_2023_cleaned.csv
│   │   └── sales_2023_correlation.csv
│   └── output/                   # Final analysis output
│       ├── sales_2023_analysis.json
│       └── visualizations/
│           ├── sales_2023_age_vs_amount.png
│           └── sales_2023_amount_distribution.png
```

## Semantic File Naming

| Pattern | Example | Description |
| ------- | ------- | ----------- |
| `{dataset}_{purpose}.py` | `sales_2023_analysis.py` | Analysis script |
| `{dataset}_{stage}.csv` | `sales_2023_cleaned.csv` | Intermediate data |
| `{dataset}_{analysis_type}.json` | `sales_2023_exploratory.json` | Analysis result |
| `{dataset}_{chart_desc}.png` | `sales_2023_age_vs_amount.png` | Visualization |

**Best practices**:
- Derive base name from source file: `sales_2023.csv` → `sales_2023_*`
- Include analysis focus: `sales_2023_correlation.json`, `sales_2023_outliers.json`
- Use snake_case for consistency
- Avoid UUIDs or timestamps in primary filenames (use for deduplication only if needed)

## Usage Guidelines

1. **Create directories on first use**:
   ```python
   from pathlib import Path

   project_root = Path.cwd()
   tmp_dir = project_root / "tmp"

   (tmp_dir / "analysis_scripts").mkdir(parents=True, exist_ok=True)
   (tmp_dir / "intermediate").mkdir(parents=True, exist_ok=True)
   (tmp_dir / "output" / "visualizations").mkdir(parents=True, exist_ok=True)
   ```

2. **Script naming**: Use semantic names based on dataset and purpose
   ```python
   source_file = "sales_2023.csv"
   base_name = Path(source_file).stem  # "sales_2023"
   script_path = tmp_dir / "analysis_scripts" / f"{base_name}_analysis.py"
   ```

3. **Intermediate artifacts**: Write cleaned data, transformed results to `tmp/intermediate/`

4. **Final output**: Write JSON results and visualizations to `tmp/output/`

5. **gitignore**: Ensure `tmp/` is added to `.gitignore`

## Why Use Project tmp/ Directory

| Benefit | Description |
| ------- | ----------- |
| Traceable | Artifacts are associated with the project for easy review |
| Reproducible | Intermediate scripts are retained for re-execution and verification |
| Isolated | Does not pollute system temp directories |
| Easy cleanup | Delete `tmp/` to remove all analysis artifacts at once |

## Copying Output to shared/static/

When the analysis JSON needs to be consumed by application code, copy it from `tmp/output/` to `shared/static/`:

```python
import shutil
from pathlib import Path

def export_to_shared(analysis_file: Path, dest_dir: Path = None, filename: str = None):
    """Copy analysis result JSON to shared/static/ for downstream code consumption."""
    if dest_dir is None:
        dest_dir = Path("shared/static")
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_file = dest_dir / (filename or analysis_file.name)
    shutil.copy2(analysis_file, dest_file)
    print(f"Exported to: {dest_file}")
    return dest_file

# Example:
# export_to_shared(Path("tmp/output/sales_2023_exploratory.json"))
# → shared/static/sales_2023_exploratory.json
# Import in code: import analysisData from '@shared/static/sales_2023_exploratory.json'
```

**Best practices**:
- Only copy finalized, validated results to `shared/static/`
- Keep `tmp/` for iterative work; export to `shared/` only when analysis is complete
- Use descriptive filenames (e.g., `sales_q4_analysis.json` not `analysis_a1b2c3d4.json`)
