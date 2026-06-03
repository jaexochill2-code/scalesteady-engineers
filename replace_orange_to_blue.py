import os

def main():
    target_file = r"C:\Users\Tax Filing\.gemini\antigravity\scratch\scalesteady-engineers\src\app\build\page.tsx"
    
    if not os.path.exists(target_file):
        print(f"Error: {target_file} not found")
        return
        
    with open(target_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace orange accents with sapphire blue accents
    replacements = {
        "#C4431B": "#1B4F8A",
        "#A33615": "#2660A8",
        "rgba(196,67,27": "rgba(27,79,138"
    }
    
    for old, new in replacements.items():
        count = content.count(old)
        content = content.replace(old, new)
        print(f"Replaced {count} instances of '{old}' with '{new}'")
        
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Replacements complete.")

if __name__ == "__main__":
    main()
