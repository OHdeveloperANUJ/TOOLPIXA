import re

def process_css():
    with open('src/app/globals.css', 'r') as f:
        content = f.read()

    # Extract all color variables
    color_vars = re.findall(r'(--color-[a-zA-Z0-9-]+):\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgba\([^)]+\));', content)
    
    dark_vars = []
    light_vars = []
    
    def get_light_color(var_name, hex_val):
        if 'background' in var_name or 'surface' in var_name and 'container' not in var_name:
            return '#f8fafc' if 'background' in var_name else '#ffffff'
        if 'surface-container' in var_name:
            return '#f1f5f9'
        if 'text-primary' in var_name or 'on-surface' in var_name or 'on-background' in var_name:
            return '#0f172a'
        if 'text-secondary' in var_name or 'outline' in var_name:
            return '#475569'
        if 'primary' in var_name and 'on-primary' not in var_name:
            return '#2563eb' # Blue 600
        if 'glass-surface' in var_name:
            return 'rgba(0, 0, 0, 0.03)'
        if 'glass-border' in var_name:
            return 'rgba(0, 0, 0, 0.08)'
        if 'error' in var_name and 'on-error' not in var_name:
            return '#dc2626'
        
        # Default fallback: invert hex roughly
        if hex_val.startswith('#') and len(hex_val) == 7:
            try:
                r = 255 - int(hex_val[1:3], 16)
                g = 255 - int(hex_val[3:5], 16)
                b = 255 - int(hex_val[5:7], 16)
                return f'#{r:02x}{g:02x}{b:02x}'
            except:
                pass
        return hex_val

    theme_replacements = []
    
    for var_name, val in color_vars:
        bare_name = var_name.replace('--color-', '--')
        dark_vars.append(f'  {bare_name}: {val};')
        
        light_val = get_light_color(var_name, val)
        light_vars.append(f'  {bare_name}: {light_val};')
        
        theme_replacements.append((f'{var_name}: {val};', f'{var_name}: var({bare_name});'))

    # Replace in content
    new_content = content
    for old, new in theme_replacements:
        new_content = new_content.replace(old, new)

    # Append root and dark classes
    css_blocks = f"""
:root {{
{chr(10).join(light_vars)}
}}

.dark {{
{chr(10).join(dark_vars)}
}}
"""
    
    with open('src/app/globals.css', 'w') as f:
        f.write(new_content + css_blocks)

if __name__ == '__main__':
    process_css()
