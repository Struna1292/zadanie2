Plik gha.yml realizuje w krokach:

1. checkout - pobiera kod źródłowy
2. definicja metadanych do generowania tagów obrazów domyślnie na podstawie hasha commita, lub można ręcznie otagować
3. QEMU i Buildx ustawia środowisko budowania obrazów na różne architektury
4. zalogowanie do dockerhuba
5. Zbudowanie obrazu w architekturze linux/amd64
6. Skanowanie zbudowanego obrazu 
7. Zbudowanie obrazu w architekturze linux/arm64
7. Skanowanie zbudowanego obrazu 
8. Jezeli skany nie wykryly wad CRITICAL lub HIGH to nastepuje zbudowanie i przeslanie obrazow na dockerhub