import re
import datetime

# Images
images_sip = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a2236b0?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600&h=600"
]

images_loan = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1600&h=600"
]

images_ppf = [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1534951009808-766178b47a4f?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1580519542036-ed47f3e42a9d?auto=format&fit=crop&q=80&w=1600&h=600"
]

images_cgpa = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600&h=600"
]

images_bmi = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1535914254981-b5012eeb80e1?auto=format&fit=crop&q=80&w=1600&h=600",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1600&h=600"
]

blogs_meta = [
    {
        "file": "blog1.md",
        "slug": "sip-vs-lumpsum-investment-guide",
        "category": "Finance",
        "tags": ["finance", "investing", "mutual funds", "sip", "wealth"],
        "images": images_sip,
        "tool_link": "[SIP Calculator](/tools/sip-calculator)",
        "ext_link": "[Investopedia Guide on Mutual Funds](https://www.investopedia.com/terms/m/mutualfund.asp)"
    },
    {
        "file": "blog2.md",
        "slug": "home-loan-prepayment-strategy",
        "category": "Finance",
        "tags": ["finance", "home loan", "prepayment", "debt", "real estate"],
        "images": images_loan,
        "tool_link": "[Home Loan Prepayment Calculator](/tools/loan-prepayment)",
        "ext_link": "[RBI Prepayment Circular Guidelines](https://www.rbi.org.in/)"
    },
    {
        "file": "blog3.md",
        "slug": "ppf-vs-fd-vs-rd-safe-investments-2026",
        "category": "Finance",
        "tags": ["finance", "savings", "ppf", "fixed deposit", "tax"],
        "images": images_ppf,
        "tool_link": "[PPF Calculator](/tools/ppf-calculator)",
        "ext_link": "[ClearTax Guide on FD Rates](https://cleartax.in/s/fixed-deposit)"
    },
    {
        "file": "blog4.md",
        "slug": "cgpa-vs-percentage-guide-2026",
        "category": "Education",
        "tags": ["education", "career", "cgpa", "placements", "students"],
        "images": images_cgpa,
        "tool_link": "[CGPA to Percentage Calculator](/tools/cgpa-calculator)",
        "ext_link": "[UGC Official Website](https://www.ugc.gov.in/)"
    },
    {
        "file": "blog5.md",
        "slug": "bmi-for-indian-body-types-truth",
        "category": "Health",
        "tags": ["health", "fitness", "bmi", "weight loss", "diabetes"],
        "images": images_bmi,
        "tool_link": "[BMI Calculator](/tools/bmi-calculator)",
        "ext_link": "[ICMR Dietary Guidelines](https://main.icmr.nic.in/)"
    }
]

amazon_link = "[Top Rated Essentials on Amazon](https://www.amazon.in/s?k=personal+finance+books&tag=toolpixa-21)"

def process_blog(meta):
    with open(meta["file"], "r", encoding="utf-8") as f:
        raw_text = f.read()

    # extract title
    lines = raw_text.split("\n")
    title = lines[0].replace("# ", "").strip()
    
    # remove the title line
    body = "\n".join(lines[1:]).strip()

    paragraphs = body.split("\n\n")
    new_paragraphs = []
    
    img_idx = 1 # first image (0) goes to cover
    
    has_tool = False
    has_amz = False
    has_ext = False
    
    for i, p in enumerate(paragraphs):
        new_paragraphs.append(p)
        
        # Insert image every 4 paragraphs (to get ~7-8 images total)
        if i > 0 and i % 4 == 0 and img_idx < len(meta["images"]):
            new_paragraphs.append(f"![Illustration for {title}]({meta['images'][img_idx]})")
            img_idx += 1
            
        # Insert links in arbitrary paragraphs if not done yet
        if i == 3 and not has_tool:
            new_paragraphs.append(f"To get precise numbers for your situation, we highly recommend using our **{meta['tool_link']}**.")
            has_tool = True
        
        if i == 6 and not has_ext:
            new_paragraphs.append(f"For more regulatory and authoritative context on this, you can review the **{meta['ext_link']}**.")
            has_ext = True
            
        if i == 9 and not has_amz:
            new_paragraphs.append(f"If you're serious about taking this further, check out these **{meta['amazon_link'] if 'amazon_link' in meta else amazon_link}** to build your knowledge.")
            has_amz = True

    final_body = "\n\n".join(new_paragraphs)
    
    # create the object string
    safe_title = title.replace("'", "\\'")
    safe_desc = "An in-depth guide on " + safe_title[:50] + "..."
    safe_body = final_body.replace("`", "\\`")
    
    obj_str = f"""  {{
    slug: '{meta["slug"]}',
    title: '{safe_title}',
    description: '{safe_desc}',
    category: '{meta["category"]}',
    imageUrl: '{meta["images"][0]}',
    tags: {meta["tags"]},
    date: '{datetime.datetime.now().strftime("%Y-%m-%d")}',
    author: 'ToolPixa',
    content: `{safe_body}`
  }}"""
    return obj_str

new_objects = []
for m in blogs_meta:
    new_objects.append(process_blog(m))

objects_joined = ",\n".join(new_objects)

with open("src/data/blogData.ts", "r", encoding="utf-8") as f:
    orig_content = f.read()

# Insert before the last `];`
# Because `orig_content` ends with `];`, we replace `];` with `,\n` + new_objects + `\n];`
if orig_content.strip().endswith("];"):
    # strip trailing whitespace
    orig_content = orig_content.rstrip()
    orig_content = orig_content[:-2] + ",\n" + objects_joined + "\n];\n"
    
    with open("src/data/blogData.ts", "w", encoding="utf-8") as f:
        f.write(orig_content)
    print("Successfully appended new blogs to blogData.ts")
else:
    print("Could not find trailing '];' in blogData.ts")

