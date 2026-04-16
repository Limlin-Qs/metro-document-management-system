# JSON Output Specification

## Complete Schema

```json
{
  "analysis_id": "string (UUID v4)",
  "timestamp": "string (ISO 8601 format)",
  "metadata": {
    "data_source": "string (file path or data description)",
    "row_count": "integer",
    "column_count": "integer",
    "analysis_type": "exploratory | confirmatory | diagnostic | descriptive",
    "business_question": "string (user's core question, optional)"
  },
  "data_quality": {
    "completeness": "number (0-1, non-missing ratio)",
    "missing_values": {
      "column_name": "integer (missing count)"
    },
    "duplicates": "integer (duplicate row count)",
    "outliers": {
      "column_name": "integer (outlier count)"
    },
    "issues": ["string (issue description)"]
  },
  "statistics": {
    "numeric_summary": {
      "column_name": {
        "count": "integer",
        "mean": "number",
        "std": "number",
        "min": "number",
        "max": "number",
        "quartiles": ["number (Q1)", "number (Q2/median)", "number (Q3)"],
        "skew": "number (optional)",
        "kurtosis": "number (optional)"
      }
    },
    "categorical_summary": {
      "column_name": {
        "unique_count": "integer",
        "top_values": [
          {"value": "string", "count": "integer", "percentage": "number"}
        ],
        "mode": "string"
      }
    },
    "correlations": [
      {
        "column1": "string",
        "column2": "string",
        "coefficient": "number",
        "method": "pearson | spearman"
      }
    ]
  },
  "insights": [
    {
      "id": "string (insight_1, insight_2, ...)",
      "type": "correlation | trend | anomaly | distribution | comparison",
      "title": "string (short title, within 10 characters)",
      "description": "string (detailed description)",
      "evidence": {
        "metric": "string (metric name)",
        "value": "number | string",
        "p_value": "number (optional, for statistical tests)"
      },
      "significance": "high | medium | low",
      "affected_columns": ["string"]
    }
  ],
  "recommendations": [
    {
      "id": "string (rec_1, rec_2, ...)",
      "type": "visualization | further_analysis | data_collection | action",
      "title": "string (recommendation title)",
      "description": "string (detailed recommendation)",
      "priority": "high | medium | low"
    }
  ],
  "visualizations": [
    {
      "id": "string (viz_1, viz_2, ...)",
      "type": "histogram | scatter | line | bar | heatmap | box | pie",
      "title": "string (chart title)",
      "config": {
        "x": "string (X-axis field name)",
        "y": "string (Y-axis field name, optional)",
        "group_by": "string (grouping field, optional)",
        "aggregation": "string (aggregation method: sum/mean/count, optional)"
      },
      "insight_refs": ["string (associated insight id)"]
    }
  ]
}
```

## Field Description

| Field Path | Required | Description |
| ---------- | -------- | ----------- |
| `analysis_id` | Yes | Unique identifier for analysis task, use UUID v4 |
| `timestamp` | Yes | Analysis completion time, ISO 8601 format |
| `metadata.*` | Yes | Data source metadata |
| `data_quality.*` | Yes | Data quality assessment results |
| `statistics.numeric_summary` | Conditional | Required when numeric columns exist |
| `statistics.categorical_summary` | Conditional | Required when categorical columns exist |
| `statistics.correlations` | No | Only populate when significant correlations found |
| `insights` | Yes | At least 1 insight required |
| `recommendations` | Yes | At least 1 recommendation required |
| `visualizations` | Yes | At least 1 visualization config required |

## Example Output

```json
{
  "analysis_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "timestamp": "2024-01-15T10:30:00Z",
  "metadata": {
    "data_source": "/data/sales_2023.csv",
    "row_count": 10000,
    "column_count": 12,
    "analysis_type": "exploratory",
    "business_question": "了解2023年销售数据的整体情况"
  },
  "data_quality": {
    "completeness": 0.95,
    "missing_values": {
      "customer_age": 320,
      "region": 180
    },
    "duplicates": 45,
    "outliers": {
      "order_amount": 23
    },
    "issues": [
      "customer_age 列有 3.2% 缺失值",
      "order_amount 存在 23 个异常高值（超出 IQR 上界）"
    ]
  },
  "statistics": {
    "numeric_summary": {
      "order_amount": {
        "count": 10000,
        "mean": 156.78,
        "std": 89.34,
        "min": 5.00,
        "max": 2500.00,
        "quartiles": [85.00, 135.00, 210.00],
        "skew": 2.34,
        "kurtosis": 8.91
      },
      "customer_age": {
        "count": 9680,
        "mean": 35.6,
        "std": 12.3,
        "min": 18,
        "max": 75,
        "quartiles": [26, 34, 44]
      }
    },
    "categorical_summary": {
      "product_category": {
        "unique_count": 5,
        "top_values": [
          {"value": "Electronics", "count": 3500, "percentage": 35.0},
          {"value": "Clothing", "count": 2800, "percentage": 28.0},
          {"value": "Home", "count": 2000, "percentage": 20.0}
        ],
        "mode": "Electronics"
      }
    },
    "correlations": [
      {
        "column1": "order_amount",
        "column2": "customer_age",
        "coefficient": 0.72,
        "method": "pearson"
      }
    ]
  },
  "insights": [
    {
      "id": "insight_1",
      "type": "correlation",
      "title": "年龄与消费正相关",
      "description": "客户年龄与订单金额呈较强正相关（r=0.72），年长客户倾向于更高消费。",
      "evidence": {
        "metric": "pearson_correlation",
        "value": 0.72,
        "p_value": 0.001
      },
      "significance": "high",
      "affected_columns": ["customer_age", "order_amount"]
    },
    {
      "id": "insight_2",
      "type": "distribution",
      "title": "订单金额右偏分布",
      "description": "订单金额呈明显右偏（skew=2.34），大部分订单集中在低价区间，少量高价订单拉高均值。",
      "evidence": {
        "metric": "skewness",
        "value": 2.34
      },
      "significance": "medium",
      "affected_columns": ["order_amount"]
    }
  ],
  "recommendations": [
    {
      "id": "rec_1",
      "type": "further_analysis",
      "title": "深入分析高价值客户",
      "description": "建议对年龄>40且订单金额>500的客户群体进行细分分析，挖掘其消费特征。",
      "priority": "high"
    },
    {
      "id": "rec_2",
      "type": "visualization",
      "title": "绘制年龄-消费散点图",
      "description": "使用散点图可视化年龄与订单金额的关系，并按产品类别着色。",
      "priority": "medium"
    }
  ],
  "visualizations": [
    {
      "id": "viz_1",
      "type": "scatter",
      "title": "客户年龄 vs 订单金额",
      "config": {
        "x": "customer_age",
        "y": "order_amount",
        "group_by": "product_category"
      },
      "insight_refs": ["insight_1"]
    },
    {
      "id": "viz_2",
      "type": "histogram",
      "title": "订单金额分布",
      "config": {
        "x": "order_amount"
      },
      "insight_refs": ["insight_2"]
    },
    {
      "id": "viz_3",
      "type": "bar",
      "title": "各产品类别销售额",
      "config": {
        "x": "product_category",
        "y": "order_amount",
        "aggregation": "sum"
      },
      "insight_refs": []
    }
  ]
}
```
