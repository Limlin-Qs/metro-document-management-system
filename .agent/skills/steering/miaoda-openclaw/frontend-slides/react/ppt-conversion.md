# PPT 文件转换

将 PowerPoint 文件（.ppt/.pptx）转换为 React 演示文稿。

## Step 1: 提取内容

使用 Python + `python-pptx` 提取所有幻灯片内容：

```python
from pptx import Presentation
import json
import os

def extract_pptx(file_path, output_dir):
    """Extract all content from a PowerPoint file."""
    prs = Presentation(file_path)
    slides_data = []

    assets_dir = os.path.join(output_dir, 'assets')
    os.makedirs(assets_dir, exist_ok=True)

    for slide_num, slide in enumerate(prs.slides):
        slide_data = {
            'number': slide_num + 1,
            'title': '',
            'content': [],
            'images': [],
            'notes': ''
        }

        for shape in slide.shapes:
            if shape.has_text_frame:
                if shape == slide.shapes.title:
                    slide_data['title'] = shape.text
                else:
                    slide_data['content'].append({
                        'type': 'text',
                        'content': shape.text
                    })

            if shape.shape_type == 13:  # Picture
                image = shape.image
                image_name = f"slide{slide_num + 1}_img{len(slide_data['images']) + 1}.{image.ext}"
                image_path = os.path.join(assets_dir, image_name)

                with open(image_path, 'wb') as f:
                    f.write(image.blob)

                slide_data['images'].append({
                    'path': f"assets/{image_name}",
                })

        if slide.has_notes_slide:
            slide_data['notes'] = slide.notes_slide.notes_text_frame.text

        slides_data.append(slide_data)

    return slides_data

# Usage
slides = extract_pptx('presentation.pptx', './output')
print(json.dumps(slides, indent=2))
```

## Step 2: 主题选择

返回主 SKILL.md 的 Phase 2 执行主题自动选择。

## Step 3: 生成 React 组件

将提取内容转换为带选定主题的 React 组件，参考主 SKILL.md 的 Phase 3 输出结构。
