import json
import os
import sys

def main():
    en_path = "translations-source/en.json"
    gr_path = "C:/Users/thore/Downloads/gr.json"
    el_out_path = "translations-source/el.json"

    with open(en_path, "r", encoding="utf-8") as f:
        en_data = json.load(f)
        
    with open(gr_path, "r", encoding="utf-8") as f:
        gr_text = f.read()

    # Replacements
    gr_text = gr_text.replace('"Κλείστε Demo"', '"Κλείστε δωρεάν demo"')
    gr_text = gr_text.replace('"Ζητήστε Demo"', '"Ζητήστε δωρεάν Demo"')
    gr_text = gr_text.replace('"Κλείστε Live Demo"', '"Κλείστε δωρεάν live demo"')
    gr_text = gr_text.replace('"Είσοδος"', '"Σύνδεση"')

    gr_data = json.loads(gr_text)

    # Optional polish
    # dashboard -> πίνακας ελέγχου
    # portal -> πύλη
    # early access -> πρώιμη πρόσβαση
    
    # Hero badge
    gr_data["hero"]["badge"] = "Τώρα σε πρώιμη πρόσβαση"
    
    # productPreview
    gr_data["productPreview"]["subtitle"] = "Ένας πίνακας ελέγχου που θα θέλετε να ανοίγετε κάθε πρωί. Μια πύλη πελατών που οι πελάτες σας θα χρησιμοποιούν πραγματικά."
    gr_data["features"]["groups"]["measurementsInsights"]["items"]["clientPortal"]["title"] = "Πύλη Πελατών"
    gr_data["benefits"]["items"]["professional"]["description"] = "Καθαροί πίνακες ελέγχου, δομημένα πλάνα και μια κομψή πύλη πελατών. Αναδείξτε το επαγγελματικό σας προφίλ."
    
    def get_keys(d, prefix=""):
        keys = set()
        for k, v in d.items():
            full_key = f"{prefix}.{k}" if prefix else k
            keys.add(full_key)
            if isinstance(v, dict):
                keys.update(get_keys(v, full_key))
        return keys

    en_keys = get_keys(en_data)
    gr_keys = get_keys(gr_data)

    missing = en_keys - gr_keys
    extra = gr_keys - en_keys

    print(f"Missing keys: {missing}")
    print(f"Extra keys: {extra}")
    print(f"Total EN keys: {len(en_keys)}")
    print(f"Total GR keys: {len(gr_keys)}")

    if not missing and not extra:
        print("Validation SUCCESS: Keys match perfectly.")
        with open(el_out_path, "w", encoding="utf-8") as f:
            json.dump(gr_data, f, ensure_ascii=False, indent=2)
        print("Saved to " + el_out_path)
    else:
        print("Validation FAILED.")
        sys.exit(1)

if __name__ == "__main__":
    main()
